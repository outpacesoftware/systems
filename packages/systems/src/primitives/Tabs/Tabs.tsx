"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useContext,
	useId,
	useState,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface TabsContextValue {
	value: string;
	baseId: string;
	orientation: "horizontal" | "vertical";
	activationMode: "automatic" | "manual";
	onChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs components must be used within Tabs.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface TabsRootProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Current active tab value (controlled) */
	value?: string;
	/** Default active tab for uncontrolled usage */
	defaultValue?: string;
	/** Orientation of the tabs */
	orientation?: "horizontal" | "vertical";
	/** When automatic, tabs activate on focus. When manual, tabs activate on click/enter */
	activationMode?: "automatic" | "manual";
	/** Called when active tab changes */
	onChange?: (value: string) => void;
	/** Children */
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, TabsRootProps>((props, ref) => {
	const {
		value: controlledValue,
		defaultValue = "",
		orientation = "horizontal",
		activationMode = "automatic",
		onChange,
		children,
		className,
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;
	const baseId = useId();

	const handleChange = useCallback(
		(newValue: string) => {
			if (!isControlled) {
				setInternalValue(newValue);
			}
			onChange?.(newValue);
		},
		[isControlled, onChange],
	);

	return (
		<TabsContext.Provider
			value={{
				value,
				baseId,
				orientation,
				activationMode,
				onChange: handleChange,
			}}
		>
			<div
				ref={ref}
				data-orientation={orientation}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
});

Root.displayName = "Tabs.Root";

// ============================================================================
// List
// ============================================================================

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const List = forwardRef<HTMLDivElement, TabsListProps>((props, ref) => {
	const { children, className, ...rest } = props;
	const context = useTabsContext();

	return (
		<div
			ref={ref}
			role="tablist"
			aria-orientation={context.orientation}
			data-orientation={context.orientation}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

List.displayName = "Tabs.List";

// ============================================================================
// Trigger
// ============================================================================

export interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
	/** Value that identifies this tab */
	value: string;
	/** Whether this tab is disabled */
	disabled?: boolean;
	/** Children */
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
	(props, ref) => {
		const { value, disabled, children, className, ...rest } = props;
		const context = useTabsContext();
		const isSelected = context.value === value;

		const handleClick = useCallback(() => {
			if (!disabled) {
				context.onChange(value);
			}
		}, [disabled, context, value]);

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (disabled) return;

				const triggers = Array.from(
					event.currentTarget.parentElement?.querySelectorAll('[role="tab"]') ||
						[],
				) as HTMLButtonElement[];
				const currentIndex = triggers.indexOf(event.currentTarget);

				let nextIndex: number | null = null;

				if (context.orientation === "horizontal") {
					if (event.key === "ArrowRight") {
						nextIndex = (currentIndex + 1) % triggers.length;
					} else if (event.key === "ArrowLeft") {
						nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
					}
				} else {
					if (event.key === "ArrowDown") {
						nextIndex = (currentIndex + 1) % triggers.length;
					} else if (event.key === "ArrowUp") {
						nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
					}
				}

				if (event.key === "Home") {
					nextIndex = 0;
				} else if (event.key === "End") {
					nextIndex = triggers.length - 1;
				}

				if (nextIndex !== null) {
					event.preventDefault();
					const nextTrigger = triggers[nextIndex];
					nextTrigger?.focus();
					if (context.activationMode === "automatic") {
						const nextValue = nextTrigger?.getAttribute("data-value");
						if (nextValue) {
							context.onChange(nextValue);
						}
					}
				}
			},
			[disabled, context],
		);

		return (
			<button
				ref={ref}
				type="button"
				role="tab"
				id={`${context.baseId}-trigger-${value}`}
				aria-controls={`${context.baseId}-content-${value}`}
				aria-selected={isSelected}
				tabIndex={isSelected ? 0 : -1}
				disabled={disabled}
				data-state={isSelected ? "active" : "inactive"}
				data-value={value}
				data-disabled={disabled || undefined}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Trigger.displayName = "Tabs.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Value that identifies this tab content */
	value: string;
	/** Whether to keep content mounted when inactive */
	forceMount?: boolean;
	/** Children */
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, TabsContentProps>((props, ref) => {
	const { value, forceMount, children, className, ...rest } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;

	if (!isSelected && !forceMount) {
		return null;
	}

	return (
		<div
			ref={ref}
			role="tabpanel"
			id={`${context.baseId}-content-${value}`}
			aria-labelledby={`${context.baseId}-trigger-${value}`}
			hidden={!isSelected}
			// biome-ignore lint/a11y/noNoninteractiveTabindex: tabIndex={0} on tabpanel is WAI-ARIA standard pattern for keyboard navigation
			tabIndex={0}
			data-state={isSelected ? "active" : "inactive"}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Content.displayName = "Tabs.Content";

// ============================================================================
// Export
// ============================================================================

export const Tabs = {
	Root,
	List,
	Trigger,
	Content,
};
