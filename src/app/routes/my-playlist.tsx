import { createFileRoute } from "@tanstack/react-router";
import { MyPlaylists } from "../pages/my-playlist-pages";

export const Route = createFileRoute("/my-playlist")({
  component: MyPlaylists,
});
