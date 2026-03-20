import axios from "axios";
import type { LogsResponse } from "../types/api";
import type { Logrange } from "../types/log";
import { supabase } from "../lib/supabase";

const API = axios.create({
  // baseURL:"/api/v1/logs"
  baseURL: import.meta.env.VITE_API_URL,
});
API.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
export default API;

interface Fetchparams {
  page: number;
  limit: number;
  level?: string;
  search?: string;
  service?: string;
  range?: Logrange;
  start?: string;
  end?: string;
}
export const fetchlogs = async (params: Fetchparams, signal?: AbortSignal) => {
  const cleanedparams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== "" && value !== undefined && value !== null,
    ),
  );
  console.log("FETCH PARAMS:", params);
  const response = await API.get<LogsResponse>("/logs", {
    params: cleanedparams,
    signal,
  });
  return response.data;
};
