import { createFileRoute } from "@tanstack/react-router";
import { AIAgentPage } from "@/routes/ai-agent";

export const Route = createFileRoute("/de/ai-agent")({
  component: AIAgentPage,
});
