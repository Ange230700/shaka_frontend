// src/services/http.ts
import axios from 'axios';
export const API_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'https://mobile-surf-back.onrender.com';
const http = axios.create({ baseURL: API_URL, timeout: 15000 });
export default http;
