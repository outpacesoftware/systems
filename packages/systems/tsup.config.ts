import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		// Main entry point (includes everything)
		index: "src/index.ts",

		// Animation module (optional GSAP integration)
		"animation/index": "src/animation/index.ts",

		// Accessibility utilities
		"accessibility/index": "src/utils/accessibility/index.ts",

		// Individual primitives for selective imports
		"primitives/Accordion/index": "src/primitives/Accordion/index.ts",
		"primitives/AlertDialog/index": "src/primitives/AlertDialog/index.ts",
		"primitives/Avatar/index": "src/primitives/Avatar/index.ts",
		"primitives/Button/index": "src/primitives/Button/index.ts",
		"primitives/Checkbox/index": "src/primitives/Checkbox/index.ts",
		"primitives/CheckboxGroup/index": "src/primitives/CheckboxGroup/index.ts",
		"primitives/Collapsible/index": "src/primitives/Collapsible/index.ts",
		"primitives/Combobox/index": "src/primitives/Combobox/index.ts",
		"primitives/ContextMenu/index": "src/primitives/ContextMenu/index.ts",
		"primitives/Dialog/index": "src/primitives/Dialog/index.ts",
		"primitives/Field/index": "src/primitives/Field/index.ts",
		"primitives/Input/index": "src/primitives/Input/index.ts",
		"primitives/Menu/index": "src/primitives/Menu/index.ts",
		"primitives/Meter/index": "src/primitives/Meter/index.ts",
		"primitives/NavigationMenu/index": "src/primitives/NavigationMenu/index.ts",
		"primitives/NumberField/index": "src/primitives/NumberField/index.ts",
		"primitives/Popover/index": "src/primitives/Popover/index.ts",
		"primitives/PreviewCard/index": "src/primitives/PreviewCard/index.ts",
		"primitives/Progress/index": "src/primitives/Progress/index.ts",
		"primitives/Radio/index": "src/primitives/Radio/index.ts",
		"primitives/RadioGroup/index": "src/primitives/RadioGroup/index.ts",
		"primitives/ScrollArea/index": "src/primitives/ScrollArea/index.ts",
		"primitives/Select/index": "src/primitives/Select/index.ts",
		"primitives/Separator/index": "src/primitives/Separator/index.ts",
		"primitives/Slider/index": "src/primitives/Slider/index.ts",
		"primitives/Switch/index": "src/primitives/Switch/index.ts",
		"primitives/Tabs/index": "src/primitives/Tabs/index.ts",
		"primitives/Toast/index": "src/primitives/Toast/index.ts",
		"primitives/Toggle/index": "src/primitives/Toggle/index.ts",
		"primitives/ToggleGroup/index": "src/primitives/ToggleGroup/index.ts",
		"primitives/Toolbar/index": "src/primitives/Toolbar/index.ts",
		"primitives/Tooltip/index": "src/primitives/Tooltip/index.ts",
	},
	format: ["esm"],
	dts: true,
	splitting: true,
	clean: true,
	external: ["react", "react-dom", "gsap"],
	treeshake: true,
	minify: false,
	sourcemap: true,
	outDir: "dist",
	esbuildOptions(options) {
		options.banner = {
			js: '"use client";',
		};
	},
});
