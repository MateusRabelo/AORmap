import React, { useState } from 'react';
import { ResourceType } from '../../data/types';
import type { ResourceTier, MapFilter } from '../../data/types';
import { resources } from '../../data/resources';

interface FilterPanelProps {
  onChange: (filter: MapFilter) => void;
  onAddingChange: (adding: boolean) => void;
  onResourceSelect: (resourceId: string | null) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onChange, onAddingChange, onResourceSelect }) => {
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>(Object.values(ResourceType));
  const [selectedTiers, setSelectedTiers] = useState<ResourceTier[]>([1, 2, 3, 4, 5, 6, 7, 8]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);

  const handleTypeChange = (type: ResourceType) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(newTypes);
    onChange({ types: newTypes, tiers: selectedTiers });
  };

  const handleTierChange = (tier: ResourceTier) => {
    const newTiers = selectedTiers.includes(tier)
      ? selectedTiers.filter(t => t !== tier)
      : [...selectedTiers, tier];
    
    setSelectedTiers(newTiers);
    onChange({ types: selectedTypes, tiers: newTiers });
  };

  const handleAddToggle = () => {
    const newAddingState = !isAdding;
    setIsAdding(newAddingState);
    onAddingChange(newAddingState);
    
    if (!newAddingState) {
      setSelectedResource(null);
      onResourceSelect(null);
    }
  };

  const handleResourceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const resourceId = e.target.value || null;
    setSelectedResource(resourceId);
    onResourceSelect(resourceId);
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 py-3 px-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Filtros</h2>
      </div>
      
      <div className="p-4 space-y-6">
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Tipos de Recursos</h3>
          <div className="space-y-2">
            {Object.values(ResourceType).map(type => (
              <label key={type} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="form-checkbox text-blue-600 rounded"
                />
                <span className="capitalize text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Tier</h3>
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(tier => (
              <label key={tier} className="flex items-center p-1 border rounded cursor-pointer hover:bg-gray-50">
                <input
                  type="checkbox"
                  checked={selectedTiers.includes(tier as ResourceTier)}
                  onChange={() => handleTierChange(tier as ResourceTier)}
                  className="form-checkbox text-blue-600 rounded mr-1"
                />
                <span className="text-sm">T{tier}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-gray-700 mb-3">Adicionar Marcador</h3>
          <button
            onClick={handleAddToggle}
            className={`w-full py-2 px-4 rounded-md font-medium transition-colors
              ${isAdding 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'}`}
          >
            {isAdding ? 'Cancelar' : 'Adicionar'}
          </button>
          
          {isAdding && (
            <div className="mt-3">
              <select
                value={selectedResource || ''}
                onChange={handleResourceChange}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Selecione um recurso</option>
                {resources.map(resource => (
                  <option key={resource.id} value={resource.id}>
                    {resource.icon} {resource.name} (T{resource.tier})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel; 