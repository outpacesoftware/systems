"use client";

import {
	type ChangeEvent,
	type InputHTMLAttributes,
	type KeyboardEvent,
	useCallback,
	useState,
} from "react";

/**
 * Props for the useCheckbox hook
 */
export interface UseCheckboxProps {
	/**
	 * Whether the checkbox is checked (controlled)
	 */
	checked?: boolean;

	/**
	 * Default checked state for uncontrolled usage
	 */
	defaultChecked?: boolean;

	/**
	 * Whether the checkbox is in indeterminate state
	 */
	indeterminate?: boolean;

	/**
	 * Whether the checkbox is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the checkbox is required
	 * @default false
	 */
	required?: boolean;

	/**
	 * Change handler
	 */
	onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;

	/**
	 * Checkbox name
	 */
	name?: string;

	/**
	 * Checkbox value
	 */
	value?: string;
}

/**
 * Return type for useCheckbox hook
 */
export interface UseCheckboxReturn {
	/** Props to spread on the input element */
	inputProps: InputHTMLAttributes<HTMLInputElement>;
	/** Whether the checkbox is checked */
	isChecked: boolean;
	/** Whether the checkbox is in indeterminate state */
	isIndeterminate: boolean;
	/** Whether the checkbox is disabled */
	isDisabled: boolean;
}

/**
 * useCheckbox - Hook for building accessible checkboxes
 *
 * @example
 * const { inputProps, isChecked } = useCheckbox({
 *   checked,
 *   onChange: (checked) => setChecked(checked)
 * });
 *
 * return <input type="checkbox" {...inputProps} />;
 */
export function useCheckbox(props: UseCheckboxProps = {}): UseCheckboxReturn {
	const {
		checked: controlledChecked,
		defaultChecked = false,
		indeterminate = false,
		disabled = false,
		required = false,
		onChange,
		name,
		value,
	} = props;

	const [internalChecked, setInternalChecked] = useState(defaultChecked);

	const isControlled = controlledChecked !== undefined;
	const isChecked = isControlled ? controlledChecked : internalChecked;

	const handleChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			if (disabled) return;

			const newChecked = event.target.checked;

			if (!isControlled) {
				setInternalChecked(newChecked);
			}
			onChange?.(newChecked, event);
		},
		[disabled, isControlled, onChange],
	);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLInputElement>) => {
			// Space is handled natively, but we ensure Enter also works
			if (event.key === "Enter" && !disabled) {
				event.preventDefault();
				const newChecked = !isChecked;
				if (!isControlled) {
					setInternalChecked(newChecked);
				}
				onChange?.(
					newChecked,
					event as unknown as ChangeEvent<HTMLInputElement>,
				);
			}
		},
		[disabled, isChecked, isControlled, onChange],
	);

	const inputProps: InputHTMLAttributes<HTMLInputElement> = {
		type: "checkbox",
		name,
		value,
		checked: isChecked,
		disabled,
		required,
		"aria-checked": indeterminate ? "mixed" : isChecked,
		"aria-required": required || undefined,
		onChange: handleChange,
		onKeyDown: handleKeyDown,
	};

	return {
		inputProps,
		isChecked,
		isIndeterminate: indeterminate,
		isDisabled: disabled,
	};
}
