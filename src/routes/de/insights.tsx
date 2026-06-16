import { createFileRoute } from "@tanstack/react-router";
import { InsightsPage } from "@/routes/insights";

export const Route = createFileRoute("/de/insights")({
  head: () => ({
    meta: [
      {
        title: "KI-Einblicke | EU KI-Verordnung, RAG-Systeme, KI-Implementierung | Wien",
      },
      {
        name: "description",
        content:
          "Fachartikel und Einblicke zu Enterprise KI-Architektur: Was bedeutet die EU KI-Verordnung für Unternehmen? Wie verhindert RAG KI-Halluzinationen? Workflow-Automatisierung, KI-Governance und strukturierte KI-Implementierung für DACH-Organisationen. Von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      {
        name: "keywords",
        content:
          "EU KI-Verordnung Unternehmen, RAG KI-Halluzinationen, KI-Implementierung DACH, Workflow Automatisierung KI, KI-Governance Österreich, RAG System Implementierung, Enterprise KI Architektur Wien, KI-Einblicke DACH",
      },
      {
        property: "og:title",
        content: "KI-Einblicke | EU KI-Verordnung, RAG-Systeme, KI-Implementierung | Wien",
      },
      {
        property: "og:description",
        content:
          "EU KI-Verordnung, RAG-Systeme, Workflow-Automatisierung — Fachartikel von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/insights" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/insights" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/insights" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/insights" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/insights" },
    ],
  }),
  component: InsightsPage,
});
