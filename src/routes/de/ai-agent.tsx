import { createFileRoute } from "@tanstack/react-router";
import { AIAgentPage } from "@/routes/ai-agent";

export const Route = createFileRoute("/de/ai-agent")({
  head: () => ({
    meta: [
      {
        title: "KI-Berater Agent | 24/7 KI-Experte Online | Dr. Ephraim Mpofu Wien",
      },
      {
        name: "description",
        content:
          "Fragen Sie den KI-Berater-Agenten von Dr. Ephraim Mpofu — kostenlos, 24/7, ohne Registrierung. Einer der wenigen öffentlich zugänglichen KI-Agenten eines unabhängigen KI-Architekten weltweit. Fragen zu SKAIDO, AISA, RAG-Systemen, EU KI-Verordnung und Enterprise KI-Implementierung im DACH-Raum.",
      },
      {
        name: "keywords",
        content:
          "KI-Agent Wien, KI-Berater online, Enterprise KI Berater, KI-Verordnung Fragen, SKAIDO Framework, AISA Framework, KI-Architekt Wien Agent, RAG System Implementierung, KI-Beratung kostenlos, KI Experte Wien",
      },
      {
        property: "og:title",
        content: "KI-Berater Agent | 24/7 KI-Experte Online | Dr. Ephraim Mpofu Wien",
      },
      {
        property: "og:description",
        content:
          "Kostenloser KI-Berater-Agent von Dr. Ephraim Mpofu — KI-Architekt Wien. 24/7 verfügbar ohne Registrierung. Fragen zu Enterprise KI, SKAIDO, RAG und EU KI-Verordnung.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/ai-agent" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/ai-agent" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/ai-agent" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/ai-agent" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/ai-agent" },
    ],
  }),
  component: AIAgentPage,
});
