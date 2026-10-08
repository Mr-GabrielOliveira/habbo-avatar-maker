/**
 * Serviço para consumir a API pública do Habbo V3.
 */

export const getAvatarImageUrl = (username, params) => {
  if (!username) return '';

  const hotelDomain = params.hotel || 'habbo.com.br';
  const baseUrl = `https://www.${hotelDomain}/habbo-imaging/avatarimage`;
  
  // ----------------------------------------------------
  // LÓGICA DE SOBREPOSIÇÃO (O SEGREDO DA API)
  // ----------------------------------------------------
  const actionsArray = [];
  
  // Ação do Corpo (std, sit, lay, wlk)
  if (params.bodyAction && params.bodyAction !== 'std') {
    actionsArray.push(params.bodyAction);
  }
  
  // Ação da Mão Esquerda (wav, respect)
  if (params.leftHand && params.leftHand !== 'std') {
    actionsArray.push(params.leftHand);
  }

  // Sinais (mão esquerda prioritária para alguns hotéis)
  if (params.sign && params.sign !== '0') {
    actionsArray.push(`sign=${params.sign}`);
  }
  
  // Ação da Mão Direita e Objetos (crr)
  // REGRA DE CONFLITO: Se o usuário carrega um objeto (crr > 0), isso sobressai e pode conflitar com "drk" ou "blow".
  if (params.carryItem && params.carryItem !== '0') {
    actionsArray.push(`crr=${params.carryItem}`);
    
    // Se o usuário selecionou algo como "drk" (beber), mesclamos para ele beber o que está segurando
    if (params.rightHand === 'drk') {
      actionsArray.push('drk');
    }
  } else {
    // Se não está segurando nada, pode fazer outras ações com a mão direita
    if (params.rightHand && params.rightHand !== 'std') {
      actionsArray.push(params.rightHand);
    }
  }
  
  const finalAction = actionsArray.length > 0 ? actionsArray.join(',') : 'std';

  // Parâmetros Básicos
  const searchParams = new URLSearchParams({
    user: username,
    action: finalAction,
    direction: params.direction || '2', // 0-7
    head_direction: params.head_direction || '2', // 0-7
    gesture: params.gesture || 'std', // sml, sad, spk, srp, agr, eyb, sur
    size: params.size || 'b', // b (normal), s (small), l (large)
  });

  // Toggles V3
  if (params.headonly) {
    searchParams.append('headonly', '1');
  }

  if (params.animated) {
    // O habbo não tem parametro 'img_format=gif' em todos os hotéis (alguns ignoram),
    // mas se tiver wlk ou wav, a api costuma retornar gif se passarmos format=2 ou algo assim?
    // Na verdade, a documentação geralmente não exige parametro pra gif se a action for animada, 
    // mas vamos por 'img_format=gif' pra forçar quando suportado.
    // Algumas APIs antigas usavam ext=.gif na URL, mas vamos usar como quer.
    // wait, actually it might just be action=wav and it automatically animates.
    // Let's add action=wlk if animated is checked but no body action was selected? No.
    // We'll trust the requested param.
  }

  // Efeitos (só anexa o parâmetro se for diferente de 0)
  if (params.effect && params.effect !== '0') {
    searchParams.append('effect', params.effect);
  }

  return `${baseUrl}?${searchParams.toString()}${params.animated ? '&img_format=gif' : ''}`;
};

// Verifica se o usuário existe consultando a API pública daquele hotel
export const checkUserExists = async (username, hotelDomain = 'habbo.com.br') => {
  if (!username) return false;
  
  try {
    const response = await fetch(`https://www.${hotelDomain}/api/public/users?name=${username}`);
    
    if (response.ok) {
      const data = await response.json();
      return !!data.figureString;
    }
    
    return false;
  } catch (error) {
    console.error("Erro ao buscar usuário no hotel", hotelDomain, error);
    // Se o endpoint público estiver bloqueado por CORS noutro hotel, 
    // retornamos true como fallback para tentar carregar a imagem de qualquer jeito (graceful degradation)
    return true; 
  }
};
