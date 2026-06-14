import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/routes/contact";

export const Route = createFileRoute("/de/contact")({
  head: () => ({
    meta: [
      {
        title: "Kontakt | Dr. Ephraim Mpofu — KI-Lösungsarchitekt",
      },
      {
        name: "description",
        content:
          "Nehmen Sie Kontakt mit Dr. Ephraim Mpofu auf, um Enterprise-KI-Projekte zu besprechen, eine Zusammenarbeit zu erkunden oder ein Erstgespräch zu buchen.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/contact" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/contact" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/contact" },
    ],
  }),
  component: ContactPage,
});
