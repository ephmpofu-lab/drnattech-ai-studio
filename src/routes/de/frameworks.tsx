import { createFileRoute } from "@tanstack/react-router";
import { FrameworksPage } from "@/routes/frameworks";

export const Route = createFileRoute("/de/frameworks")({
  head: () => ({
    meta: [
      {
        title:
          "KI-Frameworks | AISA, SKAIDO, Wissensarchitektur — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Proprietäre Enterprise-KI-Frameworks: AISA, SKAIDO, Wissensarchitektur und Vier-Workflow-Schichten. Strukturierte Methoden für skalierbare, governance-konforme KI-Systeme.",
      },
    ],
    links: [
      { rel: "alternate", hrefLang: "en", href: "https://drnattech.com/frameworks" },
      { rel: "alternate", hrefLang: "de", href: "https://drnattech.com/de/frameworks" },
      { rel: "alternate", hrefLang: "x-default", href: "https://drnattech.com/frameworks" },
    ],
  }),
  component: FrameworksPage,
});
