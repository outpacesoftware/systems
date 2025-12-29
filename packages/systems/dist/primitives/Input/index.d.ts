import * as react from 'react';
import { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';

/**
 * Props for the useInput hook
 */
interface UseInputProps {
    /**
     * The controlled value of the input
     */
    value?: string;
    /**
     * Default value for uncontrolled usage
     */
    defaultValue?: string;
    /**
     * Whether the input is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the input is read-only
     * @default false
     */
    readOnly?: boolean;
    /**
     * Whether the input is required
     * @default false
     */
    required?: boolean;
    /**
     * Whether the input has an error
     * @default false
     */
    error?: boolean;
    /**
     * Change handler
     */
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    /**
     * Focus handler
     */
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Blur handler
     */
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
    /**
     * Input type
     * @default "text"
     */
    type?: InputHTMLAttributes<HTMLInputElement>['type'];
    /**
     * Placeholder text
     */
    placeholder?: string;
    /**
     * Input name
     */
    name?: string;
    /**
     * Associated label ID for accessibility
     */
    'aria-labelledby'?: string;
    /**
     * Error message ID for accessibility
     */
    'aria-describedby'?: string;
}
/**
 * Return type for useInput hook
 */
interface UseInputReturn {
    /** Props to spread on the input element */
    inputProps: InputHTMLAttributes<HTMLInputElement>;
    /** Current value (for controlled usage) */
    value: string;
    /** Whether the input is focused */
    isFocused: boolean;
    /** Whether the input is disabled */
    isDisabled: boolean;
    /** Whether the input has an error */
    hasError: boolean;
}
/**
 * useInput - Hook for building accessible text inputs
 *
 * @example
 * const { inputProps, isFocused } = useInput({
 *   value,
 *   onChange: (e) => setValue(e.target.value),
 *   error: hasError
 * });
 *
 * return <input {...inputProps} />;
 */
declare function useInput(props?: UseInputProps): UseInputReturn;

/**
 * Input size types
 */
type InputSize = 'sm' | 'md' | 'lg';
/**
 * Props for the Input component
 */
interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'defaultValue' | 'value' | 'onChange'>, UseInputProps {
    /**
     * The size of the input
     * @default "md"
     */
    size?: InputSize;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * Input - Text input field
 *
 * A headless input component with built-in accessibility.
 * Apply your own styles via className or style props.
 *
 * @example
 * <Input placeholder="Enter your name" />
 *
 * @example
 * <Input type="email" error aria-describedby="email-error" />
 *
 * @see https://outpace.systems/components/input
 */
declare const Input: react.ForwardRefExoticComponent<InputProps & react.RefAttributes<HTMLInputElement>>;

export { Input, type InputProps, type InputSize, type UseInputProps, type UseInputReturn, useInput };
