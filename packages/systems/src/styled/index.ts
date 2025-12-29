// Styled Components - Opinionated design system components
// Based on the Outpace Studios design language from pavement & careers

// Action
export { Button, type ButtonProps } from './Button';
export { Toggle, type ToggleProps } from './Toggle';

// Form
export { Input, type InputProps } from './Input';
export { Textarea, type TextareaProps } from './Textarea';
export { Select, type SelectProps } from './Select';
export { Checkbox, type CheckboxProps } from './Checkbox';
export { Switch, type SwitchProps } from './Switch';
export { RadioGroup, type RadioGroupProps, type RadioGroupItemProps } from './RadioGroup';
export { Slider, type SliderProps } from './Slider';

// Navigation
export {
  Tabs,
  type TabsProps,
  type TabsListProps,
  type TabsTriggerProps,
  type TabsContentProps,
} from './Tabs';

// Overlay
export {
  Dialog,
  type DialogRootProps,
  type DialogTriggerProps,
  type DialogPortalProps,
  type DialogOverlayProps,
  type DialogContentProps,
  type DialogCloseProps,
  type DialogTitleProps,
  type DialogDescriptionProps,
  type DialogFooterProps,
} from './Dialog';
export { Tooltip, type TooltipProps } from './Tooltip';

// Feedback
export { Progress, type ProgressProps } from './Progress';
export { Toast, ToastProvider, useToast, type ToastProps, type ToastProviderProps } from './Toast';

// Layout
export { Separator, type SeparatorProps } from './Separator';
export {
  Card,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
} from './Card';

// Display
export { Avatar, type AvatarProps } from './Avatar';
export { Badge, type BadgeProps } from './Badge';
