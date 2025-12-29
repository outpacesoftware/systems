'use client';

import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
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

// ============================================================================
// Styles
// ============================================================================

const containerStyles = `
  relative flex w-full
  px-3 py-2.5 rounded-[9px]
  bg-white/2
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;

const textareaStyles =
  'relative z-10 w-full min-h-[100px] resize-y bg-transparent text-[13px] leading-4 tracking-[0.12px] text-white/88 placeholder:text-white/32 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50';

const labelStyles = 'text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]';

const errorStyles = 'text-[10px] leading-[13px] text-red-400 tracking-[0.12px]';

const descriptionStyles = 'text-[10px] leading-[13px] text-white/48 tracking-[0.12px]';

// ============================================================================
// Component
// ============================================================================

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      description,
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

    const textareaElement = (
      <div
        className={`
          ${containerStyles}
          ${error ? 'before:ring-red-500/50' : 'before:ring-white/8'}
          ${disabled ? 'opacity-50 pointer-events-none' : ''}
          ${!label ? className : ''}
        `}
      >
        <textarea
          ref={ref}
          id={id}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : description ? descriptionId : undefined}
          className={textareaStyles}
          {...props}
        />
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
          {textareaElement}
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

    return textareaElement;
  }
);

Textarea.displayName = 'Textarea';
