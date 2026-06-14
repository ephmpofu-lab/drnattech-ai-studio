import { createFileRoute } from "@tanstack/react-router";
import { AcpPage } from "@/routes/portfolio/career-intelligence-operating-system";

export const Route = createFileRoute(
  "/de/portfolio/career-intelligence-operating-system"
)({
  head: () => ({
    meta: [
      {
        title:
          "KI-Karriere-Intelligence-Betriebssystem | KI-Fallstudie — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise-KI-System für intelligente Karriereoptimierung: automatisierte Jobsuche, KI-gestützte Bewerbungsoptimierung, semantisches Matching und mehrstufige n8n-Agenten-Workflows.",
      },
    ],
    links: [
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hrefLang: "de",
        href: "https://drnattech.com/de/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
    ],
  }),
  component: AcpPage,
});
