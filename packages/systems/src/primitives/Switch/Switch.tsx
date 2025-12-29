'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useSwitch, type UseSwitchProps } from './useSwitch';

/**
 * Switch size types
 */
export type SwitchSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Switch component
 */
export interface SwitchProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'>,
    UseSwitchProps {
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
export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => {
    const {
      size = 'md',
      className,
      children,
      // Extract useSwitch props
      checked,
      defaultChecked,
      disabled,
      required,
      onChange,
      name,
      value,
      ...rest
    } = props;

    const { switchProps, isChecked, isDisabled } = useSwitch({
      checked,
      defaultChecked,
      disabled,
      required,
      onChange,
      name,
      value,
    });

    return (
      <button
        ref={ref}
        className={className}
        data-size={size}
        data-checked={isChecked || undefined}
        data-disabled={isDisabled || undefined}
        {...switchProps}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Switch.displayName = 'Switch';
