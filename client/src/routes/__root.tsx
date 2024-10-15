import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeToggle } from "../components/ThemeToggle";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 sm:top-6 md:top-8 lg:top-10 right-4 sm:right-6 md:right-8 lg:right-10 z-50">
        <ThemeToggle />
      </div>
      <Outlet />
    </div>
  ),
});
