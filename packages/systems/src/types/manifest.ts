/**
 * Component Manifest Schema
 *
 * This defines the structure for component manifests that make components
 * discoverable and understandable by LLMs and AI agents.
 */

export type ComponentCategory =
	| "action" // Button, IconButton
	| "form" // Input, Checkbox, Select
	| "navigation" // Menu, Tabs
	| "overlay" // Dialog, Tooltip, Popover
	| "feedback" // Toast, Progress
	| "layout" // Accordion, ScrollArea, Separator
	| "display"; // Avatar, Badge, Pill

export interface PropDefinition {
	/** TypeScript type as string */
	type: string;
	/** Human-readable description */
	description: string;
	/** Default value if any */
	default?: unknown;
	/** Whether this prop is required */
	required?: boolean;
	/** Possible values for enum types */
	values?: string[];
	/** Accessibility implications */
	accessibility?: string;
}

export interface SlotDefinition {
	/** What this slot is for */
	description: string;
	/** Default content if not provided */
	defaultContent?: string;
}

export interface AccessibilityInfo {
	/** ARIA role */
	role?: string;
	/** aria-live behavior */
	ariaLive?: "polite" | "assertive" | "off";
	/** Keyboard interactions */
	keyboard?: string[];
	/** Focus management notes */
	focusManagement?: string;
	/** Screen reader notes */
	screenReader?: string;
}

export interface CodeExample {
	/** Example name/title */
	name: string;
	/** The code snippet */
	code: string;
	/** Optional description */
	description?: string;
}

export interface AnimationInfo {
	/** Whether this component supports GSAP animations */
	supportsGSAP?: boolean;
	/** Suggested animation hook to use */
	suggestedHook?:
		| "useDialogAnimation"
		| "useAccordionAnimation"
		| "useToastAnimation"
		| "useElementAnimation";
	/** Default enter animation duration in seconds */
	defaultEnterDuration?: number;
	/** Default exit animation duration in seconds */
	defaultExitDuration?: number;
	/** Animation states the component supports */
	states?: string[];
	/** How the component behaves with reduced motion */
	reducedMotionBehavior?: "instant" | "none" | "simplified";
}

export interface ComponentManifest {
	/** Component name (PascalCase) */
	name: string;
	/** Human-readable display name */
	displayName: string;
	/** Brief description of what the component does */
	description: string;
	/** Functional category */
	category: ComponentCategory;
	/** Searchable tags */
	tags: string[];

	/** Semantic role for AI understanding */
	semanticRole?: string;

	/** Component props */
	props: Record<string, PropDefinition>;
	/** Named slots for composition */
	slots?: Record<string, SlotDefinition>;

	/** Accessibility information */
	accessibility: AccessibilityInfo;

	/** Animation information (optional, for components that support GSAP) */
	animation?: AnimationInfo;

	/** Usage examples */
	examples: CodeExample[];

	/** Related components */
	relatedComponents?: string[];
	/** Components this is built from */
	composedFrom?: string[];

	/** Import path */
	importPath: string;
}
