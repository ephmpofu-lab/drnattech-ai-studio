import { createFileRoute } from "@tanstack/react-router";
import { FrameworksPage } from "@/routes/frameworks";

export const Route = createFileRoute("/de/frameworks")({
  head: () => ({
    meta: [
      {
        title:
          "KI-Frameworks | SKAIDO, AISA, Wissensarchitektur | KI-Implementierung Wien",
      },
      {
        name: "description",
        content:
          "Proprietäre Enterprise KI-Frameworks von Dr. Ephraim Mpofu: SKAIDO (sechsphasige KI-Implementierungsmethodik: Scope, Knowledge, Architecture, Implementation, Deployment, Optimisation), AISA (strategisches KI-Engagement-Framework), Drei Strukturgesetze und Wissensarchitektur mit RAG. Strukturierte KI-Implementierung für DACH-Unternehmen.",
      },
      {
        name: "keywords",
        content:
          "SKAIDO Framework, AISA Framework, Wissensarchitektur, KI-Implementierung Wien, KI-Frameworks DACH, RAG System Implementierung, Enterprise KI Methodik, Drei Strukturgesetze, KI-Architekt Wien, EU KI-Verordnung Methodik",
      },
      {
        property: "og:title",
        content:
          "KI-Frameworks | SKAIDO, AISA, Wissensarchitektur | KI-Implementierung Wien",
      },
      {
        property: "og:description",
        content:
          "SKAIDO, AISA, Drei Strukturgesetze und Wissensarchitektur — proprietäre Enterprise KI-Frameworks von Dr. Ephraim Mpofu, KI-Architekt Wien.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/de/frameworks" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/de/frameworks" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/frameworks" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/frameworks" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/frameworks" },
    ],
  }),
  component: FrameworksPage,
});
