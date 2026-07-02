import { createFileRoute } from "@tanstack/react-router";
import { FrameworksPage } from "@/routes/frameworks";

export const Route = createFileRoute("/de/frameworks")({
  component: FrameworksPage,
});
