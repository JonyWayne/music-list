import { Navigate } from "@tanstack/react-router";

import { Playlists } from "@/app/features";
import { useMeQuery } from "@/shared/hooks/api/use-me.query";
import { usePlaylistsQuery } from "@/shared/hooks/api";

export const MyPlaylists = () => {
  const { data, isLoading } = useMeQuery();
  const { playlistsQuery } = usePlaylistsQuery();

  if (isLoading) return <span>loading...</span>;

  if (!data) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <h2>My playlist</h2>
      <Playlists data={playlistsQuery.data?.data} />
    </>
  );
};
