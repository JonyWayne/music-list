import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui";
import { AccountBar } from "../features";

export const RootLayout = createRootRoute({
  component: () => (
    <>
      <Header renderAccountBar={() => <AccountBar />} />
      <Outlet />
    </>
  ),
});
