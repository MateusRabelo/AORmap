export type ResourceTier = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export enum ResourceType {
  WOOD = 'wood',
  ORE = 'ore',
  FIBER = 'fiber',
  HIDE = 'hide',
  ROCK = 'rock'
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  tier: ResourceTier;
  icon: string;
}

export interface ResourceMarker {
  id: string;
  resourceId: string;
  position: [number, number]; // [lat, lng]
  addedBy?: string;
  addedOn: Date;
  public: boolean;
}

export interface MapFilter {
  types: ResourceType[];
  tiers: ResourceTier[];
} 