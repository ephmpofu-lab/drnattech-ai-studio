import type { AISANode } from '@/types/aisa'

// ─── G8 — POLICY AND PROCEDURE DEVELOPMENT ────────────────────────────

const EG_AI_USE_POLICY: AISANode = {
  id: 'p2-g8-sa1-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Drafting the AI Acceptable Use Policy',
  description: 'Produce an AI Acceptable Use Policy (AUP) that defines permitted and prohibited uses of the AI system, user responsibilities, and consequences of misuse.',
  purpose: 'Establish clear, documented boundaries for AI use that all users understand and accept before accessing the system.',
  why_it_matters: 'Users who do not understand what an AI system can and cannot be used for make decisions based on assumption — some overly cautious, some dangerously over-reliant. An AUP eliminates this ambiguity and establishes a clear reference for accountability when misuse occurs.',
  methods: [
    '1. Define permitted uses: what can users legitimately do with the AI system output? (Decision support, research augmentation, draft generation, etc.)',
    '2. Define prohibited uses: what must users not do? (Treat AI output as definitive without verification; bypass override mechanisms; use for decisions the system was not designed for; input confidential data not covered by the lawful basis).',
    '3. Define user responsibilities: verification obligations, override rights and obligations, incident reporting requirements.',
    '4. Define consequences of misuse: HR, legal, and operational consequences.',
    '5. Obtain Legal and DPO review; obtain Executive Sponsor sign-off.',
    '6. Integrate the AUP into user onboarding: all users must confirm they have read and accept the AUP before first use.',
  ],
  tools: ['AI AUP template'],
  outputs: ['AI Acceptable Use Policy v1.0, signed off and integrated into user onboarding'],
  exit_criteria: ['AUP complete; Legal/DPO reviewed; Executive Sponsor signed off; user onboarding integration confirmed'],
}

const T_AI_USE_POLICY: AISANode = {
  id: 'p2-g8-sa1-t1', type: 'task', level: 4,
  title: 'Draft AI Acceptable Use Policy',
  description: 'Produce the AI AUP covering permitted uses, prohibited uses, user responsibilities, and consequences of misuse.',
  purpose: 'Establish documented boundaries for AI use before the system goes live.',
  inputs: ['System scope from D11', 'Decision Analysis from D7 (which decisions AI supports vs. makes)', 'Ethical risk register from G3', 'AI AUP template'],
  methods: ['Permitted/prohibited use categorisation', 'User responsibility definition', 'Legal and DPO review', 'Onboarding integration'],
  tools: ['AI AUP template'],
  outputs: ['AI Acceptable Use Policy v1.0'],
  children: [EG_AI_USE_POLICY],
}

const SA1_POLICIES: AISANode = {
  id: 'p2-g8-sa1', type: 'sub-activity', level: 3,
  title: 'Develop AI Use Policy',
  description: 'Produce the AI Acceptable Use Policy defining permitted uses, user responsibilities, and consequences of misuse.',
  purpose: 'Establish the behavioural framework within which users interact with the AI system.',
  why_it_matters: 'AI systems without a use policy are used without boundaries. Users in high-pressure situations will over-rely on AI output, use the system for purposes it was not designed for, or fail to exercise the human judgment the governance framework requires. The AUP is the mechanism that makes user accountability operational.',
  inputs: ['System scope from D11', 'Decision Analysis from D7', 'Ethical risk register from G3'],
  questions: ['What can users legitimately do with AI output?', 'What must users not do?', 'What are the consequences of misuse?'],
  methods: ['Use categorisation', 'Responsibility and consequence definition', 'Legal review', 'Onboarding integration'],
  tools: ['AI AUP template'],
  outputs: ['AI Acceptable Use Policy v1.0'],
  deliverables: ['AI Acceptable Use Policy (Phase 2 Deliverable)'],
  exit_criteria: ['AUP signed off; integrated into user onboarding'],
  children: [T_AI_USE_POLICY],
}

const EG_HUMAN_OVERRIDE: AISANode = {
  id: 'p2-g8-sa2-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Designing the Human Override and Override Documentation Procedure',
  description: 'Define when users must exercise override authority over AI decisions, how to do so, and how overrides must be documented.',
  purpose: 'Operationalise the human oversight requirement from EU AI Act Art. 14 and from the AISA principle that human accountability cannot be delegated.',
  why_it_matters: 'Human oversight that is not procedurally specified becomes token oversight — users click "approve" on AI recommendations without engaging their judgment. The override procedure is what makes oversight substantive: it specifies when the human must think independently, how to do so, and how to record that they did.',
  methods: [
    '1. From the decision catalogue (D7), identify all decisions classified as "AI-Assisted" or "Human-Oversight Required." For each, define the override trigger: at what confidence level or in what circumstances must the human exercise independent judgment?',
    '2. Define the override procedure: what steps does the user take to override an AI recommendation? How do they record their reasoning?',
    '3. Define override documentation requirements: minimum content for the override record (user ID, AI recommendation, user decision, reasoning, timestamp). This becomes an audit trail.',
    '4. Define override review: how often are overrides reviewed? By whom? What action is taken if override patterns indicate systematic AI error (model retraining trigger)?',
    '5. Integrate override capability into the UI design requirements for Phase 3.',
  ],
  tools: ['Override procedure template', 'Override log template'],
  outputs: ['Human Override Procedure: triggers, steps, documentation requirements, and review process'],
  exit_criteria: ['Override triggers defined for all AI-Assisted decisions; documentation requirements specified; UI integration requirement confirmed for Phase 3'],
}

const T_HUMAN_OVERRIDE: AISANode = {
  id: 'p2-g8-sa2-t1', type: 'task', level: 4,
  title: 'Design Human Override Procedure',
  description: 'Define override triggers, procedure, documentation requirements, and review process for all AI-Assisted decisions.',
  purpose: 'Make human oversight substantive rather than nominal.',
  inputs: ['Decision catalogue from D7 (AI-Assisted and Human-Oversight decisions)', 'EU AI Act Art. 14 requirements from G1', 'Override procedure template'],
  methods: ['Override trigger definition', 'Procedure and documentation design', 'Review process design', 'UI requirement specification for Phase 3'],
  tools: ['Override procedure template', 'Override log template'],
  outputs: ['Human Override Procedure with documentation requirements'],
  children: [EG_HUMAN_OVERRIDE],
}

const SA2_PROCEDURES: AISANode = {
  id: 'p2-g8-sa2', type: 'sub-activity', level: 3,
  title: 'Develop Human Override Procedure',
  description: 'Define the procedure, documentation requirements, and review process for human override of AI recommendations.',
  purpose: 'Make human oversight of AI decisions substantive, documented, and auditable.',
  why_it_matters: 'EU AI Act Art. 14 requires that humans assigned oversight duties have the authority and ability to intervene. An override procedure without documentation is unauditable — and unauditability is indistinguishable from non-compliance in a regulatory inquiry.',
  inputs: ['Decision catalogue from D7', 'EU AI Act Art. 14 from G1'],
  questions: ['When must the human override the AI?', 'How is the override executed and documented?', 'How are override patterns reviewed?'],
  methods: ['Override trigger and procedure design', 'Documentation requirement specification', 'Review process design'],
  tools: ['Override procedure template'],
  outputs: ['Human Override Procedure'],
  deliverables: ['Human Override Procedure (Phase 2 Deliverable)'],
  exit_criteria: ['Triggers defined for all AI-Assisted decisions; documentation requirements confirmed; review process established'],
  children: [T_HUMAN_OVERRIDE],
}

export const G8: AISANode = {
  id: 'p2-g8', type: 'activity', level: 2,
  title: 'G8 — Policy and Procedure Development',
  description: 'Produce the operational policies and procedures that govern how users interact with the AI system — the Acceptable Use Policy and the Human Override Procedure.',
  purpose: 'Establish the documented behavioural framework that makes human oversight of AI practical and auditable.',
  why_it_matters: 'Governance frameworks without operational procedures are governance on paper. The AUP and override procedure are the instruments that translate governance intention into daily user behaviour — where AI accountability is ultimately exercised.',
  principles_applied: ['Human Accountability Cannot Be Delegated'],
  inputs: ['System scope from D11', 'Decision Analysis from D7', 'EU AI Act Art. 13 and 14 obligations from G1', 'Ethical risk register from G3'],
  questions: ['What can and cannot users do with the AI system?', 'When must users override AI recommendations, and how?'],
  activities: ['Draft and ratify the AI Acceptable Use Policy', 'Design the Human Override Procedure with documentation and review requirements'],
  methods: ['Policy drafting and legal review', 'Override procedure design', 'Onboarding integration'],
  tools: ['AI AUP template', 'Override procedure template'],
  outputs: ['AI Acceptable Use Policy v1.0', 'Human Override Procedure'],
  deliverables: ['AI Acceptable Use Policy (Phase 2 Deliverable)', 'Human Override Procedure (Phase 2 Deliverable)'],
  exit_criteria: ['AUP signed off and integrated into onboarding', 'Override procedure confirmed for all AI-Assisted decisions'],
  related_phases: ['phase-3', 'phase-4'],
  references: [{ title: 'EU AI Act Art. 13 — Transparency and provision of information', type: 'standard' }, { title: 'EU AI Act Art. 14 — Human oversight', type: 'standard' }],
  children: [SA1_POLICIES, SA2_PROCEDURES],
}
