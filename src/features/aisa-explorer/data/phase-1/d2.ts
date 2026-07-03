import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D2 — BUSINESS PROBLEM DEFINITION
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Identify Pain Points ────────────────────────────────────────

const EG_PAIN_DISCOVERY: AISANode = {
  id: 'p1-d2-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Conducting Pain Point Discovery Sessions',
  description: 'Run structured discovery sessions with Business Owner, Process Owner, and end users to surface current-state problems and frustrations.',
  purpose: 'Collect first-hand accounts of where the current state is failing before forming any hypothesis about AI solutions.',
  why_it_matters: 'Teams that skip structured pain discovery jump straight to building what the sponsor imagined, not what the process actually needs. AI systems designed around hypothetical problems rarely achieve adoption because they do not solve the real ones.',
  methods: [
    '1. Prepare a structured pain point template: situation, what goes wrong, how often, impact when it does, current workaround.',
    '2. Schedule separate sessions with Business Owner, Process Owner, and 2–3 representative end users. Keep groups separate to avoid anchoring.',
    '3. Ask open questions: "Walk me through what you do today, step by step. Where does it break? Where do you lose time?"',
    '4. Avoid suggesting solutions. When someone says "we need AI to do X," ask: "What problem does that solve for you?"',
    '5. Document each pain point verbatim before interpreting it.',
    '6. Cluster similar pain points across sessions into thematic groups.',
    '7. Return the pain point list to participants for validation before treating it as confirmed.',
  ],
  tools: ['Pain point capture template', 'Miro or whiteboard for clustering', 'Interview notes'],
  outputs: ['Raw pain point list clustered by theme, validated by stakeholders'],
  exit_criteria: ['Pain points documented from at least three stakeholder groups; clustering validated by Business Owner'],
}

const T_PAIN_DISCOVERY: AISANode = {
  id: 'p1-d2-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Conduct Pain Point Discovery Sessions',
  description: 'Run structured interviews with Business Owner, Process Owner, and end users to surface current-state problems.',
  purpose: 'Collect validated, first-hand accounts of process failures before proposing solutions.',
  inputs: ['Stakeholder Register', 'Process list from D4', 'Interview templates'],
  methods: ['Structured stakeholder interviews', 'Open-question technique', 'Pain point clustering'],
  tools: ['Pain point capture template', 'Miro'],
  outputs: ['Validated pain point list by theme'],
  children: [EG_PAIN_DISCOVERY],
}

const EG_PAIN_PRIORITISE: AISANode = {
  id: 'p1-d2-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Prioritising Pain Points by Impact and Frequency',
  description: 'Score and rank each pain point by business impact and occurrence frequency to identify which deserve the greatest attention.',
  purpose: 'Focus the problem definition on the highest-value pain points rather than treating all issues as equal.',
  why_it_matters: 'A long list of pain points without prioritisation produces an equally long requirement list that overwhelms design. Prioritisation forces clarity about what matters most and what the AI system must solve first.',
  methods: [
    '1. For each pain point, assign a score (1–3) for: (a) frequency — how often it occurs per week or per process cycle; (b) severity — when it occurs, how significant is the downstream impact; (c) reach — how many people or transactions are affected.',
    '2. Calculate a composite priority score: frequency × severity × reach.',
    '3. Sort pain points by composite score. The top 20% usually account for 80% of the addressable value.',
    '4. Present the ranked list to the Business Owner for validation. Adjust if their judgement differs from the scoring model.',
    '5. Mark the top 5–10 pain points as "primary targets" for the problem statement.',
  ],
  tools: ['Pain point prioritisation matrix (spreadsheet)'],
  outputs: ['Ranked pain point list with composite priority scores; primary target list approved by Business Owner'],
  exit_criteria: ['Pain points scored and ranked; Business Owner has validated the priority ranking'],
}

const T_PAIN_PRIORITISE: AISANode = {
  id: 'p1-d2-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Prioritise Pain Points by Impact and Frequency',
  description: 'Score and rank pain points to identify which are the primary targets for the AI solution.',
  purpose: 'Focus problem definition on the highest-value issues rather than attempting to solve everything.',
  inputs: ['Validated pain point list', 'Business Owner input on strategic priorities'],
  methods: ['Impact-frequency scoring matrix', 'Composite score ranking', 'Business Owner validation'],
  tools: ['Pain point prioritisation matrix'],
  outputs: ['Ranked pain point list with primary targets'],
  children: [EG_PAIN_PRIORITISE],
}

const SA1_PAIN_POINTS: AISANode = {
  id: 'p1-d2-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Pain Points',
  description: 'Systematically surface and prioritise the current-state problems that the AI initiative must address, gathered directly from the people experiencing them.',
  purpose: 'Ground the problem statement in observed reality, not assumptions or executive summaries.',
  why_it_matters: 'The quality of the problem statement determines the quality of everything built downstream. A vague or assumed pain point produces an AI system that is technically impressive but practically irrelevant.',
  inputs: ['Stakeholder Register', 'Introductory meeting notes', 'Any existing process documentation'],
  questions: ['What specifically fails in the current process?', 'How often does it fail?', 'What is the cost of each failure?'],
  methods: ['Structured discovery interviews', 'Pain point capture and clustering', 'Impact-frequency scoring'],
  tools: ['Pain point capture template', 'Prioritisation matrix'],
  outputs: ['Ranked pain point list validated by Business Owner'],
  deliverables: ['Pain Point List (input to D5 Pain Point Matrix)'],
  exit_criteria: ['Pain points identified from minimum three stakeholder groups; ranked and Business Owner-validated'],
  children: [T_PAIN_DISCOVERY, T_PAIN_PRIORITISE],
}

// ─── SA2: Quantify Business Impact ────────────────────────────────────

const EG_QUANTIFY_COST: AISANode = {
  id: 'p1-d2-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Quantifying the Cost of the Current State',
  description: 'Calculate the measurable business cost of each priority pain point: time lost, errors, rework, and direct financial impact.',
  purpose: 'Convert qualitative pain into quantified business cost to build a credible ROI case and justify investment.',
  why_it_matters: 'Sponsors approve AI investments based on numbers, not narratives. Quantified pain provides the baseline against which ROI is measured and makes the investment decision defensible to finance and board.',
  methods: [
    '1. For each priority pain point, ask the Process Owner and Business Owner: "How long does this problem add to the process per occurrence?"',
    '2. Multiply time cost by loaded hourly rate of the affected roles and occurrence frequency to get annualised labour cost.',
    '3. Identify and quantify error costs separately: rework time, penalty charges, regulatory fines, customer churn attributable to errors.',
    '4. Ask: "What decisions are delayed or degraded because of this problem?" Quantify downstream impact where measurable.',
    '5. Aggregate into a total "cost of current state" figure per pain point and overall.',
    '6. Note confidence levels for each figure: measured, estimated, or assumed.',
  ],
  tools: ['Business impact calculator (spreadsheet)', 'HR cost-per-hour data'],
  outputs: ['Quantified cost table per pain point with confidence levels'],
  exit_criteria: ['Each priority pain point has a quantified cost with stated confidence level; aggregate cost confirmed by Business Owner'],
}

const T_QUANTIFY_COST: AISANode = {
  id: 'p1-d2-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Quantify Cost of Current State',
  description: 'Calculate the measurable financial and time cost of each priority pain point.',
  purpose: 'Provide a quantified baseline for ROI calculation and investment justification.',
  inputs: ['Priority pain point list', 'Process Owner and Business Owner input', 'HR cost data'],
  methods: ['Time-cost multiplication', 'Error cost quantification', 'Downstream impact estimation'],
  tools: ['Business impact calculator'],
  outputs: ['Cost table per pain point with confidence levels'],
  children: [EG_QUANTIFY_COST],
}

const EG_QUANTIFY_VOLUME: AISANode = {
  id: 'p1-d2-sa2-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Establishing Process Volume and Scale',
  description: 'Document the volume, frequency, and scale of the process to establish how much the AI solution will need to handle and how impact scales with adoption.',
  purpose: 'Understand the actual transaction volume and scale so architecture decisions are calibrated to real load requirements.',
  why_it_matters: 'An AI system processing 100 transactions per day has fundamentally different architecture requirements from one processing 1 million. Volume data established in Phase 1 prevents overengineering for low-volume use cases and underengineering for high-volume ones.',
  methods: [
    '1. Ask the Process Owner: "How many times does this process run per day / week / month?"',
    '2. Identify peak periods: "What is the busiest time of day/week/year for this process?"',
    '3. Obtain or estimate current transaction volumes from existing system logs, reports, or process metrics.',
    '4. Project future volume: "Is this expected to grow? By how much, over what timeframe?"',
    '5. Document average, peak, and projected volumes. These become architecture inputs in Phase 3.',
  ],
  tools: ['Volume estimation template', 'Existing system reports or logs'],
  outputs: ['Process volume profile: average, peak, and projected transaction volumes'],
  exit_criteria: ['Volume data confirmed by Process Owner; peak and projected volumes documented for Phase 3 architecture use'],
}

const T_QUANTIFY_VOLUME: AISANode = {
  id: 'p1-d2-sa2-t2',
  type: 'task',
  level: 4,
  title: 'Establish Process Volume and Scale',
  description: 'Document the transaction volume, frequency, and growth projections for the process being addressed.',
  purpose: 'Calibrate architecture decisions to actual load requirements from Phase 3 onward.',
  inputs: ['Process Owner contact', 'Existing system reports or logs', 'Business growth projections'],
  methods: ['Volume interview', 'Log or report extraction', 'Peak and growth projection'],
  tools: ['Volume estimation template'],
  outputs: ['Process volume profile with average, peak, and projected volumes'],
  children: [EG_QUANTIFY_VOLUME],
}

const SA2_IMPACT: AISANode = {
  id: 'p1-d2-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Quantify Business Impact',
  description: 'Convert identified pain points into measurable financial, time, and operational impact figures that support the business case.',
  purpose: 'Establish a credible, quantified baseline that justifies investment and measures post-deployment ROI.',
  why_it_matters: 'AI projects without quantified impact assessments cannot prove their value. Without a baseline, there is no way to measure improvement. Without measurement, there is no accountability — which violates the AISA principle of Human Accountability Cannot Be Delegated.',
  inputs: ['Priority pain point list', 'Business Owner and Process Owner input', 'HR and finance data'],
  questions: ['What does each pain point cost in time and money per year?', 'At what volume does this process run?', 'How does the cost scale?'],
  methods: ['Labour cost calculation', 'Error cost quantification', 'Volume profiling'],
  tools: ['Business impact calculator', 'Volume estimation template'],
  outputs: ['Quantified impact table per pain point', 'Process volume profile'],
  deliverables: ['Business impact quantification (input to Business Case in D3)'],
  exit_criteria: ['All priority pain points have quantified costs; volume profile documented with peak and projected figures'],
  children: [T_QUANTIFY_COST, T_QUANTIFY_VOLUME],
}

// ─── SA3: Define Current State ─────────────────────────────────────────

const EG_CURRENT_STATE_NARRATIVE: AISANode = {
  id: 'p1-d2-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Writing the Current State Narrative',
  description: 'Write a concise, factual description of how the process or problem area currently works — before any AI intervention.',
  purpose: 'Establish an agreed, written baseline of the current state that all stakeholders confirm before future-state design begins.',
  why_it_matters: 'Without a confirmed current-state description, stakeholders argue about what the process actually does today instead of what it should do tomorrow. The current state narrative prevents this by establishing a shared, written reference.',
  methods: [
    '1. Synthesise information from stakeholder interviews, pain point discovery, and any existing process documentation.',
    '2. Write in plain English, describing: what triggers the process, what happens step by step, who does what, what systems are used, where problems occur.',
    '3. Include quantitative context: volumes, timings, error rates, team sizes.',
    '4. Draft should be 1–2 pages maximum. Avoid technical jargon unless writing for a technical audience.',
    '5. Share with the Process Owner and Business Owner for review. Revise until both confirm it is an accurate description.',
    '6. Include the confirmed current state narrative in the Problem Statement document.',
  ],
  tools: ['Document template', 'Interview notes', 'Pain point and volume data'],
  outputs: ['Current State Narrative (1–2 pages), confirmed by Process Owner and Business Owner'],
  exit_criteria: ['Current state narrative confirmed in writing by Process Owner and Business Owner'],
}

const T_CURRENT_STATE_NARRATIVE: AISANode = {
  id: 'p1-d2-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Write Current State Narrative',
  description: 'Produce a concise, stakeholder-confirmed description of how the process currently works.',
  purpose: 'Establish a shared written baseline before future-state design begins.',
  inputs: ['Interview notes', 'Pain point list', 'Volume profile', 'Existing documentation'],
  methods: ['Synthesis of stakeholder input', 'Plain-language writing', 'Review and confirmation'],
  tools: ['Document template'],
  outputs: ['Confirmed current state narrative'],
  children: [EG_CURRENT_STATE_NARRATIVE],
}

const EG_CURRENT_STATE_METRICS: AISANode = {
  id: 'p1-d2-sa3-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Establishing Current State Baseline Metrics',
  description: 'Document the measurable performance characteristics of the current state that the AI system will be expected to improve.',
  purpose: 'Create the measurement baseline against which post-deployment improvement will be assessed.',
  why_it_matters: 'Without documented baseline metrics, the project cannot demonstrate improvement. Claims like "we\'re 40% faster" are only credible if a pre-deployment baseline was formally captured.',
  methods: [
    '1. For each priority pain point, identify the metric that best captures the problem: process cycle time, error rate, throughput, cost per unit, backlog volume.',
    '2. Obtain current measurements from system logs, reports, team estimates, or direct observation.',
    '3. Document the measurement method and the data source for each metric.',
    '4. Flag metrics that are estimated rather than measured — these carry higher uncertainty.',
    '5. Agree with the Business Owner that these metrics will be used as the post-deployment comparison baseline.',
    '6. Include baseline metrics in the Problem Statement and carry forward to D9 (Success Metrics).',
  ],
  tools: ['Metrics baseline template', 'Existing system reports'],
  outputs: ['Baseline metrics table with measurement method and data source'],
  exit_criteria: ['Baseline metrics documented and approved by Business Owner as the measurement reference for post-deployment evaluation'],
}

const T_CURRENT_STATE_METRICS: AISANode = {
  id: 'p1-d2-sa3-t2',
  type: 'task',
  level: 4,
  title: 'Establish Current State Baseline Metrics',
  description: 'Document the measurable performance characteristics of the current state.',
  purpose: 'Create the measurement baseline for post-deployment ROI assessment.',
  inputs: ['Priority pain point list', 'System reports and logs', 'Business Owner confirmation'],
  methods: ['Metric identification', 'Data source identification', 'Measurement method documentation'],
  tools: ['Metrics baseline template'],
  outputs: ['Baseline metrics table'],
  children: [EG_CURRENT_STATE_METRICS],
}

const SA3_CURRENT_STATE: AISANode = {
  id: 'p1-d2-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Define Current State',
  description: 'Produce a confirmed, factual description of how the affected process or domain works today, including its measurable performance characteristics.',
  purpose: 'Establish a shared, written reference point that prevents future-state design from being built on assumed rather than real baselines.',
  why_it_matters: 'Design that begins without a confirmed current state produces a solution for a process that may not actually exist in the form assumed. The current state definition is the anchor for everything that follows.',
  inputs: ['Interview notes', 'Pain point list', 'Volume profile', 'Existing process documentation'],
  questions: ['What does the current process actually do, step by step?', 'What are its measurable performance characteristics today?'],
  methods: ['Current state narrative writing', 'Baseline metric collection', 'Stakeholder confirmation'],
  tools: ['Document template', 'Metrics baseline template'],
  outputs: ['Current state narrative', 'Baseline metrics table'],
  deliverables: ['Current State Description (section of Problem Statement)'],
  exit_criteria: ['Narrative confirmed by Process Owner and Business Owner; baseline metrics documented with measurement sources'],
  children: [T_CURRENT_STATE_NARRATIVE, T_CURRENT_STATE_METRICS],
}

// ─── SA4: Define Future State ──────────────────────────────────────────

const EG_FUTURE_STATE_VISION: AISANode = {
  id: 'p1-d2-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Writing the Future State Vision',
  description: 'Produce a concise description of how the process should work after successful AI implementation — the desired outcome, not the technical solution.',
  purpose: 'Align all stakeholders on what success looks like in practice before committing to a technical approach.',
  why_it_matters: 'A future state defined in terms of technology ("we will use LLMs") rather than outcomes ("customer queries will be resolved in under 2 minutes without human intervention") leads to solution-led design. Outcome-first future states keep architecture honest.',
  methods: [
    '1. Ask the Business Owner: "Once this project is successful and the system is live, what does a normal working day look like for your team?"',
    '2. Write the future state in terms of observable outcomes, not technology choices.',
    '3. For each pain point, describe the future state explicitly: "Instead of [current pain], [future state outcome]."',
    '4. Define what changes: process steps removed, decisions automated, speed improved, errors eliminated.',
    '5. Confirm the future state does not inadvertently describe the solution (the "how") — focus on the "what" and "why."',
    '6. Share with Business Owner and Sponsor for alignment. Adjust until both confirm it is their shared vision.',
  ],
  tools: ['Document template'],
  outputs: ['Future State Vision (1 page), confirmed by Business Owner and Sponsor'],
  exit_criteria: ['Future state written in outcome terms, confirmed by Business Owner and Executive Sponsor'],
}

const T_FUTURE_STATE_VISION: AISANode = {
  id: 'p1-d2-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Write Future State Vision',
  description: 'Produce a confirmed outcome-focused description of what success looks like after implementation.',
  purpose: 'Align stakeholders on desired outcomes before architecture decisions are made.',
  inputs: ['Current state narrative', 'Pain point list', 'Stakeholder success criteria from D1'],
  methods: ['Outcome-first vision writing', 'Pain-to-outcome mapping', 'Stakeholder confirmation'],
  tools: ['Document template'],
  outputs: ['Future State Vision confirmed by Sponsor and Business Owner'],
  children: [EG_FUTURE_STATE_VISION],
}

const EG_FUTURE_STATE_CONSTRAINTS: AISANode = {
  id: 'p1-d2-sa4-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Future State Constraints',
  description: 'Document the boundaries and constraints within which the future state must be achieved — what the solution cannot do, cannot change, or cannot cost.',
  purpose: 'Establish non-negotiable boundaries before architecture design so that Phase 3 operates within confirmed constraints from the start.',
  why_it_matters: 'Future states that ignore constraints produce architectures that must be fundamentally revised in Phase 3 or after. A budget ceiling, a regulatory restriction, or an integration constraint identified now shapes the entire design before expensive decisions are made.',
  methods: [
    '1. Ask the Business Owner and Sponsor: "What are the things the solution must not do, regardless of technical possibility?"',
    '2. Ask: "Are there any systems the new solution must integrate with, or processes it must not change?"',
    '3. Ask the Compliance team: "What regulatory requirements constrain what the system can do autonomously?"',
    '4. Ask IT: "What are the technical constraints we must design within? On-premise requirement? Specific cloud? Existing vendor contracts?"',
    '5. List all constraints, noting source and whether each is a hard constraint (non-negotiable) or soft constraint (preferred but negotiable).',
    '6. Include constraints in the Problem Statement and carry forward to D8 (Constraints Analysis).',
  ],
  tools: ['Constraints capture template'],
  outputs: ['Future state constraints list with hard vs soft classification and source'],
  exit_criteria: ['All hard constraints identified, sourced, and confirmed by Sponsor and Compliance team'],
}

const T_FUTURE_STATE_CONSTRAINTS: AISANode = {
  id: 'p1-d2-sa4-t2',
  type: 'task',
  level: 4,
  title: 'Identify Future State Constraints',
  description: 'Document the boundaries and non-negotiables the solution must operate within.',
  purpose: 'Prevent Phase 3 architecture from being designed without confirmed constraints.',
  inputs: ['Stakeholder interviews', 'Regulatory assessment preview', 'IT and Compliance input'],
  methods: ['Constraint elicitation', 'Hard vs soft classification', 'Stakeholder confirmation'],
  tools: ['Constraints capture template'],
  outputs: ['Constraints list with classification and source'],
  children: [EG_FUTURE_STATE_CONSTRAINTS],
}

const SA4_FUTURE_STATE: AISANode = {
  id: 'p1-d2-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Define Future State',
  description: 'Articulate the desired outcome state after successful AI implementation, framed in terms of observable business outcomes and bounded by confirmed constraints.',
  purpose: 'Align the full stakeholder set on what success looks like before any technical design begins.',
  why_it_matters: 'The future state is the north star of the entire project. Every architectural decision should be traceable to it. A poorly defined future state produces misaligned architecture that satisfies technical requirements but fails business expectations.',
  inputs: ['Current state narrative', 'Pain point list', 'Stakeholder success criteria', 'Regulatory and IT constraints'],
  questions: ['What does success look like in observable terms?', 'What must the solution not do or change?'],
  methods: ['Outcome-first vision writing', 'Constraint elicitation', 'Stakeholder confirmation'],
  tools: ['Document template', 'Constraints capture template'],
  outputs: ['Future State Vision', 'Constraints list'],
  deliverables: ['Future State Description (section of Problem Statement)'],
  exit_criteria: ['Future state vision confirmed by Sponsor and Business Owner; constraints classified and confirmed'],
  children: [T_FUTURE_STATE_VISION, T_FUTURE_STATE_CONSTRAINTS],
}

// ─── SA5: Define Business Objectives ──────────────────────────────────

const EG_OBJECTIVES_HIERARCHY: AISANode = {
  id: 'p1-d2-sa5-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the Business Objectives Hierarchy',
  description: 'Structure business objectives from strategic to operational level, ensuring each objective is traceable to a stated business need.',
  purpose: 'Produce a structured, approved set of objectives that can be translated into measurable requirements and success criteria.',
  why_it_matters: 'Vague objectives like "improve efficiency" cannot be translated into design requirements or tested at acceptance. A hierarchy of specific, measurable objectives connects the business case to the technical design through traceable logic.',
  methods: [
    '1. Start with the strategic objective: what does this initiative contribute to the organisation\'s strategic goals? (e.g., "Reduce operational cost by 15% in 2025.")',
    '2. Decompose into tactical objectives: what process-level improvements are required to achieve the strategic goal?',
    '3. Decompose into operational objectives: what specific, measurable changes at the task level will achieve the tactical objectives?',
    '4. Apply the SMART test to each operational objective: Specific, Measurable, Achievable, Relevant, Time-bound.',
    '5. Obtain sign-off from the Business Owner on the objectives hierarchy.',
  ],
  tools: ['Objectives hierarchy template'],
  outputs: ['Three-level objectives hierarchy: strategic, tactical, operational — all SMART at the operational level'],
  exit_criteria: ['All operational objectives are SMART; Business Owner has approved the objectives hierarchy'],
}

const T_OBJECTIVES_HIERARCHY: AISANode = {
  id: 'p1-d2-sa5-t1',
  type: 'task',
  level: 4,
  title: 'Build Business Objectives Hierarchy',
  description: 'Produce a three-level objectives hierarchy from strategic to operational, with SMART criteria at the operational level.',
  purpose: 'Connect business strategy to measurable design requirements through traceable objectives.',
  inputs: ['Stakeholder success criteria from D1', 'Strategic goals from Sponsor', 'Quantified impact data from SA2'],
  methods: ['Objectives decomposition', 'SMART criteria application', 'Business Owner sign-off'],
  tools: ['Objectives hierarchy template'],
  outputs: ['Approved three-level objectives hierarchy'],
  children: [EG_OBJECTIVES_HIERARCHY],
}

const EG_OBJECTIVES_TRACEABILITY: AISANode = {
  id: 'p1-d2-sa5-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Establishing Objectives Traceability',
  description: 'Map each objective to its source pain point and forward to its corresponding success metric, creating a traceable line from problem to measurement.',
  purpose: 'Ensure that every objective is rooted in a real pain point and will be measurable at delivery — eliminating objectives that are aspirational but untestable.',
  why_it_matters: 'Objectives that cannot be traced back to a pain point and forward to a metric are orphaned aspirations. Traceability is the mechanism that keeps scope honest and requirements justifiable throughout delivery.',
  methods: [
    '1. Create a traceability matrix: columns for pain point, objective, metric, and measurement method.',
    '2. For each operational objective, identify: which pain point(s) it addresses, which metric will be measured to confirm it is achieved, and how that metric will be collected.',
    '3. Flag objectives with no traceable pain point — these are candidates for removal from scope.',
    '4. Flag objectives with no measurable metric — these need further refinement before being accepted.',
    '5. Review the traceability matrix with the Business Owner.',
  ],
  tools: ['Traceability matrix template'],
  outputs: ['Objectives traceability matrix: pain point → objective → metric'],
  exit_criteria: ['All objectives have a traced pain point and a measurable metric; orphaned objectives flagged for scope discussion'],
}

const T_OBJECTIVES_TRACEABILITY: AISANode = {
  id: 'p1-d2-sa5-t2',
  type: 'task',
  level: 4,
  title: 'Establish Objectives Traceability',
  description: 'Map each objective to its source pain point and its corresponding success metric.',
  purpose: 'Keep scope honest by ensuring every objective is rooted in reality and testable at delivery.',
  inputs: ['Objectives hierarchy', 'Pain point list', 'Baseline metrics from SA3'],
  methods: ['Traceability matrix construction', 'Orphan identification', 'Business Owner review'],
  tools: ['Traceability matrix template'],
  outputs: ['Objectives traceability matrix'],
  children: [EG_OBJECTIVES_TRACEABILITY],
}

const SA5_OBJECTIVES: AISANode = {
  id: 'p1-d2-sa5',
  type: 'sub-activity',
  level: 3,
  title: 'Define Business Objectives',
  description: 'Produce a structured, approved hierarchy of business objectives from strategic to operational level, with traceability to pain points and success metrics.',
  purpose: 'Create a clear, approved set of objectives that can be directly translated into architecture requirements in Phase 3.',
  why_it_matters: 'Without clear objectives, the architecture phase defaults to technical best practice rather than business-appropriate design. Business objectives are the brief that architecture responds to.',
  inputs: ['Pain point list', 'Stakeholder success criteria', 'Quantified impact data', 'Strategic goals from Sponsor'],
  questions: ['What must this initiative achieve to be considered a success?', 'How will we know we achieved it?'],
  methods: ['Objectives decomposition (strategic → tactical → operational)', 'SMART criteria application', 'Traceability matrix construction'],
  tools: ['Objectives hierarchy template', 'Traceability matrix template'],
  outputs: ['Objectives hierarchy', 'Traceability matrix'],
  deliverables: ['Business Objectives (section of Problem Statement)'],
  exit_criteria: ['All operational objectives are SMART; traceability matrix confirmed by Business Owner; no orphaned objectives in scope'],
  children: [T_OBJECTIVES_HIERARCHY, T_OBJECTIVES_TRACEABILITY],
}

// ─── SA6: Write Problem Statement ─────────────────────────────────────

const EG_DRAFT_PROBLEM_STATEMENT: AISANode = {
  id: 'p1-d2-sa6-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Drafting the Problem Statement',
  description: 'Write the formal Problem Statement document, assembling current state, future state, pain points, objectives, and constraints into a single coherent narrative.',
  purpose: 'Produce the core deliverable of Phase 1 Activity D2 — a clear, concise statement of the problem being solved, for whom, and to what standard.',
  why_it_matters: 'The Problem Statement is the most referenced document in the entire project. It is the answer to every scope debate, the test of every proposed feature, and the benchmark for every acceptance decision. Writing it well at this stage saves weeks of misalignment later.',
  methods: [
    '1. Open with a one-paragraph executive summary: "This initiative addresses [problem] for [stakeholder group], which currently costs [impact]. Success means [outcome] by [date]."',
    '2. Section 1 — Current State: paste the confirmed current state narrative with baseline metrics.',
    '3. Section 2 — Pain Points: list the top 5–10 prioritised pain points with their quantified impact.',
    '4. Section 3 — Future State: paste the confirmed future state vision with associated constraints.',
    '5. Section 4 — Business Objectives: include the three-level objectives hierarchy with traceability matrix.',
    '6. Section 5 — Out of Scope: list explicitly what is not being addressed in this initiative.',
    '7. Review: every claim in the document must be traceable to a confirmed stakeholder input or measurement.',
  ],
  tools: ['Problem Statement template', 'All outputs from D2 SA1–SA5'],
  outputs: ['Problem Statement draft ready for stakeholder review'],
  exit_criteria: ['Draft complete with all six sections populated; every claim is traceable to a documented source'],
}

const T_DRAFT_PROBLEM_STATEMENT: AISANode = {
  id: 'p1-d2-sa6-t1',
  type: 'task',
  level: 4,
  title: 'Draft the Problem Statement',
  description: 'Assemble all D2 outputs into a coherent, structured Problem Statement document.',
  purpose: 'Produce the primary Phase 1 deliverable that governs scope throughout the full project.',
  inputs: ['Current state narrative and metrics', 'Prioritised pain point list', 'Future state vision and constraints', 'Objectives hierarchy', 'Traceability matrix'],
  methods: ['Document assembly', 'Executive summary writing', 'Traceability review'],
  tools: ['Problem Statement template'],
  outputs: ['Problem Statement draft'],
  children: [EG_DRAFT_PROBLEM_STATEMENT],
}

const EG_APPROVE_PROBLEM_STATEMENT: AISANode = {
  id: 'p1-d2-sa6-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Obtaining Problem Statement Approval',
  description: 'Conduct a formal review and obtain written approval of the Problem Statement from the Executive Sponsor and Business Owner.',
  purpose: 'Establish the Problem Statement as a formally approved, change-controlled document before Phase 2 begins.',
  why_it_matters: 'An approved Problem Statement is the single most important governance document in the project. Without formal approval, scope debates in later phases have no authoritative reference. With it, scope challenges are resolved against an agreed document — not against the loudest voice in the room.',
  methods: [
    '1. Distribute the draft Problem Statement to the Executive Sponsor, Business Owner, and Process Owner 48 hours before the review session.',
    '2. Facilitate a structured review session: walk through each section, invite comments and corrections.',
    '3. Use a comment log to track changes — do not edit live in the meeting.',
    '4. After incorporating feedback, send a clean version for formal approval.',
    '5. Obtain written confirmation (email sign-off is acceptable) from Executive Sponsor and Business Owner.',
    '6. Version and store as Problem Statement v1.0 in the project repository. Mark as a controlled document.',
    '7. Brief the full project team on the approved Problem Statement before Phase 2 begins.',
  ],
  tools: ['Problem Statement document', 'Project document repository', 'Comment log template'],
  outputs: ['Problem Statement v1.0 — signed off and stored as controlled document'],
  exit_criteria: ['Written approval received from Executive Sponsor and Business Owner; v1.0 stored in project repository; team briefed'],
}

const T_APPROVE_PROBLEM_STATEMENT: AISANode = {
  id: 'p1-d2-sa6-t2',
  type: 'task',
  level: 4,
  title: 'Obtain Problem Statement Approval',
  description: 'Conduct a formal review and secure written approval of the Problem Statement from the Executive Sponsor and Business Owner.',
  purpose: 'Establish the Problem Statement as an authoritative, change-controlled reference for the full project.',
  inputs: ['Problem Statement draft', 'Executive Sponsor and Business Owner contacts', 'Comment log template'],
  methods: ['Structured review session', 'Feedback incorporation', 'Formal sign-off process'],
  tools: ['Problem Statement document', 'Project repository'],
  outputs: ['Problem Statement v1.0 — approved and stored'],
  children: [EG_APPROVE_PROBLEM_STATEMENT],
}

const SA6_PROBLEM_STATEMENT: AISANode = {
  id: 'p1-d2-sa6',
  type: 'sub-activity',
  level: 3,
  title: 'Write Problem Statement',
  description: 'Assemble all discovery outputs into a formally approved Problem Statement — the primary Phase 1 deliverable.',
  purpose: 'Produce a single, authoritative document that defines what the project is solving, for whom, and to what standard of success.',
  why_it_matters: 'The Problem Statement is the governing document for the entire project. Every scope debate, feature decision, and acceptance test is resolved against it. A weak Problem Statement guarantees a misaligned project.',
  inputs: ['All outputs from D2 SA1–SA5', 'Problem Statement template'],
  questions: ['Is every claim in the document traceable?', 'Would an independent reader understand exactly what is being solved and for whom?', 'Is the out-of-scope section clear?'],
  methods: ['Structured document assembly', 'Executive summary writing', 'Formal review and approval process'],
  tools: ['Problem Statement template', 'Project document repository', 'Comment log'],
  outputs: ['Approved Problem Statement v1.0'],
  deliverables: ['Problem Statement v1.0 (Phase 1 Primary Deliverable)'],
  exit_criteria: ['Problem Statement approved in writing by Executive Sponsor and Business Owner; stored as v1.0 controlled document'],
  children: [T_DRAFT_PROBLEM_STATEMENT, T_APPROVE_PROBLEM_STATEMENT],
}

// ═══════════════════════════════════════════════════════════════════════
// D2 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D2: AISANode = {
  id: 'p1-d2',
  type: 'activity',
  level: 2,
  title: 'D2 — Business Problem Definition',
  description: 'Define the business problem being solved with precision: identify and prioritise pain points, quantify impact, establish the current and future state, and produce a formally approved Problem Statement.',
  purpose: 'Produce a clear, written, stakeholder-approved definition of the problem before any solution design begins.',
  why_it_matters: 'AI projects that skip rigorous problem definition build technically impressive systems that solve the wrong problem. The Problem Statement is the foundation of everything that follows — without it, scope debates are irresolvable and architecture decisions are unjustified.',
  principles_applied: ['Business Value First', 'Minimum Viable Complexity'],
  inputs: ['Stakeholder Register from D1', 'Introductory meeting notes', 'Any existing process documentation or performance reports'],
  questions: [
    'What problem are we solving, in specific and measurable terms?',
    'Who is most affected by this problem?',
    'What does the current state cost in time and money?',
    'What does success look like in observable, measurable terms?',
    'What constraints bound the solution?',
  ],
  activities: [
    'Surface and prioritise pain points through structured stakeholder discovery',
    'Quantify the financial and operational cost of current-state problems',
    'Define and confirm the current state with baseline metrics',
    'Define and confirm the future state in outcome terms',
    'Produce a structured, SMART objectives hierarchy with traceability',
    'Write and obtain formal approval of the Problem Statement',
  ],
  methods: ['Structured stakeholder interviews', 'Impact scoring and quantification', 'Outcome-first future state design', 'Problem Statement drafting and formal review'],
  tools: ['Pain point capture template', 'Business impact calculator', 'Objectives hierarchy template', 'Traceability matrix template', 'Problem Statement template'],
  governance_considerations: 'The Problem Statement must explicitly address whether the AI system will process personal data (GDPR applicability) and whether it falls within any EU AI Act risk category. These answers shape Phase 2 governance scope.',
  ai_engineering_considerations: 'At this stage, resist committing to AI as the solution. The Problem Statement should define the problem; Phase 2 and Phase 3 determine whether AI is the appropriate response and what form it should take.',
  outputs: ['Ranked pain point list', 'Quantified impact assessment', 'Current state narrative with baseline metrics', 'Future state vision with constraints', 'Business objectives hierarchy with traceability', 'Approved Problem Statement v1.0'],
  deliverables: ['Problem Statement v1.0 (signed off)'],
  exit_criteria: [
    'Problem Statement v1.0 approved in writing by Executive Sponsor and Business Owner',
    'All priority pain points are quantified',
    'Current state baseline metrics are documented with data sources',
    'Future state is expressed in outcome terms, not solution terms',
    'All objectives are SMART and traceable to pain points and metrics',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'Design Thinking Problem Definition Framework', type: 'framework' },
    { title: 'SMART Objectives Methodology', type: 'framework' },
  ],
  children: [SA1_PAIN_POINTS, SA2_IMPACT, SA3_CURRENT_STATE, SA4_FUTURE_STATE, SA5_OBJECTIVES, SA6_PROBLEM_STATEMENT],
}
