import axios from "axios";

const API_KEY = import.meta.env.VITE_LEET_COACH_API_KEY;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});
