import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@/routes/index";

export const Route = createFileRoute("/de/")({
  head: () => ({
    meta: [
      {
        title: "Dr.Nat.Tech — KI-Lösungsarchitekt | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise-KI-Systeme die in der Produktion funktionieren. Intelligente Automatisierung entwickelt von Dr. Ephraim Mpofu, KI-Lösungsarchitekt.",
      },
      {
        property: "og:title",
        content: "Dr.Nat.Tech — KI-Lösungsarchitekt",
      },
      {
        property: "og:description",
        content: "Enterprise-KI-Systeme die in der Produktion funktionieren.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/" },
    ],
  }),
  component: Home,
});
