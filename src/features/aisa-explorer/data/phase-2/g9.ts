import type { AISANode } from '@/types/aisa'

// ─── G9 — TRAINING AND AWARENESS PROGRAMME ────────────────────────────

const EG_TRAINING_DESIGN: AISANode = {
  id: 'p2-g9-sa1-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Designing the AI Training Programme by Role',
  description: 'Design role-appropriate AI training modules covering AI literacy, system-specific operation, oversight responsibilities, and governance obligations.',
  purpose: 'Ensure every person who interacts with the AI system has the knowledge and skills their role requires — no more, no less.',
  why_it_matters: 'Untrained users of AI systems make two kinds of error: over-trust (accepting outputs without scrutiny) and under-trust (refusing to engage with the system, reverting to manual processes). Training calibrated to role and responsibilities minimises both failure modes.',
  methods: [
    '1. Define training audiences by role: end users (how to use, when to override, what to verify), team leads (performance monitoring, escalation management), AI Product Owner (governance obligations, compliance attestation), IT Operations (system monitoring, incident response). Optional: Ethics committee members (bias monitoring, ethical risk review).',
    '2. For each audience, define training content: AI literacy fundamentals (what AI does and does not do), system-specific operation, the Acceptable Use Policy, the Human Override Procedure, and role-specific responsibilities.',
    '3. Select training format: e-learning modules, in-person workshops, simulated scenarios, or a blended approach. Match format to audience availability and complexity of content.',
    '4. Define training completion requirements: pre-deployment mandatory completion rates (target: 100% for direct users); evidence collection (completion certificates).',
    '5. Define refresher training cadence: annual for all users; immediate when the AI system makes material changes.',
  ],
  tools: ['Training needs analysis template', 'Training design template'],
  outputs: ['Role-based training programme design: audiences, content, format, completion requirements, and refresher cadence'],
  exit_criteria: ['Training designed for all role groups; completion requirements defined; format confirmed feasible; Business Owner approved'],
}

const T_TRAINING_DESIGN: AISANode = {
  id: 'p2-g9-sa1-t1', type: 'task', level: 4,
  title: 'Design Role-Based Training Programme',
  description: 'Design AI training modules for each role group with content, format, completion requirements, and refresher cadence.',
  purpose: 'Ensure every person who interacts with the AI system has the knowledge their role requires.',
  inputs: ['Stakeholder Register from D1', 'AI AUP from G8', 'Human Override Procedure from G8', 'Governance Framework from G6', 'Training design template'],
  methods: ['Audience and content mapping by role', 'Format selection', 'Completion requirement definition', 'Refresher cadence design'],
  tools: ['Training needs analysis template', 'Training design template'],
  outputs: ['Role-based training programme design'],
  children: [EG_TRAINING_DESIGN],
}

const SA1_TRAINING: AISANode = {
  id: 'p2-g9-sa1', type: 'sub-activity', level: 3,
  title: 'Design Training Programme',
  description: 'Design a role-appropriate AI training programme covering AI literacy, system operation, oversight responsibilities, and governance obligations.',
  purpose: 'Build the skills and knowledge that make human oversight of AI practically possible.',
  why_it_matters: 'EU AI Act Art. 16(g) and Art. 26(6) require providers and deployers to take measures to enable their staff to perform AI oversight. Training is the mechanism — without it, oversight obligations exist on paper but not in practice.',
  inputs: ['Stakeholder Register from D1', 'AI AUP and Override Procedure from G8', 'Governance Framework from G6'],
  questions: ['What does each role group need to know?', 'In what format and by when?', 'What evidence of completion is required?'],
  methods: ['Audience and content mapping', 'Format selection', 'Completion and refresh requirement design'],
  tools: ['Training design template'],
  outputs: ['Role-based training programme design'],
  deliverables: ['Training Programme Design (Phase 2 Deliverable)'],
  exit_criteria: ['All role groups have designed training; completion requirements defined; Business Owner approved'],
  children: [T_TRAINING_DESIGN],
}

const EG_AWARENESS: AISANode = {
  id: 'p2-g9-sa2-t1-eg', type: 'execution-guide', level: 5,
  title: 'EG: Building the AI Awareness Campaign',
  description: 'Design a broader organisational awareness campaign that communicates the purpose, capabilities, and limitations of the AI initiative to all staff, not just direct users.',
  purpose: 'Build organisational AI literacy and trust across the wider organisation, reducing speculation and building a culture of informed AI use.',
  why_it_matters: 'AI systems deployed into organisations that do not understand them face silent resistance, speculative fear, and eventually disengagement. Awareness campaigns are an investment in the organisational context that determines whether AI capability translates into organisational capability.',
  methods: [
    '1. Define awareness campaign scope: all staff, not just direct users of the AI system.',
    '2. Design campaign content: what the AI system does (and does not do), why it was implemented, how it benefits the organisation, how users remain in control, how concerns can be raised.',
    '3. Select campaign channels: intranet article, all-hands presentation, FAQ document, video explainer, manager briefing pack.',
    '4. Align campaign timing with the change management programme (G7 SA2): awareness campaign launches 4–6 weeks before go-live.',
    '5. Define campaign success measure: pre/post awareness survey measuring accuracy of AI perception and comfort level.',
  ],
  tools: ['Awareness campaign template'],
  outputs: ['AI Awareness Campaign: content, channels, timeline, and success measure'],
  exit_criteria: ['Campaign content created; channels confirmed; timing aligned with go-live; success measure defined'],
}

const T_AWARENESS: AISANode = {
  id: 'p2-g9-sa2-t1', type: 'task', level: 4,
  title: 'Build AI Awareness Campaign',
  description: 'Design and plan a broader organisational AI awareness campaign for all staff.',
  purpose: 'Build organisational AI literacy and reduce speculative anxiety about the AI initiative.',
  inputs: ['Change management programme from G7', 'Communication plan from G7', 'Awareness campaign template'],
  methods: ['Content design', 'Channel selection', 'Timing alignment with go-live', 'Success measure definition'],
  tools: ['Awareness campaign template'],
  outputs: ['AI Awareness Campaign with content, channels, and timeline'],
  children: [EG_AWARENESS],
}

const SA2_AWARENESS: AISANode = {
  id: 'p2-g9-sa2', type: 'sub-activity', level: 3,
  title: 'Design Awareness Campaign',
  description: 'Design an organisational AI awareness campaign that builds literacy and trust across all staff, not just direct users.',
  purpose: 'Create the organisational AI literacy that makes adoption sustainable.',
  why_it_matters: 'Organisations with broader AI awareness have higher adoption rates, lower resistance, and more effective governance — because more people understand the system they are responsible for overseeing.',
  inputs: ['Change management programme from G7', 'Communication plan from G7'],
  questions: ['What does the broader organisation need to understand?', 'What channels reach all staff?', 'How will awareness be measured?'],
  methods: ['Content design', 'Channel and timing selection', 'Success measure definition'],
  tools: ['Awareness campaign template'],
  outputs: ['AI Awareness Campaign plan'],
  deliverables: ['AI Awareness Campaign Plan (Phase 2 Deliverable)'],
  exit_criteria: ['Campaign content created; channels and timing confirmed; success measure defined'],
  children: [T_AWARENESS],
}

export const G9: AISANode = {
  id: 'p2-g9', type: 'activity', level: 2,
  title: 'G9 — Training and Awareness Programme',
  description: 'Design the role-based training programme and broader awareness campaign that build the AI knowledge and skills the organisation needs to operate and oversee the AI system responsibly.',
  purpose: 'Ensure every person who interacts with or is affected by the AI system has the knowledge, skills, and awareness their role requires.',
  why_it_matters: 'Technical AI governance fails if the humans responsible for exercising it are not equipped to do so. Training and awareness are the infrastructure of human oversight — they make the difference between oversight in principle and oversight in practice.',
  principles_applied: ['Human Accountability Cannot Be Delegated'],
  inputs: ['Stakeholder Register from D1', 'AI AUP and Override Procedure from G8', 'Governance Framework from G6', 'Change Management Programme from G7'],
  questions: ['What does each role group need to know to perform their AI oversight responsibilities?', 'What does the broader organisation need to understand about the AI system?'],
  activities: ['Design role-based training programme with content, format, and completion requirements', 'Design organisational AI awareness campaign'],
  methods: ['Role-based training needs analysis', 'Training module design', 'Awareness campaign design'],
  tools: ['Training design template', 'Awareness campaign template'],
  outputs: ['Role-based training programme design', 'AI Awareness Campaign plan'],
  deliverables: ['Training Programme Design (Phase 2 Deliverable)', 'AI Awareness Campaign Plan (Phase 2 Deliverable)'],
  exit_criteria: ['Training designed for all role groups with completion requirements', 'Awareness campaign content and timeline confirmed'],
  related_phases: ['phase-4'],
  references: [{ title: 'EU AI Act Art. 16(g) and Art. 26(6) — Operator training obligations', type: 'standard' }],
  children: [SA1_TRAINING, SA2_AWARENESS],
}
