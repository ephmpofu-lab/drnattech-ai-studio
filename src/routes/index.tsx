import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ExternalLink,
  Box,
  Database,
  ShieldCheck,
  MapPin,
  Bot,
  Rocket,
  Clock,
  Globe,
  TrendingUp,
  FileText,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

/* ============================================================
   ROUTE — meta, hreflang, canonical
   ============================================================ */

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "AI Solutions Architect Vienna · Dr. Ephraim Mpofu, PhD | EU AI Act · Enterprise AI · KI Systems",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu (PhD, BOKU Vienna) — AI Solutions Architect and KI-Architekt based in Vienna, Austria. Designing enterprise AI systems, RAG knowledge platforms and EU AI Act-compliant architectures for DACH and EU organisations.",
      },
      {
        property: "og:title",
        content:
          "Dr. Ephraim Mpofu | AI Solutions Architect Vienna | Enterprise AI & EU AI Act",
      },
      {
        property: "og:description",
        content:
          "Enterprise AI systems, RAG knowledge platforms, multi-agent workflows and EU AI Act compliance architecture — designed and delivered from Vienna, Austria.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Dr. Ephraim Mpofu | AI Solutions Architect Vienna | EU AI Act",
      },
      {
        name: "twitter:description",
        content:
          "Enterprise AI systems, RAG platforms and EU AI Act compliance architecture designed and delivered from Vienna, Austria.",
      },
      {
        name: "keywords",
        content:
          "AI Solutions Architect Vienna, KI-Architekt Wien, enterprise AI systems, EU AI Act compliance, KI-Verordnung Beratung, RAG knowledge platform, multi-agent orchestration, agent-to-agent protocol, A2A MCP LangGraph, multi-agent coordination, IDS IDSA data sovereignty, enterprise AI integration, agent architecture, workflow automation, Dr Ephraim Mpofu, DACH AI consultant, KI Lösungen Österreich",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/" },
      { rel: "alternate", hreflang: "en", href: "https://drnattech.com/" },
      { rel: "alternate", hreflang: "de", href: "https://drnattech.com/de" },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/",
      },
    ],
  }),
  component: Home,
});

/* ============================================================
   FAQ DATA — used in both structured data and visible section
   ============================================================ */

const homeFaq = [
  {
    q: "What does an AI Solutions Architect do?",
    a: "An AI Solutions Architect translates business problems into production-ready AI systems — designing architecture, multi-agent workflows, RAG and knowledge platforms, governance and intelligent automation that deliver measurable outcomes. Unlike a data scientist or ML engineer, an AI Solutions Architect owns the full system design: from business requirement through integration, governance, deployment and ongoing reliability.",
  },
  {
    q: "Who is Dr. Ephraim Mpofu?",
    a: "Dr. Ephraim Mpofu is an AI Solutions Architect and KI-Architekt (Künstliche Intelligenz Architekt) based in Vienna, Austria. He holds a PhD (Dr.nat.techn.) from BOKU University Vienna, created the AISA, SKAIDO and Three Structural Laws frameworks, and builds enterprise AI systems that work in production. He serves organisations across Austria, Germany, Switzerland and the broader EU.",
  },
  {
    q: "What is the EU AI Act and how does it affect enterprise AI systems?",
    a: "The EU AI Act classifies AI systems by risk level. High-risk systems — such as those used in insurance claims processing, HR screening and credit scoring — require documented risk assessments, full audit trails, human-in-the-loop oversight mechanisms and transparency documentation. The Act's high-risk obligations apply from August 2026. Dr. Mpofu designs enterprise AI architectures that embed these requirements from day one, avoiding the significant cost and risk of compliance retrofitting.",
  },
  {
    q: "Do you work with German-speaking clients across the DACH region?",
    a: "Yes. Dr. Mpofu works with enterprises across Austria (Österreich), Germany (Deutschland) and Switzerland — the DACH region — as well as broader EU markets. He designs AI systems (KI-Systeme) that meet both local business requirements and EU regulatory obligations including the EU AI Act (EU KI-Verordnung) and GDPR. German-language engagement is available.",
  },
  {
    q: "Which proprietary AI frameworks has Dr. Ephraim Mpofu developed?",
    a: "Dr. Mpofu developed a suite of five proprietary frameworks: the AISA Framework (Strategic AI Engagement Model), the SKAIDO Framework (six-phase end-to-end AI implementation methodology), the Three Structural Laws (architectural principles preventing fraud and silent failure), the Four Workflow Layers (scalable automation architecture), and Knowledge Architecture (enterprise RAG and knowledge system design). All are designed for production enterprise environments.",
  },
  {
    q: "What is RAG and why does it matter for enterprise knowledge systems?",
    a: "Retrieval-Augmented Generation (RAG) is an AI architecture pattern that connects large language models to an organisation's own knowledge base — enabling accurate, source-cited responses grounded in internal data, without hallucination. Dr. Mpofu implements enterprise RAG systems using vector databases, semantic retrieval layers and governance frameworks to deliver reliable, auditable AI knowledge platforms at scale.",
  },
  {
    q: "What industries do you build AI systems for?",
    a: "Dr. Mpofu has delivered AI systems across insurance, financial services, human resources, knowledge management, sustainability and regulatory compliance. Industry-specific systems include an Insurance Claims Intelligence Platform (80% processing time reduction), an AI Career Intelligence Operating System and enterprise Knowledge Architecture platforms — all designed for production deployment with full auditability.",
  },
  {
    q: "How quickly can an enterprise AI system be designed and deployed?",
    a: "Using the SKAIDO Framework, a production-ready enterprise AI system typically takes 6–16 weeks from discovery call to live deployment. Simple intelligent automation workflows can be delivered in 2–4 weeks; complex multi-agent platforms with RAG knowledge architecture, governance layers and full audit trail design take 12–20 weeks. Every engagement begins with a structured discovery and architecture phase before any code is written.",
  },
];

/* ============================================================
   STRUCTURED DATA — Person, Service, CreativeWork, FAQ, WebSite
   ============================================================ */

function HomeStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://drnattech.com/#website",
        url: "https://drnattech.com/",
        name: "Dr. Ephraim Mpofu — AI Solutions Architect Vienna",
        description:
          "Enterprise AI systems, RAG knowledge platforms, multi-agent workflows and EU AI Act compliance — designed and delivered from Vienna, Austria.",
        inLanguage: "en",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://drnattech.com/ai-agent?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "ProfilePage",
        "@id": "https://drnattech.com/#webpage",
        url: "https://drnattech.com/",
        name: "Dr. Ephraim Mpofu — AI Solutions Architect, Vienna Austria",
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
        ],
        description:
          "PhD-credentialed AI Solutions Architect and KI-Architekt based in Vienna, Austria. Specialises in enterprise AI systems, RAG knowledge platforms, multi-agent workflows and EU AI Act compliance architecture. Serves organisations across the DACH region and EU.",
        url: "https://drnattech.com",
        image: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
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
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          name: "PhD in Natural Technology (Dr.nat.techn.)",
          educationalLevel: "Doctoral Degree",
          recognizedBy: {
            "@type": "CollegeOrUniversity",
            name: "BOKU University Vienna",
          },
        },
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
          "AI Solutions Architecture",
          "GDPR-Aligned AI",
          "High-Risk AI System Classification",
        ],
        sameAs: ["https://www.linkedin.com/in/ephraimmpofu"],
      },
      {
        "@type": "Service",
        "@id": "https://drnattech.com/#service",
        name: "Enterprise AI System Architecture & Implementation",
        serviceType: "AI Solutions Architecture",
        description:
          "End-to-end enterprise AI system design, implementation and governance — including multi-agent systems, RAG knowledge platforms, EU AI Act compliance architecture and workflow automation.",
        provider: { "@id": "https://drnattech.com/#person" },
        areaServed: [
          { "@type": "Country", name: "Austria" },
          { "@type": "Country", name: "Germany" },
          { "@type": "Country", name: "Switzerland" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "AI Architecture Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Enterprise AI System Architecture",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "RAG Knowledge Platform Implementation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "EU AI Act Compliance Architecture",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Multi-Agent AI Workflow Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Governance Framework Implementation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Knowledge Architecture Design",
              },
            },
          ],
        },
      },
      {
        "@type": "FAQPage",
        "@id": "https://drnattech.com/#faq",
        mainEntity: homeFaq.map((f) => ({
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
          "The SKAIDO Framework is a six-phase AI implementation methodology developed by Dr. Ephraim Mpofu to systematically take enterprises from business problem definition to deployed, production-ready AI solution.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/frameworks",
        about: { "@type": "Thing", name: "Enterprise AI Implementation Methodology" },
      },
      {
        "@type": "CreativeWork",
        name: "AISA Framework",
        alternateName: "AI Systems Architecture Strategic Engagement Framework",
        description:
          "The AISA Framework is Dr. Ephraim Mpofu's proprietary strategic engagement model for enterprise AI — structuring how organisations move from AI ambiguity to deployed, governed AI systems with measurable business outcomes.",
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

export function Home() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <HomeStructuredData />
      <BrandBackground />
      <SiteNav active="Home" />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <Hero />
        <TrustBar />
        <FeaturedCaseStudy />
        <WhatIBuild />
        <EuAiActStrip />
        <FrameworksSection />
        <AgentCard />
        <HomeFaqSection />
        <FinalCta />
        <SiteFooter />
      </main>
    </div>
  );
}

/* ============================================================
   1. HERO
   ============================================================ */

const TYPED_PHRASES = ["Enterprise AI Architect", "KI-Architekt Wien", "A2A · MCP · LangGraph Architecture", "Data-Sovereign AI Architecture"];

function TypedText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPED_PHRASES[phraseIdx];
    const speed = deleting ? 35 : 65;

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % TYPED_PHRASES.length);
      return;
    }

    const t = setTimeout(() => {
      setCharIdx((c) => (deleting ? c - 1 : c + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="inline-flex items-center">
      <span style={{ color: "#C4B5FD" }}>{TYPED_PHRASES[phraseIdx].slice(0, charIdx)}</span>
      <span
        className="ml-[1px] inline-block w-[2px] h-[1em] rounded-full align-middle"
        style={{ background: "#A855F7", animation: "blink-caret 1s step-end infinite" }}
      />
    </span>
  );
}

const capabilities = [
  {
    Icon: Box,
    title: "Build AI Systems",
    desc: "Production-ready enterprise AI — multi-agent orchestration using LangGraph and agent-to-agent coordination frameworks, built for scalability and reliability.",
  },
  {
    Icon: Database,
    title: "Knowledge Platforms",
    desc: "RAG systems, vector databases, enterprise semantic search and knowledge governance at scale.",
  },
  {
    Icon: ShieldCheck,
    title: "AI Governance",
    desc: "EU AI Act compliance, IDS/IDSA data sovereignty, high-risk system classification, audit trail and responsible AI architecture from day one.",
  },
];

function Hero() {
  return (
    <section
      className="grid grid-cols-1 gap-5 pt-10 lg:grid-cols-[2fr_1.8fr_1.5fr] lg:gap-6 lg:pt-14"
      aria-label="Dr. Ephraim Mpofu — AI Solutions Architect Vienna"
    >
      {/* LEFT — value proposition */}
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-bold uppercase tracking-[0.2em]"
          style={{
            background: "rgba(139,92,246,0.10)",
            border: "1px solid rgba(139,92,246,0.32)",
            color: "#C4B5FD",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#A855F7", boxShadow: "0 0 8px #A855F7" }}
          />
          ENTERPRISE AI ARCHITECT · WIEN
        </span>

        <h1 className="mt-6 text-[42px] font-bold leading-[1.04] tracking-tight text-white sm:text-[48px] lg:text-[54px]">
          Enterprise AI Systems That{" "}
          <span className="text-gradient-brand">Work in Production</span>
        </h1>

        <div className="mt-3 text-[16px] font-medium" style={{ color: "#9CA3AF" }}>
          <TypedText />
        </div>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "#9CA3AF" }}>
          I architect enterprise AI systems — multi-agent coordination,
          agent-to-agent protocols, RAG knowledge platforms and IDS-compliant
          data-sovereign governance — for organisations that need production
          reliability and measurable outcomes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            View My Work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            <Bot className="h-4 w-4" /> Talk to My Agent
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex w-fit items-center gap-2 text-[12.5px] font-medium"
            style={{ color: "#9CA3AF" }}
          >
            <MapPin className="h-4 w-4" style={{ color: "#A855F7" }} />
            Vienna, Austria · DACH &amp; EU
          </div>
          <span
            className="rounded-md px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[0.14em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.28)",
              color: "#A855F7",
            }}
          >
            KI-Architekt
          </span>
        </div>
      </div>

      {/* CENTER — hero portrait */}
      <div className="relative hidden min-h-[500px] overflow-hidden lg:block">
        <img
          src="/images/Dr Mpofu_purple2.png"
          alt="Dr. Ephraim Mpofu — AI Solutions Architect and KI-Architekt based in Vienna, Austria"
          className="absolute inset-0 h-full w-full object-cover object-top"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28"
          style={{ background: "linear-gradient(to bottom, transparent, #050816)" }}
        />
      </div>

      {/* RIGHT — 3 capability cards */}
      <div className="flex flex-col justify-center gap-3">
        {capabilities.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-[14px] p-4"
            style={{
              background: "rgba(7,11,28,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.30)",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">{title}</div>
              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#9CA3AF" }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
        <Link
          to="/contact"
          className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold"
          style={{ color: "#A855F7" }}
        >
          Let's build together <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   2. TRUST BAR
   ============================================================ */

const trustMetrics = [
  { Icon: FileText, value: "9+", label: "Peer-Reviewed Publications" },
  { Icon: Clock, value: "3,500+", label: "Hours Automated" },
  { Icon: TrendingUp, value: "6", label: "Industries Served" },
  { Icon: Globe, value: "DACH & EU", label: "Vienna, Austria" },
];

function TrustBar() {
  return (
    <section className="mt-5" aria-label="Authority metrics">
      <div className="glass-card flex flex-wrap items-stretch">
        {trustMetrics.map(({ Icon, value, label }, i) => (
          <div
            key={value}
            className="flex min-w-[140px] flex-1 flex-col items-center justify-center px-5 py-4"
            style={i > 0 ? { borderLeft: "1px solid rgba(255,255,255,0.06)" } : undefined}
          >
            <div
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: "rgba(139,92,246,0.15)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
            </div>
            <div className="text-gradient-brand text-[24px] font-bold leading-none">
              {value}
            </div>
            <div className="mt-1.5 text-center text-[11px] font-medium" style={{ color: "#9CA3AF" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   2b. EU AI ACT COMPLIANCE STRIP
   ============================================================ */

const euAiActSignals = [
  "High-Risk System Classification",
  "Full Audit Trail Architecture",
  "Human-in-the-Loop Oversight",
  "GDPR-Aligned by Design",
  "Transparency Documentation",
  "Risk Management Framework",
  "Responsible AI from Day One",
];

function EuAiActStrip() {
  return (
    <section className="mt-3" aria-label="EU AI Act compliance signals">
      <div
        className="rounded-xl px-5 py-3"
        style={{
          background: "rgba(139,92,246,0.05)",
          border: "1px solid rgba(139,92,246,0.20)",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div
            className="shrink-0 text-[9px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "#A855F7" }}
          >
            EU AI Act Ready
          </div>
          <div
            className="hidden h-3.5 w-px lg:block"
            style={{ background: "rgba(139,92,246,0.30)" }}
          />
          {euAiActSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 shrink-0" style={{ color: "#A855F7" }} />
              <span className="text-[11px] font-medium" style={{ color: "#9CA3AF" }}>
                {signal}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   3. WHAT I BUILD
   ============================================================ */

const buildItems = [
  {
    Icon: Box,
    title: "AI Systems",
    desc: "End-to-end enterprise AI systems designed for scale. Multi-agent architectures, intelligent automation and production deployment with full auditability and governance embedded from the start.",
    link: "/portfolio" as const,
    linkLabel: "View case studies",
  },
  {
    Icon: Database,
    title: "Knowledge Platforms",
    desc: "RAG-powered knowledge architectures that surface the right information at the right time. Semantic search, vector databases, enterprise knowledge governance and hallucination-prevention by design.",
    link: "/frameworks" as const,
    linkLabel: "See the architecture",
  },
  {
    Icon: ShieldCheck,
    title: "AI Governance",
    desc: "EU AI Act-compliant governance architectures. Risk classification of high-risk AI systems, audit trail design, human-in-the-loop oversight mechanisms and GDPR-aligned responsible AI built in from day one.",
    link: "/frameworks" as const,
    linkLabel: "Explore frameworks",
  },
];

function WhatIBuild() {
  return (
    <section className="mt-14 lg:mt-16" aria-label="Services">
      <div className="mb-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          What I Build
        </div>
        <h2 className="mt-2.5 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
          Intelligent Systems for Organisations
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {buildItems.map(({ Icon, title, desc, link, linkLabel }) => (
          <div key={title} className="glass-card flex flex-col p-5">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.28)",
              }}
            >
              <Icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
            </div>
            <h3 className="mt-4 text-[18px] font-bold text-white">{title}</h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              {desc}
            </p>
            <Link
              to={link}
              className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-semibold"
              style={{ color: "#A855F7" }}
            >
              {linkLabel} <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. FEATURED CASE STUDY — RAG Knowledge Hub
   ============================================================ */

const ragSources = [
  { name: "Core Identity", pct: 45 },
  { name: "Case Studies", pct: 25 },
  { name: "Publications", pct: 20 },
  { name: "Frameworks",   pct: 10 },
];

function RagDashboard() {
  const [stats, setStats] = useState({
    totalQueries: 0, successRate: 100, totalChunks: 0, totalDocuments: 0, avgResponseMs: 0,
  });

  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((d) => setStats((s) => ({ ...s, ...d })))
      .catch(() => {});
  }, []);

  const r = 28;
  const circ = 2 * Math.PI * r;
  const filled = circ * (stats.successRate / 100);

  const metrics = [
    {
      label: "Total Queries",
      value: stats.totalQueries > 0 ? stats.totalQueries.toLocaleString() : "0",
    },
    {
      label: "Chunks Indexed",
      value: stats.totalChunks > 0 ? stats.totalChunks.toLocaleString() : "—",
    },
    {
      label: "Avg Response",
      value: stats.avgResponseMs > 0 ? `${(stats.avgResponseMs / 1000).toFixed(1)}s` : "—",
    },
    {
      label: "Success Rate",
      value: `${stats.successRate}%`,
    },
  ];

  return (
    <div
      className="rounded-[14px] p-5"
      style={{ background: "rgba(7,11,28,0.88)", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      <div className="mb-3 text-[11px] font-bold text-white">RAG Performance Overview</div>

      {/* 4 live metric cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-[8px] p-2.5"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="mb-1 text-[9.5px]" style={{ color: "#6B7280" }}>{m.label}</div>
            <div className="text-[15px] font-bold text-white">{m.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-[1fr_auto_auto]">
        {/* Knowledge base real stats */}
        <div>
          <div className="mb-1.5 text-[9.5px]" style={{ color: "#6B7280" }}>Knowledge Base</div>
          <div
            className="rounded-[8px] p-3 space-y-2"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {[
              { label: "Vector Chunks", value: stats.totalChunks > 0 ? stats.totalChunks.toLocaleString() : "loading…" },
              { label: "Source Documents", value: stats.totalDocuments > 0 ? String(stats.totalDocuments) : "loading…" },
              { label: "Embedding Model", value: "OpenAI" },
              { label: "Vector Store", value: "Supabase pgvector" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-[10px]" style={{ color: "#9CA3AF" }}>{row.label}</span>
                <span className="text-[11px] font-bold text-white">{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success rate donut — live */}
        <div className="flex flex-col items-center">
          <div className="mb-1.5 text-[9.5px]" style={{ color: "#6B7280" }}>Query Success Rate</div>
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r={r} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="8" />
            <circle
              cx="35" cy="35" r={r}
              fill="none" stroke="#A855F7" strokeWidth="8"
              strokeDasharray={`${filled} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 35 35)"
            />
            <text x="35" y="40" textAnchor="middle" style={{ fontSize: 13, fontWeight: 700, fill: "#fff" }}>
              {stats.successRate}%
            </text>
          </svg>
        </div>

        {/* Knowledge categories — real document breakdown */}
        <div>
          <div className="mb-2 text-[9.5px]" style={{ color: "#6B7280" }}>Knowledge Categories</div>
          <div className="space-y-1.5">
            {ragSources.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-[72px] shrink-0 text-right text-[9.5px]" style={{ color: "#9CA3AF" }}>{s.name}</div>
                <div className="h-1.5 w-[80px] overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.round(s.pct / 0.45)}%`, background: "#8B5CF6" }} />
                </div>
                <div className="w-[24px] text-[9.5px]" style={{ color: "#6B7280" }}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCaseStudy() {
  return (
    <section className="mt-5" aria-label="Featured case study">
      <div className="glass-card p-7 lg:p-9">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.65fr]">

          <div className="flex flex-col justify-center">
            <span
              className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ background: "rgba(139,92,246,0.14)", border: "1px solid rgba(139,92,246,0.32)", color: "#C4B5FD" }}
            >
              RAG System
            </span>

            <h2 className="mt-4 text-[28px] font-bold leading-[1.12] text-white lg:text-[32px]">
              Enterprise RAG<br />Knowledge Hub
            </h2>

            <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              A retrieval-augmented generation system engineered on the five pillars of governable AI —{" "}
              <span style={{ color: "#E2E8F0" }}>explainability, traceability, oversight, monitoring and accountability</span>{" "}
              — so every answer is grounded in its source, every decision is auditable, and every failure surfaces before it becomes a crisis.
            </p>
            <p className="mt-3 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Governed by three structural laws:{" "}
              <span style={{ color: "#E2E8F0" }}>no deception in reasoning, no silent failure in execution, no ungovernable system in production.</span>{" "}
              This is the architecture most enterprises discover they needed only after something goes wrong.
            </p>

            <div
              className="mt-4 h-[140px] overflow-hidden rounded-[10px]"
              style={{ border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <img
                src="/images/WF02_RAG_Knowledge_Intelligence.png"
                alt="RAG Knowledge Intelligence workflow"
                className="h-full w-full object-cover"
                style={{ objectPosition: "50% 68%" }}
              />
            </div>

          </div>

          <div className="self-start space-y-3">
            <RagDashboard />
            <div className="flex justify-end">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:scale-[1.02]"
                style={{ border: "1px solid rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.12)" }}
              >
                View Case Study <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. FRAMEWORKS
   ============================================================ */

function FrameworkLayersVisual() {
  const cx = 120, viewW = 240, viewH = 168;
  const lw = 90, lh = 22, th = 10;

  const layerDefs = [
    {
      ty: 28,
      top: "#A855F7", left: "#6D28D9", right: "#7C3AED",
      glow: "rgba(168,85,247,0.38)", label: "AI Governance",
    },
    {
      ty: 62,
      top: "#6366F1", left: "#4338CA", right: "#4F46E5",
      glow: "rgba(99,102,241,0.32)", label: "Knowledge Arch.",
    },
    {
      ty: 96,
      top: "#14B8A6", left: "#0F766E", right: "#0D9488",
      glow: "rgba(20,184,166,0.30)", label: "Workflow Layers",
    },
    {
      ty: 130,
      top: "#F59E0B", left: "#B45309", right: "#D97706",
      glow: "rgba(245,158,11,0.30)", label: "AISA Framework",
    },
  ];

  const drawOrder = [...layerDefs].reverse();

  return (
    <svg
      viewBox={`0 0 ${viewW} ${viewH}`}
      className="h-auto w-full"
      style={{ maxWidth: 280 }}
      aria-label="AISA Framework layers: AI Governance, Knowledge Architecture, Workflow Layers, AISA Foundation"
    >
      <defs>
        <radialGradient id="fwbg" cx="50%" cy="55%" r="65%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width={viewW} height={viewH} fill="url(#fwbg)" />

      {drawOrder.map(({ ty, top, left, right, glow, label }) => {
        const topFace = `${cx - lw},${ty} ${cx},${ty - lh} ${cx + lw},${ty} ${cx},${ty + lh}`;
        const rightFace = `${cx + lw},${ty} ${cx},${ty + lh} ${cx},${ty + lh + th} ${cx + lw},${ty + th}`;
        const leftFace = `${cx - lw},${ty} ${cx},${ty + lh} ${cx},${ty + lh + th} ${cx - lw},${ty + th}`;
        return (
          <g key={label}>
            <ellipse cx={cx} cy={ty + lh + 4} rx={lw * 0.55} ry="5" fill={glow} opacity="0.55" />
            <polygon points={leftFace} fill={left} opacity="0.52" />
            <polygon points={rightFace} fill={right} opacity="0.42" />
            <polygon points={topFace} fill={top} opacity="0.88" />
            <text
              x={cx} y={ty + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill="white" fontSize="6" fontWeight="700" opacity="0.88"
            >
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function FrameworksSection() {
  return (
    <section className="mt-5" aria-label="Proprietary AI frameworks">
      <div
        className="glass-card grid grid-cols-1 gap-10 p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:p-12"
        style={{
          background:
            "radial-gradient(ellipse at 75% 50%, rgba(139,92,246,0.08) 0%, transparent 65%), rgba(7,11,28,0.8)",
        }}
      >
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.22em]"
            style={{ color: "#8B8B9A" }}
          >
            Proprietary Frameworks
          </div>
          <h2 className="mt-4 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
            The Frameworks Behind Every System
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Every system I build is grounded in five proprietary frameworks —
            AISA, SKAIDO, Three Structural Laws, Four Workflow Layers and
            Knowledge Architecture — developed through years of scientific
            research and enterprise AI practice across the DACH region and EU.
          </p>
          <Link
            to="/frameworks"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            Explore Frameworks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <FrameworkLayersVisual />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   6. AUTHORITY — PUBLICATIONS + INSIGHT
   ============================================================ */

function PublicationIllustration() {
  return (
    <svg viewBox="0 0 90 100" className="h-[90px] w-auto shrink-0 opacity-80" aria-hidden="true">
      <g transform="rotate(-6 45 52)">
        <rect x="10" y="15" width="56" height="70" rx="5"
          fill="rgba(139,92,246,0.10)" stroke="rgba(139,92,246,0.28)" strokeWidth="1.2" />
      </g>
      <g transform="rotate(-2.5 45 52)">
        <rect x="10" y="12" width="56" height="70" rx="5"
          fill="rgba(139,92,246,0.16)" stroke="rgba(139,92,246,0.36)" strokeWidth="1.2" />
      </g>
      <rect x="10" y="8" width="56" height="72" rx="5"
        fill="rgba(7,11,28,0.94)" stroke="rgba(139,92,246,0.58)" strokeWidth="1.3" />
      <rect x="17" y="16" width="42" height="7" rx="3"
        fill="rgba(168,85,247,0.28)" />
      <line x1="17" y1="31" x2="60" y2="31" stroke="rgba(255,255,255,0.16)" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="17" y1="39" x2="56" y2="39" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="47" x2="58" y2="47" stroke="rgba(255,255,255,0.10)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="55" x2="53" y2="55" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="63" x2="57" y2="63" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function GovernanceIllustration() {
  return (
    <svg viewBox="0 0 90 100" className="h-[90px] w-auto shrink-0 opacity-80" aria-hidden="true">
      <rect x="8" y="18" width="36" height="62" rx="3"
        fill="rgba(139,92,246,0.18)" stroke="rgba(139,92,246,0.48)" strokeWidth="1.3" />
      <rect x="5" y="18" width="6" height="62" rx="2.5"
        fill="rgba(168,85,247,0.42)" stroke="rgba(139,92,246,0.48)" strokeWidth="0.8" />
      <line x1="14" y1="34" x2="38" y2="34" stroke="rgba(255,255,255,0.13)" strokeWidth="0.9" />
      <line x1="14" y1="42" x2="36" y2="42" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      <line x1="14" y1="50" x2="38" y2="50" stroke="rgba(255,255,255,0.09)" strokeWidth="0.9" />
      <path d="M56 12 L78 18 L78 40 Q78 56 56 64 Q34 56 34 40 L34 18 Z"
        fill="rgba(139,92,246,0.14)" stroke="rgba(168,85,247,0.52)" strokeWidth="1.4" />
      <polyline points="46,38 53,46 68,30"
        stroke="#A855F7" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function AuthoritySection() {
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2" aria-label="Research and thought leadership">

      {/* Publications */}
      <div className="glass-card p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#8B8B9A" }}
            >
              Research &amp; Publications
            </div>
            <div className="mt-4 text-[48px] font-bold leading-none text-gradient-brand">9+</div>
            <div className="mt-2 text-[15px] font-semibold text-white">
              Peer-Reviewed Publications
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Research spanning AI systems, knowledge management, RAG
              architectures, sustainability science and enterprise intelligent
              automation — published in peer-reviewed academic journals.
            </p>
            <Link
              to="/publications"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              View Publications <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="shrink-0 pt-1">
            <PublicationIllustration />
          </div>
        </div>
      </div>

      {/* Featured Insight */}
      <div className="glass-card p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{ color: "#8B8B9A" }}
            >
              Featured Insight
            </div>
            <div
              className="mt-4 inline-flex w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.28)",
                color: "#C4B5FD",
              }}
            >
              EU AI Act · KI-Verordnung
            </div>
            <h3 className="mt-3 text-[20px] font-bold leading-tight text-white">
              EU AI Act Compliance for Enterprises in 2025–2026
            </h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              What the EU AI Act means for your AI systems, how to classify
              risk and what governance architecture you need before the
              August 2026 obligation deadline.
            </p>
            <Link
              to="/insights"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
              style={{ border: "1px solid rgba(255,255,255,0.15)" }}
            >
              Read Article <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="shrink-0 pt-1">
            <GovernanceIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   7. AI AGENT
   ============================================================ */

const AGENT_TOPICS = [
  "AI Governance", "EU AI Act", "Knowledge Architecture",
  "Multi-Agent Systems", "My Research", "My Frameworks",
];

function AgentCard() {
  const [query, setQuery] = useState("");
  const [userMsg, setUserMsg] = useState("");
  const [agentMsg, setAgentMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendQuery(q: string) {
    const trimmed = q.trim();
    if (!trimmed || loading) return;
    setUserMsg(trimmed);
    setAgentMsg("");
    setLoading(true);
    setQuery("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, sessionId: "homepage" }),
      });
      const data = await res.json();
      setAgentMsg(data.output || "I didn't get a response. Try the full AI Agent page.");
    } catch {
      setAgentMsg("Connection error. Please try again or visit the AI Agent page.");
    } finally {
      setLoading(false);
    }
  }

  function handleSend(e: { preventDefault(): void }) {
    e.preventDefault();
    sendQuery(query);
  }

  return (
    <section className="mt-5" aria-label="Ask the AI Agent">
      <div
        className="glass-card overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.09), rgba(7,11,28,0.92))",
          border: "1px solid rgba(139,92,246,0.22)",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

          {/* LEFT */}
          <div className="p-8 lg:p-10">
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "linear-gradient(135deg, #7C3AED, #A855F7)",
              }}
            >
              <Bot className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-[22px] font-bold text-white">Ask My AI Agent</h2>
            <p className="mt-2 max-w-[400px] text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              Get instant answers about AI governance, frameworks, enterprise AI systems, publications and more.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {AGENT_TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => sendQuery(t)}
                  className="rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors hover:bg-white/10"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.11)",
                    color: "#D1D5DB",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — inline chat panel */}
          <div
            className="flex flex-col justify-between p-6"
            style={{ background: "rgba(5,8,22,0.6)", borderLeft: "1px solid rgba(139,92,246,0.14)" }}
          >
            <div className="min-h-[100px] overflow-y-auto">
              <div
                className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#6B7280" }}
              >
                AI Assistant
              </div>

              {!userMsg && (
                <div
                  className="inline-block rounded-[12px] rounded-tl-none px-4 py-2.5 text-[13px] font-medium text-white"
                  style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", maxWidth: "90%" }}
                >
                  How can I help you today?
                </div>
              )}

              {userMsg && (
                <div className="flex flex-col gap-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div
                      className="rounded-[12px] rounded-tr-none px-3 py-2 text-[12.5px] text-white"
                      style={{ background: "rgba(139,92,246,0.25)", maxWidth: "85%" }}
                    >
                      {userMsg}
                    </div>
                  </div>
                  {/* Agent response */}
                  {loading ? (
                    <div className="flex items-center gap-1.5 px-1" style={{ color: "#6B7280" }}>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-purple-400" style={{ animationDelay: "300ms" }} />
                    </div>
                  ) : agentMsg ? (
                    <div
                      className="inline-block rounded-[12px] rounded-tl-none px-4 py-2.5 text-[12.5px] leading-relaxed text-white"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)", maxWidth: "90%" }}
                    >
                      {agentMsg}
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="mt-4 flex items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about AI, frameworks, or my work..."
                className="flex-1 rounded-[8px] px-3 py-2.5 text-[12.5px] text-white outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  caretColor: "#A855F7",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #7C3AED, #A855F7)" }}
                aria-label="Send"
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ============================================================
   8. FAQ SECTION — visible + schema-backed
   ============================================================ */

function HomeFaqSection() {
  return (
    <section className="mt-14 lg:mt-16" aria-label="Frequently asked questions">
      <div className="mb-8">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8B8B9A" }}
        >
          Common Questions
        </div>
        <h2 className="mt-2.5 text-[28px] font-bold leading-tight text-white lg:text-[34px]">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "#9CA3AF" }}>
          Questions about enterprise AI implementation, EU AI Act compliance and working
          with a KI-Architekt in Vienna.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
        {homeFaq.map((item) => (
          <details
            key={item.q}
            className="group rounded-[14px] p-5"
            style={{
              background: "rgba(7,11,28,0.75)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <summary
              className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13.5px] font-semibold text-white"
              style={{ userSelect: "none" }}
            >
              <span>{item.q}</span>
              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 rotate-90 transition-transform group-open:rotate-[270deg]"
                style={{ color: "#A855F7" }}
              />
            </summary>
            <p
              className="mt-3.5 text-[13px] leading-relaxed"
              style={{ color: "#9CA3AF" }}
            >
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   9. FINAL CTA
   ============================================================ */

function FinalCta() {
  return (
    <section className="mt-5 mb-5" aria-label="Contact call to action">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-9"
        style={{
          background:
            "linear-gradient(135deg, rgba(139,92,246,0.16), rgba(20,20,40,0.6))",
        }}
      >
        <div className="flex items-center gap-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(168,85,247,0.20))",
              border: "1px solid rgba(139,92,246,0.55)",
              boxShadow: "0 0 28px -6px rgba(139,92,246,0.70)",
            }}
          >
            <Rocket className="h-6 w-6" style={{ color: "#C4B5FD" }} />
          </div>
          <div>
            <h2 className="text-[22px] font-bold leading-tight text-white lg:text-[26px]">
              Ready to Build AI Systems That Work in Production?
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#9CA3AF" }}>
              AI strategy, enterprise architecture, multi-agent systems, RAG knowledge
              platforms, EU AI Act compliance and intelligent automation — from Vienna,
              Austria, for the DACH region and EU.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02] whitespace-nowrap"
            style={{ background: "linear-gradient(135deg,#A855F7,#7C3AED)" }}
          >
            View My Work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5 whitespace-nowrap"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <Bot className="h-4 w-4" /> Talk to My Agent
          </Link>
        </div>
      </div>
    </section>
  );
}
