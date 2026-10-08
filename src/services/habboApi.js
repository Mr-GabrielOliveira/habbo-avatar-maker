/**
 * Serviço para consumir a API pública do Habbo V3.
 */

export const getAvatarImageUrl = (username, params) => {
  if (!username) return '';

  const baseUrl = 'https://habbohistory.com/habbo-imaging/avatarimage';
  
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
  if (params.sign !== undefined && params.sign !== null && params.sign !== '' && params.sign !== 'none') {
    actionsArray.push(`sig=${params.sign}`);
  }
  
  // Ação da Mão Direita e Objetos (crr)
  // REGRA DE CONFLITO: Se o usuário carrega um objeto (crr > 0), isso sobressai e pode conflitar com "drk" ou "blow".
  if (params.carryItem && params.carryItem !== '0') {
    // O código do item precisa acompanhar a ação: drk=6 bebe o item 6; crr=6 segura.
    const handAction = params.rightHand === 'drk' ? 'drk' : 'crr';
    actionsArray.push(`${handAction}=${params.carryItem}`);
  } else {
    // Se não está segurando nada, pode fazer outras ações com a mão direita
    if (params.rightHand && params.rightHand !== 'std') {
      actionsArray.push(params.rightHand);
    }
  }
  
  const finalAction = actionsArray.length > 0 ? actionsArray.join(',') : 'std';
  const hotel = (params.hotel || 'habbo.com.br').replace(/^habbo\./, '');

  // Parâmetros Básicos
  const searchParams = new URLSearchParams({
    user: username,
    hotel,
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

  searchParams.set('format', params.animated ? 'gif' : 'png');

  // Efeitos (só anexa o parâmetro se for diferente de 0)
  if (params.effect && params.effect !== '0') {
    searchParams.append('effect', params.effect);
  }

  return `${baseUrl}?${searchParams.toString()}`;
};

// Use o renderizador do hotel como segunda opção caso o serviço de fãs esteja indisponível.
export const getFallbackAvatarImageUrl = (username, params) => {
  if (!username) return '';
  const hotelDomain = params.hotel || 'habbo.com.br';
  const actions = [];
  if (params.bodyAction && params.bodyAction !== 'std') actions.push(params.bodyAction);
  if (params.leftHand && params.leftHand !== 'std') actions.push(params.leftHand);
  if (params.sign !== undefined && params.sign !== null && params.sign !== '' && params.sign !== 'none') actions.push(`sig=${params.sign}`);
  if (params.carryItem && params.carryItem !== '0') {
    const handAction = params.rightHand === 'drk' ? 'drk' : 'crr';
    actions.push(`${handAction}=${params.carryItem}`);
  } else if (params.rightHand && params.rightHand !== 'std') {
    actions.push(params.rightHand);
  }
  const searchParams = new URLSearchParams({
    user: username,
    action: actions.length ? actions.join(',') : 'std',
    direction: params.direction || '2',
    head_direction: params.head_direction || '2',
    gesture: params.gesture || 'std',
    size: params.size || 'b',
  });
  if (params.headonly) searchParams.set('headonly', '1');
  if (params.effect && params.effect !== '0') searchParams.set('effect', params.effect);
  if (params.animated) searchParams.set('img_format', 'gif');
  return `https://www.${hotelDomain}/habbo-imaging/avatarimage?${searchParams.toString()}`;
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
