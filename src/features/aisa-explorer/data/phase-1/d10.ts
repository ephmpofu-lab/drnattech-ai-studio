import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D10 — COMPLEXITY ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Technical Complexity ────────────────────────────────────────

const EG_TECH_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Assessing Technical Complexity of the AI Solution',
  description: 'Evaluate the technical complexity of the proposed AI initiative across model complexity, integration complexity, data pipeline complexity, and infrastructure complexity.',
  purpose: 'Establish a calibrated view of technical complexity before Phase 3 design begins, so the team and sponsor are aligned on effort, risk, and timeline.',
  why_it_matters: 'Technical complexity is consistently underestimated in AI projects because the apparent simplicity of the problem statement masks the engineering depth required. A structured complexity assessment at Phase 1 prevents scope and timeline shocks in Phase 3 and Phase 4.',
  methods: [
    '1. Assess model complexity (1–3 scale: Low/Medium/High):',
    '   Low: rule-based or simple ML (decision tree, logistic regression) with structured tabular data.',
    '   Medium: supervised ML with feature engineering, NLP with pre-trained models, time-series forecasting.',
    '   High: custom deep learning, large language model fine-tuning, multi-modal models, reinforcement learning.',
    '2. Assess integration complexity (1–3): number of systems to integrate, quality of APIs, volume of real-time data feeds, legacy system constraints.',
    '3. Assess data pipeline complexity (1–3): volume and velocity of data, number of sources, transformation complexity, real-time vs. batch requirements, data quality remediation needed.',
    '4. Assess infrastructure complexity (1–3): MLOps requirements (model versioning, A/B testing, retraining pipelines), high availability requirements, deployment environment constraints from D8.',
    '5. Calculate overall technical complexity score: weighted average across dimensions. >2.5 = High; 1.5–2.5 = Medium; <1.5 = Low.',
    '6. Map High scores to specific risk items: what specifically makes this dimension complex, and what is the risk mitigation?',
  ],
  tools: ['Technical complexity assessment matrix'],
  outputs: ['Technical complexity scorecard: per-dimension scores, overall rating, and high-score risk items with mitigations'],
  exit_criteria: ['All four dimensions scored; overall rating calculated; high-score risks identified with mitigations; IT Architecture team reviewed'],
}

const T_TECH_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Assess Technical Complexity',
  description: 'Score model, integration, data pipeline, and infrastructure complexity to produce an overall technical complexity rating.',
  purpose: 'Calibrate team and sponsor expectations on technical effort before Phase 3 design decisions.',
  inputs: ['Intervention target list from D5', 'Data landscape assessment from D6', 'Technical constraints from D8', 'IT Architecture input', 'Technical complexity assessment matrix'],
  methods: ['Four-dimension complexity scoring', 'Overall rating calculation', 'High-score risk identification'],
  tools: ['Technical complexity assessment matrix'],
  outputs: ['Technical complexity scorecard with overall rating and risk items'],
  children: [EG_TECH_COMPLEXITY],
}

const SA1_TECH_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Technical Complexity',
  description: 'Assess the technical complexity of the AI initiative across model, integration, data pipeline, and infrastructure dimensions to produce a calibrated complexity rating.',
  purpose: 'Ensure team and sponsor expectations on effort and timeline are grounded in a structured complexity assessment before design begins.',
  why_it_matters: 'AI project overruns are most frequently caused by technical complexity that was not visible to the sponsor at initiation. A structured complexity assessment in Phase 1 surfaces this risk when it can still shape the investment decision, not after the team is mid-build.',
  inputs: ['Intervention target list from D5', 'Data landscape assessment from D6', 'Technical constraints from D8', 'IT Architecture input'],
  questions: ['How complex are the AI models required?', 'How many systems must be integrated, and how?', 'How complex is the data pipeline?', 'What infrastructure and MLOps requirements are imposed?'],
  methods: ['Four-dimension complexity scoring (1–3 per dimension)', 'Overall rating calculation', 'Risk item identification for high scores'],
  tools: ['Technical complexity assessment matrix'],
  outputs: ['Technical complexity scorecard with per-dimension scores, overall rating, and risk items'],
  deliverables: ['Technical Complexity Assessment (input to Complexity Report)'],
  exit_criteria: ['All four dimensions scored; overall rating calculated; high-complexity risks identified; IT Architecture team reviewed'],
  children: [T_TECH_COMPLEXITY],
}

// ─── SA2: Organisational Complexity ───────────────────────────────────

const EG_ORG_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Assessing Organisational Complexity',
  description: 'Evaluate the organisational complexity dimensions that affect AI delivery: stakeholder complexity, change management complexity, cross-departmental dependency, and governance complexity.',
  purpose: 'Identify organisational factors that will slow delivery, create coordination overhead, or generate resistance — so they can be actively managed.',
  why_it_matters: 'The most common cause of AI project delays is not technical — it is organisational. Stakeholder disagreements, cross-departmental data access disputes, and governance approval chains consume more project time than model development in many enterprise AI programmes. Mapping these in Phase 1 allows proactive mitigation.',
  methods: [
    '1. Assess stakeholder complexity (1–3): number of stakeholder groups, degree of alignment vs. conflict in their interests, political dynamics, and seniority gap between Sponsor and implementation team.',
    '2. Assess change management complexity (1–3): number of roles affected, degree of role redesign required, union or regulatory constraints on change, organisational change fatigue.',
    '3. Assess cross-departmental dependency (1–3): number of departments whose data, systems, or approval is required, historical collaboration quality between those departments, existence of data sharing agreements.',
    '4. Assess governance complexity (1–3): number of governance approval bodies involved (Infosec, DPO, Legal, Risk, Ethics), anticipated length of approval cycles, novelty of AI to the organisation\'s governance function.',
    '5. Calculate overall organisational complexity: weighted average. Document the two highest-scoring areas as the primary organisational risk factors.',
    '6. For each high-complexity dimension, define a specific mitigation action: a governance pre-brief plan, a dedicated change management workstream, or an executive sponsor bridge strategy.',
  ],
  tools: ['Organisational complexity matrix'],
  outputs: ['Organisational complexity scorecard: per-dimension scores, primary risk factors, and specific mitigation actions'],
  exit_criteria: ['All four dimensions scored; primary risk factors identified; mitigation actions defined; Business Owner and Sponsor reviewed'],
}

const T_ORG_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Assess Organisational Complexity',
  description: 'Score stakeholder, change management, cross-departmental, and governance complexity to identify the primary organisational delivery risks.',
  purpose: 'Identify organisational factors that will slow delivery so they can be actively managed from Phase 1.',
  inputs: ['Stakeholder Register from D1', 'Organisational constraints from D8', 'Business Owner and Sponsor input', 'Organisational complexity matrix'],
  methods: ['Four-dimension organisational complexity scoring', 'Primary risk factor identification', 'Mitigation action definition'],
  tools: ['Organisational complexity matrix'],
  outputs: ['Organisational complexity scorecard with mitigation actions'],
  children: [EG_ORG_COMPLEXITY],
}

const SA2_ORG_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Organisational Complexity',
  description: 'Assess the organisational complexity that will affect delivery across stakeholder dynamics, change management, cross-departmental dependencies, and governance approval requirements.',
  purpose: 'Surface organisational delivery risks before they affect the project, enabling proactive mitigation.',
  why_it_matters: 'Organisational complexity is invisible in project plans until it manifests as delays. A stakeholder who was mapped as "supportive" in Phase 1 without assessing the political dynamics around them can become a significant blocker in Phase 3. Complexity assessment converts invisible risk into managed risk.',
  inputs: ['Stakeholder Register from D1', 'Organisational constraints from D8', 'Business Owner and Sponsor context'],
  questions: ['How complex is the stakeholder landscape?', 'How significant is the change management challenge?', 'How many departments must collaborate, and how well do they work together?', 'How many governance bodies must approve, and how long will that take?'],
  methods: ['Stakeholder complexity scoring', 'Change management complexity assessment', 'Cross-departmental dependency mapping', 'Governance complexity rating', 'Mitigation planning'],
  tools: ['Organisational complexity matrix'],
  outputs: ['Organisational complexity scorecard with primary risk factors and mitigation actions'],
  deliverables: ['Organisational Complexity Assessment (input to Complexity Report)'],
  exit_criteria: ['All four dimensions scored; primary risks identified; mitigation actions approved by Business Owner and Sponsor'],
  children: [T_ORG_COMPLEXITY],
}

// ─── SA3: Data Complexity ──────────────────────────────────────────────

const EG_DATA_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Assessing Data Complexity',
  description: 'Evaluate the complexity of the data landscape that the AI initiative must work with — source heterogeneity, quality remediation burden, labelling requirements, and real-time data challenges.',
  purpose: 'Translate the Data Landscape Assessment (D6) into a complexity score that can be communicated to the Sponsor and used to calibrate Phase 4 data engineering effort.',
  why_it_matters: 'Data engineering is typically the most time-consuming and unpredictable phase of an AI implementation. Data complexity underestimation is the primary cause of Phase 4 cost and timeline overruns. A structured assessment at Phase 1 calibrates the estimate before commitment.',
  methods: [
    '1. Summarise from D6: number of data sources, range of formats (structured/semi-structured/unstructured), average data quality score, volume of governance issues requiring remediation.',
    '2. Assess source heterogeneity (1–3): how many distinct data sources, formats, and access mechanisms must be unified?',
    '3. Assess quality remediation burden (1–3): what is the total estimated engineering effort to bring data quality to AI-ready standard?',
    '4. Assess labelling complexity (1–3): do the AI models require labelled training data that does not yet exist? How much labelling effort is required, and can it be automated or semi-automated?',
    '5. Assess real-time data complexity (1–3): does the use case require streaming or near-real-time data, and is the current data infrastructure capable of supporting this?',
    '6. Calculate overall data complexity: weighted average. Map to Phase 4 effort implication: High data complexity = 40–60% of total Phase 4 effort is data engineering.',
  ],
  tools: ['Data complexity assessment matrix', 'D6 data landscape outputs'],
  outputs: ['Data complexity scorecard: per-dimension scores, overall rating, and Phase 4 data engineering effort implication'],
  exit_criteria: ['All four data complexity dimensions scored; overall rating calculated; Phase 4 effort implication stated; Data Architect reviewed'],
}

const T_DATA_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Assess Data Complexity',
  description: 'Score source heterogeneity, quality remediation, labelling, and real-time data complexity to calibrate Phase 4 data engineering effort.',
  purpose: 'Translate D6 data landscape findings into a complexity score that calibrates Phase 4 engineering estimates.',
  inputs: ['Data landscape assessment from D6', 'Intervention target list from D5', 'Data complexity assessment matrix'],
  methods: ['Four-dimension data complexity scoring', 'Phase 4 effort implication mapping', 'Data Architect review'],
  tools: ['Data complexity assessment matrix'],
  outputs: ['Data complexity scorecard with Phase 4 effort implication'],
  children: [EG_DATA_COMPLEXITY],
}

const SA3_DATA_COMPLEXITY: AISANode = {
  id: 'p1-d10-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Data Complexity',
  description: 'Assess the complexity of the data landscape across source heterogeneity, quality remediation, labelling, and real-time requirements to calibrate Phase 4 data engineering effort.',
  purpose: 'Prevent data engineering effort from being underestimated in the delivery plan by assessing it explicitly before Phase 3 scoping.',
  why_it_matters: 'Data engineering complexity is the most consistently underestimated dimension of AI project effort. In many enterprise AI programmes, 50–70% of engineering time is spent on data — not model development. Assessing this at Phase 1 calibrates the plan against reality.',
  inputs: ['Data landscape assessment from D6', 'Intervention target list from D5'],
  questions: ['How many data sources must be unified?', 'How much quality remediation is required?', 'How much labelling work is needed?', 'Does the use case require real-time data infrastructure?'],
  methods: ['Four-dimension data complexity scoring', 'Phase 4 effort implication mapping'],
  tools: ['Data complexity assessment matrix'],
  outputs: ['Data complexity scorecard with Phase 4 effort implication'],
  deliverables: ['Data Complexity Assessment (input to Complexity Report and Phase 4 planning)'],
  exit_criteria: ['All dimensions scored; overall rating calculated; Phase 4 data engineering effort implication confirmed with Data Architect'],
  children: [T_DATA_COMPLEXITY],
}

// ─── SA4: Produce Complexity Report ───────────────────────────────────

const EG_COMPLEXITY_REPORT: AISANode = {
  id: 'p1-d10-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Producing the Complexity Report',
  description: 'Synthesise technical, organisational, and data complexity scores into a single Complexity Report that communicates overall initiative complexity to the Sponsor and informs Phase 3 scoping and phasing decisions.',
  purpose: 'Give the Executive Sponsor and the architecture team a shared, calibrated view of initiative complexity before Phase 3 commits to design decisions.',
  why_it_matters: 'The Complexity Report is the document that converts informed complexity assessment into sponsor awareness. Without it, sponsors make decisions based on their own complexity estimate — which is almost always more optimistic than the evidence supports. The report is the honest conversation that prevents late-delivery disappointment.',
  methods: [
    '1. Compile the three complexity scorecards (technical, organisational, data) into a summary table.',
    '2. Calculate the overall initiative complexity rating: weighted composite of the three areas (weight towards highest risk area).',
    '3. Categorise: High Complexity (score >2.5) — recommend phased delivery, enhanced governance, extended timeline buffer of 30–40%; Medium (1.5–2.5) — standard delivery with dedicated risk mitigations; Low (<1.5) — standard delivery.',
    '4. Translate complexity into timeline and budget implications: for each point above the base score, apply a calibrated buffer to the preliminary estimate.',
    '5. Present the top 5 complexity risks with their specific mitigations.',
    '6. Recommend a delivery approach based on complexity: phased delivery for high-complexity initiatives (Phase A within budget, Phase B conditional on Phase A value); single-phase for low-complexity.',
    '7. Present to the Executive Sponsor for awareness and decision on whether to revise scope, timeline, or budget in light of complexity findings.',
  ],
  tools: ['Complexity report template', 'Three complexity scorecards'],
  outputs: ['Complexity Report: overall rating, timeline and budget implications, top 5 risks with mitigations, and delivery approach recommendation'],
  exit_criteria: ['All three scorecards compiled; overall rating calculated; implications quantified; delivery approach recommended; Sponsor reviewed and acknowledged'],
}

const T_COMPLEXITY_REPORT: AISANode = {
  id: 'p1-d10-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Produce Complexity Report',
  description: 'Synthesise all complexity scorecards into a sponsor-facing Complexity Report with timeline and budget implications and a delivery approach recommendation.',
  purpose: 'Give the Sponsor an honest, evidence-based view of initiative complexity before Phase 3 begins.',
  inputs: ['Three complexity scorecards from SA1–SA3', 'Preliminary delivery estimates', 'Complexity report template'],
  methods: ['Scorecard synthesis', 'Overall rating calculation', 'Timeline and budget implication translation', 'Delivery approach recommendation', 'Sponsor presentation'],
  tools: ['Complexity report template'],
  outputs: ['Complexity Report reviewed and acknowledged by Executive Sponsor'],
  children: [EG_COMPLEXITY_REPORT],
}

const SA4_COMPLEXITY_REPORT: AISANode = {
  id: 'p1-d10-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Produce Complexity Report',
  description: 'Synthesise technical, organisational, and data complexity into a single report that communicates overall complexity, timeline and budget implications, and a recommended delivery approach.',
  purpose: 'Ensure the Executive Sponsor has a calibrated, evidence-based view of initiative complexity before committing to Phase 3 design.',
  why_it_matters: 'The Complexity Report is the last opportunity to reset sponsor expectations before design commitments are made. After Phase 3, complexity is sunk into architecture decisions — before it, complexity informs investment and scoping decisions that can still be made cheaply.',
  inputs: ['Three complexity scorecards', 'Preliminary delivery estimates', 'Sponsor communication preferences'],
  questions: ['What is the overall complexity rating?', 'What does this mean for timeline and budget?', 'What delivery approach is recommended?', 'What are the top 5 risks and their mitigations?'],
  methods: ['Scorecard synthesis', 'Overall complexity rating', 'Implication quantification', 'Delivery approach recommendation', 'Sponsor presentation'],
  tools: ['Complexity report template'],
  outputs: ['Complexity Report acknowledged by Executive Sponsor'],
  deliverables: ['Complexity Report (Phase 1 Deliverable)'],
  exit_criteria: ['Report completed; overall rating confirmed; Sponsor has reviewed and acknowledged the implications; any scope or timeline revisions agreed'],
  children: [T_COMPLEXITY_REPORT],
}

// ═══════════════════════════════════════════════════════════════════════
// D10 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D10: AISANode = {
  id: 'p1-d10',
  type: 'activity',
  level: 2,
  title: 'D10 — Complexity Assessment',
  description: 'Systematically assess the technical, organisational, and data complexity of the AI initiative and synthesise findings into a Complexity Report that informs Phase 3 scoping, phasing decisions, and sponsor expectations.',
  purpose: 'Ensure the initiative enters Phase 3 with a shared, calibrated view of its true complexity — preventing the underestimation that causes late-stage timeline and budget overruns.',
  why_it_matters: 'Complexity assessment is the honesty check on the Phase 1 discovery process. It converts qualitative understanding of the initiative into quantified complexity ratings that can be translated into timeline buffers, budget reserves, and delivery phasing recommendations. Skipping it is the most reliable predictor of scope and delivery surprises in Phases 3 and 4.',
  principles_applied: ['Minimum Viable Complexity', 'Technology Serves Architecture'],
  inputs: ['Data Landscape Assessment from D6', 'Technical Constraints from D8', 'Stakeholder Register from D1', 'Organisational Constraints from D8', 'Intervention target list from D5', 'Preliminary delivery estimates'],
  questions: [
    'How complex are the AI models, integrations, data pipelines, and infrastructure requirements?',
    'How complex is the organisational landscape — stakeholders, change management, and governance?',
    'How complex is the data landscape — heterogeneity, quality, labelling, and real-time requirements?',
    'What is the overall initiative complexity, and what does it imply for timeline and budget?',
    'Should delivery be phased given the complexity findings?',
  ],
  activities: [
    'Assess model, integration, data pipeline, and infrastructure complexity',
    'Assess stakeholder, change management, cross-departmental, and governance complexity',
    'Assess data source heterogeneity, quality remediation, labelling, and real-time complexity',
    'Synthesise all scorecards into a Complexity Report with delivery approach recommendation',
  ],
  methods: ['Four-dimension technical complexity scoring', 'Four-dimension organisational complexity scoring', 'Four-dimension data complexity scoring', 'Composite complexity rating', 'Delivery approach recommendation'],
  tools: ['Technical complexity assessment matrix', 'Organisational complexity matrix', 'Data complexity assessment matrix', 'Complexity report template'],
  ai_engineering_considerations: 'Technical complexity scores directly translate to engineering team sizing and Phase 4 timeline. High model complexity requires dedicated ML engineering capacity; high data complexity requires dedicated Data Engineering capacity. These capacity requirements must be included in the Phase 3 architecture plan.',
  outputs: ['Technical complexity scorecard', 'Organisational complexity scorecard', 'Data complexity scorecard', 'Complexity Report with delivery approach recommendation'],
  deliverables: ['Complexity Report (Phase 1 Deliverable)'],
  exit_criteria: [
    'All three complexity dimensions scored and reviewed by relevant experts',
    'Overall complexity rating calculated',
    'Timeline and budget implications quantified',
    'Top 5 risks identified with specific mitigations',
    'Delivery approach (phased vs. single-phase) recommended',
    'Executive Sponsor has reviewed and acknowledged the Complexity Report',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'Cynefin Framework — Dave Snowden (complexity classification)', type: 'framework' },
    { title: 'Making Work Visible — Dominica DeGrandis (organisational complexity)', type: 'book', author: 'DeGrandis, D.', year: 2017 },
    { title: 'Fundamentals of Data Engineering — Reis & Housley', type: 'book', author: 'Reis, J. & Housley, M.', year: 2022 },
  ],
  children: [SA1_TECH_COMPLEXITY, SA2_ORG_COMPLEXITY, SA3_DATA_COMPLEXITY, SA4_COMPLEXITY_REPORT],
}
