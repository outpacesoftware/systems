import { NextRequest, NextResponse } from 'next/server';
import {
  queryComponents,
  formatForLLM,
  getRegistry,
  getManifest,
  type QueryOptions,
  type ComponentCategory,
} from '@/lib/registry';

/**
 * GET /api/design-system/query
 *
 * Query the design system for components.
 *
 * Query params:
 * - semantic: Natural language search (e.g., "show status", "collect input")
 * - category: Filter by category (action, form, navigation, overlay, feedback, layout, display)
 * - tags: Comma-separated tags to filter by
 * - limit: Max results (default: 10)
 * - name: Get a specific component by name
 * - format: Response format - "full" | "llm" | "summary" (default: summary)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const semantic = searchParams.get('semantic') || undefined;
  const category = searchParams.get('category') as ComponentCategory | null;
  const tagsParam = searchParams.get('tags');
  const tags = tagsParam ? tagsParam.split(',').map((t) => t.trim()) : undefined;
  const limit = parseInt(searchParams.get('limit') || '10', 10);
  const name = searchParams.get('name');
  const format = searchParams.get('format') || 'summary';

  // Get specific component by name
  if (name) {
    if (format === 'llm') {
      const response = formatForLLM(name);
      if (!response) {
        return NextResponse.json(
          { error: `Component "${name}" not found` },
          { status: 404 }
        );
      }
      return NextResponse.json(response);
    }

    const manifest = getManifest(name);
    if (!manifest) {
      return NextResponse.json(
        { error: `Component "${name}" not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(manifest);
  }

  // Query components
  const queryOptions: QueryOptions = {
    semantic,
    category: category || undefined,
    tags,
    limit,
  };

  const result = queryComponents(queryOptions);

  // Format response based on format param
  if (format === 'full') {
    return NextResponse.json(result);
  }

  // Summary format (default)
  return NextResponse.json({
    components: result.components.map((c) => ({
      name: c.name,
      category: c.category,
      description: c.description,
      importPath: c.importPath,
      example: c.examples[0]?.code,
    })),
    total: result.total,
    suggestions: result.suggestions,
  });
}

/**
 * POST /api/design-system/query
 *
 * Query with a JSON body for more complex queries.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { semantic, category, tags, limit = 10, format = 'summary' } = body;

    const queryOptions: QueryOptions = {
      semantic,
      category,
      tags,
      limit,
    };

    const result = queryComponents(queryOptions);

    if (format === 'llm' && result.components.length > 0) {
      // Return LLM-formatted responses for all matching components
      const llmResponses = result.components
        .map((c) => formatForLLM(c.name))
        .filter(Boolean);
      return NextResponse.json({
        components: llmResponses,
        total: result.total,
      });
    }

    if (format === 'full') {
      return NextResponse.json(result);
    }

    return NextResponse.json({
      components: result.components.map((c) => ({
        name: c.name,
        category: c.category,
        description: c.description,
        importPath: c.importPath,
        example: c.examples[0]?.code,
      })),
      total: result.total,
      suggestions: result.suggestions,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
