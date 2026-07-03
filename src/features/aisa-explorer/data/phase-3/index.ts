import type { AISANode } from '@/types/aisa'

// Phase 3 — Architecture Design (A1–A13)
// Each activity defined inline for compactness — the full bottom-up pattern is used
// but content is concise to keep the file manageable.

function makeEG(id: string, title: string, description: string, methods: string[], outputs: string[]): AISANode {
  return { id, type: 'execution-guide', level: 5, title, description, purpose: description, methods, outputs, exit_criteria: [`${title} complete and architecture lead reviewed`] }
}
function makeTask(id: string, title: string, description: string, inputs: string[], eg: AISANode): AISANode {
  return { id, type: 'task', level: 4, title, description, purpose: description, inputs, methods: [eg.title], outputs: eg.outputs ?? [], children: [eg] }
}
function makeSA(id: string, title: string, description: string, why: string, tasks: AISANode[]): AISANode {
  return { id, type: 'sub-activity', level: 3, title, description, purpose: description, why_it_matters: why, inputs: [], outputs: tasks.flatMap(t => t.outputs ?? []), children: tasks }
}

// ─── A1: AI Architecture Principles ──────────────────────────────────

const A1: AISANode = {
  id: 'p3-a1', type: 'activity', level: 2,
  title: 'A1 — AI Architecture Principles',
  description: 'Establish the AI-specific architecture principles that govern all design decisions in Phase 3 — translating AISA methodology principles into concrete, enforceable architectural rules.',
  purpose: 'Create the decision framework that keeps all Phase 3 architecture choices consistent, defensible, and aligned to governance requirements.',
  why_it_matters: 'Architecture principles are the constitution of the architecture — they resolve disputes, constrain scope, and keep design decisions aligned to intent. Without them, individual architects make decisions from different frames of reference, producing an incoherent whole.',
  inputs: ['Phase 2 Governance Pack', 'Phase 3 Architecture Requirements Summary', 'AISA methodology principles'],
  activities: ['Define and ratify architecture principles covering simplicity, compliance by design, human oversight primacy, data minimisation, modularity, and observability'],
  methods: ['Architecture principles derivation from governance requirements', 'Team review and ratification', 'Principle application to existing design constraints'],
  tools: ['Architecture principles template'],
  outputs: ['Architecture Principles Document: 8–12 ratified principles with application guidance'],
  deliverables: ['Architecture Principles Document (Phase 3 Deliverable)'],
  exit_criteria: ['8–12 principles defined with governance traceability; ratified by Architecture Lead and AI Product Owner'],
  related_phases: ['phase-2'],
  children: [
    makeSA('p3-a1-sa1', 'Derive Architecture Principles', 'Translate governance and methodology requirements into enforceable architecture principles.',
      'Architecture without principles is a series of individual decisions that may be locally rational but globally incoherent.',
      [makeTask('p3-a1-sa1-t1', 'Draft Architecture Principles', 'Derive and document 8–12 architecture principles from governance and methodology inputs.',
        ['Phase 2 Governance Pack', 'AISA principles'],
        makeEG('p3-a1-sa1-t1-eg', 'EG: Architecture Principles Derivation',
          'Translate AISA principles and governance requirements into 8–12 concrete architecture principles covering: Simplicity First (minimum viable complexity); Compliance by Design (governance requirements are architecture requirements); Human Oversight Primacy (UI and workflow design must make oversight easy); Data Minimisation by Default; Modularity (components replaceable without system redesign); Observability by Design (logging, monitoring, and explainability built in, not bolted on); Fail Safely (graceful degradation to human-only); and Vendor Independence (no single-vendor lock-in for critical AI capabilities).',
          ['1. For each AISA principle, derive the architecture implication.', '2. For each governance requirement from G1–G10, derive the architecture rule it imposes.', '3. Draft principle statements in the form: "We will X so that Y."', '4. Review with Phase 3 architecture team and AI Product Owner.', '5. Ratify and store as controlled document v1.0.'],
          ['Architecture Principles Document v1.0 ratified'])
      )])
  ],
}

// ─── A2: Solution Architecture Design ────────────────────────────────

const A2: AISANode = {
  id: 'p3-a2', type: 'activity', level: 2,
  title: 'A2 — Solution Architecture Design',
  description: 'Design the high-level solution architecture: the major components, their responsibilities, the data flows between them, and the boundaries of the AI system.',
  purpose: 'Produce the authoritative system context diagram and high-level architecture that all Phase 3 detailed design activities reference.',
  why_it_matters: 'The solution architecture is the map of the system. Without it, detailed design activities in A3–A12 operate without a shared view of the whole — producing components that do not integrate correctly.',
  inputs: ['Architecture Principles from A1', 'Process Map from D4', 'Technical constraints from D8', 'Phase 2 Governance Pack'],
  activities: ['Produce system context diagram; define major components and responsibilities; design data flow diagrams; validate against constraints'],
  methods: ['C4 model (Context, Container, Component, Code) for architectural documentation', 'Data flow diagram design', 'Constraint validation'],
  tools: ['Architecture diagramming tool (draw.io, Miro, or Lucidchart)', 'C4 model templates'],
  outputs: ['System Context Diagram', 'High-Level Solution Architecture', 'Data Flow Diagrams', 'Component Responsibility Matrix'],
  deliverables: ['Solution Architecture Document v1.0 (Phase 3 Deliverable)'],
  exit_criteria: ['Context diagram shows all external actors and systems; component responsibilities defined; data flows cover all sources and consumers; constraints validated'],
  related_phases: ['phase-2', 'phase-4'],
  children: [
    makeSA('p3-a2-sa1', 'Design Solution Architecture', 'Produce the high-level architecture covering components, data flows, and system context.',
      'The solution architecture is the coordination mechanism for all Phase 3 detailed design work.',
      [makeTask('p3-a2-sa1-t1', 'Produce System Context and Architecture', 'Design system context, high-level architecture, and data flow diagrams.',
        ['Architecture Principles from A1', 'Process map from D4', 'Technical constraints from D8'],
        makeEG('p3-a2-sa1-t1-eg', 'EG: Solution Architecture Design',
          'Use the C4 model: Level 1 (System Context) — the AI system and all external actors/systems it interacts with. Level 2 (Container) — the major deployable units: data ingestion pipeline, feature store, model serving API, human oversight UI, logging and monitoring infrastructure, admin console. For each container define: responsibility, technology, owner, and the data flows entering and leaving it. Validate all data flows against the lawful basis register from G2 and privacy controls from G2.',
          ['1. Draw the L1 context diagram showing the AI system boundary and all external actors.', '2. Draw the L2 container diagram showing major deployable components.', '3. For each container, produce a responsibility statement and technology choice (constrained by D8 technical constraints).', '4. Draw data flow diagrams for the main process flows.', '5. Validate: all data flows have a confirmed lawful basis; all security control requirements from G5 are assigned to a component.'],
          ['System Context Diagram', 'Container Diagram', 'Data Flow Diagrams', 'Component Responsibility Matrix'])
      )])
  ],
}

// ─── A3: AI Model Architecture ────────────────────────────────────────

const A3: AISANode = {
  id: 'p3-a3', type: 'activity', level: 2,
  title: 'A3 — AI Model Architecture',
  description: 'Design the AI model architecture for each AI use case — selecting model types, defining training strategies, specifying explainability mechanisms, and confirming compatibility with decision acceptance criteria.',
  purpose: 'Produce model architecture specifications that satisfy both technical performance requirements and governance constraints before model development begins in Phase 4.',
  why_it_matters: 'Model architecture decisions are among the hardest to reverse in Phase 4. An architecture that cannot meet the explainability requirements, cannot be trained on available data, or cannot run within the approved infrastructure must be redesigned — at full rebuild cost.',
  inputs: ['Decision Classification Matrix from D7', 'Decision Acceptance Criteria from D7', 'AI Data Feasibility Matrix from D6', 'Explainability Requirements from G3', 'Technical constraints from D8'],
  activities: ['Select model type per use case; specify training strategy; design explainability mechanism; validate against acceptance criteria and governance constraints'],
  methods: ['Decision type to model pattern mapping', 'Training strategy design', 'Explainability method selection (SHAP, LIME, counterfactuals)', 'Constraint validation'],
  tools: ['Model architecture specification template', 'Explainability method comparison guide'],
  outputs: ['Model Architecture Specification per use case: model type, training strategy, explainability mechanism, data requirements, performance targets'],
  deliverables: ['AI Model Architecture Specifications (Phase 3 Deliverable)'],
  exit_criteria: ['Model type selected per use case with justification; explainability mechanism compatible with G3 requirements; training strategy feasible given D6 data availability'],
  related_phases: ['phase-2', 'phase-4'],
  children: [
    makeSA('p3-a3-sa1', 'Design Model Architecture per Use Case', 'Select model types, training strategies, and explainability mechanisms for each AI use case.',
      'Model type selection that ignores governance constraints produces architectures that are technically optimal but governance-non-compliant.',
      [makeTask('p3-a3-sa1-t1', 'Specify Model Architecture', 'Produce the model architecture specification for each use case.',
        ['Decision Classification Matrix from D7', 'Explainability Requirements from G3', 'AI Data Feasibility from D6'],
        makeEG('p3-a3-sa1-t1-eg', 'EG: Model Architecture Specification',
          'For each AI use case: (1) Confirm the decision classification (D7) and select the matching model pattern: rule-based → decision engine; scoring → logistic regression or gradient boosting; classification → random forest, XGBoost, or fine-tuned transformer; NLP → pre-trained LLM with RAG or fine-tuning; generative → constrained LLM with output guardrails. (2) Specify the training strategy: training data source, label source, train/validation/test split, retraining trigger. (3) Select the explainability mechanism from G3 requirements — must match required depth. (4) Confirm the model can achieve the D9 performance targets given D6 data quality and volume. (5) Document: model spec sheet per use case.',
          ['1. Map each use case to a model pattern from the decision classification.', '2. Select the specific algorithm or model family within that pattern.', '3. Specify the training strategy including data split and retraining trigger.', '4. Select the explainability mechanism and confirm it produces the required explanation depth.', '5. Validate performance achievability given data quality and volume from D6.'],
          ['Model Architecture Specification per use case'])
      )])
  ],
}

// ─── A4: Data Architecture ────────────────────────────────────────────

const A4: AISANode = {
  id: 'p3-a4', type: 'activity', level: 2,
  title: 'A4 — Data Architecture',
  description: 'Design the data architecture that stores, transforms, and serves data to the AI models — covering the data layer, feature store, and serving infrastructure.',
  purpose: 'Produce the data architecture that enables reliable, governed, and performant data supply to AI models throughout training, validation, and inference.',
  why_it_matters: 'Data architecture is the most critical and most underinvested layer in AI systems. A model is only as good as its data supply. Data architecture that cannot handle volume, does not enforce quality, and does not implement privacy controls produces an unreliable AI system regardless of model quality.',
  inputs: ['Data Landscape Assessment from D6', 'Privacy Controls from G2', 'Technical constraints from D8', 'Volume profile from D2', 'Model Architecture from A3'],
  activities: ['Design data ingestion layer; design feature store; design data governance and quality controls in the pipeline; design data serving for inference'],
  methods: ['Data flow architecture design', 'Feature store design (online/offline)', 'Data quality gate design', 'Privacy control implementation mapping'],
  tools: ['Data architecture design template', 'Feature store technology evaluation matrix'],
  outputs: ['Data Architecture Specification: ingestion, transformation, feature store, serving, and governance layer design'],
  deliverables: ['Data Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['All data sources from D6 are handled by the ingestion layer; privacy controls from G2 are implemented at the data layer; feature store design meets latency requirements'],
  related_phases: ['phase-2', 'phase-4'],
  children: [
    makeSA('p3-a4-sa1', 'Design Data Architecture', 'Design the ingestion, transformation, feature store, and serving layers.',
      'Data architecture is the AI system\'s foundation — its quality determines model reliability, privacy compliance, and operational stability.',
      [makeTask('p3-a4-sa1-t1', 'Produce Data Architecture Specification', 'Design all data layers from ingestion to serving.',
        ['Data Landscape Assessment from D6', 'Privacy Controls from G2', 'Volume profile from D2'],
        makeEG('p3-a4-sa1-t1-eg', 'EG: Data Architecture Design',
          'Design five layers: (1) Ingestion — connectors per data source from D6 (API, batch file, CDC, stream); schedule or trigger; format normalisation; initial validation against quality rules from D6. (2) Transformation — cleansing, deduplication, enrichment; data quality gates with fail/warn/pass actions; privacy control application (minimisation, pseudonymisation, encryption). (3) Feature Store — offline store for training (columnar, versioned); online store for inference (low-latency key-value); feature registry with lineage and ownership. (4) Serving — batch prediction pipeline and/or real-time inference API; feature retrieval from online store; output logging to audit log (logging spec from G10). (5) Governance layer — data access audit logging; retention enforcement; deletion event handling.',
          ['1. Design ingestion connectors for each D6 data source.', '2. Design transformation pipeline with quality gates.', '3. Select feature store technology (Feast, Tecton, or custom); design online/offline split.', '4. Design serving pipeline to meet D9 latency SLOs.', '5. Map each G2 privacy control to its implementation point in the pipeline.'],
          ['Data Architecture Specification with all five layers'])
      )])
  ],
}

// ─── A5: Integration Architecture ────────────────────────────────────

const A5: AISANode = {
  id: 'p3-a5', type: 'activity', level: 2,
  title: 'A5 — Integration Architecture',
  description: 'Design the integration architecture connecting the AI system to upstream data sources and downstream consuming systems.',
  purpose: 'Produce integration designs that are secure, performant, and robust — ensuring the AI system operates reliably within the existing technology landscape.',
  why_it_matters: 'AI systems that are not integrated correctly into the technology landscape become isolated islands of intelligence that users work around rather than with. Integration architecture determines whether the AI system\'s outputs reach the people and processes that can act on them.',
  inputs: ['Technical constraints from D8 (approved protocols, integration SLAs)', 'Handoff map from D4', 'Solution Architecture from A2', 'Security Control Spec from G5'],
  activities: ['Design API specifications for each integration point; design error handling and retry logic; design integration security controls'],
  methods: ['API-first integration design', 'OpenAPI specification', 'Error handling and circuit breaker pattern', 'Mutual TLS and API key management'],
  tools: ['API design tool (Stoplight, Swagger)', 'Integration architecture template'],
  outputs: ['Integration Architecture: API specifications, error handling patterns, security controls per integration point'],
  deliverables: ['Integration Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['All integration points from D4 handoff map are designed; API specs produced; security controls assigned per integration point'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a5-sa1', 'Design Integration Architecture', 'Produce API specifications and integration patterns for all upstream and downstream systems.',
      'Integration architecture failures are the most visible AI system failures — they manifest as data not arriving, outputs not being consumed, and integrations that fail under load.',
      [makeTask('p3-a5-sa1-t1', 'Produce Integration Specifications', 'Design APIs and error handling for all integration points.',
        ['Technical constraints from D8', 'Handoff map from D4', 'Security Control Spec from G5'],
        makeEG('p3-a5-sa1-t1-eg', 'EG: Integration Architecture Design',
          'For each integration point from the D4 handoff map: (1) Define the integration pattern: synchronous REST API (for real-time, latency-sensitive); async message queue (for high-volume, decoupled); batch file transfer (for legacy systems or large volumes); event stream (for real-time monitoring feeds). (2) Produce an OpenAPI specification for each REST API: endpoints, request/response schemas, error codes, rate limits. (3) Design error handling: idempotent retries, circuit breaker pattern (trip after N failures), dead-letter queue for failed messages, alerting on trip. (4) Apply security controls from G5: mTLS between internal services, API key + OAuth2 for external consumers, payload encryption for sensitive data.',
          ['1. List all integration points from D4 handoff map and Solution Architecture.', '2. Select integration pattern per point.', '3. Produce OpenAPI spec for each REST API.', '4. Design error handling, retry, and circuit breaker for each integration.', '5. Map G5 security controls to each integration.'],
          ['Integration Architecture Specification with API specs and security mapping'])
      )])
  ],
}

// ─── A6: Security Architecture ────────────────────────────────────────

const A6: AISANode = {
  id: 'p3-a6', type: 'activity', level: 2,
  title: 'A6 — Security Architecture',
  description: 'Design the security architecture that implements all security controls from G5 across the AI system components — protecting against both traditional IT threats and AI-specific attacks.',
  purpose: 'Produce a security architecture that addresses the full AI threat surface identified in Phase 2 and satisfies EU AI Act Art. 15 cybersecurity requirements.',
  why_it_matters: 'Security architecture designed without reference to the AI threat model will address traditional IT security while leaving AI-specific attack surfaces (adversarial inputs, prompt injection, model theft) unprotected. G5\'s security control specification must be implemented at the architectural level.',
  inputs: ['Security Control Specification from G5', 'AI Threat Model from G5', 'Solution Architecture from A2', 'Privacy Controls from G2'],
  activities: ['Design identity and access management; design network security zones; design AI-specific controls (input validation, output filtering, adversarial monitoring); design encryption scheme'],
  methods: ['Zero-trust network design', 'Defence-in-depth layering', 'AI-specific control implementation design', 'Encryption-at-rest and in-transit specification'],
  tools: ['Security architecture template', 'NIST CSF control mapping'],
  outputs: ['Security Architecture: IAM design, network zone design, AI-specific controls, encryption specification'],
  deliverables: ['Security Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['All G5 security controls assigned to architecture components; AI-specific controls designed; encryption scheme covers all data classes'],
  related_phases: ['phase-2', 'phase-4'],
  children: [
    makeSA('p3-a6-sa1', 'Design Security Architecture', 'Implement all G5 security controls in the system architecture.',
      'Security controls that are not designed into the architecture will not be consistently implemented in Phase 4 — they will be ad-hoc additions that leave gaps.',
      [makeTask('p3-a6-sa1-t1', 'Produce Security Architecture Specification', 'Design IAM, network zones, AI-specific controls, and encryption.',
        ['Security Control Spec from G5', 'Solution Architecture from A2'],
        makeEG('p3-a6-sa1-t1-eg', 'EG: Security Architecture Design',
          'Design five security architecture layers: (1) IAM — RBAC for all AI system roles (data scientist, model deployer, operator, auditor, admin); principle of least privilege; MFA for all privileged roles; just-in-time access for production model access. (2) Network security — zone segmentation (training zone, inference zone, management zone, audit zone); WAF for external-facing APIs; private endpoints for internal model serving. (3) AI-specific controls — input validation service (schema enforcement, anomaly detection on inputs); output filtering (confidence thresholding, prohibited content detection for generative models); prompt injection defence for LLM endpoints. (4) Encryption — AES-256 at rest for training data, model weights, and logs; TLS 1.3 in transit; key management via HSM or cloud KMS; model weight signing to prevent tampering. (5) Audit logging integration — all security events to immutable audit log (from G10 logging spec).',
          ['1. Design IAM roles and permissions matrix.', '2. Design network security zones and segmentation.', '3. Design each AI-specific security control.', '4. Define encryption scheme per data class.', '5. Map all controls to G5 security control specification to confirm coverage.'],
          ['Security Architecture Specification covering all five layers'])
      )])
  ],
}

// ─── A7: Infrastructure Architecture ─────────────────────────────────

const A7: AISANode = {
  id: 'p3-a7', type: 'activity', level: 2,
  title: 'A7 — Infrastructure Architecture',
  description: 'Design the compute, storage, and networking infrastructure that will host the AI system — optimised for ML workloads and constrained by technical constraints from D8.',
  purpose: 'Produce an infrastructure design that is cost-effective, performant, and compliant with data residency and security constraints.',
  why_it_matters: 'ML workloads have fundamentally different infrastructure profiles from traditional applications — training requires GPU burst capacity, inference requires low-latency serving, and data pipelines require high-throughput storage. Infrastructure designed for traditional workloads produces expensive, slow, and unreliable AI systems.',
  inputs: ['Volume profile from D2', 'Technical constraints from D8 (cloud, on-premise, data residency)', 'Performance SLOs from D9', 'Security Architecture from A6'],
  activities: ['Design compute for training and inference; design storage for data and models; design networking; produce infrastructure cost model'],
  methods: ['ML-optimised infrastructure design (GPU/TPU for training, CPU/GPU for inference)', 'Auto-scaling design', 'Infrastructure-as-code specification', 'Cost modelling'],
  tools: ['Cloud architecture templates', 'Infrastructure cost calculator', 'Terraform or Bicep (IaC)'],
  outputs: ['Infrastructure Architecture: compute, storage, networking, and scaling design with cost model'],
  deliverables: ['Infrastructure Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['Compute designed for training and inference workloads; storage meets volume and retention requirements; cost model within approved budget; data residency constraints satisfied'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a7-sa1', 'Design Infrastructure Architecture', 'Design ML-optimised compute, storage, and networking infrastructure.',
      'Infrastructure designed without understanding ML workload characteristics produces over-provisioned training infrastructure and under-provisioned inference infrastructure — simultaneously wasteful and unreliable.',
      [makeTask('p3-a7-sa1-t1', 'Produce Infrastructure Specification', 'Design compute, storage, networking, and cost model.',
        ['Volume profile from D2', 'Technical constraints from D8', 'Performance SLOs from D9'],
        makeEG('p3-a7-sa1-t1-eg', 'EG: Infrastructure Architecture Design',
          'Design: (1) Training compute — GPU instances (minimum 8xA100 or cloud equivalent) with spot/preemptible pricing for cost efficiency; auto-shutdown after training job completion; separate training VPC/subnet. (2) Inference serving — CPU instances for batch; GPU or CPU with ONNX optimisation for real-time; auto-scaling from zero (cold start acceptable for batch) to peak (constrained by D9 latency SLOs). (3) Storage — object storage for raw data and model artefacts; managed relational DB for feature store offline; managed Redis or equivalent for feature store online; separate storage account per data classification level. (4) Networking — private endpoints for all data services; egress controls aligned with data residency requirements from D8; CDN if serving model outputs to end users. (5) IaC — all infrastructure defined as code (Terraform/Bicep/CDK); no click-ops in production. (6) Cost model — estimated monthly cost for training (per run), inference (per month at average and peak), storage (at projected volume).',
          ['1. Estimate training compute requirements from model complexity (A3) and data volume (D6).', '2. Estimate inference requirements from D9 latency SLOs and D2 volume profile.', '3. Design storage tiers per data class.', '4. Design networking and confirm data residency compliance.', '5. Specify IaC tooling and patterns.', '6. Produce infrastructure cost model.'],
          ['Infrastructure Architecture Specification with cost model'])
      )])
  ],
}

// ─── A8: MLOps Architecture ───────────────────────────────────────────

const A8: AISANode = {
  id: 'p3-a8', type: 'activity', level: 2,
  title: 'A8 — MLOps Architecture',
  description: 'Design the MLOps pipeline that automates the AI model lifecycle — training, evaluation, registration, deployment, monitoring, and retraining — making model operations reliable and governed.',
  purpose: 'Produce the MLOps architecture that ensures every model change goes through a governed, tested, auditable process.',
  why_it_matters: 'AI systems without MLOps are operated by hand — models are retrained ad hoc, deployed without systematic testing, and monitored by exception. MLOps replaces this fragility with engineering discipline, making the model lifecycle reliable, reproducible, and auditable.',
  inputs: ['Model Architecture from A3', 'Data Architecture from A4', 'Governance Framework from G6 (model change control)', 'Logging Specification from G10', 'Technical constraints from D8'],
  activities: ['Design CI/CD for ML (training pipeline, evaluation gates, model registry, deployment pipeline); design monitoring and retraining automation; design model versioning and rollback'],
  methods: ['MLOps pipeline design (Kubeflow, MLflow, Vertex AI, or Azure ML)', 'Automated evaluation gate design', 'Model registry design', 'A/B testing and shadow mode deployment pattern'],
  tools: ['MLOps platform selection matrix', 'CI/CD pipeline design template', 'MLflow or equivalent for experiment tracking'],
  outputs: ['MLOps Architecture: training pipeline, evaluation gates, model registry, deployment pipeline, monitoring, and retraining design'],
  deliverables: ['MLOps Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['Training pipeline automates data ingestion to model registration; evaluation gates implement D9 acceptance criteria; retraining triggers align with D9 metrics governance'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a8-sa1', 'Design MLOps Pipeline', 'Design the end-to-end model lifecycle automation covering training, evaluation, deployment, monitoring, and retraining.',
      'MLOps is the difference between a model that was good at deployment and a model that stays good in production. Without it, model quality decays silently.',
      [makeTask('p3-a8-sa1-t1', 'Produce MLOps Architecture Specification', 'Design all MLOps pipeline stages.',
        ['Model Architecture from A3', 'Governance model change control from G6', 'D9 metrics and retraining triggers'],
        makeEG('p3-a8-sa1-t1-eg', 'EG: MLOps Architecture Design',
          'Design six pipeline stages: (1) Training pipeline — triggered by schedule, data drift detection, or manual trigger; steps: data validation → feature generation → model training → metric calculation → model registration (if metrics meet D9 threshold). (2) Evaluation gates — automated checks: performance metrics vs. D9 acceptance criteria; fairness metrics vs. G3 specifications; security scan of model artefact; if any gate fails, pipeline blocks and alerts AI Product Owner. (3) Model Registry — versioned model store with metadata: training data version, hyperparameters, evaluation results, governance approvals; no model deployed without registry entry. (4) Deployment pipeline — blue/green or canary deployment; shadow mode for initial production validation (AI runs in parallel, human decisions still primary); promotion to primary after shadow performance validated. (5) Monitoring — real-time data drift detection (statistical comparison to training distribution); model performance monitoring against D9 metrics; alert on threshold breach; auto-trigger retraining pipeline if drift exceeds threshold. (6) Retraining — same pipeline as initial training; requires governance approval for major architecture changes; auto-approved for metric-triggered retraining within same architecture.',
          ['1. Select MLOps platform (constrained by D8 technology standards).', '2. Design each pipeline stage with inputs, outputs, and failure modes.', '3. Implement D9 acceptance criteria as evaluation gate code specifications.', '4. Design model registry schema with governance metadata.', '5. Design shadow mode deployment flow.', '6. Design monitoring alert thresholds and retraining triggers.'],
          ['MLOps Architecture Specification with all six stages'])
      )])
  ],
}

// ─── A9: Human-AI Interaction Design ─────────────────────────────────

const A9: AISANode = {
  id: 'p3-a9', type: 'activity', level: 2,
  title: 'A9 — Human-AI Interaction Design',
  description: 'Design the user interface and interaction patterns that make AI outputs accessible, interpretable, and overridable — embedding human oversight into the UX rather than treating it as an afterthought.',
  purpose: 'Produce UI/UX specifications that make AI outputs trustworthy and human oversight practical rather than nominal.',
  why_it_matters: 'The most rigorous governance framework fails if the user interface does not make oversight easy to exercise. If overriding the AI requires more effort than accepting its recommendation, users will accept by default. Human oversight primacy must be designed into the interaction, not just stipulated in policy.',
  inputs: ['Human Override Procedure from G8', 'Explainability Requirements from G3', 'Decision Catalogue from D7', 'Pain Point Analysis from D5 (user workflows)', 'Accessibility standards'],
  activities: ['Design AI output presentation (with confidence and explanation); design override mechanism and documentation UI; design user notification of AI involvement; produce wireframes and interaction specifications'],
  methods: ['User-centred design', 'Wireframing', 'Interaction specification', 'Accessibility compliance (WCAG 2.1 AA)'],
  tools: ['Figma or equivalent for wireframing', 'Interaction specification template', 'Accessibility checker'],
  outputs: ['Human-AI Interaction Design: wireframes, interaction specifications, override UI, explanation display, and notification patterns'],
  deliverables: ['Human-AI Interaction Design Specification (Phase 3 Deliverable)'],
  exit_criteria: ['Override mechanism is prominent, not buried; explanation display meets G3 explainability requirements; notification of AI involvement present for all AI-driven outputs; accessibility compliance confirmed'],
  related_phases: ['phase-2'],
  children: [
    makeSA('p3-a9-sa1', 'Design Human-AI Interaction', 'Produce wireframes and specifications for AI output display, explanation, override, and notification.',
      'Interaction design is where governance policy becomes governance practice. A well-designed override UI makes human oversight effortless; a poorly designed one makes it perfunctory.',
      [makeTask('p3-a9-sa1-t1', 'Produce Interaction Design Specifications', 'Design all user-facing AI interaction patterns.',
        ['Override Procedure from G8', 'Explainability Requirements from G3', 'Decision Catalogue from D7'],
        makeEG('p3-a9-sa1-t1-eg', 'EG: Human-AI Interaction Design',
          'Design six interaction patterns: (1) AI Output Display — clearly labelled as AI-generated; confidence score or certainty indicator visible but not dominant; primary action is to review, not accept blindly. (2) Explanation Panel — expandable panel showing: which inputs most influenced the output (feature importance); what would change the output (counterfactual for classification models); plain-language summary for non-technical users. (3) Override Mechanism — prominently positioned "Override" button or option; clicking triggers the documented override procedure from G8; override logging dialog: requires entry of brief reasoning (minimum 20 characters); records user, AI recommendation, decision, reasoning, timestamp. (4) AI Involvement Notification — every AI-assisted output carries a disclosure badge or watermark; badge links to system information page explaining what the AI does and does not do (EU AI Act Art. 13 transparency requirement). (5) Confidence-based UI variants — high confidence: present AI recommendation prominently; medium: present with caution note; low: present alternative options or escalate to human review. (6) Accessibility — all elements keyboard navigable; ARIA labels on AI output components; colour contrast WCAG 2.1 AA compliant; no confidence indicators that rely on colour alone.',
          ['1. Produce wireframes for each decision type in the decision catalogue.', '2. Design explanation panel and confirm explanation depth meets G3 requirements.', '3. Design override dialog with documentation fields from G8 override procedure.', '4. Design AI disclosure badge and link to system information page.', '5. Design confidence-level UI variants.', '6. Conduct accessibility review.'],
          ['Human-AI Interaction Design Specification with wireframes'])
      )])
  ],
}

// ─── A10: Monitoring Architecture ────────────────────────────────────

const A10: AISANode = {
  id: 'p3-a10', type: 'activity', level: 2,
  title: 'A10 — Monitoring Architecture',
  description: 'Design the monitoring architecture that observes AI system health, model performance, data quality, and business metric progression in production.',
  purpose: 'Produce the monitoring design that makes post-deployment governance operationally real — turning the metrics governance plan from D9 into a live observability system.',
  why_it_matters: 'Deployed AI systems that are not monitored fail silently. Model drift, data quality degradation, and performance regression may go undetected for months without active monitoring — causing harm before anyone realises the system is failing.',
  inputs: ['Success Metrics Register from D9', 'Logging Specification from G10', 'MLOps Architecture from A8', 'SLOs from D9'],
  activities: ['Design metrics collection pipeline; design dashboards for each stakeholder audience; design alerting and notification; design model drift detection'],
  methods: ['Observability-as-code', 'Dashboard design per audience', 'Alert threshold and escalation design', 'Statistical drift detection (KL divergence, PSI)'],
  tools: ['Monitoring platform (Grafana, Datadog, or cloud-native)', 'Dashboard design templates', 'Drift detection library references (Evidently AI, Alibi Detect)'],
  outputs: ['Monitoring Architecture: metrics pipeline, dashboards per audience, alert thresholds and escalation paths, drift detection design'],
  deliverables: ['Monitoring Architecture Specification (Phase 3 Deliverable)'],
  exit_criteria: ['All D9 metrics have a collection mechanism; dashboards designed for all four governance audiences; alert thresholds set; drift detection covers data and model distribution'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a10-sa1', 'Design Monitoring Architecture', 'Produce monitoring design covering metrics pipeline, dashboards, alerting, and drift detection.',
      'Monitoring is the feedback mechanism that keeps governance active after deployment. Without it, governance is a Phase 2 exercise with no operational consequence.',
      [makeTask('p3-a10-sa1-t1', 'Produce Monitoring Architecture Specification', 'Design all monitoring components.',
        ['Success Metrics from D9', 'Logging Spec from G10', 'SLOs from D9'],
        makeEG('p3-a10-sa1-t1-eg', 'EG: Monitoring Architecture Design',
          'Design four monitoring layers: (1) System metrics — infrastructure health (CPU, memory, disk, network); API latency (P50/P95/P99 vs. D9 SLOs); error rates; availability uptime. Collected via platform agent (Prometheus, CloudWatch, or equivalent); alert if SLO breached. (2) Model performance metrics — precision, recall, F1 vs. D9 acceptance criteria thresholds; fairness metrics per G3 subgroup specification; calculated on rolling window of recent inferences with confirmed labels. (3) Data quality metrics — input data schema validation failure rate; feature distribution vs. training distribution (PSI score); missing value rate per feature; alert if PSI exceeds drift threshold. (4) Business metrics — D9 outcome metrics (process cycle time, error rate, throughput); calculated from business system data; reported in monthly governance dashboard. Design four dashboards: operational (real-time, for IT Operations); model performance (daily/weekly, for AI Product Owner); compliance (monthly, for DPO and Legal); business outcomes (monthly, for Business Owner and Executive Sponsor).',
          ['1. Design collection mechanism for each metric category.', '2. Design four audience-specific dashboards.', '3. Set alert thresholds from D9 SLOs and acceptance criteria.', '4. Design escalation path for each alert type.', '5. Design drift detection with PSI threshold and retraining trigger integration.'],
          ['Monitoring Architecture Specification with four dashboards and alerting design'])
      )])
  ],
}

// ─── A11: Scalability & Performance Design ────────────────────────────

const A11: AISANode = {
  id: 'p3-a11', type: 'activity', level: 2,
  title: 'A11 — Scalability and Performance Design',
  description: 'Design the scalability and performance patterns that ensure the AI system meets D9 SLOs at peak load and can scale to handle projected growth without architectural redesign.',
  purpose: 'Produce scalability and performance design that meets SLOs at current and projected volume without over-provisioning.',
  why_it_matters: 'AI systems that are performant at average load but degrade at peak load fail at the worst possible times — when the business most depends on them. Performance design in Phase 3 prevents this by designing for the load profile rather than the average case.',
  inputs: ['Volume profile from D2', 'Performance SLOs from D9', 'Infrastructure Architecture from A7', 'Integration Architecture from A5'],
  activities: ['Design caching strategy; design auto-scaling policies; design load testing plan; produce capacity model'],
  methods: ['Caching strategy (result caching, feature caching)', 'Kubernetes HPA/KEDA auto-scaling', 'Load test design (k6, Locust)', 'Capacity modelling'],
  tools: ['Auto-scaling design template', 'Load test planning template', 'Capacity model spreadsheet'],
  outputs: ['Scalability and Performance Design: caching strategy, auto-scaling policies, load test plan, capacity model'],
  deliverables: ['Scalability and Performance Design (Phase 3 Deliverable)'],
  exit_criteria: ['Auto-scaling policies cover average-to-peak volume range from D2; caching reduces repeated inference cost; load test plan covers D2 peak volume; capacity model shows headroom'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a11-sa1', 'Design Scalability and Performance', 'Produce caching, auto-scaling, load testing, and capacity modelling designs.',
      'Performance designed at average load fails at peak. Systems designed for peak continuously waste infrastructure cost. Auto-scaling with proper load profiling is the balance.',
      [makeTask('p3-a11-sa1-t1', 'Produce Scalability Design', 'Design caching, auto-scaling, and load test plan.',
        ['Volume profile from D2', 'SLOs from D9', 'Infrastructure Architecture from A7'],
        makeEG('p3-a11-sa1-t1-eg', 'EG: Scalability and Performance Design',
          'Design: (1) Inference caching — deterministic queries (same input → same output) cached in Redis with appropriate TTL; non-deterministic or sensitive queries excluded from cache; cache hit ratio target and eviction strategy. (2) Auto-scaling — horizontal scaling of inference pods triggered by latency (scale up if P95 > X ms) and throughput (scale up if queue depth > N); minimum replicas = 2 for HA; maximum replicas calculated from peak volume estimate × 1.5 safety margin. (3) Load shedding — if load exceeds maximum capacity: queue requests with TTL, return 429 with retry-after header; log overload events for capacity planning. (4) Load test plan — test scenarios: steady state (average volume from D2); peak load (D2 peak volume); spike test (10× average for 60 seconds); soak test (average load for 24 hours to detect memory leaks); failure injection (service unavailability during peak). (5) Capacity model — current infrastructure cost at average load; at peak; with 2-year growth projection from D2; break-even point for scaling architecture changes.',
          ['1. Design caching strategy with TTL and exclusions.', '2. Design auto-scaling trigger conditions and limits.', '3. Design load shedding behaviour.', '4. Produce load test plan with all five scenarios.', '5. Produce capacity model with growth projection.'],
          ['Scalability and Performance Design with capacity model'])
      )])
  ],
}

// ─── A12: Disaster Recovery & Business Continuity ─────────────────────

const A12: AISANode = {
  id: 'p3-a12', type: 'activity', level: 2,
  title: 'A12 — Disaster Recovery and Business Continuity',
  description: 'Design the disaster recovery and business continuity plan for the AI system — defining RTO/RPO targets, backup strategies, failover procedures, and graceful degradation modes.',
  purpose: 'Ensure the AI system can recover from failure within defined time and data loss tolerances, and that the business can operate safely during recovery.',
  why_it_matters: 'AI systems that do not have a tested DR plan become single points of failure for the processes they automate. When they fail — and all systems eventually fail — the business has no agreed response. DR design in Phase 3 converts this from an unplanned incident to a managed recovery.',
  inputs: ['Business Owner input on tolerable downtime', 'Performance SLOs from D9 (availability target)', 'Infrastructure Architecture from A7', 'Security Architecture from A6'],
  activities: ['Define RTO and RPO; design backup and replication strategy; design failover procedure; design graceful degradation to human-only mode'],
  methods: ['RTO/RPO definition', 'Multi-region or multi-zone replication', 'Automated failover design', 'Degradation mode design'],
  tools: ['DR planning template', 'RTO/RPO calculation template'],
  outputs: ['DR and BCP Design: RTO/RPO targets, backup strategy, failover procedure, graceful degradation design'],
  deliverables: ['Disaster Recovery and BCP Design (Phase 3 Deliverable)'],
  exit_criteria: ['RTO/RPO approved by Business Owner; backup strategy meets RPO; failover tested in Phase 4; graceful degradation to human-only mode designed and documented'],
  related_phases: ['phase-4'],
  children: [
    makeSA('p3-a12-sa1', 'Design DR and BCP', 'Produce RTO/RPO targets, backup strategy, failover procedure, and graceful degradation design.',
      'DR without a tested failover is a documentation exercise. The value of DR planning is only realised in Phase 4 when failover is tested under realistic conditions.',
      [makeTask('p3-a12-sa1-t1', 'Produce DR and BCP Design', 'Define RTO/RPO and design backup, failover, and degradation modes.',
        ['Business Owner RTO/RPO input', 'SLOs from D9', 'Infrastructure Architecture from A7'],
        makeEG('p3-a12-sa1-t1-eg', 'EG: DR and BCP Design',
          'Define: (1) RTO (Recovery Time Objective) — max tolerable downtime. For AI-automated processes: typically 4–24 hours for non-critical, 1–4 hours for critical process support. (2) RPO (Recovery Point Objective) — max tolerable data loss. For training data: 24 hours (daily backup sufficient); for inference logs: 1 hour (near-real-time replication required). Backup strategy: training data and model artefacts — geo-redundant object storage with versioning enabled; incremental backup every 6 hours; full backup weekly; retention per G10 logging spec. Failover: primary region failure → automatic failover to secondary region within RTO; inference API: global load balancer with health check failover; database: managed replication with automatic failover. Graceful degradation: if AI system unavailable, routing layer switches to human-only mode; all requests go to human queue; operators notified immediately; SLA clock paused or extended per business rules; recovery procedure: restore AI, validate in shadow mode before re-enabling automation.',
          ['1. Confirm RTO and RPO with Business Owner.', '2. Design backup strategy meeting RPO for each data type.', '3. Design automated failover for inference API and database.', '4. Design graceful degradation mode switch and human queue routing.', '5. Define DR test plan for Phase 4.'],
          ['DR and BCP Design with graceful degradation procedure'])
      )])
  ],
}

// ─── A13: Architecture Validation ────────────────────────────────────

const A13: AISANode = {
  id: 'p3-a13', type: 'activity', level: 2,
  title: 'A13 — Architecture Validation',
  description: 'Conduct a structured architecture validation to confirm that the complete architecture satisfies all governance requirements, technical constraints, performance targets, and business objectives before Phase 4 build begins.',
  purpose: 'Provide a formal quality gate that ensures Phase 4 builds the right architecture, not just an architecture.',
  why_it_matters: 'Architecture review at the end of Phase 3 is the last checkpoint where design changes are cheap. A flaw discovered in Phase 4 mid-build costs 5–10× more to correct than a flaw discovered at Phase 3 review. Architecture validation is the investment that prevents the expensive alternative.',
  inputs: ['All Phase 3 design documents (A1–A12)', 'Phase 2 Governance Pack', 'Phase 3 Architecture Requirements Summary', 'Phase 1 constraints and success metrics'],
  activities: ['Conduct architecture review against governance requirements; validate against all constraints; produce Architecture Decision Records; obtain Phase 4 authorisation'],
  methods: ['Architecture review workshop', 'Constraint compliance checklist', 'Architecture Decision Records (ADRs)', 'Trade-off analysis documentation'],
  tools: ['Architecture validation checklist', 'ADR template'],
  outputs: ['Architecture Validation Report; Architecture Decision Records; Phase 4 build authorisation'],
  deliverables: ['Architecture Validation Report (Phase 3 Final Deliverable)', 'Architecture Decision Records', 'Phase 4 Build Authorisation'],
  exit_criteria: ['All governance requirements from Phase 2 are satisfied by architecture; all D8 constraints are respected; ADRs document all major design decisions with rationale; Executive Sponsor has authorised Phase 4'],
  related_phases: ['phase-2', 'phase-4'],
  children: [
    makeSA('p3-a13-sa1', 'Validate Architecture and Authorise Phase 4', 'Conduct structured architecture review and obtain Phase 4 build authorisation.',
      'Architecture validation is the quality gate that prevents a technically coherent but governance-non-compliant system from being built.',
      [makeTask('p3-a13-sa1-t1', 'Conduct Architecture Validation Review', 'Review all Phase 3 designs against governance requirements and constraints.',
        ['All Phase 3 design documents', 'Phase 2 Governance Pack', 'Constraint registers from D8'],
        makeEG('p3-a13-sa1-t1-eg', 'EG: Architecture Validation',
          'Validate in three passes: (1) Governance compliance check — for each item in the Phase 3 Architecture Requirements Summary from G11, confirm which architecture document satisfies it; flag any unsatisfied requirements as blocking issues. (2) Constraint compliance check — for each technical constraint from D8, confirm the architecture respects it; for each regulatory constraint from D8 SA2, confirm the architecture implements the required control. (3) Performance and scalability check — confirm the infrastructure and performance designs will achieve D9 SLOs at peak volume from D2; review the capacity model from A11 for headroom. Produce ADRs for the top 10 most significant architecture decisions: title, status, context, decision, rationale, consequences. Conduct validation workshop with: Architecture Lead, AI Product Owner, DPO (for privacy compliance), Security Lead (for security control coverage), IT Architecture (for constraint compliance). Produce Validation Report: findings, blocking issues (must fix before Phase 4), advisory issues (improve but not blocking), Phase 4 readiness confirmation. Obtain Phase 4 Build Authorisation from Executive Sponsor.',
          ['1. Produce governance compliance checklist from Phase 3 Architecture Requirements Summary.', '2. Complete constraint compliance check.', '3. Review performance and scalability design against SLOs.', '4. Produce 10 ADRs for major design decisions.', '5. Conduct validation workshop.', '6. Produce Validation Report.', '7. Obtain Phase 4 authorisation from Executive Sponsor.'],
          ['Architecture Validation Report; Architecture Decision Records; Phase 4 Build Authorisation'])
      )])
  ],
}

// ─── PHASE 3 NODE ─────────────────────────────────────────────────────

export const PHASE_3: AISANode = {
  id: 'phase-3', type: 'phase', level: 1,
  title: 'Phase 3 — Architecture Design',
  description: 'The design phase of the AISA methodology. Translates Phase 1 discovery and Phase 2 governance requirements into a complete, validated AI system architecture ready for Phase 4 implementation.',
  purpose: 'Produce the authoritative architecture that satisfies all technical, governance, security, ethical, and business requirements — before a line of production code is written.',
  why_it_matters: 'Architecture designed in Phase 3 determines the cost, capability, compliance, and quality of everything built in Phase 4. The ratio of cost-to-fix a flaw in Phase 3 vs. Phase 4 is approximately 1:10. Phase 3 is where design decisions are cheap; Phase 4 is where their consequences are expensive.',
  principles_applied: ['Technology Serves Architecture', 'Minimum Viable Complexity', 'Privacy and Ethics by Design'],
  inputs: ['Phase 1 deliverables (Problem Statement, Process Map, Data Landscape, Decision Analysis, Constraints, Metrics, Complexity Report, Scope Definition)', 'Phase 2 Governance Pack and Architecture Requirements Summary'],
  activities: [
    'A1 — Architecture Principles: derive and ratify governance-grounded architecture principles',
    'A2 — Solution Architecture: design system context, components, and data flows',
    'A3 — AI Model Architecture: select model types, training strategies, and explainability mechanisms',
    'A4 — Data Architecture: design ingestion, transformation, feature store, and serving layers',
    'A5 — Integration Architecture: design APIs, error handling, and security per integration point',
    'A6 — Security Architecture: implement all G5 controls across system components',
    'A7 — Infrastructure Architecture: design ML-optimised compute, storage, and networking',
    'A8 — MLOps Architecture: design end-to-end model lifecycle automation',
    'A9 — Human-AI Interaction Design: design oversight-first UI and interaction patterns',
    'A10 — Monitoring Architecture: design metrics pipeline, dashboards, and alerting',
    'A11 — Scalability and Performance Design: design caching, auto-scaling, and load test plan',
    'A12 — Disaster Recovery and Business Continuity: design RTO/RPO, backup, failover, and degradation',
    'A13 — Architecture Validation: validate all designs, produce ADRs, and authorise Phase 4',
  ],
  outputs: ['Architecture Principles Document', 'Solution Architecture', 'AI Model Architecture Specifications', 'Data Architecture Specification', 'Integration Architecture', 'Security Architecture', 'Infrastructure Architecture', 'MLOps Architecture', 'Human-AI Interaction Design', 'Monitoring Architecture', 'Scalability Design', 'DR and BCP Design', 'Architecture Validation Report', 'Architecture Decision Records', 'Phase 4 Build Authorisation'],
  deliverables: ['Complete Architecture Package (A1–A12 specifications)', 'Architecture Validation Report (A13)', 'Phase 4 Build Authorisation (A13)'],
  exit_criteria: ['All A1–A12 specifications produced; Architecture Validation confirms all governance requirements satisfied; all D8 constraints respected; Phase 4 Build Authorisation signed by Executive Sponsor'],
  related_phases: ['phase-2', 'phase-4'],
  children: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, A11, A12, A13],
}
