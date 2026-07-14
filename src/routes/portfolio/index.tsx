import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Rocket,
  Clock,
  TrendingUp,
  ShieldCheck,
  Target,
  Database,
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
    icon: BookOpen,
    title: "Research First",
    sub: "Every system begins with evidence, not assumptions",
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
    icon: FileText,
    value: "9+",
    label: "SCI-indexed Publications",
    sub: "",
  },
  {
    icon: GitBranch,
    value: "7",
    label: "Open Source Projects",
    sub: "",
  },
  {
    icon: Rocket,
    value: "2",
    label: "Live Production Tools",
    sub: "",
  },
  {
    icon: Clock,
    value: "8",
    label: "Years of Practice",
    sub: "",
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
  "Data Science & Analytics",
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
  {
    category: "Data Science & Analytics" as PortfolioFilter,
    competencies: ["Data Science & Analytics"] as PortfolioFilter[],
    badge: "04",
    title: "AI Research Dashboard",
    description: "Interactive Power BI dashboard providing a global overview of AI research publications: geographic distribution, institutional leadership, topic evolution and research momentum across fields including LLMs, deep learning and neural networks. Data sourced from Web of Science.",
    workflow: [
      { icon: Database, label: "Web of Science" },
      { icon: Layers, label: "Power Query" },
      { icon: TrendingUp, label: "DAX Modelling" },
      { icon: Globe, label: "Geographic Analysis" },
      { icon: Target, label: "Research Insights" },
    ],
    workflowImage: "/images/AI%20research%20project.png",
    imagePosition: "50% 10%",
    impacts: [
      { value: "3,981", label: "Total Publications Analysed", highlight: true },
      { value: "75%", label: "Avg Annual Research Growth", highlight: true },
      { value: "55", label: "Active Countries Tracked", highlight: false },
    ],
    technologies: ["Power BI", "Power Query", "DAX", "Data Modelling", "Geographic Analysis", "Time-series Analysis"],
    href: "#",
  },
  {
    category: "AI Governance & Compliance" as PortfolioFilter,
    competencies: ["AI Governance & Compliance"] as PortfolioFilter[],
    badge: "05",
    title: "EU AI Act Risk Classifier",
    description: "Free open-source tool that classifies AI systems under Regulation (EU) 2024/1689. Answer up to 7 questions and receive a risk tier, legal basis citations, mandatory obligations, and a prioritised compliance action plan.",
    workflow: [
      { icon: Bot, label: "AI Type ID" },
      { icon: ShieldCheck, label: "Risk Questions" },
      { icon: Eye, label: "Article 5 Check" },
      { icon: Target, label: "Annex III Domains" },
      { icon: CheckCircle2, label: "Risk Result" },
    ],
    impacts: [
      { value: "4", label: "Risk Tiers Covered", highlight: true },
      { value: "7", label: "Assessment Steps", highlight: true },
      { value: "Free", label: "Open Source Tool", highlight: false },
    ],
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS v4", "Recharts", "Lucide React"],
    href: "https://eu-ai-act-classifier.vercel.app",
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
   4. CTA SECTION (formerly 7)
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
