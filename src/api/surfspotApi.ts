// src\api\surfspotApi.ts

import axios from "axios";
import { SurfSpot } from "shakafront/models/SurfSpot";

// Use env variable for the API base
const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://mobile-surf-back.onrender.com";

export async function fetchSurfSpots(): Promise<SurfSpot[]> {
  const res = await axios.get(`${API_BASE_URL}/api/surfspot/all`);
  return res.data;
}

export async function fetchSurfSpotById(id: string): Promise<SurfSpot> {
  const res = await axios.get(`${API_BASE_URL}/api/surfspot/${id}`);
  return res.data;
}
