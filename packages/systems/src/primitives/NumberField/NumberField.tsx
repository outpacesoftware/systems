'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useId,
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface NumberFieldContextValue {
  value: number;
  onValueChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  disabled: boolean;
  inputId: string;
  increment: () => void;
  decrement: () => void;
}

const NumberFieldContext = createContext<NumberFieldContextValue | null>(null);

function useNumberFieldContext() {
  const context = useContext(NumberFieldContext);
  if (!context) {
    throw new Error('NumberField components must be used within NumberField.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface NumberFieldRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Current value (controlled) */
  value?: number;
  /** Default value */
  defaultValue?: number;
  /** Called when value changes */
  onValueChange?: (value: number) => void;
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
  /** Whether the field is disabled */
  disabled?: boolean;
  children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, NumberFieldRootProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
    disabled = false,
    children,
    className,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const inputId = useId();

  const clamp = useCallback(
    (val: number) => Math.min(Math.max(val, min), max),
    [min, max]
  );

  const handleValueChange = useCallback(
    (newValue: number) => {
      const clamped = clamp(newValue);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onValueChange?.(clamped);
    },
    [clamp, isControlled, onValueChange]
  );

  const increment = useCallback(() => {
    handleValueChange(value + step);
  }, [value, step, handleValueChange]);

  const decrement = useCallback(() => {
    handleValueChange(value - step);
  }, [value, step, handleValueChange]);

  return (
    <NumberFieldContext.Provider
      value={{
        value,
        onValueChange: handleValueChange,
        min,
        max,
        step,
        disabled,
        inputId,
        increment,
        decrement,
      }}
    >
      <div
        ref={ref}
        data-disabled={disabled ? '' : undefined}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </NumberFieldContext.Provider>
  );
});

Root.displayName = 'NumberField.Root';

// ============================================================================
// Label
// ============================================================================

export interface NumberFieldLabelProps extends HTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, NumberFieldLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useNumberFieldContext();

  return (
    <label ref={ref} htmlFor={context.inputId} className={className} {...rest}>
      {children}
    </label>
  );
});

Label.displayName = 'NumberField.Label';

// ============================================================================
// Group
// ============================================================================

export interface NumberFieldGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Group = forwardRef<HTMLDivElement, NumberFieldGroupProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} role="group" className={className} {...rest}>
      {children}
    </div>
  );
});

Group.displayName = 'NumberField.Group';

// ============================================================================
// Input
// ============================================================================

export interface NumberFieldInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {}

const Input = forwardRef<HTMLInputElement, NumberFieldInputProps>((props, ref) => {
  const { className, ...rest } = props;
  const context = useNumberFieldContext();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue)) {
        context.onValueChange(newValue);
      }
    },
    [context]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        context.increment();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        context.decrement();
      }
    },
    [context]
  );

  return (
    <input
      ref={ref}
      id={context.inputId}
      type="number"
      value={context.value}
      min={context.min}
      max={context.max}
      step={context.step}
      disabled={context.disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      className={className}
      {...rest}
    />
  );
});

Input.displayName = 'NumberField.Input';

// ============================================================================
// Increment
// ============================================================================

export interface NumberFieldIncrementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Increment = forwardRef<HTMLButtonElement, NumberFieldIncrementProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useNumberFieldContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.increment();
      onClick?.(event);
    },
    [context, onClick]
  );

  const isAtMax = context.value >= context.max;

  return (
    <button
      ref={ref}
      type="button"
      tabIndex={-1}
      aria-label="Increment"
      disabled={context.disabled || isAtMax}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children ?? '+'}
    </button>
  );
});

Increment.displayName = 'NumberField.Increment';

// ============================================================================
// Decrement
// ============================================================================

export interface NumberFieldDecrementProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const Decrement = forwardRef<HTMLButtonElement, NumberFieldDecrementProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useNumberFieldContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.decrement();
      onClick?.(event);
    },
    [context, onClick]
  );

  const isAtMin = context.value <= context.min;

  return (
    <button
      ref={ref}
      type="button"
      tabIndex={-1}
      aria-label="Decrement"
      disabled={context.disabled || isAtMin}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children ?? '-'}
    </button>
  );
});

Decrement.displayName = 'NumberField.Decrement';

// ============================================================================
// Export
// ============================================================================

export const NumberField = {
  Root,
  Label,
  Group,
  Input,
  Increment,
  Decrement,
};
