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
  Shield,
  MessageSquare,
  ArrowRight,
  Building2,
  Users,
  GraduationCap,
  Plus,
  Cpu,
  MapPin,
  Sparkles,
  Briefcase,
  Globe,
  Target,
  Workflow,
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
          "An AI knowledge agent trained on Dr. Ephraim Mpofu's frameworks, methodologies, projects and expertise in enterprise AI architecture, Vienna Austria.",
        author: { "@id": "https://drnattech.com/#person" },
        url: "https://drnattech.com/ai-agent",
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
          "Dr. NatTech AI Agent | Ask My AI — Enterprise AI Knowledge System Vienna",
      },
      {
        name: "description",
        content:
          "Ask the Dr. NatTech AI Agent — trained on proprietary frameworks, real projects and enterprise AI expertise. Expert answers on AI architecture, AISA, SKAIDO, knowledge systems and AI strategy.",
      },
      {
        property: "og:title",
        content: "Dr. NatTech AI Agent | Enterprise AI Knowledge System — Vienna",
      },
      {
        property: "og:description",
        content:
          "Interact with an AI trained on Dr. Ephraim Mpofu's proprietary frameworks, projects, methodologies and enterprise AI architecture expertise.",
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
      <main className="mx-auto max-w-[1280px] px-6 pt-12 pb-16 lg:px-10">
        <AuthorityHero />
        <TrustStrip />
        <ChatSection />
        <KnowledgeArchitecture />
        <ProcessAndAudience />
        <FaqAndCta />
        <CredentialStrip />
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
          AI AGENT
        </span>

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
          My AI Agent is trained on my frameworks, real projects, methodologies,
          research and experience — giving you accurate, relevant and up-to-date
          answers about enterprise AI architecture, systems and strategy.
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
  return (
    <div
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl py-10"
      style={{
        background: "rgba(10,14,34,0.8)",
        border: "1px solid rgba(139,92,246,0.18)",
      }}
    >
      {/* Atmospheric background glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 42%, rgba(168,85,247,0.18) 0%, transparent 65%)",
        }}
      />

      {/* Orbital system */}
      <div className="relative flex h-[200px] w-[200px] items-center justify-center">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1px dashed rgba(168,85,247,0.18)",
            boxShadow: "0 0 40px rgba(168,85,247,0.08)",
          }}
        />
        {/* Mid ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "28px",
            border: "1px solid rgba(168,85,247,0.28)",
            boxShadow: "0 0 20px rgba(168,85,247,0.12)",
          }}
        />
        {/* Orbital dot */}
        <div
          className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: "#A855F7", boxShadow: "0 0 12px #A855F7" }}
        />
        {/* Core orb */}
        <div
          className="relative flex h-[100px] w-[100px] items-center justify-center rounded-full"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
            boxShadow:
              "0 0 60px 12px rgba(168,85,247,0.4), 0 0 120px 24px rgba(139,92,246,0.18)",
          }}
        >
          <Bot className="h-12 w-12 text-white" />
        </div>
      </div>

      {/* Identity */}
      <div className="relative mt-6 text-[17px] font-bold text-white">
        Dr. NatTech AI Agent
      </div>
      <div className="relative mt-2 flex items-center gap-1.5">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "#10B981", boxShadow: "0 0 8px #10B981" }}
        />
        <span className="text-[12px] font-semibold" style={{ color: "#10B981" }}>
          Online
        </span>
      </div>
      <p
        className="relative mt-2 max-w-[220px] text-center text-[12px] leading-relaxed"
        style={{ color: "#6B7280" }}
      >
        Ask me about frameworks, projects, methodology and expertise.
      </p>

      {/* Capability pills */}
      <div className="relative mt-5 flex flex-wrap justify-center gap-1.5 px-8">
        {["AISA Framework", "SKAIDO", "RAG Systems", "AI Governance"].map((t) => (
          <span
            key={t}
            className="rounded-full px-2.5 py-0.5 text-[10.5px] font-medium"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.22)",
              color: "#C4B5FD",
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   2. TRUST STRIP — single cohesive bar
   ============================================================ */

function TrustStrip() {
  const badges = [
    { icon: Brain, label: "Trained on My Knowledge Base" },
    { icon: Shield, label: "Grounded in Real Projects & Results" },
    { icon: BookOpen, label: "Research & Framework Driven" },
    { icon: Sparkles, label: "Always Updated & Reliable" },
  ];

  return (
    <section className="mt-6">
      <div
        className="grid grid-cols-2 overflow-hidden rounded-xl lg:grid-cols-4"
        style={{
          background: "rgba(255,255,255,0.025)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {badges.map((b, i) => (
          <div
            key={b.label}
            className="flex items-center gap-2.5 px-4 py-3"
            style={{
              borderRight:
                (i === 0 || i === 2) ? "1px solid rgba(255,255,255,0.07)" : "none",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.07)" : "none",
            }}
          >
            <b.icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#A855F7" }} />
            <span className="text-[12px] font-medium text-white">{b.label}</span>
          </div>
        ))}
      </div>
    </section>
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

/* Chat Interface */
function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(3);

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
          onClick={() => { setMessages(INITIAL_MESSAGES); nextId.current = 3; }}
          className="rounded-lg px-3 py-1.5 text-[11px] transition-colors hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.08)", color: "#9CA3AF" }}
        >
          Clear Chat
        </button>
      </div>

      {/* Messages */}
      <div
        className="overflow-y-auto space-y-4 px-5 py-4"
        style={{ maxHeight: "310px" }}
      >
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

      {/* Suggested chips */}
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
   4. KNOWLEDGE ARCHITECTURE — compact visual diagram
   ============================================================ */

function KnowledgeArchitecture() {
  const pillars = [
    { icon: FileText, title: "Knowledge Documents", desc: "Frameworks, guides & technical docs" },
    { icon: Building2, title: "Case Studies & Projects", desc: "Real-world implementations & results" },
    { icon: Layers, title: "Proprietary Frameworks", desc: "Methodologies, principles & patterns" },
    { icon: Cpu, title: "Technical Library", desc: "Tools, stacks & architecture references" },
    { icon: MessageSquare, title: "FAQ & Insights Layer", desc: "Questions, insights & explanations" },
  ];

  return (
    <section className="mt-10">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#A855F7" }}
          >
            KNOWLEDGE ARCHITECTURE
          </div>
          <h2 className="mt-1 text-[22px] font-bold text-white">
            How My Knowledge Powers Accurate Answers
          </h2>
        </div>
      </div>

      <div
        className="rounded-xl p-5"
        style={{
          background: "rgba(10,14,34,0.75)",
          border: "1px solid rgba(139,92,246,0.16)",
        }}
      >
        {/* Pillars row — cards and separators are flat siblings */}
        <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-2">
          {pillars.map((p, i) => (
            <>
              <div
                key={p.title}
                className="flex flex-1 flex-col items-center rounded-lg p-3 text-center"
                style={{
                  background: "rgba(139,92,246,0.07)",
                  border: "1px solid rgba(139,92,246,0.13)",
                }}
              >
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.25)" }}
                >
                  <p.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
                </div>
                <div className="mt-2 text-[11.5px] font-bold text-white">{p.title}</div>
                <div className="mt-0.5 text-[10px] leading-snug" style={{ color: "#6B7280" }}>
                  {p.desc}
                </div>
              </div>
              {i < pillars.length - 1 && (
                <div
                  key={`sep-${i}`}
                  className="flex items-center justify-center text-[14px] font-bold lg:w-4 lg:shrink-0"
                  style={{ color: "#A855F7" }}
                >
                  +
                </div>
              )}
            </>
          ))}

          {/* = separator */}
          <div
            className="flex items-center justify-center text-[14px] font-bold lg:w-4 lg:shrink-0"
            style={{ color: "#A855F7" }}
          >
            =
          </div>

          {/* Result card */}
          <div
            className="flex shrink-0 flex-col items-center justify-center rounded-lg p-3 text-center lg:w-[100px]"
            style={{
              background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.08))",
              border: "1px solid rgba(168,85,247,0.28)",
            }}
          >
            <div className="text-[11.5px] font-bold leading-snug" style={{ color: "#C4B5FD" }}>
              Trusted,<br />Actionable<br />Answers
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   5. HOW IT WORKS + WHO THIS IS FOR (2-column)
   ============================================================ */

function ProcessAndAudience() {
  const steps = [
    { n: 1, icon: Brain, title: "Understands Your Question", sub: "Analyses intent & context" },
    { n: 2, icon: FileText, title: "Searches Knowledge Base", sub: "Retrieves relevant information" },
    { n: 3, icon: Layers, title: "Applies Framework Logic", sub: "Uses proven methods & principles" },
    { n: 4, icon: MessageSquare, title: "Delivers Accurate Answer", sub: "With sources & explanations" },
  ];

  const audience = [
    { icon: Briefcase, label: "Business Leaders" },
    { icon: Workflow, label: "Operations Teams" },
    { icon: Cpu, label: "AI & Product Teams" },
    { icon: Network, label: "Consultants & Partners" },
    { icon: GraduationCap, label: "Researchers & Students" },
  ];

  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-2">
      {/* How It Works */}
      <div className="glass-card p-5">
        <h3 className="text-[15px] font-bold text-white">How It Works</h3>
        <div className="mt-4 flex items-start gap-1">
          {steps.map((s, i) => (
            <div key={s.n} className="flex flex-1 items-start">
              <div className="flex flex-1 flex-col items-center px-1 text-center">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.25)",
                  }}
                >
                  <s.icon className="h-[17px] w-[17px]" style={{ color: "#C4B5FD" }} />
                </div>
                <div
                  className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: "#A855F7" }}
                >
                  {s.n}.
                </div>
                <div className="mt-0.5 text-[11px] font-semibold leading-tight text-white">
                  {s.title}
                </div>
                <div className="mt-0.5 text-[10px] leading-tight" style={{ color: "#6B7280" }}>
                  {s.sub}
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex h-9 items-center">
                  <ArrowRight className="h-3.5 w-3.5 shrink-0" style={{ color: "#374151" }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Who This Is For */}
      <div className="glass-card p-5">
        <h3 className="text-[15px] font-bold text-white">Who This Is For</h3>
        <div className="mt-4 flex flex-wrap gap-3">
          {audience.map((a) => (
            <div
              key={a.label}
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                background: "rgba(139,92,246,0.07)",
                border: "1px solid rgba(139,92,246,0.16)",
              }}
            >
              <a.icon className="h-3.5 w-3.5 shrink-0" style={{ color: "#C4B5FD" }} />
              <span className="text-[12px] font-medium text-white">{a.label}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11.5px] leading-relaxed" style={{ color: "#6B7280" }}>
          Whether you're evaluating AI for your organisation, exploring frameworks, or researching enterprise AI architecture — the agent is here to help.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
   6. WHY THIS AI IS DIFFERENT — compact comparison
   ============================================================ */


/* ============================================================
   7. FAQ + CTA (65 / 35 split)
   ============================================================ */

function FaqAndCta() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const faqs = [
    {
      q: "What is the difference between the AISA Framework and the SKAIDO Framework?",
      a: "The AISA Framework governs the strategic engagement — from first contact to production AI delivery. The SKAIDO Framework is the implementation methodology — the systematic process for delivering the technical AI system. AISA is the strategic wrapper; SKAIDO is the implementation engine.",
    },
    {
      q: "What makes this AI Agent different from generic AI tools?",
      a: "This agent is trained on Dr. Mpofu's proprietary frameworks, real project case studies and enterprise AI architecture expertise — not general internet data. It provides expert-level answers, cites its sources and applies framework-based reasoning to every response.",
    },
    {
      q: "How does Dr. Mpofu approach enterprise AI architecture?",
      a: "He uses a system-first approach: start with the business problem, map processes and knowledge flows, then design a governed architecture using the SKAIDO Framework and Three Structural Laws. Every system is built for production reliability, auditability and long-term maintainability.",
    },
    {
      q: "Can this AI Agent help with AI strategy and transformation?",
      a: "Yes. Ask it about Dr. Mpofu's approach to AI transformation, the AISA Framework methodology, AI readiness assessment and enterprise AI roadmapping. For personalised guidance, book an AI Strategy Call.",
    },
    {
      q: "What is Knowledge Architecture?",
      a: "Knowledge Architecture is a methodology for designing enterprise knowledge systems covering knowledge organisation, retrieval, RAG implementation, indexing, governance and engineering — enabling AI systems to retrieve accurate, contextual and trusted information rather than hallucinating answers.",
    },
    {
      q: "What AI services are available in Vienna and Austria?",
      a: "Dr. Mpofu offers AI Solutions Architecture consulting across Vienna, Austria and the DACH region — including enterprise AI strategy, system architecture, multi-agent design, RAG and knowledge systems, workflow automation, AI governance and EU AI Act compliance.",
    },
  ];

  const visible = showAll ? faqs : faqs.slice(0, 4);

  return (
    <section className="mt-10 grid gap-5 lg:grid-cols-[1fr_340px]">
      {/* FAQ */}
      <div>
        <h3 className="text-[20px] font-bold text-white">Frequently Asked Questions</h3>
        <div className="mt-4 space-y-2">
          {visible.map((f, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <button
                className="flex w-full items-start justify-between gap-4 px-5 py-3.5 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-[13.5px] font-semibold text-white">{f.q}</span>
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform"
                  style={{
                    background: "rgba(139,92,246,0.12)",
                    border: "1px solid rgba(139,92,246,0.2)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  <Plus className="h-3 w-3" style={{ color: "#A855F7" }} />
                </span>
              </button>
              {open === i && (
                <div
                  className="px-5 pb-3.5 text-[13px] leading-relaxed"
                  style={{ color: "#9CA3AF", borderTop: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <div className="pt-2.5">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        {!showAll && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-3 flex items-center gap-1.5 text-[12.5px] font-medium transition-colors hover:text-white"
            style={{ color: "#A855F7" }}
          >
            View all questions <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
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

/* ============================================================
   8. CREDENTIAL STRIP — authority reinforcement before footer
   ============================================================ */

function CredentialStrip() {
  const credentials = [
    { icon: GraduationCap, title: "PhD Researcher", sub: "BOKU University Vienna" },
    { icon: Building2, title: "Enterprise AI Architect", sub: "10+ Years Experience" },
    { icon: Layers, title: "Framework Creator", sub: "Proven Methodologies" },
    { icon: Globe, title: "Global Perspective", sub: "Vienna · DACH · Remote" },
  ];

  return (
    <section className="mt-10">
      <div
        className="grid grid-cols-2 overflow-hidden rounded-xl lg:grid-cols-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {credentials.map((c, i) => (
          <div
            key={c.title}
            className="flex items-center gap-3 px-5 py-4"
            style={{
              borderRight:
                (i === 0 || i === 2) ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: "rgba(139,92,246,0.10)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <c.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">{c.title}</div>
              <div className="text-[11px]" style={{ color: "#6B7280" }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
