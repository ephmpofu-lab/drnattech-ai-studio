import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D9 — SUCCESS METRICS DEFINITION
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Define Outcome Metrics ──────────────────────────────────────

const EG_OUTCOME_METRICS: AISANode = {
  id: 'p1-d9-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining Business Outcome Metrics',
  description: 'Define the primary business outcome metrics — the measures of real-world business impact — that the initiative must improve to be considered successful.',
  purpose: 'Establish the top-level metrics that measure whether the AI initiative achieved its business purpose, not just its technical function.',
  why_it_matters: 'AI systems that optimise for proxy metrics (technical performance) while the business outcome metrics stay flat have failed, regardless of how impressive their model benchmarks are. Defining outcome metrics explicitly prevents technical success being misrepresented as business success.',
  methods: [
    '1. Return to the objectives hierarchy from D2 and the Pain Point Matrix from D5. The business objectives translate directly to outcome metrics.',
    '2. For each strategic and tactical objective, define: the metric that measures achievement (e.g., "customer query resolution rate"), the unit of measurement, the measurement source and method, the measurement frequency, and the pre-deployment baseline (from D2 SA3 baseline metrics).',
    '3. Apply SMART test: each metric must be Specific (unambiguous), Measurable (a number), Achievable (the target is realistic), Relevant (directly measures the objective), and Time-bound (achieved by when).',
    '4. Define the target for each metric: the specific value the initiative must achieve, by what date.',
    '5. Identify who is accountable for each metric post-deployment: this is the person who will report on it and who will own remediation if it is not achieved.',
  ],
  tools: ['Metrics definition template', 'D2 objectives hierarchy', 'D2 baseline metrics'],
  outputs: ['Business outcome metrics: metric, unit, baseline, target, measurement source, frequency, and accountability owner for each'],
  exit_criteria: ['All strategic and tactical objectives have at least one SMART outcome metric; baseline and target confirmed by Business Owner'],
}

const T_OUTCOME_METRICS: AISANode = {
  id: 'p1-d9-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Define Business Outcome Metrics',
  description: 'Define SMART metrics for each business objective, with baseline, target, measurement source, and accountability owner.',
  purpose: 'Establish the business-level success criteria that the initiative must achieve.',
  inputs: ['Objectives hierarchy from D2', 'Baseline metrics from D2', 'Business Owner input', 'Metrics definition template'],
  methods: ['Objective-to-metric mapping', 'SMART criteria application', 'Target setting', 'Accountability assignment'],
  tools: ['Metrics definition template'],
  outputs: ['Business outcome metrics with SMART specifications'],
  children: [EG_OUTCOME_METRICS],
}

const SA1_OUTCOME_METRICS: AISANode = {
  id: 'p1-d9-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Define Outcome Metrics',
  description: 'Define SMART business outcome metrics for each initiative objective, with pre-deployment baseline and accountability owner.',
  purpose: 'Establish the measures of real-world business impact that define whether the initiative succeeded.',
  why_it_matters: 'Business outcomes are the ultimate measure of AI value. Without explicitly defined outcome metrics, the initiative risks being declared a success based on technical achievements while business objectives remain unmet. Outcome metrics are the accountability mechanism that connects AI capability to business result.',
  inputs: ['Objectives hierarchy from D2', 'Baseline metrics from D2', 'Business Owner input'],
  questions: ['What specific business outcomes must this initiative achieve?', 'How will we measure each outcome?', 'What is the baseline and target for each metric?'],
  methods: ['Objective-to-metric translation', 'SMART criteria application', 'Accountability assignment'],
  tools: ['Metrics definition template'],
  outputs: ['Business outcome metrics with baselines, targets, and accountability owners'],
  deliverables: ['Business Outcome Metrics (primary section of Success Metrics Register)'],
  exit_criteria: ['All objectives have at least one SMART outcome metric; baselines documented from D2; targets confirmed by Business Owner'],
  children: [T_OUTCOME_METRICS],
}

// ─── SA2: Define AI Model Performance Metrics ─────────────────────────

const EG_MODEL_METRICS: AISANode = {
  id: 'p1-d9-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining AI Model Performance Metrics',
  description: 'Define the technical performance metrics for each AI model in scope — the measures of model behaviour that must be met for the system to be trusted in production.',
  purpose: 'Establish model performance targets aligned to the decision acceptance criteria from D7, creating a coherent chain from decision requirements to model design.',
  why_it_matters: 'Model performance metrics that are defined independently of business acceptance criteria create a dangerous gap: a model can be technically "good" while still failing the business test. Aligning model metrics to D7 acceptance criteria closes this gap by design.',
  methods: [
    '1. For each AI model in the initiative scope, identify the relevant performance metric family: classification → precision, recall, F1, AUC-ROC; regression → RMSE, MAE, MAPE; ranking → NDCG, MRR; language models → BLEU, ROUGE, BERTScore, or task-specific human evaluation.',
    '2. Translate the decision acceptance criteria from D7 SA3 directly into model metric targets: e.g., "minimum 90% recall for fraud detection" maps directly to recall ≥ 0.90.',
    '3. Define evaluation methodology: hold-out test set, k-fold cross-validation, time-series split for temporal data. Define the minimum test set size.',
    '4. Define the minimum acceptable performance bar for production deployment and the bar at which the model triggers automatic retraining.',
    '5. Define performance segmentation requirements: models must be evaluated not just overall but by relevant sub-groups (demographic, geographic, or business-segment) to detect differential performance.',
  ],
  tools: ['Model performance metrics template', 'D7 decision acceptance criteria'],
  outputs: ['AI model performance metrics: metric, threshold for deployment, retraining trigger, evaluation methodology, and segmentation requirements per model'],
  exit_criteria: ['Performance metrics defined for all models in scope; aligned to D7 acceptance criteria; evaluation methodology specified; segmentation requirements defined'],
}

const T_MODEL_METRICS: AISANode = {
  id: 'p1-d9-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Define AI Model Performance Metrics',
  description: 'Specify model performance metrics, deployment thresholds, and evaluation methodology for each AI model in scope.',
  purpose: 'Align model performance requirements to decision acceptance criteria and define objective deployment gates.',
  inputs: ['Decision acceptance criteria from D7', 'AI model list from intervention target list', 'Model performance metrics template'],
  methods: ['Metric family selection by model type', 'D7 acceptance criteria translation', 'Evaluation methodology design', 'Segmentation requirement definition'],
  tools: ['Model performance metrics template'],
  outputs: ['AI model performance metrics with deployment thresholds and evaluation methodology'],
  children: [EG_MODEL_METRICS],
}

const SA2_MODEL_METRICS: AISANode = {
  id: 'p1-d9-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Define AI Model Performance Metrics',
  description: 'Specify the technical performance metrics, deployment thresholds, retraining triggers, and evaluation methodology for each AI model in the initiative scope.',
  purpose: 'Create objective, pre-defined model quality gates that determine when a model is ready for production and when it requires retraining.',
  why_it_matters: 'Without pre-defined performance metrics, model deployment decisions are subjective. "Good enough" without a threshold is not measurable, not defensible, and not consistently applied across models and teams. Pre-defined metrics make model quality an engineering discipline, not an opinion.',
  inputs: ['Decision acceptance criteria from D7', 'Intervention target list from D5', 'AI data feasibility matrix from D6'],
  questions: ['What performance metric applies to each model type?', 'What is the minimum threshold for production deployment?', 'At what performance level should retraining be triggered?', 'How will performance be evaluated by sub-group?'],
  methods: ['Metric family selection', 'Threshold setting', 'Evaluation methodology design', 'Sub-group segmentation specification'],
  tools: ['Model performance metrics template'],
  outputs: ['AI model performance metrics with deployment and retraining thresholds'],
  deliverables: ['AI Model Performance Metrics (input to Phase 3 model design and Phase 4 evaluation pipeline)'],
  exit_criteria: ['Performance metrics defined for all models; thresholds aligned to D7 acceptance criteria; evaluation methodology specified; sub-group requirements confirmed'],
  children: [T_MODEL_METRICS],
}

// ─── SA3: Define Operational Metrics ──────────────────────────────────

const EG_OPERATIONAL_METRICS: AISANode = {
  id: 'p1-d9-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining System Operational Metrics',
  description: 'Define the operational health metrics that will be monitored in production — availability, latency, throughput, error rate, and cost-per-inference.',
  purpose: 'Establish the production monitoring targets that ensure the AI system operates reliably and within cost envelopes after deployment.',
  why_it_matters: 'A model that scores well on benchmarks but fails in production due to latency violations, API errors, or cost overruns is a production failure. Operational metrics defined in Phase 1 become the SLOs (Service Level Objectives) that the Phase 4 deployment architecture must meet.',
  methods: [
    '1. Define availability target: what % uptime is required? (e.g., 99.9% = 8.7 hours downtime/year; 99.5% = 43.8 hours/year). Reference the process criticality from D4 to calibrate.',
    '2. Define latency targets from the technical constraints register (D8 SA1): P50, P95, and P99 latency targets in milliseconds. Note: P99 (worst 1%) matters most for user experience.',
    '3. Define throughput requirements from the volume profile (D2 SA2): peak transactions per second the system must sustain.',
    '4. Define error rate targets: what % of requests can fail before alerting is triggered?',
    '5. Define cost targets: maximum cost-per-inference or monthly infrastructure cost ceiling. Reference the approved budget operating cost line.',
    '6. Define the alerting and escalation triggers for each metric: at what threshold does the system alert, and who is notified?',
  ],
  tools: ['SLO/SLA definition template', 'Volume profile from D2', 'Technical constraints from D8'],
  outputs: ['System operational metrics: availability, latency (P50/P95/P99), throughput, error rate, and cost targets with alerting thresholds'],
  exit_criteria: ['All operational metrics defined; calibrated to technical constraints and volume profile; alerting thresholds set; IT and Business Owner confirmed'],
}

const T_OPERATIONAL_METRICS: AISANode = {
  id: 'p1-d9-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Define System Operational Metrics',
  description: 'Specify availability, latency, throughput, error rate, and cost targets for the production AI system.',
  purpose: 'Establish the SLOs that the Phase 4 deployment architecture must meet.',
  inputs: ['Volume profile from D2', 'Technical constraints from D8', 'Process criticality from D4', 'SLO definition template'],
  methods: ['Availability target setting', 'Latency percentile definition', 'Throughput and error rate target setting', 'Cost ceiling definition', 'Alerting threshold design'],
  tools: ['SLO/SLA definition template'],
  outputs: ['System operational metrics with alerting thresholds'],
  children: [EG_OPERATIONAL_METRICS],
}

const SA3_OPERATIONAL_METRICS: AISANode = {
  id: 'p1-d9-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Define Operational Metrics',
  description: 'Specify system availability, latency, throughput, error rate, and cost targets that become the Service Level Objectives (SLOs) for production operations.',
  purpose: 'Ensure the Phase 4 deployment architecture is designed to specific, pre-agreed operational performance standards.',
  why_it_matters: 'Operational metrics are the promises the AI system makes to the business and to end users. Defining them before design ensures the architecture is built to meet them from the first decision. SLOs without pre-definition become post-deployment complaints.',
  inputs: ['Volume profile from D2', 'Technical constraints from D8', 'Process criticality from D4', 'Budget operating cost line from D3'],
  questions: ['What uptime does this process require?', 'What latency can users tolerate?', 'What peak throughput must the system sustain?', 'What is the cost-per-inference ceiling?'],
  methods: ['SLO definition', 'Latency percentile targeting', 'Cost envelope definition', 'Alerting threshold design'],
  tools: ['SLO/SLA definition template'],
  outputs: ['System SLOs: availability, latency, throughput, error rate, cost with alerting thresholds'],
  deliverables: ['System Operational Metrics/SLOs (input to Phase 4 deployment architecture)'],
  exit_criteria: ['All operational metrics defined and calibrated to process requirements; IT Operations and Business Owner confirmed'],
  children: [T_OPERATIONAL_METRICS],
}

// ─── SA4: Build Metrics Governance Plan ───────────────────────────────

const EG_METRICS_GOVERNANCE: AISANode = {
  id: 'p1-d9-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the Metrics Governance and Reporting Plan',
  description: 'Define how metrics will be collected, reported, reviewed, and acted upon — establishing the governance rhythm that keeps the AI system accountable to its business purpose throughout its operational life.',
  purpose: 'Ensure metrics are not just defined but systematically measured, reported, and acted upon so that performance accountability is maintained over the system\'s operational lifetime.',
  why_it_matters: 'Metrics defined without governance decay into vanity numbers. A system that is never reviewed against its outcome metrics can drift — or fail — without triggering remediation. The governance plan is what makes metrics meaningful rather than decorative.',
  methods: [
    '1. For each metrics category (outcome, model performance, operational), define: collection method (automated pipeline, manual pull, user survey), collection frequency, responsible party for collection, reporting format, and reporting cadence.',
    '2. Define the metrics review governance: who reviews metrics, how often (weekly operational review, monthly business review, quarterly strategic review), and what decisions they are empowered to make.',
    '3. Define response thresholds: at what metric value does the review body take action? What actions are pre-authorised (auto-remediation, retraining) vs. escalation-required?',
    '4. Assign a Metrics Owner for the AI system: the person responsible for the health of the metrics programme post-deployment.',
    '5. Define the annual re-baselining process: how and when will targets be updated as business conditions change?',
  ],
  tools: ['Metrics governance plan template'],
  outputs: ['Metrics governance and reporting plan: collection, reporting, review governance, response thresholds, and Metrics Owner'],
  exit_criteria: ['Collection and reporting defined for all metrics; review governance established; response thresholds defined; Metrics Owner named'],
}

const T_METRICS_GOVERNANCE: AISANode = {
  id: 'p1-d9-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Build Metrics Governance Plan',
  description: 'Define collection, reporting, review governance, and response thresholds for all defined metrics.',
  purpose: 'Ensure metrics are systematically measured and acted upon throughout the system\'s operational life.',
  inputs: ['All D9 SA1–SA3 metric definitions', 'Stakeholder Register from D1 for governance participants', 'Metrics governance plan template'],
  methods: ['Collection method and frequency definition', 'Review governance design', 'Response threshold setting', 'Metrics Owner assignment'],
  tools: ['Metrics governance plan template'],
  outputs: ['Metrics governance and reporting plan'],
  children: [EG_METRICS_GOVERNANCE],
}

const SA4_METRICS_GOVERNANCE: AISANode = {
  id: 'p1-d9-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Build Metrics Governance Plan',
  description: 'Define the collection, reporting, review, and response framework that keeps the AI system accountable to its business objectives throughout its operational lifetime.',
  purpose: 'Prevent metrics from being defined and forgotten by establishing an active governance rhythm from Phase 1.',
  why_it_matters: 'AI systems are not static — they drift, the business changes, and the data distribution evolves. A metrics governance plan is the mechanism that detects drift and initiates response. Without it, the system becomes an unaccountable black box that no one can challenge with evidence.',
  inputs: ['All D9 metric definitions', 'Stakeholder Register from D1', 'Phase 2 governance structure preview'],
  questions: ['How will each metric be collected and by whom?', 'How often will metrics be reviewed?', 'What action is taken at each response threshold?', 'Who owns the metrics programme?'],
  methods: ['Collection and reporting definition', 'Review governance design', 'Response threshold and escalation design', 'Metrics Owner appointment'],
  tools: ['Metrics governance plan template'],
  outputs: ['Metrics governance and reporting plan with Metrics Owner'],
  deliverables: ['Metrics Governance Plan (input to Phase 2 AI governance framework)'],
  exit_criteria: ['All metrics have defined collection and reporting; review governance established; response thresholds set; Metrics Owner named and confirmed'],
  children: [T_METRICS_GOVERNANCE],
}

// ═══════════════════════════════════════════════════════════════════════
// D9 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D9: AISANode = {
  id: 'p1-d9',
  type: 'activity',
  level: 2,
  title: 'D9 — Success Metrics Definition',
  description: 'Define the complete Success Metrics Register — business outcome metrics, AI model performance metrics, and system operational metrics — with a governance plan that sustains measurement accountability throughout the system\'s operational life.',
  purpose: 'Establish before design begins how success will be measured, by whom, and with what consequences — so that technical decisions and business outcomes remain connected throughout delivery and operation.',
  why_it_matters: 'Metrics are the feedback loop between AI capability and business accountability. Without them, AI delivers capability but not accountability. With a well-designed Success Metrics Register and governance plan, the AI system is held to its purpose for as long as it operates — not just at go-live.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: [
    'Objectives hierarchy and baseline metrics from D2',
    'Pain Point Matrix from D5',
    'Decision acceptance criteria from D7',
    'Technical constraints from D8',
    'Volume profile from D2',
    'Approved budget operating cost line from D3',
  ],
  questions: [
    'What business outcomes must the initiative achieve?',
    'What model performance targets are required for each AI decision use case?',
    'What operational SLOs must the production system meet?',
    'How will metrics be collected, reported, and acted upon?',
    'Who is the Metrics Owner?',
  ],
  activities: [
    'Define SMART business outcome metrics with baselines and targets',
    'Define AI model performance metrics aligned to D7 decision acceptance criteria',
    'Define system operational SLOs for availability, latency, throughput, and cost',
    'Build metrics governance and reporting plan with response thresholds',
  ],
  methods: ['Objective-to-metric translation', 'SMART criteria application', 'Model performance metric selection by model type', 'SLO definition', 'Metrics governance design'],
  tools: ['Metrics definition template', 'Model performance metrics template', 'SLO/SLA definition template', 'Metrics governance plan template'],
  governance_considerations: 'The metrics governance plan must include model performance monitoring as required by EU AI Act Art. 72 (post-market monitoring) for High Risk systems. The Metrics Owner is the designated accountable person for Art. 16(e) quality management obligations.',
  ai_engineering_considerations: 'Model performance metrics must be defined separately from accuracy on the training/validation set. The only metrics that matter are measured on a hold-out test set that was never used in training, using data that reflects the production distribution — not historical cherry-picked examples.',
  outputs: ['Business outcome metrics register', 'AI model performance metrics with deployment thresholds', 'System operational SLOs', 'Metrics governance and reporting plan'],
  deliverables: ['Success Metrics Register (Phase 1 Deliverable)', 'Metrics Governance Plan'],
  exit_criteria: [
    'SMART business outcome metrics defined for all objectives; baselines and targets confirmed by Business Owner',
    'Model performance metrics defined for all AI use cases; aligned to D7 acceptance criteria',
    'System SLOs defined and calibrated to technical constraints and volume requirements',
    'Metrics governance plan approved with Metrics Owner named',
    'Success Metrics Register stored in project repository',
  ],
  related_phases: ['phase-2', 'phase-4'],
  references: [
    { title: 'EU AI Act Art. 72 — Post-market monitoring', type: 'standard' },
    { title: 'Site Reliability Engineering — Google', type: 'book', author: 'Beyer et al., Google', year: 2016 },
    { title: 'Lean Analytics — Croll & Yoskovitz', type: 'book', author: 'Croll, A. & Yoskovitz, B.', year: 2013 },
  ],
  children: [SA1_OUTCOME_METRICS, SA2_MODEL_METRICS, SA3_OPERATIONAL_METRICS, SA4_METRICS_GOVERNANCE],
}
