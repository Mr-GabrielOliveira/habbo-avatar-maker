import React from 'react';

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
            <label htmlFor="direction" className="habbo-label">Rotação Corpo (0-7)</label>
            <input type="number" id="direction" name="direction" min="0" max="7" value={params.direction} onChange={handleChange} className="habbo-input" />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="head_direction" className="habbo-label">Rotação Cabeça (0-7)</label>
            <input type="number" id="head_direction" name="head_direction" min="0" max="7" value={params.head_direction} onChange={handleChange} className="habbo-input" />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="gesture" className="habbo-label">Expressão Facial</label>
            <select id="gesture" name="gesture" value={params.gesture} onChange={handleChange} className="habbo-input">
              <option value="std">Normal</option>
              <option value="spk">Falando</option>
              <option value="sml">Sorrindo</option>
              <option value="sur">Surpreso</option>
              <option value="agr">Nervoso</option>
              <option value="sad">Triste</option>
              <option value="eyb">Olhos Fechados</option>
              <option value="srp">Dormindo</option>
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
              <option value="drk">Bebendo</option>
              <option value="blow">Mandando Beijo</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="carryItem" className="habbo-label">Objeto (Sobrescreve)</label>
            <select id="carryItem" name="carryItem" value={params.carryItem} onChange={handleChange} className="habbo-input">
              <option value="0">Nenhum</option>
              <option value="1">Água</option>
              <option value="2">Cenoura</option>
              <option value="3">Sorvete</option>
              <option value="6">Café</option>
              <option value="9">Suco</option>
              <option value="42">Celular</option>
              <option value="667">Habbo Cola</option>
            </select>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label htmlFor="sign" className="habbo-label">Placa / Sinal</label>
            <select id="sign" name="sign" value={params.sign} onChange={handleChange} className="habbo-input">
              <option value="0">Nenhuma</option>
              <option value="1">Sinal 1 (1)</option>
              <option value="2">Sinal 2 (2)</option>
              <option value="11">Coração</option>
              <option value="12">Caveira</option>
              <option value="13">Exclamação</option>
              <option value="14">Futebol</option>
              <option value="15">Sorriso</option>
              <option value="16">Cartão Amarelo</option>
              <option value="17">Cartão Vermelho</option>
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
