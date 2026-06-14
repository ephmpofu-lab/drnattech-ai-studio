import { createFileRoute } from "@tanstack/react-router";
import { AIAgentPage } from "@/routes/ai-agent";

export const Route = createFileRoute("/de/ai-agent")({
  head: () => ({
    meta: [
      {
        title: "KI-Agent | Enterprise Automatisierung — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Entdecken Sie Enterprise-KI-Agenten, die komplexe Geschäftsprozesse automatisieren — von intelligenter Dokumentenverarbeitung bis hin zu mehrstufigen Entscheidungsworkflows.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/ai-agent" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/ai-agent" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/ai-agent" },
    ],
  }),
  component: AIAgentPage,
});
