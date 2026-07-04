import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  ChevronDown,
  Sparkles,
  Zap,
  BarChart2,
  Eye,
  MessageSquare,
  type LucideIcon,
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

type AnswerEntry = {
  step: Step;
  display: string;
};

type AiType = "generative" | "agentic" | "predictive" | "vision" | "nlp";

interface AiTypeInfo {
  id: AiType;
  Icon: LucideIcon;
  behavior: string;
  examples: string;
  typeName: string;
  typeSubtitle: string;
  educationText: string;
  regulatoryArticle: string;
  keyObligations: string[];
}

const AI_TYPES: AiTypeInfo[] = [
  {
    id: "generative",
    Icon: Sparkles,
    behavior: "It generates new content — text, images, code, audio or video — in response to prompts or instructions",
    examples: "e.g. AI writing assistants, image generators, code copilots, voice synthesis",
    typeName: "Generative AI",
    typeSubtitle: "General Purpose AI Model (GPAI) — EU AI Act Title VIII",
    educationText:
      "Generative AI can produce human-like content across many domains from a single model. The EU AI Act introduced dedicated GPAI provisions (Title VIII) that apply regardless of where or how the model is deployed — including to organisations that integrate third-party GPAI models into their products.",
    regulatoryArticle: "Articles 51–56 · Title VIII",
    keyObligations: [
      "Publish technical documentation summarising model capabilities and limitations",
      "Ensure training data copyright compliance and maintain a data summary",
      "Label all AI-generated content — especially synthetic media and deepfakes (Article 50)",
      "If training compute exceeds 10²⁵ FLOPs: adversarial testing + mandatory incident reporting to the EU AI Office",
    ],
  },
  {
    id: "agentic",
    Icon: Zap,
    behavior: "It works autonomously across multiple steps — planning, deciding and taking actions — without a human approving each individual step",
    examples: "e.g. AI agents that browse the web, manage calendars, send emails, execute code or control other software",
    typeName: "Agentic AI",
    typeSubtitle: "Autonomous AI Systems — Emerging Regulatory Category",
    educationText:
      "Agentic AI systems make sequential decisions and take real-world actions with minimal human intervention between steps. The EU AI Act does not yet have a standalone 'agentic AI' category, but human oversight requirements (Article 14) apply most critically to these systems — the more autonomous the system, the higher the compliance burden and personal liability exposure.",
    regulatoryArticle: "Article 9 (Risk Management) · Article 14 (Human Oversight)",
    keyObligations: [
      "Define and document human oversight mechanisms — who can intervene and how",
      "Establish a clear accountability chain for actions the agent takes autonomously",
      "If operating in a high-risk domain: a mandatory human override capability is required",
      "Prepare for rapidly evolving regulatory guidance — this is the most watched AI category in 2025–2026",
    ],
  },
  {
    id: "predictive",
    Icon: BarChart2,
    behavior: "It analyses historical data to predict an outcome, score or classification — such as risk, likelihood, fraud or eligibility",
    examples: "e.g. credit scoring, fraud detection, CV screening, medical diagnosis support, churn prediction",
    typeName: "Predictive ML",
    typeSubtitle: "Machine Learning — Primary Annex III High-Risk Category",
    educationText:
      "Predictive ML is the most established AI category and the primary focus of the EU AI Act's Annex III high-risk classification. If your system influences decisions about people in regulated domains — employment, credit, healthcare, education or justice — it almost certainly qualifies as high-risk and requires full compliance before deployment.",
    regulatoryArticle: "Annex III · Articles 9–15",
    keyObligations: [
      "Implement a risk management system maintained across the full AI lifecycle",
      "Document training data governance, quality controls and bias evaluation",
      "Complete a conformity assessment before deployment in any high-risk setting",
      "Maintain accuracy, robustness and fairness metrics — monitored continuously post-deployment",
    ],
  },
  {
    id: "vision",
    Icon: Eye,
    behavior: "It processes images or video to identify, classify, track or analyse objects, scenes, faces or human behaviour",
    examples: "e.g. facial recognition, CCTV analytics, medical imaging AI, quality control cameras, autonomous vehicle perception",
    typeName: "Computer Vision",
    typeSubtitle: "Visual AI — Biometric & Surveillance Exposure",
    educationText:
      "Computer Vision systems have the most direct exposure to the EU AI Act's prohibited practices — particularly when they process biometric data or are deployed in public spaces. If your system identifies, categorises or tracks individuals using physical or behavioural characteristics, specific prohibitions may apply before you even reach the risk tier classification.",
    regulatoryArticle: "Article 5 (Prohibitions) · Annex III · Article 26",
    keyObligations: [
      "If processing biometric data: DPIA under GDPR is required as a prerequisite to deployment",
      "Real-time facial recognition in publicly accessible spaces is prohibited except narrow law-enforcement exceptions",
      "Biometric categorisation by ethnicity, gender or emotion carries automatic high-risk classification",
      "Document all camera locations, data retention periods and access control policies",
    ],
  },
  {
    id: "nlp",
    Icon: MessageSquare,
    behavior: "It reads, interprets, classifies or responds to human language — text or speech — but does not generate substantial new content",
    examples: "e.g. sentiment analysis, document classification, customer service chatbots, speech-to-text, content moderation",
    typeName: "NLP / Language AI",
    typeSubtitle: "Natural Language Processing — Transparency & Domain Obligations",
    educationText:
      "Non-generative NLP systems — classifiers, chatbots, transcription tools — primarily face Article 50 transparency obligations when interacting with users, and Annex III high-risk classification if deployed in regulated domains. The key distinction from Generative AI is that NLP processes and classifies language without producing large volumes of novel content.",
    regulatoryArticle: "Article 50 (Transparency) · Annex III",
    keyObligations: [
      "Disclose clearly to users that they are interacting with an AI system — not a human (Article 50)",
      "If used in employment screening, interview tools or performance monitoring: high-risk classification applies",
      "If used in justice, law enforcement, credit decisions or medical triage: high-risk classification applies",
      "Maintain documentation of the system's purpose, decision logic and known limitations",
    ],
  },
];

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

const QUESTION_SHORT: Record<Step, string> = {
  q1: "Affects individual people?",
  q2: "Uses manipulative techniques?",
  q3: "Social scoring for authorities?",
  q4: "Uses biometric data?",
  q5: "Real-time biometric ID in public spaces?",
  q6: "High-risk domains selected",
  q7: "Chatbot or synthetic media?",
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

/* ─── AI Type selector (Step 0) ─────────────────────────────── */

function TypeSelector({ onSelect }: { onSelect: (t: AiType) => void }) {
  const [hovered, setHovered] = useState<AiType | null>(null);
  const [chosen, setChosen] = useState<AiType | null>(null);

  const info = chosen ? AI_TYPES.find((t) => t.id === chosen)! : null;

  return (
    <div>
      <div
        className="rounded-[20px] p-7 lg:p-10"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
      >
        <p
          className="text-[11px] font-bold uppercase tracking-[0.2em]"
          style={{ color: "#8A8D93" }}
        >
          Before we begin
        </p>
        <h2
          className="mt-3 text-[20px] font-medium leading-snug lg:text-[24px]"
          style={{ color: "#1F2125" }}
        >
          What does your AI system <em>do</em>?
        </h2>
        <p className="mt-2 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          Don't worry about the technical category — pick the description that best matches how
          your system behaves from a user's perspective.
        </p>

        {/* Behavior cards */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AI_TYPES.map((t) => {
            const isChosen = chosen === t.id;
            const isHovered = hovered === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setChosen(t.id)}
                onMouseEnter={() => setHovered(t.id)}
                onMouseLeave={() => setHovered(null)}
                className="rounded-[14px] p-4 text-left transition-all"
                style={{
                  background: isChosen ? "#E9EFF4" : isHovered ? "#EEF4F8" : "#FAFAF8",
                  border: isChosen
                    ? "1.5px solid #34506E"
                    : isHovered
                    ? "1.5px solid #B8C9D9"
                    : "1px solid #E3E1DA",
                  transform: isChosen ? "none" : isHovered ? "scale(1.01)" : "none",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]"
                    style={{
                      background: isChosen ? "#34506E" : "#E9EFF4",
                    }}
                  >
                    <t.Icon
                      className="h-4 w-4"
                      style={{ color: isChosen ? "#FAFAF8" : "#34506E" }}
                    />
                  </div>
                  {isChosen && (
                    <div
                      className="ml-auto flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{ background: "#34506E" }}
                    >
                      <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                        <path
                          d="M1 3L3 5L7 1"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <p
                  className="mt-3 text-[12.5px] leading-snug"
                  style={{ color: isChosen ? "#34506E" : "#1F2125", fontWeight: isChosen ? 500 : 400 }}
                >
                  {t.behavior}
                </p>
                <p
                  className="mt-2 text-[11px] leading-relaxed"
                  style={{ color: "#8A8D93" }}
                >
                  {t.examples}
                </p>
              </button>
            );
          })}
          {/* "None / Not sure" card */}
          <button
            onClick={() => onSelect("predictive")}
            className="rounded-[14px] p-4 text-left transition-all"
            style={{
              background: "#FAFAF8",
              border: "1px dashed #D7D4CC",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F2F0EA";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#FAFAF8";
            }}
          >
            <p className="text-[12.5px]" style={{ color: "#8A8D93" }}>
              None of these fit, or I'm not sure
            </p>
            <p className="mt-1.5 text-[11px]" style={{ color: "#B0B3B8" }}>
              We'll treat your system as Predictive ML and proceed with the standard risk questions.
            </p>
          </button>
        </div>

        {/* Reveal panel — appears after selection */}
        <AnimatePresence>
          {info && (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              className="mt-6 rounded-[16px] overflow-hidden"
              style={{ border: "1.5px solid #D7D4CC" }}
            >
              {/* Type reveal header */}
              <div
                className="flex items-start gap-3 px-5 py-4"
                style={{ background: "#E9EFF4" }}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
                  style={{ background: "#34506E" }}
                >
                  <info.Icon className="h-4.5 w-4.5 h-[18px] w-[18px]" style={{ color: "#FAFAF8" }} />
                </div>
                <div className="flex-1">
                  <div
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: "#34506E", opacity: 0.7 }}
                  >
                    Your AI type is
                  </div>
                  <div className="text-[18px] font-semibold leading-tight" style={{ color: "#1F2125" }}>
                    {info.typeName}
                  </div>
                  <div className="text-[11px]" style={{ color: "#5A5D63" }}>
                    {info.typeSubtitle}
                  </div>
                </div>
              </div>

              {/* Education + obligations */}
              <div className="px-5 py-4" style={{ background: "#FAFAF8" }}>
                <p className="text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
                  {info.educationText}
                </p>

                <div className="mt-4">
                  <div
                    className="text-[9.5px] font-bold uppercase tracking-[0.18em] mb-2"
                    style={{ color: "#34506E" }}
                  >
                    Key regulatory obligations · {info.regulatoryArticle}
                  </div>
                  <ul className="space-y-2">
                    {info.keyObligations.map((ob, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 flex items-center justify-center rounded-full text-[8px] font-bold"
                          style={{ background: "#E9EFF4", color: "#34506E" }}
                        >
                          {i + 1}
                        </span>
                        <span className="text-[12.5px] leading-snug" style={{ color: "#1F2125" }}>
                          {ob}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => onSelect(info.id)}
                  className="mt-5 inline-flex items-center gap-2 rounded-[10px] px-6 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-90"
                  style={{ background: "#34506E", color: "#FAFAF8" }}
                >
                  Continue to Risk Assessment <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Step dots progress indicator ──────────────────────────── */

const ALL_STEPS: Step[] = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"];

function StepDots({ current, answered }: { current: Step; answered: Step[] }) {
  return (
    <div className="mb-6">
      <div className="flex items-center">
        {ALL_STEPS.map((s, i) => {
          const done = answered.includes(s);
          const active = s === current;
          return (
            <div key={s} className="flex flex-1 items-center">
              {/* Connector line before each dot (except first) */}
              {i > 0 && (
                <div
                  style={{
                    flex: 1,
                    height: 2,
                    borderRadius: 1,
                    background: done ? "#34506E" : "#E3E1DA",
                    transition: "background 0.4s ease",
                  }}
                />
              )}
              {/* Dot */}
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: done ? "#34506E" : active ? "#FAFAF8" : "#F2F0EA",
                  border: active
                    ? "2px solid #34506E"
                    : done
                    ? "none"
                    : "1.5px solid #E3E1DA",
                  boxShadow: active ? "0 0 0 5px rgba(52,80,110,0.12)" : "none",
                  fontSize: 11,
                  fontWeight: 700,
                  color: done ? "#fff" : active ? "#34506E" : "#B0B3B8",
                  transition: "all 0.35s ease",
                }}
              >
                {done ? (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4.5L3.8 7.5L10 1"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              {/* Connector line after last dot */}
              {i === ALL_STEPS.length - 1 && <div style={{ flex: 1 }} />}
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-[11px]" style={{ color: "#8A8D93" }}>
          Question {QUESTIONS[current].number} of 7
        </span>
        <span className="text-[10px]" style={{ color: "#B0B3B8" }}>
          may resolve earlier ·{" "}
          <span style={{ color: "#34506E", fontWeight: 600 }}>
            {STEP_PROGRESS[current]}%
          </span>
        </span>
      </div>
    </div>
  );
}

/* ─── Assessment state machine ───────────────────────────────── */

function Assessment() {
  const [aiType, setAiType] = useState<AiType | null>(null);
  const [step, setStep] = useState<Step>("q1");
  const [history, setHistory] = useState<Step[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [direction, setDirection] = useState<"fwd" | "bwd">("fwd");

  const [prohibitedFlags, setProhibitedFlags] = useState<string[]>([]);
  const [prohibitedSources, setProhibitedSources] = useState<Step[]>([]);
  const [highRisk, setHighRisk] = useState(false);
  const [highRiskTriggers, setHighRiskTriggers] = useState<string[]>([]);
  const [terminalResult, setTerminalResult] = useState<"limited" | "minimal" | null>(null);
  const [done, setDone] = useState(false);
  const [answerLog, setAnswerLog] = useState<AnswerEntry[]>([]);

  // Set when a prohibited answer is given — shows inline warning on the current question
  const [inlineWarning, setInlineWarning] = useState<{
    flag: string;
    nextStep: Step | null;
  } | null>(null);

  function formatAnswer(s: Step, answer: boolean | string[]): string {
    if (typeof answer === "boolean") return answer ? "Yes" : "No";
    if ((answer as string[]).length === 0) return "None";
    const opts = QUESTIONS.q6.options!;
    return (answer as string[]).map(id => opts.find(o => o.id === id)?.label ?? id).join(" · ");
  }

  function handleAnswer(answer: boolean | string[]) {
    // Log the answer
    setAnswerLog(log => [...log, { step, display: formatAnswer(step, answer) }]);

    // q7 always ends the assessment
    if (step === "q7") {
      setTerminalResult(answer === true ? "limited" : "minimal");
      setDone(true);
      return;
    }

    const nav = getNavigation(step, answer);

    if (nav.prohibitedFlag) {
      setProhibitedFlags(f => [...f, nav.prohibitedFlag!]);
      setProhibitedSources(s => [...s, step]);
      setInlineWarning({ flag: nav.prohibitedFlag!, nextStep: nav.nextStep });
      return;
    }

    if (nav.highRiskFlag) {
      setHighRisk(true);
      if (step === "q5") {
        setHighRiskTriggers(t => [
          ...t,
          "Biometric data processing (Q4: Yes) — not real-time public (Q5: No)",
        ]);
      } else if (step === "q6") {
        const domains = answer as string[];
        const opts = QUESTIONS.q6.options!;
        const labels = domains.map(id => opts.find(o => o.id === id)?.label ?? id);
        setHighRiskTriggers(t => [...t, `High-risk domains (Q6): ${labels.join(" · ")}`]);
      }
    }

    if (nav.nextStep === null) {
      setDone(true);
      return;
    }

    setDirection("fwd");
    setHistory(h => [...h, step]);
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
    setDirection("fwd");
    setHistory(h => [...h, step]);
    setStep(warn.nextStep);
    setSelected([]);
  }

  function goBack() {
    if (inlineWarning) {
      setProhibitedFlags(f => f.slice(0, -1));
      setProhibitedSources(s => s.slice(0, -1));
      setAnswerLog(log => log.slice(0, -1));
      setInlineWarning(null);
      return;
    }
    const prev = history[history.length - 1];
    if (prev) {
      setDirection("bwd");
      setHistory(h => h.slice(0, -1));
      setStep(prev);
      setSelected([]);
      setAnswerLog(log => log.slice(0, -1));
    }
  }

  function reset() {
    setAiType(null);
    setStep("q1");
    setHistory([]);
    setSelected([]);
    setProhibitedFlags([]);
    setProhibitedSources([]);
    setHighRisk(false);
    setHighRiskTriggers([]);
    setTerminalResult(null);
    setDone(false);
    setInlineWarning(null);
    setAnswerLog([]);
  }

  if (!aiType) {
    return <TypeSelector onSelect={(t) => setAiType(t)} />;
  }

  if (done) {
    return (
      <ComprehensiveResult
        aiType={aiType}
        prohibitedFlags={prohibitedFlags}
        prohibitedSources={prohibitedSources}
        highRisk={highRisk}
        highRiskTriggers={highRiskTriggers}
        terminalResult={terminalResult}
        answerLog={answerLog}
        onReset={reset}
      />
    );
  }

  const q = QUESTIONS[step];
  const canGoBack = history.length > 0 || !!inlineWarning;

  return (
    <div>
      {/* Step dots */}
      <StepDots current={step} answered={history} />

      {/* Animated question card */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={{
            enter: (d: "fwd" | "bwd") => ({ x: d === "fwd" ? 48 : -48, opacity: 0 }),
            center: { x: 0, opacity: 1 },
            exit: (d: "fwd" | "bwd") => ({ x: d === "fwd" ? -48 : 48, opacity: 0 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
        >
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
        </motion.div>
      </AnimatePresence>

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

/* ─── Gauge helpers ──────────────────────────────────────────── */

function polarXY(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(cx: number, cy: number, ro: number, ri: number, a1: number, a2: number) {
  const p1 = polarXY(cx, cy, ro, a1);
  const p2 = polarXY(cx, cy, ro, a2);
  const p3 = polarXY(cx, cy, ri, a2);
  const p4 = polarXY(cx, cy, ri, a1);
  const large = a2 - a1 > 180 ? 1 : 0;
  return `M${p1.x},${p1.y} A${ro},${ro} 0 ${large} 1 ${p2.x},${p2.y} L${p3.x},${p3.y} A${ri},${ri} 0 ${large} 0 ${p4.x},${p4.y}Z`;
}

// Gauge arcs run from 180° (left) → 270° (top) → 360° (right), clockwise on screen
const GAUGE_ZONES = [
  { result: "minimal"    as Result, from: 180, to: 225, color: "#16A34A", short: "MIN"  },
  { result: "limited"    as Result, from: 225, to: 270, color: "#34506E", short: "LTD"  },
  { result: "high"       as Result, from: 270, to: 315, color: "#D97706", short: "HIGH" },
  { result: "prohibited" as Result, from: 315, to: 360, color: "#DC2626", short: "PROH" },
];

// SVG rotate angle so needle (pointing up by default) aims at zone midpoint
const NEEDLE_ROTATE: Record<Result, number> = {
  minimal:    -67.5,
  limited:    -22.5,
  high:        22.5,
  prohibited:  67.5,
};

function RiskGauge({ topResult }: { topResult: Result }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 80);
    return () => clearTimeout(t);
  }, []);

  const cx = 100, cy = 100, ro = 76, ri = 52, gap = 2.5, needleLen = 60;
  const r = RESULTS[topResult];

  return (
    <svg
      viewBox="0 0 200 110"
      aria-label={`Risk gauge showing ${r.level}`}
      className="w-full max-w-[300px]"
    >
      {/* Background track */}
      <path d={arcPath(cx, cy, ro + 2, ri - 2, 180, 360)} fill="#E3E1DA" />

      {/* Coloured zone arcs */}
      {GAUGE_ZONES.map((z) => (
        <path
          key={z.result}
          d={arcPath(cx, cy, ro, ri, z.from + gap, z.to - gap)}
          fill={z.color}
          opacity={topResult === z.result ? 1 : 0.2}
        />
      ))}

      {/* Animated needle */}
      <g
        style={{
          transform: `rotate(${ready ? NEEDLE_ROTATE[topResult] : -90}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <line
          x1={cx} y1={cy} x2={cx} y2={cy - needleLen}
          stroke="#1F2125" strokeWidth="2.5" strokeLinecap="round"
        />
        <circle cx={cx} cy={cy - needleLen} r="3.5" fill={r.color} />
      </g>

      {/* Centre cap */}
      <circle cx={cx} cy={cy} r="7.5" fill="#E3E1DA" />
      <circle cx={cx} cy={cy} r="5"   fill="#1F2125" />

      {/* Zone labels just outside the arc */}
      {GAUGE_ZONES.map((z) => {
        const mid = (z.from + z.to) / 2;
        const lp  = polarXY(cx, cy, ro + 12, mid);
        return (
          <text
            key={z.result}
            x={lp.x} y={lp.y}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="6" fontWeight="700"
            fill={z.color}
            opacity={topResult === z.result ? 1 : 0.35}
          >
            {z.short}
          </text>
        );
      })}
    </svg>
  );
}

/* ─── AI Type result card ────────────────────────────────────── */

function AiTypeResultCard({ aiType }: { aiType: AiType }) {
  const info = AI_TYPES.find((t) => t.id === aiType)!;
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="mt-3 rounded-[16px] overflow-hidden"
      style={{ border: "1.5px solid #D7D4CC" }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 text-left transition-colors"
        style={{ background: "#E9EFF4" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#DDE8F0")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#E9EFF4")}
      >
        <div
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px]"
          style={{ background: "#34506E" }}
        >
          <info.Icon className="h-[16px] w-[16px]" style={{ color: "#FAFAF8" }} />
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#34506E", opacity: 0.7 }}>
            Your AI type
          </div>
          <div className="text-[14px] font-semibold leading-tight" style={{ color: "#1F2125" }}>
            {info.typeName}
          </div>
          <div className="text-[10.5px]" style={{ color: "#5A5D63" }}>
            {info.typeSubtitle}
          </div>
        </div>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-200"
          style={{ color: "#8A8D93", transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {expanded && (
        <div className="px-5 py-4" style={{ background: "#FAFAF8" }}>
          <p className="text-[13px] leading-relaxed" style={{ color: "#5A5D63" }}>
            {info.educationText}
          </p>
          <div className="mt-4">
            <div
              className="text-[9.5px] font-bold uppercase tracking-[0.18em] mb-2"
              style={{ color: "#34506E" }}
            >
              Type-specific obligations · {info.regulatoryArticle}
            </div>
            <ul className="space-y-2">
              {info.keyObligations.map((ob, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span
                    className="mt-[3px] h-3.5 w-3.5 shrink-0 flex items-center justify-center rounded-full text-[8px] font-bold"
                    style={{ background: "#E9EFF4", color: "#34506E" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-[12.5px] leading-snug" style={{ color: "#1F2125" }}>
                    {ob}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Comprehensive results ──────────────────────────────────── */

function ComprehensiveResult({
  aiType,
  prohibitedFlags,
  prohibitedSources,
  highRisk,
  highRiskTriggers,
  terminalResult,
  answerLog,
  onReset,
}: {
  aiType: AiType;
  prohibitedFlags: string[];
  prohibitedSources: Step[];
  highRisk: boolean;
  highRiskTriggers: string[];
  terminalResult: "limited" | "minimal" | null;
  answerLog: AnswerEntry[];
  onReset: () => void;
}) {
  const [showAnswers, setShowAnswers] = useState(false);

  const sections: Result[] = [];
  if (prohibitedFlags.length > 0) sections.push("prohibited");
  if (highRisk) sections.push("high");
  if (terminalResult === "limited") sections.push("limited");
  // Minimal only shown when no other tier applies
  if (sections.length === 0) sections.push(terminalResult ?? "minimal");

  const topResult = sections[0];
  const r = RESULTS[topResult];

  // Build trigger strings per tier
  const prohibitedTriggers = prohibitedSources.map(
    (s) => `Q${s.slice(1)}: ${QUESTION_SHORT[s]} — Yes`
  );
  const limitedTrigger = ["Q7: Chatbot or virtual assistant / synthetic media — Yes"];

  return (
    <div>
      {/* ── Gauge card ── */}
      <div
        className="rounded-[20px] p-6 lg:p-8 flex flex-col items-center text-center"
        style={{ background: "#F2F0EA", border: "1px solid #E3E1DA" }}
      >
        <RiskGauge topResult={topResult} />

        <div className="mt-3 text-[34px] font-semibold leading-none" style={{ color: r.color }}>
          {r.level}
        </div>
        <div
          className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: r.color, opacity: 0.75 }}
        >
          {r.badge}
        </div>
        <div className="mt-2 text-[13px]" style={{ color: "#5A5D63" }}>
          {r.penalty}
        </div>

        {/* Additional tiers */}
        {sections.length > 1 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px]" style={{ color: "#8A8D93" }}>Also detected:</span>
            {sections.slice(1).map((s) => {
              const sr = RESULTS[s];
              const SrIcon = sr.Icon;
              return (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold"
                  style={{ background: sr.bg, border: `1px solid ${sr.border}`, color: sr.color }}
                >
                  <SrIcon className="h-3 w-3" /> {sr.level}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Your answers collapsible ── */}
      {answerLog.length > 0 && (
        <div
          className="mt-3 rounded-[14px] overflow-hidden"
          style={{ border: "1px solid #E3E1DA" }}
        >
          <button
            onClick={() => setShowAnswers(v => !v)}
            className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors"
            style={{ background: "#F2F0EA" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDEBE3")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F2F0EA")}
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: "#5A5D63" }}>
              Your assessment answers
            </span>
            <ChevronDown
              className="h-3.5 w-3.5 transition-transform duration-200"
              style={{
                color: "#8A8D93",
                transform: showAnswers ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          {showAnswers && (
            <div className="px-5 py-3" style={{ background: "#FAFAF8" }}>
              <div className="space-y-2">
                {answerLog.map((entry, i) => (
                  <div key={i} className="flex items-baseline gap-3">
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-[9.5px] font-bold uppercase tracking-wide"
                      style={{ background: "#E9EFF4", color: "#34506E" }}
                    >
                      Q{entry.step.slice(1)}
                    </span>
                    <span className="text-[12px]" style={{ color: "#5A5D63" }}>
                      {QUESTION_SHORT[entry.step]}
                    </span>
                    <span
                      className="ml-auto shrink-0 text-[12px] font-semibold"
                      style={{ color: "#1F2125" }}
                    >
                      {entry.display}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── AI type card ── */}
      <AiTypeResultCard aiType={aiType} />

      {/* ── Per-tier obligation cards ── */}
      <div className="mt-3 space-y-3">
        {sections.map((result) => (
          <ObligationCard
            key={result}
            result={result}
            prohibitedFlags={result === "prohibited" ? prohibitedFlags : undefined}
            prohibitedSources={result === "prohibited" ? prohibitedSources : undefined}
            triggeredBy={
              result === "high"
                ? highRiskTriggers
                : result === "limited"
                ? limitedTrigger
                : undefined
            }
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <div
        className="mt-4 rounded-[16px] p-6 lg:p-8"
        style={{ background: "#E9EFF4", border: "1px solid #D7D4CC" }}
      >
        <h3 className="text-[17px] font-medium" style={{ color: "#1F2125" }}>
          Have questions about your result?
        </h3>
        <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: "#5A5D63" }}>
          Ask the AI Agent for immediate guidance on your specific obligations — or speak directly
          with Dr. Mpofu for a personalised compliance roadmap.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link
            to="/ai-agent"
            className="inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13.5px] font-semibold transition-all hover:opacity-90"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            <Bot className="h-4 w-4" /> Ask My AI Agent
          </Link>
          <Link
            to="/contact"
            className="text-[13px] font-medium transition-colors"
            style={{ color: "#5A5D63" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5D63")}
          >
            Talk to an expert →
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
        regulatory guidance. Consult a qualified legal or compliance professional for binding advice.
      </p>
    </div>
  );
}

/* ─── Per-tier obligation card ───────────────────────────────── */

function ObligationCard({
  result,
  prohibitedFlags,
  prohibitedSources,
  triggeredBy,
}: {
  result: Result;
  prohibitedFlags?: string[];
  prohibitedSources?: Step[];
  triggeredBy?: string[];
}) {
  const r = RESULTS[result];
  const Icon = r.Icon;

  return (
    <div className="rounded-[16px] overflow-hidden" style={{ border: `1.5px solid ${r.border}` }}>
      {/* Coloured header strip */}
      <div
        className="flex items-center gap-2.5 px-5 py-3"
        style={{ background: r.bg }}
      >
        <Icon className="h-4 w-4 shrink-0" style={{ color: r.color }} />
        <span
          className="text-[10.5px] font-bold uppercase tracking-[0.16em]"
          style={{ color: r.color }}
        >
          {r.badge}
        </span>
        <span className="ml-auto text-[10.5px]" style={{ color: r.color, opacity: 0.7 }}>
          {r.timeline}
        </span>
      </div>

      {/* "Triggered by" section for high / limited tiers */}
      {triggeredBy && triggeredBy.length > 0 && (
        <div
          className="px-5 py-3"
          style={{ background: r.bg, borderBottom: `1px solid ${r.border}` }}
        >
          <div
            className="text-[9.5px] font-bold uppercase tracking-[0.18em] mb-1.5"
            style={{ color: r.color, opacity: 0.65 }}
          >
            Why this applies to your system
          </div>
          <div className="space-y-0.5">
            {triggeredBy.map((t, i) => (
              <div key={i} className="text-[11.5px] leading-snug" style={{ color: r.color }}>
                → {t}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="px-5 py-4" style={{ background: "#FAFAF8" }}>
        {/* Violations (prohibited tier only) with Q-number chips */}
        {prohibitedFlags && prohibitedFlags.length > 0 && (
          <div className="mb-4">
            <div
              className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
              style={{ color: r.color }}
            >
              Detected Violations
            </div>
            <ul className="space-y-2">
              {prohibitedFlags.map((flag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <XCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: r.color }} />
                  <span className="flex-1 text-[12px] leading-snug" style={{ color: "#1F2125" }}>
                    {flag}
                  </span>
                  {prohibitedSources?.[i] && (
                    <span
                      className="shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide"
                      style={{ background: "#FEE2E2", color: r.color }}
                    >
                      Q{prohibitedSources[i].slice(1)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t" style={{ borderColor: "#E3E1DA" }} />
          </div>
        )}

        {/* Obligations */}
        <div
          className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5"
          style={{ color: "#8A8D93" }}
        >
          Key Obligations
        </div>
        <ul className="space-y-2">
          {r.obligations.map((o) => (
            <li key={o} className="flex items-start gap-2">
              <div
                className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: r.color }}
              />
              <span className="text-[13px] leading-relaxed" style={{ color: "#1F2125" }}>
                {o}
              </span>
            </li>
          ))}
        </ul>

        {/* Penalty inline */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: "#E3E1DA" }}>
          <span className="text-[11.5px]" style={{ color: "#5A5D63" }}>Max penalty: </span>
          <span className="text-[11.5px] font-semibold" style={{ color: "#1F2125" }}>
            {r.penalty}
          </span>
        </div>
      </div>
    </div>
  );
}
