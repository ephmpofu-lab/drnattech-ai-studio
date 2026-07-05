import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Rocket,
  Clock,
  TrendingUp,
  ShieldCheck,
  Target,
  Network,
  Workflow,
  Database,
  Building2,
  Shield,
  Bot,
  Layers,
  Search,
  FileText,
  Brain,
  GitBranch,
  Eye,
  Lock,
  Activity,
  CheckCircle2,
  Globe,
  BookOpen,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/portfolio/")({
  head: () => ({
    meta: [
      {
        title:
          "AI Systems Portfolio | Insurance AI, RAG, Workflow Automation | Dr. Ephraim Mpofu · KI-Architekt Vienna",
      },
      {
        name: "description",
        content:
          "Portfolio of enterprise AI systems designed and delivered by Dr. Ephraim Mpofu — PhD (Dr.nat.techn.), AI Solutions Architect and KI-Architekt in Vienna. Insurance claims AI, RAG knowledge platforms, AI career intelligence and EU AI Act-compliant workflow automation for DACH and EU enterprises.",
      },
      {
        property: "og:title",
        content:
          "AI Systems Portfolio | Dr. Ephraim Mpofu · KI-Architekt Vienna | Enterprise AI & EU AI Act",
      },
      {
        property: "og:description",
        content:
          "12+ production enterprise AI systems — insurance claims intelligence, RAG knowledge platforms, multi-agent workflow automation. EU AI Act-compliant. By Dr. Ephraim Mpofu, KI-Architekt in Vienna.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/portfolio" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "AI Systems Portfolio | Dr. Ephraim Mpofu · KI-Architekt Vienna",
      },
      {
        name: "twitter:description",
        content:
          "12+ enterprise AI systems delivered — insurance AI, RAG knowledge platforms, workflow automation. EU AI Act-compliant, production-ready, DACH and EU.",
      },
      {
        name: "keywords",
        content:
          "AI systems portfolio Vienna, enterprise AI architecture, KI-Architekt Wien, insurance claims AI, RAG knowledge platform, workflow automation AI, EU AI Act compliance architecture, DACH enterprise AI, multi-agent AI systems, KI-Systeme Österreich, KI-Lösungen, Dr Ephraim Mpofu portfolio",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/portfolio" },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://drnattech.com/de/portfolio",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio",
      },
    ],
  }),
  component: PortfolioPage,
});

/* ============================================================
   FAQ DATA — visible + schema-backed
   ============================================================ */

const portfolioFaq = [
  {
    q: "What types of enterprise AI systems does Dr. Ephraim Mpofu design and build?",
    a: "Dr. Mpofu designs and builds multi-agent AI systems, RAG (Retrieval-Augmented Generation) knowledge platforms, intelligent workflow automation, AI-powered decision-support platforms and EU AI Act-compliant governance systems. Delivered systems span insurance claims intelligence, HR and recruitment AI, enterprise knowledge management and automated business process orchestration — all in production, not prototypes.",
  },
  {
    q: "How does enterprise AI integrate with EU AI Act compliance requirements?",
    a: "High-risk AI systems — such as those used in insurance claims assessment, CV screening and financial decision-making — must comply with the EU AI Act by August 2026. Dr. Mpofu embeds compliance architecturally: every system includes complete audit trails, human-in-the-loop oversight mechanisms, explainability layers, risk classification documentation and ongoing monitoring. Compliance is built in from day one, not retrofitted.",
  },
  {
    q: "What is the difference between a multi-agent AI system and a standard AI chatbot?",
    a: "A standard AI chatbot responds to single-turn user inputs. A multi-agent AI system consists of multiple specialised AI agents that collaborate autonomously — each responsible for specific subtasks (data retrieval, analysis, decision-making, writing, routing) — to complete complex, multi-step business workflows without constant human intervention. Dr. Mpofu's insurance claims platform uses 5+ coordinated agents to automate the full claims lifecycle.",
  },
  {
    q: "How long does it take to design and deploy a production enterprise AI system?",
    a: "Using the SKAIDO Framework — Dr. Mpofu's six-phase AI implementation methodology — a focused enterprise AI system (single use-case, defined scope) typically reaches production within 6–12 weeks. Timeline depends on integration complexity, data availability and governance requirements. The SKAIDO process covers Scope, Knowledge, Architecture, Implementation, Deployment and Optimisation — ensuring every delivery is production-ready rather than experimental.",
  },
  {
    q: "Does Dr. Mpofu work with enterprises in Germany, Austria and Switzerland (DACH)?",
    a: "Yes — Dr. Mpofu is based in Vienna, Austria and primarily serves enterprises across the DACH region (Deutschland, Österreich, Schweiz) and the wider EU. All AI systems are designed to meet GDPR, Austrian data protection law and EU AI Act requirements. German-language consultation and documentation are available. KI-Systeme (Künstliche Intelligenz Systeme) designed for DACH enterprises are a core focus.",
  },
];

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function PortfolioStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://drnattech.com/portfolio#webpage",
        url: "https://drnattech.com/portfolio",
        name: "AI Systems Portfolio — Dr. Ephraim Mpofu, KI-Architekt Vienna",
        description:
          "Portfolio of 12+ enterprise AI systems designed and delivered by Dr. Ephraim Mpofu — insurance claims AI, RAG knowledge platforms, multi-agent workflow automation, EU AI Act-compliant.",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://drnattech.com" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://drnattech.com/portfolio" },
          ],
        },
      },
      {
        "@type": "ItemList",
        "@id": "https://drnattech.com/portfolio#systems",
        name: "Enterprise AI Systems Portfolio",
        numberOfItems: 3,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareApplication",
              name: "Insurance Claims Intelligence Platform",
              description:
                "Multi-agent AI system that automates the entire insurance claims lifecycle — fraud detection, triage, AI analysis, decision support and full audit trail. EU AI Act-compliant high-risk AI system with 70% reduction in processing time and 100% audit trail coverage.",
              applicationCategory: "BusinessApplication",
              url: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
              author: { "@id": "https://drnattech.com/#person" },
              featureList: ["Multi-agent orchestration", "Fraud detection", "EU AI Act audit trail", "Human-in-the-loop oversight"],
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareApplication",
              name: "AI Career Intelligence Operating System",
              description:
                "End-to-end AI platform for CV analysis, job opportunity matching, personalised application generation and outcome tracking. Reduces application time by 85% and triples submission volume.",
              applicationCategory: "BusinessApplication",
              url: "https://drnattech.com/portfolio/career-intelligence-operating-system",
              author: { "@id": "https://drnattech.com/#person" },
              featureList: ["CV intelligence analysis", "Opportunity matching engine", "Personalised CV generation", "Application tracking"],
            },
          },
          {
            "@type": "ListItem",
            position: 3,
            item: {
              "@type": "SoftwareApplication",
              name: "Knowledge Architecture Operating System",
              description:
                "Enterprise RAG (Retrieval-Augmented Generation) system for knowledge acquisition, semantic indexing, intelligence and GDPR-aligned governance across organisational data.",
              applicationCategory: "BusinessApplication",
              author: { "@id": "https://drnattech.com/#person" },
              featureList: ["RAG knowledge retrieval", "Semantic vector indexing", "Knowledge governance", "GDPR-aligned data access"],
            },
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://drnattech.com/portfolio#faq",
        mainEntity: portfolioFaq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
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

/* ============================================================
   PAGE
   ============================================================ */

export function PortfolioPage() {
  return (
    <div
      className="light-page relative min-h-screen"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <PortfolioStructuredData />
      <SiteNav active="Portfolio" />
      <main className="mx-auto max-w-[1280px] px-6 pb-16 lg:px-10">
        <HeroSection />
        <KpiStrip />
        <GovernanceStrip />
        <FeaturedSystems />
        <SystemCapabilities />
        <TechnologyEcosystem />
        <PortfolioFaqSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

const heroCapabilities = [
  {
    icon: Layers,
    title: "Architecture First",
    sub: "Systems designed for scale and maintainability",
  },
  {
    icon: TrendingUp,
    title: "Outcome Driven",
    sub: "Built for impact, measured in results",
  },
  {
    icon: ShieldCheck,
    title: "Governed & Secure",
    sub: "Enterprise-grade governance, compliance and ethics",
  },
  {
    icon: Rocket,
    title: "Production Ready",
    sub: "Deployed, monitored and continuously improved",
  },
];

function HeroSection() {
  return (
    <section className="pt-10" aria-label="Portfolio of enterprise AI systems">
      <div className="max-w-[680px]">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            PORTFOLIO
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            KI-Architekt · Wien
          </span>
        </div>

        <h1
          className="mt-5 text-[40px] font-medium leading-[1.05] tracking-tight sm:text-[50px] lg:text-[58px]"
          style={{ color: "#1F2125" }}
        >
          Enterprise AI Systems
          <br />
          <span style={{ color: "#34506E" }}>
            Designed & Delivered
          </span>
        </h1>

        <p
          className="mt-5 max-w-[500px] text-[15px] leading-relaxed"
          style={{ color: "#5A5D63" }}
        >
          Production AI systems — multi-agent architectures, RAG knowledge
          platforms and EU AI Act-compliant workflow automation — built for
          enterprises in Austria, Germany, Switzerland and the EU.
        </p>

        {/* Capability strip */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {heroCapabilities.map((c) => (
            <div key={c.title} className="flex items-start gap-3">
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "#E9EFF4",
                  border: "1px solid #D7D4CC",
                }}
              >
                <c.icon className="h-4 w-4" style={{ color: "#34506E" }} />
              </div>
              <div className="leading-tight">
                <div className="text-[12.5px] font-bold" style={{ color: "#1F2125" }}>{c.title}</div>
                <div className="mt-0.5 text-[11px]" style={{ color: "#8A8D93" }}>
                  {c.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   2. KPI STRIP
   ============================================================ */

const kpis = [
  {
    icon: Rocket,
    value: "12+",
    label: "Enterprise Systems",
    sub: "Architected",
  },
  {
    icon: Clock,
    value: "3,500+",
    label: "Hours of Manual Work",
    sub: "Automated",
  },
  {
    icon: TrendingUp,
    value: "70%",
    label: "Average Process Time",
    sub: "Reduction",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Production Deployment",
    sub: "Success Rate",
  },
];

function KpiStrip() {
  return (
    <section className="mt-6">
      <div
        className="glass-card flex flex-wrap items-stretch"
        style={{ padding: 0 }}
      >
        {kpis.map((k, i) => (
          <div
            key={k.value + k.label}
            className="flex flex-1 items-center gap-4 px-6 py-5"
            style={{
              minWidth: "180px",
              borderLeft: i > 0 ? "1px solid #E3E1DA" : "none",
            }}
          >
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
              }}
            >
              <k.icon className="h-5 w-5" style={{ color: "#34506E" }} />
            </div>
            <div>
              <div
                className="text-[28px] font-bold leading-none"
                style={{ color: "#34506E" }}
              >
                {k.value}
              </div>
              <div
                className="mt-1 text-[11px] font-medium leading-tight"
                style={{ color: "#8A8D93" }}
              >
                {k.label}
                <br />
                {k.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   2b. GOVERNANCE STRIP
   ============================================================ */

const govBadges = [
  { icon: BookOpen, label: "Auditability" },
  { icon: Eye, label: "Human Oversight" },
  { icon: Activity, label: "Monitoring" },
  { icon: CheckCircle2, label: "Compliance" },
  { icon: GitBranch, label: "Traceability" },
  { icon: Lock, label: "Security" },
  { icon: Globe, label: "Responsible AI" },
  { icon: ShieldCheck, label: "Production Governance" },
];

function GovernanceStrip() {
  return (
    <section className="mt-3">
      <div
        className="rounded-xl px-5 py-3"
        style={{
          background: "rgba(16,185,129,0.04)",
          border: "1px solid rgba(16,185,129,0.14)",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div
            className="shrink-0 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "#34D399" }}
          >
            EU AI Act · Governance By Design
          </div>
          <div
            className="hidden h-3.5 w-px lg:block"
            style={{ background: "rgba(16,185,129,0.25)" }}
          />
          {govBadges.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <Icon className="h-3 w-3 shrink-0" style={{ color: "#34D399" }} />
              <span className="text-[11px] font-medium" style={{ color: "#5A5D63" }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. FEATURED SYSTEMS
   ============================================================ */

const PORTFOLIO_FILTERS = [
  "All",
  "AI & ML Engineering",
  "Agentic & Workflow AI",
  "Cloud AI & MLOps",
  "AI Governance & Compliance",
] as const;
type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number];

const featuredSystemsData = [
  {
    category: "AI Governance & Compliance" as PortfolioFilter,
    competencies: ["AI & ML Engineering", "Agentic & Workflow AI", "Cloud AI & MLOps", "AI Governance & Compliance"] as PortfolioFilter[],
    badge: "01",
    title: "Insurance Claims Intelligence Platform",
    description: "Multi-agent system that automates the entire claims lifecycle — fraud detection, AI-powered triage, decision support and EU AI Act-compliant audit trail for high-risk AI classification.",
    workflow: [
      { icon: FileText, label: "Intake" },
      { icon: Search, label: "Triage" },
      { icon: Brain, label: "AI Analysis" },
      { icon: ShieldCheck, label: "Decision" },
      { icon: Database, label: "Audit" },
    ],
    workflowImage: "/images/WF_Insurance_MAIN_Insurance_Claims_Orchestrator.webp",
    imagePosition: "50% 60%",
    impacts: [
      { value: "70%", label: "Reduction in Processing Time", highlight: true },
      { value: "35%", label: "Decrease in Fraud Detection Time", highlight: true },
      { value: "100%", label: "Audit Trail Coverage", highlight: true },
    ],
    technologies: ["n8n", "OpenAI", "Claude AI", "PostgreSQL", "Supabase", "RAG"],
    href: "/portfolio/insurance-claims-intelligence-platform",
  },
  {
    category: "Agentic & Workflow AI" as PortfolioFilter,
    competencies: ["AI & ML Engineering", "Agentic & Workflow AI", "Cloud AI & MLOps"] as PortfolioFilter[],
    badge: "02",
    title: "AI Career Intelligence Operating System",
    description: "End-to-end platform that analyses CVs, matches opportunities, personalises applications and tracks outcomes.",
    workflow: [
      { icon: Search, label: "Job Discovery" },
      { icon: Brain, label: "Candidate Intelligence" },
      { icon: Target, label: "Matching Engine" },
      { icon: FileText, label: "CV Personalisation" },
      { icon: TrendingUp, label: "Application Tracking" },
    ],
    workflowImage: "/images/WF_02_acp_CV_Upload_Candidate_Intelligence.webp",
    imagePosition: "50% 68%",
    impacts: [
      { value: "85%", label: "Time Saved on Applications", highlight: true },
      { value: "3x", label: "More Applications Submitted", highlight: true },
      { value: "Smart", label: "Tailored Resumes & Cover Letters", highlight: false },
    ],
    technologies: ["Python", "OpenAI", "Pinecone", "Supabase", "n8n", "Vector DB"],
    href: "/portfolio/career-intelligence-operating-system",
  },
  {
    category: "AI & ML Engineering" as PortfolioFilter,
    competencies: ["AI & ML Engineering", "Agentic & Workflow AI"] as PortfolioFilter[],
    badge: "03",
    title: "Knowledge Architecture Operating System",
    description: "Enterprise RAG (Retrieval-Augmented Generation) system for knowledge acquisition, semantic vector indexing with Pinecone and Supabase, and governance — designed to prevent AI hallucination through structured retrieval architecture.",
    workflow: [
      { icon: Database, label: "Acquire" },
      { icon: Brain, label: "Intelligence" },
      { icon: Layers, label: "Index" },
      { icon: ShieldCheck, label: "Governance" },
    ],
    workflowImage: "/images/WF02_RAG_Knowledge_Intelligence.webp",
    imagePosition: "50% 68%",
    impacts: [
      { value: "Centralized", label: "Knowledge Repositories", highlight: false },
      { value: "Faster", label: "Information Retrieval", highlight: false },
      { value: "Secure", label: "Governed Access", highlight: false },
    ],
    technologies: ["Python", "OpenAI", "Pinecone", "Supabase", "RAG", "PostgreSQL"],
    href: "/portfolio/knowledge-architecture-operating-system",
  },
];

function FeaturedSystems() {
  const [filter, setFilter] = useState<PortfolioFilter>("All");
  const visible = featuredSystemsData.filter(
    (s) => filter === "All" || s.competencies.includes(filter)
  );

  return (
    <section className="mt-14">
      {/* Header */}
      <div className="mb-2">
        <h2 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>
          Featured Enterprise Systems
        </h2>
        <p className="mt-1 text-[13.5px]" style={{ color: "#5A5D63" }}>
          Each system demonstrates applied competencies — filter by domain to see which projects prove which skills.
        </p>
      </div>

      {/* Competency filter tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {PORTFOLIO_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="rounded-[8px] px-3.5 py-1.5 text-[12px] font-semibold transition-all"
            style={
              filter === f
                ? { background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }
                : { background: "#F2F0EA", border: "1px solid #E3E1DA", color: "#5A5D63" }
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((s) => (
          <CaseStudyCard
            key={s.badge}
            badge={s.badge}
            title={s.title}
            description={s.description}
            workflow={s.workflow}
            workflowImage={s.workflowImage}
            imagePosition={s.imagePosition}
            impacts={s.impacts}
            technologies={s.technologies}
            competencies={s.competencies}
            href={s.href}
          />
        ))}
      </div>
    </section>
  );
}

type WorkflowStep = {
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  label: string;
};

type Impact = {
  value: string;
  label: string;
  highlight: boolean;
};

function CaseStudyCard({
  badge,
  title,
  description,
  workflow,
  workflowImage,
  imagePosition = "left top",
  impacts,
  technologies,
  competencies,
  href,
}: {
  badge: string;
  title: string;
  description: string;
  workflow: WorkflowStep[];
  workflowImage?: string;
  imagePosition?: string;
  impacts: Impact[];
  technologies: string[];
  competencies: PortfolioFilter[];
  href: string;
}) {
  const inner = (
    <div
      className="glass-card group flex h-full flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ padding: 0 }}
    >
      {/* Card header */}
      <div className="flex items-start gap-3 px-5 pt-5">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[13px] font-bold"
          style={{
            background: "#E9EFF4",
            border: "1px solid #D7D4CC",
            color: "#34506E",
          }}
        >
          {badge}
        </div>
        <div>
          <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#1F2125" }}>{title}</h3>
        </div>
      </div>

      <p className="mt-3 px-5 text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
        {description}
      </p>

      {/* Workflow preview */}
      {workflowImage ? (
        <div
          className="mx-5 mt-4 overflow-hidden rounded-lg"
          style={{ border: "1px solid #E3E1DA" }}
        >
          <img
            src={workflowImage}
            alt={`${title} workflow diagram`}
            className="h-[130px] w-full object-cover"
            style={{ objectPosition: imagePosition }}
          />
        </div>
      ) : (
        <div
          className="mx-5 mt-4 overflow-hidden rounded-lg px-3 py-3"
          style={{ background: "#EDEBE3", border: "1px solid #E3E1DA" }}
        >
          <div className="flex flex-wrap items-center gap-1">
            {workflow.map((step, i) => (
              <div key={step.label} className="flex items-center gap-1">
                <div className="flex items-center gap-1">
                  <step.icon className="h-3 w-3 shrink-0" style={{ color: "#34506E" }} />
                  <span className="text-[10px] font-medium" style={{ color: "#1F2125" }}>{step.label}</span>
                </div>
                {i < workflow.length - 1 && (
                  <span className="text-[10px]" style={{ color: "#8A8D93" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Business impact */}
      <div className="mt-4 px-5">
        <div className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#8A8D93" }}>
          BUSINESS IMPACT
        </div>
        <div className="grid grid-cols-3 gap-2">
          {impacts.map((imp) => (
            <div key={imp.value + imp.label}>
              <div
                className="text-[16px] font-bold leading-none"
                style={{ color: imp.highlight ? "#34506E" : "#1F2125" }}
              >
                {imp.value}
              </div>
              <div className="mt-0.5 text-[9.5px] leading-snug" style={{ color: "#8A8D93" }}>
                {imp.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competency domains */}
      <div className="mt-4 px-5">
        <div className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#8A8D93" }}>
          COMPETENCY DOMAINS
        </div>
        <div className="flex flex-wrap gap-1.5">
          {competencies.filter((c) => c !== "All").map((c) => (
            <span
              key={c}
              className="rounded-full px-2 py-0.5 text-[10px] font-semibold"
              style={{
                background: "#E9EFF4",
                border: "1.5px solid #D7D4CC",
                color: "#34506E",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="mt-3 px-5">
        <div className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#8A8D93" }}>
          TECHNOLOGIES
        </div>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((t) => (
            <span
              key={t}
              className="rounded-full px-2 py-0.5 text-[10.5px] font-medium"
              style={{
                background: "#F2F0EA",
                border: "1px solid #E3E1DA",
                color: "#5A5D63",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto px-5 pb-5 pt-4">
        <div
          className="flex items-center gap-1.5 text-[12.5px] font-semibold transition-colors"
          style={{ color: "#34506E" }}
        >
          View System Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>
    </div>
  );

  if (href === "#") return <div className="h-full">{inner}</div>;
  return (
    <Link to={href} className="block h-full">
      {inner}
    </Link>
  );
}

/* ============================================================
   4. SYSTEM CAPABILITIES
   ============================================================ */

const capabilities = [
  { icon: Target, title: "AI Strategy & Architecture", desc: "Align AI initiatives with business goals and design solution architectures." },
  { icon: Network, title: "Multi-Agent Systems", desc: "Design and build autonomous agents and collaborative AI systems." },
  { icon: Workflow, title: "Workflow Automation", desc: "Automate complex processes and integrate intelligent workflows." },
  { icon: Database, title: "RAG & Knowledge Platforms", desc: "Build retrieval systems with high accuracy and enterprise governance." },
  { icon: Building2, title: "Enterprise Architecture", desc: "Scalable, secure and maintainable architectures for production." },
  { icon: Shield, title: "Governance & EU AI Act Compliance", desc: "Audit trails, human-in-the-loop oversight, risk classification and EU AI Act-compliant responsible AI — built in, not bolted on." },
];

function SystemCapabilities() {
  return (
    <section className="mt-14">
      <h2 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>System Capabilities</h2>
      <p className="mt-1 text-[13.5px]" style={{ color: "#5A5D63" }}>
        Core capabilities I build into every enterprise AI system.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((cap) => (
          <div
            key={cap.title}
            className="glass-card flex items-start gap-4 p-5 transition-all duration-200 hover:-translate-y-0.5"
          >
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
            >
              <cap.icon className="h-5 w-5" style={{ color: "#34506E" }} />
            </div>
            <div>
              <div className="text-[14px] font-semibold" style={{ color: "#1F2125" }}>{cap.title}</div>
              <div className="mt-1.5 text-[12.5px] leading-relaxed" style={{ color: "#5A5D63" }}>{cap.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5. TECHNOLOGY ECOSYSTEM
   ============================================================ */

const OpenAISvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#1F2125">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.05 14.01A4.5 4.5 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.767 2.752a4.5 4.5 0 0 1-.68 8.117V12.35a.786.786 0 0 0-.336-.6zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.767-2.752a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

const ClaudeSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#D97706">
    <path d="M13.827 3.52h3.603L24 20.32h-3.603l-1.422-4.307H9.043L7.62 20.32H4.017L10.192 3.52h3.635zm-.74 9.903 2.694-8.245h.028l2.694 8.245h-5.417z" />
  </svg>
);

const N8nSvg = () => (
  <svg viewBox="0 0 36 20" width="22" height="14">
    <text x="0" y="16" fontSize="18" fontWeight="700" fill="#EA4335" fontFamily="'Courier New',Courier,monospace">n8n</text>
  </svg>
);

const PythonSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.79 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.053 3.24-3.13V3.13S18.302 0 11.914 0zm-3.2 1.814a1.028 1.028 0 1 1 0 2.056 1.028 1.028 0 0 1 0-2.056z" />
    <path fill="#FFD43B" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.109 3.402-3.35 3.402H9.45s-3.24-.053-3.24 3.13V20.87S5.698 24 12.086 24zm3.2-1.814a1.028 1.028 0 1 1 0-2.056 1.028 1.028 0 0 1 0 2.056z" />
  </svg>
);

const SupabaseSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#3ECF8E">
    <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
  </svg>
);

const PostgreSQLSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <path fill="#336791" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.93 0 3.68.72 5 1.9V12c0 1.1-.9 2-2 2H9c-1.1 0-2-.9-2-2V6.9C8.32 5.72 10.07 5 12 5zm-4 9.9V18H9v-3.25l1.5.75L12 14.5l1.5 1 1.5-.75V18h1v-3.1c.63-.34 1-.98 1-1.9V9.44A7.974 7.974 0 0 1 20 16c0 4.41-3.59 8-8 8s-8-3.59-8-8c0-2.63 1.27-4.97 3.24-6.44L7 14c0 .92.37 1.56 1 1.9z" />
  </svg>
);

const PineconeSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#34506E">
    <path d="M12 2 9 8h1.5L8 13h2L7 20h10l-3-7h2l-2.5-5H15z" />
  </svg>
);

const DockerSvg = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#2496ED">
    <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.314 2.592-2.208 1.246-1.403 1.986-2.963 2.535-4.426l.064-.205h.259c.81 0 1.59-.189 2.26-.554.39-.214.73-.493 1.007-.828l.066-.109-.042-.099c-.138-.323-.46-.542-.798-.591z" />
  </svg>
);

const KubernetesSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#326CE5" strokeWidth="1.4" />
    <circle cx="12" cy="12" r="2.8" fill="#326CE5" />
    <line x1="12" y1="9.2" x2="12" y2="2" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="14.6" y1="10.6" x2="20.8" y2="7" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="14.6" y1="13.4" x2="20.8" y2="17" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="12" y1="14.8" x2="12" y2="22" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="9.4" y1="13.4" x2="3.2" y2="17" stroke="#326CE5" strokeWidth="1.2" />
    <line x1="9.4" y1="10.6" x2="3.2" y2="7" stroke="#326CE5" strokeWidth="1.2" />
  </svg>
);

const AWSSvg = () => (
  <svg viewBox="0 0 48 20" width="30" height="14">
    <text x="0" y="15" fontSize="16" fontWeight="800" fill="#FF9900" fontFamily="'Arial Black',Arial,sans-serif" letterSpacing="0.5">AWS</text>
  </svg>
);

const LangChainSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#10B981" strokeWidth="1.8">
    <rect x="2" y="9" width="5" height="6" rx="1.5" />
    <rect x="9.5" y="9" width="5" height="6" rx="1.5" />
    <rect x="17" y="9" width="5" height="6" rx="1.5" />
    <line x1="7" y1="12" x2="9.5" y2="12" />
    <line x1="14.5" y1="12" x2="17" y2="12" />
  </svg>
);

const VectorDbSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
    <ellipse cx="12" cy="6" rx="8" ry="3" fill="#34506E" opacity="0.9" />
    <path d="M4 6v6c0 1.657 3.582 3 8 3s8-1.343 8-3V6" stroke="#34506E" strokeWidth="1.5" />
    <path d="M4 12v6c0 1.657 3.582 3 8 3s8-1.343 8-3v-6" stroke="#34506E" strokeWidth="1.5" opacity="0.5" />
  </svg>
);

const FastAPISvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#009688">
    <path d="M12 0C5.375 0 0 5.375 0 12c0 6.624 5.375 12 12 12 6.624 0 12-5.376 12-12 0-6.625-5.376-12-12-12zm-.624 21.624v-7.624H7.5L13.5 2.5v7.624h4.125L11.376 21.624z" />
  </svg>
);

const RedisSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#DC382D">
    <path d="M1.636 14.563 12 20 22.364 14.563V9.437L12 14.874 1.636 9.437zm0-5L12 14.874l10.364-5.437V4.437L12 9.874 1.636 4.437z" />
    <path d="M12 2 1.636 7.437 12 12.874l10.364-5.437z" />
  </svg>
);

const GitHubSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#1F2125">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const PowerBISvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#F2C811">
    <path d="M18 3h-2a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-5 4h-2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-5 4H6a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1z" />
  </svg>
);

const LookerSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16">
    <circle cx="12" cy="12" r="11" fill="#4285F4" />
    <circle cx="12" cy="8" r="3.5" fill="white" />
    <rect x="9.5" y="11" width="5" height="8" rx="1.5" fill="white" />
  </svg>
);

const OTelSvg = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="#F5A800">
    <path d="M14.5 2.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM5 8.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm18 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 19.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
    <path d="M12 4.5 6 8m6-3.5 6 3.5M3 10l5 8M21 10l-5 8M8 20h8" stroke="#F5A800" strokeWidth="1.5" fill="none" />
  </svg>
);

const TECH_LOGOS: { name: string; logo: React.ReactNode }[] = [
  { name: "OpenAI", logo: <OpenAISvg /> },
  { name: "Claude AI", logo: <ClaudeSvg /> },
  { name: "n8n", logo: <N8nSvg /> },
  { name: "Python", logo: <PythonSvg /> },
  { name: "Supabase", logo: <SupabaseSvg /> },
  { name: "PostgreSQL", logo: <PostgreSQLSvg /> },
  { name: "Pinecone", logo: <PineconeSvg /> },
  { name: "Docker", logo: <DockerSvg /> },
  { name: "Kubernetes", logo: <KubernetesSvg /> },
  { name: "AWS", logo: <AWSSvg /> },
  { name: "LangChain", logo: <LangChainSvg /> },
  { name: "Vector DB", logo: <VectorDbSvg /> },
  { name: "FastAPI", logo: <FastAPISvg /> },
  { name: "Redis", logo: <RedisSvg /> },
  { name: "GitHub", logo: <GitHubSvg /> },
  { name: "Power BI", logo: <PowerBISvg /> },
  { name: "Looker Studio", logo: <LookerSvg /> },
  { name: "OpenTelemetry", logo: <OTelSvg /> },
];

function TechnologyEcosystem() {
  return (
    <section className="mt-14">
      <h2 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Technology Ecosystem</h2>
      <p className="mt-1 text-[13.5px]" style={{ color: "#5A5D63" }}>
        Modern tools and platforms selected for production reliability, GDPR compliance and EU AI Act auditability.
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {TECH_LOGOS.map((tech) => (
          <div
            key={tech.name}
            className="flex items-center gap-2.5 rounded-xl px-4 py-2.5 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            <div className="flex h-5 w-5 shrink-0 items-center justify-center">
              {tech.logo}
            </div>
            <span className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{tech.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   6. PORTFOLIO FAQ SECTION
   ============================================================ */

function PortfolioFaqSection() {
  return (
    <section className="mt-14" aria-label="Frequently asked questions about AI systems">
      <div className="mb-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8A8D93" }}
        >
          Common Questions
        </div>
        <h2 className="mt-2.5 text-[28px] font-medium leading-tight lg:text-[34px]" style={{ color: "#1F2125" }}>
          Questions About Enterprise AI Systems & EU AI Act
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "#5A5D63" }}>
          Questions about AI system design, EU AI Act compliance, deployment timelines and
          working with a KI-Architekt based in Vienna.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {portfolioFaq.map((item) => (
          <details
            key={item.q}
            className="group rounded-[14px] p-5"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            <summary
              className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13.5px] font-semibold"
              style={{ userSelect: "none", color: "#1F2125" }}
            >
              <span>{item.q}</span>
              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 rotate-90 transition-transform group-open:rotate-[270deg]"
                style={{ color: "#34506E" }}
              />
            </summary>
            <p
              className="mt-3.5 text-[13px] leading-relaxed"
              style={{ color: "#5A5D63" }}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   7. CTA SECTION
   ============================================================ */

const processSteps = [
  { n: "1.", title: "Discovery", sub: "Understand goals and challenges" },
  { n: "2.", title: "Architecture", sub: "Design scalable AI systems" },
  { n: "3.", title: "Implementation", sub: "Build and integrate production systems" },
  { n: "4.", title: "Governance", sub: "Ensure security, compliance and trust" },
  { n: "5.", title: "Scale", sub: "Optimise and drive impact" },
];

function CtaSection() {
  return (
    <section className="mt-14">
      <div
        className="overflow-hidden rounded-2xl p-8 lg:p-10"
        style={{
          background: "#F2F0EA",
          border: "1px solid #E3E1DA",
        }}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-12">
          <div>
            <div
              className="flex h-14 w-14 items-center justify-center rounded-2xl"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
              }}
            >
              <Rocket className="h-7 w-7" style={{ color: "#34506E" }} />
            </div>

            <h2 className="mt-5 text-[26px] font-medium leading-tight lg:text-[30px]" style={{ color: "#1F2125" }}>
              Let's Build Your Next Enterprise AI System — EU AI Act Ready
            </h2>
            <p className="mt-3 max-w-[500px] text-[14px] leading-relaxed" style={{ color: "#5A5D63" }}>
              From strategy to production, I partner with DACH and EU enterprises to design, build and govern AI systems — multi-agent, RAG, workflow automation — that deliver measurable business outcomes and meet EU AI Act compliance requirements.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-90"
                style={{ background: "#34506E", color: "#FAFAF8" }}
              >
                Book a Discovery Call <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/ai-agent"
                className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:bg-black/5"
                style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
              >
                Ask My AI Agent <Bot className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="flex flex-col gap-3">
              {processSteps.map((step, i) => (
                <div key={step.title} className="flex items-start gap-3">
                  <div className="relative flex flex-col items-center">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                      style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }}
                    >
                      {i + 1}
                    </div>
                    {i < processSteps.length - 1 && (
                      <div className="mt-1 h-3 w-px" style={{ background: "#D7D4CC" }} />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="text-[12.5px] font-bold" style={{ color: "#1F2125" }}>{step.title}</div>
                    <div className="text-[11px]" style={{ color: "#8A8D93" }}>{step.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-0 overflow-x-auto lg:hidden" style={{ borderTop: "1px solid #E3E1DA", paddingTop: "20px" }}>
          {processSteps.map((step, i) => (
            <div key={step.title} className="flex shrink-0 items-center">
              <div className="flex flex-col items-center px-3 text-center">
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold"
                  style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }}
                >
                  {i + 1}
                </div>
                <div className="mt-1.5 text-[11.5px] font-bold" style={{ color: "#1F2125" }}>{step.title}</div>
                <div className="mt-0.5 max-w-[90px] text-[9.5px] leading-snug" style={{ color: "#8A8D93" }}>{step.sub}</div>
              </div>
              {i < processSteps.length - 1 && (
                <div className="h-px w-6 shrink-0" style={{ background: "#D7D4CC" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
