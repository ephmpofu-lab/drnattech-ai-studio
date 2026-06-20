import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/routes/contact";

export const Route = createFileRoute("/de/contact")({
  head: () => ({
    meta: [
      {
        title: "KI-Beratung Wien | Erstgespräch buchen | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "KI-Beratung mit Dr. Ephraim Mpofu — KI-Architekt Wien. Erstgespräch zu Enterprise KI-Projekten, EU KI-Verordnung Compliance, Workflow-Automatisierung und KI-Implementierung im DACH-Raum buchen. Basiert in Wien, Österreich — tätig in der gesamten EU.",
      },
      {
        name: "keywords",
        content:
          "KI Beratung Wien, KI-Architekt buchen, Erstgespräch KI, Enterprise KI Österreich, KI-Verordnung Beratung Wien, KI Implementierung buchen, Dr. Ephraim Mpofu Kontakt, KI-Beratung DACH",
      },
      {
        property: "og:title",
        content: "KI-Beratung Wien | Erstgespräch buchen | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Erstgespräch mit Dr. Ephraim Mpofu, KI-Architekt Wien — Enterprise KI-Projekte, EU KI-Verordnung und KI-Implementierung für DACH-Unternehmen.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/contact" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/contact" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/contact" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/contact" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/contact" },
    ],
  }),
  component: ContactPage,
});
