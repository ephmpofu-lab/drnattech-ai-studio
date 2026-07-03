import type { AISANode } from '@/types/aisa'

// Phase 4 — Platform & Data Foundation (P1–P15)
// Inline compact pattern: all activities defined in this file.

function eg(id: string, title: string, description: string, methods: string[], outputs: string[]): AISANode {
  return { id, type: 'execution-guide', level: 5, title, description, purpose: description, methods, outputs, exit_criteria: [`${title} complete and verified`] }
}
function task(id: string, title: string, description: string, inputs: string[], egNode: AISANode): AISANode {
  return { id, type: 'task', level: 4, title, description, purpose: description, inputs, methods: [egNode.title], outputs: egNode.outputs ?? [], children: [egNode] }
}
function sa(id: string, title: string, description: string, why: string, tasks: AISANode[]): AISANode {
  return { id, type: 'sub-activity', level: 3, title, description, purpose: description, why_it_matters: why, inputs: [], outputs: tasks.flatMap(t => t.outputs ?? []), children: tasks }
}

// ─── P1: Infrastructure Provisioning ─────────────────────────────────

const P1: AISANode = {
  id: 'p4-p1', type: 'activity', level: 2,
  title: 'P1 — Infrastructure Provisioning',
  description: 'Provision all compute, storage, and networking infrastructure as code — implementing the infrastructure architecture from A7.',
  purpose: 'Stand up the environment the AI system will run in, reproducibly, from version-controlled IaC.',
  why_it_matters: 'Click-ops infrastructure cannot be reproduced reliably, audited, or rolled back. IaC-provisioned infrastructure is the foundation of reliable AI operations.',
  inputs: ['Infrastructure Architecture from A7', 'Security Architecture from A6', 'Cost model from A11'],
  activities: ['Provision training and inference compute; provision storage tiers; provision networking and security groups; validate against architecture spec'],
  methods: ['Infrastructure-as-Code (Terraform/Bicep/CDK)', 'Environment parity (dev/staging/production)', 'Infrastructure validation and cost verification'],
  tools: ['Terraform or Bicep', 'Cloud CLI', 'Infrastructure validation checklist'],
  outputs: ['Provisioned infrastructure (dev/staging/production)', 'IaC repository with all configurations', 'Validated infrastructure report'],
  deliverables: ['Provisioned Infrastructure (Phase 4 Deliverable)'],
  exit_criteria: ['All three environments provisioned; IaC in source control; security group rules validated against A6; cost within approved model from A7'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p1-sa1', 'Provision Infrastructure via IaC',
      'Use IaC to provision all compute, storage, and networking across dev, staging, and production environments.',
      'IaC-provisioned infrastructure is reproducible, auditable, and recoverable. Manual provisioning is none of these.',
      [task('p4-p1-sa1-t1', 'Provision All Environments', 'Write and apply IaC for all three environments.',
        ['Infrastructure Architecture from A7', 'Security Architecture from A6'],
        eg('p4-p1-sa1-t1-eg', 'EG: Infrastructure Provisioning via IaC',
          'Implement A7 infrastructure design as IaC: (1) Create separate IaC workspaces for dev, staging, and production. (2) Define compute resources: training GPU instances (or equivalent managed ML service), inference serving instances with auto-scaling config, bastion host for secure admin access. (3) Define storage: raw data bucket (geo-redundant), model artefact bucket (versioned), feature store database (managed), Redis for online feature serving, audit log bucket (immutable, WORM-enabled). (4) Define networking: VPC with training, inference, management, and audit subnets; security groups implementing A6 zone segmentation; private endpoints for all managed services; NAT gateway for controlled egress. (5) Apply IaC in order: network → storage → compute → security groups. (6) Validate: run infrastructure compliance check — all resources tagged, encryption enabled, public access disabled on all data resources, security groups match A6 spec.',
          ['1. Set up IaC repository with workspace structure (dev/staging/prod).', '2. Write compute module and apply to all environments.', '3. Write storage module with encryption and access policy configs.', '4. Write networking module with zone segmentation.', '5. Apply and validate each environment.', '6. Run infrastructure compliance check against A6 and A7.'],
          ['Provisioned dev/staging/production environments', 'IaC repository', 'Infrastructure compliance validation report'])
      )])
  ],
}

// ─── P2: Security Controls Implementation ────────────────────────────

const P2: AISANode = {
  id: 'p4-p2', type: 'activity', level: 2,
  title: 'P2 — Security Controls Implementation',
  description: 'Implement all security controls from the Security Architecture (A6) — IAM, encryption, AI-specific controls, and audit logging integration.',
  purpose: 'Convert the security architecture from a design document into operating controls.',
  why_it_matters: 'Security architecture that exists only as documentation is not security. Controls must be implemented, tested, and confirmed operational before data or models are introduced.',
  inputs: ['Security Architecture from A6', 'Security Control Specification from G5', 'Provisioned infrastructure from P1'],
  activities: ['Configure IAM roles and permissions; enable encryption at rest and in transit; deploy AI-specific controls; configure security event logging'],
  methods: ['IAM role configuration per principle of least privilege', 'Encryption enablement and key management configuration', 'AI-specific control deployment (input validation, output filtering)', 'Security event log integration'],
  tools: ['Cloud IAM console or Terraform IAM module', 'KMS configuration', 'API gateway for input/output filtering'],
  outputs: ['IAM roles and policies deployed', 'Encryption enabled and validated', 'AI-specific controls deployed', 'Security logging configured'],
  deliverables: ['Security Controls Implementation Report (Phase 4 Deliverable)'],
  exit_criteria: ['All IAM roles created per A6 spec; encryption confirmed on all data resources; AI-specific controls deployed and tested; security events flowing to audit log'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p2-sa1', 'Implement Security Controls',
      'Deploy all A6 security controls across the provisioned infrastructure.',
      'Security controls deployed before data arrives are the baseline. Controls added after data is present are a remediation.',
      [task('p4-p2-sa1-t1', 'Deploy Security Controls', 'Implement IAM, encryption, AI-specific controls, and logging.',
        ['Security Architecture from A6', 'Security Control Spec from G5'],
        eg('p4-p2-sa1-t1-eg', 'EG: Security Controls Deployment',
          'Implement in sequence: (1) IAM — create all roles from A6 IAM design (data-scientist, model-deployer, operator, auditor, admin); apply permissions per principle of least privilege; enable MFA for privileged roles; test: attempt a privilege-escalation action with each role and confirm denial. (2) Encryption — enable AES-256 at rest on all storage resources; confirm TLS 1.3 on all API endpoints; configure KMS or HSM for key management; test: access a storage resource without credentials and confirm denial. (3) AI-specific controls — deploy input validation service: schema enforcement + input anomaly detection before model inference; deploy output filtering: confidence threshold enforcement, prohibited content detection for generative models; test with malformed input and confirm rejection. (4) Prompt injection defence (if LLM endpoint) — deploy system prompt integrity check; test with prompt injection attempts and confirm the injections do not execute. (5) Security logging — confirm all security events (IAM access, admin actions, API calls) flow to audit log; validate log format against G10 logging specification; confirm log integrity controls (immutability or signing) are active.',
          ['1. Create IAM roles and test privilege boundaries.', '2. Enable and validate encryption on all resources.', '3. Deploy and test input validation and output filtering.', '4. Deploy prompt injection defences if applicable.', '5. Validate security logging flow and format.'],
          ['Security Controls Deployment and Validation Report'])
      )])
  ],
}

// ─── P3: Data Ingestion Pipeline ─────────────────────────────────────

const P3: AISANode = {
  id: 'p4-p3', type: 'activity', level: 2,
  title: 'P3 — Data Ingestion Pipeline',
  description: 'Build and validate the data ingestion pipeline connecting all data sources from D6 to the AI system\'s raw data store.',
  purpose: 'Establish the reliable, governed, and monitored data supply that all subsequent AI system components depend on.',
  why_it_matters: 'The data ingestion pipeline is the AI system\'s lifeline. A pipeline that drops records silently, fails under load, or delivers corrupted data produces a model that is unreliable regardless of its design quality.',
  inputs: ['Data Architecture from A4', 'Data Landscape Assessment from D6', 'Privacy Controls from G2', 'Logging Specification from G10'],
  activities: ['Build source connectors per D6 data source; implement data validation and quality gates; implement privacy controls at ingestion; implement pipeline monitoring and alerting'],
  methods: ['Connector development per source type (API/batch/CDC/stream)', 'Data validation rule implementation', 'Privacy control implementation (minimisation, pseudonymisation)', 'Pipeline monitoring setup'],
  tools: ['Apache Airflow, Azure Data Factory, or equivalent', 'Data validation framework (Great Expectations)', 'Secret management for source credentials'],
  outputs: ['Data ingestion pipeline connecting all D6 sources', 'Pipeline monitoring and alerting configured', 'Data validation quality gates operational'],
  deliverables: ['Data Ingestion Pipeline (Phase 4 Deliverable)'],
  exit_criteria: ['All D6 data sources connected; quality gates operational; privacy controls confirmed implemented; pipeline monitoring alerting on failure; end-to-end pipeline test passed with production-equivalent data volume'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p3-sa1', 'Build Data Ingestion Pipeline',
      'Implement source connectors, quality gates, and privacy controls for all D6 data sources.',
      'A data pipeline with no quality gates delivers bad data silently. Quality gates are the difference between a reliable AI system and a confident-sounding wrong one.',
      [task('p4-p3-sa1-t1', 'Build and Validate Ingestion Pipeline', 'Implement connectors, validation, privacy controls, and monitoring.',
        ['Data Architecture from A4', 'D6 data source catalogue', 'G2 privacy controls'],
        eg('p4-p3-sa1-t1-eg', 'EG: Data Ingestion Pipeline Implementation',
          'For each data source from D6: (1) Build the appropriate connector — REST API (OAuth2/API key auth, pagination handling, rate limit backoff); batch file (SFTP/S3 pickup, format validation, schema check on arrival); CDC (database replication or event stream subscription); stream (Kafka/Event Hub consumer). (2) Implement data validation at ingestion using agreed rules from D6 quality assessment: schema validation (field presence, type, format), range checks for numeric fields, referential integrity for lookups, completeness thresholds. Failed validation → dead-letter queue + alert. (3) Implement privacy controls from G2 at ingestion point: field minimisation (drop fields not required); pseudonymisation of direct identifiers; encryption of sensitive fields before storage. (4) Implement pipeline monitoring: record count in/out per run (flag if <95% expected volume), latency per source, failure rate; alert on any failure and on data volume anomalies > 20% from rolling average. (5) Run end-to-end test with production-representative data volume and confirm: all sources deliver, quality gates pass, privacy controls are applied, monitoring triggers fire on injected failures.',
          ['1. Implement connector for each source type.', '2. Implement validation rules from D6 quality assessment.', '3. Implement G2 privacy controls at ingestion.', '4. Set up pipeline monitoring and alerting.', '5. Run end-to-end test and validate all components.'],
          ['Working data ingestion pipeline with all sources connected and validated'])
      )])
  ],
}

// ─── P4: Data Transformation and Feature Engineering ─────────────────

const P4: AISANode = {
  id: 'p4-p4', type: 'activity', level: 2,
  title: 'P4 — Data Transformation and Feature Engineering',
  description: 'Build the data transformation pipeline and feature engineering logic that converts raw ingested data into model-ready features, and populate the feature store.',
  purpose: 'Produce the feature set that the AI model will train on and run against — the primary determinant of model quality.',
  why_it_matters: 'Features that leak future information into training (target leakage), encode protected characteristics indirectly (proxy bias), or are computed inconsistently between training and inference (training-serving skew) all produce models that are wrong in ways that are hard to diagnose.',
  inputs: ['Data Architecture from A4', 'Model Architecture from A3', 'Ethical AI Assessment bias analysis from G3', 'Ingested data from P3'],
  activities: ['Design and implement feature engineering logic; detect and eliminate target leakage; implement fairness-aware feature selection; populate offline feature store; validate training-serving consistency'],
  methods: ['Feature engineering implementation (transformations, aggregations, embeddings)', 'Target leakage detection (temporal split validation)', 'Proxy bias screening (permutation importance + correlation with protected attributes)', 'Training-serving skew test'],
  tools: ['Pandas/Spark for transformation', 'Feature store (Feast or equivalent)', 'Leakage and bias detection scripts'],
  outputs: ['Feature engineering pipeline', 'Offline feature store populated', 'Feature registry with lineage', 'Training-serving consistency validated'],
  deliverables: ['Feature Engineering Pipeline and Feature Store (Phase 4 Deliverable)'],
  exit_criteria: ['All features computed and stored in offline feature store; target leakage check passed; proxy bias screening completed; training-serving skew test passed; features registered with lineage metadata'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p4-sa1', 'Build Feature Engineering Pipeline',
      'Implement transformation logic, populate the feature store, and validate feature quality and fairness.',
      'Feature engineering errors are among the hardest AI system defects to diagnose because they manifest as unexplained model performance degradation, not explicit errors.',
      [task('p4-p4-sa1-t1', 'Implement Features and Validate', 'Build feature transformations, check for leakage and bias, and populate feature store.',
        ['Data Architecture from A4', 'Model Architecture from A3', 'G3 bias analysis'],
        eg('p4-p4-sa1-t1-eg', 'EG: Feature Engineering and Feature Store Population',
          'Implement: (1) Transformation pipeline — raw data → cleaned data (handle nulls: impute or flag per feature, not drop by default; normalise numeric features; encode categoricals; compute time-based aggregations with correct temporal alignment). (2) Target leakage check — train the feature set on a temporal split: if a feature has near-perfect predictive power alone, it likely leaks future information → investigate and remove if confirmed leak. (3) Proxy bias screening — for each protected characteristic from G3 (age, gender, ethnicity, disability): compute correlation between each feature and the protected attribute; flag features with correlation > 0.3 for review by the Ethics lead; document decision to retain or remove for audit. (4) Feature store population — write all features to the offline store with: feature name, feature type, computation logic, source dataset, lineage, data owner; set up daily/scheduled refresh job. (5) Online feature store — for features needed at inference time: materialise to online store; confirm latency < inference SLO from D9. (6) Training-serving skew test — compute feature statistics (mean, std, percentiles) on the training batch; compute the same statistics on live serving data after the online store is populated; flag any distribution divergence > 10% as a potential skew issue.',
          ['1. Implement transformation pipeline for all features.', '2. Run target leakage check on temporal split.', '3. Run proxy bias screening per G3 protected characteristics.', '4. Populate offline feature store with lineage metadata.', '5. Materialise features to online store.', '6. Run training-serving skew test.'],
          ['Feature engineering pipeline', 'Offline and online feature store populated', 'Leakage/bias/skew validation reports'])
      )])
  ],
}

// ─── P5: Model Development ────────────────────────────────────────────

const P5: AISANode = {
  id: 'p4-p5', type: 'activity', level: 2,
  title: 'P5 — Model Development',
  description: 'Develop, train, and evaluate the AI model(s) for each use case — following the model architecture from A3 and producing models that meet D9 performance targets and G3 fairness requirements.',
  purpose: 'Produce trained, evaluated AI models that satisfy both technical performance requirements and governance constraints.',
  why_it_matters: 'A model evaluated only on aggregate accuracy may hide catastrophic failure on specific subgroups, edge cases, or adversarial inputs. Model development without explicit governance evaluation gates produces systems that perform well in demos and fail in production.',
  inputs: ['Model Architecture from A3', 'Feature store from P4', 'D9 success metrics', 'G3 fairness requirements', 'MLOps architecture from A8'],
  activities: ['Train model per architecture spec; evaluate on D9 metrics; evaluate fairness per G3 spec; conduct error analysis; register passing models in model registry'],
  methods: ['Experiment tracking (MLflow or equivalent)', 'Cross-validation', 'Subgroup fairness evaluation', 'Error analysis', 'Model registration with governance metadata'],
  tools: ['scikit-learn/XGBoost/PyTorch/Transformers (per model type from A3)', 'MLflow or Weights & Biases for experiment tracking', 'Model evaluation framework'],
  outputs: ['Trained model artefacts', 'Model evaluation report (performance + fairness)', 'Registered model in model registry', 'Error analysis report'],
  deliverables: ['Model Development and Evaluation Report (Phase 4 Deliverable)', 'Registered Model in Model Registry'],
  exit_criteria: ['Model meets all D9 performance thresholds on held-out test set; fairness metrics meet G3 specifications per subgroup; error analysis completed; model registered in registry with evaluation results and governance approval'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p5-sa1', 'Develop and Evaluate Model',
      'Train the model, evaluate against D9 metrics and G3 fairness requirements, and register passing models.',
      'A model that meets accuracy targets but fails fairness requirements is a non-compliant model, regardless of technical performance. Governance evaluation gates are non-negotiable.',
      [task('p4-p5-sa1-t1', 'Train, Evaluate, and Register Model', 'Run the training pipeline, evaluate comprehensively, and register in model registry.',
        ['Feature store from P4', 'Model Architecture from A3', 'D9 metrics', 'G3 fairness requirements'],
        eg('p4-p5-sa1-t1-eg', 'EG: Model Training, Evaluation, and Registration',
          'Follow the training pipeline defined in A8: (1) Data preparation — retrieve features from offline feature store; apply train/validation/test split using temporal split (not random) to avoid data leakage; confirm training set volume meets minimum sample size for statistical validity. (2) Training — train model per architecture specification from A3; track all hyperparameters, training data version, and training run metadata in MLflow/equivalent experiment tracker; use cross-validation on training set to tune hyperparameters. (3) Performance evaluation on held-out test set — compute all D9 metrics: primary metric (precision/recall/F1/AUC as applicable), operational metrics (latency, throughput); compare against D9 acceptance criteria thresholds; if any metric below threshold → training failure, investigate and retrain. (4) Fairness evaluation per G3 — compute all G3 fairness metrics (demographic parity, equalised odds, or others per G3 specification) for each protected subgroup; compare against G3 thresholds; if any subgroup fails → flag for Ethics Lead review before proceeding. (5) Error analysis — sample 100 false positives and 100 false negatives (or equivalent for regression); identify patterns: are errors concentrated in specific subgroups, data ranges, or input types? Produce error analysis report. (6) Model registration — if all gates pass: register model in model registry with metadata: model version, training data version, hyperparameters, evaluation results (all metrics), fairness results, Ethics Lead review outcome, AI Product Owner approval; set status to "pending deployment approval".',
          ['1. Retrieve features and split dataset temporally.', '2. Train model with experiment tracking.', '3. Evaluate performance on D9 metrics.', '4. Evaluate fairness on G3 subgroups.', '5. Conduct error analysis.', '6. Register model with governance metadata.'],
          ['Trained model artefact', 'Performance and fairness evaluation report', 'Error analysis report', 'Registered model (status: pending deployment approval)'])
      )])
  ],
}

// ─── P6: Explainability Implementation ───────────────────────────────

const P6: AISANode = {
  id: 'p4-p6', type: 'activity', level: 2,
  title: 'P6 — Explainability Implementation',
  description: 'Implement the explainability mechanisms specified in the model architecture (A3) and required by the Ethical AI Assessment (G3) — making AI outputs interpretable for each audience.',
  purpose: 'Convert the model\'s internal representations into human-understandable explanations that satisfy both governance requirements and user needs.',
  why_it_matters: 'EU AI Act Art. 13 requires transparency and explainability for High Risk AI systems. Explainability mechanisms not implemented in Phase 4 cannot be retrofitted without model re-architecture. They must be built alongside the model, not after.',
  inputs: ['Explainability Requirements from G3', 'Model Architecture from A3', 'Trained model from P5'],
  activities: ['Implement explanation method per A3 specification (SHAP/LIME/counterfactuals); validate explanation quality; integrate explanation API with inference serving'],
  methods: ['SHAP (global and local feature importance for tree models and neural networks)', 'LIME (local explanation for any model type)', 'Counterfactual explanation generation', 'Natural language explanation templates for non-technical audiences'],
  tools: ['shap library', 'alibi-explain', 'Custom explanation template engine'],
  outputs: ['Explanation API returning explanation with each inference', 'Validated explanation quality vs. G3 requirements', 'Explanation templates per audience (technical/non-technical/regulatory/affected individual)'],
  deliverables: ['Explainability Implementation (Phase 4 Deliverable)'],
  exit_criteria: ['Explanation API operational; explanation depth meets G3 requirements per audience; explanation latency within D9 SLO; integration with Human-AI UI (A9 design) confirmed'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p6-sa1', 'Implement Explainability Mechanism',
      'Build and validate the explanation API per G3 requirements.',
      'Explainability is not an add-on — it is a governance requirement and a user right in high-stakes AI decisions. It must be designed in, not bolted on.',
      [task('p4-p6-sa1-t1', 'Build Explanation API', 'Implement the explanation method and integrate with inference serving.',
        ['G3 Explainability Requirements', 'Model Architecture from A3', 'Trained model from P5'],
        eg('p4-p6-sa1-t1-eg', 'EG: Explainability Implementation',
          'Implement the explanation method specified in A3: (1) SHAP implementation (for tree-based or neural network models) — initialise SHAP explainer for the trained model; compute SHAP values for each inference; produce: top-N feature contributions (name, value, impact direction, magnitude); global feature importance report across the test set. (2) LIME implementation (for any model type, or as supplement) — train local surrogate model per inference; produce feature weight explanation. (3) Counterfactual explanation (for classification decisions) — use alibi-explain or similar to generate: "If X had been Y, the decision would have been Z" statements for decision reversals; constrain counterfactuals to actionable feature changes only (not immutable features like age or race). (4) Natural language explanation templates — for each audience from G3: technical user (feature names, SHAP values, direction); non-technical user (plain English: "The primary reason for this recommendation was [top feature] because [feature value]"); regulatory reviewer (full technical detail + model version + confidence); affected individual (GDPR Art. 22 right to explanation: plain English, actionable). (5) Explanation API — wrap explanation logic as a service endpoint called by the inference API; return explanation alongside prediction in the inference response; confirm explanation latency ≤ 10% of total inference latency budget.',
          ['1. Implement SHAP or LIME explanation for the specific model type.', '2. Implement counterfactual generation if required by G3.', '3. Build explanation templates for each G3 audience.', '4. Wrap as explanation API and integrate with inference.', '5. Validate explanation quality and latency.'],
          ['Explanation API integrated with inference serving', 'Explanation templates per G3 audience', 'Explanation quality validation report'])
      )])
  ],
}

// ─── P7: MLOps Pipeline Implementation ───────────────────────────────

const P7: AISANode = {
  id: 'p4-p7', type: 'activity', level: 2,
  title: 'P7 — MLOps Pipeline Implementation',
  description: 'Build the end-to-end MLOps pipeline designed in A8 — training automation, evaluation gates, model registry, deployment automation, monitoring, and retraining triggers.',
  purpose: 'Make the model lifecycle repeatable, governed, and auditable — so model changes never bypass quality or governance checks.',
  why_it_matters: 'Without an automated MLOps pipeline, model updates are deployed by hand — skipping evaluation gates, bypassing the model registry, and producing deployments that cannot be reproduced or rolled back. The MLOps pipeline is the engineering discipline that makes AI operations trustworthy.',
  inputs: ['MLOps Architecture from A8', 'Trained model from P5', 'Model registry from P5', 'Infrastructure from P1'],
  activities: ['Implement training pipeline automation; implement evaluation gate automation; implement deployment pipeline; implement monitoring pipeline; test end-to-end pipeline'],
  methods: ['ML pipeline orchestration (Kubeflow Pipelines, Azure ML Pipelines, Vertex AI Pipelines)', 'Automated evaluation gate implementation', 'Blue/green deployment implementation', 'Monitoring pipeline implementation'],
  tools: ['MLflow for experiment tracking and model registry', 'Orchestration platform per A8 specification', 'Monitoring platform from A10'],
  outputs: ['Automated training pipeline', 'Automated evaluation gates operational', 'Deployment pipeline with blue/green support', 'Monitoring pipeline streaming to dashboards'],
  deliverables: ['MLOps Pipeline (Phase 4 Deliverable)'],
  exit_criteria: ['Training pipeline runs end-to-end without manual intervention; all evaluation gates fire on metric failures; deployment pipeline produces zero-downtime deployments; monitoring pipeline streams all A10 metrics; retraining trigger fires on drift detection'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p7-sa1', 'Build MLOps Pipeline',
      'Implement end-to-end pipeline from training automation to monitoring.',
      'A manually operated model lifecycle is not a sustainable AI system. It is a prototype that has been promoted to production.',
      [task('p4-p7-sa1-t1', 'Implement MLOps Pipeline', 'Build all pipeline stages from training to monitoring.',
        ['MLOps Architecture from A8', 'Model registry from P5'],
        eg('p4-p7-sa1-t1-eg', 'EG: MLOps Pipeline Implementation',
          'Implement A8 pipeline design: (1) Training pipeline — orchestrated job: data validation → feature retrieval from offline store → model training (with experiment tracking) → evaluation gate → model registration if gates pass. Trigger: scheduled (weekly) + manual + drift-triggered (from monitoring). (2) Evaluation gates — automated checks run after every training job: performance gate (all D9 metrics ≥ threshold), fairness gate (all G3 fairness metrics ≥ threshold), security gate (model artefact integrity check via signature verification); any gate failure → pipeline blocks, AI Product Owner notified, model not registered. (3) Deployment pipeline — on new registered model (status: deployment-approved): run deployment smoke test against staging; if pass → deploy to production using blue/green switch; validate production smoke test post-deploy; if fail → auto-rollback to previous blue; alert AI Product Owner. (4) Shadow mode — new model runs in parallel with current production model for a configurable window (default 7 days); log both outputs; compare distributions; if shadow model performance significantly diverges → alert before promotion. (5) Monitoring pipeline — stream system metrics, model performance metrics, data quality metrics, and business metrics to monitoring platform per A10 design; trigger retraining pipeline if drift score (PSI) exceeds threshold; alert on SLO breach.',
          ['1. Implement training pipeline with orchestration.', '2. Implement evaluation gates for performance, fairness, and security.', '3. Implement deployment pipeline with blue/green support.', '4. Implement shadow mode deployment capability.', '5. Implement monitoring pipeline with drift detection and retraining trigger.'],
          ['End-to-end MLOps pipeline operational', 'Shadow mode deployment capability', 'Monitoring pipeline with automated retraining trigger'])
      )])
  ],
}

// ─── P8: API and Integration Development ─────────────────────────────

const P8: AISANode = {
  id: 'p4-p8', type: 'activity', level: 2,
  title: 'P8 — API and Integration Development',
  description: 'Implement the integration architecture from A5 — building APIs, connectors to consuming systems, and the error handling, retry, and circuit breaker patterns designed in Phase 3.',
  purpose: 'Connect the AI system to the ecosystem of upstream data sources and downstream consuming applications that make it operationally useful.',
  why_it_matters: 'An AI system that cannot reliably receive data and deliver outputs to the systems that use them provides no business value, regardless of model quality. Integration is where AI capability becomes AI value.',
  inputs: ['Integration Architecture from A5', 'API specifications from A5', 'Security Architecture from A6', 'Inference serving from P7'],
  activities: ['Implement REST API endpoints per A5 specification; implement error handling and circuit breakers; implement downstream integrations; run integration testing'],
  methods: ['OpenAPI-first API implementation', 'Circuit breaker (Resilience4J, Polly, or similar)', 'Integration testing', 'API security (OAuth2, mTLS)'],
  tools: ['API framework per stack (FastAPI, Express, Spring Boot)', 'Circuit breaker library', 'API testing tool (Postman, Hoppscotch)'],
  outputs: ['REST API endpoints per OpenAPI spec', 'Circuit breaker operational', 'Downstream integrations functional', 'Integration test suite passing'],
  deliverables: ['API and Integration Layer (Phase 4 Deliverable)'],
  exit_criteria: ['All A5 API endpoints implemented and tested; circuit breaker tested under simulated failure; security controls from A6 applied to all integration points; integration test suite passing'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p8-sa1', 'Implement API and Integrations',
      'Build APIs per A5 specification and implement error handling, security, and downstream connectors.',
      'Integrations that fail silently under load or propagate failures to consuming systems are worse than no integration — they cause cascading failures.',
      [task('p4-p8-sa1-t1', 'Build Integration Layer', 'Implement APIs, error handling, and downstream connectors.',
        ['Integration Architecture from A5', 'API specs from A5', 'Security Architecture from A6'],
        eg('p4-p8-sa1-t1-eg', 'EG: API and Integration Implementation',
          'Implement per A5 design: (1) REST API — implement each endpoint from the A5 OpenAPI specification: POST /predict (inference request), GET /predict/{id} (result retrieval), POST /override (human override logging), GET /health (health check), GET /metrics (Prometheus endpoint). Apply OpenAPI schema validation on request entry — reject malformed requests with HTTP 400 before reaching model serving. (2) Authentication — OAuth2 bearer token validation for external consumers; mTLS for internal service-to-service calls; API key for batch consumers. Confirm against A6 IAM design. (3) Error handling — all errors return structured JSON: { error_code, message, correlation_id }; never expose stack traces to consumers; log full error detail internally with correlation ID. (4) Circuit breaker — wrap calls to model serving, feature store, and downstream integrations; trip after 5 consecutive failures; half-open after 30 seconds; confirm circuit state visible in health endpoint. (5) Downstream integrations — implement connectors to consuming systems from A5 (business application webhooks, database writes, message queue publishing); apply retry with exponential backoff for transient failures; dead-letter failed messages with alert. (6) Integration testing — test each integration point: happy path, error path, timeout path, circuit breaker trip; confirm correlation IDs trace end-to-end.',
          ['1. Implement REST API endpoints per OpenAPI spec with validation.', '2. Implement authentication per A6 IAM design.', '3. Implement error handling with structured responses.', '4. Implement circuit breaker for all downstream calls.', '5. Implement downstream integration connectors.', '6. Run integration test suite.'],
          ['Integration layer with API, circuit breaker, and downstream connectors', 'Integration test suite passing'])
      )])
  ],
}

// ─── P9: Human Oversight UI Development ──────────────────────────────

const P9: AISANode = {
  id: 'p4-p9', type: 'activity', level: 2,
  title: 'P9 — Human Oversight UI Development',
  description: 'Build the human-facing UI components specified in the Human-AI Interaction Design (A9) — implementing AI output display, explanation panels, override mechanisms, and AI disclosure badges.',
  purpose: 'Make human oversight of AI decisions practically effortless — building the UI that converts governance policy into daily practice.',
  why_it_matters: 'The best governance framework fails if the UI makes oversight difficult to exercise. The override button buried three menus deep is effectively no override button. The interaction design from A9 must be implemented faithfully, not approximated.',
  inputs: ['Human-AI Interaction Design from A9', 'Explanation API from P6', 'Override Procedure from G8', 'Frontend stack and component library'],
  activities: ['Implement AI output display components; implement explanation panel; implement override dialog and logging; implement AI disclosure badge; conduct accessibility validation'],
  methods: ['Component-first UI development', 'Accessibility testing (axe-core)', 'Override dialog with audit trail integration', 'Confidence-level UI variants implementation'],
  tools: ['React/Vue/Angular (per project stack)', 'Accessibility testing library (axe-core)', 'Override logging API integration'],
  outputs: ['AI output display components', 'Explanation panel', 'Override dialog with audit trail', 'AI disclosure badge', 'Accessibility validation report'],
  deliverables: ['Human Oversight UI (Phase 4 Deliverable)'],
  exit_criteria: ['All A9 interaction patterns implemented; override dialog logs to audit trail; explanation panel meets G3 explainability requirements; accessibility validation passes WCAG 2.1 AA; user acceptance testing with representative users confirms oversight is practical'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p9-sa1', 'Build Human Oversight UI',
      'Implement all A9 interaction design components with a focus on oversight practicality.',
      'Human oversight built into the UI is the difference between governance that operates and governance that is documented. The UI is where the human in the loop actually exists.',
      [task('p4-p9-sa1-t1', 'Implement Oversight UI Components', 'Build AI output display, explanation, override, and disclosure UI.',
        ['Human-AI Interaction Design from A9', 'Explanation API from P6', 'Override Procedure from G8'],
        eg('p4-p9-sa1-t1-eg', 'EG: Human Oversight UI Implementation',
          'Implement A9 interaction design components: (1) AI Output Display — clearly labelled "AI Recommendation" header; confidence indicator (visual gauge or badge, not colour-only); primary action: "Review" or "See Details" (not "Accept"); secondary action: "Override". (2) Explanation Panel — expandable accordion below the AI output; shows: top 3 contributing factors (feature name, value, impact direction in plain English); "What would change this?" section with counterfactual; "Technical Details" section (hidden by default) with SHAP values for technical users; loading state while explanation API responds. (3) Override Dialog — modal triggered by "Override" button; required fields: override decision (text or dropdown); override reasoning (text area, minimum 20 characters, validation enforced); optional: escalation flag (notify supervisor); on submit: POST to override logging endpoint (G8 procedure); confirmation message with override reference number; disable re-submission until confirmation received. (4) AI Disclosure Badge — persistent badge on all AI-assisted outputs: "AI-Assisted" with info icon; tooltip: "This output was produced by an AI system. A human reviewer is responsible for the final decision."; badge links to system information page (EU AI Act Art. 13). (5) Confidence variants — high confidence: green badge, recommendation displayed prominently; medium: amber badge, "Please review carefully" note; low: red badge, "Human review strongly recommended" — interface defaults to showing alternatives, not just the AI recommendation. (6) Accessibility — run axe-core on all components; fix all critical and serious findings; confirm keyboard navigation and screen-reader announcement for AI output and override dialog.',
          ['1. Build AI output display component with confidence indicator.', '2. Build explanation panel with plain-English and technical views.', '3. Build override dialog with required reasoning field and audit logging.', '4. Build AI disclosure badge with Art. 13 information link.', '5. Implement confidence-level UI variants.', '6. Run accessibility audit with axe-core.'],
          ['Human oversight UI components', 'Override audit trail integration', 'Accessibility validation report'])
      )])
  ],
}

// ─── P10: Monitoring and Observability Setup ──────────────────────────

const P10: AISANode = {
  id: 'p4-p10', type: 'activity', level: 2,
  title: 'P10 — Monitoring and Observability Setup',
  description: 'Implement the monitoring architecture from A10 — deploying the metrics pipeline, dashboards for all four audiences, alerting, and drift detection.',
  purpose: 'Make the AI system\'s health, performance, and compliance observable — converting post-deployment governance from intention to practice.',
  why_it_matters: 'Post-deployment monitoring is the mechanism that keeps governance operational. Without it, governance is a Phase 2 activity with no operational consequence. Monitoring makes model degradation, data drift, and SLO breaches visible before they cause business harm.',
  inputs: ['Monitoring Architecture from A10', 'Logging Specification from G10', 'Success Metrics from D9', 'MLOps pipeline from P7'],
  activities: ['Deploy metrics collection pipeline; build dashboards per A10 design; configure alerting with escalation paths; deploy drift detection; validate all monitoring end-to-end'],
  methods: ['Metrics collection agent deployment', 'Dashboard development per audience', 'Alert rule configuration', 'Statistical drift detection deployment (PSI)'],
  tools: ['Grafana/Datadog/CloudWatch (per A10 specification)', 'Prometheus or equivalent for metrics collection', 'Evidently AI or Alibi Detect for drift detection'],
  outputs: ['Metrics collection pipeline operational', 'Four dashboards built per A10 design', 'Alerting configured with escalation paths', 'Drift detection operational'],
  deliverables: ['Monitoring and Observability Platform (Phase 4 Deliverable)'],
  exit_criteria: ['All A10 metrics collected; four audience dashboards operational; all alert rules configured; drift detection producing PSI scores; end-to-end test: inject a simulated metric failure and confirm alert fires and escalation triggers'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p10-sa1', 'Deploy Monitoring Platform',
      'Implement all A10 monitoring components: metrics, dashboards, alerting, and drift detection.',
      'Deployed AI systems with no monitoring are black boxes with business consequences. Monitoring makes the box transparent.',
      [task('p4-p10-sa1-t1', 'Build and Validate Monitoring', 'Deploy metrics, dashboards, alerting, and drift detection.',
        ['Monitoring Architecture from A10', 'Logging Spec from G10', 'D9 metrics and SLOs'],
        eg('p4-p10-sa1-t1-eg', 'EG: Monitoring and Observability Implementation',
          'Implement A10 monitoring design: (1) Metrics collection — deploy collection agents per platform (Prometheus exporters for custom metrics; CloudWatch agent for infrastructure; custom MLflow callback for model metrics); confirm all four metric layers flowing: system, model performance, data quality, business. (2) Dashboards — build four audience dashboards: Operational (IT Ops): real-time system health — API latency P50/P95/P99 vs. SLO, error rate, active requests, component health status; Model Performance (AI Product Owner): daily/weekly — precision/recall/F1 trend, fairness metric trend per subgroup, recent prediction volume and distribution; Compliance (DPO + Legal): monthly — EU AI Act logging compliance (mandatory events captured %), override rate trend, audit event summary; Business Outcomes (Business Owner): monthly — D9 outcome metrics trend, cost per inference, business impact vs. baseline. (3) Alerting — configure alert rules for each metric category: SLO breach (P95 latency > threshold), error rate spike (> 5% in 5 minutes), model performance drop (F1 below gate threshold on rolling window), data drift (PSI > 0.2), audit log gap (no events for > 1 hour). Define escalation: automated ticket creation → notify AI Product Owner → notify DPO if compliance event. (4) Drift detection — deploy PSI calculator comparing current feature distribution to training baseline; schedule daily; report in Model Performance dashboard; trigger retraining pipeline if PSI > 0.25 on any key feature. (5) End-to-end validation — inject a simulated metric failure; confirm alert fires within 2 minutes; confirm escalation path triggers; confirm dashboard reflects the event.',
          ['1. Deploy metrics collection agents for all four layers.', '2. Build four audience dashboards per A10 design.', '3. Configure alert rules and escalation paths.', '4. Deploy drift detection with daily PSI calculation.', '5. Run end-to-end validation with simulated failure.'],
          ['Monitoring platform with four dashboards', 'Alerting and escalation paths operational', 'Drift detection producing daily PSI scores'])
      )])
  ],
}

// ─── P11: Testing and Quality Assurance ──────────────────────────────

const P11: AISANode = {
  id: 'p4-p11', type: 'activity', level: 2,
  title: 'P11 — Testing and Quality Assurance',
  description: 'Conduct comprehensive testing of the AI system — unit tests, integration tests, AI-specific tests (adversarial, fairness), performance tests, and user acceptance testing.',
  purpose: 'Confirm that the complete AI system works correctly, safely, and in accordance with all governance requirements before deployment.',
  why_it_matters: 'AI systems require testing beyond standard software testing. Adversarial testing, fairness validation, explainability testing, and override mechanism testing are AI-specific quality gates that standard QA processes do not cover. Missing them allows defects that standard testing would not detect to reach production.',
  inputs: ['All Phase 4 components (P1–P10)', 'D9 acceptance criteria', 'G3 fairness requirements', 'A11 load test plan'],
  activities: ['Unit testing of all components; integration testing end-to-end; AI-specific testing (adversarial, fairness, explainability); performance and load testing; user acceptance testing'],
  methods: ['Automated test suite (unit + integration)', 'Adversarial input testing', 'Fairness metric re-evaluation on test set', 'Load testing per A11 plan', 'Structured UAT with representative users'],
  tools: ['pytest/Jest/xUnit (per stack)', 'k6 or Locust for load testing', 'Adversarial input generator'],
  outputs: ['Automated test suite passing', 'AI-specific test results (adversarial, fairness)', 'Load test results vs. D9 SLOs', 'UAT sign-off from Business Owner'],
  deliverables: ['Testing and QA Report (Phase 4 Deliverable)', 'UAT Sign-Off'],
  exit_criteria: ['All unit and integration tests passing; adversarial tests show input validation blocks malformed inputs; fairness metrics on test set meet G3 thresholds; load test meets D9 SLOs at peak load; Business Owner has signed UAT'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p11-sa1', 'Conduct Comprehensive Testing',
      'Run all test types including AI-specific tests and confirm all pass before deployment.',
      'Testing that omits AI-specific test types is testing a conventional system. AI systems fail in AI-specific ways that only AI-specific tests can detect.',
      [task('p4-p11-sa1-t1', 'Run Full Test Suite', 'Execute all testing from unit tests through UAT.',
        ['All Phase 4 components', 'D9 acceptance criteria', 'G3 fairness requirements', 'A11 load test plan'],
        eg('p4-p11-sa1-t1-eg', 'EG: Comprehensive AI System Testing',
          'Execute testing in sequence: (1) Unit and integration tests — run automated test suite; confirm all unit tests pass; run integration tests covering: data pipeline end-to-end, inference API with feature store lookup, override dialog → audit log, explanation API response within latency budget. (2) AI-specific tests — adversarial input testing: submit boundary inputs, null inputs, inputs with injected payloads; confirm input validation blocks all; confirm model does not produce confidence output for invalid inputs. Data poisoning simulation (for online learning models): inject outlier records into the feature pipeline; confirm quality gates reject them. Prompt injection (for LLM endpoints): submit 20 common prompt injection templates; confirm output filter blocks injection. (3) Fairness re-validation — run fairness metrics on the test set for all G3 subgroups; confirm all subgroups meet G3 thresholds. (4) Explainability testing — request explanations for 100 random inferences; confirm: explanation returns within latency budget; all four audience templates produce non-empty output; explanation features refer to actual input features (not internal embeddings). (5) Load testing per A11 plan — run all five scenarios: steady state, peak load, spike, soak, failure injection; compare results against D9 SLOs; document any breaches. (6) UAT — conduct structured sessions with representative users from each role group (end user, team lead, auditor); demonstrate: submitting a request, reviewing AI output, reading explanation, overriding and documenting; confirm users can exercise oversight without requiring assistance; obtain Business Owner written sign-off.',
          ['1. Run automated unit and integration test suite.', '2. Run adversarial, data poisoning, and prompt injection tests.', '3. Re-validate fairness metrics on test set.', '4. Test explainability API quality and latency.', '5. Execute load test plan per A11 scenarios.', '6. Conduct UAT and obtain Business Owner sign-off.'],
          ['Full test suite results', 'AI-specific test report', 'Load test results vs. SLOs', 'UAT sign-off'])
      )])
  ],
}

// ─── P12: Deployment and Go-Live ──────────────────────────────────────

const P12: AISANode = {
  id: 'p4-p12', type: 'activity', level: 2,
  title: 'P12 — Deployment and Go-Live',
  description: 'Deploy the validated AI system to production using the deployment pipeline — starting in shadow mode, transitioning to canary, then full production with a defined rollback procedure.',
  purpose: 'Release the AI system to production in a controlled, reversible manner that minimises risk and validates real-world performance before full activation.',
  why_it_matters: 'Big-bang AI deployments that go straight to full production activation have no safety net. Shadow mode and canary deployment are not bureaucracy — they are the engineering controls that prevent a deployment from becoming an incident.',
  inputs: ['Deployment pipeline from P7', 'Test results from P11', 'DR plan from A12', 'Go-live checklist'],
  activities: ['Deploy to production in shadow mode; validate shadow performance; switch to canary; validate canary; switch to full production; confirm monitoring active; issue go-live communication'],
  methods: ['Shadow mode deployment', 'Canary deployment (5% → 25% → 100% traffic)', 'Go-live checklist', 'Rollback procedure'],
  tools: ['Deployment pipeline from P7', 'Traffic management (load balancer / service mesh)', 'Go-live checklist'],
  outputs: ['AI system deployed to production (full activation)', 'Go-live validation report', 'Monitoring confirmed active in production'],
  deliverables: ['Go-Live Deployment Report (Phase 4 Deliverable)'],
  exit_criteria: ['Shadow mode performance matches staging; canary validation passed; full production active; monitoring confirmed; go-live communication sent; rollback procedure tested and documented'],
  related_phases: ['phase-3'],
  children: [
    sa('p4-p12-sa1', 'Deploy to Production',
      'Execute the controlled deployment sequence from shadow mode to full production activation.',
      'Controlled deployment sequences are not slowness — they are the difference between a successful go-live and an incident.',
      [task('p4-p12-sa1-t1', 'Execute Go-Live Deployment', 'Deploy using shadow → canary → full production sequence.',
        ['Deployment pipeline from P7', 'Test results from P11', 'DR plan from A12'],
        eg('p4-p12-sa1-t1-eg', 'EG: Production Deployment Sequence',
          'Execute deployment sequence: (1) Pre-deployment checklist — confirm: all P11 tests passing; monitoring operational; rollback procedure documented and tested in staging; go-live communication drafted; Incident Response team briefed; Business Owner and Executive Sponsor notified of go-live window. (2) Shadow mode deployment — deploy AI system to production infrastructure but route all requests to existing process (human-only) as the decision; AI system runs in parallel generating recommendations that are logged but not consumed by users; run shadow mode for minimum 5 business days; compare shadow recommendations to human decisions: if divergence > 20% investigate before proceeding. (3) Canary deployment — switch 5% of traffic to AI-assisted mode; monitor for 48 hours: error rate, latency, override rate, model performance; if all metrics nominal → increase to 25% for 48 hours; if nominal → increase to 100%. (4) Full production activation — switch all traffic to AI-assisted mode; confirm: all monitoring dashboards active; all alerts configured; audit logging streaming; override mechanism operational. (5) Post go-live monitoring period — elevated monitoring for first 7 days: AI Product Owner reviews model performance dashboard daily; any SLO breach triggers P1 incident response. (6) Go-live communication — send stakeholder communication per G7 plan announcing go-live and user guidance.',
          ['1. Complete pre-deployment checklist.', '2. Deploy in shadow mode and monitor for 5 business days.', '3. Execute canary deployment sequence (5% → 25% → 100%).', '4. Activate full production and confirm all monitoring.', '5. Run elevated monitoring for 7 days post go-live.', '6. Send go-live communication per G7 plan.'],
          ['Production deployment complete', 'Go-live validation report', 'Go-live communication sent'])
      )])
  ],
}

// ─── P13: Training Delivery ───────────────────────────────────────────

const P13: AISANode = {
  id: 'p4-p13', type: 'activity', level: 2,
  title: 'P13 — Training Delivery',
  description: 'Deliver the role-based training programme designed in G9 — ensuring all users, team leads, AI Product Owner, and IT Operations are trained before go-live.',
  purpose: 'Ensure every person who interacts with the AI system has the knowledge and skills their role requires before they are exposed to it in production.',
  why_it_matters: 'EU AI Act Art. 16(g) and Art. 26(6) require providers and deployers to ensure staff can oversee AI systems. Training delivery is where this obligation becomes operational — not the training design.',
  inputs: ['Training Programme Design from G9', 'Human Oversight UI from P9', 'Human Override Procedure from G8'],
  activities: ['Deliver role-based training to all user groups before go-live; collect completion evidence; conduct knowledge assessment; record completion in training register'],
  methods: ['Blended training delivery (e-learning + workshop)', 'Completion tracking', 'Knowledge assessment', 'Training register maintenance'],
  tools: ['LMS or equivalent for completion tracking', 'Knowledge assessment tool'],
  outputs: ['Training delivered to all role groups', 'Completion evidence collected', 'Training register updated'],
  deliverables: ['Training Delivery Report (Phase 4 Deliverable)'],
  exit_criteria: ['100% completion rate for direct users before go-live; completion evidence in training register; knowledge assessment average score ≥ 80%; Business Owner confirms training adequate'],
  related_phases: ['phase-2'],
  children: [
    sa('p4-p13-sa1', 'Deliver Role-Based Training',
      'Execute all G9 training modules and collect completion evidence before go-live.',
      'Training designed but not delivered leaves staff without the skills to oversee AI responsibly. Training delivery is the conversion of governance planning into governance capability.',
      [task('p4-p13-sa1-t1', 'Execute Training Programme', 'Deliver training, run assessments, and record completion.',
        ['Training Programme from G9', 'Human Oversight UI from P9', 'Override Procedure from G8'],
        eg('p4-p13-sa1-t1-eg', 'EG: Training Delivery Execution',
          'Deliver training per G9 programme: (1) End-user training — AI literacy fundamentals (what the system does and does not do; known limitations); how to use the system (hands-on with the Human Oversight UI built in P9); when and how to override (walk through the override dialog); Acceptable Use Policy briefing; expected duration: 2 hours; format: blended (1 hour e-learning + 1 hour facilitated workshop with the actual system). (2) Team lead training — all end-user content plus: performance monitoring responsibilities; how to read the model performance dashboard; escalation procedure when a team member reports a systematic error; expected duration: 3 hours. (3) AI Product Owner training — governance obligations, EU AI Act compliance responsibilities, attestation process, incident response role; expected duration: 4 hours. (4) IT Operations training — system monitoring procedures, incident response procedures, rollback procedure, logging access; expected duration: 3 hours. (5) Completion tracking — register each attendee in training register with: name, role, training module, completion date, assessment score; minimum pass score 80%; retake permitted for failed assessments. (6) Confirm 100% completion rate for direct users before go-live date. Any incomplete training is a go-live blocker.',
          ['1. Deliver end-user training module.', '2. Deliver team lead training module.', '3. Deliver AI Product Owner training.', '4. Deliver IT Operations training.', '5. Run knowledge assessments and record scores.', '6. Confirm 100% completion and sign off with Business Owner.'],
          ['Training delivery report with completion evidence', 'Training register updated', 'Business Owner sign-off on training adequacy'])
      )])
  ],
}

// ─── P14: Audit and Compliance Validation ────────────────────────────

const P14: AISANode = {
  id: 'p4-p14', type: 'activity', level: 2,
  title: 'P14 — Audit and Compliance Validation',
  description: 'Conduct a pre-deployment compliance validation confirming that the implemented AI system meets all EU AI Act obligations, GDPR requirements, and governance framework commitments.',
  purpose: 'Provide documented assurance before go-live that the system is compliant with all applicable obligations.',
  why_it_matters: 'EU AI Act High Risk systems require documented conformity assessment before deployment. Discovering a compliance gap in production — after users are relying on the system — requires an incident-level response and potential system suspension. Pre-deployment validation catches gaps while correction is less costly.',
  inputs: ['EU AI Act Compliance Plan from G1', 'GDPR Assessment and Privacy Controls from G2', 'Audit Framework from G10', 'Logging Specification from G10', 'All Phase 4 implementation evidence'],
  activities: ['Validate EU AI Act obligations implemented; validate GDPR controls implemented; validate logging and audit trail operational; produce compliance validation report'],
  methods: ['Compliance checklist review', 'Technical control verification', 'Audit log sampling', 'DPO and Legal review'],
  tools: ['EU AI Act compliance checklist (from G1)', 'GDPR control verification checklist', 'Audit log inspection'],
  outputs: ['Pre-Deployment Compliance Validation Report', 'Audit trail sampling report', 'DPO sign-off for GDPR compliance', 'Legal sign-off for EU AI Act compliance'],
  deliverables: ['Compliance Validation Report (Phase 4 Deliverable)', 'DPO and Legal Sign-Off'],
  exit_criteria: ['All EU AI Act obligations confirmed implemented; all GDPR controls verified; audit logging operational and sampling shows correct event capture; DPO has signed off GDPR compliance; Legal has confirmed EU AI Act conformity'],
  related_phases: ['phase-2'],
  children: [
    sa('p4-p14-sa1', 'Validate Compliance Before Deployment',
      'Conduct pre-deployment compliance check against EU AI Act, GDPR, and governance framework.',
      'Pre-deployment compliance validation is cheaper than post-deployment remediation by an order of magnitude. It is the last affordable quality gate.',
      [task('p4-p14-sa1-t1', 'Conduct Compliance Validation', 'Verify all compliance obligations are implemented and obtain DPO and Legal sign-off.',
        ['G1 Compliance Plan', 'G2 GDPR Assessment', 'G10 Logging Spec', 'Phase 4 implementation evidence'],
        eg('p4-p14-sa1-t1-eg', 'EG: Pre-Deployment Compliance Validation',
          'Validate in four areas: (1) EU AI Act obligations — for each obligation in the G1 compliance plan: confirm implemented with evidence reference. Key obligations: risk management system documented and operational (Art. 9); data governance implemented in data pipeline (Art. 10); technical documentation complete (Art. 11 — confirm specification documents are maintained); logging and record-keeping operational (Art. 12 — spot-check audit logs for mandatory events); transparency information prepared (Art. 13 — confirm disclosure badge and system information page deployed); human oversight mechanisms implemented (Art. 14 — confirm override mechanism operational and logged); accuracy and robustness validated (Art. 15 — confirm load test results and adversarial test results on file). (2) GDPR controls — for each control in the G2 privacy controls specification: confirm implemented; spot-check: retrieve a data record and confirm it has been minimised per G2; confirm DPIA updated to reflect final implementation. (3) Audit trail — sample 50 audit log events from each mandatory event category; confirm format matches G10 spec; confirm retention policy applied; confirm immutability controls active. (4) Produce Compliance Validation Report — findings: compliant / gap found; for each gap: severity (blocking / advisory) and resolution; obtain DPO signature for GDPR compliance; obtain Legal sign-off for EU AI Act conformity.',
          ['1. Complete EU AI Act compliance checklist with evidence.', '2. Verify GDPR controls with spot checks.', '3. Sample and validate audit log events.', '4. Produce Compliance Validation Report.', '5. Obtain DPO and Legal sign-off.'],
          ['Pre-Deployment Compliance Validation Report', 'DPO sign-off', 'Legal sign-off'])
      )])
  ],
}

// ─── P15: Phase 4 Close-Out and Operations Handover ──────────────────

const P15: AISANode = {
  id: 'p4-p15', type: 'activity', level: 2,
  title: 'P15 — Phase 4 Close-Out and Operations Handover',
  description: 'Complete the AISA methodology delivery by formally closing Phase 4, handing over the AI system to operational teams, and establishing the ongoing governance cadence.',
  purpose: 'Transition the AI system from delivery mode to operations mode with all documentation, procedures, and governance rhythms in place.',
  why_it_matters: 'AI systems that are not formally handed over to operations are not handed over at all — they exist in a governance no-man\'s land where the delivery team has moved on and the operational team does not know what it is responsible for. The handover is what makes AI operations sustainable.',
  inputs: ['All Phase 4 deliverables', 'Governance Framework from G6', 'Monitoring platform from P10', 'Operations runbook'],
  activities: ['Produce operations runbook; conduct IT Operations handover; establish governance cadence (monthly review, quarterly audit); capture lessons learned; archive project deliverables; obtain Executive Sponsor close-out sign-off'],
  methods: ['Operations runbook documentation', 'Handover briefing', 'Governance calendar setup', 'Lessons learned session', 'Deliverable archival'],
  tools: ['Operations runbook template', 'Project archive', 'Governance calendar'],
  outputs: ['Operations Runbook', 'IT Operations handover complete', 'Governance calendar established', 'Lessons learned documented', 'All deliverables archived', 'Project close-out sign-off'],
  deliverables: ['Operations Runbook (Phase 4 Final Deliverable)', 'Project Close-Out Report', 'Executive Sponsor Sign-Off'],
  exit_criteria: ['Operations Runbook complete and accepted by IT Ops team; governance calendar with monthly review and quarterly audit established; lessons learned documented; all deliverables archived; Executive Sponsor has signed project close-out'],
  related_phases: ['phase-2', 'phase-3'],
  children: [
    sa('p4-p15-sa1', 'Close Out Phase 4 and Hand Over to Operations',
      'Complete all close-out activities and establish the ongoing operational governance model.',
      'The quality of the handover determines whether the AI system is operated or merely maintained. A thorough handover is the last investment in the system\'s long-term governance.',
      [task('p4-p15-sa1-t1', 'Produce Runbook and Execute Handover', 'Write the operations runbook, brief IT Ops, and establish the governance calendar.',
        ['All Phase 4 deliverables', 'Governance Framework from G6', 'Monitoring platform from P10'],
        eg('p4-p15-sa1-t1-eg', 'EG: Operations Handover and Project Close-Out',
          'Execute close-out in sequence: (1) Operations Runbook — document: system architecture overview (one-page diagram); startup and shutdown procedures; routine operational tasks (daily checks, weekly reporting); incident response procedures (for each incident type from G5: first response, escalation path, recovery steps); monitoring guide (which dashboard to consult for which question; which alert means what); model retraining procedure (when and how to trigger); backup verification procedure (monthly); access management procedure (how to add/remove users). (2) IT Operations handover — conduct 4-hour handover session with IT Ops team: walk through runbook; demonstrate monitoring dashboards; simulate an incident scenario and walk through response; confirm IT Ops team lead has accepted handover in writing. (3) Governance cadence — set up recurring calendar items: monthly AI Governance Review (AI Product Owner + Business Owner + DPO): model performance review, override rate review, risk register review; quarterly AI Audit (Audit Lead + AI Product Owner): governance adherence check, logging compliance sample, performance vs. targets; annual Compliance Attestation (AI Product Owner + Legal): EU AI Act compliance re-confirmation, DPIA review, training refresh. (4) Lessons learned — conduct retrospective with project team: what worked well (repeat in future initiatives), what should be done differently, what governance framework improvements should be captured; submit improvements to the AISA framework owner. (5) Archive deliverables — store all project deliverables in the approved governance repository with version and date. (6) Executive Sponsor close-out — brief Sponsor on: final system state, compliance status, ongoing governance model; obtain written project close-out sign-off.',
          ['1. Write Operations Runbook covering all procedures.', '2. Conduct IT Operations handover session and obtain written acceptance.', '3. Set up governance calendar with monthly, quarterly, and annual cadence.', '4. Conduct lessons learned retrospective.', '5. Archive all project deliverables.', '6. Obtain Executive Sponsor close-out sign-off.'],
          ['Operations Runbook', 'IT Ops handover acceptance', 'Governance calendar established', 'Lessons learned document', 'Project Close-Out Report', 'Executive Sponsor sign-off'])
      )])
  ],
}

// ─── PHASE 4 NODE ─────────────────────────────────────────────────────

export const PHASE_4: AISANode = {
  id: 'phase-4', type: 'phase', level: 1,
  title: 'Phase 4 — Platform & Data Foundation',
  description: 'The implementation phase of the AISA methodology. Builds and deploys the AI system from the validated architecture — provisioning infrastructure, implementing security and data pipelines, training and deploying models, and establishing operational governance.',
  purpose: 'Convert the Phase 3 architecture into a running, compliant, monitored AI system operated by trained staff within an established governance cadence.',
  why_it_matters: 'Phase 4 is where design becomes reality. The quality of Phase 4 implementation determines whether the governance work of Phase 2 and the design work of Phase 3 produce a responsible AI system or merely documentation of the intent to build one.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Phase 3 Architecture Package (A1–A12 specifications)', 'Phase 3 Architecture Validation Report', 'Phase 4 Build Authorisation from A13', 'Phase 2 Governance Pack'],
  activities: [
    'P1 — Infrastructure Provisioning: provision all environments as IaC',
    'P2 — Security Controls Implementation: deploy all A6 security controls',
    'P3 — Data Ingestion Pipeline: build and validate all data source connectors',
    'P4 — Data Transformation and Feature Engineering: build feature pipeline and populate feature store',
    'P5 — Model Development: train, evaluate (performance + fairness), and register models',
    'P6 — Explainability Implementation: deploy explanation API per G3 requirements',
    'P7 — MLOps Pipeline: build automated training, evaluation, deployment, and monitoring pipeline',
    'P8 — API and Integration Development: implement integration layer with circuit breakers',
    'P9 — Human Oversight UI: build oversight-first UI with override logging',
    'P10 — Monitoring and Observability: deploy monitoring platform with four audience dashboards',
    'P11 — Testing and Quality Assurance: comprehensive testing including AI-specific test types',
    'P12 — Deployment and Go-Live: controlled shadow → canary → full production deployment',
    'P13 — Training Delivery: deliver role-based training to all user groups before go-live',
    'P14 — Audit and Compliance Validation: pre-deployment compliance check with DPO and Legal sign-off',
    'P15 — Phase 4 Close-Out and Operations Handover: runbook, handover, governance cadence, close-out',
  ],
  outputs: [
    'Provisioned infrastructure (IaC)', 'Security controls deployed', 'Data ingestion pipeline', 'Feature engineering pipeline and feature store', 'Trained and registered models', 'Explanation API', 'MLOps pipeline', 'Integration layer', 'Human oversight UI', 'Monitoring platform', 'Test suite and test reports', 'Go-live deployment', 'Training delivery report', 'Compliance validation report', 'Operations runbook', 'Project close-out',
  ],
  deliverables: [
    'Provisioned Infrastructure (P1)', 'Security Controls Implementation Report (P2)', 'Data Ingestion Pipeline (P3)', 'Feature Engineering Pipeline and Feature Store (P4)', 'Model Development and Evaluation Report (P5)', 'Explainability Implementation (P6)', 'MLOps Pipeline (P7)', 'API and Integration Layer (P8)', 'Human Oversight UI (P9)', 'Monitoring and Observability Platform (P10)', 'Testing and QA Report + UAT Sign-Off (P11)', 'Go-Live Deployment Report (P12)', 'Training Delivery Report (P13)', 'Compliance Validation Report + DPO/Legal Sign-Off (P14)', 'Operations Runbook + Project Close-Out + Executive Sponsor Sign-Off (P15)',
  ],
  exit_criteria: [
    'All P1–P14 activities completed with exit criteria met',
    'AI system live in production with monitoring active',
    'All users trained with 100% completion before go-live',
    'Compliance validation completed with DPO and Legal sign-off',
    'Operations Runbook accepted by IT Ops team',
    'Governance cadence established with monthly, quarterly, and annual review scheduled',
    'Executive Sponsor has signed project close-out',
  ],
  related_phases: ['phase-3'],
  children: [P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, P11, P12, P13, P14, P15],
}
