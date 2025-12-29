'use client';

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { useButton, type UseButtonProps } from './useButton';

/**
 * Button variant types
 */
export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

/**
 * Button size types
 */
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * Props for the Button component
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
    UseButtonProps {
  /**
   * The visual variant of the button
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Button content
   */
  children?: ReactNode;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Button - Primary interaction trigger
 *
 * A headless button component with built-in accessibility.
 * Apply your own styles via className or style props.
 *
 * @example
 * <Button onClick={() => save()}>Save</Button>
 *
 * @example
 * <Button variant="destructive" disabled>Delete</Button>
 *
 * @see https://outpace.systems/components/button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'md',
      children,
      className,
      ...rest
    } = props;

    const { buttonProps, isDisabled, isLoading, isPressed } = useButton(rest);

    return (
      <button
        ref={ref}
        className={className}
        data-variant={variant}
        data-size={size}
        data-disabled={isDisabled || undefined}
        data-loading={isLoading || undefined}
        data-pressed={isPressed || undefined}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
