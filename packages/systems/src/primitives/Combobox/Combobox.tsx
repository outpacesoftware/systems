"use client";

import {
	type ButtonHTMLAttributes,
	createContext,
	forwardRef,
	type HTMLAttributes,
	type InputHTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Context
// ============================================================================

interface ComboboxContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	value: string;
	onValueChange: (value: string) => void;
	inputValue: string;
	onInputValueChange: (value: string) => void;
	activeIndex: number;
	onActiveIndexChange: (index: number) => void;
	inputId: string;
	listboxId: string;
	disabled: boolean;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

function useComboboxContext() {
	const context = useContext(ComboboxContext);
	if (!context) {
		throw new Error("Combobox components must be used within Combobox.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface ComboboxRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether the listbox is open (controlled) */
	open?: boolean;
	/** Default open state */
	defaultOpen?: boolean;
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Selected value (controlled) */
	value?: string;
	/** Default selected value */
	defaultValue?: string;
	/** Called when value changes */
	onValueChange?: (value: string) => void;
	/** Whether the combobox is disabled */
	disabled?: boolean;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, ComboboxRootProps>((props, ref) => {
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		disabled = false,
		children,
		className,
		...rest
	} = props;

	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const [internalValue, setInternalValue] = useState(defaultValue);
	const [inputValue, setInputValue] = useState(defaultValue);
	const [activeIndex, setActiveIndex] = useState(-1);

	const isOpenControlled = controlledOpen !== undefined;
	const isValueControlled = controlledValue !== undefined;
	const open = isOpenControlled ? controlledOpen : internalOpen;
	const value = isValueControlled ? controlledValue : internalValue;

	const inputId = useId();
	const listboxId = useId();

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (!isOpenControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
			if (!newOpen) {
				setActiveIndex(-1);
			}
		},
		[isOpenControlled, onOpenChange],
	);

	const handleValueChange = useCallback(
		(newValue: string) => {
			if (!isValueControlled) {
				setInternalValue(newValue);
			}
			setInputValue(newValue);
			onValueChange?.(newValue);
			handleOpenChange(false);
		},
		[isValueControlled, onValueChange, handleOpenChange],
	);

	return (
		<ComboboxContext.Provider
			value={{
				open,
				onOpenChange: handleOpenChange,
				value,
				onValueChange: handleValueChange,
				inputValue,
				onInputValueChange: setInputValue,
				activeIndex,
				onActiveIndexChange: setActiveIndex,
				inputId,
				listboxId,
				disabled,
			}}
		>
			<div
				ref={ref}
				data-disabled={disabled ? "" : undefined}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</ComboboxContext.Provider>
	);
});

Root.displayName = "Combobox.Root";

// ============================================================================
// Input
// ============================================================================

export interface ComboboxInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	children?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, ComboboxInputProps>((props, ref) => {
	const { className, onKeyDown, onFocus, ...rest } = props;
	const context = useComboboxContext();

	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			context.onInputValueChange(event.target.value);
			context.onOpenChange(true);
		},
		[context],
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLInputElement>) => {
			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					if (!context.open) {
						context.onOpenChange(true);
					} else {
						context.onActiveIndexChange(context.activeIndex + 1);
					}
					break;
				case "ArrowUp":
					event.preventDefault();
					context.onActiveIndexChange(Math.max(0, context.activeIndex - 1));
					break;
				case "Escape":
					context.onOpenChange(false);
					break;
				case "Enter":
					if (context.open && context.activeIndex >= 0) {
						event.preventDefault();
					}
					break;
			}
			onKeyDown?.(event);
		},
		[context, onKeyDown],
	);

	const handleFocus = useCallback(
		(event: React.FocusEvent<HTMLInputElement>) => {
			context.onOpenChange(true);
			onFocus?.(event);
		},
		[context, onFocus],
	);

	return (
		<input
			ref={ref}
			id={context.inputId}
			type="text"
			role="combobox"
			aria-expanded={context.open}
			aria-controls={context.listboxId}
			aria-activedescendant={
				context.activeIndex >= 0
					? `${context.listboxId}-${context.activeIndex}`
					: undefined
			}
			aria-autocomplete="list"
			value={context.inputValue}
			disabled={context.disabled}
			onChange={handleChange}
			onKeyDown={handleKeyDown}
			onFocus={handleFocus}
			className={className}
			{...rest}
		/>
	);
});

Input.displayName = "Combobox.Input";

// ============================================================================
// Trigger
// ============================================================================

export interface ComboboxTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, ComboboxTriggerProps>(
	(props, ref) => {
		const { children, className, onClick, ...rest } = props;
		const context = useComboboxContext();

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				context.onOpenChange(!context.open);
				onClick?.(event);
			},
			[context, onClick],
		);

		return (
			<button
				ref={ref}
				type="button"
				tabIndex={-1}
				aria-label="Show options"
				aria-expanded={context.open}
				disabled={context.disabled}
				onClick={handleClick}
				className={className}
				{...rest}
			>
				{children ?? "▼"}
			</button>
		);
	},
);

Trigger.displayName = "Combobox.Trigger";

// ============================================================================
// Portal
// ============================================================================

export interface ComboboxPortalProps {
	/** Container element to render into */
	container?: Element | null;
	children: ReactNode;
}

function Portal(props: ComboboxPortalProps) {
	const { container, children } = props;
	const context = useComboboxContext();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !context.open) return null;

	return createPortal(children, container || document.body);
}

Portal.displayName = "Combobox.Portal";

// ============================================================================
// Content
// ============================================================================

export interface ComboboxContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, ComboboxContentProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useComboboxContext();

		return (
			<div
				ref={ref}
				role="listbox"
				id={context.listboxId}
				aria-labelledby={context.inputId}
				data-state={context.open ? "open" : "closed"}
				className={className}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Content.displayName = "Combobox.Content";

// ============================================================================
// Item
// ============================================================================

export interface ComboboxItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Value for this item */
	value: string;
	/** Whether the item is disabled */
	disabled?: boolean;
	children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, ComboboxItemProps>((props, ref) => {
	const {
		value,
		disabled = false,
		children,
		onClick,
		className,
		...rest
	} = props;
	const context = useComboboxContext();

	const isSelected = context.value === value;

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (!disabled) {
				context.onValueChange(value);
				onClick?.(event);
			}
		},
		[context, value, disabled, onClick],
	);

	return (
		// biome-ignore lint/a11y/useFocusableInteractive: Option is part of listbox pattern, keyboard nav handled by parent
		// biome-ignore lint/a11y/useKeyWithClickEvents: Keyboard navigation handled by Combobox.Content
		<div
			ref={ref}
			role="option"
			aria-selected={isSelected}
			aria-disabled={disabled}
			data-selected={isSelected ? "" : undefined}
			data-disabled={disabled ? "" : undefined}
			onClick={handleClick}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Item.displayName = "Combobox.Item";

// ============================================================================
// Empty
// ============================================================================

export interface ComboboxEmptyProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Empty = forwardRef<HTMLDivElement, ComboboxEmptyProps>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<div ref={ref} role="presentation" className={className} {...rest}>
			{children}
		</div>
	);
});

Empty.displayName = "Combobox.Empty";

// ============================================================================
// Export
// ============================================================================

export const Combobox = {
	Root,
	Input,
	Trigger,
	Portal,
	Content,
	Item,
	Empty,
};
