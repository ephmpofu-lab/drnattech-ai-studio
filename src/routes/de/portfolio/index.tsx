import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/routes/portfolio/index";

export const Route = createFileRoute("/de/portfolio/")({
  head: () => ({
    meta: [
      {
        title:
          "KI-Systeme Portfolio Wien | Versicherungs-KI, RAG, Workflow-Automatisierung | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Portfolio von Enterprise KI-Systemen von Dr. Ephraim Mpofu, KI-Architekt Wien: Versicherungs-KI mit KI-gestützter Betrugserkennung, KI-Karrieresystem mit Lebenslauf KI-Analyse (DSGVO-konform), RAG Wissensarchitektur mit Pinecone und Supabase. EU KI-Verordnung-konforme Architektur für DACH-Unternehmen.",
      },
      {
        name: "keywords",
        content:
          "KI Systeme Wien Portfolio, Versicherungs-KI Betrugserkennung, RAG System Implementierung, Workflow Automatisierung KI, KI Implementierung Österreich, Lebenslauf KI Analyse, DSGVO-konforme KI, EU KI-Verordnung Portfolio, Multi-Agenten KI DACH",
      },
      {
        property: "og:title",
        content:
          "KI-Systeme Portfolio Wien | Versicherungs-KI, RAG, Workflow-Automatisierung | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Enterprise KI-Systeme von Dr. Ephraim Mpofu, KI-Architekt Wien: Versicherungs-KI, KI-Karrieresystem, RAG Wissensarchitektur. EU KI-Verordnung-konform.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/portfolio/" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/portfolio/" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/portfolio" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/portfolio/" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/portfolio" },
    ],
  }),
  component: PortfolioPage,
});
