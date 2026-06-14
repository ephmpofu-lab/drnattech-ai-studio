import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Database,
  Search,
  Target,
  CheckCircle2,
  X,
  ZoomIn,
  Zap,
  Clock,
  Activity,
  FileText,
  Rocket,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute(
  "/portfolio/career-intelligence-operating-system"
)({
  head: () => ({
    meta: [
      {
        title:
          "AI Career Intelligence Operating System | Enterprise AI Case Study — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise AI system for intelligent career optimization. Multi-agent n8n architecture combining automated job search, AI-driven CV intelligence, semantic matching, and automated application workflows. Built by Dr. Ephraim Mpofu, AI Solutions Architect.",
      },
    ],
  }),
  component: AcpPage,
});

/* ============================================================
   IMAGE PATHS
   ============================================================ */

const IMG = {
  WF01: "/images/WF_01_acp_Account_User_Registration.png",
  WF02: "/images/WF_02_acp_CV_Upload_&_Candidate_Intelligence.png",
  WF03: "/images/WF_03_acp_Job_Search_Request_Ingestion.png",
  WF04: "/images/WF_04_Job_Search_Processing.png",
  CWF01: "/images/cWF_04_Candidate_Data_Assembly.png",
  CWF02: "/images/cWF_04_Job_Search_&_Matching.png",
};

/* ============================================================
   INLINE SVG TECH LOGOS
   ============================================================ */

function N8nLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#EA4B71" />
      <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="12" fontWeight="700" fontFamily="monospace">n8n</text>
    </svg>
  );
}

function OpenAiLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#10a37f" />
      <circle cx="20" cy="20" r="8" stroke="white" strokeWidth="1.8" fill="none" />
      <line x1="20" y1="12" x2="20" y2="28" stroke="white" strokeWidth="1.5" />
      <line x1="12" y1="20" x2="28" y2="20" stroke="white" strokeWidth="1.5" />
      <line x1="14.3" y1="14.3" x2="25.7" y2="25.7" stroke="white" strokeWidth="1.5" />
      <line x1="25.7" y1="14.3" x2="14.3" y2="25.7" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#1C1C1C" />
      <path d="M21 8L10 22h10v10l11-14H21V8z" fill="#3ECF8E" />
    </svg>
  );
}

function ApifyLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#0D1117" />
      <path d="M20 9 L30 15 L30 25 L20 31 L10 25 L10 15 Z" fill="none" stroke="#00D26A" strokeWidth="2" />
      <circle cx="20" cy="20" r="3.5" fill="#00D26A" />
    </svg>
  );
}

function PdfCoLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#C53030" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8.5" fontWeight="800" fontFamily="sans-serif">PDF.co</text>
    </svg>
  );
}

function ResendLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#000000" />
      <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" fontFamily="sans-serif">Resend</text>
    </svg>
  );
}

function PostgresLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#1a1f36" />
      <ellipse cx="20" cy="15.5" rx="8.5" ry="6.5" stroke="#4A90D9" strokeWidth="1.8" fill="none" />
      <path d="M11.5 15.5 L11.5 25 Q11.5 31 20 31 Q28.5 31 28.5 25 L28.5 15.5" stroke="#4A90D9" strokeWidth="1.8" fill="none" />
      <line x1="20" y1="22" x2="20" y2="31" stroke="#4A90D9" strokeWidth="1.8" />
    </svg>
  );
}

function PgvectorLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#1a1f36" />
      <polyline points="8,22 14,14 20,22 26,14 32,14" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="8,28 14,20 20,28 26,20 32,20" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function TypeScriptLogo() {
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-7 w-7">
      <rect width="40" height="40" rx="8" fill="#3178C6" />
      <path d="M9 22.5h5M11.5 19.5v9" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M19 19.5h13v3h-5V29h-3v-6.5H19V19.5z" fill="white" />
    </svg>
  );
}

/* ============================================================
   DATA
   ============================================================ */

const careerChallenges = [
  { icon: <Clock className="h-3.5 w-3.5" />, title: "Manual Search Overhead", desc: "5–10 hrs/week on repetitive job board scanning with minimal signal-to-noise ratio." },
  { icon: <Target className="h-3.5 w-3.5" />, title: "Poor Match Accuracy", desc: "Keyword-based matching surfaces irrelevant roles, causing application fatigue." },
  { icon: <FileText className="h-3.5 w-3.5" />, title: "Generic CV Submissions", desc: "One-size-fits-all CVs achieve sub-30% ATS pass rates regardless of qualification." },
  { icon: <Activity className="h-3.5 w-3.5" />, title: "Zero Pipeline Visibility", desc: "No unified view of application status, interview stages, or follow-up schedules." },
  { icon: <Brain className="h-3.5 w-3.5" />, title: "Lost Contextual Intelligence", desc: "Skills, preferences, and past applications never synthesized into reusable intelligence." },
  { icon: <Zap className="h-3.5 w-3.5" />, title: "No Adaptive Learning", desc: "Traditional tools don't learn from outcomes — each cycle starts from zero." },
];

const acpResponse = [
  "Automated multi-platform job discovery via Apify scrapers",
  "GPT-4o semantic analysis of candidate profile vs. role requirements",
  "pgvector similarity search for ranked opportunity matching",
  "Dynamic CV tailoring per role using structured AI outputs",
  "Automated PDF generation and direct application submission",
  "Real-time pipeline tracking with Resend email notifications",
  "Persistent candidate intelligence in Supabase PostgreSQL",
  "Structured audit trail of every decision and action taken",
];

const architectureNodes = [
  { id: "01", label: "User Registration", sub: "Account & Profile Setup" },
  { id: "02", label: "CV Intelligence", sub: "Upload & AI Analysis" },
  { id: "03", label: "Job Ingestion", sub: "Search Request Trigger" },
  { id: "04", label: "Job Processing", sub: "Matching & Ranking Engine" },
  { id: "05", label: "Data Assembly", sub: "Candidate Context Builder" },
  { id: "06", label: "Application", sub: "CV Tailoring & Submission" },
];

const systemOutcomes = [
  { icon: <Search className="h-3.5 w-3.5" />, title: "Automated Discovery", desc: "Multi-platform job scraping replaces manual search entirely — on schedule or on demand." },
  { icon: <Target className="h-3.5 w-3.5" />, title: "Semantic Matching", desc: "pgvector cosine similarity ranks roles by relevance to full candidate profile." },
  { icon: <FileText className="h-3.5 w-3.5" />, title: "Dynamic CV Tailoring", desc: "GPT-4o rewrites CV sections per job description preserving factual accuracy." },
  { icon: <Activity className="h-3.5 w-3.5" />, title: "Pipeline Intelligence", desc: "Unified application tracking with automated follow-up triggers and notifications." },
  { icon: <Database className="h-3.5 w-3.5" />, title: "Persistent Memory", desc: "Every interaction, match score, and outcome stored and reusable for improvement." },
  { icon: <CheckCircle2 className="h-3.5 w-3.5" />, title: "Governance Auditability", desc: "Full decision trail from ingestion to application — every AI action logged." },
];

const techStack = [
  { Logo: N8nLogo, name: "n8n", role: "Workflow Orchestration" },
  { Logo: OpenAiLogo, name: "OpenAI GPT-4o", role: "Semantic Intelligence" },
  { Logo: SupabaseLogo, name: "Supabase", role: "Backend & Auth" },
  { Logo: ApifyLogo, name: "Apify", role: "Web Scraping" },
  { Logo: PdfCoLogo, name: "PDF.co", role: "Document Generation" },
  { Logo: ResendLogo, name: "Resend", role: "Email Delivery" },
  { Logo: PostgresLogo, name: "PostgreSQL", role: "Persistent Storage" },
  { Logo: PgvectorLogo, name: "pgvector", role: "Vector Search" },
  { Logo: TypeScriptLogo, name: "TypeScript", role: "Type-safe Logic" },
];

const beyondItems = [
  "Interview preparation intelligence from role-specific AI coaching",
  "Salary benchmarking with market data integration",
  "Recruiter relationship mapping and follow-up automation",
  "Skills gap analysis vs. target role requirements",
  "Company culture scoring from aggregated review signals",
  "Career path projection with role transition probability models",
];

const workflows = [
  { img: IMG.WF01, label: "WF-01", title: "Account & User Registration", desc: "Secure onboarding flow capturing candidate profile, preferences, and CV upload trigger." },
  { img: IMG.WF02, label: "WF-02", title: "CV Upload & Candidate Intelligence", desc: "GPT-4o extracts structured competency data from uploaded CV and stores to candidate profile." },
  { img: IMG.WF03, label: "WF-03", title: "Job Search Request Ingestion", desc: "Receives user-defined search parameters and triggers the downstream job processing pipeline." },
  { img: IMG.WF04, label: "WF-04", title: "Job Search Processing", desc: "Orchestrates Apify scrapers, deduplication, semantic ranking, and child workflow dispatch." },
];

const childWorkflows = [
  { img: IMG.CWF01, label: "cWF-04a", title: "Candidate Data Assembly", desc: "Builds complete candidate context snapshot from profile, CV intelligence, and historical applications — passed as structured payload to matching engine." },
  { img: IMG.CWF02, label: "cWF-04b", title: "Job Search & Semantic Matching", desc: "Executes pgvector similarity search against assembled candidate profile, ranks opportunities by match score, and routes top results to the application pipeline." },
];

const foundationCards = [
  {
    badge: "AISA",
    color: "#A855F7",
    bg: "rgba(168,85,247,0.08)",
    border: "rgba(168,85,247,0.2)",
    title: "AISA Framework",
    desc: "Strategic AI engagement methodology guiding system architecture from problem to production.",
  },
  {
    badge: "KA",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.18)",
    title: "Knowledge Architecture",
    desc: "RAG-powered knowledge system enabling semantic matching and intelligent CV personalisation.",
  },
  {
    badge: "4WL",
    color: "#10B981",
    bg: "rgba(16,185,129,0.07)",
    border: "rgba(16,185,129,0.18)",
    title: "Workflow Architecture",
    desc: "Four-layer automation pattern applied across all orchestrated sub-workflows.",
  },
  {
    badge: "CLI",
    color: "#22D3EE",
    bg: "rgba(34,211,238,0.07)",
    border: "rgba(34,211,238,0.16)",
    title: "Closed Loop Intelligence",
    desc: "Feedback loops that continuously refine matching quality and application outcomes.",
  },
];

/* ============================================================
   PAGE
   ============================================================ */

export function AcpPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen" style={{ background: "#050816" }}>
      <BrandBackground />
      <SiteNav active="Portfolio" />

      {/* ── HERO — full-bleed section, image extends to viewport edge ── */}
      <div className="relative overflow-hidden" style={{ minHeight: "540px" }}>

        {/* Purple atmospheric radial glow */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 72% 45%, rgba(139,92,246,0.22) 0%, rgba(99,102,241,0.08) 40%, transparent 65%)",
          }}
        />

        {/* Image — absolutely positioned, right side, fills full hero height, bleeds to viewport edge */}
        <div
          className="absolute right-0 top-0 hidden h-full lg:block"
          style={{ width: "50vw", maxWidth: "860px" }}
        >
          {/* Left edge fade: dissolves image seamlessly into dark background */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(5,8,22,1) 0%, rgba(5,8,22,0.78) 22%, rgba(5,8,22,0.35) 50%, rgba(5,8,22,0.05) 80%, rgba(5,8,22,0) 100%)",
            }}
          />
          {/* Bottom fade: dissolves image into next section */}
          <div
            className="pointer-events-none absolute bottom-0 inset-x-0 z-10"
            style={{
              height: "220px",
              background:
                "linear-gradient(to top, rgba(5,8,22,1) 0%, rgba(5,8,22,0.6) 50%, transparent 100%)",
            }}
          />
          {/* Top vignette */}
          <div
            className="pointer-events-none absolute top-0 inset-x-0 z-10"
            style={{
              height: "80px",
              background: "linear-gradient(to bottom, rgba(5,8,22,0.6) 0%, transparent 100%)",
            }}
          />
          <img
            src="/images/career-image.png"
            alt="Career Intelligence Dashboard"
            className="h-full w-full object-cover"
            style={{ objectPosition: "center center" }}
          />
        </div>

        {/* Content — constrained to max-width, text sits left of image */}
        <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid min-h-[540px] grid-cols-1 items-center lg:grid-cols-[55%_45%]">

            {/* Left — text content */}
            <div className="py-10 lg:py-16">
              {/* Back link */}
              <Link
                to="/portfolio"
                className="mb-8 inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: "#6B7280" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#10B981")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Portfolio
              </Link>

              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className="rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}
                >
                  Enterprise AI System
                </span>
                <span
                  className="rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wider"
                  style={{ background: "rgba(99,102,241,0.15)", color: "#818CF8" }}
                >
                  Career Intelligence
                </span>
              </div>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-white lg:text-[2.6rem] lg:leading-[1.1]">
                AI Career Intelligence
                <br />
                <span style={{ color: "#A855F7" }}>Operating System</span>
              </h1>

              <p className="mb-6 max-w-[520px] text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
                An AI-powered platform that transforms the job search journey into an
                intelligent, automated and personalised career intelligence system.
              </p>

              <div className="mb-8 flex flex-wrap gap-2">
                {[
                  { label: "Built with n8n", icon: "⚙" },
                  { label: "AI Orchestration", icon: "◈" },
                  { label: "Secure & Scalable", icon: "⬡" },
                  { label: "Data Driven", icon: "⎈" },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      color: "#D1D5DB",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <span style={{ color: "#A855F7" }}>{tag.icon}</span>
                    {tag.label}
                  </span>
                ))}
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #A855F7)",
                  boxShadow: "0 0 24px rgba(139,92,246,0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 36px rgba(139,92,246,0.6)";
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(139,92,246,0.4)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Discuss This Architecture <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right — empty placeholder; image is absolutely positioned above */}
            <div className="hidden lg:block" />
          </div>
        </div>

        {/* Mobile: image rendered below text in normal flow */}
        <div className="relative block lg:hidden" style={{ height: "280px" }}>
          <img
            src="/images/career-image.png"
            alt="Career Intelligence Dashboard"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(5,8,22,1) 0%, rgba(5,8,22,0.3) 60%, transparent 100%)",
            }}
          />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-[1280px] px-6 pb-24 pt-8 lg:px-10">

        {/* ── EXECUTIVE SUMMARY: CHALLENGE + SOLUTION ── */}
        <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Challenge */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>The Challenge</h2>
            <h3 className="mb-3 text-lg font-bold text-white">Career Management Without Intelligence</h3>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              Modern job seekers face an intelligence deficit. Existing tools offer browsing,
              not intelligence. Candidates manually scan dozens of job boards, submit generic
              CVs, and have zero visibility into pipeline performance.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {careerChallenges.map((c) => (
                <div key={c.title} className="rounded-lg p-3" style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.12)" }}>
                  <div className="mb-1 flex items-center gap-1.5" style={{ color: "#F87171" }}>
                    {c.icon}
                    <span className="text-[11px] font-semibold">{c.title}</span>
                  </div>
                  <p className="text-[10px] leading-snug" style={{ color: "#9CA3AF" }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>The Solution</h2>
            <h3 className="mb-3 text-lg font-bold text-white">An AI Operating System for Career Execution</h3>
            <p className="mb-4 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              The ACP replaces the entire manual career management process with an orchestrated
              AI system. From job discovery to CV tailoring to application submission — every
              step is automated, audited, and continuously improving.
            </p>
            <div className="space-y-1.5">
              {acpResponse.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" style={{ color: "#10B981" }} />
                  <span className="text-xs leading-snug" style={{ color: "#D1D5DB" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARCHITECTURE OVERVIEW + WORKFLOW HIERARCHY ── */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Architecture Overview */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Architecture Overview</h2>
            <h3 className="mb-4 text-base font-bold text-white">Multi-Agent Orchestration Pipeline</h3>
            <div className="space-y-2">
              {architectureNodes.map((node, i) => (
                <div key={node.id} className="relative">
                  <div className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.18)" }}>
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ background: "rgba(16,185,129,0.2)", color: "#10B981" }}>
                      {node.id}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{node.label}</div>
                      <div className="text-[10px]" style={{ color: "#6B7280" }}>{node.sub}</div>
                    </div>
                  </div>
                  {i < architectureNodes.length - 1 && (
                    <div className="absolute bottom-0 left-[19px] h-2 w-0.5 translate-y-full" style={{ background: "rgba(16,185,129,0.3)" }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Hierarchy */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Workflow Hierarchy (n8n)</h2>
            <h3 className="mb-4 text-base font-bold text-white">4 Parent Workflows · 2 Child Workflows</h3>
            <div className="space-y-4">
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#10B981" }}>Parent Workflows</div>
                <div className="space-y-1.5">
                  {[
                    { label: "WF-01", name: "Account & User Registration" },
                    { label: "WF-02", name: "CV Upload & Candidate Intelligence" },
                    { label: "WF-03", name: "Job Search Request Ingestion" },
                    { label: "WF-04", name: "Job Search Processing (Orchestrator)" },
                  ].map((wf) => (
                    <div key={wf.label} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <span className="rounded px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>{wf.label}</span>
                      <span className="text-xs text-white">{wf.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "#818CF8" }}>Child Workflows (spawned by WF-04)</div>
                <div className="space-y-1.5">
                  {[
                    { label: "cWF-04a", name: "Candidate Data Assembly" },
                    { label: "cWF-04b", name: "Job Search & Semantic Matching" },
                  ].map((cwf) => (
                    <div key={cwf.label} className="flex items-center gap-3 rounded-lg px-3 py-2.5" style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)" }}>
                      <span className="rounded px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(99,102,241,0.2)", color: "#818CF8" }}>{cwf.label}</span>
                      <span className="text-xs text-white">{cwf.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── IMPLEMENTATION EVIDENCE (4 workflow images) ── */}
        <section className="mb-6">
          <div className="mb-4">
            <h2 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Implementation Evidence (n8n Workflows)</h2>
            <h3 className="mt-1 text-base font-bold text-white">Parent Workflow Architecture</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workflows.map((wf) => (
              <div key={wf.label} className="group overflow-hidden rounded-xl" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="relative cursor-pointer overflow-hidden" style={{ aspectRatio: "16/10" }} onClick={() => setLightbox(wf.img)}>
                  <img src={wf.img} alt={wf.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "rgba(0,0,0,0.5)" }}>
                    <ZoomIn className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "rgba(16,185,129,0.9)", color: "#fff" }}>
                    {wf.label}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-semibold text-white">{wf.title}</div>
                  <div className="mt-1 text-[10px] leading-snug" style={{ color: "#6B7280" }}>{wf.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHILD WORKFLOWS + SYSTEM OUTCOMES ── */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Child Workflows */}
          <div>
            <div className="mb-4">
              <h2 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Child Workflow Detail</h2>
              <h3 className="mt-1 text-base font-bold text-white">Spawned Sub-Processes (WF-04)</h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {childWorkflows.map((cwf) => (
                <div key={cwf.label} className="group overflow-hidden rounded-xl" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(99,102,241,0.2)" }}>
                  <div className="relative cursor-pointer overflow-hidden" style={{ aspectRatio: "16/9" }} onClick={() => setLightbox(cwf.img)}>
                    <img src={cwf.img} alt={cwf.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100" style={{ background: "rgba(0,0,0,0.5)" }}>
                      <ZoomIn className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute left-2 top-2 rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ background: "rgba(99,102,241,0.9)", color: "#fff" }}>
                      {cwf.label}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-white">{cwf.title}</div>
                    <div className="mt-1.5 text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>{cwf.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Outcomes */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>System Outcomes</h2>
            <h3 className="mb-4 text-base font-bold text-white">What the ACP Delivers</h3>
            <div className="space-y-3">
              {systemOutcomes.map((o) => (
                <div key={o.title} className="flex gap-3 rounded-lg p-3" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.12)" }}>
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded" style={{ background: "rgba(16,185,129,0.15)", color: "#10B981" }}>
                    {o.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-white">{o.title}</div>
                    <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>{o.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TECH STACK + BEYOND + CTA (3-col) ── */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Technology Stack */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Technology Stack</h2>
            <h3 className="mb-4 text-sm font-bold text-white">9 Production Technologies</h3>
            <div className="grid grid-cols-3 gap-3">
              {techStack.map(({ Logo, name, role }) => (
                <div key={name} className="flex flex-col items-center gap-1.5 rounded-lg p-2.5 text-center" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <Logo />
                  <div className="text-[10px] font-semibold leading-tight text-white">{name}</div>
                  <div className="text-[9px] leading-tight" style={{ color: "#6B7280" }}>{role}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Beyond Job Search */}
          <div className="rounded-xl p-6" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Beyond Job Search Automation</h2>
            <h3 className="mb-4 text-sm font-bold text-white">Extensible Intelligence Modules</h3>
            <div className="space-y-2.5">
              {beyondItems.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" style={{ background: "#10B981" }} />
                  <span className="text-xs leading-snug" style={{ color: "#D1D5DB" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col justify-between rounded-xl p-6" style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12) 0%, rgba(99,102,241,0.08) 100%)", border: "1px solid rgba(16,185,129,0.25)" }}>
            <div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }}>
                <Rocket className="h-6 w-6" style={{ color: "#10B981" }} />
              </div>
              <h2 className="mb-1 text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Next Step</h2>
              <h3 className="mb-3 text-base font-bold text-white">Deploy Career Intelligence for Your Organization</h3>
              <p className="mb-6 text-xs leading-relaxed" style={{ color: "#9CA3AF" }}>
                The ACP architecture can be adapted for HR departments, executive search firms,
                outplacement providers, and career coaching platforms seeking to deliver
                intelligence-led candidate support at scale.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                to="/contact"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white transition-all"
                style={{ background: "#10B981" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#059669")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#10B981")}
              >
                Discuss This Architecture
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/portfolio"
                className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition-all"
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#9CA3AF" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "#9CA3AF"; }}
              >
                View More Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* ── ARCHITECTURAL FOUNDATIONS ── */}
        <section className="mb-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: "#6B7280" }}>Architectural Foundations</h2>
              <h3 className="mt-1 text-base font-bold text-white">Proprietary Frameworks Applied</h3>
            </div>
            <Link to="/frameworks" className="hidden items-center gap-1 text-sm font-semibold transition-colors sm:flex" style={{ color: "#10B981" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#34D399")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#10B981")}
            >
              Explore All Frameworks <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {foundationCards.map((fw) => (
              <Link key={fw.badge} to="/frameworks" className="group block">
                <div className="h-full rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ background: fw.bg, border: `1px solid ${fw.border}`, color: fw.color }}>
                    {fw.badge}
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-white">{fw.title}</h4>
                  <p className="mt-1.5 text-[11px] leading-snug" style={{ color: "#6B7280" }}>{fw.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold transition-colors group-hover:text-white" style={{ color: fw.color }}>
                    Explore <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.92)" }} onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute right-4 top-4 rounded-full p-2" style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}>
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="Workflow detail" className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
