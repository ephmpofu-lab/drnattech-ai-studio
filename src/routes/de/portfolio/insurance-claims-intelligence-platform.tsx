import { createFileRoute } from "@tanstack/react-router";
import { InsuranceClaimsPage } from "@/routes/portfolio/insurance-claims-intelligence-platform";

export const Route = createFileRoute(
  "/de/portfolio/insurance-claims-intelligence-platform"
)({
  head: () => ({
    meta: [
      {
        title:
          "Versicherungs-KI System | Betrugserkennung, EU KI-Verordnung Hochrisiko-KI | Wien",
      },
      {
        name: "description",
        content:
          "Enterprise KI-System für Versicherungsschadenbearbeitung: KI-gestützte Betrugserkennung und Betrugsbewertung, EU KI-Verordnung Hochrisiko-KI-Klassifizierung, 70% schnellere Bearbeitungszeit. Mehrstufige Multi-Agenten-Architektur mit vollständigem Audit-Trail und menschlicher Überwachung. Von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      {
        name: "keywords",
        content:
          "Versicherungs-KI Betrugserkennung, EU KI-Verordnung Hochrisiko, Versicherungsschaden Automatisierung, KI Betrugsbewertung, Enterprise KI Versicherung Wien, Multi-Agenten KI Versicherung, Hochrisiko KI Österreich, KI Audit-Trail Versicherung",
      },
      {
        property: "og:title",
        content:
          "Versicherungs-KI System | Betrugserkennung, EU KI-Verordnung Hochrisiko-KI | Wien",
      },
      {
        property: "og:description",
        content:
          "KI-gestützte Betrugserkennung für Versicherungsschäden — EU KI-Verordnung Hochrisiko-KI-konform, 70% schnellere Bearbeitung. Von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://drnattech.com/de/portfolio/insurance-claims-intelligence-platform",
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
        href: "https://drnattech.com/de/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://drnattech.com/de/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
    ],
  }),
  component: InsuranceClaimsPage,
});
