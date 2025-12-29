"use client";

import {
	type ChangeEvent,
	type InputHTMLAttributes,
	type KeyboardEvent,
	useCallback,
} from "react";

/**
 * Props for the useRadio hook
 */
export interface UseRadioProps {
	/**
	 * Whether the radio is checked (controlled)
	 */
	checked?: boolean;

	/**
	 * Whether the radio is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the radio is required
	 * @default false
	 */
	required?: boolean;

	/**
	 * Change handler
	 */
	onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Radio name (for grouping)
	 */
	name?: string;

	/**
	 * Radio value
	 */
	value?: string;
}

/**
 * Return type for useRadio hook
 */
export interface UseRadioReturn {
	/** Props to spread on the input element */
	inputProps: InputHTMLAttributes<HTMLInputElement>;
	/** Whether the radio is checked */
	isChecked: boolean;
	/** Whether the radio is disabled */
	isDisabled: boolean;
}

/**
 * useRadio - Hook for building accessible radio buttons
 *
 * @example
 * const { inputProps, isChecked } = useRadio({
 *   checked: value === 'option1',
 *   value: 'option1',
 *   name: 'options',
 *   onChange: (checked, e) => setValue(e.target.value)
 * });
 *
 * return <input type="radio" {...inputProps} />;
 */
export function useRadio(props: UseRadioProps = {}): UseRadioReturn {
	const {
		checked = false,
		disabled = false,
		required = false,
		onChange,
		name,
		value,
	} = props;

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (disabled) return;
			onChange?.(event.target.checked, event);
		},
		[disabled, onChange],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			// Space/Enter is handled natively for radio buttons
			// Arrow keys for navigation are handled by browser
		},
		[],
	);

	const inputProps: InputHTMLAttributes<HTMLInputElement> = {
		type: "radio",
		name,
		value,
		checked,
		disabled,
		required,
		"aria-checked": checked,
		"aria-required": required || undefined,
		onChange: handleChange,
		onKeyDown: handleKeyDown,
	};

	return {
		inputProps,
		isChecked: checked,
		isDisabled: disabled,
	};
}
