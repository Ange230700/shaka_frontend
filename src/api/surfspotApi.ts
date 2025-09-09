// src\api\surfspotApi.ts

import http from 'shakafront/services/http';
import { SurfSpot } from 'shakafront/models/SurfSpot';

export async function fetchSurfSpots(): Promise<SurfSpot[]> {
  const { data } = await http.get('/surfspot/all');
  return data;
}
export async function fetchSurfSpotById(id: string): Promise<SurfSpot> {
  const { data } = await http.get(`/surfspot/${id}`);
  return data;
}
