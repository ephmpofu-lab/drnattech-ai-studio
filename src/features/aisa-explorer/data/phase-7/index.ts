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

const Dp1: AISANode = {
  id: 'p7-dp1', type: 'activity', level: 2,
  title: 'Dp1 — Release Planning',
  description: 'Define the release scope, deployment strategy, schedule, stakeholder communications plan, and rollback decision criteria for the production deployment.',
  purpose: 'Ensure all parties have a shared, documented understanding of what is being deployed, when, how, and what constitutes success or failure.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First'],
  inputs: ['Deployment authorisation', 'Phase 6 release package', 'Traffic model', 'On-call roster'],
  outputs: ['Release plan document', 'Stakeholder communication plan', 'Go/no-go decision matrix'],
  children: [
    sa('p7-dp1-sa1', 'Release Scope and Schedule', 'Document the exact artefacts being released, target environments, deployment window, and timeline.', 'A precise release scope prevents misunderstandings about what is included and excludes last-minute scope creep.',
      [
        task('p7-dp1-sa1-t1', 'Draft and approve release plan', 'Write release plan covering scope, schedule, responsible parties, deployment steps, and success criteria; obtain approval from Engineering Lead and Product Owner.', ['Release package manifest', 'Deployment authorisation', 'Environment readiness report'],
          eg('p7-dp1-sa1-t1-eg', 'Circulate and sign off release plan', 'Draft release plan; review with deployment team; incorporate feedback; obtain sign-off from Engineering Lead and Product Owner; distribute to all stakeholders 48 hours before deployment window.', ['Release plan template', 'Sign-off workflow'], ['Approved release plan', 'Stakeholder distribution record'])),
      ]),
    sa('p7-dp1-sa2', 'Rollback Decision Criteria', 'Define quantitative thresholds that automatically trigger rollback consideration and the decision authority for each.', 'Pre-agreed rollback criteria remove ambiguity during a live incident when cognitive load is high.',
      [
        task('p7-dp1-sa2-t1', 'Define and document rollback thresholds', 'Specify metric thresholds (error rate, latency p99, guardrail trigger rate) that trigger rollback review; assign decision authority.', ['SLO definitions', 'Monitoring dashboards'],
          eg('p7-dp1-sa2-t1-eg', 'Validate threshold accessibility in monitoring', 'Document each threshold as a named alert rule; confirm alert exists and fires correctly in staging; assign named decision authority per threshold; include in release plan appendix.', ['Alert rule definitions', 'Staging alert test'], ['Rollback decision matrix', 'Alert rule confirmation evidence'])),
      ]),
  ],
}

const Dp2: AISANode = {
  id: 'p7-dp2', type: 'activity', level: 2,
  title: 'Dp2 — Environment Promotion',
  description: 'Promote the validated release artefacts through the environment pipeline (dev → staging → pre-prod → production) with verification at each gate.',
  purpose: 'Ensure only artefacts that have passed environment-level verification progress to the next stage, preventing contaminated or incorrect builds from reaching production.',
  principles_applied: ['Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Release artefacts', 'Environment promotion checklist', 'CI/CD pipeline config'],
  outputs: ['Promoted artefacts per environment', 'Promotion verification records', 'Pre-prod smoke test results'],
  children: [
    sa('p7-dp2-sa1', 'Staging Promotion and Verification', 'Deploy release artefacts to staging; run smoke and regression tests; verify environment parity with production config.', 'Staging promotion is the final dress rehearsal; any gap from production configuration must be resolved before proceeding.',
      [
        task('p7-dp2-sa1-t1', 'Deploy to staging and run smoke tests', 'Trigger deployment pipeline to staging; run smoke test suite; compare staging config to production config checklist; resolve any parity gaps.', ['Deployment pipeline', 'Staging environment', 'Smoke test suite'],
          eg('p7-dp2-sa1-t1-eg', 'Confirm staging parity and test pass', 'Run pipeline; execute smoke tests; compare config values (connection strings, feature flags, model endpoints) against production config checklist; document and resolve all parity gaps; obtain staging verification sign-off.', ['CI/CD pipeline', 'Smoke test suite', 'Config parity checklist'], ['Staging deployment evidence', 'Smoke test results', 'Config parity report'])),
      ]),
    sa('p7-dp2-sa2', 'Pre-Production Gate', 'Conduct final pre-production review of artefact integrity, dependency versions, and security scan freshness before production promotion.', 'The pre-production gate is the last human checkpoint before live traffic touches the new version.',
      [
        task('p7-dp2-sa2-t1', 'Complete pre-production checklist', 'Verify artefact checksums match Phase 6 release package; confirm dependency SBOMs current; confirm security scan results current; obtain pre-prod gate approval.', ['Release package checksums', 'SBOM', 'Security scan results'],
          eg('p7-dp2-sa2-t1-eg', 'Record pre-production gate pass', 'Verify each checklist item; record pass/fail; resolve any failures; obtain approval signature from deployment lead; archive gate record with timestamp.', ['Pre-production checklist', 'Checksum verification tool', 'Approval workflow'], ['Pre-production gate record', 'Deployment lead approval'])),
      ]),
  ],
}

const Dp3: AISANode = {
  id: 'p7-dp3', type: 'activity', level: 2,
  title: 'Dp3 — Deployment Automation',
  description: 'Execute and validate the automated deployment pipeline that installs, configures, and starts the AI system components in each target environment.',
  purpose: 'Eliminate manual deployment errors by automating all installation, configuration, and health-check steps.',
  principles_applied: ['Minimum Viable Complexity', 'Technology Serves Architecture'],
  inputs: ['CI/CD pipeline', 'Deployment scripts', 'Environment configuration', 'Health check definitions'],
  outputs: ['Deployed application components', 'Deployment logs', 'Health check pass evidence'],
  children: [
    sa('p7-dp3-sa1', 'Pipeline Execution', 'Trigger and monitor the automated deployment pipeline through all stages to completion.', 'Automated pipelines with built-in health checks provide faster, more reliable deployments than manual procedures.',
      [
        task('p7-dp3-sa1-t1', 'Execute deployment pipeline and monitor', 'Trigger pipeline; monitor each stage; confirm health checks pass after each component deployment; abort and alert on any stage failure.', ['CI/CD platform', 'Pipeline monitoring dashboard'],
          eg('p7-dp3-sa1-t1-eg', 'Confirm pipeline completion with green health checks', 'Trigger deployment; monitor stage-by-stage; for each component: confirm startup health check returns healthy; confirm version endpoint returns expected version string; record stage completion times; archive deployment log.', ['GitHub Actions / Jenkins / Argo CD', 'Health check endpoint', 'Deployment log'], ['Completed deployment pipeline log', 'Health check pass record', 'Deployment completion timestamp'])),
      ]),
    sa('p7-dp3-sa2', 'Zero-Downtime Validation', 'Confirm that the deployment strategy (blue-green or rolling) produced zero downtime or within-SLO downtime for existing traffic.', 'Zero-downtime validation confirms the deployment strategy worked as designed and users were not impacted.',
      [
        task('p7-dp3-sa2-t1', 'Measure downtime during deployment', 'Monitor error rate and availability metrics during deployment window; compare to SLO; document any elevated error periods.', ['Availability monitoring', 'Error rate dashboard'],
          eg('p7-dp3-sa2-t1-eg', 'Produce deployment impact report', 'Pull availability and error rate metrics for the deployment window; compare to pre-deployment baseline; document any transient error spikes; confirm within SLO or escalate if exceeded.', ['Grafana / Datadog availability dashboard', 'Pre-deployment baseline report'], ['Deployment impact report', 'Downtime measurement evidence'])),
      ]),
  ],
}

const Dp4: AISANode = {
  id: 'p7-dp4', type: 'activity', level: 2,
  title: 'Dp4 — Infrastructure Provisioning',
  description: 'Execute infrastructure-as-code to provision all production compute, networking, storage, and AI/ML platform resources for the new system version.',
  purpose: 'Ensure production infrastructure is provisioned reproducibly from code, eliminating manual configuration drift and enabling environment recreation.',
  principles_applied: ['Technology Serves Architecture', 'Minimum Viable Complexity'],
  inputs: ['IaC scripts from Phase 4', 'Production environment config', 'Cost budget approval', 'Network security policy'],
  outputs: ['Provisioned production infrastructure', 'IaC execution logs', 'Infrastructure cost estimate vs actual'],
  children: [
    sa('p7-dp4-sa1', 'IaC Execution and Validation', 'Run IaC scripts in production; verify all resources provisioned correctly; confirm networking, security groups, and IAM roles match policy.', 'IaC execution validation prevents configuration drift from the approved architecture.',
      [
        task('p7-dp4-sa1-t1', 'Execute and validate IaC in production', 'Run Terraform/Pulumi plan; review diff for unexpected changes; apply; validate each provisioned resource against architecture spec; run connectivity checks.', ['Terraform/Pulumi scripts', 'Architecture spec', 'Production credentials'],
          eg('p7-dp4-sa1-t1-eg', 'Confirm infrastructure matches architecture spec', 'Run plan; review for unintended deletions or modifications; apply after approval; spot-check 5+ resources for correct config; run network connectivity matrix; confirm IAM roles least-privilege; archive apply log.', ['Terraform / Pulumi', 'AWS Config / Azure Policy for drift detection', 'Network connectivity test script'], ['IaC apply log', 'Resource validation report', 'Network connectivity matrix'])),
      ]),
    sa('p7-dp4-sa2', 'Cost Verification', 'Confirm actual provisioned infrastructure cost aligns with the approved budget estimate.', 'Cost verification prevents budget surprises from misconfigured instance types or unintended resource quantities.',
      [
        task('p7-dp4-sa2-t1', 'Compare actual cost to approved estimate', 'Pull cost estimate from IaC plan; compare to live cloud cost estimate after provisioning; escalate if actual exceeds estimate by more than policy threshold.', ['IaC cost estimate', 'Cloud cost dashboard'],
          eg('p7-dp4-sa2-t1-eg', 'Record cost verification outcome', 'Pull monthly cost projection from cloud console; compare line-by-line to approved estimate; flag any line more than 20% over estimate; obtain finance approval if total exceeds budget threshold.', ['AWS Cost Explorer / Azure Cost Management', 'Budget approval workflow'], ['Cost verification report', 'Finance approval record if required'])),
      ]),
  ],
}

const Dp5: AISANode = {
  id: 'p7-dp5', type: 'activity', level: 2,
  title: 'Dp5 — Production Readiness Review',
  description: 'Conduct a structured production readiness review (PRR) assessing operational runbooks, alerting coverage, on-call rotation, incident response plan, and monitoring completeness.',
  purpose: 'Confirm the operations team is prepared to own and operate the system in production before traffic is admitted.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making'],
  inputs: ['Runbooks', 'Alert definitions', 'On-call roster', 'Incident response plan', 'Monitoring dashboards'],
  outputs: ['PRR checklist completion record', 'Open PRR items', 'Operations readiness sign-off'],
  children: [
    sa('p7-dp5-sa1', 'PRR Checklist Execution', 'Step through the PRR checklist covering monitoring, alerting, runbooks, on-call, and incident response; record pass/fail per item.', 'A formal PRR checklist creates a documented baseline that the system is operationally ready, not just technically deployed.',
      [
        task('p7-dp5-sa1-t1', 'Complete PRR checklist', 'Assess each PRR item; for any failing item: classify as blocking or non-blocking; resolve blocking items before traffic is admitted.', ['PRR checklist', 'Operations artefacts'],
          eg('p7-dp5-sa1-t1-eg', 'Produce PRR completion report and sign-off', 'Facilitate PRR session with ops and dev leads; record pass/fail per item; assign remediation owners for failures; block traffic admission on any unresolved blocking items; obtain ops lead sign-off after blocking items resolved.', ['PRR checklist template', 'Ops review session', 'Sign-off workflow'], ['PRR completion report', 'Blocking item remediation log', 'Ops readiness sign-off'])),
      ]),
  ],
}

const Dp6: AISANode = {
  id: 'p7-dp6', type: 'activity', level: 2,
  title: 'Dp6 — Rollback Preparation',
  description: 'Prepare, test, and document the rollback procedure to restore the previous stable version within the defined RTO if deployment fails.',
  purpose: 'Ensure the team can execute a rollback quickly and confidently under pressure, minimising user impact from a failed deployment.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Previous stable version artefacts', 'Rollback decision matrix', 'RTO definition'],
  outputs: ['Tested rollback procedure', 'Rollback runbook', 'Rollback drill results'],
  children: [
    sa('p7-dp6-sa1', 'Rollback Procedure Testing', 'Execute a full rollback drill in the staging environment to validate the procedure and measure rollback time.', 'An untested rollback procedure is worthless under incident pressure; drilling confirms it works and builds team muscle memory.',
      [
        task('p7-dp6-sa1-t1', 'Run rollback drill', 'Deploy new version to staging; execute rollback procedure; measure time to restore previous version; verify all health checks pass on previous version.', ['Previous stable artefacts', 'Rollback runbook', 'Staging environment'],
          eg('p7-dp6-sa1-t1-eg', 'Document drill results and confirm within RTO', 'Execute drill; record step-by-step times; compute total rollback time; confirm within RTO; document any procedural gaps found; update runbook; re-drill if gaps found.', ['Rollback runbook', 'Timer', 'Health check suite'], ['Rollback drill results', 'Updated rollback runbook', 'RTO compliance confirmation'])),
      ]),
  ],
}

const Dp7: AISANode = {
  id: 'p7-dp7', type: 'activity', level: 2,
  title: 'Dp7 — Shadow Deployment',
  description: 'Run the new AI system version in shadow mode — receiving a copy of live production traffic and processing it without serving responses to users — to validate production behaviour under real data.',
  purpose: 'Detect production-specific failures (data distribution shift, configuration drift, unexpected latency) before any user is exposed to the new version.',
  principles_applied: ['Evidence-Based Decision Making', 'Business Value First'],
  inputs: ['Shadow traffic routing config', 'Monitoring dashboards', 'Comparison baseline from current production'],
  outputs: ['Shadow traffic comparison report', 'Production-specific defects found', 'Go-ahead decision for canary'],
  children: [
    sa('p7-dp7-sa1', 'Shadow Traffic Analysis', 'Route a copy of production traffic to the shadow instance; compare outputs and metrics to the current production baseline.', 'Shadow traffic exposes real production data distribution differences that synthetic test data misses.',
      [
        task('p7-dp7-sa1-t1', 'Run shadow deployment and analyse outputs', 'Enable shadow routing; let shadow process at least 1 hour of production traffic; compare error rates, latency, and output quality between shadow and baseline.', ['Traffic mirroring config', 'Comparison dashboard'],
          eg('p7-dp7-sa1-t1-eg', 'Produce shadow comparison report', 'Enable shadow routing; collect 1+ hours of shadow metrics; compute p50/p95/p99 latency delta; compare error rate; sample outputs for quality comparison; document any regressions vs baseline; decide go/no-go for canary.', ['Envoy / nginx traffic mirroring', 'Shadow comparison dashboard', 'Output sample comparison tool'], ['Shadow comparison report', 'Shadow error log', 'Canary go/no-go decision record'])),
      ]),
  ],
}

const Dp8: AISANode = {
  id: 'p7-dp8', type: 'activity', level: 2,
  title: 'Dp8 — Canary Release',
  description: 'Route a small percentage of live user traffic (1–10%) to the new version; monitor key metrics; expand or roll back based on defined canary exit criteria.',
  purpose: 'Limit user exposure to potential defects while generating real-user signal to validate the new version under production conditions.',
  principles_applied: ['Business Value First', 'Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Canary routing config', 'Rollback decision matrix', 'Monitoring dashboards', 'On-call engineer on duty'],
  outputs: ['Canary metrics report', 'Canary exit decision', 'Traffic progression log'],
  children: [
    sa('p7-dp8-sa1', 'Canary Traffic Progression', 'Incrementally increase canary traffic percentage while monitoring metrics against rollback thresholds.', 'Gradual traffic increase limits blast radius; metric monitoring at each step enables evidence-based progression decisions.',
      [
        task('p7-dp8-sa1-t1', 'Execute canary traffic ramp', 'Set initial canary weight; monitor for 30 minutes; review metrics against rollback thresholds; if clear, increment weight; continue until target percentage or rollback triggered.', ['Traffic routing config', 'Rollback thresholds', 'Monitoring dashboards'],
          eg('p7-dp8-sa1-t1-eg', 'Document each canary step decision', 'For each traffic step (1%, 5%, 10%, 25%): update routing weight; observe for 30 minutes; record error rate, p95 latency, guardrail trigger rate; compare to rollback thresholds; record go/hold/rollback decision with rationale; continue or stop.', ['Feature flag / service mesh traffic split', 'Grafana canary dashboard', 'Step decision log'], ['Canary step decision log', 'Canary metrics per step', 'Final canary outcome record'])),
      ]),
  ],
}

const Dp9: AISANode = {
  id: 'p7-dp9', type: 'activity', level: 2,
  title: 'Dp9 — Full Production Release',
  description: 'Complete the production release by routing 100% of traffic to the new version, confirming stability, and decommissioning the previous version.',
  purpose: 'Complete the transition to the new version in a controlled, observable way and clean up previous version resources.',
  principles_applied: ['Business Value First', 'Minimum Viable Complexity'],
  inputs: ['Canary success decision', 'Traffic routing config', 'Previous version decommission checklist'],
  outputs: ['Full production deployment', 'Stability confirmation metrics', 'Decommission record'],
  children: [
    sa('p7-dp9-sa1', 'Full Traffic Cut-Over', 'Route 100% of traffic to the new version; hold the previous version on standby for 24 hours; monitor for anomalies.', 'A 24-hour standby period preserves rollback capability while full-traffic monitoring confirms production stability.',
      [
        task('p7-dp9-sa1-t1', 'Complete cut-over and confirm stability', 'Set routing to 100% new version; monitor all SLO metrics for 2 hours; confirm stability; hold previous version on standby for 24 hours; then decommission if no rollback triggered.', ['Routing config', 'SLO monitoring dashboard', 'Decommission checklist'],
          eg('p7-dp9-sa1-t1-eg', 'Archive production stability confirmation', 'Update routing; monitor for 2 hours; if all metrics within SLO, record stability confirmation; retain previous version containers/images for 24 hours; after 24 hours without rollback: execute decommission checklist; archive deployment completion record.', ['Traffic routing tool', 'SLO monitoring', 'Decommission script'], ['Full production deployment record', 'Stability confirmation metrics', 'Decommission completion record'])),
      ]),
  ],
}

const Dp10: AISANode = {
  id: 'p7-dp10', type: 'activity', level: 2,
  title: 'Dp10 — Handover to Operations',
  description: 'Formally transfer operational ownership of the AI system from the deployment team to the ongoing operations team, including knowledge transfer, runbook handover, and support model activation.',
  purpose: 'Ensure the operations team has the knowledge, tools, and authority to own and operate the system without continued dependency on the deployment team.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First'],
  inputs: ['Runbooks', 'Architecture documentation', 'Monitoring dashboard links', 'On-call rotation', 'Escalation path'],
  outputs: ['Handover record', 'Operations team acceptance', 'Support model documentation', 'Lessons learned log'],
  children: [
    sa('p7-dp10-sa1', 'Knowledge Transfer', 'Conduct structured knowledge transfer sessions covering architecture, operations, incident response, and known gotchas.', 'Thorough knowledge transfer prevents the operations team from re-discovering issues the deployment team already solved.',
      [
        task('p7-dp10-sa1-t1', 'Run knowledge transfer sessions', 'Schedule and run sessions covering system architecture, deployment anatomy, monitoring dashboards, runbook walkthroughs, and known failure modes.', ['Architecture documentation', 'Runbooks', 'Operations team attendees'],
          eg('p7-dp10-sa1-t1-eg', 'Document knowledge transfer completion', 'Run minimum 2 sessions; record attendance; have ops team members walk through runbooks unassisted; document any gaps in runbooks identified during sessions; update runbooks accordingly.', ['Knowledge transfer agenda template', 'Session recording tool', 'Runbook gap log'], ['Knowledge transfer session records', 'Updated runbooks', 'Knowledge gap resolution log'])),
      ]),
    sa('p7-dp10-sa2', 'Formal Handover and Lessons Learned', 'Execute the formal handover, obtain operations team acceptance, and conduct a deployment retrospective to capture lessons learned.', 'Formal handover creates clear accountability transfer; lessons learned prevent recurrence of issues encountered during the deployment.',
      [
        task('p7-dp10-sa2-t1', 'Complete handover and retrospective', 'Sign handover document; conduct retrospective with deployment and operations teams; record lessons learned; file in project knowledge base.', ['Handover document template', 'Retrospective facilitator'],
          eg('p7-dp10-sa2-t1-eg', 'Archive handover package and lessons learned', 'Sign handover document; run retrospective; document: what went well, what to improve, action items with owners; file all artefacts in knowledge base; confirm operations team lead acknowledges ownership in writing.', ['Handover document', 'Retrospective template', 'Knowledge base'], ['Signed handover document', 'Lessons learned document', 'Operations team acceptance record'])),
      ]),
  ],
}

export const PHASE_7: AISANode = {
  id: 'phase-7', type: 'phase', level: 1,
  title: 'Phase 7 — Deploy & Release',
  description: 'Safely promote the validated AI system from the release package through staged deployment into full production, using shadow and canary strategies to limit risk, with tested rollback capability and formal handover to operations.',
  purpose: 'Deliver the AI system into production in a controlled, observable, and reversible manner with complete operational readiness.',
  why_it_matters: 'Deployment failures are high-visibility incidents that damage stakeholder trust. Staged deployment with pre-defined rollback criteria is the only responsible path to production for AI systems.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated', 'Evidence-Based Decision Making', 'Minimum Viable Complexity'],
  inputs: ['Phase 6 deployment authorisation', 'Release package', 'Production infrastructure', 'Operations team'],
  outputs: ['Running production AI system', 'Operations handover record', 'Deployment completion report', 'Lessons learned'],
  deliverables: ['Approved release plan', 'Shadow and canary test results', 'Full production deployment', 'Rollback procedure record', 'PRR completion', 'Operations handover package'],
  exit_criteria: ['Dp1–Dp10 activities complete', 'Full production traffic on new version', 'SLO metrics within threshold after 24 hours', 'Operations team acceptance signed', 'Lessons learned filed'],
  children: [Dp1, Dp2, Dp3, Dp4, Dp5, Dp6, Dp7, Dp8, Dp9, Dp10],
}
