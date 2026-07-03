import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// SA1 — IDENTIFY INTERNAL STAKEHOLDERS
// ═══════════════════════════════════════════════════════════════════════

const EG_EXEC_SPONSOR: AISANode = {
  id: 'p1-d1-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Executive Sponsor',
  description: 'Confirm the senior executive who holds ultimate authority and budget control for the AI initiative.',
  purpose: 'Establish a named executive champion with the authority, budget and organisational standing to protect the project through its lifecycle.',
  why_it_matters: 'Projects without a committed executive sponsor stall or are cancelled when organisational priorities compete. The sponsor is the team\'s single escalation point and strategic protector — without one named and committed from day one, the project has no anchor.',
  methods: [
    '1. Obtain the project commissioning document, approval email, or board minute authorising the initiative. Identify the signing authority.',
    '2. If no document exists, ask the project initiator directly: "Who has final authority to approve or cancel this AI initiative, and who controls its budget?"',
    '3. Verify budget authority: confirm with finance or the initiator that this person controls the project funds.',
    '4. Arrange a 30-minute introductory meeting. Explain scope, governance cadence, and role requirements: attending key decision gates, resolving escalations within 48 hours, providing air cover for the project team.',
    '5. Obtain explicit written commitment. A reply to a confirmation email is sufficient.',
    '6. Record in the Stakeholder Register: full name, title, department, direct email, phone, reporting line, and decision authority scope.',
    '7. Schedule first formal sponsor briefing for project week one.',
  ],
  tools: ['Stakeholder Register template', 'RACI Matrix template'],
  outputs: ['Executive Sponsor recorded in Stakeholder Register with confirmed authority scope'],
  exit_criteria: ['Named, confirmed in writing, documented with authority scope and contact details'],
}

const T_EXEC_SPONSOR: AISANode = {
  id: 'p1-d1-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Identify Executive Sponsor',
  description: 'Locate and confirm the senior executive who holds ultimate authority, budget control and accountability for the AI initiative.',
  purpose: 'Establish the primary escalation point and strategic champion for the project.',
  inputs: ['Project commissioning document or approval email', 'Organisational chart'],
  methods: ['Review commissioning documentation', 'Interview project initiator', 'Verify authority and budget scope'],
  tools: ['Stakeholder Register template', 'Organisational chart'],
  outputs: ['Confirmed Executive Sponsor with documented authority scope'],
  children: [EG_EXEC_SPONSOR],
}

const EG_BIZ_OWNER: AISANode = {
  id: 'p1-d1-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Business Owner',
  description: 'Identify who owns the business outcomes and day-to-day accountability for the process the AI system will affect.',
  purpose: 'Confirm a single named person accountable for the business domain, requirements quality, and output acceptance.',
  why_it_matters: 'The Business Owner is the requirements arbiter. Without a named, engaged Business Owner, requirements drift, scope creeps, and acceptance criteria are ambiguous at delivery.',
  methods: [
    '1. Ask the Executive Sponsor: "Who owns the business outcomes of this system on a day-to-day basis once deployed?"',
    '2. Confirm the candidate is responsible for the business domain or function the AI will affect.',
    '3. Verify they have authority to approve changes to their process and to sign off on acceptance testing.',
    '4. Confirm availability: can they attend weekly status reviews and participate in requirements workshops?',
    '5. Ask: "Who reports to you that uses this process today?" This confirms domain ownership.',
    '6. Record in Stakeholder Register: name, title, business domain, email, phone, process ownership scope.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Named Business Owner in Stakeholder Register with business domain defined'],
  exit_criteria: ['Business Owner confirmed, documented, and available for requirements workshops'],
}

const T_BIZ_OWNER: AISANode = {
  id: 'p1-d1-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Identify Business Owner',
  description: 'Confirm who owns the business domain and outcomes that the AI system will directly affect.',
  purpose: 'Ensure a single named person is accountable for business requirements and output acceptance.',
  inputs: ['Executive Sponsor confirmation', 'Organisational chart', 'Project brief describing affected function'],
  methods: ['Sponsor interview', 'Review of function ownership in org chart', 'Authority confirmation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Named Business Owner with domain and process ownership documented'],
  children: [EG_BIZ_OWNER],
}

const EG_PROCESS_OWNER: AISANode = {
  id: 'p1-d1-sa1-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Process Owner',
  description: 'Identify the person responsible for the specific business process the AI system will interact with or transform.',
  purpose: 'Establish the authority who understands current process behaviour, owns its performance, and can approve process changes.',
  why_it_matters: 'The Process Owner provides the ground-truth view of how the process works today, including exceptions and informal workarounds. Without their involvement, the AS-IS map will be incomplete and the TO-BE design will break against reality.',
  methods: [
    '1. List all business processes the AI system will touch, replace, or augment.',
    '2. For each process, ask the Business Owner: "Who is responsible for this process end-to-end?"',
    '3. Confirm the candidate can describe the process in full, including exceptions and manual interventions.',
    '4. Verify they have authority to approve process changes without requiring sign-off from a higher level.',
    '5. Ask: "What would break if this process stopped working for 24 hours?" Their answer confirms process criticality and their knowledge.',
    '6. Record in Stakeholder Register with each process they own listed explicitly.',
  ],
  tools: ['Stakeholder Register template', 'Process inventory list'],
  outputs: ['Named Process Owner(s) with owned process list in Stakeholder Register'],
  exit_criteria: ['All in-scope processes have a named owner confirmed and documented'],
}

const T_PROCESS_OWNER: AISANode = {
  id: 'p1-d1-sa1-t3',
  type: 'task',
  level: 4,
  title: 'Identify Process Owner',
  description: 'Confirm who is responsible for each business process the AI system will interact with or transform.',
  purpose: 'Establish the process authority who can validate current-state maps and approve process changes.',
  inputs: ['List of in-scope business processes', 'Business Owner contact'],
  methods: ['Business Owner interview', 'Process inventory review', 'Authority and knowledge confirmation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Named Process Owner(s) with owned process list'],
  children: [EG_PROCESS_OWNER],
}

const EG_END_USERS: AISANode = {
  id: 'p1-d1-sa1-t4-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying End Users',
  description: 'Map all role types who will directly interact with, receive outputs from, or act on decisions made by the AI system.',
  purpose: 'Ensure no user group is overlooked in requirements gathering, training planning, or change management.',
  why_it_matters: 'AI systems are built by architects and accepted by sponsors but fail in practice when the actual end users were not represented in requirements. Every undiscovered user group introduces a late change request or a post-deployment adoption problem.',
  methods: [
    '1. Ask the Business Owner and Process Owner: "Who uses this process today, by role type — not by individual name?"',
    '2. List all role types. For each, classify their interaction: (a) inputs data to the system, (b) receives AI outputs or decisions, (c) reviews or approves AI decisions, (d) monitors performance.',
    '3. Estimate headcount per role type. This informs training scope and change impact.',
    '4. Identify 2–3 representative individuals per role for future requirements validation and user acceptance testing.',
    '5. Ask: "Are there any users of this process who are external to this organisation?" Flag these as external stakeholders.',
    '6. Record in Stakeholder Register: role type, interaction classification, headcount estimate, representative contacts.',
  ],
  tools: ['Stakeholder Register template', 'User role mapping worksheet'],
  outputs: ['End-user role map with interaction classification and headcount estimates'],
  exit_criteria: ['All end-user role types identified, classified by interaction type, with representative contacts named'],
}

const T_END_USERS: AISANode = {
  id: 'p1-d1-sa1-t4',
  type: 'task',
  level: 4,
  title: 'Identify End Users',
  description: 'Map all role types who will interact with, receive outputs from, or act on decisions by the AI system.',
  purpose: 'Ensure all user groups are represented in requirements gathering, training planning, and change management.',
  inputs: ['Business Owner and Process Owner contacts', 'Existing process documentation'],
  methods: ['Role type brainstorm with Business Owner', 'Process walkthrough', 'Interaction classification'],
  tools: ['Stakeholder Register template', 'User role worksheet'],
  outputs: ['End-user role map with interaction classification'],
  children: [EG_END_USERS],
}

const EG_IT_TEAM: AISANode = {
  id: 'p1-d1-sa1-t5-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the IT Team',
  description: 'Identify all IT personnel and roles who will own technical delivery, infrastructure, integration, and operations for the AI system.',
  purpose: 'Establish IT contacts for architecture design, infrastructure provisioning, integration and ongoing operations.',
  why_it_matters: 'AI systems are delivered into existing IT landscapes. Without IT involvement from discovery, architecture decisions are made in isolation of real infrastructure constraints, leading to rework in later phases.',
  methods: [
    '1. Request the IT organisational chart from the CTO, IT Director, or Executive Sponsor.',
    '2. Identify named contacts for: (a) infrastructure and cloud, (b) data engineering and databases, (c) integration and APIs, (d) information security, (e) service desk and operations.',
    '3. Arrange a 45-minute IT stakeholder introduction. Brief them on the project, confirm their involvement in architecture review, and identify any known constraints.',
    '4. Ask: "Who approves new infrastructure provisioning? Who manages third-party vendor access? Who owns the integration layer?"',
    '5. Identify who will own technical delivery on the client side during and after the project.',
    '6. Record all IT contacts in Stakeholder Register with their technical domain and involvement stage.',
  ],
  tools: ['Stakeholder Register template', 'IT organisational chart'],
  outputs: ['IT team contacts documented with technical domains and engagement stages'],
  exit_criteria: ['Named IT contacts for infrastructure, data, integration, security, and operations recorded'],
}

const T_IT_TEAM: AISANode = {
  id: 'p1-d1-sa1-t5',
  type: 'task',
  level: 4,
  title: 'Identify IT Team',
  description: 'Locate all IT personnel responsible for infrastructure, data, integration, security, and operations relevant to the AI initiative.',
  purpose: 'Establish IT contacts for architecture and infrastructure decisions throughout the project.',
  inputs: ['Organisational chart', 'Executive Sponsor or CTO contact'],
  methods: ['IT org chart review', 'IT introduction meeting', 'Domain mapping'],
  tools: ['Stakeholder Register template'],
  outputs: ['IT stakeholder map with technical domains'],
  children: [EG_IT_TEAM],
}

const EG_SECURITY_TEAM: AISANode = {
  id: 'p1-d1-sa1-t6-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Security Team',
  description: 'Identify the information security personnel who must review and approve the AI system\'s security posture.',
  purpose: 'Establish security stakeholders who will participate in threat modelling, security architecture review, and ongoing security governance.',
  why_it_matters: 'AI systems introduce novel attack surfaces — prompt injection, data poisoning, model extraction. Security teams unfamiliar with AI-specific risks need early engagement to avoid blocking the project at a late delivery gate.',
  methods: [
    '1. Ask the IT lead: "Who is responsible for information security in this organisation?" Identify the CISO, Information Security Manager, or equivalent.',
    '2. If no dedicated security function exists, identify who owns security policy and incident response.',
    '3. Brief them on the AI initiative. Highlight that an AI-specific threat model will be produced in Phase 2 and request their review.',
    '4. Ask: "Who approves third-party vendor access to organisational data? Who reviews penetration test findings?"',
    '5. Confirm their availability for the Phase 2 security threat modelling session.',
    '6. Record in Stakeholder Register: name, role, security domains covered, compliance areas they own.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Security team contacts in Stakeholder Register with security domains noted'],
  exit_criteria: ['Named security contact confirmed and briefed on AI initiative; availability for Phase 2 threat model confirmed'],
}

const T_SECURITY_TEAM: AISANode = {
  id: 'p1-d1-sa1-t6',
  type: 'task',
  level: 4,
  title: 'Identify Security Team',
  description: 'Locate the information security personnel who must review and approve the AI system\'s security posture.',
  purpose: 'Establish security stakeholders early to prevent late-stage security blocks and ensure AI-specific risks are addressed.',
  inputs: ['IT team contact', 'Organisational chart'],
  methods: ['IT lead interview', 'Security function identification', 'Phase 2 availability confirmation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Security team contacts with domains and Phase 2 availability confirmed'],
  children: [EG_SECURITY_TEAM],
}

const EG_COMPLIANCE_TEAM: AISANode = {
  id: 'p1-d1-sa1-t7-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Compliance Team',
  description: 'Identify legal, compliance, and data protection personnel who must be involved in regulatory assessment of the AI system.',
  purpose: 'Establish compliance contacts for Phase 2 regulatory assessment, GDPR review, and EU AI Act applicability determination.',
  why_it_matters: 'GDPR mandates a named Data Protection Officer (DPO) for many AI use cases involving personal data. The EU AI Act introduces new obligations for high-risk AI systems. Early identification of compliance stakeholders prevents the project from reaching the architecture phase without understanding its regulatory boundaries.',
  methods: [
    '1. Ask the Executive Sponsor or Legal department: "Who is responsible for regulatory compliance in this organisation?"',
    '2. Ask specifically: "Do you have a named Data Protection Officer?" Under GDPR, a DPO is mandatory for many AI use cases processing personal data. If not appointed, flag this as a risk.',
    '3. Identify: Legal Counsel, Compliance Manager, DPO, Risk Manager — note which are internal and which are external advisors.',
    '4. Brief the compliance team on the AI initiative. Flag potential GDPR applicability (personal data processing) and EU AI Act applicability (AI system classification).',
    '5. Request their availability for the Phase 2 regulatory assessment workshop.',
    '6. Ask: "What existing compliance frameworks does this organisation operate under?" Note: ISO 27001, SOC 2, PCI-DSS, sector-specific regulations.',
    '7. Record in Stakeholder Register with regulatory domains, known obligations, and Phase 2 availability.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Compliance team contacts with regulatory domains documented; DPO identified or gap flagged'],
  exit_criteria: ['Compliance stakeholders identified, briefed, and available for Phase 2 regulatory assessment'],
  governance_considerations: 'GDPR Article 37 mandates appointment of a DPO where large-scale processing of personal data occurs. Absence of a DPO where one is required is a compliance gap that must be escalated to the Executive Sponsor immediately.',
}

const T_COMPLIANCE_TEAM: AISANode = {
  id: 'p1-d1-sa1-t7',
  type: 'task',
  level: 4,
  title: 'Identify Compliance Team',
  description: 'Locate legal, compliance, and data protection personnel who must review the regulatory obligations of the AI system.',
  purpose: 'Establish compliance stakeholders who will define the regulatory boundaries the system must operate within.',
  inputs: ['Sponsor or legal department contact', 'Project brief describing data use'],
  methods: ['Legal/sponsor interview', 'DPO identification check', 'Regulatory obligations inventory'],
  tools: ['Stakeholder Register template'],
  outputs: ['Compliance stakeholders identified with regulatory domains; DPO status confirmed'],
  children: [EG_COMPLIANCE_TEAM],
}

const EG_OPS_TEAM: AISANode = {
  id: 'p1-d1-sa1-t8-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying the Operations Team',
  description: 'Identify the personnel who will operate, monitor, and maintain the AI system in production.',
  purpose: 'Ensure operational requirements are understood from day one and that the team who will run the system has input into its design.',
  why_it_matters: 'AI systems built without operational input often arrive at production deployment without runbooks, monitoring, or a clear on-call owner. Operations teams who learn about a system at go-live are the most common source of urgent post-deployment changes.',
  methods: [
    '1. Ask the IT lead and Business Owner: "Who will operate and maintain this system once it is live in production?"',
    '2. Identify separately: (a) system administrators, (b) monitoring/alerting team, (c) deployment and release team, (d) first-line support and service desk.',
    '3. Ask: "Is there an existing runbook process or on-call rotation we should integrate with?"',
    '4. Confirm who will own the on-call responsibility for this category of system and what their SLA expectations are.',
    '5. Ask: "What monitoring platform do you use today?" Note for observability architecture in Phase 3.',
    '6. Record in Stakeholder Register with operational role, support tier, on-call status, and monitoring platform.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Operations team contacts with roles and on-call ownership documented'],
  exit_criteria: ['Named operations contacts for all four operational functions: admin, monitoring, deployment, support'],
}

const T_OPS_TEAM: AISANode = {
  id: 'p1-d1-sa1-t8',
  type: 'task',
  level: 4,
  title: 'Identify Operations Team',
  description: 'Identify personnel responsible for operating, monitoring, and supporting the AI system in production.',
  purpose: 'Incorporate operational requirements into the design from discovery, not after deployment.',
  inputs: ['IT lead contact', 'Business Owner contact', 'Existing infrastructure runbook (if any)'],
  methods: ['IT lead interview', 'Operations model review', 'On-call ownership confirmation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Operations team map with on-call, monitoring, and support roles'],
  children: [EG_OPS_TEAM],
}

const SA1_INTERNAL: AISANode = {
  id: 'p1-d1-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Internal Stakeholders',
  description: 'Systematically identify every internal organisational role with a stake in the AI initiative — from executive authority through operational delivery.',
  purpose: 'Ensure no internal voice is missed before requirements are gathered. Every missing internal stakeholder surfaces later as either a requirement gap or organisational resistance.',
  why_it_matters: 'Internal stakeholders define requirements, hold approval gates, own data, operate infrastructure, and enforce compliance. Discovering a missing stakeholder mid-project causes expensive rework. Discovering them post-deployment causes rejection.',
  inputs: ['Project commissioning document', 'Organisational chart', 'Project brief'],
  questions: [
    'Who commissioned and approved this project?',
    'Who owns the business outcomes of this system?',
    'Who is responsible for the process being changed?',
    'Who controls the data this system will use?',
    'Who will operate and support this system?',
    'Who is responsible for regulatory compliance?',
  ],
  methods: ['Sponsor interview', 'Organisational chart review', 'Process owner identification', 'Regulatory role identification'],
  tools: ['Stakeholder Register template', 'RACI Matrix template', 'Organisational chart'],
  governance_considerations: 'A Data Protection Officer must be identified if the system processes personal data. The DPO is a mandatory stakeholder under GDPR. Absence of a DPO where one is legally required must be escalated immediately.',
  outputs: ['Complete internal stakeholder list by role type'],
  deliverables: ['Internal stakeholder section of the Stakeholder Register'],
  exit_criteria: ['All key internal roles identified: Sponsor, Business Owner, Process Owner, End Users, IT, Security, Compliance, Operations'],
  children: [T_EXEC_SPONSOR, T_BIZ_OWNER, T_PROCESS_OWNER, T_END_USERS, T_IT_TEAM, T_SECURITY_TEAM, T_COMPLIANCE_TEAM, T_OPS_TEAM],
}

// ─── SA2: External Stakeholders ───────────────────────────────────────

const EG_EXTERNAL_USERS: AISANode = {
  id: 'p1-d1-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying External User Representatives',
  description: 'Identify external individuals — customers, partners, or citizens — who will interact with or be affected by the AI system\'s outputs.',
  purpose: 'Ensure external users are represented in requirements so the system serves its actual recipients, not just its internal operators.',
  why_it_matters: 'AI systems that affect external parties without those parties being represented in requirements violate both user-centred design principles and, in many cases, EU AI Act obligations for transparency and non-discrimination.',
  methods: [
    '1. Ask the Business Owner: "Does this AI system produce outputs that are seen or acted on by people outside this organisation?"',
    '2. If yes, identify what role or relationship the external person has: customer, citizen, patient, partner, supplier.',
    '3. Determine whether external users can be represented by internal proxy stakeholders (e.g., customer success team) or require direct engagement.',
    '4. If direct engagement is possible and legal, identify 2–3 representatives for future user testing and requirements validation.',
    '5. Record external user groups in Stakeholder Register with interaction type and representation method.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['External user groups identified with interaction type and representation strategy'],
  exit_criteria: ['All external user groups named, classified by interaction, and representation method confirmed'],
}

const T_EXTERNAL_USERS: AISANode = {
  id: 'p1-d1-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Identify External User Representatives',
  description: 'Identify customers, partners, or other external parties who interact with or are affected by the AI system.',
  purpose: 'Represent external users in requirements gathering to ensure the system delivers value beyond its internal operators.',
  inputs: ['Business Owner contact', 'Project brief describing system purpose'],
  methods: ['Business Owner interview', 'External user group mapping', 'Representation strategy determination'],
  tools: ['Stakeholder Register template'],
  outputs: ['External user groups with interaction types and representation strategy'],
  children: [EG_EXTERNAL_USERS],
}

const EG_REGULATORY_CONTACTS: AISANode = {
  id: 'p1-d1-sa2-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Regulatory Body Contacts',
  description: 'Identify relevant regulatory bodies and the organisation\'s points of contact for each, particularly those relevant to AI and data use.',
  purpose: 'Establish which regulatory bodies have oversight authority over this AI system and who manages that relationship internally.',
  why_it_matters: 'Regulatory bodies are not stakeholders in the traditional sense — they cannot be consulted directly in most cases — but the internal relationships with them (through DPOs, legal teams, and compliance managers) define hard boundaries for the system\'s design.',
  methods: [
    '1. Ask the compliance team: "Which regulatory bodies have oversight of our data use, technology systems, or industry operations?"',
    '2. For AI-specific regulation, confirm EU AI Act supervision: the relevant national market surveillance authority for your member state.',
    '3. For GDPR, confirm the lead supervisory authority (determined by organisation\'s EU establishment).',
    '4. Identify any sector-specific regulators: FCA (finance), CQC (health), Ofgem (energy), etc.',
    '5. Record: regulatory body name, jurisdiction, relevant obligation, and internal contact who manages that relationship.',
  ],
  tools: ['Stakeholder Register template', 'Regulatory inventory worksheet'],
  outputs: ['Regulatory body inventory with internal relationship owners'],
  exit_criteria: ['All applicable regulatory bodies named with internal contact and relevant obligation noted'],
}

const T_REGULATORY_CONTACTS: AISANode = {
  id: 'p1-d1-sa2-t2',
  type: 'task',
  level: 4,
  title: 'Identify Regulatory Body Contacts',
  description: 'Identify which regulatory authorities have oversight of this AI system and who manages those relationships.',
  purpose: 'Establish the regulatory landscape before architecture decisions are made.',
  inputs: ['Compliance team contact', 'Industry and jurisdiction context'],
  methods: ['Compliance team interview', 'Regulatory inventory review', 'Sector regulation identification'],
  tools: ['Stakeholder Register template'],
  outputs: ['Regulatory body inventory with internal contacts'],
  children: [EG_REGULATORY_CONTACTS],
}

const EG_VENDOR_CONTACTS: AISANode = {
  id: 'p1-d1-sa2-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Technology Vendor Contacts',
  description: 'Identify external technology vendors, platform providers, and integration partners whose systems the AI initiative will connect with or depend on.',
  purpose: 'Map third-party dependencies early to surface integration constraints, data sharing agreements, and vendor SLAs that constrain architecture.',
  why_it_matters: 'Third-party vendor constraints — API rate limits, data residency restrictions, licensing terms, and support SLAs — are among the most common causes of late architectural pivots. Early identification allows these constraints to be factored into the make-or-buy assessment in Phase 2.',
  methods: [
    '1. Ask the IT team and Business Owner: "What external systems does this process currently interact with?"',
    '2. List all third-party platforms: CRM, ERP, data platforms, cloud providers, SaaS tools the process touches.',
    '3. For each vendor, identify: (a) the vendor\'s account manager or technical contact, (b) existing contract or SLA, (c) data sharing agreement status.',
    '4. Confirm whether any existing vendor contracts restrict data use, model training, or third-party AI processing.',
    '5. Record in Stakeholder Register with vendor name, product, contact, and known constraints.',
  ],
  tools: ['Stakeholder Register template', 'Vendor inventory list'],
  outputs: ['Technology vendor inventory with contacts and known constraints'],
  exit_criteria: ['All third-party technology dependencies mapped with vendor contacts and contract status noted'],
}

const T_VENDOR_CONTACTS: AISANode = {
  id: 'p1-d1-sa2-t3',
  type: 'task',
  level: 4,
  title: 'Identify Technology Vendor Contacts',
  description: 'Identify third-party technology vendors and integration partners relevant to the AI initiative.',
  purpose: 'Surface technology constraints and third-party dependencies before architecture design begins.',
  inputs: ['IT team contact', 'Current system inventory or architecture diagram'],
  methods: ['IT interview', 'System inventory review', 'Contract and SLA review'],
  tools: ['Stakeholder Register template'],
  outputs: ['Vendor inventory with contacts and constraints'],
  children: [EG_VENDOR_CONTACTS],
}

const SA2_EXTERNAL: AISANode = {
  id: 'p1-d1-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Identify External Stakeholders',
  description: 'Identify individuals, organisations, and regulatory bodies outside the organisation who are affected by, interact with, or have authority over the AI system.',
  purpose: 'Ensure external dependencies, user groups, and regulatory relationships are visible before design begins.',
  why_it_matters: 'External stakeholders impose constraints that internal teams cannot override: regulatory requirements, vendor contract terms, and customer expectations. Discovering them after architecture is set causes forced rework.',
  inputs: ['Internal stakeholder list', 'Project brief', 'Existing vendor contracts'],
  questions: ['Who outside the organisation interacts with or is affected by this system?', 'Which regulatory bodies have authority over this use case?', 'What third-party systems does this process depend on?'],
  methods: ['Business Owner and IT interview', 'Regulatory landscape review', 'Vendor dependency mapping'],
  tools: ['Stakeholder Register template', 'Regulatory inventory worksheet'],
  outputs: ['External stakeholder list: users, regulators, vendors'],
  deliverables: ['External stakeholder section of the Stakeholder Register'],
  exit_criteria: ['External user groups, regulatory bodies, and technology vendors all identified and documented'],
  children: [T_EXTERNAL_USERS, T_REGULATORY_CONTACTS, T_VENDOR_CONTACTS],
}

// ─── SA3: Determine Accountability ───────────────────────────────────

const EG_DECISION_AUTH: AISANode = {
  id: 'p1-d1-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Decision Authority',
  description: 'Document which stakeholders have authority to make or approve key project and system decisions.',
  purpose: 'Prevent decision deadlock and escalation loops by establishing a clear decision authority map before any decisions are required.',
  why_it_matters: 'In large organisations, unclear decision authority is the primary cause of project delay. When architectural decisions, procurement choices, or policy exceptions must be made, an explicit authority map means the right person is contacted immediately — not after two weeks of email chains.',
  methods: [
    '1. List the key decision categories expected during the project: (a) scope changes, (b) architecture selection, (c) vendor/make-or-buy choices, (d) budget changes, (e) data access approvals, (f) deployment approvals.',
    '2. For each category, ask the Sponsor: "Who has final authority to approve this type of decision?"',
    '3. Distinguish between: (a) authority to decide, (b) authority to recommend, (c) authority to veto.',
    '4. Identify any decisions that require committee or board approval — note approval timelines.',
    '5. Record in the RACI Matrix under the "Accountable" column for each decision category.',
  ],
  tools: ['RACI Matrix template', 'Decision register template'],
  outputs: ['Decision authority map by category, recorded in RACI Matrix'],
  exit_criteria: ['All key decision categories have a named Accountable authority'],
}

const T_DECISION_AUTH: AISANode = {
  id: 'p1-d1-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Map Decision Authority',
  description: 'Identify who holds final decision authority for each major category of project and system decision.',
  purpose: 'Prevent decision deadlock by establishing authority clarity before decisions are needed.',
  inputs: ['Stakeholder Register', 'Project decision categories list'],
  methods: ['Sponsor interview', 'Decision category mapping', 'RACI Matrix population'],
  tools: ['RACI Matrix template'],
  outputs: ['Decision authority map in RACI Matrix'],
  children: [EG_DECISION_AUTH],
}

const EG_BUDGET_AUTH: AISANode = {
  id: 'p1-d1-sa3-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Budget Authority',
  description: 'Establish who controls the project budget at each spend threshold and what the approval process is for budget changes.',
  purpose: 'Ensure budget approvals do not stall delivery by understanding approval thresholds and processes before they are needed.',
  why_it_matters: 'Unplanned spend — on a new vendor licence, additional cloud resources, or a scope extension — requires a budget approval. Without knowing the threshold levels and the right approver in advance, teams wait for approval while the project clock runs.',
  methods: [
    '1. Ask the Executive Sponsor: "Who controls the project budget? Is this you, or a finance function?"',
    '2. Establish spend thresholds: at what level does approval move from the Sponsor to CFO or board?',
    '3. Identify the finance contact who processes purchase orders and budget code assignments.',
    '4. Ask: "What is the approval timeline for a purchase order above £10k? Above £50k?"',
    '5. Confirm whether existing vendor contracts are in place that cover anticipated spend categories.',
    '6. Record budget authority structure in Stakeholder Register and RACI Matrix.',
  ],
  tools: ['RACI Matrix template', 'Stakeholder Register template'],
  outputs: ['Budget authority structure with spend thresholds and approver names'],
  exit_criteria: ['Budget authority confirmed at each threshold level with approver names and approval timelines'],
}

const T_BUDGET_AUTH: AISANode = {
  id: 'p1-d1-sa3-t2',
  type: 'task',
  level: 4,
  title: 'Map Budget Authority',
  description: 'Establish who controls the project budget at each spend threshold and what the approval process is for budget changes.',
  purpose: 'Prevent spend approvals from stalling delivery by knowing the process before it is needed.',
  inputs: ['Executive Sponsor contact', 'Project budget estimate'],
  methods: ['Sponsor and finance interview', 'Threshold mapping', 'RACI population'],
  tools: ['RACI Matrix template'],
  outputs: ['Budget authority structure with thresholds and approver names'],
  children: [EG_BUDGET_AUTH],
}

const EG_OPS_ACCOUNTABILITY: AISANode = {
  id: 'p1-d1-sa3-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Operational Accountability',
  description: 'Establish who is accountable for the AI system once it is in production: performance, availability, incidents, and continuous improvement.',
  purpose: 'Ensure the system has a clear owner post-deployment before architecture decisions are finalised.',
  why_it_matters: 'AI systems without a clearly named operational owner become orphaned after deployment. No one monitors them, no one responds to incidents, no one owns improvement backlogs. This is one of the most common failure modes in enterprise AI.',
  methods: [
    '1. Ask: "Once this system is live, who is accountable if it produces wrong outputs?" This identifies the business accountability holder.',
    '2. Ask: "Who owns the SLA for this system\'s availability?" This identifies the IT accountability holder.',
    '3. Distinguish between (a) business outcome accountability, (b) technical availability accountability, (c) model performance accountability.',
    '4. Confirm the accountability structure is consistent with the RACI Matrix.',
    '5. Record operational accountability assignments in the RACI Matrix and Stakeholder Register.',
  ],
  tools: ['RACI Matrix template', 'Stakeholder Register template'],
  outputs: ['Operational accountability map with named owners per accountability domain'],
  exit_criteria: ['Named accountable owner for business outcomes, technical availability, and model performance post-deployment'],
}

const T_OPS_ACCOUNTABILITY: AISANode = {
  id: 'p1-d1-sa3-t3',
  type: 'task',
  level: 4,
  title: 'Map Operational Accountability',
  description: 'Establish who is accountable for the AI system\'s performance, availability, and continuous improvement once deployed.',
  purpose: 'Prevent the system from becoming orphaned post-deployment by assigning accountability before architecture design.',
  inputs: ['Stakeholder Register', 'IT and Business Owner contacts'],
  methods: ['Business Owner interview', 'IT lead interview', 'Accountability domain mapping'],
  tools: ['RACI Matrix template'],
  outputs: ['Operational accountability map in RACI Matrix'],
  children: [EG_OPS_ACCOUNTABILITY],
}

const SA3_ACCOUNTABILITY: AISANode = {
  id: 'p1-d1-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Determine Accountability',
  description: 'Map who holds formal accountability for decisions, budget, and operational performance across the full AI system lifecycle.',
  purpose: 'Establish clarity of accountability before any design decisions are made, so responsibility is never assumed or disputed.',
  why_it_matters: 'AI systems require human accountability at every layer — for decisions, for outputs, for compliance. Unclear accountability is the root cause of most AI governance failures. AISA\'s principle "Human Accountability Cannot Be Delegated" makes this mapping non-negotiable.',
  inputs: ['Stakeholder Register', 'Project brief', 'RACI Matrix template'],
  questions: ['Who is accountable for each type of decision?', 'Who controls the budget at each threshold?', 'Who is accountable if the system fails post-deployment?'],
  methods: ['Sponsor and IT lead interviews', 'RACI Matrix population', 'Decision category mapping'],
  tools: ['RACI Matrix template'],
  governance_considerations: 'EU AI Act Article 16 requires high-risk AI system providers to assign a named responsible person. This accountability mapping provides the foundation for that requirement.',
  outputs: ['Decision authority map', 'Budget authority structure', 'Operational accountability map'],
  deliverables: ['RACI Matrix — accountability columns populated'],
  exit_criteria: ['Named accountable person for decisions, budget, and operations in RACI Matrix'],
  children: [T_DECISION_AUTH, T_BUDGET_AUTH, T_OPS_ACCOUNTABILITY],
}

// ─── SA4: Assess Stakeholder Influence ───────────────────────────────

const EG_INFLUENCE_RATING: AISANode = {
  id: 'p1-d1-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Rating Stakeholder Influence Levels',
  description: 'Assess and document the relative influence each stakeholder has over the project — their ability to shape, accelerate, or block outcomes.',
  purpose: 'Prioritise engagement effort and anticipate where resistance or acceleration may come from.',
  why_it_matters: 'Not all stakeholders have equal influence. Spending equal time on low-influence stakeholders while under-engaging high-influence ones misallocates project time. A simple influence map allows the project team to invest engagement where it matters most.',
  methods: [
    '1. List all stakeholders from the Stakeholder Register.',
    '2. For each stakeholder, rate influence on a three-point scale: High (can approve, block, or terminate the project), Medium (can slow the project or shape requirements significantly), Low (consulted or informed but cannot unilaterally affect outcomes).',
    '3. Rate their interest/engagement level: High (actively engaged), Medium (intermittently engaged), Low (minimal day-to-day interest).',
    '4. Plot on a 2×2 influence-interest matrix: High/High = manage closely; High/Low = keep satisfied; Low/High = keep informed; Low/Low = monitor.',
    '5. Update the Stakeholder Register with influence rating and engagement strategy.',
  ],
  tools: ['Stakeholder Register template', 'Influence-interest matrix template'],
  outputs: ['Influence-interest matrix with engagement strategy per stakeholder'],
  exit_criteria: ['All stakeholders rated on influence and interest with engagement strategy documented'],
}

const T_INFLUENCE_RATING: AISANode = {
  id: 'p1-d1-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Rate Stakeholder Influence Level',
  description: 'Assess each stakeholder\'s ability to shape, accelerate, or block project outcomes.',
  purpose: 'Prioritise engagement effort by influence level.',
  inputs: ['Complete Stakeholder Register', 'RACI Matrix'],
  methods: ['Three-point influence scale assessment', 'Influence-interest matrix plotting'],
  tools: ['Stakeholder Register template', 'Influence-interest matrix'],
  outputs: ['Stakeholder Register with influence ratings'],
  children: [EG_INFLUENCE_RATING],
}

const EG_BLOCKERS: AISANode = {
  id: 'p1-d1-sa4-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Potential Blockers',
  description: 'Identify stakeholders who may actively resist, delay, or block the AI initiative and understand their reasons.',
  purpose: 'Surface resistance early so it can be addressed through engagement, not discovered mid-project when it manifests as a governance veto or project freeze.',
  why_it_matters: 'Resistance to AI projects is common and predictable: job security fears, ethical objections, technology scepticism, or previous failed project experiences. Identifying likely blockers in discovery allows the project team to engage them constructively before positions harden.',
  methods: [
    '1. Review the influence-interest matrix. Focus on high-influence stakeholders with low or unknown interest.',
    '2. For each high-influence stakeholder, ask their manager or peers: "Is there anyone who has reservations about AI in this department?"',
    '3. During introductory stakeholder meetings, listen for: reluctance to engage, deflection to others, focus on risk over benefit, mentions of a previous failed project.',
    '4. For each identified potential blocker, document their likely concern: job threat, privacy, quality, past failure, workload, policy.',
    '5. Do not attempt to resolve their concerns in this activity — document them for the communication strategy.',
    '6. Flag high-influence blockers to the Executive Sponsor.',
  ],
  tools: ['Stakeholder Register template', 'Influence-interest matrix'],
  outputs: ['List of potential blockers with identified concern and recommended engagement approach'],
  exit_criteria: ['All high-influence stakeholders assessed for blocker risk; concerns documented and flagged to Sponsor'],
}

const T_BLOCKERS: AISANode = {
  id: 'p1-d1-sa4-t2',
  type: 'task',
  level: 4,
  title: 'Identify Potential Blockers',
  description: 'Identify stakeholders who may resist or block the AI initiative and document the likely source of their resistance.',
  purpose: 'Surface resistance early for proactive engagement before it hardens into formal opposition.',
  inputs: ['Influence-interest matrix', 'Stakeholder introductory meeting notes'],
  methods: ['High-influence stakeholder review', 'Resistance signal identification', 'Concern documentation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Blocker list with concern type and engagement recommendation'],
  children: [EG_BLOCKERS],
}

const EG_CHAMPIONS: AISANode = {
  id: 'p1-d1-sa4-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Project Champions',
  description: 'Identify stakeholders who are enthusiastic advocates for the AI initiative and can actively support adoption and delivery.',
  purpose: 'Leverage internal champions to accelerate buy-in, support change management, and provide early success stories.',
  why_it_matters: 'Champions are as important as blockers. They can pre-sell the initiative to sceptics, volunteer for pilots, surface issues quickly, and provide social proof during rollout. Identifying and activating them early is a change management accelerant.',
  methods: [
    '1. Review the influence-interest matrix. Focus on high-interest stakeholders across influence levels.',
    '2. During introductory meetings, note who asks forward-looking questions, volunteers suggestions, and expresses enthusiasm.',
    '3. Ask the Business Owner: "Who in your team would be most excited about this initiative?"',
    '4. Identify champions at two levels: (a) senior champions who can influence peers and leadership, (b) operational champions who can support adoption on the ground.',
    '5. For each champion, confirm their willingness to act as a visible advocate and participate in pilot or early testing.',
    '6. Record in Stakeholder Register with champion role and planned engagement activities.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Champion list with roles and planned engagement activities'],
  exit_criteria: ['At least one named champion per major stakeholder group identified and confirmed'],
}

const T_CHAMPIONS: AISANode = {
  id: 'p1-d1-sa4-t3',
  type: 'task',
  level: 4,
  title: 'Identify Project Champions',
  description: 'Identify enthusiastic internal advocates who can actively support adoption and delivery.',
  purpose: 'Build an internal coalition of support that accelerates buy-in and adoption.',
  inputs: ['Influence-interest matrix', 'Stakeholder meeting notes', 'Business Owner recommendations'],
  methods: ['High-interest stakeholder identification', 'Advocacy confirmation', 'Champion role assignment'],
  tools: ['Stakeholder Register template'],
  outputs: ['Champion list with advocacy roles'],
  children: [EG_CHAMPIONS],
}

const SA4_INFLUENCE: AISANode = {
  id: 'p1-d1-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Assess Stakeholder Influence',
  description: 'Evaluate each stakeholder\'s ability to shape, accelerate, or block the AI initiative and map their relative influence and interest.',
  purpose: 'Prioritise engagement effort and anticipate the political landscape before requirements workshops begin.',
  why_it_matters: 'Stakeholder influence assessment is the difference between stakeholder management and stakeholder awareness. Knowing who can stop the project and who can accelerate it allows the team to allocate engagement time strategically.',
  inputs: ['Complete Stakeholder Register', 'Introductory meeting notes'],
  questions: ['Who has the power to block this project?', 'Who has the power to accelerate it?', 'Whose resistance is predictable and what is driving it?'],
  methods: ['Influence-interest matrix', 'Blocker and champion identification', 'Engagement strategy design'],
  tools: ['Stakeholder Register template', 'Influence-interest matrix'],
  outputs: ['Influence ratings', 'Blocker list', 'Champion list', 'Engagement strategies per stakeholder'],
  deliverables: ['Stakeholder Register — influence section completed'],
  exit_criteria: ['All stakeholders rated on influence and interest; blockers and champions identified'],
  children: [T_INFLUENCE_RATING, T_BLOCKERS, T_CHAMPIONS],
}

// ─── SA5: Assess Stakeholder Interests ────────────────────────────────

const EG_PRIMARY_INTERESTS: AISANode = {
  id: 'p1-d1-sa5-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Documenting Primary Interests by Role',
  description: 'Record what each stakeholder group fundamentally wants from this AI initiative — their primary interest, goal, or desired outcome.',
  purpose: 'Understand what each stakeholder is optimising for so requirements can be framed in terms that resonate with their interests.',
  why_it_matters: 'Stakeholders support AI systems that serve their interests and resist those that do not. Documenting interests allows the project team to frame the initiative in terms each group finds compelling and to identify early where interests conflict.',
  methods: [
    '1. During introductory stakeholder meetings, ask each person: "What would a successful outcome look like for you specifically?"',
    '2. Listen for the underlying interest, not just the stated preference. "I want real-time dashboards" is a preference; "I need to respond to incidents faster" is the interest.',
    '3. Group interests by role type. Look for patterns: executives want ROI and risk reduction; operations teams want workload reduction; compliance teams want auditability.',
    '4. Note interests that are in potential conflict — for example, "speed over accuracy" (operations) vs "accuracy over speed" (compliance).',
    '5. Record primary interest per stakeholder in the Stakeholder Register.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Primary interest documented per stakeholder or role group'],
  exit_criteria: ['Primary interest recorded for all key stakeholders; conflicting interests flagged'],
}

const T_PRIMARY_INTERESTS: AISANode = {
  id: 'p1-d1-sa5-t1',
  type: 'task',
  level: 4,
  title: 'Document Primary Interests by Role',
  description: 'Record what each stakeholder group wants from the AI initiative — their fundamental goal, not just their stated preference.',
  purpose: 'Understand stakeholder motivations so requirements can be framed compellingly.',
  inputs: ['Stakeholder Register', 'Introductory meeting notes'],
  methods: ['Interest extraction from stakeholder interviews', 'Underlying interest vs stated preference analysis'],
  tools: ['Stakeholder Register template'],
  outputs: ['Primary interests per stakeholder in Stakeholder Register'],
  children: [EG_PRIMARY_INTERESTS],
}

const EG_CONCERNS: AISANode = {
  id: 'p1-d1-sa5-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Documenting Concerns and Objections',
  description: 'Record the concerns, reservations, and objections each stakeholder has about the AI initiative.',
  purpose: 'Surface concerns early so they can be addressed through design and communication, not encountered as last-minute vetoes.',
  why_it_matters: 'Undocumented concerns do not disappear — they reappear as scope changes, governance objections, or adoption failures at the worst possible moment. Early documentation converts implicit resistance into addressable requirements.',
  methods: [
    '1. Ask each stakeholder: "What concerns do you have about this initiative?" Create space for honest answers by asking in a one-on-one setting where possible.',
    '2. If stakeholders are reluctant to voice concerns directly, ask: "What would make this initiative fail in your view?"',
    '3. Categorise concerns: (a) ethical concerns about AI, (b) data privacy and security, (c) job displacement fears, (d) system reliability, (e) integration with existing systems, (f) past failed projects.',
    '4. Note the stakeholder\'s influence level next to each concern — high-influence, high-concern stakeholders require direct sponsor engagement.',
    '5. Record in Stakeholder Register and surface actionable concerns to the Business Owner and Sponsor.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Concerns log per stakeholder with category and influence level'],
  exit_criteria: ['Concerns documented for all high-influence stakeholders; high-risk concerns escalated to Sponsor'],
}

const T_CONCERNS: AISANode = {
  id: 'p1-d1-sa5-t2',
  type: 'task',
  level: 4,
  title: 'Document Concerns and Objections',
  description: 'Record the concerns and objections each stakeholder has about the AI initiative before they become obstacles.',
  purpose: 'Convert implicit resistance into addressable design and communication requirements.',
  inputs: ['Stakeholder Register with influence ratings', 'Stakeholder meeting notes'],
  methods: ['Direct concern elicitation', 'Failure-mode questioning', 'Concern categorisation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Concern log with categories and influence-weighted risk ratings'],
  children: [EG_CONCERNS],
}

const EG_SUCCESS_CRITERIA: AISANode = {
  id: 'p1-d1-sa5-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Success Criteria per Stakeholder',
  description: 'Define what each stakeholder considers a successful outcome and how they will personally assess whether the project succeeded.',
  purpose: 'Build measurable success criteria that satisfy the full stakeholder set, not just the executive sponsor or the technology team.',
  why_it_matters: 'A project declared successful by the sponsor can still fail if the end users, compliance team, or operations team consider it unsatisfactory. Documenting success criteria per stakeholder prevents this "successful failure."',
  methods: [
    '1. Ask each key stakeholder: "Six months after this system goes live, what would you see or measure that would tell you this project was a success?"',
    '2. Push for specificity. Vague answers ("it just works") should be probed: "What does \'working\' look like in practice for you?"',
    '3. Note success criteria that are measurable (latency, accuracy, cost saved) vs qualitative (easier to use, feels trustworthy).',
    '4. Identify success criteria that conflict with each other. For example, "completely automated" (Sponsor) vs "always reviewed by a human" (Compliance).',
    '5. Record per stakeholder in the Stakeholder Register. These form the input to D9 (Success Metrics Definition).',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Per-stakeholder success criteria feeding into KPI definition'],
  exit_criteria: ['Success criteria documented for all key stakeholders; conflicts identified and escalated'],
}

const T_SUCCESS_CRITERIA: AISANode = {
  id: 'p1-d1-sa5-t3',
  type: 'task',
  level: 4,
  title: 'Identify Success Criteria per Stakeholder',
  description: 'Define measurable and qualitative success criteria as each stakeholder group understands them.',
  purpose: 'Ensure the final system satisfies the full stakeholder set, not just the executive or the technical team.',
  inputs: ['Stakeholder Register with interests and concerns', 'Project objectives'],
  methods: ['Future-state success questioning', 'Specificity probing', 'Conflict identification'],
  tools: ['Stakeholder Register template'],
  outputs: ['Per-stakeholder success criteria in Stakeholder Register'],
  children: [EG_SUCCESS_CRITERIA],
}

const SA5_INTERESTS: AISANode = {
  id: 'p1-d1-sa5',
  type: 'sub-activity',
  level: 3,
  title: 'Assess Stakeholder Interests',
  description: 'Document what each stakeholder fundamentally wants from the AI initiative, what they fear, and what success means to them personally.',
  purpose: 'Ensure the project\'s value proposition is framed correctly for each stakeholder and that no success criteria are missed.',
  why_it_matters: 'Requirements gathering without understanding stakeholder interests produces requirements that look complete but miss what actually matters to the people who will judge the project\'s success.',
  inputs: ['Stakeholder Register with influence ratings', 'Project brief'],
  questions: ['What does each stakeholder want from this initiative?', 'What are they worried about?', 'How will they personally judge success?'],
  methods: ['One-on-one stakeholder interviews', 'Interest and concern elicitation', 'Success criteria definition'],
  tools: ['Stakeholder Register template'],
  outputs: ['Primary interests, concerns, and success criteria per stakeholder'],
  deliverables: ['Stakeholder Register — interests section completed'],
  exit_criteria: ['Interests, concerns, and success criteria documented for all key stakeholders; conflicts identified'],
  children: [T_PRIMARY_INTERESTS, T_CONCERNS, T_SUCCESS_CRITERIA],
}

// ─── SA6: Define Communication Structure ─────────────────────────────

const EG_MEETING_CADENCE: AISANode = {
  id: 'p1-d1-sa6-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining the Meeting Cadence',
  description: 'Establish the recurring meeting schedule for each stakeholder tier: executive governance, project team, and operational touchpoints.',
  purpose: 'Ensure each stakeholder group receives the right level of engagement at the right frequency throughout the project.',
  why_it_matters: 'Ad-hoc communication creates information voids that fill with rumour and anxiety. A defined meeting cadence ensures issues surface at the right forum, not via unstructured escalation.',
  methods: [
    '1. Define a three-tier meeting structure: (a) Executive Steering: monthly, Executive Sponsor + Business Owner; (b) Project Status: weekly, full project team; (c) Technical: as-needed, technical architects and IT.',
    '2. For each meeting: define attendees, agenda structure (status, risks, decisions needed), duration, and owner.',
    '3. Propose cadence to the Executive Sponsor and Business Owner. Adjust based on their availability constraints.',
    '4. Book all recurring sessions in calendar for the full project duration.',
    '5. Define what is out-of-cadence: when to call an emergency meeting, what triggers an unscheduled escalation.',
    '6. Record the meeting cadence in the Communication Plan.',
  ],
  tools: ['Communication Plan template', 'Calendar system'],
  outputs: ['Recurring meeting schedule across all three tiers, booked in calendar'],
  exit_criteria: ['All recurring meetings scheduled for project duration with confirmed attendance from key stakeholders'],
}

const T_MEETING_CADENCE: AISANode = {
  id: 'p1-d1-sa6-t1',
  type: 'task',
  level: 4,
  title: 'Define Meeting Cadence',
  description: 'Establish the recurring meeting schedule across executive, project, and technical tiers.',
  purpose: 'Prevent information voids by structuring stakeholder engagement cadence from day one.',
  inputs: ['Stakeholder Register', 'Project timeline'],
  methods: ['Three-tier cadence design', 'Sponsor availability confirmation', 'Calendar booking'],
  tools: ['Communication Plan template', 'Calendar system'],
  outputs: ['Meeting cadence documented and booked'],
  children: [EG_MEETING_CADENCE],
}

const EG_CHANNELS: AISANode = {
  id: 'p1-d1-sa6-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining Communication Channels',
  description: 'Establish which communication channels are used for which type of message across the project.',
  purpose: 'Prevent important information from being lost in email noise or informal channels by defining explicit channel norms.',
  why_it_matters: 'Without channel norms, project teams end up with critical decisions buried in email threads, status updates on WhatsApp, and architectural discussions spread across three different tools. Channel clarity ensures information is findable and auditable.',
  methods: [
    '1. Identify the organisation\'s approved communication tools: email, Teams, Slack, Confluence, SharePoint.',
    '2. Define channel-to-purpose mapping: (a) decisions and approvals → formal email or project management tool with tracking; (b) day-to-day collaboration → Teams/Slack channel; (c) documentation → Confluence/SharePoint; (d) status reporting → project management tool.',
    '3. Agree on a single source of truth for project documentation.',
    '4. Confirm which channels require version history for audit purposes.',
    '5. Record the channel map in the Communication Plan.',
  ],
  tools: ['Communication Plan template', 'Organisation\'s approved toolset'],
  outputs: ['Communication channel map by message type'],
  exit_criteria: ['Channel norms agreed with project team and key stakeholders'],
}

const T_CHANNELS: AISANode = {
  id: 'p1-d1-sa6-t2',
  type: 'task',
  level: 4,
  title: 'Define Communication Channels',
  description: 'Establish which communication tools and channels are used for which types of project communication.',
  purpose: 'Ensure critical information is structured, findable, and auditable.',
  inputs: ['Organisation\'s approved tool inventory', 'Project team preferences'],
  methods: ['Channel-to-purpose mapping', 'Tool audit', 'Stakeholder agreement'],
  tools: ['Communication Plan template'],
  outputs: ['Communication channel map'],
  children: [EG_CHANNELS],
}

const EG_ESCALATION: AISANode = {
  id: 'p1-d1-sa6-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Defining Escalation Paths',
  description: 'Establish the chain of escalation for issues, risks, and decisions that exceed the project team\'s authority.',
  purpose: 'Ensure issues are escalated quickly and to the right person so they are resolved before they become blockers.',
  why_it_matters: 'Without a defined escalation path, team members either hold issues too long — waiting for the next scheduled meeting — or escalate to the wrong person, creating confusion and delay. A clear escalation ladder prevents both failure modes.',
  methods: [
    '1. Define three escalation triggers: (a) scope change request, (b) budget overrun or unexpected spend, (c) unresolved technical or policy conflict.',
    '2. For each trigger, define the escalation chain: Project Lead → Business Owner → Executive Sponsor → Board (if applicable).',
    '3. Define maximum hold times at each level: issue unresolved for 24 hours → escalate to next level.',
    '4. Confirm escalation paths with the Executive Sponsor and Business Owner.',
    '5. Identify how AI-specific issues (e.g., model quality failure, data breach, EU AI Act compliance gap) escalate — these may require DPO or legal involvement.',
    '6. Record escalation paths in the Communication Plan.',
  ],
  tools: ['Communication Plan template', 'Risk register template'],
  outputs: ['Escalation path matrix with triggers, chain, and hold times'],
  exit_criteria: ['Escalation paths agreed by Sponsor and Business Owner; AI-specific escalation paths confirmed with compliance team'],
}

const T_ESCALATION: AISANode = {
  id: 'p1-d1-sa6-t3',
  type: 'task',
  level: 4,
  title: 'Define Escalation Paths',
  description: 'Establish the escalation chain for issues and decisions that exceed the project team\'s authority.',
  purpose: 'Enable fast resolution of issues by making the escalation path explicit before it is needed.',
  inputs: ['Stakeholder Register', 'Decision authority map', 'RACI Matrix'],
  methods: ['Trigger identification', 'Escalation chain mapping', 'Sponsor and Business Owner confirmation'],
  tools: ['Communication Plan template'],
  outputs: ['Escalation path matrix'],
  children: [EG_ESCALATION],
}

const SA6_COMMUNICATION: AISANode = {
  id: 'p1-d1-sa6',
  type: 'sub-activity',
  level: 3,
  title: 'Define Communication Structure',
  description: 'Establish the meeting cadence, communication channels, and escalation paths that will govern information flow throughout the project.',
  purpose: 'Ensure every stakeholder receives the right information at the right time through the right channel, and knows exactly how to escalate when needed.',
  why_it_matters: 'Poor communication is consistently ranked as the top cause of project failure across industry surveys. For AI projects, where decisions are complex and technical, structured communication is essential to prevent misunderstanding, misalignment, and late surprises.',
  inputs: ['Stakeholder Register with influence ratings', 'Organisation\'s approved tool inventory', 'Project timeline'],
  questions: ['How often does each stakeholder tier need to be informed or consulted?', 'Which channels are authoritative for decisions?', 'What triggers an escalation?'],
  methods: ['Three-tier meeting cadence design', 'Channel-to-purpose mapping', 'Escalation path definition'],
  tools: ['Communication Plan template', 'Calendar system'],
  outputs: ['Communication Plan: meeting cadence, channel map, escalation matrix'],
  deliverables: ['Communication Plan (as appendix to Stakeholder Register or standalone document)'],
  exit_criteria: ['Meeting cadence booked, channel norms agreed, escalation paths confirmed by Sponsor and Business Owner'],
  children: [T_MEETING_CADENCE, T_CHANNELS, T_ESCALATION],
}

// ─── SA7: Create Stakeholder Register ─────────────────────────────────

const EG_RACI: AISANode = {
  id: 'p1-d1-sa7-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the RACI Matrix',
  description: 'Construct the RACI Matrix that defines who is Responsible, Accountable, Consulted, and Informed for each activity in the project and the resulting AI system.',
  purpose: 'Eliminate accountability ambiguity for every project activity and system decision.',
  why_it_matters: 'The RACI Matrix is the accountability engine of the project. Without it, work items have no clear owner, approvals circulate endlessly, and accountability conversations happen in retrospect rather than by design.',
  methods: [
    '1. List all major project activities vertically: each phase deliverable, each governance decision, each key milestone.',
    '2. List all stakeholder roles horizontally: Executive Sponsor, Business Owner, Process Owner, IT Lead, Security Lead, Compliance Lead, Project Architect, Project Manager.',
    '3. For each activity-stakeholder intersection, assign: R (does the work), A (owns the outcome — max one per row), C (must be consulted before completion), I (notified after completion).',
    '4. Validate that every row has exactly one A. Multiple Accountable entries indicate an accountability gap.',
    '5. Review the RACI with the Executive Sponsor and Business Owner. Confirm all accountable assignments.',
    '6. Store the RACI Matrix in the project documentation repository as a controlled document.',
  ],
  tools: ['RACI Matrix template (spreadsheet or project management tool)'],
  outputs: ['Completed, reviewed, and approved RACI Matrix'],
  exit_criteria: ['Every project activity has exactly one Accountable entry; RACI reviewed and approved by Executive Sponsor'],
}

const T_RACI: AISANode = {
  id: 'p1-d1-sa7-t1',
  type: 'task',
  level: 4,
  title: 'Build RACI Matrix',
  description: 'Construct the project RACI Matrix defining Responsible, Accountable, Consulted, and Informed assignments for all major activities.',
  purpose: 'Establish a single, approved accountability reference for the full project lifecycle.',
  inputs: ['Complete Stakeholder Register', 'Project activity list', 'Decision authority map'],
  methods: ['Activity-stakeholder matrix construction', 'Accountability validation', 'Sponsor and Business Owner review'],
  tools: ['RACI Matrix template'],
  outputs: ['Approved RACI Matrix'],
  children: [EG_RACI],
}

const EG_PROFILES: AISANode = {
  id: 'p1-d1-sa7-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Compiling Stakeholder Profiles',
  description: 'Assemble the complete stakeholder profile for each key individual, consolidating all information gathered across SA1–SA6 into a single reference.',
  purpose: 'Provide a complete, single-source profile for each stakeholder that can be referenced throughout the project lifecycle.',
  why_it_matters: 'Information gathered in separate sub-activities — contact details, influence ratings, interests, concerns, success criteria — is only useful when consolidated into a single accessible reference. Scattered notes do not enable consistent engagement.',
  methods: [
    '1. For each stakeholder in the Register, open their profile entry and confirm the following are populated: (a) full name and contact details, (b) role and reporting line, (c) RACI assignment, (d) influence and interest rating, (e) primary interests, (f) concerns and objections, (g) success criteria, (h) preferred communication channel and meeting cadence.',
    '2. Identify any incomplete profiles and follow up directly with the relevant stakeholder or their manager.',
    '3. Review all profiles for internal consistency. Ensure stated interests and success criteria align with the RACI assignment.',
    '4. Sanitise: remove any speculative or sensitive notes not appropriate for a formal project document.',
  ],
  tools: ['Stakeholder Register template'],
  outputs: ['Complete stakeholder profiles for all key individuals'],
  exit_criteria: ['All key stakeholder profiles fully populated with no missing required fields'],
}

const T_PROFILES: AISANode = {
  id: 'p1-d1-sa7-t2',
  type: 'task',
  level: 4,
  title: 'Compile Stakeholder Profiles',
  description: 'Consolidate all stakeholder information gathered across sub-activities into complete, single-source profiles.',
  purpose: 'Create a usable reference document that the full project team can rely on throughout delivery.',
  inputs: ['Notes from SA1–SA6', 'RACI Matrix'],
  methods: ['Profile consolidation', 'Completeness review', 'Consistency validation'],
  tools: ['Stakeholder Register template'],
  outputs: ['Complete stakeholder profiles'],
  children: [EG_PROFILES],
}

const EG_REGISTER_SIGNOFF: AISANode = {
  id: 'p1-d1-sa7-t3-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Reviewing and Signing Off the Stakeholder Register',
  description: 'Present the completed Stakeholder Register and RACI Matrix to the Executive Sponsor and Business Owner for formal review and approval.',
  purpose: 'Obtain formal approval of the stakeholder map and accountability structure before Phase 2 begins.',
  why_it_matters: 'The Stakeholder Register is the foundation of project governance. Proceeding to Phase 2 without formal approval means the team may be working with an incomplete or inaccurate stakeholder picture — with no senior endorsement of who is accountable for what.',
  methods: [
    '1. Share the completed Stakeholder Register and RACI Matrix with the Executive Sponsor and Business Owner 48 hours before the review meeting.',
    '2. In the review meeting, walk through: (a) all key stakeholders identified, (b) accountability assignments in the RACI, (c) any identified blockers or champions, (d) the communication plan.',
    '3. Invite corrections: "Is there anyone missing from this register? Are the accountability assignments correct?"',
    '4. Address any corrections and update the document.',
    '5. Obtain formal sign-off: email confirmation from the Executive Sponsor and Business Owner is the minimum acceptable approval.',
    '6. Version the document and store in the project repository. This becomes a controlled document.',
  ],
  tools: ['Stakeholder Register template', 'RACI Matrix', 'Project document repository'],
  outputs: ['Signed-off Stakeholder Register and RACI Matrix stored as v1.0 controlled documents'],
  exit_criteria: ['Written approval received from Executive Sponsor and Business Owner; document stored as controlled version'],
}

const T_REGISTER_SIGNOFF: AISANode = {
  id: 'p1-d1-sa7-t3',
  type: 'task',
  level: 4,
  title: 'Review and Sign Off Stakeholder Register',
  description: 'Obtain formal approval of the completed Stakeholder Register and RACI Matrix from the Executive Sponsor and Business Owner.',
  purpose: 'Establish formal, approved accountability and stakeholder documentation before Phase 2 begins.',
  inputs: ['Complete Stakeholder Register', 'Approved RACI Matrix', 'Communication Plan'],
  methods: ['Senior review meeting', 'Correction and update cycle', 'Formal sign-off'],
  tools: ['Stakeholder Register', 'RACI Matrix', 'Project document repository'],
  outputs: ['Signed-off Stakeholder Register v1.0'],
  children: [EG_REGISTER_SIGNOFF],
}

const SA7_REGISTER: AISANode = {
  id: 'p1-d1-sa7',
  type: 'sub-activity',
  level: 3,
  title: 'Create Stakeholder Register',
  description: 'Consolidate all stakeholder identification, accountability, influence, interest, and communication information into a formally approved Stakeholder Register and RACI Matrix.',
  purpose: 'Produce the definitive, approved reference document for all stakeholder and accountability information before Phase 2 begins.',
  why_it_matters: 'The Stakeholder Register is the first formal deliverable of Phase 1. It signals that stakeholder mapping is a serious, governed activity — not an informal list. Phase 2 regulatory and governance work depends on it being complete and accurate.',
  inputs: ['All outputs from SA1–SA6', 'RACI Matrix template'],
  questions: ['Is every key stakeholder profiled?', 'Does every project activity have a single Accountable owner?', 'Are the Executive Sponsor and Business Owner prepared to formally approve this document?'],
  methods: ['Profile consolidation', 'RACI Matrix construction and validation', 'Formal review and sign-off'],
  tools: ['Stakeholder Register template', 'RACI Matrix template', 'Project document repository'],
  outputs: ['Completed Stakeholder Register', 'Approved RACI Matrix'],
  deliverables: ['Stakeholder Register v1.0 (signed off)', 'RACI Matrix v1.0 (signed off)'],
  exit_criteria: ['All profiles complete; RACI has exactly one Accountable per row; formal sign-off received from Sponsor and Business Owner'],
  children: [T_RACI, T_PROFILES, T_REGISTER_SIGNOFF],
}

// ═══════════════════════════════════════════════════════════════════════
// D1 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D1: AISANode = {
  id: 'p1-d1',
  type: 'activity',
  level: 2,
  title: 'D1 — Stakeholder Identification',
  description: 'Systematic identification, profiling, and engagement planning for all individuals and groups with interest, influence, or accountability in the AI initiative — internal and external.',
  purpose: 'Ensure no relevant party is missed before requirements are gathered, governance is assigned, or design decisions are made.',
  why_it_matters: 'Missing a key stakeholder — a DPO, an operations team, an end-user group — will surface later as a requirement gap, a governance veto, or an adoption failure. Early identification converts unknown stakeholders into design inputs before the cost of discovering them becomes high.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First', 'Governance by Design'],
  inputs: ['Project commissioning document', 'Organisational chart', 'Project brief', 'Existing system documentation'],
  questions: [
    'Who commissioned and approved this initiative?',
    'Who owns the business domain being affected?',
    'Who controls the data this system will use?',
    'Who is responsible for compliance and data protection?',
    'Who will operate the system in production?',
    'Who outside the organisation is affected by this system?',
  ],
  activities: [
    'Identify all internal stakeholder roles',
    'Identify all external stakeholders and regulatory contacts',
    'Determine decision and budget accountability',
    'Assess stakeholder influence and interest',
    'Define communication cadence and escalation paths',
    'Produce approved Stakeholder Register and RACI Matrix',
  ],
  methods: ['Stakeholder workshops', 'Organisational chart review', 'Sponsor and Business Owner interviews', 'RACI Matrix construction', 'Influence-interest mapping'],
  tools: ['Stakeholder Register template', 'RACI Matrix template', 'Influence-interest matrix', 'Communication Plan template', 'Miro or equivalent for mapping'],
  governance_considerations: 'GDPR requires a named Data Protection Officer for many AI use cases involving personal data. EU AI Act high-risk systems require named responsible persons per Article 16. This activity produces the accountability foundation for both frameworks.',
  security_considerations: 'The Security team must be identified and briefed in Phase 1 to ensure they are engaged for the Phase 2 threat model. Late security engagement is a primary cause of security architecture rework.',
  ai_engineering_considerations: 'AI-specific roles — ML engineers, data scientists, model validators — may not appear in a standard organisational chart. Ask the IT team explicitly whether these roles exist internally or must be sourced externally.',
  outputs: ['Stakeholder Register', 'RACI Matrix', 'Communication Plan', 'Influence-interest matrix'],
  deliverables: ['Stakeholder Register v1.0 (signed off)', 'RACI Matrix v1.0 (signed off)'],
  exit_criteria: [
    'All key internal and external stakeholders identified and profiled',
    'RACI Matrix has exactly one Accountable person per activity',
    'Executive Sponsor and Business Owner have formally approved the Stakeholder Register',
    'Communication cadence is booked and escalation paths are agreed',
  ],
  related_phases: ['phase-2'],
  references: [
    { title: 'EU AI Act — Article 16 (High-Risk AI System Obligations)', type: 'standard' },
    { title: 'GDPR — Article 37 (Data Protection Officer)', type: 'standard' },
    { title: 'Project Management Body of Knowledge (PMBOK)', type: 'framework' },
  ],
  children: [SA1_INTERNAL, SA2_EXTERNAL, SA3_ACCOUNTABILITY, SA4_INFLUENCE, SA5_INTERESTS, SA6_COMMUNICATION, SA7_REGISTER],
}
