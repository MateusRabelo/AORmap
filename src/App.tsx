import { useState } from 'react'
import './App.css'
import Map from './assets/components/Map'
import FilterPanel from './assets/components/FilterPanel'
import { ResourceType } from './data/types'
import type { MapFilter } from './data/types'

function App() {
  const [filter, setFilter] = useState<MapFilter>({
    types: Object.values(ResourceType),
    tiers: [1, 2, 3, 4, 5, 6, 7, 8]
  });
  
  const [isAdding, setIsAdding] = useState(false);
  const [selectedResource, setSelectedResource] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-gray-100">
      {/* Sidebar toggle button for mobile */}
      <button 
        className="md:hidden bg-blue-600 text-white p-2 m-2 rounded-md fixed top-0 right-0 z-10 shadow-md"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? 'Esconder Filtros' : 'Mostrar Filtros'}
      </button>

      {/* Sidebar */}
      <div className={`
        ${showSidebar ? 'block' : 'hidden'} 
        md:block w-full md:w-80 p-4 overflow-y-auto bg-white shadow-lg
        ${showSidebar ? 'h-1/2 md:h-full' : 'h-0'} 
        transition-all duration-300 ease-in-out
      `}>
        <h1 className="text-2xl font-bold mb-4 text-blue-800">AOR Map</h1>
        <FilterPanel 
          onChange={setFilter}
          onAddingChange={setIsAdding}
          onResourceSelect={setSelectedResource}
        />
      </div>
      
      {/* Map */}
      <div className={`flex-1 ${showSidebar ? 'h-1/2 md:h-full' : 'h-full'}`}>
        <Map 
          filter={filter}
          isAdding={isAdding}
          selectedResource={selectedResource}
        />
      </div>
    </div>
  )
}

export default App
