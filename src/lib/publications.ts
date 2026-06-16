import art1 from "@/assets/insight-article-1.jpg";
import art2 from "@/assets/insight-article-2.jpg";
import art3 from "@/assets/insight-article-3.jpg";
import art4 from "@/assets/insight-article-4.jpg";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ContentBlock =
  | { kind: "p"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "table"; ref: string }
  | { kind: "figure"; ref: string }
  | { kind: "quote"; text: string; attr?: string };

export type Section = {
  id: string;
  heading: string;
  blocks: ContentBlock[];
};

export type Figure = {
  id: string;
  caption: string;
  alt: string;
};

export type PubTable = {
  id: string;
  caption: string;
  headers: string[];
  rows: string[][];
};

export type Reference = {
  id: string;
  authors: string;
  year: string;
  title: string;
  source: string;
  url?: string;
};

export type Publication = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  categoryColor: string;
  date: string;
  dateISO: string;
  readTime: number;
  heroImage: string;
  heroCaption: string;
  abstract: string;
  sections: Section[];
  figures: Figure[];
  tables: PubTable[];
  references: Reference[];
  tags: string[];
  relatedSlugs: string[];
};

// ─── Publications ─────────────────────────────────────────────────────────────

export const publications: Publication[] = [
  // ── 1. Governance Debt ────────────────────────────────────────────────────
  {
    slug: "governance-debt-in-enterprise-ai-systems",
    title: "Governance Debt in Enterprise AI Systems",
    subtitle:
      "A Framework for Identifying and Eliminating Hidden Governance Liabilities",
    category: "AI Governance",
    categoryColor: "#F59E0B",
    date: "16 Jun 2026",
    dateISO: "2026-06-16",
    readTime: 12,
    heroImage: art1,
    heroCaption:
      "Figure 1. Governance Debt Layers in Enterprise AI Systems — Source: Author's own work",
    abstract:
      "Governance debt is accumulating in enterprise AI systems at an unprecedented rate. As organisations scale AI adoption, governance often becomes an afterthought, creating hidden liabilities that compound over time. This article proposes a structured framework — the Governance Debt Index (GDI) — for identifying, quantifying, and systematically eliminating governance debt across the full AI system lifecycle.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            kind: "p",
            text: "Enterprise AI adoption has accelerated dramatically over the past three years. Where once a proof-of-concept took six months and required a data science team, today a capable language model can be integrated into a production workflow within days. This velocity is commercially valuable — but it comes at a hidden cost: governance debt.",
          },
          {
            kind: "p",
            text: "Governance debt, by analogy with technical debt, refers to the accumulated shortfall between the governance practices an AI system requires for safe, compliant, and accountable operation, and the governance practices actually in place. Like technical debt, it is rarely visible until it creates a crisis — a regulatory audit, a discriminatory output, a production model that no one can explain.",
          },
          {
            kind: "quote",
            text: "Every AI system deployed without adequate governance documentation creates a liability that will eventually be called in — either by regulators, auditors, or the system itself.",
            attr: "Author's synthesis, 2026",
          },
          {
            kind: "p",
            text: "This article introduces the Governance Debt Index (GDI), a five-dimension scoring model that enables AI teams, risk officers, and governance leads to measure, communicate, and systematically reduce governance debt across the AI system lifecycle.",
          },
        ],
      },
      {
        id: "governance-debt-framework",
        heading: "The Governance Debt Framework",
        blocks: [
          {
            kind: "p",
            text: "The GDI framework identifies five structural dimensions of AI governance, each weighted equally at 20 percent. Together they span the full governance surface of an enterprise AI system: from strategic alignment through to operational monitoring and compliance posture.",
          },
          { kind: "figure", ref: "fig-1" },
          {
            kind: "p",
            text: "Each dimension represents a governance domain where debt can accumulate independently. A system may score well on data governance while simultaneously carrying high debt in model transparency — a common pattern when teams inherit pre-trained models without adequate documentation of training data provenance or evaluation methodology.",
          },
          {
            kind: "ul",
            items: [
              "Strategy Alignment: Is AI investment tied to measurable business outcomes with clear ownership?",
              "Policy & Process: Are there documented, enforced governance policies covering the full lifecycle?",
              "Data Governance: Is data lineage tracked, quality measured, and access controlled?",
              "Model Governance: Are models documented, versioned, evaluated for bias, and explainable?",
              "Monitoring & Compliance: Are models monitored post-deployment, with drift detection and audit trails?",
            ],
          },
        ],
      },
      {
        id: "quantifying-governance-debt",
        heading: "Quantifying Governance Debt",
        blocks: [
          {
            kind: "p",
            text: "Governance debt becomes actionable only when it is quantified. The GDI scoring model assigns a score from 0 (no governance) to 5 (best-in-class governance) for each dimension, producing a composite GDI score out of 100. The scoring rubric for each dimension is grounded in established frameworks including the EU AI Act conformity requirements and NIST AI RMF measurement criteria.",
          },
          { kind: "table", ref: "governance-scoring" },
          {
            kind: "p",
            text: "Organisations with a GDI below 40 are considered in the 'critical debt' zone — at high risk of regulatory non-compliance and production incidents. Scores between 40 and 70 represent 'managed debt', where governance exists but has meaningful gaps. Above 70 is 'governance-mature', though no organisation should consider the work complete.",
          },
          {
            kind: "p",
            text: "The scoring exercise itself is valuable beyond the number it produces. The act of attempting to score each dimension forces teams to surface implicit assumptions, document undocumented practices, and identify governance owners who may not yet know they own governance responsibilities.",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        blocks: [
          {
            kind: "p",
            text: "Governance debt is not a compliance problem that legal teams solve after engineers build. It is an architectural concern that must be designed in from the first system requirements. The GDI framework provides a structured language for that conversation — across technical, legal, strategic, and operational stakeholders.",
          },
          {
            kind: "p",
            text: "With the EU AI Act entering full enforcement for high-risk AI systems, enterprises that have accumulated significant governance debt will face material compliance exposure. The time to measure and begin reducing that debt is now — not after the first audit finding.",
          },
          {
            kind: "ul",
            items: [
              "Conduct a GDI baseline assessment for every AI system in production or near-production.",
              "Assign explicit governance owners for each of the five dimensions.",
              "Integrate GDI scoring into the AI system development lifecycle as a quality gate.",
              "Review and update scores quarterly — governance debt accrues continuously.",
            ],
          },
        ],
      },
    ],
    figures: [
      {
        id: "fig-1",
        caption:
          "Figure 2. The 5-Layer Governance Debt Framework — Source: Author's own work",
        alt: "5-layer governance framework pyramid showing Strategy, Policy, Data, Model, and Monitoring layers",
      },
    ],
    tables: [
      {
        id: "governance-scoring",
        caption: "Table 1. Governance Debt Scoring Model",
        headers: ["Dimension", "Weight", "Description"],
        rows: [
          [
            "Strategy Alignment",
            "20%",
            "Alignment of AI initiatives with business strategy",
          ],
          [
            "Policy & Process",
            "20%",
            "Maturity of governance policies and procedures",
          ],
          [
            "Data Governance",
            "20%",
            "Data quality, lineage, and management practices",
          ],
          [
            "Model Governance",
            "20%",
            "Model fairness, transparency, and robustness",
          ],
          [
            "Monitoring & Compliance",
            "20%",
            "Monitoring, auditability, and compliance posture",
          ],
        ],
      },
    ],
    references: [
      {
        id: "ref-1",
        authors: "European Commission",
        year: "2024",
        title:
          "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        source: "Official Journal of the European Union",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      },
      {
        id: "ref-2",
        authors: "NIST",
        year: "2023",
        title: "Artificial Intelligence Risk Management Framework (AI RMF 1.0)",
        source: "National Institute of Standards and Technology",
        url: "https://airc.nist.gov/RMF",
      },
      {
        id: "ref-3",
        authors: "ISO/IEC",
        year: "2023",
        title:
          "ISO/IEC 42001:2023 — Information Technology: AI Management System",
        source: "International Organization for Standardization",
        url: "https://www.iso.org/standard/81230.html",
      },
    ],
    tags: [
      "AI Governance",
      "Enterprise AI",
      "Risk Management",
      "EU AI Act",
      "Compliance",
    ],
    relatedSlugs: [
      "eu-ai-act-implementation-guide",
      "rag-architecture-patterns-that-actually-scale",
    ],
  },

  // ── 2. EU AI Act ─────────────────────────────────────────────────────────
  {
    slug: "eu-ai-act-implementation-guide",
    title: "EU AI Act Implementation Guide for Enterprises",
    subtitle:
      "A Practical Roadmap for Achieving Compliance with EU AI Act Requirements",
    category: "EU AI Act",
    categoryColor: "#60A5FA",
    date: "9 Jun 2026",
    dateISO: "2026-06-09",
    readTime: 10,
    heroImage: art2,
    heroCaption:
      "Figure 1. EU AI Act Risk Classification Pyramid — Source: Author's own work",
    abstract:
      "The EU AI Act is the world's first comprehensive legal framework governing artificial intelligence, and it is now in active enforcement for high-risk AI systems. This guide provides enterprise technology and compliance teams with a practical, phased implementation roadmap — from initial risk classification through conformity assessment, technical documentation, human oversight mechanisms, and post-market monitoring obligations.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            kind: "p",
            text: "The EU Artificial Intelligence Act (Regulation 2024/1689/EU) represents the most significant regulatory development in enterprise AI since GDPR reshaped data privacy. For enterprises operating AI systems in or serving the EU market, compliance is not optional — penalties for violations of high-risk AI provisions reach €30 million or 6% of global turnover.",
          },
          {
            kind: "p",
            text: "Yet despite the scale of the obligation, most enterprises lack a clear implementation path. Compliance teams understand the regulation in principle but struggle to translate legal requirements into engineering and operational changes. This guide bridges that gap.",
          },
        ],
      },
      {
        id: "risk-classification",
        heading: "Step 1: Risk Classification",
        blocks: [
          {
            kind: "p",
            text: "The EU AI Act establishes a four-tier risk classification: Unacceptable Risk (prohibited outright), High Risk (subject to conformity requirements), Limited Risk (transparency obligations only), and Minimal Risk (no specific obligations). Your first implementation task is to classify every AI system in your portfolio.",
          },
          {
            kind: "ul",
            items: [
              "Prohibited systems include real-time biometric surveillance in public spaces, social scoring systems, and AI that exploits psychological vulnerabilities.",
              "High-risk systems include AI used in recruitment and employee evaluation, credit scoring, access to education, law enforcement, and critical infrastructure management.",
              "Limited risk systems include chatbots and generative AI — which must disclose AI-generated content.",
              "Minimal risk covers the majority of commercial AI applications such as spam filters, inventory optimisation, and recommendation engines.",
            ],
          },
          {
            kind: "p",
            text: "Classification is not always obvious. A recruitment AI that screens CVs is clearly high-risk. But an AI that drafts job descriptions may or may not be, depending on whether it indirectly influences candidate selection. Document your classification rationale — regulators will ask.",
          },
        ],
      },
      {
        id: "conformity-assessment",
        heading: "Step 2: Conformity Assessment",
        blocks: [
          {
            kind: "p",
            text: "High-risk AI systems must undergo a conformity assessment before deployment. For most high-risk applications, this is a self-assessment process — but it must be rigorous and documented. The conformity assessment evaluates the system against the requirements in Chapter III, Section 2 of the Act.",
          },
          {
            kind: "p",
            text: "Key conformity requirements include a risk management system maintained throughout the lifecycle, a data governance framework covering training data quality and bias evaluation, technical documentation sufficient to allow competent authorities to assess compliance, and an automatic logging system that captures system operation for audit purposes.",
          },
          {
            kind: "quote",
            text: "Conformity is not a checkbox exercise — it is an ongoing operational posture. Systems that conform at launch can fall out of conformance through model drift, data shift, or changes in deployment context.",
            attr: "Author's synthesis, 2026",
          },
        ],
      },
      {
        id: "technical-documentation",
        heading: "Step 3: Technical Documentation",
        blocks: [
          {
            kind: "p",
            text: "Annex IV of the EU AI Act specifies the technical documentation requirements for high-risk AI systems. This is the most operationally demanding compliance obligation for engineering teams. Documentation must cover: system general description and purpose, design specifications and architecture, training data characteristics and provenance, validation and testing methodology, known limitations and failure modes, and the human oversight measures designed into the system.",
          },
          {
            kind: "p",
            text: "Many organisations discover during this exercise that they lack adequate documentation for systems already in production — particularly for models inherited from third-party vendors or open-source projects. Gap remediation here can be significant. Start with your highest-risk systems and work outward.",
          },
        ],
      },
    ],
    figures: [],
    tables: [],
    references: [
      {
        id: "ref-1",
        authors: "European Commission",
        year: "2024",
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        source: "Official Journal of the European Union",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      },
      {
        id: "ref-2",
        authors: "European Commission",
        year: "2024",
        title:
          "EU AI Act Compliance Handbook for Providers and Deployers",
        source: "European Commission Digital Strategy",
        url: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
      },
      {
        id: "ref-3",
        authors: "BSI (British Standards Institution)",
        year: "2024",
        title: "PD CEN/CLC TR 17961:2024 — AI Standardisation Roadmap",
        source: "British Standards Institution",
      },
    ],
    tags: [
      "EU AI Act",
      "Compliance",
      "Enterprise AI",
      "Regulation",
      "High-Risk AI",
    ],
    relatedSlugs: [
      "governance-debt-in-enterprise-ai-systems",
      "design-patterns-for-agentic-ai-systems",
    ],
  },

  // ── 3. Knowledge Architectures ───────────────────────────────────────────
  {
    slug: "building-scalable-knowledge-architectures",
    title: "Building Scalable Knowledge Architectures for AI Systems",
    subtitle:
      "Designing Domain-Aligned Knowledge Architectures That Power Intelligent Enterprise Systems",
    category: "Knowledge Architecture",
    categoryColor: "#34D399",
    date: "2 Jun 2026",
    dateISO: "2026-06-02",
    readTime: 14,
    heroImage: art3,
    heroCaption:
      "Figure 1. Knowledge Architecture Stack — Source: Author's own work",
    abstract:
      "Enterprise AI systems are only as intelligent as the knowledge they can access and reason over. Yet most organisations approach knowledge management as a storage problem — indexing documents into a vector database and calling it done. This article argues for a fundamentally different approach: domain-aligned knowledge architectures that treat knowledge as a first-class engineering concern, structured for retrieval, reasoning, and continuous refinement.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            kind: "p",
            text: "The single most common cause of enterprise RAG system failure is not a poor choice of embedding model or vector database. It is a poorly designed knowledge architecture. Teams that invest weeks optimising retrieval parameters while their underlying knowledge corpus is fragmented, stale, and structurally incoherent will never achieve the retrieval quality their AI applications require.",
          },
          {
            kind: "p",
            text: "A knowledge architecture is the deliberate design of how knowledge is structured, maintained, and made accessible within an AI system. It encompasses the knowledge taxonomy, the ingestion and transformation pipeline, the storage and indexing strategy, and the retrieval interface that AI agents and applications use to access knowledge at inference time.",
          },
        ],
      },
      {
        id: "knowledge-taxonomy",
        heading: "Layer 1: Knowledge Taxonomy",
        blocks: [
          {
            kind: "p",
            text: "Every enterprise knowledge architecture must begin with taxonomy design. A knowledge taxonomy is a structured classification of the types, sources, and relationships of knowledge that the AI system needs to access. Without a taxonomy, knowledge accumulates as an undifferentiated mass — and retrieval becomes a guessing game.",
          },
          {
            kind: "ul",
            items: [
              "Declarative knowledge: facts, policies, product specifications, regulatory requirements.",
              "Procedural knowledge: how-to guides, workflows, decision trees, runbooks.",
              "Contextual knowledge: project history, case studies, lessons learned, client context.",
              "Dynamic knowledge: real-time data feeds, live APIs, event streams.",
            ],
          },
          {
            kind: "p",
            text: "Each knowledge type has different ingestion requirements, update frequencies, and retrieval patterns. Declarative knowledge updates quarterly; dynamic knowledge updates in milliseconds. Designing a single ingestion pipeline that treats all knowledge identically will produce a system that works poorly for all of them.",
          },
        ],
      },
      {
        id: "ingestion-architecture",
        heading: "Layer 2: Ingestion Architecture",
        blocks: [
          {
            kind: "p",
            text: "The ingestion layer is where most knowledge architecture debt accumulates. A well-designed ingestion architecture applies domain-specific transformation logic — not just chunking and embedding. This means extracting structured metadata, enriching chunks with context, resolving entity references, and flagging knowledge that is time-sensitive or jurisdiction-specific.",
          },
          {
            kind: "p",
            text: "For document-heavy enterprises, this typically involves a multi-stage pipeline: raw document intake, format normalisation, section extraction, metadata enrichment, chunking strategy selection (fixed-size vs. semantic vs. document-structure-aware), embedding, and index insertion. Each stage should be auditable and reprocessable without full reingestion.",
          },
          {
            kind: "quote",
            text: "The quality of your retrieval is bounded by the quality of your ingestion. You cannot retrieve structure that was never created.",
            attr: "Author's synthesis, 2026",
          },
        ],
      },
      {
        id: "retrieval-architecture",
        heading: "Layer 3: Retrieval Architecture",
        blocks: [
          {
            kind: "p",
            text: "Retrieval architecture defines how the AI system accesses knowledge at inference time. Modern enterprise retrieval should combine dense vector search, sparse keyword search (BM25), and structured metadata filtering. Hybrid retrieval consistently outperforms single-mode retrieval in enterprise settings where queries span both semantic intent and specific factual requirements.",
          },
          {
            kind: "p",
            text: "Beyond search mechanics, retrieval architecture must address reranking, context assembly, and knowledge provenance tracking. The AI system needs to know not just what knowledge is relevant, but why — and needs to be able to cite it accurately. Knowledge without provenance creates hallucination risk; knowledge with provenance enables grounded, auditable AI responses.",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        blocks: [
          {
            kind: "p",
            text: "Scalable knowledge architectures require the same engineering discipline as any other production system. They need design documents, quality metrics, testing frameworks, and operational runbooks. Organisations that treat them as a one-time data load will find their AI systems degrading in quality as the knowledge they contain drifts further from the operational reality of the business.",
          },
          {
            kind: "p",
            text: "The investment in knowledge architecture pays dividends across every AI system built on top of it. A well-structured knowledge foundation reduces hallucination, improves answer quality, accelerates new AI application development, and provides the audit trail that regulatory compliance increasingly requires.",
          },
        ],
      },
    ],
    figures: [],
    tables: [],
    references: [
      {
        id: "ref-1",
        authors: "Lewis, P., et al.",
        year: "2020",
        title:
          "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        source: "Advances in Neural Information Processing Systems 33",
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        id: "ref-2",
        authors: "Gao, Y., et al.",
        year: "2023",
        title: "Retrieval-Augmented Generation for Large Language Models: A Survey",
        source: "arXiv preprint arXiv:2312.10997",
        url: "https://arxiv.org/abs/2312.10997",
      },
      {
        id: "ref-3",
        authors: "Asai, A., et al.",
        year: "2023",
        title: "Self-RAG: Learning to Retrieve, Generate, and Critique through Self-Reflection",
        source: "arXiv preprint arXiv:2310.11511",
        url: "https://arxiv.org/abs/2310.11511",
      },
    ],
    tags: [
      "Knowledge Architecture",
      "RAG",
      "Enterprise AI",
      "Vector Databases",
      "Knowledge Management",
    ],
    relatedSlugs: [
      "rag-architecture-patterns-that-actually-scale",
      "governance-debt-in-enterprise-ai-systems",
    ],
  },

  // ── 4. Agentic AI Design Patterns ────────────────────────────────────────
  {
    slug: "design-patterns-for-agentic-ai-systems",
    title: "Design Patterns for Agentic AI Systems",
    subtitle:
      "Proven Architectural Patterns for Building Reliable, Observable, and Controllable AI Agents",
    category: "Agentic AI",
    categoryColor: "#A855F7",
    date: "26 May 2026",
    dateISO: "2026-05-26",
    readTime: 11,
    heroImage: art4,
    heroCaption:
      "Figure 1. Agentic AI System Topology — Source: Author's own work",
    abstract:
      "Agentic AI systems — where language models autonomously plan, use tools, and execute multi-step tasks — are moving rapidly from research into production enterprise environments. But the architectural patterns that work in demos frequently fail in production: agents loop indefinitely, take irreversible actions, and produce outputs that no one can explain or audit. This article catalogues the design patterns that distinguish reliable production agents from brittle demos.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            kind: "p",
            text: "Agentic AI represents a qualitative shift in what AI systems can do. Where traditional ML systems make a prediction and return a result, agents plan sequences of actions, invoke tools, interpret results, and iterate toward a goal. This capability unlocks genuinely transformative applications — but it also introduces a class of failure modes that enterprise architects must understand before deploying agents in consequential workflows.",
          },
          {
            kind: "p",
            text: "The patterns described in this article are grounded in production deployments across enterprise contexts including insurance claims processing, knowledge management, regulatory compliance review, and career intelligence. They represent hard-won lessons from systems that failed before they worked.",
          },
        ],
      },
      {
        id: "pattern-orchestrator-worker",
        heading: "Pattern 1: Orchestrator-Worker",
        blocks: [
          {
            kind: "p",
            text: "The most fundamental agentic pattern separates planning from execution. An orchestrator agent is responsible for decomposing a goal into subtasks and delegating them to specialised worker agents. Worker agents are narrow and stateless — they receive a task, execute it, and return a result. The orchestrator maintains state and coordinates the overall workflow.",
          },
          {
            kind: "ul",
            items: [
              "Orchestrator responsibilities: goal decomposition, worker selection, result integration, error handling.",
              "Worker responsibilities: single-task execution with predictable inputs and outputs.",
              "Communication: structured JSON contracts between orchestrator and workers — never natural language.",
              "Observability: every orchestrator decision and worker invocation must be logged with timestamps and inputs.",
            ],
          },
          {
            kind: "p",
            text: "This pattern dramatically improves debuggability. When an agentic workflow produces an incorrect result, you can trace the failure to a specific orchestrator decision or worker execution — rather than attempting to interpret the reasoning of a single monolithic agent.",
          },
        ],
      },
      {
        id: "pattern-human-in-loop",
        heading: "Pattern 2: Human-in-the-Loop Checkpoints",
        blocks: [
          {
            kind: "p",
            text: "Production agents must incorporate explicit human-in-the-loop checkpoints at consequential decision points. This is not a limitation of current AI capability — it is a governance requirement. The EU AI Act mandates meaningful human oversight for high-risk AI systems, and most enterprise use cases qualify.",
          },
          {
            kind: "p",
            text: "Effective checkpoint design identifies the decision points where errors are costly or irreversible, and inserts human approval gates before those points. The checkpoint should surface the relevant context, the agent's proposed action, and the confidence level — giving the human reviewer what they need to make an informed decision in under 60 seconds.",
          },
          {
            kind: "quote",
            text: "A human-in-the-loop checkpoint is only valuable if the human has enough context to actually evaluate the agent's proposed action. Surfacing a raw JSON blob is not a checkpoint — it is an abdication of design responsibility.",
            attr: "Author's synthesis, 2026",
          },
        ],
      },
      {
        id: "pattern-tool-safety",
        heading: "Pattern 3: Tool Safety Contracts",
        blocks: [
          {
            kind: "p",
            text: "Every tool that an agent can invoke should have a defined safety contract: a specification of the tool's scope, the actions it is permitted to take, the actions it must not take, and the conditions under which it should refuse a request and escalate. Tool safety contracts are the primary mechanism for limiting blast radius when an agent makes an incorrect decision.",
          },
          {
            kind: "ul",
            items: [
              "Read-only tools: browsing, search, retrieval — safe for autonomous execution.",
              "Write tools with undo: document creation, draft emails — safe with logging.",
              "Write tools without easy undo: database mutations, API calls to external systems — require checkpoint.",
              "Irreversible tools: financial transactions, regulatory submissions — require explicit human approval.",
            ],
          },
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        blocks: [
          {
            kind: "p",
            text: "Agentic AI is not a technology waiting for maturity — it is a design discipline waiting for adoption. The patterns described here are not theoretical constructs; they are operational requirements for any enterprise deploying agents in workflows with real consequences. Teams that treat agent architecture as an afterthought will discover their oversight gaps in the worst possible way.",
          },
          {
            kind: "p",
            text: "The enterprises that will extract durable value from agentic AI are those that invest in architectural clarity before scaling. This means explicit orchestration patterns, governed tool contracts, meaningful human checkpoints, and comprehensive observability from day one.",
          },
        ],
      },
    ],
    figures: [],
    tables: [],
    references: [
      {
        id: "ref-1",
        authors: "Wang, L., et al.",
        year: "2024",
        title: "A Survey on Large Language Model based Autonomous Agents",
        source: "Frontiers of Computer Science 18",
        url: "https://arxiv.org/abs/2308.11432",
      },
      {
        id: "ref-2",
        authors: "Anthropic",
        year: "2024",
        title: "Building Effective Agents",
        source: "Anthropic Research Blog",
        url: "https://www.anthropic.com/research/building-effective-agents",
      },
      {
        id: "ref-3",
        authors: "European Commission",
        year: "2024",
        title: "Regulation (EU) 2024/1689 — Artificial Intelligence Act",
        source: "Official Journal of the European Union",
        url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689",
      },
    ],
    tags: [
      "Agentic AI",
      "Multi-Agent Systems",
      "AI Architecture",
      "Enterprise AI",
      "AI Safety",
    ],
    relatedSlugs: [
      "building-scalable-knowledge-architectures",
      "eu-ai-act-implementation-guide",
    ],
  },

  // ── 5. Career Intelligence OS Case Study ─────────────────────────────────
  {
    slug: "career-intelligence-os-case-study",
    title: "Career Intelligence OS: A Case Study",
    subtitle:
      "How We Built an AI-Powered Career Intelligence Platform for Personalised Growth at Scale",
    category: "Case Studies",
    categoryColor: "#F472B6",
    date: "19 May 2026",
    dateISO: "2026-05-19",
    readTime: 13,
    heroImage: art1,
    heroCaption:
      "Figure 1. Career Intelligence OS Architecture — Source: Author's own work",
    abstract:
      "The Career Intelligence Operating System is a multi-agent AI platform designed to eliminate the inefficiency and information asymmetry that characterise most professional job searches. By combining semantic CV analysis, RAG-powered job matching, automated application drafting, and GDPR-compliant data management, the system reduces application time by 85% while tripling the number of qualified applications submitted. This case study documents the architectural decisions, the failures encountered, and the lessons extracted from building this system from scratch.",
    sections: [
      {
        id: "problem-framing",
        heading: "Problem Framing",
        blocks: [
          {
            kind: "p",
            text: "The modern professional job search is fundamentally broken. Job seekers spend an average of 11 hours per week on job search activities, but more than 70% of that time is consumed by low-value tasks: reformatting CVs, rewriting cover letters with minimal personalisation, and tracking applications in spreadsheets. Meanwhile, the actual matching intelligence — understanding which opportunities genuinely fit a candidate's unique combination of skills, experience, and growth objectives — receives almost no systematic attention.",
          },
          {
            kind: "p",
            text: "The Career Intelligence OS was designed to invert this ratio. By automating the low-value administrative burden, we sought to redirect human attention toward the high-value work: selecting which opportunities to pursue, preparing for interviews, and building the relationships that actually drive career outcomes.",
          },
        ],
      },
      {
        id: "architecture",
        heading: "System Architecture",
        blocks: [
          {
            kind: "p",
            text: "The system consists of five specialised agents operating under an orchestrating intelligence. Each agent owns a specific domain of expertise and communicates with the orchestrator through structured JSON contracts. Crucially, no agent communicates directly with another — all coordination flows through the orchestrator, ensuring observability and enabling rollback of any decision in the pipeline.",
          },
          {
            kind: "ul",
            items: [
              "Profile Intelligence Agent: parses and semantically enriches the candidate's CV, extracting entities, skills, experience patterns, and career trajectory signals.",
              "Market Intelligence Agent: continuously indexes job postings from configured sources, extracting requirements and ranking signals for retrieval.",
              "Match Intelligence Agent: performs semantic matching between profile vectors and job vectors, generating match scores with explainable rationale.",
              "Application Intelligence Agent: drafts personalised cover letters and tailored CV summaries for shortlisted opportunities.",
              "Compliance Agent: enforces GDPR compliance — managing data retention, processing logs, and consent tracking for all candidate data.",
            ],
          },
        ],
      },
      {
        id: "failures-and-lessons",
        heading: "Failures and Lessons",
        blocks: [
          {
            kind: "p",
            text: "The most instructive failures in this project were not technical — they were architectural. In early versions, we allowed agents to communicate peer-to-peer, with the Match agent directly requesting enriched profiles from the Profile agent. This produced a system that worked in happy-path testing but became impossible to debug when the match quality degraded. The root cause took days to isolate because the data flow was non-linear and undocumented.",
          },
          {
            kind: "p",
            text: "Refactoring to pure orchestrator-mediated communication added two weeks to the timeline but produced a system whose behaviour we could fully reason about. Every subsequent bug was isolated and fixed in hours rather than days.",
          },
          {
            kind: "quote",
            text: "Debugging a multi-agent system requires complete observability of agent state transitions. If you cannot replay a sequence of agent decisions, you cannot reliably fix the system when it fails.",
            attr: "Author's synthesis, 2026",
          },
        ],
      },
      {
        id: "outcomes",
        heading: "Outcomes",
        blocks: [
          {
            kind: "p",
            text: "After three months of production operation, the Career Intelligence OS delivered measurable results across all primary metrics. Application time reduced from an average of 2.5 hours per application to 22 minutes — an 85% reduction. Applications submitted per week increased from an average of 2.3 to 7.1 — a 3× improvement. Match quality, measured by first-round interview rate, improved from 12% to 31%.",
          },
          {
            kind: "p",
            text: "The compliance agent proved its value when an audit of processing logs identified three instances where data had been retained beyond the configured retention period due to a bug in the deletion trigger. The issue was caught and remediated before any regulatory exposure materialised — a direct return on the investment in compliance infrastructure.",
          },
        ],
      },
    ],
    figures: [],
    tables: [],
    references: [
      {
        id: "ref-1",
        authors: "European Parliament",
        year: "2016",
        title: "Regulation (EU) 2016/679 — General Data Protection Regulation",
        source: "Official Journal of the European Union",
        url: "https://gdpr-info.eu/",
      },
      {
        id: "ref-2",
        authors: "Chase, H.",
        year: "2023",
        title: "LangChain: Building Applications with LLMs through Composability",
        source: "GitHub Repository",
        url: "https://github.com/langchain-ai/langchain",
      },
    ],
    tags: [
      "Case Study",
      "Agentic AI",
      "Multi-Agent Systems",
      "GDPR",
      "Career AI",
    ],
    relatedSlugs: [
      "rag-architecture-patterns-that-actually-scale",
      "building-scalable-knowledge-architectures",
    ],
  },

  // ── 6. RAG Architecture Patterns ─────────────────────────────────────────
  {
    slug: "rag-architecture-patterns-that-actually-scale",
    title: "RAG Architecture Patterns That Actually Scale",
    subtitle:
      "Moving Beyond Demo-Grade RAG Toward Production-Grade Architectures for Enterprise Use",
    category: "RAG Systems",
    categoryColor: "#22D3EE",
    date: "12 May 2026",
    dateISO: "2026-05-12",
    readTime: 9,
    heroImage: art2,
    heroCaption:
      "Figure 1. Production RAG Architecture Stack — Source: Author's own work",
    abstract:
      "Most RAG implementations work beautifully in a Jupyter notebook and fail quietly in production. The gap between demo-grade and production-grade RAG is not primarily a matter of model quality or embedding dimensionality — it is a matter of architectural discipline. This article identifies the five architectural decisions that determine whether a RAG system will scale reliably to enterprise workloads, and provides concrete patterns for making each decision correctly.",
    sections: [
      {
        id: "introduction",
        heading: "Introduction",
        blocks: [
          {
            kind: "p",
            text: "Retrieval-Augmented Generation has become the dominant pattern for grounding language model outputs in organisational knowledge. The basic RAG pipeline — embed a query, retrieve relevant chunks, generate a response using retrieved context — is well understood and widely implemented. What is less well understood is why so many RAG implementations that work in development fail to perform in production.",
          },
          {
            kind: "p",
            text: "Production RAG failure patterns are consistent and predictable. Retrieval quality degrades as the knowledge corpus grows and diversifies. Response latency spikes under concurrent load. Answers become inconsistent as different retrieval paths return different context for semantically equivalent queries. Trust erodes as users encounter confident-sounding but incorrect answers.",
          },
        ],
      },
      {
        id: "chunking-strategy",
        heading: "Pattern 1: Semantic Chunking",
        blocks: [
          {
            kind: "p",
            text: "Fixed-size chunking — splitting documents into 512-token blocks with 50-token overlap — is the most common RAG anti-pattern. It destroys the semantic structure of documents, separating headings from their content, splitting tables across chunk boundaries, and breaking procedure descriptions mid-step.",
          },
          {
            kind: "p",
            text: "Semantic chunking respects document structure. It uses the document's own structural signals — headings, sections, paragraphs, list items, table rows — as natural chunk boundaries. For enterprise documents, this typically means processing with a document structure parser that extracts markdown-formatted sections before chunking, preserving the hierarchical context that makes chunks interpretable at retrieval time.",
          },
          {
            kind: "ul",
            items: [
              "Use document-structure-aware parsers: Unstructured.io, LlamaParse, or Azure Document Intelligence.",
              "Preserve heading hierarchy as chunk metadata — not just text.",
              "Keep tables intact as single chunks with structured metadata.",
              "Generate synthetic questions for each chunk at index time — improves retrieval recall.",
            ],
          },
        ],
      },
      {
        id: "hybrid-retrieval",
        heading: "Pattern 2: Hybrid Retrieval",
        blocks: [
          {
            kind: "p",
            text: "Pure vector search consistently underperforms in enterprise settings. Vector search excels at semantic similarity — finding chunks that mean the same thing even when expressed differently. But it performs poorly on exact-match retrieval: finding the specific policy document numbered HR-2024-017, or the exact regulation article number 9(2)(a).",
          },
          {
            kind: "p",
            text: "Hybrid retrieval combines dense vector search with sparse BM25 keyword search, using a reciprocal rank fusion (RRF) algorithm to merge results. Production benchmarks consistently show 15-25% improvement in retrieval precision when switching from pure vector search to hybrid retrieval on enterprise document corpora.",
          },
        ],
      },
      {
        id: "evaluation-framework",
        heading: "Pattern 3: Continuous Evaluation",
        blocks: [
          {
            kind: "p",
            text: "Production RAG systems must be continuously evaluated — not just at launch. Retrieval quality degrades over time as the knowledge corpus evolves, as user query patterns shift, and as the embedding model version used for indexed chunks diverges from the model used for query embedding.",
          },
          {
            kind: "p",
            text: "A minimum viable RAG evaluation framework consists of three components: a golden dataset of question-answer pairs with known ground truth, an automated evaluation pipeline that runs against this dataset on every knowledge corpus update, and a monitoring dashboard that tracks retrieval precision, answer faithfulness, and response latency as operational metrics.",
          },
          {
            kind: "quote",
            text: "You cannot improve what you do not measure. RAG systems that lack continuous evaluation infrastructure are operating blind — and the degradation, when it comes, will be invisible until users lose trust.",
            attr: "Author's synthesis, 2026",
          },
        ],
      },
      {
        id: "conclusion",
        heading: "Conclusion",
        blocks: [
          {
            kind: "p",
            text: "The gap between demo-grade and production-grade RAG is bridgeable — but bridging it requires treating RAG as a systems engineering problem, not a prompt engineering problem. Semantic chunking, hybrid retrieval, and continuous evaluation are not advanced optimisations for teams that have the basics working. They are the basics.",
          },
          {
            kind: "p",
            text: "Organisations that invest in these patterns early will find that their RAG systems improve over time rather than degrading. They will be able to onboard new knowledge domains without re-engineering the retrieval pipeline. And they will have the evaluation infrastructure to detect and remediate quality degradation before it reaches end users.",
          },
        ],
      },
    ],
    figures: [],
    tables: [],
    references: [
      {
        id: "ref-1",
        authors: "Lewis, P., et al.",
        year: "2020",
        title:
          "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
        source: "Advances in Neural Information Processing Systems 33",
        url: "https://arxiv.org/abs/2005.11401",
      },
      {
        id: "ref-2",
        authors: "Gao, Y., et al.",
        year: "2023",
        title:
          "Retrieval-Augmented Generation for Large Language Models: A Survey",
        source: "arXiv preprint arXiv:2312.10997",
        url: "https://arxiv.org/abs/2312.10997",
      },
      {
        id: "ref-3",
        authors: "Robertson, S. & Zaragoza, H.",
        year: "2009",
        title: "The Probabilistic Relevance Framework: BM25 and Beyond",
        source: "Foundations and Trends in Information Retrieval 3(4)",
      },
    ],
    tags: [
      "RAG",
      "Vector Databases",
      "Enterprise AI",
      "Knowledge Architecture",
      "LLM",
    ],
    relatedSlugs: [
      "building-scalable-knowledge-architectures",
      "governance-debt-in-enterprise-ai-systems",
    ],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}

export function getRelatedPublications(slugs: string[]): Publication[] {
  return slugs
    .map((s) => getPublicationBySlug(s))
    .filter((p): p is Publication => p !== undefined);
}
