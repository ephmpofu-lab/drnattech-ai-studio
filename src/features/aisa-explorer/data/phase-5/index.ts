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

const B1: AISANode = {
  id: 'p5-b1', type: 'activity', level: 2,
  title: 'B1 — Build Ingestion Layer',
  description: 'Design and implement all input interfaces, validation logic, normalisation pipelines, and persistence mechanisms that accept data into the AI system from external sources.',
  purpose: 'Ensure all data entering the AI system is structurally valid, semantically clean, securely received, and durably stored before any downstream processing.',
  why_it_matters: 'Garbage in, garbage out. A robust ingestion layer prevents corrupt or malicious inputs from propagating through the system.',
  principles_applied: ['Privacy and Ethics by Design', 'Minimum Viable Complexity'],
  inputs: ['Data contract specifications', 'Source system APIs', 'Schema registry', 'Security policy'],
  outputs: ['Operational ingestion endpoints', 'Validated data store', 'Ingestion test results'],
  children: [
    sa('p5-b1-sa1', 'Interface Creation', 'Build HTTP, event-stream, file-upload, and webhook interfaces to receive inputs from all defined sources.', 'Interfaces define the contract between external producers and the AI system; badly designed interfaces create permanent technical debt.',
      [
        task('p5-b1-sa1-t1', 'Design endpoint contracts', 'Define OpenAPI/AsyncAPI contracts for every ingestion interface.', ['Source system specs', 'Data contract docs'],
          eg('p5-b1-sa1-t1-eg', 'Write OpenAPI schema for each endpoint', 'Document request/response schemas, authentication headers, rate-limit headers, and error codes for every interface.', ['OpenAPI 3.1 spec authoring', 'Schema registry registration'], ['OpenAPI spec files', 'Registered schema versions'])),
        task('p5-b1-sa1-t2', 'Implement interfaces', 'Code the endpoint handlers for REST, GraphQL, or event-stream inputs.', ['OpenAPI spec', 'Auth provider credentials'],
          eg('p5-b1-sa1-t2-eg', 'Implement and smoke-test each handler', 'Code handler functions, wire authentication middleware, run unit smoke tests against mock payloads confirming 200 and 4xx responses.', ['Framework routing (FastAPI/Express/etc.)', 'Auth middleware', 'Unit test runner'], ['Working endpoint handlers', 'Unit test pass report'])),
      ]),
    sa('p5-b1-sa2', 'Validation Implementation', 'Implement schema, business-rule, and referential-integrity checks on all ingested data.', 'Validation catches structural and semantic errors at the boundary, preventing corrupt data from reaching models or databases.',
      [
        task('p5-b1-sa2-t1', 'Implement schema validation', 'Validate JSON/XML/CSV payloads against registered schemas before acceptance.', ['Schema registry', 'Sample valid/invalid payloads'],
          eg('p5-b1-sa2-t1-eg', 'Wire schema validator to each endpoint', 'Integrate Pydantic/Zod/JSON Schema validator; return RFC-7807 problem detail on failure; log rejected payloads with reason code.', ['Pydantic / Zod / AJV', 'Structured logging'], ['Validation middleware', 'Rejection log schema'])),
        task('p5-b1-sa2-t2', 'Implement business-rule validation', 'Check domain invariants (e.g., date ranges, enum membership, cross-field consistency) beyond schema.', ['Business rules doc', 'Domain glossary'],
          eg('p5-b1-sa2-t2-eg', 'Code rule-engine checks', 'Implement rule functions per domain entity; unit-test each rule with boundary values; integrate into validation pipeline.', ['Rule engine (Drools / custom)', 'Boundary-value test matrix'], ['Rule functions', 'Business-rule test results'])),
      ]),
    sa('p5-b1-sa3', 'Data Normalisation', 'Transform validated raw inputs into the canonical internal data format expected by downstream components.', 'Normalisation decouples upstream data quirks from internal processing logic, enabling independent evolution of both.',
      [
        task('p5-b1-sa3-t1', 'Build transformation pipeline', 'Implement field mapping, type coercion, encoding normalisation, and null-handling transformations.', ['Canonical schema', 'Source-to-target field mapping'],
          eg('p5-b1-sa3-t1-eg', 'Implement and test transformation functions', 'Write transformation functions per source type; test with golden-set inputs and expected canonical outputs; log transformation errors separately from validation errors.', ['ETL / mapping library', 'Golden-set test fixtures'], ['Transformation functions', 'Transformation test report'])),
      ]),
    sa('p5-b1-sa4', 'Raw Data Persistence', 'Store all accepted raw and normalised data durably before processing to enable replay and audit.', 'Raw persistence creates an audit trail and allows re-processing without re-ingestion when pipeline logic changes.',
      [
        task('p5-b1-sa4-t1', 'Implement raw store writes', 'Write normalised records to the designated raw data store (object storage, streaming log, or database).', ['Storage provisioning outputs', 'Data retention policy'],
          eg('p5-b1-sa4-t1-eg', 'Wire persistence layer with idempotency keys', 'Implement write functions with idempotency keys to prevent duplicates on retry; verify write durability with round-trip read; confirm retention policy tags applied.', ['Object storage / database SDK', 'Idempotency key strategy'], ['Persisted raw records', 'Idempotency validation results'])),
      ]),
    sa('p5-b1-sa5', 'Input Security Controls', 'Apply authentication, authorisation, rate-limiting, and payload-size controls at ingestion interfaces.', 'Security at the ingestion boundary prevents abuse, data poisoning, and unauthorised access before any expensive processing occurs.',
      [
        task('p5-b1-sa5-t1', 'Implement auth and rate limiting', 'Enforce API key / OAuth2 / mTLS authentication and per-client rate limits on all ingestion endpoints.', ['Auth provider config', 'Rate-limit policy'],
          eg('p5-b1-sa5-t1-eg', 'Configure auth middleware and rate-limit rules', 'Wire authentication middleware; configure token bucket or sliding-window rate limiter; return 401/429 with Retry-After header; smoke-test with valid and invalid credentials.', ['OAuth2 / API key middleware', 'Rate-limit library (e.g., Redis-based)'], ['Auth-protected endpoints', 'Rate-limit test evidence'])),
      ]),
    sa('p5-b1-sa6', 'Ingestion Testing', 'Execute functional, load, and failure-mode tests on the complete ingestion pipeline end-to-end.', 'Testing confirms the pipeline handles normal, edge-case, and adversarial inputs correctly under realistic load.',
      [
        task('p5-b1-sa6-t1', 'Run ingestion test suite', 'Execute unit, integration, and load tests covering valid payloads, schema violations, oversized payloads, and duplicate submissions.', ['Test harness', 'Load generator'],
          eg('p5-b1-sa6-t1-eg', 'Execute and document ingestion test results', 'Run test suite; capture pass/fail per scenario; measure p95 latency under load; document defects found; confirm all acceptance criteria met before sign-off.', ['pytest / Jest', 'k6 / Locust load generator', 'Test report template'], ['Ingestion test results report', 'Defect log'])),
      ]),
  ],
}

const B2: AISANode = {
  id: 'p5-b2', type: 'activity', level: 2,
  title: 'B2 — Build Data Layer',
  description: 'Implement the data storage, retrieval, indexing, and caching components that serve structured and unstructured data to AI processing components.',
  purpose: 'Provide reliable, performant, and consistent data access to all AI pipeline components while enforcing data contracts and access controls.',
  principles_applied: ['Minimum Viable Complexity', 'Technology Serves Architecture'],
  inputs: ['Data model from Phase 4', 'Access control matrix', 'Performance SLOs'],
  outputs: ['Operational data stores', 'Query interfaces', 'Data layer test results'],
  children: [
    sa('p5-b2-sa1', 'Storage Implementation', 'Build and configure all relational, vector, document, and key-value stores defined in the data architecture.', 'Each storage type serves different access patterns; correct implementation prevents performance bottlenecks.',
      [
        task('p5-b2-sa1-t1', 'Provision and configure data stores', 'Apply infrastructure-as-code configs to provision all required databases and confirm connectivity.', ['IaC scripts', 'Connection credentials'],
          eg('p5-b2-sa1-t1-eg', 'Run IaC and validate store health', 'Execute Terraform/Pulumi; run connectivity checks; confirm schema migrations applied; verify backup and replication settings match architecture decision records.', ['Terraform / Pulumi', 'Database migration tool (Flyway/Alembic)', 'Health-check script'], ['Provisioned data stores', 'Migration completion report'])),
        task('p5-b2-sa1-t2', 'Implement data access layer', 'Write repository/DAO classes that encapsulate all queries and mutations against each store.', ['Data model', 'ORM / query builder choice'],
          eg('p5-b2-sa1-t2-eg', 'Build and unit-test repository classes', 'Implement CRUD and query methods; write unit tests with seeded test data; confirm N+1 query absence; check query plans for full-table scans.', ['ORM (SQLAlchemy/Prisma/etc.)', 'Query plan analyser'], ['Repository classes', 'Unit test pass report', 'Query plan review'])),
      ]),
    sa('p5-b2-sa2', 'Vector Store Implementation', 'Build embedding ingestion pipelines and similarity-search interfaces for all vector stores.', 'Vector stores are the retrieval backbone of RAG systems; correct indexing parameters directly affect answer quality.',
      [
        task('p5-b2-sa2-t1', 'Implement embedding pipeline and index', 'Build the pipeline that generates embeddings from source documents and upserts them into the vector store with metadata.', ['Embedding model endpoint', 'Chunking strategy', 'Vector store connection'],
          eg('p5-b2-sa2-t1-eg', 'Run embedding pipeline on representative corpus', 'Embed a representative document set; upsert with metadata filters; run test similarity queries; measure recall@k against known relevant pairs.', ['Embedding model SDK', 'Vector DB client (Pinecone/Weaviate/pgvector)', 'Recall evaluation script'], ['Populated vector index', 'Recall@k benchmark results'])),
      ]),
    sa('p5-b2-sa3', 'Caching Implementation', 'Implement response and intermediate-result caches to reduce latency and LLM call costs.', 'Caching reduces per-request cost and latency for repeated or similar queries, directly impacting operating costs.',
      [
        task('p5-b2-sa3-t1', 'Build semantic and exact-match cache', 'Implement Redis-based exact-match cache and optional semantic cache for near-duplicate queries.', ['Redis connection', 'Cache TTL policy'],
          eg('p5-b2-sa3-t1-eg', 'Implement and validate cache hit/miss behaviour', 'Code cache middleware; seed test queries; confirm cache hits return within SLO latency; confirm TTL eviction works; measure cache hit rate on realistic query set.', ['Redis client', 'Semantic similarity cache library', 'Cache hit-rate measurement'], ['Operational cache layer', 'Cache hit-rate benchmark'])),
      ]),
  ],
}

const B3: AISANode = {
  id: 'p5-b3', type: 'activity', level: 2,
  title: 'B3 — Build Child Workflows',
  description: 'Implement all orchestrated sub-workflows, parallel processing branches, and conditional execution paths that execute within the main AI pipeline.',
  purpose: 'Decompose complex AI pipelines into testable, independently deployable workflow units that compose cleanly.',
  principles_applied: ['Minimum Viable Complexity', 'Technology Serves Architecture'],
  inputs: ['Workflow DAG from Phase 3', 'Orchestration platform config', 'Interface contracts between workflows'],
  outputs: ['Deployed child workflow definitions', 'Workflow integration test results'],
  children: [
    sa('p5-b3-sa1', 'Workflow Coding', 'Implement each child workflow as a versioned, idempotent orchestration unit.', 'Idempotent workflows allow safe retry without duplicate side effects, critical for reliable AI pipeline operations.',
      [
        task('p5-b3-sa1-t1', 'Implement workflow steps', 'Code each workflow step with inputs, outputs, retry logic, and timeout configuration.', ['Workflow DAG spec', 'Orchestration SDK docs'],
          eg('p5-b3-sa1-t1-eg', 'Code and locally execute workflow unit', 'Implement step functions; configure retry/backoff; run local execution with mock step inputs; confirm output shape matches downstream contract.', ['Temporal / Prefect / Airflow / LangGraph SDK', 'Mock step harness'], ['Implemented workflow steps', 'Local execution trace'])),
        task('p5-b3-sa1-t2', 'Implement error and compensation paths', 'Code saga-style compensation or fallback steps for failure scenarios in each workflow.', ['Failure scenario matrix', 'Compensation design'],
          eg('p5-b3-sa1-t2-eg', 'Test compensation paths under simulated failures', 'Inject failures at each step; confirm compensation steps execute; verify system reaches consistent state; log compensation actions for audit.', ['Fault-injection harness', 'Workflow audit log'], ['Compensation step code', 'Failure-path test results'])),
      ]),
    sa('p5-b3-sa2', 'Workflow Integration', 'Wire child workflows into the parent orchestrator and validate end-to-end execution.', 'Integration validates that workflow composition behaves correctly when real data and real dependencies are in play.',
      [
        task('p5-b3-sa2-t1', 'Integrate and run end-to-end workflow test', 'Connect child workflows to parent; run an end-to-end execution with representative input data; validate final output.', ['Parent orchestrator config', 'Integration test dataset'],
          eg('p5-b3-sa2-t1-eg', 'Execute full pipeline and verify outputs', 'Trigger parent workflow with test payload; trace each child workflow execution; confirm output assertions pass; check execution time against SLO.', ['Orchestration platform UI / CLI', 'Integration assertion script'], ['End-to-end workflow trace', 'Integration test pass report'])),
      ]),
  ],
}

const B4: AISANode = {
  id: 'p5-b4', type: 'activity', level: 2,
  title: 'B4 — Build APIs',
  description: 'Implement all internal and external APIs that expose AI system capabilities to consumers, including synchronous REST/GraphQL and asynchronous event-driven interfaces.',
  purpose: 'Provide well-documented, versioned, and secured programmatic access to AI system capabilities for human clients and downstream services.',
  principles_applied: ['Technology Serves Architecture', 'Minimum Viable Complexity'],
  inputs: ['API design from Phase 3', 'Consumer requirements', 'Auth service config'],
  outputs: ['Deployed API endpoints', 'API documentation', 'API test results'],
  children: [
    sa('p5-b4-sa1', 'API Implementation', 'Code all API route handlers, request parsing, response serialisation, and error handling.', 'Clean API implementation isolates consumer contracts from internal implementation details.',
      [
        task('p5-b4-sa1-t1', 'Implement route handlers', 'Write handlers for all defined API operations including input parsing, service delegation, and response formatting.', ['OpenAPI spec', 'Service layer interfaces'],
          eg('p5-b4-sa1-t1-eg', 'Implement handlers and confirm spec conformance', 'Code handlers; run schemathesis or Dredd contract tests against live endpoints; fix any spec divergence; confirm all defined status codes reachable.', ['FastAPI / Express / etc.', 'Schemathesis / Dredd contract tester'], ['Route handler code', 'Contract test results'])),
        task('p5-b4-sa1-t2', 'Implement async response patterns', 'Build polling or webhook-callback patterns for long-running AI operations.', ['Long-running operation design', 'Webhook consumer specs'],
          eg('p5-b4-sa1-t2-eg', 'Test async operation lifecycle', 'Submit long-running request; confirm 202 Accepted with job ID; poll status endpoint; confirm final result retrievable; test webhook delivery with mock consumer.', ['Job queue (Celery/BullMQ)', 'Webhook test consumer'], ['Async operation handlers', 'Async lifecycle test results'])),
      ]),
    sa('p5-b4-sa2', 'API Documentation and Versioning', 'Publish interactive API documentation and implement versioning strategy.', 'Self-service documentation reduces onboarding friction for API consumers and reduces support burden.',
      [
        task('p5-b4-sa2-t1', 'Publish API docs and version policy', 'Deploy Swagger UI / Redoc with the OpenAPI spec; document versioning and deprecation policy.', ['OpenAPI spec', 'Docs hosting platform'],
          eg('p5-b4-sa2-t1-eg', 'Verify docs completeness and accuracy', 'Deploy docs; manually verify each endpoint example executes correctly from the docs UI; confirm version header / URL versioning works; document sunset dates for deprecated versions.', ['Swagger UI / Redoc', 'OpenAPI validator'], ['Live API documentation', 'Versioning policy document'])),
      ]),
  ],
}

const B5: AISANode = {
  id: 'p5-b5', type: 'activity', level: 2,
  title: 'B5 — Build Integrations',
  description: 'Implement all integrations with external systems — CRMs, ERPs, knowledge bases, communication platforms, and third-party AI services — defined in the integration architecture.',
  purpose: 'Enable the AI system to exchange data with the ecosystem of tools it must interoperate with to deliver business value.',
  principles_applied: ['Technology Serves Architecture', 'Business Value First'],
  inputs: ['Integration map from Phase 3', 'Third-party API credentials', 'Data transformation specs'],
  outputs: ['Operational integration connectors', 'Integration test results', 'Runbook for each integration'],
  children: [
    sa('p5-b5-sa1', 'Connector Implementation', 'Build client adapters for each external system, encapsulating authentication, retry, and data mapping.', 'Adapter pattern isolates external system quirks from the AI system core, limiting blast radius of external API changes.',
      [
        task('p5-b5-sa1-t1', 'Implement external system adapters', 'Code adapter classes for each third-party system with auth refresh, rate-limit handling, and error mapping.', ['Third-party API docs', 'Auth credentials'],
          eg('p5-b5-sa1-t1-eg', 'Test adapters against live sandboxes', 'Run each adapter against the provider sandbox; confirm auth token refresh; trigger a rate-limit and confirm back-off; map provider error codes to internal error types.', ['Provider sandbox credentials', 'HTTP client with retry (tenacity/axios-retry)'], ['Adapter classes', 'Sandbox test results per integration'])),
      ]),
    sa('p5-b5-sa2', 'Integration Testing', 'Run end-to-end integration tests confirming bi-directional data flow with each external system.', 'Integration tests are the only reliable way to catch provider-side schema drift and auth edge cases.',
      [
        task('p5-b5-sa2-t1', 'Run integration test suite', 'Execute tests that send and receive real data through each adapter against sandbox environments.', ['Integration test suite', 'Sandbox environments'],
          eg('p5-b5-sa2-t1-eg', 'Document integration test outcomes', 'Run test suite; record pass/fail per adapter; capture response payloads for baseline; document any sandbox limitations that require production verification.', ['Integration test runner', 'Response capture tool'], ['Integration test report', 'Known sandbox limitation log'])),
      ]),
  ],
}

const B6: AISANode = {
  id: 'p5-b6', type: 'activity', level: 2,
  title: 'B6 — Prompt Engineering',
  description: 'Design, implement, version, and evaluate all system prompts, few-shot examples, chain-of-thought templates, and structured-output schemas used by the AI system.',
  purpose: 'Produce prompts that reliably elicit correct, safe, and well-formatted model outputs across the full range of expected inputs.',
  principles_applied: ['Evidence-Based Decision Making', 'Business Value First', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Functional requirements', 'Model selection', 'Output format specs', 'Safety constraints'],
  outputs: ['Versioned prompt library', 'Prompt evaluation results', 'Prompt regression test suite'],
  children: [
    sa('p5-b6-sa1', 'Prompt Design and Iteration', 'Draft, test, and iterate system and user prompt templates to achieve target model behaviours.', 'Prompt design is an empirical discipline; systematic iteration with evaluation prevents over-fitting to a small test set.',
      [
        task('p5-b6-sa1-t1', 'Draft and baseline initial prompts', 'Write system prompt and few-shot examples; run against baseline evaluation set; record initial metric scores.', ['Output format specs', 'Evaluation dataset', 'Model access'],
          eg('p5-b6-sa1-t1-eg', 'Run baseline evaluation and document scores', 'Submit prompts to model with evaluation inputs; score outputs on accuracy, format compliance, and safety criteria; record as baseline in prompt registry.', ['LLM API', 'Evaluation harness (RAGAS / custom)', 'Prompt registry (LangSmith / PromptLayer / git)'], ['Baseline prompt versions', 'Baseline evaluation scores'])),
        task('p5-b6-sa1-t2', 'Iterate prompts to hit acceptance criteria', 'Modify prompts based on failure analysis; re-evaluate until acceptance thresholds are met.', ['Baseline scores', 'Failure analysis from baseline run'],
          eg('p5-b6-sa1-t2-eg', 'Document prompt iterations and final scores', 'For each iteration: log the change rationale, re-run evaluation, record delta from baseline; stop when all acceptance criteria met or escalate if plateau reached.', ['A/B prompt comparison tool', 'Iteration log template'], ['Final prompt versions', 'Iteration log', 'Acceptance evaluation report'])),
      ]),
    sa('p5-b6-sa2', 'Prompt Versioning and Governance', 'Store all prompts in a version-controlled registry with metadata, owner, and evaluation linkage.', 'Prompt versioning enables rollback, A/B comparison, and audit — treating prompts as code rather than tribal knowledge.',
      [
        task('p5-b6-sa2-t1', 'Register prompts with metadata', 'Store each prompt with version, owner, linked evaluation run ID, and approved-for-production flag.', ['Prompt registry', 'Evaluation run IDs'],
          eg('p5-b6-sa2-t1-eg', 'Confirm registry entries and approval workflow', 'Create registry entry per prompt; link evaluation run; set approval status; confirm retrieval by version ID; document the promotion-to-production workflow.', ['Prompt registry (LangSmith / git + metadata file)', 'Approval workflow'], ['Registered prompt library', 'Promotion workflow documentation'])),
      ]),
    sa('p5-b6-sa3', 'Structured Output and Tool-Call Schemas', 'Define and validate JSON schemas for all structured outputs and tool-call arguments the model must produce.', 'Structured output schemas eliminate fragile regex parsing of model responses and enable reliable downstream consumption.',
      [
        task('p5-b6-sa3-t1', 'Define and test output schemas', 'Write JSON Schema for each structured output type; test model compliance with schema-enforced generation (function calling / constrained decoding).', ['Output format specs', 'Model function-calling docs'],
          eg('p5-b6-sa3-t1-eg', 'Validate schema compliance rate', 'Submit 100+ diverse inputs with schema enforcement active; measure schema violation rate; investigate and fix prompts or schemas for any violation above threshold.', ['Model function-calling / structured outputs API', 'JSON Schema validator', 'Violation analysis script'], ['Output schemas', 'Schema compliance rate report'])),
      ]),
  ],
}

const B7: AISANode = {
  id: 'p5-b7', type: 'activity', level: 2,
  title: 'B7 — Agent Development',
  description: 'Implement the core AI agent: the reasoning loop, planning logic, tool-selection policy, and action-execution harness.',
  purpose: 'Produce an agent that reliably decomposes goals into plans, selects and invokes tools correctly, and terminates gracefully on success or failure.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Business Value First', 'Minimum Viable Complexity'],
  inputs: ['Agent design spec', 'Tool registry', 'Prompt library', 'Guardrail spec'],
  outputs: ['Agent runtime code', 'Agent unit and integration tests', 'Agent capability inventory'],
  children: [
    sa('p5-b7-sa1', 'Reasoning Loop Implementation', 'Implement the think-act-observe cycle (ReAct or equivalent) that drives agent decision making.', 'The reasoning loop is the cognitive core of the agent; bugs here propagate to every capability the agent exercises.',
      [
        task('p5-b7-sa1-t1', 'Implement agent loop', 'Code the ReAct / plan-and-execute loop with step budget, tool dispatch, and observation parsing.', ['Agent design spec', 'LLM client', 'Tool registry'],
          eg('p5-b7-sa1-t1-eg', 'Run agent on benchmark tasks and inspect traces', 'Execute agent on 10 representative benchmark tasks; inspect thought-action-observation traces; confirm tool calls are correct; confirm loop terminates within step budget.', ['LangGraph / AutoGen / custom loop', 'Trace viewer (LangSmith / Phoenix)', 'Benchmark task set'], ['Agent loop implementation', 'Benchmark trace report'])),
        task('p5-b7-sa1-t2', 'Implement step budget and safety stops', 'Enforce maximum step count, token budget, and wall-clock timeout; force graceful termination on budget exhaustion.', ['Step budget policy', 'Safety constraints'],
          eg('p5-b7-sa1-t2-eg', 'Verify termination under budget exhaustion', 'Run agent on tasks designed to exceed step budget; confirm graceful termination message returned; confirm no partial tool calls left dangling; confirm cost accounting records budget overage.', ['Step counter', 'Token tracker', 'Timeout handler'], ['Budget enforcement code', 'Termination behaviour test results'])),
      ]),
    sa('p5-b7-sa2', 'Planning Logic', 'Implement task decomposition and plan generation for multi-step goals.', 'Explicit planning enables the agent to handle complex goals systematically rather than greedily.',
      [
        task('p5-b7-sa2-t1', 'Implement plan generator', 'Code the planner that decomposes a goal into an ordered list of sub-tasks with dependencies.', ['Planning prompt', 'Goal taxonomy'],
          eg('p5-b7-sa2-t1-eg', 'Test plan quality on representative goals', 'Submit 20 representative goals to planner; evaluate plan completeness and ordering; score against expert reference plans; iterate prompt if score below threshold.', ['Planner prompt', 'Expert reference plans', 'Plan quality rubric'], ['Planner implementation', 'Plan quality evaluation results'])),
      ]),
  ],
}

const B8: AISANode = {
  id: 'p5-b8', type: 'activity', level: 2,
  title: 'B8 — Memory Implementation',
  description: 'Implement short-term (in-context), episodic (session), and long-term (persistent) memory stores for the AI agent.',
  purpose: 'Enable the agent to maintain context within sessions and accumulate knowledge across sessions without relying solely on the LLM context window.',
  principles_applied: ['Privacy and Ethics by Design', 'Minimum Viable Complexity'],
  inputs: ['Memory architecture spec', 'Data retention policy', 'User consent framework'],
  outputs: ['Memory subsystem', 'Memory test results', 'Retention enforcement evidence'],
  children: [
    sa('p5-b8-sa1', 'Short-Term Memory', 'Implement conversation buffer and summarisation to manage the LLM context window within a session.', 'Unmanaged context windows overflow silently, dropping early conversation content and breaking agent coherence.',
      [
        task('p5-b8-sa1-t1', 'Implement context window manager', 'Build a buffer that tracks token usage and triggers summarisation or trimming before the context limit is reached.', ['LLM token limit', 'Summarisation prompt'],
          eg('p5-b8-sa1-t1-eg', 'Test context window management under long conversations', 'Simulate 50-turn conversation; confirm buffer summarises before hitting limit; verify agent retains key facts after summarisation; measure accuracy degradation.', ['Token counter', 'Summarisation LLM call', 'Long-conversation test harness'], ['Context window manager', 'Accuracy-under-summarisation test results'])),
      ]),
    sa('p5-b8-sa2', 'Long-Term Memory', 'Implement persistent memory store where the agent writes and retrieves facts across sessions.', 'Long-term memory enables personalisation and continuity across sessions, a key differentiator for agent-based products.',
      [
        task('p5-b8-sa2-t1', 'Implement memory write and retrieval', 'Build write (extract-and-store) and read (query-and-inject) operations against the long-term memory store.', ['Memory store (vector DB or graph DB)', 'Extraction prompt'],
          eg('p5-b8-sa2-t1-eg', 'Test memory round-trip and privacy controls', 'Write 20 test memory facts; query each back; confirm retrieval accuracy; test user deletion request removes all associated memories; confirm retention TTL enforced.', ['Memory store client', 'Extraction prompt', 'Privacy deletion script'], ['Long-term memory subsystem', 'Memory round-trip test results', 'Privacy control verification'])),
      ]),
  ],
}

const B9: AISANode = {
  id: 'p5-b9', type: 'activity', level: 2,
  title: 'B9 — Tool Integration',
  description: 'Implement all tool functions (code interpreter, web search, database query, file operations, external APIs) that the agent can invoke, with schemas, execution sandboxes, and output parsers.',
  purpose: 'Provide the agent with a reliable, safe, and well-described set of actions it can take in the world.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design', 'Minimum Viable Complexity'],
  inputs: ['Tool registry spec', 'Sandbox infrastructure', 'Tool permission policy'],
  outputs: ['Implemented and tested tool functions', 'Tool schema registry', 'Tool execution audit log'],
  children: [
    sa('p5-b9-sa1', 'Tool Function Implementation', 'Code each tool function with input validation, sandboxed execution, output normalisation, and error handling.', 'Poorly implemented tools are a primary attack surface for prompt injection and unintended side effects.',
      [
        task('p5-b9-sa1-t1', 'Implement tool functions and schemas', 'Code each tool with a matching JSON Schema describing arguments; register in the tool registry.', ['Tool spec', 'Sandbox config'],
          eg('p5-b9-sa1-t1-eg', 'Unit-test each tool with valid and adversarial inputs', 'Write unit tests per tool covering: valid args, missing required args, oversized inputs, injection payloads; confirm each error returns a structured error object, not a stack trace.', ['Tool test harness', 'Injection payload library'], ['Tool function code', 'Tool schemas', 'Unit test results per tool'])),
        task('p5-b9-sa1-t2', 'Implement tool execution sandbox', 'Execute code-interpreter and shell tools inside isolated containers or VMs with network egress restrictions.', ['Sandbox infrastructure', 'Network policy'],
          eg('p5-b9-sa1-t2-eg', 'Verify sandbox isolation', 'Attempt network egress from sandbox; attempt file-system access outside allowed paths; confirm both are blocked; measure sandbox cold-start latency.', ['Container runtime (Docker / Firecracker)', 'Network policy enforcer', 'Isolation test script'], ['Sandbox execution environment', 'Isolation verification report'])),
      ]),
  ],
}

const B10: AISANode = {
  id: 'p5-b10', type: 'activity', level: 2,
  title: 'B10 — Agent-to-Agent Communication',
  description: 'Implement protocols and routing for multi-agent systems where a supervisor agent delegates sub-tasks to specialist worker agents.',
  purpose: 'Enable complex problem decomposition across specialised agents while maintaining a coherent audit trail and consistent error handling.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Minimum Viable Complexity'],
  inputs: ['Multi-agent topology from Phase 3', 'Agent communication protocol spec', 'Shared tool registry'],
  outputs: ['Agent communication layer', 'Multi-agent integration tests', 'Delegation audit log'],
  children: [
    sa('p5-b10-sa1', 'Supervisor-Worker Protocol', 'Implement the message envelope, task delegation, result aggregation, and error propagation between supervisor and worker agents.', 'A well-defined delegation protocol prevents task loss and ensures the supervisor can attribute results and errors to specific workers.',
      [
        task('p5-b10-sa1-t1', 'Implement delegation and result-collection', 'Code supervisor logic to dispatch tasks to workers, await results with timeout, and aggregate or escalate failures.', ['Communication protocol spec', 'Worker agent interfaces'],
          eg('p5-b10-sa1-t1-eg', 'Run multi-agent collaboration scenario', 'Execute a representative multi-step task requiring at least 2 worker agents; trace delegation messages; confirm results aggregated correctly; simulate worker timeout and confirm supervisor handles gracefully.', ['Agent communication bus', 'Trace viewer', 'Timeout simulation'], ['Supervisor-worker protocol code', 'Multi-agent trace report'])),
      ]),
  ],
}

const B11: AISANode = {
  id: 'p5-b11', type: 'activity', level: 2,
  title: 'B11 — Guardrails Implementation',
  description: 'Implement input and output guardrails that detect and block policy violations including harmful content, PII leakage, off-topic requests, and prompt injection attempts.',
  purpose: 'Enforce safety and compliance constraints at runtime, independent of model behaviour, as a defence-in-depth layer.',
  principles_applied: ['Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design'],
  inputs: ['Guardrail policy from Phase 2', 'Classifier models or rule sets', 'PII detection library'],
  outputs: ['Guardrail middleware', 'Guardrail test results', 'Policy violation log'],
  children: [
    sa('p5-b11-sa1', 'Input Guardrails', 'Scan all user inputs for prompt injection, jailbreak attempts, prohibited topics, and PII before they reach the model.', 'Input guardrails are the first line of defence; blocking at input is cheaper and more reliable than correcting model outputs.',
      [
        task('p5-b11-sa1-t1', 'Implement input screening pipeline', 'Wire PII detector, injection classifier, and topic classifier to the input path; configure block vs. warn thresholds.', ['Guardrail policy', 'Classifier models'],
          eg('p5-b11-sa1-t1-eg', 'Test guardrail recall against attack corpus', 'Run guardrail pipeline against an injection attack corpus and a benign query corpus; measure true positive rate (recall) on attacks and false positive rate on benign queries; tune thresholds to meet policy targets.', ['NeMo Guardrails / Guardrails.ai / custom classifiers', 'Attack corpus (OWASP LLM Top 10 test cases)', 'Metrics dashboard'], ['Input guardrail pipeline', 'Recall/precision calibration report'])),
      ]),
    sa('p5-b11-sa2', 'Output Guardrails', 'Scan all model outputs for harmful content, PII, hallucinated facts, and off-policy responses before delivery to users.', 'Output guardrails catch cases where the model bypasses input guardrails or produces unsafe content from seemingly benign inputs.',
      [
        task('p5-b11-sa2-t1', 'Implement output screening pipeline', 'Apply content safety, PII redaction, and factual grounding checks to all model outputs; block or redact on violation.', ['Output policy', 'Factual grounding check'],
          eg('p5-b11-sa2-t1-eg', 'Verify output guardrail coverage', 'Submit outputs known to contain PII, harmful content, and hallucinations; confirm each is caught and handled per policy; measure latency added by guardrail layer.', ['Content safety API (Azure / AWS / NeMo)', 'PII redactor', 'Latency profiler'], ['Output guardrail pipeline', 'Coverage test results', 'Latency impact report'])),
      ]),
  ],
}

const B12: AISANode = {
  id: 'p5-b12', type: 'activity', level: 2,
  title: 'B12 — Observability Implementation',
  description: 'Instrument the AI system with traces, metrics, logs, and LLM-specific telemetry (token counts, latency, cost, quality scores) and wire dashboards and alerts.',
  purpose: 'Provide complete operational visibility enabling rapid diagnosis of failures, performance degradation, and cost anomalies.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated'],
  inputs: ['Observability stack from Phase 4', 'SLO definitions', 'Alert routing policy'],
  outputs: ['Instrumented application code', 'Operational dashboards', 'Alert definitions'],
  children: [
    sa('p5-b12-sa1', 'Trace and Log Instrumentation', 'Add distributed tracing spans and structured log events to every request path and AI operation.', 'Distributed tracing is essential for diagnosing latency and failures across multi-step AI pipelines.',
      [
        task('p5-b12-sa1-t1', 'Instrument code with traces and structured logs', 'Add OpenTelemetry spans to all service boundaries; emit structured JSON logs with correlation IDs at every significant event.', ['OpenTelemetry SDK', 'Trace collector endpoint'],
          eg('p5-b12-sa1-t1-eg', 'Verify trace completeness on representative request', 'Submit a representative request; pull the trace from the collector; confirm spans exist for ingestion, LLM call, tool calls, and response; confirm correlation IDs propagate.', ['Jaeger / Tempo trace viewer', 'Correlation ID propagation checker'], ['Instrumented codebase', 'Trace completeness verification report'])),
      ]),
    sa('p5-b12-sa2', 'LLM-Specific Metrics', 'Capture per-request token counts, model latency, cost, guardrail trigger rates, and output quality scores.', 'LLM cost and quality metrics are unique to AI systems and not captured by standard APM tools.',
      [
        task('p5-b12-sa2-t1', 'Implement LLM telemetry pipeline', 'Capture model response metadata; compute cost from token counts and model pricing; emit to metrics store; build dashboard.', ['Model pricing config', 'Metrics store (Prometheus/InfluxDB)', 'Dashboard tool (Grafana)'],
          eg('p5-b12-sa2-t1-eg', 'Validate dashboard accuracy against known-cost requests', 'Submit requests with known token counts; verify dashboard cost matches manual calculation; confirm p50/p95 latency panels update; confirm quality score trend visible.', ['Prometheus + Grafana', 'LLM cost calculator', 'Quality score emitter'], ['LLM telemetry pipeline', 'Operational dashboards', 'Dashboard accuracy validation'])),
      ]),
    sa('p5-b12-sa3', 'Alerting', 'Define and deploy alerts for SLO breaches, error rate spikes, cost anomalies, and guardrail trigger rate changes.', 'Alerts ensure the operations team is notified before users are impacted or costs spiral.',
      [
        task('p5-b12-sa3-t1', 'Define and test alert rules', 'Write alert rules for each SLO and anomaly condition; route to PagerDuty / Slack; fire test alerts to confirm routing.', ['SLO definitions', 'Alert routing policy'],
          eg('p5-b12-sa3-t1-eg', 'Confirm alert firing and routing', 'Manually trigger threshold breaches; confirm alert fires within SLO response time; confirm correct channel and owner notified; confirm alert auto-resolves when condition clears.', ['Grafana Alerting / PagerDuty / Opsgenie', 'Alert test runner'], ['Alert rule definitions', 'Alert routing test evidence'])),
      ]),
  ],
}

const B13: AISANode = {
  id: 'p5-b13', type: 'activity', level: 2,
  title: 'B13 — Error Handling and Resilience',
  description: 'Implement retry logic, circuit breakers, graceful degradation, and user-facing error messages across all AI system components.',
  purpose: 'Ensure the AI system degrades gracefully under partial failures rather than failing catastrophically or silently.',
  principles_applied: ['Minimum Viable Complexity', 'Business Value First'],
  inputs: ['Failure mode analysis from Phase 3', 'SLO definitions', 'User experience spec'],
  outputs: ['Resilience patterns implemented', 'Error handling test results', 'User-facing error message catalogue'],
  children: [
    sa('p5-b13-sa1', 'Retry and Circuit Breaker Patterns', 'Implement exponential back-off retry and circuit breaker for all external calls (LLM API, tool calls, integrations).', 'Unmanaged external call failures cascade into system-wide outages; circuit breakers limit blast radius.',
      [
        task('p5-b13-sa1-t1', 'Implement retry and circuit breaker', 'Add retry middleware with jitter and circuit breaker to all external HTTP and gRPC calls.', ['Retry policy config', 'External dependency list'],
          eg('p5-b13-sa1-t1-eg', 'Simulate downstream failures and verify behaviour', 'Use fault-injection proxy to introduce 50% error rate on each external dependency; confirm retry fires; confirm circuit breaker opens after threshold; confirm half-open probe restores service.', ['Toxiproxy / Chaos Monkey', 'Retry library (tenacity / resilience4j)', 'Circuit breaker library'], ['Retry and circuit breaker middleware', 'Resilience test results'])),
      ]),
    sa('p5-b13-sa2', 'Graceful Degradation', 'Implement fallback responses and reduced-functionality modes that keep the system partially operational during component failures.', 'Graceful degradation maintains user trust by providing partial value instead of total failure.',
      [
        task('p5-b13-sa2-t1', 'Implement fallback responses', 'Define and implement fallback responses for each critical dependency failure (e.g., cached last response, deterministic rule-based reply).', ['Fallback spec', 'Cache layer'],
          eg('p5-b13-sa2-t1-eg', 'Test fallback activation', 'Disable each critical dependency; confirm fallback activates; confirm fallback response is coherent and labelled as degraded; confirm monitoring registers degraded state.', ['Dependency kill switch', 'Fallback response validator', 'Degraded-state alert'], ['Fallback response handlers', 'Degradation test results'])),
      ]),
  ],
}

const B14: AISANode = {
  id: 'p5-b14', type: 'activity', level: 2,
  title: 'B14 — Code Review and Merge',
  description: 'Execute structured peer review, static analysis, security scanning, and formal merge approval for all Phase 5 implementation code before promotion to integration.',
  purpose: 'Ensure all implemented code meets quality, security, and maintainability standards before it enters the shared codebase.',
  principles_applied: ['Evidence-Based Decision Making', 'Human Accountability Cannot Be Delegated'],
  inputs: ['All Phase 5 code branches', 'Code review checklist', 'Security scan toolchain', 'Definition of Done'],
  outputs: ['Merged, reviewed codebase', 'Review records', 'Security scan results', 'Merge approval records'],
  children: [
    sa('p5-b14-sa1', 'Peer Review', 'Conduct structured code review by at least one peer for every pull request.', 'Peer review catches logic errors, design issues, and knowledge-sharing gaps that automated tools miss.',
      [
        task('p5-b14-sa1-t1', 'Execute code review process', 'Assign reviewers, complete review checklist, record comments and resolutions, obtain approval.', ['Code review checklist', 'PR diff'],
          eg('p5-b14-sa1-t1-eg', 'Complete review and document outcomes', 'Reviewer completes checklist; author addresses all blocking comments; reviewer approves; all comment threads resolved; review record archived.', ['GitHub / GitLab PR review', 'Code review checklist template'], ['Approved pull requests', 'Review comment resolution record'])),
      ]),
    sa('p5-b14-sa2', 'Static Analysis', 'Run linters, type checkers, code-coverage checks, and complexity metrics on all new code.', 'Automated static analysis enforces standards consistently and catches classes of defect that human reviewers routinely miss.',
      [
        task('p5-b14-sa2-t1', 'Run and gate on static analysis', 'Execute linter, type checker, and coverage tool in CI; block merge if any gate fails.', ['CI pipeline', 'Static analysis config'],
          eg('p5-b14-sa2-t1-eg', 'Confirm CI gates block non-compliant PRs', 'Introduce a deliberate type error; confirm CI fails and blocks merge; fix error; confirm CI passes; check coverage meets minimum threshold.', ['ESLint / Ruff / mypy', 'Coverage tool (pytest-cov / Jest)', 'CI pipeline config'], ['Clean static analysis reports', 'CI gate evidence'])),
      ]),
    sa('p5-b14-sa3', 'Security Review', 'Run SAST, dependency vulnerability scan, and secrets detection on all new code.', 'Security issues are cheapest to fix before merge; automated scanning catches the most common categories.',
      [
        task('p5-b14-sa3-t1', 'Run SAST and dependency scan', 'Execute SAST tool and dependency vulnerability scanner; review findings; block merge on high/critical findings.', ['SAST tool config', 'Vulnerability database'],
          eg('p5-b14-sa3-t1-eg', 'Confirm security gates and remediation', 'Run scanner; triage all findings; remediate or accept-risk with approval for each; confirm no high/critical open findings before merge approval.', ['Semgrep / Bandit / CodeQL', 'Snyk / OWASP Dependency-Check', 'Secrets scanner (truffleHog / detect-secrets)'], ['SAST scan report', 'Dependency vulnerability report', 'Security finding disposition record'])),
      ]),
    sa('p5-b14-sa4', 'Merge Approval', 'Obtain formal merge sign-off from tech lead or designated approver after all review gates pass.', 'Formal merge approval creates an accountable record that human oversight was applied before code entered the main branch.',
      [
        task('p5-b14-sa4-t1', 'Obtain and record merge approval', 'Tech lead reviews all gate results; approves merge; merge recorded with approver ID and timestamp.', ['All review and scan results', 'Merge approval policy'],
          eg('p5-b14-sa4-t1-eg', 'Complete merge and archive approval record', 'Tech lead confirms all gates passed; approves in PR tool; merge executed; approval record (approver, timestamp, gate summary) archived to audit log.', ['PR approval tool', 'Audit log'], ['Merged code', 'Merge approval audit record'])),
      ]),
  ],
}

export const PHASE_5: AISANode = {
  id: 'phase-5', type: 'phase', level: 1,
  title: 'Phase 5 — Build & Implement',
  description: 'Transform architecture designs and platform foundations into working, tested, and instrumented AI system components. Phase 5 covers all engineering implementation: ingestion, data, workflows, APIs, integrations, prompts, agents, memory, tools, guardrails, observability, and resilience.',
  purpose: 'Produce a fully implemented, peer-reviewed, and observable AI system ready for validation in Phase 6.',
  why_it_matters: 'Implementation quality determines system reliability, security, and maintainability. Disciplined build practices — with guardrails, observability, and code review — prevent the majority of production incidents.',
  principles_applied: ['Business Value First', 'Human Accountability Cannot Be Delegated', 'Privacy and Ethics by Design', 'Minimum Viable Complexity', 'Technology Serves Architecture', 'Evidence-Based Decision Making'],
  inputs: ['Phase 3 Architecture designs', 'Phase 4 Platform infrastructure', 'Data contracts', 'Security policies', 'Guardrail policies'],
  outputs: ['Implemented AI system components', 'Instrumented codebase', 'Reviewed and merged code', 'Component test results'],
  deliverables: ['Working ingestion layer', 'Operational data layer', 'Agent runtime', 'Prompt library', 'Guardrail middleware', 'Observability dashboards', 'Code review records'],
  exit_criteria: ['All B1–B14 activities complete', 'Zero open high/critical security findings', 'All component tests passing', 'Observability dashboards operational', 'All code peer-reviewed and merged'],
  children: [B1, B2, B3, B4, B5, B6, B7, B8, B9, B10, B11, B12, B13, B14],
}
