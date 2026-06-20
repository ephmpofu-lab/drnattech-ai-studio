import { createFileRoute } from "@tanstack/react-router";
import { AcpPage } from "@/routes/portfolio/career-intelligence-operating-system";

export const Route = createFileRoute(
  "/de/portfolio/career-intelligence-operating-system"
)({
  head: () => ({
    meta: [
      {
        title:
          "KI-Karriere System | Lebenslauf KI-Analyse, DSGVO-konform | Wien",
      },
      {
        name: "description",
        content:
          "Mehrstufiges KI-System für Karriereoptimierung von Dr. Ephraim Mpofu, KI-Architekt Wien: KI-gestützte Lebenslauf KI-Analyse und CV-Intelligence-Extraktion, DSGVO-konforme Verarbeitung persönlicher CV-Daten, 85% schnellere Bewerbungsoptimierung, 3× höhere Interviewrate. Multi-Agenten-Workflow-Automatisierung für den DACH-Arbeitsmarkt.",
      },
      {
        name: "keywords",
        content:
          "Lebenslauf KI Analyse, DSGVO-konforme KI, Karriere KI System, CV-Analyse Wien, KI Bewerbungsoptimierung, Multi-Agenten KI DACH, KI Jobsuche Österreich, Lebenslauf KI DACH, KI Karriere Automatisierung",
      },
      {
        property: "og:title",
        content:
          "KI-Karriere System | Lebenslauf KI-Analyse, DSGVO-konform | Wien",
      },
      {
        property: "og:description",
        content:
          "KI-gestützte Lebenslauf KI-Analyse, DSGVO-konform, 85% schnellere Bewerbungsoptimierung. Multi-Agenten KI-System von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://drnattech.com/de/portfolio/career-intelligence-operating-system",
      },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://drnattech.com/de/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://drnattech.com/de/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
    ],
  }),
  component: AcpPage,
});
