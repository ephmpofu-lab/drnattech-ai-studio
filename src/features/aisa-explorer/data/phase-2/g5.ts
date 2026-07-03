import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// G5 — SECURITY RISK ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: AI-Specific Threat Modelling ────────────────────────────────

const EG_THREAT_MODELLING: AISANode = {
  id: 'p2-g5-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Conducting AI-Specific Threat Modelling',
  description: 'Apply threat modelling to identify security threats specific to AI systems — including adversarial attacks, model theft, data poisoning, prompt injection, and inference attacks — as well as traditional IT threats.',
  purpose: 'Identify the full threat surface of the AI system, including AI-specific attack vectors that standard STRIDE modelling does not capture.',
  why_it_matters: 'AI systems have a fundamentally different threat surface from traditional software. Model inversion attacks can reconstruct training data from model outputs; adversarial examples can cause misclassification with imperceptible input perturbation; prompt injection can subvert the intended behaviour of LLM-based systems. Standard security assessments miss these threats.',
  methods: [
    '1. Apply STRIDE threat model (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege) to the AI system architecture diagram.',
    '2. Extend with AI-specific threat categories:',
    '   — Adversarial examples: crafted inputs that cause misclassification (most relevant for vision and NLP classification models).',
    '   — Model inversion: using model outputs to infer sensitive training data.',
    '   — Model theft: querying a model enough to approximate its function in a competing model.',
    '   — Data poisoning: contaminating training data to degrade performance or introduce backdoors.',
    '   — Prompt injection: malicious user inputs that override LLM system instructions.',
    '   — Membership inference: determining whether a specific record was in the training set.',
    '   — Supply chain attacks: compromised open-source models, datasets, or ML libraries.',
    '3. For each threat, assess: attack vector, likelihood (given the deployment context and access controls), impact (on confidentiality, integrity, availability, or trust), and detectability.',
    '4. Produce a threat model diagram showing the AI system\'s attack surface.',
  ],
  tools: ['STRIDE threat modelling template', 'OWASP Machine Learning Security Top 10', 'Threat model diagram tool (OWASP Threat Dragon or Microsoft Threat Modeling Tool)'],
  outputs: ['AI threat model: STRIDE + AI-specific threats with likelihood, impact, and detectability assessments; threat surface diagram'],
  exit_criteria: ['STRIDE model complete; all AI-specific threat categories assessed; threat surface diagram produced; Security team reviewed'],
}

const T_THREAT_MODELLING: AISANode = {
  id: 'p2-g5-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Conduct AI Threat Modelling',
  description: 'Apply STRIDE plus AI-specific threat categories to map the full threat surface of the AI system.',
  purpose: 'Identify AI-specific attack vectors before architecture decisions make them hard to address.',
  inputs: ['System architecture overview', 'Decision Analysis from D7', 'Technical constraints from D8', 'STRIDE template', 'OWASP ML Security Top 10'],
  methods: ['STRIDE threat modelling', 'AI-specific threat category extension', 'Likelihood and impact assessment', 'Threat surface diagramming'],
  tools: ['STRIDE template', 'Threat model diagram tool'],
  outputs: ['AI threat model with threat surface diagram'],
  children: [EG_THREAT_MODELLING],
}

const SA1_THREAT_MODEL: AISANode = {
  id: 'p2-g5-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'AI-Specific Threat Modelling',
  description: 'Apply STRIDE plus AI-specific threat categories (adversarial examples, model inversion, data poisoning, prompt injection, supply chain) to produce a comprehensive threat model.',
  purpose: 'Map the full threat surface of the AI system including attack vectors that standard security assessments miss.',
  why_it_matters: 'AI systems under active adversarial attack behave differently from systems under benign operation — often failing silently, producing subtly incorrect outputs, or being manipulated to serve attacker objectives. Threat modelling that ignores AI-specific vectors leaves the most distinctive attack surface unprotected.',
  inputs: ['System architecture overview', 'Technical constraints from D8', 'OWASP ML Security Top 10'],
  questions: ['What are the AI-specific attack vectors for this system?', 'What is the likelihood and impact of each threat?', 'What is the threat surface diagram?'],
  methods: ['STRIDE + AI-specific threat modelling', 'Likelihood and impact assessment', 'Threat surface diagramming'],
  tools: ['STRIDE template', 'OWASP ML Security Top 10', 'Threat model diagram tool'],
  governance_considerations: 'EU AI Act Art. 15 requires High Risk AI systems to be designed with appropriate cybersecurity. The threat model is the evidence basis for demonstrating that cybersecurity was systematically assessed.',
  outputs: ['AI threat model with AI-specific threats and threat surface diagram'],
  deliverables: ['AI Threat Model (input to Security Architecture in Phase 3)'],
  exit_criteria: ['STRIDE model complete; all six AI-specific categories assessed; threat surface diagram produced; Security team confirmed'],
  children: [T_THREAT_MODELLING],
}

// ─── SA2: Security Control Requirements ───────────────────────────────

const EG_SECURITY_CONTROLS: AISANode = {
  id: 'p2-g5-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining AI Security Control Requirements',
  description: 'Map each identified threat to required security controls and produce a security control specification that becomes a Phase 3 architecture requirement.',
  purpose: 'Convert the threat model into a concrete set of security requirements that Phase 3 architecture must satisfy.',
  why_it_matters: 'Threat models that do not translate into security control requirements produce documentation of threats without prevention of those threats. The control specification is the bridge from security risk assessment to security architecture design.',
  methods: [
    '1. For each threat in the threat model, identify the appropriate security control:',
    '   — Adversarial examples: input validation, anomaly detection on inputs, adversarial training, model robustness testing.',
    '   — Model inversion: output noise injection, confidence score thresholding, differential privacy in training.',
    '   — Data poisoning: data provenance controls, anomaly detection on training data, clean-label verification processes.',
    '   — Prompt injection: input sanitisation, system prompt protection, output filtering, red-team testing before deployment.',
    '   — Supply chain: dependency verification, model card review before third-party model adoption, SBOM for ML components.',
    '2. For traditional IT threats: apply NIST CSF controls (identify, protect, detect, respond, recover) mapped to the specific threat.',
    '3. For each control, specify: control type (preventive/detective/corrective), implementation layer (data, model, API, infrastructure), implementation effort, and Phase responsibility (Phase 3 architecture, Phase 4 implementation, operational).',
    '4. Include security controls as mandatory architecture requirements in the Phase 3 brief.',
  ],
  tools: ['Security control mapping template', 'NIST CSF control catalogue', 'OWASP ML Security mitigation guide'],
  outputs: ['Security control specification: each threat mapped to controls with implementation layer, effort, and phase responsibility'],
  exit_criteria: ['All threats have at least one mapped control; controls specified with implementation detail; included in Phase 3 architecture brief'],
}

const T_SECURITY_CONTROLS: AISANode = {
  id: 'p2-g5-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Define Security Control Requirements',
  description: 'Map each identified threat to required security controls and produce a control specification as Phase 3 architecture requirements.',
  purpose: 'Convert the threat model into actionable security architecture requirements.',
  inputs: ['AI threat model from SA1', 'Security control mapping template', 'NIST CSF control catalogue', 'OWASP ML Security mitigation guide'],
  methods: ['Threat-to-control mapping (AI-specific and traditional)', 'Control layer and effort specification', 'Phase 3 architecture brief integration'],
  tools: ['Security control mapping template'],
  outputs: ['Security control specification as Phase 3 architecture inputs'],
  children: [EG_SECURITY_CONTROLS],
}

const SA2_SECURITY_CONTROLS: AISANode = {
  id: 'p2-g5-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Security Control Requirements',
  description: 'Map each identified threat to required security controls across AI-specific and traditional IT categories, producing a control specification as mandatory Phase 3 architecture requirements.',
  purpose: 'Ensure security controls address AI-specific threats and are embedded in architecture before design is finalised.',
  why_it_matters: 'Security controls are most effective when designed into the system from the start. Controls for adversarial robustness require training data preparation and model architecture choices; controls for prompt injection require API design constraints. These decisions cannot be made after architecture is finalised without expensive redesign.',
  inputs: ['AI threat model from SA1', 'Privacy controls from G2', 'NIST CSF', 'OWASP ML Security Top 10'],
  questions: ['What control addresses each identified threat?', 'At what system layer should each control be implemented?', 'Which controls are Phase 3 architecture requirements vs. Phase 4 operational controls?'],
  methods: ['Threat-to-control mapping', 'Control layer specification', 'Phase responsibility classification'],
  tools: ['Security control mapping template'],
  security_considerations: 'Security control requirements must be coordinated with privacy controls from G2 to avoid conflicts and identify shared controls (e.g., access controls serve both privacy and security purposes).',
  outputs: ['Security control specification as Phase 3 architecture requirements'],
  deliverables: ['Security Control Specification (input to Phase 3 security architecture)'],
  exit_criteria: ['All threats have mapped controls; implementation detail specified; included in Phase 3 architecture brief; Security team confirmed'],
  children: [T_SECURITY_CONTROLS],
}

// ─── SA3: Incident Response Planning ──────────────────────────────────

const EG_INCIDENT_RESPONSE: AISANode = {
  id: 'p2-g5-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Designing the AI Security Incident Response Plan',
  description: 'Design the incident response plan for AI-specific security incidents — covering detection, containment, eradication, recovery, and notification processes.',
  purpose: 'Ensure the organisation can detect and respond rapidly to AI security incidents, including the AI-specific incidents that standard IR plans do not cover.',
  why_it_matters: 'AI security incidents require different response procedures from traditional IT incidents. A model under adversarial attack may produce subtly wrong outputs without triggering traditional security alerts. An incident response plan designed before deployment includes the AI-specific detection mechanisms and containment procedures that standard IR plans lack.',
  methods: [
    '1. Define the AI security incident taxonomy: what types of AI security incidents must the IR plan cover? Include: adversarial attack (detected by anomaly on inputs), model theft (detected by unusual query patterns), data poisoning (detected by model performance degradation), prompt injection exploit (detected by output monitoring), and supply chain compromise.',
    '2. For each incident type, define: detection signals (what triggers an alert), containment procedure (how is the system isolated or degraded safely), eradication (how is the threat removed), recovery (how is the system restored to normal operation), and root cause analysis process.',
    '3. Define AI-specific containment options: (a) degrade to human-only processing (disable AI automation, human performs all decisions); (b) freeze the model at the last known-good checkpoint; (c) route to an alternative model; (d) full system shutdown.',
    '4. Define regulatory notification requirements: GDPR Art. 33/34 for personal data breaches (72-hour notification to DPA, immediate notification to affected individuals for high-risk breaches); EU AI Act serious incident reporting under Art. 73.',
    '5. Assign IR roles: Incident Commander, AI Systems Lead, Security Lead, DPO (for data breach notification), Communications Lead.',
  ],
  tools: ['AI incident response plan template', 'NIST SP 800-61 Incident Handling Guide'],
  outputs: ['AI Security Incident Response Plan: incident taxonomy, detection, containment, eradication, recovery, notification, and roles for each incident type'],
  exit_criteria: ['IR plan covers all AI-specific incident types; containment options defined; notification requirements mapped; roles assigned; Security and Legal reviewed'],
}

const T_INCIDENT_RESPONSE: AISANode = {
  id: 'p2-g5-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Design AI Security Incident Response Plan',
  description: 'Design the AI-specific incident response plan covering detection, containment, eradication, recovery, and notification for all AI security incident types.',
  purpose: 'Ensure AI security incidents are detected and responded to faster than an ad-hoc response would permit.',
  inputs: ['AI threat model from SA1', 'GDPR Art. 33/34 notification requirements from G2', 'EU AI Act Art. 73 serious incident reporting', 'AI incident response plan template'],
  methods: ['Incident taxonomy definition', 'Detection and response procedure design', 'Containment option specification', 'Notification requirement mapping', 'Role assignment'],
  tools: ['AI incident response plan template', 'NIST SP 800-61'],
  outputs: ['AI Security Incident Response Plan'],
  children: [EG_INCIDENT_RESPONSE],
}

const SA3_INCIDENT_RESPONSE: AISANode = {
  id: 'p2-g5-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Incident Response Planning',
  description: 'Design the AI-specific security incident response plan covering detection, containment, eradication, recovery, and regulatory notification for all AI security incident types.',
  purpose: 'Ensure rapid, structured response to AI security incidents that standard IT IR plans do not adequately cover.',
  why_it_matters: 'AI security incidents can cause harm at scale and speed before human operators detect them. A pre-designed incident response plan reduces response time, limits harm, ensures regulatory obligations are met, and demonstrates due diligence to regulators. An improvised response to a serious AI incident is both slower and more costly.',
  inputs: ['AI threat model from SA1', 'GDPR notification obligations from G2', 'EU AI Act Art. 73 serious incident requirements'],
  questions: ['What types of AI security incidents must the IR plan cover?', 'What are the containment options for each?', 'What regulatory notifications are required, and within what timeframes?', 'Who are the IR roles?'],
  methods: ['Incident taxonomy design', 'Detection, containment, and recovery procedure design', 'Notification mapping', 'Role assignment'],
  tools: ['AI incident response plan template'],
  outputs: ['AI Security Incident Response Plan'],
  deliverables: ['AI Security Incident Response Plan (Phase 2 Deliverable)'],
  exit_criteria: ['All AI-specific incident types covered; containment options defined; notification requirements mapped; roles assigned; Security and Legal reviewed'],
  children: [T_INCIDENT_RESPONSE],
}

// ═══════════════════════════════════════════════════════════════════════
// G5 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const G5: AISANode = {
  id: 'p2-g5',
  type: 'activity',
  level: 2,
  title: 'G5 — Security Risk Assessment',
  description: 'Conduct AI-specific threat modelling, define security control requirements as Phase 3 architecture inputs, and design the AI security incident response plan — ensuring the AI system\'s distinctive threat surface is understood and addressed before design is finalised.',
  purpose: 'Ensure AI-specific security threats are modelled, controlled, and responded to as systematically as traditional IT threats.',
  why_it_matters: 'AI systems extend the attack surface beyond traditional IT infrastructure. Adversarial ML attacks, model theft, prompt injection, and supply chain risks are real, documented, and actively exploited. An organisation that applies only traditional security controls to an AI system leaves its most distinctive vulnerabilities unaddressed.',
  principles_applied: ['Privacy and Ethics by Design'],
  inputs: ['System architecture overview', 'Technical constraints from D8', 'GDPR and privacy controls from G2', 'EU AI Act cybersecurity requirements from G1'],
  questions: [
    'What AI-specific threats does the system face, and what is their likelihood and impact?',
    'What security controls address each threat, and at what system layer?',
    'How will AI security incidents be detected, contained, and reported?',
  ],
  activities: [
    'Apply STRIDE plus AI-specific threat modelling to map the full threat surface',
    'Map each threat to required security controls and produce Phase 3 architecture requirements',
    'Design the AI-specific security incident response plan with regulatory notification procedures',
  ],
  methods: ['STRIDE + OWASP ML Security Top 10 threat modelling', 'Threat-to-control mapping (NIST CSF + AI-specific)', 'AI incident response planning (NIST SP 800-61 adapted)'],
  tools: ['STRIDE template', 'OWASP Machine Learning Security Top 10', 'Threat model diagram tool', 'Security control mapping template', 'AI incident response plan template'],
  governance_considerations: 'EU AI Act Art. 15 requires High Risk AI systems to be designed to achieve appropriate levels of cybersecurity. The security control specification from this activity is evidence that Art. 15 was systematically addressed.',
  security_considerations: 'Security controls must be tested before deployment — not just documented. Phase 4 must include adversarial robustness testing, penetration testing of AI API endpoints, and prompt injection testing for LLM-based systems.',
  ai_engineering_considerations: 'Adversarial robustness controls affect model training (adversarial training requires augmented training data), model architecture (certified defences constrain architecture choices), and inference pipeline design (input validation and output monitoring). These are engineering design requirements, not operational afterthoughts.',
  outputs: ['AI threat model with threat surface diagram', 'Security control specification as Phase 3 requirements', 'AI Security Incident Response Plan'],
  deliverables: ['Security Risk Assessment Report (Phase 2 Deliverable)', 'AI Security Incident Response Plan'],
  exit_criteria: [
    'Threat model complete with all AI-specific categories assessed',
    'Security controls specified for all threats and included in Phase 3 brief',
    'Incident response plan complete with notification requirements and IR roles confirmed',
    'Security team and Legal reviewed all outputs',
  ],
  related_phases: ['phase-3', 'phase-4'],
  references: [
    { title: 'OWASP Machine Learning Security Top 10', type: 'framework', url: 'https://owasp.org/www-project-machine-learning-security-top-10/' },
    { title: 'NIST AI 100-2 — Adversarial Machine Learning Taxonomy', type: 'standard' },
    { title: 'EU AI Act Art. 15 — Accuracy, robustness, cybersecurity', type: 'standard' },
    { title: 'NIST SP 800-61 — Computer Security Incident Handling Guide', type: 'standard' },
  ],
  children: [SA1_THREAT_MODEL, SA2_SECURITY_CONTROLS, SA3_INCIDENT_RESPONSE],
}
