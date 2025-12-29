"use client";

import {
	type ButtonHTMLAttributes,
	type KeyboardEvent,
	useCallback,
	useState,
} from "react";

/**
 * Props for the useSwitch hook
 */
export interface UseSwitchProps {
	/**
	 * Whether the switch is on (controlled)
	 */
	checked?: boolean;

	/**
	 * Default state for uncontrolled usage
	 */
	defaultChecked?: boolean;

	/**
	 * Whether the switch is disabled
	 * @default false
	 */
	disabled?: boolean;

	/**
	 * Whether the switch is required
	 * @default false
	 */
	required?: boolean;

	/**
	 * Change handler
	 */
	onChange?: (checked: boolean) => void;

	/**
	 * Switch name
	 */
	name?: string;

	/**
	 * Switch value
	 */
	value?: string;
}

/**
 * Return type for useSwitch hook
 */
export interface UseSwitchReturn {
	/** Props to spread on the button element */
	switchProps: ButtonHTMLAttributes<HTMLButtonElement>;
	/** Whether the switch is on */
	isChecked: boolean;
	/** Whether the switch is disabled */
	isDisabled: boolean;
}

/**
 * useSwitch - Hook for building accessible toggle switches
 *
 * Uses a button element for better accessibility than checkbox-based switches.
 *
 * @example
 * const { switchProps, isChecked } = useSwitch({
 *   checked,
 *   onChange: setChecked
 * });
 *
 * return <button {...switchProps}>{isChecked ? 'On' : 'Off'}</button>;
 */
export function useSwitch(props: UseSwitchProps = {}): UseSwitchReturn {
	const {
		checked: controlledChecked,
		defaultChecked = false,
		disabled = false,
		required = false,
		onChange,
		name,
		value,
	} = props;

	const [internalChecked, setInternalChecked] = useState(defaultChecked);

	const isControlled = controlledChecked !== undefined;
	const isChecked = isControlled ? controlledChecked : internalChecked;

	const toggle = useCallback(() => {
		if (disabled) return;

		const newChecked = !isChecked;
		if (!isControlled) {
			setInternalChecked(newChecked);
		}
		onChange?.(newChecked);
	}, [disabled, isChecked, isControlled, onChange]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLButtonElement>) => {
			if (disabled) return;

			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				toggle();
			}
		},
		[disabled, toggle],
	);

	const switchProps: ButtonHTMLAttributes<HTMLButtonElement> = {
		type: "button",
		role: "switch",
		"aria-checked": isChecked,
		"aria-required": required || undefined,
		disabled,
		onClick: toggle,
		onKeyDown: handleKeyDown,
		// Hidden input for form submission
		...(name && { "data-name": name }),
		...(value && { "data-value": value }),
	};

	return {
		switchProps,
		isChecked,
		isDisabled: disabled,
	};
}
