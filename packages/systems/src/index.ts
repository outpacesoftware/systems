// @outpace/systems - AI-first design system
// Opinionated, accessible, LLM-optimized components

// Styled Components (Opinionated) - Default exports
export {
  // Action
  Button,
  Toggle,
  // Form
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  RadioGroup,
  Slider,
  // Navigation
  Tabs,
  // Overlay
  Dialog,
  Tooltip,
  // Feedback
  Progress,
  Toast,
  ToastProvider,
  useToast,
  // Layout
  Separator,
  Card,
  // Display
  Avatar,
  Badge,
} from './styled';

// Re-export styled types
export type {
  ButtonProps,
  ToggleProps,
  InputProps,
  TextareaProps,
  SelectProps,
  CheckboxProps,
  SwitchProps,
  RadioGroupProps,
  RadioGroupItemProps,
  SliderProps,
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
  DialogRootProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogTitleProps,
  DialogDescriptionProps,
  TooltipProps,
  ProgressProps,
  ToastProps,
  ToastProviderProps,
  SeparatorProps,
  CardProps,
  AvatarProps,
  BadgeProps,
} from './styled';

// Primitives namespace for unstyled components
export * as Primitives from './primitives';

// Types
export * from './types';
