import type { AISANode, NodeIndex } from '@/types/aisa'
import { PHASE_1 } from './phase-1/index'
import { PHASE_2 } from './phase-2/index'
import { PHASE_3 } from './phase-3/index'
import { PHASE_4 } from './phase-4/index'
import { PHASE_5 } from './phase-5/index'
import { PHASE_6 } from './phase-6/index'
import { PHASE_7 } from './phase-7/index'
import { PHASE_8 } from './phase-8/index'
import { PHASE_9 } from './phase-9/index'

export const AISA_FRAMEWORK: AISANode = {
  id: 'aisa-framework',
  type: 'framework',
  level: 0,
  title: 'AISA — AI Solutions Architecture',
  description: 'The AI Solutions Architecture (AISA) methodology provides a structured, governance-first framework for designing, building, and operating responsible AI systems in enterprise environments.',
  purpose: 'Guide organisations from AI opportunity identification through to operational AI systems — ensuring every implementation is technically sound, legally compliant, ethically defensible, and commercially valuable.',
  why_it_matters: 'AI initiatives without a structured methodology accumulate governance debt, legal exposure, and technical fragility. AISA converts AI ambition into accountable, sustainable AI capability.',
  principles_applied: [
    'Business Value First',
    'Human Accountability Cannot Be Delegated',
    'Privacy and Ethics by Design',
    'Minimum Viable Complexity',
    'Technology Serves Architecture',
    'Evidence-Based Decision Making',
  ],
  activities: [
    'Phase 1 — Discovery & Business Analysis (D1–D11)',
    'Phase 2 — Governance & Risk Assessment (G1–G11)',
    'Phase 3 — Architecture Design (A1–A13)',
    'Phase 4 — Platform & Data Foundation (P1–P15)',
    'Phase 5 — Build & Implement (B1–B14)',
    'Phase 6 — Validate & Assure (V1–V12)',
    'Phase 7 — Deploy & Release (Dp1–Dp10)',
    'Phase 8 — Operate, Observe & Govern (O1–O11)',
    'Phase 9 — Optimise & Scale (S1–S12)',
  ],
  outputs: [
    'Phase 1 Close-Out Report and Phase 2 Authorisation',
    'Phase 2 Governance Pack and Phase 3 Architecture Requirements',
    'Phase 3 Architecture Package and Phase 4 Build Authorisation',
    'Phase 5 Implemented AI system components',
    'Phase 6 Validation evidence package and deployment authorisation',
    'Phase 7 Running production system with operations handover',
    'Phase 8 Continuous monitoring, governance, and compliance operations',
    'Phase 9 Optimised system and updated strategic roadmap',
  ],
  deliverables: [
    '100+ structured deliverables across 9 phases',
    'Full EU AI Act and GDPR compliance evidence pack',
    'Operational AI system with established governance cadence',
    'Continuous improvement framework closing the build-operate-optimise loop',
  ],
  children: [PHASE_1, PHASE_2, PHASE_3, PHASE_4, PHASE_5, PHASE_6, PHASE_7, PHASE_8, PHASE_9],
}

// ─── Build NodeIndex for O(1) lookup, breadcrumbs, and search ─────────

function buildIndex(root: AISANode): NodeIndex {
  const byId = new Map<string, AISANode>()
  const parentOf = new Map<string, string>()
  const childrenOf = new Map<string, string[]>()
  const all: AISANode[] = []

  function walk(node: AISANode, parentId?: string) {
    byId.set(node.id, node)
    all.push(node)
    if (parentId) parentOf.set(node.id, parentId)
    const kids = node.children ?? []
    childrenOf.set(node.id, kids.map(c => c.id))
    for (const child of kids) walk(child, node.id)
  }

  walk(root)
  return { byId, parentOf, childrenOf, all }
}

export const NODE_INDEX: NodeIndex = buildIndex(AISA_FRAMEWORK)

export function getBreadcrumb(id: string): AISANode[] {
  const path: AISANode[] = []
  let current: string | undefined = id
  while (current) {
    const node = NODE_INDEX.byId.get(current)
    if (node) path.unshift(node)
    current = NODE_INDEX.parentOf.get(current)
  }
  return path
}

export function getChildren(id: string): AISANode[] {
  const ids = NODE_INDEX.childrenOf.get(id) ?? []
  return ids.map(i => NODE_INDEX.byId.get(i)!).filter(Boolean)
}

export { PHASE_1, PHASE_2, PHASE_3, PHASE_4, PHASE_5, PHASE_6, PHASE_7, PHASE_8, PHASE_9 }
