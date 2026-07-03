import type { AISANode } from '@/types/aisa'

// ─── G10 — AUDIT AND ACCOUNTABILITY FRAMEWORK ─────────────────────────

const EG_AUDIT_DESIGN: AISANode = {
  id: 'p2-g10-sa1-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Designing the AI Audit Framework',
  description: 'Design the audit programme that provides independent assurance that the AI system is operating within its governance framework, compliance obligations, and ethical boundaries.',
  purpose: 'Establish independent verification of AI governance effectiveness — creating accountability that is not self-reported.',
  why_it_matters: 'Self-reported governance is unreliable. An audit framework provides independent evidence that governance is being practised rather than assumed, which is essential for regulatory credibility and internal accountability.',
  methods: [
    '1. Define audit scope: what will be audited? At minimum: EU AI Act compliance (for High Risk systems, annual review); GDPR compliance (at least annual); model performance against acceptance criteria; governance process adherence; access controls and security controls.',
    '2. Define audit types: internal audit (conducted by internal audit function or independent internal team), regulatory audit (responding to DPA or AI Office inspection), third-party audit (external assurance for conformity assessment support).',
    '3. Define audit frequency: regulatory compliance audit — annual; model performance audit — quarterly (or trigger-based if performance anomaly detected); access and security audit — annual; governance process adherence — semi-annual.',
    '4. Define audit outputs: audit report, findings register, remediation plan, and evidence of remediation completion.',
    '5. Define the audit trail requirements: what records must be kept and for how long to support audit? (EU AI Act Art. 12 requires logging records for at least 6 months for High Risk systems.)',
    '6. Assign the Audit Lead (typically the Internal Audit function or DPO for privacy audits).',
  ],
  tools: ['AI audit framework template', 'Audit trail specification template'],
  outputs: ['AI Audit Framework: scope, types, frequency, outputs, trail requirements, and Audit Lead'],
  exit_criteria: ['Audit scope defined; frequency and types confirmed; audit trail requirements specified; Audit Lead named'],
}

const T_AUDIT_DESIGN: AISANode = {
  id: 'p2-g10-sa1-t1', type: 'task', level: 4,
  title: 'Design AI Audit Framework',
  description: 'Design the AI audit programme covering scope, types, frequency, outputs, and audit trail requirements.',
  purpose: 'Establish independent assurance of AI governance effectiveness.',
  inputs: ['Governance Framework from G6', 'EU AI Act Art. 12 logging requirements from G1', 'GDPR audit requirements from G2', 'AI audit framework template'],
  methods: ['Audit scope definition', 'Type and frequency specification', 'Audit trail requirement design', 'Audit Lead assignment'],
  tools: ['AI audit framework template', 'Audit trail specification template'],
  outputs: ['AI Audit Framework'],
  children: [EG_AUDIT_DESIGN],
}

const SA1_AUDIT: AISANode = {
  id: 'p2-g10-sa1', type: 'sub-activity', level: 3,
  title: 'Design Audit Framework',
  description: 'Design the AI audit programme providing independent assurance across compliance, model performance, security, and governance adherence.',
  purpose: 'Provide independent verification that AI governance is practised, not just documented.',
  why_it_matters: 'Governance without audit is self-certification. Independent audit converts governance from a policy exercise into an accountable practice with consequences for non-compliance — which is the only form of governance that sustains itself under operational pressure.',
  inputs: ['Governance Framework from G6', 'EU AI Act Art. 12 from G1', 'Risk Register from G4'],
  questions: ['What will be audited?', 'How often?', 'What records must be retained to support audit?', 'Who leads each audit type?'],
  methods: ['Scope and frequency definition', 'Audit trail specification', 'Audit Lead assignment'],
  tools: ['AI audit framework template'],
  outputs: ['AI Audit Framework'],
  deliverables: ['AI Audit Framework (Phase 2 Deliverable)'],
  exit_criteria: ['Scope and frequency confirmed; trail requirements specified; Audit Lead named'],
  children: [T_AUDIT_DESIGN],
}

const EG_LOGGING_SPEC: AISANode = {
  id: 'p2-g10-sa2-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Specifying AI System Logging Requirements',
  description: 'Define what the AI system must log, at what granularity, for how long, and with what access controls — as mandatory Phase 4 implementation requirements.',
  purpose: 'Ensure the AI system produces the audit trail that regulatory compliance, incident investigation, and model monitoring require.',
  why_it_matters: 'Logging requirements specified in Phase 2 become implementation requirements in Phase 4. Logging designed after the system is built is typically incomplete, inconsistently formatted, and poorly secured. Specification before implementation ensures the audit trail is fit for purpose when it is needed.',
  methods: [
    '1. Define the mandatory log events from EU AI Act Art. 12 (for High Risk systems): system start and stop, input data characteristics, model version, output and confidence score, human override events, anomalies and errors.',
    '2. Define the extended log events required for internal governance: access events, configuration changes, model retraining events, performance metric calculations.',
    '3. Define log format: structured (JSON preferred for machine-readable audit), field definitions, timestamps (UTC, ISO 8601).',
    '4. Define retention period: EU AI Act Art. 12 requires minimum 6 months for High Risk; GDPR may require shorter retention for personal data logs (data minimisation). Where these conflict, apply the more restrictive obligation.',
    '5. Define log access controls: who can read logs, who can delete logs (should be nobody without dual approval), audit of log access.',
    '6. Define log integrity protection: how is the log protected against tampering (immutable storage, cryptographic signing)?',
  ],
  tools: ['Logging specification template', 'EU AI Act Art. 12 reference'],
  outputs: ['AI System Logging Specification: events, format, retention, access controls, and integrity protection — as Phase 4 implementation requirements'],
  exit_criteria: ['All mandatory log events specified; retention periods confirmed against regulatory requirements; access and integrity controls defined; included in Phase 4 requirements'],
}

const T_LOGGING_SPEC: AISANode = {
  id: 'p2-g10-sa2-t1', type: 'task', level: 4,
  title: 'Specify AI System Logging Requirements',
  description: 'Define all log events, format, retention, access controls, and integrity protection requirements for Phase 4 implementation.',
  purpose: 'Ensure the audit trail is designed before implementation, not retrofitted after.',
  inputs: ['EU AI Act Art. 12 from G1', 'GDPR retention obligations from G2', 'Audit Framework from SA1', 'Logging specification template'],
  methods: ['Mandatory and extended log event definition', 'Format and retention specification', 'Access control and integrity requirement design'],
  tools: ['Logging specification template'],
  outputs: ['AI System Logging Specification as Phase 4 requirements'],
  children: [EG_LOGGING_SPEC],
}

const SA2_LOGGING: AISANode = {
  id: 'p2-g10-sa2', type: 'sub-activity', level: 3,
  title: 'Specify Logging Requirements',
  description: 'Define the complete AI system logging specification — events, format, retention, access controls, and integrity — as mandatory Phase 4 implementation requirements.',
  purpose: 'Ensure the audit trail is designed for purpose before the system is built.',
  why_it_matters: 'Logging is the foundation of all post-deployment accountability — for regulatory compliance, incident investigation, model monitoring, and performance review. Designing it in Phase 2 ensures it meets all requirements; retrofitting it after deployment means redesigning data pipelines at operational cost.',
  inputs: ['Audit Framework from SA1', 'EU AI Act Art. 12', 'GDPR retention obligations from G2'],
  questions: ['What must be logged?', 'In what format?', 'For how long?', 'With what protection?'],
  methods: ['Log event specification', 'Format and retention definition', 'Access and integrity control design'],
  tools: ['Logging specification template'],
  outputs: ['AI System Logging Specification'],
  deliverables: ['Logging Specification (input to Phase 4 implementation)'],
  exit_criteria: ['All events specified; retention confirmed against regulations; access and integrity controls defined; included in Phase 4 requirements'],
  children: [T_LOGGING_SPEC],
}

export const G10: AISANode = {
  id: 'p2-g10', type: 'activity', level: 2,
  title: 'G10 — Audit and Accountability Framework',
  description: 'Design the AI audit programme and logging specification that provide independent assurance of governance effectiveness and create the audit trail required for compliance and incident investigation.',
  purpose: 'Establish the independent verification and evidence-generation mechanisms that convert AI governance from self-certification into accountable practice.',
  why_it_matters: 'Governance without audit and logging is unverifiable. Auditors, regulators, and affected individuals have no basis to trust governance claims that cannot be evidenced. The Audit and Accountability Framework is the infrastructure of trustworthy AI governance.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Governance Framework from G6', 'EU AI Act Art. 12 from G1', 'GDPR from G2', 'Risk Register from G4'],
  questions: ['What will be independently audited?', 'What must the system log to support audit and compliance?', 'How long must logs be retained and how are they protected?'],
  activities: ['Design the AI audit programme with scope, frequency, types, and Audit Lead', 'Specify the AI system logging requirements as Phase 4 implementation mandates'],
  methods: ['Audit scope and frequency design', 'Log event specification', 'Retention and integrity control design'],
  tools: ['AI audit framework template', 'Logging specification template'],
  outputs: ['AI Audit Framework', 'AI System Logging Specification'],
  deliverables: ['AI Audit Framework (Phase 2 Deliverable)', 'Logging Specification (Phase 2 Deliverable)'],
  exit_criteria: ['Audit programme designed with named Audit Lead', 'Logging specification complete and included in Phase 4 requirements'],
  related_phases: ['phase-4'],
  references: [{ title: 'EU AI Act Art. 12 — Record-keeping', type: 'standard' }, { title: 'ISO 27001 Annex A.12 — Logging and monitoring', type: 'standard' }],
  children: [SA1_AUDIT, SA2_LOGGING],
}
