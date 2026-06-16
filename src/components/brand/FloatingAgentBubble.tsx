import { useState } from "react";
import { MessageSquare, X, Send, ArrowRight } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export function FloatingAgentBubble() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    navigate({ to: "/ai-agent", search: { q: query.trim() } as Record<string, string> });
    setOpen(false);
    setQuery("");
  }

  return (
    <>
      {/* Slide-up panel */}
      <div
        className="fixed bottom-[88px] right-5 z-50 w-[300px] rounded-[16px] transition-all duration-300"
        style={{
          background: "rgba(10,12,30,0.97)",
          border: "1px solid rgba(139,92,246,0.35)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(139,92,246,0.15)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between rounded-t-[16px] px-4 py-3"
          style={{ background: "linear-gradient(135deg, rgba(139,92,246,0.22), rgba(168,85,247,0.12))", borderBottom: "1px solid rgba(139,92,246,0.18)" }}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full" style={{ background: "rgba(139,92,246,0.3)" }}>
              <MessageSquare className="h-3 w-3" style={{ color: "#C4B5FD" }} />
            </div>
            <span className="text-[12px] font-bold text-white">Dr. NatTech AI Agent</span>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close">
            <X className="h-4 w-4" style={{ color: "#6B7280" }} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "#9CA3AF" }}>
            Ask me about SKAIDO, AISA, EU AI Act, RAG systems or enterprise AI architecture.
          </p>
          <form onSubmit={submit} className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 rounded-[8px] px-3 py-2 text-[12px] text-white placeholder-gray-500 outline-none"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(139,92,246,0.25)" }}
            />
            <button
              type="submit"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5 text-white" />
            </button>
          </form>
          <a
            href="/ai-agent"
            className="mt-3 flex items-center gap-1 text-[11px] font-medium"
            style={{ color: "#A855F7" }}
          >
            Open full agent <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* Bubble button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-50 flex h-[56px] w-[56px] items-center justify-center rounded-full shadow-2xl transition-all duration-200 hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          boxShadow: "0 8px 32px rgba(139,92,246,0.55), 0 0 0 0 rgba(139,92,246,0.4)",
          animation: open ? "none" : "bubble-pulse 2.5s infinite",
        }}
        aria-label={open ? "Close AI Agent" : "Ask Dr. NatTech AI Agent"}
      >
        {open ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <MessageSquare className="h-5 w-5 text-white" />
        )}
      </button>
    </>
  );
}
