'use client';

import React, {
  createContext,
  useContext,
  forwardRef,
  useId,
  useState,
  type ReactNode,
  type InputHTMLAttributes,
} from 'react';

// ============================================================================
// Types
// ============================================================================

export interface RadioGroupProps {
  /** Current value */
  value?: string;
  /** Default value for uncontrolled */
  defaultValue?: string;
  /** Change handler */
  onChange?: (value: string) => void;
  /** Group label */
  label?: string;
  /** Description text */
  description?: string;
  /** Whether the group is disabled */
  disabled?: boolean;
  /** Radio options */
  children: ReactNode;
  /** Additional class name */
  className?: string;
}

export interface RadioGroupItemProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type' | 'size'> {
  /** Item value */
  value: string;
  /** Item label */
  label: ReactNode;
  /** Description text */
  description?: string;
}

// ============================================================================
// Context
// ============================================================================

interface RadioGroupContextValue {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  name: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroup.Item must be used within RadioGroup');
  }
  return context;
}

// ============================================================================
// RadioGroup
// ============================================================================

const RadioGroupRoot = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      label,
      description,
      disabled = false,
      children,
      className = '',
    },
    ref
  ) => {
    const name = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider value={{ value, onChange: handleChange, disabled, name }}>
        <div ref={ref} role="radiogroup" className={`flex flex-col gap-3 ${className}`}>
          {(label || description) && (
            <div className="flex flex-col gap-0.5">
              {label && (
                <span className="text-[13px] leading-4 font-medium text-white/88 tracking-[0.12px]">{label}</span>
              )}
              {description && (
                <span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">{description}</span>
              )}
            </div>
          )}
          <div className="flex flex-col gap-2">
            {children}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroupRoot.displayName = 'RadioGroup';

// ============================================================================
// RadioGroup.Item
// ============================================================================

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  (
    {
      value,
      label,
      description,
      disabled: itemDisabled,
      className = '',
      id: providedId,
      ...props
    },
    ref
  ) => {
    const context = useRadioGroupContext();
    const generatedId = useId();
    const id = providedId || generatedId;
    const isDisabled = itemDisabled || context.disabled;
    const isChecked = context.value === value;

    return (
      <label
        htmlFor={id}
        className={`
          inline-flex items-start gap-2.5 cursor-pointer
          ${isDisabled ? 'opacity-50 pointer-events-none' : ''}
          ${className}
        `}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            type="radio"
            id={id}
            name={context.name}
            value={value}
            checked={isChecked}
            onChange={() => context.onChange(value)}
            disabled={isDisabled}
            className="peer sr-only"
            {...props}
          />
          <div
            className={`
              size-[18px]
              rounded-full border border-white/20 bg-white/4
              transition-all
              peer-checked:border-[#FF4502] peer-checked:bg-[#FF4502]
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black
              peer-hover:border-white/32
              peer-checked:peer-hover:bg-[#E63D00] peer-checked:peer-hover:border-[#E63D00]
              flex items-center justify-center
            `}
          >
            <div
              className={`
                size-2
                rounded-full bg-white
                transition-all
                ${isChecked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
              `}
            />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-[13px] leading-4 text-white/88 tracking-[0.12px]">{label}</span>
            )}
            {description && (
              <span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">{description}</span>
            )}
          </div>
        )}
      </label>
    );
  }
);

RadioGroupItem.displayName = 'RadioGroup.Item';

// ============================================================================
// Export
// ============================================================================

export const RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem,
});
