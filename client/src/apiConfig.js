// Centralized API configuration for Development and Production (Vercel / Render / Railway)
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3001").replace(/\/+$/, "");

export default API_URL;
