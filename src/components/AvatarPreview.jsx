import React, { useRef, useState } from 'react';

const AvatarPreview = ({ imageUrl, fallbackUrl, username, isLoading, hasError, isAnimated }) => {
  const [downloading, setDownloading] = useState(false);
  const [fallbackFor, setFallbackFor] = useState('');
  const [failedFallbackFor, setFailedFallbackFor] = useState('');
  const [copied, setCopied] = useState(false);
  const linkInput = useRef(null);
  const usingFallback = fallbackFor === imageUrl;
  const imageFailed = Boolean(fallbackUrl) && failedFallbackFor === fallbackUrl;
  const displayedImageUrl = usingFallback ? fallbackUrl : imageUrl;

  const handleCopyLink = async () => {
    if (!displayedImageUrl) return;
    try {
      await navigator.clipboard.writeText(displayedImageUrl);
    } catch {
      linkInput.current?.select();
      document.execCommand('copy');
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleDownload = async () => {
    if (!imageUrl) return;
    setDownloading(true);
    try {
      // Faz o fetch da imagem (URL.createObjectURL)
      const response = await fetch(displayedImageUrl);
      if (!response.ok) throw new Error('O serviço de imagem não retornou um avatar.');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `avatar_${username}.${isAnimated ? 'gif' : 'png'}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Falha ao baixar imagem via fetch, abrindo em nova aba:', err);
      // Fallback para download: abrir em nova aba
      window.open(displayedImageUrl, '_blank', 'noopener,noreferrer');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section 
      className="habbo-window flex flex-col items-center w-full max-w-sm"
      aria-label="Área de Visualização do Avatar"
    >
      <div className="habbo-window-header w-full">
        <span>Preview do Avatar</span>
        <span>[?]</span>
      </div>
      
      <div className="habbo-content w-full flex flex-col items-center gap-6">
        
        {/* Live Region para Leitores de Tela */}
        <div aria-live="polite" className="sr-only">
          {isLoading && "Atualizando avatar..."}
          {hasError && `Não foi possível encontrar o usuário ${username}.`}
          {!isLoading && !hasError && imageUrl && !imageFailed && `Visualização do avatar atualizado de ${username}.`}
        </div>

        {/* Fundo "Quarto" do Preview */}
        <div 
          className="avatar-stage relative w-48 h-48 rounded flex items-center justify-center shadow-inner"
        >
          {isLoading ? (
            <div className="text-white text-xs font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>Carregando...</div>
          ) : hasError || imageFailed ? (
            <div className="text-white font-bold text-center px-4" style={{ textShadow: '1px 1px 0 #000' }}>
              <span className="text-2xl block mb-2">:(</span>
              Não foi possível carregar este avatar. Confira o nick e tente novamente.
            </div>
          ) : !username ? (
            <div className="text-white font-bold text-center" style={{ textShadow: '1px 1px 0 #000' }}>
              Digite o nome!
            </div>
          ) : (
            <img 
              src={displayedImageUrl}
              alt={`Avatar de ${username}`} 
              className="max-w-full max-h-full object-contain drop-shadow-md pixelated"
              onError={() => {
                if (!usingFallback && fallbackUrl && fallbackUrl !== imageUrl) setFallbackFor(imageUrl);
                else setFailedFallbackFor(fallbackUrl);
              }}
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <label className="habbo-label">Link Direto</label>
          <input 
            ref={linkInput}
            type="text" 
            value={displayedImageUrl || ''}
            readOnly 
            className="habbo-input text-gray-500 cursor-text"
            aria-label="URL gerada para o avatar"
            onClick={(e) => e.target.select()}
          />
          
          <div className="preview-actions">
            <button
              onClick={handleDownload}
              disabled={!imageUrl || hasError || downloading}
              className="habbo-btn-green"
              aria-label={`Baixar avatar em ${isAnimated ? 'GIF' : 'PNG'}`}
            >
              {downloading ? 'Preparando...' : `⬇ Baixar ${isAnimated ? 'GIF' : 'PNG'}`}
            </button>
            <button onClick={handleCopyLink} disabled={!imageUrl || imageFailed} className="habbo-btn-secondary">
              {copied ? 'Link copiado!' : 'Copiar link'}
            </button>
            {displayedImageUrl && <a className="image-open-link" href={displayedImageUrl} target="_blank" rel="noopener noreferrer">Abrir imagem ↗</a>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AvatarPreview;
