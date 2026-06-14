import { createFileRoute } from "@tanstack/react-router";
import { PublicationsPage } from "@/routes/publications";

export const Route = createFileRoute("/de/publications")({
  head: () => ({
    meta: [
      {
        title: "Publikationen | Forschung & Veröffentlichungen — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Forschungsarbeiten, Veröffentlichungen und akademische Beiträge von Dr. Ephraim Mpofu zu Enterprise-KI, Systemarchitektur und intelligenter Automatisierung.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/publications" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/publications" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/publications" },
    ],
  }),
  component: PublicationsPage,
});
