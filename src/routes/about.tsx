import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment } from "react";
import type { ReactNode } from "react";
import heroPortrait from "@/assets/hero-portrait.jpg";
import {
  MapPin,
  Globe,
  Rocket,
  Quote,
  Target,
  Eye,
  ShieldCheck,
  Layers,
  GraduationCap,
  Boxes,
  Brain,
  Network,
  Building2,
  CheckCircle2,
  BookOpen,
  FileText,
  Mic,
  Share2,
  Clock,
  TrendingUp,
  Puzzle,
  Leaf,
  ArrowRight,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import { Signature } from "@/components/brand/Signature";
import { FrameworkVisual } from "@/components/brand/FrameworkVisual";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About Dr. Ephraim Mpofu | AI Solutions Architect & Framework Creator, Vienna",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu is an AI Solutions Architect and framework creator in Vienna, Austria — building research-driven, governed, production-grade enterprise AI systems, AI agents, RAG and knowledge architectures.",
      },
      {
        property: "og:title",
        content:
          "About Dr. Ephraim Mpofu | AI Solutions Architect & Framework Creator",
      },
      {
        property: "og:description",
        content:
          "Researcher, systems thinker and creator of the AISA, SKAIDO, Three Structural Laws, Four Workflow Layers and Knowledge Architecture frameworks.",
      },
    ],
  }),

  component: AboutPage,
});

/* ============================================================
   GEO — Person + framework-authorship structured data
   ============================================================ */

function AboutStructuredData() {
  const frameworks = [
    { name: "AISA Framework", url: "https://drnattech.com/aisa" },
    { name: "SKAIDO Framework", url: "https://drnattech.com/frameworks-skaido" },
    {
      name: "Three Structural Laws",
      url: "https://drnattech.com/frameworks-three-structural-laws",
    },
    { name: "Four Workflow Layers", url: "https://drnattech.com/frameworks" },
    { name: "Knowledge Architecture", url: "https://drnattech.com/frameworks" },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://drnattech.com/about#webpage",
        url: "https://drnattech.com/about",
        name: "About Dr. Ephraim Mpofu — AI Solutions Architect & Framework Creator",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": "https://drnattech.com/#person",
        name: "Dr. Ephraim Mpofu",
        jobTitle: "AI Solutions Architect",
        description:
          "AI Solutions Architect and framework creator based in Vienna, Austria, specialising in research-driven, governed, production-grade enterprise AI systems, AI agents, RAG and knowledge architectures.",
        url: "https://drnattech.com",
        sameAs: ["https://www.linkedin.com/in/ephraim-mpofu-a340608b/"],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "BOKU University, Vienna",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vienna",
          addressCountry: "AT",
        },
        knowsAbout: [
          "AI Solutions Architecture",
          "Enterprise AI",
          "AI Agents",
          "RAG Systems",
          "Knowledge Architecture",
          "AI Governance",
          "Workflow Automation",
          "AI Strategy",
        ],
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "PhD in Natural Technology (NatTech), BOKU University Vienna",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Microsoft Azure AI-103 Certified",
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Google Data Analytics Professional",
          },
        ],
      },
      {
        "@type": "DefinedTermSet",
        "@id": "https://drnattech.com/#framework-suite",
        name: "DRNATTECH AI Framework Suite",
        creator: { "@id": "https://drnattech.com/#person" },
        hasDefinedTerm: frameworks.map((f) => ({
          "@type": "DefinedTerm",
          name: f.name,
          url: f.url,
          creator: { "@id": "https://drnattech.com/#person" },
          inDefinedTermSet: "https://drnattech.com/#framework-suite",
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

function AboutPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <AboutStructuredData />
      <BrandBackground />
      <SiteNav active="About" />
      <main className="mx-auto max-w-[1400px] px-6 pb-16 lg:px-10">
        <Hero />
        <AuthorityMetrics />
        <Journey />
        <PhilosophyAndPrinciples />
        <FrameworkEvolution />
        <ExpertiseAndLeadership />
        <LocalAuthority />
        <CTA />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. AUTHORITY HERO
   ============================================================ */

const roleTags = [
  "AI Solutions Architect",
  "Framework Creator",
  "Enterprise AI Systems Builder",
  "Researcher",
];

const authorityStrip = [
  {
    icon: MapPin,
    title: "Based in Vienna, Austria",
    sub: "Serving Europe & Global Clients",
  },
  { icon: Globe, title: "Available for Projects", sub: "Worldwide" },
  { icon: Rocket, title: "Let's Build Systems", sub: "That Drive Real Impact" },
];

const foundation: { glyph: string; title: string; sub: string }[] = [
  {
    glyph: "phd",
    title: "PhD in Natural Technology (NatTech)",
    sub: "BOKU University, Vienna",
  },
  {
    glyph: "exp",
    title: "10+ Years Research & Project Experience",
    sub: "Environment, Governance & Sustainability",
  },
  {
    glyph: "google",
    title: "Google Data Analytics Professional",
    sub: "Data-driven decision making",
  },
  {
    glyph: "azure",
    title: "Microsoft Azure AI-103 Certified",
    sub: "AI App & Agent Developer",
  },
  {
    glyph: "microsoft",
    title: "Microsoft AI Cloud Partner",
    sub: "Enterprise-grade cloud infrastructure",
  },
];

function Hero() {
  return (
    <section className="grid grid-cols-1 items-stretch gap-5 pt-8 lg:grid-cols-[1.05fr_1.05fr_1fr] lg:gap-6">
      {/* LEFT */}
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.32)",
            color: "#C4B5FD",
          }}
        >
          About Me
        </span>

        <h1 className="mt-5 text-[38px] font-bold leading-[1.06] tracking-tight text-white lg:text-[46px]">
          The Mind Behind Production{" "}
          <span className="text-gradient-brand">AI Systems</span>
        </h1>

        <p
          className="mt-5 max-w-md text-[14.5px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Research-driven AI architecture for enterprise systems that are
          reliable, governed, scalable and measurable.
        </p>

        <div className="mt-6">
          <Signature size="lg" />
          <div
            className="mt-2 text-[12.5px] font-semibold"
            style={{ color: "#A855F7" }}
          >
            AI Solutions Architect
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {roleTags.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-[11px] font-semibold"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.28)",
                color: "#E5E7EB",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* CENTER — portrait */}
      <div
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[18px]"
        style={{
          background: "linear-gradient(180deg, #0A0E22, #050816)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="absolute left-1/2 top-[12%] h-[240px] w-[240px] -translate-x-1/2 rounded-full"
          style={{
            border: "2px solid #A855F7",
            boxShadow:
              "0 0 60px 6px rgba(168,85,247,0.55), inset 0 0 60px rgba(139,92,246,0.25)",
            opacity: 0.85,
          }}
        />
        <img
          src={heroPortrait}
          alt="Dr. Ephraim Mpofu — AI Solutions Architect"
          className="absolute bottom-0 left-1/2 h-[94%] w-auto -translate-x-1/2 object-contain object-bottom"
          style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.5))" }}
        />
      </div>

      {/* RIGHT — My Foundation */}
      <div className="glass-card flex flex-col p-5">
        <div className="text-[15px] font-bold text-white">My Foundation</div>
        <div className="mt-4 flex flex-col gap-3.5">
          {foundation.map((f) => (
            <div key={f.title} className="flex items-start gap-3">
              <FoundationGlyph g={f.glyph} />
              <div className="min-w-0 leading-tight">
                <div className="text-[12.5px] font-bold text-white">
                  {f.title}
                </div>
                <div className="mt-1 text-[11px]" style={{ color: "#9CA3AF" }}>
                  {f.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AUTHORITY STRIP (spans full width below hero columns) */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {authorityStrip.map((a) => (
            <div
              key={a.title}
              className="glass-card flex items-center gap-3 p-4"
            >
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <a.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
              </div>
              <div className="leading-tight">
                <div className="text-[12.5px] font-bold text-white">
                  {a.title}
                </div>
                <div className="mt-0.5 text-[11px]" style={{ color: "#9CA3AF" }}>
                  {a.sub}
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
   2. AUTHORITY METRICS
   ============================================================ */

const metrics = [
  { icon: Puzzle, value: "12+", a: "AI Systems", b: "Deployed" },
  { icon: Clock, value: "3,500+", a: "Hours of Automation", b: "Designed & Built" },
  { icon: TrendingUp, value: "70%+", a: "Average Process", b: "Time Reduction" },
  { icon: ShieldCheck, value: "100%", a: "Systems Built", b: "for Production" },
  { icon: Layers, value: "7+", a: "Proprietary Frameworks", b: "& Methodologies" },
];

function AuthorityMetrics() {
  return (
    <section className="mt-6">
      <div className="glass-card flex flex-wrap items-stretch px-2 py-2">
        {metrics.map((m, i) => (
          <div
            key={m.value + m.a}
            className="flex min-w-[160px] flex-1 items-center gap-3 px-4 py-3"
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
              <div className="text-gradient-brand text-[24px] font-bold leading-none">
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
   3. MY JOURNEY
   ============================================================ */

const journey = [
  {
    icon: MapPin,
    title: "Roots",
    sub: "Grew up in Zimbabwe with a passion for understanding how things work.",
  },
  {
    icon: Leaf,
    title: "Early Calling",
    sub: "Environmental Science and Urban Planning shaped my systems-thinking foundation.",
  },
  {
    icon: Globe,
    title: "Global Perspective",
    sub: "Worked with the World Bank Group, managing projects across Africa.",
  },
  {
    icon: GraduationCap,
    title: "PhD Researcher",
    sub: "Pursued a PhD in Natural Technology at BOKU University, Vienna.",
  },
  {
    icon: Boxes,
    title: "Systems Architect",
    sub: "Discovered AI as the next evolution of my mission to solve complex real-world problems.",
  },
  {
    icon: Rocket,
    title: "AI Solutions Architect",
    sub: "Today, I architect AI systems that empower organizations to operate smarter and achieve more.",
  },
];

function Journey() {
  return (
    <section className="mt-6">
      <SectionHeader
        title="My Journey"
        sub="A path of curiosity, systems thinking and impact."
      />
      <div className="relative mt-8">
        <div
          className="absolute left-[6%] right-[6%] top-[18px] hidden h-[2px] lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, #8B5CF6 12%, #A855F7 50%, #8B5CF6 88%, transparent)",
          }}
        />
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {journey.map((j, i) => (
            <div key={j.title} className="flex flex-col items-center text-center">
              <div
                className="relative flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                  boxShadow: "0 0 0 4px #050816, 0 0 18px rgba(168,85,247,0.55)",
                }}
              >
                {i + 1}
              </div>
              <j.icon className="mt-4 h-5 w-5" style={{ color: "#C4B5FD" }} />
              <div className="glass-card mt-3 w-full px-4 py-4">
                <div className="text-[13.5px] font-bold leading-snug text-white">
                  {j.title}
                </div>
                <div
                  className="mt-2 text-[11.5px] leading-relaxed"
                  style={{ color: "#9CA3AF" }}
                >
                  {j.sub}
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
   4. PHILOSOPHY + ARCHITECTURAL PRINCIPLES
   ============================================================ */

const principles = [
  {
    icon: Target,
    title: "Rigour",
    sub: "Scientific methodology applied to engineering and system design.",
  },
  {
    icon: Eye,
    title: "Auditability",
    sub: "Every decision is traceable, measurable and explainable.",
  },
  {
    icon: ShieldCheck,
    title: "Production-First",
    sub: "Built for scale, security, reliability and real-world deployment.",
  },
  {
    icon: Layers,
    title: "Simplicity",
    sub: "Simple systems are reliable systems.",
  },
  {
    icon: TrendingUp,
    title: "Business Impact",
    sub: "Technology that delivers measurable ROI.",
  },
];

function PhilosophyAndPrinciples() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[0.85fr_1.45fr]">
      {/* Philosophy */}
      <div className="glass-card flex flex-col p-6">
        <div className="text-[15px] font-bold text-white">My Philosophy</div>
        <Quote className="mt-4 h-6 w-6" style={{ color: "#A855F7" }} />
        <p className="mt-3 text-[20px] font-bold leading-snug">
          <span className="text-gradient-brand">
            Technology should amplify human potential, not replace it.
          </span>
        </p>
        <p
          className="mt-4 text-[13px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          I build intelligent systems that are reliable, auditable and designed
          to create real business value. My focus is not on AI for its own sake,
          but on solving meaningful problems with systems that scale — guided by
          architecture before tools, and business impact over hype.
        </p>
      </div>

      {/* Architectural Principles */}
      <div className="glass-card p-6">
        <div className="text-[15px] font-bold text-white">
          My Architectural Principles
        </div>
        <p className="mt-2 text-[13px]" style={{ color: "#9CA3AF" }}>
          These principles guide every system I design and build.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-2">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.3)",
                }}
              >
                <p.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
              </div>
              <div className="text-[12.5px] font-bold text-white">
                {p.title}
              </div>
              <div
                className="text-[11px] leading-snug"
                style={{ color: "#9CA3AF" }}
              >
                {p.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. HOW MY FRAMEWORKS EVOLVED
   ============================================================ */

type EvoNode =
  | { type: "icon"; icon: typeof Brain; title: string; sub: string }
  | { type: "fw"; k: string; title: string; sub: string; link: string };

const evolution: EvoNode[] = [
  {
    type: "icon",
    icon: Brain,
    title: "Research Mindset",
    sub: "Scientific rigour and curiosity drive deep understanding.",
  },
  {
    type: "icon",
    icon: Network,
    title: "Systems Thinking",
    sub: "Seeing the bigger picture, connections and interdependencies.",
  },
  {
    type: "icon",
    icon: Building2,
    title: "Enterprise Delivery",
    sub: "Solving real business problems at scale with measurable outcomes.",
  },
  {
    type: "fw",
    k: "skaido",
    title: "SKAIDO Framework",
    sub: "End-to-end framework for moving from problem to deployed AI solution.",
    link: "/frameworks-skaido",
  },
  {
    type: "fw",
    k: "laws",
    title: "Three Structural Laws",
    sub: "Laws that prevent fraud, unmaintainable systems and silent failure.",
    link: "/frameworks-three-structural-laws",
  },
  {
    type: "fw",
    k: "layers",
    title: "Four Workflow Layers",
    sub: "Layered approach for scalable automation systems.",
    link: "/frameworks",
  },
  {
    type: "fw",
    k: "knowledge",
    title: "Knowledge Architecture",
    sub: "Proprietary approach to knowledge design and enterprise RAG systems.",
    link: "/frameworks",
  },
  {
    type: "fw",
    k: "aisa",
    title: "AISA Framework",
    sub: "The Strategic AI Engagement Framework for production-ready AI solutions.",
    link: "/aisa",
  },
];

function EvoCard({ node }: { node: EvoNode }) {
  const inner = (
    <>
      <div className="flex h-12 w-full items-center justify-center">
        {node.type === "icon" ? (
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: "rgba(139,92,246,0.14)",
              border: "1px solid rgba(139,92,246,0.32)",
            }}
          >
            <node.icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
          </div>
        ) : (
          <FrameworkVisual k={node.k} />
        )}
      </div>
      <div className="mt-3 text-[12.5px] font-bold leading-snug text-white">
        {node.title}
      </div>
      <div className="mt-1 text-[10.5px] leading-snug" style={{ color: "#9CA3AF" }}>
        {node.sub}
      </div>
    </>
  );

  const cls =
    "flex w-[150px] flex-1 flex-col items-center rounded-xl p-3 text-center";
  const style = {
    background: "rgba(139,92,246,0.06)",
    border: "1px solid rgba(139,92,246,0.15)",
  };

  return node.type === "fw" ? (
    <Link
      to={node.link}
      className={`${cls} transition-all hover:-translate-y-0.5 hover:brand-glow`}
      style={style}
    >
      {inner}
    </Link>
  ) : (
    <div className={cls} style={style}>
      {inner}
    </div>
  );
}

function FrameworkEvolution() {
  return (
    <section className="mt-6">
      <div className="glass-card p-6">
        <SectionHeader
          title="How My Frameworks Evolved"
          sub="From research mindset to enterprise AI architecture."
        />
        <div className="mt-7 flex flex-wrap items-stretch justify-center gap-2">
          {evolution.map((node, i) => (
            <Fragment key={node.title}>
              <EvoCard node={node} />
              {i < evolution.length - 1 && (
                <div className="hidden items-center lg:flex">
                  <ArrowRight
                    className="h-4 w-4"
                    style={{ color: "#6B7280" }}
                  />
                </div>
              )}
            </Fragment>
          ))}
        </div>
        <p
          className="mt-6 text-center text-[13px] font-medium"
          style={{ color: "#A855F7" }}
        >
          An integrated ecosystem of frameworks that ensure reliability,
          governance and business impact.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   6. CORE EXPERTISE + RESEARCH & THOUGHT LEADERSHIP
   ============================================================ */

const expertiseGroups: { category: string; items: string[] }[] = [
  {
    category: "Architecture",
    items: [
      "AI Systems Architecture",
      "Knowledge Architecture",
      "Data Architecture & Engineering",
    ],
  },
  {
    category: "Automation",
    items: [
      "Workflow Automation & Orchestration",
      "Multi-Agent & Agentic AI",
      "API & Systems Integration",
    ],
  },
  {
    category: "Intelligence",
    items: [
      "Prompt Engineering & LLMOps",
      "Retrieval & RAG Systems",
      "AI Strategy & Advisory",
    ],
  },
];

const thoughtLeadership: {
  icon: typeof BookOpen;
  title: string;
  sub: string;
  link?: string;
}[] = [
  {
    icon: BookOpen,
    title: "Research Publications",
    sub: "Academic papers in Natural Technology & AI systems.",
    link: "/publications",
  },
  {
    icon: FileText,
    title: "Articles & Insights",
    sub: "In-depth articles on AI architecture and enterprise systems.",
    link: "/insights",
  },
  {
    icon: Mic,
    title: "Conference Talks",
    sub: "Presentations on AI systems, governance and architecture.",
  },
  {
    icon: Share2,
    title: "Industry Contributions",
    sub: "Open-source, standards and knowledge sharing.",
  },
  {
    icon: Boxes,
    title: "Framework Development",
    sub: "Whitepapers on my proprietary frameworks and methodologies.",
    link: "/frameworks",
  },
];

function ExpertiseAndLeadership() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Core Expertise */}
      <div className="glass-card p-6">
        <div className="text-[15px] font-bold text-white">Core Expertise</div>
        <p className="mt-2 text-[13px]" style={{ color: "#9CA3AF" }}>
          The disciplines, systems and capabilities I use to design and deliver
          intelligent solutions.
        </p>
        <div className="mt-5 flex flex-col gap-5">
          {expertiseGroups.map((g) => (
            <div key={g.category}>
              <div
                className="text-[10px] font-bold uppercase tracking-[0.22em]"
                style={{ color: "#A855F7" }}
              >
                {g.category}
              </div>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {g.items.map((item) => (
                  <div
                    key={item}
                    className="rounded-lg px-3 py-2.5 text-[12px] font-medium text-white"
                    style={{
                      background: "rgba(139,92,246,0.07)",
                      border: "1px solid rgba(139,92,246,0.18)",
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Research & Thought Leadership */}
      <div className="glass-card p-6">
        <div className="text-[15px] font-bold text-white">
          Research & Thought Leadership
        </div>
        <p className="mt-2 text-[13px]" style={{ color: "#9CA3AF" }}>
          Advancing the field through research, publications and knowledge
          sharing.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {thoughtLeadership.map((t) => {
            const card = (
              <>
                <t.icon className="h-5 w-5" style={{ color: "#A855F7" }} />
                <div className="mt-2.5 text-[13px] font-bold text-white">
                  {t.title}
                </div>
                <div
                  className="mt-1 text-[11px] leading-snug"
                  style={{ color: "#9CA3AF" }}
                >
                  {t.sub}
                </div>
              </>
            );
            const cls = "rounded-xl p-4";
            const style = {
              background: "rgba(59,130,246,0.05)",
              border: "1px solid rgba(59,130,246,0.15)",
            };
            return t.link ? (
              <Link
                key={t.title}
                to={t.link}
                className={`${cls} block transition-all hover:-translate-y-0.5`}
                style={style}
              >
                {card}
              </Link>
            ) : (
              <div key={t.title} className={cls} style={style}>
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. AI SOLUTIONS ARCHITECT IN VIENNA + I HELP ORGANIZATIONS
   ============================================================ */

const locations = [
  { icon: MapPin, title: "Vienna", sub: "Austria" },
  { icon: Building2, title: "DACH Region", sub: "Germany, Austria, Switzerland" },
  { icon: Globe, title: "Europe", sub: "EU & Beyond" },
];

const helpItems = [
  "Automate complex business processes with AI",
  "Build secure, auditable and scalable AI systems",
  "Unlock value from data and enterprise knowledge",
  "Deliver measurable outcomes and lasting impact",
];

function LocalAuthority() {
  return (
    <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
      {/* Vienna / local */}
      <div className="glass-card p-6">
        <h2 className="text-[22px] font-bold text-white">
          AI Solutions Architect in Vienna
        </h2>
        <p
          className="mt-3 text-[13.5px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Partnering with organizations across Austria, the DACH region and
          Europe to design and build enterprise AI systems, AI automation and
          knowledge architectures that drive real impact.
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {locations.map((l) => (
            <div
              key={l.title}
              className="flex items-center gap-3 rounded-lg p-3"
              style={{
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.18)",
              }}
            >
              <l.icon className="h-4 w-4 shrink-0" style={{ color: "#C4B5FD" }} />
              <div className="leading-tight">
                <div className="text-[12.5px] font-bold text-white">
                  {l.title}
                </div>
                <div className="text-[10.5px]" style={{ color: "#9CA3AF" }}>
                  {l.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* I Help Organizations */}
      <div className="glass-card relative overflow-hidden p-6">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-[220px] w-[220px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(139,92,246,0.5), transparent)",
          }}
        />
        <div className="relative">
          <div className="text-[15px] font-bold text-white">
            I Help Organizations
          </div>
          <ul className="mt-4 flex flex-col gap-3">
            {helpItems.map((h) => (
              <li key={h} className="flex items-start gap-3">
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0"
                  style={{ color: "#A855F7" }}
                />
                <span className="text-[13px]" style={{ color: "#E5E7EB" }}>
                  {h}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. CTA
   ============================================================ */

function CTA() {
  return (
    <section className="mt-6">
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
              Let's Build Systems That Deliver Real Impact
            </h2>
            <p className="mt-2 text-[14px]" style={{ color: "#9CA3AF" }}>
              Whether you're exploring AI opportunities, designing enterprise
              knowledge systems or building intelligent platforms, let's create
              measurable business value together.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/frameworks"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[13px] font-semibold text-white"
              style={{ background: "linear-gradient(135deg,#A855F7,#7C3AED)" }}
            >
              Explore My Frameworks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Book Strategy Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Shared helpers
   ============================================================ */

function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="text-center">
      <h2 className="text-[28px] font-bold tracking-tight text-white lg:text-[32px]">
        {title}
      </h2>
      <p
        className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed"
        style={{ color: "#9CA3AF" }}
      >
        {sub}
      </p>
    </div>
  );
}

function GlyphBox({ children, bg }: { children: ReactNode; bg?: string }) {
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md"
      style={{
        background: bg ?? "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.3)",
      }}
    >
      {children}
    </div>
  );
}

function FoundationGlyph({ g }: { g: string }) {
  if (g === "phd") {
    return (
      <GlyphBox bg="rgba(34,197,94,0.12)">
        <GraduationCap className="h-5 w-5" style={{ color: "#22C55E" }} />
      </GlyphBox>
    );
  }
  if (g === "exp") {
    return (
      <GlyphBox>
        <Boxes className="h-5 w-5" style={{ color: "#C4B5FD" }} />
      </GlyphBox>
    );
  }
  if (g === "google") {
    return (
      <GlyphBox bg="rgba(255,255,255,0.92)">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M12 11v3.6h5.1c-.2 1.3-1.5 3.7-5.1 3.7-3.1 0-5.6-2.5-5.6-5.7s2.5-5.7 5.6-5.7c1.7 0 2.9.7 3.6 1.4l2.4-2.4C16.5 4.6 14.4 3.7 12 3.7 7.4 3.7 3.7 7.4 3.7 12s3.7 8.3 8.3 8.3c4.8 0 8-3.4 8-8.1 0-.5-.1-.9-.2-1.2H12z"
          />
        </svg>
      </GlyphBox>
    );
  }
  if (g === "azure") {
    return (
      <GlyphBox bg="rgba(0,120,212,0.12)">
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path d="M11 4 L4 18 L10 18 L13 13 Z" fill="#0078D4" />
          <path d="M13 9 L20 18 L13 18 L11 15 Z" fill="#50E6FF" />
        </svg>
      </GlyphBox>
    );
  }
  // microsoft
  return (
    <GlyphBox bg="rgba(255,255,255,0.06)">
      <svg width="18" height="18" viewBox="0 0 24 24">
        <rect x="2" y="2" width="9" height="9" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
      </svg>
    </GlyphBox>
  );
}
