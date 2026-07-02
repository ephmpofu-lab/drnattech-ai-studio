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
  Eye,
  X,
  ZoomIn,
  Cpu,
  Clock,
  AlertTriangle,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

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
          "Insurance Claims Intelligence Platform | AI Fraud Detection, EU AI Act High-Risk AI | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise multi-agent AI system for insurance claims automation — fraud detection, claims triage, AI decision support and EU AI Act-compliant audit trail. 70% reduction in processing time, 35% improvement in fraud detection speed, 100% audit coverage. Built by Dr. Ephraim Mpofu, KI-Architekt Vienna.",
      },
      {
        property: "og:title",
        content:
          "Insurance Claims Intelligence Platform | AI Fraud Detection & EU AI Act | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Multi-agent insurance AI system: fraud detection, claims triage automation, EU AI Act-compliant audit trail. 70% faster processing, 35% fraud detection improvement. By Dr. Ephraim Mpofu, KI-Architekt Vienna.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
      {
        property: "og:image",
        content:
          "https://drnattech.com/images/WF_Insurance_MAIN_Insurance_Claims_Orchestrator.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Insurance Claims AI | Fraud Detection, EU AI Act Compliance | Dr. Ephraim Mpofu",
      },
      {
        name: "twitter:description",
        content:
          "Multi-agent insurance claims AI: fraud detection, triage automation, EU AI Act-compliant audit trail. 70% faster, 100% traceable.",
      },
      {
        name: "keywords",
        content:
          "insurance claims AI, fraud detection AI, claims automation, EU AI Act high-risk AI, insurance AI system, claims triage automation, AI fraud scoring, insurance workflow automation, KI Versicherung, EU KI-Verordnung Versicherung, multi-agent insurance AI",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
      },
    ],
  }),
  component: InsuranceClaimsPage,
});

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function InsuranceStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id":
          "https://drnattech.com/portfolio/insurance-claims-intelligence-platform#webpage",
        url: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
        name: "Insurance Claims Intelligence Platform — AI Fraud Detection & EU AI Act",
        description:
          "Enterprise multi-agent AI system for insurance claims automation — fraud detection, claims triage, AI decision support and EU AI Act-compliant audit trail.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://drnattech.com" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://drnattech.com/portfolio" },
            { "@type": "ListItem", position: 3, name: "Insurance Claims Intelligence Platform", item: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform" },
          ],
        },
        author: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: "Insurance Claims Intelligence Platform",
        description:
          "A production enterprise multi-agent AI system that automates the entire insurance claims lifecycle — from evidence ingestion and fraud detection to AI decision support, report generation and EU AI Act-compliant audit trail. Achieves 70% reduction in claims processing time, 35% improvement in fraud detection speed and 100% audit trail coverage.",
        applicationCategory: "BusinessApplication",
        url: "https://drnattech.com/portfolio/insurance-claims-intelligence-platform",
        author: { "@id": "https://drnattech.com/#person" },
        featureList: [
          "Multi-agent AI orchestration",
          "Fraud detection and fraud scoring",
          "Claims triage automation",
          "Computer vision for evidence analysis",
          "Document intelligence for unstructured data",
          "EU AI Act-compliant audit trail",
          "Human-in-the-loop governance",
          "Automated PDF report generation",
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
  MAIN: "/images/WF_Insurance_MAIN_Insurance_Claims_Orchestrator.webp",
  UPLOAD: "/images/WF_Insurance_Upload_Binary_Files.webp",
  VALIDATION: "/images/WF_Insurance_Error_Validation_Missing_Fields.webp",
  IMAGE_SAFETY: "/images/WF_Insurance_Image_Safety_Gateway.webp",
  IMAGE_INTEL: "/images/WF_Insurance_Image_Intelligence.webp",
  DOC_INTEL: "/images/WF_Insurance_Document_Intelligence.webp",
  DECISION: "/images/WF_Insurance_Decision_and_Report_Creator.webp",
  NOTIFY: "/images/WF_Insurance_Notify%20me.webp",
};

/* ============================================================
   DATA
   ============================================================ */

const painPoints = [
  {
    icon: Clock,
    color: "#F59E0B",
    title: "Slow Claims Processing",
    desc: "Manual review averages 3–5 days per claim with inconsistent outcomes and high operational cost.",
  },
  {
    icon: AlertTriangle,
    color: "#EF4444",
    title: "High Fraud Exposure",
    desc: "Limited detection capabilities allow fraudulent payouts to pass through, increasing financial risk.",
  },
  {
    icon: Scale,
    color: "#34506E",
    title: "EU AI Act Compliance Pressure",
    desc: "High-risk AI classification demands full audit trails, oversight and documentation by August 2026.",
  },
];

const archStages = [
  { icon: FileText, color: "#34506E", title: "Claim Intake", desc: "Webhook, file upload, registration" },
  { icon: Shield, color: "#F59E0B", title: "Validation", desc: "Field checks, schema, error routing" },
  { icon: Eye, color: "#60A5FA", title: "Evidence AI", desc: "Vision, image safety, document parsing" },
  { icon: Brain, color: "#22D3EE", title: "Decision AI", desc: "Fraud scoring, risk assessment" },
  { icon: Cpu, color: "#818CF8", title: "Report", desc: "PDF builder, structured output" },
  { icon: Bell, color: "#10B981", title: "Notify", desc: "Email, lifecycle events, audit log" },
];

const subWorkflows = [
  { id: "WF_01", title: "Upload Binary Files", color: "#60A5FA", src: IMG.UPLOAD },
  { id: "WF_02", title: "Validation & Governance", color: "#F59E0B", src: IMG.VALIDATION },
  { id: "WF_03", title: "Image Safety Gateway", color: "#EC4899", src: IMG.IMAGE_SAFETY },
  { id: "WF_04", title: "Image Intelligence", color: "#22D3EE", src: IMG.IMAGE_INTEL },
  { id: "WF_05", title: "Document Intelligence", color: "#818CF8", src: IMG.DOC_INTEL },
  { id: "WF_06", title: "Decision & Report", color: "#34506E", src: IMG.DECISION },
  { id: "WF_07", title: "Notification Layer", color: "#10B981", src: IMG.NOTIFY },
];

/* ============================================================
   PAGE
   ============================================================ */

export function InsuranceClaimsPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="light-page relative min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <InsuranceStructuredData />
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
        <div className="mb-4 flex items-center gap-2 text-[12px]" style={{ color: "#8A8D93" }}>
          <Link to="/portfolio" className="transition-colors hover:text-[#34506E]">Portfolio</Link>
          <span>/</span>
          <span style={{ color: "#5A5D63" }}>Case Study</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }}
          >
            Multi-Agent AI
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.28)", color: "#DC2626" }}
          >
            EU AI Act · High-Risk
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)", color: "#059669" }}
          >
            Insurance AI
          </span>
        </div>

        <h1 className="text-[34px] font-medium leading-[1.08] tracking-tight sm:text-[42px] lg:text-[48px]" style={{ color: "#1F2125" }}>
          Insurance Claims<br />
          <span style={{ color: "#34506E" }}>
            Intelligence Platform
          </span>
        </h1>

        <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed" style={{ color: "#5A5D63" }}>
          End-to-end multi-agent AI platform that ingests claims, analyses evidence, scores
          fraud, generates AI-powered decisions and delivers fully governed, auditable
          outcomes — architected for EU AI Act high-risk compliance from day one.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            Discuss a Similar Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-[13px] font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Link>
        </div>
      </div>

      {/* Impact metrics card */}
      <div className="rounded-2xl p-5" style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}>
        {[
          { value: "−70%", label: "Processing Time", color: "#34506E" },
          { value: "+35%", label: "Fraud Detection Speed", color: "#059669" },
          { value: "100%", label: "Audit Trail Coverage", color: "#2563EB" },
        ].map((m, i) => (
          <div
            key={m.label}
            className={i > 0 ? "mt-4 pt-4" : ""}
            style={i > 0 ? { borderTop: "1px solid #E3E1DA" } : {}}
          >
            <div className="text-[30px] font-bold leading-none" style={{ color: m.color }}>{m.value}</div>
            <div className="mt-1 text-[11px]" style={{ color: "#5A5D63" }}>{m.label}</div>
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
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
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
                  <div className="text-[12.5px] font-bold" style={{ color: "#1F2125" }}>{p.title}</div>
                  <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#5A5D63" }}>{p.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT: architecture pipeline */}
      <div>
        <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
          The Solution Architecture
        </div>
        <div className="rounded-2xl p-4" style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}>
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
                      <div className="text-[10.5px] font-bold leading-snug" style={{ color: "#1F2125" }}>{stage.title}</div>
                      <div className="mt-1 text-[9px] leading-snug" style={{ color: "#8A8D93" }}>{stage.desc}</div>
                    </div>
                    {i < archStages.length - 1 && (
                      <div className="flex items-center px-1">
                        <div className="text-[12px]" style={{ color: "#D7D4CC" }}>→</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Data layer */}
          <div className="mt-3 overflow-hidden rounded-xl" style={{ background: "#EDEBE3", border: "1px solid #D7D4CC" }}>
            <div
              className="px-4 py-1 text-center text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ background: "rgba(16,185,129,0.06)", borderBottom: "1px solid rgba(16,185,129,0.12)", color: "#059669" }}
            >
              DATA LAYER — SUPABASE
            </div>
            <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2.5">
              {["Claims DB", "Evidence Store", "Decisions DB", "Reports DB", "Audit Log"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Database className="h-3 w-3" style={{ color: "#059669" }} />
                  <span className="text-[10px] font-medium" style={{ color: "#1F2125" }}>{item}</span>
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
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
        Workflow Implementation (n8n)
      </div>

      {/* Main orchestrator image */}
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
        onClick={() => onOpen(IMG.MAIN)}
      >
        <div className="relative">
          <img
            src={IMG.MAIN}
            alt="Main Claims Orchestrator workflow"
            loading="lazy"
            className="w-full object-cover"
            style={{ maxHeight: "220px", objectPosition: "50% 60%" }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{ background: "rgba(0,0,0,0.4)" }}
          >
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-[12px] font-semibold text-white"
              style={{ background: "rgba(52,80,110,0.85)", backdropFilter: "blur(8px)" }}
            >
              <ZoomIn className="h-3.5 w-3.5" /> View Full Orchestrator
            </div>
          </div>
          <div
            className="absolute left-3 top-3 rounded px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
            style={{ background: "rgba(52,80,110,0.9)", color: "#fff" }}
          >
            Main Orchestrator
          </div>
        </div>
      </div>

      {/* Sub-workflow thumbnails */}
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
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
                style={{ objectPosition: "50% 60%" }}
              />
              <div
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "rgba(0,0,0,0.5)" }}
              >
                <ZoomIn className="h-3.5 w-3.5 text-white" />
              </div>
            </div>
            <div className="px-1.5 py-1.5" style={{ background: "#F2F0EA" }}>
              <div className="text-[8.5px] font-bold" style={{ color: wf.color }}>{wf.id}</div>
              <div className="mt-0.5 text-[8.5px] font-medium leading-tight" style={{ color: "#1F2125" }}>{wf.title}</div>
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
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
        Business Outcomes
      </div>
      <div className="rounded-2xl p-5" style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}>

        {/* Before / After */}
        <div
          className="mb-5 flex flex-wrap items-center gap-3 rounded-xl p-3.5"
          style={{ background: "#EDEBE3", border: "1px solid #D7D4CC" }}
        >
          <div className="flex-1 text-center">
            <div className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#EF4444" }}>Before</div>
            <div className="mt-1 text-[13px] font-semibold" style={{ color: "#1F2125" }}>3–5 days per claim</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#8A8D93" }}>Manual review · no audit trail</div>
          </div>
          <div className="text-[20px] shrink-0" style={{ color: "#34506E" }}>→</div>
          <div className="flex-1 text-center">
            <div className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#10B981" }}>After</div>
            <div className="mt-1 text-[13px] font-semibold" style={{ color: "#1F2125" }}>Minutes per claim</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#8A8D93" }}>Automated pipeline · 100% traced</div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "−70%", label: "Processing Time Reduction", color: "#34506E" },
            { value: "+35%", label: "Fraud Detection Speed", color: "#10B981" },
            { value: "100%", label: "Audit Trail Coverage", color: "#2563EB" },
            { value: "Zero", label: "Untraced Decisions", color: "#F59E0B" },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-4 text-center"
              style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
            >
              <div
                className="text-[26px] font-bold leading-none"
                style={{ color: m.color }}
              >
                {m.value}
              </div>
              <div className="mt-2 text-[10.5px] leading-snug" style={{ color: "#5A5D63" }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. GOVERNANCE STRIP
   ============================================================ */

function GovernanceStrip() {
  return (
    <section className="mt-5">
      <div
        className="rounded-xl px-5 py-3.5"
        style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.18)" }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex shrink-0 items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#EF4444" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "#EF4444" }}>
              EU AI Act · High-Risk AI System
            </span>
          </div>
          <div className="hidden h-3.5 w-px lg:block" style={{ background: "rgba(239,68,68,0.3)" }} />
          {["Full Audit Trail", "Human-in-the-Loop Oversight", "Risk Management Framework", "Transparency Documentation", "August 2026 Compliance Ready"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full shrink-0" style={{ background: "#EF4444" }} />
              <span className="text-[11px] font-medium" style={{ color: "#5A5D63" }}>{item}</span>
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
      >
        <div>
          <h2 className="text-[20px] font-medium leading-tight lg:text-[24px]" style={{ color: "#1F2125" }}>
            Ready to build a similar AI system for your enterprise?
          </h2>
          <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
            Multi-agent architecture, EU AI Act compliance and full audit trail — designed and
            delivered from Vienna, Austria for DACH and EU enterprises.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            Discuss a Similar Project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:bg-black/5 whitespace-nowrap"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
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
