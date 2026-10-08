import React, { useState, useEffect } from 'react';
import AvatarControls from './components/AvatarControls';
import AvatarPreview from './components/AvatarPreview';
import { useDebounce } from './hooks/useDebounce';
import { getAvatarImageUrl, checkUserExists } from './services/habboApi';

function App() {
  const [username, setUsername] = useState('frank');
  const [params, setParams] = useState({
    action: 'std',
    gesture: 'std',
    direction: '2',
    head_direction: '2',
    size: 'b'
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

      // Verifica se o usuário existe na API pública
      const exists = await checkUserExists(debouncedUsername);
      
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
    <div className="min-h-screen flex flex-col items-center py-10 px-4">
      <header className="mb-8 text-center" aria-labelledby="main-heading">
        <h1 id="main-heading" className="text-3xl md:text-4xl font-extrabold text-green-600 mb-2">
          Habbo Avatar Generator
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          Crie e exporte avatares incríveis em tempo real.
        </p>
      </header>

      <main className="w-full max-w-5xl flex flex-col md:flex-row gap-8 justify-center items-start">
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
        />
      </main>
      
      <footer className="mt-12 text-center text-sm text-gray-500">
        <p>Desenvolvido para demonstração e acessibilidade (WCAG AA).</p>
      </footer>
    </div>
  );
}

export default App;
