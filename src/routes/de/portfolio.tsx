import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/de/portfolio")({
  component: () => <Outlet />,
});
