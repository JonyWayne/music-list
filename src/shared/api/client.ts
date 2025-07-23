import createClient, { type Middleware } from "openapi-fetch";
import type { paths } from "./schema";

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
  baseUrl: "https://musicfun.it-incubator.app/api/1.0/",
  headers: {
    "api-key": "b7f59546-4e45-4371-96e4-e245541b819f",
  },
});

client.use(authMiddleware);
