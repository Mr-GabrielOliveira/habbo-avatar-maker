import React from 'react';

const HAND_ITEMS = [
  { group: 'Bebidas e clássicos', items: [
    ['1', 'Água / leite / groselha'], ['5', 'Suco Bubblejuice'], ['6', 'Chá / café'],
    ['7', 'Água / limonada'], ['8', 'Chocolate quente'], ['9', 'Poção rosa'], ['19', 'Habbo Cola'],
    ['33', 'Calippo'], ['42', 'Saquê'], ['43', 'Suco de tomate'], ['44', 'Líquido radioativo'],
    ['45', 'Espumante rosa'], ['46', 'Peixe'], ['47', 'Champanhe'], ['48', 'Refrigerante de laranja'],
    ['66', 'Vitamina de banana'], ['73', 'Gemada'], ['667', 'Habbo Cola clássica'],
  ]},
  { group: 'Comidas e doces', items: [
    ['2', 'Cenoura'], ['3', 'Sorvete de baunilha'], ['4', 'Hambúrguer / sorvete'], ['63', 'Pipoca'],
    ['64', 'Lata verde'], ['67', 'Goma azul'], ['68', 'Goma vermelha'], ['69', 'Goma verde'],
    ['70', 'Coxa de peru'], ['71', 'Torrada'], ['75', 'Sorvete de morango'], ['76', 'Sorvete de menta'],
    ['77', 'Sorvete de chocolate'], ['79', 'Algodão-doce rosa'], ['80', 'Algodão-doce azul'],
    ['81', 'Cachorro-quente'], ['83', 'Maçã envenenada'], ['89', 'Cupcake'],
  ]},
  { group: 'Objetos e especiais', items: [
    ['65', 'Lata de spray'], ['74', 'Taça de brinde'], ['1000', 'Rosa'], ['1001', 'Rosa negra'],
    ['1002', 'Girassol'], ['1029', 'Balão'], ['1030', 'Pincel'], ['1031', 'Tocha olímpica'],
    ['1032', 'Major Tom'], ['1033', 'OVNI'], ['1034', 'Objeto alienígena'], ['1035', 'Chave inglesa'],
    ['1036', 'Pato de borracha'], ['1037', 'Cobra'], ['1038', 'Graveto'], ['1039', 'Mão ferida'],
    ['1040', 'Coração'], ['1041', 'Lula'], ['1042', 'Fezes de morcego'], ['1043', 'Minhoca'],
    ['1044', 'Rato morto'], ['1045', 'Dentadura'],
  ]},
];

const AvatarControls = ({ params, setParams, username, setUsername }) => {
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section 
      className="habbo-window flex flex-col w-full max-w-lg"
      aria-label="Painel de Controles do Habbo"
    >
      <div className="habbo-window-header">
        <span>Controles do Boneco</span>
        <span>[x]</span>
      </div>
      
      <div className="habbo-content flex flex-col gap-5">
        
        {/* Bloco 1: Identificação */}
        <div className="flex flex-col gap-3 pb-4 border-b-2 border-dotted border-gray-400">
          <div className="flex flex-col gap-1">
            <label htmlFor="hotel" className="habbo-label">Selecione o Hotel</label>
            <select 
              id="hotel" 
              name="hotel" 
              value={params.hotel} 
              onChange={handleChange}
              className="habbo-input"
            >
              <option value="habbo.com.br">Brasil / Portugal (habbo.com.br)</option>
              <option value="habbo.com">Internacional (habbo.com)</option>
              <option value="habbo.de">Alemanha (habbo.de)</option>
              <option value="habbo.es">Espanha (habbo.es)</option>
              <option value="habbo.fi">Finlândia (habbo.fi)</option>
              <option value="habbo.fr">França (habbo.fr)</option>
              <option value="habbo.it">Itália (habbo.it)</option>
              <option value="habbo.nl">Holanda (habbo.nl)</option>
              <option value="habbo.com.tr">Turquia (habbo.com.tr)</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="habbo-label">Nome do Usuário</label>
            <input 
              type="text" 
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="habbo-input font-bold"
            />
          </div>
        </div>

        {/* Bloco 2: Rotação e Rosto */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-dotted border-gray-400">
          <div className="flex flex-col gap-1">
            <label htmlFor="direction" className="habbo-label">Rotação do corpo <output className="rotation-value">{params.direction}</output></label>
            <input type="range" id="direction" name="direction" min="0" max="7" step="1" value={params.direction} onChange={handleChange} className="rotation-slider" aria-label={`Rotação do corpo: ${params.direction} de 7`} />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="head_direction" className="habbo-label">Rotação da cabeça <output className="rotation-value">{params.head_direction}</output></label>
            <input type="range" id="head_direction" name="head_direction" min="0" max="7" step="1" value={params.head_direction} onChange={handleChange} className="rotation-slider" aria-label={`Rotação da cabeça: ${params.head_direction} de 7`} />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="gesture" className="habbo-label">Expressão Facial</label>
            <select id="gesture" name="gesture" value={params.gesture} onChange={handleChange} className="habbo-input">
              <option value="std">Normal</option>
              <option value="spk">Falando</option>
              <option value="sml">Sorrindo</option>
              <option value="srp">Surpreso</option>
              <option value="agr">Nervoso</option>
              <option value="sad">Triste</option>
              <option value="blw">Mandando beijo</option>
              <option value="eyb">Dormindo / olhos fechados</option>
            </select>
          </div>
        </div>

        {/* Bloco 3: Ações e Objetos (O Segredo da API) */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b-2 border-dotted border-gray-400">
          <div className="flex flex-col gap-1">
            <label htmlFor="bodyAction" className="habbo-label">Ação do Corpo</label>
            <select id="bodyAction" name="bodyAction" value={params.bodyAction} onChange={handleChange} className="habbo-input">
              <option value="std">Em pé</option>
              <option value="sit">Sentado</option>
              <option value="lay">Deitado</option>
              <option value="wlk">Andando (Requer Animar)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="leftHand" className="habbo-label">Mão Esquerda</label>
            <select id="leftHand" name="leftHand" value={params.leftHand} onChange={handleChange} className="habbo-input">
              <option value="std">Nenhuma</option>
              <option value="wav">Acenando</option>
              <option value="respect">Respeito</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="rightHand" className="habbo-label">Mão Direita</label>
            <select id="rightHand" name="rightHand" value={params.rightHand} onChange={handleChange} className="habbo-input">
              <option value="std">Nenhuma</option>
              <option value="crr">Segurar objeto</option>
              <option value="drk">Bebendo</option>
              <option value="blw">Mandando beijo</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="carryItem" className="habbo-label">Item de mão</label>
            <select id="carryItem" name="carryItem" value={params.carryItem} onChange={handleChange} className="habbo-input">
              <option value="0">Nenhum</option>
              {HAND_ITEMS.map(({ group, items }) => (
                <optgroup label={group} key={group}>
                  {items.map(([id, label]) => <option value={id} key={id}>{label} · {id}</option>)}
                </optgroup>
              ))}
            </select>
            <span className="control-hint">Escolha um item e selecione “Segurar objeto” ou “Bebendo”.</span>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="sign" className="habbo-label">Placa / Sinal</label>
            <select id="sign" name="sign" value={params.sign} onChange={handleChange} className="habbo-input">
              <option value="">Nenhuma</option>
              <option value="0">Número 0</option>
              <option value="1">Sinal 1 (1)</option>
              <option value="2">Sinal 2 (2)</option>
              <option value="3">Sinal 3 (3)</option>
              <option value="4">Sinal 4 (4)</option>
              <option value="5">Sinal 5 (5)</option>
              <option value="6">Sinal 6 (6)</option>
              <option value="7">Sinal 7 (7)</option>
              <option value="8">Sinal 8 (8)</option>
              <option value="9">Sinal 9 (9)</option>
              <option value="10">Sinal 10</option>
              <option value="11">Coração</option>
              <option value="12">Caveira</option>
              <option value="13">Exclamação</option>
              <option value="14">Futebol</option>
              <option value="15">Sorriso</option>
              <option value="16">Cartão Vermelho</option>
              <option value="17">Cartão Amarelo</option>
            </select>
          </div>
        </div>

        {/* Bloco 4: Formato e Efeitos */}
        <div className="flex flex-col gap-3">
          <label className="habbo-label">Opções Extras</label>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="headonly" name="headonly" checked={params.headonly} onChange={handleChange} />
            <label htmlFor="headonly" className="text-sm font-semibold cursor-pointer">Apenas a Cabeça</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="animated" name="animated" checked={params.animated} onChange={handleChange} />
            <label htmlFor="animated" className="text-sm font-semibold cursor-pointer text-[#d37315]">Animar Personagem (GIF)</label>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default AvatarControls;
