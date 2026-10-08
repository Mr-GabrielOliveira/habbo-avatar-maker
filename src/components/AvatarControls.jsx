import React from 'react';

const AvatarControls = ({ params, setParams, username, setUsername }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-5 w-full max-w-md"
      aria-label="Controles de Customização do Avatar"
    >
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Customização 2.0</h2>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="username" className="font-semibold text-sm text-gray-700">Nome de Usuário</label>
        <input 
          type="text" 
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o nome do Habbo"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
          aria-describedby="username-hint"
        />
        <span id="username-hint" className="text-xs text-gray-500">O avatar será gerado com base neste nome.</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="bodyAction" className="font-semibold text-sm text-gray-700">Postura do Corpo</label>
          <select 
            id="bodyAction" 
            name="bodyAction" 
            value={params.bodyAction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar postura do corpo"
          >
            <option value="std">Em pé</option>
            <option value="wlk">Andando</option>
            <option value="sit">Sentado</option>
            <option value="lay">Deitado</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="handAction" className="font-semibold text-sm text-gray-700">Ação nas Mãos</label>
          <select 
            id="handAction" 
            name="handAction" 
            value={params.handAction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar ação nas mãos"
          >
            <option value="std">Nenhuma</option>
            <option value="wav">Acenar</option>
            <option value="drk">Beber</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="carryItem" className="font-semibold text-sm text-gray-700">Segurar Item</label>
          <select 
            id="carryItem" 
            name="carryItem" 
            value={params.carryItem} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar item para segurar"
          >
            <option value="0">Nenhum</option>
            <option value="1">Água</option>
            <option value="2">Cenoura</option>
            <option value="3">Sorvete</option>
            <option value="6">Café</option>
            <option value="9">Suco / Refri</option>
            <option value="33">Lupa</option>
            <option value="42">Celular</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="effect" className="font-semibold text-sm text-gray-700">Efeitos</label>
          <select 
            id="effect" 
            name="effect" 
            value={params.effect} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar efeito"
          >
            <option value="0">Sem efeito</option>
            <option value="13">Fantasma</option>
            <option value="27">Corvo</option>
            <option value="31">Avatar Pixelado</option>
            <option value="53">Pintinhos</option>
            <option value="108">Coração</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="gesture" className="font-semibold text-sm text-gray-700">Gesto do Rosto</label>
          <select 
            id="gesture" 
            name="gesture" 
            value={params.gesture} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar gesto do rosto"
          >
            <option value="std">Padrão</option>
            <option value="sml">Sorrindo</option>
            <option value="sad">Triste</option>
            <option value="spk">Falando</option>
            <option value="srp">Surpreso</option>
            <option value="agr">Bravo</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="size" className="font-semibold text-sm text-gray-700">Tamanho</label>
          <select 
            id="size" 
            name="size" 
            value={params.size} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Selecionar tamanho do avatar"
          >
            <option value="b">Normal</option>
            <option value="s">Pequeno</option>
            <option value="l">Grande</option>
          </select>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="direction" className="font-semibold text-sm text-gray-700">Direção Corpo</label>
          <input 
            type="number" 
            id="direction" 
            name="direction" 
            min="0" max="7" 
            value={params.direction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Definir direção do corpo, valor numérico entre 0 e 7"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="head_direction" className="font-semibold text-sm text-gray-700">Direção Cabeça</label>
          <input 
            type="number" 
            id="head_direction" 
            name="head_direction" 
            min="0" max="7" 
            value={params.head_direction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            aria-label="Definir direção da cabeça, valor numérico entre 0 e 7"
          />
        </div>
      </div>
    </section>
  );
};

export default AvatarControls;
