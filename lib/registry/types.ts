import type { ComponentManifest, ComponentCategory } from '../../packages/systems/src/types/manifest';

export type { ComponentManifest, ComponentCategory };

/**
 * Full component registry
 */
export interface ComponentRegistry {
  version: string;
  components: ComponentManifest[];
}

/**
 * Query options for searching components
 */
export interface QueryOptions {
  /** Search by semantic description (natural language) */
  semantic?: string;
  /** Filter by category */
  category?: ComponentCategory;
  /** Filter by tags (OR matching) */
  tags?: string[];
  /** Limit number of results */
  limit?: number;
}

/**
 * Result from a component query
 */
export interface QueryResult {
  /** Matching components */
  components: ComponentManifest[];
  /** Natural language suggestions */
  suggestions?: string[];
  /** Total count of matches */
  total: number;
}

/**
 * LLM-optimized response format
 */
export interface LLMResponse {
  /** Component name */
  component: string;
  /** Import statement */
  importStatement: string;
  /** Brief summary */
  summary: string;
  /** Minimal usage example */
  minimalExample: string;
  /** Full example with all features */
  fullExample: string;
  /** Props as markdown table */
  propsTable: string;
  /** When to use */
  whenToUse: string[];
  /** Alternative components */
  alternatives: Array<{ component: string; reason: string }>;
  /** Accessibility notes */
  a11yNotes: string[];
}
