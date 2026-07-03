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

const O1: AISANode = {
  id: 'p8-o1', type: 'activity', level: 2,
  title: 'O1 — System Monitoring',
  description: 'Continuously monitor infrastructure health, application performance, and service availability against defined SLOs; escalate anomalies to on-call engineers.',
  purpose: 'Maintain visibility into system health so issues are detected and addressed before users are impacted.',
  principles_applied: ['Evidence-Based Decision Making', 'Business Value First'],
  inputs: ['SLO definitions', 'Monitoring dashboards', 'Alert routing', 'On-call roster'],
  outputs: ['Real-time availability metrics', 'Incident alerts', 'SLO compliance reports'],
  children: [
    sa('p8-o1-sa1', 'Infrastructure and Service Monitoring', 'Monitor CPU, memory, disk, network, pod health, and service availability continuously.', 'Infrastructure monitoring is the foundation of operational awareness; without it, degradation is only discovered through user complaints.',
      [
        task('p8-o1-sa1-t1', 'Review daily health report', 'Review automated daily health summary covering SLO compliance, capacity headroom, and open alerts.', ['Daily health report', 'SLO compliance dashboard'],
          eg('p8-o1-sa1-t1-eg', 'Triage health report and action items', 'Review report; classify each anomaly as informational, warning, or critical; create incident tickets for critical items; update capacity forecast if headroom below 30%; confirm all warning items have owners.', ['Health report dashboard', 'Incident tracking system', 'Capacity model'], ['Triaged health report', 'New incident tickets', 'Capacity alert if required'])),
        task('p8-o1-sa1-t2', 'Respond to SLO breach alerts', 'When an SLO breach alert fires: triage severity, engage on-call, execute runbook, and update incident record.', ['Alert notification', 'Runbook', 'On-call contacts'],
          eg('p8-o1-sa1-t2-eg', 'Document incident response from alert to resolution', 'Acknowledge alert; assess severity; page on-call if P1/P2; execute runbook; update incident record every 30 minutes during active incident; confirm resolution; complete post-incident record.', ['Alerting platform', 'Incident management tool (PagerDuty/OpsGenie)', 'Runbook'], ['Incident record', 'Resolution evidence', 'SLO impact calculation'])),
      ]),
  ],
}

const O2: AISANode = {
  id: 'p8-o2', type: 'activity', level: 2,
  title: 'O2 — AI-Specific Monitoring',
  description: 'Continuously monitor AI-specific metrics: model response quality, token consumption, hallucination rate, tool call success rate, agent completion rate, and output diversity.',
  purpose: 'Detect AI-layer degradation that standard infrastructure monitoring cannot observe, such as silent quality decline or prompt saturation.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated'],
  inputs: ['AI telemetry pipeline', 'Quality baseline metrics', 'LLM observability dashboards'],
  outputs: ['AI quality trend reports', 'Quality anomaly alerts', 'Token cost tracking'],
  children: [
    sa('p8-o2-sa1', 'Model Quality Monitoring', 'Track output quality metrics over time using automated scorers; alert on degradation below threshold.', 'AI output quality can degrade silently due to upstream data changes, model updates, or prompt saturation without affecting infrastructure metrics.',
      [
        task('p8-o2-sa1-t1', 'Review weekly AI quality report', 'Review automated weekly quality summary covering mean quality scores, score trends, and anomaly flags.', ['AI quality dashboard', 'Score trend data'],
          eg('p8-o2-sa1-t1-eg', 'Produce and distribute quality report', 'Pull quality metrics for the week; compare to baseline and prior week; compute trend slope; flag any metric trending downward for 3+ days; distribute to product and engineering; create investigation ticket for any decline above threshold.', ['AI observability platform (LangSmith/Arize/Phoenix)', 'Weekly quality report template'], ['Weekly quality report', 'Investigation tickets for declining metrics'])),
      ]),
    sa('p8-o2-sa2', 'Token Cost Monitoring', 'Track actual LLM token consumption against budget projections; alert on anomalous spikes.', 'LLM costs can spike rapidly due to runaway agents, unexpectedly long prompts, or increased usage; early detection prevents budget overruns.',
      [
        task('p8-o2-sa2-t1', 'Review daily token cost report', 'Review daily token consumption and cost by model, endpoint, and user segment; compare to daily budget.', ['Cost monitoring dashboard', 'Daily budget target'],
          eg('p8-o2-sa2-t1-eg', 'Triage cost anomalies', 'Pull daily cost data; compute spend vs budget; identify top-consuming request types; flag any single endpoint or agent exceeding cost SLO; create ticket to investigate runaway patterns; escalate to finance if monthly projection exceeds budget.', ['Cloud cost dashboard + LLM cost tracker', 'Finance escalation process'], ['Daily cost report', 'Cost anomaly tickets'])),
      ]),
  ],
}

const O3: AISANode = {
  id: 'p8-o3', type: 'activity', level: 2,
  title: 'O3 — Drift Detection',
  description: 'Monitor for data distribution drift, concept drift, and model performance drift that indicate the AI system\'s operating environment has changed significantly from training/evaluation conditions.',
  purpose: 'Detect the early signals of model degradation caused by real-world change before it produces noticeable quality decline for users.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Drift detection pipeline', 'Training data distribution baseline', 'Prediction distribution baseline', 'Quality metric baseline'],
  outputs: ['Drift monitoring reports', 'Drift alerts', 'Retraining/re-evaluation triggers'],
  children: [
    sa('p8-o3-sa1', 'Input Distribution Monitoring', 'Track statistical properties of incoming data against the training/evaluation baseline; alert on significant divergence.', 'Input distribution shift is the leading indicator of performance degradation — catching it early enables proactive intervention.',
      [
        task('p8-o3-sa1-t1', 'Run weekly drift detection analysis', 'Compute distribution statistics on the past week of production inputs; compare to baseline using statistical tests; report drift scores.', ['Drift detection tool', 'Input distribution baseline', 'Production input sample'],
          eg('p8-o3-sa1-t1-eg', 'Produce drift report and trigger retraining if threshold exceeded', 'Run PSI or KS-test on input feature distributions; compute drift score per feature; report top-drifting features; if overall drift score above threshold, open retraining trigger ticket; if score below threshold, archive report.', ['Evidently AI / WhyLogs / custom drift detector', 'Drift score threshold policy', 'Retraining trigger template'], ['Weekly drift report', 'Retraining trigger ticket if applicable'])),
      ]),
    sa('p8-o3-sa2', 'Output Quality Drift', 'Monitor whether model output quality metrics are drifting over time independent of input distribution changes.', 'Output quality drift can occur even when input distribution is stable, due to upstream model API changes or prompt interference.',
      [
        task('p8-o3-sa2-t1', 'Track quality metric trends', 'Plot quality metrics over rolling 30-day window; fit trend line; alert if downward trend slope exceeds threshold.', ['Quality metric time series', 'Trend analysis tool'],
          eg('p8-o3-sa2-t1-eg', 'Generate quality trend alert if drift detected', 'Compute 30-day rolling mean for each quality metric; fit linear trend; if slope negative and exceeds threshold: create drift alert ticket; assign to AI engineering for investigation and re-evaluation.', ['Time series analysis (statsmodels / custom)', 'Quality metric store'], ['Quality trend report', 'Drift alert ticket if triggered'])),
      ]),
  ],
}

const O4: AISANode = {
  id: 'p8-o4', type: 'activity', level: 2,
  title: 'O4 — Cost Monitoring and Optimisation',
  description: 'Track total AI system operating costs across infrastructure, LLM API, data storage, and processing; identify optimisation opportunities; enforce cost budgets.',
  purpose: 'Maintain AI system cost-efficiency and prevent budget overruns through continuous cost visibility and proactive optimisation.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['Cloud billing data', 'LLM cost tracker', 'Budget targets', 'Cost allocation tags'],
  outputs: ['Monthly cost report', 'Optimisation recommendations', 'Budget variance analysis'],
  children: [
    sa('p8-o4-sa1', 'Monthly Cost Review', 'Produce and distribute a monthly cost breakdown by component, service, and business value driver.', 'Monthly cost reviews surface long-term cost trends and justify optimisation investments with data.',
      [
        task('p8-o4-sa1-t1', 'Produce monthly cost breakdown', 'Extract cost data; allocate to components using tags; compute unit economics (cost per AI request, per user); compare to prior month and budget.', ['Cost dashboard', 'Tag allocation taxonomy', 'Prior month baseline'],
          eg('p8-o4-sa1-t1-eg', 'Distribute monthly cost report with recommendations', 'Pull billing data; apply tag allocation; compute component costs and unit economics; compare to budget; identify top 3 cost drivers; propose 2+ optimisation actions; distribute to engineering and product leads; track optimisation actions.', ['Cloud billing API', 'Cost allocation spreadsheet / FinOps tool', 'Report template'], ['Monthly cost report', 'Optimisation action list', 'Budget variance record'])),
      ]),
  ],
}

const O5: AISANode = {
  id: 'p8-o5', type: 'activity', level: 2,
  title: 'O5 — Governance Monitoring',
  description: 'Continuously monitor AI system behaviour against approved governance policies: human oversight SLAs, intervention rates, policy violation frequencies, and accountability trace completeness.',
  purpose: 'Detect governance policy breaches in production before they accumulate into compliance or reputational risk.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design'],
  inputs: ['Governance policy register', 'Human oversight logs', 'Policy violation event stream', 'Accountability trace store'],
  outputs: ['Governance compliance dashboard', 'Policy breach alerts', 'Monthly governance report'],
  children: [
    sa('p8-o5-sa1', 'Human Oversight Monitoring', 'Track human review rates, intervention rates, and escalation counts against policy targets.', 'Human oversight metrics reveal whether oversight controls are functioning or being bypassed in practice.',
      [
        task('p8-o5-sa1-t1', 'Review weekly oversight metrics', 'Pull human review, intervention, and escalation counts; compare to policy targets; flag any dimension below target.', ['Oversight event log', 'Policy target thresholds'],
          eg('p8-o5-sa1-t1-eg', 'Produce oversight compliance report', 'Aggregate oversight events for the week; compute review rate, intervention rate, and escalation rate; compare to policy minimums; create ticket for any below-target metric; distribute to governance lead.', ['Oversight monitoring dashboard', 'Governance report template'], ['Weekly oversight compliance report', 'Below-target metric tickets'])),
      ]),
    sa('p8-o5-sa2', 'Policy Violation Monitoring', 'Track guardrail trigger rates, content policy violations, and data policy breaches; investigate unusual patterns.', 'Unusual guardrail trigger patterns may signal an emerging attack or data quality issue requiring rapid response.',
      [
        task('p8-o5-sa2-t1', 'Review daily policy violation report', 'Pull guardrail trigger counts and categories; compare to baseline; flag anomalous spikes for investigation.', ['Guardrail event log', 'Daily violation baseline'],
          eg('p8-o5-sa2-t1-eg', 'Investigate and document violation spikes', 'Pull daily guardrail event counts by category; compute percentage change from baseline; for any category spiking >50% above baseline: pull sample violation payloads; investigate root cause (attack, data issue, prompt regression); document findings.', ['Guardrail monitoring dashboard', 'Violation payload sampler', 'Investigation log template'], ['Daily violation report', 'Spike investigation records'])),
      ]),
  ],
}

const O6: AISANode = {
  id: 'p8-o6', type: 'activity', level: 2,
  title: 'O6 — Security Monitoring',
  description: 'Monitor for security events: authentication failures, privilege escalation attempts, anomalous API access patterns, data exfiltration indicators, and dependency vulnerability disclosures.',
  purpose: 'Detect and respond to security incidents before they result in data breach or system compromise.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['SIEM / security monitoring platform', 'Authentication logs', 'API access logs', 'Vulnerability feed'],
  outputs: ['Security event alerts', 'Security incident records', 'Vulnerability patch tickets'],
  children: [
    sa('p8-o6-sa1', 'Security Event Monitoring', 'Continuously monitor authentication, access, and API logs for indicators of compromise.', 'Continuous security monitoring reduces the attacker dwell time from breach to detection.',
      [
        task('p8-o6-sa1-t1', 'Triage security alerts', 'Review security alerts from SIEM; classify as true positive, false positive, or needs investigation; escalate true positives to security incident response.', ['SIEM alerts', 'Security playbooks', 'Incident response plan'],
          eg('p8-o6-sa1-t1-eg', 'Document alert triage and escalation decisions', 'Review daily security alert queue; classify each alert using playbook; for true positives: open security incident ticket and engage incident response; for false positives: document suppression rationale; track mean time to classify.', ['SIEM platform (Splunk/Sentinel/Datadog Security)', 'Security playbooks', 'Incident management tool'], ['Alert triage log', 'Security incident tickets', 'Mean time to classify metric'])),
      ]),
    sa('p8-o6-sa2', 'Dependency Vulnerability Management', 'Monitor CVE disclosures for all AI system dependencies; assess and patch within policy SLAs.', 'AI systems with many dependencies (model libraries, inference frameworks, data tools) have large attack surfaces requiring active patch management.',
      [
        task('p8-o6-sa2-t1', 'Process weekly vulnerability scan results', 'Review automated dependency scan results; triage new CVEs by CVSS score; assign patch tickets per policy SLAs.', ['Dependency scan results', 'Patch SLA policy'],
          eg('p8-o6-sa2-t1-eg', 'Assign and track patch tickets', 'Pull scan results; for each new CVE: look up CVSS score; assign patch ticket with SLA (critical: 7 days, high: 30 days, medium: 90 days); track through to resolution; update SBOM after patching.', ['Snyk / OWASP Dependency-Check', 'Patch SLA policy', 'SBOM update process'], ['Weekly vulnerability triage log', 'Patch tickets with SLA deadlines', 'Updated SBOM after patches'])),
      ]),
  ],
}

const O7: AISANode = {
  id: 'p8-o7', type: 'activity', level: 2,
  title: 'O7 — Incident Management',
  description: 'Detect, triage, investigate, resolve, and learn from all operational incidents affecting the AI system, following a structured incident management process with defined severity levels and response SLAs.',
  purpose: 'Minimise the impact of production incidents through rapid, coordinated response and prevent recurrence through systematic learning.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['Incident alert', 'Incident severity matrix', 'Runbooks', 'On-call roster', 'Communication templates'],
  outputs: ['Incident records', 'Post-incident review reports', 'Corrective action tickets'],
  children: [
    sa('p8-o7-sa1', 'Incident Response', 'Execute the incident response lifecycle from detection through resolution.', 'A structured incident response process minimises decision paralysis and reduces resolution time under pressure.',
      [
        task('p8-o7-sa1-t1', 'Manage incident to resolution', 'On alert: acknowledge, classify severity, engage on-call, execute runbook, provide stakeholder updates at defined intervals, confirm resolution, close incident record.', ['Incident alert', 'Severity matrix', 'Runbook', 'Stakeholder list'],
          eg('p8-o7-sa1-t1-eg', 'Complete incident record with timeline', 'Open incident ticket immediately on detection; classify severity within 5 minutes; for P1: page on-call and notify stakeholders within 15 minutes; execute runbook; update status page; confirm resolution; capture timeline (detection, classification, engagement, resolution); close incident with root cause noted.', ['PagerDuty / OpsGenie', 'Status page (Statuspage.io)', 'Incident timeline template'], ['Complete incident record', 'Stakeholder notification log', 'Status page updates'])),
      ]),
    sa('p8-o7-sa2', 'Post-Incident Review', 'Conduct a blameless post-incident review (PIR) for all P1/P2 incidents; produce corrective actions.', 'Blameless PIRs improve system reliability over time by converting failures into learning, not blame.',
      [
        task('p8-o7-sa2-t1', 'Conduct post-incident review', 'Assemble incident participants; walk through timeline; identify contributing factors; agree corrective actions with owners and dates.', ['Incident record', 'PIR template', 'Participants'],
          eg('p8-o7-sa2-t1-eg', 'Produce and distribute PIR report', 'Facilitate blameless PIR within 5 business days of incident; document: timeline, impact, root causes, contributing factors, what went well, corrective actions with owners and due dates; distribute to engineering and stakeholders; track corrective actions to closure.', ['PIR template', 'Incident timeline', 'Action tracking system'], ['PIR report', 'Corrective action tickets with owners and due dates'])),
      ]),
  ],
}

const O8: AISANode = {
  id: 'p8-o8', type: 'activity', level: 2,
  title: 'O8 — Continuous Compliance',
  description: 'Continuously verify that the AI system remains compliant with regulatory requirements, data protection obligations, and internal policies as the system and regulations evolve.',
  purpose: 'Prevent compliance drift between point-in-time audits by embedding compliance checks into ongoing operations.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Compliance control register', 'Regulatory update feed', 'Automated compliance checks', 'Policy change notifications'],
  outputs: ['Continuous compliance dashboard', 'Compliance check results', 'Regulatory change impact assessments'],
  children: [
    sa('p8-o8-sa1', 'Automated Compliance Checks', 'Run automated compliance control tests on a scheduled cadence; alert on failures.', 'Automated checks detect configuration drift from compliant state before manual audits catch it.',
      [
        task('p8-o8-sa1-t1', 'Review weekly automated compliance results', 'Review results of automated compliance test suite; triage failures; escalate to DPO or Legal for non-technical failures.', ['Automated compliance test results', 'Compliance control register'],
          eg('p8-o8-sa1-t1-eg', 'Document compliance failures and remediation', 'Pull automated test results; classify each failure as technical (engineering fix) or process (DPO/Legal involvement); create remediation tickets; track to closure within SLA; update compliance dashboard.', ['AWS Config / Azure Policy / custom compliance scripts', 'Compliance dashboard', 'Remediation tracking'], ['Compliance check results', 'Remediation tickets', 'Updated compliance dashboard'])),
      ]),
    sa('p8-o8-sa2', 'Regulatory Change Tracking', 'Monitor for regulatory changes (GDPR updates, new AI Act guidance, sector regulations) and assess impact on the AI system.', 'AI regulation is evolving rapidly; proactive regulatory tracking prevents compliance gaps from new requirements.',
      [
        task('p8-o8-sa2-t1', 'Assess impact of regulatory changes', 'When a regulatory change notification arrives: assess applicability to the AI system; if applicable, produce impact assessment and remediation plan.', ['Regulatory update', 'System compliance profile'],
          eg('p8-o8-sa2-t1-eg', 'Produce and approve regulatory impact assessment', 'Review regulatory change; map to current system controls; identify gaps; estimate remediation effort; draft impact assessment; route to DPO and Legal for approval; create engineering tickets for any control gaps.', ['Legal regulatory feed', 'Impact assessment template', 'DPO/Legal review workflow'], ['Regulatory impact assessment', 'Control gap tickets', 'DPO/Legal approval record'])),
      ]),
  ],
}

const O9: AISANode = {
  id: 'p8-o9', type: 'activity', level: 2,
  title: 'O9 — Audit Support',
  description: 'Provide complete, accurate, and timely audit evidence in response to internal audits, external regulatory audits, and customer due-diligence requests.',
  purpose: 'Demonstrate to auditors and regulators that the AI system operates as claimed, with complete and reliable audit trails.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Audit request', 'Audit evidence store', 'Accountability logs', 'Compliance evidence package'],
  outputs: ['Audit evidence response', 'Audit findings', 'Remediation commitments'],
  children: [
    sa('p8-o9-sa1', 'Audit Evidence Collection', 'Retrieve, organise, and quality-check audit evidence in response to each audit request.', 'Well-organised evidence packages reduce auditor effort and demonstrate operational maturity.',
      [
        task('p8-o9-sa1-t1', 'Respond to audit evidence request', 'Receive audit request; map each evidence item to the audit evidence store; retrieve and quality-check; assemble response package; obtain internal approval; submit to auditor.', ['Audit request', 'Evidence store', 'Internal approval workflow'],
          eg('p8-o9-sa1-t1-eg', 'Submit complete and reviewed audit package', 'Map each audit question to evidence item; retrieve from store; verify completeness and accuracy; redact sensitive data per policy; obtain DPO/Legal approval; submit to auditor within agreed SLA; track auditor queries and respond within 48 hours.', ['Evidence management system', 'Redaction tool', 'DPO/Legal review workflow'], ['Submitted audit evidence package', 'Auditor query response log'])),
      ]),
    sa('p8-o9-sa2', 'Audit Finding Remediation', 'Respond to audit findings with root cause analysis and remediation plans; track through to closure.', 'Prompt, structured remediation of audit findings demonstrates operational accountability and prevents repeat findings.',
      [
        task('p8-o9-sa2-t1', 'Manage audit finding remediation', 'For each audit finding: root cause analysis, remediation plan with owner and date, progress tracking, closure evidence.', ['Audit findings report', 'Remediation tracking system'],
          eg('p8-o9-sa2-t1-eg', 'Close audit findings within agreed timelines', 'Assign each finding to an owner; produce root cause and remediation plan within 10 business days; track progress; collect closure evidence; submit to auditor for sign-off; confirm closure.', ['Finding remediation template', 'Auditor sign-off workflow'], ['Finding remediation records', 'Auditor closure confirmations'])),
      ]),
  ],
}

const O10: AISANode = {
  id: 'p8-o10', type: 'activity', level: 2,
  title: 'O10 — Knowledge Management',
  description: 'Maintain, update, and distribute operational knowledge: runbooks, architecture documentation, known-issue logs, and lessons-learned records as the system evolves.',
  purpose: 'Prevent knowledge decay as team members change and the system evolves, ensuring operational continuity and consistent incident response.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First'],
  inputs: ['Existing runbooks and docs', 'Incident records', 'PIR reports', 'System change log'],
  outputs: ['Updated runbooks and documentation', 'Known-issue log', 'Onboarding guide'],
  children: [
    sa('p8-o10-sa1', 'Runbook Maintenance', 'Review and update runbooks whenever a system change, incident, or PIR reveals a gap or inaccuracy.', 'Outdated runbooks are as dangerous as no runbooks; they create false confidence during incidents.',
      [
        task('p8-o10-sa1-t1', 'Update runbooks after each incident or system change', 'After each P1/P2 incident or significant system change: review relevant runbooks for accuracy; update and version; notify on-call team.', ['Incident record or change notification', 'Runbook library'],
          eg('p8-o10-sa1-t1-eg', 'Version and distribute updated runbook', 'Identify runbooks affected by the incident or change; update step-by-step procedures; increment version; submit to tech lead review; merge after approval; notify on-call team of update via Slack/email.', ['Runbook repository (Confluence / Git)', 'Review workflow', 'Notification template'], ['Updated and versioned runbooks', 'Notification distribution record'])),
      ]),
    sa('p8-o10-sa2', 'Lessons Learned Repository', 'Maintain a searchable repository of PIR findings, near-misses, and operational learnings indexed by failure category.', 'A searchable lessons-learned repository prevents recurring incidents by enabling engineers to search for prior art before investigating.',
      [
        task('p8-o10-sa2-t1', 'File PIR learnings in repository', 'After each PIR: extract key learnings; file in repository with tags for failure category, affected component, and resolution approach.', ['PIR report', 'Lessons-learned repository'],
          eg('p8-o10-sa2-t1-eg', 'Confirm searchable filing of learnings', 'Extract 3–5 key learnings from PIR; write concise learning entries with context; tag by component and failure category; file in repository; confirm searchable by relevant keywords; link from incident record.', ['Confluence / Notion / internal wiki', 'Tagging taxonomy'], ['Filed lessons-learned entries', 'Repository link from incident record'])),
      ]),
  ],
}

const O11: AISANode = {
  id: 'p8-o11', type: 'activity', level: 2,
  title: 'O11 — Operational Reporting',
  description: 'Produce and distribute regular operational, quality, cost, and governance reports to stakeholders, enabling data-driven decisions about the AI system.',
  purpose: 'Keep stakeholders informed with accurate, timely reports that enable evidence-based investment and governance decisions.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated', 'Business Value First'],
  inputs: ['Metrics from O1–O10', 'Stakeholder reporting requirements', 'Report distribution list'],
  outputs: ['Monthly operational report', 'Quarterly governance report', 'Executive summary'],
  children: [
    sa('p8-o11-sa1', 'Monthly Operational Report', 'Produce and distribute a monthly operational report covering availability, quality, cost, incidents, and compliance status.', 'Regular operational reporting maintains stakeholder confidence and surfaces the data needed for optimisation investment decisions.',
      [
        task('p8-o11-sa1-t1', 'Produce and distribute monthly report', 'Aggregate metrics from all monitoring streams; produce report against standard template; review with ops lead; distribute to stakeholders.', ['Metrics aggregation', 'Report template', 'Distribution list'],
          eg('p8-o11-sa1-t1-eg', 'Distribute approved monthly report', 'Pull all metrics; populate template sections: availability SLO, quality scores, cost vs budget, incidents summary, compliance status, open risks; review with ops lead; obtain approval; distribute by the 5th of the following month; archive.', ['Metrics dashboards', 'Monthly report template', 'Distribution workflow'], ['Monthly operational report', 'Distribution confirmation', 'Report archive entry'])),
      ]),
    sa('p8-o11-sa2', 'Quarterly Governance Report', 'Produce a quarterly report for the AI governance board covering policy compliance, risk status, ethics metrics, and strategic recommendations.', 'Quarterly governance reporting provides the board with the evidence needed to exercise meaningful oversight of the AI system.',
      [
        task('p8-o11-sa2-t1', 'Produce and present quarterly governance report', 'Aggregate governance metrics; draft report; present to governance board; record board decisions and actions.', ['Governance metrics', 'Board meeting schedule', 'Report template'],
          eg('p8-o11-sa2-t1-eg', 'File board-approved governance report', 'Draft report covering: policy compliance rate, human oversight metrics, bias monitoring results, regulatory change status, open governance risks, and recommendations; present at board meeting; capture board decisions; file approved report; action all board directives.', ['Governance dashboard', 'Board presentation template', 'Board decision log'], ['Quarterly governance report', 'Board decision record', 'Action items from board'])),
      ]),
  ],
}

export const PHASE_8: AISANode = {
  id: 'phase-8', type: 'phase', level: 1,
  title: 'Phase 8 — Operate, Observe & Govern',
  description: 'Maintain continuous operational visibility, AI-specific monitoring, drift detection, cost control, governance enforcement, security vigilance, and incident management for the live AI system. Phase 8 is the ongoing operational heartbeat of the AISA lifecycle.',
  purpose: 'Ensure the AI system continues to deliver value safely, compliantly, and cost-effectively in production over its operational lifetime.',
  why_it_matters: 'AI systems degrade silently — model drift, data shift, regulatory changes, and security threats do not announce themselves. Continuous observation and governance are the only defence.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design', 'Business Value First'],
  inputs: ['Running production AI system', 'Monitoring and observability stack', 'Compliance controls', 'Governance policies', 'On-call rotation'],
  outputs: ['Operational metrics and reports', 'Incident records and PIRs', 'Compliance evidence', 'Governance board reports', 'Updated knowledge base'],
  deliverables: ['SLO compliance reports', 'AI quality trend reports', 'Drift detection reports', 'Monthly cost reports', 'Governance compliance dashboard', 'Incident records and PIR reports', 'Audit evidence packages', 'Monthly and quarterly stakeholder reports'],
  exit_criteria: ['All O1–O11 processes established and running', 'First monthly operational report distributed', 'First quarterly governance report approved by board', 'Incident management process proven through at least one real incident PIR'],
  children: [O1, O2, O3, O4, O5, O6, O7, O8, O9, O10, O11],
}
