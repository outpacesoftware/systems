'use client';

import {
  useCallback,
  useState,
  type InputHTMLAttributes,
  type ChangeEvent,
  type FocusEvent,
} from 'react';

/**
 * Props for the useInput hook
 */
export interface UseInputProps {
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
export interface UseInputReturn {
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
export function useInput(props: UseInputProps = {}): UseInputReturn {
  const {
    value: controlledValue,
    defaultValue = '',
    disabled = false,
    readOnly = false,
    required = false,
    error = false,
    onChange,
    onFocus,
    onBlur,
    type = 'text',
    placeholder,
    name,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;

      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    },
    [disabled, readOnly, isControlled, onChange]
  );

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );

  const inputProps: InputHTMLAttributes<HTMLInputElement> = {
    type,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    'aria-invalid': error || undefined,
    'aria-required': required || undefined,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
  };

  return {
    inputProps,
    value,
    isFocused,
    isDisabled: disabled,
    hasError: error,
  };
}
