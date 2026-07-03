import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D11 — SCOPE DEFINITION
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Define In-Scope Elements ────────────────────────────────────

const EG_SCOPE_IN: AISANode = {
  id: 'p1-d11-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining and Documenting In-Scope Elements',
  description: 'Produce a comprehensive, unambiguous list of what is in scope for the AI initiative — at the level of precision that prevents future disagreement about whether something is included.',
  purpose: 'Establish a shared, written record of scope that prevents scope creep, resolves future disputes, and gives the delivery team a clear brief.',
  why_it_matters: 'Scope creep is the most common cause of AI project overruns. Scope creep begins with ambiguity — when what is "in scope" is understood differently by the sponsor, the delivery team, and the business users. Unambiguous, written in-scope definition is the only prevention.',
  methods: [
    '1. Start from the agreed intervention target list (D5 Pain Point Matrix), the approved Business Case (D3), and the approved Problem Statement (D2). These three documents together define the intent of scope.',
    '2. Produce an in-scope statement at three levels of specificity:',
    '   (a) Process scope: which specific processes and process steps are in scope.',
    '   (b) AI capability scope: which specific AI capabilities will be built (classification model for X, NLP extraction for Y, decision support dashboard for Z).',
    '   (c) Data scope: which data sources, data entities, and data volumes are in scope.',
    '3. For each in-scope element, write a clear, testable statement: not "improve customer query handling" but "classify incoming customer queries into 8 categories with minimum 87% accuracy, processing up to 500 queries per hour."',
    '4. Map each in-scope element to its business objective from D2 and its metric from D9. Scope elements without a traceable metric are candidates for removal.',
    '5. Obtain explicit sign-off from the Business Owner and Executive Sponsor on the in-scope list.',
  ],
  tools: ['Scope definition template', 'D2 objectives', 'D5 intervention target list', 'D9 metrics'],
  outputs: ['In-scope statement: process scope, AI capability scope, and data scope — all at testable precision level; signed off by Business Owner and Sponsor'],
  exit_criteria: ['All in-scope elements documented at testable precision; traceable to objectives and metrics; Business Owner and Sponsor sign-off obtained'],
}

const T_SCOPE_IN: AISANode = {
  id: 'p1-d11-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Define In-Scope Elements',
  description: 'Produce unambiguous, testable in-scope statements at process, AI capability, and data level.',
  purpose: 'Prevent scope creep by establishing an unambiguous written record of what is included before design begins.',
  inputs: ['Intervention target list from D5', 'Problem Statement from D2', 'Business Case from D3', 'Success Metrics from D9', 'Scope definition template'],
  methods: ['Three-level scope statement (process, AI capability, data)', 'Testable precision requirement', 'Objective and metric traceability', 'Stakeholder sign-off'],
  tools: ['Scope definition template'],
  outputs: ['Signed-off in-scope statement at testable precision level'],
  children: [EG_SCOPE_IN],
}

const SA1_SCOPE_IN: AISANode = {
  id: 'p1-d11-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Define In-Scope Elements',
  description: 'Produce a signed-off, unambiguous statement of in-scope elements at process, AI capability, and data level — all expressed at testable precision.',
  purpose: 'Establish the definitive written record of what the AI initiative includes before Phase 3 design begins.',
  why_it_matters: 'In-scope definition at testable precision is the most powerful scope management tool available. When a stakeholder raises a new requirement in Phase 3, the answer is a specific, signed document — not a conversation about intent. This shifts scope management from relationship management to evidence-based governance.',
  inputs: ['Intervention target list from D5', 'Problem Statement from D2', 'Business Case from D3', 'Success Metrics from D9'],
  questions: ['What specific processes are in scope?', 'What specific AI capabilities will be built?', 'What specific data is in scope?', 'Can each scope element be tested?'],
  methods: ['Three-level in-scope statement construction', 'Testable precision requirement', 'Objective and metric traceability check', 'Sign-off process'],
  tools: ['Scope definition template'],
  outputs: ['Signed-off in-scope statement'],
  deliverables: ['In-Scope Statement (primary section of Scope Definition)'],
  exit_criteria: ['All elements at testable precision; traceable to objectives and metrics; Business Owner and Sponsor signed off'],
  children: [T_SCOPE_IN],
}

// ─── SA2: Define Out-of-Scope Elements ────────────────────────────────

const EG_SCOPE_OUT: AISANode = {
  id: 'p1-d11-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Explicitly Defining Out-of-Scope Elements',
  description: 'Produce an explicit out-of-scope list that names the things the initiative will NOT address — even if they are related or similar to in-scope elements.',
  purpose: 'Prevent scope creep by making the boundaries of the initiative explicit, rather than leaving adjacent areas ambiguous.',
  why_it_matters: 'The most dangerous scope is not what is explicitly excluded but what is ambiguously neither in nor out. Explicit out-of-scope definition eliminates the ambiguity that enables scope creep by forcing a definitive position on every adjacent opportunity identified during discovery.',
  methods: [
    '1. Review all discovery outputs for items that were discussed but not included in the intervention target list: pain points rated lower-priority in D5, use cases ruled out by data feasibility in D6, capabilities excluded by budget constraints in D8.',
    '2. Review the Problem Statement for the out-of-scope section defined in D2 SA6. This is the starting point.',
    '3. Add any additional out-of-scope items identified since the Problem Statement was approved.',
    '4. For each out-of-scope element, document: what is excluded, why (not prioritised, data insufficient, out of budget, wrong phase), and where it might be addressed in future (Phase 2 of the programme, separate initiative, or never).',
    '5. Specifically call out scope adjacencies that could be misread as in-scope: "The system will classify customer queries but will NOT generate response text — query responses remain the responsibility of the human agent."',
    '6. Obtain Business Owner sign-off on the out-of-scope list.',
  ],
  tools: ['Out-of-scope register template', 'Problem Statement out-of-scope section from D2'],
  outputs: ['Signed-off out-of-scope register with reason and future pathway for each excluded item'],
  exit_criteria: ['All relevant out-of-scope items documented with reasons; adjacencies explicitly addressed; Business Owner signed off'],
}

const T_SCOPE_OUT: AISANode = {
  id: 'p1-d11-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Define Out-of-Scope Elements',
  description: 'Produce an explicit, signed-off out-of-scope register including reason for exclusion and future pathway for each item.',
  purpose: 'Eliminate scope ambiguity by making the boundaries explicit and signed.',
  inputs: ['Problem Statement out-of-scope section from D2', 'All D5 pain points not in intervention target list', 'D6 data-insufficient use cases', 'D8 budget-constrained items', 'Out-of-scope register template'],
  methods: ['Discovery output review for excluded items', 'Out-of-scope statement with reason and future pathway', 'Adjacency explicit callout', 'Business Owner sign-off'],
  tools: ['Out-of-scope register template'],
  outputs: ['Signed-off out-of-scope register'],
  children: [EG_SCOPE_OUT],
}

const SA2_SCOPE_OUT: AISANode = {
  id: 'p1-d11-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Define Out-of-Scope Elements',
  description: 'Produce an explicit, signed-off register of what the initiative will NOT address, with reasons and future pathways for each exclusion.',
  purpose: 'Eliminate scope ambiguity at the boundaries by making exclusions explicit.',
  why_it_matters: 'Scope creep enters through ambiguity at the boundaries. The out-of-scope register is the guard at the gate — it makes every adjacent opportunity a documented decision rather than an open question. When a stakeholder raises an excluded item in Phase 3, the register is the definitive reference.',
  inputs: ['Problem Statement out-of-scope from D2', 'All discovery items not included in intervention target list', 'Budget and constraint outputs from D8'],
  questions: ['What have we discussed but decided not to do?', 'What scope adjacencies could be misread as in scope?', 'Why is each item excluded, and where might it be addressed in future?'],
  methods: ['Discovery-to-scope-boundary mapping', 'Adjacency callout', 'Reason and future pathway documentation', 'Business Owner sign-off'],
  tools: ['Out-of-scope register template'],
  outputs: ['Signed-off out-of-scope register'],
  deliverables: ['Out-of-Scope Register (section of Scope Definition)'],
  exit_criteria: ['All exclusions documented with reasons; adjacencies explicitly addressed; Business Owner signed off'],
  children: [T_SCOPE_OUT],
}

// ─── SA3: Define Scope Boundaries and Change Control ──────────────────

const EG_SCOPE_CHANGE_CONTROL: AISANode = {
  id: 'p1-d11-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Establishing Scope Change Control Process',
  description: 'Define the formal process for requesting, assessing, approving, and implementing scope changes throughout Phases 2, 3, and 4.',
  purpose: 'Ensure that all scope changes after Phase 1 go through a governed process that assesses impact on timeline, budget, and quality before approval.',
  why_it_matters: 'Scope changes without change control are the primary cause of project overruns. Every uncontrolled scope addition adds effort without adding budget or timeline — making overrun mathematically inevitable. The change control process is the mechanism that converts scope change from a drain to a governed decision.',
  methods: [
    '1. Define the change request trigger: what constitutes a scope change that requires formal assessment? (Any addition to the in-scope list; any change to a defined metric target; any new system integration not in the original technical constraints.)',
    '2. Define the change request form: description of the change, reason for the change, estimated impact on timeline, estimated impact on cost, impact on other in-scope elements.',
    '3. Define the change assessment process: who assesses the change (typically the Delivery Lead and IT Architecture), how long the assessment takes, what information is required.',
    '4. Define the approval authority by change size: small changes (≤5% effort impact) — Delivery Lead; medium (5–15%) — Business Owner; large (>15% or out-of-scope additions) — Executive Sponsor.',
    '5. Define the outcome documentation: all approved changes update the Scope Definition, the delivery plan, and the budget tracking. All rejected changes are recorded with the reason for rejection.',
    '6. Communicate the change control process to all stakeholders at the Phase 1 close-out meeting.',
  ],
  tools: ['Change request form template', 'Scope change register'],
  outputs: ['Scope change control process document with change request form, assessment process, and approval authorities'],
  exit_criteria: ['Change control process defined; approval authorities confirmed by Sponsor; all stakeholders briefed at Phase 1 close-out'],
}

const T_SCOPE_CHANGE_CONTROL: AISANode = {
  id: 'p1-d11-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Establish Scope Change Control Process',
  description: 'Define the formal process, approval authorities, and documentation requirements for scope changes throughout delivery.',
  purpose: 'Prevent uncontrolled scope additions from making delivery overrun mathematically inevitable.',
  inputs: ['Executive Sponsor and Business Owner input on approval authorities', 'Change request form template', 'Scope change register'],
  methods: ['Trigger definition', 'Change request form design', 'Assessment process definition', 'Approval authority tiering', 'Stakeholder briefing'],
  tools: ['Change request form template', 'Scope change register'],
  outputs: ['Scope change control process with briefed stakeholders'],
  children: [EG_SCOPE_CHANGE_CONTROL],
}

const SA3_CHANGE_CONTROL: AISANode = {
  id: 'p1-d11-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Define Scope Boundaries and Change Control',
  description: 'Establish the formal change control process that governs scope changes throughout Phases 2, 3, and 4, with tiered approval authorities and documentation requirements.',
  purpose: 'Ensure all post-Phase 1 scope changes are assessed for impact and approved at the appropriate level before implementation.',
  why_it_matters: 'A Scope Definition without change control is a policy document without enforcement. Change control converts the signed scope into an actively governed boundary — ensuring that every addition to scope is a deliberate, impact-assessed decision rather than an uncontrolled drift.',
  inputs: ['Signed Scope Definition (SA1 and SA2)', 'Executive Sponsor and Business Owner contacts', 'Change request form template'],
  questions: ['What constitutes a scope change that requires formal assessment?', 'Who approves changes at each scale?', 'How will approved changes update the delivery plan and budget?'],
  methods: ['Change trigger definition', 'Change request and assessment process design', 'Tiered approval authority definition', 'Stakeholder briefing'],
  tools: ['Change request form template', 'Scope change register'],
  outputs: ['Scope change control process with briefed stakeholders'],
  deliverables: ['Scope Change Control Process (section of Scope Definition)'],
  exit_criteria: ['Change control process defined; approval authorities confirmed; all stakeholders briefed; change request form available in project repository'],
  children: [T_SCOPE_CHANGE_CONTROL],
}

// ─── SA4: Phase 1 Close-Out and Phase 2 Readiness ─────────────────────

const EG_PHASE1_CLOSEOUT: AISANode = {
  id: 'p1-d11-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Conducting the Phase 1 Close-Out and Phase 2 Readiness Review',
  description: 'Conduct a formal Phase 1 close-out review that confirms all Phase 1 deliverables are complete, all exit criteria are met, and the project is ready to enter Phase 2.',
  purpose: 'Provide a formal quality gate that prevents Phase 2 from beginning with Phase 1 gaps that will surface as Phase 2 blockers.',
  why_it_matters: 'Phase boundaries are the quality gates of the AISA framework. Phase 2 governance work depends on the quality of Phase 1 discovery. Entering Phase 2 with unresolved Phase 1 gaps means discovering them under pressure during governance work — where remediation is expensive and disruptive.',
  methods: [
    '1. Compile the Phase 1 Deliverable Checklist: Problem Statement v1.0, Business Case, AS-IS Process Map, Data Landscape Assessment, Decision Analysis, Constraints Analysis, Success Metrics Register, Complexity Report, Scope Definition. Confirm each is present, version-controlled, and stored in the project repository.',
    '2. Confirm exit criteria are met for each D1–D11 activity. Use the exit criteria defined in each activity. Any unmet exit criterion is a Phase 1 gap requiring resolution before Phase 2.',
    '3. Brief the full project team (delivery, IT, Business Owner, Sponsor) on the Phase 1 outputs: what was discovered, what scope was agreed, what constraints were identified, and what the Phase 2 plan is.',
    '4. Obtain formal Phase 2 initiation sign-off from the Executive Sponsor: a written confirmation that Phase 1 is complete and Phase 2 is authorised to begin.',
    '5. Capture Phase 1 lessons learned: what went well, what should be done differently, what tools or approaches are worth adopting or avoiding.',
    '6. Archive all Phase 1 artefacts in the project repository and brief the Phase 2 lead (if different from the Phase 1 lead) on the complete discovery picture.',
  ],
  tools: ['Phase 1 deliverable checklist', 'Exit criteria register', 'Phase 2 initiation authorisation form', 'Lessons learned template'],
  outputs: ['Phase 1 close-out report: all deliverables confirmed, exit criteria met, Phase 2 formally authorised; lessons learned captured'],
  exit_criteria: ['All Phase 1 deliverables present and version-controlled; all exit criteria met; Phase 2 formally authorised in writing by Executive Sponsor; team briefed'],
}

const T_PHASE1_CLOSEOUT: AISANode = {
  id: 'p1-d11-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Phase 1 Close-Out and Phase 2 Readiness Review',
  description: 'Confirm all Phase 1 deliverables and exit criteria are met, brief the full team, and obtain formal Phase 2 initiation authorisation.',
  purpose: 'Ensure Phase 2 begins with a complete, quality-checked Phase 1 foundation.',
  inputs: ['All Phase 1 deliverables', 'Exit criteria register', 'Phase 2 initiation authorisation form', 'Lessons learned template'],
  methods: ['Deliverable completeness check', 'Exit criteria verification', 'Team briefing', 'Formal Phase 2 authorisation', 'Lessons learned capture'],
  tools: ['Phase 1 deliverable checklist', 'Phase 2 initiation authorisation form', 'Lessons learned template'],
  outputs: ['Phase 1 close-out report; formal Phase 2 authorisation; lessons learned'],
  children: [EG_PHASE1_CLOSEOUT],
}

const SA4_CLOSEOUT: AISANode = {
  id: 'p1-d11-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Phase 1 Close-Out and Phase 2 Readiness',
  description: 'Complete the formal Phase 1 close-out: confirm all deliverables are present, all exit criteria are met, brief the team, and obtain written Phase 2 initiation authorisation.',
  purpose: 'Provide the governance quality gate that prevents Phase 2 from beginning with unresolved Phase 1 gaps.',
  why_it_matters: 'The Phase 1 close-out is where the investment in rigorous discovery is preserved or squandered. A team that rushes through close-out takes unresolved gaps into Phase 2 governance work where they surface as blockers, delays, and rework. A properly closed Phase 1 makes Phase 2 run faster, not slower.',
  inputs: ['All Phase 1 deliverables', 'Exit criteria register from all D1–D11 activities', 'Executive Sponsor contact'],
  questions: ['Are all Phase 1 deliverables present and version-controlled?', 'Are all exit criteria met?', 'Is the team briefed on Phase 1 discoveries?', 'Is Phase 2 formally authorised?'],
  methods: ['Deliverable completeness check', 'Exit criteria verification', 'Team briefing session', 'Formal Phase 2 authorisation', 'Lessons learned capture and archive'],
  tools: ['Phase 1 deliverable checklist', 'Lessons learned template'],
  outputs: ['Phase 1 close-out report; Phase 2 formally authorised'],
  deliverables: ['Phase 1 Close-Out Report (Phase 1 Final Deliverable)', 'Phase 2 Initiation Authorisation'],
  exit_criteria: ['All Phase 1 deliverables present and archived; all exit criteria confirmed met; Executive Sponsor has signed Phase 2 authorisation; team briefed; lessons learned captured'],
  children: [T_PHASE1_CLOSEOUT],
}

// ═══════════════════════════════════════════════════════════════════════
// D11 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D11: AISANode = {
  id: 'p1-d11',
  type: 'activity',
  level: 2,
  title: 'D11 — Scope Definition',
  description: 'Translate all Phase 1 discovery outputs into a formally approved Scope Definition — defining precisely what is in scope, what is out of scope, how scope changes will be governed, and conducting the Phase 1 close-out to authorise Phase 2.',
  purpose: 'Produce the definitive written scope agreement that governs all design decisions in Phase 3 and prevents scope creep throughout delivery.',
  why_it_matters: 'Scope Definition is the moment where discovery converts to design mandate. Every Phase 3 architecture decision and every Phase 4 build decision is made within the boundaries defined here. A weak Scope Definition produces endless scope debates in delivery; a strong one resolves them with a document.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Minimum Viable Complexity'],
  inputs: [
    'All Phase 1 activity outputs: D1–D10',
    'Intervention target list from D5',
    'Problem Statement from D2',
    'Business Case from D3',
    'Success Metrics from D9',
    'Complexity Report from D10',
    'Constraints from D8',
  ],
  questions: [
    'What is precisely in scope, at testable precision?',
    'What is precisely out of scope, including scope adjacencies?',
    'What is the process for managing scope change after Phase 1?',
    'Are all Phase 1 deliverables complete and Phase 2 ready to begin?',
  ],
  activities: [
    'Produce unambiguous in-scope statements at process, AI capability, and data level',
    'Define and sign off the out-of-scope register with reasons and future pathways',
    'Establish the scope change control process with tiered approval authorities',
    'Conduct Phase 1 close-out review and obtain Phase 2 initiation authorisation',
  ],
  methods: ['Three-level in-scope statement construction', 'Out-of-scope register', 'Scope change control process design', 'Phase 1 deliverable completeness check', 'Formal close-out and authorisation'],
  tools: ['Scope definition template', 'Out-of-scope register template', 'Change request form', 'Phase 1 deliverable checklist', 'Lessons learned template'],
  governance_considerations: 'The Scope Definition must specify whether any in-scope AI capability is a High Risk AI system under the EU AI Act. For systems that are, the Scope Definition triggers the governance obligations in Phase 2. This determination must be confirmed before Phase 2 begins.',
  ai_engineering_considerations: 'AI capability scope defined at testable precision directly generates the acceptance criteria for Phase 4. Engineering teams should be briefed on the scope definition as the first act of Phase 3 — it is the design brief, not a background document.',
  outputs: ['Signed in-scope statement', 'Signed out-of-scope register', 'Scope change control process', 'Phase 1 close-out report', 'Phase 2 initiation authorisation'],
  deliverables: ['Scope Definition (Phase 1 Primary Deliverable)', 'Phase 1 Close-Out Report', 'Phase 2 Initiation Authorisation'],
  exit_criteria: [
    'In-scope elements defined at testable precision and signed off by Business Owner and Executive Sponsor',
    'Out-of-scope register completed with reasons and signed off by Business Owner',
    'Scope change control process established and stakeholders briefed',
    'All Phase 1 deliverables confirmed present, versioned, and archived',
    'All D1–D11 exit criteria confirmed met',
    'Executive Sponsor has provided written Phase 2 initiation authorisation',
    'Phase 1 lessons learned captured and archived',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'PMBOK Guide — Project Scope Management', type: 'framework' },
    { title: 'EU AI Act Art. 6 — Classification rules for high-risk AI systems', type: 'standard' },
    { title: 'Waltzing with Bears — DeMarco & Lister (scope risk management)', type: 'book', author: 'DeMarco, T. & Lister, T.', year: 2003 },
  ],
  children: [SA1_SCOPE_IN, SA2_SCOPE_OUT, SA3_CHANGE_CONTROL, SA4_CLOSEOUT],
}
