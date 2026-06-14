import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ExternalLink,
  Box,
  Database,
  ShieldCheck,
  MapPin,
  Bot,
  Rocket,
  Clock,
  Globe,
  TrendingUp,
  FileText,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Dr. Ephraim Mpofu | AI Solutions Architect Vienna Austria",
      },
      {
        name: "description",
        content:
          "AI Solutions Architect specialising in enterprise AI systems, intelligent automation, AI agents, RAG platforms and knowledge architectures.",
      },
      {
        property: "og:title",
        content: "Dr. Ephraim Mpofu | AI Solutions Architect Vienna Austria",
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

export function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <HomeStructuredData />
      <BrandBackground />
      <SiteNav active="Home" />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <Hero />
        <TrustBar />
        <WhatIBuild />
        <FeaturedCaseStudy />
        <FrameworksSection />
        <AuthoritySection />
        <AgentCard />
        <FinalCta />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

const capabilities = [
  {
    Icon: Box,
    title: "Build AI Systems",
    desc: "Production-ready systems with scalability, reliability and security built in.",
  },
  {
    Icon: Database,
    title: "Knowledge Platforms",
    desc: "RAG systems, enterprise search and knowledge management at scale.",
  },
  {
    Icon: ShieldCheck,
    title: "AI Governance",
    desc: "EU AI Act readiness, risk management and responsible AI architecture.",
  },
];

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-5 pt-10 lg:grid-cols-[2fr_1.8fr_1.5fr] lg:gap-6 lg:pt-14">

      {/* LEFT — value proposition */}
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

        <h1 className="mt-6 text-[42px] font-bold leading-[1.04] tracking-tight text-white sm:text-[48px] lg:text-[54px]">
          Enterprise AI Systems That{" "}
          <span className="text-gradient-brand">Work in Production</span>
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          I design and build intelligent AI systems for organisations that need
          measurable outcomes, governance, and production reliability.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            Book Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            View Portfolio
          </Link>
        </div>

        <div
          className="mt-6 inline-flex w-fit items-center gap-2 text-[12.5px] font-medium"
          style={{ color: "#9CA3AF" }}
        >
          <MapPin className="h-4 w-4" style={{ color: "#A855F7" }} />
          Vienna, Austria · DACH & EU
        </div>
      </div>

      {/* CENTER — hero portrait */}
      <div className="relative hidden min-h-[500px] overflow-hidden lg:block">
        <img
          src="/images/Dr Mpofu_purple2.png"
          alt="Dr. Ephraim Mpofu — AI Solutions Architect"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        {/* Fade to page background at bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
          style={{ background: "linear-gradient(to bottom, transparent, #050816)" }}
        />
      </div>

      {/* RIGHT — 3 separate compact capability cards */}
      <div className="flex flex-col justify-center gap-3">
        {capabilities.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-[14px] p-4"
            style={{
              background: "rgba(7,11,28,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.30)",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">{title}</div>
              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
        <Link
          to="/contact"
          className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold"
          style={{ color: "#A855F7" }}
        >
          Let's build together <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   2. TRUST BAR
   ============================================================ */

const trustMetrics = [
  { Icon: FileText, value: "9+", label: "Peer-Reviewed Publications" },
  { Icon: Clock, value: "3,500+", label: "Hours Automated" },
  { Icon: TrendingUp, value: "6", label: "Industries Served" },
  { Icon: Globe, value: "DACH & EU", label: "Vienna, Austria" },
];

function TrustBar() {
  return (
    <section className="mt-5">
      <div className="glass-card flex flex-wrap items-stretch">
        {trustMetrics.map(({ Icon, value, label }, i) => (
          <div
            key={value}
            className="flex min-w-[140px] flex-1 flex-col items-center justify-center px-5 py-4"
            style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.06)" } : undefined}
          >
            <div
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
            </div>
            <div className="text-gradient-brand text-[24px] font-bold leading-none">
              {value}
            </div>
            <div className="mt-1.5 text-center text-[11px] font-medium" style={{ color: "#9CA3AF" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   3. WHAT I BUILD
   ============================================================ */

const buildItems = [
  {
    Icon: Box,
    title: "AI Systems",
    desc: "End-to-end AI systems designed for enterprise scale. Multi-agent architectures, intelligent automation and production deployment with full auditability.",
    link: "/portfolio" as const,
    linkLabel: "View case studies",
  },
  {
    Icon: Database,
    title: "Knowledge Platforms",
    desc: "RAG-powered knowledge architectures that surface the right information at the right time. Semantic search, vector databases and knowledge governance.",
    link: "/frameworks" as const,
    linkLabel: "See the architecture",
  },
  {
    Icon: ShieldCheck,
    title: "AI Governance",
    desc: "AI governance frameworks built for the EU AI Act. Risk classification, auditability, human-in-the-loop oversight and responsible AI from day one.",
    link: "/frameworks" as const,
    linkLabel: "Explore frameworks",
  },
];

function WhatIBuild() {
  return (
    <section className="mt-14 lg:mt-16">
      <div className="mb-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          What I Build
        </div>
        <h2 className="mt-2.5 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
          Intelligent Systems for Organisations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {buildItems.map(({ Icon, title, desc, link, linkLabel }) => (
          <div key={title} className="glass-card flex flex-col p-5">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.28)",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <h3 className="mt-4 text-[18px] font-bold text-white">{title}</h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              {desc}
            </p>
            <Link
              to={link}
              className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
              style={{ color: "#A855F7" }}
            >
              {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. FEATURED CASE STUDY
   ============================================================ */

const caseMetrics = [
  { value: "80%", label: "Claims Processing Reduction" },
  { value: "95%", label: "Document Classification Accuracy" },
  { value: "100%", label: "Audit Trail Coverage" },
];

function FeaturedCaseStudy() {
  return (
    <section className="mt-5">
      <div className="glass-card p-7 lg:p-9">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.15fr]">

          {/* Left — text + metrics */}
          <div className="flex flex-col justify-center">
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

            <h2 className="mt-5 text-[26px] font-bold leading-tight text-white lg:text-[30px]">
              Insurance Claims Intelligence Platform
            </h2>

            <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              A multi-agent AI orchestration platform that automates claims intake,
              document intelligence, image analysis and fraud detection — with
              human-in-the-loop review and full auditability built in.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-4">
              {caseMetrics.map((m) => (
                <div key={m.label}>
                  <div className="text-gradient-brand text-[26px] font-bold leading-none">
                    {m.value}
                  </div>
                  <div className="mt-1.5 text-[11px] leading-tight" style={{ color: "#9CA3AF" }}>
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/portfolio/insurance-claims-intelligence-platform"
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              >
                View Case Study <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                View Portfolio <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Right — career intelligence dashboard image */}
          <div
            className="relative min-h-[280px] overflow-hidden rounded-[14px] lg:min-h-[320px]"
            style={{ border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <img
              src="/images/WF_Insurance_MAIN_Insurance_Claims_Orchestrator.png"
              alt="Insurance Claims Intelligence Platform — Workflow Orchestration"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(5,8,22,0.18) 0%, transparent 45%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. FRAMEWORKS
   ============================================================ */

function FrameworkLayersVisual() {
  const cx = 120, viewW = 240, viewH = 168;
  const lw = 90, lh = 22, th = 10;

  const layerDefs = [
    {
      ty: 28,
      top: "#A855F7", left: "#6D28D9", right: "#7C3AED",
      glow: "rgba(168,85,247,0.38)", label: "AI Governance",
    },
    {
      ty: 62,
      top: "#6366F1", left: "#4338CA", right: "#4F46E5",
      glow: "rgba(99,102,241,0.32)", label: "Knowledge Arch.",
    },
    {
      ty: 96,
      top: "#14B8A6", left: "#0F766E", right: "#0D9488",
      glow: "rgba(20,184,166,0.30)", label: "Workflow Layers",
    },
    {
      ty: 130,
      top: "#F59E0B", left: "#B45309", right: "#D97706",
      glow: "rgba(245,158,11,0.30)", label: "AISA Framework",
    },
  ];

  // Draw from gold (bottom) to purple (top) so top layers render in front
  const drawOrder = [...layerDefs].reverse();

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="h-auto w-full"
      style={{ maxWidth: 280 }}
    >
      <defs>
        <radialGradient id="fwbg" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={viewW} height={viewH} fill="url(#fwbg)" />

      {drawOrder.map(({ ty, top, left, right, glow, label }) => {
        const topFace = `${cx - lw},${ty} ${cx},${ty - lh} ${cx + lw},${ty} ${cx},${ty + lh}`;
        const rightFace = `${cx + lw},${ty} ${cx},${ty + lh} ${cx},${ty + lh + th} ${cx + lw},${ty + th}`;
        const leftFace = `${cx - lw},${ty} ${cx},${ty + lh} ${cx},${ty + lh + th} ${cx - lw},${ty + th}`;
        return (
          <g key={label}>
            <ellipse cx={cx} cy={ty + lh + 4} rx={lw * 0.55} ry="5" fill={glow} opacity="0.55" />
            <polygon points={leftFace} fill={left} opacity="0.52" />
            <polygon points={rightFace} fill={right} opacity="0.42" />
            <polygon points={topFace} fill={top} opacity="0.88" />
            <text
              x={cx} y={ty + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="6" fontWeight="700" opacity="0.88"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FrameworksSection() {
  return (
    <section className="mt-5">
      <div
        className="glass-card grid grid-cols-1 gap-10 p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:p-12"
        style={{
          background:
            "radial-gradient(ellipse at 75% 50%, rgba(139,92,246,0.08) 0%, transparent 65%), rgba(7,11,28,0.8)",
        }}
      >
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "#8B8B9A" }}
          >
            Proprietary Frameworks
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
            The Frameworks Behind Every System
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Every system I build is grounded in five proprietary frameworks —
            AISA, SKAIDO, Three Structural Laws, Four Workflow Layers and Knowledge
            Architecture — developed through years of research and enterprise practice.
          </p>
          <Link
            to="/frameworks"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            Explore Frameworks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <FrameworkLayersVisual />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. AUTHORITY — PUBLICATIONS + INSIGHT
   ============================================================ */

function PublicationIllustration() {
  return (
    <svg viewBox="0 0 90 100" className="h-[90px] w-auto shrink-0 opacity-80">
      {/* Back paper */}
      <g transform="rotate(-6 45 52)">
        <rect x="10" y="15" width="56" height="70" rx="5"
          fill="rgba(139,92,246,0.10)" stroke="rgba(139,92,246,0.28)" strokeWidth="1.2" />
      </g>
      {/* Middle paper */}
      <g transform="rotate(-2.5 45 52)">
        <rect x="10" y="12" width="56" height="70" rx="5"
          fill="rgba(139,92,246,0.16)" stroke="rgba(139,92,246,0.36)" strokeWidth="1.2" />
      </g>
      {/* Front paper */}
      <rect x="10" y="8" width="56" height="72" rx="5"
        fill="rgba(7,11,28,0.94)" stroke="rgba(139,92,246,0.58)" strokeWidth="1.3" />
      {/* Header accent */}
      <rect x="17" y="16" width="42" height="7" rx="3"
        fill="rgba(168,85,247,0.28)" />
      {/* Text lines */}
      <line x1="17" y1="31" x2="60" y2="31" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="17" y1="39" x2="56" y2="39" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="47" x2="58" y2="47" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="55" x2="53" y2="55" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="63" x2="57" y2="63" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function GovernanceIllustration() {
  return (
    <svg viewBox="0 0 90 100" className="h-[90px] w-auto shrink-0 opacity-80">
      {/* Book cover */}
      <rect x="8" y="18" width="36" height="62" rx="3"
        fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.48)" strokeWidth="1.3" />
      {/* Book spine */}
      <rect x="5" y="18" width="6" height="62" rx="2.5"
        fill="rgba(168,85,247,0.42)" stroke="rgba(139,92,246,0.48)" strokeWidth="0.8" />
      {/* Page lines */}
      <line x1="14" y1="34" x2="38" y2="34" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" />
      <line x1="14" y1="42" x2="36" y2="42" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      <line x1="14" y1="50" x2="38" y2="50" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      {/* Floating shield */}
      <path d="M56 12 L78 18 L78 40 Q78 56 56 64 Q34 56 34 40 L34 18 Z"
        fill="rgba(139,92,246,0.14)" stroke="rgba(168,85,247,0.52)" strokeWidth="1.4" />
      {/* Checkmark in shield */}
      <polyline points="46,38 53,46 68,30"
        stroke="#A855F7" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function AuthoritySection() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

      {/* Publications */}
      <div className="glass-card p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#8B8B9A" }}
            >
              Research & Publications
            </div>
            <div className="mt-4 text-[48px] font-bold leading-none text-gradient-brand">9+</div>
            <div className="mt-2 text-[15px] font-semibold text-white">
              Peer-Reviewed Publications
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Research spanning AI systems, knowledge management, sustainability science
              and intelligent automation.
            </p>
            <Link
              to="/publications"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              View Publications <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="shrink-0 pt-1">
            <PublicationIllustration />
          </div>
        </div>
      </div>

      {/* Featured Insight */}
      <div className="glass-card p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#8B8B9A" }}
            >
              Featured Insight
            </div>
            <div
              className="mt-4 inline-flex w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.28)",
                color: "#C4B5FD",
              }}
            >
              AI Governance
            </div>
            <h3 className="mt-3 text-[20px] font-bold leading-tight text-white">
              Enterprise AI Governance
            </h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Practical steps for EU AI Act compliance and building responsible AI systems
              that organisations can trust.
            </p>
            <Link
              to="/insights"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Read Article <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="shrink-0 pt-1">
            <GovernanceIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. AI AGENT — prominent product section
   ============================================================ */

function AgentCard() {
  return (
    <section className="mt-5">
      <div
        className="glass-card grid grid-cols-1 items-center gap-5 p-7 lg:grid-cols-[auto_1fr_auto]"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(7,11,28,0.82) 100%)",
          border: "1px solid rgba(139,92,246,0.22)",
        }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.30), rgba(168,85,247,0.16))",
            border: "1px solid rgba(139,92,246,0.45)",
            boxShadow: "0 0 24px -4px rgba(139,92,246,0.6)",
          }}
        >
          <Bot className="h-7 w-7" style={{ color: "#C4B5FD" }} />
        </div>

        <div>
          <div className="text-[19px] font-bold text-white">Ask My AI Agent</div>
          <div className="mt-1 text-[13.5px]" style={{ color: "#9CA3AF" }}>
            Get instant answers about my research, frameworks, case studies, architecture and enterprise AI systems.
          </div>
        </div>

        <Link
          to="/ai-agent"
          className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
        >
          Launch AI Agent <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   8. FINAL CTA — compact horizontal layout
   ============================================================ */

function FinalCta() {
  return (
    <section className="mt-5 mb-5">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-9"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(20,20,40,0.6))",
        }}
      >
        {/* Left: icon + headline + description */}
        <div className="flex items-center gap-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(168,85,247,0.20))",
              border: "1px solid rgba(139,92,246,0.55)",
              boxShadow: "0 0 28px -6px rgba(139,92,246,0.70)",
            }}
          >
            <Rocket className="h-6 w-6" style={{ color: "#C4B5FD" }} />
          </div>
          <div>
            <h2 className="text-[22px] font-bold leading-tight text-white lg:text-[26px]">
              Ready to Build AI Systems That Work in Production?
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              AI strategy, architecture, multi-agent systems, knowledge platforms and intelligent automation.
            </p>
          </div>
        </div>

        {/* Right: 2 CTAs */}
        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,#A855F7,#7C3AED)" }}
          >
            Book Strategy Call <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5 whitespace-nowrap"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            View Portfolio <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
