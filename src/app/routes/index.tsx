import { createFileRoute } from "@tanstack/react-router";
import { PaginatedPageList } from "../features";

export const Route = createFileRoute("/")({
  component: PaginatedPageList,
});
