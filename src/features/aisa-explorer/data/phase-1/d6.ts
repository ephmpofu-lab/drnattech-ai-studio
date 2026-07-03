import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D6 — DATA LANDSCAPE ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Catalogue Data Sources ──────────────────────────────────────

const EG_DATA_SOURCE_INVENTORY: AISANode = {
  id: 'p1-d6-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the Data Source Inventory',
  description: 'Systematically identify and document every data source that the process currently uses or produces, including systems of record, flat files, APIs, and shadow data stores.',
  purpose: 'Establish a complete data asset map so AI architecture decisions are grounded in the actual data landscape rather than assumptions about what exists.',
  why_it_matters: 'Most organisations overestimate the quality and underestimate the variety of their data. AI systems designed without a complete source inventory frequently discover critical data gaps in Phase 3 or in production — after architecture decisions have been made that assumed data availability.',
  methods: [
    '1. Review the activity inventory from D4. For each activity, identify: what data does it consume (inputs), what data does it produce (outputs), and what system does it operate in?',
    '2. Conduct a data source interview with the IT team and Process Owner: "What systems hold data relevant to this process? Are there databases, files, APIs, or external feeds we haven\'t found yet?"',
    '3. For each source identified, document: name, type (relational DB, document store, flat file, API, manual entry, external feed), owner, location (on-premise/cloud), technology stack, and access mechanism.',
    '4. Identify shadow data stores: personal spreadsheets, local file shares, email archives, and messaging platforms that hold process-relevant data.',
    '5. Estimate volume: rows/records, files, or events per day/month.',
  ],
  tools: ['Data source inventory template'],
  outputs: ['Data source inventory: complete list with type, owner, location, technology, access mechanism, and volume for each source'],
  exit_criteria: ['All data sources identified including shadow stores; IT team and Process Owner have confirmed completeness'],
}

const T_DATA_SOURCE_INVENTORY: AISANode = {
  id: 'p1-d6-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Build Data Source Inventory',
  description: 'Identify and document every data source relevant to the process, including systems of record and shadow stores.',
  purpose: 'Establish a complete, authoritative data asset map for AI architecture planning.',
  inputs: ['Activity inventory from D4', 'IT team knowledge', 'Process Owner knowledge of systems', 'Data source inventory template'],
  methods: ['Activity-to-data mapping', 'IT and Process Owner interviews', 'Shadow data store elicitation', 'Volume estimation'],
  tools: ['Data source inventory template'],
  outputs: ['Complete data source inventory'],
  children: [EG_DATA_SOURCE_INVENTORY],
}

const SA1_DATA_SOURCES: AISANode = {
  id: 'p1-d6-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Catalogue Data Sources',
  description: 'Build a complete inventory of all data sources relevant to the process, including systems of record, APIs, flat files, and shadow data stores, with ownership and access details.',
  purpose: 'Establish the data asset map that underpins all AI data pipeline design decisions in Phase 4.',
  why_it_matters: 'Data source completeness determines AI feasibility. An undiscovered data source gap in Phase 4 can require fundamental redesign of a data pipeline or AI model. The source inventory, built rigorously in Phase 1, is the insurance policy that prevents this.',
  inputs: ['Activity inventory from D4', 'IT team and Process Owner input'],
  questions: ['Where does the data for each process activity come from?', 'Are there shadow data stores we have not found yet?', 'Who owns each data source and how is it accessed?'],
  methods: ['Activity-to-data source mapping', 'IT and stakeholder interviews', 'Shadow store elicitation'],
  tools: ['Data source inventory template'],
  outputs: ['Complete data source inventory with type, owner, location, access, and volume'],
  deliverables: ['Data Source Inventory (input to Phase 4 data architecture)'],
  exit_criteria: ['All sources identified including shadow stores; IT team and Process Owner confirmed completeness'],
  children: [T_DATA_SOURCE_INVENTORY],
}

// ─── SA2: Assess Data Quality ──────────────────────────────────────────

const EG_DATA_QUALITY_PROFILING: AISANode = {
  id: 'p1-d6-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Data Quality Profiling per Source',
  description: 'Profile each identified data source against the six data quality dimensions to establish a quality baseline and identify AI training data risk.',
  purpose: 'Identify data quality gaps that will prevent or degrade AI model performance before architecture and pipeline design decisions are made.',
  why_it_matters: 'The single most common reason AI models underperform in production is poor training and inference data quality. Data quality profiling in Phase 1 is the mechanism that surfaces this risk when it can still shape architecture decisions — not after models are trained and deployed.',
  methods: [
    '1. For each data source in the inventory, profile against six dimensions: (a) Completeness — what % of expected records/fields are populated?; (b) Accuracy — what % of values correctly represent reality?; (c) Consistency — does the same data look the same across sources?; (d) Timeliness — is the data current enough for the AI use case?; (e) Uniqueness — are there duplicate records?; (f) Validity — are values within expected ranges and formats?',
    '2. For each dimension, produce a score (1–3: Poor, Acceptable, Good) and a brief evidence note.',
    '3. Flag dimensions with a Poor score as data quality risks — these require a data remediation plan in Phase 4.',
    '4. Assess the AI impact of each quality risk: which AI use cases depend on this source, and how does poor quality affect AI output quality?',
    '5. Calculate an overall data readiness score for each source (average of six dimension scores).',
  ],
  tools: ['Data quality profiling template', 'SQL profiling queries or data profiling tool (e.g., Great Expectations, dbt)'],
  outputs: ['Data quality scorecard per source with dimension scores, quality risks, and AI impact assessment'],
  exit_criteria: ['All sources profiled across six dimensions; quality risks identified with AI impact assessment; data readiness scores calculated'],
}

const T_DATA_QUALITY_PROFILING: AISANode = {
  id: 'p1-d6-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Profile Data Quality per Source',
  description: 'Score each data source across six quality dimensions and identify quality risks that will affect AI model performance.',
  purpose: 'Surface data quality gaps before architecture decisions assume data readiness.',
  inputs: ['Data source inventory from SA1', 'Data access credentials', 'Data quality profiling template', 'Profiling tools'],
  methods: ['Dimension scoring (completeness, accuracy, consistency, timeliness, uniqueness, validity)', 'AI impact assessment for Poor scores', 'Data readiness score calculation'],
  tools: ['Data quality profiling template', 'SQL profiling queries or profiling tool'],
  outputs: ['Data quality scorecard per source with readiness scores and quality risks'],
  children: [EG_DATA_QUALITY_PROFILING],
}

const SA2_DATA_QUALITY: AISANode = {
  id: 'p1-d6-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Assess Data Quality',
  description: 'Profile all data sources against six quality dimensions to identify quality gaps and their impact on AI model performance.',
  purpose: 'Ensure AI training and inference data quality risks are understood and actioned before Phase 4 pipeline design.',
  why_it_matters: 'Data quality is the most frequent root cause of AI system underperformance. Assessing it at Phase 1 is the earliest possible intervention — and the cheapest. Discovering it in Phase 4 means redesigning pipelines already built; discovering it in production means AI outputs that erode user trust.',
  inputs: ['Data source inventory from SA1', 'Access to data sources for profiling', 'Data quality profiling framework'],
  questions: ['Are the data sources complete, accurate, and consistent?', 'Which quality dimensions are at risk?', 'What is the AI impact of each quality gap?'],
  methods: ['Six-dimension data quality profiling', 'AI impact assessment per quality risk', 'Data readiness scoring'],
  tools: ['Data quality profiling template', 'SQL profiling queries', 'Data profiling tool'],
  governance_considerations: 'GDPR Art. 5(1)(d) requires personal data to be accurate and up to date. Data quality profiling that reveals accuracy failures in personal data sources must be reported to the Data Protection Officer.',
  outputs: ['Data quality scorecard per source', 'Quality risk register with AI impact assessment'],
  deliverables: ['Data Quality Assessment (input to Phase 4 data platform design)'],
  exit_criteria: ['All sources profiled; quality risks identified with AI impact; readiness scores calculated; DPO notified of personal data accuracy risks if found'],
  children: [T_DATA_QUALITY_PROFILING],
}

// ─── SA3: Assess Data Availability for AI ─────────────────────────────

const EG_AI_DATA_FEASIBILITY: AISANode = {
  id: 'p1-d6-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Assessing Data Availability and Volume for AI Training',
  description: 'Evaluate whether each identified AI use case (from D5 Pain Point Matrix) has sufficient historical data available to train, validate, and test a model.',
  purpose: 'Determine AI feasibility at the data level for each proposed intervention before committing to AI design in Phase 3.',
  why_it_matters: 'AI use cases without sufficient labelled historical data require synthetic data generation, transfer learning, or de-scoping. Discovering this in Phase 3 or Phase 4 wastes design effort and damages sponsor confidence. Data feasibility assessment in Phase 1 routes each use case to the right design strategy from the outset.',
  methods: [
    '1. For each AI use case on the intervention target list from D5, identify: the specific data inputs the model will need, the historical data source, and the label or outcome variable the model needs to predict or classify.',
    '2. Estimate historical record volume: how many labelled examples are available in the historical data?',
    '3. Apply minimum data thresholds as a feasibility guide: supervised classification typically needs 1,000+ labelled examples per class; NLP tasks may need 10,000+; time-series forecasting needs 2+ years of consistent measurements.',
    '4. Assess label availability: are the outcome labels (the thing the model is predicting) actually captured in the historical data? Are they trustworthy?',
    '5. For use cases that fail the minimum volume threshold, identify: (a) Can historical data be labelled retrospectively?; (b) Is there a pre-trained model that can be fine-tuned with smaller data?; (c) Should this use case use rule-based automation instead of ML?',
  ],
  tools: ['AI data feasibility matrix', 'Training data volume benchmarks by model type'],
  outputs: ['AI data feasibility matrix: use case × data availability, volume, label quality, and recommended approach'],
  exit_criteria: ['Feasibility assessed for all intervention target use cases; use cases below minimum data volume have an alternative design strategy identified'],
}

const T_AI_DATA_FEASIBILITY: AISANode = {
  id: 'p1-d6-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Assess AI Training Data Feasibility',
  description: 'Evaluate data volume, label availability, and quality for each AI use case to confirm feasibility or route to an alternative design strategy.',
  purpose: 'Determine AI feasibility at the data level before Phase 3 design commitments are made.',
  inputs: ['Intervention target list from D5', 'Data source inventory from SA1', 'Data quality scorecard from SA2', 'AI data feasibility matrix template'],
  methods: ['Use case to data mapping', 'Volume and label availability assessment', 'Minimum threshold comparison', 'Alternative strategy identification for insufficient data cases'],
  tools: ['AI data feasibility matrix'],
  outputs: ['AI data feasibility matrix with design strategy per use case'],
  children: [EG_AI_DATA_FEASIBILITY],
}

const SA3_DATA_AVAILABILITY: AISANode = {
  id: 'p1-d6-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Assess Data Availability for AI',
  description: 'Evaluate whether each proposed AI intervention has sufficient historical data — in volume, quality, and label availability — to support model training, and route insufficient cases to alternative design strategies.',
  purpose: 'Confirm AI feasibility at the data level for each use case before Phase 3 architecture decisions assume data readiness.',
  why_it_matters: 'Data availability is the primary AI feasibility gate. A use case with a clear business value, a willing sponsor, and a capable team will still fail if the training data is insufficient. This assessment closes the feasibility question at the earliest possible point.',
  inputs: ['Intervention target list from D5', 'Data source inventory', 'Data quality scorecard', 'Training data volume benchmarks'],
  questions: ['Is there sufficient labelled historical data for this use case?', 'How trustworthy are the labels?', 'If data is insufficient, what is the alternative design strategy?'],
  methods: ['Use case to data mapping', 'Volume and label assessment', 'Threshold comparison', 'Alternative strategy routing (rule-based, fine-tuning, synthetic data)'],
  tools: ['AI data feasibility matrix'],
  outputs: ['AI data feasibility matrix with use case design strategy'],
  deliverables: ['AI Data Feasibility Assessment (input to Phase 3 AI architecture)'],
  exit_criteria: ['Feasibility assessed for all use cases; alternative strategies confirmed for insufficient data cases; Phase 3 can proceed with confirmed data basis for each use case'],
  children: [T_AI_DATA_FEASIBILITY],
}

// ─── SA4: Identify Data Governance Issues ─────────────────────────────

const EG_DATA_GOVERNANCE_REVIEW: AISANode = {
  id: 'p1-d6-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Reviewing Data Governance and Legal Restrictions',
  description: 'Identify legal, regulatory, and contractual restrictions on the use of identified data sources for AI training and inference.',
  purpose: 'Ensure that no AI use case is designed around data that cannot legally be used for that purpose — surfacing restrictions before Phase 3 design rather than after.',
  why_it_matters: 'GDPR Art. 5 requires that personal data is used only for the purpose it was originally collected for (purpose limitation). Using customer data collected for one purpose to train an AI model for another requires a legal basis. Discovering this in Phase 3 can require complete re-scoping of the data strategy.',
  methods: [
    '1. For each data source containing personal data, review: the original purpose of collection, the lawful basis for processing under GDPR, and whether using this data to train or run an AI model is compatible with that original purpose.',
    '2. For data sources covered by contractual restrictions (e.g., vendor data, third-party data), review the contract for AI use clauses.',
    '3. Identify data sources that will require a Data Protection Impact Assessment (DPIA) before AI use can proceed.',
    '4. Identify data sources that will require consent refresh or a new lawful basis to use in AI training.',
    '5. Flag data sources with restrictions as "conditional" in the data source inventory — usable only after governance remediation.',
    '6. Brief the DPO and Legal team on the identified governance issues and obtain their input on resolution pathway.',
  ],
  tools: ['GDPR lawful basis assessment template', 'Data source inventory from SA1', 'Contractual review checklist'],
  outputs: ['Data governance issue log: restricted sources, restriction type, required remediation, and DPO/Legal sign-off status'],
  exit_criteria: ['All personal data sources reviewed for GDPR purpose limitation; contractual restrictions identified; DPO and Legal team briefed; governance issue log produced'],
}

const T_DATA_GOVERNANCE_REVIEW: AISANode = {
  id: 'p1-d6-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Review Data Governance and Legal Restrictions',
  description: 'Identify GDPR, contractual, and regulatory restrictions on using identified data sources for AI training and inference.',
  purpose: 'Prevent Phase 3 design from committing to data sources that cannot legally be used for AI.',
  inputs: ['Data source inventory', 'Data processing agreements', 'Vendor contracts', 'DPO and Legal team input', 'GDPR lawful basis template'],
  methods: ['GDPR purpose limitation assessment', 'Contract review', 'DPIA requirement identification', 'DPO briefing'],
  tools: ['GDPR lawful basis assessment template', 'Contractual review checklist'],
  outputs: ['Data governance issue log with restricted sources and remediation pathways'],
  children: [EG_DATA_GOVERNANCE_REVIEW],
}

const SA4_DATA_GOVERNANCE: AISANode = {
  id: 'p1-d6-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Data Governance Issues',
  description: 'Review all data sources for GDPR, contractual, and regulatory restrictions on AI use, and produce a governance issue log with remediation pathways.',
  purpose: 'Prevent AI design from committing to data sources that require governance remediation before use.',
  why_it_matters: 'Data governance issues discovered after Phase 3 design can require fundamental data pipeline redesign or force scope reduction. Surfacing them in Phase 1 gives the governance remediation work time to complete in parallel with design — rather than blocking it.',
  inputs: ['Data source inventory', 'Data processing agreements', 'Vendor contracts', 'DPO and Legal team input'],
  questions: ['Is there a GDPR lawful basis to use this data for AI training?', 'Are there contractual restrictions on this data\'s use?', 'Which sources require a DPIA before AI use?'],
  methods: ['GDPR purpose limitation and lawful basis review', 'Contract review', 'DPIA requirement identification', 'DPO and Legal briefing'],
  tools: ['GDPR lawful basis assessment template', 'Contractual review checklist'],
  governance_considerations: 'DPIA requirements identified here must be initiated in Phase 2. Art. 35 GDPR mandates a DPIA before processing that is "likely to result in a high risk" — AI systems processing personal data at scale typically qualify.',
  outputs: ['Data governance issue log with restricted sources, restriction type, and remediation pathway'],
  deliverables: ['Data Governance Issue Log (input to Phase 2 governance and Phase 4 data platform)'],
  exit_criteria: ['All personal data sources reviewed; contractual restrictions identified; DPO and Legal team briefed; governance issue log produced with remediation pathways'],
  children: [T_DATA_GOVERNANCE_REVIEW],
}

// ═══════════════════════════════════════════════════════════════════════
// D6 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D6: AISANode = {
  id: 'p1-d6',
  type: 'activity',
  level: 2,
  title: 'D6 — Data Landscape Assessment',
  description: 'Map, profile, and govern the data landscape relevant to the AI initiative — cataloguing all sources, assessing quality and AI training feasibility, and identifying legal and regulatory restrictions on use.',
  purpose: 'Ensure Phase 3 AI architecture and Phase 4 data platform design are grounded in an accurate, quality-assessed, legally compliant picture of the actual data available.',
  why_it_matters: 'Data is the foundation of every AI system. An organisation can have the right problem, the right sponsor, and the right team — and still fail because the data landscape was assumed rather than assessed. D6 closes the gap between data assumptions and data reality before it becomes a design-phase cost.',
  principles_applied: ['Data as a Strategic Asset', 'Privacy and Ethics by Design'],
  inputs: ['Activity inventory from D4', 'Intervention target list from D5', 'IT team and Process Owner input', 'Data Processing Agreements and vendor contracts', 'DPO contact'],
  questions: [
    'What data sources exist and who owns them?',
    'What is the quality of each source across six dimensions?',
    'Is there sufficient training data volume and label availability for each AI use case?',
    'Are there legal or contractual restrictions on using this data for AI?',
    'What remediation is required before data is ready for AI use?',
  ],
  activities: [
    'Build complete data source inventory including shadow stores',
    'Profile data quality across six dimensions for each source',
    'Assess AI training data feasibility for each proposed use case',
    'Review data sources for GDPR, contractual, and regulatory restrictions',
  ],
  methods: ['Data source interview and inventory', 'Six-dimension data quality profiling', 'AI training data feasibility assessment', 'GDPR purpose limitation review', 'Contract review', 'DPO briefing'],
  tools: ['Data source inventory template', 'Data quality profiling template', 'AI data feasibility matrix', 'GDPR lawful basis assessment template', 'Contractual review checklist'],
  security_considerations: 'Data sources containing personal data must have access controls documented. Any AI pipeline accessing these sources must be designed with least-privilege principles in Phase 4.',
  governance_considerations: 'All personal data sources identified must be reviewed for GDPR Art. 35 DPIA requirements before Phase 2 completes. Sources requiring a DPIA must be flagged to initiate the DPIA process immediately.',
  ai_engineering_considerations: 'Training data quality directly determines model performance ceilings. A model trained on data with 70% accuracy labels will not outperform those labels regardless of model architecture. Data quality scores from this activity set the realistic performance ceiling for each AI use case — inform the Business Case ROI model if quality scores indicate lower performance than originally assumed.',
  outputs: ['Complete data source inventory', 'Data quality scorecard with readiness scores', 'AI data feasibility matrix with use case design strategies', 'Data governance issue log with remediation pathways'],
  deliverables: ['Data Landscape Assessment Report (Phase 1 Deliverable)'],
  exit_criteria: [
    'Complete data source inventory confirmed by IT team and Process Owner',
    'All sources profiled across six quality dimensions',
    'AI data feasibility assessed for all intervention target use cases',
    'Alternative design strategies confirmed for data-insufficient use cases',
    'GDPR and contractual restrictions identified; DPO and Legal team briefed',
    'Governance issue log produced with remediation pathways and ownership assigned',
  ],
  related_phases: ['phase-2', 'phase-4'],
  references: [
    { title: 'GDPR Art. 5 — Principles relating to processing of personal data', type: 'standard' },
    { title: 'GDPR Art. 35 — Data Protection Impact Assessment', type: 'standard' },
    { title: 'DAMA DMBOK — Data Management Body of Knowledge', type: 'framework' },
    { title: 'Great Expectations (open source data quality profiling)', type: 'tool' },
  ],
  children: [SA1_DATA_SOURCES, SA2_DATA_QUALITY, SA3_DATA_AVAILABILITY, SA4_DATA_GOVERNANCE],
}
