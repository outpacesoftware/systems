// @outpace/systems - AI-first design system
// Opinionated, accessible, LLM-optimized components

// Primitives namespace for unstyled components
export * as Primitives from "./primitives";

// Re-export styled types
export type {
	AvatarProps,
	BadgeProps,
	ButtonProps,
	CardProps,
	CheckboxProps,
	DialogContentProps,
	DialogDescriptionProps,
	DialogRootProps,
	DialogTitleProps,
	DialogTriggerProps,
	InputProps,
	ProgressProps,
	RadioGroupItemProps,
	RadioGroupProps,
	SelectProps,
	SeparatorProps,
	SliderProps,
	SwitchProps,
	TabsContentProps,
	TabsListProps,
	TabsProps,
	TabsTriggerProps,
	TextareaProps,
	ToastProps,
	ToastProviderProps,
	ToggleProps,
	TooltipProps,
} from "./styled";
// Styled Components (Opinionated) - Default exports
export {
	// Display
	Avatar,
	Badge,
	// Action
	Button,
	Card,
	Checkbox,
	// Overlay
	Dialog,
	// Form
	Input,
	// Feedback
	Progress,
	RadioGroup,
	Select,
	// Layout
	Separator,
	Slider,
	Switch,
	// Navigation
	Tabs,
	Textarea,
	Toast,
	ToastProvider,
	Toggle,
	Tooltip,
	useToast,
} from "./styled";

// Types
export * from "./types";
export type {
	AriaLiveAnnouncer,
	AriaLivePoliteness,
	UseAriaLiveAnnouncerOptions,
	UseFocusTrapOptions,
	VisuallyHiddenProps,
} from "./utils/accessibility";
// Accessibility utilities
export {
	announceToScreenReader,
	getFocusableElements,
	getReducedMotionPreference,
	useAriaLiveAnnouncer,
	useFocusTrap,
	useReducedMotion,
	VisuallyHidden,
	visuallyHiddenClass,
} from "./utils/accessibility";
