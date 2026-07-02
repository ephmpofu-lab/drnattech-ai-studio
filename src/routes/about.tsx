import type React from "react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Brain,
  Clock,
  Code,
  Database,
  ExternalLink,
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

/* ============================================================
   ROUTE — meta, hreflang, canonical
   ============================================================ */

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      {
        title:
          "About Dr. Ephraim Mpofu | AI Solutions Architect & KI-Architekt Vienna | EU AI Act Expert",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu (PhD, Dr.nat.techn., BOKU Vienna) — AI Solutions Architect and KI-Architekt based in Vienna, Austria. Creator of the SKAIDO, AISA and Three Structural Laws frameworks. Designing EU AI Act-compliant enterprise AI systems for DACH and EU organisations since January 2026.",
      },
      {
        property: "og:title",
        content:
          "About Dr. Ephraim Mpofu | AI Solutions Architect & KI-Architekt Vienna | EU AI Act",
      },
      {
        property: "og:description",
        content:
          "PhD (Dr.nat.techn.), BOKU Vienna. Creator of SKAIDO, AISA and Three Structural Laws. Building EU AI Act-compliant enterprise AI systems and RAG knowledge platforms from Vienna, Austria.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://drnattech.com/about" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr_Mpofu_purple-removebg-preview.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Dr. Ephraim Mpofu | AI Solutions Architect & KI-Architekt Vienna",
      },
      {
        name: "twitter:description",
        content:
          "PhD-credentialed AI Solutions Architect in Vienna — SKAIDO Framework creator, EU AI Act compliance architect, enterprise RAG and multi-agent systems.",
      },
      {
        name: "keywords",
        content:
          "Dr Ephraim Mpofu, AI Solutions Architect Vienna, KI-Architekt Wien, SKAIDO Framework, AISA Framework, EU AI Act compliance, KI-Verordnung Berater, enterprise AI systems, RAG knowledge platform, BOKU Vienna PhD, KI Lösungen Österreich, DACH AI consultant, multi-agent AI architect",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/about" },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/about",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://drnattech.com/de/about",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/about",
      },
    ],
  }),
  component: AboutPage,
});

/* ============================================================
   FAQ DATA — about-specific, used in schema + visible section
   ============================================================ */

const aboutFaq = [
  {
    q: "When did Dr. Ephraim Mpofu start building AI systems?",
    a: "Dr. Mpofu transitioned into enterprise AI systems architecture in January 2026, building on four years of doctoral research at BOKU University Vienna, prior data analysis and research roles from 2016 onwards (University of Johannesburg, World Bank IBRD), and a sustained practice of systems thinking across environmental governance and sustainability. Since January 2026, he has designed and delivered production AI systems across insurance, HR technology, knowledge management and enterprise automation — serving clients in the DACH region and EU.",
  },
  {
    q: "How does a scientific PhD background improve enterprise AI system design?",
    a: "Scientific training provides the exact disciplines enterprise AI demands: hypothesis-driven problem framing, rigorous system design, reproducible validation methods and systematic documentation. Dr. Mpofu applies the same methodology that drives peer-reviewed research to every AI architecture — resulting in AI systems that are reliable, auditable and production-ready rather than experimental. His PhD (Dr.nat.techn.) from BOKU University Vienna is the foundation of his engineering rigour.",
  },
  {
    q: "What is the SKAIDO Framework?",
    a: "The SKAIDO Framework is Dr. Ephraim Mpofu's proprietary six-phase AI implementation methodology: Scope, Knowledge, Architecture, Implementation, Deployment and Optimisation. It provides a structured, repeatable approach for taking enterprises from business problem definition to deployed, production-ready AI solution — with EU AI Act compliance, auditability and governance embedded at every phase. It is one of five proprietary frameworks Dr. Mpofu has developed for enterprise AI.",
  },
  {
    q: "What does EU AI Act compliance mean in practice for AI architecture?",
    a: "EU AI Act compliance means designing AI systems that classify their own risk level, generate comprehensive audit trails, implement human-in-the-loop oversight mechanisms, document transparency measures and support ongoing monitoring. High-risk AI systems — such as those used in insurance claims processing, HR screening and financial decisions — must comply by August 2026. Dr. Mpofu embeds all required architectural measures from day one rather than retrofitting compliance after deployment.",
  },
  {
    q: "Does Dr. Mpofu work with German-speaking clients (auf Deutsch) in the DACH region?",
    a: "Yes. Dr. Mpofu works with enterprises across Austria (Österreich), Germany (Deutschland) and Switzerland — the DACH region — as well as broader EU markets. He designs KI-Systeme (AI systems in German: Künstliche Intelligenz Systeme) that meet EU regulatory requirements including the EU AI Act (EU KI-Verordnung) and GDPR. German-language consultation and documentation are available.",
  },
];

/* ============================================================
   STRUCTURED DATA — Person, Service, ProfilePage, FAQ, CreativeWork
   ============================================================ */

function AboutStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": "https://drnattech.com/about#webpage",
        url: "https://drnattech.com/about",
        name: "About Dr. Ephraim Mpofu — AI Solutions Architect & KI-Architekt Vienna",
        description:
          "PhD (Dr.nat.techn.), BOKU Vienna. Creator of SKAIDO, AISA and Three Structural Laws frameworks. Building EU AI Act-compliant enterprise AI systems for the DACH region and EU since January 2026.",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
        isPartOf: { "@id": "https://drnattech.com/#website" },
      },
      {
        "@type": "Person",
        "@id": "https://drnattech.com/#person",
        name: "Dr. Ephraim Mpofu",
        honorificPrefix: "Dr.",
        alternateName: ["Ephraim Mpofu", "Dr. E. Mpofu"],
        jobTitle: [
          "AI Solutions Architect",
          "KI-Architekt",
          "Enterprise AI Consultant",
          "Framework Creator",
        ],
        description:
          "PhD-credentialed AI Solutions Architect and KI-Architekt based in Vienna, Austria. Creator of the SKAIDO, AISA and Three Structural Laws frameworks. Specialises in enterprise AI systems, RAG knowledge platforms, multi-agent architectures and EU AI Act compliance. Has been designing and delivering production AI systems since January 2026. Serves the DACH region and EU.",
        url: "https://drnattech.com",
        image: "https://drnattech.com/images/Dr_Mpofu_purple-removebg-preview.png",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "BOKU University Vienna",
          url: "https://www.boku.ac.at",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Vienna",
            addressCountry: "AT",
          },
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            name: "PhD in Natural Technology (Dr.nat.techn.)",
            educationalLevel: "Doctoral Degree",
            recognizedBy: {
              "@type": "CollegeOrUniversity",
              name: "BOKU University Vienna",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "MSc Sustainable Urban Planning & Development",
            educationalLevel: "Master's Degree",
            recognizedBy: {
              "@type": "CollegeOrUniversity",
              name: "University of Johannesburg",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Google Data Analytics Professional Certificate",
            recognizedBy: {
              "@type": "Organization",
              name: "Google",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "Azure AI Certified",
            recognizedBy: {
              "@type": "Organization",
              name: "Microsoft",
            },
          },
          {
            "@type": "EducationalOccupationalCredential",
            name: "NEBOSH Environmental Health and Safety Certificate",
            recognizedBy: {
              "@type": "Organization",
              name: "NEBOSH",
            },
          },
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Vienna",
          addressCountry: "AT",
          addressRegion: "Vienna",
        },
        areaServed: [
          { "@type": "Country", name: "Austria" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "AdministrativeArea", name: "European Union" },
        ],
        knowsLanguage: ["en", "de"],
        knowsAbout: [
          "Enterprise AI Systems Architecture",
          "Retrieval-Augmented Generation (RAG)",
          "Multi-Agent AI Systems",
          "EU AI Act Compliance",
          "KI-Verordnung",
          "AI Governance",
          "Knowledge Architecture",
          "Workflow Automation",
          "SKAIDO Framework",
          "AISA Framework",
          "Three Structural Laws",
          "GDPR-Aligned AI",
          "High-Risk AI System Classification",
          "Natural Technology",
          "Environmental Systems",
        ],
        sameAs: [
          "https://www.linkedin.com/in/ephraim-mpofu-a340608b/",
          "https://www.researchgate.net/profile/Ephraim-Mpofu",
          "https://www.youtube.com/@ephraimmpofu_",
          "https://www.cost.eu/actions/CA23118/#tabs+Name:Working%20Groups%20and%20Membership",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://drnattech.com/about#faq",
        mainEntity: aboutFaq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "CreativeWork",
        name: "SKAIDO Framework",
        alternateName: "SKAIDO AI Implementation Methodology",
        description:
          "The SKAIDO Framework is Dr. Ephraim Mpofu's proprietary six-phase AI implementation methodology — Scope, Knowledge, Architecture, Implementation, Deployment, Optimisation — for taking enterprises from business problem to deployed, EU AI Act-compliant AI solution.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/frameworks",
      },
      {
        "@type": "CreativeWork",
        name: "AISA Framework",
        alternateName: "AI Systems Architecture Strategic Engagement Framework",
        description:
          "The AISA Framework is Dr. Ephraim Mpofu's strategic enterprise AI engagement model — structuring how organisations move from AI ambiguity to deployed, governed AI systems with measurable business outcomes.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/frameworks",
      },
      {
        "@type": "CreativeWork",
        name: "Three Structural Laws",
        description:
          "The Three Structural Laws are Dr. Ephraim Mpofu's foundational architectural principles preventing fraud, unmaintainable systems and silent failure in enterprise AI — covering No-Fraud Architecture, Structural Integrity and Continuous Observability.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/frameworks",
      },
      {
        "@type": "CreativeWork",
        name: "Knowledge Architecture Framework",
        description:
          "Dr. Ephraim Mpofu's proprietary approach to enterprise knowledge design, semantic retrieval governance and RAG system architecture — enabling accurate, hallucination-free AI knowledge platforms at enterprise scale.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/frameworks",
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
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <AboutStructuredData />
      <SiteNav active="About" />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <Hero />
        <AuthorityMetrics />
        <BackgroundSection />
        <MyJourney />
        <MyMethodology />
        <TechnologiesSection />
        <PrinciplesAndExpertise />
        <AboutFaqSection />
        <CTA />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

const CREDENTIAL_GLYPHS = ["boku", "ai", "google"];

function CredentialGlyph({ g }: { g: string }) {
  const box = "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg";
  if (g === "boku") {
    return (
      <div
        className={box}
        style={{ background: "rgba(42,173,78,0.12)", border: "1px solid rgba(42,173,78,0.28)" }}
      >
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
      <div
        className={box}
        style={{ background: "#FFFFFF", border: "1px solid #E3E1DA" }}
      >
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
    <div
      className={box}
      style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
    >
      <Boxes className="h-4 w-4" style={{ color: "#34506E" }} />
    </div>
  );
}

function Hero() {
  const { t, i18n } = useTranslation("common");
  const agentHref = i18n.language === "de" ? "/de/ai-agent" : "/ai-agent";
  const credentialText = t("about.credentials", { returnObjects: true }) as Array<{ title: string; sub: string }>;
  const credentials = CREDENTIAL_GLYPHS.map((glyph, i) => ({ glyph, ...credentialText[i] }));
  return (
    <section
      className="grid grid-cols-1 gap-6 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:pt-12"
      aria-label="About Dr. Ephraim Mpofu — AI Solutions Architect Vienna"
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            {t("about.heroBadge")}
          </span>
          <span
            className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            {t("about.heroBadge2")}
          </span>
        </div>

        <h1 className="mt-5 text-[38px] font-medium leading-[1.06] tracking-tight lg:text-[48px]" style={{ color: "#1F2125" }}>
          {t("about.heroTitle1")}{" "}
          <span className="text-gradient-brand">{t("about.heroTitle2")}</span>
        </h1>

        <p className="mt-5 text-[15px] leading-relaxed" style={{ color: "#5A5D63" }}>
          {t("about.heroDesc1")}
        </p>
        <p className="mt-4 text-[14.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          {t("about.heroDesc2")} <strong style={{ color: "#1F2125" }}>{t("about.heroLangEn")}</strong> and <strong style={{ color: "#1F2125" }}>{t("about.heroLangDe")}</strong>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to={agentHref}
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            <Bot className="h-4 w-4" /> {t("about.askAgent")}
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            {t("about.viewPortfolio")}
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
          {credentials.map((c) => (
            <div key={c.title} className="flex items-center gap-3">
              <CredentialGlyph g={c.glyph} />
              <div className="leading-tight">
                <div className="text-[12px] font-bold" style={{ color: "#1F2125" }}>{c.title}</div>
                <div className="text-[11px]" style={{ color: "#5A5D63" }}>{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — portrait */}
      <div
        className="relative hidden min-h-[540px] overflow-hidden rounded-[18px] lg:block"
        style={{ border: "1px solid #E3E1DA" }}
      >
        <img
          src="/images/Dr_Mpofu_purple-removebg-preview.png"
          alt="Dr. Ephraim Mpofu — AI Solutions Architect and KI-Architekt based in Vienna, Austria"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #FAFAF8)" }}
        />
      </div>
    </section>
  );
}

/* ============================================================
   2. AUTHORITY METRICS
   ============================================================ */

const METRIC_ICONS = [Puzzle, Clock, TrendingUp, ShieldCheck, Layers];

function AuthorityMetrics() {
  const { t } = useTranslation("common");
  const metricText = t("about.metrics", { returnObjects: true }) as Array<{ value: string; a: string; b: string }>;
  const metrics = METRIC_ICONS.map((icon, i) => ({ icon, ...metricText[i] }));
  const ref = useScrollReveal<HTMLElement>(0);
  return (
    <section ref={ref} className="mt-5" aria-label="Impact metrics">
      <div className="glass-card flex flex-wrap items-stretch">
        {metrics.map((m, i) => (
          <div
            key={m.value + m.a}
            className="flex min-w-[130px] flex-1 flex-col items-center justify-center px-4 py-4"
            style={i > 0 ? { borderLeft: "1px solid #E3E1DA" } : undefined}
          >
            <div
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-full"
              style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
            >
              <m.icon className="h-3.5 w-3.5" style={{ color: "#34506E" }} />
            </div>
            <div className="text-gradient-brand text-[22px] font-bold leading-none">{m.value}</div>
            <div className="mt-1 text-center text-[10.5px] font-medium leading-tight" style={{ color: "#5A5D63" }}>
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

function SkaidoVisual() {
  const nodes = [
    { l: "S", c: "#34506E" },
    { l: "K", c: "#4B7096" },
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
            <ArrowRight className="h-3 w-3 shrink-0" style={{ color: "rgba(0,0,0,0.2)" }} />
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
        style={{ background: "#E9EFF4", border: "1.5px solid #D7D4CC" }}
      >
        <Scale className="h-6 w-6" style={{ color: "#34506E" }} />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "rgba(20,184,166,0.12)", border: "1.5px solid rgba(20,184,166,0.38)" }}
      >
        <Database className="h-6 w-6" style={{ color: "#14B8A6" }} />
      </div>
      <div
        className="flex h-12 w-12 items-center justify-center rounded-full"
        style={{
          background: "rgba(34,197,94,0.10)",
          border: "1.5px solid rgba(34,197,94,0.45)",
        }}
      >
        <Eye className="h-6 w-6" style={{ color: "#22C55E" }} />
      </div>
    </div>
  );
}

function WorkflowLayersVisual() {
  return (
    <svg viewBox="0 0 160 88" className="mx-auto w-full max-w-[180px]" aria-hidden="true">
      <ellipse cx="80" cy="82" rx="60" ry="5" fill="rgba(245,158,11,0.18)" />
      <path d="M10 72 L150 72 L138 58 L22 58 Z" fill="#F59E0B" opacity="0.88" />
      <path d="M22 54 L138 54 L126 40 L34 40 Z" fill="#14B8A6" opacity="0.88" />
      <path d="M34 36 L126 36 L114 22 L46 22 Z" fill="#34506E" opacity="0.92" />
    </svg>
  );
}

function KnowledgeArchVisual() {
  return (
    <svg viewBox="0 0 160 90" className="mx-auto w-full max-w-[180px]" aria-hidden="true">
      <line x1="28" y1="22" x2="62" y2="38" stroke="rgba(52,80,110,0.5)" strokeWidth="1.2" />
      <line x1="28" y1="68" x2="62" y2="54" stroke="rgba(52,80,110,0.5)" strokeWidth="1.2" />
      <line x1="132" y1="22" x2="98" y2="38" stroke="rgba(52,80,110,0.5)" strokeWidth="1.2" />
      <line x1="132" y1="68" x2="98" y2="54" stroke="rgba(52,80,110,0.5)" strokeWidth="1.2" />
      <circle cx="28" cy="22" r="8" fill="none" stroke="rgba(52,80,110,0.65)" strokeWidth="1.5" />
      <circle cx="28" cy="68" r="8" fill="none" stroke="rgba(52,80,110,0.65)" strokeWidth="1.5" />
      <circle cx="132" cy="22" r="8" fill="none" stroke="rgba(52,80,110,0.65)" strokeWidth="1.5" />
      <circle cx="132" cy="68" r="8" fill="none" stroke="rgba(52,80,110,0.65)" strokeWidth="1.5" />
      <circle cx="28" cy="22" r="3.5" fill="#34506E" />
      <circle cx="28" cy="68" r="3.5" fill="#34506E" />
      <circle cx="132" cy="22" r="3.5" fill="#34506E" />
      <circle cx="132" cy="68" r="3.5" fill="#34506E" />
      <ellipse cx="80" cy="36" rx="24" ry="7" fill="rgba(52,80,110,0.5)" stroke="rgba(52,80,110,0.75)" strokeWidth="1" />
      <rect x="56" y="36" width="48" height="20" fill="rgba(52,80,110,0.25)" />
      <ellipse cx="80" cy="56" rx="24" ry="7" fill="rgba(52,80,110,0.45)" stroke="rgba(52,80,110,0.7)" strokeWidth="1" />
    </svg>
  );
}

const METHODOLOGY_VISUALS = [SkaidoVisual, ThreeLawsVisual, WorkflowLayersVisual, KnowledgeArchVisual];

function MethodologyCard({
  title,
  Visual,
  desc,
  hoverDetail,
  cta,
  link,
}: {
  title: string;
  Visual: () => React.ReactElement;
  desc: string;
  hoverDetail: string;
  cta: string;
  link: "/frameworks";
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex flex-col rounded-[18px] p-6"
      style={{
        background: "#F2F0EA",
        border: "1px solid #E3E1DA",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-center text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#1F2125" }}>
        {title}
      </div>
      <div className="my-6 flex flex-1 items-center justify-center">
        <Visual />
      </div>
      <p className="mb-2 text-[12.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
        {desc}
      </p>
      <p
        className="mb-3 text-[11.5px] leading-relaxed overflow-hidden"
        style={{
          color: "#34506E",
          maxHeight: hovered ? "60px" : "0",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease, max-height 0.3s ease",
        }}
      >
        {hoverDetail}
      </p>
      <Link
        to={link}
        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-[12.5px] font-semibold transition-all hover:bg-[#E9EFF4]"
        style={{ border: "1px solid #D7D4CC", color: "#34506E" }}
      >
        {cta} <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  );
}

function MyMethodology() {
  const { t } = useTranslation("common");
  const methodText = t("about.methodologyCards", { returnObjects: true }) as Array<{
    title: string; desc: string; hoverDetail: string; cta: string;
  }>;
  const methodologyCards = METHODOLOGY_VISUALS.map((Visual, i) => ({
    Visual, link: "/frameworks" as const, ...methodText[i],
  }));
  const ref = useScrollReveal<HTMLElement>(150);
  return (
    <section ref={ref} className="mt-14 lg:mt-16" aria-label="Methodology and proprietary frameworks">
      <div className="mb-8 text-center">
        <h2 className="text-[28px] font-medium lg:text-[34px]" style={{ color: "#1F2125" }}>
          {t("about.methodologyTitle")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px]" style={{ color: "#5A5D63" }}>
          {t("about.methodologyDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {methodologyCards.map((card) => (
          <MethodologyCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. TECHNOLOGIES I WORK WITH
   ============================================================ */

function PythonSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.034v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.129S18.28 0 11.914 0zm-3.21 1.81a1.044 1.044 0 1 1 0 2.088 1.044 1.044 0 0 1 0-2.088z" fill="#3776AB" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.121S24 18.211 24 12.031c0-6.18-3.403-5.959-3.403-5.959H18.563v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.131v5.4S5.72 24 12.086 24zm3.21-1.81a1.044 1.044 0 1 1 0-2.088 1.044 1.044 0 0 1 0 2.088z" fill="#FFD43B" />
    </svg>
  );
}

function OpenAiSvg() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1F2125">
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
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="#1F2125">
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

const lc = (cls: string, style?: React.CSSProperties) => ({ className: cls, style });

const techItems: Array<{ icon: React.ReactNode; label: string }> = [
  { icon: <OpenAiSvg />,    label: "OpenAI"              },
  { icon: <ClaudeSvg />,    label: "Claude"              },
  { icon: <AzureSvg />,     label: "Azure AI"            },
  { icon: <N8nSvg />,       label: "n8n"                 },
  { icon: <SupabaseSvg />,  label: "Supabase"            },
  { icon: <PostgresSvg />,  label: "PostgreSQL"          },
  { icon: <LangChainSvg />, label: "LangChain"           },
  { icon: <PineconeSvg />,  label: "Pinecone"            },
  { icon: <GitHubSvg />,    label: "GitHub"              },
  { icon: <PythonSvg />,    label: "Python"              },
  { icon: <PowerBISvg />,   label: "Power BI"            },
  { icon: <Code {...lc("h-4 w-4", { color: "#34506E" })} />,          label: "REST APIs"           },
  { icon: <Zap {...lc("h-4 w-4", { color: "#34506E" })} />,           label: "Webhooks"            },
  { icon: <Bot {...lc("h-4 w-4", { color: "#34506E" })} />,           label: "AI Agents"           },
  { icon: <GitMerge {...lc("h-4 w-4", { color: "#34506E" })} />,      label: "Workflow Automation" },
  { icon: <MessageSquare {...lc("h-4 w-4", { color: "#34506E" })} />, label: "Prompt Engineering"  },
];

function TechPill({ item }: { item: (typeof techItems)[number] }) {
  return (
    <div
      className="inline-flex items-center gap-2.5 rounded-xl px-4 py-2 text-[13px] font-medium"
      style={{ background: "#F2F0EA", border: "1px solid #E3E1DA", color: "#1F2125" }}
    >
      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
        {item.icon}
      </div>
      {item.label}
    </div>
  );
}

function TechnologiesSection() {
  const { t } = useTranslation("common");
  return (
    <section className="mt-5" aria-label="Technologies and platforms">
      <div className="glass-card px-6 py-7">
        <div className="mb-6 text-center">
          <h2 className="text-[22px] font-medium lg:text-[26px]" style={{ color: "#1F2125" }}>
            {t("about.techTitle")}
          </h2>
          <p className="mx-auto mt-1.5 max-w-xl text-[13.5px]" style={{ color: "#5A5D63" }}>
            {t("about.techDesc")}
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

const JOURNEY_ICONS = [BookOpen, Globe, Brain, Zap, Boxes];

function MyJourney() {
  const { t } = useTranslation("common");
  const journeyText = t("about.journeySteps", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const journeySteps = JOURNEY_ICONS.map((Icon, i) => ({ Icon, ...journeyText[i] }));
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="mt-14 lg:mt-16" aria-label="Professional journey">
      <div className="mb-10 text-center">
        <h2 className="text-[28px] font-medium lg:text-[34px]" style={{ color: "#1F2125" }}>{t("about.journeyTitle")}</h2>
        <p className="mx-auto mt-2 max-w-xl text-[14px]" style={{ color: "#5A5D63" }}>
          {t("about.journeyDesc")}
        </p>
      </div>

      {/* Desktop timeline */}
      <div className="relative hidden lg:block">
        <div
          className="absolute left-[10%] right-[10%] top-[36px] h-px"
          style={{
            background: "linear-gradient(90deg, transparent 0%, #34506E 6%, #34506E 94%, transparent 100%)",
          }}
        />
        <div className="grid grid-cols-5 gap-4">
          {journeySteps.map(({ Icon, title, desc }, index) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div
                className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full"
                style={{
                  background: "#FAFAF8",
                  border: "1.5px solid #D7D4CC",
                  opacity: inView ? 1 : 0,
                  transition: `opacity 0.5s ease ${index * 0.15}s`,
                }}
              >
                <Icon className="h-8 w-8" style={{ color: "#34506E" }} />
              </div>
              <div className="mt-4 text-[13.5px] font-medium" style={{ color: "#1F2125" }}>{title}</div>
              <div className="mt-2 text-[12px] leading-relaxed" style={{ color: "#5A5D63" }}>
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
          style={{ background: "linear-gradient(to bottom, #34506E, #34506E)" }}
        />
        {journeySteps.map(({ Icon, title, desc }, index) => (
          <div key={title} className="flex items-start gap-4">
            <div
              className="relative -left-[29px] flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              style={{
                background: "#FAFAF8",
                border: "1.5px solid #D7D4CC",
                opacity: inView ? 1 : 0,
                transition: `opacity 0.5s ease ${index * 0.15}s`,
              }}
            >
              <Icon className="h-5 w-5" style={{ color: "#34506E" }} />
            </div>
            <div className="-ml-4 flex-1">
              <div className="text-[13.5px] font-medium" style={{ color: "#1F2125" }}>{title}</div>
              <div className="mt-1 text-[12px] leading-relaxed" style={{ color: "#5A5D63" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   5b. PROFESSIONAL BACKGROUND & VERIFIED CREDENTIALS
   ============================================================ */

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const mapLocations = [
  {
    name: "Zimbabwe",
    coordinates: [30.0, -20.0] as [number, number],
    role: "BSc Environmental Science & Health",
    org: "NUST Zimbabwe",
    period: "2013–2017",
  },
  {
    name: "South Africa",
    coordinates: [28.0, -26.2] as [number, number],
    role: "Analyst · Researcher · Planner",
    org: "World Bank IBRD · Huawei Technologies · University of Johannesburg",
    period: "2016–2021",
  },
  {
    name: "China",
    coordinates: [116.4, 39.9] as [number, number],
    role: "Exchange Programme",
    org: "Beijing Normal University",
    period: "2019–2020",
  },
  {
    name: "Austria",
    coordinates: [16.4, 48.2] as [number, number],
    role: "Researcher & Lecturer → AI Systems Architect",
    org: "BOKU University Vienna · Dr.NatTech",
    period: "2021–present",
  },
];

function WorldMap() {
  const { t } = useTranslation("common");
  const [active, setActive] = useState<(typeof mapLocations)[number] | null>(null);

  return (
    <div className="glass-card overflow-hidden">
      <div className="px-6 pt-5 pb-2">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
          {t("about.mapTitle")}
        </div>
        <p className="mt-0.5 text-[12px]" style={{ color: "#5A5D63" }}>
          {t("about.mapSub")}
        </p>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [42, 4], scale: 190 }}
        style={{ width: "100%", height: 300 }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "rgba(52,80,110,0.07)", stroke: "rgba(52,80,110,0.2)", strokeWidth: 0.5, outline: "none" },
                  hover:   { fill: "rgba(52,80,110,0.07)", stroke: "rgba(52,80,110,0.2)", strokeWidth: 0.5, outline: "none" },
                  pressed: { fill: "rgba(52,80,110,0.07)", stroke: "rgba(52,80,110,0.2)", strokeWidth: 0.5, outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {mapLocations.map((loc) => {
          const isActive = active?.name === loc.name;
          return (
            <Marker
              key={loc.name}
              coordinates={loc.coordinates}
              onClick={() => setActive(isActive ? null : loc)}
            >
              <circle
                r={isActive ? 8 : 5}
                style={{
                  fill: isActive ? "#34506E" : "rgba(52,80,110,0.45)",
                  stroke: "#34506E",
                  strokeWidth: 1.5,
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                }}
              />
              {isActive && (
                <text
                  textAnchor="middle"
                  y={-14}
                  style={{ fontSize: 9, fontFamily: "Inter, sans-serif", fill: "#1F2125", pointerEvents: "none" }}
                >
                  {loc.name}
                </text>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      {/* Info panel — shown only when a pin is active */}
      <div
        style={{
          maxHeight: active ? 120 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          borderTop: active ? "1px solid #E3E1DA" : "none",
        }}
      >
        {active && (
          <div className="flex items-start justify-between gap-4 px-6 py-4">
            <div>
              <div className="text-[15px] font-medium" style={{ color: "#1F2125" }}>{active.name}</div>
              <div className="mt-0.5 text-[12.5px] font-semibold" style={{ color: "#34506E" }}>{active.role}</div>
              <div className="text-[12px] mt-0.5" style={{ color: "#5A5D63" }}>{active.org}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "#8A8D93" }}>{active.period}</div>
            </div>
            <button
              onClick={() => setActive(null)}
              className="shrink-0 text-[18px] leading-none"
              style={{ color: "#8A8D93" }}
              aria-label={t("about.mapClose")}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const educationTimeline = [
  { year: "2021–2025", degree: "PhD (Dr.nat.techn.)", field: "Natural Technology", inst: "BOKU University Vienna", color: "#34506E" },
  { year: "2019–2020", degree: "Exchange", field: "Resources & Environmental Management", inst: "Beijing Normal University, China", color: "#3B82F6" },
  { year: "2018–2020", degree: "MSc", field: "Sustainable Urban Planning & Development", inst: "University of Johannesburg", color: "#F59E0B" },
  { year: "2013–2017", degree: "BSc", field: "Environmental Science & Health", inst: "NUST Zimbabwe", color: "#10B981" },
];

function EducationTimeline() {
  const { t } = useTranslation("common");
  return (
    <div className="glass-card p-6 flex-1">
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "#8A8D93" }}>
        {t("about.educationTitle")}
      </div>
      <div className="relative pl-5">
        <div
          className="absolute left-[6px] top-1 bottom-1 w-px"
          style={{ background: "linear-gradient(to bottom, #34506E, #3B82F6, #F59E0B, #10B981)" }}
        />
        <div className="space-y-5">
          {educationTimeline.map((item) => (
            <div key={item.degree + item.year} className="relative pl-5">
              <div
                className="absolute left-[-4px] top-[5px] h-[10px] w-[10px] rounded-full"
                style={{ background: item.color }}
              />
              <div className="text-[10px] font-bold mb-0.5" style={{ color: item.color }}>{item.year}</div>
              <div className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{item.degree} — {item.field}</div>
              <div className="text-[11.5px] mt-0.5" style={{ color: "#5A5D63" }}>{item.inst}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MicrosoftLogo() {
  return (
    <svg viewBox="0 0 22 22" width="36" height="36">
      <rect x="0"  y="0"  width="10" height="10" fill="#F25022" />
      <rect x="12" y="0"  width="10" height="10" fill="#7FBA00" />
      <rect x="0"  y="12" width="10" height="10" fill="#00A4EF" />
      <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
    </svg>
  );
}

function GoogleGLogo() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <path fill="#4285F4" d="M23.745 12.27c0-.79-.07-1.54-.19-2.27h-11.3v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z" />
      <path fill="#34A853" d="M12.255 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.625v3.09C3.515 21.3 7.615 24 12.255 24z" />
      <path fill="#FBBC05" d="M5.525 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.625a11.86 11.86 0 000 10.76l3.9-3.09z" />
      <path fill="#EA4335" d="M12.255 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C18.205 1.19 15.495 0 12.255 0c-4.64 0-8.74 2.7-10.71 6.62l3.9 3.09c.95-2.85 3.6-4.96 6.81-4.96z" />
    </svg>
  );
}

function NeboshBadge() {
  return (
    <div
      className="flex h-9 w-9 items-center justify-center rounded-[6px] text-[11px] font-black"
      style={{ background: "#1A3260", color: "#fff", letterSpacing: "0.02em" }}
    >
      NEB
    </div>
  );
}

const certifications = [
  {
    Logo: MicrosoftLogo,
    name: "Azure AI Apps & Agents Developer Associate",
    detail: "Microsoft Certified (Beta)",
    accent: "#0078D4",
  },
  {
    Logo: GoogleGLogo,
    name: "Data Analytics Professional Certificate",
    detail: "Google / Coursera",
    accent: "#4285F4",
    link: "https://coursera.org/share/e9fa56e72678e136281c5ff51e1aba5",
  },
  {
    Logo: NeboshBadge,
    name: "Environmental Health & Safety Certificate",
    detail: "NEBOSH ICG",
    accent: "#1A3260",
  },
];

const verifyLinks = [
  { label: "ResearchGate", href: "https://www.researchgate.net/profile/Ephraim-Mpofu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ephraim-mpofu-a340608b/" },
  { label: "T2S Doctoral School", href: "https://boku.ac.at/en/docservice/doctoral-studies/doktoratsschulen/transitions-to-sustainability-t2s/doctoral-candidates" },
  { label: "FOGOS COST Action", href: "https://www.cost.eu/actions/CA23118/#tabs+Name:Working%20Groups%20and%20Membership" },
  { label: "YouTube", href: "https://www.youtube.com/@ephraimmpofu_" },
];

function Certifications() {
  const { t } = useTranslation("common");
  return (
    <div className="glass-card p-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.22em] mb-5" style={{ color: "#8A8D93" }}>
        {t("about.certsTitle")}
      </div>
      <div className="space-y-3">
        {certifications.map(({ Logo, name, detail, accent, link }) => (
          <div
            key={name}
            className="flex items-center gap-4 rounded-[10px] p-3"
            style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
          >
            <Logo />
            <div className="flex-1 min-w-0">
              <div className="text-[12.5px] font-medium leading-tight" style={{ color: "#1F2125" }}>{name}</div>
              <div className="text-[11px] mt-0.5" style={{ color: "#5A5D63" }}>{detail}</div>
            </div>
            {link && (
              <a href={link} target="_blank" rel="noopener noreferrer" aria-label="Verify certificate">
                <ExternalLink className="h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Affiliations strip */}
      <div className="mt-5 border-t pt-4" style={{ borderColor: "#E3E1DA" }}>
        <div className="text-[10px] font-bold uppercase tracking-[0.18em] mb-2.5" style={{ color: "#8A8D93" }}>
          {t("about.verifyTitle")}
        </div>
        <div className="flex flex-wrap gap-2">
          {verifyLinks.map((v) => (
            <a
              key={v.label}
              href={v.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-[6px] px-2.5 py-1.5 text-[11px] font-semibold transition-colors hover:bg-[#E9EFF4]"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
                color: "#34506E",
              }}
            >
              {v.label}
              <ExternalLink className="h-2.5 w-2.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function BackgroundSection() {
  const ref = useScrollReveal<HTMLElement>(100);
  return (
    <section ref={ref} className="mt-5 space-y-4" aria-label="Professional background and credentials">
      <WorldMap />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <EducationTimeline />
        <Certifications />
      </div>
    </section>
  );
}

/* ============================================================
   6. ARCHITECTURAL PRINCIPLES + CORE EXPERTISE
   ============================================================ */

const PRINCIPLE_ICONS = [Target, Eye, ShieldCheck, Layers, TrendingUp];
const EXPERTISE_ICONS = [Layers2, BookOpen, LayoutGrid, Network, Search, Settings2];

function PrinciplesAndExpertise() {
  const { t } = useTranslation("common");
  const principleText = t("about.principles", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const principles = PRINCIPLE_ICONS.map((Icon, i) => ({ Icon, ...principleText[i] }));
  const expertiseText = t("about.expertise", { returnObjects: true }) as Array<{ title: string; sub: string }>;
  const expertiseItems = EXPERTISE_ICONS.map((Icon, i) => ({ Icon, ...expertiseText[i] }));
  const ref = useScrollReveal<HTMLElement>(200);
  return (
    <section ref={ref} className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2" aria-label="Principles and expertise">

      {/* LEFT — Principles */}
      <div className="glass-card p-6 lg:p-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
          {t("about.principlesLabel")}
        </div>
        <h3 className="mt-1.5 text-[18px] font-medium" style={{ color: "#1F2125" }}>
          {t("about.principlesTitle")}
        </h3>

        {/* Horizontal row on lg */}
        <div className="mt-6 hidden items-start justify-between gap-1 lg:flex">
          {principles.map(({ Icon, title, desc }, i) => (
            <div key={title} className="flex items-start gap-0">
              <div className="flex flex-col items-center text-center" style={{ maxWidth: 110 }}>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
                >
                  <Icon className="h-5 w-5" style={{ color: "#34506E" }} />
                </div>
                <div className="mt-2.5 text-[12.5px] font-medium" style={{ color: "#1F2125" }}>{title}</div>
                <div className="mt-1 text-[11px] leading-snug" style={{ color: "#5A5D63" }}>
                  {desc}
                </div>
              </div>
              {i < principles.length - 1 && (
                <div
                  className="mx-1 mt-[18px] shrink-0 text-[20px] font-light"
                  style={{ color: "#D7D4CC" }}
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
                style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
              >
                <Icon className="h-4 w-4" style={{ color: "#34506E" }} />
              </div>
              <div>
                <div className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{title}</div>
                <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#5A5D63" }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Core Expertise */}
      <div className="glass-card p-6 lg:p-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
          {t("about.expertiseLabel")}
        </div>
        <h3 className="mt-1.5 text-[18px] font-medium" style={{ color: "#1F2125" }}>
          {t("about.expertiseTitle")}
        </h3>

        <div className="mt-6 grid grid-cols-3 gap-5">
          {expertiseItems.map(({ Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
              >
                <Icon className="h-6 w-6" style={{ color: "#34506E" }} />
              </div>
              <div className="mt-2.5 text-[12px] font-medium leading-tight" style={{ color: "#1F2125" }}>{title}</div>
              <div className="text-[11px] leading-tight" style={{ color: "#5A5D63" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. FAQ SECTION — visible accordion + schema-backed
   ============================================================ */

function AboutFaqSection() {
  const { t } = useTranslation("common");
  const faqItems = t("about.faq", { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <section className="mt-14 lg:mt-16" aria-label="Frequently asked questions">
      <div className="mb-8">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: "#8A8D93" }}>
          {t("about.faqLabel")}
        </div>
        <h2 className="mt-2.5 text-[28px] font-medium leading-tight lg:text-[34px]" style={{ color: "#1F2125" }}>
          {t("about.faqTitle")}
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "#5A5D63" }}>
          {t("about.faqDesc")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {faqItems.map((item) => (
          <details
            key={item.q}
            className="group rounded-[14px] p-5"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            <summary
              className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13.5px] font-semibold"
              style={{ userSelect: "none", color: "#1F2125" }}
            >
              <span>{item.q}</span>
              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 rotate-90 transition-transform group-open:rotate-[270deg]"
                style={{ color: "#34506E" }}
              />
            </summary>
            <p className="mt-3.5 text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   8. FINAL CTA
   ============================================================ */

function CTA() {
  const { t, i18n } = useTranslation("common");
  const agentHref = i18n.language === "de" ? "/de/ai-agent" : "/ai-agent";
  return (
    <section className="mt-5 mb-5" aria-label="Contact call to action">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[auto_1fr_auto] lg:gap-10 lg:p-9"
        style={{
          background: "linear-gradient(135deg, #E9EFF4, rgba(242,240,234,0.8))",
        }}
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
          style={{
            background: "#E9EFF4",
            border: "1px solid #D7D4CC",
          }}
        >
          <Rocket className="h-7 w-7" style={{ color: "#34506E" }} />
        </div>

        <div>
          <h2 className="text-[22px] font-medium leading-tight lg:text-[26px]" style={{ color: "#1F2125" }}>
            {t("about.ctaTitle")}
          </h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
            {t("about.ctaDesc")}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to={agentHref}
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            <Bot className="h-4 w-4" /> {t("about.ctaAskAgent")}
          </Link>
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:bg-black/5 whitespace-nowrap"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            {t("about.ctaViewPortfolio")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
