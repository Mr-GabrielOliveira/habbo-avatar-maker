import React, { useState, useEffect } from 'react';
import AvatarControls from './components/AvatarControls';
import AvatarPreview from './components/AvatarPreview';
import { useDebounce } from './hooks/useDebounce';
import { getAvatarImageUrl, getFallbackAvatarImageUrl } from './services/habboApi';
import './App.css';

function App() {
  const [username, setUsername] = useState('Gabrielol001');
  
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
      if (!debouncedUsername.trim()) {
        setImageUrl('');
        setHasError(false);
        return;
      }

      setIsLoading(true);
      setHasError(false);

      // Use a imagem como fonte da verdade: a API de usuários pode bloquear CORS.
      // Isso evita que uma falha de consulta deixe a prévia vazia no Pages.
      setImageUrl(getAvatarImageUrl(debouncedUsername.trim(), debouncedParams));
      setIsLoading(false);
    };

    fetchAvatar();
  }, [debouncedUsername, debouncedParams]);

  return (
    <div className="studio-shell flex flex-col items-center">
      <header className="studio-header" aria-labelledby="main-heading">
        <div className="studio-mark" aria-hidden="true"><span>G</span><span>✦</span></div>
        <div className="studio-kicker">Habbo Avatar Studio <span>·</span> BR / PT</div>
        <h1 id="main-heading" className="studio-title">Seu estilo.<br /><em>Seu Habbo.</em></h1>
        <p className="studio-description">Monte seu visual, escolha a pose e leve seu avatar para qualquer lugar.</p>
        <p className="studio-credit">Feito com React pela comunidade · Desenvolvido por <strong>Gabrielo 001</strong></p>
      </header>

      <main className="studio-main w-full flex flex-col lg:flex-row gap-7 justify-center">
        <AvatarControls 
          params={params} 
          setParams={setParams} 
          username={username}
          setUsername={setUsername}
        />
        
        <AvatarPreview 
          imageUrl={imageUrl} 
          fallbackUrl={getFallbackAvatarImageUrl(debouncedUsername.trim(), debouncedParams)}
          username={debouncedUsername}
          isLoading={isLoading}
          hasError={hasError}
          isAnimated={params.animated}
        />
      </main>
      
      <footer className="studio-footer">
        <p>Um projeto independente, criado com <strong>React</strong> para a comunidade Habbo.</p>
      </footer>
    </div>
  );
}

export default App;
