import { useState } from "react";

import "../styles/index.css";
import { Playlists } from "./playlists";
import { Pagination, Search, Spinner } from "../../shared/ui";
import { usePlaylistsQuery } from "../../shared/hooks/api";

export const PlaylistsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const { playlistsQuery } = usePlaylistsQuery({ currentPage, search });

  if (playlistsQuery.isError) {
    return <div>Error loading playlists</div>;
  }
  if (playlistsQuery.isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <h2>Hello, my playslist</h2>
      <Search onChange={setSearch} value={search} short />
      <Playlists data={playlistsQuery.data?.data} />
      <Pagination
        currentPage={currentPage}
        pageCount={playlistsQuery.data?.meta.pagesCount}
        onPageChangeHandler={setCurrentPage}
      />
    </>
  );
};
