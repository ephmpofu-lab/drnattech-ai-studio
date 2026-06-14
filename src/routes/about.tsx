import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Clock,
  Code,
  Database,
  Eye,
  GitMerge,
  Globe,
  Layers,
  Layers2,
  LayoutGrid,
  MessageSquare,
  Network,
  Puzzle,
  Rocket,
  Scale,
  Search,
  Settings2,
  ShieldCheck,
  Target,
  TrendingUp,
  Boxes,
  Zap,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

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
          "Dr. Ephraim Mpofu is an AI Solutions Architect based in Vienna, Austria — combining scientific rigour with engineering mindset to design enterprise AI systems that work in production.",
      },
      {
        property: "og:title",
        content:
          "About Dr. Ephraim Mpofu | AI Solutions Architect & Framework Creator",
      },
      {
        property: "og:description",
        content:
          "PhD (NatTech), BOKU Vienna. Creator of the AISA, SKAIDO and Three Structural Laws frameworks.",
      },
    ],
  }),
  component: AboutPage,
});

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function AboutStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://drnattech.com/about#webpage",
        url: "https://drnattech.com/about",
        name: "About Dr. Ephraim Mpofu — AI Solutions Architect",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "Person",
        "@id": "https://drnattech.com/#person",
        name: "Dr. Ephraim Mpofu",
        jobTitle: "AI Solutions Architect",
        url: "https://drnattech.com",
        alumniOf: { "@type": "CollegeOrUniversity", name: "BOKU University, Vienna" },
        address: { "@type": "PostalAddress", addressLocality: "Vienna", addressCountry: "AT" },
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

export function AboutPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <AboutStructuredData />
      <BrandBackground />
      <SiteNav active="About" />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <Hero />
        <AuthorityMetrics />
        <MyMethodology />
        <TechnologiesSection />
        <MyJourney />
        <PrinciplesAndExpertise />
        <CTA />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

const credentials = [
  {
    glyph: "boku",
    title: "PhD in Natural Technology",
    sub: "BOKU University, Vienna",
  },
  {
    glyph: "exp",
    title: "10+ Years Research & Industry Experience",
    sub: "Environment, Governance & Sustainability",
  },
  {
    glyph: "google",
    title: "Google Data Analytics Professional",
    sub: "Certified",
  },
];

function CredentialGlyph({ g }: { g: string }) {
  const box = "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg";
  if (g === "boku") {
    return (
      <div className={box} style={{ background: "rgba(42,173,78,0.14)", border: "1px solid rgba(42,173,78,0.3)" }}>
        <svg width="18" height="22" viewBox="0 0 28 34" fill="none">
          <rect x="1" y="1" width="7" height="32" rx="2.5" fill="#2AAD4E" />
          <rect x="1" y="1" width="19" height="8" rx="2.5" fill="#2AAD4E" />
          <rect x="1" y="25" width="19" height="8" rx="2.5" fill="#2AAD4E" />
          <rect x="22" y="8.5" width="5" height="17" rx="2.5" fill="#2AAD4E" />
        </svg>
      </div>
    );
  }
  if (g === "google") {
    return (
      <div className={box} style={{ background: "rgba(255,255,255,0.92)", border: "1px solid rgba(255,255,255,0.2)" }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
          <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.625v3.09C3.515 21.3 7.615 24 12.255 24z" />
          <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.625a11.86 11.86 0 000 10.76l3.9-3.09z" />
          <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.9 3.09c.95-2.85 3.6-4.96 6.81-4.96z" />
        </svg>
      </div>
    );
  }
  return (
    <div className={box} style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}>
      <Boxes className="h-4 w-4" style={{ color: "#C4B5FD" }} />
    </div>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-6 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-12">
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

        <h1 className="mt-5 text-[38px] font-bold leading-[1.06] tracking-tight text-white lg:text-[48px]">
          The Mind Behind Production{" "}
          <span className="text-gradient-brand">AI Systems</span>
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          I combine scientific rigour with engineering mindset to design
          intelligent systems that solve real business problems and scale in
          production.
        </p>
        <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          After completing my PhD in Natural Technology at BOKU Vienna, I
          discovered that the same systematic thinking, hypothesis validation,
          and attention to detail that drive scientific research are exactly
          what enterprises need to build reliable AI systems that work every
          day.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Bot className="h-4 w-4" /> Ask My AI Agent
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            View Portfolio
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
          {credentials.map((c) => (
            <div key={c.title} className="flex items-center gap-3">
              <CredentialGlyph g={c.glyph} />
              <div className="leading-tight">
                <div className="text-[12px] font-bold text-white">{c.title}</div>
                <div className="text-[11px]" style={{ color: "#9CA3AF" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — portrait */}
      <div
        className="relative hidden min-h-[540px] overflow-hidden rounded-[18px] lg:block"
        style={{ border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <img
          src="/images/Dr Mpofu_purple2.png"
          alt="Dr. Ephraim Mpofu — AI Solutions Architect"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #050816)" }}
        />
      </div>
    </section>
  );
}

/* ============================================================
   2. AUTHORITY METRICS
   ============================================================ */

const metrics = [
  { icon: Puzzle,      value: "12+",    a: "Systems",      b: "Built"         },
  { icon: Clock,       value: "3,500+", a: "Hours",        b: "Automated"     },
  { icon: TrendingUp,  value: "70%+",   a: "Process",      b: "Improvement"   },
  { icon: ShieldCheck, value: "100%",   a: "Production",   b: "Focus"         },
  { icon: Layers,      value: "7+",     a: "Proprietary",  b: "Frameworks"    },
];

function AuthorityMetrics() {
  return (
    <section className="mt-5">
      <div className="glass-card flex flex-wrap items-stretch">
        {metrics.map((m, i) => (
          <div
            key={m.value + m.a}
            className="flex min-w-[130px] flex-1 flex-col items-center justify-center px-4 py-4"
            style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.06)" } : undefined}
          >
            <div
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
            >
              <m.icon className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
            </div>
            <div className="text-gradient-brand text-[22px] font-bold leading-none">{m.value}</div>
            <div className="mt-1 text-center text-[10.5px] font-medium leading-tight" style={{ color: "#9CA3AF" }}>
              {m.a}<br />{m.b}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   3. MY METHODOLOGY — 4 framework cards
   ============================================================ */

/* — Visuals — */

function SkaidoVisual() {
  const nodes = [
    { l: "S", c: "#A855F7" },
    { l: "K", c: "#6366F1" },
    { l: "A", c: "#3B82F6" },
    { l: "I", c: "#14B8A6" },
    { l: "D", c: "#F59E0B" },
    { l: "O", c: "#EF4444" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-1">
      {nodes.map((n, i) => (
        <div key={n.l} className="flex items-center gap-1">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-bold text-white"
            style={{ background: n.c }}
          >
            {n.l}
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight className="h-3 w-3 shrink-0" style={{ color: "rgba(255,255,255,0.28)" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function ThreeLawsVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "rgba(139,92,246,0.14)", border: "1.5px solid rgba(139,92,246,0.45)" }}
      >
        <Scale className="h-6 w-6" style={{ color: "#A855F7" }} />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "rgba(20,184,166,0.14)", border: "1.5px solid rgba(20,184,166,0.45)" }}
      >
        <Database className="h-6 w-6" style={{ color: "#14B8A6" }} />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: "rgba(34,197,94,0.12)",
          border: "1.5px solid rgba(34,197,94,0.55)",
          boxShadow: "0 0 20px rgba(34,197,94,0.25)",
        }}
      >
        <Eye className="h-6 w-6" style={{ color: "#22C55E" }} />
      </div>
    </div>
  );
}

function WorkflowLayersVisual() {
  return (
    <svg viewBox="0 0 160 88" className="mx-auto w-full max-w-[180px]">
      <ellipse cx="80" cy="82" rx="60" ry="5" fill="rgba(245,158,11,0.18)" />
      <path d="M10 72 L150 72 L138 58 L22 58 Z" fill="#F59E0B" opacity="0.88" />
      <path d="M22 54 L138 54 L126 40 L34 40 Z" fill="#14B8A6" opacity="0.88" />
      <path d="M34 36 L126 36 L114 22 L46 22 Z" fill="#A855F7" opacity="0.92" />
    </svg>
  );
}

function KnowledgeArchVisual() {
  return (
    <svg viewBox="0 0 160 90" className="mx-auto w-full max-w-[180px]">
      <line x1="28" y1="22" x2="62" y2="38" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2" />
      <line x1="28" y1="68" x2="62" y2="54" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2" />
      <line x1="132" y1="22" x2="98" y2="38" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2" />
      <line x1="132" y1="68" x2="98" y2="54" stroke="rgba(99,102,241,0.5)" strokeWidth="1.2" />
      <circle cx="28" cy="22" r="8" fill="none" stroke="rgba(99,102,241,0.65)" strokeWidth="1.5" />
      <circle cx="28" cy="68" r="8" fill="none" stroke="rgba(99,102,241,0.65)" strokeWidth="1.5" />
      <circle cx="132" cy="22" r="8" fill="none" stroke="rgba(99,102,241,0.65)" strokeWidth="1.5" />
      <circle cx="132" cy="68" r="8" fill="none" stroke="rgba(99,102,241,0.65)" strokeWidth="1.5" />
      <circle cx="28" cy="22" r="3.5" fill="#6366F1" />
      <circle cx="28" cy="68" r="3.5" fill="#6366F1" />
      <circle cx="132" cy="22" r="3.5" fill="#6366F1" />
      <circle cx="132" cy="68" r="3.5" fill="#6366F1" />
      {/* Cylinder */}
      <ellipse cx="80" cy="36" rx="24" ry="7" fill="rgba(168,85,247,0.55)" stroke="rgba(168,85,247,0.8)" strokeWidth="1" />
      <rect x="56" y="36" width="48" height="20" fill="rgba(139,92,246,0.32)" />
      <ellipse cx="80" cy="56" rx="24" ry="7" fill="rgba(139,92,246,0.55)" stroke="rgba(139,92,246,0.8)" strokeWidth="1" />
    </svg>
  );
}

/* — Methodology cards — */

const methodologyCards = [
  {
    title: "SKAIDO FRAMEWORK",
    Visual: SkaidoVisual,
    desc: "My end-to-end framework for moving from business problem to deployed AI solution.",
    cta: "Explore Framework",
    link: "/frameworks" as const,
  },
  {
    title: "THREE STRUCTURAL LAWS",
    Visual: ThreeLawsVisual,
    desc: "The architectural laws that prevent fraud, unmaintainable systems and silent failure.",
    cta: "View Principles",
    link: "/frameworks" as const,
  },
  {
    title: "FOUR WORKFLOW LAYERS",
    Visual: WorkflowLayersVisual,
    desc: "A layered workflow design approach for scalable automation systems.",
    cta: "See Layers",
    link: "/frameworks" as const,
  },
  {
    title: "KNOWLEDGE ARCHITECTURE",
    Visual: KnowledgeArchVisual,
    desc: "Proprietary approach to knowledge design, retrieval and enterprise RAG systems.",
    cta: "Learn More",
    link: "/frameworks" as const,
  },
];

function MyMethodology() {
  return (
    <section className="mt-14 lg:mt-16">
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-bold text-white lg:text-[34px]">
          My Methodology
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px]" style={{ color: "#9CA3AF" }}>
          The frameworks and principles I use to design production-ready AI systems.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {methodologyCards.map(({ title, Visual, desc, cta, link }) => (
          <div
            key={title}
            className="flex flex-col rounded-[18px] p-6"
            style={{
              background: "rgba(7,11,28,0.8)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-white">
              {title}
            </div>

            <div className="my-6 flex flex-1 items-center justify-center">
              <Visual />
            </div>

            <p className="mb-5 text-[12.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              {desc}
            </p>

            <Link
              to={link}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-[12.5px] font-semibold transition-all hover:bg-purple-500/10"
              style={{ border: "1px solid rgba(139,92,246,0.45)", color: "#A855F7" }}
            >
              {cta} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. TECHNOLOGIES I WORK WITH
   ============================================================ */

/* Inline SVG logos */
function PythonSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.034v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.129S18.28 0 11.914 0zm-3.21 1.81a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088z" fill="#3776AB"/>
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.959-3.403-5.959H18.563v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.131v5.4S5.72 24 12.086 24zm3.21-1.81a1.044 1.044 0 1 1 0-2.088 1.044 1.044 0 0 1 0 2.088z" fill="#FFD43B"/>
    </svg>
  );
}

function OpenAiSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zm-9.022 12.609a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zm-1.26-10.408a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.37 2.019-1.168a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.4-.676zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  );
}

function ClaudeSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <circle cx="12" cy="12" r="11" fill="#CC785C" />
      <path d="M8.5 16.5L12 7.5L15.5 16.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="9.8" y1="13.5" x2="14.2" y2="13.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function AzureSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M11.5 3L4 18.5H9.5L13.5 11L17 18.5H22L14.5 3H11.5Z" fill="#0078D4" />
      <path d="M13.5 11L17 18.5H10.5L13.5 11Z" fill="#50E6FF" opacity="0.8" />
    </svg>
  );
}

function N8nSvg() {
  return (
    <svg viewBox="0 0 48 24" className="h-5 w-auto">
      <rect width="48" height="24" rx="5" fill="#EA4B71" />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="11" fontWeight="800" fontFamily="monospace">n8n</text>
    </svg>
  );
}

function SupabaseSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.199 12.768.752 13.8 1.676 13.8h7.526l-1.078 9.128c.015.986 1.26 1.409 1.875.637l9.263-11.653c.565-.718.012-1.75-.912-1.75h-7.526L11.9 1.036Z" fill="#3ECF8E" />
    </svg>
  );
}

function PostgresSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <ellipse cx="12" cy="12" rx="10" ry="10" fill="#336791" />
      <path d="M7 8h4.5c1.5 0 2.5.5 2.5 2s-1 2-2.5 2H7V8zm0 4h5c1.8 0 3 .8 3 2.2 0 1.5-1.2 2.3-3 2.3H7V12z" fill="white" opacity="0.9" />
    </svg>
  );
}

function LangChainSvg() {
  return (
    <svg viewBox="0 0 28 24" className="h-5 w-auto" fill="none">
      <rect x="1" y="8" width="11" height="8" rx="4" stroke="#1CB855" strokeWidth="2" fill="none" />
      <rect x="16" y="8" width="11" height="8" rx="4" stroke="#1CB855" strokeWidth="2" fill="none" />
      <line x1="12" y1="12" x2="16" y2="12" stroke="#1CB855" strokeWidth="2" />
    </svg>
  );
}

function PineconeSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <path d="M12 2L7 10h3v3L5 20h5l2-3 2 3h5l-5-7v-3h3L12 2z" fill="#0F172A" stroke="#6C47FF" strokeWidth="0.5" />
      <path d="M12 2L9 8h2v2l-4 6h3.5l1.5-2.5L13.5 16H17l-4-6V8h2L12 2z" fill="#6C47FF" />
    </svg>
  );
}

function GitHubSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="white">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function PowerBISvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
      <rect x="2" y="14" width="4" height="8" rx="1" fill="#F2C811" />
      <rect x="8" y="9" width="4" height="13" rx="1" fill="#F2C811" opacity="0.85" />
      <rect x="14" y="4" width="4" height="18" rx="1" fill="#F2C811" opacity="0.7" />
      <rect x="20" y="1" width="2" height="21" rx="1" fill="#F2C811" opacity="0.55" />
    </svg>
  );
}

const techItems = [
  { Logo: OpenAiSvg,    label: "OpenAI"               },
  { Logo: ClaudeSvg,    label: "Claude"               },
  { Logo: AzureSvg,     label: "Azure AI"             },
  { Logo: N8nSvg,       label: "n8n"                  },
  { Logo: SupabaseSvg,  label: "Supabase"             },
  { Logo: PostgresSvg,  label: "PostgreSQL"           },
  { Logo: LangChainSvg, label: "LangChain"            },
  { Logo: PineconeSvg,  label: "Pinecone"             },
  { Logo: GitHubSvg,    label: "GitHub"               },
  { Logo: PythonSvg,    label: "Python"               },
  { Logo: PowerBISvg,   label: "Power BI"             },
  { logo: Code,         label: "REST APIs"            },
  { logo: Zap,          label: "Webhooks"             },
  { logo: Bot,          label: "AI Agents"            },
  { logo: GitMerge,     label: "Workflow Automation"  },
  { logo: MessageSquare,label: "Prompt Engineering"   },
] as (
  | { Logo: () => JSX.Element; logo?: never; label: string }
  | { logo: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; Logo?: never; label: string }
)[];

function TechPill({
  item,
}: {
  item: (typeof techItems)[number];
}) {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-[13px] font-medium text-white"
      style={{ background: "rgba(7,11,28,0.85)", border: "1px solid rgba(255,255,255,0.10)" }}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
        {"Logo" in item && item.Logo ? (
          <item.Logo />
        ) : (
          item.logo && <item.logo className="h-4 w-4" style={{ color: "#C4B5FD" }} />
        )}
      </div>
      {item.label}
    </div>
  );
}

function TechnologiesSection() {
  return (
    <section className="mt-5">
      <div className="glass-card px-6 py-7">
        <div className="mb-6 text-center">
          <h2 className="text-[22px] font-bold text-white lg:text-[26px]">
            Technologies I Work With
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-[13.5px]" style={{ color: "#9CA3AF" }}>
            A curated set of technologies and platforms I use to design, build and deliver
            intelligent solutions.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {techItems.map((item) => (
            <TechPill key={item.label} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. MY JOURNEY — horizontal connected timeline
   ============================================================ */

const journeySteps = [
  {
    Icon: BookOpen,
    title: "Research & Academia",
    desc: "PhD in Natural Technology at BOKU Vienna. Years of scientific research and systems thinking.",
  },
  {
    Icon: Brain,
    title: "Systems Thinking",
    desc: "Applying research mindset to complex real-world problems across governance & environment.",
  },
  {
    Icon: Zap,
    title: "AI & Automation",
    desc: "Transitioned into AI systems, automation, data engineering and intelligent workflow architecture.",
  },
  {
    Icon: Boxes,
    title: "Building Solutions",
    desc: "Architecting intelligent systems that solve business problems and deliver measurable outcomes.",
  },
  {
    Icon: Globe,
    title: "Global Impact",
    desc: "Working with organisations across industries and countries to drive meaningful transformations.",
  },
];

function MyJourney() {
  return (
    <section className="mt-14 lg:mt-16">
      <div className="mb-10 text-center">
        <h2 className="text-[28px] font-bold text-white lg:text-[34px]">My Journey</h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px]" style={{ color: "#9CA3AF" }}>
          A continuous path of learning, building and creating impact.
        </p>
      </div>

      {/* Desktop timeline */}
      <div className="relative hidden lg:block">
        {/* Connecting line through icon centers */}
        <div
          className="absolute left-[10%] right-[10%] top-[36px] h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, #8B5CF6 6%, #A855F7 50%, #8B5CF6 94%, transparent 100%)",
          }}
        />
        <div className="grid grid-cols-5 gap-4">
          {journeySteps.map(({ Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div
                className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full"
                style={{
                  background: "rgba(5,8,22,0.95)",
                  border: "1.5px solid rgba(139,92,246,0.65)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.32)",
                }}
              >
                <Icon className="h-8 w-8" style={{ color: "#C4B5FD" }} />
              </div>
              <div className="mt-4 text-[13.5px] font-bold text-white">{title}</div>
              <div
                className="mt-2 text-[12px] leading-relaxed"
                style={{ color: "#9CA3AF" }}
              >
                {desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="relative flex flex-col gap-6 pl-8 lg:hidden">
        <div
          className="absolute left-[19px] top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, #8B5CF6, #A855F7, #8B5CF6)" }}
        />
        {journeySteps.map(({ Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className="relative -left-[29px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "rgba(5,8,22,0.95)",
                border: "1.5px solid rgba(139,92,246,0.65)",
                boxShadow: "0 0 14px rgba(139,92,246,0.3)",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <div className="-ml-4 flex-1">
              <div className="text-[13.5px] font-bold text-white">{title}</div>
              <div className="mt-1 text-[12px] leading-relaxed" style={{ color: "#9CA3AF" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   6. ARCHITECTURAL PRINCIPLES + CORE EXPERTISE
   ============================================================ */

const principles = [
  {
    Icon: Target,
    title: "Rigour",
    desc: "Scientific methodology applied to engineering and system design.",
  },
  {
    Icon: Eye,
    title: "Auditability",
    desc: "Every decision is traceable, measurable and explainable.",
  },
  {
    Icon: ShieldCheck,
    title: "Production-First",
    desc: "Built for scale, security, reliability and deployment.",
  },
  {
    Icon: Layers,
    title: "Simplicity",
    desc: "Simple systems are reliable systems.",
  },
  {
    Icon: TrendingUp,
    title: "Business Impact",
    desc: "Technology must deliver measurable outcomes.",
  },
];

const expertiseItems = [
  { Icon: Layers2,    title: "AI Systems",          sub: "Architecture"             },
  { Icon: BookOpen,   title: "Knowledge",           sub: "Architecture"             },
  { Icon: LayoutGrid, title: "Data Architecture",   sub: "& Engineering"            },
  { Icon: Network,    title: "Workflow Automation",  sub: "& Orchestration"         },
  { Icon: Search,     title: "Retrieval & RAG",      sub: "Systems"                 },
  { Icon: Settings2,  title: "AI Strategy &",        sub: "Advisory"               },
];

function PrinciplesAndExpertise() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">

      {/* LEFT — Principles */}
      <div className="glass-card p-6 lg:p-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          My Architectural Principles
        </div>
        <h3 className="mt-1.5 text-[18px] font-bold text-white">
          These principles guide every system I design and build.
        </h3>

        {/* Horizontal row on lg, vertical list on mobile */}
        <div className="mt-6 hidden items-start justify-between gap-1 lg:flex">
          {principles.map(({ Icon, title, desc }, i) => (
            <div key={title} className="flex items-start gap-0">
              <div className="flex flex-col items-center text-center" style={{ maxWidth: 110 }}>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "rgba(139,92,246,0.14)",
                    border: "1px solid rgba(139,92,246,0.40)",
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
                </div>
                <div className="mt-2.5 text-[12.5px] font-bold text-white">{title}</div>
                <div
                  className="mt-1 text-[11px] leading-snug"
                  style={{ color: "#9CA3AF" }}
                >
                  {desc}
                </div>
              </div>
              {i < principles.length - 1 && (
                <div
                  className="mx-1 mt-[18px] shrink-0 text-[20px] font-light"
                  style={{ color: "rgba(139,92,246,0.28)" }}
                >
                  ·
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: 2-col grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 lg:hidden">
          {principles.map(({ Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.4)" }}
              >
                <Icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
              </div>
              <div>
                <div className="text-[13px] font-bold text-white">{title}</div>
                <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Core Expertise */}
      <div className="glass-card p-6 lg:p-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Core Expertise
        </div>
        <h3 className="mt-1.5 text-[18px] font-bold text-white">
          End-to-end capabilities to design, build and operationalise intelligent systems.
        </h3>

        <div className="mt-6 grid grid-cols-3 gap-5">
          {expertiseItems.map(({ Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.28)",
                }}
              >
                <Icon className="h-6 w-6" style={{ color: "#C4B5FD" }} />
              </div>
              <div className="mt-2.5 text-[12px] font-bold leading-tight text-white">{title}</div>
              <div className="text-[11px] leading-tight" style={{ color: "#9CA3AF" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. FINAL CTA
   ============================================================ */

function CTA() {
  return (
    <section className="mt-5 mb-5">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:p-9"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(20,20,40,0.6))",
        }}
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(168,85,247,0.20))",
            border: "1px solid rgba(139,92,246,0.55)",
            boxShadow: "0 0 28px -6px rgba(139,92,246,0.70)",
          }}
        >
          <Rocket className="h-7 w-7" style={{ color: "#C4B5FD" }} />
        </div>

        <div>
          <h2 className="text-[22px] font-bold leading-tight text-white lg:text-[26px]">
            Let's Build Systems That Deliver Real Impact
          </h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Whether you're exploring AI opportunities, designing enterprise knowledge
            systems or building intelligent platforms, let's create measurable business
            value together.
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Bot className="h-4 w-4" /> Ask My AI Agent
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5 whitespace-nowrap"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            View Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Required for JSX type in tech pill discriminated union
import type React from "react";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface Element {}
  }
}
