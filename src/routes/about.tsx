import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart2,
  BookOpen,
  Bot,
  Brain,
  Boxes,
  Clock,
  ExternalLink,
  Layers,
  Puzzle,
  Rocket,
  Server,
  ShieldCheck,
  TrendingUp,
  Zap,
  type LucideIcon,
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
   FAQ DATA — schema-backed (structured data only, not visible)
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
          "Governance Research",
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
   3. CORE COMPETENCIES
   ============================================================ */

const COMPETENCY_CATEGORIES = [
  {
    id: "ml",
    Icon: Brain,
    category: "AI & ML Engineering",
    skills: ["Python", "PyTorch", "TensorFlow", "Deep Learning", "CNNs", "Computer Vision", "YOLO", "NLP", "LLMs", "RAG", "Feature Engineering"],
  },
  {
    id: "agentic",
    Icon: Zap,
    category: "Agentic & Workflow AI",
    skills: ["LangGraph", "n8n", "Multi-Agent Systems", "MCP", "Vector Databases", "Workflow Automation", "Supabase"],
  },
  {
    id: "cloud",
    Icon: Server,
    category: "Cloud AI & MLOps",
    skills: ["Azure AI (AI-103)", "Azure ML", "MLOps", "Docker", "CI/CD", "FastAPI", "ONNX", "Model Deployment"],
  },
  {
    id: "data",
    Icon: BarChart2,
    category: "Data Science & Analytics",
    skills: ["Power BI", "Statistical Modelling", "Data Visualisation", "SQL", "Pandas", "NumPy", "PoC Design", "Business Intelligence"],
  },
  {
    id: "governance",
    Icon: ShieldCheck,
    category: "AI Governance & Compliance",
    skills: ["EU AI Act", "ISO/IEC 42001", "DSGVO", "Responsible AI", "Risk Classification", "Compliance Strategy"],
  },
  {
    id: "research",
    Icon: BookOpen,
    category: "Research & Knowledge Translation",
    skills: ["9 SCI Publications", "Technical Training", "Systems Thinking", "Scientific Documentation"],
  },
] as const;

function CompetencyCard({
  category,
  Icon,
  skills,
}: {
  category: string;
  Icon: LucideIcon;
  skills: readonly string[];
}) {
  return (
    <div
      className="flex flex-col rounded-[18px] p-6"
      style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
    >
      <div
        className="text-center text-[10.5px] font-bold uppercase tracking-[0.18em]"
        style={{ color: "#1F2125" }}
      >
        {category}
      </div>

      <div className="my-5 flex items-center justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
        >
          <Icon className="h-7 w-7" style={{ color: "#34506E" }} />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-1.5">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium"
            style={{ background: "#FAFAF8", border: "1px solid #E3E1DA", color: "#1F2125" }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

function CoreCompetencies() {
  const ref = useScrollReveal<HTMLElement>(100);
  return (
    <section ref={ref} className="mt-10 lg:mt-12" aria-label="Core competencies">
      <div className="mb-7">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ color: "#8A8D93" }}
        >
          Core Competencies
        </div>
        <h2
          className="mt-2 text-[28px] font-medium lg:text-[34px]"
          style={{ color: "#1F2125" }}
        >
          What I Build With
        </h2>
        <p
          className="mt-2 max-w-xl text-[14px]"
          style={{ color: "#5A5D63" }}
        >
          Six capability domains — from model engineering through governance — applied across every enterprise AI engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPETENCY_CATEGORIES.map((c) => (
          <CompetencyCard key={c.id} {...c} />
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   4. AI STRATEGY LINK
   ============================================================ */

function AiStrategyLink() {
  return (
    <div
      className="mt-4 flex flex-col gap-4 rounded-[16px] px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
      style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
    >
      <div>
        <div
          className="text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#34506E" }}
        >
          My Methodology
        </div>
        <p className="mt-0.5 text-[13.5px] leading-snug" style={{ color: "#5A5D63" }}>
          These competencies are applied through AISA — a structured 6-phase enterprise AI methodology covering Discover, Govern, Architect, Build, Deploy and Operate.
        </p>
      </div>
      <Link
        to="/aisa"
        className="inline-flex shrink-0 items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold transition-all hover:opacity-90"
        style={{ background: "#34506E", color: "#FAFAF8" }}
      >
        Explore AI Strategy <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

/* ============================================================
   5. PROFESSIONAL BACKGROUND & VERIFIED CREDENTIALS
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
  { year: "2021–2025", degree: "PhD (Dr.nat.techn.)", field: "Governance Research", inst: "BOKU University Vienna", color: "#34506E" },
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
    <section ref={ref} className="mt-10 space-y-4" aria-label="Professional background and credentials">
      <WorldMap />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1fr]">
        <EducationTimeline />
        <Certifications />
      </div>
    </section>
  );
}

/* ============================================================
   6. FINAL CTA
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

/* ============================================================
   PAGE — Hero → Metrics → Competencies → Methodology → Background → CTA
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
        <CoreCompetencies />
        <AiStrategyLink />
        <BackgroundSection />
        <CTA />
        <SiteFooter />
      </main>
    </div>
  );
}
