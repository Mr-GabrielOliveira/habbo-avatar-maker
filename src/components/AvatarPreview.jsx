import React, { useState } from 'react';

const AvatarPreview = ({ imageUrl, username, isLoading, hasError, isAnimated }) => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!imageUrl) return;
    setDownloading(true);
    try {
      // Faz o fetch da imagem (URL.createObjectURL)
      const response = await fetch(imageUrl);
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
      window.open(imageUrl, '_blank');
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
          {!isLoading && !hasError && imageUrl && `Visualização do avatar atualizado de ${username}.`}
        </div>

        {/* Fundo "Quarto" do Preview */}
        <div 
          className="relative w-48 h-48 bg-[#95B7D7] rounded flex items-center justify-center shadow-inner"
          style={{ backgroundImage: 'url("https://images.habbo.com/c_images/catalogue/icon_277.png")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: '150%' }}
        >
          {isLoading ? (
            <div className="text-white text-xs font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>Carregando...</div>
          ) : hasError ? (
            <div className="text-white font-bold text-center px-4" style={{ textShadow: '1px 1px 0 #000' }}>
              <span className="text-2xl block mb-2">:(</span>
              Hóspede não encontrado
            </div>
          ) : !username ? (
            <div className="text-white font-bold text-center" style={{ textShadow: '1px 1px 0 #000' }}>
              Digite o nome!
            </div>
          ) : (
            <img 
              src={imageUrl} 
              alt={`Avatar de ${username}`} 
              className="max-w-full max-h-full object-contain drop-shadow-md pixelated"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<p class="text-white font-bold text-center text-sm shadow-black drop-shadow-md">Falha ao carregar imagem.</p>';
              }}
            />
          )}
        </div>

        <div className="w-full flex flex-col gap-3">
          <label className="habbo-label">Link Direto</label>
          <input 
            type="text" 
            value={imageUrl || ''} 
            readOnly 
            className="habbo-input text-gray-500 cursor-text"
            aria-label="URL gerada para o avatar"
            onClick={(e) => e.target.select()}
          />
          
          <button 
            onClick={handleDownload}
            disabled={!imageUrl || hasError || downloading}
            className="habbo-btn-green w-full mt-2"
            aria-label="Baixar Avatar para o computador"
          >
            {downloading ? 'Baixando...' : '📥 Baixar Avatar'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AvatarPreview;
