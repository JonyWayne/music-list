import { useState } from "react";

import "../styles/index.css";
import { client } from "../../shared/api/client";
import { useQuery } from "@tanstack/react-query";
import { Playlists } from "./playlists";
import { Pagination, Search, Spinner } from "../../shared/ui";

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const query = useQuery({
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

  if (query.isError) {
    return <div>Error loading playlists</div>;
  }
  if (query.isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h2>Hello, my playslist</h2>
      <Search onChange={setSearch} value={search} short />
      <Playlists data={query.data?.data} />
      <Pagination
        currentPage={currentPage}
        pageCount={query.data?.meta.pagesCount}
        onPageChangeHandler={setCurrentPage}
      />
    </>
  );
};
