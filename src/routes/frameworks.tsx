import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/frameworks")({
  head: () => ({
    meta: [
      {
        title:
          "AI Frameworks | AISA (AI Solutions Architecture), Three Structural Laws | KI-Implementierung Wien — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Proprietary enterprise AI frameworks by Dr. Ephraim Mpofu, KI-Architekt Vienna: AISA — AI Solutions Architecture (6-phase implementation methodology), Three Structural Laws (architectural principles preventing AI failure) and Knowledge Architecture (enterprise RAG system design). Structured AI implementation methodology for DACH and EU organisations.",
      },
      {
        name: "keywords",
        content:
          "AISA Framework, AI Solutions Architecture, Three Structural Laws, Knowledge Architecture, AI implementation methodology, KI-Frameworks Wien, enterprise AI methodology, RAG system design, EU AI Act framework, KI-Implementierung Österreich",
      },
      { property: "og:title", content: "AISA — AI Solutions Architecture & Proprietary AI Frameworks | Dr. Ephraim Mpofu Vienna" },
      { property: "og:description", content: "Four proprietary enterprise AI frameworks by Dr. Ephraim Mpofu — AISA (AI Solutions Architecture), Three Structural Laws, Four Workflow Layers and Knowledge Architecture." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/frameworks" },
      { property: "og:image", content: "https://drnattech.com/images/Dr_Mpofu_purple-removebg-preview.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/frameworks" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/frameworks" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de/frameworks" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/frameworks" },
    ],
  }),

  component: FrameworksPage,
});

function FrameworksStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": "https://drnattech.com/frameworks#termset",
        name: "Dr. Ephraim Mpofu Proprietary AI Frameworks",
        description:
          "A collection of proprietary enterprise AI frameworks developed by Dr. Ephraim Mpofu, KI-Architekt Vienna.",
        url: "https://drnattech.com/frameworks",
        author: { "@id": "https://drnattech.com/#person" },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export function FrameworksPage() {
  const frameworks = [
    {
      title: "AISA — AI Solutions Architecture",
      description:
        "A proprietary 6-phase AI implementation methodology: problem definition, potential analysis, make-or-buy assessment, governance integration, deployment and evaluation. Grounded in software engineering principles and governance science developed through doctoral research — giving organisations a repeatable, auditable path from AI strategy to production system with compliance built in from phase one.",
      link: "/aisa",
      available: true,
    },
    {
      title: "Three Structural Laws",
      description:
        "Foundational principles for designing scalable, maintainable and production-ready AI systems.",
      link: "/frameworks-three-structural-laws",
      available: true,
    },
    {
      title: "Knowledge Architecture Operating System",
      description:
        "Four-workflow architecture for enterprise knowledge acquisition, intelligence, indexing and governance.",
      link: "/frameworks-kaos",
      available: false,
    },
    {
      title: "Enterprise Multi-Agent Framework",
      description:
        "Design framework for autonomous agents, orchestration layers, memory systems and governance.",
      link: "/frameworks-multi-agent",
      available: false,
    },
    {
      title: "RAG Governance Framework",
      description:
        "Production methodology for retrieval, evaluation, indexing, monitoring and AI knowledge governance.",
      link: "/frameworks-rag-governance",
      available: false,
    },
  ];

  return (
    <div
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <FrameworksStructuredData />
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-20">
        {/* HERO */}
        <section className="pt-16 pb-12">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: "#34506E" }}>
            Proprietary Frameworks
          </div>

          <h1 className="mt-6 text-[48px] font-medium leading-tight lg:text-[64px]" style={{ color: "#1F2125" }}>
            The Systems Behind
            <br />
            <span className="text-gradient-brand">
              Every AI Solution
            </span>
          </h1>

          <p
            className="mt-6 max-w-3xl text-[16px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            A collection of frameworks, methodologies and operating
            systems developed through real-world AI architecture,
            automation and enterprise implementation projects.
          </p>
        </section>

        {/* FRAMEWORKS GRID */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {frameworks.map((framework) => (
            <div
              key={framework.title}
              className="glass-card p-6"
            >
              <div
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "#8A8D93" }}
              >
                Framework
              </div>

              <h3 className="mt-3 text-[24px] font-medium" style={{ color: "#1F2125" }}>
                {framework.title}
              </h3>

              <p
                className="mt-3 text-[14px] leading-[1.7]"
                style={{ color: "#5A5D63" }}
              >
                {framework.description}
              </p>

              {framework.available ? (
                <Link
                  to={framework.link}
                  className="mt-6 inline-flex rounded-lg px-4 py-2 text-[13px] font-semibold transition-all hover:opacity-80"
                  style={{
                    border: "1px solid #D7D4CC",
                    color: "#1F2125",
                  }}
                >
                  Learn More →
                </Link>
              ) : (
                <button
                  className="mt-6 rounded-lg px-4 py-2 text-[13px] font-semibold"
                  style={{
                    border: "1px solid #E3E1DA",
                    color: "#8A8D93",
                  }}
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="mt-10">
          <div className="glass-card p-8">
            <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
              Interested in Applying These Frameworks?
            </h2>

            <p
              className="mt-4 max-w-2xl text-[15px] leading-[1.7]"
              style={{ color: "#5A5D63" }}
            >
              Explore the projects, systems and case studies where
              these frameworks have been applied to real-world AI
              implementations.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/portfolio"
                className="rounded-lg px-5 py-3 text-[14px] font-semibold transition-all hover:opacity-80"
                style={{
                  background: "#34506E",
                  color: "#FAFAF8",
                }}
              >
                View Portfolio
              </Link>

              <Link
                to="/ai-agent"
                className="rounded-lg px-5 py-3 text-[14px] font-semibold transition-all hover:opacity-80"
                style={{
                  border: "1px solid #D7D4CC",
                  color: "#1F2125",
                }}
              >
                Ask My AI Agent
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
