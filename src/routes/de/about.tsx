import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/routes/about";

export const Route = createFileRoute("/de/about")({
  head: () => ({
    meta: [
      {
        title:
          "Dr. Ephraim Mpofu | KI-Architekt Wien | SKAIDO Framework | KI-Verordnung Experte",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu (PhD, Dr.nat.techn., BOKU Wien) ist KI-Architekt in Wien. Entwickler des SKAIDO, AISA und Drei Strukturgesetze Frameworks. Experte für EU KI-Verordnung-konforme Enterprise KI-Systeme im DACH-Raum. KI-Aufbau seit Januar 2026.",
      },
      {
        name: "keywords",
        content:
          "Dr. Ephraim Mpofu, KI-Architekt Wien, SKAIDO Framework, AISA Framework, KI-Verordnung Experte, Enterprise KI Wien, BOKU Wien Promotion, Drei Strukturgesetze, Wissensarchitektur, KI-Architekt Österreich, KI-Implementierung DACH",
      },
      {
        property: "og:title",
        content:
          "Dr. Ephraim Mpofu | KI-Architekt Wien | SKAIDO Framework | KI-Verordnung Experte",
      },
      {
        property: "og:description",
        content:
          "Dr. Ephraim Mpofu (PhD, Dr.nat.techn., BOKU Wien) — KI-Architekt in Wien. Entwickler des SKAIDO- und AISA-Frameworks. EU KI-Verordnung Experte für DACH-Unternehmen.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://drnattech.com/de/about" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/about" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/about" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/about" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/about" },
    ],
  }),
  component: AboutPage,
});
