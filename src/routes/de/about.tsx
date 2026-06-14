import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/routes/about";

export const Route = createFileRoute("/de/about")({
  head: () => ({
    meta: [
      {
        title:
          "Über Dr. Ephraim Mpofu | KI-Lösungsarchitekt — Dr.Nat.Tech",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu ist KI-Lösungsarchitekt, Forscher und Systemdenker mit Schwerpunkt Enterprise-KI-Architektur, intelligente Automatisierung und KI-Governance.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/about" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/about" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/about" },
    ],
  }),
  component: AboutPage,
});
