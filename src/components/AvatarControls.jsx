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
      <h2 className="text-xl font-bold text-gray-800 border-b pb-2">Customização</h2>
      
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
          <label htmlFor="action" className="font-semibold text-sm text-gray-700">Ação do Corpo</label>
          <select 
            id="action" 
            name="action" 
            value={params.action} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="std">Padrão</option>
            <option value="wlk">Andando</option>
            <option value="sit">Sentado</option>
            <option value="lay">Deitado</option>
            <option value="wav">Acenando</option>
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
          <label htmlFor="direction" className="font-semibold text-sm text-gray-700">Direção Corpo (0-7)</label>
          <input 
            type="number" 
            id="direction" 
            name="direction" 
            min="0" max="7" 
            value={params.direction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="head_direction" className="font-semibold text-sm text-gray-700">Direção Cabeça (0-7)</label>
          <input 
            type="number" 
            id="head_direction" 
            name="head_direction" 
            min="0" max="7" 
            value={params.head_direction} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="size" className="font-semibold text-sm text-gray-700">Tamanho</label>
          <select 
            id="size" 
            name="size" 
            value={params.size} 
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="b">Normal</option>
            <option value="s">Pequeno</option>
            <option value="l">Grande</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default AvatarControls;
