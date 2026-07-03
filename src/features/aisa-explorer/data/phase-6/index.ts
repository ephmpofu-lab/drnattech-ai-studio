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

const V1: AISANode = {
  id: 'p6-v1', type: 'activity', level: 2,
  title: 'V1 — Unit Testing',
  description: 'Verify that every individual function, class, and module behaves correctly in isolation using automated unit tests with mocked dependencies.',
  purpose: 'Establish a fast-feedback test suite that catches regressions at the function level before integration.',
  principles_applied: ['Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Phase 5 implementation code', 'Acceptance criteria per component', 'Test coverage policy'],
  outputs: ['Unit test suite', 'Coverage report', 'Defect log'],
  children: [
    sa('p6-v1-sa1', 'Test Suite Authoring', 'Write comprehensive unit tests for all new and modified code paths.', 'Systematic test authoring ensures edge cases and error paths are covered, not just the happy path.',
      [
        task('p6-v1-sa1-t1', 'Write unit tests per module', 'Author test cases for each function and class covering nominal, boundary, and error-path scenarios.', ['Implementation code', 'Function contracts', 'Boundary-value tables'],
          eg('p6-v1-sa1-t1-eg', 'Achieve target coverage threshold', 'Run test suite with coverage measurement; confirm line and branch coverage meet policy minimums; document any justified exclusions (generated code, dead paths); add tests until threshold met.', ['pytest / Jest / Vitest', 'Coverage tool (pytest-cov / Istanbul)', 'Exclusion justification log'], ['Unit test files', 'Coverage report', 'Exclusion justification log'])),
      ]),
    sa('p6-v1-sa2', 'Test Execution and Triage', 'Execute unit tests in CI and triage all failures to root cause.', 'Untriaged failures erode trust in the test suite and lead to test suppression.',
      [
        task('p6-v1-sa2-t1', 'Run and triage unit test failures', 'Execute full unit test suite; triage each failure as code defect, test defect, or environment issue; fix code defects.', ['CI pipeline', 'Test output'],
          eg('p6-v1-sa2-t1-eg', 'Achieve zero failing unit tests', 'Run CI suite; for each failure: classify defect type; fix code defects; fix or remove invalid tests; confirm zero failures on final run; record defects found.', ['CI test runner', 'Defect tracking system'], ['Passing unit test suite', 'Defect log from unit testing'])),
      ]),
  ],
}

const V2: AISANode = {
  id: 'p6-v2', type: 'activity', level: 2,
  title: 'V2 — Integration Testing',
  description: 'Verify that components work correctly together across service boundaries, databases, message queues, and external APIs.',
  purpose: 'Catch contract mismatches, configuration errors, and interaction bugs that unit tests with mocks cannot surface.',
  principles_applied: ['Evidence-Based Decision Making'],
  inputs: ['Integration test plan', 'Test environment', 'Component interfaces'],
  outputs: ['Integration test suite', 'Integration test results', 'Interface defect log'],
  children: [
    sa('p6-v2-sa1', 'Component Integration Tests', 'Test each pair or group of components that interact across a real boundary.', 'Integration failures between components are the most common source of production bugs that slipped through unit testing.',
      [
        task('p6-v2-sa1-t1', 'Write and run integration tests', 'Author integration tests that exercise real service calls, database writes, and message-bus events between components.', ['Integration test environment', 'Component interface specs'],
          eg('p6-v2-sa1-t1-eg', 'Run integration suite and confirm all interfaces verified', 'Execute tests against the integration environment; confirm each service-to-service call is exercised; verify data flows correctly through queues and databases; document failures with component pair and payload.', ['pytest-integration / Testcontainers / docker-compose test env', 'Message bus inspector'], ['Integration test results', 'Interface verification matrix'])),
      ]),
    sa('p6-v2-sa2', 'API Contract Tests', 'Verify that all APIs conform to their published OpenAPI contracts under real integration conditions.', 'Contract tests prevent API breaking changes from reaching consumers undetected.',
      [
        task('p6-v2-sa2-t1', 'Run contract test suite', 'Execute Schemathesis or Pact against each API endpoint; confirm all defined operations return spec-compliant responses.', ['OpenAPI spec', 'Integration environment'],
          eg('p6-v2-sa2-t1-eg', 'Confirm zero contract violations', 'Run contract test tool; review all violations; fix handler code or spec for any divergence; re-run until zero violations.', ['Schemathesis / Pact / Dredd', 'OpenAPI validator'], ['Contract test results', 'Spec divergence fix log'])),
      ]),
  ],
}

const V3: AISANode = {
  id: 'p6-v3', type: 'activity', level: 2,
  title: 'V3 — End-to-End Testing',
  description: 'Execute full user-journey tests that simulate real usage scenarios from input through AI processing to final output, including UI and API layers.',
  purpose: 'Confirm that the complete AI system delivers intended outcomes for representative user journeys without defects in the integrated stack.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['User journey specifications', 'Staging environment', 'Golden-set test data'],
  outputs: ['E2E test suite', 'E2E test results', 'Journey coverage report'],
  children: [
    sa('p6-v3-sa1', 'Journey Test Design', 'Define and author E2E test scenarios covering primary, alternative, and error journeys.', 'E2E tests written against real user journeys provide the highest-confidence signal that the system works from the user perspective.',
      [
        task('p6-v3-sa1-t1', 'Author E2E test scenarios', 'Write automated E2E tests for each user journey using a browser automation or API scripting tool.', ['User journey specs', 'Staging environment access'],
          eg('p6-v3-sa1-t1-eg', 'Run E2E suite on staging and confirm coverage', 'Execute E2E suite; confirm each journey completes without assertion failure; confirm coverage of all defined journeys; document any staging-environment blockers for resolution.', ['Playwright / Cypress / Selenium', 'Journey coverage matrix'], ['E2E test files', 'Journey coverage report', 'Staging blocker log'])),
      ]),
    sa('p6-v3-sa2', 'Golden-Set Output Validation', 'Run E2E journeys with known inputs and compare AI outputs against pre-approved golden outputs.', 'Golden-set validation detects regressions in model or prompt behaviour that produce silently incorrect outputs.',
      [
        task('p6-v3-sa2-t1', 'Run golden-set comparison', 'Execute E2E tests with golden-set inputs; compare outputs to approved references using exact match or semantic similarity; flag deviations above threshold.', ['Golden-set dataset', 'Output comparison tool'],
          eg('p6-v3-sa2-t1-eg', 'Document golden-set pass rate', 'Run golden-set; compute pass rate; for each failure: inspect output vs reference; classify as regression or intended change; update golden set only after human approval of intended changes.', ['Output diff tool', 'Semantic similarity scorer (ROUGE / BERTScore)', 'Golden-set management process'], ['Golden-set test results', 'Pass rate report', 'Regression investigation log'])),
      ]),
  ],
}

const V4: AISANode = {
  id: 'p6-v4', type: 'activity', level: 2,
  title: 'V4 — Failure Mode Testing',
  description: 'Deliberately inject failures, resource exhaustion, and edge conditions to verify the system degrades gracefully and recovers correctly.',
  purpose: 'Build confidence that resilience patterns implemented in Phase 5 actually protect users during partial system failures.',
  principles_applied: ['Evidence-Based Decision Making', 'Business Value First'],
  inputs: ['Failure mode analysis', 'Resilience implementation', 'Chaos engineering plan'],
  outputs: ['Failure mode test results', 'Recovery behaviour evidence', 'Resilience gap log'],
  children: [
    sa('p6-v4-sa1', 'Dependency Failure Injection', 'Inject latency, errors, and unavailability into each external dependency and verify system behaviour.', 'Only live failure injection reveals whether circuit breakers, retries, and fallbacks behave as designed.',
      [
        task('p6-v4-sa1-t1', 'Inject failures and observe behaviour', 'Use fault-injection proxy to introduce errors on each dependency; verify retries fire, circuit breakers open, fallbacks activate, and user receives coherent error or degraded response.', ['Fault-injection tool', 'Resilience test plan'],
          eg('p6-v4-sa1-t1-eg', 'Document resilience test results per dependency', 'For each dependency: inject 100% error; observe retry count; confirm circuit breaker opens after policy threshold; confirm fallback or graceful error returned; restore dependency; confirm recovery.', ['Toxiproxy / Chaos Toolkit / AWS Fault Injection', 'Monitoring dashboards', 'Resilience test log'], ['Failure injection test results', 'Resilience gap list'])),
      ]),
    sa('p6-v4-sa2', 'Resource Exhaustion Testing', 'Test system behaviour under connection-pool exhaustion, memory pressure, and disk-full conditions.', 'Resource exhaustion is a common root cause of cascading failures; early testing prevents production surprises.',
      [
        task('p6-v4-sa2-t1', 'Simulate resource exhaustion', 'Exhaust connection pools, fill disk, and consume available memory; verify the system queues, sheds load, or degrades gracefully rather than crashing.', ['Resource exhaustion scripts', 'Monitoring'],
          eg('p6-v4-sa2-t1-eg', 'Confirm system behaviour under each resource constraint', 'Execute each exhaustion scenario; record system response; confirm no data loss; confirm metrics trigger appropriate alerts; confirm recovery after resource restored.', ['Resource stress tools (stress-ng, pgbench)', 'Alert verification'], ['Resource exhaustion test results', 'Alert trigger evidence'])),
      ]),
  ],
}

const V5: AISANode = {
  id: 'p6-v5', type: 'activity', level: 2,
  title: 'V5 — AI Evaluation',
  description: 'Systematically evaluate AI output quality across accuracy, relevance, coherence, groundedness, and task-completion rate using automated scorers and human review.',
  purpose: 'Produce evidence that the AI system meets quality thresholds before it is exposed to real users.',
  principles_applied: ['Evidence-Based Decision Making', 'Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Evaluation dataset', 'Quality acceptance criteria', 'Prompt library', 'Golden reference outputs'],
  outputs: ['AI quality scorecard', 'Failure analysis report', 'Human review samples'],
  children: [
    sa('p6-v5-sa1', 'Automated Evaluation', 'Run automated scorers (RAGAS, G-Eval, task-specific metrics) across the full evaluation dataset.', 'Automated evaluation scales to hundreds or thousands of examples, enabling statistically meaningful quality measurement.',
      [
        task('p6-v5-sa1-t1', 'Run evaluation suite', 'Execute automated evaluation pipeline; compute accuracy, groundedness, faithfulness, and task-completion scores; compare to acceptance thresholds.', ['Evaluation dataset', 'Evaluation pipeline'],
          eg('p6-v5-sa1-t1-eg', 'Produce quality scorecard', 'Run RAGAS / G-Eval / custom scorer on full dataset; compute mean and p5 scores per metric; flag any metric below acceptance threshold for investigation; produce scorecard document.', ['RAGAS / G-Eval / DeepEval', 'Evaluation dataset (100+ items)', 'Scorecard template'], ['Quality scorecard', 'Below-threshold metric list'])),
      ]),
    sa('p6-v5-sa2', 'Human Review Sample', 'Conduct structured human review of a statistically sampled set of AI outputs to validate automated scorer accuracy and catch qualitative issues.', 'Human review calibrates automated scorers and catches subjective quality issues that metrics miss.',
      [
        task('p6-v5-sa2-t1', 'Conduct human review session', 'Assemble reviewers; assign samples using randomised blind assignment; score on rubric; compare to automated scores; investigate disagreements.', ['Sampled outputs', 'Review rubric', 'Reviewer panel'],
          eg('p6-v5-sa2-t1-eg', 'Document inter-rater agreement and findings', 'Run review session; compute inter-rater agreement (Kappa); compare human vs automated scorer correlation; document systematic disagreements; update rubric or scorers accordingly.', ['Review platform (Label Studio / spreadsheet)', 'Kappa calculator'], ['Human review results', 'Inter-rater agreement report', 'Scorer calibration update'])),
      ]),
    sa('p6-v5-sa3', 'Failure Analysis', 'Investigate and categorise all outputs below acceptance thresholds to identify root causes and prompt/model fixes.', 'Systematic failure analysis converts evaluation data into actionable improvements rather than just a pass/fail verdict.',
      [
        task('p6-v5-sa3-t1', 'Categorise and investigate failures', 'Cluster failing examples by failure mode; trace each cluster to prompt, retrieval, model, or data root cause; prioritise by frequency and severity.', ['Below-threshold outputs', 'Failure taxonomy'],
          eg('p6-v5-sa3-t1-eg', 'Produce root-cause report and fix backlog', 'Cluster failures; assign root cause per cluster; rank by frequency × severity; for each cluster: propose fix (prompt edit, retrieval tuning, data correction); record in backlog; re-evaluate after fixes.', ['Failure clustering tool (embeddings + k-means / manual)', 'Root-cause analysis template', 'Fix backlog'], ['Failure root-cause report', 'Fix backlog', 'Post-fix evaluation results'])),
      ]),
  ],
}

const V6: AISANode = {
  id: 'p6-v6', type: 'activity', level: 2,
  title: 'V6 — Security Testing',
  description: 'Execute penetration testing, API security testing, authentication bypass attempts, and infrastructure vulnerability scanning against the AI system.',
  purpose: 'Identify and remediate security vulnerabilities before deployment so the system does not expose users or organisational data to attack.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['System architecture', 'Security threat model from Phase 2', 'Penetration test plan', 'DAST tool config'],
  outputs: ['Penetration test report', 'Vulnerability remediation log', 'Security sign-off'],
  children: [
    sa('p6-v6-sa1', 'Penetration Testing', 'Conduct structured penetration testing of all API endpoints, authentication flows, and administrative interfaces.', 'Penetration testing simulates real attacker behaviour and reveals vulnerabilities that automated scanners miss.',
      [
        task('p6-v6-sa1-t1', 'Execute penetration test and remediate findings', 'Run pen test plan; record all findings with CVSS severity; remediate high/critical before sign-off; accept-risk medium/low with approval.', ['Pen test plan', 'Auth credentials for test account'],
          eg('p6-v6-sa1-t1-eg', 'Produce pentest report with remediation evidence', 'Execute pen test; document each finding with evidence; remediate all high/critical; re-test remediations; produce final report with open and closed findings; obtain security lead sign-off.', ['Burp Suite / OWASP ZAP', 'CVSSv3 calculator', 'Pentest report template'], ['Penetration test report', 'Remediation evidence', 'Security sign-off record'])),
      ]),
    sa('p6-v6-sa2', 'Dynamic Application Security Testing', 'Run automated DAST scans against running API endpoints and web interfaces.', 'DAST scans cover breadth of vulnerability classes efficiently, complementing manual pen testing depth.',
      [
        task('p6-v6-sa2-t1', 'Run DAST scan and triage findings', 'Execute DAST tool against staging environment; triage all findings; fix confirmed vulnerabilities.', ['DAST tool config', 'Staging environment'],
          eg('p6-v6-sa2-t1-eg', 'Confirm zero open high/critical DAST findings', 'Run OWASP ZAP / Burp active scan; triage each finding; fix all confirmed high/critical; document false-positive dismissals with reasoning; re-scan to confirm remediation.', ['OWASP ZAP / Burp Suite', 'DAST finding triage template'], ['DAST scan report', 'Finding triage and remediation log'])),
      ]),
  ],
}

const V7: AISANode = {
  id: 'p6-v7', type: 'activity', level: 2,
  title: 'V7 — Prompt Injection Testing',
  description: 'Systematically attempt to manipulate the AI system through crafted inputs designed to override system prompts, exfiltrate data, or cause unintended actions.',
  purpose: 'Validate that guardrails and prompt hardening implemented in Phase 5 resist the OWASP LLM Top 10 injection attack classes.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Prompt injection attack library', 'Guardrail implementation', 'System prompt', 'Tool permission policy'],
  outputs: ['Injection test results', 'Guardrail effectiveness report', 'Unresolved vulnerability log'],
  children: [
    sa('p6-v7-sa1', 'Direct Injection Testing', 'Test inputs that attempt to override or append to the system prompt through the user turn.', 'Direct injection is the most common attack vector against LLM-based systems.',
      [
        task('p6-v7-sa1-t1', 'Execute direct injection test battery', 'Submit all OWASP LLM Top 10 direct injection patterns plus custom variants; record model response and guardrail action per attempt.', ['Injection test corpus', 'System under test'],
          eg('p6-v7-sa1-t1-eg', 'Score injection resistance rate', 'Submit 100+ injection payloads; score as blocked (guardrail), partially blocked, or successful; compute block rate; investigate and fix any successful injections; re-test fixes.', ['Injection test corpus (Garak / custom)', 'Guardrail dashboard', 'Block-rate calculator'], ['Injection test results', 'Block-rate report', 'Fix verification evidence'])),
      ]),
    sa('p6-v7-sa2', 'Indirect Injection Testing', 'Test injection via external data sources (web pages, documents, emails) retrieved and processed by the agent.', 'Indirect injection exploits the agent\'s tool use to deliver malicious instructions through trusted-looking content.',
      [
        task('p6-v7-sa2-t1', 'Execute indirect injection scenarios', 'Create adversarial documents and web pages with injection payloads; have agent retrieve and process them; observe whether injected instructions execute.', ['Adversarial document corpus', 'Agent with retrieval tools'],
          eg('p6-v7-sa2-t1-eg', 'Document indirect injection outcomes', 'Run 20+ indirect injection scenarios; record whether injected instruction executed; for successful attacks: trace bypass mechanism; implement content sanitisation or instruction-context separation fix; re-test.', ['Adversarial content library', 'Agent trace viewer'], ['Indirect injection test results', 'Bypass analysis', 'Remediation evidence'])),
      ]),
  ],
}

const V8: AISANode = {
  id: 'p6-v8', type: 'activity', level: 2,
  title: 'V8 — Bias and Fairness Evaluation',
  description: 'Evaluate AI outputs across demographic groups, sensitive topics, and edge populations to identify differential treatment, stereotype reinforcement, or discriminatory outcomes.',
  purpose: 'Ensure the AI system treats all users equitably and does not amplify or introduce biases that could cause harm.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Bias evaluation dataset', 'Fairness criteria from Phase 2', 'Demographic test probes'],
  outputs: ['Bias evaluation report', 'Differential treatment evidence', 'Remediation actions'],
  children: [
    sa('p6-v8-sa1', 'Demographic Parity Testing', 'Test model outputs for equivalent quality and tone across gender, age, ethnicity, nationality, and religion probes.', 'Systematic demographic parity testing reveals differential treatment invisible in aggregate quality metrics.',
      [
        task('p6-v8-sa1-t1', 'Run demographic probe tests', 'Execute counterfactual probes varying demographic attributes in otherwise identical prompts; compare output quality, length, and sentiment.', ['Counterfactual probe dataset', 'Output scorer'],
          eg('p6-v8-sa1-t1-eg', 'Compute differential treatment metrics', 'Run probes; compute per-group quality and sentiment scores; calculate disparity ratio between highest and lowest groups; flag pairs with disparity above policy threshold; investigate and remediate.', ['Counterfactual probe dataset (WinoBias / custom)', 'Sentiment scorer', 'Disparity calculator'], ['Demographic parity test results', 'Disparity ratio report', 'Remediation log'])),
      ]),
    sa('p6-v8-sa2', 'Stereotype and Harm Probe Testing', 'Test for stereotype reinforcement, harmful generalisations, and refusal asymmetry across sensitive topics.', 'Stereotype testing catches subtler bias patterns that demographic parity tests miss.',
      [
        task('p6-v8-sa2-t1', 'Run stereotype and refusal asymmetry tests', 'Submit stereotype probes and sensitive-topic requests across comparable demographic groups; evaluate for consistent handling.', ['Stereotype probe library', 'Refusal asymmetry test set'],
          eg('p6-v8-sa2-t1-eg', 'Document stereotype and asymmetry findings', 'Run probes; classify outputs as stereotype-reinforcing, neutral, or stereotype-countering; measure refusal rates per demographic group for equivalent requests; document asymmetries; propose fixes.', ['TruthfulQA / BBQ / custom stereotype probes', 'Refusal rate calculator'], ['Stereotype probe results', 'Refusal asymmetry report', 'Fix recommendations'])),
      ]),
  ],
}

const V9: AISANode = {
  id: 'p6-v9', type: 'activity', level: 2,
  title: 'V9 — Performance Testing',
  description: 'Execute load, stress, spike, and soak tests to validate that the AI system meets latency and throughput SLOs under realistic and peak-load conditions.',
  purpose: 'Confirm the system can serve expected user volumes without degrading response quality or exceeding cost budgets.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making'],
  inputs: ['SLO definitions', 'Traffic model', 'Load testing environment', 'Performance baselines'],
  outputs: ['Performance test results', 'Capacity model', 'Bottleneck analysis', 'Scaling recommendation'],
  children: [
    sa('p6-v9-sa1', 'Load Testing', 'Ramp load to expected peak traffic and measure latency, throughput, and error rate at each level.', 'Load testing reveals the system\'s actual capacity ceiling and validates autoscaling behaviour before production.',
      [
        task('p6-v9-sa1-t1', 'Execute load test and analyse results', 'Run load test with ramp-up to peak TPS; record p50/p95/p99 latency and error rate at each load step; compare to SLO thresholds.', ['Traffic model', 'Load testing tool config', 'SLOs'],
          eg('p6-v9-sa1-t1-eg', 'Produce performance test report', 'Execute k6/Locust ramp; capture metrics at each load step; identify the load level where latency SLO is first breached; document bottleneck component from traces; produce performance test report.', ['k6 / Locust / JMeter', 'Grafana performance dashboard', 'Trace viewer'], ['Load test results', 'Performance test report', 'SLO breach threshold'])),
      ]),
    sa('p6-v9-sa2', 'Stress and Soak Testing', 'Push the system beyond peak load to confirm failure mode, then run sustained load to detect memory leaks and resource drift.', 'Stress tests reveal failure mode; soak tests reveal slow degradation invisible in short load tests.',
      [
        task('p6-v9-sa2-t1', 'Execute stress and 2-hour soak tests', 'Run stress test to 2× peak; observe failure mode. Run soak test at 80% peak for 2 hours; monitor memory, connection pools, and error rate for drift.', ['Stress test config', 'Soak test monitoring dashboard'],
          eg('p6-v9-sa2-t1-eg', 'Confirm graceful failure and resource stability', 'Run stress test; confirm system fails gracefully (rejects with 429/503, no data loss); run soak; confirm metrics stable over 2 hours; document any drift observed.', ['Load generator', 'Prometheus resource metrics', 'Connection pool monitor'], ['Stress test failure-mode evidence', 'Soak test stability report'])),
      ]),
  ],
}

const V10: AISANode = {
  id: 'p6-v10', type: 'activity', level: 2,
  title: 'V10 — Compliance Validation',
  description: 'Verify that the AI system meets all applicable regulatory, data protection, and industry-standard compliance requirements identified in Phase 2.',
  purpose: 'Produce documented evidence that the system is compliant before deployment to avoid regulatory penalties and build stakeholder trust.',
  principles_applied: ['Privacy and Ethics by Design', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Compliance requirements register from Phase 2', 'Technical controls implementation', 'Compliance test scripts', 'Legal counsel review'],
  outputs: ['Compliance evidence package', 'Gap analysis', 'Compliance sign-off'],
  children: [
    sa('p6-v10-sa1', 'Data Protection Compliance', 'Verify GDPR/CCPA/PDPA controls: lawful basis, consent management, data subject rights, retention, and cross-border transfer safeguards.', 'Data protection compliance is non-negotiable where personal data is processed; gaps create significant legal liability.',
      [
        task('p6-v10-sa1-t1', 'Execute data protection compliance checklist', 'Step through each GDPR/CCPA article applicable to the system; confirm technical control in place; collect evidence.', ['Compliance requirements register', 'Technical controls list', 'Data flow map'],
          eg('p6-v10-sa1-t1-eg', 'Produce compliance evidence package', 'For each applicable article: identify control; test control (e.g., submit DSR, verify data deleted within SLA); collect screenshots and logs as evidence; record gaps; route gaps to DPO for resolution.', ['GDPR/CCPA checklist', 'DSR test account', 'Evidence repository'], ['Data protection evidence package', 'Compliance gap list', 'DPO review record'])),
      ]),
    sa('p6-v10-sa2', 'AI-Specific Regulatory Compliance', 'Verify compliance with applicable AI regulations (EU AI Act, sector-specific AI guidelines) including transparency, human oversight, and auditability requirements.', 'AI regulation is evolving rapidly; early compliance validation avoids last-minute redesign before launch.',
      [
        task('p6-v10-sa2-t1', 'Execute AI compliance checklist', 'Map system characteristics to applicable AI Act risk tier; verify required controls (transparency, human oversight, logging, conformity assessment) are in place.', ['AI Act risk tier assessment', 'Required controls matrix'],
          eg('p6-v10-sa2-t1-eg', 'Produce AI regulatory compliance evidence', 'Complete risk tier mapping; for each required control: test implementation; collect evidence; document any controls requiring waivers or legal interpretation; obtain compliance lead sign-off.', ['EU AI Act compliance checklist', 'Transparency disclosure template', 'Human oversight test scenario'], ['AI regulatory compliance evidence', 'Control test results', 'Compliance lead sign-off'])),
      ]),
  ],
}

const V11: AISANode = {
  id: 'p6-v11', type: 'activity', level: 2,
  title: 'V11 — User Acceptance Testing',
  description: 'Engage representative end users and business stakeholders in structured testing sessions to validate that the AI system meets real-world needs, is usable, and delivers expected business value.',
  purpose: 'Obtain explicit stakeholder sign-off that the system is fit for purpose before release, catching usability and expectation gaps that technical testing misses.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['UAT test plan', 'Business acceptance criteria', 'UAT environment', 'Representative user panel'],
  outputs: ['UAT results', 'UAT sign-off', 'Outstanding defect log', 'Change request log'],
  children: [
    sa('p6-v11-sa1', 'UAT Session Execution', 'Run structured UAT sessions with business users; record observations; collect ratings and written feedback.', 'Structured UAT sessions generate reproducible evidence of user acceptance rather than informal impressions.',
      [
        task('p6-v11-sa1-t1', 'Execute UAT sessions and record results', 'Facilitate UAT sessions; guide users through test scenarios; record pass/fail per scenario; collect satisfaction ratings and open feedback.', ['UAT test scripts', 'UAT environment', 'Feedback collection tool'],
          eg('p6-v11-sa1-t1-eg', 'Produce UAT results report', 'Run sessions with minimum 5 representative users; record scenario pass rates; calculate net satisfaction score; document all defects and change requests raised; produce UAT results report.', ['UAT script templates', 'Screen recording tool', 'Survey tool'], ['UAT session recordings', 'UAT results report', 'Defect and change request log'])),
      ]),
    sa('p6-v11-sa2', 'UAT Sign-Off', 'Obtain formal written acceptance from business owner and key stakeholders based on UAT results.', 'Formal sign-off creates accountability and a documented decision point that the system met business requirements.',
      [
        task('p6-v11-sa2-t1', 'Obtain business owner sign-off', 'Present UAT results to business owner; resolve any blocking defects; obtain written acceptance against defined acceptance criteria.', ['UAT results report', 'Acceptance criteria'],
          eg('p6-v11-sa2-t1-eg', 'Archive signed acceptance document', 'Present results; confirm all acceptance criteria met or obtain waiver for partial criteria; obtain signature on acceptance document; archive with version of system tested; record any deferred issues agreed with business owner.', ['UAT acceptance document template', 'Electronic signature tool'], ['Signed UAT acceptance document', 'Deferred issue agreement'])),
      ]),
  ],
}

const V12: AISANode = {
  id: 'p6-v12', type: 'activity', level: 2,
  title: 'V12 — Release Approval Gate',
  description: 'Aggregate all validation results, conduct a formal release readiness review, resolve blocking issues, and obtain multi-stakeholder approval to proceed to Phase 7 deployment.',
  purpose: 'Create a single documented decision point where all evidence is reviewed and responsible parties explicitly authorise deployment.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making', 'Business Value First'],
  inputs: ['All Phase 6 test results', 'Outstanding defect list', 'Risk register', 'Stakeholder sign-offs'],
  outputs: ['Release readiness report', 'Release approval record', 'Deployment authorisation'],
  children: [
    sa('p6-v12-sa1', 'Release Readiness Review', 'Convene a review board to assess all validation evidence against exit criteria and decide go/no-go.', 'A structured review board prevents informal or implicit release decisions that lack accountability.',
      [
        task('p6-v12-sa1-t1', 'Conduct release readiness review meeting', 'Present all test results, outstanding defects, and risk register to the review board; classify each open item as blocking or non-blocking; record board decisions.', ['Release readiness report', 'Open defect list', 'Risk register'],
          eg('p6-v12-sa1-t1-eg', 'Produce signed release decision record', 'Facilitate review meeting; board votes on go/no-go per exit criterion; record decisions with rationale; assign owners to all non-blocking open items; produce signed release decision record.', ['Release decision template', 'Review board attendance record', 'Electronic signature'], ['Release decision record', 'Blocking item resolution plan', 'Non-blocking item backlog'])),
      ]),
    sa('p6-v12-sa2', 'Deployment Authorisation', 'Issue formal written deployment authorisation signed by accountable owners from Engineering, Product, Security, and Legal/Compliance.', 'Multi-stakeholder sign-off ensures no single function can authorise deployment unilaterally, maintaining governance.',
      [
        task('p6-v12-sa2-t1', 'Obtain multi-stakeholder deployment authorisation', 'Circulate deployment authorisation document; collect signatures from Engineering Lead, Product Owner, Security Lead, and Compliance Officer.', ['Deployment authorisation template', 'Review board outcomes'],
          eg('p6-v12-sa2-t1-eg', 'Archive deployment authorisation package', 'Route authorisation document to each signatory; resolve any conditions raised; collect all signatures; archive with the release package; confirm authorisation artefact is accessible to Phase 7 deployment team.', ['DocuSign / SharePoint / Git tag', 'Release package archive'], ['Signed deployment authorisation', 'Release package with authorisation attached'])),
      ]),
  ],
}

export const PHASE_6: AISANode = {
  id: 'phase-6', type: 'phase', level: 1,
  title: 'Phase 6 — Validate & Assure',
  description: 'Systematically validate every quality, safety, performance, security, compliance, and business-acceptance dimension of the AI system before authorising deployment. Phase 6 covers unit through end-to-end testing, AI evaluation, security and injection testing, bias assessment, performance benchmarking, compliance verification, and formal UAT.',
  purpose: 'Generate comprehensive evidence that the AI system is correct, safe, compliant, and fit for purpose, and obtain accountable human sign-off authorising deployment.',
  why_it_matters: 'AI systems that skip rigorous validation create safety risks, regulatory liability, and user harm that is far more costly to remediate in production than to prevent here.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design', 'Business Value First'],
  inputs: ['Phase 5 implemented system', 'Acceptance criteria', 'Evaluation datasets', 'Compliance requirements', 'UAT user panel'],
  outputs: ['Full validation evidence package', 'Signed UAT acceptance', 'Deployment authorisation', 'Outstanding issue backlog'],
  deliverables: ['Unit, integration, and E2E test results', 'AI quality scorecard', 'Security pen test report', 'Bias evaluation report', 'Performance test report', 'Compliance evidence package', 'UAT acceptance record', 'Deployment authorisation document'],
  exit_criteria: ['All V1–V12 activities complete', 'Zero open blocking defects', 'Deployment authorisation signed by all required stakeholders', 'Compliance evidence package accepted by DPO and Legal'],
  children: [V1, V2, V3, V4, V5, V6, V7, V8, V9, V10, V11, V12],
}
