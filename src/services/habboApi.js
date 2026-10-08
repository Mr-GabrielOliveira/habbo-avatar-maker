/**
 * Serviço para consumir a API pública do Habbo.
 */

// Gera a URL da imagem baseada no nome de usuário e outros parâmetros
export const getAvatarImageUrl = (username, params) => {
  if (!username) return '';

  const baseUrl = 'https://www.habbo.com.br/habbo-imaging/avatarimage';
  
  // Montagem flexível da string de 'action'
  const actionsArray = [];
  
  if (params.bodyAction && params.bodyAction !== 'std') {
    actionsArray.push(params.bodyAction);
  }
  
  if (params.handAction && params.handAction !== 'std') {
    actionsArray.push(params.handAction);
  }
  
  if (params.carryItem && params.carryItem !== '0') {
    actionsArray.push(`crr=${params.carryItem}`);
  }
  
  // Se estiver bebendo, geralmente a action drk é combinada
  // com crr=id, ex: crr=1,drk
  
  const finalAction = actionsArray.length > 0 ? actionsArray.join(',') : 'std';

  // Parâmetros da API
  const searchParams = new URLSearchParams({
    user: username,
    action: finalAction,
    direction: params.direction || '2', // 0-7
    head_direction: params.head_direction || '2', // 0-7
    gesture: params.gesture || 'std', // sml, sad, spk, srp, agr
    size: params.size || 'b', // b (normal), s (small), l (large)
  });

  // Efeitos (só anexa o parâmetro se for diferente de 0)
  if (params.effect && params.effect !== '0') {
    searchParams.append('effect', params.effect);
  }

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
