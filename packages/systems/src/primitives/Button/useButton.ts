'use client';

import {
  useCallback,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

/**
 * Props for the useButton hook
 */
export interface UseButtonProps {
  /**
   * Whether the button is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Click handler
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;

  /**
   * Type of button
   * @default "button"
   */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Return type for useButton hook
 */
export interface UseButtonReturn {
  /** Props to spread on the button element */
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
  /** Whether the button is currently disabled */
  isDisabled: boolean;
  /** Whether the button is in loading state */
  isLoading: boolean;
  /** Whether the button is currently pressed */
  isPressed: boolean;
}

/**
 * useButton - Hook for building accessible buttons
 *
 * Provides all the behavior and accessibility for button interactions.
 * Use this hook when you need full control over the button rendering.
 *
 * @example
 * const { buttonProps, isPressed } = useButton({
 *   onClick: () => console.log('clicked'),
 *   disabled: false
 * });
 *
 * return <button {...buttonProps}>Click me</button>;
 */
export function useButton(props: UseButtonProps = {}): UseButtonReturn {
  const {
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
  } = props;

  const [isPressed, setIsPressed] = useState(false);

  const isDisabled = disabled || loading;

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [isDisabled, onClick]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      if (event.key === 'Enter' || event.key === ' ') {
        setIsPressed(true);
      }
    },
    [isDisabled]
  );

  const handleKeyUp = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        setIsPressed(false);
      }
    },
    []
  );

  const handleMouseDown = useCallback(() => {
    if (!isDisabled) {
      setIsPressed(true);
    }
  }, [isDisabled]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);

  const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
    type,
    disabled: isDisabled,
    'aria-disabled': isDisabled || undefined,
    'aria-busy': loading || undefined,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
  };

  return {
    buttonProps,
    isDisabled,
    isLoading: loading,
    isPressed,
  };
}
