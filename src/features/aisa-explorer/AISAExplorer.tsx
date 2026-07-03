/**
 * AI Strategy — AISA Framework Explorer
 * Enterprise methodology platform. 3 levels: Journey → Phase → Activity.
 * Single purple accent, typography-first, progressive disclosure.
 */

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Compass, ShieldCheck, Layers, Code2, Rocket, TrendingUp,
  ChevronRight, X, BookOpen, Check, ArrowLeft, ArrowRight,
  type LucideIcon,
} from 'lucide-react'

// ── Types ───────────────────────────────────────────────────────────────────

interface Activity {
  id: string
  num: number
  title: string
  tagline: string
  purpose: string
  keyQuestions: string[]
  deliverables: string[]
}

interface Phase {
  id: string
  num: string
  title: string
  tagline: string
  description: string
  Icon: LucideIcon
  foundations: string[]
  deliverables: string[]
  aboutPhase: string
  activities: Activity[]
}

interface FrameworkRef {
  full: string
  org: string
  year: string
  why: string
  ref: string
}

type View = 'landing' | 'phase' | 'activity'

// ── Framework reference library ─────────────────────────────────────────────

const FRAMEWORK_REFS: Record<string, FrameworkRef> = {
  'TOGAF': {
    full: 'The Open Group Architecture Framework',
    org: 'The Open Group',
    year: '10th Edition, 2022',
    why: 'Used in AISA to structure enterprise architecture decisions and enforce phase-gate governance across the AI lifecycle.',
    ref: 'The Open Group. TOGAF Standard, 10th Edition. The Open Group, 2022.',
  },
  'ISO/IEC 42001': {
    full: 'Artificial Intelligence Management System Standard',
    org: 'International Organization for Standardization',
    year: '2023',
    why: 'Provides the governance structure for responsible AI management throughout the Govern and Operate & Evolve phases.',
    ref: 'ISO/IEC 42001:2023. Artificial Intelligence — Management System. Geneva: ISO, 2023.',
  },
  'NIST AI RMF': {
    full: 'AI Risk Management Framework',
    org: 'National Institute of Standards and Technology',
    year: '2023',
    why: 'Applied in Govern and Operate phases for systematic AI risk identification, measurement and mitigation.',
    ref: 'NIST. Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST AI 100-1, 2023.',
  },
  'ISO 31000': {
    full: 'Risk Management — Guidelines',
    org: 'International Organization for Standardization',
    year: '2018',
    why: 'Provides foundational risk management principles applied throughout the Govern phase.',
    ref: 'ISO 31000:2018. Risk Management — Guidelines. Geneva: ISO, 2018.',
  },
  'EU AI Act': {
    full: 'Artificial Intelligence Act',
    org: 'European Parliament & Council',
    year: '2024',
    why: 'The primary regulatory framework guiding compliance decisions in Govern for organisations operating in the EU.',
    ref: 'Regulation (EU) 2024/1689 of the European Parliament and of the Council, 12 July 2024.',
  },
  'Domain-Driven Design': {
    full: 'Domain-Driven Design',
    org: 'Eric Evans',
    year: '2003',
    why: 'Used to define bounded contexts and business capability domains in Discover and Architect phases.',
    ref: 'Evans, E. Domain-Driven Design: Tackling Complexity in the Heart of Software. Addison-Wesley, 2003.',
  },
  'Human-Centred AI': {
    full: 'Human-Centred Artificial Intelligence',
    org: 'EU High-Level Expert Group on AI',
    year: '2019',
    why: 'Ensures AI systems are designed with human needs, values and meaningful oversight at the centre of every decision.',
    ref: 'High-Level Expert Group on AI. Ethics Guidelines for Trustworthy AI. European Commission, 2019.',
  },
  'Systems Thinking': {
    full: 'Systems Thinking',
    org: 'Peter Senge / Jay Forrester',
    year: '1990',
    why: 'Applied in Discover and Operate & Evolve to understand complex interdependencies before designing or changing solutions.',
    ref: 'Senge, P. The Fifth Discipline: The Art and Practice of the Learning Organisation. Doubleday, 1990.',
  },
  'SOLID Principles': {
    full: 'SOLID Design Principles',
    org: 'Robert C. Martin',
    year: '2000',
    why: 'Applied in Build to ensure AI system components are maintainable, extensible and independently testable.',
    ref: 'Martin, R.C. Design Principles and Design Patterns. ObjectMentor, 2000.',
  },
  'DevSecOps': {
    full: 'Development Security Operations',
    org: 'NIST / CISA',
    year: '2021',
    why: 'Ensures security is integrated into every stage of Build and Deploy — not retrofitted after release.',
    ref: 'NIST. Recommended Practices Guide for Securing Software Deployment Operations. NIST SP 800-204D, 2023.',
  },
  'OODA Loop': {
    full: 'Observe–Orient–Decide–Act Loop',
    org: 'Colonel John Boyd, USAF',
    year: '1960s',
    why: 'Applied in Discover and Operate & Evolve phases to support rapid, structured decision-making under uncertainty.',
    ref: 'Boyd, J.R. A Discourse on Winning and Losing. Air University Press, 2018.',
  },
  'Lean Architecture': {
    full: 'Lean Architecture for Agile Software Development',
    org: 'James O. Coplien & Gertrud Bjørnvig',
    year: '2010',
    why: 'Guides AISA practitioners to defer architectural decisions to the last responsible moment, avoiding speculative complexity.',
    ref: 'Coplien, J. & Bjørnvig, G. Lean Architecture for Agile Software Development. Wiley, 2010.',
  },
  'C4 Model': {
    full: 'C4 Model for Visualising Software Architecture',
    org: 'Simon Brown',
    year: '2018',
    why: 'Applied in Architect to create hierarchical, audience-appropriate visual maps of the AI system at different levels of abstraction.',
    ref: 'Brown, S. The C4 Model for Visualising Software Architecture. Leanpub, 2018.',
  },
  'Design Thinking': {
    full: 'Design Thinking',
    org: 'IDEO / Stanford d.school',
    year: '1992',
    why: 'Applied in Discover to empathise with users, define problems precisely, and ideate solutions before committing resources.',
    ref: 'Brown, T. Design Thinking. Harvard Business Review, June 2008.',
  },
  'MLOps': {
    full: 'Machine Learning Operations',
    org: 'Industry Standard (Google, Databricks)',
    year: '2020',
    why: 'Applied across Build, Deploy and Operate & Evolve to automate, monitor and govern the full ML lifecycle in production.',
    ref: 'Kreuzberger, D. et al. Machine Learning Operations (MLOps). IEEE Access, 2023.',
  },
  'ISO/IEC 25010': {
    full: 'Systems and Software Quality Requirements and Evaluation',
    org: 'ISO / IEC',
    year: '2023',
    why: 'Provides quality characteristics — reliability, security, maintainability — used to define acceptance criteria in Build and Deploy.',
    ref: 'ISO/IEC 25010:2023. Systems and Software Engineering. Geneva: ISO, 2023.',
  },
}

// ── Phase & Activity data ────────────────────────────────────────────────────

const PHASES: Phase[] = [
  {
    id: 'discover', num: '01', title: 'Discover', Icon: Compass,
    tagline: 'Understand the problem, context and opportunity.',
    description: 'Gain deep clarity on the business challenge, stakeholders and desired outcomes to ensure we build the right AI solution — not just a technically sound one.',
    foundations: ['Systems Thinking', 'Human-Centred AI', 'Domain-Driven Design', 'Design Thinking', 'OODA Loop'],
    deliverables: ['Problem Statement', 'Stakeholder Map', 'Current State Overview', 'Data Assessment', 'Success Criteria', 'Scope Definition'],
    aboutPhase: 'Discovery prevents building the wrong solution. It establishes shared understanding across all stakeholders before any technical work begins — converting ambiguous business intent into structured, actionable requirements.',
    activities: [
      {
        id: 'stakeholders', num: 1, title: 'Stakeholders',
        tagline: 'Identify and understand key stakeholders and their decision-making authority.',
        purpose: 'Ensure no relevant party is missed before requirements are gathered, and establish clear accountability for all AI-related decisions from day one.',
        keyQuestions: [
          'Who are the primary and secondary stakeholders?',
          'What are their roles, authority and success criteria?',
          'Who is impacted by the AI system — directly and indirectly?',
          'Who approves requirements and signs off deliverables?',
          'What are their concerns about this AI initiative?',
        ],
        deliverables: ['Stakeholder Register', 'RACI Matrix', 'Communication Plan', 'Stakeholder Map'],
      },
      {
        id: 'business-problem', num: 2, title: 'Problem & Context',
        tagline: 'Define the business problem, current state and the opportunity this solution will unlock.',
        purpose: 'Gain full clarity on the core business problem, constraints and the opportunity — ensuring the team solves the right problem, not just the most obvious one.',
        keyQuestions: [
          'What is the core business problem we are solving?',
          'Who is impacted and how severely?',
          'What is the current state and why is it insufficient?',
          'What are the key constraints, risks and assumptions?',
          'What does success look like from the business perspective?',
          'What opportunity does this AI solution create?',
        ],
        deliverables: ['Problem Statement Document', 'Current State Overview', 'Constraints & Assumptions Log', 'Opportunity Statement'],
      },
      {
        id: 'process-decisions', num: 3, title: 'Process & Decisions',
        tagline: 'Map existing processes and the decisions the AI must support or replace.',
        purpose: 'Document current processes, decision points and workflow exceptions that the AI system must understand and support before any design work begins.',
        keyQuestions: [
          'What processes does this AI system support or replace?',
          'What decisions are currently made manually — and by whom?',
          'Where do bottlenecks and failure points exist today?',
          'What exceptions and edge cases must the system handle?',
          'How are decisions escalated and recorded in the current state?',
        ],
        deliverables: ['Process Map (AS-IS)', 'Decision Inventory', 'Exception Register', 'Process Improvement Opportunities'],
      },
      {
        id: 'data-landscape', num: 4, title: 'Data Landscape',
        tagline: 'Assess available data sources, quality issues and governance constraints.',
        purpose: 'Understand what data is available to train, validate and operate the AI system — including gaps, quality issues and governance requirements.',
        keyQuestions: [
          'What data sources are available and relevant to this problem?',
          'Who owns each data source and who can grant access?',
          'What are the data quality issues that need to be resolved?',
          'What data is missing and needs to be created or acquired?',
          'What data governance, privacy and regulatory constraints apply?',
        ],
        deliverables: ['Data Landscape Assessment', 'Data Ownership Register', 'Data Quality Report', 'Data Gap Analysis'],
      },
      {
        id: 'business-value', num: 5, title: 'Value & Outcomes',
        tagline: 'Define measurable outcomes, value drivers and ROI expectations.',
        purpose: 'Establish clear, measurable outcomes that define success — ensuring the business case is evidence-based and commercially accountable from the outset.',
        keyQuestions: [
          'What specific value does this AI solution deliver?',
          'How will that value be measured — what are the KPIs?',
          'What is the expected ROI and over what timeframe?',
          'What are the risk-adjusted expected outcomes?',
          'Who is accountable for realising the stated business value?',
        ],
        deliverables: ['Business Case', 'Value Realisation Plan', 'KPI Framework', 'Benefits Register'],
      },
      {
        id: 'scope-success', num: 6, title: 'Scope & Success',
        tagline: 'Define what is in scope, what is not, and what success looks like.',
        purpose: 'Set the boundaries of the initiative, prioritise what is in scope, and establish the criteria that will determine whether the project has succeeded.',
        keyQuestions: [
          'What is explicitly in scope — and explicitly out of scope?',
          'What are the phase priorities and sequencing decisions?',
          'What are the formal acceptance criteria?',
          'What assumptions are we making that could invalidate the scope?',
          'What triggers a project stop, pivot or descoping?',
        ],
        deliverables: ['Scope Definition Document', 'Priority Matrix', 'Acceptance Criteria', 'Assumption Log'],
      },
    ],
  },
  {
    id: 'govern', num: '02', title: 'Govern', Icon: ShieldCheck,
    tagline: 'Establish the ethics, risk and compliance framework.',
    description: 'Establish the governance, risk, compliance and ethical framework that guides every decision across the AI lifecycle — before a single line of code is written.',
    foundations: ['ISO/IEC 42001', 'NIST AI RMF', 'ISO 31000', 'EU AI Act', 'TOGAF'],
    deliverables: ['AI Risk Register', 'Ethics Assessment', 'Compliance Matrix', 'Governance Framework', 'AI Policy', 'Privacy Assessment'],
    aboutPhase: 'Governance ensures AI is developed and operated in a manner that is legal, ethical and commercially defensible. This phase converts regulatory complexity into structured, auditable accountability that protects the organisation and those it serves.',
    activities: [
      {
        id: 'ethics-assessment', num: 1, title: 'Ethics Assessment',
        tagline: 'Identify and document the ethical implications of the proposed AI system.',
        purpose: 'Identify, assess and document the ethical implications before development begins — ensuring harm prevention, fairness and human dignity are built in, not bolted on.',
        keyQuestions: [
          'Could this AI system cause harm to individuals or groups?',
          'Are there bias or fairness risks in the data or model design?',
          'Is the system explainable to those affected by its decisions?',
          'Are human rights and dignity protected throughout the lifecycle?',
          'Who is accountable when the system makes a harmful decision?',
        ],
        deliverables: ['Ethics Impact Assessment', 'Bias Risk Register', 'Explainability Requirements', 'Human Oversight Framework'],
      },
      {
        id: 'risk-assessment', num: 2, title: 'Risk Assessment',
        tagline: 'Identify, assess and prioritise AI-specific risks across all dimensions.',
        purpose: 'Systematically identify and evaluate risks specific to AI systems — including model risk, data risk, operational risk and reputational risk.',
        keyQuestions: [
          'What are the highest-priority AI-specific risks?',
          'What is the risk appetite of the organisation?',
          'How likely is each risk and what is its potential impact?',
          'What controls and mitigations exist or need to be created?',
          'How will risks be monitored on an ongoing basis?',
        ],
        deliverables: ['AI Risk Register', 'Risk Heat Map', 'Risk Mitigation Plan', 'Residual Risk Assessment'],
      },
      {
        id: 'regulatory-compliance', num: 3, title: 'Regulatory Compliance',
        tagline: 'Map all applicable regulations and define compliance obligations.',
        purpose: 'Identify every regulatory, legal and industry framework that applies and define the compliance obligations — so nothing is discovered late in the lifecycle.',
        keyQuestions: [
          'Which regulations apply — EU AI Act, GDPR, sector-specific frameworks?',
          'What risk category does this AI system fall under?',
          'What compliance evidence must be produced and maintained?',
          'Who is the regulatory contact and accountable executive?',
          'What are the compliance deadlines and periodic review requirements?',
        ],
        deliverables: ['Compliance Matrix', 'Regulatory Mapping', 'Compliance Roadmap', 'Legal Opinion Summary'],
      },
      {
        id: 'data-privacy', num: 4, title: 'Data Privacy & Security',
        tagline: 'Define data protection requirements and security control obligations.',
        purpose: 'Ensure the AI system processes personal and sensitive data in strict accordance with privacy law and organisational data protection policy.',
        keyQuestions: [
          'What personal data will be processed by the AI system?',
          'What is the legal basis for processing under GDPR or equivalent?',
          'Is a Data Protection Impact Assessment required?',
          'What security controls protect personal and sensitive data?',
          'How will data subject rights be exercised and fulfilled?',
        ],
        deliverables: ['DPIA', 'Data Retention Policy', 'Privacy Notice', 'Security Controls Register'],
      },
      {
        id: 'ai-policy', num: 5, title: 'AI Governance Policy',
        tagline: 'Establish AI policy, accountability and oversight mechanisms.',
        purpose: 'Define the policies, accountability structures and oversight mechanisms that will govern the AI system throughout its entire lifecycle — not just at launch.',
        keyQuestions: [
          'What is the AI governance policy and how is it enforced?',
          'Who is the AI owner and accountable executive?',
          'How is meaningful human oversight maintained?',
          'How are policy exceptions handled and documented?',
          'How frequently is the policy reviewed and by whom?',
        ],
        deliverables: ['AI Governance Policy', 'Accountability Framework', 'Oversight Protocol', 'Exception Management Process'],
      },
      {
        id: 'phase-gate', num: 6, title: 'Governance Sign-off',
        tagline: 'Consolidate all governance outputs and obtain formal approval to proceed.',
        purpose: 'Package all governance, risk and compliance outputs into a Phase Gate review, and obtain formal approval before Architecture work begins.',
        keyQuestions: [
          'Are all mandatory governance outputs complete and accepted?',
          'Have risk mitigations been accepted by the designated risk owner?',
          'Is the compliance pathway clear and fully documented?',
          'Have all required approvals been formally obtained?',
          'Is the project governance structure in place and operational?',
        ],
        deliverables: ['Governance Pack', 'Phase Gate Report', 'Approval Register', 'Architecture Mandate'],
      },
    ],
  },
  {
    id: 'architect', num: '03', title: 'Architect', Icon: Layers,
    tagline: 'Design the solution blueprint.',
    description: 'Define the technical architecture, system design and data strategy — converting approved requirements into a rigorous, reviewable blueprint for the AI solution.',
    foundations: ['TOGAF', 'Domain-Driven Design', 'C4 Model', 'Lean Architecture', 'SOLID Principles'],
    deliverables: ['Architecture Decision Records', 'System Design (C4)', 'Data Architecture', 'Security Architecture', 'Integration Map', 'Architecture Review Report'],
    aboutPhase: 'Architecture converts business requirements into a blueprint that engineering can build from. Every decision here cascades into Build — a sound architecture prevents costly rework and ensures governance and quality requirements can be met.',
    activities: [
      {
        id: 'requirements', num: 1, title: 'Architecture Requirements',
        tagline: 'Translate business requirements into precise, testable architectural requirements.',
        purpose: 'Convert business requirements into architectural requirements that are precise, measurable and testable — giving design decisions a firm foundation.',
        keyQuestions: [
          'What are the functional requirements that must be supported?',
          'What are the non-functional requirements — performance, availability, security?',
          'What quality attributes matter most to this system?',
          'What are the architectural constraints imposed by governance or existing systems?',
          'How will requirements be validated and formally approved?',
        ],
        deliverables: ['Architecture Requirements Document', 'Quality Attribute Scenarios', 'Constraints Register', 'NFR Specification'],
      },
      {
        id: 'solution-design', num: 2, title: 'Solution Architecture',
        tagline: 'Design the overall AI system architecture, components and technology choices.',
        purpose: 'Define the high-level architecture including components, boundaries, integration points and technology choices — justified against requirements.',
        keyQuestions: [
          'What architectural patterns best fit this use case?',
          'How are the components structured and interconnected?',
          'What are the system boundaries and integration interfaces?',
          'What technology stack is appropriate and commercially justified?',
          'How does the architecture satisfy all governance requirements?',
        ],
        deliverables: ['Architecture Diagram (C4)', 'Component Design', 'Technology Decision Records', 'Architecture Decision Records'],
      },
      {
        id: 'data-architecture', num: 3, title: 'Data Architecture',
        tagline: 'Design the data flows, storage, lineage and governance layer.',
        purpose: 'Define how data is ingested, stored, transformed, governed and served — with quality, lineage and compliance enforced at every layer.',
        keyQuestions: [
          'How is data ingested from all source systems?',
          'What is the data processing and transformation strategy?',
          'Where is data stored, in what form and with what retention?',
          'How is data lineage tracked end-to-end?',
          'How are data quality and governance enforced continuously?',
        ],
        deliverables: ['Data Flow Diagram', 'Data Architecture Design', 'Data Lineage Map', 'Storage & Retention Strategy'],
      },
      {
        id: 'security-architecture', num: 4, title: 'Security Architecture',
        tagline: 'Design security controls and the AI-specific threat model.',
        purpose: 'Embed security into the architecture from day one — defining threat models, control requirements and AI-specific security patterns.',
        keyQuestions: [
          'What are the primary threat vectors for this AI system?',
          'How is authentication and authorisation implemented?',
          'How are secrets, keys and credentials managed?',
          'What is the network isolation and security model?',
          'How are AI-specific threats — prompt injection, data poisoning — mitigated?',
        ],
        deliverables: ['Threat Model', 'Security Architecture Design', 'Security Control Register', 'Penetration Test Requirements'],
      },
      {
        id: 'integration-design', num: 5, title: 'Integration Design',
        tagline: 'Map and design all integration points with existing enterprise systems.',
        purpose: 'Design all integration touchpoints between the AI system and existing enterprise systems, APIs and data sources — with failure handling and security from the start.',
        keyQuestions: [
          'What enterprise systems and APIs does the AI solution integrate with?',
          'What integration patterns are appropriate — REST, events, batch?',
          'How are integration failures detected, logged and handled?',
          'What are the latency and throughput requirements per integration?',
          'How are integrations secured, monitored and documented?',
        ],
        deliverables: ['Integration Architecture', 'API Specifications', 'Integration Test Plan', 'Dependency Register'],
      },
      {
        id: 'architecture-review', num: 6, title: 'Architecture Review',
        tagline: 'Subject the architecture to peer review and obtain sign-off before Build.',
        purpose: 'Validate the architecture through rigorous peer review, ensuring it meets all requirements, governance standards and is ready for Build.',
        keyQuestions: [
          'Does the architecture meet all functional and non-functional requirements?',
          'Have all identified risks been addressed in the design?',
          'Is the architecture consistent with all governance and compliance requirements?',
          'Have all required stakeholders reviewed and approved the design?',
          'Is the Build phase fully mandated and ready to commence?',
        ],
        deliverables: ['Architecture Review Report', 'Approved Architecture Package', 'Build Phase Mandate', 'Technical Debt Register'],
      },
    ],
  },
  {
    id: 'build', num: '04', title: 'Build', Icon: Code2,
    tagline: 'Implement, test and validate the AI solution.',
    description: 'Transform the approved architecture into working, tested and validated AI system components — ready for staged deployment into production.',
    foundations: ['DevSecOps', 'SOLID Principles', 'MLOps', 'Lean Architecture', 'ISO/IEC 25010'],
    deliverables: ['Tested AI Components', 'Data Pipeline', 'Guardrail Suite', 'Security Test Results', 'Validation Report', 'Release Candidate'],
    aboutPhase: 'Build converts the architecture blueprint into working software. Every decision here affects the system\'s reliability, maintainability and compliance posture. There is no shortcut — quality is built in or it isn\'t there.',
    activities: [
      {
        id: 'data-pipeline', num: 1, title: 'Data Pipeline',
        tagline: 'Build and validate data ingestion, transformation and serving pipelines.',
        purpose: 'Implement the data infrastructure to ingest, transform and serve data to the AI system — with embedded quality checks, lineage tracking and privacy controls.',
        keyQuestions: [
          'Are all data sources connected and ingesting correctly?',
          'Are data quality checks implemented at every processing stage?',
          'Is data lineage tracked end-to-end and auditable?',
          'How are pipeline failures detected, logged and resolved?',
          'Are all privacy and governance controls implemented in the pipeline?',
        ],
        deliverables: ['Data Pipeline', 'Quality Check Suite', 'Lineage Documentation', 'Pipeline Monitoring Setup'],
      },
      {
        id: 'ai-components', num: 2, title: 'AI Components',
        tagline: 'Build agents, prompts, memory and tool integrations.',
        purpose: 'Implement core AI components — including LLM integrations, prompt engineering, agent logic, memory management and tool connections.',
        keyQuestions: [
          'Are prompts engineered for reliability, consistency and safety?',
          'Is agent logic implemented, tested and auditable?',
          'Is memory management implemented correctly and with appropriate privacy controls?',
          'Are all tool integrations tested for correctness and failure modes?',
          'How is AI behaviour determinism and reproducibility managed?',
        ],
        deliverables: ['AI Agent Components', 'Prompt Library', 'Memory System', 'Tool Integration Suite'],
      },
      {
        id: 'guardrails', num: 3, title: 'Guardrails & Safety',
        tagline: 'Implement safety controls, content filters and compliance guardrails.',
        purpose: 'Build the safety layer that prevents the AI system from producing harmful, non-compliant or out-of-bounds outputs.',
        keyQuestions: [
          'What output filters and content controls are required?',
          'How is prompt injection detected and blocked?',
          'How are content safety requirements implemented and tested?',
          'What happens when the system detects a policy violation?',
          'How are guardrail effectiveness metrics tracked over time?',
        ],
        deliverables: ['Guardrail Suite', 'Content Filter Configuration', 'Safety Test Results', 'Violation Log'],
      },
      {
        id: 'testing', num: 4, title: 'Testing & Evaluation',
        tagline: 'Test AI behaviour, quality attributes and compliance requirements rigorously.',
        purpose: 'Validate the AI system against functional requirements, quality attributes and governance standards through structured, documented testing.',
        keyQuestions: [
          'Are unit and integration tests complete and passing?',
          'How is AI-specific behaviour evaluated beyond standard test approaches?',
          'Are bias and fairness evaluations complete and documented?',
          'Have edge cases and failure modes been systematically tested?',
          'Does the system meet all defined acceptance criteria?',
        ],
        deliverables: ['Test Suite', 'AI Evaluation Report', 'Bias Assessment', 'Acceptance Test Results'],
      },
      {
        id: 'security-testing', num: 5, title: 'Security Testing',
        tagline: 'Conduct penetration testing and adversarial evaluation of the AI system.',
        purpose: 'Validate the security posture through penetration testing, adversarial evaluation and formal compliance verification.',
        keyQuestions: [
          'Has penetration testing been conducted by a qualified team?',
          'Have AI-specific attack vectors been tested — prompt injection, model extraction?',
          'Are all security controls functioning exactly as designed and documented?',
          'Have third-party dependencies been security-reviewed?',
          'Is the system fully compliant with the approved security architecture?',
        ],
        deliverables: ['Penetration Test Report', 'Adversarial Test Results', 'Security Sign-off', 'Remediation Log'],
      },
      {
        id: 'release-candidate', num: 6, title: 'Release Candidate',
        tagline: 'Assemble and validate the release candidate for the Deploy phase.',
        purpose: 'Consolidate all Build outputs into a validated, formally approved Release Candidate — ready for staged deployment.',
        keyQuestions: [
          'Have all tests passed and results been formally recorded?',
          'Is the release candidate fully documented and reproducible?',
          'Have all required stakeholders signed off?',
          'Is the deployment runbook prepared and tested?',
          'Is rollback capability fully tested and available?',
        ],
        deliverables: ['Release Candidate Package', 'Release Notes', 'Deployment Runbook', 'Go/No-Go Assessment'],
      },
    ],
  },
  {
    id: 'deploy', num: '05', title: 'Deploy', Icon: Rocket,
    tagline: 'Release safely to production with staged rollout.',
    description: 'Execute a controlled, staged deployment that minimises risk and ensures the AI system enters production with full confidence — and can be recovered if anything goes wrong.',
    foundations: ['DevSecOps', 'MLOps', 'ISO/IEC 25010'],
    deliverables: ['Deployment Plan', 'Staging Validation Report', 'Production Release', 'Observability Setup', 'Operations Handover', 'Go-Live Report'],
    aboutPhase: 'Deployment converts a validated Release Candidate into a live production system. A staged approach — canary before full rollout — reduces risk while preserving velocity and enabling rapid response.',
    activities: [
      {
        id: 'release-planning', num: 1, title: 'Release Planning',
        tagline: 'Plan the deployment sequence, rollback procedures and communications.',
        purpose: 'Define the deployment strategy, stakeholder communication plan, rollback procedures and success criteria — before any code reaches production.',
        keyQuestions: [
          'What is the deployment strategy — canary, blue/green, full release?',
          'What are the rollback triggers and step-by-step procedures?',
          'Who is informed, when and through what channel?',
          'What monitoring must be fully active before go-live?',
          'What is the go/no-go decision process and who has authority?',
        ],
        deliverables: ['Deployment Plan', 'Communication Plan', 'Rollback Plan', 'Go/No-Go Criteria'],
      },
      {
        id: 'staging-validation', num: 2, title: 'Staging Validation',
        tagline: 'Validate the full system in a production-equivalent environment.',
        purpose: 'Execute complete validation of the Release Candidate in a production-equivalent staging environment before any production deployment.',
        keyQuestions: [
          'Does the staging environment accurately reflect production?',
          'Have all integration points been tested under realistic load?',
          'Have performance tests validated the system under peak expected traffic?',
          'Has the rollback procedure been executed and timed in staging?',
          'Have all stakeholders reviewed and approved the staging results?',
        ],
        deliverables: ['Staging Test Report', 'Performance Test Results', 'Rollback Test Evidence', 'Staging Sign-off'],
      },
      {
        id: 'canary-release', num: 3, title: 'Canary Release',
        tagline: 'Deploy to a controlled traffic subset and validate real-world behaviour.',
        purpose: 'Deploy the AI system to a controlled subset of traffic, validating real-world performance and behaviour before full production rollout.',
        keyQuestions: [
          'What percentage of traffic constitutes the canary group?',
          'What metrics determine whether the canary phase is successful?',
          'How long does the canary phase run before full rollout is approved?',
          'What specific metrics trigger automatic rollback?',
          'Who monitors the canary and has authority to make rollout decisions?',
        ],
        deliverables: ['Canary Deployment', 'Canary Metrics Report', 'Rollout Decision Record'],
      },
      {
        id: 'production-release', num: 4, title: 'Production Release',
        tagline: 'Execute the full production rollout with active monitoring.',
        purpose: 'Complete the full production deployment following successful canary validation, with active monitoring and immediate response capability in place.',
        keyQuestions: [
          'Has the canary phase been formally approved for full rollout?',
          'Are all production monitors fully active and alerting correctly?',
          'Is the operations team on standby and ready to respond?',
          'Is the rollback procedure available, tested and documented?',
          'Have all relevant stakeholders been notified of the go-live?',
        ],
        deliverables: ['Production Deployment', 'Go-Live Confirmation', 'Incident Response Activation', 'Launch Notification'],
      },
      {
        id: 'observability-setup', num: 5, title: 'Observability Setup',
        tagline: 'Activate production monitoring, alerting, logging and dashboards.',
        purpose: 'Ensure full observability of the AI system in production across performance, AI behaviour quality, data quality and compliance dimensions.',
        keyQuestions: [
          'Are all key performance and business metrics being captured?',
          'Are alerts configured with appropriate thresholds and escalation paths?',
          'Is AI-specific monitoring — drift, output quality — active?',
          'Is the logging strategy compliant with data retention and privacy policy?',
          'Do the operations team have dashboards, runbooks and escalation contacts?',
        ],
        deliverables: ['Monitoring Dashboard', 'Alert Configuration', 'Logging Setup', 'Operations Runbook'],
      },
      {
        id: 'operations-handover', num: 6, title: 'Operations Handover',
        tagline: 'Formally transfer the system to operations with complete documentation.',
        purpose: 'Formally hand over the production AI system to the operations team with complete documentation, runbooks and escalation procedures.',
        keyQuestions: [
          'Does the operations team have all documentation they need?',
          'Have support runbooks been reviewed, tested and formally approved?',
          'Are escalation paths and contacts fully documented?',
          'Has the handover been formally accepted by the receiving team?',
          'Is the SLA agreed, documented and actively monitored?',
        ],
        deliverables: ['Operations Handover Pack', 'Support Runbook', 'Escalation Matrix', 'SLA Agreement'],
      },
    ],
  },
  {
    id: 'operate', num: '06', title: 'Operate & Evolve', Icon: TrendingUp,
    tagline: 'Monitor, govern and continuously improve.',
    description: 'Maintain, govern and continuously improve the AI system in production — ensuring it stays compliant, accurate and commercially valuable as the world around it changes.',
    foundations: ['ISO/IEC 42001', 'NIST AI RMF', 'MLOps', 'Systems Thinking', 'OODA Loop'],
    deliverables: ['Operational Reports', 'Drift Detection Alerts', 'Compliance Evidence', 'Incident Records', 'Optimisation Plan', 'Strategic Roadmap'],
    aboutPhase: 'An AI system not actively observed and governed degrades invisibly. This phase keeps it accountable, compliant and aligned with evolving business needs — closing the build-operate-evolve loop that defines sustainable AI capability.',
    activities: [
      {
        id: 'system-monitoring', num: 1, title: 'System Monitoring',
        tagline: 'Monitor performance, reliability and AI output quality continuously.',
        purpose: 'Actively monitor the AI system across technical performance, AI behaviour quality and business outcome metrics to maintain service levels.',
        keyQuestions: [
          'Are all system performance metrics within agreed SLA thresholds?',
          'Is AI output quality being maintained at the required level?',
          'Are anomalies or degradations detected and being actioned promptly?',
          'Are business outcome metrics tracking as expected?',
          'Is monitoring coverage complete — are there any blind spots?',
        ],
        deliverables: ['Performance Reports', 'Anomaly Alerts', 'SLA Compliance Report', 'AI Quality Metrics'],
      },
      {
        id: 'drift-detection', num: 2, title: 'Drift & Bias Detection',
        tagline: 'Detect and respond to model drift, data drift and emergent bias.',
        purpose: 'Continuously monitor for model drift, data drift and emergent bias — triggering structured responses when thresholds are exceeded.',
        keyQuestions: [
          'Is model performance degrading over time against the baseline?',
          'Has the input data distribution changed significantly?',
          'Are bias metrics within acceptable, documented bounds?',
          'What is the drift response protocol and who is responsible?',
          'When was the model last independently evaluated or retrained?',
        ],
        deliverables: ['Drift Detection Report', 'Bias Monitoring Dashboard', 'Retraining Decision Record', 'Drift Response Log'],
      },
      {
        id: 'governance-ops', num: 3, title: 'Operational Governance',
        tagline: 'Maintain continuous compliance, oversight and accountability in production.',
        purpose: 'Ensure the AI system operates within its approved governance boundaries, regulatory requirements and ethical standards — continuously, not just at launch.',
        keyQuestions: [
          'Is the system operating within all approved boundaries?',
          'Are all compliance obligations being met on an ongoing basis?',
          'Are audit logs complete, tamper-evident and accessible?',
          'Has any regulatory change occurred that requires a response?',
          'Is human oversight functioning exactly as designed?',
        ],
        deliverables: ['Compliance Reports', 'Audit Evidence Package', 'Governance Review Minutes', 'Regulatory Change Log'],
      },
      {
        id: 'incident-management', num: 4, title: 'Incident Management',
        tagline: 'Detect, respond to and learn from AI system incidents.',
        purpose: 'Detect, respond to and systematically learn from incidents — including technical failures, harmful outputs and compliance breaches.',
        keyQuestions: [
          'What constitutes an AI incident requiring escalation?',
          'How are incidents detected, classified and escalated?',
          'Who is responsible for incident response and decisions?',
          'How are affected parties and regulators notified where required?',
          'What post-incident review process drives organisational learning?',
        ],
        deliverables: ['Incident Register', 'Post-Incident Reviews', 'Remediation Records', 'Regulatory Notifications'],
      },
      {
        id: 'optimisation', num: 5, title: 'Optimisation',
        tagline: 'Improve performance, cost efficiency and AI capability continuously.',
        purpose: 'Systematically improve the AI system across performance, cost efficiency, model quality and business impact — based on operational evidence.',
        keyQuestions: [
          'What are the highest-priority improvement opportunities based on production data?',
          'Are there identified cost optimisation opportunities?',
          'Can model accuracy or latency be measurably improved?',
          'Are new capabilities or models available that should be evaluated?',
          'How are improvements prioritised, approved and tracked?',
        ],
        deliverables: ['Optimisation Plan', 'Performance Improvement Report', 'Cost Analysis', 'Enhancement Backlog'],
      },
      {
        id: 'strategic-roadmap', num: 6, title: 'Strategic Roadmap',
        tagline: 'Review strategic contribution and plan the next evolution of AI capability.',
        purpose: 'Review the system\'s strategic contribution, update the capability roadmap and plan the next evolution based on operational learnings and shifting business context.',
        keyQuestions: [
          'Is the AI system delivering its intended strategic value?',
          'What should the next capability evolution be?',
          'Are there new use cases or opportunities identified operationally?',
          'What is the scaling strategy — vertical, horizontal, new markets?',
          'How does this system fit into the wider AI capability portfolio?',
        ],
        deliverables: ['Strategic Review Report', 'Updated AI Roadmap', 'Business Case for Next Evolution', 'Portfolio View'],
      },
    ],
  },
]

// ── Design tokens — exact site palette ───────────────────────────────────────

const P = '#34506E'       // site accent (slate blue — SiteNav/SiteFooter)
const PL = '#E9EFF4'      // accent light bg (SiteNav selected state)
const PH = '#EEF4F8'      // accent hover bg
const B = '#E3E1DA'       // site border
const BG = '#FAFAF8'      // site page background
const T1 = '#1F2125'      // site primary text
const T2 = '#5A5D63'      // site secondary text
const T3 = '#8A8D93'      // site muted text

// ── Orbit SVG diagram ────────────────────────────────────────────────────────

function OrbitDiagram({ onPhaseSelect }: { onPhaseSelect: (id: string) => void }) {
  const [hov, setHov] = useState<string | null>(null)
  const cx = 200, cy = 200, r = 148

  const nodes = PHASES.map((phase, i) => {
    const angle = (i * 60 - 90) * (Math.PI / 180)
    return { phase, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })

  return (
    <svg viewBox="0 0 400 400" style={{ width: '100%', maxWidth: 380, height: 'auto' }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={B} strokeWidth={1} strokeDasharray="4 6" />
      {nodes.map(({ x, y }, i) => {
        const next = nodes[(i + 1) % 6]
        const mx = (x + next.x) / 2, my = (y + next.y) / 2
        const dx = -(my - cy) * 0.25, dy = (mx - cx) * 0.25
        return (
          <path
            key={i}
            d={`M ${x} ${y} Q ${mx + dx} ${my + dy} ${next.x} ${next.y}`}
            fill="none" stroke={B} strokeWidth={1}
            markerEnd="url(#arr)"
          />
        )
      })}
      <defs>
        <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill={B} />
        </marker>
      </defs>
      <circle cx={cx} cy={cy} r={36} fill={PL} />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill={P} letterSpacing="1">AISA</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize="7.5" fill={T2} letterSpacing="0.5">METHODOLOGY</text>
      {nodes.map(({ phase, x, y }) => {
        const isHov = hov === phase.id
        const Icon = phase.Icon
        return (
          <g
            key={phase.id}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => setHov(phase.id)}
            onMouseLeave={() => setHov(null)}
            onClick={() => onPhaseSelect(phase.id)}
          >
            <circle cx={x} cy={y} r={28} fill={isHov ? P : '#fff'} stroke={isHov ? P : B} strokeWidth={1.5} />
            <foreignObject x={x - 10} y={y - 18} width={20} height={20}>
              <Icon size={14} color={isHov ? '#fff' : P} />
            </foreignObject>
            <text x={x} y={y + 8} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={isHov ? '#fff' : P}>{phase.num}</text>
            <text x={x} y={y + 40} textAnchor="middle" fontSize="8" fill={isHov ? P : T2} fontWeight={isHov ? '600' : '400'}>{phase.title}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ── Foundation chip ──────────────────────────────────────────────────────────

function FoundationChip({ name, onClick }: { name: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 4,
        padding: '3px 10px', borderRadius: 100,
        background: PH, border: `1px solid ${PL}`,
        fontSize: 11, fontWeight: 500, color: P,
        cursor: 'pointer', transition: 'all 0.15s',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        const t = e.currentTarget as HTMLButtonElement
        t.style.background = PL
        t.style.borderColor = P
      }}
      onMouseLeave={e => {
        const t = e.currentTarget as HTMLButtonElement
        t.style.background = PH
        t.style.borderColor = PL
      }}
    >
      <BookOpen size={10} /> {name}
    </button>
  )
}

// ── Citation drawer ──────────────────────────────────────────────────────────

function CitationDrawer({ refKey, onClose }: { refKey: string; onClose: () => void }) {
  const data = FRAMEWORK_REFS[refKey]
  if (!data) return null

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 150 }}
      />
      <motion.aside
        initial={{ x: 440 }} animate={{ x: 0 }} exit={{ x: 440 }}
        transition={{ type: 'spring', stiffness: 360, damping: 36 }}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, width: 420,
          background: '#fff', borderLeft: `1px solid ${B}`,
          zIndex: 200, overflow: 'auto', padding: '32px 28px',
          display: 'flex', flexDirection: 'column', gap: 24,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 10, letterSpacing: '0.08em', color: T3, fontWeight: 600, textTransform: 'uppercase', marginBottom: 6 }}>Academic Foundation</p>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: T1, lineHeight: 1.3 }}>{refKey}</h3>
          </div>
          <button onClick={onClose} style={{ padding: 6, borderRadius: 6, border: `1px solid ${B}`, background: 'transparent', cursor: 'pointer', color: T2 }}>
            <X size={16} />
          </button>
        </div>

        <div style={{ padding: '16px 20px', background: PH, borderRadius: 10, borderLeft: `3px solid ${P}` }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: P, marginBottom: 4 }}>{data.full}</p>
          <p style={{ fontSize: 12, color: T2 }}>{data.org} · {data.year}</p>
        </div>

        <div>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 8 }}>Why AISA uses this</p>
          <p style={{ fontSize: 13.5, color: T1, lineHeight: 1.7 }}>{data.why}</p>
        </div>

        <div style={{ padding: '16px 20px', background: '#F6F4F0', borderRadius: 8, border: `1px solid ${B}` }}>
          <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 8 }}>Full Citation</p>
          <p style={{ fontSize: 12, color: T2, lineHeight: 1.7, fontStyle: 'italic' }}>{data.ref}</p>
        </div>
      </motion.aside>
    </>
  )
}

// ── Left navigation ──────────────────────────────────────────────────────────

interface LeftNavProps {
  view: View
  selectedPhaseId: string | null
  selectedActivityId: string | null
  onPhaseSelect: (id: string) => void
  onActivitySelect: (id: string) => void
  onBackToLanding: () => void
  onBackToPhase: () => void
}

function LeftNav({ view, selectedPhaseId, selectedActivityId, onPhaseSelect, onActivitySelect, onBackToLanding, onBackToPhase }: LeftNavProps) {
  const selectedPhase = PHASES.find(p => p.id === selectedPhaseId)

  return (
    <nav style={{
      width: 248, flexShrink: 0,
      background: BG, borderRight: `1px solid ${B}`,
      position: 'sticky', top: 90,
      height: 'calc(100vh - 90px)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{ padding: '24px 20px 12px' }}>
        <p style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', color: T3, textTransform: 'uppercase' }}>The AISA Journey</p>
        <p style={{ fontSize: 11, color: T2, marginTop: 2 }}>6-phase AI methodology</p>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '4px 0' }}>
        {PHASES.map((phase, i) => {
          const isSelected = phase.id === selectedPhaseId
          const Icon = phase.Icon

          return (
            <div key={phase.id}>
              <button
                onClick={() => onPhaseSelect(phase.id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                  padding: '9px 20px', background: isSelected ? PH : 'transparent',
                  border: 'none', cursor: 'pointer', textAlign: 'left',
                  borderLeft: isSelected ? `3px solid ${P}` : '3px solid transparent',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = '#F3F4F6' }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: isSelected ? P : '#fff',
                  border: `1.5px solid ${isSelected ? P : B}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={13} color={isSelected ? '#fff' : T2} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: isSelected ? P : T3, letterSpacing: '0.06em' }}>{phase.num}</p>
                  <p style={{ fontSize: 12, fontWeight: isSelected ? 600 : 400, color: isSelected ? P : T1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{phase.title}</p>
                </div>
              </button>

              {/* Activities sub-list */}
              <AnimatePresence>
                {isSelected && view !== 'landing' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: 'hidden' }}
                  >
                    {selectedPhase?.activities.map(act => {
                      const isActSelected = act.id === selectedActivityId && view === 'activity'
                      return (
                        <button
                          key={act.id}
                          onClick={() => onActivitySelect(act.id)}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
                            padding: '6px 20px 6px 48px',
                            background: isActSelected ? PL : 'transparent',
                            border: 'none', cursor: 'pointer', textAlign: 'left',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => { if (!isActSelected) (e.currentTarget as HTMLButtonElement).style.background = PH }}
                          onMouseLeave={e => { if (!isActSelected) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
                        >
                          <span style={{ fontSize: 10, fontWeight: 700, color: isActSelected ? P : T3, minWidth: 14 }}>{act.num}</span>
                          <span style={{ fontSize: 11.5, color: isActSelected ? P : T2, fontWeight: isActSelected ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.title}</span>
                        </button>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Connector line */}
              {i < 5 && (
                <div style={{ width: 1.5, height: 6, background: B, marginLeft: 34 }} />
              )}
            </div>
          )
        })}
      </div>

      {/* Back actions */}
      {view !== 'landing' && (
        <div style={{ padding: '12px 16px', borderTop: `1px solid ${B}`, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {view === 'activity' && (
            <button onClick={onBackToPhase} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', fontSize: 12, color: T2, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, width: '100%' }}>
              <ArrowLeft size={12} /> Back to phase
            </button>
          )}
          <button onClick={onBackToLanding} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 8px', fontSize: 12, color: T2, background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: 6, width: '100%' }}>
            <ArrowLeft size={12} /> Back to overview
          </button>
        </div>
      )}
    </nav>
  )
}

// ── Landing view ─────────────────────────────────────────────────────────────

interface PreviewState {
  phaseId: string
  x: number
  y: number
  anchor: 'right' | 'left' | 'bottom'
}

function LandingView({
  onPhaseSelect,
  onCitationOpen,
}: {
  onPhaseSelect: (id: string) => void
  onCitationOpen: (key: string) => void
}) {
  const [preview, setPreview] = useState<PreviewState | null>(null)

  const handleCardEnter = useCallback((e: React.MouseEvent, phaseId: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const rightFits = rect.right + 320 < window.innerWidth
    setPreview({
      phaseId,
      x: rightFits ? rect.right + 8 : rect.left - 328,
      y: rect.top,
      anchor: rightFits ? 'right' : 'left',
    })
  }, [])

  const previewPhase = preview ? PHASES.find(p => p.id === preview.phaseId) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      style={{ padding: '56px 56px 80px', maxWidth: 1100, boxSizing: 'border-box' }}
    >
      {/* Hero */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 48, alignItems: 'center', marginBottom: 64 }}>
        <div>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: P, textTransform: 'uppercase', display: 'block', marginBottom: 16 }}>Proprietary Methodology</span>
          <h1 style={{ fontSize: 52, fontWeight: 800, color: T1, lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 8 }}>
            AI Strategy
          </h1>
          <h2 style={{ fontSize: 18, fontWeight: 400, color: T2, marginBottom: 24, letterSpacing: '-0.01em' }}>
            AISA — AI Solutions Architecture
          </h2>
          <p style={{ fontSize: 15, color: T2, lineHeight: 1.8, maxWidth: 560, marginBottom: 36 }}>
            A governance-first, six-phase methodology for designing, building and operating responsible enterprise AI systems. From problem discovery through continuous evolution — structured, auditable and commercially accountable.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
            {['6 Phases', '36 Activities', 'Governance-First', 'Enterprise-Grade'].map(tag => (
              <span key={tag} style={{ padding: '5px 12px', borderRadius: 100, background: PH, color: P, fontSize: 12, fontWeight: 600, border: `1px solid ${PL}` }}>{tag}</span>
            ))}
          </div>
          <button
            onClick={() => onPhaseSelect(PHASES[0].id)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', borderRadius: 8, background: P, color: '#fff',
              fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer',
              letterSpacing: '-0.01em', transition: 'opacity 0.15s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.88')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          >
            Explore the Methodology <ChevronRight size={16} />
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <OrbitDiagram onPhaseSelect={onPhaseSelect} />
        </div>
      </div>

      {/* Phase cards */}
      <div style={{ marginBottom: 16 }}>
        <h3 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: T3, marginBottom: 24 }}>The Six Phases</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {PHASES.map(phase => {
            const Icon = phase.Icon
            return (
              <div
                key={phase.id}
                onMouseEnter={e => handleCardEnter(e, phase.id)}
                onMouseLeave={() => setPreview(null)}
                onClick={() => onPhaseSelect(phase.id)}
                style={{
                  background: '#fff', border: `1px solid ${B}`, borderRadius: 12,
                  padding: '20px 22px', cursor: 'pointer', transition: 'all 0.18s',
                  position: 'relative',
                }}
                onMouseOver={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = P
                  el.style.boxShadow = `0 0 0 1px ${P}`
                  el.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={e => {
                  const el = e.currentTarget as HTMLDivElement
                  el.style.borderColor = B
                  el.style.boxShadow = 'none'
                  el.style.transform = 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: PH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={P} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, color: T3, letterSpacing: '0.08em' }}>PHASE {phase.num}</span>
                </div>
                <h4 style={{ fontSize: 15, fontWeight: 700, color: T1, marginBottom: 5 }}>{phase.title}</h4>
                <p style={{ fontSize: 12.5, color: T2, lineHeight: 1.5 }}>{phase.tagline}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
                  <span style={{ fontSize: 11, color: T3 }}>{phase.activities.length} activities</span>
                  <ChevronRight size={14} color={T3} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Hover preview (fixed position) */}
      <AnimatePresence>
        {preview && previewPhase && (
          <motion.div
            key={preview.phaseId}
            initial={{ opacity: 0, scale: 0.96, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed', top: preview.y, left: preview.x,
              width: 310, zIndex: 100,
              background: '#fff', border: `1px solid ${B}`,
              borderRadius: 12, padding: '20px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
              pointerEvents: 'none',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: P, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <previewPhase.Icon size={13} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: 9, fontWeight: 700, color: P, letterSpacing: '0.08em' }}>PHASE {previewPhase.num}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: T1 }}>{previewPhase.title}</p>
              </div>
            </div>
            <p style={{ fontSize: 12, color: T2, lineHeight: 1.6, marginBottom: 14 }}>{previewPhase.aboutPhase}</p>
            <div style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 6 }}>Expected outputs</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {previewPhase.deliverables.slice(0, 3).map(d => (
                  <span key={d} style={{ fontSize: 10.5, padding: '2px 8px', background: '#F6F4F0', border: `1px solid ${B}`, borderRadius: 100, color: T2 }}>{d}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: 9.5, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 6 }}>Built on</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {previewPhase.foundations.map(f => (
                  <span
                    key={f}
                    style={{ fontSize: 10, padding: '2px 8px', background: PH, border: `1px solid ${PL}`, borderRadius: 100, color: P, fontWeight: 500 }}
                  >{f}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── Phase view ───────────────────────────────────────────────────────────────

function PhaseView({
  phase,
  onActivitySelect,
  onCitationOpen,
}: {
  phase: Phase
  onActivitySelect: (id: string) => void
  onCitationOpen: (key: string) => void
}) {
  const Icon = phase.Icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '48px 56px 80px', maxWidth: 1000, boxSizing: 'border-box' }}
    >
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 36, fontSize: 12, color: T3 }}>
        <span style={{ color: P, fontWeight: 600 }}>AISA</span>
        <ChevronRight size={12} />
        <span style={{ color: T2 }}>{phase.title}</span>
      </div>

      {/* Phase header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 40 }}>
        <div style={{ width: 56, height: 56, borderRadius: 14, background: PL, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: `1.5px solid ${PL}` }}>
          <Icon size={26} color={P} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 42, fontWeight: 200, color: B, letterSpacing: '-0.02em', lineHeight: 1 }}>{phase.num}</span>
            <h1 style={{ fontSize: 30, fontWeight: 800, color: T1, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{phase.title}</h1>
          </div>
          <p style={{ fontSize: 14.5, color: T2, lineHeight: 1.7, maxWidth: 620 }}>{phase.description}</p>
        </div>
      </div>

      {/* Activity cards */}
      <div style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T3, marginBottom: 20 }}>Activities</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
          {phase.activities.map(activity => (
            <button
              key={activity.id}
              onClick={() => onActivitySelect(activity.id)}
              style={{
                background: '#fff', border: `1px solid ${B}`, borderRadius: 10,
                padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.18s', display: 'flex', alignItems: 'flex-start', gap: 14,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = P
                el.style.boxShadow = `0 0 0 1px ${P}`
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLButtonElement
                el.style.borderColor = B
                el.style.boxShadow = 'none'
                el.style.transform = 'none'
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: P, background: PH, padding: '3px 7px', borderRadius: 5, marginTop: 1, flexShrink: 0 }}>{activity.num}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: T1, marginBottom: 3 }}>{activity.title}</p>
                <p style={{ fontSize: 12, color: T2, lineHeight: 1.5 }}>{activity.tagline}</p>
              </div>
              <ChevronRight size={14} color={T3} style={{ flexShrink: 0, marginTop: 4 }} />
            </button>
          ))}
        </div>
      </div>

      {/* About + Deliverables */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 40 }}>
        <div style={{ background: '#fff', border: `1px solid ${B}`, borderRadius: 10, padding: '22px 24px' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 12 }}>About This Phase</h3>
          <p style={{ fontSize: 13.5, color: T1, lineHeight: 1.75 }}>{phase.aboutPhase}</p>
        </div>
        <div style={{ background: '#fff', border: `1px solid ${B}`, borderRadius: 10, padding: '22px 24px' }}>
          <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 12 }}>Key Deliverables</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {phase.deliverables.map(d => (
              <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: PH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={10} color={P} />
                </div>
                <span style={{ fontSize: 13, color: T1 }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Academic foundations */}
      <div>
        <h3 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: T3, marginBottom: 12 }}>Academic Foundations</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {phase.foundations.map(f => (
            <FoundationChip key={f} name={f} onClick={() => onCitationOpen(f)} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// ── Activity view ─────────────────────────────────────────────────────────────

function ActivityView({
  phase,
  activity,
  onPrev,
  onNext,
}: {
  phase: Phase
  activity: Activity
  onPrev: (() => void) | null
  onNext: (() => void) | null
}) {
  const Icon = phase.Icon
  const totalActivities = phase.activities.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ padding: '48px 56px 80px', maxWidth: 1000, boxSizing: 'border-box' }}
    >
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 32, fontSize: 12, color: T3 }}>
        <span style={{ color: P, fontWeight: 600 }}>AISA</span>
        <ChevronRight size={12} />
        <span style={{ color: P }}>{phase.title}</span>
        <ChevronRight size={12} />
        <span style={{ color: T2 }}>{activity.title}</span>
      </div>

      {/* Activity header */}
      <div style={{ marginBottom: 36 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 7, background: P, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon size={13} color="#fff" />
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: P, background: PH, padding: '3px 10px', borderRadius: 100 }}>
            Activity {activity.num} of {totalActivities} — {phase.title}
          </span>
        </div>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: T1, letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.1 }}>{activity.title}</h1>
        <p style={{ fontSize: 15, color: T2, lineHeight: 1.7 }}>{activity.tagline}</p>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', gap: 4 }}>
          {phase.activities.map((a, i) => (
            <div key={a.id} style={{ flex: 1, height: 3, borderRadius: 100, background: a.num <= activity.num ? P : B }} />
          ))}
        </div>
        <p style={{ fontSize: 10.5, color: T3, marginTop: 6 }}>{activity.num} of {totalActivities} activities complete</p>
      </div>

      {/* Main content: 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 32 }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Purpose */}
          <div style={{ background: '#fff', border: `1px solid ${B}`, borderRadius: 12, padding: '24px 26px' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T3, marginBottom: 14 }}>Purpose</h2>
            <p style={{ fontSize: 15, color: T1, lineHeight: 1.8 }}>{activity.purpose}</p>
          </div>

          {/* Key questions */}
          <div style={{ background: '#fff', border: `1px solid ${B}`, borderRadius: 12, padding: '24px 26px' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T3, marginBottom: 16 }}>Key Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {activity.keyQuestions.map((q, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 20, height: 20, borderRadius: '50%', background: PH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, color: P }}>{i + 1}</span>
                  </div>
                  <p style={{ fontSize: 13.5, color: T1, lineHeight: 1.65 }}>{q}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Deliverables */}
          <div style={{ background: '#fff', border: `1px solid ${B}`, borderRadius: 12, padding: '22px 22px' }}>
            <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: T3, marginBottom: 16 }}>Key Deliverables</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {activity.deliverables.map(d => (
                <div key={d} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#F6F4F0', borderRadius: 7, border: `1px solid ${B}` }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: PH, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Check size={10} color={P} />
                  </div>
                  <span style={{ fontSize: 12.5, color: T1, fontWeight: 500 }}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phase context card */}
          <div style={{ background: PH, border: `1px solid ${PL}`, borderRadius: 12, padding: '18px 20px' }}>
            <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: P, marginBottom: 8 }}>Phase Context</p>
            <p style={{ fontSize: 12.5, color: '#1F3A52', lineHeight: 1.65 }}>{phase.aboutPhase}</p>
          </div>
        </div>
      </div>

      {/* Prev/Next navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 24, borderTop: `1px solid ${B}` }}>
        {onPrev ? (
          <button
            onClick={onPrev}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: '#fff', border: `1px solid ${B}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: T1, cursor: 'pointer', transition: 'all 0.15s' }}
            onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.borderColor = P}
            onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.borderColor = B}
          >
            <ArrowLeft size={14} /> Previous Activity
          </button>
        ) : <div />}
        {onNext ? (
          <button
            onClick={onNext}
            style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', background: P, border: `1px solid ${P}`, borderRadius: 8, fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', transition: 'opacity 0.15s' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '0.88')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.opacity = '1')}
          >
            Next Activity <ArrowRight size={14} />
          </button>
        ) : (
          <span style={{ fontSize: 12, color: T3, padding: '10px 0' }}>Last activity in this phase</span>
        )}
      </div>
    </motion.div>
  )
}

// ── Main explorer ─────────────────────────────────────────────────────────────

export function AISAExplorer() {
  const [view, setView] = useState<View>('landing')
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null)
  const [citationKey, setCitationKey] = useState<string | null>(null)

  const selectedPhase = PHASES.find(p => p.id === selectedPhaseId) ?? null
  const selectedActivity = selectedPhase?.activities.find(a => a.id === selectedActivityId) ?? null

  const navigateToPhase = useCallback((phaseId: string) => {
    setSelectedPhaseId(phaseId)
    setSelectedActivityId(null)
    setView('phase')
  }, [])

  const navigateToActivity = useCallback((activityId: string) => {
    setSelectedActivityId(activityId)
    setView('activity')
  }, [])

  const navigateBackToPhase = useCallback(() => {
    setSelectedActivityId(null)
    setView('phase')
  }, [])

  const navigateBackToLanding = useCallback(() => {
    setSelectedPhaseId(null)
    setSelectedActivityId(null)
    setView('landing')
  }, [])

  const prevActivity = (() => {
    if (!selectedPhase || !selectedActivityId) return null
    const idx = selectedPhase.activities.findIndex(a => a.id === selectedActivityId)
    return idx > 0 ? selectedPhase.activities[idx - 1] : null
  })()

  const nextActivity = (() => {
    if (!selectedPhase || !selectedActivityId) return null
    const idx = selectedPhase.activities.findIndex(a => a.id === selectedActivityId)
    return idx < selectedPhase.activities.length - 1 ? selectedPhase.activities[idx + 1] : null
  })()

  return (
    <div style={{ display: 'flex', background: BG, minHeight: 'calc(100vh - 90px)' }}>
      <LeftNav
        view={view}
        selectedPhaseId={selectedPhaseId}
        selectedActivityId={selectedActivityId}
        onPhaseSelect={navigateToPhase}
        onActivitySelect={navigateToActivity}
        onBackToLanding={navigateBackToLanding}
        onBackToPhase={navigateBackToPhase}
      />

      <div style={{ flex: 1, overflow: 'auto' }}>
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <LandingView
              key="landing"
              onPhaseSelect={navigateToPhase}
              onCitationOpen={setCitationKey}
            />
          )}
          {view === 'phase' && selectedPhase && (
            <PhaseView
              key={`phase-${selectedPhaseId}`}
              phase={selectedPhase}
              onActivitySelect={navigateToActivity}
              onCitationOpen={setCitationKey}
            />
          )}
          {view === 'activity' && selectedPhase && selectedActivity && (
            <ActivityView
              key={`activity-${selectedActivityId}`}
              phase={selectedPhase}
              activity={selectedActivity}
              onPrev={prevActivity ? () => navigateToActivity(prevActivity.id) : null}
              onNext={nextActivity ? () => navigateToActivity(nextActivity.id) : null}
            />
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {citationKey && (
          <CitationDrawer
            key={citationKey}
            refKey={citationKey}
            onClose={() => setCitationKey(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
