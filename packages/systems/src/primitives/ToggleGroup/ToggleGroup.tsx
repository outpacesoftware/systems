"use client";

import {
	type ButtonHTMLAttributes,
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface ToggleGroupContextValue {
	type: "single" | "multiple";
	value: string[];
	onValueChange: (value: string) => void;
	disabled?: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

function useToggleGroupContext() {
	const context = useContext(ToggleGroupContext);
	if (!context) {
		throw new Error("ToggleGroup.Item must be used within ToggleGroup.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface ToggleGroupRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Single or multiple selection */
	type?: "single" | "multiple";
	/** Selected value(s) - controlled */
	value?: string | string[];
	/** Default selected value(s) */
	defaultValue?: string | string[];
	/** Called when value changes */
	onValueChange?: (value: string | string[]) => void;
	/** Whether all items are disabled */
	disabled?: boolean;
	/** Orientation for keyboard navigation */
	orientation?: "horizontal" | "vertical";
	/** Whether navigation loops */
	loop?: boolean;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, ToggleGroupRootProps>((props, ref) => {
	const {
		type = "single",
		value: controlledValue,
		defaultValue,
		onValueChange,
		disabled = false,
		orientation = "horizontal",
		loop = true,
		children,
		className,
		...rest
	} = props;

	const normalizeValue = (val: string | string[] | undefined): string[] => {
		if (val === undefined) return [];
		return Array.isArray(val) ? val : [val];
	};

	const [internalValue, setInternalValue] = useState<string[]>(
		normalizeValue(defaultValue),
	);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? normalizeValue(controlledValue) : internalValue;

	const handleValueChange = useCallback(
		(itemValue: string) => {
			let newValue: string[];

			if (type === "single") {
				newValue = value.includes(itemValue) ? [] : [itemValue];
			} else {
				newValue = value.includes(itemValue)
					? value.filter((v) => v !== itemValue)
					: [...value, itemValue];
			}

			if (!isControlled) {
				setInternalValue(newValue);
			}

			onValueChange?.(type === "single" ? newValue[0] || "" : newValue);
		},
		[type, value, isControlled, onValueChange],
	);

	return (
		<ToggleGroupContext.Provider
			value={{ type, value, onValueChange: handleValueChange, disabled }}
		>
			<div
				ref={ref}
				role="group"
				data-orientation={orientation}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</ToggleGroupContext.Provider>
	);
});

Root.displayName = "ToggleGroup.Root";

// ============================================================================
// Item
// ============================================================================

export interface ToggleGroupItemProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Value for this item */
	value: string;
	children: ReactNode;
}

const Item = forwardRef<HTMLButtonElement, ToggleGroupItemProps>(
	(props, ref) => {
		const {
			value,
			children,
			disabled: itemDisabled,
			className,
			...rest
		} = props;
		const context = useToggleGroupContext();

		const isPressed = context.value.includes(value);
		const isDisabled = context.disabled || itemDisabled;

		const handleClick = useCallback(() => {
			if (!isDisabled) {
				context.onValueChange(value);
			}
		}, [context, value, isDisabled]);

		return (
			<button
				ref={ref}
				type="button"
				role="radio"
				aria-checked={isPressed}
				aria-pressed={isPressed}
				disabled={isDisabled}
				data-state={isPressed ? "on" : "off"}
				data-disabled={isDisabled ? "" : undefined}
				onClick={handleClick}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Item.displayName = "ToggleGroup.Item";

// ============================================================================
// Export
// ============================================================================

export const ToggleGroup = {
	Root,
	Item,
};
