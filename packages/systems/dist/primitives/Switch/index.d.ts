import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the useSwitch hook
 */
interface UseSwitchProps {
    /**
     * Whether the switch is on (controlled)
     */
    checked?: boolean;
    /**
     * Default state for uncontrolled usage
     */
    defaultChecked?: boolean;
    /**
     * Whether the switch is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the switch is required
     * @default false
     */
    required?: boolean;
    /**
     * Change handler
     */
    onChange?: (checked: boolean) => void;
    /**
     * Switch name
     */
    name?: string;
    /**
     * Switch value
     */
    value?: string;
}
/**
 * Return type for useSwitch hook
 */
interface UseSwitchReturn {
    /** Props to spread on the button element */
    switchProps: ButtonHTMLAttributes<HTMLButtonElement>;
    /** Whether the switch is on */
    isChecked: boolean;
    /** Whether the switch is disabled */
    isDisabled: boolean;
}
/**
 * useSwitch - Hook for building accessible toggle switches
 *
 * Uses a button element for better accessibility than checkbox-based switches.
 *
 * @example
 * const { switchProps, isChecked } = useSwitch({
 *   checked,
 *   onChange: setChecked
 * });
 *
 * return <button {...switchProps}>{isChecked ? 'On' : 'Off'}</button>;
 */
declare function useSwitch(props?: UseSwitchProps): UseSwitchReturn;

/**
 * Switch size types
 */
type SwitchSize = 'sm' | 'md' | 'lg';
/**
 * Props for the Switch component
 */
interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>, UseSwitchProps {
    /**
     * The size of the switch
     * @default "md"
     */
    size?: SwitchSize;
    /**
     * Additional CSS class names
     */
    className?: string;
    /**
     * Content for the switch (e.g., thumb element)
     */
    children?: ReactNode;
}
/**
 * Switch - Toggle on/off control
 *
 * A headless switch component with built-in accessibility.
 * Uses button semantics with role="switch" for proper screen reader support.
 *
 * @example
 * <Switch checked={enabled} onChange={setEnabled} />
 *
 * @example
 * <Switch size="lg" disabled />
 *
 * @see https://outpace.systems/components/switch
 */
declare const Switch: react.ForwardRefExoticComponent<SwitchProps & react.RefAttributes<HTMLButtonElement>>;

export { Switch, type SwitchProps, type SwitchSize, type UseSwitchProps, type UseSwitchReturn, useSwitch };
