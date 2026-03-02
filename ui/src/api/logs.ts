import axios from "axios";
import type { LogsResponse } from "../types/api";
import type { Logrange } from "../types/log";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});
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
