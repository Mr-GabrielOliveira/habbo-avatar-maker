/**
 * Serviço para consumir a API pública do Habbo.
 */

// Gera a URL da imagem baseada no nome de usuário e outros parâmetros
export const getAvatarImageUrl = (username, params) => {
  if (!username) return '';

  const baseUrl = 'https://www.habbo.com.br/habbo-imaging/avatarimage';
  
  // Parâmetros da API
  const searchParams = new URLSearchParams({
    user: username,
    action: params.action || 'std', // wlk, sit, lay, etc.
    direction: params.direction || '2', // 0-7
    head_direction: params.head_direction || '2', // 0-7
    gesture: params.gesture || 'std', // sml, sad, spk, srp, agr
    size: params.size || 'b', // b (normal), s (small), l (large)
  });

  return `${baseUrl}?${searchParams.toString()}`;
};

// Verifica se o usuário existe consultando a API pública
export const checkUserExists = async (username) => {
  if (!username) return false;
  
  try {
    const response = await fetch(`https://www.habbo.com.br/api/public/users?name=${username}`);
    
    if (response.ok) {
      const data = await response.json();
      return !!data.figureString; // Retorna true se encontrou
    }
    
    return false; // Retorna false para 404 (não encontrado / perfil privado)
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return false;
  }
};
