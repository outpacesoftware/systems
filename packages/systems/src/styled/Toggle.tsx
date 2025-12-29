'use client';

import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
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

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
  sm: 'px-2.5 py-1 text-[10px] leading-[13px]',
  md: 'px-3 py-1.5 text-[12px] leading-[15px]',
  lg: 'px-4 py-2.5 text-[13px] leading-4',
};

const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[0.12px] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black';

// ============================================================================
// Component
// ============================================================================

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      pressed: controlledPressed,
      defaultPressed = false,
      onChange,
      size = 'md',
      variant = 'default',
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const isControlled = controlledPressed !== undefined;
    const pressed = isControlled ? controlledPressed : internalPressed;

    const handleClick = () => {
      const newPressed = !pressed;
      if (!isControlled) {
        setInternalPressed(newPressed);
      }
      onChange?.(newPressed);
    };

    const variantStyles = {
      default: pressed
        ? 'bg-[#FF4502] text-white before:ring-[#FF4502]/24'
        : 'bg-white/4 text-white/72 hover:bg-white/8 hover:text-white/88',
      outline: pressed
        ? 'bg-white/8 text-white/88 before:ring-white/12'
        : 'bg-transparent text-white/72 hover:bg-white/4 hover:text-white/88 before:ring-white/8',
    }[variant];

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-pressed={pressed}
        data-state={pressed ? 'on' : 'off'}
        disabled={disabled}
        onClick={handleClick}
        className={`
          ${baseStyles}
          ${sizeStyles[size]}
          relative
          before:absolute before:inset-0 before:rounded-lg before:pointer-events-none
          before:ring-1 before:ring-inset
          ${variantStyles}
          ${className}
        `}
        {...props}
      >
        <span className="relative z-10">{children}</span>
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';
