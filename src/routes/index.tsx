import { createFileRoute } from "@tanstack/react-router";
import heroPortrait from "@/assets/hero-portrait.jpg";
import bokuLogo from "@/assets/boku-university.png.asset.json";
import {
  ArrowRight,
  MessageCircle,
  Rocket,
  CheckCircle2,
  Box,
  Clock,
  TrendingUp,
  ShieldCheck,
  Monitor,
  ExternalLink,
  Lightbulb,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";
import { Signature } from "@/components/brand/Signature";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Dr. Ephraim Mpofu | AI Solutions Architect Vienna Austria",
      },
      {
        name: "description",
        content:
          "AI Solutions Architect specialising in enterprise AI systems, intelligent automation, AI agents, RAG platforms and knowledge architectures.",
      },
      {
        property: "og:title",
        content:
          "Dr. Ephraim Mpofu | AI Solutions Architect Vienna Austria",
      },
      {
        property: "og:description",
        content:
          "Enterprise AI architecture, AI agents, workflow automation and knowledge systems.",
      },
    ],
  }),

  component: Home,
});

const metrics = [
  {
    icon: Box,
    value: "9+",
    a: "Peer-Reviewed",
    b: "Publications",
  },
  {
    icon: Clock,
    value: "6",
    a: "AI Architectures",
    b: "Designed",
  },
  {
    icon: TrendingUp,
    value: "4",
    a: "Proprietary",
    b: "Frameworks",
  },
  {
    icon: ShieldCheck,
    value: "6",
    a: "Industries",
    b: "Served",
  },
];



const specializing = [
  "AI Systems Architecture",
  "RAG & Knowledge Systems",
  "Intelligent Automation",
  "Workflow Orchestration",
  "Data & Analytics",
];

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#050816" }}>
      <BrandBackground />
      <SiteNav active="Home" />
      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-16">
  <Hero />
<MetricsBar />
<ContentGrid />
<SpecializingBar />
<PublicationsPreview />
<InsightsPreview />
<BusinessImpact />
<AgentPreview />
<CTASection />
<SiteFooter />
</main>
    </div>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-10 pt-10 pb-8 lg:grid-cols-2 lg:gap-12 lg:pt-14">
      {/* Left */}
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em]"
          style={{
            background: "rgba(139,92,246,0.10)",
            border: "1px solid rgba(139,92,246,0.32)",
            color: "#C4B5FD",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#A855F7", boxShadow: "0 0 8px #A855F7" }} />
          AI SOLUTIONS ARCHITECT
        </span>

        <h1 className="mt-7 text-[44px] font-bold leading-[1.06] tracking-tight text-white sm:text-[54px] lg:text-[60px]">
          Enterprise AI Systems
          <br />
          That <span className="text-gradient-brand">Work in Production</span>
        </h1>

        <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          I design and build intelligent automation systems that solve real business problems
          and deliver measurable results.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:brand-glow"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Rocket className="h-4 w-4" /> See My Work
          </button>
          <button
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <MessageCircle className="h-4 w-4" /> Ask Me Anything
          </button>
        </div>
      </div>

      {/* Right portrait */}
      <div className="relative">
        <div
          className="relative aspect-[5/4] w-full overflow-hidden rounded-[18px]"
          style={{
            background: "linear-gradient(180deg, #0A0E22, #050816)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Purple ring behind head */}
          <div
            className="absolute left-1/2 top-[18%] h-[280px] w-[280px] -translate-x-1/3 rounded-full"
            style={{
              border: "2px solid #A855F7",
              boxShadow: "0 0 60px 6px rgba(168,85,247,0.55), inset 0 0 60px rgba(139,92,246,0.25)",
              opacity: 0.85,
            }}
          />
          {/* Stars */}
          <Stars />
          {/* Portrait */}
          <img
            src={heroPortrait}
            alt="Dr. Ephraim Mpofu — AI Solutions Architect"
            className="absolute bottom-0 right-0 h-[95%] w-auto object-contain object-bottom"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
          />

          {/* Signature + identity overlay */}
          <div className="absolute bottom-6 left-7 max-w-[55%]">
            <Signature size="xl" className="-mb-2" />
            <div className="mt-3 text-[17px] font-bold text-white">Dr. Ephraim Mpofu</div>
            <ul className="mt-2 space-y-1.5">
              {[
                "AI Solutions Architect",
                "PhD NatTech – BOKU Vienna",
                "Google Data Analytics Certified",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2 text-[12.5px]" style={{ color: "#C4B5FD" }}>
                  <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stars() {
  const stars = Array.from({ length: 40 }).map((_, i) => ({
    x: (i * 73) % 100,
    y: (i * 131) % 100,
    s: (i % 3) + 1,
  }));
  return (
    <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s * 0.08} fill="#A855F7" />
      ))}
    </svg>
  );
}

function MetricsBar() {
  return (
    <section>
      <div className="glass-card grid grid-cols-2 gap-3 px-6 py-5 sm:grid-cols-3 lg:grid-cols-5 lg:gap-2 lg:px-8">
        {metrics.map((m) => (
          <div key={m.value} className="flex items-center gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.28)",
              }}
            >
              <m.icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <div className="min-w-0">
              <div className="text-gradient-brand text-[26px] font-bold leading-none">{m.value}</div>
              <div className="mt-1 text-[11.5px] font-medium leading-tight" style={{ color: "#9CA3AF" }}>
                {m.a}
                <br />
                {m.b}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContentGrid() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.35fr_1fr]">
      <FeaturedProject />

      <div className="flex flex-col gap-5">
  <IndustryExperience />
  <GlobalFrameworks />
  <EnterpriseCapabilities />
  <Certifications />
</div>
    </section>
  );
}

function IndustryExperience() {
  const industries = [
    "Academia & Research",
    "International Development (World Bank)",
    "Telecommunications (Huawei)",
    "Conservation & Sustainability",
    "Consulting",
    "AI & Automation",
  ];

  return (
    <div className="glass-card p-5">
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        EXPERIENCE ACROSS INDUSTRIES
      </div>

      <div className="mt-4 flex flex-wrap gap-4">
        {industries.map((industry) => (
          <div
            key={industry}
            className="rounded-lg px-4 py-3"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            {industry}
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedProject() {
  return (
    <div className="glass-card flex flex-col p-7">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.05fr]">
        {/* Left text */}
        <div>
          <span
            className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              background: "rgba(139,92,246,0.14)",
              border: "1px solid rgba(139,92,246,0.32)",
              color: "#C4B5FD",
            }}
          >
            Featured Project
          </span>
          <h2 className="mt-4 text-[24px] font-bold leading-tight text-white">
            AI Career Intelligence Platform
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Enterprise AI system that combines CV intelligence, job intelligence, semantic matching, ATS optimization and workflow orchestration into a closed-loop Career Intelligence Operating System.
          </p>

         <div className="mt-5 flex flex-wrap gap-3">
  {[
    "Multi-Agent Architecture",
    "Document Intelligence",
    "Fraud Detection Layer",
    "Audit & Compliance",
    "Human-in-the-Loop Review",
    "Real-Time Analytics",
  ].map((item) => (
    <div
      key={item}
      className="rounded-lg px-3 py-2 text-[12px] font-medium"
      style={{
        background: "rgba(139,92,246,0.08)",
        border: "1px solid rgba(139,92,246,0.2)",
        color: "#E5E7EB",
      }}
    >
      {item}
    </div>
  ))}
</div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <button
              className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              View Case Study <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.14)" }}
            >
              Live Demo <ExternalLink className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right diagram */}
        <div
          className="relative aspect-[5/4] w-full overflow-hidden rounded-[14px] p-4"
          style={{
            background:
              "radial-gradient(circle at 30% 20%, rgba(139,92,246,0.18), transparent 60%), #0A0E22",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <ArchitectureDiagram />
        </div>
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="h-1.5 rounded-full transition-all"
            style={{
              width: i === 0 ? 18 : 6,
              background: i === 0 ? "#A855F7" : "rgba(255,255,255,0.18)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ArchitectureDiagram() {
  // Render a stylized multi-agent claims diagram
  const cols = 5;
  const rows = 4;
  return (
    <div className="grid h-full w-full gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const hot = [2, 6, 7, 8, 12, 13, 14, 17, 18].includes(i);
        const accent = [7, 13].includes(i);
        return (
          <div
            key={i}
            className="rounded-md"
            style={{
              background: accent
                ? "rgba(251,191,36,0.18)"
                : hot
                ? "rgba(59,130,246,0.18)"
                : "rgba(139,92,246,0.08)",
              border: accent
                ? "1px solid rgba(251,191,36,0.5)"
                : hot
                ? "1px solid rgba(59,130,246,0.45)"
                : "1px solid rgba(139,92,246,0.22)",
            }}
          />
        );
      })}
    </div>
  );
}

function GlobalFrameworks() {
  const frameworks = [
    {
      title: "AI Career Intelligence OS",
      description:
        "Closed-loop AI platform for CV intelligence, job intelligence, ATS optimization and application orchestration.",
    },
    {
      title: "Knowledge Architecture OS",
      description:
        "Framework for enterprise knowledge acquisition, intelligence, indexing and governance.",
    },
    {
      title: "Enterprise Multi-Agent Framework",
      description:
        "Architecture pattern for scalable AI agents, workflow orchestration and autonomous decision systems.",
    },
    {
      title: "RAG Governance Framework",
      description:
        "Production methodology for retrieval, evaluation, indexing and AI knowledge management.",
    },
  ];

  return (
    <div className="glass-card p-5">
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        PROPRIETARY FRAMEWORKS & OPERATING SYSTEMS
      </div>

      <div className="mt-4 space-y-3">
        {frameworks.map((item) => (
          <div
            key={item.title}
            className="rounded-lg p-3"
            style={{
              background: "rgba(139,92,246,0.06)",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="text-sm font-semibold text-white">
              {item.title}
            </div>

            <div
              className="mt-1 text-xs"
              style={{ color: "#9CA3AF" }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EnterpriseCapabilities() {
  const capabilities = [
    {
      title: "AI Strategy & Transformation",
      description:
        "Designing AI roadmaps, implementation frameworks and enterprise adoption strategies.",
    },
    {
      title: "Enterprise AI Architecture",
      description:
        "Building scalable AI systems that operate reliably in production environments.",
    },
    {
      title: "Multi-Agent Systems",
      description:
        "Orchestrating autonomous AI agents, workflows and decision-support systems.",
    },
    {
      title: "Knowledge & RAG Platforms",
      description:
        "Designing enterprise knowledge systems for retrieval, governance and intelligence.",
    },
    {
      title: "Intelligent Automation",
      description:
        "Automating business processes end-to-end using AI, workflows and integrations.",
    },
    {
      title: "AI Governance & Evaluation",
      description:
        "Ensuring reliability, observability, quality assurance and responsible AI deployment.",
    },
  ];

  return (
    <div className="glass-card p-5">
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        ENTERPRISE AI CAPABILITIES
      </div>

      <div className="mt-4 space-y-3">
        {capabilities.map((item) => (
          <div
            key={item.title}
            className="rounded-lg p-3"
            style={{
              background: "rgba(59,130,246,0.05)",
              border: "1px solid rgba(59,130,246,0.15)",
            }}
          >
            <div className="text-sm font-semibold text-white">
              {item.title}
            </div>

            <div
              className="mt-1 text-xs"
              style={{ color: "#9CA3AF" }}
            >
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Certifications() {
  const items = [
    {
      title: "Africa",
      sub1: "Research &",
      sub2: "Development",
      logo: <BokuGlyph />,
    },
    {
      title: "Europe",
      sub1: "AI &",
      sub2: "Innovation",
      logo: <AzureGlyph />,
    },
    {
      title: "Asia",
      sub1: "Telecom &",
      sub2: "Technology",
      logo: <GoogleGlyph />,
    },
  ];

  return (
    <div className="glass-card p-5">
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        Global Experience
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-[10px] p-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-start gap-2.5">
              <div className="shrink-0">{it.logo}</div>

              <div className="min-w-0 leading-tight">
                <div className="text-[11.5px] font-bold text-white">
                  {it.title}
                </div>

                <div
                  className="mt-1 text-[10px]"
                  style={{ color: "#9CA3AF" }}
                >
                  {it.sub1}
                  <br />
                  {it.sub2}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AzureGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path d="M11 4 L4 18 L10 18 L13 13 Z" fill="#0078D4" />
      <path d="M13 9 L20 18 L13 18 L11 15 Z" fill="#50E6FF" />
    </svg>
  );
}
function GoogleGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M12 11v3.6h5.1c-.2 1.3-1.5 3.7-5.1 3.7-3.1 0-5.6-2.5-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 4.6 14.4 3.7 12 3.7 7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.8 0 8-3.4 8-8.1 0-.5-.1-.9-.2-1.2H12z"/>
    </svg>
  );
}
function BokuGlyph() {
  return (
    <img
      src={bokuLogo.url}
      alt="BOKU University"
      className="h-[22px] w-[22px] object-contain"
    />
  );
}
function MicrosoftGlyph() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24">
      <rect x="2" y="2" width="9" height="9" fill="#F25022" />
      <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
      <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
      <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}

function SpecializingBar() {
  const methodology = [
    "Problem Discovery",
    "Requirements Analysis",
    "System Architecture",
    "Workflow Design",
    "AI Implementation",
    "Governance & Optimization",
  ];

  return (
    <section className="mt-5">
      <div className="glass-card px-6 py-5">
        <div className="flex items-center gap-2">
          <Lightbulb
            className="h-4 w-4"
            style={{ color: "#A855F7" }}
          />
          <span className="text-[13px] font-semibold text-white">
            AI Architecture Methodology
          </span>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          {methodology.map((step, index) => (
            <div
              key={step}
              className="flex items-center gap-3"
            >
              <div
                className="rounded-lg px-3 py-2 text-[12px] font-medium"
                style={{
                  background: "rgba(139,92,246,0.08)",
                  border: "1px solid rgba(139,92,246,0.2)",
                  color: "#E5E7EB",
                }}
              >
                {index + 1}. {step}
              </div>

              {index < methodology.length - 1 && (
                <ArrowRight
                  className="h-4 w-4"
                  style={{ color: "#6B7280" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PublicationsPreview() {
  const publications = [
    "AI Systems & Automation",
    "Knowledge Architecture",
    "Landscape Governance",
    "Sustainability Science",
  ];

  return (
    <section className="mt-5">
      <div className="glass-card p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Research & Publications
        </div>

        <h3 className="mt-3 text-[28px] font-bold text-white">
          9+ Peer-Reviewed Publications
        </h3>

        <p
          className="mt-2 max-w-2xl text-[13px]"
          style={{ color: "#9CA3AF" }}
        >
          Research spanning AI systems, knowledge management,
          sustainability science, governance and intelligent automation.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {publications.map((item) => (
            <div
              key={item}
              className="rounded-lg px-3 py-2 text-[12px]"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.20)",
                color: "#E5E7EB",
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <button
          className="mt-6 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          View Publications →
        </button>
      </div>
    </section>
  );
}

function InsightsPreview() {
  const insights = [
    "AI Agents vs Workflows",
    "Knowledge Architecture Principles",
    "Enterprise AI Governance",
    "Building Production AI Systems",
  ];

  return (
    <section className="mt-5">
      <div className="glass-card p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Latest Insights
        </div>

        <h3 className="mt-3 text-[28px] font-bold text-white">
          Architecture, AI & Enterprise Systems
        </h3>

        <p
          className="mt-2 max-w-2xl text-[13px]"
          style={{ color: "#9CA3AF" }}
        >
          Research, frameworks and practical lessons from building enterprise AI systems.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {insights.map((item) => (
            <div
              key={item}
              className="rounded-lg p-4"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <div className="font-medium text-white">
                {item}
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-6 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Explore Insights →
        </button>
      </div>
    </section>
  );
}

function AgentPreview() {
  const topics = [
    "AI Architecture",
    "Research Publications",
    "Enterprise Frameworks",
    "Knowledge Systems",
    "Career Intelligence OS",
    "AI Governance",
  ];

  return (
    <section className="mt-5">
      <div className="glass-card p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Interactive AI Assistant
        </div>

        <h3 className="mt-3 text-[28px] font-bold text-white">
          Talk To My AI Agent
        </h3>

        <p
          className="mt-2 max-w-2xl text-[13px]"
          style={{ color: "#9CA3AF" }}
        >
          Ask questions about my research, frameworks, architecture principles,
          publications and enterprise AI systems.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          {topics.map((topic) => (
            <div
              key={topic}
              className="rounded-lg px-3 py-2 text-[12px]"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.2)",
                color: "#E5E7EB",
              }}
            >
              {topic}
            </div>
          ))}
        </div>

        <button
          className="mt-6 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          Launch AI Agent →
        </button>
      </div>
    </section>
  );
}
function BusinessImpact() {
  const impacts = [
    { value: "70%", label: "Reduction in Claim Processing Time" },
    { value: "85%", label: "Faster Knowledge Retrieval" },
    { value: "50%", label: "Reduction in Manual Tasks" },
    { value: "3x", label: "Faster Candidate Screening" },
    { value: "100%", label: "Audit Trail Coverage" },
    { value: "24/7", label: "Operational Automation" },
  ];

  return (
    <section className="mt-5">
      <div className="glass-card p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Business Impact
        </div>

        <h2 className="mt-3 text-[32px] font-bold text-white">
          Delivering Measurable Outcomes
        </h2>

        <p
          className="mt-2 max-w-3xl text-[14px]"
          style={{ color: "#9CA3AF" }}
        >
          AI systems should produce measurable business value. My work focuses
          on operational efficiency, intelligent automation, governance and
          decision-support systems that create real-world impact.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {impacts.map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-5"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="text-gradient-brand text-[32px] font-bold">
                {item.value}
              </div>

              <div
                className="mt-2 text-[13px]"
                style={{ color: "#9CA3AF" }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="mt-5">
      <div className="glass-card p-8 text-center">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Next Step
        </div>

        <h2 className="mt-3 text-[36px] font-bold text-white">
          Ready to Build AI Systems That Work in Production?
        </h2>

        <p
          className="mx-auto mt-3 max-w-3xl text-[14px]"
          style={{ color: "#9CA3AF" }}
        >
          From AI strategy and architecture to multi-agent systems,
          knowledge platforms and intelligent automation.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-lg px-5 py-3 text-[13px] font-semibold text-white"
            style={{
              background: "linear-gradient(135deg,#A855F7,#7C3AED)",
            }}
          >
            Book Strategy Call
          </button>

          <button
            className="rounded-lg px-5 py-3 text-[13px] font-semibold text-white"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            View Portfolio
          </button>

          <button
            className="rounded-lg px-5 py-3 text-[13px] font-semibold text-white"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            Explore Research
          </button>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mt-5 mb-10">
      <div className="glass-card p-6">
        <div className="grid gap-6 lg:grid-cols-3">

          <div>
            <div className="text-xl font-bold text-white">
              DRNATTECH AI Studio
            </div>

            <div
              className="mt-2 text-[13px]"
              style={{ color: "#9CA3AF" }}
            >
              Enterprise AI Architecture, Intelligent Automation,
              Multi-Agent Systems and Knowledge Platforms.
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              Expertise
            </div>

            <div
              className="mt-2 text-[13px] space-y-1"
              style={{ color: "#9CA3AF" }}
            >
              <div>AI Strategy & Transformation</div>
              <div>Enterprise AI Architecture</div>
              <div>Knowledge & RAG Systems</div>
              <div>Intelligent Automation</div>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold text-white">
              Location
            </div>

            <div
              className="mt-2 text-[13px]"
              style={{ color: "#9CA3AF" }}
            >
              Vienna, Austria
            </div>

            <div
              className="mt-4 text-[12px]"
              style={{ color: "#6B7280" }}
            >
              © 2026 DRNATTECH AI Studio
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}