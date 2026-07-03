import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D3 — BUSINESS VALUE ASSESSMENT
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Cost Reduction Analysis ─────────────────────────────────────

const EG_LABOUR_SAVINGS: AISANode = {
  id: 'p1-d3-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Calculating Labour Cost Savings',
  description: 'Quantify the labour cost savings achievable by automating or augmenting tasks currently performed manually.',
  purpose: 'Produce a defensible, finance-ready labour savings estimate that can be stress-tested in a board or CFO review.',
  why_it_matters: 'Labour savings are typically the largest and most credible line item in an AI business case. Under-calculating understates the case; over-calculating destroys credibility when finance scrutinises the model. Precision here wins executive approval.',
  methods: [
    '1. List all tasks in the affected process currently performed manually that the AI system will automate or augment.',
    '2. For each task, obtain from the Process Owner: the average time per execution, the frequency per week/month, and the role performing it (and its loaded hourly cost including benefits and overhead).',
    '3. Estimate the expected automation rate for each task: full automation (100%), assisted (50% time reduction), or augmented (20–30% time reduction). Be conservative at this stage.',
    '4. Calculate annual labour savings per task: time_saved_per_occurrence × frequency_per_year × loaded_hourly_cost.',
    '5. Sum across all tasks to get total annual labour savings.',
    '6. Apply a confidence discount (e.g., 70% of total if estimates are largely unverified) to produce a conservative estimate.',
    '7. Document all assumptions and the source of each data point.',
  ],
  tools: ['Labour savings calculator (spreadsheet)', 'HR cost-per-role data'],
  outputs: ['Labour savings model with per-task breakdown and total annual savings (conservative and optimistic estimates)'],
  exit_criteria: ['Labour savings model reviewed and accepted by Business Owner; all assumptions documented'],
}

const T_LABOUR_SAVINGS: AISANode = {
  id: 'p1-d3-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Calculate Labour Cost Savings',
  description: 'Quantify the annual labour savings from automating or augmenting tasks in the affected process.',
  purpose: 'Produce the primary cost-reduction line item in the business case.',
  inputs: ['Process task list', 'Loaded hourly cost by role', 'Process Owner time estimates', 'Automation rate assumptions'],
  methods: ['Task-level time-saving calculation', 'Annual scaling', 'Confidence discounting'],
  tools: ['Labour savings calculator'],
  outputs: ['Labour savings model with conservative and optimistic totals'],
  children: [EG_LABOUR_SAVINGS],
}

const EG_ERROR_COST_SAVINGS: AISANode = {
  id: 'p1-d3-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Quantifying Error and Rework Cost Savings',
  description: 'Calculate the annual cost of errors and rework in the current process that the AI system will reduce or eliminate.',
  purpose: 'Quantify the hidden cost of current-state errors to demonstrate savings beyond labour efficiency.',
  why_it_matters: 'Error and rework costs are often invisible in management accounts but can dwarf labour savings. Surfacing them strengthens the business case and makes the case to quality and risk functions who are not typically counted in headcount savings.',
  methods: [
    '1. Ask the Process Owner: "What errors occur in this process? How often? What does each error cost to resolve?"',
    '2. Categorise errors: data entry errors, classification errors, missed items, incorrect decisions.',
    '3. For each error type, estimate: annual occurrence frequency, average rework time, roles involved in rework, any external costs (penalties, customer compensation, re-processing fees).',
    '4. Estimate AI-driven error reduction rate (be conservative: 50–70% is typical for well-structured classification tasks; lower for complex judgment tasks).',
    '5. Calculate annual error cost savings: current_error_cost × reduction_rate.',
    '6. Document: what the AI will reduce vs. what requires human oversight and therefore remains.',
  ],
  tools: ['Error cost model (spreadsheet)', 'Process Owner and quality team input'],
  outputs: ['Error and rework cost savings model with reduction rate assumptions'],
  exit_criteria: ['Error cost savings calculated with documented reduction rate assumptions; reviewed by Business Owner'],
}

const T_ERROR_COST_SAVINGS: AISANode = {
  id: 'p1-d3-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Quantify Error and Rework Cost Savings',
  description: 'Calculate the annual savings from reducing errors and rework in the current process.',
  purpose: 'Surface the hidden cost of current-state errors as an additional savings dimension.',
  inputs: ['Error frequency and cost data from Process Owner', 'Quality team input', 'Automation reduction rate assumptions'],
  methods: ['Error categorisation', 'Rework cost calculation', 'Reduction rate application'],
  tools: ['Error cost model'],
  outputs: ['Error and rework cost savings model'],
  children: [EG_ERROR_COST_SAVINGS],
}

const SA1_COST_REDUCTION: AISANode = {
  id: 'p1-d3-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Cost Reduction Analysis',
  description: 'Calculate the direct cost savings achievable through AI automation and augmentation — labour savings, error reduction, and operational cost efficiency.',
  purpose: 'Quantify the cost-reduction side of the value equation with sufficient precision to withstand finance and executive scrutiny.',
  why_it_matters: 'Cost savings are the most credible and fastest-to-materialise value from AI in operational contexts. A well-built cost reduction analysis is the cornerstone of the business case and the most common basis for investment approval.',
  inputs: ['Priority pain point list', 'Process task inventory', 'Loaded cost-per-role data', 'Error frequency and cost data'],
  questions: ['Which tasks will AI automate or augment, and at what rate?', 'What do errors currently cost annually?', 'What other operational costs will reduce?'],
  methods: ['Labour savings modelling', 'Error cost quantification', 'Operational cost estimation'],
  tools: ['Labour savings calculator', 'Error cost model'],
  outputs: ['Labour savings model', 'Error cost savings model'],
  deliverables: ['Cost Reduction Analysis (input to Business Case)'],
  exit_criteria: ['All cost reduction elements quantified with documented assumptions; Business Owner has validated the model'],
  children: [T_LABOUR_SAVINGS, T_ERROR_COST_SAVINGS],
}

// ─── SA2: Revenue Opportunity Analysis ────────────────────────────────

const EG_REVENUE_UPSIDE: AISANode = {
  id: 'p1-d3-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Identifying and Quantifying Revenue Upside',
  description: 'Identify where AI can directly or indirectly enable revenue growth: faster throughput, higher conversion, new products, or expanded capacity.',
  purpose: 'Capture the revenue-growth dimension of value to complement cost savings and build a fuller business case.',
  why_it_matters: 'Cost reduction alone often justifies AI investment in back-office functions, but revenue impact accelerates ROI and unlocks larger capital allocation. Identifying even one credible revenue line strengthens the case for ambitious scope.',
  methods: [
    '1. Ask the Business Owner: "If this process were faster, more accurate, or more scalable, what revenue outcomes would improve?"',
    '2. Identify: capacity-constrained revenue (AI increases throughput → more deals processed), conversion improvement (faster or better-quality decisions → higher conversion rate), time-to-value (faster onboarding → faster revenue recognition).',
    '3. For each opportunity, quantify: current constraint, AI-enabled improvement, and revenue impact.',
    '4. Use conservative improvement rates. Revenue claims face the highest scrutiny.',
    '5. Obtain the Business Owner\'s agreement that the revenue opportunities identified are credible and achievable.',
    '6. Clearly distinguish: near-term revenue opportunities (within 12 months) vs. long-term strategic opportunities (12–36 months).',
  ],
  tools: ['Revenue opportunity model (spreadsheet)'],
  outputs: ['Revenue opportunity model with near-term and long-term line items'],
  exit_criteria: ['Revenue opportunities identified and quantified with conservative estimates; Business Owner confirmed credibility'],
}

const T_REVENUE_UPSIDE: AISANode = {
  id: 'p1-d3-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Identify and Quantify Revenue Upside',
  description: 'Quantify the revenue growth opportunities enabled by AI in the affected process.',
  purpose: 'Add a revenue-growth dimension to the business case beyond cost reduction.',
  inputs: ['Business Owner input', 'Process volume data', 'Commercial metrics (conversion rates, deal values)'],
  methods: ['Revenue opportunity identification', 'Conservative quantification', 'Near-term vs. long-term classification'],
  tools: ['Revenue opportunity model'],
  outputs: ['Revenue opportunity model'],
  children: [EG_REVENUE_UPSIDE],
}

const SA2_REVENUE: AISANode = {
  id: 'p1-d3-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Revenue Opportunity Analysis',
  description: 'Identify and quantify where AI-enabled process improvement will drive revenue growth — through capacity, conversion, speed, or new capability.',
  purpose: 'Add the growth dimension to the business case and strengthen the investment argument beyond cost efficiency.',
  why_it_matters: 'Revenue opportunities, even when conservatively estimated, demonstrate strategic value and attract larger and faster investment decisions. An AI initiative that only saves cost is an operational improvement; one that also grows revenue is a strategic investment.',
  inputs: ['Process volume data', 'Commercial metrics', 'Business Owner input on growth constraints'],
  questions: ['Where is revenue growth constrained by the current process?', 'What would faster or better-quality process execution enable commercially?'],
  methods: ['Revenue opportunity identification', 'Conservative quantification', 'Near-term vs. long-term classification'],
  tools: ['Revenue opportunity model'],
  outputs: ['Revenue opportunity model with near-term and long-term projections'],
  deliverables: ['Revenue Opportunity Analysis (input to Business Case)'],
  exit_criteria: ['Revenue opportunities quantified with conservative estimates and Business Owner validation'],
  children: [T_REVENUE_UPSIDE],
}

// ─── SA3: Risk Reduction Analysis ─────────────────────────────────────

const EG_COMPLIANCE_RISK: AISANode = {
  id: 'p1-d3-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Quantifying Compliance and Regulatory Risk Reduction',
  description: 'Assess the compliance risk exposure in the current process and quantify the risk reduction value of AI-driven consistency, auditability, and error reduction.',
  purpose: 'Add the risk-reduction dimension to the value case for organisations in regulated industries where compliance failure carries significant financial and reputational cost.',
  why_it_matters: 'For many organisations, the risk-reduction argument is more compelling than cost savings — a single regulatory fine can exceed the entire system build cost. Quantifying risk reduction in expected-value terms makes the case visceral to boards, audit committees, and risk functions.',
  methods: [
    '1. Identify compliance obligations relevant to the affected process: GDPR, FCA, DORA, EU AI Act, or sector-specific regulations.',
    '2. For each obligation, assess current-state compliance risk: is it being consistently met? What happens when it fails?',
    '3. Quantify the expected cost of compliance failure: fine amount (from regulation) × estimated probability of occurrence given current-state error rates.',
    '4. Estimate how AI will reduce compliance failure probability (e.g., consistent data handling reduces GDPR breach risk by 60%).',
    '5. Calculate risk-adjusted annual value: (current expected fine cost) − (post-AI expected fine cost).',
    '6. Document the regulatory references for each obligation.',
  ],
  tools: ['Risk register template', 'Regulatory fine schedule references'],
  outputs: ['Compliance risk reduction analysis with expected-value calculations per regulatory obligation'],
  exit_criteria: ['All relevant compliance obligations identified; risk reduction quantified in expected-value terms; Compliance team reviewed'],
}

const T_COMPLIANCE_RISK: AISANode = {
  id: 'p1-d3-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Quantify Compliance Risk Reduction',
  description: 'Assess and quantify the reduction in regulatory compliance risk enabled by the AI system.',
  purpose: 'Add a risk-reduction dimension to the business case, critical for regulated industries.',
  inputs: ['Compliance obligations list', 'Current error rates', 'Regulatory fine schedules', 'Compliance team input'],
  methods: ['Expected value calculation', 'Risk reduction rate estimation', 'Regulatory reference mapping'],
  tools: ['Risk register template'],
  outputs: ['Compliance risk reduction analysis'],
  children: [EG_COMPLIANCE_RISK],
}

const SA3_RISK_REDUCTION: AISANode = {
  id: 'p1-d3-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Risk Reduction Analysis',
  description: 'Quantify the business risk exposure in the current state and estimate the risk reduction value delivered by the AI system.',
  purpose: 'Add a risk-adjusted value dimension to the business case that resonates with risk, compliance, and board audiences.',
  why_it_matters: 'Risk reduction is an underused but highly effective business case argument, particularly in regulated industries. Expected-value calculations for fines, breaches, and operational failures can transform a cost-only case into a risk management imperative.',
  inputs: ['Compliance obligations', 'Current error rates and incident history', 'Regulatory fine schedules', 'Compliance and risk team input'],
  questions: ['What regulatory or operational risks does the current process expose us to?', 'What is the expected cost of a failure event?', 'How much does AI reduce that probability?'],
  methods: ['Compliance obligation mapping', 'Expected value risk calculation', 'Risk reduction rate estimation'],
  tools: ['Risk register template'],
  outputs: ['Compliance risk reduction analysis'],
  deliverables: ['Risk Reduction Analysis (input to Business Case)'],
  exit_criteria: ['Compliance obligations identified; risk reduction quantified in expected-value terms; reviewed by Compliance team'],
  children: [T_COMPLIANCE_RISK],
}

// ─── SA4: Strategic Value Assessment ──────────────────────────────────

const EG_STRATEGIC_FIT: AISANode = {
  id: 'p1-d3-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Assessing Strategic Fit and Organisational Capability Building',
  description: 'Evaluate how the AI initiative aligns with and advances the organisation\'s strategic goals, and what organisational capability it builds beyond the immediate use case.',
  purpose: 'Demonstrate that the initiative delivers lasting strategic value beyond the ROI calculation, justifying higher investment and long-term programme thinking.',
  why_it_matters: 'AI initiatives that are positioned purely as operational improvements invite constant scrutiny on ROI. Initiatives framed as capability-building and strategic-alignment investments unlock larger budgets and longer investment horizons — because they are viewed as strategic assets, not point solutions.',
  methods: [
    '1. Obtain the organisation\'s strategic goals (typically from the Annual Report, Strategic Plan, or Executive Sponsor briefing).',
    '2. For each strategic goal, assess the degree to which this AI initiative directly advances it.',
    '3. Identify organisational capabilities built through this initiative that have value beyond the use case: data infrastructure, AI literacy, MLOps practice, governance frameworks.',
    '4. Assess competitive positioning: does this capability move the organisation ahead of, alongside, or towards the industry baseline?',
    '5. Document the strategic fit narrative in 1–2 paragraphs suitable for board or executive presentation.',
  ],
  tools: ['Strategic alignment matrix'],
  outputs: ['Strategic fit narrative and capability-building inventory'],
  exit_criteria: ['Strategic fit articulated and confirmed by Executive Sponsor; capability-building value documented'],
}

const T_STRATEGIC_FIT: AISANode = {
  id: 'p1-d3-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Assess Strategic Fit',
  description: 'Evaluate how the initiative aligns with strategic goals and what lasting organisational capability it builds.',
  purpose: 'Position the initiative as a strategic investment, not just an operational improvement.',
  inputs: ['Strategic plan or annual report', 'Executive Sponsor briefing', 'Initiative scope summary'],
  methods: ['Strategic goal mapping', 'Capability inventory', 'Competitive positioning assessment'],
  tools: ['Strategic alignment matrix'],
  outputs: ['Strategic fit narrative and capability-building inventory'],
  children: [EG_STRATEGIC_FIT],
}

const SA4_STRATEGIC: AISANode = {
  id: 'p1-d3-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Strategic Value Assessment',
  description: 'Evaluate the initiative\'s strategic alignment and organisational capability-building value beyond direct financial return.',
  purpose: 'Add a strategic narrative to the business case that resonates with executive and board audiences and justifies larger, longer-term investment.',
  why_it_matters: 'Financial ROI is necessary but not sufficient for gaining organisational commitment to AI. Strategic value assessment positions the initiative as a strategic asset, not a point solution — unlocking investment appetite and executive sponsorship at a higher level.',
  inputs: ['Strategic plan', 'Executive Sponsor priorities', 'Initiative scope'],
  questions: ['How does this initiative advance our strategy?', 'What capability does it build for future AI initiatives?'],
  methods: ['Strategic goal alignment mapping', 'Capability-building inventory', 'Competitive positioning analysis'],
  tools: ['Strategic alignment matrix'],
  outputs: ['Strategic fit narrative', 'Capability-building inventory'],
  deliverables: ['Strategic Value Assessment (section of Business Case)'],
  exit_criteria: ['Strategic fit confirmed by Executive Sponsor; board-ready narrative produced'],
  children: [T_STRATEGIC_FIT],
}

// ─── SA5: ROI Estimation ───────────────────────────────────────────────

const EG_ROI_MODEL: AISANode = {
  id: 'p1-d3-sa5-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the ROI Financial Model',
  description: 'Construct a 3-year financial model covering total cost of investment (TCI), annual value delivered, payback period, NPV, and ROI percentage.',
  purpose: 'Produce a finance-ready ROI model that passes scrutiny from CFO and finance teams, enabling the investment decision.',
  why_it_matters: 'A business case without a credible ROI model is an opinion piece. Finance teams will construct their own model if you do not provide one — and theirs will likely be less favourable. Controlling the model means controlling the narrative.',
  methods: [
    '1. Collate all value elements: labour savings (SA1), error cost savings (SA1), revenue upside (SA2), risk reduction (SA3).',
    '2. Build the cost side: one-time build cost (estimated from Phase 3/4), annual operating cost (infrastructure, licences, maintenance, governance overhead).',
    '3. Construct year-by-year cashflow: Year 0 — build cost; Year 1 — go-live mid-year assumption (50% of annual value); Year 2 — full annual value; Year 3 — full annual value, usually with growth.',
    '4. Calculate: cumulative net value by year, payback period (year in which cumulative value crosses zero), NPV at the organisation\'s hurdle rate, 3-year ROI %.',
    '5. Build a sensitivity table: show the ROI impact of ±20% on the key value assumptions.',
    '6. Present conservative, base, and optimistic scenarios.',
  ],
  tools: ['ROI financial model (spreadsheet)', 'NPV calculator', 'Organisation hurdle rate from Finance'],
  outputs: ['3-year ROI model: conservative, base, and optimistic scenarios with sensitivity analysis'],
  exit_criteria: ['ROI model reviewed by Finance or CFO; payback period, NPV, and ROI % confirmed for the base scenario'],
}

const T_ROI_MODEL: AISANode = {
  id: 'p1-d3-sa5-t1',
  type: 'task',
  level: 4,
  title: 'Build the ROI Financial Model',
  description: 'Construct a 3-year financial model with payback period, NPV, and sensitivity analysis.',
  purpose: 'Produce a finance-ready model that enables the investment decision.',
  inputs: ['Value elements from SA1–SA4', 'Estimated build and operating costs', 'Organisation hurdle rate'],
  methods: ['Year-by-year cashflow modelling', 'NPV and payback calculation', 'Sensitivity analysis'],
  tools: ['ROI financial model', 'NPV calculator'],
  outputs: ['3-year ROI model with scenarios and sensitivity table'],
  children: [EG_ROI_MODEL],
}

const SA5_ROI: AISANode = {
  id: 'p1-d3-sa5',
  type: 'sub-activity',
  level: 3,
  title: 'ROI Estimation',
  description: 'Build a complete 3-year financial model combining all value elements, investment costs, and scenarios to produce a finance-ready ROI assessment.',
  purpose: 'Enable the investment decision by providing a credible, finance-reviewed financial model.',
  why_it_matters: 'ROI is the language of the investment decision. A rigorous model controls the narrative, survives CFO scrutiny, and provides the reference point for post-delivery value realisation measurement.',
  inputs: ['All SA1–SA4 value elements', 'Estimated build and operating costs', 'Organisation hurdle rate'],
  questions: ['When does the investment pay back?', 'What is the NPV at our hurdle rate?', 'How sensitive is the ROI to the key value assumptions?'],
  methods: ['3-year cashflow modelling', 'NPV and ROI calculation', 'Sensitivity analysis', 'Scenario construction'],
  tools: ['ROI financial model', 'NPV calculator'],
  outputs: ['3-year ROI model with scenarios and sensitivity analysis'],
  deliverables: ['ROI Estimate (key section of Business Case)'],
  exit_criteria: ['ROI model reviewed and accepted by Finance or CFO; base scenario payback, NPV, and ROI % confirmed'],
  children: [T_ROI_MODEL],
}

// ─── SA6: Build Business Case ──────────────────────────────────────────

const EG_DRAFT_BUSINESS_CASE: AISANode = {
  id: 'p1-d3-sa6-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Drafting the Business Case Document',
  description: 'Assemble all value assessment outputs into a structured Business Case document suitable for board or executive investment approval.',
  purpose: 'Produce a complete, persuasive Business Case that meets the organisation\'s governance requirements for investment approval.',
  why_it_matters: 'The Business Case is the authorisation document for the entire project. A weak Business Case leads to deferred decisions, reduced scope, or unfunded mandates. A strong one secures the budget, the sponsor commitment, and the organisational mandate to proceed.',
  methods: [
    '1. Executive Summary (1 page): state the problem, the proposed solution approach, the investment required, the payback period, and the recommendation.',
    '2. Problem Statement reference: link to or summarise the approved Problem Statement from D2.',
    '3. Value Analysis: present cost reduction, revenue upside, risk reduction, and strategic value — with the ROI model.',
    '4. Investment Required: build cost, operating cost, team and governance costs.',
    '5. Risks and Mitigations: top 5 risks to value delivery and their mitigations.',
    '6. Recommendation and Decision Required: state what decision you need from the board/sponsor, by when, and what will happen if not approved.',
    '7. Keep the main document to 8–12 pages. Detailed models go in appendices.',
  ],
  tools: ['Business Case template', 'All D3 SA1–SA5 outputs', 'Risk register'],
  outputs: ['Business Case draft (8–12 pages) ready for executive review'],
  exit_criteria: ['Draft contains all six sections; executive summary is decision-ready; ROI model is in appendix'],
}

const T_DRAFT_BUSINESS_CASE: AISANode = {
  id: 'p1-d3-sa6-t1',
  type: 'task',
  level: 4,
  title: 'Draft the Business Case',
  description: 'Assemble all value elements into a structured Business Case document ready for executive review.',
  purpose: 'Produce the investment approval document for the initiative.',
  inputs: ['All D3 SA1–SA5 outputs', 'Problem Statement from D2', 'Risk register', 'Business Case template'],
  methods: ['Structured document assembly', 'Executive summary writing', 'Risk and mitigation articulation'],
  tools: ['Business Case template'],
  outputs: ['Business Case draft'],
  children: [EG_DRAFT_BUSINESS_CASE],
}

const EG_APPROVE_BUSINESS_CASE: AISANode = {
  id: 'p1-d3-sa6-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Securing Business Case Approval',
  description: 'Navigate the organisation\'s investment governance process to obtain formal approval of the Business Case and release of project funding.',
  purpose: 'Secure the organisational mandate and funding authority to proceed with Phase 2 and beyond.',
  why_it_matters: 'Approval is not a formality — it is the moment that converts stakeholder interest into organisational commitment. Managing the approval process well determines whether the project proceeds on time, with the right budget, and with the right level of executive engagement.',
  methods: [
    '1. Identify who has investment approval authority for this budget level: team leader, director, C-suite, or board committee.',
    '2. Understand the approval process: what documents are required, what format, what timeframe.',
    '3. Pre-brief the Finance team and the Executive Sponsor before the formal review to resolve objections in advance.',
    '4. Present the Business Case in the required format and forum.',
    '5. Obtain written approval or a decision memo confirming approval.',
    '6. Confirm: approved budget amount, approved scope, approval conditions (if any), and the reporting requirements post-approval.',
    '7. Communicate approval to the full project team and initiate Phase 2.',
  ],
  tools: ['Business Case document', 'Finance pre-brief deck', 'Approval governance process documentation'],
  outputs: ['Business Case approval — written record of decision, approved budget, and confirmed scope'],
  exit_criteria: ['Written approval received; approved budget confirmed; scope agreed; Phase 2 initiation authorised'],
}

const T_APPROVE_BUSINESS_CASE: AISANode = {
  id: 'p1-d3-sa6-t2',
  type: 'task',
  level: 4,
  title: 'Secure Business Case Approval',
  description: 'Navigate the approval governance process to obtain formal investment authorisation and release of funding.',
  purpose: 'Convert stakeholder interest into organisational mandate and budget.',
  inputs: ['Business Case document', 'Approval governance process', 'Finance and Sponsor pre-brief'],
  methods: ['Pre-brief management', 'Formal presentation', 'Approval and documentation'],
  tools: ['Business Case document', 'Approval governance documentation'],
  outputs: ['Written approval; confirmed budget and scope; Phase 2 initiation authorisation'],
  children: [EG_APPROVE_BUSINESS_CASE],
}

const SA6_BUSINESS_CASE: AISANode = {
  id: 'p1-d3-sa6',
  type: 'sub-activity',
  level: 3,
  title: 'Build Business Case',
  description: 'Assemble all value analysis outputs into a formal Business Case document and navigate the organisational approval process to secure investment mandate.',
  purpose: 'Produce the formal investment approval document and obtain the organisational mandate to proceed.',
  why_it_matters: 'The Business Case is the gateway to the rest of the project. Without formal approval, the project risks scope instability, funding gaps, and lack of executive commitment at critical decision points in later phases.',
  inputs: ['All SA1–SA5 value analysis outputs', 'Problem Statement from D2', 'Risk register', 'Finance input on hurdle rate and process'],
  questions: ['Does the Business Case meet the investment governance requirements?', 'Have all objections been pre-resolved?', 'Is the ROI case conservative enough to survive scrutiny?'],
  methods: ['Document assembly', 'Executive summary writing', 'Pre-briefing and approval navigation'],
  tools: ['Business Case template', 'Finance pre-brief deck'],
  outputs: ['Approved Business Case v1.0', 'Confirmed budget and scope authorisation'],
  deliverables: ['Business Case (Phase 1 Deliverable)', 'Investment Approval Record'],
  exit_criteria: ['Business Case approved in writing; budget confirmed; scope agreed; Phase 2 initiation authorised'],
  children: [T_DRAFT_BUSINESS_CASE, T_APPROVE_BUSINESS_CASE],
}

// ═══════════════════════════════════════════════════════════════════════
// D3 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D3: AISANode = {
  id: 'p1-d3',
  type: 'activity',
  level: 2,
  title: 'D3 — Business Value Assessment',
  description: 'Build a comprehensive, multi-dimensional analysis of the business value the AI initiative will deliver, and assemble it into a formally approved Business Case that secures investment mandate.',
  purpose: 'Quantify the total value the initiative will deliver — cost reduction, revenue upside, risk reduction, and strategic value — and use it to obtain formal investment approval.',
  why_it_matters: 'AI projects without rigorous value cases invite perpetual scope and budget challenges. A strong Business Case sets the project on a firm financial footing, defines the ROI benchmark for post-delivery measurement, and gives the executive sponsor the evidence they need to protect the project at board level.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Problem Statement from D2', 'Pain point list with quantified impact', 'Preliminary cost estimates (will be refined in Phase 3)', 'Organisation strategic plan and financial hurdle rate'],
  questions: [
    'What is the total annual value this initiative will deliver?',
    'When does the investment pay back?',
    'What risks does the current state expose the organisation to, and how much does AI reduce them?',
    'How does this initiative advance the organisation\'s strategy?',
    'Does the Business Case meet the investment governance requirements?',
  ],
  activities: [
    'Quantify labour cost savings from automation and augmentation',
    'Calculate error and rework cost savings',
    'Identify and size revenue growth opportunities',
    'Assess compliance and regulatory risk reduction value',
    'Evaluate strategic fit and capability-building value',
    'Build a 3-year ROI model with scenarios and sensitivity analysis',
    'Draft and obtain approval of the Business Case',
  ],
  methods: ['Labour savings modelling', 'Error cost quantification', 'Revenue opportunity analysis', 'Expected value risk calculation', 'Strategic alignment mapping', '3-year NPV/ROI modelling', 'Business Case drafting and governance navigation'],
  tools: ['Labour savings calculator', 'Error cost model', 'Revenue opportunity model', 'Risk register', 'ROI financial model', 'Business Case template'],
  governance_considerations: 'The Business Case must confirm the AI system\'s EU AI Act risk classification and include the estimated compliance cost (Art. 16 obligations for High Risk systems) in the investment total. Failing to include compliance cost understates TCI.',
  ai_engineering_considerations: 'At Business Value Assessment stage, avoid over-promising AI performance. ROI models should use conservative automation rates (50–70% for structured tasks, 30–50% for unstructured tasks) validated against published industry benchmarks, not vendor claims.',
  outputs: ['Cost reduction analysis', 'Revenue opportunity model', 'Risk reduction analysis', 'Strategic value assessment', 'ROI financial model', 'Approved Business Case v1.0'],
  deliverables: ['Business Case (signed off)', 'ROI Estimate', 'Investment Approval Record'],
  exit_criteria: [
    'Business Case approved in writing by Executive Sponsor and Finance',
    'Budget confirmed and allocated to the project',
    'All value elements are quantified with documented assumptions',
    'ROI model reviewed and accepted by Finance',
    'Phase 2 initiation formally authorised',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'HBR: Making the Business Case for AI', type: 'paper' },
    { title: 'PMBOK: Business Case and Benefits Management', type: 'framework' },
    { title: 'EU AI Act Art. 9 — Risk Management System', type: 'standard' },
  ],
  children: [SA1_COST_REDUCTION, SA2_REVENUE, SA3_RISK_REDUCTION, SA4_STRATEGIC, SA5_ROI, SA6_BUSINESS_CASE],
}
