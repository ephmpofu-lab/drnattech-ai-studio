import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  Bot,
  Brain,
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

/* ============================================================
   TYPES
   ============================================================ */

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
};

const SUGGESTED_FALLBACK = [
  "What AI systems have you built?",
  "Tell me about your EU AI Act experience",
  "What is your technical background?",
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
        content: "https://drnattech.com/images/Dr%20Mpofu_purple2.webp",
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
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <AIAgentStructuredData />
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
  const { t } = useTranslation("common");
  return (
    <section className="grid items-center gap-8 lg:grid-cols-[1fr_400px] lg:gap-10">
      {/* Left — copy */}
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em]"
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
            {t("aiAgent.liveBadge")}
          </span>
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-[10.5px] font-semibold"
            style={{
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.28)",
              color: "#059669",
            }}
          >
            {t("aiAgent.freeBadge")}
          </span>
        </div>

        <h1 className="mt-5 text-[42px] font-medium leading-[1.06] tracking-tight sm:text-[50px] lg:text-[54px]" style={{ color: "#1F2125" }}>
          {t("aiAgent.heroTitle1")}{" "}
          <span style={{ color: "#34506E" }}>
            {t("aiAgent.heroTitle2")}
          </span>
        </h1>

        <p
          className="mt-4 max-w-[520px] text-[16px] leading-relaxed"
          style={{ color: "#5A5D63" }}
        >
          {t("aiAgent.heroDesc")}
        </p>

        <p
          className="mt-3 max-w-[480px] text-[13.5px] leading-relaxed"
          style={{ color: "#8A8D93" }}
        >
          {t("aiAgent.heroSub")}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("chat-section");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-80"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            <MessageSquare className="h-4 w-4" />
            {t("aiAgent.startConversation")}
          </button>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            {t("aiAgent.bookCall")}
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
    { icon: Layers,      label: "Frameworks",   color: "#34506E", angle: -90 },
    { icon: Building2,   label: "Projects",     color: "#60A5FA", angle: -30 },
    { icon: ShieldCheck, label: "Governance",   color: "#34D399", angle:  30 },
    { icon: Brain,       label: "Research",     color: "#F59E0B", angle:  90 },
    { icon: Network,     label: "Architecture", color: "#6B7280", angle: 150 },
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
        background: "#F2F0EA",
        border: "1px solid #E3E1DA",
      }}
    >
      <style>{`
        @keyframes agentPulse {
          0%, 100% { box-shadow: 0 0 30px 6px rgba(52,80,110,0.3); }
          50%       { box-shadow: 0 0 50px 14px rgba(52,80,110,0.5); }
        }
        @keyframes nodePing {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 1;    transform: scale(1.12); }
        }
      `}</style>

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
                strokeOpacity="0.3"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Animated data pulses */}
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
                  background: `${n.color}18`,
                  border: `1px solid ${n.color}45`,
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
            background: "#34506E",
            animation: "agentPulse 2.6s ease-in-out infinite",
          }}
        >
          <Bot style={{ width: 40, height: 40, color: "white" }} />
        </div>
      </div>

      {/* Identity */}
      <AgentIdentity />
    </div>
  );
}

function AgentIdentity() {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="relative mt-4 text-[16px] font-medium" style={{ color: "#1F2125" }}>
        {t("aiAgent.agentName")}
      </div>
      <div className="relative mt-1.5 flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "#10B981" }}
        />
        <span className="text-[12px] font-semibold" style={{ color: "#10B981" }}>
          {t("aiAgent.agentStatus")}
        </span>
      </div>
    </>
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
  const { t } = useTranslation("common");
  const CATEGORY_ICONS = [Layers, Building2, Network, Target, GraduationCap, Cpu];
  const categories = (t("aiAgent.categories", { returnObjects: true }) as Array<{ title: string; sub: string }>)
    .map((cat, i) => ({ ...cat, icon: CATEGORY_ICONS[i] }));

  return (
    <div className="glass-card overflow-hidden">
      <div
        className="px-4 py-3 text-[12px] font-bold uppercase tracking-[0.16em]"
        style={{
          borderBottom: "1px solid #E3E1DA",
          color: "#8A8D93",
        }}
      >
        {t("aiAgent.whatYouCanAsk")}
      </div>
      {categories.map((cat, i) => (
        <div
          key={cat.title}
          className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-black/[0.025]"
          style={{
            borderBottom:
              i < categories.length - 1 ? "1px solid #E3E1DA" : "none",
          }}
        >
          <div
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
            }}
          >
            <cat.icon className="h-3.5 w-3.5" style={{ color: "#34506E" }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[12.5px] font-semibold" style={{ color: "#1F2125" }}>{cat.title}</div>
            <div className="text-[10.5px]" style={{ color: "#8A8D93" }}>
              {cat.sub}
            </div>
          </div>
          <ChevronRight className="h-3.5 w-3.5 shrink-0" style={{ color: "#D7D4CC" }} />
        </div>
      ))}
    </div>
  );
}

/* Chat Welcome State */
function ChatWelcomeState({ onSuggest }: { onSuggest: (q: string) => void }) {
  const { t } = useTranslation("common");
  const SUGGESTION_ICONS = [Building2, ShieldCheck, GraduationCap];
  const SUGGESTION_COLORS = ["#60A5FA", "#34D399", "#F59E0B"];
  const suggestions = (t("aiAgent.suggestions", { returnObjects: true }) as Array<{ text: string }>)
    .map((s, i) => ({ ...s, icon: SUGGESTION_ICONS[i], color: SUGGESTION_COLORS[i] }));

  return (
    <div className="flex flex-col items-center px-5 py-5">
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes softPulse {
          0%, 100% { box-shadow: 0 0 20px 4px rgba(52,80,110,0.25); }
          50%       { box-shadow: 0 0 36px 8px rgba(52,80,110,0.4); }
        }
      `}</style>

      {/* Animated bot orb */}
      <div
        className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
        style={{
          background: "#34506E",
          animation: "softPulse 2.4s ease-in-out infinite",
        }}
      >
        <Bot className="h-7 w-7 text-white" />
      </div>

      <div className="text-[15px] font-medium" style={{ color: "#1F2125" }}>{t("aiAgent.chatWelcomeTitle")}</div>
      <div className="mt-1 mb-5 text-[12px]" style={{ color: "#8A8D93" }}>
        {t("aiAgent.chatWelcomeSub")}
      </div>

      <div className="w-full space-y-2">
        {suggestions.map((s, i) => (
          <button
            key={s.text}
            onClick={() => onSuggest(s.text)}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left transition-all hover:bg-black/[0.03]"
            style={{
              background: "#FAFAF8",
              border: "1px solid #E3E1DA",
              animation: "fadeSlideUp 0.4s ease both",
              animationDelay: `${i * 75}ms`,
            }}
          >
            <s.icon className="h-4 w-4 shrink-0" style={{ color: s.color }} />
            <span className="text-[13px]" style={{ color: "#1F2125" }}>{s.text}</span>
            <ChevronRight className="ml-auto h-3.5 w-3.5 shrink-0" style={{ color: "#D7D4CC" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* Chat Interface */
function ChatInterface() {
  const { t } = useTranslation("common");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);
  const sessionId = useRef(`s_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const suggested = (t("aiAgent.suggestions", { returnObjects: true }) as Array<{ text: string }>)
    .map((s) => s.text);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  async function sendMessage(text: string) {
    if (!text.trim() || isTyping) return;
    const userMsg: Message = { id: nextId.current++, role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), sessionId: sessionId.current }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Agent error");
      setMessages((prev) => [
        ...prev,
        { id: nextId.current++, role: "agent", content: data.output },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId.current++,
          role: "agent",
          content: t("aiAgent.chatError"),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
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
        style={{ borderBottom: "1px solid #E3E1DA" }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: "#34506E" }}
          >
            <Bot className="h-3.5 w-3.5 text-white" />
          </div>
          <div>
            <div className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{t("aiAgent.chatTitle")}</div>
            <div className="text-[10.5px]" style={{ color: "#8A8D93" }}>
              {t("aiAgent.chatSub")}
            </div>
          </div>
        </div>
        <button
          onClick={() => { setMessages([]); nextId.current = 1; }}
          className="rounded-lg px-3 py-1.5 text-[11px] transition-colors hover:bg-black/5"
          style={{ border: "1px solid #E3E1DA", color: "#8A8D93" }}
        >
          {t("aiAgent.clearChat")}
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
                style={{ background: "#34506E" }}
              >
                <Bot className="h-3.5 w-3.5 text-white" />
              </div>
            ) : (
              <div
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                style={{ background: "#EDEBE3", border: "1px solid #D7D4CC" }}
              >
                <Users className="h-3.5 w-3.5" style={{ color: "#5A5D63" }} />
              </div>
            )}
            <div className={`flex max-w-[82%] flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div
                className="rounded-xl px-4 py-2.5 text-[13.5px] leading-relaxed"
                style={
                  msg.role === "user"
                    ? { background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#1F2125" }
                    : { background: "#EDEBE3", border: "1px solid #E3E1DA", color: "#1F2125" }
                }
              >
                {msg.content}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3">
            <div
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
              style={{ background: "#34506E" }}
            >
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <div
              className="rounded-xl px-4 py-2.5"
              style={{ background: "#EDEBE3", border: "1px solid #E3E1DA" }}
            >
              <div className="flex items-center gap-1">
                {[0, 150, 300].map((delay) => (
                  <span
                    key={delay}
                    className="h-1.5 w-1.5 rounded-full animate-bounce"
                    style={{ background: "#34506E", animationDelay: `${delay}ms` }}
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
        style={{ borderTop: "1px solid #E3E1DA" }}
      >
        {(suggested.length > 0 ? suggested : SUGGESTED_FALLBACK).map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={isTyping}
            className="shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-all disabled:opacity-40"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
              whiteSpace: "nowrap",
            }}
          >
            {q}
          </button>
        ))}
      </div>
      )}

      {/* Input */}
      <div className="px-5 py-3.5" style={{ borderTop: "1px solid #E3E1DA" }}>
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-2.5"
          style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
        >
          <input
            className="flex-1 bg-transparent text-[13.5px] outline-none placeholder:text-[#8A8D93]"
            style={{ color: "#1F2125" }}
            placeholder={t("aiAgent.chatPlaceholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={isTyping}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-all disabled:opacity-40 hover:opacity-80"
            style={{ background: "#34506E" }}
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
  const { t } = useTranslation("common");
  const L1_COLORS = ["#34506E", "#10B981", "#60A5FA", "#F59E0B"];
  const layer1Docs = t("aiAgent.layer1Docs", { returnObjects: true }) as Array<{ num: string; title: string }>;
  const layer2Docs = (t("aiAgent.layer2Docs", { returnObjects: true }) as Array<{ title: string; badge: string }>)
    .map((doc, i) => ({ ...doc, color: L1_COLORS[i] }));

  return (
    <section className="mt-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <div
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#34506E" }}
          >
            {t("aiAgent.knowledgeLabel")}
          </div>
          <span
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-[10px] font-semibold"
            style={{
              background: "rgba(16,185,129,0.10)",
              border: "1px solid rgba(16,185,129,0.25)",
              color: "#059669",
            }}
          >
            <ShieldCheck className="h-3 w-3" />
            {t("aiAgent.knowledgePillar")}
          </span>
        </div>
        <h2 className="mt-2 text-[22px] font-medium" style={{ color: "#1F2125" }}>
          {t("aiAgent.knowledgeTitle")}
        </h2>
        <p
          className="mt-3 max-w-[680px] text-[14px] leading-relaxed"
          style={{ color: "#5A5D63" }}
        >
          {t("aiAgent.knowledgeDesc")}
        </p>
      </div>

      {/* Two-column table */}
      <div
        className="overflow-hidden rounded-xl lg:grid lg:grid-cols-[3fr_2fr]"
        style={{ border: "1px solid #E3E1DA" }}
      >
        {/* L1 — Core Identity */}
        <div style={{ borderRight: "1px solid #E3E1DA" }}>
          <div
            className="flex items-center gap-2.5 px-5 py-3.5"
            style={{
              borderBottom: "1px solid #E3E1DA",
              background: "#E9EFF4",
            }}
          >
            <span
              className="inline-flex h-5 w-7 items-center justify-center rounded text-[9px] font-bold"
              style={{ background: "rgba(52,80,110,0.18)", color: "#34506E" }}
            >
              L1
            </span>
            <span className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{t("aiAgent.l1Label")}</span>
            <span className="ml-auto text-[11px]" style={{ color: "#8A8D93" }}>
              {t("aiAgent.l1Count")}
            </span>
          </div>
          {layer1Docs.map((doc, i) => (
            <div
              key={doc.num}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                borderBottom:
                  i < layer1Docs.length - 1
                    ? "1px solid #E3E1DA"
                    : "none",
              }}
            >
              <span
                className="w-6 shrink-0 text-[11px] font-semibold tabular-nums"
                style={{ color: "#34506E" }}
              >
                {doc.num}
              </span>
              <span className="text-[13px]" style={{ color: "#1F2125" }}>{doc.title}</span>
            </div>
          ))}
        </div>

        {/* L2 — Project Intelligence */}
        <div>
          <div
            className="flex items-center gap-2.5 px-5 py-3.5"
            style={{
              borderBottom: "1px solid #E3E1DA",
              background: "rgba(16,185,129,0.06)",
            }}
          >
            <span
              className="inline-flex h-5 w-7 items-center justify-center rounded text-[9px] font-bold"
              style={{ background: "rgba(16,185,129,0.18)", color: "#059669" }}
            >
              L2
            </span>
            <span className="text-[13px] font-medium" style={{ color: "#1F2125" }}>{t("aiAgent.l2Label")}</span>
            <span className="ml-auto text-[11px]" style={{ color: "#8A8D93" }}>
              {t("aiAgent.l2Count")}
            </span>
          </div>
          {layer2Docs.map((doc, i) => (
            <div
              key={doc.title}
              className="flex items-center gap-3 px-5 py-2.5"
              style={{
                borderBottom:
                  i < layer2Docs.length - 1
                    ? "1px solid #E3E1DA"
                    : "none",
              }}
            >
              <FileText
                className="h-3.5 w-3.5 shrink-0"
                style={{ color: doc.color }}
              />
              <span className="min-w-0 flex-1 text-[13px]" style={{ color: "#1F2125" }}>
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
          background: "rgba(16,185,129,0.06)",
          border: "1px solid rgba(16,185,129,0.2)",
        }}
      >
        <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: "#059669" }} />
        <span className="text-[12px] font-semibold" style={{ color: "#059669" }}>
          {t("aiAgent.knowledgeGovLabel")}
        </span>
        <span className="text-[11.5px]" style={{ color: "#8A8D93" }}>
          {t("aiAgent.knowledgeGovDesc")}
        </span>
      </div>
    </section>
  );
}

/* ============================================================
   7. FAQ + CTA (65 / 35 split)
   ============================================================ */

function FaqAndCta() {
  const { t } = useTranslation("common");
  const faqs = t("aiAgent.faq", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_340px]">
      {/* FAQ */}
      <div>
        <h3 className="text-[20px] font-medium" style={{ color: "#1F2125" }}>{t("aiAgent.faqTitle")}</h3>
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
                <span className="text-[13.5px] font-medium" style={{ color: "#1F2125" }}>{f.q}</span>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform group-open:rotate-45"
                  style={{
                    background: "#E9EFF4",
                    border: "1px solid #D7D4CC",
                  }}
                >
                  <Plus className="h-3 w-3" style={{ color: "#34506E" }} />
                </span>
              </summary>
              <div
                className="px-5 pb-3.5 text-[13px] leading-relaxed"
                style={{ color: "#5A5D63", borderTop: "1px solid #E3E1DA" }}
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
          background: "#F2F0EA",
          border: "1px solid #E3E1DA",
        }}
      >
        <div className="relative flex flex-1 flex-col">
          <div
            className="inline-flex w-fit rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            {t("aiAgent.ctaBadge")}
          </div>

          <h3 className="mt-4 text-[20px] font-medium leading-tight" style={{ color: "#1F2125" }}>
            {t("aiAgent.ctaTitle")}
          </h3>

          <p className="mt-2.5 text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
            {t("aiAgent.ctaDesc")}
          </p>

          <div className="mt-5 flex flex-col gap-2.5">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-80"
              style={{ background: "#34506E", color: "#FAFAF8" }}
            >
              <MessageSquare className="h-4 w-4" />
              {t("aiAgent.ctaAskAgent")}
            </button>
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-semibold transition-all hover:bg-black/5"
              style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
            >
              {t("aiAgent.ctaBookCall")} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="mt-4 flex items-center gap-1.5 text-[10.5px]"
            style={{ color: "#8A8D93" }}
          >
            <MapPin className="h-3 w-3" style={{ color: "#34506E" }} />
            {t("aiAgent.ctaLocation")}
          </div>
        </div>
      </div>
    </section>
  );
}
