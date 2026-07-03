import type { AISANode } from '@/types/aisa'

// ═══════════════════════════════════════════════════════════════════════
// D4 — PROCESS MAPPING
// ═══════════════════════════════════════════════════════════════════════

// ─── SA1: Document AS-IS Process ──────────────────────────────────────

const EG_PROCESS_WALKTHROUGH: AISANode = {
  id: 'p1-d4-sa1-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Conducting the Process Walkthrough',
  description: 'Observe and document the end-to-end AS-IS process by walking through it step-by-step with the Process Owner and representative practitioners.',
  purpose: 'Capture the real process — not the documented policy version — by direct observation and practitioner walkthrough.',
  why_it_matters: 'Documented procedures and real-world processes diverge significantly in most organisations. The AS-IS process map must reflect reality, not the policy manual. AI trained or designed on the policy process will fail in production because it will encounter the real one.',
  methods: [
    '1. Arrange a process walkthrough session with the Process Owner and 1–2 practitioners who execute the process daily.',
    '2. Begin with: "Walk me through the process from the very beginning. What triggers it? What is the first thing you do?"',
    '3. Capture each step in a swim-lane diagram as the walkthrough proceeds. Note: role, action, system used, input, output.',
    '4. At each step, probe: "What happens if the input is wrong? What do you do manually that the system can\'t do? How long does this take?"',
    '5. Do not correct or suggest improvements during the walkthrough — capture what happens, not what should happen.',
    '6. Identify where the process varies: different practitioners doing the same step differently, workarounds, shadow tools.',
    '7. After the walkthrough, create the draft swim-lane diagram and return to the practitioners for validation.',
  ],
  tools: ['Process mapping tool (Visio, Lucidchart, or Miro)', 'Swim-lane template', 'Process walkthrough notes'],
  outputs: ['Draft AS-IS process swim-lane diagram, validated by Process Owner and practitioners'],
  exit_criteria: ['AS-IS diagram covers end-to-end process from trigger to output; validated by Process Owner and at least one practitioner'],
}

const T_PROCESS_WALKTHROUGH: AISANode = {
  id: 'p1-d4-sa1-t1',
  type: 'task',
  level: 4,
  title: 'Conduct Process Walkthrough',
  description: 'Document the real AS-IS process through direct observation and practitioner walkthrough.',
  purpose: 'Capture the process as it actually works, not as it is documented.',
  inputs: ['Process Owner and practitioner contacts', 'Any existing process documentation as starting point only', 'Swim-lane template'],
  methods: ['Process walkthrough session', 'Direct observation', 'Swim-lane diagram construction'],
  tools: ['Process mapping tool', 'Swim-lane template'],
  outputs: ['Draft AS-IS swim-lane diagram validated by practitioners'],
  children: [EG_PROCESS_WALKTHROUGH],
}

const EG_PROCESS_NOTATION: AISANode = {
  id: 'p1-d4-sa1-t2-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Formalising the Process Map in BPMN Notation',
  description: 'Convert the practitioner-validated swim-lane diagram into a formal BPMN process model using standard notation elements.',
  purpose: 'Produce a standardised, formally documented process model that can be used in design sessions, governance reviews, and as a reference artefact throughout the project.',
  why_it_matters: 'Informal swim-lane diagrams are sufficient for discovery but insufficient for design. BPMN notation provides a precise, universally understood language for process steps, gateways, events, and flows — essential when designing AI automation at task level.',
  methods: [
    '1. Map the validated swim-lane elements to BPMN notation: Tasks (rounded rectangles), Events (circles — start, intermediate, end), Gateways (diamonds — XOR, AND, OR), Sequence flows (solid arrows), Message flows (dashed arrows).',
    '2. Assign each task to a pool/lane representing the responsible role.',
    '3. Mark all decision gateways explicitly, with each branch labelled with its condition.',
    '4. Mark system interactions: tasks that involve a system tool should be annotated with the system name.',
    '5. Mark data objects: documents, databases, or datasets consumed or produced.',
    '6. Validate the BPMN diagram with the Process Owner for completeness and accuracy.',
    '7. Export in a standard format (PDF + source file) and store in the project repository.',
  ],
  tools: ['BPMN modelling tool (Camunda Modeler, Bizagi, or Visio BPMN)', 'BPMN 2.0 notation reference'],
  outputs: ['AS-IS BPMN diagram (BPMN 2.0 compliant), stored in project repository'],
  exit_criteria: ['BPMN diagram covers all identified steps; all gateways have labelled branches; diagram validated by Process Owner'],
}

const T_PROCESS_NOTATION: AISANode = {
  id: 'p1-d4-sa1-t2',
  type: 'task',
  level: 4,
  title: 'Formalise Process Map in BPMN',
  description: 'Convert the validated swim-lane diagram into a formal BPMN 2.0 process model.',
  purpose: 'Produce a standardised process model for use in design, governance, and documentation.',
  inputs: ['Validated swim-lane diagram', 'BPMN 2.0 notation reference', 'Process Owner confirmation'],
  methods: ['BPMN element mapping', 'Gateway labelling', 'System and data annotation'],
  tools: ['BPMN modelling tool'],
  outputs: ['AS-IS BPMN diagram (BPMN 2.0)'],
  children: [EG_PROCESS_NOTATION],
}

const SA1_AS_IS: AISANode = {
  id: 'p1-d4-sa1',
  type: 'sub-activity',
  level: 3,
  title: 'Document AS-IS Process',
  description: 'Capture and formalise the real end-to-end current-state process through direct observation and practitioner walkthrough, producing a validated BPMN process model.',
  purpose: 'Establish an accurate, agreed record of how the process actually works before designing how to improve it with AI.',
  why_it_matters: 'The AS-IS process map is the ground truth for AI design. Without it, the system is designed for a hypothetical process. With it, AI augmentation and automation decisions are grounded in the real process flow, including its variations, workarounds, and edge cases.',
  inputs: ['Process Owner and practitioner contacts', 'Existing documentation as reference', 'Process mapping tools'],
  questions: ['What actually triggers this process?', 'What does each step involve, and who does it?', 'Where do workarounds and process variations occur?'],
  methods: ['Process walkthrough', 'Swim-lane diagram construction', 'BPMN formalisation'],
  tools: ['Process mapping tool', 'BPMN modelling tool'],
  outputs: ['Validated swim-lane diagram', 'AS-IS BPMN diagram'],
  deliverables: ['AS-IS Process Map (Phase 1 deliverable)'],
  exit_criteria: ['Process map covers end-to-end; validated by Process Owner and practitioners; BPMN stored in project repository'],
  children: [T_PROCESS_WALKTHROUGH, T_PROCESS_NOTATION],
}

// ─── SA2: Identify Triggers ────────────────────────────────────────────

const EG_TRIGGER_CATALOGUE: AISANode = {
  id: 'p1-d4-sa2-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Cataloguing Process Triggers and Initiating Events',
  description: 'Identify and document every event or condition that causes the process to start, including edge-case and exception triggers.',
  purpose: 'Ensure the AI system is designed to handle all real-world triggering conditions, not just the primary use case.',
  why_it_matters: 'AI systems designed only for the primary trigger fail when edge-case triggers arrive — and in most organisations, edge cases account for 20–30% of volume. Cataloguing all triggers at design time prevents costly production retrofits.',
  methods: [
    '1. Ask the Process Owner: "What starts this process? Is there more than one way it can be triggered?"',
    '2. Probe for: scheduled triggers (time-based), event triggers (a document arriving, a status change, a customer action), manual triggers (someone starts it by decision), and API/system triggers (another system calls this process).',
    '3. For each trigger, document: trigger type, source system or actor, frequency, and whether the trigger carries data that affects how the process should proceed.',
    '4. Assess which triggers the AI system must handle autonomously vs. which should remain human-initiated.',
    '5. Note any trigger conditions that should alert a human rather than auto-start the process.',
  ],
  tools: ['Trigger catalogue template'],
  outputs: ['Trigger catalogue: type, source, frequency, data payload, and AI vs. human handling decision for each trigger'],
  exit_criteria: ['All triggers identified and classified by type; AI vs. human handling decision confirmed by Process Owner'],
}

const T_TRIGGER_CATALOGUE: AISANode = {
  id: 'p1-d4-sa2-t1',
  type: 'task',
  level: 4,
  title: 'Catalogue Process Triggers',
  description: 'Identify and document all events and conditions that initiate the process, including edge cases.',
  purpose: 'Ensure the AI system handles all real-world triggering conditions from design time.',
  inputs: ['Process Owner and practitioner input', 'System event logs if available', 'Trigger catalogue template'],
  methods: ['Trigger type elicitation', 'Frequency profiling', 'AI vs. human handling classification'],
  tools: ['Trigger catalogue template'],
  outputs: ['Trigger catalogue with handling classification'],
  children: [EG_TRIGGER_CATALOGUE],
}

const SA2_TRIGGERS: AISANode = {
  id: 'p1-d4-sa2',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Process Triggers',
  description: 'Catalogue all events and conditions that initiate the process, determine their frequency and data payload, and classify which the AI system should handle autonomously.',
  purpose: 'Ensure the AI system design encompasses all real-world entry points to the process, not just the primary use case.',
  why_it_matters: 'Process trigger completeness is a common gap in AI system design. Systems that only handle the primary trigger encounter unexpected conditions in production and either fail or require constant human intervention at the entry point.',
  inputs: ['Process Owner and practitioner input', 'BPMN start events from SA1', 'System event logs'],
  questions: ['What causes this process to start?', 'Are there multiple triggers?', 'Which triggers should AI handle autonomously vs. flag for human initiation?'],
  methods: ['Trigger type elicitation', 'Frequency and payload profiling', 'AI vs. human handling decision'],
  tools: ['Trigger catalogue template'],
  outputs: ['Trigger catalogue with AI/human handling classification'],
  deliverables: ['Trigger Catalogue (appended to AS-IS Process Map)'],
  exit_criteria: ['All triggers identified; frequency documented; AI vs. human handling confirmed by Process Owner'],
  children: [T_TRIGGER_CATALOGUE],
}

// ─── SA3: Identify Process Activities ─────────────────────────────────

const EG_ACTIVITY_INVENTORY: AISANode = {
  id: 'p1-d4-sa3-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Building the Process Activity Inventory',
  description: 'Create a structured inventory of every activity in the AS-IS process, classifying each by type (cognitive, physical, communicative) and automation potential.',
  purpose: 'Produce the baseline activity inventory that drives AI automation and augmentation design decisions in Phase 3.',
  why_it_matters: 'Activity classification determines AI feasibility. Cognitive tasks with structured inputs are high-automation candidates; judgment-intensive tasks with unstructured inputs require augmentation, not automation. Getting this classification wrong leads to over-ambitious automation scope that fails in production.',
  methods: [
    '1. Extract all activities from the BPMN diagram. Number them sequentially in process order.',
    '2. For each activity, document: name, description, performing role, duration, frequency, system used (if any), input format (structured/unstructured), and output type.',
    '3. Classify each activity by type: (a) Data entry / retrieval — structured data, rule-based; (b) Classification / decision — evaluating information against criteria; (c) Communication — sending or receiving information; (d) Approval / oversight — judgment or sign-off; (e) Exception handling — resolving non-standard situations.',
    '4. Assess automation potential for each: Full (AI handles end-to-end), Assisted (AI prepares, human approves), Monitored (AI flags, human decides), Out of scope (human only, not suitable for AI).',
    '5. Calculate: total activity volume per day/week that falls into each automation category.',
  ],
  tools: ['Activity inventory spreadsheet', 'BPMN diagram from SA1'],
  outputs: ['Activity inventory with type classification and automation potential assessment'],
  exit_criteria: ['All BPMN activities are inventoried and classified; automation potential assigned to each; volume totals calculated per category'],
}

const T_ACTIVITY_INVENTORY: AISANode = {
  id: 'p1-d4-sa3-t1',
  type: 'task',
  level: 4,
  title: 'Build Activity Inventory',
  description: 'Create a structured inventory of all process activities with type classification and automation potential.',
  purpose: 'Produce the activity-level baseline for AI automation and augmentation design in Phase 3.',
  inputs: ['AS-IS BPMN diagram from SA1', 'Process Owner input on activity details', 'Activity inventory template'],
  methods: ['Activity extraction from BPMN', 'Type classification', 'Automation potential assessment'],
  tools: ['Activity inventory spreadsheet'],
  outputs: ['Activity inventory with automation potential classification'],
  children: [EG_ACTIVITY_INVENTORY],
}

const SA3_ACTIVITIES: AISANode = {
  id: 'p1-d4-sa3',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Process Activities',
  description: 'Produce a structured inventory of all process activities, classified by type and automation potential, to drive AI design decisions.',
  purpose: 'Identify which activities are candidates for AI automation, augmentation, or oversight enhancement.',
  why_it_matters: 'AI feasibility lives at the activity level. A process may be technically automatable at high level, but contain activities that require human judgment at a level the AI system cannot reliably replicate. Activity-level classification prevents both under-ambition and over-reaching automation claims.',
  inputs: ['AS-IS BPMN diagram', 'Process Owner knowledge of activity details', 'Activity classification framework'],
  questions: ['What does each activity actually involve?', 'How much does structure vs. judgment drive each task?', 'What automation potential does each activity have?'],
  methods: ['Activity extraction from BPMN', 'Type classification', 'Automation potential assessment', 'Volume calculation by category'],
  tools: ['Activity inventory spreadsheet'],
  outputs: ['Activity inventory with automation potential by category'],
  deliverables: ['Activity Inventory with Automation Potential (input to Phase 3 architecture)'],
  exit_criteria: ['All activities classified; automation potential assigned and volume totals calculated; Process Owner has reviewed'],
  children: [T_ACTIVITY_INVENTORY],
}

// ─── SA4: Identify Decision Points ────────────────────────────────────

const EG_DECISION_CATALOGUE: AISANode = {
  id: 'p1-d4-sa4-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Cataloguing Decision Points and Their Logic',
  description: 'Identify every decision gateway in the process, document the decision criteria, and classify each by AI automability.',
  purpose: 'Produce a decision catalogue that drives AI decision-making design, including where to automate, where to assist, and where to require human override.',
  why_it_matters: 'Decisions are where process quality is determined. AI systems that automate decisions without fully mapping the decision logic produce outputs that are technically fast but operationally incorrect. Decision cataloguing is the prerequisite for trustworthy AI decision support.',
  methods: [
    '1. Extract all gateways from the BPMN diagram. These represent decisions.',
    '2. For each decision, document: the question being decided, the criteria used to decide, who decides, the possible outcomes (branches), and what happens next in each branch.',
    '3. Assess decision logic type: (a) Rule-based (if X then Y) — AI automation candidate; (b) Threshold-based (if value > N) — AI automation candidate; (c) Pattern-based (based on historical similarity) — ML model candidate; (d) Judgment-based (contextual, professional assessment) — AI assist only, human decides.',
    '4. For each decision, assess: what data is needed to make it, whether that data is currently available in structured form, and what the consequences of an incorrect decision are.',
    '5. Produce a decision classification for each gateway: Full AI, AI-Assisted (human confirms), AI-Flagged (human decides with AI context), or Human Only.',
    '6. Identify high-stakes decisions (those where error cost exceeds a threshold) — these require human oversight regardless of AI confidence level.',
  ],
  tools: ['Decision catalogue template', 'BPMN gateway list from SA1'],
  outputs: ['Decision catalogue with logic type, data requirements, AI classification, and oversight requirements for each gateway'],
  exit_criteria: ['All BPMN gateways are catalogued; decision classification assigned; high-stakes decisions identified; Process Owner confirmed'],
}

const T_DECISION_CATALOGUE: AISANode = {
  id: 'p1-d4-sa4-t1',
  type: 'task',
  level: 4,
  title: 'Catalogue Decision Points',
  description: 'Identify all decision gateways, document their logic and data requirements, and classify each for AI automability.',
  purpose: 'Produce the decision catalogue that drives AI decision-support and automation design.',
  inputs: ['BPMN gateway list from SA1', 'Process Owner knowledge of decision criteria', 'Decision catalogue template'],
  methods: ['Gateway extraction from BPMN', 'Decision logic documentation', 'Automability classification', 'High-stakes identification'],
  tools: ['Decision catalogue template'],
  outputs: ['Decision catalogue with AI classification and oversight requirements'],
  children: [EG_DECISION_CATALOGUE],
}

const SA4_DECISIONS: AISANode = {
  id: 'p1-d4-sa4',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Decision Points',
  description: 'Catalogue every decision gateway in the process, document the logic and data requirements, and classify each for AI automation, assistance, or human oversight.',
  purpose: 'Enable AI decision-support design by building a precise catalogue of what each decision requires and how it should be handled.',
  why_it_matters: 'Decision point mapping is the most critical input to responsible AI design. Without it, AI systems either over-automate (replacing human judgment where it is essential) or under-automate (leaving all decisions human-handled). The decision catalogue is the calibration tool.',
  inputs: ['BPMN diagram with gateways', 'Process Owner decision criteria knowledge', 'Regulatory and compliance constraints'],
  questions: ['What are the criteria for each decision?', 'What data is required?', 'What is the consequence of an incorrect decision?', 'Should AI fully automate, assist, or flag for human judgment?'],
  methods: ['Gateway extraction', 'Decision logic mapping', 'Automability and oversight classification'],
  tools: ['Decision catalogue template'],
  governance_considerations: 'For EU AI Act compliance, decisions with significant impact on individuals must have human oversight regardless of AI confidence. These must be identified in the decision catalogue and protected from full automation in system design.',
  outputs: ['Decision catalogue with AI classification and oversight requirements'],
  deliverables: ['Decision Catalogue (input to Phase 3 AI architecture and Phase 2 governance)'],
  exit_criteria: ['All decision gateways catalogued; AI vs. human classification confirmed; high-stakes decisions protected by oversight requirement'],
  children: [T_DECISION_CATALOGUE],
}

// ─── SA5: Identify Exceptions ─────────────────────────────────────────

const EG_EXCEPTION_CATALOGUE: AISANode = {
  id: 'p1-d4-sa5-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Cataloguing Process Exceptions and Edge Cases',
  description: 'Identify and document all exception cases in the current process — situations that fall outside the standard flow and require special handling.',
  purpose: 'Ensure the AI system is designed to handle or escalate exceptions correctly, rather than failing silently or producing incorrect outputs on non-standard inputs.',
  why_it_matters: 'AI systems fail most often on exception cases — inputs that fall outside the training distribution or process variations not reflected in the standard flow. Exception cataloguing at design time prevents the classic AI failure mode of "98% accurate on standard cases, completely broken on the 2% that matter most."',
  methods: [
    '1. Ask practitioners: "What are the cases that don\'t fit the standard process? What do you do when they arrive?"',
    '2. Ask: "What are the most common reasons a case gets escalated or handed to a specialist?"',
    '3. Document each exception: trigger condition, frequency, how it deviates from standard flow, current handling, role responsible.',
    '4. Classify each exception: (a) Handlable by AI (rule applies, decision is clear); (b) Requires escalation to human (ambiguous or high-stakes); (c) Requires specialist (specific domain expertise); (d) System error (data missing or malformed).',
    '5. For each exception, define: what the AI system should do when it encounters this case (handle, escalate, alert).',
    '6. Calculate the volume of exceptions as a percentage of total process volume.',
  ],
  tools: ['Exception catalogue template'],
  outputs: ['Exception catalogue with handling classification and AI response design for each exception type'],
  exit_criteria: ['All common exceptions documented; volume estimated; AI handling decision defined for each; Process Owner validated'],
}

const T_EXCEPTION_CATALOGUE: AISANode = {
  id: 'p1-d4-sa5-t1',
  type: 'task',
  level: 4,
  title: 'Catalogue Process Exceptions',
  description: 'Identify and document all exception cases and edge cases in the process, with AI handling classification.',
  purpose: 'Prevent AI system failures on non-standard inputs by cataloguing exceptions at design time.',
  inputs: ['Practitioner knowledge of exception cases', 'Process error logs if available', 'Exception catalogue template'],
  methods: ['Exception elicitation', 'Frequency estimation', 'AI handling classification'],
  tools: ['Exception catalogue template'],
  outputs: ['Exception catalogue with handling classification'],
  children: [EG_EXCEPTION_CATALOGUE],
}

const SA5_EXCEPTIONS: AISANode = {
  id: 'p1-d4-sa5',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Process Exceptions',
  description: 'Catalogue all exception cases and edge cases in the current process, classify how the AI system should handle or escalate each, and estimate exception volume.',
  purpose: 'Ensure the AI system design explicitly addresses non-standard inputs rather than assuming the standard case is universal.',
  why_it_matters: 'Exception handling is where AI system robustness is proven or broken. The more precisely exceptions are catalogued at design time, the more reliably the system handles the full range of real-world inputs in production.',
  inputs: ['Practitioner knowledge of exceptions', 'Process error and escalation logs', 'Decision catalogue from SA4'],
  questions: ['What are the cases that fall outside the standard process flow?', 'How often do they occur?', 'What should the AI system do when it encounters them?'],
  methods: ['Exception elicitation interviews', 'Frequency estimation', 'AI handling classification (handle, escalate, alert)'],
  tools: ['Exception catalogue template'],
  outputs: ['Exception catalogue with frequency estimates and AI handling classification'],
  deliverables: ['Exception Catalogue (input to Phase 3 AI system design)'],
  exit_criteria: ['All common exceptions documented with frequency estimates and AI handling decisions; Process Owner validated'],
  children: [T_EXCEPTION_CATALOGUE],
}

// ─── SA6: Identify Handoffs ────────────────────────────────────────────

const EG_HANDOFF_MAP: AISANode = {
  id: 'p1-d4-sa6-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Mapping Process Handoffs and Integration Points',
  description: 'Identify every point at which the process passes work between roles, systems, or teams, and document the handoff mechanism and latency.',
  purpose: 'Produce a handoff map that drives integration design and latency reduction decisions in Phase 3.',
  why_it_matters: 'Process handoffs are where delays accumulate and information is lost. AI systems that optimise internal task execution but do not address handoffs deliver less than their potential. Mapping handoffs at process design stage surfaces integration opportunities and latency reduction possibilities.',
  methods: [
    '1. Review the BPMN diagram for sequence flows that cross swim-lane boundaries — each represents a handoff.',
    '2. For each handoff, document: from role/system to role/system, mechanism (email, system notification, manual hand-carry, API call), average latency, and what information is transferred.',
    '3. Identify handoffs that are error-prone (information is often wrong, missing, or misformatted at this point).',
    '4. Identify handoffs that introduce significant latency (waiting for a person to check email, queue in an inbox, or be available).',
    '5. Classify each handoff: (a) Already automated — no change needed; (b) AI-automatable — message routing or data transfer can be automated; (c) Latency reduction opportunity — AI can predict and pre-stage work; (d) Oversight handoff — must remain human (regulatory or governance requirement).',
  ],
  tools: ['Handoff map template', 'BPMN swim-lane diagram from SA1'],
  outputs: ['Handoff map with mechanism, latency, error rate, and AI opportunity classification for each transition'],
  exit_criteria: ['All cross-lane handoffs documented with latency and classification; high-latency and error-prone handoffs identified'],
}

const T_HANDOFF_MAP: AISANode = {
  id: 'p1-d4-sa6-t1',
  type: 'task',
  level: 4,
  title: 'Map Process Handoffs',
  description: 'Document all inter-role and inter-system handoffs, their mechanisms, latency, and AI optimisation potential.',
  purpose: 'Identify where integration and latency reduction opportunities exist for AI augmentation.',
  inputs: ['BPMN swim-lane diagram from SA1', 'Process Owner knowledge of handoff mechanisms', 'Handoff map template'],
  methods: ['Lane boundary identification', 'Handoff mechanism documentation', 'Latency and error profiling', 'Classification'],
  tools: ['Handoff map template'],
  outputs: ['Handoff map with AI opportunity classification'],
  children: [EG_HANDOFF_MAP],
}

const SA6_HANDOFFS: AISANode = {
  id: 'p1-d4-sa6',
  type: 'sub-activity',
  level: 3,
  title: 'Identify Process Handoffs',
  description: 'Map all inter-role and inter-system handoffs in the AS-IS process, documenting mechanisms, latency, and AI automation or optimisation opportunities.',
  purpose: 'Identify integration design opportunities and latency reduction targets for Phase 3 architecture.',
  why_it_matters: 'Handoffs are the connective tissue of a process and often its weakest points. Addressing handoff latency and error through AI integration frequently delivers more value than optimising individual activities, because it compounds across every process cycle.',
  inputs: ['BPMN swim-lane diagram', 'Process Owner knowledge of handoff mechanisms', 'Latency and error rate data'],
  questions: ['Where does work move between people or systems?', 'How much time is lost at each transition?', 'Where is information lost or corrupted at handoff?'],
  methods: ['Lane boundary analysis', 'Handoff mechanism documentation', 'Latency profiling', 'AI opportunity classification'],
  tools: ['Handoff map template'],
  outputs: ['Handoff map with latency, error data, and AI opportunity classification'],
  deliverables: ['Handoff Map (input to Phase 3 integration architecture)'],
  exit_criteria: ['All handoffs documented with latency and classification; high-priority targets identified for Phase 3'],
  children: [T_HANDOFF_MAP],
}

// ─── SA7: Validate Process Map ─────────────────────────────────────────

const EG_VALIDATE_PROCESS: AISANode = {
  id: 'p1-d4-sa7-t1-eg',
  type: 'execution-guide',
  level: 5,
  title: 'EG: Validating and Signing Off the Process Map',
  description: 'Conduct a structured validation session to confirm the complete AS-IS process model is accurate, complete, and agreed by all key process stakeholders.',
  purpose: 'Establish the AS-IS Process Map as a formally validated, signed-off document before Phase 3 architecture design begins.',
  why_it_matters: 'Architecture designed from an invalidated process map is built on contested ground. When disagreements about how the process works surface in Phase 3, they stop architecture work and require expensive re-discovery. Validation in Phase 1 eliminates this risk.',
  methods: [
    '1. Assemble the complete process artefact set: BPMN diagram, trigger catalogue, activity inventory, decision catalogue, exception catalogue, and handoff map.',
    '2. Schedule a validation workshop with the Process Owner, Business Owner, a representative practitioner, and the IT team.',
    '3. Walk through the BPMN diagram systematically. For each activity, decision, and handoff: confirm accuracy with the group.',
    '4. Use a structured challenge format: "Is there any scenario where this step is done differently?" and "Are there any conditions we have not captured?"',
    '5. Log all changes. Update the BPMN and all catalogues to reflect validation feedback.',
    '6. Obtain sign-off: written confirmation from Process Owner and Business Owner that the AS-IS process model is complete and accurate.',
    '7. Version the complete process artefact set as v1.0 and store in the project repository.',
  ],
  tools: ['Complete process artefact set', 'Validation workshop agenda', 'Change log template', 'Project document repository'],
  outputs: ['Validated AS-IS process model v1.0 — signed off and stored in project repository'],
  exit_criteria: ['Validation workshop completed; all changes incorporated; written sign-off from Process Owner and Business Owner; v1.0 stored'],
}

const T_VALIDATE_PROCESS: AISANode = {
  id: 'p1-d4-sa7-t1',
  type: 'task',
  level: 4,
  title: 'Validate and Sign Off Process Map',
  description: 'Conduct a structured workshop to validate the complete AS-IS process model and obtain formal sign-off.',
  purpose: 'Establish the process model as the authoritative reference for Phase 3 architecture design.',
  inputs: ['Complete process artefact set', 'Process Owner, Business Owner, practitioner, and IT contacts', 'Validation workshop agenda'],
  methods: ['Structured walkthrough workshop', 'Challenge and confirmation format', 'Change logging and incorporation'],
  tools: ['Process artefact set', 'Change log template', 'Project repository'],
  outputs: ['Validated AS-IS process model v1.0 — signed off'],
  children: [EG_VALIDATE_PROCESS],
}

const SA7_VALIDATION: AISANode = {
  id: 'p1-d4-sa7',
  type: 'sub-activity',
  level: 3,
  title: 'Validate Process Map',
  description: 'Conduct a structured validation workshop and obtain formal sign-off on the complete AS-IS process model before Phase 3 begins.',
  purpose: 'Ensure the process model used as the design basis for AI architecture is accurate, complete, and formally endorsed.',
  why_it_matters: 'A signed-off process model is one of the strongest predictors of successful AI design. It ensures architecture decisions are made from shared, validated reality — not individual assumptions that diverge when interrogated later.',
  inputs: ['Complete process artefact set', 'All stakeholders who participated in process discovery'],
  questions: ['Is the process model complete?', 'Are there any scenarios or conditions not captured?', 'Do all key stakeholders agree this accurately represents how the process works?'],
  methods: ['Structured validation workshop', 'Systematic challenge protocol', 'Change logging and artefact update', 'Formal sign-off'],
  tools: ['Process artefact set', 'Validation workshop agenda', 'Project document repository'],
  outputs: ['Validated, signed-off AS-IS process model v1.0'],
  deliverables: ['Validated AS-IS Process Model v1.0 (Phase 1 Deliverable)'],
  exit_criteria: ['Workshop completed; all changes incorporated; Process Owner and Business Owner written sign-off; v1.0 stored in repository'],
  children: [T_VALIDATE_PROCESS],
}

// ═══════════════════════════════════════════════════════════════════════
// D4 — ACTIVITY NODE
// ═══════════════════════════════════════════════════════════════════════

export const D4: AISANode = {
  id: 'p1-d4',
  type: 'activity',
  level: 2,
  title: 'D4 — Process Mapping',
  description: 'Document the complete AS-IS process with formal BPMN notation, catalogue all triggers, activities, decisions, exceptions, and handoffs, and produce a validated, signed-off process model as the design foundation for Phase 3 AI architecture.',
  purpose: 'Establish a precise, shared, and formally validated model of the current process that all stakeholders agree represents reality — before AI design begins.',
  why_it_matters: 'Architecture designed from an unmapped or inaccurately mapped process will be misaligned in production. Process Mapping is the phase where the gap between assumption and reality is closed — and closing it here is orders of magnitude cheaper than closing it after architecture decisions are made.',
  principles_applied: ['Minimum Viable Complexity', 'Technology Serves Architecture'],
  inputs: ['Problem Statement from D2', 'Business Value Assessment from D3', 'Process Owner and practitioner contacts', 'Any existing process documentation'],
  questions: [
    'What actually triggers this process, including edge-case triggers?',
    'What does each activity actually involve at the task level?',
    'What are the criteria for each decision, and who makes them?',
    'What are the exception cases and how are they currently handled?',
    'Where does the process hand off between roles or systems, and how much time is lost at each transition?',
  ],
  activities: [
    'Document the AS-IS process through direct observation and practitioner walkthrough',
    'Formalise the process map in BPMN 2.0 notation',
    'Catalogue all process triggers including edge cases',
    'Inventory all activities with type classification and automation potential',
    'Catalogue all decision points with logic type and AI classification',
    'Catalogue all exception cases with frequency and AI handling design',
    'Map all handoffs with latency and integration opportunity assessment',
    'Validate the complete process model and obtain formal sign-off',
  ],
  methods: ['Process walkthrough', 'BPMN 2.0 formalisation', 'Trigger, activity, decision, exception, and handoff cataloguing', 'Structured validation workshop'],
  tools: ['Process mapping tool', 'BPMN modelling tool', 'Activity inventory spreadsheet', 'Decision, trigger, exception, and handoff catalogue templates'],
  governance_considerations: 'Process maps that reveal automated decision-making with significant impact on individuals must be flagged for EU AI Act Art. 13 (transparency) and Art. 14 (human oversight) compliance assessment in Phase 2.',
  ai_engineering_considerations: 'The activity inventory (automation potential) and decision catalogue (logic type) are primary inputs to AI architecture decisions in Phase 3. Resist updating these based on technology capability — what the AI can theoretically do should not be confused with what the process requires.',
  outputs: ['Validated swim-lane diagram', 'AS-IS BPMN diagram v1.0', 'Trigger catalogue', 'Activity inventory with automation potential', 'Decision catalogue with AI classification', 'Exception catalogue', 'Handoff map'],
  deliverables: ['AS-IS Process Map v1.0 (signed off)', 'BPMN Diagram', 'Process Artefact Set'],
  exit_criteria: [
    'AS-IS process model validated and signed off by Process Owner and Business Owner',
    'BPMN diagram stored as v1.0 in project repository',
    'All activities classified with automation potential',
    'All decision points classified for AI vs. human handling',
    'Exception catalogue and handoff map completed',
    'Process model validated in structured workshop with no unresolved disputes',
  ],
  related_phases: ['phase-2', 'phase-3'],
  references: [
    { title: 'BPMN 2.0 Specification — Object Management Group', type: 'standard' },
    { title: 'Business Process Management: Practical Guidelines to Successful Implementations — Jeston & Nelis', type: 'book' },
  ],
  children: [SA1_AS_IS, SA2_TRIGGERS, SA3_ACTIVITIES, SA4_DECISIONS, SA5_EXCEPTIONS, SA6_HANDOFFS, SA7_VALIDATION],
}
