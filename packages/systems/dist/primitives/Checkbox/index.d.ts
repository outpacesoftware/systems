import * as react from 'react';
import { ChangeEvent, InputHTMLAttributes } from 'react';

/**
 * Props for the useCheckbox hook
 */
interface UseCheckboxProps {
    /**
     * Whether the checkbox is checked (controlled)
     */
    checked?: boolean;
    /**
     * Default checked state for uncontrolled usage
     */
    defaultChecked?: boolean;
    /**
     * Whether the checkbox is in indeterminate state
     */
    indeterminate?: boolean;
    /**
     * Whether the checkbox is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the checkbox is required
     * @default false
     */
    required?: boolean;
    /**
     * Change handler
     */
    onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Checkbox name
     */
    name?: string;
    /**
     * Checkbox value
     */
    value?: string;
}
/**
 * Return type for useCheckbox hook
 */
interface UseCheckboxReturn {
    /** Props to spread on the input element */
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    /** Whether the checkbox is checked */
    isChecked: boolean;
    /** Whether the checkbox is in indeterminate state */
    isIndeterminate: boolean;
    /** Whether the checkbox is disabled */
    isDisabled: boolean;
}
/**
 * useCheckbox - Hook for building accessible checkboxes
 *
 * @example
 * const { inputProps, isChecked } = useCheckbox({
 *   checked,
 *   onChange: (checked) => setChecked(checked)
 * });
 *
 * return <input type="checkbox" {...inputProps} />;
 */
declare function useCheckbox(props?: UseCheckboxProps): UseCheckboxReturn;

/**
 * Checkbox size types
 */
type CheckboxSize = 'sm' | 'md' | 'lg';
/**
 * Props for the Checkbox component
 */
interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'checked' | 'defaultChecked' | 'value'>, UseCheckboxProps {
    /**
     * The size of the checkbox
     * @default "md"
     */
    size?: CheckboxSize;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * Checkbox - Boolean selection control
 *
 * A headless checkbox component with built-in accessibility.
 * Apply your own styles via className or style props.
 *
 * @example
 * <Checkbox checked={agreed} onChange={setAgreed} />
 *
 * @example
 * <Checkbox indeterminate />
 *
 * @see https://outpace.systems/components/checkbox
 */
declare const Checkbox: react.ForwardRefExoticComponent<CheckboxProps & react.RefAttributes<HTMLInputElement>>;

export { Checkbox, type CheckboxProps, type CheckboxSize, type UseCheckboxProps, type UseCheckboxReturn, useCheckbox };
