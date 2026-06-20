import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/frameworks")({
  head: () => ({
    meta: [
      {
        title:
          "KI-Frameworks | SKAIDO, AISA, Wissensarchitektur | KI-Implementierung Wien — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Proprietary enterprise AI frameworks by Dr. Ephraim Mpofu, KI-Architekt Vienna: SKAIDO (six-phase AI implementation methodology), AISA (strategic AI engagement framework), Three Structural Laws (architectural principles preventing AI failure) and Knowledge Architecture (enterprise RAG system design). Structured AI implementation methodology for DACH and EU organisations.",
      },
      {
        name: "keywords",
        content:
          "SKAIDO Framework, AISA Framework, Three Structural Laws, Knowledge Architecture, AI implementation methodology, KI-Frameworks Wien, enterprise AI methodology, RAG system design, EU AI Act framework, KI-Implementierung Österreich",
      },
      { property: "og:title", content: "SKAIDO, AISA & Knowledge Architecture | Proprietary AI Frameworks | Dr. Ephraim Mpofu Vienna" },
      { property: "og:description", content: "Five proprietary enterprise AI frameworks by Dr. Ephraim Mpofu — SKAIDO, AISA, Three Structural Laws, Four Workflow Layers and Knowledge Architecture." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/frameworks" },
      { property: "og:image", content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp" },
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
          "A collection of proprietary enterprise AI frameworks developed by Dr. Ephraim Mpofu, KI-Architekt Vienna. Each framework addresses a specific layer of enterprise AI implementation.",
        url: "https://drnattech.com/frameworks",
        author: { "@id": "https://drnattech.com/#person" },
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://drnattech.com/frameworks#skaido",
        name: "SKAIDO Framework",
        alternateName: "SKAIDO AI Implementation Methodology",
        description:
          "The SKAIDO Framework is a six-phase enterprise AI implementation methodology developed by Dr. Ephraim Mpofu: Scope (define business problem and success metrics), Knowledge (map data assets and knowledge gaps), Architecture (design AI system and agent roles), Implementation (build components and integrations), Deployment (release to production with governance), and Optimisation (measure outcomes and scale). Designed to reduce AI project failure rates and ensure EU AI Act compliance from day one.",
        inDefinedTermSet: { "@id": "https://drnattech.com/frameworks#termset" },
        url: "https://drnattech.com/frameworks-skaido",
        author: { "@id": "https://drnattech.com/#person" },
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://drnattech.com/frameworks#aisa",
        name: "AISA Framework",
        alternateName: "AI Systems Architecture Strategic Engagement Framework",
        description:
          "The AISA Framework is Dr. Ephraim Mpofu's proprietary strategic AI engagement model — structuring how organisations move from AI ambiguity to deployed, governed AI systems with measurable business outcomes. AISA governs the full client engagement lifecycle, from discovery and architecture design through to production delivery and post-deployment optimisation.",
        inDefinedTermSet: { "@id": "https://drnattech.com/frameworks#termset" },
        url: "https://drnattech.com/aisa",
        author: { "@id": "https://drnattech.com/#person" },
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://drnattech.com/frameworks#three-structural-laws",
        name: "Three Structural Laws",
        alternateName: "Three Structural Laws of Enterprise AI Architecture",
        description:
          "The Three Structural Laws are Dr. Ephraim Mpofu's foundational architectural principles for designing enterprise AI systems that are robust, auditable and resistant to silent failure. Each law addresses a different structural failure mode common in production AI deployments — governing data integrity, system observability and governance-by-design.",
        inDefinedTermSet: { "@id": "https://drnattech.com/frameworks#termset" },
        url: "https://drnattech.com/frameworks-three-structural-laws",
        author: { "@id": "https://drnattech.com/#person" },
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://drnattech.com/frameworks#knowledge-architecture",
        name: "Knowledge Architecture",
        alternateName: "Enterprise Knowledge Architecture Operating System",
        description:
          "Knowledge Architecture is Dr. Ephraim Mpofu's methodology for designing enterprise knowledge systems — covering knowledge acquisition, retrieval-augmented generation (RAG), semantic vector indexing with Pinecone and Supabase, and governance. It enables AI systems to retrieve accurate, contextual and trusted information from organisational knowledge bases, preventing hallucination through structured retrieval architecture.",
        inDefinedTermSet: { "@id": "https://drnattech.com/frameworks#termset" },
        url: "https://drnattech.com/frameworks",
        author: { "@id": "https://drnattech.com/#person" },
      },
      {
        "@type": "HowTo",
        "@id": "https://drnattech.com/frameworks#skaido-howto",
        name: "How to Implement Enterprise AI Using the SKAIDO Framework",
        description:
          "The SKAIDO Framework provides a six-phase structured methodology for implementing enterprise AI systems — from business problem definition to production deployment and ongoing optimisation.",
        author: { "@id": "https://drnattech.com/#person" },
        totalTime: "P6W",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Scope",
            text: "Define the business problem, objectives, success metrics, constraints and EU AI Act risk classification. Establish what the AI system must achieve and what governance requirements apply.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Knowledge",
            text: "Map existing knowledge assets, data sources, knowledge gaps and retrieval requirements. Design the knowledge architecture and RAG strategy if required.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Architecture",
            text: "Design the AI system architecture — agent roles, orchestration logic, integration points, audit trail design, governance layers and human-in-the-loop mechanisms.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Implementation",
            text: "Build the AI system components, multi-agent workflows, integrations, knowledge retrieval pipelines and governance instrumentation.",
          },
          {
            "@type": "HowToStep",
            position: 5,
            name: "Deployment",
            text: "Deploy to production with monitoring, automated testing, audit trail activation and stakeholder handover. Validate EU AI Act compliance documentation.",
          },
          {
            "@type": "HowToStep",
            position: 6,
            name: "Optimisation",
            text: "Measure outcomes against success metrics defined in Scope, iterate on architecture, scale the system and refine governance processes based on production data.",
          },
        ],
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
    title: "AISA Framework",
    description:
      "Strategic AI Engagement Framework for translating business problems into scalable AI architectures and production systems.",
    link: "/aisa",
    available: true,
  },

  {
    title: "SKAIDO Framework",
    description:
      "Enterprise AI implementation framework for moving from strategy to measurable business outcomes.",
    link: "/frameworks-skaido",
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
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <FrameworksStructuredData />
      <BrandBackground />

      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-20">
        {/* HERO */}

        <section className="pt-16 pb-12">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            Proprietary Frameworks
          </div>

          <h1 className="mt-6 text-[48px] font-bold leading-tight text-white lg:text-[64px]">
            The Systems Behind
            <br />
            <span className="text-gradient-brand">
              Every AI Solution
            </span>
          </h1>

          <p
            className="mt-6 max-w-3xl text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            A collection of frameworks, methodologies and operating
            systems developed through real-world AI architecture,
            automation and enterprise implementation projects.
          </p>
        </section>

        ```tsx
{/* FRAMEWORKS GRID */}

<section className="grid grid-cols-1 gap-6 md:grid-cols-2">
  {frameworks.map((framework) => (
    <div
      key={framework.title}
      className="glass-card p-6"
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        Framework
      </div>

      <h3 className="mt-3 text-[24px] font-bold text-white">
        {framework.title}
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        {framework.description}
      </p>

      {framework.available ? (
        <Link
          to={framework.link}
          className="mt-6 inline-flex rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Learn More →
        </Link>
      ) : (
        <button
          className="mt-6 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
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
            <h2 className="text-[32px] font-bold text-white">
              Interested in Applying These Frameworks?
            </h2>

            <p
              className="mt-4 max-w-2xl"
              style={{ color: "#9CA3AF" }}
            >
              Explore the projects, systems and case studies where
              these frameworks have been applied to real-world AI
              implementations.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                className="rounded-lg px-5 py-3 font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(90deg,#8B5CF6,#A855F7)",
                }}
              >
                View Portfolio
              </button>

              <button
                className="rounded-lg px-5 py-3 font-semibold text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Ask My AI Agent
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}