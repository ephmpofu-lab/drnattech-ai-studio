import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";

export const Route = createFileRoute("/frameworks-skaido")({
  head: () => ({
    meta: [
      {
        title:
          "SKAIDO Framework | Six-Phase Enterprise AI Implementation Methodology | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "The SKAIDO Framework is a six-phase enterprise AI implementation methodology developed by Dr. Ephraim Mpofu, KI-Architekt Vienna: Scope, Knowledge, Architecture, Implementation, Deployment and Optimisation. Designed to reduce AI project failure and ensure EU AI Act compliance from day one. Used across DACH and EU organisations.",
      },
      {
        name: "keywords",
        content:
          "SKAIDO Framework, enterprise AI implementation, AI implementation methodology, six-phase AI framework, KI-Implementierung Methodik, EU AI Act compliance framework, Dr. Ephraim Mpofu, enterprise AI architecture, KI-Architekt Wien",
      },
      { property: "og:title", content: "SKAIDO Framework — Six-Phase Enterprise AI Implementation Methodology" },
      { property: "og:description", content: "Scope → Knowledge → Architecture → Implementation → Deployment → Optimisation. Dr. Ephraim Mpofu's proprietary methodology for delivering production-ready enterprise AI." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://drnattech.com/frameworks-skaido" },
      { property: "og:image", content: "https://drnattech.com/images/Dr_Mpofu_purple-removebg-preview.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/frameworks-skaido" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/frameworks-skaido" },
      { rel: "alternate", hreflang: "x-default", href: "https://drnattech.com/frameworks-skaido" },
    ],
  }),

  component: SkaidoPage,
});

function SkaidoStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": "https://drnattech.com/frameworks-skaido#howto",
        name: "How to Implement Enterprise AI Using the SKAIDO Framework",
        description:
          "The SKAIDO Framework by Dr. Ephraim Mpofu is a six-phase structured methodology for implementing enterprise AI systems — from business problem definition through to production deployment and ongoing optimisation. Used for EU AI Act-compliant AI system delivery across the DACH region and EU.",
        author: { "@id": "https://drnattech.com/#person" },
        totalTime: "P6W",
        step: [
          { "@type": "HowToStep", position: 1, name: "Scope", text: "Define the business problem, objectives, KPIs, constraints and EU AI Act risk classification." },
          { "@type": "HowToStep", position: 2, name: "Knowledge", text: "Map existing knowledge assets, data sources, knowledge gaps and information retrieval requirements." },
          { "@type": "HowToStep", position: 3, name: "Architecture", text: "Design the full AI system architecture — agent roles, orchestration logic, integration points, audit trail design and governance layers." },
          { "@type": "HowToStep", position: 4, name: "Implementation", text: "Build the AI system components, multi-agent workflows, knowledge retrieval pipelines and governance instrumentation." },
          { "@type": "HowToStep", position: 5, name: "Deployment", text: "Deploy to production with monitoring, automated testing, full audit trail activation and stakeholder handover." },
          { "@type": "HowToStep", position: 6, name: "Optimisation", text: "Measure outcomes against Scope-phase success metrics, iterate on architecture, scale the system and refine governance processes." },
        ],
      },
      {
        "@type": "DefinedTerm",
        "@id": "https://drnattech.com/frameworks-skaido#term",
        name: "SKAIDO Framework",
        alternateName: "SKAIDO AI Implementation Methodology",
        description:
          "The SKAIDO Framework is a six-phase enterprise AI implementation methodology: Scope, Knowledge, Architecture, Implementation, Deployment and Optimisation. Developed by Dr. Ephraim Mpofu to systematically take enterprises from business problem definition to deployed, EU AI Act-compliant, production-ready AI systems.",
        url: "https://drnattech.com/frameworks-skaido",
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

function SkaidoPage() {
  return (
    <div
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <SkaidoStructuredData />
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 pb-20">
        <div className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.22em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            PROPRIETARY FRAMEWORK
          </div>

          <h1
            className="mt-6 text-[56px] font-medium leading-tight"
            style={{ color: "#1F2125" }}
          >
            SKAIDO Framework
          </h1>

          <p
            className="mt-6 text-[18px] max-w-[800px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            A system-first enterprise AI implementation framework designed to
            move organisations from strategy to measurable business outcomes.
          </p>
        </div>

        <section className="mt-16 glass-card p-8">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Why The Framework Exists
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            Most AI projects fail because organisations focus on tools before
            systems. The SKAIDO Framework provides a structured implementation
            methodology that aligns business objectives, architecture,
            governance, workflows, data and outcomes.
          </p>
        </section>

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Core Principle
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            AI implementation should be approached as a business system design
            exercise rather than a technology deployment exercise.
          </p>
        </section>

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Business Outcomes
          </h2>

          <ul
            className="mt-4 space-y-3 text-[16px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            <li>• Faster implementation cycles</li>
            <li>• Reduced AI project failure rates</li>
            <li>• Improved governance and compliance</li>
            <li>• Measurable business value creation</li>
            <li>• Scalable enterprise architecture</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
