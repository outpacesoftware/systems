export interface Component {
	name: string;
	description: string;
	dependencies?: string[];
}

export const REGISTRY_URL =
	"https://systems.outpacesoftware.com/api/design-system";

export const components: Component[] = [
	{ name: "Accordion", description: "Expandable content sections" },
	{ name: "AlertDialog", description: "Modal dialog for confirmations" },
	{ name: "Avatar", description: "User avatar with fallback" },
	{ name: "Button", description: "Interactive button element" },
	{ name: "Checkbox", description: "Checkbox input control" },
	{ name: "CheckboxGroup", description: "Group of checkbox inputs" },
	{ name: "Collapsible", description: "Expandable/collapsible content" },
	{ name: "Combobox", description: "Autocomplete input with options" },
	{ name: "ContextMenu", description: "Right-click context menu" },
	{ name: "Dialog", description: "Modal dialog window" },
	{ name: "Field", description: "Form field wrapper" },
	{ name: "Input", description: "Text input control" },
	{ name: "Menu", description: "Dropdown menu" },
	{ name: "Meter", description: "Meter/gauge display" },
	{ name: "NavigationMenu", description: "Navigation menu with submenus" },
	{ name: "NumberField", description: "Numeric input with controls" },
	{ name: "Popover", description: "Floating popover content" },
	{ name: "PreviewCard", description: "Link preview card" },
	{ name: "Progress", description: "Progress indicator" },
	{ name: "Radio", description: "Radio input control" },
	{ name: "RadioGroup", description: "Group of radio inputs" },
	{ name: "ScrollArea", description: "Custom scrollable area" },
	{ name: "Select", description: "Dropdown select input" },
	{ name: "Separator", description: "Visual separator" },
	{ name: "Slider", description: "Range slider input" },
	{ name: "Switch", description: "Toggle switch control" },
	{ name: "Tabs", description: "Tabbed content panels" },
	{ name: "Toast", description: "Toast notifications" },
	{ name: "Toggle", description: "Toggle button" },
	{ name: "ToggleGroup", description: "Group of toggle buttons" },
	{ name: "Toolbar", description: "Toolbar with actions" },
	{ name: "Tooltip", description: "Tooltip on hover/focus" },
];

export function getComponent(name: string): Component | undefined {
	return components.find(
		(c) => c.name.toLowerCase() === name.toLowerCase()
	);
}

export function getAllComponentNames(): string[] {
	return components.map((c) => c.name);
}
