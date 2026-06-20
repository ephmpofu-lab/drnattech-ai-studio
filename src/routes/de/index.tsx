import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/routes/index";

export const Route = createFileRoute("/de/")({
  head: () => ({
    meta: [
      {
        title: "KI-Architekt Wien | EU KI-Verordnung Beratung | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu (PhD, Dr.nat.techn., BOKU Wien) — KI-Architekt in Wien. Enterprise KI-Systeme, EU KI-Verordnung-konforme Architektur und KI-Implementierung für Unternehmen im DACH-Raum und der EU. KI-Lösungen die in der Produktion funktionieren.",
      },
      {
        name: "keywords",
        content:
          "KI-Architekt Wien, KI-Verordnung Beratung, KI Lösungen Unternehmen, KI Implementierung Österreich, Enterprise KI Systeme, KI-Beratung Wien, DACH KI Architekt, Dr. Ephraim Mpofu, EU KI-Verordnung, KI-Architekt DACH",
      },
      {
        property: "og:title",
        content: "KI-Architekt Wien | EU KI-Verordnung Beratung | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Dr. Ephraim Mpofu (PhD, BOKU Wien) — KI-Architekt in Wien. EU KI-Verordnung-konforme Enterprise KI-Systeme für den DACH-Raum.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/" },
    ],
  }),
  component: Home,
});
