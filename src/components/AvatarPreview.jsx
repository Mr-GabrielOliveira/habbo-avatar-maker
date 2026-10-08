import React, { useState } from 'react';

const AvatarPreview = ({ imageUrl, username, isLoading, hasError }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyUrl = async () => {
    if (!imageUrl) return;
    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Falha ao copiar:', err);
    }
  };

  return (
    <section 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center gap-6 w-full max-w-md"
      aria-label="Área de Visualização do Avatar"
    >
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2 w-full text-center">Live Preview</h2>
      
      {/* Live Region para Leitores de Tela */}
      <div aria-live="polite" className="sr-only">
        {isLoading && "Atualizando avatar..."}
        {hasError && `Não foi possível encontrar o usuário ${username}.`}
        {!isLoading && !hasError && imageUrl && `Visualização do avatar atualizado de ${username}.`}
      </div>

      <div className="relative w-48 h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
            <span className="text-sm text-gray-500 font-medium">Carregando...</span>
          </div>
        ) : hasError ? (
          <div className="flex flex-col items-center justify-center text-center p-4">
            <span aria-hidden="true" className="text-4xl mb-2">🕵️‍♂️</span>
            <p className="text-sm text-red-500 font-semibold">Usuário não encontrado ou perfil privado.</p>
          </div>
        ) : !username ? (
          <div className="text-center p-4">
            <span aria-hidden="true" className="text-4xl mb-2">👋</span>
            <p className="text-sm text-gray-500 font-medium">Digite um nome para ver o avatar.</p>
          </div>
        ) : (
          <img 
            src={imageUrl} 
            alt={`Visualização do avatar atualizado de ${username}`} 
            className="max-w-full max-h-full object-contain"
            onError={(e) => {
              // Fallback caso a imagem não carregue
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<p class="text-sm text-red-500 font-semibold p-4 text-center">Falha ao carregar a imagem do avatar.</p>';
            }}
          />
        )}
      </div>

      <div className="w-full flex flex-col gap-2">
        <label htmlFor="generated-url" className="font-semibold text-sm text-gray-700">URL Gerada</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            id="generated-url"
            value={imageUrl || ''} 
            readOnly 
            className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="URL gerada para o avatar"
          />
          <button 
            onClick={handleCopyUrl}
            disabled={!imageUrl || hasError}
            className={`px-4 py-2 rounded-md font-semibold text-white transition-all focus:ring-2 focus:ring-offset-2 focus:outline-none focus:ring-green-500 ${
              !imageUrl || hasError 
                ? 'bg-gray-400 cursor-not-allowed' 
                : copySuccess 
                  ? 'bg-green-600' 
                  : 'bg-green-500 hover:bg-green-600'
            }`}
            aria-label={copySuccess ? 'URL copiada com sucesso' : 'Copiar URL do avatar'}
          >
            {copySuccess ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AvatarPreview;
