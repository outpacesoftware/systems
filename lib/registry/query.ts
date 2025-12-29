import { getManifest, loadManifests } from "./loader";
import type {
	ComponentCategory,
	ComponentManifest,
	LLMResponse,
	QueryOptions,
	QueryResult,
} from "./types";

/**
 * Search components by various criteria
 */
export function queryComponents(options: QueryOptions = {}): QueryResult {
	const { semantic, category, tags, limit = 10 } = options;
	let components = loadManifests();

	// Filter by category
	if (category) {
		components = components.filter((c) => c.category === category);
	}

	// Filter by tags (OR matching)
	if (tags && tags.length > 0) {
		const lowerTags = tags.map((t) => t.toLowerCase());
		components = components.filter((c) =>
			c.tags.some((t) => lowerTags.includes(t.toLowerCase())),
		);
	}

	// Semantic search (simple keyword matching for now)
	if (semantic) {
		const keywords = semantic.toLowerCase().split(/\s+/);
		components = components
			.map((c) => ({
				component: c,
				score: calculateSemanticScore(c, keywords),
			}))
			.filter((item) => item.score > 0)
			.sort((a, b) => b.score - a.score)
			.map((item) => item.component);
	}

	const total = components.length;
	components = components.slice(0, limit);

	return {
		components,
		total,
		suggestions: generateSuggestions(components),
	};
}

/**
 * Calculate semantic relevance score
 */
function calculateSemanticScore(
	component: ComponentManifest,
	keywords: string[],
): number {
	let score = 0;

	for (const keyword of keywords) {
		// Check name
		if (component.name.toLowerCase().includes(keyword)) {
			score += 10;
		}

		// Check description
		if (component.description.toLowerCase().includes(keyword)) {
			score += 5;
		}

		// Check tags
		if (component.tags.some((t) => t.toLowerCase().includes(keyword))) {
			score += 3;
		}

		// Check semantic role
		if (component.semanticRole?.toLowerCase().includes(keyword)) {
			score += 4;
		}
	}

	return score;
}

/**
 * Generate usage suggestions based on results
 */
function generateSuggestions(components: ComponentManifest[]): string[] {
	if (components.length === 0) {
		return [
			"Try broader search terms",
			"Check available categories: action, form, navigation, overlay, feedback, layout, display",
		];
	}

	return components.slice(0, 3).map((c) => c.description);
}

/**
 * Get component by category
 */
export function getByCategory(
	category: ComponentCategory,
): ComponentManifest[] {
	return loadManifests().filter((c) => c.category === category);
}

/**
 * Get related components
 */
export function getRelated(componentName: string): ComponentManifest[] {
	const manifest = getManifest(componentName);
	if (!manifest || !manifest.relatedComponents) {
		return [];
	}

	return manifest.relatedComponents
		.map((name) => getManifest(name))
		.filter((m): m is ComponentManifest => m !== undefined);
}

/**
 * Format component for LLM consumption
 */
export function formatForLLM(componentName: string): LLMResponse | null {
	const manifest = getManifest(componentName);
	if (!manifest) {
		return null;
	}

	// Generate props table
	const propsTable = generatePropsTable(manifest);

	// Get related as alternatives
	const alternatives = (manifest.relatedComponents || []).map((name) => {
		const related = getManifest(name);
		return {
			component: name,
			reason: related?.description || "Related component",
		};
	});

	return {
		component: manifest.name,
		importStatement: `import { ${manifest.name} } from '${manifest.importPath}'`,
		summary: manifest.description,
		minimalExample: manifest.examples[0]?.code || "",
		fullExample: manifest.examples[manifest.examples.length - 1]?.code || "",
		propsTable,
		alternatives,
		a11yNotes: [
			manifest.accessibility.role
				? `Uses role="${manifest.accessibility.role}"`
				: "",
			manifest.accessibility.keyboard
				? `Keyboard: ${manifest.accessibility.keyboard.join(", ")}`
				: "",
			manifest.accessibility.focusManagement || "",
			manifest.accessibility.screenReader || "",
		].filter(Boolean),
	};
}

/**
 * Generate markdown props table
 */
function generatePropsTable(manifest: ComponentManifest): string {
	const rows = Object.entries(manifest.props).map(([name, prop]) => {
		const defaultVal = prop.default !== undefined ? String(prop.default) : "-";
		const required = prop.required ? "Yes" : "No";
		return `| ${name} | ${prop.type} | ${defaultVal} | ${required} | ${prop.description} |`;
	});

	return [
		"| Prop | Type | Default | Required | Description |",
		"|------|------|---------|----------|-------------|",
		...rows,
	].join("\n");
}
