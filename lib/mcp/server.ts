/**
 * MCP Server for Outpace Systems Design System
 *
 * Exposes component information to AI agents via Model Context Protocol.
 *
 * Tools:
 * - list_components: Get all components with metadata
 * - get_component: Get detailed info about a specific component
 * - query_components: Search components by semantic query
 *
 * Resources:
 * - components://registry: Full component registry
 * - components://[name]: Individual component manifest
 */

import {
  getRegistry,
  getManifest,
  getComponentNames,
  queryComponents,
  formatForLLM,
  type QueryOptions,
  type ComponentManifest,
} from '../registry';

/**
 * MCP Tool definitions for AI agents
 */
export const tools = {
  /**
   * List all available components
   */
  list_components: {
    name: 'list_components',
    description: 'Get a list of all available components in the design system',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['action', 'form', 'navigation', 'overlay', 'feedback', 'layout', 'display'],
          description: 'Filter by component category',
        },
        includeDetails: {
          type: 'boolean',
          description: 'Include full component details (default: false for summary only)',
        },
      },
    },
    handler: (params: { category?: string; includeDetails?: boolean }) => {
      const components = params.category
        ? queryComponents({ category: params.category as QueryOptions['category'] }).components
        : getRegistry().components;

      if (params.includeDetails) {
        return components;
      }

      return components.map((c: ComponentManifest) => ({
        name: c.name,
        category: c.category,
        description: c.description,
        tags: c.tags,
      }));
    },
  },

  /**
   * Get detailed information about a specific component
   */
  get_component: {
    name: 'get_component',
    description: 'Get detailed information about a specific component including props, examples, and accessibility',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Component name (e.g., "Button", "Input")',
        },
        format: {
          type: 'string',
          enum: ['full', 'llm'],
          description: 'Response format: "full" for complete manifest, "llm" for LLM-optimized format',
        },
      },
      required: ['name'],
    },
    handler: (params: { name: string; format?: 'full' | 'llm' }) => {
      if (params.format === 'llm') {
        const response = formatForLLM(params.name);
        if (!response) {
          return { error: `Component "${params.name}" not found` };
        }
        return response;
      }

      const manifest = getManifest(params.name);
      if (!manifest) {
        return { error: `Component "${params.name}" not found` };
      }
      return manifest;
    },
  },

  /**
   * Search components by natural language query
   */
  query_components: {
    name: 'query_components',
    description: 'Search for components using natural language. Examples: "show status", "collect user input", "display notifications"',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Natural language description of what you need',
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Filter by specific tags',
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results (default: 5)',
        },
      },
      required: ['query'],
    },
    handler: (params: { query: string; tags?: string[]; limit?: number }) => {
      const result = queryComponents({
        semantic: params.query,
        tags: params.tags,
        limit: params.limit || 5,
      });

      return {
        components: result.components.map((c) => ({
          name: c.name,
          description: c.description,
          useWhen: c.useWhen,
          importPath: c.importPath,
          example: c.examples[0]?.code,
        })),
        total: result.total,
        suggestions: result.suggestions,
      };
    },
  },
};

/**
 * MCP Resource definitions
 */
export const resources = {
  /**
   * Full component registry
   */
  'components://registry': {
    uri: 'components://registry',
    name: 'Component Registry',
    description: 'Complete registry of all design system components',
    mimeType: 'application/json',
    handler: () => JSON.stringify(getRegistry(), null, 2),
  },

  /**
   * Individual component (dynamic)
   */
  getComponent: (name: string) => ({
    uri: `components://${name}`,
    name: `${name} Component`,
    description: `Manifest for the ${name} component`,
    mimeType: 'application/json',
    handler: () => {
      const manifest = getManifest(name);
      if (!manifest) {
        return JSON.stringify({ error: `Component "${name}" not found` });
      }
      return JSON.stringify(manifest, null, 2);
    },
  }),
};

/**
 * Get all available resource URIs
 */
export function listResources(): string[] {
  return [
    'components://registry',
    ...getComponentNames().map((name) => `components://${name}`),
  ];
}

/**
 * Server info for MCP
 */
export const serverInfo = {
  name: 'outpace-systems',
  version: '0.0.1',
  description: 'AI-first design system - query components, get usage examples, and build UIs',
  capabilities: {
    tools: Object.keys(tools),
    resources: true,
  },
};
