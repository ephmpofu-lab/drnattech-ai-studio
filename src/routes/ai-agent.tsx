import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import {
  Bot,
  Brain,
  BookOpen,
  ChevronRight,
  Send,
  FileText,
  Layers,
  Network,
  MessageSquare,
  ArrowRight,
  Building2,
  Users,
  GraduationCap,
  Plus,
  Cpu,
  MapPin,
  Target,
  ShieldCheck,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";

/* ============================================================
   TYPES
   ============================================================ */

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
  sources?: string[];
};

/* ============================================================
   DEMO KNOWLEDGE BASE
   ============================================================ */

const DEMO_RESPONSES: Array<{
  keywords: string[];
  content: string;
  sources: string[];
}> = [
  {
    keywords: ["approach", "how do you", "design enterprise", "ai solution", "architect"],
    content:
      "I follow a system-first approach. I start by understanding the business problem, mapping processes and knowledge flows, then designing an architecture that is secure, scalable and measurable. I use my SKAIDO Framework and Three Structural Laws to ensure the solution is reliable, audit-friendly and built for long-term impact.",
    sources: ["SKAIDO Framework", "Three Structural Laws", "ACP Platform Case Study", "+ 3 more"],
  },
  {
    keywords: ["aisa", "strategic ai engagement", "aisa framework"],
    content:
      "The AISA Framework is my Strategic AI Engagement Framework — a six-phase methodology for moving organisations from business problem to production AI systems. The six phases are: Discovery, Architecture, Build, Validate, Deploy, and Scale. Every phase has defined inputs, outputs and quality gates to prevent the most common failure modes in AI projects.",
    sources: ["AISA Framework", "AI Strategy Methodology", "+ 2 more"],
  },
  {
    keywords: ["skaido", "implementation methodology", "lifecycle", "phases"],
    content:
      "SKAIDO is my end-to-end AI implementation methodology guiding the full project lifecycle: Business Problem → Architecture → Build → Validate → Deploy → Scale. Quality gates at each stage prevent the most common failure mode — building before the problem and architecture are fully understood.",
    sources: ["SKAIDO Framework", "Framework Suite Overview", "+ 1 more"],
  },
  {
    keywords: ["three structural laws", "structural laws", "prevent failure", "unmaintainable", "silent failure"],
    content:
      "The Three Structural Laws are architectural principles I created to prevent the three most common AI system failures: fraud, silent failure and unmaintainable systems. Every AI system I build is evaluated against these laws before deployment to ensure transparency, reliability and long-term governability in production.",
    sources: ["Three Structural Laws", "AI Governance Framework", "+ 2 more"],
  },
  {
    keywords: ["knowledge architecture", "rag", "retrieval", "knowledge system", "vector"],
    content:
      "Knowledge Architecture is one of my core specialisations — covering enterprise knowledge systems, retrieval systems, RAG, indexing, governance and knowledge engineering. I design knowledge architectures that enable AI systems to retrieve accurate, contextual and trusted information at scale, eliminating hallucination and building genuine enterprise trust.",
    sources: ["Knowledge Architecture Framework", "RAG System Design Guide", "+ 3 more"],
  },
  {
    keywords: ["project", "case study", "acp", "career", "portfolio", "built", "platform", "work"],
    content:
      "My flagship project is the ACP Career Intelligence Platform — a multi-agent RAG system delivering personalised career intelligence at scale. I've also built insurance claims triage agents, enterprise knowledge systems, intelligent automation platforms and multi-agent orchestration systems for enterprise clients in the DACH region.",
    sources: ["ACP Platform Case Study", "Knowledge Architecture System", "Multi-Agent Framework", "+ 4 more"],
  },
  {
    keywords: ["phd", "research", "boku", "academic", "university"],
    content:
      "I hold a PhD (NatTech) from BOKU University Vienna, Austria. My research background informs my systems thinking approach to AI architecture — bringing scientific rigour, evidence-based decision-making and research methodology to every enterprise AI engagement.",
    sources: ["Academic Background", "Research Publications", "BOKU Vienna", "+ 2 more"],
  },
  {
    keywords: ["multi-agent", "multi agent", "autonomous", "orchestration", "agent system"],
    content:
      "I design multi-agent systems where specialised AI agents coordinate, communicate and delegate tasks to achieve complex business objectives. My approach uses orchestration layers, tool management, memory systems and governance controls to ensure multi-agent systems behave reliably in production environments.",
    sources: ["Multi-Agent Architecture Guide", "SKAIDO Framework", "ACP Platform Case Study", "+ 3 more"],
  },
  {
    keywords: ["governance", "eu ai act", "compliance", "audit", "responsible ai"],
    content:
      "AI governance is a core architectural concern in everything I build. Using my Three Structural Laws framework, every AI system includes human-in-the-loop oversight, approval workflows, audit trails, escalation paths and EU AI Act readiness — built into the architecture from day one, not added as an afterthought.",
    sources: ["AI Governance Framework", "Three Structural Laws", "EU AI Act Readiness Guide", "+ 2 more"],
  },
  {
    keywords: ["transformation", "strategy", "start", "roadmap", "how should a company"],
    content:
      "The right starting point for AI transformation is not a technology choice — it is a business problem assessment. I use my AISA Framework to take organisations through structured discovery, identify the highest-value AI opportunities, and design a phased roadmap from first use case to scaled AI operations. Starting with architecture prevents the most expensive AI mistakes.",
    sources: ["AISA Framework", "AI Strategy Methodology", "Enterprise AI Roadmap", "+ 2 more"],
  },
];

const DEFAULT_RESPONSE = {
  content:
    "This is a demonstration of the Dr. NatTech AI Knowledge Agent. I can answer questions about the AISA Framework, SKAIDO Framework, Three Structural Laws, Knowledge Architecture, enterprise AI projects, research background and AI architecture strategy. Try asking about any of these topics — or book an AI Strategy Call for a personalised consultation.",
  sources: ["Knowledge Base Overview", "Framework Documentation", "Project Case Studies", "+ 5 more"],
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "user",
    content: "How do you approach designing an AI solution for an enterprise?",
  },
  {
    id: 2,
    role: "agent",
    content:
      "I follow a system-first approach. I start by understanding the business problem, mapping processes and knowledge flows, then designing an architecture that is secure, scalable and measurable. I use my SKAIDO Framework and Three Structural Laws to ensure the solution is reliable, audit-friendly and built for long-term impact.",
    sources: ["SKAIDO Framework", "Three Structural Laws", "ACP Platform Case Study", "+ 3 more"],
  },
];

const SUGGESTED = [
  "How does the AISA Framework work?",
  "What are the Three Structural Laws?",
  "How do you design enterprise AI systems?",
  "Tell me about the ACP Platform",
];

/* ============================================================
   STRUCTURED DATA (GEO + SEO)
   ============================================================ */

function AIAgentStructuredData() {
  const faq = [
    {
      q: "What is the difference between the AISA Framework and the SKAIDO Framework?",
      a: "The AISA Framework is the strategic engagement framework governing how Dr. Ephraim Mpofu engages with an organisation from first contact to production AI delivery. The SKAIDO Framework is the implementation methodology — the systematic process for delivering the technical AI system. AISA is the strategic wrapper; SKAIDO is the implementation engine.",
    },
    {
      q: "What makes this AI Agent different from generic AI tools?",
      a: "The Dr. NatTech AI Agent is trained on Dr. Ephraim Mpofu's proprietary frameworks, real project case studies, methodologies and enterprise AI architecture expertise. Unlike generic AI tools, it provides expert-level answers grounded in real enterprise AI implementations, cites its sources, and applies framework-based reasoning to every response.",
    },
    {
      q: "How does Dr. Mpofu approach enterprise AI architecture?",
      a: "Dr. Ephraim Mpofu uses a system-first approach: he starts with business problem understanding, maps processes and knowledge flows, then designs a governed architecture using the SKAIDO Framework and Three Structural Laws. Every system is designed for production reliability, auditability and long-term maintainability.",
    },
    {
      q: "Can this AI Agent help with AI strategy and transformation?",
      a: "Yes. The AI Agent can explain Dr. Mpofu's approach to AI transformation, discuss the AISA Framework methodology, outline how to assess AI readiness, and guide thinking about enterprise AI roadmaps. For a personalised strategy engagement, an AI Strategy Call is recommended.",
    },
    {
      q: "What is Knowledge Architecture in enterprise AI?",
      a: "Knowledge Architecture, as defined by Dr. Ephraim Mpofu, is a methodology for designing enterprise knowledge systems covering knowledge organisation, retrieval systems, RAG implementation, indexing, governance and knowledge engineering — enabling AI systems to retrieve accurate, contextual and trusted information rather than hallucinating answers.",
    },
    {
      q: "What AI consulting and architecture services are available in Vienna and Austria?",
      a: "Dr. Ephraim Mpofu offers AI Solutions Architecture consulting in Vienna, Austria and across the DACH region — including enterprise AI strategy, AI system architecture, multi-agent system design, RAG and knowledge system implementation, intelligent workflow automation, AI governance, EU AI Act compliance and AI transformation advisory.",
    },
  ];

  const json = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://drnattech.com/ai-agent#webpage",
        url: "https://drnattech.com/ai-agent",
        name: "Dr. NatTech AI Agent — AI Knowledge System, Vienna",
        description:
          "An AI agent trained on Dr. Ephraim Mpofu's proprietary frameworks, methodologies and enterprise AI expertise. Ask about AI architecture, AISA, SKAIDO, knowledge systems and AI strategy.",
        about: { "@id": "https://drnattech.com/#person" },
        inLanguage: "en",
      },
      {
        "@type": "FAQPage",
        "@id": "https://drnattech.com/ai-agent#faq",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://drnattech.com/ai-agent#agent",
        name: "Dr. NatTech AI Agent",
        applicationCategory: "AI Knowledge System",
        description:
          "Dr. Ephraim Mpofu has a publicly accessible AI agent — one of very few independent AI architects globally to offer this. The agent is trained on his proprietary SKAIDO, AISA and Three Structural Laws frameworks, real enterprise AI case studies (insurance claims AI, RAG knowledge platforms, multi-agent systems), EU AI Act compliance methodology and consulting approach. Available 24/7 at drnattech.com/ai-agent. Based in Vienna, Austria, serving DACH and EU enterprises.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/ai-agent",
        availabilityStarts: "2026-01-01",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
          description: "Free to access — no registration required",
        },
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
   ROUTE
   ============================================================ */

export const Route = createFileRoute("/ai-agent")({
  head: () => ({
    meta: [
      {
        title:
          "Dr. NatTech AI Agent | Ask an Enterprise AI Expert 24/7 | AI Architecture Advisor Vienna",
      },
      {
        name: "description",
        content:
          "Dr. Ephraim Mpofu is one of very few independent AI architects with a publicly accessible, production-deployed AI agent. Ask about SKAIDO, AISA, RAG systems, EU AI Act compliance, multi-agent architecture and enterprise AI implementation — trained on real case studies and proprietary frameworks. Available 24/7, based in Vienna.",
      },
      {
        property: "og:title",
        content:
          "Dr. NatTech AI Agent | Enterprise AI Expert 24/7 | KI-Architekt Vienna",
      },
      {
        property: "og:description",
        content:
          "One of very few independent AI architects with a live, publicly accessible AI agent. Ask about SKAIDO, AISA, RAG, EU AI Act, multi-agent systems and enterprise AI implementation. Available 24/7.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://drnattech.com/ai-agent" },
      {
        property: "og:image",
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Dr. NatTech AI Agent | Enterprise AI Expert 24/7 | Vienna",
      },
      {
        name: "twitter:description",
        content:
          "One of very few independent AI architects with a deployed public AI agent. Ask about enterprise AI, SKAIDO, RAG, EU AI Act — 24/7.",
      },
      {
        name: "keywords",
        content:
          "AI agent consultant, enterprise AI advisor, AI architecture chatbot, 24/7 AI advisor, AI expert online, SKAIDO framework, AISA framework, enterprise AI expert Vienna, KI-Berater Wien, KI-Agent, AI business advisor, ask AI architect, AI consulting demo",
      },
      { name: "robots", content: "index, follow" },
    ],
    links: [
      { rel: "canonical", href: "https://drnattech.com/ai-agent" },
      {
        rel: "alternate",
        hreflang: "en",
        href: "https://drnattech.com/ai-agent",
      },
      {
        rel: "alternate",
        hreflang: "de",
        href: "https://drnattech.com/de/ai-agent",
      },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: "https://drnattech.com/ai-agent",
      },
    ],
  }),
  component: AIAgentPage,
});

/* ============================================================
   PAGE SHELL
   ============================================================ */

export function AIAgentPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <AIAgentStructuredData />
      <BrandBackground />
      <SiteNav active="AI Agent" />
      <main className="mx-auto max-w-[1080px] px-6 pt-12 pb-16 lg:px-10">
        <AuthorityHero />
        <ChatSection />
        <KnowledgeTransparency />
        <FaqAndCta />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ============================================================
   1. AUTHORITY HERO  (55 / 45 balance)
   ============================================================ */

function AuthorityHero() {
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
      {/* Left — copy */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.28)",
              color: "#C4B5FD",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#A855F7", boxShadow: "0 0 8px #A855F7" }}
            />
            AI AGENT · LIVE
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold"
            style={{
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.28)",
              color: "#34D399",
            }}
          >
            Free · No Registration · 24/7
          </span>
        </div>

        <h1 className="mt-5 text-[42px] font-bold leading-[1.06] tracking-tight text-white sm:text-[50px] lg:text-[54px]">
          Ask My AI. Access Enterprise AI Expertise{" "}
          <span
            style={{
              background: "linear-gradient(90deg, #A855F7, #C4B5FD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            in Real Time.
          </span>
        </h1>

        <p
          className="mt-4 max-w-[520px] text-[16px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          One focused purpose: let the AI agent answer your enterprise AI questions
          from a grounded, prioritized knowledge base. No distractions, no generic
          noise — only expert insight from proprietary frameworks, case studies
          and compliance architecture.
        </p>

        <p
          className="mt-3 max-w-[480px] text-[13.5px] leading-relaxed"
          style={{ color: "#6B7280" }}
        >
          Ask about: AI architecture, RAG knowledge systems, SKAIDO, AISA, Three
          Structural Laws, EU AI Act readiness, insurance AI, multi-agent design,
          and enterprise AI strategy.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("chat-section");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <MessageSquare className="h-4 w-4" />
            Start a Conversation
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            Book Strategy Call
          </Link>
        </div>
      </div>

      {/* Right — agent visual */}
      <AgentVisual />
    </section>
  );
}

function AgentVisual() {
  const SIZE = 260;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const RADIUS = 96;

  const nodes = [
    { icon: Layers,      label: "Frameworks",   color: "#A855F7", angle: -90 },
    { icon: Building2,   label: "Projects",     color: "#60A5FA", angle: -30 },
    { icon: ShieldCheck, label: "Governance",   color: "#34D399", angle:  30 },
    { icon: Brain,       label: "Research",     color: "#F59E0B", angle:  90 },
    { icon: Network,     label: "Architecture", color: "#C4B5FD", angle: 150 },
    { icon: Target,      label: "Strategy",     color: "#F472B6", angle: 210 },
  ];

  function nodePos(angle: number) {
    const rad = (angle * Math.PI) / 180;
    return { x: CX + RADIUS * Math.cos(rad), y: CY + RADIUS * Math.sin(rad) };
  }

  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl py-8"
      style={{
        background: "rgba(10,14,34,0.85)",
        border: "1px solid rgba(139,92,246,0.18)",
      }}
    >
      <style>{`
        @keyframes agentPulse {
          0%, 100% { box-shadow: 0 0 40px 8px rgba(168,85,247,0.45); }
          50%       { box-shadow: 0 0 70px 18px rgba(168,85,247,0.7); }
        }
        @keyframes nodePing {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.12); }
        }
      `}</style>

      {/* Atmospheric radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 48%, rgba(168,85,247,0.16) 0%, transparent 68%)",
        }}
      />

      {/* Neural-network SVG */}
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          width={SIZE}
          height={SIZE}
          className="absolute inset-0"
          style={{ overflow: "visible" }}
        >
          <defs>
            {nodes.map((n) => {
              const p = nodePos(n.angle);
              return (
                <path
                  key={`def-${n.label}`}
                  id={`mp-${n.label}`}
                  d={`M ${p.x} ${p.y} L ${CX} ${CY}`}
                />
              );
            })}
          </defs>

          {/* Connection lines */}
          {nodes.map((n, i) => {
            const p = nodePos(n.angle);
            return (
              <line
                key={`line-${i}`}
                x1={p.x} y1={p.y}
                x2={CX}  y2={CY}
                stroke={n.color}
                strokeWidth="1"
                strokeOpacity="0.22"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Animated data pulses — travel from node → centre */}
          {nodes.map((n, i) => (
            <circle key={`pulse-${i}`} r="2.5" fill={n.color} opacity="0.85">
              <animateMotion
                dur="2.2s"
                repeatCount="indefinite"
                begin={`${i * 0.37}s`}
              >
                <mpath href={`#mp-${n.label}`} />
              </animateMotion>
            </circle>
          ))}
        </svg>

        {/* Knowledge nodes */}
        {nodes.map((n) => {
          const p = nodePos(n.angle);
          const IconEl = n.icon;
          return (
            <div
              key={n.label}
              className="absolute flex flex-col items-center"
              style={{ left: p.x - 20, top: p.y - 20 }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full"
                style={{
                  background: `${n.color}16`,
                  border: `1px solid ${n.color}45`,
                  boxShadow: `0 0 14px ${n.color}28`,
                  animation: `nodePing 3s ease-in-out infinite`,
                  animationDelay: `${nodes.indexOf(n) * 0.5}s`,
                }}
              >
                <IconEl style={{ width: 16, height: 16, color: n.color }} />
              </div>
            </div>
          );
        })}

        {/* Central bot orb */}
        <div
          className="absolute flex items-center justify-center rounded-full"
          style={{
            width: 88,
            height: 88,
            left: CX - 44,
            top: CY - 44,
            background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
            animation: "agentPulse 2.6s ease-in-out infinite",
          }}
        >
          <Bot style={{ width: 40, height: 40, color: "white" }} />
        </div>
      </div>

      {/* Identity */}
      <div className="relative mt-4 text-[16px] font-bold text-white">
        Dr. NatTech AI Agent
      </div>
      <div className="relative mt-1.5 flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "#10B981", boxShadow: "0 0 8px #10B981" }}
        />
        <span className="text-[12px] font-semibold" style={{ color: "#10B981" }}>
          Online · Knowledge-Grounded
        </span>
      </div>
    </div>
  );
}


/* ============================================================
   3. CHAT SECTION
   ============================================================ */

function ChatSection() {
  return (
    <section id="chat-section" className="mt-8 grid gap-4 lg:grid-cols-[1fr_292px]">
      <ChatInterface />
      <WhatYouCanAsk />
    </section>
  );
}

/* What You Can Ask — right sidebar */
function WhatYouCanAsk() {
  const categories = [
    { icon: Layers, title: "Frameworks", sub: "My proprietary frameworks" },
    { icon: Building2, title: "Projects", sub: "Real implementations & results" },
    { icon: Network, title: "AI Architecture", sub: "Systems, patterns & design" },
    { icon: Target, title: "AI Strategy", sub: "Enterprise AI & transformation" },
    { icon: GraduationCap, title: "Research", sub: "PhD research & publications" },
    { icon: Cpu, title: "Technical Expertise", sub: "Tools, stacks & methodologies" },
  ];

  return (
    <div className="glass-card overflow-hidden">
      <div
        className="px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em]"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          color: "#9CA3AF",
        }}
      >
        You can ask me about
      </div>
      {categories.map((cat, i) => (
        <div
          key={cat.title}
          className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-white/[0.025]"
          style={{
            borderBottom:
              i < categories.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
        >
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "rgba(139,92,246,0.10)",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <cat.icon className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold text-white">{cat.title}</div>
            <div className="text-[10.5px]" style={{ color: "#6B7280" }}>
              {cat.sub}
            </div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: "#4B5563" }} />
        </div>
      ))}
    </div>
  );
}

/* Chat Welcome State — shown when no messages yet */
function ChatWelcomeState({ onSuggest }: { onSuggest: (q: string) => void }) {
  const suggestions = [
    { icon: Layers,      text: "How does the AISA Framework work?",        color: "#C4B5FD" },
    { icon: ShieldCheck, text: "What are the Three Structural Laws?",       color: "#34D399" },
    { icon: Building2,   text: "Tell me about the ACP Career Platform",     color: "#60A5FA" },
    { icon: Brain,       text: "How do you approach enterprise AI design?", color: "#F59E0B" },
    { icon: Network,     text: "What is Knowledge Architecture?",           color: "#A855F7" },
  ];

  return (
    <div className="flex flex-col items-center px-5 py-5">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 24px 4px rgba(168,85,247,0.35); }
          50%       { box-shadow: 0 0 44px 10px rgba(168,85,247,0.6); }
        }
      `}</style>

      {/* Animated bot orb */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          animation: "softPulse 2.4s ease-in-out infinite",
        }}
      >
        <Bot className="h-7 w-7 text-white" />
      </div>

      <div className="text-[15px] font-bold text-white">What would you like to know?</div>
      <div className="mt-1 mb-5 text-[12px]" style={{ color: "#6B7280" }}>
        Ask about frameworks, projects or expertise
      </div>

      <div className="w-full space-y-2">
        {suggestions.map((s, i) => (
          <button
            key={s.text}
            onClick={() => onSuggest(s.text)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-all hover:bg-white/[0.04]"
            style={{
              background: "rgba(255,255,255,0.025)",
              border: "1px solid rgba(255,255,255,0.08)",
              animation: "fadeSlideUp 0.4s ease both",
              animationDelay: `${i * 75}ms`,
            }}
          >
            <s.icon className="h-4 w-4 shrink-0" style={{ color: s.color }} />
            <span className="text-[13px] text-white">{s.text}</span>
            <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0" style={{ color: "#4B5563" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* Chat Interface */
function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  function findResponse(text: string) {
    const lower = text.toLowerCase();
    for (const r of DEMO_RESPONSES) {
      if (r.keywords.some((k) => lower.includes(k))) return r;
    }
    return DEFAULT_RESPONSE;
  }

  function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: nextId.current++, role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    const resp = findResponse(text);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "agent", content: resp.content, sources: resp.sources },
      ]);
      setIsTyping(false);
    }, 900 + Math.random() * 700);
  }

  function handleKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <div className="glass-card flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-bold text-white">Chat with My AI Agent</div>
            <div className="text-[10.5px]" style={{ color: "#9CA3AF" }}>
              Accurate answers backed by my knowledge base.
            </div>
          </div>
        </div>
        <button
          onClick={() => { setMessages([]); nextId.current = 1; }}
          className="rounded-lg px-3 py-1.5 text-[11px] transition-colors hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF" }}
        >
          Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "380px" }}
      >
        {messages.length === 0 ? (
          <ChatWelcomeState onSuggest={sendMessage} />
        ) : null}
        <div className="space-y-4 px-5 py-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "agent" ? (
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              >
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
            ) : (
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <Users className="h-3.5 w-3.5" style={{ color: "#9CA3AF" }} />
              </div>
            )}
            <div className={`flex max-w-[82%] flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className="rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed text-white"
                style={
                  msg.role === "user"
                    ? { background: "rgba(139,92,246,0.18)", border: "1px solid rgba(139,92,246,0.28)" }
                    : { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }
                }
              >
                {msg.content}
              </div>
              {msg.sources && (
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  <span className="text-[10.5px]" style={{ color: "#6B7280" }}>Sources:</span>
                  {msg.sources.map((s) => (
                    <span
                      key={s}
                      className="inline-flex rounded-full px-2 py-0.5 text-[10.5px] font-medium"
                      style={{
                        background: "rgba(139,92,246,0.12)",
                        color: "#C4B5FD",
                        border: "1px solid rgba(139,92,246,0.2)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
            >
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div
              className="rounded-xl px-4 py-2.5"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className="flex items-center gap-1">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 rounded-full animate-bounce"
                    style={{ background: "#A855F7", animationDelay: `${delay}ms` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={endRef} />
        </div>
      </div>

      {/* Suggested chips — only shown when conversation has started */}
      {messages.length > 0 && (
      <div
        className="flex gap-2 overflow-x-auto px-5 py-2.5"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {SUGGESTED.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isTyping}
            className="shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-all disabled:opacity-40"
            style={{
              background: "rgba(139,92,246,0.08)",
              border: "1px solid rgba(139,92,246,0.18)",
              color: "#C4B5FD",
              whiteSpace: "nowrap",
            }}
          >
            {q}
          </button>
        ))}
      </div>
      )}

      {/* Input */}
      <div className="px-5 py-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-2.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}
        >
          <input
            className="flex-1 bg-transparent text-[13.5px] text-white outline-none placeholder:text-gray-500"
            placeholder="Ask anything about my work, frameworks, projects or experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-40 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            <Send className="h-3 w-3 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   4. KNOWLEDGE TRANSPARENCY — real document inventory
   ============================================================ */

function KnowledgeTransparency() {
  const layer1Docs = [
    { num: "01", title: "Master Professional Profile", desc: "Core identity, positioning and professional overview" },
    { num: "02", title: "Career Journey", desc: "Career arc, key decisions and professional evolution" },
    { num: "03", title: "AI Solutions Architecture Philosophy", desc: "Architectural principles, frameworks and design thinking" },
    { num: "04", title: "Leadership Philosophy", desc: "Leadership approach, team dynamics and decision-making" },
    { num: "05", title: "Technical Expertise", desc: "Tools, stacks, methodologies and technical depth" },
    { num: "06", title: "Professional Experience", desc: "Engagements, roles and project outcomes" },
    { num: "07", title: "Education & Intelligence", desc: "PhD, academic background and research methodology" },
  ];

  const layer2Docs = [
    { title: "Insurance Claims Intelligence Platform", badge: "Case Study", color: "#A855F7" },
    { title: "Career Intelligence Operating System", badge: "Case Study", color: "#10B981" },
    { title: "Knowledge Architecture Operating System", badge: "Case Study", color: "#60A5FA" },
    { title: "Insights & Thought Leadership", badge: "Articles", color: "#F59E0B" },
  ];

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#A855F7" }}
          >
            KNOWLEDGE TRANSPARENCY
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-semibold"
            style={{
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#34D399",
            }}
          >
            <ShieldCheck className="h-3 w-3" />
            Governance Pillar
          </span>
        </div>
        <h2 className="mt-2 text-[22px] font-bold text-white">
          What powers this agent — fully disclosed.
        </h2>
        <p
          className="mt-3 max-w-[680px] text-[14px] leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Transparency is a core pillar of AI governance. Below is the exact knowledge base
          this agent retrieves answers from — curated, owner-authored documents, not scraped
          internet data. Every answer can be traced to a source layer.
        </p>
      </div>

      {/* Two-column table — L1 left, L2 right */}
      <div
        className="overflow-hidden rounded-xl lg:grid lg:grid-cols-[3fr_2fr]"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* L1 — Core Identity */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)" }}>
          <div
            className="flex items-center gap-2.5 px-5 py-3.5"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(139,92,246,0.06)",
            }}
          >
            <span
              className="inline-flex h-5 w-7 items-center justify-center rounded text-[9px] font-bold"
              style={{ background: "rgba(139,92,246,0.22)", color: "#C4B5FD" }}
            >
              L1
            </span>
            <span className="text-[13px] font-bold text-white">Core Identity Layer</span>
            <span className="ml-auto text-[11px]" style={{ color: "#6B7280" }}>
              7 documents
            </span>
          </div>
          {layer1Docs.map((doc, i) => (
            <div
              key={doc.num}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                borderBottom:
                  i < layer1Docs.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <span
                className="w-6 shrink-0 text-[11px] font-semibold tabular-nums"
                style={{ color: "#C4B5FD" }}
              >
                {doc.num}
              </span>
              <span className="text-[13px] text-white">{doc.title}</span>
            </div>
          ))}
        </div>

        {/* L2 — Project Intelligence */}
        <div>
          <div
            className="flex items-center gap-2.5 px-5 py-3.5"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(16,185,129,0.04)",
            }}
          >
            <span
              className="inline-flex h-5 w-7 items-center justify-center rounded text-[9px] font-bold"
              style={{ background: "rgba(16,185,129,0.18)", color: "#34D399" }}
            >
              L2
            </span>
            <span className="text-[13px] font-bold text-white">Project Intelligence Layer</span>
            <span className="ml-auto text-[11px]" style={{ color: "#6B7280" }}>
              4 documents
            </span>
          </div>
          {layer2Docs.map((doc, i) => (
            <div
              key={doc.title}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                borderBottom:
                  i < layer2Docs.length - 1
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "none",
              }}
            >
              <FileText
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: doc.color }}
              />
              <span className="min-w-0 flex-1 text-[13px] text-white">
                {doc.title}
              </span>
              <span
                className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                style={{
                  background: `${doc.color}18`,
                  border: `1px solid ${doc.color}30`,
                  color: doc.color,
                }}
              >
                {doc.badge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Governance footer */}
      <div
        className="mt-3 flex flex-wrap items-center gap-3 rounded-xl px-5 py-3"
        style={{
          background: "rgba(16,185,129,0.05)",
          border: "1px solid rgba(16,185,129,0.15)",
        }}
      >
        <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "#34D399" }} />
        <span className="text-[12px] font-semibold" style={{ color: "#34D399" }}>
          Knowledge Governance
        </span>
        <span className="text-[11.5px]" style={{ color: "#6B7280" }}>
          All 11 documents are owner-authored and verified · No scraped or third-party data · Vector-indexed for precision retrieval
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   5. HOW IT WORKS + WHO THIS IS FOR (2-column)
   ============================================================ */




/* ============================================================
   7. FAQ + CTA (65 / 35 split)
   ============================================================ */

function FaqAndCta() {
  const faqs = [
    {
      q: "What can I ask the Dr. NatTech AI Agent?",
      a: "You can ask about: Dr. Ephraim Mpofu's SKAIDO Framework (six-phase AI implementation methodology), AISA Framework (strategic AI engagement framework), Three Structural Laws (architectural principles preventing AI failure), Knowledge Architecture (enterprise RAG and retrieval system design), real case studies (insurance claims AI, career intelligence platform, knowledge management systems), EU AI Act compliance and high-risk AI classification, multi-agent AI system design, RAG and vector database implementation, PhD research background (Dr.nat.techn., BOKU Vienna), enterprise AI strategy for DACH and EU enterprises, and how to get started with enterprise AI. The agent is available 24/7, free of charge, with no registration required.",
    },
    {
      q: "What is the difference between the AISA Framework and the SKAIDO Framework?",
      a: "The AISA Framework governs the strategic engagement — from first contact to production AI delivery. The SKAIDO Framework is the implementation methodology — the systematic process for delivering the technical AI system. AISA is the strategic wrapper; SKAIDO is the implementation engine.",
    },
    {
      q: "What makes this AI Agent different from generic AI tools like ChatGPT?",
      a: "This agent is trained specifically on Dr. Mpofu's proprietary frameworks, real enterprise AI case studies, methodologies and expertise — not general internet data. It provides expert-level answers grounded in actual production systems, cites its sources and applies framework-based reasoning to every response. It is one of very few deployed AI agents by an independent AI architect — a live proof of the same multi-agent and knowledge architecture expertise Dr. Mpofu applies in client engagements.",
    },
    {
      q: "How does Dr. Mpofu approach enterprise AI architecture?",
      a: "Dr. Ephraim Mpofu uses a system-first approach: start with the business problem, map processes and knowledge flows, then design a governed architecture using the SKAIDO Framework and Three Structural Laws. Every system is built for production reliability, auditability, EU AI Act compliance and long-term maintainability. He has been formally building enterprise AI systems since January 2026, with a PhD (Dr.nat.techn.) from BOKU University Vienna as the scientific foundation.",
    },
    {
      q: "Can the AI Agent help with EU AI Act compliance questions?",
      a: "Yes. The agent can explain what EU AI Act compliance means for different AI system types, which systems are classified as high-risk (including insurance AI, CV screening AI, and financial decision AI), what audit trail, human-in-the-loop and transparency requirements apply, and how Dr. Mpofu's architectural approach embeds compliance from day one. For a personalised EU AI Act compliance assessment, book an AI Strategy Call.",
    },
    {
      q: "Is Dr. Ephraim Mpofu available for AI consulting in Germany, Austria and Switzerland (DACH)?",
      a: "Yes. Dr. Ephraim Mpofu is based in Vienna, Austria and serves enterprises across the DACH region (Deutschland, Österreich, Schweiz) and the wider EU. He designs KI-Systeme (AI systems) that meet EU AI Act (EU KI-Verordnung), GDPR and Austrian regulatory requirements. German-language consultation and technical documentation are available. His AI agent is also accessible 24/7 for initial questions in German.",
    },
  ];

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_340px]">
      {/* FAQ — <details>/<summary> so all answers are always in DOM for crawlers */}
      <div>
        <h3 className="text-[20px] font-bold text-white">Frequently Asked Questions</h3>
        <div className="mt-4 space-y-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group glass-card overflow-hidden"
            >
              <summary
                className="flex cursor-pointer list-none items-start justify-between gap-4 px-5 py-3.5"
                style={{ userSelect: "none" }}
              >
                <span className="text-[13.5px] font-semibold text-white">{f.q}</span>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-45"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                >
                  <Plus className="h-3 w-3" style={{ color: "#A855F7" }} />
                </span>
              </summary>
              <div
                className="px-5 pb-3.5 text-[13px] leading-relaxed"
                style={{ color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="pt-2.5">{f.a}</div>
              </div>
            </details>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className="relative overflow-hidden rounded-2xl p-5 flex flex-col"
        style={{
          background: "linear-gradient(135deg, rgba(139,92,246,0.11), rgba(168,85,247,0.05))",
          border: "1px solid rgba(139,92,246,0.2)",
        }}
      >
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[150px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #A855F7, transparent 70%)" }}
        />
        <div className="relative flex flex-1 flex-col">
          <div
            className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: "rgba(139,92,246,0.14)",
              border: "1px solid rgba(139,92,246,0.26)",
              color: "#C4B5FD",
            }}
          >
            START A CONVERSATION
          </div>

          <h3 className="mt-4 text-[20px] font-bold leading-tight text-white">
            Ready to explore how I can help your organisation?
          </h3>

          <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "#9CA3AF" }}>
            Ask my AI agent anything about my frameworks, expertise and approach — or book an AI Strategy Call to discuss your challenges directly.
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
            >
              <MessageSquare className="h-4 w-4" />
              Ask My AI Agent
            </button>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.13)" }}
            >
              Book AI Strategy Call <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="mt-4 flex items-center gap-1.5 text-[10.5px]"
            style={{ color: "#6B7280" }}
          >
            <MapPin className="h-3 w-3" style={{ color: "#A855F7" }} />
            AI Solutions Architect · Vienna, Austria · DACH & Remote
          </div>
        </div>
      </div>
    </section>
  );
}

