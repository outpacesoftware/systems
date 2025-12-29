'use client';

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
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

// ============================================================================
// Styles
// ============================================================================

const containerStyles = `
  relative flex items-center w-full
  px-3 py-2.5 rounded-[9px]
  bg-white/2 cursor-text
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;

const inputStyles =
  'relative z-10 flex-1 bg-transparent text-[13px] leading-4 tracking-[0.12px] text-white/88 placeholder:text-white/32 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50';

const labelStyles = 'text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]';

const errorStyles = 'text-[10px] leading-[13px] text-red-400 tracking-[0.12px]';

const descriptionStyles = 'text-[10px] leading-[13px] text-white/48 tracking-[0.12px]';

// ============================================================================
// Component
// ============================================================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      description,
      leftAddon,
      rightAddon,
      value,
      onChange,
      className = '',
      required,
      disabled,
      id: providedId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;

    const inputElement = (
      <div
        className={`
          ${containerStyles}
          ${error ? 'before:ring-red-500/50' : 'before:ring-white/8'}
          ${disabled ? 'opacity-50 pointer-events-none' : ''}
          ${!label ? className : ''}
        `}
      >
        {leftAddon && (
          <span className="relative z-10 shrink-0 mr-2 text-white/48 [&>svg]:size-4">
            {leftAddon}
          </span>
        )}
        <input
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          className={inputStyles}
          {...props}
        />
        {rightAddon && (
          <span className="relative z-10 shrink-0 ml-2 text-white/48 [&>svg]:size-4">
            {rightAddon}
          </span>
        )}
      </div>
    );

    if (label || error || description) {
      return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
          {label && (
            <label htmlFor={id} className={labelStyles}>
              {label}
              {required && <span className="text-[#FF4502] ml-0.5">*</span>}
            </label>
          )}
          {inputElement}
          {description && !error && (
            <p id={descriptionId} className={descriptionStyles}>
              {description}
            </p>
          )}
          {error && (
            <p id={errorId} role="alert" className={errorStyles}>
              {error}
            </p>
          )}
        </div>
      );
    }

    return inputElement;
  }
);

Input.displayName = 'Input';
