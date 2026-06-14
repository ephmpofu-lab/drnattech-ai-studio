import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Brain,
  Database,
  Bell,
  Shield,
  CheckCircle2,
  Eye,
  ExternalLink,
  X,
  ZoomIn,
  Lightbulb,
  Cpu,
  Bot,
  BarChart3,
  Zap,
  Clock,
  AlertTriangle,
  TrendingDown,
  Scale,
  DollarSign,
  Users,
  Lock,
  Activity,
  Search,
  Layers,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute(
  "/portfolio/insurance-claims-intelligence-platform"
)({
  head: () => ({
    meta: [
      {
        title:
          "Insurance Claims Intelligence Platform | Enterprise AI System — Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise AI system for insurance claims automation. Multi-agent architecture combining document intelligence, computer vision, AI decision support, workflow automation and full governance auditability. Built by Dr. Ephraim Mpofu, AI Solutions Architect.",
      },
    ],
  }),
  component: InsuranceClaimsPage,
});

/* ============================================================
   IMAGE PATHS
   ============================================================ */

const IMG = {
  MAIN: "/images/WF_Insurance_MAIN_Insurance_Claims_Orchestrator.png",
  UPLOAD: "/images/WF_Insurance_Upload_Binary_Files.png",
  VALIDATION: "/images/WF_Insurance_Error_Validation_Missing_Fields.png",
  IMAGE_SAFETY: "/images/WF_Insurance_Image_Safety_Gateway.png",
  IMAGE_INTEL: "/images/WF_Insurance_Image_Intelligence.png",
  DOC_INTEL: "/images/WF_Insurance_Document_Intelligence.png",
  DECISION: "/images/WF_Insurance_Decision_and_Report_Creator.png",
  NOTIFY: "/images/WF_Insurance_Notify%20me.png",
};

/* ============================================================
   PAGE
   ============================================================ */

export function InsuranceClaimsPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />
      <SiteNav active="Portfolio" />

      <main className="mx-auto max-w-[1280px] px-6 pb-16 lg:px-10">
        <HeroSection />

        {/* 2 + 3 — Business Challenge + Executive Summary */}
        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <BusinessChallenge />
          <ExecutiveSummary />
        </div>

        <ArchitectureOverview />
        <WorkflowHierarchy onOpen={setLightbox} />
        <ImplementationEvidence onOpen={setLightbox} />

        {/* 7 + 8 — Governance & Compliance + Technology Stack */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <GovernanceCompliance />
          <TechnologyStack />
        </div>

        {/* 9 + 10 — System Outcomes + Enterprise AI Capabilities */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <SystemOutcomes />
          <EnterpriseCapabilities />
        </div>

        <RelatedFrameworks />
        <CtaSection />
      </main>

      <SiteFooter />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-white"
            style={{ background: "rgba(255,255,255,0.08)" }}
            onClick={() => setLightbox(null)}
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Workflow detail"
            className="max-h-[90vh] max-w-[95vw] rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */

const heroTags = [
  { icon: Bot, title: "AI Powered", sub: "OpenAI GPT-4o, Vision" },
  { icon: Zap, title: "Built with n8n", sub: "Workflow Automation" },
  { icon: Database, title: "Data Layer", sub: "Supabase (Postgres)" },
  { icon: BarChart3, title: "Outcome", sub: "70% faster processing" },
];

function HeroSection() {
  return (
    <section className="grid grid-cols-1 items-start gap-8 pt-10 lg:grid-cols-[1fr_400px] lg:gap-10">
      <div>
        <div className="mb-4 flex items-center gap-2 text-[12px]" style={{ color: "#6B7280" }}>
          <Link to="/portfolio" className="transition-colors hover:text-white">Portfolio</Link>
          <span>/</span>
          <span style={{ color: "#A3A3B2" }}>Case Study</span>
        </div>

        <h1 className="text-[34px] font-bold leading-[1.08] tracking-tight text-white sm:text-[42px] lg:text-[48px]">
          Insurance Claims<br />
          <span style={{
            background: "linear-gradient(90deg, #A855F7, #C4B5FD)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Intelligence Platform
          </span>
        </h1>

        <p className="mt-4 max-w-[520px] text-[14px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          End-to-end AI platform that ingests claims, analyses evidence, scores fraud,
          generates decisions and delivers governed, auditable outcomes — automated at every step.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {heroTags.map((tag) => {
            const Icon = tag.icon;
            return (
              <div
                key={tag.title}
                className="flex flex-col gap-1 rounded-xl p-3"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-1.5">
                  <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#A855F7" }} />
                  <span className="text-[11.5px] font-bold text-white">{tag.title}</span>
                </div>
                <span className="text-[10.5px] leading-snug" style={{ color: "#6B7280" }}>{tag.sub}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
              boxShadow: "0 0 18px rgba(139,92,246,0.28)",
            }}
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

      <HeroArchCard />
    </section>
  );
}

function HeroArchCard() {
  const nodes = [
    { label: "Claim Intake", color: "#A855F7", icon: FileText },
    { label: "Validation", color: "#F59E0B", icon: Shield },
    { label: "AI Evidence", color: "#60A5FA", icon: Eye },
    { label: "Decision", color: "#22D3EE", icon: Brain },
    { label: "Report", color: "#C4B5FD", icon: Cpu },
    { label: "Notify", color: "#10B981", icon: Bell },
  ];

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: "linear-gradient(155deg, #070B1C 0%, #09102A 100%)",
        border: "1px solid rgba(139,92,246,0.16)",
        minHeight: "300px",
      }}
    >
      <div className="mb-3 text-[8px] font-bold uppercase tracking-[0.22em]" style={{ color: "#A855F7" }}>
        INSURANCE CLAIMS INTELLIGENCE PLATFORM
      </div>

      <div className="space-y-2">
        {nodes.map((n) => {
          const Icon = n.icon;
          return (
            <div
              key={n.label}
              className="flex items-center gap-3 rounded-lg px-3 py-2"
              style={{ background: `${n.color}0d`, border: `1px solid ${n.color}25` }}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" style={{ color: n.color }} />
              <span className="text-[12px] font-medium text-white">{n.label}</span>
              <div className="ml-auto h-1.5 w-1.5 rounded-full" style={{ background: n.color, opacity: 0.6 }} />
            </div>
          );
        })}
      </div>

      <div
        className="mt-4 grid grid-cols-3 gap-1.5 rounded-xl p-3"
        style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.04)" }}
      >
        {[
          { v: "−70%", l: "Processing Time", c: "#A855F7" },
          { v: "+35%", l: "Fraud Detection", c: "#10B981" },
          { v: "100%", l: "Audit Coverage", c: "#60A5FA" },
        ].map((m) => (
          <div key={m.l} className="text-center">
            <div className="text-[13px] font-bold" style={{ color: m.c }}>{m.v}</div>
            <div className="mt-0.5 text-[8.5px] leading-tight" style={{ color: "#4B5563" }}>{m.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   2. BUSINESS CHALLENGE
   ============================================================ */

const businessChallenges = [
  {
    icon: Clock,
    color: "#F59E0B",
    title: "Slow Claims Processing",
    desc: "Manual review and handoffs lead to high cycle times and customer dissatisfaction.",
  },
  {
    icon: AlertTriangle,
    color: "#EF4444",
    title: "High Fraud Exposure",
    desc: "Limited detection capabilities lead to increased fraudulent payouts and financial risk.",
  },
  {
    icon: TrendingDown,
    color: "#60A5FA",
    title: "Inconsistent Decisions",
    desc: "Different reviewers and models lead to inconsistent risk assessments across claims.",
  },
  {
    icon: DollarSign,
    color: "#A855F7",
    title: "Rising Operational Costs",
    desc: "High manual effort across multiple teams and systems increases operational overhead.",
  },
  {
    icon: Scale,
    color: "#10B981",
    title: "Compliance Pressure",
    desc: "Regulatory requirements demand auditability, data governance and full decision traceability.",
  },
  {
    icon: Users,
    color: "#C4B5FD",
    title: "Poor Customer Experience",
    desc: "Delays and lack of claim visibility create frustration and erode customer trust.",
  },
];

function BusinessChallenge() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.12em] text-white">
        2. Business Challenge
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {businessChallenges.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.title}
              className="rounded-xl p-3"
              style={{
                background: `${c.color}0a`,
                border: `1px solid ${c.color}20`,
              }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{ background: `${c.color}18` }}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: c.color }} />
                </div>
                <span className="text-[11.5px] font-bold text-white">{c.title}</span>
              </div>
              <p className="text-[10.5px] leading-snug" style={{ color: "#9CA3AF" }}>
                {c.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   3. EXECUTIVE SUMMARY
   ============================================================ */

function ExecutiveSummary() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
        3. Executive Summary
      </h2>
      <p className="mb-4 mt-1 text-[9.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#A855F7" }}>
        Enterprise Architecture Case Study
      </p>
      <div className="space-y-3 text-[12px] leading-relaxed" style={{ color: "#9CA3AF" }}>
        <p>
          The Insurance Claims Intelligence Platform is an{" "}
          <span className="font-semibold text-white">enterprise AI system</span> designed to
          automate the entire claims lifecycle — from evidence ingestion and analysis to{" "}
          <span className="font-semibold text-white">AI decision support</span>, report generation
          and governance.
        </p>
        <p>
          Built on a layered{" "}
          <span className="font-semibold text-white">enterprise architecture</span> using n8n{" "}
          <span className="font-semibold text-white">workflow automation</span>, the platform
          coordinates specialised intelligence workflows:{" "}
          <span className="font-semibold text-white">computer vision</span> for image analysis
          and <span className="font-semibold text-white">document intelligence</span> for
          unstructured data extraction.
        </p>
        <p>
          Every decision, action and event is fully auditable — making{" "}
          <span className="font-semibold text-white">governance</span> and{" "}
          <span className="font-semibold text-white">auditability</span> structural features of
          the system, not afterthoughts. This is what enterprise-grade{" "}
          <span className="font-semibold text-white">insurance claims automation</span> looks
          like in practice.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   4. ARCHITECTURE OVERVIEW
   ============================================================ */

const archStages = [
  {
    icon: FileText,
    color: "#A855F7",
    title: "Claim Intake",
    desc: "Webhook trigger, binary file upload, claim registration",
  },
  {
    icon: Shield,
    color: "#F59E0B",
    title: "Validation & Governance",
    desc: "Field validation, schema checks, error routing",
  },
  {
    icon: Eye,
    color: "#60A5FA",
    title: "Evidence Intelligence",
    desc: "Image safety gateway, computer vision, document parsing",
  },
  {
    icon: Brain,
    color: "#22D3EE",
    title: "Decision Intelligence",
    desc: "Fraud scoring, risk assessment, AI recommendation",
  },
  {
    icon: Cpu,
    color: "#C4B5FD",
    title: "Report Generation",
    desc: "PDF report builder, structured output, Supabase storage",
  },
  {
    icon: Bell,
    color: "#10B981",
    title: "Notification Layer",
    desc: "Email notification, lifecycle events, audit logging",
  },
];

const dataLayerItems = [
  { icon: Database, label: "Claims DB" },
  { icon: Database, label: "Evidence Store" },
  { icon: Database, label: "Decisions DB" },
  { icon: Database, label: "Reports DB" },
  { icon: Database, label: "Audit Log" },
  { icon: Database, label: "Vector Store" },
];

function ArchitectureOverview() {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
          4. Architecture Overview
        </h2>
      </div>

      <div
        className="overflow-hidden rounded-2xl p-5"
        style={{
          background: "rgba(7,11,28,0.8)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="overflow-x-auto">
          <div className="flex min-w-[700px] items-stretch gap-0">
            {archStages.map((stage, i) => {
              const Icon = stage.icon;
              return (
                <div key={stage.title} className="flex items-stretch">
                  <div
                    className="flex min-w-[108px] flex-col items-center rounded-xl px-3 py-4 text-center"
                    style={{
                      background: `${stage.color}0d`,
                      border: `1px solid ${stage.color}22`,
                    }}
                  >
                    <div
                      className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{
                        background: `${stage.color}18`,
                        border: `1px solid ${stage.color}30`,
                      }}
                    >
                      <Icon className="h-4 w-4" style={{ color: stage.color }} />
                    </div>
                    <div className="text-[11px] font-bold leading-snug text-white">{stage.title}</div>
                    <div className="mt-1.5 text-[9.5px] leading-snug" style={{ color: "#6B7280" }}>
                      {stage.desc}
                    </div>
                  </div>
                  {i < archStages.length - 1 && (
                    <div className="flex items-center px-1.5">
                      <div className="text-[14px] font-light" style={{ color: "#374151" }}>→</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="my-3 flex justify-center gap-8">
          {archStages.map((s) => (
            <div key={s.title} className="h-5 w-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          ))}
        </div>

        <div
          className="overflow-hidden rounded-xl"
          style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div
            className="px-4 py-1.5 text-center text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{
              background: "rgba(16,185,129,0.06)",
              borderBottom: "1px solid rgba(16,185,129,0.12)",
              color: "#34D399",
            }}
          >
            DATA LAYER (SUPABASE)
          </div>
          <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-3">
            {dataLayerItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-1.5">
                  <Icon className="h-3 w-3" style={{ color: "#34D399" }} />
                  <span className="text-[10.5px] font-medium text-white">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. WORKFLOW HIERARCHY
   ============================================================ */

function WorkflowHierarchy({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <section className="mt-8">
      <div className="mb-3">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
          5. Workflow Hierarchy (n8n)
        </h2>
        <p className="mt-0.5 text-[12px]" style={{ color: "#6B7280" }}>
          Main orchestrator workflow coordinating all sub-workflows and data flows
        </p>
      </div>

      <div
        className="group cursor-pointer overflow-hidden rounded-2xl"
        style={{ background: "rgba(5,8,22,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={() => onOpen(IMG.MAIN)}
      >
        <div className="relative">
          <img
            src={IMG.MAIN}
            alt="Main Claims Orchestrator workflow"
            loading="lazy"
            className="w-full object-cover object-top"
            style={{ maxHeight: "220px" }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white"
              style={{ background: "rgba(139,92,246,0.85)", backdropFilter: "blur(8px)" }}
            >
              <ZoomIn className="h-3.5 w-3.5" /> Enlarge
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. IMPLEMENTATION EVIDENCE
   ============================================================ */

const subWorkflows = [
  {
    id: "WF_01",
    title: "Upload Binary Files",
    color: "#60A5FA",
    src: IMG.UPLOAD,
    desc: "Secure ingestion of claim evidence — images, documents and binary attachments into the processing pipeline.",
  },
  {
    id: "WF_02",
    title: "Validation & Governance",
    color: "#F59E0B",
    src: IMG.VALIDATION,
    desc: "Field validation and schema checks that prevent incomplete or non-compliant records from entering downstream workflows.",
  },
  {
    id: "WF_03",
    title: "Image Safety Gateway",
    color: "#EC4899",
    src: IMG.IMAGE_SAFETY,
    desc: "Governance review of uploaded imagery before AI analysis — filtering unsafe or irrelevant content.",
  },
  {
    id: "WF_04",
    title: "Image Intelligence",
    color: "#22D3EE",
    src: IMG.IMAGE_INTEL,
    desc: "Computer vision workflow extracting structured damage intelligence and metadata from submitted claim evidence.",
  },
  {
    id: "WF_05",
    title: "Document Intelligence",
    color: "#C4B5FD",
    src: IMG.DOC_INTEL,
    desc: "Transforms unstructured insurance documentation into decision-ready structured data via document parsing.",
  },
  {
    id: "WF_06",
    title: "Decision & Report Creator",
    color: "#A855F7",
    src: IMG.DECISION,
    desc: "AI-powered decision engine producing recommendations, risk assessments and a full structured PDF report.",
  },
  {
    id: "WF_07",
    title: "Notification Layer",
    color: "#10B981",
    src: IMG.NOTIFY,
    desc: "Manages email communications, claim lifecycle updates and audit event logging for every processed claim.",
  },
];

function ImplementationEvidence({ onOpen }: { onOpen: (src: string) => void }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
          6. Implementation Evidence (n8n Workflows)
        </h2>
        <p className="mt-0.5 text-[12px]" style={{ color: "#6B7280" }}>
          Production workflow implementation — click any workflow to view the full n8n canvas
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subWorkflows.map((wf) => (
          <div
            key={wf.id}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
            style={{
              background: "rgba(7,11,28,0.9)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
            onClick={() => onOpen(wf.src)}
          >
            <div
              className="flex items-center gap-2 px-3 py-2.5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="h-2 w-2 shrink-0 rounded-full" style={{ background: wf.color }} />
              <span className="text-[11.5px] font-bold text-white">
                {wf.id} {wf.title}
              </span>
            </div>

            <div className="relative overflow-hidden" style={{ background: "rgba(5,8,22,0.8)", height: "150px" }}>
              <img
                src={wf.src}
                alt={wf.title}
                loading="lazy"
                className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: "rgba(0,0,0,0.45)" }}
              >
                <ZoomIn className="h-5 w-5 text-white" />
              </div>
            </div>

            <div className="flex flex-1 flex-col p-3">
              <p className="text-[11.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
                {wf.desc}
              </p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold" style={{ color: wf.color }}>
                View in n8n <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   7. GOVERNANCE & COMPLIANCE
   ============================================================ */

const governanceItems = [
  { icon: FileText, label: "Audit Trail", desc: "Full event and decision logging" },
  { icon: Eye, label: "Human Review", desc: "Manual override pathways" },
  { icon: Search, label: "Traceability", desc: "End-to-end decision tracking" },
  { icon: Shield, label: "Compliance Controls", desc: "Schema and policy enforcement" },
  { icon: Database, label: "Decision Recording", desc: "Structured output storage" },
  { icon: Scale, label: "Dispute Resolution", desc: "Escalation workflows" },
  { icon: Activity, label: "Production Monitoring", desc: "Runtime health checks" },
  { icon: Lightbulb, label: "Responsible AI", desc: "Bias and safety controls" },
  { icon: Lock, label: "Security Controls", desc: "Access and data governance" },
];

function GovernanceCompliance() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white">
        7. Governance & Compliance
      </h2>
      <p className="mb-4 mt-1 text-[10.5px]" style={{ color: "#6B7280" }}>
        Controls, oversight mechanisms and auditability features embedded in the system architecture.
      </p>
      <div className="grid grid-cols-3 gap-2">
        {governanceItems.map((g) => {
          const Icon = g.icon;
          return (
            <div
              key={g.label}
              className="rounded-xl p-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <Icon className="h-3 w-3 shrink-0" style={{ color: "#A855F7" }} />
                <span className="text-[10.5px] font-semibold text-white">{g.label}</span>
              </div>
              <p className="text-[9.5px] leading-snug" style={{ color: "#6B7280" }}>{g.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   8. TECHNOLOGY STACK
   ============================================================ */

const LogoN8n = () => (
  <svg viewBox="0 0 48 28" width="32" height="18" aria-hidden="true">
    <text x="0" y="22" fontSize="24" fontWeight="700" fill="#EA4335" fontFamily="'Courier New',Courier,monospace">n8n</text>
  </svg>
);

const LogoOpenAI = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="white" aria-hidden="true">
    <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0L4.05 14.01A4.5 4.5 0 0 1 2.34 7.896zm16.597 3.855l-5.843-3.372L15.115 7.2a.076.076 0 0 1 .071 0l4.767 2.752a4.5 4.5 0 0 1-.68 8.117V12.35a.786.786 0 0 0-.336-.6zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.767-2.752a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
  </svg>
);

const LogoSupabase = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#3ECF8E" aria-hidden="true">
    <path d="M21.362 9.354H12V.396a.396.396 0 0 0-.716-.233L2.203 12.424l-.401.562a1.04 1.04 0 0 0 .836 1.659H12v8.959a.396.396 0 0 0 .716.233l9.081-12.261.401-.562a1.04 1.04 0 0 0-.836-1.66z" />
  </svg>
);

const LogoPostgreSQL = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#336791" />
    <path d="M8 9h8M8 12h8M8 15h5" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

const LogoComputerVision = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <ellipse cx="12" cy="12" rx="10" ry="6" stroke="#60A5FA" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="3" fill="#60A5FA" />
    <circle cx="12" cy="12" r="1.2" fill="#050816" />
    <line x1="2" y1="12" x2="5" y2="12" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="19" y1="12" x2="22" y2="12" stroke="#60A5FA" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const LogoGmail = () => (
  <svg viewBox="0 0 24 20" width="22" height="18" aria-hidden="true">
    <rect width="24" height="20" rx="2" fill="#f2f2f2" />
    <path d="M2 4l10 7 10-7" stroke="#EA4335" strokeWidth="1.5" fill="none" />
    <path d="M2 4v12h20V4L12 11z" fill="white" />
    <path d="M2 4l10 7 10-7V4L12 11 2 4z" fill="#EA4335" />
  </svg>
);

const LogoPDF = () => (
  <svg viewBox="0 0 24 24" width="16" height="18" aria-hidden="true">
    <rect x="3" y="2" width="14" height="18" rx="2" fill="#F87171" />
    <path d="M13 2v6h4" fill="none" stroke="white" strokeWidth="1.2" />
    <path d="M13 2l4 6" fill="#d35f5f" />
    <text x="5" y="17" fontSize="4.5" fill="white" fontWeight="bold" fontFamily="Arial,sans-serif">PDF</text>
  </svg>
);

const LogoWebhook = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <circle cx="5" cy="6" r="2.5" stroke="#A855F7" strokeWidth="1.4" />
    <circle cx="19" cy="6" r="2.5" stroke="#A855F7" strokeWidth="1.4" />
    <circle cx="12" cy="18" r="2.5" stroke="#A855F7" strokeWidth="1.4" />
    <path d="M7 7l4 9M17 7l-4 9M7.5 5.5h9" stroke="#A855F7" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const LogoStructured = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
    <polyline points="16 18 22 12 16 6" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="8 6 2 12 8 18" stroke="#C4B5FD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="12" y1="4" x2="12" y2="20" stroke="#C4B5FD" strokeWidth="1" strokeLinecap="round" opacity="0.4" />
  </svg>
);

const TECH_CARDS = [
  { Logo: LogoN8n, name: "n8n", sub: "Workflow Orchestration" },
  { Logo: LogoOpenAI, name: "OpenAI GPT-4o", sub: "Decision Intelligence" },
  { Logo: LogoSupabase, name: "Supabase", sub: "Database & Storage" },
  { Logo: LogoPostgreSQL, name: "PostgreSQL", sub: "Structured Data" },
  { Logo: LogoComputerVision, name: "Computer Vision", sub: "Image Analysis" },
  { Logo: LogoGmail, name: "Gmail", sub: "Notifications" },
  { Logo: LogoPDF, name: "PDF Generation", sub: "Report Creation" },
  { Logo: LogoWebhook, name: "Webhook Integrations", sub: "System Connectivity" },
  { Logo: LogoStructured, name: "Structured Outputs", sub: "Data Schema" },
];

function TechnologyStack() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="mb-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white">
        8. Technology Stack
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {TECH_CARDS.map(({ Logo, name, sub }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-1.5 rounded-xl px-2 py-3 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex h-8 w-8 items-center justify-center">
              <Logo />
            </div>
            <div>
              <div className="text-[10.5px] font-bold leading-tight text-white">{name}</div>
              <div className="mt-0.5 text-[9.5px] leading-tight" style={{ color: "#6B7280" }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   9. SYSTEM OUTCOMES
   ============================================================ */

const systemOutcomes = [
  {
    title: "Governed Claims Processing",
    desc: "AI-driven claims lifecycle managed through validation, review and decision controls.",
  },
  {
    title: "Multi-Agent Decision Intelligence",
    desc: "Specialised AI workflows collaborate to analyse evidence and generate recommendations.",
  },
  {
    title: "End-to-End Audit Traceability",
    desc: "Every decision, action and workflow event is recorded and traceable.",
  },
  {
    title: "Structured Evidence Intelligence",
    desc: "Documents and images are transformed into structured decision-ready data.",
  },
  {
    title: "Automated Report Generation",
    desc: "Claims assessments are converted into standardised reports automatically.",
  },
  {
    title: "Human-in-the-Loop Governance",
    desc: "Escalation and review pathways ensure oversight where required.",
  },
  {
    title: "Enterprise Workflow Orchestration",
    desc: "Multiple intelligence and governance workflows coordinated through a central orchestrator.",
  },
];

function SystemOutcomes() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white">
        9. System Outcomes
      </h2>
      <p className="mb-4 mt-1 text-[10.5px]" style={{ color: "#6B7280" }}>
        Architectural and operational outcomes enabled by the platform design.
      </p>
      <ul className="space-y-3">
        {systemOutcomes.map((o) => (
          <li key={o.title} className="flex items-start gap-2.5">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: "#10B981" }} />
            <div>
              <div className="text-[12px] font-semibold leading-snug text-white">{o.title}</div>
              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#6B7280" }}>{o.desc}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ============================================================
   10. ENTERPRISE AI CAPABILITIES DEMONSTRATED
   ============================================================ */

const capabilities = [
  "Insurance Claims Automation",
  "Multi-Agent AI Architecture",
  "Document Intelligence",
  "Image Intelligence",
  "AI Decision Support",
  "Workflow Orchestration",
  "Human-in-the-Loop Governance",
  "Audit Trail Management",
  "Compliance-Aware Automation",
  "Enterprise AI Architecture",
];

const AiChipSvg = () => (
  <svg viewBox="0 0 80 80" width="70" height="70" aria-hidden="true">
    <rect x="18" y="18" width="44" height="44" rx="7" fill="rgba(168,85,247,0.1)" stroke="rgba(168,85,247,0.28)" strokeWidth="1.5" />
    <rect x="27" y="27" width="26" height="26" rx="4" fill="rgba(168,85,247,0.16)" stroke="rgba(168,85,247,0.36)" strokeWidth="1" />
    <text x="40" y="44" fontSize="9" fill="#A855F7" fontWeight="700" textAnchor="middle" fontFamily="Arial,sans-serif">AI</text>
    <line x1="18" y1="30" x2="8" y2="30" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="40" x2="8" y2="40" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="50" x2="8" y2="50" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="62" y1="30" x2="72" y2="30" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="62" y1="40" x2="72" y2="40" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="62" y1="50" x2="72" y2="50" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="18" x2="30" y2="8" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="18" x2="40" y2="8" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="18" x2="50" y2="8" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="30" y1="62" x2="30" y2="72" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="40" y1="62" x2="40" y2="72" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="50" y1="62" x2="50" y2="72" stroke="rgba(168,85,247,0.32)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="18" cy="18" r="2.5" fill="rgba(168,85,247,0.4)" />
    <circle cx="62" cy="18" r="2.5" fill="rgba(168,85,247,0.4)" />
    <circle cx="18" cy="62" r="2.5" fill="rgba(168,85,247,0.4)" />
    <circle cx="62" cy="62" r="2.5" fill="rgba(168,85,247,0.4)" />
  </svg>
);

function EnterpriseCapabilities() {
  const left = capabilities.slice(0, 5);
  const right = capabilities.slice(5);
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "rgba(7,11,28,0.8)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <h2 className="text-[12px] font-bold uppercase tracking-[0.12em] text-white">
        10. Enterprise AI Capabilities Demonstrated
      </h2>
      <p className="mb-4 mt-1 text-[10.5px]" style={{ color: "#6B7280" }}>
        Technical capabilities and architectural patterns evidenced by this system.
      </p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <ul className="space-y-2.5">
          {left.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#A855F7" }} />
              <span className="text-[11px]" style={{ color: "#D1D5DB" }}>{c}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center px-1">
          <AiChipSvg />
        </div>
        <ul className="space-y-2.5">
          {right.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "#60A5FA" }} />
              <span className="text-[11px]" style={{ color: "#D1D5DB" }}>{c}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ============================================================
   11. RELATED FRAMEWORKS & ARCHITECTURAL FOUNDATIONS
   ============================================================ */

const architecturalFoundations = [
  {
    icon: Brain,
    color: "#A855F7",
    title: "AISA Framework",
    desc: "Strategic AI engagement methodology guiding system architecture and deployment.",
    to: "/frameworks",
  },
  {
    icon: Layers,
    color: "#60A5FA",
    title: "Four Workflow Layers",
    desc: "Ingestion → Processing → Orchestration → Output. Structured for scale and control.",
    to: "/frameworks",
  },
  {
    icon: Shield,
    color: "#10B981",
    title: "Governance-First Architecture",
    desc: "Compliance, auditability and responsible AI embedded from inception.",
    to: "/frameworks",
  },
  {
    icon: Cpu,
    color: "#C4B5FD",
    title: "Enterprise AI Systems Design",
    desc: "Scalable architecture patterns for production-grade AI deployment.",
    to: "/frameworks",
  },
];

function RelatedFrameworks() {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-white">
          11. Related Frameworks & Architectural Foundations
        </h2>
        <p className="mt-0.5 text-[12px]" style={{ color: "#6B7280" }}>
          Intellectual property and architectural principles underpinning this system
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {architecturalFoundations.map((f) => {
          const Icon = f.icon;
          return (
            <Link
              key={f.title}
              to={f.to}
              className="group flex flex-col rounded-2xl p-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: "rgba(7,11,28,0.8)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl"
                style={{
                  background: `${f.color}15`,
                  border: `1px solid ${f.color}28`,
                }}
              >
                <Icon className="h-4 w-4" style={{ color: f.color }} />
              </div>
              <div className="text-[12px] font-bold leading-snug text-white transition-colors group-hover:text-purple-300">
                {f.title}
              </div>
              <p className="mt-1.5 text-[10.5px] leading-snug" style={{ color: "#6B7280" }}>
                {f.desc}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

/* ============================================================
   12. CTA
   ============================================================ */

function CtaSection() {
  return (
    <section className="mt-8">
      <div
        className="overflow-hidden rounded-2xl p-8 lg:p-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(20,18,48,0.8) 60%, rgba(8,10,28,0.9) 100%)",
          border: "1px solid rgba(139,92,246,0.16)",
        }}
      >
        <div className="max-w-[560px]">
          <p className="mb-2 text-[9.5px] font-bold uppercase tracking-[0.2em]" style={{ color: "#A855F7" }}>
            12. Next Step
          </p>
          <h2 className="text-[22px] font-bold leading-tight text-white lg:text-[26px]">
            Let's Build Enterprise AI Systems That Deliver Real Outcomes
          </h2>
          <p className="mt-2.5 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            From architecture to deployment, I design and deliver AI systems that automate
            complex workflows, improve decision quality and create measurable business value.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                boxShadow: "0 0 16px rgba(139,92,246,0.3)",
              }}
            >
              Book Discovery Call <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/frameworks"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Explore Frameworks <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
