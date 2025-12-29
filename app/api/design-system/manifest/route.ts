import { NextResponse } from "next/server";
import { getRegistry } from "@/lib/registry";

/**
 * GET /api/design-system/manifest
 *
 * Returns the complete component registry with all manifests.
 * This is the full data export for tools that want to cache
 * or process the entire design system.
 */
export async function GET() {
	const registry = getRegistry();

	return NextResponse.json(registry, {
		headers: {
			"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
		},
	});
}
