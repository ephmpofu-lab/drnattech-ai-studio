import { createFileRoute } from "@tanstack/react-router";
import { InsuranceClaimsPage } from "@/routes/portfolio/insurance-claims-intelligence-platform";

export const Route = createFileRoute(
  "/de/portfolio/insurance-claims-intelligence-platform"
)({
  head: () => ({
    meta: [
      {
        title:
          "Versicherungsschaden-Intelligence-Plattform | KI-Fallstudie — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise-KI-System zur Automatisierung der Versicherungsschadenbearbeitung: mehrstufige n8n-Workflows, GPT-4o-Dokumentenanalyse, strukturierte Ausgaben und Governance-Architektur.",
      },
    ],
    links: [
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hrefLang: "de",
        href: "https://drnattech.com/de/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
    ],
  }),
  component: InsuranceClaimsPage,
});
