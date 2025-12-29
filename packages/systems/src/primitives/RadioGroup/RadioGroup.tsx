'use client';

import {
  createContext,
  useContext,
  useCallback,
  useId,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface RadioGroupContextValue {
  name: string;
  value: string;
  disabled: boolean;
  required: boolean;
  onChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup components must be used within RadioGroup.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface RadioGroupRootProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Current selected value (controlled) */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Whether selection is required */
  required?: boolean;
  /** Name for form submission */
  name?: string;
  /** Called when selection changes */
  onChange?: (value: string) => void;
  /** Orientation of the group */
  orientation?: 'horizontal' | 'vertical';
  /** Children */
  children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, RadioGroupRootProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    disabled = false,
    required = false,
    name: providedName,
    onChange,
    orientation = 'vertical',
    children,
    className,
    ...rest
  } = props;

  const generatedId = useId();
  const name = providedName || `radio-group-${generatedId}`;
  const value = controlledValue ?? defaultValue;

  const handleChange = useCallback(
    (newValue: string) => {
      onChange?.(newValue);
    },
    [onChange]
  );

  return (
    <RadioGroupContext.Provider
      value={{
        name,
        value,
        disabled,
        required,
        onChange: handleChange,
      }}
    >
      <div
        ref={ref}
        role="radiogroup"
        aria-required={required || undefined}
        aria-orientation={orientation}
        data-orientation={orientation}
        data-disabled={disabled || undefined}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
});

Root.displayName = 'RadioGroup.Root';

// ============================================================================
// Item
// ============================================================================

export interface RadioGroupItemProps extends Omit<HTMLAttributes<HTMLLabelElement>, 'onChange'> {
  /** Value of this radio option */
  value: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Children (label content) */
  children: ReactNode;
}

const Item = forwardRef<HTMLLabelElement, RadioGroupItemProps>((props, ref) => {
  const { value, disabled: itemDisabled, children, className, ...rest } = props;
  const context = useRadioGroupContext();

  const disabled = context.disabled || itemDisabled;
  const checked = context.value === value;

  const handleChange = useCallback(() => {
    if (!disabled) {
      context.onChange(value);
    }
  }, [disabled, context, value]);

  return (
    <label
      ref={ref}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled || undefined}
      className={className}
      {...rest}
    >
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={checked}
        disabled={disabled}
        required={context.required}
        onChange={handleChange}
        className="sr-only"
        aria-checked={checked}
      />
      {children}
    </label>
  );
});

Item.displayName = 'RadioGroup.Item';

// ============================================================================
// Indicator
// ============================================================================

export interface RadioGroupIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  /** Whether the indicator should force show */
  forceMount?: boolean;
}

const Indicator = forwardRef<HTMLSpanElement, RadioGroupIndicatorProps>((props, ref) => {
  const { forceMount, className, children, ...rest } = props;

  // Get checked state from closest Item's input
  // This component should be rendered inside an Item
  return (
    <span
      ref={ref}
      data-state="indicator"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </span>
  );
});

Indicator.displayName = 'RadioGroup.Indicator';

// ============================================================================
// Export
// ============================================================================

export const RadioGroup = {
  Root,
  Item,
  Indicator,
};
