import { useQuery } from "@tanstack/react-query";

import { client } from "../../api/client.ts";

interface UsePlaylistsQueryProps {
  currentPage: number;
  search: string;
}

export const usePlaylistsQuery = (props: UsePlaylistsQueryProps) => {
  const { currentPage, search } = props;

  const playlistsQuery = useQuery({
    queryKey: ["playlists", { currentPage, search }],
    queryFn: async ({ signal }) => {
      const response = await client.GET("/playlists", {
        params: {
          query: {
            pageNumber: currentPage,
            search: search,
          },
        },
        signal,
      });
      return response.data;
    },
  });

  return {
    playlistsQuery,
  };
};
