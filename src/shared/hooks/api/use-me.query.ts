import { useQuery } from "@tanstack/react-query";

import { authKey } from "@/shared/common";
import { client } from "../../api/client.ts";

export const useMeQuery = () => {
  return useQuery({
    queryKey: [authKey],
    queryFn: async () => {
      const response = await client.GET("/auth/me");
      return response.data;
    },
  });
};
