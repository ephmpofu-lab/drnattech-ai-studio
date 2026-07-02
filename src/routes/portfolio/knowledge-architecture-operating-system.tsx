import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  Database,
  Brain,
  Search,
  ShieldCheck,
  FileText,
  Layers,
  X,
  ZoomIn,
  AlertTriangle,
  GitMerge,
  Cpu,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

/* ============================================================
   ROUTE
   ============================================================ */

export const Route = createFileRoute(
  "/portfolio/knowledge-architecture-operating-system"
)({
  head: () => ({
    meta: [
      {
        title:
          "Knowledge Architecture Operating System | Enterprise RAG, Vector Indexing, Hallucination Prevention | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise RAG (Retrieval-Augmented Generation) system for knowledge acquisition, semantic vector indexing with Pinecone and Supabase, and AI governance — designed to prevent hallucination through structured retrieval architecture. Built by Dr. Ephraim Mpofu, KI-Architekt Vienna.",
      },
      {
        property: "og:title",
        content:
          "Knowledge Architecture Operating System | Enterprise RAG & Vector Indexing | Dr. Ephraim Mpofu",
      },
      {
        property: "og:description",
        content:
          "Enterprise RAG system: knowledge acquisition, semantic vector indexing, hallucination prevention by design. GDPR-aligned, governed access. By Dr. Ephraim Mpofu, KI-Architekt Vienna.",
      },
      { property: "og:type", content: "article" },
      {
        property: "og:url",
        content:
          "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
      },
      {
        property: "og:image",
        content:
          "https://drnattech.com/images/WF01_RAG_Knowledge_Acquisition.webp",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Knowledge Architecture OS | Enterprise RAG | Dr. Ephraim Mpofu",
      },
      {
        name: "twitter:description",
        content:
          "Enterprise RAG knowledge system: semantic vector indexing, hallucination prevention, GDPR-aligned governed access.",
      },
      {
        name: "keywords",
        content:
          "enterprise RAG system, knowledge architecture, vector indexing, Pinecone Supabase RAG, AI hallucination prevention, semantic retrieval, knowledge management AI, RAG governance, KI Wissenssystem, enterprise knowledge platform, Dr Ephraim Mpofu RAG",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
      },
    ],
  }),
  component: KnowledgeArchPage,
});

/* ============================================================
   STRUCTURED DATA
   ============================================================ */

function KnowledgeStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id":
          "https://drnattech.com/portfolio/knowledge-architecture-operating-system#webpage",
        url: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
        name: "Knowledge Architecture Operating System — Enterprise RAG & Vector Indexing",
        description:
          "Enterprise RAG system for knowledge acquisition, semantic vector indexing with Pinecone and Supabase, and AI governance — hallucination prevention by design.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://drnattech.com" },
            { "@type": "ListItem", position: 2, name: "Portfolio", item: "https://drnattech.com/portfolio" },
            {
              "@type": "ListItem",
              position: 3,
              name: "Knowledge Architecture Operating System",
              item: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
            },
          ],
        },
        author: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: "Knowledge Architecture Operating System",
        description:
          "A production enterprise RAG (Retrieval-Augmented Generation) system that acquires, processes, indexes and retrieves organisational knowledge — delivering accurate, source-cited AI responses with zero hallucination by design. Semantic vector indexing via Pinecone, persistent storage via Supabase, GDPR-aligned governed access.",
        applicationCategory: "BusinessApplication",
        url: "https://drnattech.com/portfolio/knowledge-architecture-operating-system",
        author: { "@id": "https://drnattech.com/#person" },
        featureList: [
          "Knowledge acquisition from multiple enterprise sources",
          "Semantic vector indexing with Pinecone",
          "Retrieval-Augmented Generation (RAG)",
          "Hallucination prevention by design",
          "GDPR-aligned governed knowledge access",
          "Source-cited AI responses with full traceability",
          "Multi-source knowledge integration",
          "Persistent knowledge store in Supabase",
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
  ACQUISITION: "/images/WF01_RAG_Knowledge_Acquisition.webp",
  INTELLIGENCE: "/images/WF02_RAG_Knowledge_Intelligence.webp",
  INDEXING: "/images/WF03_RAG_Vector_Indexing.webp",
  RETRIEVAL: "/images/WF04_RAG_Retrival.webp",
};

/* ============================================================
   DATA
   ============================================================ */

const painPoints = [
  {
    icon: GitMerge,
    color: "#F59E0B",
    title: "Scattered Knowledge Silos",
    desc: "Enterprise knowledge lives across Confluence, SharePoint, Notion and email — impossible to query coherently.",
  },
  {
    icon: AlertTriangle,
    color: "#EF4444",
    title: "AI Hallucination Risk",
    desc: "Generic LLMs produce confident but incorrect answers without grounding in your actual organisational knowledge.",
  },
  {
    icon: ShieldCheck,
    color: "#818CF8",
    title: "No Governed Access",
    desc: "No audit trail, no access controls, no traceability — AI answers with no record of what was retrieved or why.",
  },
];

const archStages = [
  { icon: Database, color: "#34506E", title: "Acquisition", desc: "Ingest from Confluence, SharePoint, docs, URLs" },
  { icon: FileText, color: "#60A5FA", title: "Processing", desc: "Clean, chunk, extract metadata and structure" },
  { icon: Layers, color: "#F59E0B", title: "Indexing", desc: "Embed + store vectors in Pinecone" },
  { icon: Search, color: "#22D3EE", title: "Retrieval", desc: "Semantic similarity search, context assembly" },
  { icon: Brain, color: "#10B981", title: "Generation", desc: "GPT-4o grounded response with sources" },
  { icon: Cpu, color: "#818CF8", title: "Governance", desc: "Source citation, audit log, access control" },
];

const subWorkflows = [
  { id: "WF-01", title: "Knowledge Acquisition", color: "#34506E", src: IMG.ACQUISITION },
  { id: "WF-02", title: "Knowledge Intelligence", color: "#10B981", src: IMG.INTELLIGENCE },
  { id: "WF-03", title: "Vector Indexing", color: "#F59E0B", src: IMG.INDEXING },
  { id: "WF-04", title: "RAG Retrieval", color: "#22D3EE", src: IMG.RETRIEVAL },
];

/* ============================================================
   PAGE
   ============================================================ */

export function KnowledgeArchPage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <div className="light-page relative min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <KnowledgeStructuredData />
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
            RAG System
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(96,165,250,0.10)", border: "1px solid rgba(96,165,250,0.28)", color: "#2563EB" }}
          >
            Knowledge Management
          </span>
          <span
            className="inline-flex items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{ background: "rgba(16,185,129,0.10)", border: "1px solid rgba(16,185,129,0.25)", color: "#059669" }}
          >
            GDPR-Aligned
          </span>
        </div>

        <h1 className="text-[34px] font-medium leading-[1.08] tracking-tight sm:text-[42px] lg:text-[48px]" style={{ color: "#1F2125" }}>
          Knowledge Architecture<br />
          <span style={{ color: "#34506E" }}>
            Operating System
          </span>
        </h1>

        <p className="mt-4 max-w-[560px] text-[14px] leading-relaxed" style={{ color: "#5A5D63" }}>
          Enterprise RAG system that acquires knowledge from disparate organisational sources,
          indexes it semantically via Pinecone and Supabase, and delivers accurate,
          source-cited AI responses — with hallucination prevention and governed access
          built into the architecture.
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
          { value: "94%", label: "Query Success Rate", color: "#34506E" },
          { value: "6.3×", label: "Avg. Sources Retrieved", color: "#059669" },
          { value: "Zero", label: "Hallucinations by Design", color: "#2563EB" },
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
              style={{ background: "rgba(52,80,110,0.06)", borderBottom: "1px solid rgba(52,80,110,0.14)", color: "#34506E" }}
            >
              VECTOR STORE — PINECONE + SUPABASE
            </div>
            <div className="flex flex-wrap items-center justify-around gap-2 px-4 py-2.5">
              {["Embeddings Store", "Document Chunks", "Metadata Index", "Access Log", "Source Registry"].map((item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <Database className="h-3 w-3" style={{ color: "#34506E" }} />
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
        Workflow Implementation (n8n) · 4 Workflows
      </div>

      {/* Main image — Knowledge Acquisition */}
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
        onClick={() => onOpen(IMG.ACQUISITION)}
      >
        <div className="relative">
          <img
            src={IMG.ACQUISITION}
            alt="Knowledge Acquisition workflow"
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
              style={{ background: "rgba(52,80,110,0.85)", backdropFilter: "blur(8px)" }}
            >
              <ZoomIn className="h-3.5 w-3.5" /> View Full Workflow
            </div>
          </div>
          <div
            className="absolute left-3 top-3 rounded px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
            style={{ background: "rgba(52,80,110,0.9)", color: "#fff" }}
          >
            WF-01 · Knowledge Acquisition
          </div>
        </div>
      </div>

      {/* Sub-workflow thumbnails */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
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
            <div className="mt-1 text-[13px] font-semibold" style={{ color: "#1F2125" }}>Manual search across 5+ tools</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#8A8D93" }}>Scattered silos · hallucinating AI · no audit</div>
          </div>
          <div className="text-[20px] shrink-0" style={{ color: "#34506E" }}>→</div>
          <div className="flex-1 text-center">
            <div className="text-[9.5px] font-bold uppercase tracking-[0.18em]" style={{ color: "#10B981" }}>After</div>
            <div className="mt-1 text-[13px] font-semibold" style={{ color: "#1F2125" }}>Single AI knowledge interface</div>
            <div className="mt-0.5 text-[10px]" style={{ color: "#8A8D93" }}>Grounded answers · source-cited · fully traced</div>
          </div>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { value: "94%", label: "Query Success Rate", color: "#34506E" },
            { value: "6.3×", label: "Avg. Sources Retrieved", color: "#10B981" },
            { value: "Zero", label: "Hallucinations by Design", color: "#2563EB" },
            { value: "100%", label: "Answers Source-Cited", color: "#F59E0B" },
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
        style={{ background: "rgba(52,80,110,0.04)", border: "1px solid rgba(52,80,110,0.18)" }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div className="flex shrink-0 items-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#34506E" }} />
            <span className="text-[9px] font-bold uppercase tracking-[0.22em]" style={{ color: "#34506E" }}>
              Knowledge Governance by Design
            </span>
          </div>
          <div className="hidden h-3.5 w-px lg:block" style={{ background: "rgba(52,80,110,0.3)" }} />
          {["Source Citation on Every Response", "Role-Based Access Control", "Full Retrieval Audit Log", "GDPR-Aligned Data Processing", "No Hallucination Architecture"].map((item) => (
            <div key={item} className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full shrink-0" style={{ background: "#34506E" }} />
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
            Ready to centralise your enterprise knowledge with AI?
          </h2>
          <p className="mt-2 max-w-[480px] text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
            Enterprise RAG, semantic vector indexing and governed knowledge access —
            designed and delivered from Vienna, Austria for DACH and EU organisations.
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
