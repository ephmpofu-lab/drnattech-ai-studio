import type { AISANode } from '@/types/aisa'

// ─── G7 — STAKEHOLDER GOVERNANCE & COMMUNICATION ──────────────────────

const EG_COMMS_PLAN: AISANode = {
  id: 'p2-g7-sa1-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Building the AI Stakeholder Communication Plan',
  description: 'Design the structured communication plan that keeps all stakeholder groups informed about AI system development, governance decisions, and operational performance.',
  purpose: 'Prevent information vacuums that allow speculation, resistance, and misinformation to fill the space governance communication should occupy.',
  why_it_matters: 'AI projects that communicate poorly create stakeholder anxiety about job displacement, data misuse, and loss of control. Structured communication manages these concerns proactively, building the trust that is essential for adoption.',
  methods: [
    '1. Map communication requirements to stakeholder groups from D1: what does each group need to know, when, and at what level of detail?',
    '2. Define communication channels per group: executive briefings (monthly), team updates (fortnightly), user notifications (at deployment and major changes), regulatory communications (as required).',
    '3. Define communication triggers: deployment milestones, performance anomalies, material governance changes, compliance events.',
    '4. Produce a communication calendar for the delivery period.',
    '5. Assign a Communications Lead accountable for the plan.',
  ],
  tools: ['Communication plan template', 'Stakeholder Register from D1'],
  outputs: ['AI Stakeholder Communication Plan with calendar, channels, and Communications Lead'],
  exit_criteria: ['Plan covers all stakeholder groups; calendar produced; Communications Lead named'],
}

const T_COMMS_PLAN: AISANode = {
  id: 'p2-g7-sa1-t1', type: 'task', level: 4,
  title: 'Build Stakeholder Communication Plan',
  description: 'Design the communication plan covering all stakeholder groups, channels, triggers, and calendar.',
  purpose: 'Manage stakeholder expectations through structured, proactive communication.',
  inputs: ['Stakeholder Register from D1', 'Governance structure from G6', 'Communication plan template'],
  methods: ['Stakeholder group communication mapping', 'Channel and trigger definition', 'Calendar production'],
  tools: ['Communication plan template'],
  outputs: ['AI Stakeholder Communication Plan'],
  children: [EG_COMMS_PLAN],
}

const SA1_COMMS: AISANode = {
  id: 'p2-g7-sa1', type: 'sub-activity', level: 3,
  title: 'Design Stakeholder Communication Plan',
  description: 'Produce a structured communication plan for all AI stakeholder groups covering what, when, how, and by whom.',
  purpose: 'Manage stakeholder expectations and build trust through proactive, structured communication.',
  why_it_matters: 'Governance without communication is invisible. Stakeholders who do not understand the governance framework cannot hold it accountable or trust it. Structured communication makes governance visible and builds the adoption confidence that determines whether the AI system is actually used.',
  inputs: ['Stakeholder Register from D1', 'Governance structure from G6'],
  questions: ['What does each stakeholder group need to know?', 'How often, through what channel?', 'Who is the Communications Lead?'],
  methods: ['Stakeholder-to-communication mapping', 'Channel and trigger design', 'Calendar production'],
  tools: ['Communication plan template'],
  outputs: ['AI Stakeholder Communication Plan'],
  deliverables: ['Stakeholder Communication Plan (Phase 2 Deliverable)'],
  exit_criteria: ['All groups covered; calendar produced; Communications Lead named'],
  children: [T_COMMS_PLAN],
}

const EG_CHANGE_MANAGEMENT: AISANode = {
  id: 'p2-g7-sa2-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Designing the Change Management Programme',
  description: 'Design the change management programme that prepares end users and affected teams for the AI system deployment, addressing concerns about role change, skill requirements, and process modifications.',
  purpose: 'Maximise adoption and minimise resistance by preparing the organisation for the change AI deployment will bring.',
  why_it_matters: 'The single biggest predictor of AI adoption failure is under-investment in change management. A technically excellent AI system that the target users do not trust, do not use, or actively resist delivers zero business value regardless of its model performance.',
  methods: [
    '1. Identify change impacts from D8 SA3 (organisational constraints): which roles change, what skills are needed, what processes are modified.',
    '2. Segment affected groups by change impact level: high impact (role fundamentally changes), medium (some tasks change), low (adjacent awareness).',
    '3. For each segment, design change management interventions: stakeholder engagement sessions, role redesign workshops, pilot participation, user acceptance testing involvement.',
    '4. Design the "AI adoption narrative": why AI, what it does and does not do, what stays human, what improves for users.',
    '5. Define success measures for change management: adoption rate, user satisfaction score, post-deployment role clarity survey.',
  ],
  tools: ['Change impact assessment template', 'Change management plan template', 'ADKAR model reference'],
  outputs: ['Change management programme: impact segmentation, interventions per segment, adoption narrative, success measures'],
  exit_criteria: ['All affected groups segmented; interventions designed; adoption narrative approved by Business Owner; success measures defined'],
}

const T_CHANGE_MANAGEMENT: AISANode = {
  id: 'p2-g7-sa2-t1', type: 'task', level: 4,
  title: 'Design Change Management Programme',
  description: 'Produce the change management programme addressing role impact, skill requirements, and adoption strategy.',
  purpose: 'Prevent adoption failure by preparing the organisation for AI deployment.',
  inputs: ['Organisational constraints from D8', 'Stakeholder Register from D1', 'Change management plan template'],
  methods: ['Change impact segmentation', 'Intervention design per segment', 'Adoption narrative creation'],
  tools: ['Change impact assessment template', 'ADKAR model reference'],
  outputs: ['Change management programme with adoption narrative and success measures'],
  children: [EG_CHANGE_MANAGEMENT],
}

const SA2_CHANGE_MANAGEMENT: AISANode = {
  id: 'p2-g7-sa2', type: 'sub-activity', level: 3,
  title: 'Design Change Management Programme',
  description: 'Produce the organisational change management programme that maximises AI adoption and minimises resistance.',
  purpose: 'Ensure the AI system achieves its business value by being genuinely adopted, not just deployed.',
  why_it_matters: 'Deployment without adoption is waste. AI systems that are deployed into organisations that were not prepared for the change they bring produce low utilisation, workarounds, and eventual abandonment — regardless of technical quality.',
  inputs: ['Organisational constraints from D8', 'Stakeholder Register from D1'],
  questions: ['Who is most impacted?', 'What specific interventions will reduce resistance?', 'What is the adoption narrative?'],
  methods: ['Impact segmentation', 'Intervention design', 'Adoption narrative creation'],
  tools: ['Change management plan template', 'ADKAR model'],
  outputs: ['Change management programme'],
  deliverables: ['Change Management Programme (Phase 2 Deliverable)'],
  exit_criteria: ['All segments addressed; adoption narrative approved; success measures defined'],
  children: [T_CHANGE_MANAGEMENT],
}

export const G7: AISANode = {
  id: 'p2-g7', type: 'activity', level: 2,
  title: 'G7 — Stakeholder Governance & Communication',
  description: 'Design the stakeholder communication plan and change management programme that ensure all affected parties are informed, prepared, and enabled to adopt the AI system.',
  purpose: 'Build the organisational foundation for AI adoption through structured communication and change management.',
  why_it_matters: 'Technical governance without stakeholder governance is governance for the team, not for the organisation. Communication and change management are the mechanisms by which governance becomes visible and adoption becomes real.',
  principles_applied: ['Human Accountability Cannot Be Delegated'],
  inputs: ['Stakeholder Register from D1', 'Organisational constraints from D8', 'Governance structure from G6'],
  questions: ['What does each stakeholder group need to know and when?', 'How will the organisation be prepared for the change AI deployment brings?'],
  activities: ['Design stakeholder communication plan with channels, triggers, and calendar', 'Design change management programme with impact segmentation and interventions'],
  methods: ['Stakeholder communication planning', 'Change impact segmentation', 'ADKAR change management framework'],
  tools: ['Communication plan template', 'Change management plan template'],
  outputs: ['AI Stakeholder Communication Plan', 'Change Management Programme'],
  deliverables: ['Stakeholder Communication Plan (Phase 2 Deliverable)', 'Change Management Programme (Phase 2 Deliverable)'],
  exit_criteria: ['Communication plan covers all stakeholder groups; Communications Lead named', 'Change management programme covers all impact segments; adoption narrative approved'],
  related_phases: ['phase-4'],
  references: [{ title: 'ADKAR — Change Management Model, Prosci', type: 'framework' }],
  children: [SA1_COMMS, SA2_CHANGE_MANAGEMENT],
}
