'use client';

import {
  createContext,
  useContext,
  useId,
  forwardRef,
  type HTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface FieldContextValue {
  inputId: string;
  descriptionId: string;
  errorId: string;
  hasError: boolean;
  disabled: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error('Field components must be used within Field.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface FieldRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the field has an error */
  hasError?: boolean;
  /** Whether the field is disabled */
  disabled?: boolean;
  children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
  const { hasError = false, disabled = false, children, className, ...rest } = props;

  const inputId = useId();
  const descriptionId = useId();
  const errorId = useId();

  return (
    <FieldContext.Provider value={{ inputId, descriptionId, errorId, hasError, disabled }}>
      <div
        ref={ref}
        data-error={hasError ? '' : undefined}
        data-disabled={disabled ? '' : undefined}
        className={className}
        {...rest}
      >
        {children}
      </div>
    </FieldContext.Provider>
  );
});

Root.displayName = 'Field.Root';

// ============================================================================
// Label
// ============================================================================

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();

  return (
    <label
      ref={ref}
      htmlFor={context.inputId}
      data-error={context.hasError ? '' : undefined}
      data-disabled={context.disabled ? '' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Field.Label';

// ============================================================================
// Control
// ============================================================================

export interface FieldControlProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Control = forwardRef<HTMLDivElement, FieldControlProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();

  return (
    <div
      ref={ref}
      data-error={context.hasError ? '' : undefined}
      data-disabled={context.disabled ? '' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
});

Control.displayName = 'Field.Control';

// ============================================================================
// Description
// ============================================================================

export interface FieldDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, FieldDescriptionProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();

  return (
    <p
      ref={ref}
      id={context.descriptionId}
      data-error={context.hasError ? '' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </p>
  );
});

Description.displayName = 'Field.Description';

// ============================================================================
// ErrorMessage
// ============================================================================

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const ErrorMessage = forwardRef<HTMLParagraphElement, FieldErrorProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();

  if (!context.hasError) return null;

  return (
    <p ref={ref} id={context.errorId} role="alert" aria-live="polite" className={className} {...rest}>
      {children}
    </p>
  );
});

ErrorMessage.displayName = 'Field.Error';

// ============================================================================
// Validity (for native validation messages)
// ============================================================================

export interface FieldValidityProps extends HTMLAttributes<HTMLSpanElement> {}

const Validity = forwardRef<HTMLSpanElement, FieldValidityProps>((props, ref) => {
  const { className, ...rest } = props;
  const context = useFieldContext();

  if (!context.hasError) return null;

  return <span ref={ref} className={className} {...rest} />;
});

Validity.displayName = 'Field.Validity';

// ============================================================================
// Hook for input integration
// ============================================================================

export function useFieldProps() {
  const context = useFieldContext();

  return {
    id: context.inputId,
    'aria-describedby': context.hasError
      ? `${context.errorId} ${context.descriptionId}`
      : context.descriptionId,
    'aria-invalid': context.hasError,
    disabled: context.disabled,
  };
}

// ============================================================================
// Export
// ============================================================================

export const Field = {
  Root,
  Label,
  Control,
  Description,
  Error: ErrorMessage,
  Validity,
};
