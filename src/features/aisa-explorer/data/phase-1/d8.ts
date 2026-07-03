import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D8 — CONSTRAINTS ANALYSIS
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Technical Constraints ───────────────────────────────────────

const EG_TECH_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying and Documenting Technical Constraints',
  description: 'Systematically identify all technical constraints that the AI architecture must operate within — infrastructure, integration, performance, and technology standards.',
  purpose: 'Ensure Phase 3 architecture is designed within confirmed technical boundaries from the outset, preventing designs that are invalidated by undiscovered constraints.',
  why_it_matters: 'Technical constraints discovered in Phase 3 after architecture decisions are made force costly redesign. Identifying them in Phase 1 is the cheapest possible point of discovery — and ensures architecture is designed to fit reality rather than aspirational infrastructure.',
  methods: [
    '1. Interview the IT Architecture team and the Head of Infrastructure/Platform. Present the initiative scope and ask: "What technical constraints must any solution respect?"',
    '2. Cover the following constraint categories:',
    '   (a) Infrastructure: On-premise vs. cloud requirement? Approved cloud providers? Private network requirement?',
    '   (b) Integration: What systems must the AI solution integrate with? What integration standards or protocols are approved (REST, SOAP, EDI, Kafka)? What are the integration SLAs?',
    '   (c) Performance: What are the latency requirements? (Real-time <200ms? Near-real-time <5s? Batch?) What throughput must the system sustain?',
    '   (d) Technology standards: Approved programming languages, frameworks, model serving platforms? Prohibited technologies (e.g., no open-source LLMs not vetted through InfoSec)?',
    '   (e) Data residency: Must data remain in a specific geography (EU-only, UK-only)? Which data cannot leave the on-premise environment?',
    '   (f) Vendor and contract: Are there existing contracts that mandate the use of specific vendors? Exclusive agreements that restrict AI vendor selection?',
    '3. For each constraint, classify: Hard (non-negotiable, cannot be worked around) or Soft (preferred but negotiable with justification).',
    '4. Document the source and owner of each constraint — hard constraints require their owner\'s confirmation.',
  ],
  tools: ['Technical constraints register template'],
  outputs: ['Technical constraints register: each constraint with category, description, hard/soft classification, source, and owner confirmation'],
  exit_criteria: ['All technical categories surveyed; each constraint classified; hard constraints confirmed by owner; IT Architecture team reviewed'],
}

const T_TECH_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Identify Technical Constraints',
  description: 'Document all technical constraints across infrastructure, integration, performance, technology standards, data residency, and vendor requirements.',
  purpose: 'Ensure Phase 3 architecture operates within confirmed technical boundaries from the first design session.',
  inputs: ['IT Architecture and Infrastructure team contacts', 'Initiative scope summary', 'Technical constraints register template'],
  methods: ['Structured IT Architecture interview', 'Constraint categorisation', 'Hard/soft classification', 'Owner confirmation for hard constraints'],
  tools: ['Technical constraints register template'],
  outputs: ['Technical constraints register with classification and owner confirmation'],
  children: [EG_TECH_CONSTRAINTS],
}

const SA1_TECH_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Technical Constraints',
  description: 'Identify and document all technical constraints — infrastructure, integration, performance, technology standards, data residency, and vendor requirements — that the AI architecture must respect.',
  purpose: 'Establish the technical design envelope before Phase 3 architecture begins.',
  why_it_matters: 'Architecture built without confirmed technical constraints is designed in a vacuum. The gap between designed architecture and actually deployable architecture is directly proportional to how well constraints were understood at design time.',
  inputs: ['IT Architecture and Infrastructure team input', 'Initiative scope document', 'Existing technology standards documentation'],
  questions: ['What must the solution run on?', 'What must it integrate with and how?', 'What latency and throughput must it achieve?', 'What technologies are permitted or prohibited?', 'Where must data reside?'],
  methods: ['IT Architecture interview', 'Constraint categorisation and classification', 'Owner confirmation process'],
  tools: ['Technical constraints register template'],
  outputs: ['Technical constraints register'],
  deliverables: ['Technical Constraints Register (input to Phase 3 architecture)'],
  exit_criteria: ['All constraint categories surveyed; hard constraints confirmed by owners; IT Architecture team sign-off'],
  children: [T_TECH_CONSTRAINTS],
}

// ─── SA2: Regulatory Constraints ──────────────────────────────────────

const EG_REGULATORY_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Regulatory and Legal Constraints',
  description: 'Identify all regulatory and legal requirements that impose constraints on AI system design, data use, decision-making, transparency, and deployment.',
  purpose: 'Ensure compliance requirements are embedded in the design brief before architecture begins, rather than applied as retrofit after the system is built.',
  why_it_matters: 'Regulatory compliance retrofitted after AI system design is prohibitively expensive and often technically impossible without fundamental redesign. Mapping constraints in Phase 1 makes compliance a design input, not a post-design audit — which is both cheaper and more effective.',
  methods: [
    '1. Identify applicable regulatory frameworks based on: (a) jurisdiction of deployment; (b) sector of operation; (c) type of data processed; (d) type of decisions made; (e) AI Act risk classification (from EU AI Act Classifier if used).',
    '2. For each applicable framework, identify the specific constraints it imposes on the AI system:',
    '   — EU AI Act: transparency, human oversight, accuracy, robustness, logging requirements by risk tier.',
    '   — GDPR: lawful basis for processing, data minimisation, purpose limitation, right to explanation (Art. 22), deletion and portability.',
    '   — Sector-specific: FCA rules for AI in financial advice, DORA requirements for ICT risk management, NIS2 for critical infrastructure.',
    '3. For each constraint, document: the specific legal article or rule, what it requires the system to do or not do, and who in the organisation is accountable for compliance.',
    '4. Assess the architecture impact of each constraint: what does it require the system to include (logging, explainability, audit trail, human override) or exclude (fully automated high-stakes decisions)?',
    '5. Flag constraints that require DPO or Legal sign-off before design proceeds.',
  ],
  tools: ['Regulatory constraints mapping template', 'EU AI Act risk classification output'],
  outputs: ['Regulatory constraints register: applicable frameworks, specific requirements, architecture impacts, and accountable roles'],
  exit_criteria: ['All applicable regulatory frameworks identified; specific requirements documented with architecture impact; DPO and Legal team reviewed'],
}

const T_REGULATORY_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Map Regulatory and Legal Constraints',
  description: 'Identify all applicable regulatory frameworks and document their specific constraints on AI system design.',
  purpose: 'Make compliance a design input, not a post-design audit, by mapping requirements before architecture begins.',
  inputs: ['Jurisdiction and sector context', 'EU AI Act risk classification', 'DPO and Legal team input', 'Regulatory constraints mapping template'],
  methods: ['Regulatory framework identification', 'Specific constraint extraction', 'Architecture impact assessment', 'Accountability mapping'],
  tools: ['Regulatory constraints mapping template'],
  outputs: ['Regulatory constraints register with architecture impacts'],
  children: [EG_REGULATORY_CONSTRAINTS],
}

const SA2_REGULATORY: AISANode = {
  id: 'p1-d8-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Regulatory Constraints',
  description: 'Map all applicable regulatory and legal requirements to specific constraints on AI system design, data use, decision-making, transparency, and deployment.',
  purpose: 'Embed compliance requirements in the architecture design brief before design begins.',
  why_it_matters: 'Regulatory requirements are non-negotiable constraints — they cannot be value-engineered out of scope. Mapping them before design ensures architecture is built to comply from the first decision, avoiding expensive retrofits and regulatory risk.',
  inputs: ['Jurisdiction and sector information', 'EU AI Act risk classification', 'Data governance issues from D6', 'DPO and Legal team input'],
  questions: ['Which regulatory frameworks apply to this AI system?', 'What specific constraints does each framework impose on the design?', 'Who is accountable for compliance with each requirement?'],
  methods: ['Regulatory framework identification', 'Specific requirement extraction', 'Architecture impact assessment', 'Accountability mapping'],
  tools: ['Regulatory constraints mapping template'],
  governance_considerations: 'For EU AI Act High Risk systems, regulatory constraints from this activity must be embedded in the Art. 9 risk management system and Art. 11 technical documentation in Phase 2.',
  outputs: ['Regulatory constraints register with architecture impacts and accountability mapping'],
  deliverables: ['Regulatory Constraints Register (input to Phase 2 governance and Phase 3 architecture)'],
  exit_criteria: ['All applicable frameworks identified; architecture impacts documented; DPO and Legal team reviewed and confirmed'],
  children: [T_REGULATORY_CONSTRAINTS],
}

// ─── SA3: Organisational Constraints ──────────────────────────────────

const EG_ORG_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Organisational Constraints',
  description: 'Identify and document the organisational, cultural, and political constraints that will shape what the AI system can do and how it must be introduced.',
  purpose: 'Prevent the AI system design from being technically correct but organisationally undeployable.',
  why_it_matters: 'The most technically sophisticated AI system fails if it requires an organisational change the organisation is not ready to make. Organisational constraints are as real as technical ones — and more dangerous, because they are invisible in architecture diagrams. Mapping them in Phase 1 shapes the deployment strategy in Phase 4.',
  methods: [
    '1. Interview the Business Owner, HR representative, and union representative (if applicable): "What change can this organisation absorb? What changes will face resistance?"',
    '2. Identify: (a) Role and headcount sensitivity — is there anxiety about job displacement? Are there legal or union constraints on automation that affects roles?; (b) Skills gaps — does the team have the skills to work alongside an AI system? What training is required?; (c) Change appetite — has the organisation recently gone through significant change? Is there change fatigue?; (d) Political dynamics — are there stakeholders who will resist this initiative for reasons beyond the technical?',
    '3. Identify the Change Management implications: what must be done before deployment to gain acceptance?',
    '4. Assess whether any organisational constraints impose a hard limit on the AI system scope (e.g., "the system must not be the decision-maker, only the recommender, to address union concerns").',
    '5. Document all constraints as design requirements: if the system must have a specific interface because of user skill level, that is an architecture constraint.',
  ],
  tools: ['Organisational constraints assessment template', 'Change Management impact matrix'],
  outputs: ['Organisational constraints register with change management implications and any hard scope limits they impose'],
  exit_criteria: ['Role sensitivity, skills gaps, change appetite, and political dynamics assessed; hard scope limits identified; HR and Business Owner reviewed'],
}

const T_ORG_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Identify Organisational Constraints',
  description: 'Document role sensitivity, skills gaps, change appetite, and political dynamics that shape what the AI system can do and how it must be introduced.',
  purpose: 'Prevent an architecturally sound system from being organisationally undeployable.',
  inputs: ['Business Owner, HR, and union representative contacts', 'Stakeholder Register from D1', 'Organisational constraints assessment template'],
  methods: ['Structured interviews', 'Role sensitivity assessment', 'Change appetite assessment', 'Hard scope limit identification'],
  tools: ['Organisational constraints assessment template', 'Change Management impact matrix'],
  outputs: ['Organisational constraints register with change management implications'],
  children: [EG_ORG_CONSTRAINTS],
}

const SA3_ORG_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Organisational Constraints',
  description: 'Identify and document role sensitivity, skill gaps, change appetite, and political dynamics that constrain what the AI system can do and how it must be deployed.',
  purpose: 'Ensure the AI system is designed for the organisation\'s actual change capacity, not an idealised version of it.',
  why_it_matters: 'Technical deployment without organisational readiness is one of the most common failure modes in AI programmes. Organisational constraints identified here shape deployment strategy, training requirements, and phasing decisions — all of which must be confirmed before Phase 3 scopes the first release.',
  inputs: ['Stakeholder Register from D1', 'Business Owner, HR, and union representative input', 'Change history and organisational context'],
  questions: ['What change can the organisation absorb?', 'Are there role or union constraints on automation?', 'What skills gap must be addressed before deployment?', 'Are there stakeholders who will resist?'],
  methods: ['Stakeholder change sensitivity interviews', 'Skills gap assessment', 'Change appetite evaluation', 'Hard scope limit identification'],
  tools: ['Organisational constraints assessment template'],
  outputs: ['Organisational constraints register with deployment implications'],
  deliverables: ['Organisational Constraints Register (input to Phase 3 deployment design)'],
  exit_criteria: ['All organisational constraint categories assessed; hard scope limits documented; HR and Business Owner confirmed'],
  children: [T_ORG_CONSTRAINTS],
}

// ─── SA4: Budget and Time Constraints ─────────────────────────────────

const EG_BUDGET_TIME_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Confirming Budget and Time Constraints',
  description: 'Establish the confirmed budget envelope and delivery timeline that the AI initiative must operate within, and assess whether the scope is achievable within those constraints.',
  purpose: 'Confirm that the initiative\'s scope, cost, and timeline are in alignment before Phase 3 design work begins.',
  why_it_matters: 'Misaligned scope and budget discovered in Phase 3 or Phase 4 produces the worst possible outcome: a partially built system that must be descoped mid-delivery, damaging stakeholder confidence and wasting sunk cost. Budget and timeline constraint confirmation in Phase 1 enables informed scope decisions before work begins.',
  methods: [
    '1. Obtain from the Executive Sponsor and Finance: the approved budget amount, the breakdown (build vs. operate), and any budget staging (phased release).',
    '2. Obtain the required delivery timeline: is there a hard deadline? (regulatory deadline, product launch dependency, contract milestone). What is driving the date?',
    '3. Produce a preliminary cost estimate for the proposed scope: development team cost, infrastructure cost, licences, third-party tools, governance overhead. Compare to approved budget.',
    '4. If scope exceeds budget at preliminary estimate, present three options to the Sponsor: (a) reduce scope to fit budget; (b) increase budget to fit scope; (c) phase delivery — Phase 1 within budget, later phases conditional on Phase 1 value.',
    '5. Document the confirmed budget, timeline, and agreed scope adjustment (if any). This becomes the delivery baseline.',
    '6. Identify budget risks: single-source vendor risk, infrastructure cost variability, regulatory compliance cost uncertainty.',
  ],
  tools: ['Preliminary cost estimation model', 'Timeline analysis template'],
  outputs: ['Confirmed budget envelope, delivery timeline, and agreed scope (adjusted if preliminary estimate exceeded budget)'],
  exit_criteria: ['Budget and timeline confirmed by Sponsor and Finance; scope aligned to budget; budget risks documented; delivery baseline established'],
}

const T_BUDGET_TIME_CONSTRAINTS: AISANode = {
  id: 'p1-d8-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Confirm Budget and Time Constraints',
  description: 'Establish the confirmed budget envelope and delivery timeline, align scope, and document the delivery baseline.',
  purpose: 'Ensure scope and cost are in alignment before Phase 3 design work begins.',
  inputs: ['Sponsor and Finance input on budget and timeline', 'Preliminary cost estimation model', 'Scope from Problem Statement and Pain Point Matrix'],
  methods: ['Preliminary cost estimation', 'Budget-to-scope comparison', 'Option presentation if misaligned', 'Delivery baseline documentation'],
  tools: ['Preliminary cost estimation model'],
  outputs: ['Confirmed budget, timeline, and scope alignment; delivery baseline'],
  children: [EG_BUDGET_TIME_CONSTRAINTS],
}

const SA4_BUDGET_TIME: AISANode = {
  id: 'p1-d8-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Budget and Time Constraints',
  description: 'Confirm the budget envelope and delivery timeline, assess scope alignment, and establish the delivery baseline.',
  purpose: 'Prevent scope-budget misalignment from being discovered mid-delivery by establishing a confirmed delivery baseline in Phase 1.',
  why_it_matters: 'Budget and timeline constraints are the most fundamental delivery constraints. Projects that do not confirm alignment at Phase 1 frequently discover the misalignment in Phase 3 or Phase 4 — at which point descoping is painful and expensive rather than cheap and voluntary.',
  inputs: ['Approved Business Case budget from D3', 'Sponsor and Finance input', 'Preliminary scope from Problem Statement and Pain Point Matrix'],
  questions: ['Is there a confirmed, approved budget for the full initiative?', 'Is there a hard delivery deadline?', 'Does the proposed scope fit the confirmed budget?'],
  methods: ['Budget confirmation', 'Preliminary cost estimation', 'Scope-to-budget alignment', 'Delivery baseline setting'],
  tools: ['Preliminary cost estimation model'],
  outputs: ['Confirmed delivery baseline: budget, timeline, and aligned scope'],
  deliverables: ['Delivery Baseline (input to Phase 3 architecture scoping)'],
  exit_criteria: ['Budget confirmed by Finance; timeline confirmed by Sponsor; scope-to-budget aligned; delivery baseline established and approved'],
  children: [T_BUDGET_TIME_CONSTRAINTS],
}

// ═══════════════════════════════════════════════════════════════════════
// D8 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D8: AISANode = {
  id: 'p1-d8',
  type: 'activity',
  level: 2,
  title: 'D8 — Constraints Analysis',
  description: 'Systematically identify and document all constraints that bound the AI initiative — technical, regulatory, organisational, and financial — and confirm the delivery baseline before Phase 3 design begins.',
  purpose: 'Define the design envelope within which Phase 3 architecture must operate, preventing designs that are invalidated by constraints discovered after expensive decisions are made.',
  why_it_matters: 'Constraints are not limitations to work around — they are the reality within which design must operate. The discipline of constraints analysis is what distinguishes architecture that gets built from architecture that gets redesigned. Every hour spent mapping constraints in Phase 1 saves days of rework in Phase 3.',
  principles_applied: ['Technology Serves Architecture', 'Minimum Viable Complexity'],
  inputs: ['Problem Statement from D2', 'Business Case from D3', 'Process Map from D4', 'Data Landscape Assessment from D6', 'Decision Analysis from D7', 'IT Architecture team', 'DPO and Legal team', 'HR and Business Owner'],
  questions: [
    'What are the technical constraints on infrastructure, integration, performance, and technology?',
    'Which regulatory frameworks apply, and what specific design constraints do they impose?',
    'What organisational constraints limit what the system can do or how it must be deployed?',
    'Is the proposed scope achievable within the confirmed budget and timeline?',
  ],
  activities: [
    'Survey IT Architecture team for all technical constraints across six categories',
    'Map applicable regulatory frameworks to specific architecture and design constraints',
    'Assess organisational constraints: role sensitivity, skills gaps, change appetite',
    'Confirm budget envelope and timeline; align scope and establish delivery baseline',
  ],
  methods: ['IT Architecture constraint survey', 'Regulatory framework mapping', 'Organisational change sensitivity assessment', 'Budget and scope alignment process'],
  tools: ['Technical constraints register template', 'Regulatory constraints mapping template', 'Organisational constraints assessment template', 'Preliminary cost estimation model'],
  governance_considerations: 'Regulatory constraints identified here are the primary input to Phase 2 governance framework design. Constraints must be documented with specific regulatory article references and accountable owners.',
  ai_engineering_considerations: 'Technical constraints define the model serving environment and integration architecture. ML engineers must be briefed on all constraints before selecting model architectures in Phase 3 — a model that cannot run within the approved infrastructure is worthless regardless of its performance on benchmarks.',
  outputs: ['Technical constraints register', 'Regulatory constraints register', 'Organisational constraints register', 'Confirmed delivery baseline'],
  deliverables: ['Constraints Analysis Report (Phase 1 Deliverable)', 'Delivery Baseline (budget, timeline, scope)'],
  exit_criteria: [
    'Technical constraints confirmed by IT Architecture team',
    'Regulatory constraints documented with specific articles, impacts, and accountable owners; DPO and Legal reviewed',
    'Organisational constraints identified with deployment implications; HR and Business Owner confirmed',
    'Delivery baseline established: budget confirmed, timeline confirmed, scope aligned',
    'All constraint registers stored in project repository',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'EU AI Act — Full text, Articles 9, 11, 13, 14', type: 'standard' },
    { title: 'GDPR — Articles 5, 22, 25, 35', type: 'standard' },
    { title: 'DORA — Regulation (EU) 2022/2554 on digital operational resilience', type: 'standard' },
    { title: 'Architecting for Scale — Lee Atchison', type: 'book', author: 'Atchison, L.', year: 2020 },
  ],
  children: [SA1_TECH_CONSTRAINTS, SA2_REGULATORY, SA3_ORG_CONSTRAINTS, SA4_BUDGET_TIME],
}
