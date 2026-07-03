import type { AISANode } from '@/types/aisa'

function eg(id: string, title: string, description: string, methods: string[], outputs: string[]): AISANode {
  return { id, type: 'execution-guide', level: 5, title, description, purpose: description, methods, outputs, exit_criteria: [`${title} complete and verified`] }
}
function task(id: string, title: string, description: string, inputs: string[], egNode: AISANode): AISANode {
  return { id, type: 'task', level: 4, title, description, purpose: description, inputs, methods: [egNode.title], outputs: egNode.outputs ?? [], children: [egNode] }
}
function sa(id: string, title: string, description: string, why: string, tasks: AISANode[]): AISANode {
  return { id, type: 'sub-activity', level: 3, title, description, purpose: description, why_it_matters: why, inputs: [], outputs: tasks.flatMap(t => t.outputs ?? []), children: tasks }
}

const S1: AISANode = {
  id: 'p9-s1', type: 'activity', level: 2,
  title: 'S1 — Performance Optimisation',
  description: 'Systematically identify and eliminate latency and throughput bottlenecks in the AI system using profiling, benchmarking, and targeted engineering changes.',
  purpose: 'Improve user-facing performance and resource efficiency to reduce cost and increase system capacity without scaling infrastructure.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Performance profiling data', 'SLO baselines', 'Bottleneck analysis from Phase 8', 'Cost metrics'],
  outputs: ['Optimised system components', 'Performance improvement evidence', 'Updated performance baselines'],
  children: [
    sa('p9-s1-sa1', 'Profiling and Bottleneck Identification', 'Profile the critical request path end-to-end to identify the top latency contributors.', 'Without profiling, performance optimisation is guesswork; profiling focuses effort on the changes with highest impact.',
      [
        task('p9-s1-sa1-t1', 'Profile critical request path', 'Run distributed traces on the critical path at representative load; compute time spent per span; rank by contribution to end-to-end latency.', ['Distributed trace data', 'Performance profiling tool'],
          eg('p9-s1-sa1-t1-eg', 'Produce bottleneck ranking', 'Export traces from observability platform; aggregate span durations; compute median and p95 per span; rank by p95 contribution; identify top 3 bottlenecks; document with span name, median latency, and percentage of total request time.', ['Jaeger / Tempo trace viewer', 'Span aggregation script', 'Bottleneck ranking template'], ['Bottleneck ranking report', 'Span latency breakdown'])),
      ]),
    sa('p9-s1-sa2', 'Optimisation Implementation and Validation', 'Implement targeted optimisations for identified bottlenecks and validate improvement with benchmarks.', 'Benchmark-validated optimisation prevents introducing regressions in pursuit of performance gains.',
      [
        task('p9-s1-sa2-t1', 'Implement and benchmark optimisation', 'Apply the highest-priority optimisation (caching, async processing, model quantisation, query optimisation); benchmark before and after; confirm improvement and no regression.', ['Optimisation design', 'Benchmark harness'],
          eg('p9-s1-sa2-t1-eg', 'Document A/B performance comparison', 'Run benchmark on unoptimised version; apply change; re-run benchmark; compute percentage improvement in p50 and p95 latency; confirm no regression in quality metrics; document A/B comparison; merge if positive.', ['Load generator (k6/Locust)', 'Grafana performance dashboard', 'A/B comparison template'], ['Optimisation implementation', 'A/B benchmark results', 'Updated performance baseline'])),
      ]),
  ],
}

const S2: AISANode = {
  id: 'p9-s2', type: 'activity', level: 2,
  title: 'S2 — Cost Optimisation',
  description: 'Reduce AI system operating costs through model selection, caching, batching, prompt compression, and infrastructure right-sizing, while maintaining quality SLOs.',
  purpose: 'Improve the system\'s unit economics to enable sustainable scaling and demonstrate responsible AI investment stewardship.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Monthly cost report', 'Cost breakdown by component', 'Quality SLOs', 'Model pricing matrix'],
  outputs: ['Reduced operating cost', 'Cost optimisation evidence', 'Updated cost baseline'],
  children: [
    sa('p9-s2-sa1', 'Model and Prompt Cost Optimisation', 'Reduce LLM API cost through model routing, prompt compression, and caching.', 'LLM API costs are typically the largest variable cost in AI systems; structured optimisation can reduce them 30–70% without quality loss.',
      [
        task('p9-s2-sa1-t1', 'Implement model routing for cost reduction', 'Route simple queries to cheaper/smaller models; reserve expensive models for complex queries; validate quality maintained.', ['Query complexity classifier', 'Model routing policy', 'Quality evaluation dataset'],
          eg('p9-s2-sa1-t1-eg', 'Measure cost reduction and quality impact', 'Implement query complexity classifier; route low-complexity queries to cheaper model; run quality evaluation on routed set; compute cost reduction per 1000 requests; confirm quality metrics within SLO; document cost saving.', ['Complexity classifier (rule-based or embedding-based)', 'Model router', 'Quality evaluation pipeline'], ['Model routing implementation', 'Cost reduction measurement', 'Quality impact report'])),
        task('p9-s2-sa1-t2', 'Implement prompt compression and caching', 'Compress verbose prompts using summarisation; expand semantic cache to cover more query patterns.', ['Prompt library', 'Cache coverage analysis'],
          eg('p9-s2-sa1-t2-eg', 'Measure token reduction from compression and cache hit rate improvement', 'Apply prompt compression to system prompts; measure average token reduction; expand semantic cache similarity threshold; measure new cache hit rate; compute combined cost reduction.', ['Token counter', 'Semantic cache', 'Cost calculator'], ['Compressed prompt versions', 'Cache hit rate improvement report', 'Cost reduction evidence'])),
      ]),
    sa('p9-s2-sa2', 'Infrastructure Right-Sizing', 'Match compute resources to actual usage patterns; eliminate over-provisioned instances and idle capacity.', 'Infrastructure over-provisioning is a common legacy of conservative initial sizing; right-sizing can reduce infrastructure costs 20–40%.',
      [
        task('p9-s2-sa2-t1', 'Analyse resource utilisation and right-size', 'Review CPU, memory, and GPU utilisation at p90 over 30 days; identify over-provisioned resources; propose right-sized alternatives; implement after change approval.', ['Resource utilisation data', 'Instance type catalog', 'Change approval'],
          eg('p9-s2-sa2-t1-eg', 'Document right-sizing changes and savings', 'Pull 30-day p90 utilisation per resource; identify resources with p90 <50% utilisation; propose down-sizing; compute estimated monthly saving; obtain approval; implement; verify performance SLOs maintained post-resize; document saving realised.', ['Cloud monitoring (CloudWatch / Azure Monitor)', 'Cost calculator', 'Change management workflow'], ['Right-sizing implementation record', 'Cost saving evidence', 'Post-resize SLO confirmation'])),
      ]),
  ],
}

const S3: AISANode = {
  id: 'p9-s3', type: 'activity', level: 2,
  title: 'S3 — Model Optimisation',
  description: 'Improve AI model performance through fine-tuning, quantisation, distillation, retrieval augmentation improvements, and evaluation-driven prompt refinement.',
  purpose: 'Increase model accuracy, reduce hallucination rates, and improve task-specific performance through systematic model and retrieval improvements.',
  principles_applied: ['Evidence-Based Decision Making', 'Technology Serves Architecture', 'Business Value First'],
  inputs: ['Quality evaluation results', 'Training data (if fine-tuning)', 'Retrieval performance metrics', 'Model comparison benchmarks'],
  outputs: ['Improved model or fine-tuned model', 'Model evaluation comparison', 'Updated prompt library'],
  children: [
    sa('p9-s3-sa1', 'Fine-Tuning Evaluation', 'Assess whether fine-tuning is warranted based on quality gap analysis; if so, prepare dataset and run fine-tuning pipeline.', 'Fine-tuning is high-cost and high-risk; systematic evaluation ensures it is the right solution before investing.',
      [
        task('p9-s3-sa1-t1', 'Assess fine-tuning need and feasibility', 'Compare current quality to target; assess whether prompt engineering gap can close it; if fine-tuning needed, assess data availability and cost.', ['Quality gap analysis', 'Training data inventory', 'Fine-tuning cost estimate'],
          eg('p9-s3-sa1-t1-eg', 'Produce fine-tuning decision document', 'Run ablation study: max prompt engineering quality vs current; compute gap; assess training data volume (minimum 500–1000 examples per task); estimate fine-tuning cost; document decision with rationale; obtain sign-off before proceeding.', ['Ablation study methodology', 'Training data assessment', 'Fine-tuning cost model'], ['Fine-tuning decision document', 'Sign-off record'])),
        task('p9-s3-sa1-t2', 'Execute fine-tuning pipeline', 'If approved: curate training dataset, run fine-tuning, evaluate fine-tuned model against base model, promote if superior.', ['Training dataset', 'Fine-tuning platform', 'Evaluation suite'],
          eg('p9-s3-sa1-t2-eg', 'Produce fine-tuned model evaluation report', 'Curate and quality-check training examples; run fine-tuning job; evaluate fine-tuned model on held-out test set; compare to base model across all quality dimensions; if fine-tuned model wins on target metric with no regression elsewhere: promote to production candidate.', ['Fine-tuning API (OpenAI / Vertex / Bedrock)', 'Evaluation suite', 'Held-out test set'], ['Fine-tuned model', 'Evaluation comparison report', 'Promotion decision record'])),
      ]),
    sa('p9-s3-sa2', 'Retrieval Optimisation', 'Improve RAG retrieval quality through chunking strategy refinement, re-ranker integration, and embedding model updates.', 'Retrieval quality is the most impactful lever for RAG system accuracy; poor retrieval cannot be compensated by a better generator.',
      [
        task('p9-s3-sa2-t1', 'Evaluate and improve retrieval pipeline', 'Measure retrieval precision@k and recall@k on evaluation set; identify failure modes; implement chunking or re-ranker improvements; re-evaluate.', ['Retrieval evaluation dataset', 'Precision@k and recall@k metrics'],
          eg('p9-s3-sa2-t1-eg', 'Document retrieval improvement and quality impact', 'Run retrieval evaluation; identify top failure modes (wrong chunk, missing context, wrong document); implement fix (adjust chunk size, add re-ranker, update embedding model); re-evaluate; confirm precision and recall improved; measure downstream quality impact on end-to-end evaluation.', ['RAGAS retrieval metrics', 'Re-ranker (Cohere / BGE)', 'Chunk strategy test harness'], ['Retrieval evaluation report', 'Improvement implementation', 'End-to-end quality impact measurement'])),
      ]),
  ],
}

const S4: AISANode = {
  id: 'p9-s4', type: 'activity', level: 2,
  title: 'S4 — Prompt Optimisation',
  description: 'Continuously improve system prompts, few-shot examples, and chain-of-thought templates based on production failure analysis and evaluation results.',
  purpose: 'Extract maximum performance from the current model through disciplined prompt iteration driven by evidence from production.',
  principles_applied: ['Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Production failure samples', 'Prompt evaluation results', 'Prompt registry', 'Evaluation dataset'],
  outputs: ['Improved prompt versions', 'Prompt evaluation comparison', 'Updated prompt registry'],
  children: [
    sa('p9-s4-sa1', 'Evidence-Driven Prompt Iteration', 'Analyse production failures to identify prompt-level root causes; design and test targeted prompt improvements.', 'Production failures reveal edge cases and domain-specific patterns that pre-deployment test sets miss.',
      [
        task('p9-s4-sa1-t1', 'Analyse failures and iterate prompts', 'Cluster production failures by root cause; for prompt-related failures: draft prompt changes; A/B test on evaluation set; promote if improved.', ['Production failure samples', 'Failure root-cause clusters', 'Evaluation dataset'],
          eg('p9-s4-sa1-t1-eg', 'Document prompt iteration outcomes', 'Select top failure cluster; hypothesise prompt fix; write candidate prompt; A/B evaluate on full evaluation set; compute score delta; if delta positive and no regression: update prompt registry; write iteration log entry with rationale and metrics.', ['Prompt A/B test harness', 'Evaluation pipeline', 'Prompt registry'], ['Candidate prompt evaluation results', 'Promoted prompt version', 'Iteration log'])),
      ]),
  ],
}

const S5: AISANode = {
  id: 'p9-s5', type: 'activity', level: 2,
  title: 'S5 — Workflow Optimisation',
  description: 'Improve AI pipeline and agent workflow efficiency through step reduction, parallelisation, caching of intermediate results, and elimination of redundant operations.',
  purpose: 'Reduce end-to-end latency and per-request cost by making the workflow itself more efficient, independent of individual component optimisations.',
  principles_applied: ['Minimum Viable Complexity', 'Business Value First'],
  inputs: ['Workflow execution traces', 'Step timing analysis', 'Pipeline topology map'],
  outputs: ['Optimised workflow definitions', 'Execution time improvement evidence', 'Updated workflow documentation'],
  children: [
    sa('p9-s5-sa1', 'Workflow Analysis and Restructuring', 'Map workflow execution to identify sequential steps that can be parallelised, redundant calls that can be eliminated, and intermediate results that can be cached.', 'Workflow-level optimisation often achieves larger latency reductions than component-level tuning because it changes the critical path length.',
      [
        task('p9-s5-sa1-t1', 'Analyse workflow critical path and optimise', 'Map workflow DAG; identify critical path; find parallelisation and caching opportunities; implement and benchmark.', ['Workflow DAG', 'Execution trace data', 'Parallelisation feasibility analysis'],
          eg('p9-s5-sa1-t1-eg', 'Measure workflow latency reduction', 'Draw workflow DAG with step timings; compute critical path length; identify 2+ independent steps that can be parallelised; implement parallel execution; benchmark against sequential baseline; document latency reduction.', ['Workflow orchestrator (Temporal / LangGraph)', 'Benchmark harness', 'DAG visualiser'], ['Optimised workflow definition', 'Latency reduction benchmark', 'DAG comparison before/after'])),
      ]),
  ],
}

const S6: AISANode = {
  id: 'p9-s6', type: 'activity', level: 2,
  title: 'S6 — Architecture Review',
  description: 'Conduct a structured review of the AI system architecture against current requirements, usage patterns, and available technology to identify architectural evolution opportunities.',
  purpose: 'Prevent the architecture from becoming a constraint on business value delivery as requirements and technology evolve.',
  principles_applied: ['Technology Serves Architecture', 'Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['Current architecture documents', 'Phase 8 operational data', 'Business requirements evolution', 'Technology landscape update'],
  outputs: ['Architecture review report', 'Architectural debt inventory', 'Evolution roadmap candidates'],
  children: [
    sa('p9-s6-sa1', 'Architectural Fitness Function Review', 'Assess each architectural decision against current fitness criteria: performance, cost, maintainability, extensibility, and compliance.', 'Architecture that made sense at Phase 3 may not serve the system a year later; structured fitness review prevents drift.',
      [
        task('p9-s6-sa1-t1', 'Conduct architecture fitness assessment', 'Review each major architectural decision; rate fitness against current criteria; flag decisions where fitness has declined; assess rework cost vs continued cost of debt.', ['Architecture decision records', 'Current operational metrics', 'Fitness criteria framework'],
          eg('p9-s6-sa1-t1-eg', 'Produce architecture fitness report', 'Walk through architecture decision log with tech lead; for each decision: rate fitness (green/amber/red) against 5 criteria; for red decisions: estimate rework cost and risk of not reworking; produce fitness report with prioritised evolution candidates.', ['Architecture decision register', 'Fitness criteria rubric', 'Rework cost estimation template'], ['Architecture fitness report', 'Red-rated decision list', 'Prioritised evolution candidates'])),
      ]),
    sa('p9-s6-sa2', 'Technology Landscape Assessment', 'Evaluate new models, frameworks, and infrastructure options that could improve fitness on one or more dimensions.', 'The AI technology landscape evolves rapidly; periodic assessment prevents the system from becoming obsolete.',
      [
        task('p9-s6-sa2-t1', 'Assess relevant new technologies', 'Identify candidate new technologies; run structured evaluation against current architecture pain points; produce adoption recommendation.', ['Technology landscape survey', 'Architecture pain points'],
          eg('p9-s6-sa2-t1-eg', 'Produce technology adoption recommendation', 'List top 5 candidate technologies (new models, frameworks, infra); score each against pain-point criteria; run proof-of-concept for top scorer if score threshold met; produce adoption recommendation with migration complexity estimate.', ['Technology evaluation rubric', 'PoC harness', 'Migration complexity matrix'], ['Technology evaluation report', 'PoC results if run', 'Adoption recommendation'])),
      ]),
  ],
}

const S7: AISANode = {
  id: 'p9-s7', type: 'activity', level: 2,
  title: 'S7 — Technical Debt Review',
  description: 'Inventory, quantify, prioritise, and schedule remediation of accumulated technical debt across the AI system codebase, data pipelines, and infrastructure.',
  purpose: 'Prevent technical debt accumulation from increasing the cost and risk of future changes, which compounds as AI systems grow in complexity.',
  principles_applied: ['Minimum Viable Complexity', 'Evidence-Based Decision Making'],
  inputs: ['Code quality metrics', 'Known debt log', 'Phase 5–7 deferred items', 'Engineering velocity data'],
  outputs: ['Technical debt inventory', 'Prioritised remediation backlog', 'Debt remediation schedule'],
  children: [
    sa('p9-s7-sa1', 'Debt Inventory and Prioritisation', 'Enumerate all known technical debt items; quantify each by estimated remediation cost and carrying cost; prioritise.', 'Quantified debt inventory enables data-driven decisions about remediation priority rather than intuition.',
      [
        task('p9-s7-sa1-t1', 'Produce and review debt inventory', 'Aggregate debt items from code review comments, deferred issues, and architecture fitness flags; estimate carrying cost and remediation cost per item.', ['Deferred issue list', 'Code quality reports', 'Architecture fitness report'],
          eg('p9-s7-sa1-t1-eg', 'Prioritise debt backlog for next quarter', 'List all known debt items; estimate carrying cost (ongoing drag on velocity) and remediation effort; compute priority score (carrying cost / remediation effort); sort by score; select top 20% for next-quarter remediation; schedule remainder.', ['Debt inventory spreadsheet', 'Velocity data', 'Priority scoring formula'], ['Debt inventory', 'Prioritised remediation backlog', 'Next-quarter schedule'])),
      ]),
  ],
}

const S8: AISANode = {
  id: 'p9-s8', type: 'activity', level: 2,
  title: 'S8 — Complexity Promotion',
  description: 'Promote the system from Minimum Viable Complexity to higher architectural complexity tiers (e.g., single agent to multi-agent, simple RAG to agentic RAG) when business value justifies the increase.',
  purpose: 'Enable the AI system to tackle more complex business problems by adding architectural capability at the right time, with appropriate governance.',
  principles_applied: ['Minimum Viable Complexity', 'Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Business case for increased complexity', 'Current system capability boundaries', 'Architecture readiness assessment', 'Governance approval'],
  outputs: ['Complexity promotion decision', 'Architecture evolution plan', 'Governance approval record'],
  children: [
    sa('p9-s8-sa1', 'Complexity Promotion Evaluation', 'Assess whether the business case for architectural complexity increase is justified and the organisation is ready for the associated risks.', 'Premature complexity promotion increases cost, risk, and governance burden without proportionate value; evidence-based assessment prevents it.',
      [
        task('p9-s8-sa1-t1', 'Assess and decide complexity promotion', 'Document the business case; assess current system limitations; estimate implementation and governance cost of next complexity tier; obtain architecture and governance approval.', ['Business case document', 'Capability boundary analysis', 'Complexity cost model'],
          eg('p9-s8-sa1-t1-eg', 'Produce complexity promotion decision record', 'Write business case quantifying value unlocked by increased complexity; assess risks (safety, cost, governance burden); estimate migration effort; present to architecture board; record decision with rationale; if approved: initiate new AISA cycle from Phase 3.', ['Business case template', 'Complexity cost model', 'Architecture board agenda'], ['Complexity promotion decision record', 'Board approval', 'New AISA cycle initiation if approved'])),
      ]),
  ],
}

const S9: AISANode = {
  id: 'p9-s9', type: 'activity', level: 2,
  title: 'S9 — Scalability Assessment',
  description: 'Evaluate the system\'s capacity to handle projected growth in users, data volume, and request rates; identify scaling constraints before they become production incidents.',
  purpose: 'Ensure the AI system can grow with business demand without requiring emergency capacity interventions.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['Traffic growth projections', 'Performance test results from Phase 6', 'Current capacity model', 'Scaling roadmap'],
  outputs: ['Scalability assessment report', 'Scaling investment plan', 'Updated capacity model'],
  children: [
    sa('p9-s9-sa1', 'Capacity Modelling and Growth Projection', 'Model current capacity ceiling against projected growth to identify when scaling investments must be made.', 'Proactive capacity planning prevents the scramble of reactive scaling during growth events.',
      [
        task('p9-s9-sa1-t1', 'Update capacity model with current data', 'Refresh the capacity model with current utilisation and performance test results; compute months until capacity ceiling at projected growth rate.', ['Current utilisation data', 'Performance test results', 'Traffic growth projections'],
          eg('p9-s9-sa1-t1-eg', 'Produce capacity runway report', 'Fit growth curve to last 90 days of traffic data; project forward 12 months; identify the date each capacity constraint is hit; compute cost of scaling each constraint; produce capacity runway report with recommended investment timeline.', ['Capacity modelling spreadsheet / tool', 'Traffic data export', 'Cost projection model'], ['Updated capacity model', 'Capacity runway report', 'Scaling investment recommendations'])),
      ]),
    sa('p9-s9-sa2', 'Horizontal Scaling Validation', 'Validate that the system scales horizontally as designed; verify stateless components and correct session/state handling.', 'Horizontal scaling assumptions must be empirically validated; hidden statefulness prevents linear scaling.',
      [
        task('p9-s9-sa2-t1', 'Run horizontal scaling test', 'Scale from 1 to N replicas of each stateless component; measure throughput scaling efficiency; identify any sub-linear scaling components.', ['Scaling test environment', 'Load generator', 'Throughput measurement'],
          eg('p9-s9-sa2-t1-eg', 'Document scaling efficiency per component', 'Run load test at 1× replica count; scale to 2×, 4× replicas; measure throughput at each; compute scaling efficiency (actual throughput gain / expected linear gain); flag any component with efficiency <80%; investigate and fix stateful dependencies.', ['Load generator (k6/Locust)', 'Kubernetes / container orchestration', 'Throughput measurement dashboard'], ['Scaling efficiency report per component', 'Stateful dependency findings', 'Fix recommendations'])),
      ]),
  ],
}

const S10: AISANode = {
  id: 'p9-s10', type: 'activity', level: 2,
  title: 'S10 — Governance Review',
  description: 'Conduct a structured review of the AI governance framework against current system capabilities, regulatory environment, and organisational risk appetite to ensure governance remains fit for purpose.',
  purpose: 'Prevent governance frameworks from becoming stale as the AI system and regulatory environment evolve.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design', 'Evidence-Based Decision Making'],
  inputs: ['Phase 2 governance framework', 'Phase 8 governance monitoring data', 'Regulatory change assessments', 'Incident records'],
  outputs: ['Governance review report', 'Updated governance policies', 'Governance board approval'],
  children: [
    sa('p9-s10-sa1', 'Governance Framework Assessment', 'Assess each governance policy and control against current system behaviour, incident history, and regulatory requirements.', 'Governance frameworks designed for an earlier, simpler version of the system may be inadequate for a more capable current version.',
      [
        task('p9-s10-sa1-t1', 'Conduct governance framework review', 'Review each governance policy; assess whether it is still fit for purpose given system evolution and incident history; propose updates.', ['Governance policy register', 'Incident records', 'Regulatory change assessments'],
          eg('p9-s10-sa1-t1-eg', 'Produce governance review report with recommended updates', 'Walk through each governance policy with DPO and governance lead; for each: assess adequacy against current system; rate as adequate, needs update, or needs replacement; draft updates for inadequate policies; present to governance board; obtain approval; update policy register.', ['Governance policy register', 'Review rubric', 'Governance board agenda'], ['Governance review report', 'Updated policy drafts', 'Board approval record'])),
      ]),
  ],
}

const S11: AISANode = {
  id: 'p9-s11', type: 'activity', level: 2,
  title: 'S11 — Innovation Assessment',
  description: 'Evaluate emerging AI capabilities, research developments, and competitive landscape for opportunities to enhance the AI system\'s value proposition.',
  purpose: 'Ensure the AI system benefits from relevant AI advances without chasing every hype cycle or introducing premature complexity.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['AI research landscape summary', 'Competitive analysis', 'Business requirements evolution', 'Technical feasibility assessments'],
  outputs: ['Innovation assessment report', 'Opportunity shortlist', 'PoC recommendations'],
  children: [
    sa('p9-s11-sa1', 'Emerging Capability Evaluation', 'Monitor and evaluate AI research and product developments for relevance to the current system\'s capability gaps.', 'Structured evaluation prevents both missing genuine opportunities and being distracted by hype.',
      [
        task('p9-s11-sa1-t1', 'Conduct quarterly innovation scan', 'Review AI research publications, model releases, and product announcements from the past quarter; filter for relevance to system capability gaps; score top candidates.', ['AI research feed', 'Capability gap list', 'Evaluation criteria'],
          eg('p9-s11-sa1-t1-eg', 'Produce shortlisted innovation candidates', 'Scan top AI papers (arXiv/Google Scholar), model release notes, and industry analyst reports; filter by relevance to system capability gaps; score top 10 against feasibility and potential impact; shortlist top 3 for PoC consideration; document evaluation rationale.', ['arXiv / Papers With Code', 'Model release trackers', 'Scoring rubric'], ['Innovation scan report', 'Top-3 shortlist with scores', 'Evaluation rationale'])),
        task('p9-s11-sa1-t2', 'Run proof of concept for shortlisted capabilities', 'For each shortlisted capability meeting the score threshold: run a time-boxed PoC to validate feasibility and business value hypothesis.', ['Shortlisted candidates', 'PoC brief', 'PoC budget'],
          eg('p9-s11-sa1-t2-eg', 'Produce PoC results and go/no-go recommendation', 'Run 1–2 week time-boxed PoC; build minimal implementation of the capability; evaluate against success criteria; measure business value signal; produce go/no-go recommendation with evidence; present to product and architecture leads.', ['PoC environment', 'Success criteria template', 'Business value measurement approach'], ['PoC implementation', 'PoC results report', 'Go/no-go recommendation'])),
      ]),
  ],
}

const S12: AISANode = {
  id: 'p9-s12', type: 'activity', level: 2,
  title: 'S12 — Strategic Roadmap Update',
  description: 'Synthesise findings from all Phase 9 activities into an updated strategic roadmap that defines the AI system\'s evolution trajectory for the next 6–12 months.',
  purpose: 'Provide stakeholders with a coherent, evidence-based view of the AI system\'s planned evolution to enable resource planning and governance alignment.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['All S1–S11 activity outputs', 'Business strategy inputs', 'Resource plan', 'Governance approval'],
  outputs: ['Updated strategic roadmap', 'Prioritised feature and improvement backlog', 'Resource plan', 'Stakeholder presentation'],
  children: [
    sa('p9-s12-sa1', 'Roadmap Synthesis', 'Aggregate all optimisation findings, architectural evolution candidates, innovation PoC results, and business inputs into a coherent prioritised roadmap.', 'Without a synthesised roadmap, Phase 9 activities produce isolated recommendations that are never executed coherently.',
      [
        task('p9-s12-sa1-t1', 'Draft and prioritise roadmap', 'List all candidate roadmap items from S1–S11; score by business value and implementation cost; prioritise into now/next/later horizons; validate with product and engineering leads.', ['S1–S11 outputs', 'Business value scoring rubric', 'Resource constraints'],
          eg('p9-s12-sa1-t1-eg', 'Produce horizon-based roadmap draft', 'Collect all candidate items; score on business value (1–5) and implementation cost (1–5); compute priority (value/cost); assign to now (0–3 months), next (3–6 months), later (6–12 months); validate with product lead; map resource requirements; produce roadmap document.', ['Roadmap prioritisation matrix', 'Resource planning tool', 'Product lead review session'], ['Prioritised roadmap draft', 'Resource requirement mapping'])),
      ]),
    sa('p9-s12-sa2', 'Stakeholder Approval and Communication', 'Present the roadmap to governance board and business stakeholders; obtain approval; communicate to all relevant teams.', 'Roadmaps without stakeholder approval lack the authority and resource commitments needed for execution.',
      [
        task('p9-s12-sa2-t1', 'Present and obtain roadmap approval', 'Present roadmap to governance board and business sponsors; incorporate feedback; obtain formal approval; communicate to engineering and operations teams.', ['Roadmap draft', 'Board meeting', 'Communication plan'],
          eg('p9-s12-sa2-t1-eg', 'Archive approved roadmap and communicate', 'Prepare board presentation; present roadmap; capture feedback; revise if required; obtain board approval signature; publish roadmap to all stakeholders via preferred channel; brief engineering and ops teams on next-quarter priorities.', ['Board presentation', 'Approval workflow', 'Communication channel (Confluence/Notion/email)'], ['Approved strategic roadmap', 'Board approval record', 'Team communication evidence'])),
      ]),
  ],
}

export const PHASE_9: AISANode = {
  id: 'phase-9', type: 'phase', level: 1,
  title: 'Phase 9 — Optimise & Scale',
  description: 'Drive continuous improvement across performance, cost, model quality, prompts, workflows, architecture, and governance. Phase 9 closes the AISA loop, translating operational evidence into systematic improvements and updating the strategic roadmap for the next cycle.',
  purpose: 'Compound the value of the AI system over time through evidence-driven optimisation and deliberate architectural evolution, completing the AISA continuous improvement cycle.',
  why_it_matters: 'AI systems that are not actively optimised and evolved will be overtaken by changing business requirements, model advances, and competitive offerings. Phase 9 is the engine of long-term AI value creation.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making', 'Minimum Viable Complexity', 'Technology Serves Architecture', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Phase 8 operational data and reports', 'Business strategy updates', 'AI technology landscape', 'Governance framework', 'Resource plan'],
  outputs: ['Optimised AI system', 'Updated architecture and governance', 'Innovation PoC results', 'Approved strategic roadmap for next cycle'],
  deliverables: ['Performance optimisation evidence', 'Cost reduction report', 'Model evaluation comparison', 'Architecture fitness report', 'Technical debt backlog', 'Innovation assessment', 'Approved 6–12 month roadmap'],
  exit_criteria: ['S1–S12 activities complete', 'Roadmap approved by governance board and business sponsors', 'All optimisations validated with benchmarks', 'Next AISA cycle initiated if complexity promotion approved'],
  children: [S1, S2, S3, S4, S5, S6, S7, S8, S9, S10, S11, S12],
}
