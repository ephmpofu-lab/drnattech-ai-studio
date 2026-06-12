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
      { title: "DRNATTECH — AI Solutions Architect" },
      {
        name: "description",
        content:
          "Enterprise AI systems that work in production. Dr. Ephraim Mpofu designs intelligent automation that solves real business problems.",
      },
      { property: "og:title", content: "DRNATTECH — AI Solutions Architect" },
      {
        property: "og:description",
        content:
          "Enterprise AI systems that work in production. Multi-agent automation, document intelligence, fraud detection.",
      },
    ],
  }),
  component: Home,
});

const metrics = [
  { icon: Box, value: "12+", a: "AI Systems", b: "Deployed" },
  { icon: Clock, value: "3,500+", a: "Hours of Manual", b: "Work Automated" },
  { icon: TrendingUp, value: "70%", a: "Average Process", b: "Time Reduction" },
  { icon: ShieldCheck, value: "100%", a: "Built for", b: "Production" },
  { icon: Monitor, value: "24/7", a: "Systems", b: "Monitoring" },
];

const orgs = ["Allianz", "Zurich", "ERGO", "talanx.", "wüstenrot"];

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
        <TrustedOrgs />
        <Certifications />
      </div>
    </section>
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
            Insurance Claims AI Platform
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Multi-agent system that automates claims processing from document intake to fraud
            detection with full auditability and real-time analytics.
          </p>

          <div className="mt-5 flex gap-7">
            {[
              { v: "70%", l: "Reduction in\nProcessing Time" },
              { v: "35%", l: "Increase in Fraud\nDetection" },
              { v: "100%", l: "Audit Trail\nCoverage" },
            ].map((m) => (
              <div key={m.l}>
                <div className="text-gradient-brand text-[22px] font-bold leading-none">{m.v}</div>
                <div className="mt-1.5 whitespace-pre-line text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>
                  {m.l}
                </div>
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

function TrustedOrgs() {
  return (
    <div className="glass-card p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
        Trusted by Forward-Thinking Organisations
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-7 gap-y-3">
        {orgs.map((o) => (
          <span
            key={o}
            className="text-[18px] font-bold tracking-tight"
            style={{ color: "#E5E7EB", opacity: 0.7 }}
          >
            {o}
          </span>
        ))}
      </div>
    </div>
  );
}

function Certifications() {
  const items = [
    {
      title: "Azure AI-103",
      sub1: "Certified",
      sub2: "Microsoft",
      logo: <AzureGlyph />,
    },
    {
      title: "Google",
      sub1: "Data Analytics",
      sub2: "Professional",
      logo: <GoogleGlyph />,
    },
    {
      title: "PhD",
      sub1: "NatTech",
      sub2: "BOKU Vienna",
      logo: <BokuGlyph />,
    },
    {
      title: "Microsoft",
      sub1: "Partner",
      sub2: "AI Cloud Services",
      logo: <MicrosoftGlyph />,
      stacked: true,
    },
  ];
  return (
    <div className="glass-card p-5">
      <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
        Certifications & Partnerships
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
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
                {it.stacked ? (
                  <div className="text-[11.5px] font-bold text-white">
                    {it.title}
                    <br />
                    {it.sub1}
                  </div>
                ) : (
                  <>
                    <div className="text-[11.5px] font-bold text-white">{it.title}</div>
                    <div className="mt-0.5 text-[10.5px]" style={{ color: "#9CA3AF" }}>
                      {it.sub1}
                    </div>
                  </>
                )}
                <div className="mt-0.5 text-[10px]" style={{ color: "#6B7280" }}>
                  {it.stacked ? it.sub2 : it.sub2}
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
  return (
    <section className="mt-5">
      <div className="glass-card flex flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4" style={{ color: "#A855F7" }} />
          <span className="text-[13px] font-semibold text-white">Specializing in:</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {specializing.map((s, i) => (
            <div key={s} className="flex items-center gap-7">
              <span className="text-[12.5px]" style={{ color: "#9CA3AF" }}>
                {s}
              </span>
              {i < specializing.length - 1 && (
                <span className="hidden h-1 w-1 rounded-full lg:inline-block" style={{ background: "#3F3F4A" }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
