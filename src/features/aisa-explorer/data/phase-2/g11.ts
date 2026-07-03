import type { AISANode } from '@/types/aisa'

// ─── G11 — PHASE 2 CLOSE-OUT & PHASE 3 READINESS ─────────────────────

const EG_GOVERNANCE_PACK: AISANode = {
  id: 'p2-g11-sa1-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Compiling the Phase 2 Governance Pack for Phase 3',
  description: 'Compile all Phase 2 governance deliverables into a structured Governance Pack that Phase 3 architecture teams will use as mandatory design inputs.',
  purpose: 'Ensure Phase 3 architecture begins with complete awareness of all compliance obligations, security requirements, ethical constraints, and governance mandates identified in Phase 2.',
  why_it_matters: 'Phase 2 governance work has no value if it is not carried into Phase 3 architecture decisions. Architecture designed without knowledge of the governance pack produces systems that are technically sound but governance-non-compliant. The pack brief converts governance into architectural requirements.',
  methods: [
    '1. Compile the Governance Pack contents: EU AI Act Compliance Plan (G1), GDPR Assessment with Privacy Controls Specification (G2), Ethical AI Assessment and Explainability Requirements (G3), Risk Management Framework (G4), Security Control Specification (G5), AI Governance Framework (G6), Stakeholder Communication and Change Management Plan (G7), AI AUP and Override Procedure (G8), Training and Awareness Plan (G9), Audit Framework and Logging Specification (G10).',
    '2. Extract from each deliverable the mandatory Phase 3 architecture requirements: privacy controls, security controls, explainability requirements, human override UI requirements, logging requirements.',
    '3. Produce a Phase 3 Architecture Requirements Summary: a consolidated list of all governance-derived architecture requirements, each with source document, priority (mandatory/conditional), and Phase 3 design impact.',
    '4. Brief the Phase 3 architecture team on the Governance Pack at a kick-off session before Phase 3 begins.',
    '5. Confirm that the Phase 3 architecture lead has received and read the complete Governance Pack.',
  ],
  tools: ['Governance Pack compilation template', 'Phase 3 Architecture Requirements Summary template'],
  outputs: ['Phase 2 Governance Pack; Phase 3 Architecture Requirements Summary; Phase 3 architecture team briefed'],
  exit_criteria: ['All Phase 2 deliverables compiled in Governance Pack; Architecture Requirements Summary produced; Phase 3 team briefed and confirmed'],
}

const T_GOVERNANCE_PACK: AISANode = {
  id: 'p2-g11-sa1-t1', type: 'task', level: 4,
  title: 'Compile Governance Pack for Phase 3',
  description: 'Compile all Phase 2 deliverables into a Governance Pack and extract the Phase 3 Architecture Requirements Summary.',
  purpose: 'Convert Phase 2 governance outputs into Phase 3 architecture inputs.',
  inputs: ['All Phase 2 deliverables (G1–G10)', 'Phase 3 Architecture Requirements Summary template'],
  methods: ['Deliverable compilation', 'Architecture requirement extraction', 'Requirements summary production', 'Phase 3 team briefing'],
  tools: ['Governance Pack compilation template'],
  outputs: ['Phase 2 Governance Pack and Phase 3 Architecture Requirements Summary'],
  children: [EG_GOVERNANCE_PACK],
}

const SA1_CLOSEOUT: AISANode = {
  id: 'p2-g11-sa1', type: 'sub-activity', level: 3,
  title: 'Compile Governance Pack and Brief Phase 3',
  description: 'Compile all Phase 2 deliverables into the Governance Pack and brief the Phase 3 architecture team on mandatory governance-derived architecture requirements.',
  purpose: 'Transfer Phase 2 governance knowledge into Phase 3 architecture decisions.',
  why_it_matters: 'The Governance Pack is the mechanism by which Phase 2 governance work survives into Phase 3. Without a formal handover, governance deliverables sit in a repository unread while architecture decisions are made from technical requirements alone.',
  inputs: ['All Phase 2 deliverables', 'Phase 3 architecture team contact'],
  questions: ['Are all Phase 2 deliverables complete?', 'What architecture requirements do they impose?', 'Has the Phase 3 team received and confirmed the pack?'],
  methods: ['Deliverable compilation', 'Requirement extraction', 'Phase 3 briefing'],
  tools: ['Governance Pack compilation template'],
  outputs: ['Governance Pack; Architecture Requirements Summary; Phase 3 team briefed'],
  deliverables: ['Phase 2 Governance Pack', 'Phase 3 Architecture Requirements Summary'],
  exit_criteria: ['All deliverables compiled; Requirements Summary produced; Phase 3 team briefed and confirmed'],
  children: [T_GOVERNANCE_PACK],
}

const EG_PHASE2_CLOSEOUT: AISANode = {
  id: 'p2-g11-sa2-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Phase 2 Close-Out and Phase 3 Authorisation',
  description: 'Conduct the formal Phase 2 close-out review and obtain Phase 3 initiation authorisation from the Executive Sponsor.',
  purpose: 'Provide the governance quality gate that ensures Phase 3 begins with all governance obligations understood and Phase 2 gaps resolved.',
  why_it_matters: 'Phase boundaries are quality gates. Entering Phase 3 without completed Phase 2 governance means designing an architecture without knowing its compliance obligations — which produces designs that are technically excellent but legally non-compliant.',
  methods: [
    '1. Compile the Phase 2 Deliverable Checklist: EU AI Act Assessment, GDPR Assessment, Ethical AI Assessment, Risk Management Framework, Security Assessment, Governance Framework, Communication Plan, AI AUP, Training Programme, Audit Framework. Confirm each is present, signed, and stored.',
    '2. Confirm all exit criteria for G1–G10 are met. Any unmet criteria is a Phase 2 gap requiring resolution before Phase 3.',
    '3. Brief the Executive Sponsor on Phase 2 outputs: the compliance obligations, risks, ethical constraints, and governance framework now in place.',
    '4. Obtain written Phase 3 initiation authorisation from the Executive Sponsor.',
    '5. Capture Phase 2 lessons learned: what governance activities took longer than expected, what tools worked well, what frameworks should be adopted for future AI initiatives.',
    '6. Archive all Phase 2 deliverables in the project governance repository.',
  ],
  tools: ['Phase 2 deliverable checklist', 'Phase 3 initiation authorisation form', 'Lessons learned template'],
  outputs: ['Phase 2 close-out report; Phase 3 initiation authorisation signed by Executive Sponsor; lessons learned captured'],
  exit_criteria: ['All Phase 2 deliverables present and signed; all G1–G10 exit criteria met; Phase 3 authorisation signed; lessons learned archived'],
}

const T_PHASE2_CLOSEOUT: AISANode = {
  id: 'p2-g11-sa2-t1', type: 'task', level: 4,
  title: 'Phase 2 Close-Out and Phase 3 Authorisation',
  description: 'Confirm all Phase 2 deliverables and exit criteria; brief Sponsor; obtain Phase 3 authorisation.',
  purpose: 'Provide the governance quality gate before Phase 3 architecture design begins.',
  inputs: ['All Phase 2 deliverables', 'G1–G10 exit criteria', 'Phase 3 initiation authorisation form', 'Executive Sponsor contact'],
  methods: ['Deliverable checklist review', 'Exit criteria verification', 'Sponsor briefing', 'Phase 3 authorisation', 'Lessons learned capture'],
  tools: ['Phase 2 deliverable checklist', 'Phase 3 authorisation form'],
  outputs: ['Phase 2 close-out report; Phase 3 authorisation; lessons learned'],
  children: [EG_PHASE2_CLOSEOUT],
}

const SA2_CLOSEOUT: AISANode = {
  id: 'p2-g11-sa2', type: 'sub-activity', level: 3,
  title: 'Phase 2 Close-Out and Phase 3 Authorisation',
  description: 'Conduct the formal Phase 2 close-out, confirm all deliverables and exit criteria, and obtain Phase 3 initiation authorisation from the Executive Sponsor.',
  purpose: 'Ensure Phase 3 architecture design begins from a complete, quality-checked governance foundation.',
  why_it_matters: 'Phase 3 architecture decisions made without completed Phase 2 governance produce compliance debt that must be repaid in Phase 4 or post-deployment — at increasing cost with each phase of delay.',
  inputs: ['All Phase 2 deliverables', 'Executive Sponsor contact'],
  questions: ['Are all deliverables present?', 'Are all exit criteria met?', 'Is the Sponsor briefed and ready to authorise Phase 3?'],
  methods: ['Deliverable checklist review', 'Exit criteria verification', 'Sponsor briefing and authorisation'],
  tools: ['Phase 2 deliverable checklist'],
  outputs: ['Phase 2 close-out report; Phase 3 authorisation'],
  deliverables: ['Phase 2 Close-Out Report', 'Phase 3 Initiation Authorisation'],
  exit_criteria: ['All Phase 2 deliverables present; all exit criteria met; Phase 3 authorisation signed'],
  children: [T_PHASE2_CLOSEOUT],
}

export const G11: AISANode = {
  id: 'p2-g11', type: 'activity', level: 2,
  title: 'G11 — Phase 2 Close-Out and Phase 3 Readiness',
  description: 'Complete the Phase 2 governance programme by compiling the Governance Pack for Phase 3, conducting the formal close-out review, and obtaining Phase 3 initiation authorisation.',
  purpose: 'Transfer Phase 2 governance knowledge into Phase 3 architecture as mandatory design inputs, and ensure Phase 2 exit criteria are met before design begins.',
  why_it_matters: 'Phase 2 governance is an investment that only pays off if it shapes Phase 3 architecture. The close-out and handover are the mechanism that converts governance documentation into architectural requirements — without them, governance work is a compliance exercise rather than a design discipline.',
  principles_applied: ['Human Accountability Cannot Be Delegated'],
  inputs: ['All Phase 2 deliverables (G1–G10)', 'Phase 3 architecture team contacts', 'Executive Sponsor contact'],
  questions: ['Are all Phase 2 deliverables complete and signed?', 'What architecture requirements do they impose on Phase 3?', 'Is Phase 3 authorised to begin?'],
  activities: ['Compile Governance Pack and Phase 3 Architecture Requirements Summary; brief Phase 3 team', 'Conduct Phase 2 close-out and obtain Phase 3 initiation authorisation'],
  methods: ['Deliverable compilation', 'Architecture requirement extraction', 'Deliverable checklist review', 'Sponsor authorisation'],
  tools: ['Governance Pack compilation template', 'Phase 2 deliverable checklist', 'Phase 3 authorisation form'],
  outputs: ['Phase 2 Governance Pack', 'Phase 3 Architecture Requirements Summary', 'Phase 2 Close-Out Report', 'Phase 3 Initiation Authorisation'],
  deliverables: ['Phase 2 Governance Pack', 'Phase 2 Close-Out Report', 'Phase 3 Initiation Authorisation'],
  exit_criteria: ['All Phase 2 deliverables compiled; Phase 3 Architecture Requirements Summary produced; Phase 3 team briefed; Phase 3 authorisation signed by Executive Sponsor'],
  related_phases: ['phase-3'],
  children: [SA1_CLOSEOUT, SA2_CLOSEOUT],
}
