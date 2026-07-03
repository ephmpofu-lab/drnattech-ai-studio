import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// G2 — GDPR & DATA PRIVACY ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Conduct Data Protection Impact Assessment ────────────────────

const EG_DPIA_SCREENING: AISANode = {
  id: 'p2-g2-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: DPIA Screening and Mandatory Determination',
  description: 'Conduct the DPIA threshold test to determine whether a full Data Protection Impact Assessment is mandatory under GDPR Art. 35.',
  purpose: 'Confirm whether a DPIA is required before personal data processing begins, preventing unlawful processing.',
  why_it_matters: 'GDPR Art. 35 makes DPIA mandatory before processing that is "likely to result in a high risk" to individuals. AI systems that process personal data at scale, use new technologies, or make automated decisions almost always meet this threshold. Proceeding without a required DPIA is itself a GDPR violation.',
  methods: [
    '1. Apply the Art. 35 threshold criteria. DPIA is mandatory if processing involves two or more of: systematic and extensive automated processing including profiling; processing of special category data (Art. 9) or criminal conviction data (Art. 10) at large scale; systematic monitoring of publicly accessible areas.',
    '2. Additionally consult the DPA\'s list of processing operations requiring a DPIA (Art. 35(4)).',
    '3. For AI systems: the use of automated decision-making (especially with significant effects on individuals) and the use of new technology are specific triggers under Recital 91.',
    '4. If DPIA is mandatory: document the trigger, scope the DPIA, and initiate the DPIA process immediately — it must be completed before processing begins.',
    '5. If DPIA is not mandatory: document the negative screening decision with evidence for the regulatory record.',
  ],
  tools: ['DPIA threshold test template', 'DPA list of high-risk processing types'],
  outputs: ['DPIA screening decision (mandatory or not), with documented evidence; if mandatory, DPIA initiated'],
  exit_criteria: ['Threshold test completed with documented evidence; DPO has confirmed the screening decision; DPIA initiated if mandatory'],
}

const T_DPIA_SCREENING: AISANode = {
  id: 'p2-g2-sa1-t1',
  type: 'task',
  level: 4,
  title: 'DPIA Screening and Mandatory Determination',
  description: 'Apply GDPR Art. 35 threshold criteria to determine whether a DPIA is mandatory.',
  purpose: 'Prevent unlawful processing by confirming whether a DPIA must be completed before data processing begins.',
  inputs: ['Data source inventory from D6', 'Decision Analysis from D7', 'System scope from D11', 'DPIA threshold test template', 'DPO input'],
  methods: ['Art. 35 threshold criteria application', 'DPA high-risk processing list consultation', 'Screening decision documentation'],
  tools: ['DPIA threshold test template'],
  outputs: ['DPIA screening decision with documented evidence'],
  children: [EG_DPIA_SCREENING],
}

const EG_DPIA_CONDUCT: AISANode = {
  id: 'p2-g2-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Conducting the Full DPIA',
  description: 'Complete the full DPIA process including systematic description of processing, necessity assessment, risk identification and mitigation, and DPO consultation.',
  purpose: 'Produce a complete, legally sufficient DPIA that satisfies Art. 35 before personal data processing begins.',
  why_it_matters: 'A complete DPIA is not just a compliance checkbox — it is a structured privacy risk management process that prevents privacy harms from being embedded in the AI system design. DPIAs conducted during design (Phase 2) can influence architecture; DPIAs conducted after deployment can only document risks that are already live.',
  methods: [
    '1. Systematic description (Art. 35(7)(a)): describe the envisaged processing operations, the purposes and legitimate interests. Include: data flows, third-party data processors, retention periods, and system architecture overview.',
    '2. Necessity and proportionality assessment (Art. 35(7)(b)): for each processing operation, assess whether it is necessary and proportionate to the legitimate purpose. Identify less privacy-invasive alternatives.',
    '3. Risk assessment (Art. 35(7)(c)): identify risks to the rights and freedoms of data subjects. For each risk: nature, likelihood, severity, and affected individuals. AI-specific risks to assess: automated decision-making impacts, profiling without consent, inference of special category attributes, and re-identification risk.',
    '4. Risk mitigation measures: for each identified risk, define a technical or organisational measure to mitigate it. Assign an owner and a deadline.',
    '5. Residual risk assessment: assess remaining risk after mitigation. If residual risk is high, consult the supervisory authority before proceeding (Art. 36).',
    '6. DPO consultation (Art. 35(2)): submit the DPIA to the DPO for review and formally document their advice.',
    '7. Obtain sign-off from the Data Controller\'s representative before processing begins.',
  ],
  tools: ['DPIA template', 'Risk matrix', 'Data flow diagram tools'],
  outputs: ['Complete DPIA document: processing description, necessity assessment, risk register with mitigations, residual risk assessment, DPO advice; signed by Data Controller representative'],
  exit_criteria: ['DPIA complete with all Art. 35(7) elements; DPO has provided documented advice; residual risk acceptable or Art. 36 consultation initiated; Data Controller representative has signed off'],
}

const T_DPIA_CONDUCT: AISANode = {
  id: 'p2-g2-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Conduct the Full DPIA',
  description: 'Complete the GDPR Art. 35 DPIA with systematic processing description, necessity assessment, risk identification and mitigation, and DPO consultation.',
  purpose: 'Produce a legally sufficient DPIA before personal data processing begins.',
  inputs: ['Data source inventory and quality assessment from D6', 'Decision Analysis from D7', 'System architecture overview (from Phase 3 preview)', 'DPIA template', 'DPO contact'],
  methods: ['Art. 35(7) four-element DPIA structure', 'AI-specific privacy risk assessment', 'Mitigation measure design', 'DPO consultation', 'Data Controller sign-off'],
  tools: ['DPIA template', 'Risk matrix'],
  outputs: ['Complete DPIA signed by Data Controller representative'],
  children: [EG_DPIA_CONDUCT],
}

const SA1_DPIA: AISANode = {
  id: 'p2-g2-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Conduct Data Protection Impact Assessment',
  description: 'Complete the DPIA threshold screening and, where mandatory, conduct the full DPIA covering processing description, necessity, risk assessment, mitigation, and DPO consultation.',
  purpose: 'Ensure personal data processing in the AI system is lawful, necessary, proportionate, and safe before design is finalised.',
  why_it_matters: 'A DPIA conducted during design has protective power — its findings can change architecture decisions. A DPIA conducted after deployment is a compliance document for risks already embedded in a live system. Phase 2 is the correct point to conduct the DPIA for this reason.',
  inputs: ['Data source inventory from D6', 'Decision Analysis from D7', 'System scope from D11', 'DPO input'],
  questions: ['Is a DPIA mandatory for this processing?', 'What are the privacy risks of the AI system?', 'What mitigations reduce residual risk to acceptable levels?', 'Is Art. 36 supervisory authority consultation required?'],
  methods: ['DPIA threshold screening', 'Full DPIA (Art. 35(7) four elements)', 'AI-specific risk assessment', 'DPO consultation'],
  tools: ['DPIA threshold test template', 'DPIA template'],
  governance_considerations: 'If DPIA identifies residual high risk and Art. 36 consultation is required, this introduces a regulatory timeline dependency (DPAs have up to 8 weeks to respond). This must be factored into the Phase 4 delivery timeline immediately.',
  outputs: ['DPIA screening decision', 'Full DPIA (if mandatory) signed by Data Controller representative'],
  deliverables: ['DPIA (Phase 2 Deliverable — legally required before processing begins)'],
  exit_criteria: ['Screening completed; full DPIA completed and signed if mandatory; DPO advice documented; Art. 36 consultation initiated if required'],
  children: [T_DPIA_SCREENING, T_DPIA_CONDUCT],
}

// ─── SA2: Establish Lawful Basis for AI Processing ─────────────────────

const EG_LAWFUL_BASIS: AISANode = {
  id: 'p2-g2-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Confirming Lawful Basis for Each Processing Operation',
  description: 'For each personal data processing operation in the AI system, confirm the GDPR lawful basis under Art. 6 (and Art. 9 for special categories).',
  purpose: 'Ensure every processing operation is lawful before the data pipeline is designed, preventing the engineering of unlawful data flows.',
  why_it_matters: 'Processing personal data without a lawful basis is unlawful under GDPR Art. 6, regardless of the technical sophistication of the system. Engineers cannot fix a missing lawful basis after the system is built. Confirming basis in Phase 2 means it shapes the data architecture in Phase 4.',
  methods: [
    '1. For each processing operation identified in D6, list the candidate lawful bases under Art. 6: (a) Consent; (b) Contract performance; (c) Legal obligation; (d) Vital interests; (e) Public task; (f) Legitimate interests.',
    '2. For each candidate, apply the sufficiency test: does the processing genuinely fall within the scope of this basis?',
    '3. For special category data (health, biometrics, political opinion, etc.), identify the additional condition under Art. 9(2) that applies.',
    '4. For automated decision-making with significant effects on individuals, confirm the basis under Art. 22: explicit consent, contract performance, or authorised Union/Member State law.',
    '5. Document the confirmed basis for each processing operation and obtain DPO sign-off.',
    '6. Where legitimate interests is the claimed basis, complete a Legitimate Interests Assessment (LIA): purpose, necessity, and balancing test.',
  ],
  tools: ['Lawful basis assessment template', 'LIA template', 'Art. 9 condition reference list'],
  outputs: ['Lawful basis register: confirmed basis per processing operation with DPO sign-off'],
  exit_criteria: ['All processing operations have a confirmed, documented lawful basis; Art. 9 conditions confirmed for special category data; DPO signed off'],
}

const T_LAWFUL_BASIS: AISANode = {
  id: 'p2-g2-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Confirm Lawful Basis per Processing Operation',
  description: 'Identify and confirm the GDPR lawful basis for each personal data processing operation in the AI system.',
  purpose: 'Ensure all data processing operations have a documented lawful basis before data pipeline design.',
  inputs: ['Data source inventory from D6', 'Data governance issues from D6 SA4', 'Decision Analysis from D7', 'Lawful basis assessment template', 'DPO contact'],
  methods: ['Art. 6 basis identification and sufficiency test', 'Art. 9(2) additional condition identification', 'Art. 22 automated decision basis assessment', 'LIA where legitimate interests claimed', 'DPO sign-off'],
  tools: ['Lawful basis assessment template', 'LIA template'],
  outputs: ['Lawful basis register with DPO sign-off'],
  children: [EG_LAWFUL_BASIS],
}

const SA2_LAWFUL_BASIS: AISANode = {
  id: 'p2-g2-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Establish Lawful Basis for AI Processing',
  description: 'Confirm the GDPR lawful basis for every personal data processing operation in the AI system, including special category data and automated decision-making.',
  purpose: 'Ensure all data processing is lawful before the data architecture is designed.',
  why_it_matters: 'Data pipelines built on unlawful processing are unlawful pipelines. Changing the lawful basis after a data pipeline is built requires architectural change to how data is collected, stored, and used — work that is vastly more expensive than confirming the basis before design.',
  inputs: ['Data source inventory from D6', 'Decision Analysis from D7', 'DPO input', 'Data Processing Agreements'],
  questions: ['What is the lawful basis for each processing operation?', 'Are special category data conditions met?', 'Is the Art. 22 basis for automated decisions confirmed?'],
  methods: ['Art. 6 basis assessment per operation', 'Art. 9(2) additional condition confirmation', 'Art. 22 basis assessment', 'LIA for legitimate interests basis'],
  tools: ['Lawful basis assessment template', 'LIA template'],
  outputs: ['Lawful basis register with DPO sign-off'],
  deliverables: ['Lawful Basis Register (Phase 2 Deliverable)'],
  exit_criteria: ['All processing operations have documented lawful basis; DPO has signed off; unlawful operations removed from scope or alternative basis confirmed'],
  children: [T_LAWFUL_BASIS],
}

// ─── SA3: Design Privacy Controls ─────────────────────────────────────

const EG_PRIVACY_BY_DESIGN: AISANode = {
  id: 'p2-g2-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Designing Privacy Controls (Privacy by Design)',
  description: 'Define the technical and organisational privacy controls that must be embedded in the AI system architecture and data pipeline design, applying the GDPR Art. 25 Privacy by Design and by Default principles.',
  purpose: 'Produce the privacy control requirements that become mandatory inputs to Phase 3 architecture and Phase 4 data pipeline design.',
  why_it_matters: 'Privacy controls designed into architecture are structurally effective; controls bolted on after build are structurally weak and frequently incomplete. Art. 25 requires privacy to be embedded in design by default — this is the activity where that requirement is operationalised.',
  methods: [
    '1. Apply the seven Privacy by Design principles for each processing operation: Proactive not Reactive; Privacy as the Default; Privacy Embedded into Design; Full Functionality; End-to-End Security; Visibility and Transparency; Respect for User Privacy.',
    '2. Define data minimisation controls: what is the minimum data the AI system needs to function? Remove everything else from the data pipeline.',
    '3. Define purpose limitation controls: how does the system prevent use of data for purposes beyond those stated?',
    '4. Define retention and deletion controls: what is the maximum retention period for each data type? How is deletion implemented in the AI pipeline (including derived model parameters)?',
    '5. Define access controls: who can access raw data, model outputs, and inference logs? Implement least-privilege access by design.',
    '6. Define pseudonymisation and encryption requirements: which data fields must be pseudonymised or encrypted at rest and in transit?',
    '7. Define data subject rights implementation: how will the system respond to access, correction, deletion, and portability requests?',
  ],
  tools: ['Privacy control design template', 'Privacy by Design assessment checklist'],
  outputs: ['Privacy control requirements: minimisation, purpose limitation, retention, access, pseudonymisation, encryption, and data subject rights — all as architecture inputs for Phase 3'],
  exit_criteria: ['Privacy controls defined for all processing operations; minimisation, purpose limitation, and retention requirements confirmed; DPO reviewed and approved'],
}

const T_PRIVACY_BY_DESIGN: AISANode = {
  id: 'p2-g2-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Design Privacy Controls',
  description: 'Define all privacy controls required by GDPR Art. 25 as mandatory architecture inputs for Phase 3 and Phase 4.',
  purpose: 'Embed privacy requirements in the design brief before architecture decisions are made.',
  inputs: ['DPIA findings from SA1', 'Lawful basis register from SA2', 'Privacy control design template', 'DPO input'],
  methods: ['Privacy by Design seven principles application', 'Data minimisation analysis', 'Purpose limitation control design', 'Retention schedule definition', 'Access control specification', 'Pseudonymisation and encryption requirements'],
  tools: ['Privacy control design template', 'Privacy by Design assessment checklist'],
  outputs: ['Privacy control requirements as Phase 3 architecture inputs'],
  children: [EG_PRIVACY_BY_DESIGN],
}

const SA3_PRIVACY_CONTROLS: AISANode = {
  id: 'p2-g2-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Design Privacy Controls',
  description: 'Define all GDPR Art. 25 Privacy by Design requirements as mandatory architecture inputs — data minimisation, purpose limitation, retention, access control, pseudonymisation, and data subject rights.',
  purpose: 'Ensure privacy is embedded in the AI system architecture by design, not bolted on after build.',
  why_it_matters: 'Privacy by Design is a legal requirement, not a best practice. Systems built without privacy controls embedded at design time require expensive retrofit — and the retrofit is never as effective as the original design. This activity converts GDPR obligations into engineering requirements while engineering decisions can still respond to them.',
  inputs: ['DPIA findings from SA1', 'Lawful basis register from SA2', 'Data source inventory from D6'],
  questions: ['What is the minimum data required for each processing operation?', 'How is purpose limitation enforced technically?', 'What are the retention and deletion requirements?', 'How will data subject rights be fulfilled?'],
  methods: ['Privacy by Design principles application', 'Data minimisation analysis', 'Privacy control specification per processing operation'],
  tools: ['Privacy control design template'],
  governance_considerations: 'Privacy controls must be translated into Phase 3 architecture requirements and Phase 4 implementation tasks. They are non-negotiable: GDPR Art. 25 non-compliance carries penalties independent of data breach.',
  outputs: ['Privacy control requirements as architecture inputs'],
  deliverables: ['Privacy Controls Specification (input to Phase 3 architecture)'],
  exit_criteria: ['Privacy controls specified for all processing operations; DPO reviewed and approved; controls included in Phase 3 architecture brief'],
  children: [T_PRIVACY_BY_DESIGN],
}

// ═══════════════════════════════════════════════════════════════════════
// G2 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const G2: AISANode = {
  id: 'p2-g2',
  type: 'activity',
  level: 2,
  title: 'G2 — GDPR & Data Privacy Assessment',
  description: 'Conduct the full GDPR compliance assessment for the AI initiative — DPIA, lawful basis confirmation, and Privacy by Design control specification — producing legally required documentation and the privacy architecture requirements that Phase 3 must satisfy.',
  purpose: 'Ensure the AI system is lawful, fair, and transparent in its personal data processing before architecture design locks in technical decisions.',
  why_it_matters: 'GDPR compliance is not optional and cannot be retrofitted effectively. G2 produces the legal documentation required before processing begins and the architecture requirements that embed privacy into the system design. Failing to complete G2 before Phase 3 guarantees a non-compliant architecture.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Data source inventory and governance issues from D6', 'Decision Analysis from D7', 'Scope Definition from D11', 'EU AI Act compliance assessment from G1', 'DPO and Legal team contacts'],
  questions: [
    'Is a DPIA mandatory for this processing?',
    'What privacy risks does the AI system create, and how are they mitigated?',
    'What is the lawful basis for each processing operation?',
    'What privacy controls must be embedded in the architecture?',
  ],
  activities: [
    'Conduct DPIA threshold screening and full DPIA where mandatory',
    'Confirm GDPR lawful basis for each processing operation',
    'Design privacy controls (data minimisation, purpose limitation, retention, access, pseudonymisation)',
    'Obtain DPO sign-off on all GDPR compliance deliverables',
  ],
  methods: ['DPIA threshold screening and full DPIA (Art. 35)', 'Art. 6/9/22 lawful basis assessment', 'Legitimate Interests Assessment where applicable', 'Privacy by Design seven principles', 'Privacy control specification'],
  tools: ['DPIA template', 'Lawful basis assessment template', 'LIA template', 'Privacy control design template'],
  governance_considerations: 'If residual DPIA risk is high, Art. 36 supervisory authority consultation may delay deployment by up to 8 weeks. This must be factored into the project timeline. DPO advice from the DPIA must be formally documented and actioned.',
  security_considerations: 'Privacy controls and security controls are complementary. Encryption and access control requirements from this activity must be coordinated with the security controls designed in G5 (Security Risk Assessment) to avoid duplication and conflicts.',
  ai_engineering_considerations: 'Privacy controls are architecture constraints, not post-build additions. Data minimisation controls may require redesign of feature engineering pipelines. Retention and deletion controls must be implemented at the data layer, the model layer (model unlearning or retraining), and the logging layer — ML engineers must be briefed on these requirements before Phase 4 pipeline design.',
  outputs: ['DPIA screening decision and full DPIA (if mandatory)', 'Lawful basis register', 'Privacy control requirements specification'],
  deliverables: ['GDPR Compliance Assessment Report (Phase 2 Deliverable)', 'DPIA', 'Lawful Basis Register', 'Privacy Controls Specification'],
  exit_criteria: [
    'DPIA threshold screening completed with documented evidence',
    'Full DPIA completed and signed if mandatory; DPO advice documented',
    'Art. 36 consultation initiated if residual risk is high',
    'Lawful basis confirmed and documented for all processing operations; DPO signed off',
    'Privacy controls specified for all operations and included in Phase 3 architecture brief',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'GDPR — Regulation (EU) 2016/679', type: 'standard' },
    { title: 'GDPR Art. 35 — Data Protection Impact Assessment', type: 'standard' },
    { title: 'GDPR Art. 25 — Data Protection by Design and by Default', type: 'standard' },
    { title: 'ICO DPIA Guidance', type: 'framework' },
    { title: 'Privacy by Design — Ann Cavoukian', type: 'framework' },
  ],
  children: [SA1_DPIA, SA2_LAWFUL_BASIS, SA3_PRIVACY_CONTROLS],
}
