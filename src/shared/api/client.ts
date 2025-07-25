import createClient, { type Middleware } from "openapi-fetch";

import type { paths } from "./schema";
import { localStorageKeys, API_KEY, BASE_URL } from "../common";

/* ------------------------------------------------------------------ */
/* 2.  Mutex для refresh-а                                             */
/* ------------------------------------------------------------------ */
let refreshPromise: Promise<string> | null = null;

const makeRefreshToken = (): Promise<string> => {
  if (!refreshPromise) {
    // 1) создаём «замок» сразу
    refreshPromise = (async (): Promise<string> => {
      const refreshToken = await localStorage.getItem(
        localStorageKeys.refreshToken
      );
      if (!refreshToken) throw new Error("No refresh token");

      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "API-KEY": API_KEY,
        },
        body: JSON.stringify({ refreshToken }),
      });
      if (res.status !== 201) {
        localStorage.removeItem(localStorageKeys.refreshToken);
        localStorage.removeItem(localStorageKeys.accessToken);
        throw new Error("Refresh failed");
      }

      const { accessToken, refreshToken: newRT } = await res.json();
      localStorage.setItem(localStorageKeys.refreshToken, newRT);
      localStorage.setItem(localStorageKeys.accessToken, accessToken);

      return accessToken;
    })().finally(() => {
      refreshPromise = null; // 2) снимаем «замок»
    });
  }

  return refreshPromise;
};

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const accessToken = localStorage.getItem(localStorageKeys.accessToken);
    if (accessToken) {
      request.headers.set("Authorization", "Bearer " + accessToken);
    }
    //@ts-expect-error hot fix
    request._retryRequest = request.clone();
    return request;
  },
  async onResponse({ request, response }) {
    if (response.ok) return response;
    if (!response.ok && response.status !== 401) {
      // Общая ошибка при запросах к серверу
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`
      );
    }
    try {
      await makeRefreshToken();
      const newRT = localStorage.getRefreshToken(localStorageKeys.refreshToken);

      //@ts-expect-error hot fix
      const originalRequest: Request = request._retryRequest;
      const retryRequest = new Request(originalRequest, {
        headers: new Headers(originalRequest.headers),
      });
      retryRequest.headers.set("Authorization", "Bearer " + newRT);
      return fetch(retryRequest);
    } catch {
      return response;
    }
  },
};

export const client = createClient<paths>({
  baseUrl: BASE_URL,
  headers: {
    "api-key": API_KEY,
  },
});

client.use(authMiddleware);
