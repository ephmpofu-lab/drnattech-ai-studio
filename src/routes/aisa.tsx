import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { AISAExplorer } from "@/features/aisa-explorer/AISAExplorer";

export const Route = createFileRoute("/aisa")({
  head: () => ({
    meta: [
      {
        title:
          "AI Strategy — AISA Methodology | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Explore AISA — a governance-first, six-phase methodology for designing, building, and operating responsible enterprise AI systems.",
      },
      {
        property: "og:title",
        content: "AI Strategy — AISA | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Six phases from Discovery through Operate &amp; Evolve — 36 structured activities for building and governing enterprise AI systems.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/aisa" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://drnattech.com/aisa" }],
  }),
  component: AISAPage,
});

function AISAPage() {
  return (
    <div style={{ background: "#FAFAF8", minHeight: "100vh" }}>
      <SiteNav active="AISA" />
      <main>
        <AISAExplorer />
      </main>
      <SiteFooter />
    </div>
  );
}
