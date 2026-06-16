import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  Brain,
  Database,
  Search,
  Target,
  FileText,
  Activity,
  Clock,
  ShieldCheck,
  X,
  ZoomIn,
  Users,
  TrendingUp,
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
          "AI Career Intelligence Operating System | CV Analysis, GDPR-Compliant HR Automation | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise multi-agent AI system for intelligent career management — AI CV analysis, semantic job matching, GDPR-compliant CV processing, and automated application workflows. 85% reduction in application time, 3× more applications submitted. Built by Dr. Ephraim Mpofu, KI-Architekt Vienna.",
      },
      {
        property: "og:title",
        content:
          "AI Career Intelligence Operating System | CV Analysis & GDPR-Compliant HR Automation",
      },
      {
        property: "og:description",
        content:
          "Multi-agent AI for CV intelligence, job matching, and automated application management. GDPR-compliant processing of CV data. 85% time saved, 3× more applications. By Dr. Ephraim Mpofu.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
      {
        property: "og:image",
        content: "https://drnattech.com/images/career-image.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "AI Career Intelligence OS | CV Analysis, GDPR-Compliant | Dr. Ephraim Mpofu",
      },
      {
        name: "twitter:description",
        content:
          "Multi-agent AI for CV intelligence, semantic job matching and GDPR-compliant application automation. 85% faster, 3× more applications.",
      },
      {
        name: "keywords",
        content:
          "AI CV analysis, CV intelligence AI, HR automation AI, intelligent job matching, ATS automation, GDPR-compliant CV processing, multi-agent AI recruitment, AI career platform, semantic job matching, automated job applications, KI Bewerbung, KI Lebenslauf Analyse",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio/career-intelligence-operating-system",
      },
    ],
  }),
  component: AcpPage,
});

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function AcpStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id":
          "https://drnattech.com/portfolio/career-intelligence-operating-system#webpage",
        url: "https://drnattech.com/portfolio/career-intelligence-operating-system",
        name: "AI Career Intelligence Operating System — CV Analysis & GDPR-Compliant HR Automation",
        description:
          "Enterprise multi-agent AI system for CV intelligence, semantic job matching and GDPR-compliant automated application workflows.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://drnattech.com" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://drnattech.com/portfolio" },
            { "@type": "ListItem", position: 3, name: "AI Career Intelligence Operating System", item: "https://drnattech.com/portfolio/career-intelligence-operating-system" },
          ],
        },
        author: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: "AI Career Intelligence Operating System",
        description:
          "A production enterprise multi-agent AI system for intelligent career management — AI CV analysis, semantic job opportunity matching via pgvector, GDPR-compliant processing of CV data, dynamic CV tailoring per role, automated PDF generation and application submission. Achieves 85% reduction in application time and triples application volume.",
        applicationCategory: "BusinessApplication",
        url: "https://drnattech.com/portfolio/career-intelligence-operating-system",
        author: { "@id": "https://drnattech.com/#person" },
        featureList: [
          "AI CV analysis and CV intelligence extraction",
          "Semantic job opportunity matching with pgvector",
          "GDPR-compliant processing of personal CV data",
          "Dynamic CV tailoring per job description",
          "Automated PDF CV generation",
          "Multi-platform job discovery via web scraping",
          "Application pipeline tracking and notifications",
          "Persistent candidate intelligence in Supabase PostgreSQL",
        ],
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
   IMAGE PATHS
   ============================================================ */

const IMG = {
  WF01: "/images/WF_01_acp_Account_User_Registration.png",
  WF02: "/images/WF_02_acp_CV_Upload_Candidate_Intelligence.png",
  WF03: "/images/WF_03_acp_Job_Search_Request_Ingestion.png",
  WF04: "/images/WF_04_Job_Search_Processing.png",
  CWF01: "/images/cWF_04_Candidate_Data_Assembly.png",
  CWF02: "/images/cWF_04_Job_Search_Matching.png",
};

/* ============================================================
   DATA
   ============================================================ */

const painPoints = [
  {
    icon: Clock,
    color: "#F59E0B",
    title: "Manual Search Overhead",
    desc: "5–10 hrs/week on repetitive job board scanning with poor signal-to-noise ratio.",
  },
  {
    icon: FileText,
    color: "#EF4444",
    title: "Generic CV Submissions",
    desc: "One-size-fits-all CVs achieve sub-30% ATS pass rates regardless of qualification.",
  },
  {
    icon: Activity,
    color: "#818CF8",
    title: "Zero Pipeline Visibility",
    desc: "No unified view of application status, interview stages, or follow-up schedules.",
  },
];

const archStages = [
  { icon: Users, color: "#A855F7", title: "Registration", desc: "Account setup, candidate profile" },
  { icon: Brain, color: "#10B981", title: "CV Intelligence", desc: "GPT-4o CV analysis, structured extraction" },
  { icon: Search, color: "#60A5FA", title: "Job Ingestion", desc: "Multi-platform Apify scraping" },
  { icon: Target, color: "#F59E0B", title: "Job Processing", desc: "Deduplication, orchestrator dispatch" },
  { icon: Database, color: "#818CF8", title: "Data Assembly", desc: "Candidate context builder, pgvector" },
  { icon: TrendingUp, color: "#22D3EE", title: "Application", desc: "CV tailoring, PDF gen, submission" },
];

const subWorkflows = [
  { id: "WF-01", title: "Account & Registration", color: "#A855F7", src: IMG.WF01 },
  { id: "WF-02", title: "CV Upload & Intelligence", color: "#10B981", src: IMG.WF02 },
  { id: "WF-03", title: "Job Search Ingestion", color: "#60A5FA", src: IMG.WF03 },
  { id: "WF-04", title: "Job Search Processing", color: "#F59E0B", src: IMG.WF04 },
  { id: "cWF-04a", title: "Candidate Data Assembly", color: "#818CF8", src: IMG.CWF01 },
  { id: "cWF-04b", title: "Semantic Matching", color: "#22D3EE", src: IMG.CWF02 },
];

/* ============================================================
   PAGE
   ============================================================ */

export function AcpPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#050816" }}>
      <AcpStructuredData />
      <BrandBackground />
      <SiteNav active="Portfolio" />
      <main className="mx-auto max-w-[1280px] px-6 pb-16 lg:px-10">
        <CaseHeader />
        <ProblemAndArchitecture />
        <WorkflowSection onOpen={setLightbox} />
        <OutcomesSection />
        <GovernanceStrip />
        <CtaSection />
      </main>
      <SiteFooter />
      {lightbox && <Lightbox src={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

/* ============================================================
   1. CASE HEADER
   ============================================================ */

function CaseHeader() {
  return (
    <section className="grid grid-cols-1 gap-8 pt-10 lg:grid-cols-[1fr_220px] lg:items-start">
      <div>
        <div className="mb-4 flex items-center gap-2 text-[12px]" style={{ color: "#6B7280" }}>
          <Link to="/portfolio" className="transition-colors hover:text-white">Portfolio</Link>
          <span>/</span>
          <span style={{ color: "#A3A3B2" }}>Case Study</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.32)", color: "#C4B5FD" }}
          >
            Multi-Agent AI
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.28)", color: "#6EE7B7" }}
          >
            GDPR-Compliant
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(96,165,250,0.10)", border: "1px solid rgba(96,165,250,0.25)", color: "#93C5FD" }}
          >
            Career Intelligence
          </span>
        </div>

        <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[42px] lg:text-[48px]">
          AI Career Intelligence<br />
          <span style={{ background: "linear-gradient(90deg, #A855F7, #C4B5FD)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Operating System
          </span>
        </h1>

        <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          A multi-agent AI system that automates the entire career management process — AI
          CV analysis, semantic job matching via pgvector, GDPR-compliant CV tailoring per
          role and automated application submission.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)", boxShadow: "0 0 18px rgba(139,92,246,0.28)" }}
          >
            Discuss a Similar Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Impact metrics card */}
      <div className="rounded-2xl p-5" style={{ background: "rgba(7,11,28,0.9)", border: "1px solid rgba(139,92,246,0.2)" }}>
        {[
          { value: "85%", label: "Application Time Saved", color: "#A855F7" },
          { value: "3×", label: "More Applications Submitted", color: "#10B981" },
          { value: "6", label: "Specialised AI Workflows", color: "#60A5FA" },
        ].map((m, i) => (
          <div
            key={m.label}
            className={i > 0 ? "mt-4 pt-4" : ""}
            style={i > 0 ? { borderTop: "1px solid rgba(255,255,255,0.06)" } : {}}
          >
            <div className="text-[30px] font-bold leading-none" style={{ color: m.color }}>{m.value}</div>
            <div className="mt-1 text-[11px]" style={{ color: "#9CA3AF" }}>{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   2. PROBLEM + ARCHITECTURE
   ============================================================ */

function ProblemAndArchitecture() {
  return (
    <section className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-[1fr_2fr]">

      {/* LEFT: 3 pain points */}
      <div>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
          The Problem
        </div>
        <div className="space-y-3">
          {painPoints.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex items-start gap-3 rounded-xl p-3.5"
                style={{ background: `${p.color}0a`, border: `1px solid ${p.color}20` }}
              >
                <div
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: `${p.color}18` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: p.color }} />
                </div>
                <div>
                  <div className="text-[12.5px] font-bold text-white">{p.title}</div>
                  <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: architecture pipeline */}
      <div>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
          The Solution Architecture
        </div>
        <div className="rounded-2xl p-4" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div className="overflow-x-auto">
            <div className="flex min-w-[520px] items-stretch gap-0">
              {archStages.map((stage, i) => {
                const Icon = stage.icon;
                return (
                  <div key={stage.title} className="flex items-stretch">
                    <div
                      className="flex min-w-[82px] flex-col items-center rounded-xl px-2 py-3.5 text-center"
                      style={{ background: `${stage.color}0d`, border: `1px solid ${stage.color}22` }}
                    >
                      <div
                        className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ background: `${stage.color}18`, border: `1px solid ${stage.color}30` }}
                      >
                        <Icon className="h-3.5 w-3.5" style={{ color: stage.color }} />
                      </div>
                      <div className="text-[10.5px] font-bold leading-snug text-white">{stage.title}</div>
                      <div className="mt-1 text-[9px] leading-snug" style={{ color: "#6B7280" }}>{stage.desc}</div>
                    </div>
                    {i < archStages.length - 1 && (
                      <div className="flex items-center px-1">
                        <div className="text-[12px]" style={{ color: "#374151" }}>→</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data layer */}
          <div className="mt-3 overflow-hidden rounded-xl" style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.05)" }}>
            <div
              className="px-4 py-1 text-center text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ background: "rgba(16,185,129,0.06)", borderBottom: "1px solid rgba(16,185,129,0.12)", color: "#34D399" }}
            >
              DATA LAYER — SUPABASE + PGVECTOR
            </div>
            <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2.5">
              {["Candidate Profile", "CV Intelligence", "Job Listings", "Match Scores", "Audit Log"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Database className="h-3 w-3" style={{ color: "#34D399" }} />
                  <span className="text-[10px] font-medium text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. WORKFLOW SECTION
   ============================================================ */

function WorkflowSection({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <section className="mt-10">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
        Workflow Implementation (n8n) · 4 Parent · 2 Child Workflows
      </div>

      {/* Main orchestrator image — WF04 (Job Search Processing / Orchestrator) */}
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl"
        style={{ background: "rgba(5,8,22,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={() => onOpen(IMG.WF04)}
      >
        <div className="relative">
          <img
            src={IMG.WF04}
            alt="Job Search Processing orchestrator workflow"
            loading="lazy"
            className="w-full object-cover"
            style={{ maxHeight: "220px", objectPosition: "50% 68%" }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white"
              style={{ background: "rgba(139,92,246,0.85)", backdropFilter: "blur(8px)" }}
            >
              <ZoomIn className="h-3.5 w-3.5" /> View Full Orchestrator
            </div>
          </div>
          <div
            className="absolute left-3 top-3 rounded px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
            style={{ background: "rgba(245,158,11,0.9)", color: "#fff" }}
          >
            WF-04 · Main Orchestrator
          </div>
        </div>
      </div>

      {/* Sub-workflow thumbnails */}
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {subWorkflows.map((wf) => (
          <div
            key={wf.id}
            className="group cursor-pointer overflow-hidden rounded-xl transition-all hover:-translate-y-0.5"
            style={{ border: `1px solid ${wf.color}25` }}
            onClick={() => onOpen(wf.src)}
          >
            <div className="relative overflow-hidden" style={{ height: "68px" }}>
              <img
                src={wf.src}
                alt={wf.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                style={{ objectPosition: "50% 68%" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <ZoomIn className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <div className="px-1.5 py-1.5" style={{ background: `${wf.color}09` }}>
              <div className="text-[8.5px] font-bold" style={{ color: wf.color }}>{wf.id}</div>
              <div className="mt-0.5 text-[8.5px] font-medium leading-tight text-white">{wf.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. OUTCOMES
   ============================================================ */

function OutcomesSection() {
  return (
    <section className="mt-10">
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8B8B9A" }}>
        Business Outcomes
      </div>
      <div className="rounded-2xl p-5" style={{ background: "rgba(7,11,28,0.8)", border: "1px solid rgba(255,255,255,0.08)" }}>

        {/* Before / After */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-3.5"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex-1 text-center">
            <div className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#EF4444" }}>Before</div>
            <div className="mt-1 text-[13px] font-semibold text-white">Hours per application</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#6B7280" }}>Manual search · generic CV · no tracking</div>
          </div>
          <div className="text-[20px] shrink-0" style={{ color: "#A855F7" }}>→</div>
          <div className="flex-1 text-center">
            <div className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#10B981" }}>After</div>
            <div className="mt-1 text-[13px] font-semibold text-white">Minutes per application</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#6B7280" }}>Automated pipeline · tailored CV · full visibility</div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "85%", label: "Application Time Saved", color: "#A855F7" },
            { value: "3×", label: "More Applications Submitted", color: "#10B981" },
            { value: "Smart", label: "Tailored CV per Role", color: "#60A5FA" },
            { value: "100%", label: "Decisions Audit-Logged", color: "#F59E0B" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-4 text-center"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div
                className="text-[26px] font-bold leading-none"
                style={{ background: `linear-gradient(90deg, ${m.color}, #fff)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                {m.value}
              </div>
              <div className="mt-2 text-[10.5px] leading-snug" style={{ color: "#9CA3AF" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. GOVERNANCE STRIP (GDPR)
   ============================================================ */

function GovernanceStrip() {
  return (
    <section className="mt-5">
      <div
        className="rounded-xl px-5 py-3.5"
        style={{ background: "rgba(16,185,129,0.04)", border: "1px solid rgba(16,185,129,0.18)" }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex shrink-0 items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#10B981" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "#10B981" }}>
              GDPR-Compliant Architecture
            </span>
          </div>
          <div className="hidden h-3.5 w-px lg:block" style={{ background: "rgba(16,185,129,0.3)" }} />
          {["Explicit User Consent", "EU Server Storage", "Full Audit Trail", "Right to Access & Delete", "No Third-Party Data Sharing"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full shrink-0" style={{ background: "#10B981" }} />
              <span className="text-[11px] font-medium" style={{ color: "#9CA3AF" }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. CTA
   ============================================================ */

function CtaSection() {
  return (
    <section className="mt-8 mb-5">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-9"
        style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(20,20,40,0.6))" }}
      >
        <div>
          <h2 className="text-[20px] font-bold leading-tight text-white lg:text-[24px]">
            Ready to deploy career intelligence for your organisation?
          </h2>
          <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            The architecture adapts for HR departments, outplacement providers, executive
            search firms and career coaching platforms — GDPR-compliant, production-ready,
            delivered from Vienna, Austria.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,#A855F7,#7C3AED)" }}
          >
            Discuss a Similar Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5 whitespace-nowrap"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   LIGHTBOX
   ============================================================ */

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.92)" }}
      onClick={onClose}
    >
      <button
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white"
        style={{ background: "rgba(255,255,255,0.08)" }}
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </button>
      <img
        src={src}
        alt="Workflow detail"
        className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
