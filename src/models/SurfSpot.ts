// src\models\SurfSpot.ts

export interface SurfSpot {
  surfSpotId: string;
  destination: string;
  address: string;
  stateCountry?: string | null;
  difficultyLevel?: number | null;
  peakSeasonBegin?: string | null; // ISO date string
  peakSeasonEnd?: string | null;
  magicSeaweedLink?: string | null;
  createdTime?: string | null;
  geocodeRaw?: string | null;
  photoUrls: string[];
  breakTypes: string[];
  influencers: string[];
}
