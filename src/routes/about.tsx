import { createFileRoute, Link } from "@tanstack/react-router";
import heroPortrait from "@/assets/hero-portrait.jpg";
import bokuLogo from "@/assets/boku-university.png.asset.json";
import {
  Quote,
  Puzzle,
  Clock,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Target,
  Eye,
  Layers,
  Briefcase,
  BookOpen,
  Globe,
  Leaf,
  Camera,
  ArrowRight,
  GraduationCap,
  Boxes,
  Bot,
  Cpu,
  Workflow,
  Database,
  Library,
  Plug,
  Rocket,
  FileSearch,
  Lightbulb,
  MessageSquare,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import { Signature } from "@/components/brand/Signature";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About Dr. Ephraim Mpofu | AI Solutions Architect",
      },
      {
        name: "description",
        content:
          "Learn about Dr. Ephraim Mpofu, AI Solutions Architect, researcher, framework creator and enterprise AI systems specialist.",
      },
    ],
  }),

  component: AboutPage,
});

const stats = [
  { icon: Puzzle, v: "12+", a: "AI Systems", b: "Deployed" },
  { icon: Clock, v: "3,500+", a: "Hours of Manual", b: "Work Automated" },
  { icon: TrendingUp, v: "70%", a: "Average Process", b: "Time Reduction" },
  { icon: ShieldCheck, v: "100%", a: "Built for", b: "Production" },
];

const drives = [
  "Build systems that deliver measurable business impact",
  "Design with reliability, auditability, and scalability in mind",
  "Use AI to augment human expertise, not replace it",
  "Continuously learn, iterate, and improve",
  "Share knowledge and help others grow",
];

const values: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Target, title: "Rigour", sub: "Scientific methodology applied to engineering." },
  { icon: Eye, title: "Auditability", sub: "Every decision is traceable and explainable." },
  { icon: ShieldCheck, title: "Production-First", sub: "Built for scale, security, reliability, and real-world deployment." },
  { icon: Layers, title: "Simplicity", sub: "Simple systems are reliable systems." },
  { icon: Briefcase, title: "Business Impact", sub: "Technology that delivers measurable ROI." },
];

const beyond: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: BookOpen, title: "Lifelong", sub: "Learner" },
  { icon: Globe, title: "Systems", sub: "Thinker" },
  { icon: Leaf, title: "Impact", sub: "Focused" },
  { icon: Camera, title: "Travel", sub: "Enthusiast" },
];

const expertise: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Boxes, title: "AI Systems Architecture", sub: "Designing scalable, auditable, production-ready intelligent systems." },
  { icon: Bot, title: "Agentic AI & Multi-Agent Systems", sub: "Building coordinated AI agents that collaborate across workflows." },
  { icon: Cpu, title: "Prompt Engineering & Context Engineering", sub: "Designing reliable prompts and context systems that improve AI performance." },
  { icon: Workflow, title: "Workflow Automation & Process Engineering", sub: "Transforming manual processes into intelligent automated operations." },
  { icon: Database, title: "Data Architecture & Database Engineering", sub: "Designing data structures and architectures that support AI platforms." },
  { icon: Library, title: "Retrieval Systems & Knowledge Architecture", sub: "Building RAG systems, vector databases, and enterprise knowledge platforms." },
  { icon: Plug, title: "API & Systems Integration", sub: "Connecting applications, services, databases, and business systems." },
  { icon: Rocket, title: "AI Product & Platform Development", sub: "Turning ideas into production-ready AI products and platforms." },
  { icon: FileSearch, title: "Document Intelligence & Automation", sub: "Automating document extraction, classification, analysis, and workflows." },
  { icon: Lightbulb, title: "AI Strategy & Digital Transformation", sub: "Helping organisations identify and implement high-impact AI opportunities." },
];

const technologies: { name: string; slug: string; color: string }[] = [
  { name: "OpenAI", slug: "openai", color: "FFFFFF" },
  { name: "Claude AI", slug: "anthropic", color: "D97757" },
  { name: "Azure AI", slug: "microsoftazure", color: "0078D4" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Supabase", slug: "supabase", color: "3ECF8E" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "LangChain", slug: "langchain", color: "1C3C3C" },
  { name: "Pinecone", slug: "pinecone", color: "000000" },
  { name: "Qdrant", slug: "qdrant", color: "DC244C" },
  { name: "GitHub", slug: "github", color: "FFFFFF" },
  { name: "Power BI", slug: "powerbi", color: "F2C811" },
];

const capabilities = [
  "REST APIs",
  "Webhooks",
  "AI Agents",
  "Workflow Automation",
  "Prompt Engineering",
];

const journey = [
  { title: "Research & Academia", sub: "PhD in Natural Resources Management & Ecological Engineering from BOKU University, Vienna." },
  { title: "Field & Systems Thinking", sub: "Years of research and field experience across ecosystems, communities, and governance landscapes." },
  { title: "AI & Automation", sub: "Transitioned into AI systems architecture, automation, and digital transformation." },
  { title: "Building Solutions", sub: "Architecting intelligent systems, AI agents, and platforms that solve real business problems." },
  { title: "Global Impact", sub: "Helping organisations worldwide unlock value through intelligent systems and automation." },
];

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#050816" }}>
      <BrandBackground />
      <SiteNav active="About" />
      <main className="mx-auto max-w-[1400px] px-6 pb-8 lg:px-10">
        <Hero />
        <StatsAndValues />
        <ArchitecturalPrinciples />
        <CoreExpertise />
        <TechPlatforms />
        <Journey />
        <CTA />
        <SiteFooter />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 gap-5 pt-7 lg:grid-cols-[1fr_1fr_1fr]">
      {/* Left text */}
      <div className="flex flex-col">
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
        <h1 className="mt-4 text-[36px] font-bold leading-[1.08] tracking-tight text-white lg:text-[44px]">
          From PhD Research
          <br />
          to AI Systems
          <br />
          That <span className="text-gradient-brand">Drive Real Impact</span>
        </h1>
        <p className="mt-5 max-w-md text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          I combine scientific rigour with engineering mindset to design intelligent systems
          that solve real business problems and scale in production.
        </p>
        <p className="mt-3 max-w-md text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          After completing my PhD in Natural Technology at BOKU Vienna, I discovered that the
          same systematic thinking, hypothesis validation, and attention to detail that drive
          scientific research are exactly what enterprises need to build reliable AI systems
          that work every day.
        </p>

        <div
          className="mt-5 rounded-[14px] p-4"
          style={{
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.22)",
          }}
        >
          <div className="flex gap-3">
            <Quote className="h-5 w-5 shrink-0" style={{ color: "#A855F7" }} />
            <p className="text-[13px] italic leading-relaxed" style={{ color: "#C7C7D1" }}>
              My mission is simple: turn complex processes into intelligent systems that free
              people to focus on what truly matters.
            </p>
          </div>
        </div>
      </div>

      {/* Center portrait */}
      <div className="flex flex-col">
        <div
          className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px]"
          style={{
            background: "#0A0E22",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <img
            src={heroPortrait}
            alt="Dr. Ephraim Mpofu — AI Solutions Architect"
            className="h-full w-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
            style={{ background: "linear-gradient(180deg, transparent, rgba(5,8,22,0.72))" }}
          />
          <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2">
            <Signature size="xl" className="!h-auto !w-[205px] opacity-95" />
          </div>
        </div>
        <div className="mt-3 min-h-[78px] text-center leading-tight">
          <div className="text-[19px] font-bold tracking-tight text-white">Dr. Ephraim Mpofu</div>
          <div className="mt-1 text-[12.5px] font-semibold" style={{ color: "#A855F7" }}>
            AI Solutions Architect
          </div>
          <div className="mt-1 text-[11.5px]" style={{ color: "#C7C7D1" }}>
            PhD NatTech — BOKU Vienna
          </div>
          <div className="mt-1 text-[11px]" style={{ color: "#9CA3AF" }}>
            Researcher | Systems Thinker | Enterprise AI Builder
          </div>
        </div>
      </div>

      {/* Right column cards */}
      <div className="flex flex-col gap-5">
        <FoundationCard />
  
      </div>
    </section>
  );
}

function FoundationCard() {
  const items: { logo: React.ReactNode; title: string; sub: string }[] = [
    {
      logo: <BokuLogo />,
      title: "PhD in Natural Technology (NatTech)",
      sub: "BOKU University, Vienna",
    },
    {
      logo: <IconWrap><GraduationCap className="h-5 w-5" style={{ color: "#C4B5FD" }} /></IconWrap>,
      title: "Google Data Analytics Professional",
      sub: "Data-driven decision making",
    },
    {
      logo: <AzureGlyphLg />,
      title: "Azure AI-103 Certified",
      sub: "Microsoft Certified\nAI App & Agent Developer",
    },
    {
      logo: <MicrosoftGlyphLg />,
      title: "Microsoft AI Cloud Partner",
      sub: "Building on enterprise-grade cloud infrastructure",
    },
  ];
  return (
    <div className="glass-card p-5">
      <div className="text-[15px] font-bold text-white">My Foundation</div>
      <div className="mt-4 space-y-3.5">
        {items.map((it) => (
          <div key={it.title} className="flex items-start gap-3">
            <div className="shrink-0">{it.logo}</div>
            <div className="min-w-0 leading-tight">
              <div className="text-[12.5px] font-bold text-white">{it.title}</div>
              <div className="mt-1 whitespace-pre-line text-[11px]" style={{ color: "#9CA3AF" }}>
                {it.sub}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatsAndValues() {
  return (
    <section className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1fr_1fr]">
      <div className="lg:col-span-2">
        <div className="glass-card grid grid-cols-2 gap-5 px-6 py-5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v}>
              <s.icon className="h-6 w-6" style={{ color: "#A855F7" }} />
              <div className="mt-3 text-gradient-brand text-[26px] font-bold leading-none">{s.v}</div>
              <div className="mt-1.5 text-[11px] leading-tight" style={{ color: "#9CA3AF" }}>
                {s.a}
                <br />
                {s.b}
              </div>
            </div>
          ))}
        </div>
      </div>

  
    </section>
  );
}

function ArchitecturalPrinciples() {
  return (
    <section className="mt-8 glass-card p-5">
      <div className="text-[15px] font-bold text-white">My Architectural Principles</div>
      <div className="mt-4 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {values.map((v) => (
          <div key={v.title} className="flex flex-col gap-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.3)",
              }}
            >
              <v.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
            </div>
            <div className="text-[12.5px] font-bold text-white">{v.title}</div>
            <div className="text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>
              {v.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub: string }) {
  return (
    <div className="text-center">
      <span
        className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{
          background: "rgba(139,92,246,0.12)",
          border: "1px solid rgba(139,92,246,0.32)",
          color: "#C4B5FD",
        }}
      >
        {eyebrow}
      </span>
      <h2 className="mt-3 text-[28px] font-bold tracking-tight text-white lg:text-[32px]">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-2xl text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
        {sub}
      </p>
    </div>
  );
}

function CoreExpertise() {
  return (
    <section className="mt-8">
      <SectionHeader
        eyebrow="Core Expertise"
        title="Core Expertise"
        sub="The disciplines, systems, and capabilities I use to design and deliver intelligent enterprise solutions."
      />
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {expertise.map((e) => (
          <div
            key={e.title}
            className="glass-card flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:brand-glow"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{
                background: "rgba(139,92,246,0.14)",
                border: "1px solid rgba(139,92,246,0.32)",
              }}
            >
              <e.icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <div className="text-[13.5px] font-bold leading-snug text-white">{e.title}</div>
            <div className="text-[11.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              {e.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechPlatforms() {
  return (
    <section className="mt-8">
      <SectionHeader
        eyebrow="Technologies & Platforms"
        title="Technologies & Platforms"
        sub="The technologies below are tools I use to deliver business outcomes. My expertise lies in architecture, systems thinking, and intelligent automation."
      />
      <div className="mt-5 glass-card px-6 py-6">
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
          {technologies.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-center justify-center gap-2 rounded-[12px] px-3 py-4 transition-all hover:-translate-y-0.5 hover:brand-glow"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
              title={t.name}
            >
              <img
                src={`https://cdn.simpleicons.org/${t.slug}/${t.color}`}
                alt={t.name}
                className="h-8 w-8 object-contain"
                loading="lazy"
              />
              <div className="text-center text-[11px] font-semibold text-white">{t.name}</div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {capabilities.map((c) => (
            <span
              key={c}
              className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-white"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.30)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section className="mt-8">
      <SectionHeader
        eyebrow="My Journey"
        title="My Journey"
        sub="From scientific research to enterprise AI architecture."
      />
      <div className="relative mt-7">
        {/* horizontal connector line (desktop) */}
        <div
          className="absolute left-[6%] right-[6%] top-[18px] hidden h-[2px] lg:block"
          style={{
            background:
              "linear-gradient(90deg, transparent, #8B5CF6 12%, #A855F7 50%, #8B5CF6 88%, transparent)",
          }}
        />
        <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
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
              <div className="glass-card mt-5 w-full px-4 py-4">
                <div className="text-[13.5px] font-bold leading-snug text-white">{j.title}</div>
                <div className="mt-2 text-[11.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
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

function CTA() {
  return (
    <section className="mt-8">
      <div
        className="flex flex-col items-center gap-4 rounded-[16px] px-8 py-8 text-center"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(168,85,247,0.10))",
          border: "1px solid rgba(139,92,246,0.32)",
        }}
      >
        <h2 className="text-[24px] font-bold uppercase tracking-tight text-white lg:text-[28px]">
          Let's Build Systems That Deliver <span className="text-gradient-brand">Real Impact</span>
        </h2>
        <p className="max-w-2xl text-[13.5px] leading-relaxed" style={{ color: "#C7C7D1" }}>
          Whether you're exploring AI opportunities, designing enterprise knowledge systems,
          automating complex workflows, or building intelligent platforms, I'd be happy to
          discuss how we can create measurable business value.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:brand-glow"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <MessageSquare className="h-4 w-4" /> Ask Me Anything
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <Mail className="h-4 w-4" /> Get In Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============ Logo helpers ============ */

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-md"
      style={{
        background: "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.3)",
      }}
    >
      {children}
    </div>
  );
}

function AzureGlyphLg() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "rgba(0,120,212,0.12)", border: "1px solid rgba(0,120,212,0.4)" }}>
      <svg width="20" height="20" viewBox="0 0 24 24">
        <path d="M11 4 L4 18 L10 18 L13 13 Z" fill="#0078D4" />
        <path d="M13 9 L20 18 L13 18 L11 15 Z" fill="#50E6FF" />
      </svg>
    </div>
  );
}

function MicrosoftGlyphLg() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <svg width="20" height="20" viewBox="0 0 24 24">
        <rect x="2" y="2" width="9" height="9" fill="#F25022" />
        <rect x="13" y="2" width="9" height="9" fill="#7FBA00" />
        <rect x="2" y="13" width="9" height="9" fill="#00A4EF" />
        <rect x="13" y="13" width="9" height="9" fill="#FFB900" />
      </svg>
    </div>
  );
}

function BokuLogo() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-md"
      style={{ background: "rgba(255,255,255,0.96)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <img src={bokuLogo.url} alt="BOKU University" className="h-6 w-6 object-contain" />
    </div>
  );
}
