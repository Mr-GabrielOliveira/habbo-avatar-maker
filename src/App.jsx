import React, { useState, useEffect } from 'react';
import AvatarControls from './components/AvatarControls';
import AvatarPreview from './components/AvatarPreview';
import { useDebounce } from './hooks/useDebounce';
import { getAvatarImageUrl, checkUserExists } from './services/habboApi';

function App() {
  const [username, setUsername] = useState('GabrielGOL001');
  
  // Parâmetros V3
  const [params, setParams] = useState({
    hotel: 'habbo.com.br',
    bodyAction: 'std',
    leftHand: 'std',
    rightHand: 'std',
    carryItem: '0',
    sign: '0',
    effect: '0',
    gesture: 'std',
    direction: '2',
    head_direction: '2',
    size: 'b',
    headonly: false,
    animated: false
  });

  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Aplica o debounce (500ms) nos inputs
  const debouncedUsername = useDebounce(username, 500);
  const debouncedParams = useDebounce(params, 500);

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!debouncedUsername) {
        setImageUrl('');
        setHasError(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      // Verifica se o usuário existe no hotel selecionado
      const exists = await checkUserExists(debouncedUsername, debouncedParams.hotel);
      
      if (exists) {
        const url = getAvatarImageUrl(debouncedUsername, debouncedParams);
        setImageUrl(url);
      } else {
        setHasError(true);
        setImageUrl('');
      }
      
      setIsLoading(false);
    };

    fetchAvatar();
  }, [debouncedUsername, debouncedParams]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-4 relative z-10">
      
      {/* Header em Pixel Art */}
      <header className="mb-8 text-center flex flex-col items-center" aria-labelledby="main-heading">
        <div className="w-24 h-24 mb-4 bg-[#2d6f9a] border-4 border-black rounded-lg flex items-center justify-center habbo-window">
           <img src="https://images.habbo.com/c_images/album1584/UK114.gif" alt="Logo Habbo" className="pixelated" />
        </div>
        <h1 id="main-heading" className="text-2xl md:text-3xl font-extrabold text-white mb-2 tracking-wider" style={{ fontFamily: "'Press Start 2P', monospace", textShadow: '2px 2px 0 #000' }}>
          Habbo Avatar Maker
        </h1>
        <p className="text-white font-medium bg-black bg-opacity-40 px-3 py-1 rounded">
          Versão 3.0 Definitiva
        </p>
      </header>

      <main className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 justify-center items-start">
        <AvatarControls 
          params={params} 
          setParams={setParams} 
          username={username}
          setUsername={setUsername}
        />
        
        <AvatarPreview 
          imageUrl={imageUrl} 
          username={debouncedUsername}
          isLoading={isLoading}
          hasError={hasError}
          isAnimated={params.animated}
        />
      </main>
      
      <footer className="mt-12 text-center text-sm text-white bg-black bg-opacity-50 px-4 py-2 rounded">
        <p>Desenvolvido com IA para a comunidade de Habbo/Ravoatel.</p>
      </footer>
    </div>
  );
}

export default App;
