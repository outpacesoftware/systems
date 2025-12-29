"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useId,
	useState,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface AccordionContextValue {
	type: "single" | "multiple";
	value: string[];
	collapsible: boolean;
	disabled: boolean;
	onValueChange: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
	const context = useContext(AccordionContext);
	if (!context) {
		throw new Error("Accordion components must be used within Accordion.Root");
	}
	return context;
}

interface AccordionItemContextValue {
	value: string;
	triggerId: string;
	contentId: string;
	isOpen: boolean;
	disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
	null,
);

function useAccordionItemContext() {
	const context = useContext(AccordionItemContext);
	if (!context) {
		throw new Error(
			"AccordionItem components must be used within Accordion.Item",
		);
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface AccordionRootProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Single or multiple items can be open */
	type?: "single" | "multiple";
	/** Current open item(s) - string for single, string[] for multiple */
	value?: string | string[];
	/** Default open item(s) */
	defaultValue?: string | string[];
	/** Whether accordion can be fully collapsed (single type only) */
	collapsible?: boolean;
	/** Whether the accordion is disabled */
	disabled?: boolean;
	/** Called when open state changes */
	onValueChange?: (value: string | string[]) => void;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, AccordionRootProps>((props, ref) => {
	const {
		type = "single",
		value: controlledValue,
		defaultValue = type === "single" ? "" : [],
		collapsible = false,
		disabled = false,
		onValueChange,
		children,
		className,
		...rest
	} = props;

	const normalizeValue = (val: string | string[] | undefined): string[] => {
		if (val === undefined) return [];
		return Array.isArray(val) ? val : val ? [val] : [];
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
				if (value.includes(itemValue)) {
					newValue = collapsible ? [] : value;
				} else {
					newValue = [itemValue];
				}
			} else {
				if (value.includes(itemValue)) {
					newValue = value.filter((v) => v !== itemValue);
				} else {
					newValue = [...value, itemValue];
				}
			}

			if (!isControlled) {
				setInternalValue(newValue);
			}
			onValueChange?.(type === "single" ? newValue[0] || "" : newValue);
		},
		[type, value, collapsible, isControlled, onValueChange],
	);

	return (
		<AccordionContext.Provider
			value={{
				type,
				value,
				collapsible,
				disabled,
				onValueChange: handleValueChange,
			}}
		>
			<div
				ref={ref}
				data-orientation="vertical"
				data-disabled={disabled || undefined}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</AccordionContext.Provider>
	);
});

Root.displayName = "Accordion.Root";

// ============================================================================
// Item
// ============================================================================

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Unique value for this item */
	value: string;
	/** Whether this item is disabled */
	disabled?: boolean;
	children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, AccordionItemProps>((props, ref) => {
	const { value, disabled: itemDisabled, children, className, ...rest } = props;
	const context = useAccordionContext();
	const baseId = useId();

	const disabled = context.disabled || itemDisabled;
	const isOpen = context.value.includes(value);

	return (
		<AccordionItemContext.Provider
			value={{
				value,
				triggerId: `${baseId}-trigger`,
				contentId: `${baseId}-content`,
				isOpen,
				disabled: disabled || false,
			}}
		>
			<div
				ref={ref}
				data-state={isOpen ? "open" : "closed"}
				data-disabled={disabled || undefined}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</AccordionItemContext.Provider>
	);
});

Item.displayName = "Accordion.Item";

// ============================================================================
// Header
// ============================================================================

export interface AccordionHeaderProps
	extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

const Header = forwardRef<HTMLHeadingElement, AccordionHeaderProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<h3 ref={ref} className={className} {...rest}>
				{children}
			</h3>
		);
	},
);

Header.displayName = "Accordion.Header";

// ============================================================================
// Trigger
// ============================================================================

export interface AccordionTriggerProps
	extends HTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const accordionContext = useAccordionContext();
		const itemContext = useAccordionItemContext();

		const handleClick = useCallback(() => {
			if (!itemContext.disabled) {
				accordionContext.onValueChange(itemContext.value);
			}
		}, [accordionContext, itemContext]);

		return (
			<button
				ref={ref}
				type="button"
				id={itemContext.triggerId}
				aria-controls={itemContext.contentId}
				aria-expanded={itemContext.isOpen}
				disabled={itemContext.disabled}
				data-state={itemContext.isOpen ? "open" : "closed"}
				data-disabled={itemContext.disabled || undefined}
				onClick={handleClick}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Trigger.displayName = "Accordion.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether to keep content mounted when closed */
	forceMount?: boolean;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, AccordionContentProps>(
	(props, ref) => {
		const { forceMount, children, className, ...rest } = props;
		const itemContext = useAccordionItemContext();

		if (!itemContext.isOpen && !forceMount) {
			return null;
		}

		return (
			<section
				ref={ref}
				id={itemContext.contentId}
				aria-labelledby={itemContext.triggerId}
				hidden={!itemContext.isOpen}
				data-state={itemContext.isOpen ? "open" : "closed"}
				className={className}
				{...rest}
			>
				{children}
			</section>
		);
	},
);

Content.displayName = "Accordion.Content";

// ============================================================================
// Export
// ============================================================================

export const Accordion = {
	Root,
	Item,
	Header,
	Trigger,
	Content,
};
