import * as react from 'react';
import react__default, { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes, HTMLAttributes, LabelHTMLAttributes, ChangeEvent, ImgHTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { Button as Button$1, ButtonProps as ButtonProps$1, ButtonSize, ButtonVariant, UseButtonProps, UseButtonReturn, useButton } from './primitives/Button/index.js';
import { Input as Input$1, InputProps as InputProps$1, InputSize, UseInputProps, UseInputReturn, useInput } from './primitives/Input/index.js';
import { Checkbox as Checkbox$1, CheckboxProps as CheckboxProps$1, CheckboxSize, UseCheckboxProps, UseCheckboxReturn, useCheckbox } from './primitives/Checkbox/index.js';
import { Switch as Switch$1, SwitchProps as SwitchProps$1, SwitchSize, UseSwitchProps, UseSwitchReturn, useSwitch } from './primitives/Switch/index.js';
import { Select as Select$1, SelectContentProps, SelectContextValue, SelectOption, SelectOptionProps, SelectProvider, SelectRootProps, SelectTriggerProps, UseSelectProps, UseSelectReturn, useSelect, useSelectContext } from './primitives/Select/index.js';
import { Dialog as Dialog$1, DialogBackdropProps, DialogCloseProps as DialogCloseProps$1, DialogContentProps as DialogContentProps$1, DialogContextValue, DialogDescriptionProps as DialogDescriptionProps$1, DialogPortalProps as DialogPortalProps$1, DialogProvider, DialogRootProps as DialogRootProps$1, DialogTitleProps as DialogTitleProps$1, DialogTriggerProps as DialogTriggerProps$1, UseDialogProps, UseDialogReturn, useDialog, useDialogContext } from './primitives/Dialog/index.js';
import { Tooltip as Tooltip$1, TooltipArrowProps, TooltipContentProps, TooltipPortalProps, TooltipRootProps, TooltipTriggerProps, UseTooltipProps, UseTooltipReturn, useTooltip } from './primitives/Tooltip/index.js';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Visual variant */
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline' | 'success' | 'warning';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Icon on the left */
    leftIcon?: ReactNode;
    /** Icon on the right */
    rightIcon?: ReactNode;
    /** Loading state */
    loading?: boolean;
    /** Children content */
    children: ReactNode;
}
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

interface ToggleProps$1 extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    /** Controlled pressed state */
    pressed?: boolean;
    /** Default pressed state */
    defaultPressed?: boolean;
    /** Change handler */
    onChange?: (pressed: boolean) => void;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Visual variant */
    variant?: 'default' | 'outline';
    /** Button content */
    children: ReactNode;
}
declare const Toggle$1: react.ForwardRefExoticComponent<ToggleProps$1 & react.RefAttributes<HTMLButtonElement>>;

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
    /** Input label */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper/description text */
    description?: string;
    /** Left addon (icon or text) */
    leftAddon?: ReactNode;
    /** Right addon (icon or text) */
    rightAddon?: ReactNode;
    /** Controlled value */
    value?: string;
    /** Change handler */
    onChange?: (value: string) => void;
}
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
    /** Textarea label */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper/description text */
    description?: string;
    /** Controlled value */
    value?: string;
    /** Change handler */
    onChange?: (value: string) => void;
}
declare const Textarea: react.ForwardRefExoticComponent<TextareaProps & react.RefAttributes<HTMLTextAreaElement>>;

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'size'> {
    /** Select label */
    label?: string;
    /** Error message */
    error?: string;
    /** Helper/description text */
    description?: string;
    /** Controlled value */
    value?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Children (options) */
    children: ReactNode;
}
declare const Select: react.ForwardRefExoticComponent<SelectProps & react.RefAttributes<HTMLSelectElement>>;

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
    /** Checkbox label */
    label?: ReactNode;
    /** Description text */
    description?: string;
    /** Controlled checked state */
    checked?: boolean;
    /** Change handler */
    onChange?: (checked: boolean) => void;
}
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLInputElement>>;

interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
    /** Switch label */
    label?: ReactNode;
    /** Description text */
    description?: string;
    /** Controlled checked state */
    checked?: boolean;
    /** Change handler */
    onChange?: (checked: boolean) => void;
}
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLInputElement>>;

interface RadioGroupProps {
    /** Current value */
    value?: string;
    /** Default value for uncontrolled */
    defaultValue?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Group label */
    label?: string;
    /** Description text */
    description?: string;
    /** Whether the group is disabled */
    disabled?: boolean;
    /** Radio options */
    children: ReactNode;
    /** Additional class name */
    className?: string;
}
interface RadioGroupItemProps$1 extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
    /** Item value */
    value: string;
    /** Item label */
    label: ReactNode;
    /** Description text */
    description?: string;
}
declare const RadioGroup$1: react__default.ForwardRefExoticComponent<RadioGroupProps & react__default.RefAttributes<HTMLDivElement>> & {
    Item: react__default.ForwardRefExoticComponent<RadioGroupItemProps$1 & react__default.RefAttributes<HTMLInputElement>>;
};

interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current value */
    value?: number;
    /** Default value for uncontrolled */
    defaultValue?: number;
    /** Change handler */
    onChange?: (value: number) => void;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Whether the slider is disabled */
    disabled?: boolean;
    /** Label text */
    label?: string;
    /** Show value label */
    showValue?: boolean;
    /** Size variant */
    size?: 'sm' | 'md';
}
declare const Slider$1: react__default.ForwardRefExoticComponent<SliderProps & react__default.RefAttributes<HTMLDivElement>>;

interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current active tab value */
    value?: string;
    /** Default value for uncontrolled */
    defaultValue?: string;
    /** Change handler */
    onChange?: (value: string) => void;
    /** Size variant */
    size?: 'sm' | 'md';
    /** Children */
    children: ReactNode;
}
interface TabsListProps$1 extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface TabsTriggerProps$1 extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Tab value */
    value: string;
    /** Tab content */
    children: ReactNode;
}
interface TabsContentProps$1 extends HTMLAttributes<HTMLDivElement> {
    /** Tab value */
    value: string;
    /** Content */
    children: ReactNode;
}
declare const Tabs$1: react.ForwardRefExoticComponent<TabsProps & react.RefAttributes<HTMLDivElement>> & {
    List: react.ForwardRefExoticComponent<TabsListProps$1 & react.RefAttributes<HTMLDivElement>>;
    Trigger: react.ForwardRefExoticComponent<TabsTriggerProps$1 & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<TabsContentProps$1 & react.RefAttributes<HTMLDivElement>>;
};

interface DialogRootProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$5(props: DialogRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root$5 {
    var displayName: string;
}
interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface DialogPortalProps {
    container?: Element | null;
    children: ReactNode;
}
declare function Portal$6(props: DialogPortalProps): react.ReactPortal | null;
declare namespace Portal$6 {
    var displayName: string;
}
interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
}
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    onPointerDownOutside?: (event: PointerEvent) => void;
    children: ReactNode;
}
interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}
interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Dialog: {
    Root: typeof Root$5;
    Trigger: react.ForwardRefExoticComponent<DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof Portal$6;
    Overlay: react.ForwardRefExoticComponent<DialogOverlayProps & react.RefAttributes<HTMLDivElement>>;
    Content: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;
    Close: react.ForwardRefExoticComponent<DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
    Title: react.ForwardRefExoticComponent<DialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Description: react.ForwardRefExoticComponent<DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
    Footer: react.ForwardRefExoticComponent<DialogFooterProps & react.RefAttributes<HTMLDivElement>>;
};

interface TooltipProps {
    /** Tooltip content */
    content: ReactNode;
    /** Trigger element */
    children: ReactNode;
    /** Side to show tooltip */
    side?: 'top' | 'bottom' | 'left' | 'right';
    /** Delay before showing (ms) */
    delayDuration?: number;
    /** Whether tooltip is disabled */
    disabled?: boolean;
}
declare const Tooltip: react.ForwardRefExoticComponent<TooltipProps & react.RefAttributes<HTMLDivElement>>;

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
    /** Current value (0-100) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Visual variant */
    variant?: 'default' | 'accent';
    /** Whether to show indeterminate animation */
    indeterminate?: boolean;
    /** Label text */
    label?: string;
    /** Show percentage value */
    showValue?: boolean;
}
declare const Progress$1: react.ForwardRefExoticComponent<ProgressProps & react.RefAttributes<HTMLDivElement>>;

interface ToastProps {
    /** Toast title */
    title: string;
    /** Toast description */
    description?: string;
    /** Toast variant */
    variant?: 'default' | 'success' | 'error' | 'warning';
    /** Duration in ms (0 = persistent) */
    duration?: number;
    /** Action button */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Close handler */
    onClose?: () => void;
}
interface ToastContextValue {
    toast: (props: ToastProps) => void;
}
declare function useToast(): ToastContextValue;
interface ToastProviderProps$1 {
    children: ReactNode;
    /** Position of toasts */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
declare function ToastProvider({ children, position }: ToastProviderProps$1): react_jsx_runtime.JSX.Element;
declare const Toast$1: {
    Provider: typeof ToastProvider;
    useToast: typeof useToast;
};

interface SeparatorProps$1 extends HTMLAttributes<HTMLDivElement> {
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Visual variant */
    variant?: 'default' | 'muted';
}
declare const Separator$1: react.ForwardRefExoticComponent<SeparatorProps$1 & react.RefAttributes<HTMLDivElement>>;

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    /** Padding variant */
    padding?: 'none' | 'sm' | 'md' | 'lg';
    /** Card content */
    children: ReactNode;
}
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}
interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Card: react.ForwardRefExoticComponent<CardProps & react.RefAttributes<HTMLDivElement>> & {
    Header: react.ForwardRefExoticComponent<CardHeaderProps & react.RefAttributes<HTMLDivElement>>;
    Title: react.ForwardRefExoticComponent<CardTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Description: react.ForwardRefExoticComponent<CardDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
    Content: react.ForwardRefExoticComponent<CardContentProps & react.RefAttributes<HTMLDivElement>>;
    Footer: react.ForwardRefExoticComponent<CardFooterProps & react.RefAttributes<HTMLDivElement>>;
};

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    /** Image source */
    src?: string;
    /** Alt text */
    alt?: string;
    /** Fallback text (initials) */
    fallback?: string;
    /** Size variant */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Shape variant */
    shape?: 'circle' | 'square';
}
declare const Avatar$1: react.ForwardRefExoticComponent<AvatarProps & react.RefAttributes<HTMLDivElement>>;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    /** Visual variant */
    variant?: 'default' | 'muted' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'purple';
    /** Size variant */
    size?: 'sm' | 'md';
    /** Badge content */
    children: ReactNode;
}
declare const Badge: react.ForwardRefExoticComponent<BadgeProps & react.RefAttributes<HTMLSpanElement>>;

interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    /** Whether the toggle is pressed (controlled) */
    pressed?: boolean;
    /** Default pressed state for uncontrolled usage */
    defaultPressed?: boolean;
    /** Whether the toggle is disabled */
    disabled?: boolean;
    /** Called when the pressed state changes */
    onChange?: (pressed: boolean) => void;
}
/**
 * Toggle - A two-state button that can be on or off
 *
 * @example
 * <Toggle pressed={bold} onChange={setBold}>B</Toggle>
 */
declare const Toggle: react.ForwardRefExoticComponent<ToggleProps & react.RefAttributes<HTMLButtonElement>>;

interface ToggleGroupRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Single or multiple selection */
    type?: 'single' | 'multiple';
    /** Selected value(s) - controlled */
    value?: string | string[];
    /** Default selected value(s) */
    defaultValue?: string | string[];
    /** Called when value changes */
    onValueChange?: (value: string | string[]) => void;
    /** Whether all items are disabled */
    disabled?: boolean;
    /** Orientation for keyboard navigation */
    orientation?: 'horizontal' | 'vertical';
    /** Whether navigation loops */
    loop?: boolean;
    children: ReactNode;
}
interface ToggleGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Value for this item */
    value: string;
    children: ReactNode;
}
declare const ToggleGroup: {
    Root: react.ForwardRefExoticComponent<ToggleGroupRootProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<ToggleGroupItemProps & react.RefAttributes<HTMLButtonElement>>;
};

interface ToolbarRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Orientation for keyboard navigation */
    orientation?: 'horizontal' | 'vertical';
    /** Whether navigation loops */
    loop?: boolean;
    children: ReactNode;
}
interface ToolbarButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface ToolbarSeparatorProps extends HTMLAttributes<HTMLDivElement> {
}
interface ToolbarLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    href: string;
    children: ReactNode;
}
interface ToolbarToggleGroupProps extends HTMLAttributes<HTMLDivElement> {
    /** Single or multiple selection */
    type?: 'single' | 'multiple';
    children: ReactNode;
}
interface ToolbarToggleItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Value for this item */
    value: string;
    children: ReactNode;
}
declare const Toolbar: {
    Root: react.ForwardRefExoticComponent<ToolbarRootProps & react.RefAttributes<HTMLDivElement>>;
    Button: react.ForwardRefExoticComponent<ToolbarButtonProps & react.RefAttributes<HTMLButtonElement>>;
    Separator: react.ForwardRefExoticComponent<ToolbarSeparatorProps & react.RefAttributes<HTMLDivElement>>;
    Link: react.ForwardRefExoticComponent<ToolbarLinkProps & react.RefAttributes<HTMLAnchorElement>>;
    ToggleGroup: react.ForwardRefExoticComponent<ToolbarToggleGroupProps & react.RefAttributes<HTMLDivElement>>;
    ToggleItem: react.ForwardRefExoticComponent<ToolbarToggleItemProps & react.RefAttributes<HTMLButtonElement>>;
};

interface CheckboxGroupRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Selected values (controlled) */
    value?: string[];
    /** Default selected values */
    defaultValue?: string[];
    /** Called when value changes */
    onValueChange?: (value: string[]) => void;
    /** Name for form submission */
    name?: string;
    /** Whether all checkboxes are disabled */
    disabled?: boolean;
    /** Layout orientation */
    orientation?: 'horizontal' | 'vertical';
    children: ReactNode;
}
interface CheckboxGroupLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface CheckboxGroupItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'> {
    /** Value for this checkbox */
    value: string;
    children?: ReactNode;
}
interface CheckboxGroupItemLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}
declare const CheckboxGroup: {
    Root: react.ForwardRefExoticComponent<CheckboxGroupRootProps & react.RefAttributes<HTMLDivElement>>;
    Label: react.ForwardRefExoticComponent<CheckboxGroupLabelProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<CheckboxGroupItemProps & react.RefAttributes<HTMLInputElement>>;
    ItemLabel: react.ForwardRefExoticComponent<CheckboxGroupItemLabelProps & react.RefAttributes<HTMLLabelElement>>;
};

/**
 * Props for the useRadio hook
 */
interface UseRadioProps {
    /**
     * Whether the radio is checked (controlled)
     */
    checked?: boolean;
    /**
     * Whether the radio is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the radio is required
     * @default false
     */
    required?: boolean;
    /**
     * Change handler
     */
    onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Radio name (for grouping)
     */
    name?: string;
    /**
     * Radio value
     */
    value?: string;
}
/**
 * Return type for useRadio hook
 */
interface UseRadioReturn {
    /** Props to spread on the input element */
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    /** Whether the radio is checked */
    isChecked: boolean;
    /** Whether the radio is disabled */
    isDisabled: boolean;
}
/**
 * useRadio - Hook for building accessible radio buttons
 *
 * @example
 * const { inputProps, isChecked } = useRadio({
 *   checked: value === 'option1',
 *   value: 'option1',
 *   name: 'options',
 *   onChange: (checked, e) => setValue(e.target.value)
 * });
 *
 * return <input type="radio" {...inputProps} />;
 */
declare function useRadio(props?: UseRadioProps): UseRadioReturn;

/**
 * Radio size types
 */
type RadioSize = 'sm' | 'md' | 'lg';
/**
 * Props for the Radio component
 */
interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'checked' | 'value'>, UseRadioProps {
    /**
     * The size of the radio
     * @default "md"
     */
    size?: RadioSize;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * Radio - Single selection control
 *
 * A headless radio button component with built-in accessibility.
 * Use within a RadioGroup for grouped selection.
 *
 * @example
 * <Radio name="option" value="a" checked={value === 'a'} onChange={handleChange} />
 *
 * @see https://outpace.systems/components/radio
 */
declare const Radio: react.ForwardRefExoticComponent<RadioProps & react.RefAttributes<HTMLInputElement>>;

interface RadioGroupRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current selected value (controlled) */
    value?: string;
    /** Default value for uncontrolled usage */
    defaultValue?: string;
    /** Whether the entire group is disabled */
    disabled?: boolean;
    /** Whether selection is required */
    required?: boolean;
    /** Name for form submission */
    name?: string;
    /** Called when selection changes */
    onChange?: (value: string) => void;
    /** Orientation of the group */
    orientation?: 'horizontal' | 'vertical';
    /** Children */
    children: ReactNode;
}
interface RadioGroupItemProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
    /** Value of this radio option */
    value: string;
    /** Whether this option is disabled */
    disabled?: boolean;
    /** Children (label content) */
    children: ReactNode;
}
interface RadioGroupIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
    /** Whether the indicator should force show */
    forceMount?: boolean;
}
declare const RadioGroup: {
    Root: react.ForwardRefExoticComponent<RadioGroupRootProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<RadioGroupItemProps & react.RefAttributes<HTMLLabelElement>>;
    Indicator: react.ForwardRefExoticComponent<RadioGroupIndicatorProps & react.RefAttributes<HTMLSpanElement>>;
};

interface SliderRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current value (controlled) */
    value?: number;
    /** Default value for uncontrolled usage */
    defaultValue?: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Whether the slider is disabled */
    disabled?: boolean;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Called when value changes */
    onChange?: (value: number) => void;
    /** Children */
    children: ReactNode;
}
interface SliderTrackProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface SliderRangeProps extends HTMLAttributes<HTMLDivElement> {
}
interface SliderThumbProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Slider: {
    Root: react.ForwardRefExoticComponent<SliderRootProps & react.RefAttributes<HTMLDivElement>>;
    Track: react.ForwardRefExoticComponent<SliderTrackProps & react.RefAttributes<HTMLDivElement>>;
    Range: react.ForwardRefExoticComponent<SliderRangeProps & react.RefAttributes<HTMLDivElement>>;
    Thumb: react.ForwardRefExoticComponent<SliderThumbProps & react.RefAttributes<HTMLDivElement>>;
};

interface NumberFieldRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Current value (controlled) */
    value?: number;
    /** Default value */
    defaultValue?: number;
    /** Called when value changes */
    onValueChange?: (value: number) => void;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Whether the field is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface NumberFieldLabelProps extends HTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}
interface NumberFieldGroupProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface NumberFieldInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
}
interface NumberFieldIncrementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface NumberFieldDecrementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
declare const NumberField: {
    Root: react.ForwardRefExoticComponent<NumberFieldRootProps & react.RefAttributes<HTMLDivElement>>;
    Label: react.ForwardRefExoticComponent<NumberFieldLabelProps & react.RefAttributes<HTMLLabelElement>>;
    Group: react.ForwardRefExoticComponent<NumberFieldGroupProps & react.RefAttributes<HTMLDivElement>>;
    Input: react.ForwardRefExoticComponent<NumberFieldInputProps & react.RefAttributes<HTMLInputElement>>;
    Increment: react.ForwardRefExoticComponent<NumberFieldIncrementProps & react.RefAttributes<HTMLButtonElement>>;
    Decrement: react.ForwardRefExoticComponent<NumberFieldDecrementProps & react.RefAttributes<HTMLButtonElement>>;
};

interface ComboboxRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the listbox is open (controlled) */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Selected value (controlled) */
    value?: string;
    /** Default selected value */
    defaultValue?: string;
    /** Called when value changes */
    onValueChange?: (value: string) => void;
    /** Whether the combobox is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface ComboboxInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    children?: ReactNode;
}
interface ComboboxTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
interface ComboboxPortalProps {
    /** Container element to render into */
    container?: Element | null;
    children: ReactNode;
}
declare function Portal$5(props: ComboboxPortalProps): react.ReactPortal | null;
declare namespace Portal$5 {
    var displayName: string;
}
interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ComboboxItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Value for this item */
    value: string;
    /** Whether the item is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface ComboboxEmptyProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Combobox: {
    Root: react.ForwardRefExoticComponent<ComboboxRootProps & react.RefAttributes<HTMLDivElement>>;
    Input: react.ForwardRefExoticComponent<ComboboxInputProps & react.RefAttributes<HTMLInputElement>>;
    Trigger: react.ForwardRefExoticComponent<ComboboxTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof Portal$5;
    Content: react.ForwardRefExoticComponent<ComboboxContentProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<ComboboxItemProps & react.RefAttributes<HTMLDivElement>>;
    Empty: react.ForwardRefExoticComponent<ComboboxEmptyProps & react.RefAttributes<HTMLDivElement>>;
};

interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the field has an error */
    hasError?: boolean;
    /** Whether the field is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
    children: ReactNode;
}
interface FieldControlProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}
interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}
interface FieldValidityProps extends HTMLAttributes<HTMLSpanElement> {
}
declare function useFieldProps(): {
    id: string;
    'aria-describedby': string;
    'aria-invalid': boolean;
    disabled: boolean;
};
declare const Field: {
    Root: react.ForwardRefExoticComponent<FieldRootProps & react.RefAttributes<HTMLDivElement>>;
    Label: react.ForwardRefExoticComponent<FieldLabelProps & react.RefAttributes<HTMLLabelElement>>;
    Control: react.ForwardRefExoticComponent<FieldControlProps & react.RefAttributes<HTMLDivElement>>;
    Description: react.ForwardRefExoticComponent<FieldDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
    Error: react.ForwardRefExoticComponent<FieldErrorProps & react.RefAttributes<HTMLParagraphElement>>;
    Validity: react.ForwardRefExoticComponent<FieldValidityProps & react.RefAttributes<HTMLSpanElement>>;
};

interface TabsRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Current active tab value (controlled) */
    value?: string;
    /** Default active tab for uncontrolled usage */
    defaultValue?: string;
    /** Orientation of the tabs */
    orientation?: 'horizontal' | 'vertical';
    /** When automatic, tabs activate on focus. When manual, tabs activate on click/enter */
    activationMode?: 'automatic' | 'manual';
    /** Called when active tab changes */
    onChange?: (value: string) => void;
    /** Children */
    children: ReactNode;
}
interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    /** Value that identifies this tab */
    value: string;
    /** Whether this tab is disabled */
    disabled?: boolean;
    /** Children */
    children: ReactNode;
}
interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Value that identifies this tab content */
    value: string;
    /** Whether to keep content mounted when inactive */
    forceMount?: boolean;
    /** Children */
    children: ReactNode;
}
declare const Tabs: {
    Root: react.ForwardRefExoticComponent<TabsRootProps & react.RefAttributes<HTMLDivElement>>;
    List: react.ForwardRefExoticComponent<TabsListProps & react.RefAttributes<HTMLDivElement>>;
    Trigger: react.ForwardRefExoticComponent<TabsTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<TabsContentProps & react.RefAttributes<HTMLDivElement>>;
};

interface MenuRootProps {
    /** Whether the menu is open (controlled) */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$4(props: MenuRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root$4 {
    var displayName: string;
}
interface MenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface MenuPortalProps {
    children: ReactNode;
    container?: HTMLElement;
}
declare function Portal$4({ children, container }: MenuPortalProps): react.ReactPortal | null;
declare namespace Portal$4 {
    var displayName: string;
}
interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Alignment relative to trigger */
    align?: 'start' | 'center' | 'end';
    /** Side relative to trigger */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Offset from trigger */
    sideOffset?: number;
    children: ReactNode;
}
interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Called when item is selected */
    onSelect?: () => void;
    children: ReactNode;
}
interface MenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
}
interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const Menu: {
    Root: typeof Root$4;
    Trigger: react.ForwardRefExoticComponent<MenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof Portal$4;
    Content: react.ForwardRefExoticComponent<MenuContentProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<MenuItemProps & react.RefAttributes<HTMLDivElement>>;
    Separator: react.ForwardRefExoticComponent<MenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
    Label: react.ForwardRefExoticComponent<MenuLabelProps & react.RefAttributes<HTMLDivElement>>;
};

interface ContextMenuRootProps {
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$3(props: ContextMenuRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root$3 {
    var displayName: string;
}
interface ContextMenuTriggerProps extends HTMLAttributes<HTMLSpanElement> {
    /** Whether the trigger is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface ContextMenuPortalProps {
    /** Container element to render into */
    container?: Element | null;
    children: ReactNode;
}
declare function Portal$3(props: ContextMenuPortalProps): react.ReactPortal | null;
declare namespace Portal$3 {
    var displayName: string;
}
interface ContextMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Side offset from cursor */
    sideOffset?: number;
    /** Align offset from cursor */
    alignOffset?: number;
    children: ReactNode;
}
interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Called when item is selected */
    onSelect?: () => void;
    children: ReactNode;
}
interface ContextMenuSeparatorProps extends HTMLAttributes<HTMLDivElement> {
}
interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
declare const ContextMenu: {
    Root: typeof Root$3;
    Trigger: react.ForwardRefExoticComponent<ContextMenuTriggerProps & react.RefAttributes<HTMLSpanElement>>;
    Portal: typeof Portal$3;
    Content: react.ForwardRefExoticComponent<ContextMenuContentProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<ContextMenuItemProps & react.RefAttributes<HTMLDivElement>>;
    Separator: react.ForwardRefExoticComponent<ContextMenuSeparatorProps & react.RefAttributes<HTMLDivElement>>;
    Label: react.ForwardRefExoticComponent<ContextMenuLabelProps & react.RefAttributes<HTMLDivElement>>;
};

interface NavigationMenuRootProps extends HTMLAttributes<HTMLElement> {
    /** Currently active item */
    value?: string;
    /** Default active item */
    defaultValue?: string;
    /** Called when active item changes */
    onValueChange?: (value: string) => void;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    children: ReactNode;
}
interface NavigationMenuListProps extends HTMLAttributes<HTMLUListElement> {
    children: ReactNode;
}
interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
    /** Value for this item */
    value?: string;
    children: ReactNode;
}
interface NavigationMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface NavigationMenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
    /** Link href */
    href: string;
    /** Whether this link is currently active */
    active?: boolean;
    children: ReactNode;
}
interface NavigationMenuIndicatorProps extends HTMLAttributes<HTMLDivElement> {
}
interface NavigationMenuViewportProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
declare const NavigationMenu: {
    Root: react.ForwardRefExoticComponent<NavigationMenuRootProps & react.RefAttributes<HTMLElement>>;
    List: react.ForwardRefExoticComponent<NavigationMenuListProps & react.RefAttributes<HTMLUListElement>>;
    Item: react.ForwardRefExoticComponent<NavigationMenuItemProps & react.RefAttributes<HTMLLIElement>>;
    Trigger: react.ForwardRefExoticComponent<NavigationMenuTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<NavigationMenuContentProps & react.RefAttributes<HTMLDivElement>>;
    Link: react.ForwardRefExoticComponent<NavigationMenuLinkProps & react.RefAttributes<HTMLAnchorElement>>;
    Indicator: react.ForwardRefExoticComponent<NavigationMenuIndicatorProps & react.RefAttributes<HTMLDivElement>>;
    Viewport: react.ForwardRefExoticComponent<NavigationMenuViewportProps & react.RefAttributes<HTMLDivElement>>;
};

interface AlertDialogRootProps {
    /** Whether the dialog is open (controlled) */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$2(props: AlertDialogRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root$2 {
    var displayName: string;
}
interface AlertDialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface AlertDialogPortalProps {
    /** Container element to render into */
    container?: Element | null;
    children: ReactNode;
}
declare function Portal$2(props: AlertDialogPortalProps): react.ReactPortal | null;
declare namespace Portal$2 {
    var displayName: string;
}
interface AlertDialogOverlayProps extends HTMLAttributes<HTMLDivElement> {
}
interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Called when escape key is pressed */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    children: ReactNode;
}
interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
}
interface AlertDialogCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface AlertDialogActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
declare const AlertDialog: {
    Root: typeof Root$2;
    Trigger: react.ForwardRefExoticComponent<AlertDialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof Portal$2;
    Overlay: react.ForwardRefExoticComponent<AlertDialogOverlayProps & react.RefAttributes<HTMLDivElement>>;
    Content: react.ForwardRefExoticComponent<AlertDialogContentProps & react.RefAttributes<HTMLDivElement>>;
    Title: react.ForwardRefExoticComponent<AlertDialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Description: react.ForwardRefExoticComponent<AlertDialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
    Cancel: react.ForwardRefExoticComponent<AlertDialogCancelProps & react.RefAttributes<HTMLButtonElement>>;
    Action: react.ForwardRefExoticComponent<AlertDialogActionProps & react.RefAttributes<HTMLButtonElement>>;
};

interface PopoverRootProps {
    /** Whether the popover is open (controlled) */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    children: ReactNode;
}
declare function Root$1(props: PopoverRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root$1 {
    var displayName: string;
}
interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface PopoverPortalProps {
    children: ReactNode;
    container?: HTMLElement;
}
declare function Portal$1({ children, container }: PopoverPortalProps): react.ReactPortal | null;
declare namespace Portal$1 {
    var displayName: string;
}
interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Alignment relative to trigger */
    align?: 'start' | 'center' | 'end';
    /** Side relative to trigger */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Offset from trigger */
    sideOffset?: number;
    children: ReactNode;
}
interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface PopoverArrowProps extends HTMLAttributes<HTMLDivElement> {
    width?: number;
    height?: number;
}
declare const Popover: {
    Root: typeof Root$1;
    Trigger: react.ForwardRefExoticComponent<PopoverTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof Portal$1;
    Content: react.ForwardRefExoticComponent<PopoverContentProps & react.RefAttributes<HTMLDivElement>>;
    Close: react.ForwardRefExoticComponent<PopoverCloseProps & react.RefAttributes<HTMLButtonElement>>;
    Arrow: react.ForwardRefExoticComponent<PopoverArrowProps & react.RefAttributes<HTMLDivElement>>;
};

interface PreviewCardRootProps {
    /** Whether the preview card is open (controlled) */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Delay before opening in ms */
    openDelay?: number;
    /** Delay before closing in ms */
    closeDelay?: number;
    children: ReactNode;
}
declare function Root(props: PreviewCardRootProps): react_jsx_runtime.JSX.Element;
declare namespace Root {
    var displayName: string;
}
interface PreviewCardTriggerProps extends HTMLAttributes<HTMLAnchorElement> {
    /** Link href */
    href?: string;
    children: ReactNode;
}
interface PreviewCardPortalProps {
    /** Container element to render into */
    container?: Element | null;
    children: ReactNode;
}
declare function Portal(props: PreviewCardPortalProps): react.ReactPortal | null;
declare namespace Portal {
    var displayName: string;
}
interface PreviewCardContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Side of the trigger to render on */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Side offset in pixels */
    sideOffset?: number;
    /** Alignment along the side */
    align?: 'start' | 'center' | 'end';
    children: ReactNode;
}
interface PreviewCardArrowProps extends HTMLAttributes<HTMLDivElement> {
    /** Width of the arrow */
    width?: number;
    /** Height of the arrow */
    height?: number;
}
declare const PreviewCard: {
    Root: typeof Root;
    Trigger: react.ForwardRefExoticComponent<PreviewCardTriggerProps & react.RefAttributes<HTMLAnchorElement>>;
    Portal: typeof Portal;
    Content: react.ForwardRefExoticComponent<PreviewCardContentProps & react.RefAttributes<HTMLDivElement>>;
    Arrow: react.ForwardRefExoticComponent<PreviewCardArrowProps & react.RefAttributes<HTMLDivElement>>;
};

interface ProgressRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Current value (0-100 or custom max) */
    value?: number;
    /** Maximum value */
    max?: number;
    /** Whether progress is indeterminate */
    indeterminate?: boolean;
}
interface ProgressIndicatorProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Progress: {
    Root: react.ForwardRefExoticComponent<ProgressRootProps & react.RefAttributes<HTMLDivElement>>;
    Indicator: react.ForwardRefExoticComponent<ProgressIndicatorProps & react.RefAttributes<HTMLDivElement>>;
};

interface ToastProviderProps {
    /** Duration in ms before toast auto-closes */
    duration?: number;
    /** Swipe direction to dismiss */
    swipeDirection?: 'right' | 'left' | 'up' | 'down';
    /** Threshold for swipe to dismiss */
    swipeThreshold?: number;
    children: ReactNode;
}
declare function Provider(props: ToastProviderProps): react_jsx_runtime.JSX.Element;
declare namespace Provider {
    var displayName: string;
}
interface ToastViewportProps extends HTMLAttributes<HTMLOListElement> {
    /** Accessible label */
    label?: string;
    /** Hotkey to focus viewport */
    hotkey?: string[];
}
interface ToastRootProps extends HTMLAttributes<HTMLLIElement> {
    /** Whether the toast is open */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Duration in ms before auto-close (0 = never) */
    duration?: number;
    /** Toast type for accessibility */
    type?: 'foreground' | 'background';
    children: ReactNode;
}
interface ToastTitleProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ToastDescriptionProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ToastActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Accessible label for the action */
    altText: string;
    children: ReactNode;
}
interface ToastCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
declare const Toast: {
    Provider: typeof Provider;
    Viewport: react.ForwardRefExoticComponent<ToastViewportProps & react.RefAttributes<HTMLOListElement>>;
    Root: react.ForwardRefExoticComponent<ToastRootProps & react.RefAttributes<HTMLLIElement>>;
    Title: react.ForwardRefExoticComponent<ToastTitleProps & react.RefAttributes<HTMLDivElement>>;
    Description: react.ForwardRefExoticComponent<ToastDescriptionProps & react.RefAttributes<HTMLDivElement>>;
    Action: react.ForwardRefExoticComponent<ToastActionProps & react.RefAttributes<HTMLButtonElement>>;
    Close: react.ForwardRefExoticComponent<ToastCloseProps & react.RefAttributes<HTMLButtonElement>>;
};

interface MeterRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Current value */
    value: number;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Low threshold */
    low?: number;
    /** High threshold */
    high?: number;
    /** Optimum value */
    optimum?: number;
    /** Get value label for accessibility */
    getValueLabel?: (value: number, min: number, max: number) => string;
    children?: ReactNode;
}
interface MeterTrackProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
interface MeterIndicatorProps extends HTMLAttributes<HTMLDivElement> {
}
declare const Meter: {
    Root: react.ForwardRefExoticComponent<MeterRootProps & react.RefAttributes<HTMLDivElement>>;
    Track: react.ForwardRefExoticComponent<MeterTrackProps & react.RefAttributes<HTMLDivElement>>;
    Indicator: react.ForwardRefExoticComponent<MeterIndicatorProps & react.RefAttributes<HTMLDivElement>>;
};

interface AccordionRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** Single or multiple items can be open */
    type?: 'single' | 'multiple';
    /** Current open item(s) - string for single, string[] for multiple */
    value?: string | string[];
    /** Default open item(s) */
    defaultValue?: string | string[];
    /** Whether accordion can be fully collapsed (single type only) */
    collapsible?: boolean;
    /** Whether the accordion is disabled */
    disabled?: boolean;
    /** Called when open state changes */
    onValueChange?: (value: string | string[]) => void;
    children: ReactNode;
}
interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
    /** Unique value for this item */
    value: string;
    /** Whether this item is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface AccordionHeaderProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
}
interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether to keep content mounted when closed */
    forceMount?: boolean;
    children: ReactNode;
}
declare const Accordion: {
    Root: react.ForwardRefExoticComponent<AccordionRootProps & react.RefAttributes<HTMLDivElement>>;
    Item: react.ForwardRefExoticComponent<AccordionItemProps & react.RefAttributes<HTMLDivElement>>;
    Header: react.ForwardRefExoticComponent<AccordionHeaderProps & react.RefAttributes<HTMLHeadingElement>>;
    Trigger: react.ForwardRefExoticComponent<AccordionTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<AccordionContentProps & react.RefAttributes<HTMLDivElement>>;
};

interface CollapsibleRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Whether the content is visible */
    open?: boolean;
    /** Default open state */
    defaultOpen?: boolean;
    /** Called when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Whether the collapsible is disabled */
    disabled?: boolean;
    children: ReactNode;
}
interface CollapsibleTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
interface CollapsibleContentProps extends HTMLAttributes<HTMLDivElement> {
    /** Force mount (for animation) */
    forceMount?: boolean;
    children: ReactNode;
}
declare const Collapsible: {
    Root: react.ForwardRefExoticComponent<CollapsibleRootProps & react.RefAttributes<HTMLDivElement>>;
    Trigger: react.ForwardRefExoticComponent<CollapsibleTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<CollapsibleContentProps & react.RefAttributes<HTMLDivElement>>;
};

interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
    /** Orientation of the separator */
    orientation?: 'horizontal' | 'vertical';
    /** Whether the separator is decorative (no semantic meaning) */
    decorative?: boolean;
}
/**
 * Separator - Visual divider between content
 *
 * A headless separator component for dividing content.
 *
 * @example
 * <Separator orientation="horizontal" />
 */
declare const Separator: react.ForwardRefExoticComponent<SeparatorProps & react.RefAttributes<HTMLDivElement>>;

interface ScrollAreaRootProps extends HTMLAttributes<HTMLDivElement> {
    /** Scrollbar visibility */
    type?: 'auto' | 'always' | 'scroll' | 'hover';
    /** Scroll direction */
    dir?: 'ltr' | 'rtl';
    /** Scroll hide delay in ms */
    scrollHideDelay?: number;
    children: ReactNode;
}
interface ScrollAreaViewportProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
interface ScrollAreaScrollbarProps extends HTMLAttributes<HTMLDivElement> {
    /** Scrollbar orientation */
    orientation?: 'horizontal' | 'vertical';
    children?: ReactNode;
}
interface ScrollAreaThumbProps extends HTMLAttributes<HTMLDivElement> {
}
interface ScrollAreaCornerProps extends HTMLAttributes<HTMLDivElement> {
}
declare const ScrollArea: {
    Root: react.ForwardRefExoticComponent<ScrollAreaRootProps & react.RefAttributes<HTMLDivElement>>;
    Viewport: react.ForwardRefExoticComponent<ScrollAreaViewportProps & react.RefAttributes<HTMLDivElement>>;
    Scrollbar: react.ForwardRefExoticComponent<ScrollAreaScrollbarProps & react.RefAttributes<HTMLDivElement>>;
    Thumb: react.ForwardRefExoticComponent<ScrollAreaThumbProps & react.RefAttributes<HTMLDivElement>>;
    Corner: react.ForwardRefExoticComponent<ScrollAreaCornerProps & react.RefAttributes<HTMLDivElement>>;
};

interface AvatarRootProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}
interface AvatarImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    /** Image source URL */
    src?: string;
    /** Called when image fails to load */
    onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}
interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
    /** Delay before showing fallback (ms) */
    delayMs?: number;
    children: ReactNode;
}
declare const Avatar: {
    Root: react.ForwardRefExoticComponent<AvatarRootProps & react.RefAttributes<HTMLSpanElement>>;
    Image: react.ForwardRefExoticComponent<AvatarImageProps & react.RefAttributes<HTMLImageElement>>;
    Fallback: react.ForwardRefExoticComponent<AvatarFallbackProps & react.RefAttributes<HTMLSpanElement>>;
};

declare const index_Accordion: typeof Accordion;
type index_AccordionContentProps = AccordionContentProps;
type index_AccordionHeaderProps = AccordionHeaderProps;
type index_AccordionItemProps = AccordionItemProps;
type index_AccordionRootProps = AccordionRootProps;
type index_AccordionTriggerProps = AccordionTriggerProps;
declare const index_AlertDialog: typeof AlertDialog;
type index_AlertDialogActionProps = AlertDialogActionProps;
type index_AlertDialogCancelProps = AlertDialogCancelProps;
type index_AlertDialogContentProps = AlertDialogContentProps;
type index_AlertDialogDescriptionProps = AlertDialogDescriptionProps;
type index_AlertDialogOverlayProps = AlertDialogOverlayProps;
type index_AlertDialogPortalProps = AlertDialogPortalProps;
type index_AlertDialogRootProps = AlertDialogRootProps;
type index_AlertDialogTitleProps = AlertDialogTitleProps;
type index_AlertDialogTriggerProps = AlertDialogTriggerProps;
declare const index_Avatar: typeof Avatar;
type index_AvatarFallbackProps = AvatarFallbackProps;
type index_AvatarImageProps = AvatarImageProps;
type index_AvatarRootProps = AvatarRootProps;
declare const index_ButtonSize: typeof ButtonSize;
declare const index_ButtonVariant: typeof ButtonVariant;
declare const index_CheckboxGroup: typeof CheckboxGroup;
type index_CheckboxGroupItemLabelProps = CheckboxGroupItemLabelProps;
type index_CheckboxGroupItemProps = CheckboxGroupItemProps;
type index_CheckboxGroupLabelProps = CheckboxGroupLabelProps;
type index_CheckboxGroupRootProps = CheckboxGroupRootProps;
declare const index_CheckboxSize: typeof CheckboxSize;
declare const index_Collapsible: typeof Collapsible;
type index_CollapsibleContentProps = CollapsibleContentProps;
type index_CollapsibleRootProps = CollapsibleRootProps;
type index_CollapsibleTriggerProps = CollapsibleTriggerProps;
declare const index_Combobox: typeof Combobox;
type index_ComboboxContentProps = ComboboxContentProps;
type index_ComboboxEmptyProps = ComboboxEmptyProps;
type index_ComboboxInputProps = ComboboxInputProps;
type index_ComboboxItemProps = ComboboxItemProps;
type index_ComboboxPortalProps = ComboboxPortalProps;
type index_ComboboxRootProps = ComboboxRootProps;
type index_ComboboxTriggerProps = ComboboxTriggerProps;
declare const index_ContextMenu: typeof ContextMenu;
type index_ContextMenuContentProps = ContextMenuContentProps;
type index_ContextMenuItemProps = ContextMenuItemProps;
type index_ContextMenuLabelProps = ContextMenuLabelProps;
type index_ContextMenuPortalProps = ContextMenuPortalProps;
type index_ContextMenuRootProps = ContextMenuRootProps;
type index_ContextMenuSeparatorProps = ContextMenuSeparatorProps;
type index_ContextMenuTriggerProps = ContextMenuTriggerProps;
declare const index_DialogBackdropProps: typeof DialogBackdropProps;
declare const index_DialogContextValue: typeof DialogContextValue;
declare const index_DialogProvider: typeof DialogProvider;
declare const index_Field: typeof Field;
type index_FieldControlProps = FieldControlProps;
type index_FieldDescriptionProps = FieldDescriptionProps;
type index_FieldErrorProps = FieldErrorProps;
type index_FieldLabelProps = FieldLabelProps;
type index_FieldRootProps = FieldRootProps;
type index_FieldValidityProps = FieldValidityProps;
declare const index_InputSize: typeof InputSize;
declare const index_Menu: typeof Menu;
type index_MenuContentProps = MenuContentProps;
type index_MenuItemProps = MenuItemProps;
type index_MenuLabelProps = MenuLabelProps;
type index_MenuPortalProps = MenuPortalProps;
type index_MenuRootProps = MenuRootProps;
type index_MenuSeparatorProps = MenuSeparatorProps;
type index_MenuTriggerProps = MenuTriggerProps;
declare const index_Meter: typeof Meter;
type index_MeterIndicatorProps = MeterIndicatorProps;
type index_MeterRootProps = MeterRootProps;
type index_MeterTrackProps = MeterTrackProps;
declare const index_NavigationMenu: typeof NavigationMenu;
type index_NavigationMenuContentProps = NavigationMenuContentProps;
type index_NavigationMenuIndicatorProps = NavigationMenuIndicatorProps;
type index_NavigationMenuItemProps = NavigationMenuItemProps;
type index_NavigationMenuLinkProps = NavigationMenuLinkProps;
type index_NavigationMenuListProps = NavigationMenuListProps;
type index_NavigationMenuRootProps = NavigationMenuRootProps;
type index_NavigationMenuTriggerProps = NavigationMenuTriggerProps;
type index_NavigationMenuViewportProps = NavigationMenuViewportProps;
declare const index_NumberField: typeof NumberField;
type index_NumberFieldDecrementProps = NumberFieldDecrementProps;
type index_NumberFieldGroupProps = NumberFieldGroupProps;
type index_NumberFieldIncrementProps = NumberFieldIncrementProps;
type index_NumberFieldInputProps = NumberFieldInputProps;
type index_NumberFieldLabelProps = NumberFieldLabelProps;
type index_NumberFieldRootProps = NumberFieldRootProps;
declare const index_Popover: typeof Popover;
type index_PopoverArrowProps = PopoverArrowProps;
type index_PopoverCloseProps = PopoverCloseProps;
type index_PopoverContentProps = PopoverContentProps;
type index_PopoverPortalProps = PopoverPortalProps;
type index_PopoverRootProps = PopoverRootProps;
type index_PopoverTriggerProps = PopoverTriggerProps;
declare const index_PreviewCard: typeof PreviewCard;
type index_PreviewCardArrowProps = PreviewCardArrowProps;
type index_PreviewCardContentProps = PreviewCardContentProps;
type index_PreviewCardPortalProps = PreviewCardPortalProps;
type index_PreviewCardRootProps = PreviewCardRootProps;
type index_PreviewCardTriggerProps = PreviewCardTriggerProps;
declare const index_Progress: typeof Progress;
type index_ProgressIndicatorProps = ProgressIndicatorProps;
type index_ProgressRootProps = ProgressRootProps;
declare const index_Radio: typeof Radio;
declare const index_RadioGroup: typeof RadioGroup;
type index_RadioGroupIndicatorProps = RadioGroupIndicatorProps;
type index_RadioGroupItemProps = RadioGroupItemProps;
type index_RadioGroupRootProps = RadioGroupRootProps;
type index_RadioProps = RadioProps;
type index_RadioSize = RadioSize;
declare const index_ScrollArea: typeof ScrollArea;
type index_ScrollAreaCornerProps = ScrollAreaCornerProps;
type index_ScrollAreaRootProps = ScrollAreaRootProps;
type index_ScrollAreaScrollbarProps = ScrollAreaScrollbarProps;
type index_ScrollAreaThumbProps = ScrollAreaThumbProps;
type index_ScrollAreaViewportProps = ScrollAreaViewportProps;
declare const index_SelectContentProps: typeof SelectContentProps;
declare const index_SelectContextValue: typeof SelectContextValue;
declare const index_SelectOption: typeof SelectOption;
declare const index_SelectOptionProps: typeof SelectOptionProps;
declare const index_SelectProvider: typeof SelectProvider;
declare const index_SelectRootProps: typeof SelectRootProps;
declare const index_SelectTriggerProps: typeof SelectTriggerProps;
declare const index_Separator: typeof Separator;
type index_SeparatorProps = SeparatorProps;
declare const index_Slider: typeof Slider;
type index_SliderRangeProps = SliderRangeProps;
type index_SliderRootProps = SliderRootProps;
type index_SliderThumbProps = SliderThumbProps;
type index_SliderTrackProps = SliderTrackProps;
declare const index_SwitchSize: typeof SwitchSize;
declare const index_Tabs: typeof Tabs;
type index_TabsContentProps = TabsContentProps;
type index_TabsListProps = TabsListProps;
type index_TabsRootProps = TabsRootProps;
type index_TabsTriggerProps = TabsTriggerProps;
declare const index_Toast: typeof Toast;
type index_ToastActionProps = ToastActionProps;
type index_ToastCloseProps = ToastCloseProps;
type index_ToastDescriptionProps = ToastDescriptionProps;
type index_ToastProviderProps = ToastProviderProps;
type index_ToastRootProps = ToastRootProps;
type index_ToastTitleProps = ToastTitleProps;
type index_ToastViewportProps = ToastViewportProps;
declare const index_Toggle: typeof Toggle;
declare const index_ToggleGroup: typeof ToggleGroup;
type index_ToggleGroupItemProps = ToggleGroupItemProps;
type index_ToggleGroupRootProps = ToggleGroupRootProps;
type index_ToggleProps = ToggleProps;
declare const index_Toolbar: typeof Toolbar;
type index_ToolbarButtonProps = ToolbarButtonProps;
type index_ToolbarLinkProps = ToolbarLinkProps;
type index_ToolbarRootProps = ToolbarRootProps;
type index_ToolbarSeparatorProps = ToolbarSeparatorProps;
type index_ToolbarToggleGroupProps = ToolbarToggleGroupProps;
type index_ToolbarToggleItemProps = ToolbarToggleItemProps;
declare const index_TooltipArrowProps: typeof TooltipArrowProps;
declare const index_TooltipContentProps: typeof TooltipContentProps;
declare const index_TooltipPortalProps: typeof TooltipPortalProps;
declare const index_TooltipRootProps: typeof TooltipRootProps;
declare const index_TooltipTriggerProps: typeof TooltipTriggerProps;
declare const index_UseButtonProps: typeof UseButtonProps;
declare const index_UseButtonReturn: typeof UseButtonReturn;
declare const index_UseCheckboxProps: typeof UseCheckboxProps;
declare const index_UseCheckboxReturn: typeof UseCheckboxReturn;
declare const index_UseDialogProps: typeof UseDialogProps;
declare const index_UseDialogReturn: typeof UseDialogReturn;
declare const index_UseInputProps: typeof UseInputProps;
declare const index_UseInputReturn: typeof UseInputReturn;
type index_UseRadioProps = UseRadioProps;
type index_UseRadioReturn = UseRadioReturn;
declare const index_UseSelectProps: typeof UseSelectProps;
declare const index_UseSelectReturn: typeof UseSelectReturn;
declare const index_UseSwitchProps: typeof UseSwitchProps;
declare const index_UseSwitchReturn: typeof UseSwitchReturn;
declare const index_UseTooltipProps: typeof UseTooltipProps;
declare const index_UseTooltipReturn: typeof UseTooltipReturn;
declare const index_useButton: typeof useButton;
declare const index_useCheckbox: typeof useCheckbox;
declare const index_useDialog: typeof useDialog;
declare const index_useDialogContext: typeof useDialogContext;
declare const index_useFieldProps: typeof useFieldProps;
declare const index_useInput: typeof useInput;
declare const index_useRadio: typeof useRadio;
declare const index_useSelect: typeof useSelect;
declare const index_useSelectContext: typeof useSelectContext;
declare const index_useSwitch: typeof useSwitch;
declare const index_useTooltip: typeof useTooltip;
declare namespace index {
  export { index_Accordion as Accordion, type index_AccordionContentProps as AccordionContentProps, type index_AccordionHeaderProps as AccordionHeaderProps, type index_AccordionItemProps as AccordionItemProps, type index_AccordionRootProps as AccordionRootProps, type index_AccordionTriggerProps as AccordionTriggerProps, index_AlertDialog as AlertDialog, type index_AlertDialogActionProps as AlertDialogActionProps, type index_AlertDialogCancelProps as AlertDialogCancelProps, type index_AlertDialogContentProps as AlertDialogContentProps, type index_AlertDialogDescriptionProps as AlertDialogDescriptionProps, type index_AlertDialogOverlayProps as AlertDialogOverlayProps, type index_AlertDialogPortalProps as AlertDialogPortalProps, type index_AlertDialogRootProps as AlertDialogRootProps, type index_AlertDialogTitleProps as AlertDialogTitleProps, type index_AlertDialogTriggerProps as AlertDialogTriggerProps, index_Avatar as Avatar, type index_AvatarFallbackProps as AvatarFallbackProps, type index_AvatarImageProps as AvatarImageProps, type index_AvatarRootProps as AvatarRootProps, Button$1 as Button, ButtonProps$1 as ButtonProps, index_ButtonSize as ButtonSize, index_ButtonVariant as ButtonVariant, Checkbox$1 as Checkbox, index_CheckboxGroup as CheckboxGroup, type index_CheckboxGroupItemLabelProps as CheckboxGroupItemLabelProps, type index_CheckboxGroupItemProps as CheckboxGroupItemProps, type index_CheckboxGroupLabelProps as CheckboxGroupLabelProps, type index_CheckboxGroupRootProps as CheckboxGroupRootProps, CheckboxProps$1 as CheckboxProps, index_CheckboxSize as CheckboxSize, index_Collapsible as Collapsible, type index_CollapsibleContentProps as CollapsibleContentProps, type index_CollapsibleRootProps as CollapsibleRootProps, type index_CollapsibleTriggerProps as CollapsibleTriggerProps, index_Combobox as Combobox, type index_ComboboxContentProps as ComboboxContentProps, type index_ComboboxEmptyProps as ComboboxEmptyProps, type index_ComboboxInputProps as ComboboxInputProps, type index_ComboboxItemProps as ComboboxItemProps, type index_ComboboxPortalProps as ComboboxPortalProps, type index_ComboboxRootProps as ComboboxRootProps, type index_ComboboxTriggerProps as ComboboxTriggerProps, index_ContextMenu as ContextMenu, type index_ContextMenuContentProps as ContextMenuContentProps, type index_ContextMenuItemProps as ContextMenuItemProps, type index_ContextMenuLabelProps as ContextMenuLabelProps, type index_ContextMenuPortalProps as ContextMenuPortalProps, type index_ContextMenuRootProps as ContextMenuRootProps, type index_ContextMenuSeparatorProps as ContextMenuSeparatorProps, type index_ContextMenuTriggerProps as ContextMenuTriggerProps, Dialog$1 as Dialog, index_DialogBackdropProps as DialogBackdropProps, DialogCloseProps$1 as DialogCloseProps, DialogContentProps$1 as DialogContentProps, index_DialogContextValue as DialogContextValue, DialogDescriptionProps$1 as DialogDescriptionProps, DialogPortalProps$1 as DialogPortalProps, index_DialogProvider as DialogProvider, DialogRootProps$1 as DialogRootProps, DialogTitleProps$1 as DialogTitleProps, DialogTriggerProps$1 as DialogTriggerProps, index_Field as Field, type index_FieldControlProps as FieldControlProps, type index_FieldDescriptionProps as FieldDescriptionProps, type index_FieldErrorProps as FieldErrorProps, type index_FieldLabelProps as FieldLabelProps, type index_FieldRootProps as FieldRootProps, type index_FieldValidityProps as FieldValidityProps, Input$1 as Input, InputProps$1 as InputProps, index_InputSize as InputSize, index_Menu as Menu, type index_MenuContentProps as MenuContentProps, type index_MenuItemProps as MenuItemProps, type index_MenuLabelProps as MenuLabelProps, type index_MenuPortalProps as MenuPortalProps, type index_MenuRootProps as MenuRootProps, type index_MenuSeparatorProps as MenuSeparatorProps, type index_MenuTriggerProps as MenuTriggerProps, index_Meter as Meter, type index_MeterIndicatorProps as MeterIndicatorProps, type index_MeterRootProps as MeterRootProps, type index_MeterTrackProps as MeterTrackProps, index_NavigationMenu as NavigationMenu, type index_NavigationMenuContentProps as NavigationMenuContentProps, type index_NavigationMenuIndicatorProps as NavigationMenuIndicatorProps, type index_NavigationMenuItemProps as NavigationMenuItemProps, type index_NavigationMenuLinkProps as NavigationMenuLinkProps, type index_NavigationMenuListProps as NavigationMenuListProps, type index_NavigationMenuRootProps as NavigationMenuRootProps, type index_NavigationMenuTriggerProps as NavigationMenuTriggerProps, type index_NavigationMenuViewportProps as NavigationMenuViewportProps, index_NumberField as NumberField, type index_NumberFieldDecrementProps as NumberFieldDecrementProps, type index_NumberFieldGroupProps as NumberFieldGroupProps, type index_NumberFieldIncrementProps as NumberFieldIncrementProps, type index_NumberFieldInputProps as NumberFieldInputProps, type index_NumberFieldLabelProps as NumberFieldLabelProps, type index_NumberFieldRootProps as NumberFieldRootProps, index_Popover as Popover, type index_PopoverArrowProps as PopoverArrowProps, type index_PopoverCloseProps as PopoverCloseProps, type index_PopoverContentProps as PopoverContentProps, type index_PopoverPortalProps as PopoverPortalProps, type index_PopoverRootProps as PopoverRootProps, type index_PopoverTriggerProps as PopoverTriggerProps, index_PreviewCard as PreviewCard, type index_PreviewCardArrowProps as PreviewCardArrowProps, type index_PreviewCardContentProps as PreviewCardContentProps, type index_PreviewCardPortalProps as PreviewCardPortalProps, type index_PreviewCardRootProps as PreviewCardRootProps, type index_PreviewCardTriggerProps as PreviewCardTriggerProps, index_Progress as Progress, type index_ProgressIndicatorProps as ProgressIndicatorProps, type index_ProgressRootProps as ProgressRootProps, index_Radio as Radio, index_RadioGroup as RadioGroup, type index_RadioGroupIndicatorProps as RadioGroupIndicatorProps, type index_RadioGroupItemProps as RadioGroupItemProps, type index_RadioGroupRootProps as RadioGroupRootProps, type index_RadioProps as RadioProps, type index_RadioSize as RadioSize, index_ScrollArea as ScrollArea, type index_ScrollAreaCornerProps as ScrollAreaCornerProps, type index_ScrollAreaRootProps as ScrollAreaRootProps, type index_ScrollAreaScrollbarProps as ScrollAreaScrollbarProps, type index_ScrollAreaThumbProps as ScrollAreaThumbProps, type index_ScrollAreaViewportProps as ScrollAreaViewportProps, Select$1 as Select, index_SelectContentProps as SelectContentProps, index_SelectContextValue as SelectContextValue, index_SelectOption as SelectOption, index_SelectOptionProps as SelectOptionProps, index_SelectProvider as SelectProvider, index_SelectRootProps as SelectRootProps, index_SelectTriggerProps as SelectTriggerProps, index_Separator as Separator, type index_SeparatorProps as SeparatorProps, index_Slider as Slider, type index_SliderRangeProps as SliderRangeProps, type index_SliderRootProps as SliderRootProps, type index_SliderThumbProps as SliderThumbProps, type index_SliderTrackProps as SliderTrackProps, Switch$1 as Switch, SwitchProps$1 as SwitchProps, index_SwitchSize as SwitchSize, index_Tabs as Tabs, type index_TabsContentProps as TabsContentProps, type index_TabsListProps as TabsListProps, type index_TabsRootProps as TabsRootProps, type index_TabsTriggerProps as TabsTriggerProps, index_Toast as Toast, type index_ToastActionProps as ToastActionProps, type index_ToastCloseProps as ToastCloseProps, type index_ToastDescriptionProps as ToastDescriptionProps, type index_ToastProviderProps as ToastProviderProps, type index_ToastRootProps as ToastRootProps, type index_ToastTitleProps as ToastTitleProps, type index_ToastViewportProps as ToastViewportProps, index_Toggle as Toggle, index_ToggleGroup as ToggleGroup, type index_ToggleGroupItemProps as ToggleGroupItemProps, type index_ToggleGroupRootProps as ToggleGroupRootProps, type index_ToggleProps as ToggleProps, index_Toolbar as Toolbar, type index_ToolbarButtonProps as ToolbarButtonProps, type index_ToolbarLinkProps as ToolbarLinkProps, type index_ToolbarRootProps as ToolbarRootProps, type index_ToolbarSeparatorProps as ToolbarSeparatorProps, type index_ToolbarToggleGroupProps as ToolbarToggleGroupProps, type index_ToolbarToggleItemProps as ToolbarToggleItemProps, Tooltip$1 as Tooltip, index_TooltipArrowProps as TooltipArrowProps, index_TooltipContentProps as TooltipContentProps, index_TooltipPortalProps as TooltipPortalProps, index_TooltipRootProps as TooltipRootProps, index_TooltipTriggerProps as TooltipTriggerProps, index_UseButtonProps as UseButtonProps, index_UseButtonReturn as UseButtonReturn, index_UseCheckboxProps as UseCheckboxProps, index_UseCheckboxReturn as UseCheckboxReturn, index_UseDialogProps as UseDialogProps, index_UseDialogReturn as UseDialogReturn, index_UseInputProps as UseInputProps, index_UseInputReturn as UseInputReturn, type index_UseRadioProps as UseRadioProps, type index_UseRadioReturn as UseRadioReturn, index_UseSelectProps as UseSelectProps, index_UseSelectReturn as UseSelectReturn, index_UseSwitchProps as UseSwitchProps, index_UseSwitchReturn as UseSwitchReturn, index_UseTooltipProps as UseTooltipProps, index_UseTooltipReturn as UseTooltipReturn, index_useButton as useButton, index_useCheckbox as useCheckbox, index_useDialog as useDialog, index_useDialogContext as useDialogContext, index_useFieldProps as useFieldProps, index_useInput as useInput, index_useRadio as useRadio, index_useSelect as useSelect, index_useSelectContext as useSelectContext, index_useSwitch as useSwitch, index_useTooltip as useTooltip };
}

/**
 * Component Manifest Schema
 *
 * This defines the structure for component manifests that make components
 * discoverable and understandable by LLMs and AI agents.
 */
type ComponentCategory = 'action' | 'form' | 'navigation' | 'overlay' | 'feedback' | 'layout' | 'display';
interface PropDefinition {
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
interface SlotDefinition {
    /** What this slot is for */
    description: string;
    /** Default content if not provided */
    defaultContent?: string;
}
interface AccessibilityInfo {
    /** ARIA role */
    role?: string;
    /** aria-live behavior */
    ariaLive?: 'polite' | 'assertive' | 'off';
    /** Keyboard interactions */
    keyboard?: string[];
    /** Focus management notes */
    focusManagement?: string;
    /** Screen reader notes */
    screenReader?: string;
}
interface CodeExample {
    /** Example name/title */
    name: string;
    /** The code snippet */
    code: string;
    /** Optional description */
    description?: string;
}
interface ComponentManifest {
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
    /** When to use this component */
    useWhen: string[];
    /** When NOT to use this component */
    dontUseWhen: string[];
    /** Component props */
    props: Record<string, PropDefinition>;
    /** Named slots for composition */
    slots?: Record<string, SlotDefinition>;
    /** Accessibility information */
    accessibility: AccessibilityInfo;
    /** Usage examples */
    examples: CodeExample[];
    /** Related components */
    relatedComponents?: string[];
    /** Components this is built from */
    composedFrom?: string[];
    /** Import path */
    importPath: string;
}

/**
 * Base props that all components accept
 */
interface BaseProps {
    /** Additional CSS class names */
    className?: string;
    /** Inline styles */
    style?: React.CSSProperties;
    /** Test ID for testing */
    'data-testid'?: string;
}
/**
 * Props for components that can render as different elements
 */
interface AsChildProps {
    /**
     * When true, the component will render its child instead of its own element,
     * passing all props to the child.
     */
    asChild?: boolean;
}
/**
 * Props for components with disabled state
 */
interface DisabledProps {
    /** Whether the component is disabled */
    disabled?: boolean;
}
/**
 * Props for components with loading state
 */
interface LoadingProps {
    /** Whether the component is in a loading state */
    loading?: boolean;
}
/**
 * Size variants
 */
type Size = 'sm' | 'md' | 'lg';
/**
 * Common variant prop
 */
interface VariantProps<T extends string> {
    /** The visual variant of the component */
    variant?: T;
}
/**
 * Props for components with size variants
 */
interface SizeProps {
    /** The size of the component */
    size?: Size;
}
/**
 * Merge HTML attributes with custom props
 */
type ComponentProps<E extends HTMLElement = HTMLElement, P = object> = P & Omit<HTMLAttributes<E>, keyof P>;
/**
 * Slot render function type
 */
type SlotRender<T = object> = (props: T) => ReactNode;

export { type AccessibilityInfo, type AsChildProps, Avatar$1 as Avatar, type AvatarProps, Badge, type BadgeProps, type BaseProps, Button, type ButtonProps, Card, type CardProps, Checkbox, type CheckboxProps, type CodeExample, type ComponentCategory, type ComponentManifest, type ComponentProps, Dialog, type DialogContentProps, type DialogDescriptionProps, type DialogRootProps, type DialogTitleProps, type DialogTriggerProps, type DisabledProps, Input, type InputProps, type LoadingProps, index as Primitives, Progress$1 as Progress, type ProgressProps, type PropDefinition, RadioGroup$1 as RadioGroup, type RadioGroupItemProps$1 as RadioGroupItemProps, type RadioGroupProps, Select, type SelectProps, Separator$1 as Separator, type SeparatorProps$1 as SeparatorProps, type Size, type SizeProps, Slider$1 as Slider, type SliderProps, type SlotDefinition, type SlotRender, Switch, type SwitchProps, Tabs$1 as Tabs, type TabsContentProps$1 as TabsContentProps, type TabsListProps$1 as TabsListProps, type TabsProps, type TabsTriggerProps$1 as TabsTriggerProps, Textarea, type TextareaProps, Toast$1 as Toast, type ToastProps, ToastProvider, type ToastProviderProps$1 as ToastProviderProps, Toggle$1 as Toggle, type ToggleProps$1 as ToggleProps, Tooltip, type TooltipProps, type VariantProps, useToast };
