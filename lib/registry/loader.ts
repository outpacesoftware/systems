// Layout
import AccordionManifest from "../../packages/systems/src/primitives/Accordion/Accordion.manifest.json";
import AlertDialogManifest from "../../packages/systems/src/primitives/AlertDialog/AlertDialog.manifest.json";
// Display
import AvatarManifest from "../../packages/systems/src/primitives/Avatar/Avatar.manifest.json";
// Import manifests statically for build-time inclusion
// Action
import ButtonManifest from "../../packages/systems/src/primitives/Button/Button.manifest.json";
import CheckboxManifest from "../../packages/systems/src/primitives/Checkbox/Checkbox.manifest.json";
import CheckboxGroupManifest from "../../packages/systems/src/primitives/CheckboxGroup/CheckboxGroup.manifest.json";
import CollapsibleManifest from "../../packages/systems/src/primitives/Collapsible/Collapsible.manifest.json";
import ComboboxManifest from "../../packages/systems/src/primitives/Combobox/Combobox.manifest.json";
import ContextMenuManifest from "../../packages/systems/src/primitives/ContextMenu/ContextMenu.manifest.json";
// Overlay
import DialogManifest from "../../packages/systems/src/primitives/Dialog/Dialog.manifest.json";
import FieldManifest from "../../packages/systems/src/primitives/Field/Field.manifest.json";
// Form
import InputManifest from "../../packages/systems/src/primitives/Input/Input.manifest.json";
import MenuManifest from "../../packages/systems/src/primitives/Menu/Menu.manifest.json";
import MeterManifest from "../../packages/systems/src/primitives/Meter/Meter.manifest.json";
import NavigationMenuManifest from "../../packages/systems/src/primitives/NavigationMenu/NavigationMenu.manifest.json";
import NumberFieldManifest from "../../packages/systems/src/primitives/NumberField/NumberField.manifest.json";
import PopoverManifest from "../../packages/systems/src/primitives/Popover/Popover.manifest.json";
import PreviewCardManifest from "../../packages/systems/src/primitives/PreviewCard/PreviewCard.manifest.json";
// Feedback
import ProgressManifest from "../../packages/systems/src/primitives/Progress/Progress.manifest.json";
import RadioManifest from "../../packages/systems/src/primitives/Radio/Radio.manifest.json";
import RadioGroupManifest from "../../packages/systems/src/primitives/RadioGroup/RadioGroup.manifest.json";
import ScrollAreaManifest from "../../packages/systems/src/primitives/ScrollArea/ScrollArea.manifest.json";
import SelectManifest from "../../packages/systems/src/primitives/Select/Select.manifest.json";
import SeparatorManifest from "../../packages/systems/src/primitives/Separator/Separator.manifest.json";
import SliderManifest from "../../packages/systems/src/primitives/Slider/Slider.manifest.json";
import SwitchManifest from "../../packages/systems/src/primitives/Switch/Switch.manifest.json";
// Navigation
import TabsManifest from "../../packages/systems/src/primitives/Tabs/Tabs.manifest.json";
import ToastManifest from "../../packages/systems/src/primitives/Toast/Toast.manifest.json";
import ToggleManifest from "../../packages/systems/src/primitives/Toggle/Toggle.manifest.json";
import ToggleGroupManifest from "../../packages/systems/src/primitives/ToggleGroup/ToggleGroup.manifest.json";
import ToolbarManifest from "../../packages/systems/src/primitives/Toolbar/Toolbar.manifest.json";
import TooltipManifest from "../../packages/systems/src/primitives/Tooltip/Tooltip.manifest.json";
import type { ComponentManifest, ComponentRegistry } from "./types";

/**
 * All component manifests loaded at build time
 */
const manifests: ComponentManifest[] = [
	// Action
	ButtonManifest as ComponentManifest,
	ToggleManifest as ComponentManifest,
	ToggleGroupManifest as ComponentManifest,
	ToolbarManifest as ComponentManifest,
	// Form
	InputManifest as ComponentManifest,
	CheckboxManifest as ComponentManifest,
	CheckboxGroupManifest as ComponentManifest,
	SwitchManifest as ComponentManifest,
	SelectManifest as ComponentManifest,
	RadioManifest as ComponentManifest,
	RadioGroupManifest as ComponentManifest,
	SliderManifest as ComponentManifest,
	NumberFieldManifest as ComponentManifest,
	ComboboxManifest as ComponentManifest,
	FieldManifest as ComponentManifest,
	// Navigation
	TabsManifest as ComponentManifest,
	MenuManifest as ComponentManifest,
	ContextMenuManifest as ComponentManifest,
	NavigationMenuManifest as ComponentManifest,
	// Overlay
	DialogManifest as ComponentManifest,
	AlertDialogManifest as ComponentManifest,
	TooltipManifest as ComponentManifest,
	PopoverManifest as ComponentManifest,
	PreviewCardManifest as ComponentManifest,
	// Feedback
	ProgressManifest as ComponentManifest,
	ToastManifest as ComponentManifest,
	MeterManifest as ComponentManifest,
	// Layout
	AccordionManifest as ComponentManifest,
	CollapsibleManifest as ComponentManifest,
	SeparatorManifest as ComponentManifest,
	ScrollAreaManifest as ComponentManifest,
	// Display
	AvatarManifest as ComponentManifest,
];

/**
 * Load all component manifests
 */
export function loadManifests(): ComponentManifest[] {
	return manifests;
}

/**
 * Get the full component registry
 */
export function getRegistry(): ComponentRegistry {
	return {
		version: "1.0.0",
		components: loadManifests(),
	};
}

/**
 * Get a single component manifest by name
 */
export function getManifest(name: string): ComponentManifest | undefined {
	return manifests.find((m) => m.name.toLowerCase() === name.toLowerCase());
}

/**
 * Get all component names
 */
export function getComponentNames(): string[] {
	return manifests.map((m) => m.name);
}
