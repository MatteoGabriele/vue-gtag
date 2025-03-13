import * as api from "../api";

export type UseGtagReturn = typeof api;

export default function useGtag(): UseGtagReturn {
  return api;
}
