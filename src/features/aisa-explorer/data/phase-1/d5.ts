import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D5 — PAIN POINT ANALYSIS
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Identify Bottlenecks ─────────────────────────────────────────

const EG_BOTTLENECK_DETECTION: AISANode = {
  id: 'p1-d5-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Detecting Process Bottlenecks',
  description: 'Identify the specific steps in the process where work queues build, throughput drops, or capacity is consistently exhausted.',
  purpose: 'Locate the constraint points that limit the system\'s overall throughput — these are the highest-value targets for AI intervention.',
  why_it_matters: 'The Theory of Constraints tells us that the throughput of any system is determined by its slowest resource. AI applied to non-bottleneck activities improves those activities but does not improve overall throughput. AI applied to the bottleneck improves the whole system. Bottleneck identification is the discipline that ensures AI investment is directed correctly.',
  methods: [
    '1. Ask the Process Owner: "Where does work queue up in this process? Where do things slow down or stop waiting for someone or something?"',
    '2. Look for activities where: (a) work arrives faster than it can be processed; (b) practitioners consistently work overtime to clear the queue; (c) downstream activities wait idle because the bottleneck has not produced its output.',
    '3. Request queue depth data if available: how many items are in the backlog at this activity, and how does backlog size trend over time?',
    '4. Calculate the theoretical capacity of each potential bottleneck: (process time per item) × (capacity per day) = daily throughput capacity. Compare to actual daily demand.',
    '5. Identify whether the bottleneck is resource-constrained (not enough people or compute), quality-constrained (rework loops creating re-entry), or knowledge-constrained (the bottleneck is decision-making that requires specialist expertise).',
    '6. Rank bottlenecks by throughput impact: which has the largest gap between demand and capacity?',
  ],
  tools: ['Bottleneck analysis template', 'Queue depth data (from process logs or estimation)', 'Theory of Constraints reference'],
  outputs: ['Ranked bottleneck list with capacity gap analysis and bottleneck type classification'],
  exit_criteria: ['All bottlenecks identified; capacity gap calculated for each; type classified (resource, quality, knowledge); ranked by throughput impact'],
}

const T_BOTTLENECK_DETECTION: AISANode = {
  id: 'p1-d5-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Detect Process Bottlenecks',
  description: 'Identify where work queues build, throughput drops, or capacity is exhausted, and rank by throughput impact.',
  purpose: 'Locate the constraint points that determine overall process throughput so AI investment is directed there first.',
  inputs: ['AS-IS Process Map from D4', 'Queue depth and backlog data', 'Process Owner knowledge', 'Bottleneck analysis template'],
  methods: ['Queue depth analysis', 'Capacity gap calculation', 'Bottleneck type classification', 'Throughput impact ranking'],
  tools: ['Bottleneck analysis template'],
  outputs: ['Ranked bottleneck list with capacity gap and type classification'],
  children: [EG_BOTTLENECK_DETECTION],
}

const EG_BOTTLENECK_ROOT_CAUSE: AISANode = {
  id: 'p1-d5-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Root Cause Analysis of Bottlenecks',
  description: 'Apply root cause analysis to each identified bottleneck to determine its underlying cause before selecting an AI intervention approach.',
  purpose: 'Prevent applying AI to the symptom (slow throughput) when the root cause is something AI cannot address (wrong tool, missing skill, poor data quality).',
  why_it_matters: 'AI cannot fix a bottleneck caused by organisational structure, missing data, or a dysfunctional approval chain. Root cause analysis before AI design prevents building technically correct solutions that fail to move the bottleneck because they do not address what causes it.',
  methods: [
    '1. For each bottleneck, apply 5-Whys analysis: ask "why is there a queue here?" then "why does that cause the queue?" repeat until you reach a root cause.',
    '2. Categorise the root cause: (a) Capacity — not enough people or compute; (b) Process design — unnecessary steps or rework loops; (c) Data — input quality issues causing rework or decisions to stall; (d) Technology — tools too slow or not fit for purpose; (e) Governance — approval requirements creating waiting time; (f) Skill — specialist knowledge required for which there is too little capacity.',
    '3. For each root cause category, assess AI addressability: Capacity and Data root causes are highly AI-addressable; Governance and Skill root causes require organisational change alongside AI.',
    '4. Document: root cause, category, AI addressability, and any non-AI changes required to truly resolve the bottleneck.',
  ],
  tools: ['5-Whys template', 'Root cause categorisation framework'],
  outputs: ['Root cause analysis per bottleneck with AI addressability assessment and required non-AI changes'],
  exit_criteria: ['Root cause identified for each bottleneck; AI addressability assessed; non-AI organisational changes identified where required'],
}

const T_BOTTLENECK_ROOT_CAUSE: AISANode = {
  id: 'p1-d5-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Root Cause Analysis of Bottlenecks',
  description: 'Apply 5-Whys analysis to determine what actually causes each bottleneck before selecting an AI intervention.',
  purpose: 'Ensure AI is applied to bottlenecks it can actually address, not to symptoms of organisational or governance problems.',
  inputs: ['Ranked bottleneck list', 'Process Owner and practitioner knowledge', '5-Whys template'],
  methods: ['5-Whys analysis', 'Root cause categorisation', 'AI addressability assessment'],
  tools: ['5-Whys template', 'Root cause categorisation framework'],
  outputs: ['Root cause analysis per bottleneck with AI addressability and required non-AI changes'],
  children: [EG_BOTTLENECK_ROOT_CAUSE],
}

const SA1_BOTTLENECKS: AISANode = {
  id: 'p1-d5-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Bottlenecks',
  description: 'Locate and characterise all process bottlenecks through capacity gap analysis and 5-Whys root cause analysis, ranked by throughput impact and assessed for AI addressability.',
  purpose: 'Ensure AI investment is directed at the constraint points that determine overall process throughput.',
  why_it_matters: 'Optimising non-bottleneck activities is waste. The highest-leverage AI interventions are at bottlenecks — and bottlenecks are frequently not where intuition suggests. Systematic identification ensures the right problems are targeted.',
  inputs: ['AS-IS Process Map from D4', 'Queue depth and throughput data', 'Process Owner and practitioner input'],
  questions: ['Where does work queue up or slow down?', 'What is the capacity gap at each bottleneck?', 'What causes each bottleneck?', 'Can AI address the root cause?'],
  methods: ['Queue depth and capacity analysis', 'Theory of Constraints bottleneck identification', '5-Whys root cause analysis', 'AI addressability assessment'],
  tools: ['Bottleneck analysis template', '5-Whys template'],
  outputs: ['Ranked bottleneck list with capacity gap, root cause, and AI addressability'],
  deliverables: ['Bottleneck Analysis (input to Pain Point Matrix)'],
  exit_criteria: ['All bottlenecks identified with capacity gap; root cause analysis completed; AI addressability confirmed; Process Owner validated'],
  children: [T_BOTTLENECK_DETECTION, T_BOTTLENECK_ROOT_CAUSE],
}

// ─── SA2: Identify Failure Points ─────────────────────────────────────

const EG_FAILURE_MODE_ANALYSIS: AISANode = {
  id: 'p1-d5-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Failure Mode Analysis for Process Activities',
  description: 'Apply a lightweight FMEA-style analysis to identify how each critical process activity can fail, the impact when it does, and the current detection and mitigation.',
  purpose: 'Identify the failure modes that AI system design must address, building resilience by design rather than discovering failures in production.',
  why_it_matters: 'AI systems inherit process failure modes unless those failure modes are explicitly understood and designed against. A system designed with FMEA input handles failures gracefully; one designed without it discovers them expensively in production.',
  methods: [
    '1. Take the activity inventory from D4 SA3. For each high-automation-potential activity, complete a failure mode analysis row.',
    '2. For each activity, identify: potential failure modes (how can this go wrong?), causes (what triggers this failure?), effects (what is the downstream impact?), current controls (how is this failure detected or prevented today?), severity (1–3), occurrence (1–3), detection difficulty (1–3).',
    '3. Calculate Risk Priority Number (RPN) = severity × occurrence × detection. Higher RPN = greater design priority.',
    '4. For AI-automated activities: additionally consider AI-specific failure modes — model drift, distribution shift, adversarial inputs, hallucination (for generative AI), API failure, and latency violation.',
    '5. For high-RPN items, note what the AI system must do when this failure mode occurs: detect and self-correct, escalate to human, halt and alert, or log and continue.',
  ],
  tools: ['FMEA worksheet template', 'Activity inventory from D4'],
  outputs: ['Process FMEA with RPN scores and AI-specific failure modes for high-automation activities; required AI system responses for high-RPN items'],
  exit_criteria: ['FMEA completed for all high-automation-potential activities; AI-specific failure modes added; high-RPN items have defined system response'],
}

const T_FAILURE_MODE_ANALYSIS: AISANode = {
  id: 'p1-d5-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Failure Mode Analysis',
  description: 'Apply FMEA to identify how process activities can fail and what the AI system must do when they do.',
  purpose: 'Build resilience by design by identifying failure modes before AI architecture decisions are finalised.',
  inputs: ['Activity inventory from D4', 'Process Owner and practitioner input on common failures', 'FMEA worksheet template'],
  methods: ['FMEA analysis (severity × occurrence × detection = RPN)', 'AI-specific failure mode extension', 'System response definition for high-RPN items'],
  tools: ['FMEA worksheet template'],
  outputs: ['Process FMEA with RPN scores and AI system response definitions'],
  children: [EG_FAILURE_MODE_ANALYSIS],
}

const SA2_FAILURE_POINTS: AISANode = {
  id: 'p1-d5-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Failure Points',
  description: 'Apply failure mode analysis to critical process activities to identify how they fail, quantify risk priority, and define AI system responses to each failure mode.',
  purpose: 'Ensure AI system design explicitly addresses process failure modes by design, rather than discovering them as production incidents.',
  why_it_matters: 'AI systems that are not designed with process failure modes in mind fail unsafely — either propagating errors downstream, producing incorrect outputs without signalling uncertainty, or halting operations without escalation. Failure point analysis makes safety-by-design possible.',
  inputs: ['Activity inventory from D4', 'Exception catalogue from D4', 'Process Owner knowledge of common failure modes'],
  questions: ['How does each critical activity fail?', 'What is the downstream impact of each failure?', 'What AI-specific failure modes does automation introduce?', 'What should the AI system do when each failure mode occurs?'],
  methods: ['FMEA analysis', 'AI-specific failure mode extension', 'RPN scoring', 'AI system response definition'],
  tools: ['FMEA worksheet template'],
  governance_considerations: 'For EU AI Act High Risk systems, FMEA outputs must be incorporated into the Art. 9 risk management system. AI-specific failure modes with high RPN become monitoring and logging requirements in Phase 2.',
  outputs: ['Process FMEA with RPN scores and AI system response design for high-risk failure modes'],
  deliverables: ['Process FMEA (input to Pain Point Matrix and Phase 2 risk assessment)'],
  exit_criteria: ['FMEA completed for all high-automation activities; AI-specific failure modes identified; system responses defined for all high-RPN items'],
  children: [T_FAILURE_MODE_ANALYSIS],
}

// ─── SA3: Identify Manual Activities ──────────────────────────────────

const EG_MANUAL_ACTIVITY_SCAN: AISANode = {
  id: 'p1-d5-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Scanning for Manual and Shadow Activities',
  description: 'Identify all manual steps in the process, including shadow activities that happen outside the formal system and are not captured in the BPMN.',
  purpose: 'Surface the full population of manual work — including hidden, unofficial activities — to ensure AI design addresses the complete picture.',
  why_it_matters: 'Shadow activities — the spreadsheets, email threads, WhatsApp groups, and paper forms used to compensate for system gaps — are the most underestimated source of process waste. AI systems designed without discovering them leave the most significant manual effort untouched.',
  methods: [
    '1. Review the activity inventory from D4. Identify all activities where the tool column shows: "Email", "Excel/Spreadsheet", "Manual entry", "Phone call", or "Paper".',
    '2. Ask practitioners: "Is there anything you do to manage this process that the system doesn\'t capture? Spreadsheets? WhatsApp groups? Personal tracking sheets?"',
    '3. For each manual or shadow activity identified, document: what it is, who does it, why it exists (system gap, workaround, or preference), how long it takes, and how often.',
    '4. Calculate the total manual effort in hours per week across all manual and shadow activities.',
    '5. Classify each: (a) Redundant — duplicates what the system already captures (elimination candidate); (b) Compensatory — fills a system gap (integration design candidate); (c) Genuinely manual — human judgment required (augmentation candidate).',
  ],
  tools: ['Manual activity inventory template', 'Activity inventory from D4'],
  outputs: ['Manual and shadow activity inventory with classification and total effort estimate'],
  exit_criteria: ['All manual and shadow activities identified; total effort calculated; classification assigned to each; Process Owner confirmed'],
}

const T_MANUAL_ACTIVITY_SCAN: AISANode = {
  id: 'p1-d5-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Scan for Manual and Shadow Activities',
  description: 'Identify all manual steps and hidden shadow activities, calculate total manual effort, and classify each for AI intervention.',
  purpose: 'Surface the complete population of manual work so AI design addresses the full opportunity.',
  inputs: ['Activity inventory from D4', 'Practitioner knowledge of shadow activities', 'Manual activity inventory template'],
  methods: ['System tool review', 'Shadow activity elicitation', 'Effort calculation', 'Classification'],
  tools: ['Manual activity inventory template'],
  outputs: ['Manual and shadow activity inventory with total effort estimate'],
  children: [EG_MANUAL_ACTIVITY_SCAN],
}

const SA3_MANUAL_ACTIVITIES: AISANode = {
  id: 'p1-d5-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Manual Activities',
  description: 'Systematically identify all manual activities and shadow workarounds in the process, calculate their total effort, and classify each for AI automation, augmentation, or elimination.',
  purpose: 'Ensure the full population of manual work — including hidden compensatory activities — is visible and considered in AI design.',
  why_it_matters: 'Shadow activities are process debt made visible. They exist because the formal system does not serve the real process. AI design that discovers and addresses them delivers compound value: it eliminates waste while revealing the real-world process that the formal system has never captured.',
  inputs: ['Activity inventory from D4', 'Process Owner and practitioner knowledge', 'Tool and system inventory'],
  questions: ['What manual steps exist in the process?', 'What are people doing outside the formal system to make the process work?', 'How much total effort do these manual activities consume?'],
  methods: ['Manual activity identification from activity inventory', 'Shadow activity elicitation', 'Effort calculation', 'Classification (redundant, compensatory, genuinely manual)'],
  tools: ['Manual activity inventory template'],
  outputs: ['Manual and shadow activity inventory with effort totals and classification'],
  deliverables: ['Manual Activity Inventory (input to Pain Point Matrix)'],
  exit_criteria: ['All manual and shadow activities identified with total effort; classification assigned; Process Owner confirmed completeness'],
  children: [T_MANUAL_ACTIVITY_SCAN],
}

// ─── SA4: Identify Delays ──────────────────────────────────────────────

const EG_DELAY_MAP: AISANode = {
  id: 'p1-d5-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Process Delays and Wait Times',
  description: 'Identify and quantify every point in the process where work waits — for a person, a system, an approval, or a batch cycle — and calculate the total accumulated wait time.',
  purpose: 'Produce a delay map that reveals where time is lost to waiting rather than working, identifying the highest-value targets for AI-driven latency reduction.',
  why_it_matters: 'In most business processes, value-adding time is a small fraction of total elapsed time. The majority is wait time. AI systems that eliminate waiting — through prediction, pre-staging, automation of approval, or batch-to-real-time conversion — often deliver more elapsed-time improvement than optimising the work activities themselves.',
  methods: [
    '1. Review the process map and identify all points where work waits rather than moves: inbox queues, approval queues, batch processing windows, system latency, and calendar-constrained steps (e.g., "runs weekly").',
    '2. For each delay point, document: the cause of the wait, average wait duration, variance (some days 10 minutes, some days 2 hours), and whether the wait is controllable (can be reduced by process or technology change) or inherent (regulatory, calendar, or partner-dependent).',
    '3. Calculate: total accumulated wait time per process instance (sum of all wait durations in the flow).',
    '4. Compare value-adding activity time (from activity inventory) to total wait time. The ratio reveals the process improvement headroom.',
    '5. Identify which delay points are addressable by AI: real-time processing instead of batch, automated approvals instead of queued human review, predictive pre-staging that eliminates wait at the start of a step.',
  ],
  tools: ['Delay map template', 'Process map and handoff map from D4'],
  outputs: ['Delay map with accumulated wait time per process instance; AI-addressable delay targets identified'],
  exit_criteria: ['All delay points identified with durations; total accumulated wait time calculated; AI-addressable targets identified; Process Owner confirmed'],
}

const T_DELAY_MAP: AISANode = {
  id: 'p1-d5-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Map Process Delays',
  description: 'Identify all wait points in the process, calculate accumulated wait time per process instance, and identify AI-addressable delay targets.',
  purpose: 'Reveal where time is lost to waiting and where AI can deliver the most elapsed-time improvement.',
  inputs: ['Process map from D4', 'Handoff map from D4', 'Process Owner knowledge of wait times', 'Delay map template'],
  methods: ['Wait point identification', 'Duration and variance documentation', 'Accumulated wait time calculation', 'AI-addressability assessment'],
  tools: ['Delay map template'],
  outputs: ['Delay map with accumulated wait time and AI-addressable targets'],
  children: [EG_DELAY_MAP],
}

const SA4_DELAYS: AISANode = {
  id: 'p1-d5-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Delays',
  description: 'Map every wait point in the process, calculate total accumulated wait time per process instance, and identify AI-addressable delay reduction targets.',
  purpose: 'Reveal the true composition of process elapsed time to direct AI investment toward latency reduction where it will have the greatest impact.',
  why_it_matters: 'Most process improvement initiatives optimise activity performance while leaving wait times unchanged. AI-enabled latency reduction — through real-time processing, automated approvals, and predictive pre-staging — is often the fastest path to observable elapsed-time improvement that users and customers actually notice.',
  inputs: ['Process map and handoff map from D4', 'Activity time estimates from D4', 'Process Owner knowledge of wait times and batch cycles'],
  questions: ['Where does work wait instead of move?', 'How much total time per process cycle is wait time vs. activity time?', 'Which wait points can AI eliminate or reduce?'],
  methods: ['Wait point identification', 'Duration quantification', 'Total elapsed time composition analysis', 'AI-addressability assessment'],
  tools: ['Delay map template'],
  outputs: ['Delay map with accumulated wait time and AI-addressable targets'],
  deliverables: ['Delay Map (input to Pain Point Matrix)'],
  exit_criteria: ['All delay points documented with durations; total wait time calculated; AI-addressable targets identified; Process Owner validated'],
  children: [T_DELAY_MAP],
}

// ─── SA5: Prioritise Opportunities ────────────────────────────────────

const EG_PRIORITY_MATRIX: AISANode = {
  id: 'p1-d5-sa5-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the Pain Point Priority Matrix',
  description: 'Synthesise all pain point findings — bottlenecks, failure points, manual activities, and delays — into a single prioritisation matrix that ranks intervention opportunities by value and feasibility.',
  purpose: 'Produce the Pain Point Matrix deliverable: a single, ranked view of all AI intervention opportunities that the Business Owner and Sponsor can use to scope the initiative.',
  why_it_matters: 'Without a synthesised priority matrix, the AI initiative risks being scoped by political priority rather than value. The matrix replaces debate with evidence — making the case for the highest-value interventions in objective, comparable terms.',
  methods: [
    '1. Extract all pain point intervention opportunities from SA1–SA4: each bottleneck, each high-RPN failure mode, each high-effort manual activity, and each high-wait delay point.',
    '2. For each opportunity, score on two axes: (a) Value Score (1–5): combines impact on throughput, cost, error, or elapsed time; (b) Feasibility Score (1–5): combines data availability, AI addressability, and organisational readiness.',
    '3. Plot each opportunity on a 2×2 value/feasibility matrix: upper-right quadrant (high value, high feasibility) = Quick Wins and strategic priorities; upper-left (high value, low feasibility) = Strategic Investments requiring foundational work; lower-right (low value, high feasibility) = Opportunistic improvements; lower-left (low value, low feasibility) = Defer or eliminate.',
    '4. Rank within the upper-right quadrant by combined score.',
    '5. Present the matrix to the Business Owner and Sponsor. Obtain agreement on which opportunities will be in scope for the AI initiative.',
    '6. Document the agreed scope as the "intervention target list" — this is the input to Phase 2 governance and Phase 3 architecture scoping.',
  ],
  tools: ['Pain Point Matrix template (value/feasibility 2×2)'],
  outputs: ['Pain Point Matrix with all opportunities plotted and ranked; agreed intervention target list'],
  exit_criteria: ['Matrix populated with all opportunities; Business Owner and Sponsor have reviewed and agreed the intervention target list'],
}

const T_PRIORITY_MATRIX: AISANode = {
  id: 'p1-d5-sa5-t1',
  type: 'task',
  level: 4,
  title: 'Build Pain Point Priority Matrix',
  description: 'Score and plot all intervention opportunities on a value/feasibility matrix and obtain stakeholder agreement on the intervention target list.',
  purpose: 'Replace political scope decisions with evidence-based prioritisation.',
  inputs: ['All SA1–SA4 pain point findings', 'Business Owner and Sponsor input', 'Pain Point Matrix template'],
  methods: ['Value and feasibility scoring', '2×2 matrix plotting', 'Quadrant analysis', 'Scope agreement session'],
  tools: ['Pain Point Matrix template'],
  outputs: ['Pain Point Matrix; agreed intervention target list'],
  children: [EG_PRIORITY_MATRIX],
}

const EG_QUICK_WINS: AISANode = {
  id: 'p1-d5-sa5-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying Quick Win Opportunities',
  description: 'From the Pain Point Matrix upper-right quadrant, identify 2–3 quick win opportunities that can be delivered within 3 months to demonstrate value early in the programme.',
  purpose: 'Sustain stakeholder confidence in the AI initiative by delivering visible, fast value while the larger strategic work proceeds.',
  why_it_matters: 'Long AI projects without early wins lose sponsor and stakeholder confidence. Quick wins serve multiple functions: they prove the approach works, generate momentum, provide a production learning environment for the team, and create political capital for the harder strategic work to follow.',
  methods: [
    '1. Review the upper-right quadrant of the Pain Point Matrix for opportunities that: (a) are self-contained (do not depend on Phase 3 strategic architecture decisions); (b) have available training data or rule-based logic that can be configured quickly; (c) can be deployed without major system integration or organisational change.',
    '2. Estimate delivery effort for each candidate. Quick win threshold: deliverable within 2–3 months with a small team.',
    '3. Select 2–3 candidates that collectively span different process areas (avoiding all quick wins in one corner of the business).',
    '4. Define for each: the specific pain point addressed, the proposed AI intervention, the expected measurable outcome, and the delivery timeline.',
    '5. Present the quick win plan to the Business Owner for approval. Commit to delivery milestones.',
  ],
  tools: ['Pain Point Matrix', 'Quick win selection template'],
  outputs: ['Quick win initiative list: 2–3 initiatives with defined scope, expected outcome, and timeline'],
  exit_criteria: ['2–3 quick wins identified and approved by Business Owner; delivery commitments made'],
}

const T_QUICK_WINS: AISANode = {
  id: 'p1-d5-sa5-t2',
  type: 'task',
  level: 4,
  title: 'Identify Quick Win Opportunities',
  description: 'Select 2–3 fast-deliverable, high-visibility interventions from the Pain Point Matrix to build momentum and prove early value.',
  purpose: 'Sustain stakeholder confidence by committing to fast, visible value delivery while strategic work proceeds.',
  inputs: ['Pain Point Matrix upper-right quadrant', 'Business Owner priorities', 'Quick win selection template'],
  methods: ['Self-containment and data availability assessment', 'Effort estimation', 'Diverse selection across process areas', 'Business Owner approval'],
  tools: ['Quick win selection template'],
  outputs: ['Quick win initiative list with scope, expected outcome, and timeline'],
  children: [EG_QUICK_WINS],
}

const SA5_PRIORITISE: AISANode = {
  id: 'p1-d5-sa5',
  type: 'sub-activity',
  level: 3,
  title: 'Prioritise Opportunities',
  description: 'Synthesise all pain point findings into a Pain Point Priority Matrix and use it to produce an agreed intervention target list and a quick win programme.',
  purpose: 'Translate the full body of discovery work into a clear, ranked, stakeholder-agreed set of AI intervention priorities.',
  why_it_matters: 'Prioritisation is where discovery becomes strategy. The Pain Point Matrix is the instrument that converts 10 weeks of discovery into the design brief for Phase 3 architecture and the commitment to Phase 2 governance. It is the deliverable that makes discovery investable.',
  inputs: ['All D5 SA1–SA4 pain point findings', 'Business Case context from D3', 'Business Owner and Sponsor input'],
  questions: ['Which interventions deliver the most value?', 'Which are most feasible given current data and organisational readiness?', 'Which 2–3 can we deliver quickly to build momentum?'],
  methods: ['Value and feasibility scoring', '2×2 matrix construction', 'Scope agreement facilitation', 'Quick win identification'],
  tools: ['Pain Point Matrix template', 'Quick win selection template'],
  outputs: ['Pain Point Priority Matrix', 'Agreed intervention target list', 'Quick win initiative list'],
  deliverables: ['Pain Point Matrix (Phase 1 Deliverable)'],
  exit_criteria: ['Pain Point Matrix completed with all opportunities plotted; intervention target list agreed by Business Owner and Sponsor; quick wins approved with delivery commitments'],
  children: [T_PRIORITY_MATRIX, T_QUICK_WINS],
}

// ═══════════════════════════════════════════════════════════════════════
// D5 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D5: AISANode = {
  id: 'p1-d5',
  type: 'activity',
  level: 2,
  title: 'D5 — Pain Point Analysis',
  description: 'Conduct a systematic, evidence-based analysis of process pain points — bottlenecks, failure modes, manual activity, and delays — and synthesise findings into a Pain Point Priority Matrix that guides AI design decisions throughout Phases 2–4.',
  purpose: 'Produce a rigorous, prioritised inventory of where the process is broken and where AI intervention will deliver the most value — so that Phase 3 architecture is directed by evidence, not assumption.',
  why_it_matters: 'Pain Point Analysis is the bridge between process knowledge and AI design. Without it, architecture is a technically correct solution to a loosely defined problem. With it, every design decision in Phase 3 can be traced to a specific, quantified process failure — making both the architecture and the business case defensible.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making'],
  inputs: [
    'AS-IS Process Map and all process artefacts from D4',
    'Business Value Assessment from D3',
    'Stakeholder Register from D1',
    'Problem Statement from D2',
  ],
  questions: [
    'Where do throughput bottlenecks occur, and what causes them?',
    'How do critical process activities fail, and what is the downstream impact?',
    'What is the total manual effort consumed by manual and shadow activities?',
    'Where does time accumulate in waits rather than value-adding work?',
    'Which pain points should be in scope for this AI initiative?',
  ],
  activities: [
    'Detect and analyse bottlenecks using capacity gap analysis and Theory of Constraints',
    'Apply FMEA-style failure mode analysis to critical activities',
    'Identify and inventory all manual and shadow activities',
    'Map all process delays and calculate accumulated wait time per instance',
    'Build the Pain Point Priority Matrix and agree the intervention target list',
    'Identify 2–3 quick win opportunities for early value delivery',
  ],
  methods: ['Theory of Constraints bottleneck analysis', '5-Whys root cause analysis', 'FMEA failure mode analysis', 'Manual and shadow activity scanning', 'Delay mapping', 'Value/feasibility 2×2 prioritisation matrix'],
  tools: ['Bottleneck analysis template', '5-Whys template', 'FMEA worksheet', 'Manual activity inventory', 'Delay map template', 'Pain Point Matrix template'],
  governance_considerations: 'FMEA outputs for AI-automated activities become mandatory inputs to the EU AI Act Art. 9 risk management system for High Risk systems. The Pain Point Matrix also informs the governance scope definition in Phase 2.',
  ai_engineering_considerations: 'Pain point analysis reveals the training data requirements for each AI intervention. Bottlenecks often persist not because they cannot be automated but because the input data is insufficiently structured. Discovery should probe data quality at each pain point in parallel — this is the bridge to D6 (Data Landscape Assessment).',
  outputs: ['Bottleneck analysis with root causes and AI addressability', 'Process FMEA with RPN scores', 'Manual and shadow activity inventory', 'Delay map with accumulated wait time', 'Pain Point Priority Matrix', 'Agreed intervention target list', 'Quick win initiative list'],
  deliverables: ['Pain Point Matrix (Phase 1 Deliverable)', 'Quick Win Initiative List'],
  exit_criteria: [
    'Pain Point Matrix completed and agreed by Business Owner and Sponsor',
    'Intervention target list approved as AI initiative scope',
    'Quick win opportunities identified and approved with delivery commitments',
    'FMEA outputs available for Phase 2 governance risk assessment',
    'Bottleneck root causes identified and AI addressability confirmed',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'The Goal — Eliyahu M. Goldratt (Theory of Constraints)', type: 'book', author: 'Goldratt, E.M.', year: 1984 },
    { title: 'Failure Mode and Effects Analysis (FMEA) — IEC 60812', type: 'standard' },
    { title: 'Lean Thinking — Womack & Jones', type: 'book', author: 'Womack, J. & Jones, D.', year: 1996 },
  ],
  children: [SA1_BOTTLENECKS, SA2_FAILURE_POINTS, SA3_MANUAL_ACTIVITIES, SA4_DELAYS, SA5_PRIORITISE],
}
