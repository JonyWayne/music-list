import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_APP_API_KEY;

const authMiddleware: Middleware = {
  onRequest({ request }) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers.set("Authorization", "Bearer " + accessToken);
    }

    return request;
  },
  onResponse({ response }) {
    if (!response.ok) {
      // Общая ошибка при запросах к серверу
      throw new Error(
        `${response.url}: ${response.status} ${response.statusText}`
      );
    }
  },
};

export const client = createClient<paths>({
  baseUrl: baseUrl,
  headers: {
    "api-key": apiKey,
  },
});

client.use(authMiddleware);
