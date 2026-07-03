import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// G6 — AI GOVERNANCE FRAMEWORK DESIGN
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Design Governance Structure ─────────────────────────────────

const EG_GOVERNANCE_STRUCTURE: AISANode = {
  id: 'p2-g6-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Designing the AI Governance Structure',
  description: 'Define the governance structure that will oversee AI system development, deployment, and operations — roles, committees, decision rights, and accountability chains.',
  purpose: 'Establish clear human accountability for AI system decisions, in compliance with the principle that human accountability cannot be delegated to an AI system.',
  why_it_matters: 'AI systems without clear governance structures produce accountability vacuums — when things go wrong, no one is clearly responsible. The EU AI Act, GDPR, and OECD AI Principles all require demonstrable human accountability over AI systems. Governance structure design is how that accountability is made real.',
  methods: [
    '1. Define the AI Product Owner role: the individual accountable for the AI system\'s performance, safety, and compliance throughout its lifecycle. This role owns the risk register, the metrics governance, and the compliance programme.',
    '2. Define the AI Review Committee (if applicable): a governance body with authority to approve major changes to the AI system, review ethical and risk concerns, and escalate to the Board. Membership: AI Product Owner, DPO, Legal, Risk, IT Architecture lead, and Business Owner.',
    '3. Define the line of accountability from day-to-day AI operations to the Board: AI Product Owner → AI Review Committee → Executive Sponsor → Board (or equivalent).',
    '4. Define decision rights at each level: (a) AI Product Owner — operational decisions, metric responses, minor scope changes; (b) AI Review Committee — material scope changes, risk acceptance for elevated risks, compliance attestations; (c) Executive Sponsor — investment decisions, major risk acceptance, regulatory engagement; (d) Board — programme-level accountability reporting.',
    '5. Define the escalation path for ethics concerns: any team member must have a clear, psychologically safe route to raise AI ethics concerns without needing approval from their line manager.',
    '6. Document the governance structure in an organogram showing roles, relationships, and decision authority at each level.',
  ],
  tools: ['Governance structure template', 'RACI chart template', 'Decision rights matrix'],
  outputs: ['AI governance structure: roles, committees, accountability chain, decision rights matrix, and ethics escalation path'],
  exit_criteria: ['AI Product Owner named; Review Committee constituted (if required); decision rights confirmed at all levels; ethics escalation path defined; Executive Sponsor approved'],
}

const T_GOVERNANCE_STRUCTURE: AISANode = {
  id: 'p2-g6-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Design AI Governance Structure',
  description: 'Define roles, committees, accountability chains, decision rights, and ethics escalation paths for AI governance.',
  purpose: 'Establish clear human accountability for the AI system throughout its lifecycle.',
  inputs: ['Stakeholder Register from D1', 'EU AI Act accountability obligations from G1', 'Governance structure template', 'Executive Sponsor input'],
  methods: ['Role definition', 'Committee design', 'Decision rights matrix construction', 'Ethics escalation path design', 'Executive Sponsor approval'],
  tools: ['Governance structure template', 'RACI chart template', 'Decision rights matrix'],
  outputs: ['AI governance structure with named roles and approved decision rights'],
  children: [EG_GOVERNANCE_STRUCTURE],
}

const SA1_GOVERNANCE_STRUCTURE: AISANode = {
  id: 'p2-g6-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Design Governance Structure',
  description: 'Define the AI governance structure — roles, committees, accountability chain, decision rights matrix, and ethics escalation path — to establish clear human accountability over the AI system.',
  purpose: 'Create a governance structure that makes human accountability for AI concrete, visible, and effective.',
  why_it_matters: 'AI systems governed only by technical guardrails eventually drift from their intended behaviour, fail in ways that cause harm, or are repurposed without adequate assessment. Human governance structures are the check and balance that technical guardrails cannot replace. Establishing them before deployment, not after an incident, is the discipline of responsible AI.',
  inputs: ['Stakeholder Register from D1', 'EU AI Act provider obligations from G1', 'Executive Sponsor and DPO input'],
  questions: ['Who is the AI Product Owner?', 'What governance body has authority to approve material changes?', 'What are the decision rights at each level?', 'How can ethics concerns be raised safely?'],
  methods: ['Role and committee design', 'Decision rights matrix', 'Ethics escalation path design'],
  tools: ['Governance structure template', 'Decision rights matrix'],
  outputs: ['AI governance structure with named roles and confirmed decision rights'],
  deliverables: ['AI Governance Structure (primary section of Governance Framework)'],
  exit_criteria: ['AI Product Owner named; governance structure approved by Executive Sponsor; ethics escalation path communicated to all team members'],
  children: [T_GOVERNANCE_STRUCTURE],
}

// ─── SA2: Define Governance Processes ─────────────────────────────────

const EG_GOVERNANCE_PROCESSES: AISANode = {
  id: 'p2-g6-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining Core AI Governance Processes',
  description: 'Design the recurring governance processes that operate the AI system responsibly over its full operational lifecycle: model change control, performance review, compliance attestation, and AI system retirement.',
  purpose: 'Ensure governance is an ongoing operational practice rather than a Phase 2 one-time exercise.',
  why_it_matters: 'AI systems are not static — they drift, they are updated, and the world around them changes. Governance processes that only operate at deployment will miss the model drift, the data distribution shift, and the regulatory changes that occur during operations. Operational governance processes catch these changes before they cause harm.',
  methods: [
    '1. Model Change Control: define the process for managing changes to the AI model (retraining, architecture changes, hyperparameter changes). Include: change request, impact assessment (privacy, security, ethics, accuracy), approval authority (minor → AI Product Owner, major → Review Committee), testing requirements before re-deployment, and documentation update obligations.',
    '2. Performance Review Cadence: align with the metrics governance plan from D9. Define: who reviews the metrics dashboard, how often, what actions are authorised (auto-retrain trigger, manual investigation, escalation to Review Committee).',
    '3. Compliance Attestation: define the recurring compliance check process. For High Risk AI systems: annual review of EU AI Act technical documentation for currency; annual review of DPIA for continued relevance; quarterly risk register review. Produce a compliance attestation record.',
    '4. AI System Retirement: define the process for decommissioning the AI system — when to retire, data retention and deletion obligations, model deletion, regulatory notification requirements (if applicable).',
    '5. Stakeholder Communication Process: define how AI system changes, performance issues, and compliance updates are communicated to affected stakeholders.',
  ],
  tools: ['Governance process templates', 'Model change control form', 'Compliance attestation template'],
  outputs: ['Governance process specifications: model change control, performance review, compliance attestation, retirement, and stakeholder communication'],
  exit_criteria: ['All five governance processes defined with roles, triggers, and documentation requirements; AI Product Owner confirmed operability'],
}

const T_GOVERNANCE_PROCESSES: AISANode = {
  id: 'p2-g6-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Define Core AI Governance Processes',
  description: 'Design model change control, performance review, compliance attestation, retirement, and stakeholder communication governance processes.',
  purpose: 'Ensure AI governance is an active operational practice throughout the system lifecycle.',
  inputs: ['Metrics governance plan from D9', 'EU AI Act ongoing obligations from G1', 'AI Product Owner and Review Committee members', 'Governance process templates'],
  methods: ['Process design for each governance domain', 'Role and trigger specification', 'Documentation requirement definition', 'AI Product Owner approval'],
  tools: ['Governance process templates', 'Model change control form', 'Compliance attestation template'],
  outputs: ['Governance process specifications confirmed by AI Product Owner'],
  children: [EG_GOVERNANCE_PROCESSES],
}

const SA2_GOVERNANCE_PROCESSES: AISANode = {
  id: 'p2-g6-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Define Governance Processes',
  description: 'Design the recurring operational governance processes — model change control, performance review, compliance attestation, retirement, and stakeholder communication — that maintain responsible AI operations over the system lifecycle.',
  purpose: 'Ensure AI governance is practised continuously, not just documented in Phase 2.',
  why_it_matters: 'The most common governance failure in deployed AI systems is not the absence of governance documentation but the absence of governance practice. Processes that are designed but never executed are indistinguishable from no processes at all. Operational governance processes defined here must be embedded in the operational calendar to be effective.',
  inputs: ['AI governance structure from SA1', 'Metrics governance plan from D9', 'EU AI Act post-market monitoring requirements from G1'],
  questions: ['How will model changes be controlled and assessed?', 'How often will performance be reviewed, and what actions result?', 'How will ongoing compliance be attested?', 'How will the system be retired when appropriate?'],
  methods: ['Process design', 'Role and trigger specification', 'Documentation requirement definition'],
  tools: ['Governance process templates'],
  outputs: ['Governance process specifications'],
  deliverables: ['Governance Process Specifications (section of Governance Framework)'],
  exit_criteria: ['All five processes defined; documentation requirements confirmed; AI Product Owner has approved operability'],
  children: [T_GOVERNANCE_PROCESSES],
}

// ─── SA3: Produce the Governance Framework Document ───────────────────

const EG_GOVERNANCE_DOCUMENT: AISANode = {
  id: 'p2-g6-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Producing and Ratifying the AI Governance Framework Document',
  description: 'Assemble all governance design outputs into a single AI Governance Framework document and obtain formal ratification from the Executive Sponsor and (where applicable) the Board.',
  purpose: 'Establish the Governance Framework as the authoritative, ratified reference for AI governance throughout the system lifecycle.',
  why_it_matters: 'A governance framework that has not been formally ratified by the appropriate authority is an advisory document, not an operational mandate. Formal ratification converts it from a recommendation into an organisational commitment — with consequences for non-compliance and a named owner for enforcement.',
  methods: [
    '1. Assemble the Governance Framework document: governance structure section, decision rights matrix, governance process specifications, ethics escalation path, and relationship to other governance documents (Risk Management Framework, EU AI Act Compliance Plan, Privacy Controls).',
    '2. Include a version control and review schedule: the framework must be reviewed annually and whenever a material change to the AI system, the organisation, or the regulatory environment occurs.',
    '3. Include an attestation section: named individuals confirming they have read, understood, and accept their responsibilities under the framework.',
    '4. Submit the framework for ratification: AI Review Committee first; then Executive Sponsor; then Board (or equivalent) for systems of programme significance.',
    '5. Once ratified, distribute to all named roles and store in the governance document repository.',
    '6. Brief all named roles on their responsibilities under the framework.',
  ],
  tools: ['AI Governance Framework template', 'Ratification tracking template'],
  outputs: ['AI Governance Framework v1.0 — ratified by Executive Sponsor and stored as controlled document; all named roles briefed'],
  exit_criteria: ['Framework assembled with all sections; ratified by Executive Sponsor; all named roles have signed attestation; stored as v1.0 controlled document'],
}

const T_GOVERNANCE_DOCUMENT: AISANode = {
  id: 'p2-g6-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Produce and Ratify the AI Governance Framework',
  description: 'Assemble the complete governance framework document and obtain formal ratification from the Executive Sponsor.',
  purpose: 'Convert governance design into an authoritative, ratified operational mandate.',
  inputs: ['Governance structure from SA1', 'Governance processes from SA2', 'AI Governance Framework template', 'Executive Sponsor and named roles contacts'],
  methods: ['Document assembly', 'Review schedule definition', 'Attestation section creation', 'Ratification process navigation', 'Role briefing'],
  tools: ['AI Governance Framework template', 'Ratification tracking template'],
  outputs: ['AI Governance Framework v1.0 — ratified and distributed'],
  children: [EG_GOVERNANCE_DOCUMENT],
}

const SA3_GOVERNANCE_DOCUMENT: AISANode = {
  id: 'p2-g6-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Produce AI Governance Framework Document',
  description: 'Assemble all governance design outputs into the AI Governance Framework document and obtain formal ratification from the Executive Sponsor.',
  purpose: 'Establish the ratified, authoritative governance reference for the AI system lifecycle.',
  why_it_matters: 'The Governance Framework document is the contract between the organisation and its AI system — establishing what oversight humans will exercise, how, and by whom. Ratification makes it an organisational commitment. Without ratification, governance is aspirational; with it, governance is accountable.',
  inputs: ['Governance structure from SA1', 'Governance processes from SA2', 'AI Governance Framework template'],
  questions: ['Is the framework complete and internally consistent?', 'Who must ratify it?', 'How will named roles be briefed on their responsibilities?'],
  methods: ['Document assembly', 'Version control and review schedule definition', 'Ratification process', 'Role briefing'],
  tools: ['AI Governance Framework template'],
  outputs: ['AI Governance Framework v1.0 — ratified, distributed, and stored'],
  deliverables: ['AI Governance Framework (Phase 2 Deliverable)'],
  exit_criteria: ['Framework ratified by Executive Sponsor; all named roles signed attestation and briefed; v1.0 stored as controlled document'],
  children: [T_GOVERNANCE_DOCUMENT],
}

// ═══════════════════════════════════════════════════════════════════════
// G6 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const G6: AISANode = {
  id: 'p2-g6',
  type: 'activity',
  level: 2,
  title: 'G6 — AI Governance Framework Design',
  description: 'Design and ratify the AI Governance Framework — establishing the roles, committees, accountability chains, decision rights, and operational processes that ensure the AI system is governed responsibly throughout its full lifecycle.',
  purpose: 'Create the human governance structure that makes AI accountability real, auditable, and operational rather than theoretical.',
  why_it_matters: 'Technical AI safeguards are necessary but insufficient. Human governance structures are what ensure those safeguards are maintained, reviewed, and updated as the system, the organisation, and the regulatory environment evolve. Without governance, AI systems drift from their intended behaviour without triggering correction.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Stakeholder Register from D1', 'EU AI Act compliance plan from G1', 'Risk Management Framework from G4', 'Metrics Governance Plan from D9', 'Executive Sponsor input'],
  questions: [
    'Who is the AI Product Owner?',
    'What governance body has authority over material changes?',
    'What are the decision rights at each governance level?',
    'How is governance practised operationally, not just documented?',
    'Who ratifies the framework?',
  ],
  activities: [
    'Design the AI governance structure with roles, committees, accountability chain, and decision rights',
    'Define the recurring governance processes for model change control, performance review, compliance attestation, and system retirement',
    'Produce and ratify the AI Governance Framework document',
  ],
  methods: ['Role and committee design', 'Decision rights matrix construction', 'Ethics escalation path design', 'Governance process design', 'Framework ratification'],
  tools: ['Governance structure template', 'Decision rights matrix', 'Governance process templates', 'AI Governance Framework template'],
  governance_considerations: 'The EU AI Act requires providers of High Risk AI systems to maintain a quality management system (Art. 17). The AI Governance Framework is the top-level document of that system. It must be retained and made available to regulators on request.',
  ai_engineering_considerations: 'Engineers must be briefed on the model change control process before Phase 3 begins — particularly the requirement that any retrained model goes through the same testing, bias assessment, and approval process as the initial deployment. Unsanctioned model updates are a governance failure.',
  outputs: ['AI governance structure with named roles and decision rights', 'Governance process specifications', 'AI Governance Framework v1.0 — ratified'],
  deliverables: ['AI Governance Framework (Phase 2 Deliverable)'],
  exit_criteria: [
    'AI Product Owner named',
    'Governance structure approved and all roles confirmed',
    'Governance processes defined for all five domains',
    'Framework ratified by Executive Sponsor',
    'All named roles briefed and signed attestation',
    'Framework stored as v1.0 controlled document',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'EU AI Act Art. 17 — Quality Management System', type: 'standard' },
    { title: 'ISO/IEC 42001 — AI Management System', type: 'standard' },
    { title: 'OECD AI Principles — Principle 1.4: Accountability', type: 'framework' },
  ],
  children: [SA1_GOVERNANCE_STRUCTURE, SA2_GOVERNANCE_PROCESSES, SA3_GOVERNANCE_DOCUMENT],
}
