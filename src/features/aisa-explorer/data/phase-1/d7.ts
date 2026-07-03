import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D7 — DECISION ANALYSIS
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Map Decision Requirements ───────────────────────────────────

const EG_DECISION_REQUIREMENTS: AISANode = {
  id: 'p1-d7-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Decision Information Requirements',
  description: 'For each decision in the process, document the information required to make it well — including the data, context, and expertise the decision-maker currently draws on.',
  purpose: 'Establish what a good AI decision-support system must provide by understanding what information currently drives each decision.',
  why_it_matters: 'AI decision-support that provides different information from what the human decision-maker actually uses will not be trusted or adopted. Mapping the real information requirements ensures AI design supports the actual cognitive model, not a theoretical one.',
  methods: [
    '1. Take the decision catalogue from D4 SA4 as the starting point.',
    '2. For each decision, interview the person who makes it: "When you make this decision, what information do you look at? What would make you more confident? What is the most uncertain piece of information?"',
    '3. Document for each decision: the data fields consulted, the contextual knowledge applied (not captured in data), the experience or expertise drawn on, the time available to make the decision, and the consequences of getting it wrong.',
    '4. Identify information gaps: cases where the decision-maker wishes they had information that is not currently available.',
    '5. Map information requirements to data sources from D6 — confirm which required information is available and which is absent.',
  ],
  tools: ['Decision requirements mapping template', 'Decision catalogue from D4'],
  outputs: ['Decision information requirements map: per decision — data used, contextual knowledge, expertise, time, and information gaps'],
  exit_criteria: ['Information requirements documented for all in-scope decisions; information gaps identified; availability confirmed against D6 data sources'],
}

const T_DECISION_REQUIREMENTS: AISANode = {
  id: 'p1-d7-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Map Decision Information Requirements',
  description: 'For each in-scope decision, document what information the decision-maker uses and what they wish they had.',
  purpose: 'Ensure AI decision-support design provides the information that actually drives decisions, not a proxy.',
  inputs: ['Decision catalogue from D4', 'Decision-maker contacts', 'Data source inventory from D6', 'Decision requirements mapping template'],
  methods: ['Decision-maker interviews', 'Data and context mapping', 'Information gap identification', 'Data source availability check'],
  tools: ['Decision requirements mapping template'],
  outputs: ['Decision information requirements map with gaps identified'],
  children: [EG_DECISION_REQUIREMENTS],
}

const SA1_DECISION_REQUIREMENTS: AISANode = {
  id: 'p1-d7-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Map Decision Requirements',
  description: 'Document the information requirements, contextual knowledge, and expertise that currently drive each in-scope process decision.',
  purpose: 'Ground AI decision-support design in the real cognitive requirements of each decision, not a simplified model.',
  why_it_matters: 'AI that supports the right decisions with the wrong information is useless. AI that supports the right decisions with the right information but in an inaccessible format is equally useless. Requirements mapping before design ensures neither failure mode occurs.',
  inputs: ['Decision catalogue from D4', 'Data source inventory from D6', 'Decision-maker contacts'],
  questions: ['What information does the decision-maker actually consult when making this decision?', 'What is the most uncertain element of the decision?', 'What information do they wish they had?'],
  methods: ['Decision-maker interviews', 'Information requirement mapping', 'Gap analysis against available data sources'],
  tools: ['Decision requirements mapping template'],
  outputs: ['Decision information requirements map with gaps'],
  deliverables: ['Decision Requirements Map (input to Phase 3 AI architecture)'],
  exit_criteria: ['All in-scope decisions have documented information requirements; gaps identified and checked against D6 data inventory'],
  children: [T_DECISION_REQUIREMENTS],
}

// ─── SA2: Classify Decision Types ─────────────────────────────────────

const EG_DECISION_CLASSIFICATION: AISANode = {
  id: 'p1-d7-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Classifying Decisions by Type and AI Design Pattern',
  description: 'Apply a structured classification to each in-scope decision to determine the appropriate AI design pattern: rule-based, ML classification, regression, ranking, generative assistance, or human-only.',
  purpose: 'Map each decision to its optimal AI design pattern, preventing the common failure of applying the wrong AI approach to a decision type it is not suited to.',
  why_it_matters: 'Using an ML model for a decision that is fully deterministic (rule-based) wastes engineering effort and introduces unnecessary uncertainty. Using a rule-based system for a decision that requires pattern recognition in high-dimensional data produces systematic errors. Classification determines fit.',
  methods: [
    '1. For each decision, apply the following classification framework:',
    '   (a) Deterministic rule-based: decision outcome is fully determined by a set of explicit rules (e.g., "if score > 700, approve"). → AI pattern: Rule Engine.',
    '   (b) Threshold/scoring: decision is based on a score that must exceed a threshold, where the score itself must be calculated. → AI pattern: Regression/Scoring Model.',
    '   (c) Pattern classification: decision requires recognising which of several known categories an input belongs to, based on historical examples. → AI pattern: Supervised Classifier.',
    '   (d) Ranking/recommendation: decision requires ordering or recommending from a set of options. → AI pattern: Ranking or Recommendation Model.',
    '   (e) Natural language understanding: decision requires interpreting unstructured text or speech. → AI pattern: NLP/LLM.',
    '   (f) Contextual judgment: decision depends on professional experience, contextual factors, and non-quantifiable risk assessment. → AI pattern: AI-Assisted (human decides with AI-provided context).',
    '   (g) Ethics/legal/high-stakes: decision has legal consequence, significant individual impact, or requires accountability. → Pattern: Human Only or Human-Oversight Required with AI support.',
    '2. For each classification, note: the data type that drives the decision, the expected model type, and the human oversight requirement.',
  ],
  tools: ['Decision classification matrix'],
  outputs: ['Decision classification matrix: each decision mapped to AI design pattern and oversight requirement'],
  exit_criteria: ['All in-scope decisions classified; AI design pattern assigned; human oversight requirements defined'],
}

const T_DECISION_CLASSIFICATION: AISANode = {
  id: 'p1-d7-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Classify Decisions by Type and AI Pattern',
  description: 'Apply a classification framework to each in-scope decision to assign the optimal AI design pattern.',
  purpose: 'Prevent mismatching AI approach to decision type by classifying before designing.',
  inputs: ['Decision requirements map from SA1', 'Decision classification framework', 'Decision classification matrix template'],
  methods: ['Decision type classification (7-category framework)', 'AI design pattern assignment', 'Oversight requirement definition'],
  tools: ['Decision classification matrix'],
  outputs: ['Decision classification matrix with AI pattern and oversight requirement per decision'],
  children: [EG_DECISION_CLASSIFICATION],
}

const SA2_DECISION_TYPES: AISANode = {
  id: 'p1-d7-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Classify Decision Types',
  description: 'Map each in-scope decision to its type and optimal AI design pattern, and define the human oversight requirement for each.',
  purpose: 'Ensure each decision is matched to an AI approach suited to its cognitive requirements — avoiding both under-application and over-application of AI capability.',
  why_it_matters: 'Decision type classification is the most important input to AI model selection in Phase 3. It determines what kind of model is built, what data it needs, and what role the human plays. Getting it right here prevents expensive model redesign in Phase 4.',
  inputs: ['Decision requirements map from SA1', 'Decision classification framework', 'Compliance requirements from Phase 2 scope preview'],
  questions: ['What type of cognitive task does each decision represent?', 'What AI pattern best supports that cognitive task?', 'What level of human oversight does each decision require?'],
  methods: ['7-category decision type framework application', 'AI pattern assignment', 'Oversight requirement definition'],
  tools: ['Decision classification matrix'],
  governance_considerations: 'Decisions classified as having significant individual impact must be flagged for EU AI Act Art. 14 human oversight requirements and GDPR Art. 22 automated decision-making restrictions.',
  outputs: ['Decision classification matrix with AI pattern and oversight requirements'],
  deliverables: ['Decision Classification Matrix (input to Phase 3 AI model design)'],
  exit_criteria: ['All decisions classified; AI pattern assigned; oversight requirements defined; high-impact decisions flagged for EU AI Act and GDPR compliance'],
  children: [T_DECISION_CLASSIFICATION],
}

// ─── SA3: Define Decision Acceptance Criteria ──────────────────────────

const EG_DECISION_ACCEPTANCE: AISANode = {
  id: 'p1-d7-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining AI Decision Acceptance Criteria',
  description: 'Establish the performance thresholds and confidence requirements that an AI decision-support system must meet for each in-scope decision before it is trusted and adopted.',
  purpose: 'Define testable acceptance criteria for AI decision-making before system design begins, so acceptance testing in Phase 4 is unambiguous.',
  why_it_matters: 'AI systems without pre-defined acceptance criteria are accepted or rejected by subjective stakeholder impression rather than objective performance measurement. Defining criteria upfront makes the acceptance decision defensible and prevents both premature deployment and indefinite scope-creep during testing.',
  methods: [
    '1. For each AI-classified decision (not Human Only), define: (a) Minimum precision required — what % of AI decisions that are positive must actually be positive?; (b) Minimum recall required — what % of actual positives must the AI identify?; (c) Maximum false positive rate; (d) Maximum false negative rate (especially critical for high-consequence decisions); (e) Minimum confidence threshold for autonomous action (below this, escalate to human).',
    '2. Calibrate thresholds against the cost of error: for decisions where a false negative is more costly than a false positive (e.g., fraud detection), set recall higher than precision; reverse for decisions where false positives are more costly.',
    '3. Define the human escalation trigger: the confidence level or input condition that causes the AI to route to human review rather than act autonomously.',
    '4. Document acceptance criteria in measurable, testable form. No vague criteria like "acceptable accuracy."',
    '5. Obtain Business Owner sign-off on acceptance criteria before Phase 3.',
  ],
  tools: ['Decision acceptance criteria template'],
  outputs: ['Decision acceptance criteria: precision, recall, false positive/negative rates, and escalation triggers per AI-classified decision'],
  exit_criteria: ['Acceptance criteria defined in measurable terms for all AI-classified decisions; Business Owner has approved; escalation triggers defined'],
}

const T_DECISION_ACCEPTANCE: AISANode = {
  id: 'p1-d7-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Define Decision Acceptance Criteria',
  description: 'Establish measurable performance thresholds for AI decision-making before system design begins.',
  purpose: 'Ensure AI acceptance testing in Phase 4 is objective and pre-agreed rather than subjective.',
  inputs: ['Decision classification matrix from SA2', 'Business Owner and domain expert input', 'Decision acceptance criteria template', 'Cost-of-error assessment from D5 FMEA'],
  methods: ['Precision/recall threshold definition', 'False positive/negative rate calibration against error costs', 'Escalation trigger definition', 'Business Owner approval'],
  tools: ['Decision acceptance criteria template'],
  outputs: ['Decision acceptance criteria per AI-classified decision, approved by Business Owner'],
  children: [EG_DECISION_ACCEPTANCE],
}

const SA3_DECISION_CRITERIA: AISANode = {
  id: 'p1-d7-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Define Decision Acceptance Criteria',
  description: 'Establish pre-agreed, measurable performance thresholds for AI decision-making, including precision/recall targets, false positive/negative tolerances, and confidence-based escalation triggers.',
  purpose: 'Ensure AI system acceptance testing in Phase 4 is objective, pre-agreed, and resistant to stakeholder subjectivity.',
  why_it_matters: 'Acceptance criteria defined after the system is built will always be influenced by what the system can achieve rather than what the business requires. Pre-definition in Phase 1 separates what is needed from what is possible — making the design target honest and the acceptance test fair.',
  inputs: ['Decision classification matrix', 'Cost-of-error data from D5 FMEA', 'Business Owner input on risk tolerance'],
  questions: ['What accuracy is good enough for this decision?', 'Is a false negative or false positive more costly?', 'Below what confidence should the AI escalate to a human?'],
  methods: ['Precision/recall threshold definition', 'Error cost calibration', 'Escalation trigger definition', 'Business Owner approval'],
  tools: ['Decision acceptance criteria template'],
  governance_considerations: 'For EU AI Act High Risk systems, acceptance criteria for accuracy, robustness, and cybersecurity must be documented in the technical documentation (Art. 11) and validated before market placement (Art. 43).',
  outputs: ['Decision acceptance criteria approved by Business Owner'],
  deliverables: ['Decision Acceptance Criteria (Phase 3 design target and Phase 4 acceptance test reference)'],
  exit_criteria: ['Measurable acceptance criteria defined for all AI-classified decisions; Business Owner sign-off obtained; escalation triggers defined for all autonomous decision paths'],
  children: [T_DECISION_ACCEPTANCE],
}

// ═══════════════════════════════════════════════════════════════════════
// D7 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D7: AISANode = {
  id: 'p1-d7',
  type: 'activity',
  level: 2,
  title: 'D7 — Decision Analysis',
  description: 'Analyse all in-scope process decisions in depth — mapping information requirements, classifying by AI design pattern, and defining pre-agreed acceptance criteria — to produce the decision design brief for Phase 3 AI architecture.',
  purpose: 'Produce a decision-level design brief that ensures every AI decision-support component is built for the right cognitive task, with the right data, to the right performance standard.',
  why_it_matters: 'Decisions are where AI creates or destroys trust in production. A system that makes decisions without understanding what the decision requires, which AI pattern fits it, and what accuracy is acceptable will be distrusted by the people who use it — regardless of its technical quality. Decision Analysis ensures AI design is grounded in the full cognitive and business context of each decision.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design'],
  inputs: ['Decision catalogue from D4', 'Data source inventory and quality scores from D6', 'Pain Point Matrix from D5', 'Process FMEA from D5'],
  questions: [
    'What information does each decision-maker actually use, and what do they wish they had?',
    'What type of AI pattern best fits each decision?',
    'What accuracy and confidence thresholds must AI achieve to be trusted?',
    'Which decisions require human oversight regardless of AI confidence?',
  ],
  activities: [
    'Map information requirements for each in-scope decision through decision-maker interviews',
    'Classify each decision by type and assign the optimal AI design pattern',
    'Define measurable acceptance criteria including precision, recall, and escalation triggers',
    'Identify decisions requiring mandatory human oversight for compliance',
  ],
  methods: ['Decision-maker interviews', '7-category decision type classification', 'AI pattern assignment', 'Precision/recall threshold definition', 'Escalation trigger design'],
  tools: ['Decision requirements mapping template', 'Decision classification matrix', 'Decision acceptance criteria template'],
  governance_considerations: 'Decisions classified as having significant individual impact require GDPR Art. 22 and EU AI Act Art. 14 compliance planning in Phase 2. Decision Analysis is the source document for this work.',
  ai_engineering_considerations: 'The decision classification matrix is the primary input to AI model selection in Phase 3. ML engineers should not select model types before this classification is complete and approved.',
  outputs: ['Decision information requirements map', 'Decision classification matrix with AI patterns', 'Decision acceptance criteria approved by Business Owner'],
  deliverables: ['Decision Analysis Report (Phase 1 Deliverable — input to Phase 2 governance and Phase 3 AI architecture)'],
  exit_criteria: [
    'Information requirements documented for all in-scope decisions',
    'All decisions classified with AI design pattern and oversight requirement',
    'Measurable acceptance criteria approved by Business Owner for all AI-classified decisions',
    'Escalation triggers defined for all autonomous decision paths',
    'High-impact decisions flagged for Phase 2 governance compliance planning',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'GDPR Art. 22 — Automated individual decision-making', type: 'standard' },
    { title: 'EU AI Act Art. 14 — Human oversight', type: 'standard' },
    { title: 'Designing Machine Learning Systems — Chip Huyen', type: 'book', author: 'Huyen, C.', year: 2022 },
    { title: 'Decision Intelligence — Lorien Pratt', type: 'book', author: 'Pratt, L.', year: 2019 },
  ],
  children: [SA1_DECISION_REQUIREMENTS, SA2_DECISION_TYPES, SA3_DECISION_CRITERIA],
}
