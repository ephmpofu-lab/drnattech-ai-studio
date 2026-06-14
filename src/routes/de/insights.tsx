import { createFileRoute } from "@tanstack/react-router";
import { InsightsPage } from "@/routes/insights";

export const Route = createFileRoute("/de/insights")({
  head: () => ({
    meta: [
      {
        title: "Einblicke | Enterprise KI & Architektur — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Einblicke und Perspektiven zu Enterprise-KI-Architektur, Workflow-Automatisierung, KI-Governance und intelligenten Systemdesigns.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/insights" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/insights" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/insights" },
    ],
  }),
  component: InsightsPage,
});
