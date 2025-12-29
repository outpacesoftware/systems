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
// Types
// ============================================================================

export interface TabsProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Current active tab value */
	value?: string;
	/** Default value for uncontrolled */
	defaultValue?: string;
	/** Change handler */
	onChange?: (value: string) => void;
	/** Size variant */
	size?: "sm" | "md";
	/** Children */
	children: ReactNode;
}

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

export interface TabsTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Tab value */
	value: string;
	/** Tab content */
	children: ReactNode;
}

export interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Tab value */
	value: string;
	/** Content */
	children: ReactNode;
}

// ============================================================================
// Context
// ============================================================================

interface TabsContextValue {
	value: string;
	onChange: (value: string) => void;
	size: "sm" | "md";
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("Tabs components must be used within Tabs");
	}
	return context;
}

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
	sm: {
		trigger: "px-3 py-1.5 text-[12px] leading-[15px]",
	},
	md: {
		trigger: "px-4 py-2 text-[13px] leading-4",
	},
};

// ============================================================================
// Tabs
// ============================================================================

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(
	(
		{
			value: controlledValue,
			defaultValue = "",
			onChange,
			size = "md",
			children,
			className = "",
			...props
		},
		ref,
	) => {
		const [internalValue, setInternalValue] = useState(defaultValue);
		const isControlled = controlledValue !== undefined;
		const value = isControlled ? controlledValue : internalValue;

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
			<TabsContext.Provider value={{ value, onChange: handleChange, size }}>
				<div ref={ref} className={`flex flex-col ${className}`} {...props}>
					{children}
				</div>
			</TabsContext.Provider>
		);
	},
);

TabsRoot.displayName = "Tabs";

// ============================================================================
// Tabs.List
// ============================================================================

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
	({ children, className = "", ...props }, ref) => {
		return (
			<div
				ref={ref}
				role="tablist"
				className={`
          relative inline-flex items-center gap-1 p-1
          bg-white/4 rounded-lg
          before:absolute before:inset-0 before:rounded-lg before:pointer-events-none
          before:ring-1 before:ring-inset before:ring-white/8
          ${className}
        `}
				{...props}
			>
				{children}
			</div>
		);
	},
);

TabsList.displayName = "Tabs.List";

// ============================================================================
// Tabs.Trigger
// ============================================================================

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
	({ value, children, className = "", ...props }, ref) => {
		const context = useTabsContext();
		const isActive = context.value === value;
		const sizes = sizeStyles[context.size];

		return (
			<button
				ref={ref}
				role="tab"
				type="button"
				aria-selected={isActive}
				data-state={isActive ? "active" : "inactive"}
				onClick={() => context.onChange(value)}
				className={`
          relative ${sizes.trigger}
          font-medium tracking-[0.12px] rounded-md
          transition-all cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24
          ${
						isActive
							? "bg-white/8 text-white/88 before:absolute before:inset-0 before:rounded-md before:ring-1 before:ring-inset before:ring-white/8 before:pointer-events-none"
							: "text-white/48 hover:text-white/72 hover:bg-white/4"
					}
          ${className}
        `}
				{...props}
			>
				<span className="relative z-10">{children}</span>
			</button>
		);
	},
);

TabsTrigger.displayName = "Tabs.Trigger";

// ============================================================================
// Tabs.Content
// ============================================================================

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
	({ value, children, className = "", ...props }, ref) => {
		const context = useTabsContext();
		const isActive = context.value === value;

		if (!isActive) return null;

		return (
			<div
				ref={ref}
				role="tabpanel"
				data-state={isActive ? "active" : "inactive"}
				className={`pt-4 ${className}`}
				{...props}
			>
				{children}
			</div>
		);
	},
);

TabsContent.displayName = "Tabs.Content";

// ============================================================================
// Export
// ============================================================================

export const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
});
