import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  Cpu,
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
        content: "https://drnattech.com/images/Dr_Mpofu_purple-removebg-preview.png",
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
    q: "Who is Dr. Ephraim Mpofu?",
    a: "Dr. Ephraim Mpofu is an AI Solutions Architect and KI-Architekt (Künstliche Intelligenz Architekt) based in Vienna, Austria. He holds a PhD (Dr.nat.techn.) from BOKU University Vienna, created the AISA, SKAIDO and Three Structural Laws frameworks, and builds enterprise AI systems that work in production. He serves organisations across Austria, Germany, Switzerland and the broader EU.",
  },
  {
    q: "What is the EU AI Act and how does it affect enterprise AI systems?",
    a: "The EU AI Act classifies AI systems by risk level. High-risk systems — such as those used in insurance claims processing, HR screening and credit scoring — require documented risk assessments, full audit trails, human-in-the-loop oversight mechanisms and transparency documentation. The Act's high-risk obligations apply from August 2026. Dr. Mpofu designs enterprise AI architectures that embed these requirements from day one, avoiding the significant cost and risk of compliance retrofitting.",
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

const CLASSIFIER_ROUTE = "/eu-ai-act-classifier" as const;

export function Home() {
  return (
    <div
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <HomeStructuredData />
      <SiteNav active="Home" />
      <main className="mx-auto max-w-[1280px] px-6 pb-20 lg:px-10">
        <Hero />
        <TrustBar />
        <FeaturedCaseStudy />
        <EuAiActStrip />
        <FrameworksSection />
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

function TypedText() {
  const { t } = useTranslation("common");
  const phrases = t("home.typedPhrases", { returnObjects: true }) as string[];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx] ?? "";
    const speed = deleting ? 35 : 65;

    if (!deleting && charIdx === current.length) {
      const timer = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(timer);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIdx((c) => (deleting ? c - 1 : c + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases]);

  return (
    <span className="inline-flex items-center">
      <span style={{ color: "#34506E" }}>{(phrases[phraseIdx] ?? "").slice(0, charIdx)}</span>
      <span
        className="ml-[1px] inline-block w-[2px] h-[1em] rounded-full align-middle"
        style={{ background: "#34506E", animation: "blink-caret 1s step-end infinite" }}
      />
    </span>
  );
}

const CAPABILITY_ICONS = [Cpu, Database, ShieldCheck];

function Hero() {
  const { t } = useTranslation("common");
  const caps = t("home.capabilities", { returnObjects: true }) as Array<{ title: string; desc: string }>;
  const capabilities = CAPABILITY_ICONS.map((Icon, i) => ({ Icon, ...caps[i] }));
  return (
    <section
      className="grid grid-cols-1 gap-5 pt-10 lg:grid-cols-[2fr_1.5fr] lg:gap-6 lg:pt-14"
      aria-label="Dr. Ephraim Mpofu — AI Solutions Architect Vienna"
    >
      {/* LEFT — value proposition */}
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
          style={{
            background: "#E9EFF4",
            border: "1px solid #D7D4CC",
            color: "#34506E",
          }}
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "#34506E" }}
          />
          {t("home.heroBadge")}
        </span>

        <h1 className="mt-6 text-[42px] font-medium leading-[1.04] tracking-tight sm:text-[48px] lg:text-[54px]" style={{ color: "#1F2125" }}>
          {t("home.heroTitleMain")}<span style={{ color: "#34506E" }}>{t("home.heroTitleGradient")}</span>
        </h1>

        <div className="mt-3 text-[16px] font-medium" style={{ color: "#5A5D63" }}>
          <TypedText />
        </div>

        <p className="mt-5 max-w-md text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
          {t("home.heroDesc")}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            {t("home.viewWork")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={CLASSIFIER_ROUTE}
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            <ShieldCheck className="h-4 w-4" style={{ color: "#34506E" }} /> EU AI Act Classifier
          </Link>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div
            className="inline-flex w-fit items-center gap-2 text-[12.5px] font-medium"
            style={{ color: "#5A5D63" }}
          >
            <MapPin className="h-4 w-4" style={{ color: "#34506E" }} />
            Vienna, Austria · DACH &amp; EU
          </div>
          <span
            className="rounded-md px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.14em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            KI-Architekt
          </span>
        </div>
      </div>

      {/* RIGHT — 3 capability cards */}
      <div className="flex flex-col justify-center gap-3">
        {capabilities.map(({ Icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-3 rounded-[14px] p-4"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
              }}
            >
              <Icon className="h-4 w-4" style={{ color: "#34506E" }} />
            </div>
            <div>
              <div className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{title}</div>
              <div className="mt-0.5 text-[11px] leading-snug" style={{ color: "#5A5D63" }}>
                {desc}
              </div>
            </div>
          </div>
        ))}
        <Link
          to="/contact"
          className="mt-1 inline-flex items-center gap-1.5 text-[12px] font-semibold"
          style={{ color: "#34506E" }}
        >
          {t("home.letsBuild")} <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </section>
  );
}

/* ============================================================
   2. TRUST BAR
   ============================================================ */

const TRUST_ICONS = [FileText, Clock, TrendingUp, Globe];

function TrustBar() {
  const { t } = useTranslation("common");
  const trustText = t("home.trustMetrics", { returnObjects: true }) as Array<{ value: string; label: string }>;
  const trustMetrics = TRUST_ICONS.map((Icon, i) => ({ Icon, ...trustText[i] }));
  return (
    <section className="mt-5" aria-label="Authority metrics">
      <div className="glass-card flex flex-wrap items-stretch">
        {trustMetrics.map(({ Icon, value, label }, i) => (
          <div
            key={value}
            className="flex min-w-[140px] flex-1 flex-col items-center justify-center px-5 py-4"
            style={i > 0 ? { borderLeft: "1px solid #E3E1DA" } : undefined}
          >
            <div
              className="mb-2 flex h-7 w-7 items-center justify-center rounded-full"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
              }}
            >
              <Icon className="h-3.5 w-3.5" style={{ color: "#34506E" }} />
            </div>
            <div className="text-gradient-brand text-[24px] font-medium leading-none">
              {value}
            </div>
            <div className="mt-1.5 text-center text-[11px] font-medium" style={{ color: "#8A8D93" }}>
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

function EuAiActStrip() {
  const { t } = useTranslation("common");
  const euAiActSignals = t("home.euSignals", { returnObjects: true }) as string[];
  return (
    <section className="mt-3" aria-label="EU AI Act compliance signals">
      <div
        className="rounded-xl px-5 py-3"
        style={{
          background: "#E9EFF4",
          border: "1px solid #D7D4CC",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <div
            className="shrink-0 text-[9px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#34506E" }}
          >
            {t("home.euActBadge")}
          </div>
          <div
            className="hidden h-3.5 w-px lg:block"
            style={{ background: "#D7D4CC" }}
          />
          {euAiActSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-1.5">
              <ShieldCheck className="h-3 w-3 shrink-0" style={{ color: "#34506E" }} />
              <span className="text-[11px] font-medium" style={{ color: "#5A5D63" }}>
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
   3. FEATURED CASE STUDY — RAG Knowledge Hub
   ============================================================ */

const ragSources = [
  { name: "Core Identity", pct: 45 },
  { name: "Case Studies", pct: 25 },
  { name: "Publications", pct: 20 },
  { name: "Frameworks",   pct: 10 },
];

function RagDashboard() {
  const { t } = useTranslation("common");
  const metricLabels = t("home.ragMetricLabels", { returnObjects: true }) as string[];
  const kbRows = t("home.ragKbRows", { returnObjects: true }) as string[];
  const sourceNames = t("home.ragSourceNames", { returnObjects: true }) as string[];

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
    { label: metricLabels[0], value: stats.totalQueries > 0 ? stats.totalQueries.toLocaleString() : "0" },
    { label: metricLabels[1], value: stats.totalChunks > 0 ? stats.totalChunks.toLocaleString() : "—" },
    { label: metricLabels[2], value: stats.avgResponseMs > 0 ? `${(stats.avgResponseMs / 1000).toFixed(1)}s` : "—" },
    { label: metricLabels[3], value: `${stats.successRate}%` },
  ];

  const kbData = [
    { label: kbRows[0], value: stats.totalChunks > 0 ? stats.totalChunks.toLocaleString() : t("home.ragKbLoading") },
    { label: kbRows[1], value: stats.totalDocuments > 0 ? String(stats.totalDocuments) : t("home.ragKbLoading") },
    { label: kbRows[2], value: "OpenAI" },
    { label: kbRows[3], value: "Supabase pgvector" },
  ];

  return (
    <div
      className="rounded-[14px] p-5"
      style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
    >
      <div className="mb-3 text-[11px] font-semibold" style={{ color: "#1F2125" }}>{t("home.ragOverview")}</div>

      {/* 4 live metric cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-[8px] p-2.5"
            style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
          >
            <div className="mb-1 text-[9.5px]" style={{ color: "#8A8D93" }}>{m.label}</div>
            <div className="text-[15px] font-semibold" style={{ color: "#1F2125" }}>{m.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 items-start gap-4 sm:grid-cols-[1fr_auto_auto]">
        {/* Knowledge base real stats */}
        <div>
          <div className="mb-1.5 text-[9.5px]" style={{ color: "#8A8D93" }}>{t("home.ragKb")}</div>
          <div
            className="rounded-[8px] p-3 space-y-2"
            style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
          >
            {kbData.map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="text-[10px]" style={{ color: "#5A5D63" }}>{row.label}</span>
                <span className="text-[11px] font-semibold" style={{ color: "#1F2125" }}>{row.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Success rate donut — live */}
        <div className="flex flex-col items-center">
          <div className="mb-1.5 text-[9.5px]" style={{ color: "#8A8D93" }}>{t("home.ragSuccessRate")}</div>
          <svg width="70" height="70" viewBox="0 0 70 70">
            <circle cx="35" cy="35" r={r} fill="none" stroke="#E9EFF4" strokeWidth="8" />
            <circle
              cx="35" cy="35" r={r}
              fill="none" stroke="#34506E" strokeWidth="8"
              strokeDasharray={`${filled} ${circ}`}
              strokeLinecap="round"
              transform="rotate(-90 35 35)"
            />
            <text x="35" y="40" textAnchor="middle" style={{ fontSize: 13, fontWeight: 600, fill: "#1F2125" }}>
              {stats.successRate}%
            </text>
          </svg>
        </div>

        {/* Knowledge categories — real document breakdown */}
        <div>
          <div className="mb-2 text-[9.5px]" style={{ color: "#8A8D93" }}>{t("home.ragCategories")}</div>
          <div className="space-y-1.5">
            {ragSources.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2">
                <div className="w-[72px] shrink-0 text-right text-[9.5px]" style={{ color: "#5A5D63" }}>{sourceNames[i]}</div>
                <div className="h-1.5 w-[80px] overflow-hidden rounded-full" style={{ background: "#E3E1DA" }}>
                  <div className="h-full rounded-full" style={{ width: `${Math.round(s.pct / 0.45)}%`, background: "#34506E" }} />
                </div>
                <div className="w-[24px] text-[9.5px]" style={{ color: "#8A8D93" }}>{s.pct}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedCaseStudy() {
  const { t } = useTranslation("common");
  const desc1 = t("home.caseStudyDesc1");
  const highlight = t("home.caseStudyHighlight");
  const [before, after] = desc1.split(highlight);
  return (
    <section className="mt-5" aria-label="Featured case study">
      <div className="glass-card p-7 lg:p-9">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.65fr]">

          <div className="flex flex-col justify-center">
            <span
              className="inline-flex w-fit items-center rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }}
            >
              {t("home.caseStudyBadge")}
            </span>

            <h2 className="mt-4 text-[28px] font-medium leading-[1.12] lg:text-[32px]" style={{ color: "#1F2125" }}>
              {t("home.caseStudyTitle1")}<br />{t("home.caseStudyTitle2")}
            </h2>

            <p className="mt-3 text-[13.5px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {before}<span style={{ color: "#1F2125" }}>{highlight}</span>{after}
            </p>
            <p className="mt-3 text-[13.5px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {t("home.caseStudyDesc2")}{" "}
              <span style={{ color: "#1F2125" }}>{t("home.caseStudyLaws")}</span>{" "}
              {t("home.caseStudyDesc2b")}
            </p>

            <div
              className="mt-4 h-[140px] overflow-hidden rounded-[10px]"
              style={{ border: "1px solid #E3E1DA" }}
            >
              <img
                src="/images/WF02_RAG_Knowledge_Intelligence.webp"
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
                className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold transition-all hover:opacity-80"
                style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
              >
                {t("home.viewCaseStudy")} <ArrowRight className="h-3.5 w-3.5" />
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
      top: "#34506E", left: "#1E3A52", right: "#284B64",
      glow: "rgba(52,80,110,0.25)", label: "AI Governance",
    },
    {
      ty: 62,
      top: "#4B7096", left: "#2E5070", right: "#3A6080",
      glow: "rgba(75,112,150,0.22)", label: "Knowledge Arch.",
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
          <stop offset="0%" stopColor="#34506E" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#34506E" stopOpacity="0" />
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
  const { t } = useTranslation("common");
  return (
    <section className="mt-5" aria-label="Proprietary AI frameworks">
      <div
        className="glass-card grid grid-cols-1 gap-10 p-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:p-12"
      >
        <div>
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "#8A8D93" }}
          >
            {t("home.frameworksLabel")}
          </div>
          <h2 className="mt-4 text-[28px] font-medium leading-tight lg:text-[34px]" style={{ color: "#1F2125" }}>
            {t("home.frameworksTitle")}
          </h2>
          <p className="mt-4 max-w-lg text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            {t("home.frameworksDesc")}
          </p>
          <Link
            to="/frameworks"
            className="mt-8 inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            {t("home.exploreFrameworks")} <ArrowRight className="h-4 w-4" />
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
          fill="#E9EFF4" stroke="#D7D4CC" strokeWidth="1.2" />
      </g>
      <g transform="rotate(-2.5 45 52)">
        <rect x="10" y="12" width="56" height="70" rx="5"
          fill="#E0E8F0" stroke="#C8D4DC" strokeWidth="1.2" />
      </g>
      <rect x="10" y="8" width="56" height="72" rx="5"
        fill="#EDEBE3" stroke="#34506E" strokeWidth="1.3" />
      <rect x="17" y="16" width="42" height="7" rx="3"
        fill="#D0DCEA" />
      <line x1="17" y1="31" x2="60" y2="31" stroke="#C8C5BD" strokeWidth="1.1" strokeLinecap="round" />
      <line x1="17" y1="39" x2="56" y2="39" stroke="#D0CEC8" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="47" x2="58" y2="47" stroke="#D0CEC8" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="55" x2="53" y2="55" stroke="#D8D6D0" strokeWidth="1" strokeLinecap="round" />
      <line x1="17" y1="63" x2="57" y2="63" stroke="#D8D6D0" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function GovernanceIllustration() {
  return (
    <svg viewBox="0 0 90 100" className="h-[90px] w-auto shrink-0 opacity-80" aria-hidden="true">
      <rect x="8" y="18" width="36" height="62" rx="3"
        fill="#E9EFF4" stroke="#34506E" strokeWidth="1.3" />
      <rect x="5" y="18" width="6" height="62" rx="2.5"
        fill="#B8C8D8" stroke="#34506E" strokeWidth="0.8" />
      <line x1="14" y1="34" x2="38" y2="34" stroke="#C8C5BD" strokeWidth="0.9" />
      <line x1="14" y1="42" x2="36" y2="42" stroke="#D0CEC8" strokeWidth="0.9" />
      <line x1="14" y1="50" x2="38" y2="50" stroke="#D0CEC8" strokeWidth="0.9" />
      <path d="M56 12 L78 18 L78 40 Q78 56 56 64 Q34 56 34 40 L34 18 Z"
        fill="#E9EFF4" stroke="#34506E" strokeWidth="1.4" />
      <polyline points="46,38 53,46 68,30"
        stroke="#34506E" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function AuthoritySection() {
  const { t } = useTranslation("common");
  return (
    <section className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2" aria-label="Research and thought leadership">

      {/* Publications */}
      <div className="glass-card p-7 lg:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col flex-1">
            <div
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#8A8D93" }}
            >
              {t("home.researchLabel")}
            </div>
            <div className="mt-4 text-[48px] font-medium leading-none text-gradient-brand">9+</div>
            <div className="mt-2 text-[15px] font-medium" style={{ color: "#1F2125" }}>
              {t("home.researchTitle")}
            </div>
            <p className="mt-2.5 text-[13px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {t("home.researchDesc")}
            </p>
            <Link
              to="/publications"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold"
              style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
            >
              {t("home.viewPublications")} <ArrowRight className="h-3.5 w-3.5" />
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
              className="text-[10px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: "#8A8D93" }}
            >
              {t("home.featuredInsightLabel")}
            </div>
            <div
              className="mt-4 inline-flex w-fit rounded-md px-2.5 py-1 text-[11px] font-semibold"
              style={{
                background: "#E9EFF4",
                border: "1px solid #D7D4CC",
                color: "#34506E",
              }}
            >
              {t("home.featuredInsightBadge")}
            </div>
            <h3 className="mt-3 text-[20px] font-medium leading-tight" style={{ color: "#1F2125" }}>
              {t("home.featuredInsightTitle")}
            </h3>
            <p className="mt-2.5 flex-1 text-[13px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {t("home.featuredInsightDesc")}
            </p>
            <Link
              to="/insights"
              className="mt-5 inline-flex w-fit items-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-semibold"
              style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
            >
              {t("home.readArticle")} <ArrowRight className="h-3.5 w-3.5" />
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

function AgentCard() {
  const { t } = useTranslation("common");
  const agentTopics = t("home.agentTopics", { returnObjects: true }) as string[];
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
      setAgentMsg(data.output || t("home.agentFallback"));
    } catch {
      setAgentMsg(t("home.agentError"));
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
          border: "1px solid #E3E1DA",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

          {/* LEFT */}
          <div className="p-8 lg:p-10">
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center"
              style={{
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                background: "#34506E",
              }}
            >
              <Bot className="h-6 w-6 text-white" />
            </div>

            <h2 className="text-[22px] font-medium" style={{ color: "#1F2125" }}>{t("home.agentTitle")}</h2>
            <p className="mt-2 max-w-[400px] text-[13.5px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {t("home.agentDesc")}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {agentTopics.map((topic) => (
                <button
                  key={topic}
                  onClick={() => sendQuery(topic)}
                  className="rounded-full px-3 py-1 text-[11.5px] font-medium transition-colors hover:bg-black/5"
                  style={{
                    background: "#E9EFF4",
                    border: "1px solid #D7D4CC",
                    color: "#5A5D63",
                  }}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — inline chat panel */}
          <div
            className="flex flex-col justify-between p-6"
            style={{ background: "#EDEBE3", borderLeft: "1px solid #E3E1DA" }}
          >
            <div className="min-h-[100px] overflow-y-auto">
              <div
                className="mb-4 text-[10px] font-semibold uppercase tracking-[0.2em]"
                style={{ color: "#8A8D93" }}
              >
                {t("home.agentLabel")}
              </div>

              {!userMsg && (
                <div
                  className="inline-block rounded-[12px] rounded-tl-none px-4 py-2.5 text-[13px] font-medium text-white"
                  style={{ background: "#34506E", maxWidth: "90%" }}
                >
                  {t("home.agentGreeting")}
                </div>
              )}

              {userMsg && (
                <div className="flex flex-col gap-3">
                  {/* User message */}
                  <div className="flex justify-end">
                    <div
                      className="rounded-[12px] rounded-tr-none px-3 py-2 text-[12.5px]"
                      style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#1F2125", maxWidth: "85%" }}
                    >
                      {userMsg}
                    </div>
                  </div>
                  {/* Agent response */}
                  {loading ? (
                    <div className="flex items-center gap-1.5 px-1" style={{ color: "#8A8D93" }}>
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full" style={{ background: "#34506E", animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full" style={{ background: "#34506E", animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full" style={{ background: "#34506E", animationDelay: "300ms" }} />
                    </div>
                  ) : agentMsg ? (
                    <div
                      className="inline-block rounded-[12px] rounded-tl-none px-4 py-2.5 text-[12.5px] leading-relaxed text-white"
                      style={{ background: "#34506E", maxWidth: "90%" }}
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
                placeholder={t("home.agentPlaceholder")}
                className="flex-1 rounded-[8px] px-3 py-2.5 text-[12.5px] outline-none"
                style={{
                  background: "#FAFAF8",
                  border: "1px solid #E3E1DA",
                  color: "#1F2125",
                  caretColor: "#34506E",
                }}
              />
              <button
                type="submit"
                disabled={loading}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] transition-opacity hover:opacity-90 disabled:opacity-40"
                style={{ background: "#34506E" }}
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
   8. EU AI ACT ASSESSMENT TEASER
   ============================================================ */

function AssessmentTeaser() {
  return (
    <section className="mt-5" aria-label="EU AI Act Risk Classifier">
      <div
        className="glass-card overflow-hidden"
        style={{
          border: "1px solid #E3E1DA",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left */}
          <div className="p-8 lg:p-10">
            <div
              className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{
                background: "#34506E",
                border: "1px solid #2A4159",
              }}
            >
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#34506E" }}>
              Free Compliance Tool
            </div>
            <h2 className="text-[20px] font-medium lg:text-[24px]" style={{ color: "#1F2125" }}>
              EU AI Act Risk Classifier
            </h2>
            <p className="mt-2 max-w-[440px] text-[13.5px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              Not sure if your AI system is High-Risk under Regulation (EU) 2024/1689?
              Take the free 5-minute assessment and get a tailored compliance roadmap.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["5 min assessment", "No sign-up", "Instant results", "Free to use"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full px-3 py-1 text-[11.5px] font-medium"
                  style={{
                    background: "#E9EFF4",
                    border: "1px solid #D7D4CC",
                    color: "#34506E",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Right */}
          <div
            className="flex flex-col justify-center p-6 lg:p-8"
            style={{
              background: "#EDEBE3",
              borderTop: "1px solid #E3E1DA",
            }}
          >
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#8A8D93" }}>
              Risk Tiers
            </div>
            {[
              { label: "Prohibited", color: "#DC2626", bg: "rgba(220,38,38,0.06)", icon: "⊘" },
              { label: "High Risk", color: "#C2410C", bg: "rgba(194,65,12,0.06)", icon: "⚠" },
              { label: "Limited Risk", color: "#92400E", bg: "rgba(146,64,14,0.06)", icon: "◎" },
              { label: "Minimal Risk", color: "#166534", bg: "rgba(22,101,52,0.06)", icon: "✦" },
            ].map(({ label, color, bg, icon }) => (
              <div
                key={label}
                className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2"
                style={{ background: bg, border: `1px solid ${color}28` }}
              >
                <span style={{ color, fontSize: 14 }}>{icon}</span>
                <span className="text-[12.5px] font-medium" style={{ color }}>{label}</span>
              </div>
            ))}
            <Link
              to={CLASSIFIER_ROUTE}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:opacity-90"
              style={{ background: "#34506E" }}
            >
              Start Free Assessment <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   9. FAQ SECTION — visible + schema-backed
   ============================================================ */

function HomeFaqSection() {
  const { t } = useTranslation("common");
  const faqItems = t("home.faq", { returnObjects: true }) as Array<{ q: string; a: string }>;
  return (
    <section className="mt-14 lg:mt-16" aria-label="Frequently asked questions">
      <div className="mb-8">
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "#8A8D93" }}
        >
          {t("home.faqLabel")}
        </div>
        <h2 className="mt-2.5 text-[28px] font-medium leading-tight lg:text-[34px]" style={{ color: "#1F2125" }}>
          {t("home.faqTitle")}
        </h2>
        <p className="mt-2 text-[14px]" style={{ color: "#5A5D63" }}>
          {t("home.faqDesc")}
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
              className="flex cursor-pointer list-none items-start justify-between gap-4 text-[13.5px] font-medium"
              style={{ userSelect: "none", color: "#1F2125" }}
            >
              <span>{item.q}</span>
              <ArrowRight
                className="mt-0.5 h-4 w-4 shrink-0 rotate-90 transition-transform group-open:rotate-[270deg]"
                style={{ color: "#34506E" }}
              />
            </summary>
            <p
              className="mt-3.5 text-[13px] leading-[1.7]"
              style={{ color: "#5A5D63" }}
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
  const { t, i18n } = useTranslation("common");
  const agentHref = i18n.language === "de" ? "/de/ai-agent" : "/ai-agent";
  return (
    <section className="mt-5 mb-5" aria-label="Contact call to action">
      <div
        className="glass-card grid grid-cols-1 items-center gap-6 p-7 lg:grid-cols-[1fr_auto] lg:gap-10 lg:p-9"
      >
        <div className="flex items-center gap-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
            }}
          >
            <Rocket className="h-6 w-6" style={{ color: "#34506E" }} />
          </div>
          <div>
            <h2 className="text-[22px] font-medium leading-tight lg:text-[26px]" style={{ color: "#1F2125" }}>
              {t("home.ctaTitle")}
            </h2>
            <p className="mt-1.5 text-[13.5px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              {t("home.ctaDesc")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90 whitespace-nowrap"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            {t("home.ctaViewWork")} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to={agentHref}
            className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:bg-black/5 whitespace-nowrap"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            <Bot className="h-4 w-4" /> {t("home.ctaTalkAgent")}
          </Link>
        </div>
      </div>
    </section>
  );
}
