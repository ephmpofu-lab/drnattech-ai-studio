export type NodeType =
  | 'framework'
  | 'phase'
  | 'activity'
  | 'sub-activity'
  | 'task'
  | 'execution-guide'

export type NodeLevel = 0 | 1 | 2 | 3 | 4 | 5

export interface Reference {
  title: string
  type: 'book' | 'paper' | 'standard' | 'framework' | 'tool' | 'url'
  url?: string
  author?: string
  year?: number
}

export interface AISANode {
  id: string
  type: NodeType
  level: NodeLevel
  title: string
  description: string
  purpose?: string
  why_it_matters?: string
  principles_applied?: string[]
  inputs?: string[]
  questions?: string[]
  activities?: string[]
  methods?: string[]
  tools?: string[]
  governance_considerations?: string
  security_considerations?: string
  architecture_considerations?: string
  ai_engineering_considerations?: string
  outputs?: string[]
  deliverables?: string[]
  exit_criteria?: string[]
  related_phases?: string[]
  references?: Reference[]
  children?: AISANode[]
}

export interface NodeIndex {
  byId: Map<string, AISANode>
  parentOf: Map<string, string>
  childrenOf: Map<string, string[]>
  all: AISANode[]
}

export interface ExplorerState {
  expandedIds: Set<string>
  selectedId: string | null
  focusedId: string | null
  searchQuery: string
  matchIds: Set<string>
  ancestorIds: Set<string>
}

export type ExplorerAction =
  | { type: 'TOGGLE_EXPAND'; id: string }
  | { type: 'SELECT'; id: string }
  | { type: 'FOCUS'; id: string }
  | { type: 'SEARCH'; query: string }
  | { type: 'EXPAND_ALL' }
  | { type: 'COLLAPSE_ALL' }
  | { type: 'EXPAND_TO_LEVEL'; level: NodeLevel }
