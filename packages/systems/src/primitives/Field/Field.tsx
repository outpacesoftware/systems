"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type LabelHTMLAttributes,
	type ReactNode,
	useContext,
	useId,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface FieldContextValue {
	inputId: string;
	labelId: string;
	descriptionId: string;
	errorId: string;
	hasError: boolean;
	disabled: boolean;
	required: boolean;
}

const FieldContext = createContext<FieldContextValue | null>(null);

function useFieldContext() {
	const context = useContext(FieldContext);
	if (!context) {
		throw new Error("Field components must be used within Field.Root");
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
	/** Whether the field is required */
	required?: boolean;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, FieldRootProps>((props, ref) => {
	const {
		hasError = false,
		disabled = false,
		required = false,
		children,
		className,
		...rest
	} = props;

	const baseId = useId();
	const inputId = `${baseId}-input`;
	const labelId = `${baseId}-label`;
	const descriptionId = `${baseId}-description`;
	const errorId = `${baseId}-error`;

	return (
		<FieldContext.Provider
			value={{
				inputId,
				labelId,
				descriptionId,
				errorId,
				hasError,
				disabled,
				required,
			}}
		>
			<div
				ref={ref}
				data-error={hasError ? "" : undefined}
				data-disabled={disabled ? "" : undefined}
				data-required={required ? "" : undefined}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</FieldContext.Provider>
	);
});

Root.displayName = "Field.Root";

// ============================================================================
// Label
// ============================================================================

export interface FieldLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
	/** Override the required indicator from Field.Root */
	required?: boolean;
	/** Hide the required indicator */
	hideRequired?: boolean;
	children: ReactNode;
}

const Label = forwardRef<HTMLLabelElement, FieldLabelProps>((props, ref) => {
	const {
		required: requiredOverride,
		hideRequired = false,
		children,
		className,
		...rest
	} = props;
	const context = useFieldContext();
	const isRequired = requiredOverride ?? context.required;

	return (
		<label
			ref={ref}
			id={context.labelId}
			htmlFor={context.inputId}
			data-error={context.hasError ? "" : undefined}
			data-disabled={context.disabled ? "" : undefined}
			data-required={isRequired ? "" : undefined}
			className={className}
			{...rest}
		>
			{children}
			{isRequired && !hideRequired && (
				<span aria-hidden="true" data-required-indicator="">
					{" *"}
				</span>
			)}
		</label>
	);
});

Label.displayName = "Field.Label";

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
			data-error={context.hasError ? "" : undefined}
			data-disabled={context.disabled ? "" : undefined}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Control.displayName = "Field.Control";

// ============================================================================
// Description
// ============================================================================

export interface FieldDescriptionProps
	extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useFieldContext();

		return (
			<p
				ref={ref}
				id={context.descriptionId}
				data-error={context.hasError ? "" : undefined}
				className={className}
				{...rest}
			>
				{children}
			</p>
		);
	},
);

Description.displayName = "Field.Description";

// ============================================================================
// ErrorMessage
// ============================================================================

export interface FieldErrorProps extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const ErrorMessage = forwardRef<HTMLParagraphElement, FieldErrorProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useFieldContext();

		if (!context.hasError) return null;

		return (
			<p
				ref={ref}
				id={context.errorId}
				role="alert"
				aria-live="polite"
				className={className}
				{...rest}
			>
				{children}
			</p>
		);
	},
);

ErrorMessage.displayName = "Field.Error";

// ============================================================================
// Validity (for native validation messages)
// ============================================================================

export interface FieldValidityProps extends HTMLAttributes<HTMLSpanElement> {}

const Validity = forwardRef<HTMLSpanElement, FieldValidityProps>(
	(props, ref) => {
		const { className, ...rest } = props;
		const context = useFieldContext();

		if (!context.hasError) return null;

		return <span ref={ref} className={className} {...rest} />;
	},
);

Validity.displayName = "Field.Validity";

// ============================================================================
// Hook for input integration
// ============================================================================

/**
 * Hook to get accessibility props for form inputs.
 * Use this to connect custom form controls to the Field context.
 *
 * @example
 * function CustomInput(props) {
 *   const fieldProps = useFieldProps();
 *   return <input {...props} {...fieldProps} />;
 * }
 */
export function useFieldProps() {
	const context = useFieldContext();

	// Build aria-describedby from available IDs
	const describedBy =
		[context.hasError ? context.errorId : null, context.descriptionId]
			.filter(Boolean)
			.join(" ") || undefined;

	return {
		id: context.inputId,
		"aria-labelledby": context.labelId,
		"aria-describedby": describedBy,
		"aria-invalid": context.hasError || undefined,
		"aria-errormessage": context.hasError ? context.errorId : undefined,
		"aria-required": context.required || undefined,
		disabled: context.disabled || undefined,
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
