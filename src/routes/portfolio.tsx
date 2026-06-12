import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Rocket,
  Clock,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Github,
  ExternalLink,
  Workflow,
  FileText,
  Database,
  Sparkles,
  Boxes,
  Network,
  Code2,
  Zap,
  ArrowRight,
  Bot,
  Brain,
  Link as LinkIcon,
  Globe,
  Search,
  Building2,
  MessageSquare,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Dr. Ephraim Mpofu · Dr.Nat.Tech" },
      {
        name: "description",
        content:
          "Real enterprise AI systems built for production: multi-agent claims platforms, automation workflows, and analytics dashboards delivering measurable impact.",
      },
      { property: "og:title", content: "Portfolio — Dr.Nat.Tech" },
      {
        property: "og:description",
        content:
          "Proof that I deliver results. Production-grade AI systems, automations and analytics.",
      },
    ],
  }),
  component: PortfolioPage,
});

const categories = [
  "All Projects",
  "AI Systems",
  "Automation",
  "Data & Analytics",
  "RAG / Knowledge",
  "Agents",
] as const;

const metrics = [
  { icon: Rocket, v: "12+", l: "Projects Delivered" },
  { icon: Clock, v: "3,500+", l: "Hours of Manual Work Automated" },
  { icon: BarChart3, v: "70%", l: "Average Process Time Reduction" },
  { icon: ShieldCheck, v: "100%", l: "Built for Production" },
];

type Project = {
  badge?: string;
  title: string;
  description: string;
  metrics: { v: string; l: string }[];
  stack: string[];
  actions: string[];
  cover: "claims" | "autoapply" | "dashboard";
};

const projects: Project[] = [
  {
    badge: "Featured",
    title: "Insurance Claims AI Platform",
    description:
      "Multi-agent system that automates the entire claims processing lifecycle with fraud detection and full auditability.",
    metrics: [
      { v: "70%", l: "Reduction in Processing Time" },
      { v: "35%", l: "Decrease in Fraud Detection Time" },
      { v: "100%", l: "Audit Trail Coverage" },
    ],
    stack: ["n8n", "OpenAI API", "Claude AI", "Supabase", "AI Agents", "RAG", "Webhooks", "PostgreSQL"],
    actions: ["Live Demo", "Architecture Walkthrough", "GitHub Repository", "Case Study (PDF)"],
    cover: "claims",
  },
  {
    title: "AutoApply: AI-Powered Job Application Automation",
    description:
      "AI system that finds, tailors, and submits job applications automatically. Saves hours of repetitive work and increases response rates.",
    metrics: [
      { v: "85%", l: "Time Saved on Applications" },
      { v: "3x", l: "More Applications Submitted" },
      { v: "Smart", l: "Tailored Resumes & Cover Letters" },
    ],
    stack: ["n8n", "OpenAI API", "Claude AI", "Supabase", "AI Orchestration", "Prompt Engineering"],
    actions: ["Live Demo", "Architecture Walkthrough", "GitHub Repository"],
    cover: "autoapply",
  },
  {
    title: "Claims Analytics Dashboard",
    description:
      "Real-time analytics and reporting dashboard for claims performance, fraud detection insights, and operational KPIs.",
    metrics: [
      { v: "Real-time", l: "Data Updates" },
      { v: "360°", l: "Operational Visibility" },
      { v: "Data-Driven", l: "Decision Making" },
    ],
    stack: ["Power BI", "PostgreSQL", "Supabase", "n8n", "REST APIs", "Webhooks"],
    actions: ["Live Demo", "Architecture Walkthrough", "GitHub Repository"],
    cover: "dashboard",
  },
];

const guarantees = [
  "Production-ready systems",
  "Scalable architecture",
  "Full documentation",
  "Clean, maintainable code & workflows",
  "Training & knowledge transfer",
  "Post-delivery support",
];

const techGrid: { name: string; icon: LucideIcon; color: string }[] = [
  { name: "n8n", icon: Workflow, color: "#EA4B71" },
  { name: "OpenAI API", icon: Sparkles, color: "#10A37F" },
  { name: "Claude AI", icon: Brain, color: "#D97757" },
  { name: "Supabase", icon: Database, color: "#3ECF8E" },
  { name: "AI Agents", icon: Bot, color: "#8B5CF6" },
  { name: "Prompt Engineering", icon: Code2, color: "#38BDF8" },
  { name: "Workflow Automation", icon: Zap, color: "#F59E0B" },
  { name: "AI Orchestration", icon: Network, color: "#10B981" },
  { name: "REST APIs", icon: Globe, color: "#60A5FA" },
  { name: "Webhooks", icon: LinkIcon, color: "#F97316" },
  { name: "PostgreSQL", icon: Database, color: "#336791" },
  { name: "Power BI", icon: BarChart3, color: "#F2C811" },
  { name: "GitHub", icon: Github, color: "#FFFFFF" },
  { name: "RAG Systems", icon: Search, color: "#A855F7" },
  { name: "Vector Search", icon: Boxes, color: "#EC4899" },
  { name: "Enterprise Automation", icon: Building2, color: "#6366F1" },
];

function PortfolioPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All Projects");
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#050816" }}>
      <BrandBackground />
      <SiteNav active="Portfolio" />
      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-20">
        <Hero active={active} setActive={setActive} />
        <MetricsStrip />
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px]">
          <div className="flex flex-col gap-6">
            {projects.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
            <GithubCTA />
          </div>
          <aside className="flex flex-col gap-5">
            <GuaranteesCard />
            <TechCard />
            <AIAgentCard />
          </aside>
        </div>
      </main>
    </div>
  );
}

function Hero({
  active,
  setActive,
}: {
  active: (typeof categories)[number];
  setActive: (c: (typeof categories)[number]) => void;
}) {
  return (
    <section className="grid grid-cols-1 gap-8 pt-10 lg:grid-cols-2">
      <div>
        <span
          className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.32)",
            color: "#C4B5FD",
          }}
        >
          Portfolio
        </span>
        <h1 className="mt-5 text-[44px] font-bold leading-[1.05] tracking-tight text-white lg:text-[52px]">
          Proof That
          <br />
          I Deliver <span className="text-gradient-brand">Results</span>
        </h1>
        <p className="mt-6 max-w-md text-[14px] leading-relaxed" style={{ color: "#A3A3B2" }}>
          Real projects. Real impact.
          <br />
          Built for production. Designed for business outcomes.
        </p>
      </div>
      <div className="flex flex-col justify-end">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const on = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className="rounded-full px-4 py-2 text-[12.5px] font-semibold transition-all"
                style={{
                  background: on
                    ? "linear-gradient(135deg, #8B5CF6, #A855F7)"
                    : "rgba(255,255,255,0.04)",
                  border: on
                    ? "1px solid rgba(168,85,247,0.7)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: on ? "#fff" : "#A3A3B2",
                  boxShadow: on ? "0 6px 24px rgba(139,92,246,0.35)" : "none",
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MetricsStrip() {
  return (
    <section className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.l} className="glass-card p-5">
          <m.icon className="h-6 w-6" style={{ color: "#A855F7" }} />
          <div className="text-gradient-brand mt-3 text-[28px] font-bold leading-none">{m.v}</div>
          <div className="mt-2 text-[11.5px] leading-tight" style={{ color: "#A3A3B2" }}>
            {m.l}
          </div>
        </div>
      ))}
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[16px] transition-all hover:-translate-y-0.5"
      style={{
        background: "#0B1020",
        border: "1px solid rgba(139,92,246,0.15)",
        boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
      }}
    >
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[260px_1fr_220px]">
        {/* Cover */}
        <div className="relative p-4">
          <Cover kind={project.cover} />
          {project.badge && (
            <span
              className="absolute left-6 top-6 inline-flex items-center rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.2em]"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                color: "#fff",
              }}
            >
              {project.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col p-5 pl-2 lg:pl-0">
          <h2 className="text-[20px] font-bold leading-tight text-white">{project.title}</h2>
          <p className="mt-2 text-[13px] leading-relaxed" style={{ color: "#A3A3B2" }}>
            {project.description}
          </p>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {project.metrics.map((m) => (
              <div
                key={m.l}
                className="rounded-[10px] px-3 py-2.5"
                style={{
                  background: "rgba(139,92,246,0.06)",
                  border: "1px solid rgba(139,92,246,0.18)",
                }}
              >
                <div className="text-gradient-brand text-[18px] font-bold leading-tight">{m.v}</div>
                <div className="mt-0.5 text-[10.5px] leading-tight" style={{ color: "#9CA3AF" }}>
                  {m.l}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div
              className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#6B7280" }}
            >
              Tech Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-md px-2.5 py-1 text-[11px] font-medium transition-all hover:brightness-125"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(139,92,246,0.22)",
                    color: "#C7C7D1",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div
          className="flex flex-col gap-2 p-5 lg:border-l"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {project.actions.map((a, i) => (
            <ActionButton key={a} label={a} primary={i === 0} />
          ))}
        </div>
      </div>
    </article>
  );
}

function ActionButton({ label, primary }: { label: string; primary?: boolean }) {
  const Icon = label.includes("Demo")
    ? ExternalLink
    : label.includes("GitHub")
      ? Github
      : label.includes("Case")
        ? FileText
        : Workflow;
  return (
    <button
      className="inline-flex items-center justify-between gap-2 rounded-[10px] px-3.5 py-2.5 text-[12px] font-semibold transition-all hover:translate-x-0.5"
      style={{
        background: primary
          ? "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(168,85,247,0.10))"
          : "rgba(255,255,255,0.02)",
        border: "1px solid rgba(139,92,246,0.28)",
        color: "#fff",
      }}
    >
      <span className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5" style={{ color: "#A855F7" }} /> {label}
      </span>
      <ArrowRight className="h-3.5 w-3.5 opacity-60" />
    </button>
  );
}

function Cover({ kind }: { kind: Project["cover"] }) {
  const common = "h-[180px] w-full rounded-[12px] overflow-hidden relative";
  if (kind === "claims") {
    return (
      <div
        className={common}
        style={{
          background:
            "radial-gradient(120% 80% at 20% 10%, rgba(139,92,246,0.35), transparent), linear-gradient(135deg, #0A0E22, #161B36)",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        <ArchitectureGraphic />
      </div>
    );
  }
  if (kind === "autoapply") {
    return (
      <div
        className={common}
        style={{
          background:
            "radial-gradient(120% 80% at 80% 0%, rgba(168,85,247,0.30), transparent), linear-gradient(135deg, #0A0E22, #1A1430)",
          border: "1px solid rgba(139,92,246,0.25)",
        }}
      >
        <AutoApplyGraphic />
      </div>
    );
  }
  return (
    <div
      className={common}
      style={{
        background:
          "radial-gradient(120% 80% at 50% 100%, rgba(139,92,246,0.25), transparent), linear-gradient(135deg, #0A0E22, #121736)",
        border: "1px solid rgba(139,92,246,0.25)",
      }}
    >
      <DashboardGraphic />
    </div>
  );
}

function ArchitectureGraphic() {
  return (
    <svg viewBox="0 0 260 180" className="h-full w-full">
      {[
        { x: 30, y: 70, l: "Intake" },
        { x: 110, y: 30, l: "Triage" },
        { x: 110, y: 110, l: "Fraud" },
        { x: 190, y: 70, l: "Decision" },
      ].map((n) => (
        <g key={n.l}>
          <rect
            x={n.x}
            y={n.y}
            width="50"
            height="36"
            rx="6"
            fill="rgba(139,92,246,0.18)"
            stroke="rgba(168,85,247,0.6)"
          />
          <text
            x={n.x + 25}
            y={n.y + 22}
            textAnchor="middle"
            fontSize="9"
            fill="#fff"
            fontWeight="600"
          >
            {n.l}
          </text>
        </g>
      ))}
      <g stroke="rgba(168,85,247,0.5)" strokeWidth="1.2" fill="none">
        <path d="M80 88 L110 48" />
        <path d="M80 88 L110 128" />
        <path d="M160 48 L190 88" />
        <path d="M160 128 L190 88" />
      </g>
      <circle cx="130" cy="88" r="14" fill="rgba(168,85,247,0.25)" stroke="rgba(168,85,247,0.7)" />
    </svg>
  );
}

function AutoApplyGraphic() {
  return (
    <div className="absolute inset-0 flex flex-col gap-2 p-4">
      {[80, 65, 92, 50].map((w, i) => (
        <div
          key={i}
          className="flex items-center gap-2 rounded-md px-2.5 py-2"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: i === 0 ? "#A855F7" : "#4B5563" }}
          />
          <div
            className="h-1.5 flex-1 rounded-full"
            style={{
              background: `linear-gradient(90deg, rgba(168,85,247,0.7) ${w}%, rgba(255,255,255,0.05) ${w}%)`,
            }}
          />
          <div className="text-[9px] font-mono" style={{ color: "#9CA3AF" }}>
            {w}%
          </div>
        </div>
      ))}
    </div>
  );
}

function DashboardGraphic() {
  return (
    <svg viewBox="0 0 260 180" className="h-full w-full">
      <defs>
        <linearGradient id="bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#8B5CF6" stopOpacity="0.2" />
          <stop offset="1" stopColor="#A855F7" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {[40, 70, 55, 95, 80, 110, 90].map((h, i) => (
        <rect
          key={i}
          x={20 + i * 28}
          y={150 - h}
          width="18"
          height={h}
          rx="3"
          fill="url(#bar)"
        />
      ))}
      <path
        d="M20 60 Q60 30 100 50 T180 30 T240 20"
        stroke="#C4B5FD"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function GithubCTA() {
  return (
    <div
      className="flex flex-col items-start justify-between gap-4 rounded-[14px] px-6 py-5 lg:flex-row lg:items-center"
      style={{
        background: "linear-gradient(90deg, rgba(139,92,246,0.18), rgba(168,85,247,0.10))",
        border: "1px solid rgba(139,92,246,0.32)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-lg"
          style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
        >
          <Rocket className="h-5 w-5 text-white" />
        </div>
        <div>
          <div className="text-[14px] font-bold text-white">More projects coming soon...</div>
          <div className="text-[12px]" style={{ color: "#A3A3B2" }}>
            Explore my AI systems, workflows, architecture blueprints, automation projects, and ongoing experiments on GitHub.
          </div>
        </div>
      </div>
      <button
        className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:brand-glow"
        style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
      >
        <Github className="h-4 w-4" /> View All on GitHub
      </button>
    </div>
  );
}

function GuaranteesCard() {
  return (
    <div className="glass-card p-5">
      <div className="text-[14px] font-bold text-white">What You Get With Every Project</div>
      <ul className="mt-4 space-y-2.5">
        {guarantees.map((g) => (
          <li
            key={g}
            className="flex items-start gap-2.5 text-[12.5px]"
            style={{ color: "#C7C7D1" }}
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "#A855F7" }} />
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechCard() {
  return (
    <div className="glass-card p-5">
      <div className="text-[14px] font-bold text-white">Technology I Work With</div>
      <div className="mt-4 grid grid-cols-4 gap-2.5">
        {techGrid.map((t) => (
          <div
            key={t.name}
            className="flex min-w-0 flex-col items-center justify-start gap-1.5 overflow-hidden rounded-[10px] px-1 py-2.5 transition-all hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            title={t.name}
          >
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
              style={{ background: `${t.color}22`, border: `1px solid ${t.color}55` }}
            >
              <t.icon className="h-3.5 w-3.5" style={{ color: t.color }} />
            </div>
            <span
              className="block w-full break-words text-center text-[9px] font-semibold leading-[1.15]"
              style={{ color: "#C7C7D1" }}
            >
              {t.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIAgentCard() {
  return (
    <div className="glass-card relative p-5">
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg"
          style={{ background: "rgba(139,92,246,0.18)", border: "1px solid rgba(168,85,247,0.4)" }}
        >
          <Bot className="h-4 w-4" style={{ color: "#A855F7" }} />
        </div>
        <div className="text-[14px] font-bold text-white">Ask Me About Anything</div>
      </div>
      <p className="mt-3 text-[12.5px] leading-relaxed" style={{ color: "#C7C7D1" }}>
        I've trained an AI on my projects, skills, architecture decisions, services, certifications, and experience.
      </p>
      <div className="mt-3">
        <div className="text-[10.5px] font-semibold uppercase tracking-wider" style={{ color: "#9CA3AF" }}>
          You can ask questions about:
        </div>
        <ul className="mt-1.5 space-y-1">
          {[
            "My projects",
            "AI systems architecture",
            "RAG pipelines",
            "Workflow automation",
            "Azure AI",
            "Supabase",
            "n8n",
            "Power BI",
            "Enterprise AI solutions",
            "My background and experience",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-[11.5px]" style={{ color: "#C7C7D1" }}>
              <span className="h-1 w-1 rounded-full shrink-0" style={{ background: "#A855F7" }} />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <a
        href="/ai-agent"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
        style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
      >
        <MessageSquare className="h-4 w-4" /> Ask Me Anything
      </a>
    </div>
  );
}
