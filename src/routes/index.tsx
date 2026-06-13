import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
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
  Scale,
  Eye,
  FileCheck,
  Globe,
  Building2,
  Bot,
  Database,
  Workflow,
  Layers,
  Network,
  Target,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
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

// GEO: extractable Q&A surfaced as FAQPage structured data so AI search
// engines (ChatGPT, Claude, Gemini, Perplexity) can cite the entity directly.
const homeFaq = [
  {
    q: "What does an AI Solutions Architect do?",
    a: "An AI Solutions Architect translates business problems into production-ready AI systems — designing architecture, multi-agent workflows, RAG and knowledge platforms, governance and intelligent automation that deliver measurable outcomes.",
  },
  {
    q: "Who is Dr. Ephraim Mpofu?",
    a: "Dr. Ephraim Mpofu is an AI Solutions Architect based in Vienna, Austria. He holds a PhD (NatTech) from BOKU Vienna, created the AISA, SKAIDO and Three Structural Laws frameworks, and builds enterprise AI systems that work in production.",
  },
  {
    q: "Does Dr. Mpofu help companies in Austria and the EU with AI governance?",
    a: "Yes. He designs AI systems for enterprises in Austria, the DACH region and the EU with auditability, human-in-the-loop oversight and EU AI Act readiness built in from the start.",
  },
  {
    q: "Which AI frameworks has Dr. Ephraim Mpofu created?",
    a: "He developed a proprietary framework suite including the AISA Framework, SKAIDO Framework, Three Structural Laws, Four Workflow Layers and Knowledge Architecture.",
  },
];

function HomeStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://drnattech.com/#webpage",
        url: "https://drnattech.com/",
        name: "Dr. Ephraim Mpofu — AI Solutions Architect, Vienna Austria",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": "https://drnattech.com/#faq",
        mainEntity: homeFaq.map((f) => ({
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

function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <HomeStructuredData />
      <BrandBackground />
      <SiteNav active="Home" />
      <main className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
        <Hero />
        <MetricsBar />
        <FeaturedCaseStudy />
        <FrameworkAndCapabilities />
        <TechnologyStrip />
        <GovernancePublicationsInsights />
        <AgentPreview />
        <CTASection />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. HERO — three-column executive layout
   ============================================================ */

function Hero() {
  const help = [
    {
      icon: Box,
      title: "Build Enterprise AI Systems",
      sub: "Production-ready systems with governance, auditability & security.",
    },
    {
      icon: Bot,
      title: "Design Multi-Agent Architectures",
      sub: "Autonomous agents and workflows that make decisions and act.",
    },
    {
      icon: ShieldCheck,
      title: "Implement AI Governance",
      sub: "EU AI Act readiness, compliance and responsible AI.",
    },
    {
      icon: Database,
      title: "Deploy Knowledge & RAG Platforms",
      sub: "Unlock knowledge with accurate, contextual and trusted AI.",
    },
    {
      icon: Workflow,
      title: "Automate Business Operations",
      sub: "End-to-end automation that reduces cost and increases speed.",
    },
  ];

  const credentials = [
    "PhD NatTech — BOKU Vienna",
    "Google Data Analytics Certified",
    "10+ Years Research & Project Experience",
    "AI Governance & EU AI Act Specialist",
  ];

  return (
    <section className="grid grid-cols-1 items-stretch gap-5 pt-10 lg:grid-cols-[1.05fr_1.15fr_1.05fr] lg:gap-6">
      {/* LEFT — value proposition + CTAs */}
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em]"
          style={{
            background: "rgba(139,92,246,0.10)",
            border: "1px solid rgba(139,92,246,0.32)",
            color: "#C4B5FD",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#A855F7", boxShadow: "0 0 8px #A855F7" }}
          />
          AI SOLUTIONS ARCHITECT
        </span>

        <h1 className="mt-6 text-[40px] font-bold leading-[1.05] tracking-tight text-white sm:text-[46px] lg:text-[50px]">
          Enterprise AI Systems That{" "}
          <span className="text-gradient-brand">Work in Production</span>
        </h1>

        <p
          className="mt-5 max-w-md text-[15px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          I design and build intelligent automation systems that solve real
          business problems and deliver measurable results.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:brand-glow"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Rocket className="h-4 w-4" /> See My Work
          </Link>
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <MessageCircle className="h-4 w-4" /> Ask Me Anything
          </Link>
        </div>

        <div
          className="mt-6 inline-flex w-fit items-center gap-2 text-[12.5px] font-medium"
          style={{ color: "#9CA3AF" }}
        >
          <MapPin className="h-4 w-4" style={{ color: "#A855F7" }} />
          Vienna, Austria · DACH & Remote
        </div>
      </div>

      {/* CENTER — authority profile */}
      <div className="glass-card flex flex-col overflow-hidden p-0">
        <div
          className="relative aspect-[4/3] w-full overflow-hidden"
          style={{ background: "linear-gradient(180deg, #0A0E22, #050816)" }}
        >
          <div
            className="absolute left-1/2 top-[12%] h-[230px] w-[230px] -translate-x-1/2 rounded-full"
            style={{
              border: "2px solid #A855F7",
              boxShadow:
                "0 0 60px 6px rgba(168,85,247,0.55), inset 0 0 60px rgba(139,92,246,0.25)",
              opacity: 0.85,
            }}
          />
          <Stars />
          <img
            src={heroPortrait}
            alt="Dr. Ephraim Mpofu — AI Solutions Architect"
            className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2 object-contain object-bottom"
            style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
          />
          <div className="absolute bottom-3 left-5">
            <Signature size="md" />
          </div>
        </div>

        <div className="p-5">
          <div className="text-[19px] font-bold text-white">
            Dr. Ephraim Mpofu
          </div>
          <div
            className="mt-1 text-[13px] font-semibold"
            style={{ color: "#A855F7" }}
          >
            AI Solutions Architect
          </div>
          <ul className="mt-4 space-y-2.5">
            {credentials.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 text-[12.5px]"
                style={{ color: "#C4B5FD" }}
              >
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: "#A855F7" }}
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* RIGHT — I Help Organizations */}
      <div className="glass-card flex flex-col p-5">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          I Help Organizations
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {help.map((h) => (
            <div key={h.title} className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <h.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="text-[12.5px] font-bold text-white">
                  {h.title}
                </div>
                <div
                  className="mt-1 text-[11px] leading-snug"
                  style={{ color: "#9CA3AF" }}
                >
                  {h.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Link
          to="/contact"
          className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
          style={{ color: "#A855F7" }}
        >
          Let's build systems that deliver. <ArrowRight className="h-3.5 w-3.5" />
        </Link>
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
    <svg
      className="absolute inset-0 h-full w-full opacity-60"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.s * 0.08} fill="#A855F7" />
      ))}
    </svg>
  );
}

/* ============================================================
   2. AUTHORITY METRICS BAR
   ============================================================ */

const metrics = [
  { icon: Box, value: "9+", a: "Peer Reviewed", b: "Publications" },
  { icon: Clock, value: "3,500+", a: "Hours of Manual", b: "Work Automated" },
  { icon: TrendingUp, value: "70%", a: "Average Process", b: "Time Reduction" },
  { icon: ShieldCheck, value: "100%", a: "Built for", b: "Production" },
  { icon: Monitor, value: "24/7", a: "Systems", b: "Monitoring" },
  { icon: Building2, value: "6", a: "Industries", b: "Served" },
  { icon: Globe, value: "DACH & EU", a: "Vienna, Austria", b: "& Remote" },
];

function MetricsBar() {
  return (
    <section className="mt-5">
      <div className="glass-card flex flex-wrap items-stretch px-2 py-2">
        {metrics.map((m, i) => (
          <div
            key={m.value + m.a}
            className="flex min-w-[150px] flex-1 items-center gap-3 px-4 py-3"
            style={
              i > 0
                ? { borderLeft: "1px solid rgba(255,255,255,0.06)" }
                : undefined
            }
          >
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.28)",
              }}
            >
              <m.icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <div className="min-w-0">
              <div className="text-gradient-brand text-[22px] font-bold leading-none">
                {m.value}
              </div>
              <div
                className="mt-1 text-[11px] font-medium leading-tight"
                style={{ color: "#9CA3AF" }}
              >
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

/* ============================================================
   3. FEATURED CASE STUDY
   ============================================================ */

const caseMetrics = [
  { value: "70%", label: "Reduction in Processing Time" },
  { value: "35%", label: "Increase in Fraud Detection" },
  { value: "100%", label: "Audit Trail Coverage" },
];

const industries = [
  { icon: ShieldCheck, label: "Insurance & Financial Services" },
  { icon: Bot, label: "AI & Automation" },
  { icon: Network, label: "Telecommunications (Huawei)" },
  { icon: Globe, label: "International Development (World Bank)" },
  { icon: Building2, label: "Academia & Research" },
  { icon: Layers, label: "Conservation & Sustainability" },
];

function FeaturedCaseStudy() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.9fr_0.95fr]">
      {/* Featured project + architecture */}
      <div className="glass-card flex flex-col p-7">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.15fr]">
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
            <p
              className="mt-3 text-[13.5px] leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              Multi-agent system that combines CV intelligence, job
              intelligence, semantic matching, ATS optimization and workflow
              orchestration into a closed-loop Career Intelligence Operating
              System.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {caseMetrics.map((m) => (
                <div key={m.label}>
                  <div className="text-gradient-brand text-[22px] font-bold leading-none">
                    {m.value}
                  </div>
                  <div
                    className="mt-1.5 text-[11px] leading-tight"
                    style={{ color: "#9CA3AF" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                View Case Study <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                View Portfolio <ExternalLink className="h-3.5 w-3.5" />
              </Link>
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

      {/* Experience across industries */}
      <div className="glass-card p-5">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Experience Across Industries
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {industries.map((ind) => (
            <div
              key={ind.label}
              className="flex items-center gap-3 rounded-lg px-4 py-3"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.18)",
              }}
            >
              <ind.icon
                className="h-4 w-4 shrink-0"
                style={{ color: "#C4B5FD" }}
              />
              <span className="text-[12.5px] font-medium text-white">
                {ind.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureDiagram() {
  const cols = 5;
  const rows = 4;
  return (
    <div
      className="grid h-full w-full gap-2"
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
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

/* ============================================================
   4. FRAMEWORK ECOSYSTEM   +   5. ENTERPRISE AI CAPABILITIES
   ============================================================ */

const frameworks = [
  {
    k: "aisa",
    title: "AISA Framework",
    description:
      "Strategic AI Engagement Framework — translating business problems into production-ready AI architectures.",
    link: "/aisa",
  },
  {
    k: "skaido",
    title: "SKAIDO Framework",
    description:
      "Enterprise AI implementation framework for moving from strategy to measurable business outcomes.",
    link: "/frameworks-skaido",
  },
  {
    k: "laws",
    title: "Three Structural Laws",
    description:
      "Foundational principles for designing scalable, maintainable and production-ready AI systems.",
    link: "/frameworks-three-structural-laws",
  },
  {
    k: "layers",
    title: "Four Workflow Layers",
    description:
      "Layered workflow architecture for reliable, observable and scalable automation systems.",
    link: "/frameworks",
  },
  {
    k: "knowledge",
    title: "Knowledge Architecture",
    description:
      "Enterprise framework for knowledge acquisition, intelligence, indexing and RAG governance.",
    link: "/frameworks",
  },
] as const;

const capabilities = [
  { icon: Target, title: "AI Strategy & Transformation" },
  { icon: Building2, title: "Enterprise AI Architecture" },
  { icon: Bot, title: "Multi-Agent Systems" },
  { icon: Database, title: "Knowledge & RAG Platforms" },
  { icon: Workflow, title: "Intelligent Automation" },
  { icon: ShieldCheck, title: "AI Governance & Evaluation" },
];

function FrameworkVisual({ k }: { k: string }) {
  if (k === "aisa") {
    return (
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          boxShadow: "0 6px 18px -6px rgba(168,85,247,0.6)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 3 L20 21 H16.2 L12 10.5 L7.8 21 H4 Z" fill="#fff" />
          <rect x="9.2" y="14.6" width="5.6" height="2.2" rx="1" fill="#A855F7" />
        </svg>
      </div>
    );
  }

  if (k === "skaido") {
    const nodes = [
      { l: "S", c: "#A855F7" },
      { l: "K", c: "#6366F1" },
      { l: "A", c: "#3B82F6" },
      { l: "I", c: "#14B8A6" },
      { l: "D", c: "#F59E0B" },
      { l: "O", c: "#EF4444" },
    ];
    return (
      <svg
        viewBox="0 0 156 26"
        className="w-full"
        style={{ maxWidth: 150, height: "auto" }}
      >
        <line
          x1="13"
          y1="13"
          x2="143"
          y2="13"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        {nodes.map((n, i) => {
          const cx = 13 + i * 26;
          return (
            <g key={n.l}>
              <circle cx={cx} cy="13" r="11" fill={n.c} />
              <text
                x={cx}
                y="17"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#fff"
              >
                {n.l}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (k === "laws") {
    return (
      <div className="flex items-end gap-3">
        <Scale className="h-7 w-7" style={{ color: "#A855F7" }} />
        <Database className="h-6 w-6" style={{ color: "#3B82F6" }} />
        <Eye className="h-6 w-6" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  if (k === "layers") {
    const layers = [
      { y: 5, c: "#A855F7" },
      { y: 14, c: "#6366F1" },
      { y: 23, c: "#14B8A6" },
      { y: 32, c: "#F59E0B" },
    ];
    return (
      <svg width="56" height="46" viewBox="0 0 56 46">
        {layers.map((L, i) => (
          <polygon
            key={i}
            points={`28,${L.y} 52,${L.y + 6} 28,${L.y + 12} 4,${L.y + 6}`}
            fill={L.c}
            opacity="0.92"
          />
        ))}
      </svg>
    );
  }

  // knowledge architecture — knowledge graph / network
  return (
    <svg width="62" height="46" viewBox="0 0 62 46">
      <g stroke="rgba(168,85,247,0.45)" strokeWidth="1.5">
        <line x1="11" y1="16" x2="31" y2="9" />
        <line x1="31" y1="9" x2="51" y2="18" />
        <line x1="11" y1="16" x2="29" y2="36" />
        <line x1="29" y1="36" x2="51" y2="18" />
        <line x1="31" y1="9" x2="29" y2="36" />
      </g>
      {[
        [11, 16, 4.5],
        [31, 9, 6.5],
        [51, 18, 4.5],
        [29, 36, 4.5],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={i === 1 ? "#A855F7" : "rgba(139,92,246,0.65)"}
          stroke="#C4B5FD"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function FrameworkAndCapabilities() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr]">
      {/* Framework suite */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between gap-3">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "#8B8B9A" }}
          >
            Proprietary Framework Suite
          </div>
          <Link
            to="/frameworks"
            className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: "#A855F7" }}
          >
            View All →
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {frameworks.map((f) => (
            <Link
              key={f.title}
              to={f.link}
              className="flex flex-col items-center gap-3 rounded-xl p-4 text-center transition-all hover:-translate-y-0.5 hover:brand-glow"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <div className="flex h-12 w-full items-center justify-center">
                <FrameworkVisual k={f.k} />
              </div>
              <div className="text-[13.5px] font-bold leading-snug text-white">
                {f.title}
              </div>
              <div
                className="text-[11px] leading-snug"
                style={{ color: "#9CA3AF" }}
              >
                {f.description}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Enterprise capabilities */}
      <div className="glass-card p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Enterprise AI Capabilities
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {capabilities.map((c) => (
            <div
              key={c.title}
              className="flex items-center gap-3 rounded-lg p-3"
              style={{
                background: "rgba(59,130,246,0.05)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <c.icon
                className="h-5 w-5 shrink-0"
                style={{ color: "#C4B5FD" }}
              />
              <div className="text-[12px] font-semibold leading-tight text-white">
                {c.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TECHNOLOGIES & PLATFORMS
   ============================================================ */

type Tech = {
  name: string;
  // slug present => real logo served by the Simple Icons CDN.
  slug?: string;
  // colour = CDN tint (6-hex, no #) and the monogram-chip background.
  color: string;
  // azure: inline mark (Simple Icons dropped Microsoft brands).
  svg?: "azure";
  // dark monogram text where the chip background is light.
  monoText?: string;
};

// OpenAI, Azure, Pinecone and Power BI are no longer on the Simple Icons CDN
// (removed for trademark reasons) and no reliable public source serves them
// here — those degrade to a branded chip instead of a broken image.
const technologies: Tech[] = [
  { name: "OpenAI", color: "10A37F" },
  { name: "Claude", slug: "claude", color: "D97757" },
  { name: "Azure", color: "0078D4", svg: "azure" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "PostgreSQL", slug: "postgresql", color: "6C9BD8" },
  { name: "LangChain", slug: "langchain", color: "FFFFFF" },
  { name: "Pinecone", color: "2C8EFF" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Python", slug: "python", color: "FFD43B" },
  { name: "Power BI", color: "F2C811", monoText: "#1F2937" },
];

function TechLogo({ t }: { t: Tech }) {
  const [failed, setFailed] = useState(false);

  if (t.svg === "azure") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Azure">
        <path d="M11 4 L4 18 L10 18 L13 13 Z" fill="#0078D4" />
        <path d="M13 9 L20 18 L13 18 L11 15 Z" fill="#50E6FF" />
      </svg>
    );
  }

  if (t.slug && !failed) {
    return (
      <img
        src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
        alt={t.name}
        className="h-5 w-5 object-contain"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  // Branded monogram fallback — never a broken image.
  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-[5px] text-[10px] font-bold"
      style={{ background: `#${t.color}`, color: t.monoText ?? "#ffffff" }}
      aria-label={t.name}
    >
      {t.name.charAt(0)}
    </span>
  );
}

function TechnologyStrip() {
  return (
    <section className="mt-5">
      <div className="glass-card flex flex-wrap items-center gap-x-6 gap-y-4 px-6 py-5">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Technologies & Platforms I Work With
        </div>
        {technologies.map((t) => (
          <div key={t.name} className="flex items-center gap-2">
            <TechLogo t={t} />
            <span className="text-[12.5px] font-semibold text-white">
              {t.name}
            </span>
          </div>
        ))}
        <span className="text-[12px] font-semibold" style={{ color: "#A855F7" }}>
          &amp; More
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   6. GOVERNANCE & EU AI ACT  +  7. PUBLICATIONS  +  8. INSIGHTS
   ============================================================ */

const governancePillars = [
  {
    icon: Scale,
    title: "EU AI Act Readiness",
    description:
      "Systems designed for EU regulatory alignment, risk classification and documentation from day one.",
  },
  {
    icon: Eye,
    title: "Auditability & Observability",
    description:
      "Every decision is traceable, explainable and monitored through logs, evaluation and escalation.",
  },
  {
    icon: CheckCircle2,
    title: "Human-in-the-Loop",
    description:
      "Critical decisions stay governed through approval workflows, escalation paths and oversight.",
  },
  {
    icon: FileCheck,
    title: "Data Governance & Compliance",
    description:
      "GDPR-aware data handling, access controls and audit trails built into the architecture.",
  },
];

const publicationTags = [
  "AI Systems & Automation",
  "Knowledge Architecture",
  "Landscape Governance",
  "Sustainability Science",
];

const insights = [
  {
    title: "AI Agents vs Workflows",
    sub: "When to use each for enterprise systems",
  },
  {
    title: "Knowledge Architecture Principles",
    sub: "Designing systems that scale knowledge",
  },
  {
    title: "Enterprise AI Governance",
    sub: "Practical steps for EU AI Act compliance",
  },
  {
    title: "Building Production AI Systems",
    sub: "From prototype to enterprise deployment",
  },
];

function GovernancePublicationsInsights() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
      {/* Governance */}
      <div className="glass-card flex flex-col p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Built for Governance & the EU AI Act
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {governancePillars.map((p) => (
            <div key={p.title}>
              <p.icon className="h-5 w-5" style={{ color: "#A855F7" }} />
              <div className="mt-2 text-[13px] font-semibold text-white">
                {p.title}
              </div>
              <div
                className="mt-1 text-[11px] leading-snug"
                style={{ color: "#9CA3AF" }}
              >
                {p.description}
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Discuss AI Governance <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Publications */}
      <div className="glass-card flex flex-col p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Research & Publications
        </div>
        <h3 className="mt-3 text-[26px] font-bold text-white">
          9+ Peer-Reviewed Publications
        </h3>
        <p className="mt-2 text-[13px]" style={{ color: "#9CA3AF" }}>
          Research spanning AI systems, knowledge management, sustainability
          science, governance and intelligent automation.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {publicationTags.map((t) => (
            <span
              key={t}
              className="rounded-lg px-3 py-2 text-[12px]"
              style={{
                background: "rgba(139,92,246,0.08)",
                border: "1px solid rgba(139,92,246,0.20)",
                color: "#E5E7EB",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <Link
          to="/publications"
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          View Publications <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Insights */}
      <div className="glass-card flex flex-col p-6">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Latest Insights
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {insights.map((it) => (
            <div
              key={it.title}
              className="flex items-center justify-between gap-3 rounded-lg p-3"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.15)",
              }}
            >
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white">
                  {it.title}
                </div>
                <div
                  className="mt-0.5 text-[11px] leading-snug"
                  style={{ color: "#9CA3AF" }}
                >
                  {it.sub}
                </div>
              </div>
              <ChevronRight
                className="h-4 w-4 shrink-0"
                style={{ color: "#6B7280" }}
              />
            </div>
          ))}
        </div>
        <Link
          to="/insights"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Explore Insights <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   9. AI AGENT
   ============================================================ */

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

        <p className="mt-2 max-w-2xl text-[13px]" style={{ color: "#9CA3AF" }}>
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

        <Link
          to="/ai-agent"
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-semibold text-white"
          style={{ border: "1px solid rgba(255,255,255,0.15)" }}
        >
          Launch AI Agent <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   10. FINAL CTA
   ============================================================ */

function CTASection() {
  return (
    <section className="mt-5">
      <div
        className="glass-card p-6 lg:p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(20,20,40,0.6))",
        }}
      >
        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[auto_1fr_auto]">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(168,85,247,0.2))",
              border: "1px solid rgba(139,92,246,0.55)",
              boxShadow: "0 0 30px -6px rgba(139,92,246,0.7)",
            }}
          >
            <Rocket className="h-7 w-7" style={{ color: "#C4B5FD" }} />
          </div>

          <div>
            <h2 className="text-[28px] font-bold leading-tight text-white">
              Ready to Build AI Systems That Work in Production?
            </h2>
            <p className="mt-2 text-[14px]" style={{ color: "#9CA3AF" }}>
              From AI strategy and architecture to multi-agent systems,
              knowledge platforms and intelligent automation.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[13px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#A855F7,#7C3AED)" }}
            >
              Book Strategy Call
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              View Portfolio <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
