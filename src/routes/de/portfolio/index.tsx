import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/routes/portfolio/index";

export const Route = createFileRoute("/de/portfolio/")({
  head: () => ({
    meta: [
      {
        title: "Portfolio | Enterprise KI-Systeme — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Fallstudien zu Enterprise-KI-Systemen: intelligente Automatisierung, mehrstufige Agenten-Workflows und governance-konforme KI-Architekturen für reale Geschäftsherausforderungen.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/portfolio" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/portfolio" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/portfolio" },
    ],
  }),
  component: PortfolioPage,
});
