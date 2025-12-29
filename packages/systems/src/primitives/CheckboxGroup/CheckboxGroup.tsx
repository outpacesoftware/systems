"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type InputHTMLAttributes,
	type LabelHTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useId,
	useState,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface CheckboxGroupContextValue {
	value: string[];
	onValueChange: (value: string[]) => void;
	disabled: boolean;
	name: string;
	orientation: "horizontal" | "vertical";
}

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | null>(
	null,
);

function useCheckboxGroupContext() {
	const context = useContext(CheckboxGroupContext);
	if (!context) {
		throw new Error(
			"CheckboxGroup components must be used within CheckboxGroup.Root",
		);
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface CheckboxGroupRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Selected values (controlled) */
	value?: string[];
	/** Default selected values */
	defaultValue?: string[];
	/** Called when value changes */
	onValueChange?: (value: string[]) => void;
	/** Name for form submission */
	name?: string;
	/** Whether all checkboxes are disabled */
	disabled?: boolean;
	/** Layout orientation */
	orientation?: "horizontal" | "vertical";
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, CheckboxGroupRootProps>(
	(props, ref) => {
		const {
			value: controlledValue,
			defaultValue = [],
			onValueChange,
			name: nameProp,
			disabled = false,
			orientation = "vertical",
			children,
			className,
			...rest
		} = props;

		const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
		const isControlled = controlledValue !== undefined;
		const value = isControlled ? controlledValue : internalValue;

		const generatedName = useId();
		const name = nameProp || generatedName;

		const handleValueChange = useCallback(
			(newValue: string[]) => {
				if (!isControlled) {
					setInternalValue(newValue);
				}
				onValueChange?.(newValue);
			},
			[isControlled, onValueChange],
		);

		return (
			<CheckboxGroupContext.Provider
				value={{
					value,
					onValueChange: handleValueChange,
					disabled,
					name,
					orientation,
				}}
			>
				<div
					ref={ref}
					role="group"
					data-orientation={orientation}
					data-disabled={disabled ? "" : undefined}
					className={className}
					{...rest}
				>
					{children}
				</div>
			</CheckboxGroupContext.Provider>
		);
	},
);

Root.displayName = "CheckboxGroup.Root";

// ============================================================================
// Label
// ============================================================================

export interface CheckboxGroupLabelProps
	extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Label = forwardRef<HTMLDivElement, CheckboxGroupLabelProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<div ref={ref} className={className} {...rest}>
				{children}
			</div>
		);
	},
);

Label.displayName = "CheckboxGroup.Label";

// ============================================================================
// Item
// ============================================================================

export interface CheckboxGroupItemProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"type" | "checked" | "onChange"
	> {
	/** Value for this checkbox */
	value: string;
	children?: ReactNode;
}

const Item = forwardRef<HTMLInputElement, CheckboxGroupItemProps>(
	(props, ref) => {
		const {
			value,
			disabled: itemDisabled,
			children,
			className,
			...rest
		} = props;
		const context = useCheckboxGroupContext();

		const isChecked = context.value.includes(value);
		const isDisabled = context.disabled || itemDisabled;

		const handleChange = useCallback(
			(event: React.ChangeEvent<HTMLInputElement>) => {
				const newValue = event.target.checked
					? [...context.value, value]
					: context.value.filter((v) => v !== value);
				context.onValueChange(newValue);
			},
			[context, value],
		);

		return (
			<input
				ref={ref}
				type="checkbox"
				name={context.name}
				value={value}
				checked={isChecked}
				disabled={isDisabled}
				onChange={handleChange}
				data-state={isChecked ? "checked" : "unchecked"}
				data-disabled={isDisabled ? "" : undefined}
				className={className}
				{...rest}
			/>
		);
	},
);

Item.displayName = "CheckboxGroup.Item";

// ============================================================================
// ItemLabel
// ============================================================================

export interface CheckboxGroupItemLabelProps
	extends LabelHTMLAttributes<HTMLLabelElement> {
	children: ReactNode;
}

const ItemLabel = forwardRef<HTMLLabelElement, CheckboxGroupItemLabelProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<label ref={ref} className={className} {...rest}>
				{children}
			</label>
		);
	},
);

ItemLabel.displayName = "CheckboxGroup.ItemLabel";

// ============================================================================
// Export
// ============================================================================

export const CheckboxGroup = {
	Root,
	Label,
	Item,
	ItemLabel,
};
