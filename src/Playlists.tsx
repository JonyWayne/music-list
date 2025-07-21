import type { SchemaPlaylistListItemJsonApiData } from "./shared/api/schema";

interface PlaylistsProps {
  data?: SchemaPlaylistListItemJsonApiData[];
}

export const Playlists: React.FC<PlaylistsProps> = ({ data }) => {
  return (
    <ul>
      {data?.map((playlist) => (
        <li key={playlist.id}>{playlist.attributes.title}</li>
      ))}
    </ul>
  );
};
