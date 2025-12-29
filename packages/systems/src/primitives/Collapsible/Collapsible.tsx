"use client";

import {
	type ButtonHTMLAttributes,
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

interface CollapsibleContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	disabled: boolean;
	contentId: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

function useCollapsibleContext() {
	const context = useContext(CollapsibleContext);
	if (!context) {
		throw new Error(
			"Collapsible components must be used within Collapsible.Root",
		);
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface CollapsibleRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether the content is visible */
	open?: boolean;
	/** Default open state */
	defaultOpen?: boolean;
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Whether the collapsible is disabled */
	disabled?: boolean;
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, CollapsibleRootProps>((props, ref) => {
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		disabled = false,
		children,
		className,
		...rest
	} = props;

	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const contentId = useId();

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (disabled) return;
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[disabled, isControlled, onOpenChange],
	);

	return (
		<CollapsibleContext.Provider
			value={{ open, onOpenChange: handleOpenChange, disabled, contentId }}
		>
			<div
				ref={ref}
				data-state={open ? "open" : "closed"}
				data-disabled={disabled ? "" : undefined}
				className={className}
				{...rest}
			>
				{children}
			</div>
		</CollapsibleContext.Provider>
	);
});

Root.displayName = "Collapsible.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface CollapsibleTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, CollapsibleTriggerProps>(
	(props, ref) => {
		const { children, onClick, className, ...rest } = props;
		const context = useCollapsibleContext();

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
				aria-expanded={context.open}
				aria-controls={context.contentId}
				disabled={context.disabled}
				data-state={context.open ? "open" : "closed"}
				data-disabled={context.disabled ? "" : undefined}
				onClick={handleClick}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Trigger.displayName = "Collapsible.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface CollapsibleContentProps
	extends HTMLAttributes<HTMLDivElement> {
	/** Force mount (for animation) */
	forceMount?: boolean;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, CollapsibleContentProps>(
	(props, ref) => {
		const { forceMount = false, children, className, style, ...rest } = props;
		const context = useCollapsibleContext();

		if (!context.open && !forceMount) return null;

		return (
			<div
				ref={ref}
				id={context.contentId}
				data-state={context.open ? "open" : "closed"}
				data-disabled={context.disabled ? "" : undefined}
				hidden={!context.open}
				className={className}
				style={style}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Content.displayName = "Collapsible.Content";

// ============================================================================
// Export
// ============================================================================

export const Collapsible = {
	Root,
	Trigger,
	Content,
};
