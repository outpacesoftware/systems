'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { useInput, type UseInputProps } from './useInput';

/**
 * Input size types
 */
export type InputSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Input component
 */
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'defaultValue' | 'value' | 'onChange'>,
    UseInputProps {
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
export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    size = 'md',
    className,
    // Extract useInput props
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    error,
    onChange,
    onFocus,
    onBlur,
    type,
    placeholder,
    name,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    ...rest
  } = props;

  const { inputProps, isFocused, hasError } = useInput({
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    error,
    onChange,
    onFocus,
    onBlur,
    type,
    placeholder,
    name,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
  });

  return (
    <input
      ref={ref}
      className={className}
      data-size={size}
      data-focused={isFocused || undefined}
      data-error={hasError || undefined}
      data-disabled={disabled || undefined}
      {...inputProps}
      {...rest}
    />
  );
});

Input.displayName = 'Input';
