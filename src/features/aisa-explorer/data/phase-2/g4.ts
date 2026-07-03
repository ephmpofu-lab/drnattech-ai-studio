import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// G4 — RISK MANAGEMENT FRAMEWORK
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Design the AI Risk Register ─────────────────────────────────

const EG_RISK_REGISTER_DESIGN: AISANode = {
  id: 'p2-g4-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Designing and Populating the AI Risk Register',
  description: 'Design the AI-specific risk register structure and populate it with all risks identified across Phase 1 and Phase 2 governance activities.',
  purpose: 'Establish a single, comprehensive risk register that consolidates all identified AI risks and drives active risk management throughout delivery and operation.',
  why_it_matters: 'AI projects without a comprehensive risk register manage risks reactively — discovering them as incidents rather than addressing them as identified risks. A well-designed risk register is the central governance instrument that tracks every known risk, its status, and its mitigation owner throughout the project lifecycle.',
  methods: [
    '1. Define the risk register schema: Risk ID, category (technical/ethical/regulatory/operational/reputational), description, inherent likelihood (1–5), inherent impact (1–5), inherent risk score (L×I), mitigation measure, residual likelihood, residual impact, residual risk score, risk owner, review date.',
    '2. Populate from all previous risk identification activities:',
    '   — Technical risks: from D10 Complexity Assessment (model, integration, data, infrastructure)',
    '   — Ethical risks: from G3 Ethical Risk Register',
    '   — Regulatory risks: from G1 EU AI Act and G2 GDPR assessment',
    '   — Data risks: from D6 Data Landscape Assessment quality and governance issues',
    '   — Process failure risks: from D5 Process FMEA',
    '   — Delivery risks: from D8 Constraints Analysis and D10 Complexity Report',
    '3. Assess mitigation effectiveness for each risk: does the planned mitigation reduce likelihood, impact, or both?',
    '4. Calculate residual risk score after mitigation. Flag risks where residual score >12 (on a 25-point scale) as "elevated residual risk" requiring escalation to the Executive Sponsor.',
    '5. Assign a risk owner to every risk item — a named individual accountable for monitoring and mitigation.',
  ],
  tools: ['AI risk register template'],
  outputs: ['Populated AI risk register with inherent and residual risk scores, mitigations, and named owners for all risks'],
  exit_criteria: ['All risks from Phase 1 and Phase 2 activities incorporated; residual scores calculated; all risks have named owners; elevated residual risks escalated to Sponsor'],
}

const T_RISK_REGISTER_DESIGN: AISANode = {
  id: 'p2-g4-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Design and Populate AI Risk Register',
  description: 'Design the risk register schema and consolidate all risks from Phase 1 and Phase 2 activities.',
  purpose: 'Establish the central risk management instrument that governs all AI risks throughout delivery and operation.',
  inputs: ['D5 Process FMEA', 'D6 Data quality and governance risks', 'D8 Constraints Analysis', 'D10 Complexity Assessment', 'G1 EU AI Act risks', 'G2 GDPR risks', 'G3 Ethical risks', 'AI risk register template'],
  methods: ['Risk register schema design', 'Risk consolidation from all activities', 'Inherent and residual risk scoring', 'Risk owner assignment'],
  tools: ['AI risk register template'],
  outputs: ['Populated AI risk register with residual scores and named owners'],
  children: [EG_RISK_REGISTER_DESIGN],
}

const SA1_RISK_REGISTER: AISANode = {
  id: 'p2-g4-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Design the AI Risk Register',
  description: 'Design the AI-specific risk register schema and populate it with all risks identified across Phase 1 discovery and Phase 2 governance activities, with inherent and residual risk scores and named owners.',
  purpose: 'Establish the single source of truth for all AI risks throughout the project lifecycle.',
  why_it_matters: 'A risk register is only valuable if it is comprehensive, current, and actively reviewed. Starting the register in Phase 2 — with all Phase 1 risks captured — ensures it enters delivery as a live governance instrument rather than a Phase 4 compliance exercise.',
  inputs: ['All Phase 1 risk outputs (D5, D6, D8, D10)', 'Phase 2 governance risk outputs (G1, G2, G3)'],
  questions: ['Are all identified risks captured in the register?', 'Is every risk owner confirmed?', 'Which risks have elevated residual scores requiring Sponsor escalation?'],
  methods: ['Risk consolidation', 'Inherent and residual scoring', 'Owner assignment', 'Elevated risk escalation'],
  tools: ['AI risk register template'],
  outputs: ['Populated AI risk register'],
  deliverables: ['AI Risk Register v1.0 (Phase 2 Deliverable)'],
  exit_criteria: ['All risks from Phase 1 and Phase 2 incorporated; residual scores calculated; all items have named owners; elevated risks escalated'],
  children: [T_RISK_REGISTER_DESIGN],
}

// ─── SA2: Design Risk Treatment Plans ─────────────────────────────────

const EG_RISK_TREATMENT: AISANode = {
  id: 'p2-g4-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Designing Risk Treatment Plans for High-Priority Risks',
  description: 'For each risk with a residual score above the escalation threshold, design a detailed risk treatment plan specifying the treatment strategy, implementation actions, timeline, and success criteria.',
  purpose: 'Ensure that high-priority risks have specific, actionable treatment plans — not just mitigation labels — before Phase 3 design begins.',
  why_it_matters: 'Generic mitigations like "implement monitoring" are not risk treatment plans — they are risk intentions. A risk treatment plan specifies exactly what will be done, by whom, by when, and how it will be verified. This specificity is what converts risk awareness into risk reduction.',
  methods: [
    '1. For each high-priority risk (residual score >threshold), select the treatment strategy: (a) Avoid — eliminate the risk by changing scope or design; (b) Reduce — implement controls to lower likelihood or impact; (c) Transfer — contract risk to a third party (insurance, vendor warranty); (d) Accept — document the decision to accept the residual risk, with Sponsor sign-off.',
    '2. For Reduce strategy: specify the technical and organisational controls. Each control must have: description, implementation action (what specifically will be built or changed), phase (Phase 3, Phase 4, or operational), owner, and verification method.',
    '3. For each treatment plan, define: the expected residual risk after treatment, the timeline for treatment implementation, and the monitoring frequency to confirm effectiveness.',
    '4. Obtain risk owner confirmation that the treatment plan is achievable within the project constraints.',
    '5. Include treatment plan implementation actions in the Phase 3 and Phase 4 delivery plan as tracked work items.',
  ],
  tools: ['Risk treatment plan template'],
  outputs: ['Risk treatment plans for all high-priority risks: strategy, controls, implementation actions, timelines, and monitoring frequency'],
  exit_criteria: ['Treatment plans produced for all high-priority risks; risk owners confirmed achievability; implementation actions included in delivery plan'],
}

const T_RISK_TREATMENT: AISANode = {
  id: 'p2-g4-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Design Risk Treatment Plans',
  description: 'Design detailed treatment plans for all high-priority risks with strategy, controls, timelines, and verification methods.',
  purpose: 'Convert risk awareness into specific, owned, time-bound action.',
  inputs: ['Populated risk register from SA1 (elevated residual risk items)', 'Risk treatment plan template', 'Risk owners', 'Phase 3 and Phase 4 delivery plan'],
  methods: ['Treatment strategy selection (avoid/reduce/transfer/accept)', 'Control specification', 'Timeline and verification design', 'Delivery plan integration'],
  tools: ['Risk treatment plan template'],
  outputs: ['Risk treatment plans with implementation actions in delivery plan'],
  children: [EG_RISK_TREATMENT],
}

const SA2_RISK_TREATMENT: AISANode = {
  id: 'p2-g4-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Design Risk Treatment Plans',
  description: 'Produce detailed treatment plans for all high-priority risks, specifying strategy, controls, implementation actions, timelines, and verification methods.',
  purpose: 'Convert elevated risk items from the register into specific, owned delivery actions.',
  why_it_matters: 'Risk registers without treatment plans are inventories of known failures waiting to happen. Treatment plans convert risk documentation from a compliance activity into an active management programme that prevents risks from materialising.',
  inputs: ['AI risk register (elevated residual risk items)', 'Risk treatment plan template', 'Delivery plan for integration'],
  questions: ['What is the treatment strategy for each high-priority risk?', 'What specific controls will reduce each risk?', 'Who is accountable, and when will each control be implemented?'],
  methods: ['Treatment strategy selection', 'Control specification', 'Delivery plan integration'],
  tools: ['Risk treatment plan template'],
  outputs: ['Risk treatment plans with delivery plan integration'],
  deliverables: ['Risk Treatment Plans (Phase 2 Deliverable)'],
  exit_criteria: ['Treatment plans for all elevated risk items; implementation actions in delivery plan; risk owners confirmed achievability'],
  children: [T_RISK_TREATMENT],
}

// ─── SA3: Establish Risk Review Cadence ───────────────────────────────

const EG_RISK_REVIEW: AISANode = {
  id: 'p2-g4-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Establishing the Risk Review and Escalation Process',
  description: 'Define the ongoing risk review governance: frequency, participants, decision-making authority, escalation triggers, and process for adding new risks.',
  purpose: 'Ensure the risk register remains a live governance instrument throughout delivery and operations, not a snapshot document that becomes stale.',
  why_it_matters: 'A risk register that is not reviewed regularly is not a risk management programme — it is a historical document. AI projects surface new risks throughout delivery as technical understanding deepens and as the external regulatory environment changes. The review process is what keeps the register current and governance meaningful.',
  methods: [
    '1. Define review frequency by phase: weekly during active build (Phase 4), fortnightly during design (Phase 3), monthly during operations.',
    '2. Define the risk review participants: Delivery Lead, Risk Owner representatives, IT Architecture lead, DPO (for privacy risks), and AI Product Owner.',
    '3. Define the review agenda: (a) Review all risks with upcoming treatment action deadlines; (b) Review residual scores for risks with recently completed treatments; (c) Add new risks identified since last review; (d) Escalate elevated residual risks to Sponsor.',
    '4. Define escalation triggers: automated trigger when a new risk scores >15 (inherent) or residual risk remains >12 after treatment; manual trigger when a risk owner believes a risk has materially changed.',
    '5. Define the new risk intake process: how are new risks identified, who assesses them, and how quickly are they added to the register?',
    '6. Assign a Risk Register Owner: the person responsible for the health of the risk management programme.',
  ],
  tools: ['Risk review governance template', 'Risk escalation matrix'],
  outputs: ['Risk review governance: frequency, participants, agenda, escalation triggers, and Risk Register Owner'],
  exit_criteria: ['Review frequency defined per phase; participants confirmed; escalation triggers set; Risk Register Owner named'],
}

const T_RISK_REVIEW: AISANode = {
  id: 'p2-g4-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Establish Risk Review Cadence',
  description: 'Define the ongoing risk review governance with frequency, participants, escalation triggers, and Risk Register Owner.',
  purpose: 'Keep the risk register a live governance instrument throughout delivery and operations.',
  inputs: ['AI risk register from SA1', 'Project governance structure', 'Risk review governance template'],
  methods: ['Review frequency definition by phase', 'Participant and agenda design', 'Escalation trigger definition', 'Risk Register Owner assignment'],
  tools: ['Risk review governance template', 'Risk escalation matrix'],
  outputs: ['Risk review governance with named Risk Register Owner'],
  children: [EG_RISK_REVIEW],
}

const SA3_RISK_REVIEW: AISANode = {
  id: 'p2-g4-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Establish Risk Review Cadence',
  description: 'Define the governance rhythm for ongoing risk review — frequency, participants, escalation triggers, and Risk Register Owner — to maintain active risk management throughout delivery and operations.',
  purpose: 'Ensure the risk register remains a living instrument that drives active risk management, not a historical compliance document.',
  why_it_matters: 'AI systems operate in an evolving regulatory and technical environment. New risks emerge as architecture decisions reveal technical uncertainties, as regulatory guidance develops, and as deployment reveals operational surprises. A regular review cadence is the mechanism that catches and responds to emerging risks before they materialise.',
  inputs: ['AI risk register from SA1', 'Project governance structure', 'Delivery phase timelines'],
  questions: ['How often should risks be reviewed in each delivery phase?', 'Who must participate in each review?', 'What triggers escalation to the Sponsor?', 'Who owns the risk programme?'],
  methods: ['Phase-specific frequency definition', 'Participant and agenda design', 'Escalation trigger design', 'Ownership assignment'],
  tools: ['Risk review governance template'],
  outputs: ['Risk review governance with Risk Register Owner'],
  deliverables: ['Risk Review Governance (section of Risk Management Framework)'],
  exit_criteria: ['Review frequency and participants defined; escalation triggers set; Risk Register Owner named and confirmed'],
  children: [T_RISK_REVIEW],
}

// ═══════════════════════════════════════════════════════════════════════
// G4 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const G4: AISANode = {
  id: 'p2-g4',
  type: 'activity',
  level: 2,
  title: 'G4 — Risk Management Framework',
  description: 'Establish the complete AI Risk Management Framework — a comprehensive risk register consolidating all identified risks, detailed treatment plans for high-priority items, and an ongoing review governance that keeps risk management active throughout delivery and operations.',
  purpose: 'Convert all identified AI risks from Phase 1 and Phase 2 into a single, owned, actively managed risk programme.',
  why_it_matters: 'AI projects without a structured risk management framework rely on individual vigilance to catch problems — which is less reliable than structural governance. The Risk Management Framework creates a system-level approach to risk that persists beyond the individuals who set it up, covering the full lifecycle from design through operations.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['All Phase 1 and Phase 2 risk identification outputs', 'EU AI Act Art. 9 risk management requirements', 'ISO 31000 risk management principles', 'Project governance structure'],
  questions: [
    'Have all identified risks been consolidated into a single register?',
    'Do all high-priority risks have specific treatment plans with named owners?',
    'Is the review cadence appropriate for the delivery phase?',
    'Who is accountable for the risk management programme?',
  ],
  activities: [
    'Consolidate all Phase 1 and Phase 2 risks into a comprehensive risk register with inherent and residual scoring',
    'Design treatment plans for all elevated residual risk items',
    'Define the risk review governance with escalation triggers and Risk Register Owner',
  ],
  methods: ['Risk consolidation', 'Inherent and residual risk scoring (L×I)', 'Treatment strategy selection (avoid/reduce/transfer/accept)', 'Control specification', 'Review governance design'],
  tools: ['AI risk register template', 'Risk treatment plan template', 'Risk review governance template'],
  governance_considerations: 'EU AI Act Art. 9 mandates a risk management system for High Risk AI systems. This framework must be documented, updated throughout the system lifecycle, and maintained as part of the technical documentation (Art. 11). The risk management system must be proportionate to the risk level of the system.',
  ai_engineering_considerations: 'Risk treatment plans for technical risks must translate into specific engineering tasks in the Phase 3 and Phase 4 delivery plan. Risks that require architecture changes must be resolved before architecture is finalised; risks that require testing must drive Phase 4 test plan design.',
  outputs: ['AI risk register v1.0 with residual scores and named owners', 'Risk treatment plans for elevated risks', 'Risk review governance with Risk Register Owner'],
  deliverables: ['AI Risk Management Framework (Phase 2 Deliverable)', 'AI Risk Register v1.0'],
  exit_criteria: [
    'All Phase 1 and Phase 2 risks in the register with residual scores',
    'Every risk has a named owner',
    'Treatment plans produced for all elevated residual risks',
    'Implementation actions in delivery plan',
    'Review cadence and escalation triggers defined',
    'Risk Register Owner named',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'ISO 31000 — Risk Management Guidelines', type: 'standard' },
    { title: 'EU AI Act Art. 9 — Risk Management System', type: 'standard' },
    { title: 'NIST AI RMF — AI Risk Management Framework', type: 'framework' },
  ],
  children: [SA1_RISK_REGISTER, SA2_RISK_TREATMENT, SA3_RISK_REVIEW],
}
