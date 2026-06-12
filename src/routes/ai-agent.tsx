import { createFileRoute } from "@tanstack/react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Send,
  Sparkles,
  FolderKanban,
  Network,
  Tag,
  Cpu,
  CalendarCheck,
  MessageSquare,
  Briefcase,
  GitBranch,
  Workflow,
  Database,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRight,
  Bot,
  type LucideIcon,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";
import aiAssistant from "@/assets/ai-assistant.jpg";

export const Route = createFileRoute("/ai-agent")({
  head: () => ({
    meta: [
      {
        title:
          "AI Agent | Ask Dr. Ephraim Mpofu's Digital Twin",
      },
      {
        name: "description",
        content:
          "Chat with an AI trained on Dr. Ephraim Mpofu's projects, frameworks, architecture methodologies and enterprise AI expertise.",
      },
    ],
  }),

  component: AIAgentPage,
});

const STORAGE_KEY = "drnattech:ai-agent:messages";

type QuestionCard = {
  title: string;
  prompt: string;
  icon: LucideIcon;
  color: string;
};

const questionCards: QuestionCard[] = [
  {
    title: "Tell me about your projects & case studies",
    prompt: "Walk me through your most impactful projects and their results.",
    icon: FolderKanban,
    color: "#A855F7",
  },
  {
    title: "How do you architect AI systems",
    prompt: "How do you approach the architecture of an enterprise AI system?",
    icon: Network,
    color: "#8B5CF6",
  },
  {
    title: "Services, timelines & investment",
    prompt: "What services do you offer, what are typical timelines and investment ranges?",
    icon: Tag,
    color: "#EC4899",
  },
  {
    title: "Technology stack & tools you use",
    prompt: "What technologies and tools do you work with day to day?",
    icon: Cpu,
    color: "#10B981",
  },
  {
    title: "Availability & current capacity",
    prompt: "What's your current availability and how do we start working together?",
    icon: CalendarCheck,
    color: "#F59E0B",
  },
  {
    title: "Anything else you want to know",
    prompt: "Tell me something interesting about you that most people don't know.",
    icon: MessageSquare,
    color: "#60A5FA",
  },
];

const capabilities: { title: string; description: string; icon: LucideIcon }[] = [
  { title: "Your Projects", description: "Deep dive into case studies and results", icon: Briefcase },
  { title: "Services & Pricing", description: "Information about services, timelines and investment", icon: Tag },
  { title: "My Approach", description: "How I architect AI systems end to end", icon: Network },
  { title: "Technology Stack", description: "Tools and technologies I use in production", icon: Cpu },
  { title: "Availability", description: "Current capacity and how to get started", icon: CalendarCheck },
];

const knowledgeTags = [
  "My projects",
  "Architecture decisions",
  "Portfolio case studies",
  "Certifications",
  "Azure AI expertise",
  "AI Agents",
  "RAG systems",
  "Workflow automation",
  "n8n architecture",
  "Power BI",
  "Supabase",
  "PostgreSQL",
  "Professional background",
  "Services",
  "Methodology",
];

const capabilityBadges = [
  "Project Intelligence",
  "Architecture Guidance",
  "Technical Q&A",
  "Service Information",
  "Experience & Background",
  "Enterprise AI Expertise",
  "Workflow Automation",
  "RAG Systems",
];

const floatingCards = [
  { label: "Ask about my projects", icon: FolderKanban, top: "8%", left: "-6%" },
  { label: "How I design AI systems", icon: Network, top: "28%", right: "-8%" },
  { label: "Services & Pricing", icon: Tag, bottom: "22%", left: "-8%" },
  { label: "Technology Stack", icon: Cpu, bottom: "6%", right: "-4%" },
] as const;

function loadStoredMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as UIMessage[];
  } catch {
    return [];
  }
}

function AIAgentPage() {
  const initialMessages = useMemo(() => loadStoredMessages(), []);
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error } = useChat({
    id: "drnattech-agent",
    messages: initialMessages,
    transport,
  });

  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isBusy) textareaRef.current?.focus();
  }, [isBusy]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  const handleSend = (text?: string) => {
    const value = (text ?? input).trim();
    if (!value || isBusy) return;
    sendMessage({ text: value });
    setInput("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: "#050816" }}>
      <BrandBackground />
      <SiteNav active="AI Agent" />
      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-24">
        <Hero onAsk={handleSend} />
        <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.38fr_1fr]">
          <LeftColumn
            input={input}
            setInput={setInput}
            onSend={() => handleSend()}
            onPick={handleSend}
            messages={messages}
            isBusy={isBusy}
            textareaRef={textareaRef}
            scrollRef={scrollRef}
            error={error?.message}
          />
          <RightColumn onCTA={() => textareaRef.current?.focus()} />
        </section>
        <ConversionStrip onContinue={() => textareaRef.current?.focus()} />
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_1fr]">
          <KnowledgeCard />
          <CapabilitiesCard />
        </section>
      </main>
    </div>
  );
}

function Hero({ onAsk }: { onAsk: (text: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-10 pt-10 lg:grid-cols-[55fr_45fr] lg:gap-6">
      <div className="flex flex-col justify-center">
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-[10.5px] font-bold tracking-[0.22em]"
          style={{
            color: "#E9D5FF",
            background: "rgba(139,92,246,0.14)",
            border: "1px solid rgba(168,85,247,0.45)",
          }}
        >
          <Sparkles className="h-3 w-3" /> AI AGENT
        </span>
        <h1
          className="mt-5 text-[44px] font-extrabold leading-[1.08] tracking-tight text-white md:text-[54px] lg:text-[58px]"
          style={{ letterSpacing: "-0.02em" }}
        >
          I've trained an AI on everything about my work, approach, and experience.
        </h1>
        <p className="mt-5 text-[18px] leading-relaxed" style={{ color: "#C7C7D1" }}>
          <span
            className="font-semibold"
            style={{
              backgroundImage: "linear-gradient(135deg, #C4B5FD, #A855F7)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Ask anything
          </span>{" "}
          — I'll answer in detail.
        </p>
        <div
          className="mt-7 h-[2px] w-40 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, #A855F7, transparent)",
            boxShadow: "0 0 18px rgba(168,85,247,0.65)",
          }}
        />
        <div className="mt-7 flex flex-wrap gap-3">
          <button
            onClick={() => onAsk("Tell me about your most impressive AI project.")}
            className="rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            Start a Conversation
          </button>
          <a
            href="/portfolio"
            className="rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
          >
            See Portfolio
          </a>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(168,85,247,0.32) 0%, rgba(139,92,246,0.08) 45%, transparent 75%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className="relative aspect-square w-full max-w-[440px] overflow-hidden rounded-[24px]"
          style={{
            background: "linear-gradient(160deg, rgba(139,92,246,0.18), rgba(11,16,32,0.95))",
            border: "1px solid rgba(168,85,247,0.35)",
            boxShadow: "0 30px 90px -20px rgba(139,92,246,0.55)",
          }}
        >
          <img
            src={aiAssistant}
            alt="AI assistant — digital twin of Dr. Ephraim Mpofu"
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>
        {floatingCards.map((card) => (
          <FloatingCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}

function FloatingCard({
  label,
  icon: Icon,
  top,
  bottom,
  left,
  right,
}: {
  label: string;
  icon: LucideIcon;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
}) {
  return (
    <div
      className="absolute hidden items-center gap-2 rounded-[12px] px-3.5 py-2.5 text-[11.5px] font-semibold text-white shadow-xl backdrop-blur-md md:flex"
      style={{
        top,
        bottom,
        left,
        right,
        background: "rgba(11,16,32,0.85)",
        border: "1px solid rgba(168,85,247,0.35)",
        boxShadow: "0 10px 30px -10px rgba(168,85,247,0.45)",
      }}
    >
      <span
        className="flex h-6 w-6 items-center justify-center rounded-md"
        style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.45)" }}
      >
        <Icon className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
      </span>
      {label}
    </div>
  );
}

function LeftColumn({
  input,
  setInput,
  onSend,
  onPick,
  messages,
  isBusy,
  textareaRef,
  scrollRef,
  error,
}: {
  input: string;
  setInput: (v: string) => void;
  onSend: () => void;
  onPick: (text: string) => void;
  messages: UIMessage[];
  isBusy: boolean;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  error?: string;
}) {
  const hasConversation = messages.length > 0;
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[18px] font-bold text-white">What kind of questions do you have?</h2>
          <span className="text-[11px]" style={{ color: "#9A9AAB" }}>
            Tap to ask instantly
          </span>
        </div>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {questionCards.map((q) => (
            <button
              key={q.title}
              onClick={() => onPick(q.prompt)}
              disabled={isBusy}
              className="group flex items-start gap-3 rounded-[12px] p-3.5 text-left transition-all hover:-translate-y-0.5 disabled:opacity-60"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] transition-all group-hover:shadow-[0_0_18px_rgba(168,85,247,0.6)]"
                style={{
                  background: `${q.color}1F`,
                  border: `1px solid ${q.color}55`,
                }}
              >
                <q.icon className="h-4 w-4" style={{ color: q.color }} />
              </span>
              <span className="text-[12.5px] font-semibold leading-snug text-white">
                {q.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card flex flex-col p-5">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2.5">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md"
              style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.45)" }}
            >
              <Bot className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
            </span>
            <div className="leading-tight">
              <div className="text-[13px] font-bold text-white">Ephraim's AI Assistant</div>
              <div className="text-[10.5px]" style={{ color: "#9A9AAB" }}>
                Trained on his work, projects & experience
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[10.5px] font-semibold" style={{ color: "#A3E635" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#A3E635", boxShadow: "0 0 8px #A3E635" }} />
            Online
          </span>
        </div>

        <div
          ref={scrollRef}
          className="flex max-h-[420px] min-h-[260px] flex-col gap-3 overflow-y-auto py-4"
        >
          {!hasConversation && <EmptyChatState />}
          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}
          {isBusy && <TypingIndicator />}
        </div>

        {error ? (
          <div
            className="mb-3 rounded-[10px] px-3 py-2 text-[12px]"
            style={{
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.35)",
              color: "#FCA5A5",
            }}
          >
            {error}
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
          className="relative rounded-[14px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Ask me anything about my work, projects, skills, architecture approach, certifications, or experience..."
            rows={2}
            className="w-full resize-none bg-transparent px-4 py-3.5 pr-16 text-[13.5px] text-white placeholder:text-white/35 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isBusy || !input.trim()}
            aria-label="Send message"
            className="absolute bottom-2.5 right-2.5 flex h-11 w-11 items-center justify-center rounded-[12px] text-white shadow-lg transition-all hover:scale-[1.05] disabled:cursor-not-allowed disabled:opacity-50"
            style={{
              background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
              boxShadow: "0 10px 24px -6px rgba(139,92,246,0.6)",
            }}
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function EmptyChatState() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center">
      <div
        className="flex h-12 w-12 items-center justify-center rounded-[14px]"
        style={{ background: "rgba(168,85,247,0.14)", border: "1px solid rgba(168,85,247,0.45)" }}
      >
        <Bot className="h-5 w-5" style={{ color: "#C4B5FD" }} />
      </div>
      <p className="mt-4 text-[14px] font-semibold text-white">Hi, I'm Ephraim's AI.</p>
      <p className="mt-1 text-[12.5px]" style={{ color: "#9A9AAB" }}>
        Ask about projects, services, architecture or experience — or pick a question above.
      </p>
    </div>
  );
}

function MessageBubble({ message }: { message: UIMessage }) {
  const isUser = message.role === "user";
  const text = message.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className="max-w-[85%] whitespace-pre-wrap rounded-[14px] px-3.5 py-2.5 text-[13px] leading-relaxed"
        style={
          isUser
            ? {
                background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                color: "#FFFFFF",
                boxShadow: "0 8px 24px -10px rgba(139,92,246,0.6)",
              }
            : {
                background: "rgba(255,255,255,0.04)",
                color: "#E5E5EE",
                border: "1px solid rgba(255,255,255,0.07)",
              }
        }
      >
        {text || (isUser ? "" : "…")}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div
        className="flex items-center gap-1.5 rounded-[14px] px-3.5 py-3"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: "#C4B5FD",
              animation: `pulse 1.2s ${i * 0.15}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RightColumn({ onCTA }: { onCTA: () => void }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass-card p-6">
        <h3 className="text-[16px] font-bold text-white">I can help you with:</h3>
        <ul className="mt-5 flex flex-col gap-3">
          {capabilities.map((c) => (
            <li
              key={c.title}
              className="flex items-start gap-3 rounded-[12px] p-3 transition-all hover:bg-white/[0.025]"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                style={{ background: "rgba(168,85,247,0.16)", border: "1px solid rgba(168,85,247,0.4)" }}
              >
                <c.icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
              </span>
              <div className="leading-tight">
                <div className="text-[13px] font-bold text-white">{c.title}</div>
                <div className="mt-1 text-[11.5px]" style={{ color: "#A3A3B2" }}>
                  {c.description}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <button
          onClick={onCTA}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-[13.5px] font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
            boxShadow: "0 14px 30px -10px rgba(139,92,246,0.6)",
          }}
        >
          <MessageSquare className="h-4 w-4" /> Start A Conversation
        </button>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md"
            style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.45)" }}
          >
            <ShieldCheck className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
          </span>
          <h4 className="text-[13.5px] font-bold text-white">Production-grade replies</h4>
        </div>
        <p className="mt-2.5 text-[12px] leading-relaxed" style={{ color: "#A3A3B2" }}>
          Answers are grounded in real project metrics, architecture decisions and the same playbook
          used to ship enterprise AI systems.
        </p>
      </div>
    </div>
  );
}

function ConversionStrip({ onContinue }: { onContinue: () => void }) {
  const benefits = ["No commitment", "Quick response", "Valuable insights", "Architecture-focused discussion"];
  return (
    <section
      className="mt-12 grid grid-cols-1 gap-6 rounded-[22px] p-8 lg:grid-cols-[280px_1fr] lg:p-10"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(11,16,32,0.85) 60%, rgba(168,85,247,0.15) 100%)",
        border: "1px solid rgba(168,85,247,0.35)",
        boxShadow: "0 30px 80px -30px rgba(139,92,246,0.4)",
      }}
    >
      <div className="flex items-center justify-center">
        <BrainGraphic />
      </div>
      <div>
        <h3 className="text-[26px] font-extrabold leading-tight text-white md:text-[30px]">
          Sounds like we should talk?
        </h3>
        <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed" style={{ color: "#C7C7D1" }}>
          If you've explored my projects and spoken with my AI assistant, the next step is a real
          conversation about your goals and challenges.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {benefits.map((b) => (
            <span
              key={b}
              className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold"
              style={{
                color: "#E9D5FF",
                background: "rgba(168,85,247,0.12)",
                border: "1px solid rgba(168,85,247,0.4)",
              }}
            >
              {b}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-3 text-[13.5px] font-bold text-white shadow-lg transition-all hover:scale-[1.03]"
            style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
          >
            Schedule Discovery Call <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={onContinue}
            className="rounded-[10px] px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.14)" }}
          >
            Continue Chatting
          </button>
        </div>
      </div>
    </section>
  );
}

function BrainGraphic() {
  return (
    <div
      className="relative flex h-[200px] w-[200px] items-center justify-center rounded-full"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 50%, rgba(168,85,247,0.45) 0%, rgba(139,92,246,0.12) 50%, transparent 80%)",
      }}
    >
      <div
        className="flex h-[140px] w-[140px] items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(135deg, #1A1033, #0B1020)",
          border: "1px solid rgba(168,85,247,0.45)",
          boxShadow: "0 0 50px rgba(168,85,247,0.55)",
        }}
      >
        <Brain className="h-16 w-16" style={{ color: "#C4B5FD" }} />
      </div>
      {[Workflow, Network, Database, GitBranch].map((Icon, i) => {
        const angles = [-35, 35, 145, -145];
        const a = (angles[i] * Math.PI) / 180;
        const r = 110;
        return (
          <span
            key={i}
            className="absolute flex h-9 w-9 items-center justify-center rounded-[10px]"
            style={{
              transform: `translate(${Math.cos(a) * r}px, ${Math.sin(a) * r}px)`,
              background: "rgba(11,16,32,0.95)",
              border: "1px solid rgba(168,85,247,0.45)",
              boxShadow: "0 10px 24px -10px rgba(168,85,247,0.55)",
            }}
          >
            <Icon className="h-4 w-4" style={{ color: "#C4B5FD" }} />
          </span>
        );
      })}
    </div>
  );
}

function KnowledgeCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.45)" }}
        >
          <Sparkles className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
        </span>
        <h3 className="text-[15px] font-bold text-white">What this AI knows</h3>
      </div>
      <p className="mt-2 text-[12px]" style={{ color: "#A3A3B2" }}>
        The AI is trained on the following knowledge sources about Dr. Ephraim Mpofu:
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {knowledgeTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1.5 text-[11.5px] font-semibold"
            style={{
              color: "#D6D6E0",
              background: "rgba(255,255,255,0.035)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function CapabilitiesCard() {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2.5">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-md"
          style={{ background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.45)" }}
        >
          <Zap className="h-3.5 w-3.5" style={{ color: "#C4B5FD" }} />
        </span>
        <h3 className="text-[15px] font-bold text-white">Agent capabilities</h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {capabilityBadges.map((b) => (
          <span
            key={b}
            className="rounded-[10px] px-3 py-2 text-center text-[11.5px] font-semibold"
            style={{
              color: "#E5E5EE",
              background: "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(168,85,247,0.06))",
              border: "1px solid rgba(168,85,247,0.28)",
            }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
