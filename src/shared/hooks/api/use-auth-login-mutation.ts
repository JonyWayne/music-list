import { useMutation, useQueryClient } from "@tanstack/react-query";

import { callbackUrl } from "../../constants.ts/index.ts";
import { client } from "../../api/client.ts";

export const useAuthLoginMutation = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      console.log(code, "code");

      const response = await client.POST("/auth/login", {
        body: {
          code: code,
          redirectUri: callbackUrl,
          rememberMe: true,
          accessTokenTTL: "1d",
        },
      });
      if (response.error) return console.log("Ошибка получения данных");
      return response.data;
    },
    onSuccess: async (data) => {
      if (data && "refreshToken" && "accessToken" in data) {
        localStorage.setItem("music-fun-refreshToken", data.refreshToken);
        localStorage.setItem("music-fun-accessToken", data.accessToken);
        // Инвалидируем значения, сбрасываем кэш для повторного вызова функции авторизации
        await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });

        await queryClient.invalidateQueries();
      }
    },
  });

  return {
    loginMutation,
  };
};
