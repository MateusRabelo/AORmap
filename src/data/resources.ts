import { ResourceType } from './types';
import type { Resource } from './types';

export const resources: Resource[] = [
  {
    id: 'birch',
    name: 'Árvore de Bétula',
    type: ResourceType.WOOD,
    tier: 2,
    icon: '🌳'
  },
  {
    id: 'chestnut',
    name: 'Árvore de Castanha',
    type: ResourceType.WOOD,
    tier: 3,
    icon: '🌳'
  },
  {
    id: 'pine',
    name: 'Pinheiro',
    type: ResourceType.WOOD,
    tier: 4,
    icon: '🌲'
  },
  {
    id: 'cedar',
    name: 'Cedro',
    type: ResourceType.WOOD,
    tier: 5,
    icon: '🌲'
  },
  {
    id: 'copper',
    name: 'Cobre',
    type: ResourceType.ORE,
    tier: 2,
    icon: '⛏️'
  },
  {
    id: 'tin',
    name: 'Estanho',
    type: ResourceType.ORE,
    tier: 3,
    icon: '⛏️'
  },
  {
    id: 'iron',
    name: 'Ferro',
    type: ResourceType.ORE,
    tier: 4,
    icon: '⛰️'
  },
  {
    id: 'cotton',
    name: 'Algodão',
    type: ResourceType.FIBER,
    tier: 2,
    icon: '🌿'
  },
  {
    id: 'flax',
    name: 'Linho',
    type: ResourceType.FIBER,
    tier: 3,
    icon: '🌿'
  },
  {
    id: 'thin_leather',
    name: 'Couro Fino',
    type: ResourceType.HIDE,
    tier: 2,
    icon: '🦌'
  },
  {
    id: 'medium_leather',
    name: 'Couro Médio',
    type: ResourceType.HIDE,
    tier: 3,
    icon: '🦬'
  }
]; 