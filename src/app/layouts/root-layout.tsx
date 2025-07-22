import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Header } from "../../shared/ui";

export const RootLayout = createRootRoute({
  component: () => (
    <>
      <Header renderAccountBar={() => <>About user</>} />
      <Outlet />
    </>
  ),
});
