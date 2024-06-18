import { apiUrl } from "./api";
import { LocalStorage } from "../utils/types";

type FetchType = typeof fetch;

export const authFetch: FetchType = (url, options) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') as string) as LocalStorage

  const token = userInfo ? userInfo.token : '';

  return fetch(apiUrl(url as string), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`,
      ...options?.headers ?? []
    },
    ...options
  })
}