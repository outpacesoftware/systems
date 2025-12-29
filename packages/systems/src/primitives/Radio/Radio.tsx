"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { type UseRadioProps, useRadio } from "./useRadio";

/**
 * Radio size types
 */
export type RadioSize = "sm" | "md" | "lg";

/**
 * Props for the Radio component
 */
export interface RadioProps
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"size" | "onChange" | "checked" | "value"
		>,
		UseRadioProps {
	/**
	 * The size of the radio
	 * @default "md"
	 */
	size?: RadioSize;

	/**
	 * Additional CSS class names
	 */
	className?: string;
}

/**
 * Radio - Single selection control
 *
 * A headless radio button component with built-in accessibility.
 * Use within a RadioGroup for grouped selection.
 *
 * @example
 * <Radio name="option" value="a" checked={value === 'a'} onChange={handleChange} />
 *
 * @see https://outpace.systems/components/radio
 */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(
	(props, forwardedRef) => {
		const {
			size = "md",
			className,
			// Extract useRadio props
			checked,
			disabled,
			required,
			onChange,
			name,
			value,
			...rest
		} = props;

		const { inputProps, isChecked, isDisabled } = useRadio({
			checked,
			disabled,
			required,
			onChange,
			name,
			value,
		});

		return (
			<input
				ref={forwardedRef}
				className={className}
				data-size={size}
				data-checked={isChecked || undefined}
				data-disabled={isDisabled || undefined}
				{...inputProps}
				{...rest}
			/>
		);
	},
);

Radio.displayName = "Radio";
