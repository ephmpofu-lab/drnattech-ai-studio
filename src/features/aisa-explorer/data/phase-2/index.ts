import type { AISANode } from '@/types/aisa'
import { G1 } from './g1'
import { G2 } from './g2'
import { G3 } from './g3'
import { G4 } from './g4'
import { G5 } from './g5'
import { G6 } from './g6'
import { G7 } from './g7'
import { G8 } from './g8'
import { G9 } from './g9'
import { G10 } from './g10'
import { G11 } from './g11'

export const PHASE_2: AISANode = {
  id: 'phase-2',
  type: 'phase',
  level: 1,
  title: 'Phase 2 — Governance & Risk Assessment',
  description: 'The governance foundation phase. Establishes all legal, ethical, security, and organisational governance requirements before architecture design begins — ensuring Phase 3 builds a compliant system by design rather than by retrofit.',
  purpose: 'Convert the discovery outputs of Phase 1 into a comprehensive governance framework that defines the compliance, ethical, security, and accountability boundaries within which the AI system will be designed and operated.',
  why_it_matters: 'AI systems built without completed governance assessment are built on legal, ethical, and security uncertainty. Phase 2 resolves that uncertainty before architectural commitments are made — when resolution is cheapest. Governance established after architecture is set must compromise between what is required and what the architecture can support.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['All Phase 1 deliverables — Problem Statement, Business Case, Process Map, Pain Point Matrix, Data Landscape Assessment, Decision Analysis, Constraints Analysis, Success Metrics, Complexity Report, Scope Definition', 'Legal and DPO team contacts', 'Security and IT Architecture team contacts', 'Ethics committee or equivalent', 'Executive Sponsor'],
  questions: [
    'What EU AI Act risk tier applies, and what obligations does it impose?',
    'Is a DPIA required, and what privacy controls must be embedded in design?',
    'What are the bias risks and required fairness standards?',
    'What are all AI risks and their treatment plans?',
    'What AI-specific security threats must the architecture defend against?',
    'Who governs the AI system and how?',
    'What policies, training, and audit processes are required?',
  ],
  activities: [
    'G1 — EU AI Act Compliance Assessment: classify risk tier, map obligations, plan conformity assessment',
    'G2 — GDPR & Data Privacy Assessment: DPIA, lawful basis, privacy controls',
    'G3 — Ethical AI Assessment: bias, fairness metrics, ethical risks, explainability requirements',
    'G4 — Risk Management Framework: comprehensive risk register, treatment plans, review cadence',
    'G5 — Security Risk Assessment: AI threat model, security controls, incident response plan',
    'G6 — AI Governance Framework Design: governance structure, processes, framework document',
    'G7 — Stakeholder Governance & Communication: communication plan, change management programme',
    'G8 — Policy and Procedure Development: AI AUP, human override procedure',
    'G9 — Training and Awareness Programme: role-based training, awareness campaign',
    'G10 — Audit and Accountability Framework: audit programme, logging specification',
    'G11 — Phase 2 Close-Out and Phase 3 Readiness: governance pack, close-out, Phase 3 authorisation',
  ],
  outputs: [
    'EU AI Act Compliance Plan', 'DPIA (if mandatory)', 'Lawful Basis Register', 'Privacy Controls Specification',
    'Ethical AI Assessment Report', 'AI Risk Register v1.0', 'Risk Treatment Plans',
    'Security Risk Assessment Report', 'AI Security Incident Response Plan',
    'AI Governance Framework', 'Stakeholder Communication Plan', 'Change Management Programme',
    'AI Acceptable Use Policy', 'Human Override Procedure', 'Training Programme Design',
    'AI Audit Framework', 'Logging Specification', 'Phase 2 Governance Pack', 'Phase 3 Architecture Requirements Summary',
  ],
  deliverables: [
    'EU AI Act Compliance Assessment Report (G1)',
    'GDPR Compliance Assessment Report + DPIA (G2)',
    'Ethical AI Assessment Report (G3)',
    'AI Risk Management Framework + Risk Register v1.0 (G4)',
    'Security Risk Assessment Report + Incident Response Plan (G5)',
    'AI Governance Framework (G6)',
    'Stakeholder Communication Plan + Change Management Programme (G7)',
    'AI Acceptable Use Policy + Human Override Procedure (G8)',
    'Training Programme Design + Awareness Campaign Plan (G9)',
    'AI Audit Framework + Logging Specification (G10)',
    'Phase 2 Governance Pack + Close-Out Report + Phase 3 Initiation Authorisation (G11)',
  ],
  exit_criteria: [
    'All G1–G10 activities completed with exit criteria met',
    'EU AI Act risk tier confirmed by Legal/DPO',
    'DPIA completed if mandatory; DPO advice documented',
    'Lawful basis confirmed for all processing operations',
    'AI Risk Register v1.0 produced with all risks owned',
    'AI Governance Framework ratified by Executive Sponsor',
    'Logging Specification included in Phase 3/4 requirements',
    'Phase 3 Architecture Requirements Summary produced and Phase 3 team briefed',
    'Phase 3 Initiation Authorisation signed by Executive Sponsor',
  ],
  related_phases: ['phase-1', 'phase-3'],
  children: [G1, G2, G3, G4, G5, G6, G7, G8, G9, G10, G11],
}
