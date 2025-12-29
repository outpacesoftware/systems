'use client';

import { forwardRef, useCallback, useState, type ButtonHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
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
export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>((props, ref) => {
  const {
    pressed: controlledPressed,
    defaultPressed = false,
    disabled = false,
    onChange,
    className,
    children,
    ...rest
  } = props;

  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = controlledPressed !== undefined;
  const pressed = isControlled ? controlledPressed : internalPressed;

  const handleClick = useCallback(() => {
    if (disabled) return;

    const newPressed = !pressed;
    if (!isControlled) {
      setInternalPressed(newPressed);
    }
    onChange?.(newPressed);
  }, [disabled, pressed, isControlled, onChange]);

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={pressed}
      disabled={disabled}
      data-state={pressed ? 'on' : 'off'}
      data-disabled={disabled || undefined}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
});

Toggle.displayName = 'Toggle';
