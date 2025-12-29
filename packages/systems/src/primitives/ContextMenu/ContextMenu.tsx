"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Context
// ============================================================================

interface ContextMenuContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	position: { x: number; y: number } | null;
	setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue | null>(null);

function useContextMenuContext() {
	const context = useContext(ContextMenuContext);
	if (!context) {
		throw new Error(
			"ContextMenu components must be used within ContextMenu.Root",
		);
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface ContextMenuRootProps {
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

function Root(props: ContextMenuRootProps) {
	const { onOpenChange, children } = props;

	const [open, setOpen] = useState(false);
	const [position, setPosition] = useState<{ x: number; y: number } | null>(
		null,
	);

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			setOpen(newOpen);
			onOpenChange?.(newOpen);
		},
		[onOpenChange],
	);

	// Close on escape
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				handleOpenChange(false);
			}
		};

		const handleClick = () => {
			handleOpenChange(false);
		};

		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("click", handleClick);
		};
	}, [open, handleOpenChange]);

	return (
		<ContextMenuContext.Provider
			value={{ open, onOpenChange: handleOpenChange, position, setPosition }}
		>
			{children}
		</ContextMenuContext.Provider>
	);
}

Root.displayName = "ContextMenu.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface ContextMenuTriggerProps
	extends HTMLAttributes<HTMLSpanElement> {
	/** Whether the trigger is disabled */
	disabled?: boolean;
	children: ReactNode;
}

const Trigger = forwardRef<HTMLSpanElement, ContextMenuTriggerProps>(
	(props, ref) => {
		const {
			disabled = false,
			children,
			onContextMenu,
			className,
			...rest
		} = props;
		const context = useContextMenuContext();

		const handleContextMenu = useCallback(
			(event: React.MouseEvent<HTMLSpanElement>) => {
				if (disabled) return;
				event.preventDefault();
				context.setPosition({ x: event.clientX, y: event.clientY });
				context.onOpenChange(true);
				onContextMenu?.(event);
			},
			[context, disabled, onContextMenu],
		);

		return (
			// biome-ignore lint/a11y/noStaticElementInteractions: Trigger responds to right-click (contextmenu) which has no keyboard equivalent
			<span
				ref={ref}
				data-disabled={disabled ? "" : undefined}
				onContextMenu={handleContextMenu}
				className={className}
				{...rest}
			>
				{children}
			</span>
		);
	},
);

Trigger.displayName = "ContextMenu.Trigger";

// ============================================================================
// Portal
// ============================================================================

export interface ContextMenuPortalProps {
	/** Container element to render into */
	container?: Element | null;
	children: ReactNode;
}

function Portal(props: ContextMenuPortalProps) {
	const { container, children } = props;
	const context = useContextMenuContext();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !context.open) return null;

	return createPortal(children, container || document.body);
}

Portal.displayName = "ContextMenu.Portal";

// ============================================================================
// Content
// ============================================================================

export interface ContextMenuContentProps
	extends HTMLAttributes<HTMLDivElement> {
	/** Side offset from cursor */
	sideOffset?: number;
	/** Align offset from cursor */
	alignOffset?: number;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, ContextMenuContentProps>(
	(props, ref) => {
		const {
			sideOffset = 0,
			alignOffset = 0,
			children,
			className,
			style,
			...rest
		} = props;
		const context = useContextMenuContext();

		return (
			<div
				ref={ref}
				role="menu"
				data-state={context.open ? "open" : "closed"}
				className={className}
				style={{
					position: "fixed",
					top: (context.position?.y ?? 0) + sideOffset,
					left: (context.position?.x ?? 0) + alignOffset,
					...style,
				}}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Content.displayName = "ContextMenu.Content";

// ============================================================================
// Item
// ============================================================================

export interface ContextMenuItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Called when item is selected */
	onSelect?: () => void;
	children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, ContextMenuItemProps>((props, ref) => {
	const {
		disabled = false,
		onSelect,
		children,
		onClick,
		className,
		...rest
	} = props;
	const context = useContextMenuContext();

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (disabled) return;
			event.stopPropagation();
			onSelect?.();
			context.onOpenChange(false);
			onClick?.(event);
		},
		[disabled, onSelect, context, onClick],
	);

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				event.stopPropagation();
				onSelect?.();
				context.onOpenChange(false);
			}
		},
		[disabled, onSelect, context],
	);

	return (
		<div
			ref={ref}
			role="menuitem"
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled}
			data-disabled={disabled ? "" : undefined}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Item.displayName = "ContextMenu.Item";

// ============================================================================
// Separator
// ============================================================================

export interface ContextMenuSeparatorProps
	extends HTMLAttributes<HTMLHRElement> {}

const Separator = forwardRef<HTMLHRElement, ContextMenuSeparatorProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return <hr ref={ref} className={className} {...rest} />;
	},
);

Separator.displayName = "ContextMenu.Separator";

// ============================================================================
// Label
// ============================================================================

export interface ContextMenuLabelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Label = forwardRef<HTMLDivElement, ContextMenuLabelProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<div ref={ref} className={className} {...rest}>
				{children}
			</div>
		);
	},
);

Label.displayName = "ContextMenu.Label";

// ============================================================================
// Export
// ============================================================================

export const ContextMenu = {
	Root,
	Trigger,
	Portal,
	Content,
	Item,
	Separator,
	Label,
};
