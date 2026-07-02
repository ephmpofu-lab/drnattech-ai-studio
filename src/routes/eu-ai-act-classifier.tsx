import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import {
  ShieldCheck,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ArrowLeft,
  RotateCcw,
  Bot,
  ChevronRight,
} from "lucide-react";

export const Route = createFileRoute("/eu-ai-act-classifier")({
  head: () => ({
    meta: [
      { title: "EU AI Act Risk Classifier | Dr. Ephraim Mpofu" },
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Free tool: determine your AI system's risk category under the EU AI Act in under 2 minutes.",
      },
    ],
  }),
  component: ClassifierPage,
});

/* ─── Types ──────────────────────────────────────────────────── */

type Step = "q1" | "q2" | "q3" | "q4" | "q5" | "q6" | "q7";
type Result = "prohibited" | "high" | "limited" | "minimal";

type NavResult = {
  nextStep: Step | null;
  prohibitedFlag?: string;
  highRiskFlag?: boolean;
};

/* ─── Questions ──────────────────────────────────────────────── */

const QUESTIONS: Record<
  Step,
  {
    number: number;
    text: string;
    hint: string;
    type: "yesno" | "multiselect";
    options?: { id: string; label: string; desc: string }[];
  }
> = {
  q1: {
    number: 1,
    text: "Does your AI system interact with or make decisions that affect individual people?",
    hint: "Includes automated decisions about hiring, credit, health, education, insurance, or any profiling of individuals.",
    type: "yesno",
  },
  q2: {
    number: 2,
    text: "Does it use subliminal or manipulative techniques to influence behaviour against users' own interests?",
    hint: "Or does it exploit vulnerabilities (age, disability, socioeconomic status) to distort a person's decision-making?",
    type: "yesno",
  },
  q3: {
    number: 3,
    text: "Does it systematically score or evaluate individuals based on their social behaviour for public authorities?",
    hint: "Social scoring involves rating people's trustworthiness or conduct across contexts for government bodies or similar entities.",
    type: "yesno",
  },
  q4: {
    number: 4,
    text: "Does it use biometric data to identify, categorise, or continuously monitor individuals?",
    hint: "Biometric data includes facial features, fingerprints, voice patterns, gait, or other physical or behavioural characteristics.",
    type: "yesno",
  },
  q5: {
    number: 5,
    text: "Is it used for real-time remote biometric identification in publicly accessible spaces?",
    hint: "For example, live facial recognition cameras deployed in public areas for law enforcement purposes.",
    type: "yesno",
  },
  q6: {
    number: 6,
    text: "Does your AI system operate in any of these domains?",
    hint: "Select all that apply — these are the high-risk application areas defined in Annex III of the EU AI Act.",
    type: "multiselect",
    options: [
      {
        id: "employment",
        label: "Employment & recruitment",
        desc: "CV screening, hiring decisions, task allocation, performance monitoring",
      },
      {
        id: "education",
        label: "Education & training",
        desc: "Student assessment, admission decisions, educational institution monitoring",
      },
      {
        id: "finance",
        label: "Credit & insurance",
        desc: "Creditworthiness assessment, life insurance, financial eligibility decisions",
      },
      {
        id: "healthcare",
        label: "Healthcare & medical",
        desc: "Clinical decisions, medical devices, mental health support, emergency dispatch",
      },
      {
        id: "lawenforcement",
        label: "Law enforcement",
        desc: "Crime prediction, risk assessment, evidence evaluation, polygraph",
      },
      {
        id: "migration",
        label: "Migration & border control",
        desc: "Asylum processing, visa decisions, border surveillance systems",
      },
      {
        id: "infrastructure",
        label: "Critical infrastructure",
        desc: "Energy, water, transport, or digital infrastructure safety components",
      },
      {
        id: "justice",
        label: "Justice & democracy",
        desc: "Court decisions, election integrity, administration of democratic processes",
      },
    ],
  },
  q7: {
    number: 7,
    text: "Is your system primarily a chatbot, virtual assistant, or does it generate synthetic media?",
    hint: "Synthetic media includes AI-generated images, audio, video (deepfakes), or text presented as factual.",
    type: "yesno",
  },
};

/* ─── Navigation logic ───────────────────────────────────────── */
/* Never terminates at "prohibited" — accumulates flags and continues */

function getNavigation(step: Step, answer: boolean | string[]): NavResult {
  if (step === "q1") return { nextStep: answer === true ? "q2" : "q7" };
  if (step === "q2") {
    if (answer === true) {
      return {
        nextStep: "q3",
        prohibitedFlag:
          "Subliminal or manipulative techniques targeting users' vulnerabilities (Article 5(1)(a–b))",
      };
    }
    return { nextStep: "q3" };
  }
  if (step === "q3") {
    if (answer === true) {
      return {
        nextStep: "q4",
        prohibitedFlag:
          "Systematic social scoring of individuals by public authorities (Article 5(1)(c))",
      };
    }
    return { nextStep: "q4" };
  }
  if (step === "q4") return { nextStep: answer === true ? "q5" : "q6" };
  if (step === "q5") {
    if (answer === true) {
      return {
        nextStep: "q6",
        prohibitedFlag:
          "Real-time remote biometric identification in publicly accessible spaces (Article 5(1)(h))",
      };
    }
    // Biometric classification (not real-time public) → high risk
    return { nextStep: "q6", highRiskFlag: true };
  }
  if (step === "q6") {
    return { nextStep: "q7", highRiskFlag: (answer as string[]).length > 0 };
  }
  // q7 is handled directly in handleAnswer
  return { nextStep: null };
}

/* ─── Result content ─────────────────────────────────────────── */

const RESULTS: Record<
  Result,
  {
    level: string;
    Icon: typeof XCircle;
    color: string;
    bg: string;
    border: string;
    badge: string;
    summary: string;
    detail: string;
    obligations: string[];
    penalty: string;
    timeline: string;
  }
> = {
  prohibited: {
    level: "Prohibited",
    Icon: XCircle,
    color: "#DC2626",
    bg: "#FEF2F2",
    border: "#FECACA",
    badge: "Article 5 — Prohibited Practice",
    summary:
      "Your AI system matches one or more practices prohibited under Article 5 of the EU AI Act.",
    detail:
      "Prohibited AI practices must be discontinued immediately. The EU AI Act prohibits systems that pose unacceptable risks to fundamental rights — including manipulative systems, social scoring by public authorities, and real-time biometric identification in public spaces for law enforcement.",
    obligations: [
      "Cease operation of the prohibited functionality immediately",
      "Consult legal counsel and an EU AI Act compliance specialist",
      "Fundamentally redesign the system to remove prohibited elements",
      "Document all steps taken to achieve compliance",
    ],
    penalty: "Up to €35,000,000 or 7% of global annual turnover",
    timeline: "In force since February 2025",
  },
  high: {
    level: "High Risk",
    Icon: AlertTriangle,
    color: "#D97706",
    bg: "#FFFBEB",
    border: "#FDE68A",
    badge: "Annex III — High Risk",
    summary:
      "Your AI system is classified as High Risk under Annex III of the EU AI Act.",
    detail:
      "High-risk AI systems must meet comprehensive compliance requirements before deployment. This includes risk management systems, data governance, full technical documentation, human oversight mechanisms, and registration in the EU AI database.",
    obligations: [
      "Implement a risk management system throughout the full lifecycle",
      "Establish data governance and training data quality controls",
      "Produce and maintain complete technical documentation",
      "Enable human oversight and intervention mechanisms",
      "Ensure accuracy, robustness, and cybersecurity",
      "Register the system in the EU AI Act database",
      "Complete a conformity assessment before deployment",
    ],
    penalty: "Up to €15,000,000 or 3% of global annual turnover",
    timeline: "High-risk obligations apply from August 2026",
  },
  limited: {
    level: "Limited Risk",
    Icon: ShieldCheck,
    color: "#34506E",
    bg: "#E9EFF4",
    border: "#D7D4CC",
    badge: "Articles 50–52 — Transparency",
    summary:
      "Your AI system has transparency obligations under the EU AI Act.",
    detail:
      "Limited-risk systems — chatbots and synthetic media generators — must be transparent about their AI nature. Users have a right to know when they are interacting with AI or consuming AI-generated content.",
    obligations: [
      "Clearly disclose to users that they are interacting with an AI system",
      "Label AI-generated images, audio, video, and text appropriately",
      "Do not misrepresent the system as human in direct interaction",
      "Maintain basic documentation of the system's purpose and function",
    ],
    penalty: "Up to €7,500,000 or 1.5% of global annual turnover",
    timeline: "Transparency obligations apply from August 2026",
  },
  minimal: {
    level: "Minimal Risk",
    Icon: CheckCircle2,
    color: "#16A34A",
    bg: "#F0FDF4",
    border: "#BBF7D0",
    badge: "Minimal / No Risk",
    summary:
      "Your AI system falls outside the high-risk and prohibited categories of the EU AI Act.",
    detail:
      "Most AI applications — recommendation engines, spam filters, productivity tools — carry minimal risk and have no specific EU AI Act obligations. Voluntary codes of conduct are available and encouraged as good practice.",
    obligations: [
      "No mandatory EU AI Act requirements currently apply",
      "Consider voluntarily adopting the Act's codes of conduct",
      "Ensure GDPR compliance if personal data is processed",
      "Document the system's purpose and monitor for regulatory updates",
      "Monitor: the regulatory scope may expand as the Act evolves",
    ],
    penalty: "No specific penalties under the EU AI Act",
    timeline: "No mandatory compliance deadline",
  },
};

/* ─── Progress mapping ───────────────────────────────────────── */

const STEP_PROGRESS: Record<Step, number> = {
  q1: 14,
  q2: 28,
  q3: 42,
  q4: 57,
  q5: 71,
  q6: 85,
  q7: 100,
};

/* ─── Page ───────────────────────────────────────────────────── */

function ClassifierPage() {
  return (
    <div className="light-page relative min-h-screen" style={{ backgroundColor: "#FAFAF8" }}>
      <SiteNav />
      <main className="mx-auto max-w-[820px] px-6 pb-24 lg:px-10">
        <header className="pt-10 pb-8 text-center lg:pt-14">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
            style={{ background: "#E9EFF4", border: "1px solid #D7D4CC", color: "#34506E" }}
          >
            <ShieldCheck className="h-3.5 w-3.5" /> Free Assessment Tool
          </span>
          <h1
            className="mt-4 text-[32px] font-medium leading-tight lg:text-[42px]"
            style={{ color: "#1F2125" }}
          >
            EU AI Act Risk Classifier
          </h1>
          <p
            className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed"
            style={{ color: "#5A5D63" }}
          >
            Answer up to 7 questions to determine your AI system's risk category under the EU AI
            Act — and understand exactly what that means for compliance.
          </p>
        </header>

        <Assessment />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─── Assessment state machine ───────────────────────────────── */

function Assessment() {
  const [step, setStep] = useState<Step>("q1");
  const [history, setHistory] = useState<Step[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  const [prohibitedFlags, setProhibitedFlags] = useState<string[]>([]);
  const [highRisk, setHighRisk] = useState(false);
  const [terminalResult, setTerminalResult] = useState<"limited" | "minimal" | null>(null);
  const [done, setDone] = useState(false);

  // Set when a prohibited answer is given — shows inline warning on the current question
  const [inlineWarning, setInlineWarning] = useState<{
    flag: string;
    nextStep: Step | null;
  } | null>(null);

  function handleAnswer(answer: boolean | string[]) {
    // q7 always ends the assessment
    if (step === "q7") {
      setTerminalResult(answer === true ? "limited" : "minimal");
      setDone(true);
      return;
    }

    const nav = getNavigation(step, answer);

    if (nav.highRiskFlag) setHighRisk(true);

    if (nav.prohibitedFlag) {
      setProhibitedFlags((f) => [...f, nav.prohibitedFlag!]);
      setInlineWarning({ flag: nav.prohibitedFlag!, nextStep: nav.nextStep });
      return;
    }

    if (nav.nextStep === null) {
      setDone(true);
      return;
    }

    setHistory((h) => [...h, step]);
    setStep(nav.nextStep);
    setSelected([]);
  }

  function continuePastWarning() {
    const warn = inlineWarning;
    setInlineWarning(null);
    if (!warn || warn.nextStep === null) {
      setDone(true);
      return;
    }
    setHistory((h) => [...h, step]);
    setStep(warn.nextStep);
    setSelected([]);
  }

  function goBack() {
    if (inlineWarning) {
      // User wants to change their answer — undo the prohibited flag
      setProhibitedFlags((f) => f.slice(0, -1));
      setInlineWarning(null);
      return;
    }
    const prev = history[history.length - 1];
    if (prev) {
      setHistory((h) => h.slice(0, -1));
      setStep(prev);
      setSelected([]);
    }
  }

  function reset() {
    setStep("q1");
    setHistory([]);
    setSelected([]);
    setProhibitedFlags([]);
    setHighRisk(false);
    setTerminalResult(null);
    setDone(false);
    setInlineWarning(null);
  }

  if (done) {
    return (
      <ComprehensiveResult
        prohibitedFlags={prohibitedFlags}
        highRisk={highRisk}
        terminalResult={terminalResult}
        onReset={reset}
      />
    );
  }

  const q = QUESTIONS[step];
  const progress = STEP_PROGRESS[step];
  const canGoBack = history.length > 0 || !!inlineWarning;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-6">
        <div
          className="mb-1.5 flex items-center justify-between text-[11px]"
          style={{ color: "#8A8D93" }}
        >
          <span>Question {q.number} of up to 7</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full" style={{ background: "#E3E1DA" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${progress}%`, background: "#34506E" }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        className="rounded-[20px] p-7 lg:p-10"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#8A8D93" }}
        >
          Question {q.number}
        </p>
        <h2
          className="mt-3 text-[20px] font-medium leading-snug lg:text-[24px]"
          style={{ color: "#1F2125" }}
        >
          {q.text}
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          {q.hint}
        </p>

        {inlineWarning ? (
          /* Prohibited practice detected — show inline alert */
          <div
            className="mt-6 rounded-[14px]"
            style={{ background: "#FEF2F2", border: "1.5px solid #FECACA" }}
          >
            <div className="p-5">
              <div className="flex items-start gap-3">
                <XCircle
                  className="h-5 w-5 shrink-0 mt-0.5"
                  style={{ color: "#DC2626" }}
                />
                <div className="flex-1">
                  <div
                    className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-1.5"
                    style={{ color: "#DC2626" }}
                  >
                    Article 5 — Prohibited Practice Detected
                  </div>
                  <p
                    className="text-[13.5px] font-semibold leading-snug"
                    style={{ color: "#1F2125" }}
                  >
                    {inlineWarning.flag}
                  </p>
                  <p
                    className="mt-2 text-[12.5px] leading-relaxed"
                    style={{ color: "#5A5D63" }}
                  >
                    This triggers a prohibited classification under the EU AI Act. Continue the
                    assessment to get the complete compliance picture — including any additional
                    obligations for your system.
                  </p>
                </div>
              </div>
              <button
                onClick={continuePastWarning}
                className="mt-4 inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold transition-all hover:opacity-90"
                style={{ background: "#DC2626", color: "#FAFAF8" }}
              >
                Continue to Full Assessment <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : q.type === "yesno" ? (
          <div className="mt-8 grid grid-cols-2 gap-4">
            <button
              onClick={() => handleAnswer(true)}
              className="rounded-[14px] p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.99]"
              style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
            >
              <div className="text-[22px] font-bold" style={{ color: "#16A34A" }}>
                Yes
              </div>
              <div className="mt-1 text-[12px]" style={{ color: "#5A5D63" }}>
                This applies to my system
              </div>
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="rounded-[14px] p-5 text-left transition-all hover:scale-[1.02] active:scale-[0.99]"
              style={{ background: "#FAFAF8", border: "1px solid #E3E1DA" }}
            >
              <div className="text-[22px] font-bold" style={{ color: "#DC2626" }}>
                No
              </div>
              <div className="mt-1 text-[12px]" style={{ color: "#5A5D63" }}>
                This does not apply
              </div>
            </button>
          </div>
        ) : (
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {q.options?.map((opt) => {
                const isChecked = selected.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() =>
                      setSelected((s) =>
                        s.includes(opt.id) ? s.filter((x) => x !== opt.id) : [...s, opt.id]
                      )
                    }
                    className="rounded-[12px] p-4 text-left transition-all"
                    style={{
                      background: isChecked ? "#E9EFF4" : "#FAFAF8",
                      border: isChecked ? "1.5px solid #34506E" : "1px solid #E3E1DA",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded"
                        style={{
                          background: isChecked ? "#34506E" : "transparent",
                          border: isChecked ? "none" : "1.5px solid #D7D4CC",
                        }}
                      >
                        {isChecked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div
                          className="text-[13px] font-semibold"
                          style={{ color: isChecked ? "#34506E" : "#1F2125" }}
                        >
                          {opt.label}
                        </div>
                        <div className="mt-0.5 text-[11.5px]" style={{ color: "#5A5D63" }}>
                          {opt.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="mt-5">
              <button
                onClick={() => handleAnswer(selected)}
                className="inline-flex items-center gap-2 rounded-[10px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:opacity-90"
                style={{ background: "#34506E", color: "#FAFAF8" }}
              >
                {selected.length > 0 ? "Continue" : "None apply — Continue"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {canGoBack && (
        <button
          onClick={goBack}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] transition-colors"
          style={{ color: "#8A8D93" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8D93")}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {inlineWarning ? "Back — change my answer" : "Back"}
        </button>
      )}
    </div>
  );
}

/* ─── Comprehensive results ──────────────────────────────────── */

function ComprehensiveResult({
  prohibitedFlags,
  highRisk,
  terminalResult,
  onReset,
}: {
  prohibitedFlags: string[];
  highRisk: boolean;
  terminalResult: "limited" | "minimal" | null;
  onReset: () => void;
}) {
  const sections: Result[] = [];
  if (prohibitedFlags.length > 0) sections.push("prohibited");
  if (highRisk) sections.push("high");
  if (terminalResult === "limited") sections.push("limited");
  // Minimal only shown when no other tier applies
  if (sections.length === 0) sections.push(terminalResult ?? "minimal");

  const isMulti = sections.length > 1;

  return (
    <div>
      {/* Multi-tier summary banner */}
      {isMulti && (
        <div
          className="mb-4 rounded-[16px] p-5"
          style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
        >
          <div
            className="text-[10.5px] font-bold uppercase tracking-[0.18em] mb-1"
            style={{ color: "#8A8D93" }}
          >
            Full Compliance Assessment
          </div>
          <p className="text-[14px] font-medium" style={{ color: "#1F2125" }}>
            Your AI system has {sections.length} compliance tiers to address. The most severe is
            shown first — each section lists its specific obligations.
          </p>
        </div>
      )}

      {/* Tier sections stacked */}
      <div className={isMulti ? "space-y-5" : ""}>
        {sections.map((result) => (
          <TierSection
            key={result}
            result={result}
            prohibitedFlags={result === "prohibited" ? prohibitedFlags : undefined}
          />
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-5 rounded-[16px] p-6 lg:p-8"
        style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
      >
        <h3 className="text-[17px] font-medium" style={{ color: "#1F2125" }}>
          Need help achieving compliance?
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          Dr. Ephraim Mpofu designs EU AI Act-compliant enterprise AI architectures — embedding
          compliance from day one rather than retrofitting it. Book a strategy call or ask the AI
          agent.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            Book a Strategy Call
          </Link>
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:bg-black/5"
            style={{ border: "1px solid #D7D4CC", color: "#1F2125" }}
          >
            <Bot className="h-4 w-4" style={{ color: "#34506E" }} /> Ask My AI Agent
          </Link>
        </div>
      </div>

      {/* Reset */}
      <div className="mt-5">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-[13px] transition-colors"
          style={{ color: "#8A8D93" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#8A8D93")}
        >
          <RotateCcw className="h-3.5 w-3.5" /> Start over
        </button>
      </div>

      <p className="mt-6 text-[11px] leading-relaxed" style={{ color: "#8A8D93" }}>
        This tool provides a general indication only and does not constitute legal advice. EU AI
        Act classification depends on technical implementation details, jurisdiction, and evolving
        regulatory guidance. Consult a qualified legal or compliance professional for binding
        advice.
      </p>
    </div>
  );
}

/* ─── Single tier result card ────────────────────────────────── */

function TierSection({
  result,
  prohibitedFlags,
}: {
  result: Result;
  prohibitedFlags?: string[];
}) {
  const r = RESULTS[result];
  const { Icon } = r;

  return (
    <div>
      {/* Result header */}
      <div
        className="rounded-[20px] p-7 lg:p-10"
        style={{ background: r.bg, border: `1.5px solid ${r.border}` }}
      >
        <div className="flex items-start gap-4">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
            style={{ background: "rgba(255,255,255,0.6)", border: `1px solid ${r.border}` }}
          >
            <Icon className="h-6 w-6" style={{ color: r.color }} />
          </div>
          <div>
            <span
              className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{
                background: "rgba(255,255,255,0.7)",
                color: r.color,
                border: `1px solid ${r.border}`,
              }}
            >
              {r.badge}
            </span>
            <h2
              className="mt-2 text-[28px] font-medium lg:text-[34px]"
              style={{ color: r.color }}
            >
              {r.level}
            </h2>
          </div>
        </div>

        <p className="mt-4 text-[15px] font-medium leading-snug" style={{ color: "#1F2125" }}>
          {r.summary}
        </p>
        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          {r.detail}
        </p>

        {/* Specific violations detected for prohibited tier */}
        {prohibitedFlags && prohibitedFlags.length > 0 && (
          <div
            className="mt-4 rounded-[12px] p-4"
            style={{
              background: "rgba(255,255,255,0.5)",
              border: `1px solid ${r.border}`,
            }}
          >
            <div
              className="text-[10.5px] font-bold uppercase tracking-[0.16em] mb-2.5"
              style={{ color: r.color }}
            >
              Detected Violations
            </div>
            <ul className="space-y-2">
              {prohibitedFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle
                    className="h-3.5 w-3.5 shrink-0 mt-0.5"
                    style={{ color: r.color }}
                  />
                  <span className="text-[12.5px] leading-snug" style={{ color: "#1F2125" }}>
                    {flag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Obligations */}
      <div
        className="mt-3 rounded-[16px] p-6"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
      >
        <h3
          className="text-[11px] font-bold uppercase tracking-[0.18em]"
          style={{ color: "#8A8D93" }}
        >
          Key Obligations
        </h3>
        <ul className="mt-3 space-y-2.5">
          {r.obligations.map((o) => (
            <li key={o} className="flex items-start gap-2.5">
              <div
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: r.color }}
              />
              <span className="text-[13.5px] leading-relaxed" style={{ color: "#1F2125" }}>
                {o}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline + Penalty */}
      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div
          className="rounded-[14px] p-5"
          style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
        >
          <div
            className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "#8A8D93" }}
          >
            Timeline
          </div>
          <div className="mt-1.5 text-[13.5px] font-medium" style={{ color: "#1F2125" }}>
            {r.timeline}
          </div>
        </div>
        <div
          className="rounded-[14px] p-5"
          style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
        >
          <div
            className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
            style={{ color: "#8A8D93" }}
          >
            Maximum Penalty
          </div>
          <div className="mt-1.5 text-[13.5px] font-medium" style={{ color: "#1F2125" }}>
            {r.penalty}
          </div>
        </div>
      </div>
    </div>
  );
}
