"use client";

import { forwardRef, type InputHTMLAttributes, useEffect, useRef } from "react";
import { type UseCheckboxProps, useCheckbox } from "./useCheckbox";

/**
 * Checkbox size types
 */
export type CheckboxSize = "sm" | "md" | "lg";

/**
 * Props for the Checkbox component
 */
export interface CheckboxProps
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"size" | "onChange" | "checked" | "defaultChecked" | "value"
		>,
		UseCheckboxProps {
	/**
	 * The size of the checkbox
	 * @default "md"
	 */
	size?: CheckboxSize;

	/**
	 * Additional CSS class names
	 */
	className?: string;
}

/**
 * Checkbox - Boolean selection control
 *
 * A headless checkbox component with built-in accessibility.
 * Apply your own styles via className or style props.
 *
 * @example
 * <Checkbox checked={agreed} onChange={setAgreed} />
 *
 * @example
 * <Checkbox indeterminate />
 *
 * @see https://outpace.systems/components/checkbox
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props, forwardedRef) => {
		const {
			size = "md",
			className,
			// Extract useCheckbox props
			checked,
			defaultChecked,
			indeterminate,
			disabled,
			required,
			onChange,
			name,
			value,
			...rest
		} = props;

		const internalRef = useRef<HTMLInputElement>(null);
		const ref =
			(forwardedRef as React.RefObject<HTMLInputElement>) || internalRef;

		const { inputProps, isChecked, isIndeterminate, isDisabled } = useCheckbox({
			checked,
			defaultChecked,
			indeterminate,
			disabled,
			required,
			onChange,
			name,
			value,
		});

		// Handle indeterminate state (can only be set via JavaScript)
		useEffect(() => {
			if (ref.current) {
				ref.current.indeterminate = indeterminate || false;
			}
		}, [indeterminate, ref]);

		return (
			<input
				ref={ref}
				className={className}
				data-size={size}
				data-checked={isChecked || undefined}
				data-indeterminate={isIndeterminate || undefined}
				data-disabled={isDisabled || undefined}
				{...inputProps}
				{...rest}
			/>
		);
	},
);

Checkbox.displayName = "Checkbox";
