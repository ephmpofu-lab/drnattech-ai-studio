import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// G1 — EU AI ACT COMPLIANCE ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Classify AI System Risk Tier ────────────────────────────────

const EG_RISK_CLASSIFICATION: AISANode = {
  id: 'p2-g1-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Applying the EU AI Act Risk Classification Framework',
  description: 'Apply the EU AI Act four-tier risk classification to the AI system in scope to determine the applicable regulatory obligations.',
  purpose: 'Establish the legal risk tier before any compliance planning begins, so obligations are specific rather than generic.',
  why_it_matters: 'The EU AI Act imposes vastly different obligations depending on risk tier. An organisation that treats every AI system as General Purpose misses mandatory High Risk obligations; one that over-classifies incurs unnecessary compliance cost. Accurate classification is the foundation of proportionate compliance.',
  methods: [
    '1. Start with the Unacceptable Risk test (Art. 5): does the system use subliminal techniques, exploit vulnerabilities of specific groups, constitute social scoring by public authorities, or involve real-time remote biometric identification in public spaces? If YES to any → Prohibited. Do not proceed.',
    '2. Apply the High Risk test (Art. 6 and Annex III): is the system a safety component of a product covered by Union harmonisation legislation? OR does it fall within one of the Annex III domains: biometric identification, critical infrastructure, education, employment, essential services, law enforcement, migration, administration of justice, democratic processes?',
    '3. For each Annex III domain match, assess: does the system pose a significant risk of harm to health, safety, or fundamental rights? If the system only performs narrow procedural tasks with human oversight, apply the Art. 6(3) low-risk exception assessment.',
    '4. If not Prohibited or High Risk: assess General Purpose AI (GPAI) designation (Art. 51): does the system train on broad data, perform a wide range of distinct tasks, and integrate into a variety of downstream systems? GPAI systems have lighter but distinct obligations.',
    '5. If none of the above: Limited Risk (transparency obligations only) or Minimal Risk (voluntary code of conduct).',
    '6. Document the classification outcome with specific article references and the evidence basis for the classification decision.',
  ],
  tools: ['EU AI Act classification flowchart', 'Annex III domain reference list'],
  outputs: ['Risk tier classification with specific article references and evidence basis; signed by Legal/DPO'],
  exit_criteria: ['Classification completed with documented evidence; Legal/DPO reviewed and confirmed; result drives D8 constraint update if not already in scope'],
}

const T_RISK_CLASSIFICATION: AISANode = {
  id: 'p2-g1-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Apply EU AI Act Risk Classification',
  description: 'Determine the EU AI Act risk tier for the AI system in scope using the four-step classification framework.',
  purpose: 'Establish the legal risk tier that determines all subsequent EU AI Act compliance obligations.',
  inputs: ['System scope definition from D11', 'Decision Analysis from D7', 'EU AI Act full text (Articles 5, 6, 51, Annex III)', 'Legal/DPO contact'],
  methods: ['Sequential tier testing (Prohibited → High Risk → GPAI → Limited → Minimal)', 'Annex III domain matching', 'Art. 6(3) exception assessment if applicable'],
  tools: ['EU AI Act classification flowchart', 'Annex III domain reference'],
  outputs: ['Risk tier classification with article references and evidence basis'],
  children: [EG_RISK_CLASSIFICATION],
}

const SA1_RISK_TIER: AISANode = {
  id: 'p2-g1-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Classify AI System Risk Tier',
  description: 'Apply the EU AI Act four-tier risk classification to determine whether the AI system in scope is Prohibited, High Risk, GPAI, Limited Risk, or Minimal Risk.',
  purpose: 'Establish the legal foundation for all EU AI Act compliance planning.',
  why_it_matters: 'Risk tier classification is the first act of EU AI Act compliance. All subsequent obligations — documentation, testing, human oversight, registration, conformity assessment — are determined by the tier. An incorrect classification either leaves the organisation non-compliant or incurs unnecessary cost.',
  inputs: ['System scope from D11', 'Decision Analysis from D7', 'EU AI Act Articles 5, 6, 51 and Annex III'],
  questions: ['Is any component of this system prohibited under Art. 5?', 'Does it match any Annex III High Risk domain?', 'Is it a GPAI model?', 'What tier applies?'],
  methods: ['Sequential tier testing', 'Domain matching', 'Exception assessment'],
  tools: ['EU AI Act classification flowchart'],
  governance_considerations: 'Classification must be reviewed and confirmed by Legal and the DPO. The classification decision must be documented and retained as evidence in the event of regulatory inquiry.',
  outputs: ['Confirmed EU AI Act risk tier with evidence basis'],
  deliverables: ['EU AI Act Risk Classification Decision (input to compliance obligations mapping)'],
  exit_criteria: ['Classification confirmed by Legal/DPO; documented with article references; stored in project governance repository'],
  children: [T_RISK_CLASSIFICATION],
}

// ─── SA2: Map Compliance Obligations ──────────────────────────────────

const EG_OBLIGATIONS_MAPPING: AISANode = {
  id: 'p2-g1-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping EU AI Act Obligations to Implementation Requirements',
  description: 'For each EU AI Act obligation applicable to the confirmed risk tier, translate the legal requirement into a concrete implementation requirement with an accountable owner and a delivery deadline.',
  purpose: 'Convert abstract legal text into a practical compliance plan with specific technical and governance deliverables.',
  why_it_matters: 'Legal requirements that remain as legal text are not implemented. The translation from article to implementation requirement is the act that converts compliance from a legal topic to an engineering and governance discipline. Without this translation, compliance fails in execution despite being understood at the legal level.',
  methods: [
    '1. For High Risk systems, compile obligations from: Art. 9 (Risk Management System), Art. 10 (Data Governance), Art. 11 (Technical Documentation), Art. 12 (Record-Keeping), Art. 13 (Transparency), Art. 14 (Human Oversight), Art. 15 (Accuracy, Robustness, Cybersecurity), Art. 16 (Obligations of Providers), Art. 72 (Post-Market Monitoring).',
    '2. For each obligation, produce an implementation requirement: "Art. 9 requires a risk management system → Implementation: design and maintain a Risk Register updated at each major system change, reviewed quarterly, with documented owner for each risk item."',
    '3. Assign an accountable owner for each implementation requirement: typically DPO, Legal, IT Architecture, or the AI Product Owner.',
    '4. Assign a deadline: pre-deployment (must be complete before go-live), at-deployment (go-live dependency), or post-deployment (ongoing monitoring obligation).',
    '5. Estimate the implementation effort and cost for each obligation: include these in the compliance cost estimate for the Business Case.',
  ],
  tools: ['EU AI Act obligations mapping template', 'Article reference list by tier'],
  outputs: ['Obligations implementation plan: each obligation mapped to implementation requirement, owner, deadline, and effort estimate'],
  exit_criteria: ['All applicable obligations mapped to implementation requirements; owners confirmed; deadlines set; effort estimates included in compliance cost'],
}

const T_OBLIGATIONS_MAPPING: AISANode = {
  id: 'p2-g1-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Map Obligations to Implementation Requirements',
  description: 'Translate each applicable EU AI Act article into a concrete implementation requirement with owner, deadline, and effort estimate.',
  purpose: 'Convert legal text into an actionable compliance plan.',
  inputs: ['Risk tier classification from SA1', 'EU AI Act full text', 'Project team and stakeholder roles', 'Obligations mapping template'],
  methods: ['Article-to-requirement translation', 'Owner assignment', 'Deadline classification (pre/at/post deployment)', 'Effort estimation'],
  tools: ['EU AI Act obligations mapping template'],
  outputs: ['Obligations implementation plan'],
  children: [EG_OBLIGATIONS_MAPPING],
}

const SA2_OBLIGATIONS: AISANode = {
  id: 'p2-g1-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Map Compliance Obligations',
  description: 'Translate all applicable EU AI Act articles into concrete implementation requirements with owners, deadlines, and effort estimates.',
  purpose: 'Produce an actionable compliance plan from the abstract legal framework.',
  why_it_matters: 'Compliance plans that live in Legal and never reach Engineering are not compliance plans — they are risk documents. Translating obligations into implementation requirements and assigning them to engineers and architects is the act that makes compliance real.',
  inputs: ['Risk tier classification from SA1', 'EU AI Act full text', 'Project team roles'],
  questions: ['What does each applicable article require the system to do or include?', 'Who is accountable for each requirement?', 'What must be done before deployment vs. ongoing?'],
  methods: ['Article-to-requirement translation', 'Owner assignment', 'Deadline and effort estimation'],
  tools: ['EU AI Act obligations mapping template'],
  governance_considerations: 'For High Risk systems, failure to meet any pre-deployment obligation may prevent lawful market placement under Art. 16. These obligations are non-negotiable delivery dependencies, not optional enhancements.',
  outputs: ['Obligations implementation plan'],
  deliverables: ['EU AI Act Obligations Implementation Plan (input to Phase 3 architecture and Phase 4 delivery)'],
  exit_criteria: ['All applicable obligations mapped; owners confirmed; pre-deployment obligations flagged as delivery blockers'],
  children: [T_OBLIGATIONS_MAPPING],
}

// ─── SA3: Plan Conformity Assessment ──────────────────────────────────

const EG_CONFORMITY_PLAN: AISANode = {
  id: 'p2-g1-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Planning the Conformity Assessment Process',
  description: 'Design the conformity assessment process that will demonstrate the AI system\'s compliance with EU AI Act requirements before deployment — determining whether self-assessment or third-party assessment is required.',
  purpose: 'Plan how legal compliance will be demonstrated rather than just claimed, before design work generates the artefacts that conformity assessment will evaluate.',
  why_it_matters: 'Conformity assessment is the mechanism by which compliance is demonstrated to regulators and users. Planning it in Phase 2 determines which artefacts must be produced by Phases 3 and 4 to support assessment — making the assessment process a design constraint rather than a post-build scramble.',
  methods: [
    '1. Determine the assessment pathway for the confirmed risk tier and use case: (a) Self-assessment — permitted for most High Risk AI systems where the provider is also the deployer, using the procedure in Annex VI; (b) Third-party assessment — required for biometric identification, critical infrastructure, and other specific Annex III categories per Art. 43.',
    '2. Define the assessment artefact set: what documentation, test results, validation records, and monitoring reports must be produced for the conformity assessment to succeed?',
    '3. Map each artefact to the Phase that produces it: technical documentation (Phase 3 and 4), accuracy test results (Phase 4), risk management records (Phase 2 and 4), instructions for use (Phase 4).',
    '4. Set the assessment timeline: when will the conformity assessment occur relative to the deployment date? Build this into the Phase 4 delivery plan.',
    '5. For third-party assessment: identify a notified body, initiate contact early, and understand their requirements and timelines — notified body capacity is limited.',
  ],
  tools: ['Conformity assessment planning template', 'EU AI Act Annex VI (internal control procedure)'],
  outputs: ['Conformity assessment plan: pathway, artefact set, artefact-to-phase mapping, and timeline'],
  exit_criteria: ['Assessment pathway confirmed (self or third-party); artefact set defined and mapped to phases; timeline integrated into Phase 4 plan'],
}

const T_CONFORMITY_PLAN: AISANode = {
  id: 'p2-g1-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Plan the Conformity Assessment',
  description: 'Determine the assessment pathway and produce a plan for demonstrating EU AI Act compliance before deployment.',
  purpose: 'Make conformity assessment a design constraint rather than a post-build scramble.',
  inputs: ['Risk tier and Annex III classification from SA1', 'EU AI Act Art. 43 and Annex VI', 'Phase 4 delivery timeline'],
  methods: ['Assessment pathway determination (self vs. third-party)', 'Artefact set definition and phase mapping', 'Timeline integration into Phase 4 plan'],
  tools: ['Conformity assessment planning template'],
  outputs: ['Conformity assessment plan with pathway, artefact set, and timeline'],
  children: [EG_CONFORMITY_PLAN],
}

const SA3_CONFORMITY: AISANode = {
  id: 'p2-g1-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Plan Conformity Assessment',
  description: 'Design the conformity assessment process — determining the assessment pathway, defining the required artefact set, and integrating assessment timelines into the Phase 4 delivery plan.',
  purpose: 'Ensure the system\'s compliance can be demonstrated before deployment, not just claimed.',
  why_it_matters: 'Conformity assessment planning in Phase 2 makes compliance demonstrable rather than theoretical. The artefacts required by the assessment process become mandatory deliverables in Phases 3 and 4 — not optional enhancements. This is the structural change that makes AI compliance real.',
  inputs: ['Risk tier classification from SA1', 'EU AI Act Art. 43, Annex VI, and Annex VII', 'Phase 4 delivery plan'],
  questions: ['Is self-assessment or third-party assessment required?', 'What artefacts must the assessment evaluate?', 'Which phase produces each artefact?', 'When must assessment occur relative to deployment?'],
  methods: ['Assessment pathway determination', 'Artefact set definition', 'Phase mapping', 'Timeline integration'],
  tools: ['Conformity assessment planning template'],
  outputs: ['Conformity assessment plan'],
  deliverables: ['Conformity Assessment Plan (input to Phase 4 delivery planning)'],
  exit_criteria: ['Pathway confirmed; artefact set defined and mapped to phases; timeline in Phase 4 plan; notified body contacted if third-party assessment required'],
  children: [T_CONFORMITY_PLAN],
}

// ═══════════════════════════════════════════════════════════════════════
// G1 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const G1: AISANode = {
  id: 'p2-g1',
  type: 'activity',
  level: 2,
  title: 'G1 — EU AI Act Compliance Assessment',
  description: 'Classify the AI system under the EU AI Act risk framework, translate all applicable obligations into implementation requirements, and plan the conformity assessment that will demonstrate compliance before deployment.',
  purpose: 'Establish the EU AI Act compliance programme for the AI initiative — converting the legal framework into a concrete, owned, time-bound implementation plan.',
  why_it_matters: 'The EU AI Act imposes mandatory obligations that, if unmet, prevent lawful deployment of High Risk systems. For providers in scope, non-compliance carries fines of up to €30M or 6% of global annual turnover. G1 converts this from a legal risk to a managed engineering discipline.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Scope Definition from D11', 'Decision Analysis from D7', 'Constraints Analysis from D8', 'EU AI Act full text', 'Legal/DPO team contacts'],
  questions: [
    'What is the EU AI Act risk tier for this AI system?',
    'What specific obligations does that tier impose?',
    'What implementation requirements flow from each obligation?',
    'How will compliance be demonstrated before deployment?',
  ],
  activities: [
    'Apply the four-tier EU AI Act classification to determine the applicable risk tier',
    'Translate all applicable obligations into implementation requirements with owners and deadlines',
    'Design the conformity assessment process and produce an artefact-to-phase mapping',
  ],
  methods: ['Sequential tier classification (Prohibited → High Risk → GPAI → Limited → Minimal)', 'Article-to-requirement translation', 'Conformity assessment pathway determination'],
  tools: ['EU AI Act classification flowchart', 'Annex III domain reference', 'Obligations mapping template', 'Conformity assessment planning template'],
  governance_considerations: 'All outputs of G1 must be reviewed and confirmed by Legal and the DPO. The risk tier classification must be formally signed off before Phase 2 governance planning proceeds. Pre-deployment obligations from the implementation plan become mandatory Phase 4 delivery dependencies.',
  security_considerations: 'EU AI Act Art. 15 requires High Risk AI systems to be designed with appropriate levels of accuracy, robustness, and cybersecurity. Cybersecurity requirements identified here are inputs to Phase 3 architecture security design and Phase 4 security testing.',
  ai_engineering_considerations: 'The obligations implementation plan defines the engineering artefacts required: technical documentation, accuracy and robustness test results, logging and monitoring infrastructure, explainability components, and human oversight mechanisms. These are architecture requirements, not governance afterthoughts.',
  outputs: ['EU AI Act risk tier classification', 'Obligations implementation plan', 'Conformity assessment plan'],
  deliverables: ['EU AI Act Compliance Assessment Report (Phase 2 Deliverable)'],
  exit_criteria: [
    'Risk tier confirmed by Legal/DPO',
    'All applicable obligations translated into implementation requirements with owners and deadlines',
    'Pre-deployment obligations identified as Phase 4 delivery blockers',
    'Conformity assessment plan produced with artefact set mapped to delivery phases',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'EU AI Act — Regulation (EU) 2024/1689', type: 'standard' },
    { title: 'EU AI Act Art. 5 — Prohibited AI practices', type: 'standard' },
    { title: 'EU AI Act Art. 6 + Annex III — High-risk AI systems', type: 'standard' },
    { title: 'EU AI Act Art. 43 — Conformity assessment', type: 'standard' },
    { title: 'EU AI Act Annex VI — Internal control conformity assessment procedure', type: 'standard' },
  ],
  children: [SA1_RISK_TIER, SA2_OBLIGATIONS, SA3_CONFORMITY],
}
