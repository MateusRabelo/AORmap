import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ResourceType } from '../../data/types';
import type { ResourceMarker, ResourceTier, MapFilter } from '../../data/types';
import { resources } from '../../data/resources';
import { v4 as uuidv4 } from 'uuid';

// Definição fictícia de coordenadas para um mapa personalizado de Albion
// No futuro, isso deve ser substituído por coordenadas reais ou imagens de mapa específicas
const CENTER: LatLngExpression = [51.505, -0.09];
const ZOOM = 13;

// Componente para gerenciar a adição de markers
const AddMarkerOnClick = ({ 
  onAddMarker, 
  isAdding, 
  selectedResource 
}: { 
  onAddMarker: (marker: ResourceMarker) => void, 
  isAdding: boolean,
  selectedResource: string | null
}) => {
  useMapEvents({
    click: (e) => {
      if (isAdding && selectedResource) {
        const newMarker: ResourceMarker = {
          id: uuidv4(),
          resourceId: selectedResource,
          position: [e.latlng.lat, e.latlng.lng],
          addedOn: new Date(),
          public: true
        };
        onAddMarker(newMarker);
      }
    }
  });

  return null;
};

interface MapProps {
  filter: MapFilter;
  isAdding: boolean;
  selectedResource: string | null;
}

const Map: React.FC<MapProps> = ({ filter, isAdding, selectedResource }) => {
  const [markers, setMarkers] = useState<ResourceMarker[]>([]);
  
  // Função para adicionar um novo marker
  const handleAddMarker = (marker: ResourceMarker) => {
    setMarkers(prev => [...prev, marker]);
  };

  // Filtra os markers de acordo com os filtros selecionados
  const filteredMarkers = markers.filter(marker => {
    const resource = resources.find(r => r.id === marker.resourceId);
    if (!resource) return false;
    
    return filter.types.includes(resource.type) && filter.tiers.includes(resource.tier);
  });

  return (
    <MapContainer center={CENTER} zoom={ZOOM} className="w-full h-full border border-gray-300 rounded-lg shadow-md">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <AddMarkerOnClick 
        onAddMarker={handleAddMarker} 
        isAdding={isAdding} 
        selectedResource={selectedResource} 
      />

      {filteredMarkers.map(marker => {
        const resource = resources.find(r => r.id === marker.resourceId);
        if (!resource) return null;
        
        return (
          <Marker 
            key={marker.id} 
            position={marker.position}
            icon={new Icon({
              iconUrl: `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23ffffff%22 stroke=%22%23000000%22 stroke-width=%223%22 /><text y=%22.9em%22 font-size=%2260%22 x=%2250%22 y=%2250%22 text-anchor=%22middle%22 dy=%2220%22>${resource.icon}</text></svg>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
          >
            <Popup className="rounded-md shadow-lg">
              <div className="p-2">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{resource.name}</h3>
                <div className="text-sm text-gray-600">
                  <p>Tier: <span className="font-medium">T{resource.tier}</span></p>
                  <p>Tipo: <span className="font-medium capitalize">{resource.type}</span></p>
                  <p>Adicionado em: <span className="font-medium">{marker.addedOn.toLocaleDateString()}</span></p>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Map; 