"use client";

import {
	type ButtonHTMLAttributes,
	createContext,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";
import { createPortal } from "react-dom";

// ============================================================================
// Context
// ============================================================================

interface MenuContextValue {
	open: boolean;
	setOpen: (open: boolean) => void;
	triggerId: string;
	contentId: string;
	activeIndex: number;
	setActiveIndex: (index: number) => void;
	items: React.RefObject<HTMLElement | null>[];
	registerItem: (ref: React.RefObject<HTMLElement | null>) => void;
	unregisterItem: (ref: React.RefObject<HTMLElement | null>) => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext() {
	const context = useContext(MenuContext);
	if (!context) {
		throw new Error("Menu components must be used within Menu.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface MenuRootProps {
	/** Whether the menu is open (controlled) */
	open?: boolean;
	/** Default open state */
	defaultOpen?: boolean;
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

function Root(props: MenuRootProps) {
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		children,
	} = props;

	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const [activeIndex, setActiveIndex] = useState(-1);
	const [items, setItems] = useState<React.RefObject<HTMLElement | null>[]>([]);

	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const baseId = useId();
	const triggerId = `${baseId}-trigger`;
	const contentId = `${baseId}-content`;

	const setOpen = useCallback(
		(newOpen: boolean) => {
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
			if (!newOpen) {
				setActiveIndex(-1);
			}
		},
		[isControlled, onOpenChange],
	);

	const registerItem = useCallback(
		(ref: React.RefObject<HTMLElement | null>) => {
			setItems((prev) => [...prev, ref]);
		},
		[],
	);

	const unregisterItem = useCallback(
		(ref: React.RefObject<HTMLElement | null>) => {
			setItems((prev) => prev.filter((item) => item !== ref));
		},
		[],
	);

	return (
		<MenuContext.Provider
			value={{
				open,
				setOpen,
				triggerId,
				contentId,
				activeIndex,
				setActiveIndex,
				items,
				registerItem,
				unregisterItem,
			}}
		>
			{children}
		</MenuContext.Provider>
	);
}

Root.displayName = "Menu.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface MenuTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, MenuTriggerProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useMenuContext();

		const handleClick = useCallback(() => {
			context.setOpen(!context.open);
		}, [context]);

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				if (
					event.key === "ArrowDown" ||
					event.key === "Enter" ||
					event.key === " "
				) {
					event.preventDefault();
					context.setOpen(true);
					context.setActiveIndex(0);
				}
			},
			[context],
		);

		return (
			<button
				ref={ref}
				type="button"
				id={context.triggerId}
				aria-haspopup="menu"
				aria-expanded={context.open}
				aria-controls={context.open ? context.contentId : undefined}
				data-state={context.open ? "open" : "closed"}
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

Trigger.displayName = "Menu.Trigger";

// ============================================================================
// Portal
// ============================================================================

export interface MenuPortalProps {
	children: ReactNode;
	container?: HTMLElement;
}

function Portal({ children, container }: MenuPortalProps) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return createPortal(children, container || document.body);
}

Portal.displayName = "Menu.Portal";

// ============================================================================
// Content
// ============================================================================

export interface MenuContentProps extends HTMLAttributes<HTMLDivElement> {
	/** Alignment relative to trigger */
	align?: "start" | "center" | "end";
	/** Side relative to trigger */
	side?: "top" | "right" | "bottom" | "left";
	/** Offset from trigger */
	sideOffset?: number;
	/** Accessible label for the menu. Takes precedence over aria-labelledby. */
	"aria-label"?: string;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, MenuContentProps>((props, ref) => {
	const {
		align = "start",
		side = "bottom",
		sideOffset = 4,
		"aria-label": ariaLabel,
		children,
		className,
		...rest
	} = props;
	const context = useMenuContext();
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!context.open) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const trigger = document.getElementById(context.triggerId);
			if (
				contentRef.current &&
				!contentRef.current.contains(target) &&
				trigger &&
				!trigger.contains(target)
			) {
				context.setOpen(false);
			}
		};

		const handleEscape = (event: globalThis.KeyboardEvent) => {
			if (event.key === "Escape") {
				context.setOpen(false);
				document.getElementById(context.triggerId)?.focus();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleEscape);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleEscape);
		};
	}, [context]);

	useEffect(() => {
		if (
			context.open &&
			context.activeIndex >= 0 &&
			context.items[context.activeIndex]
		) {
			context.items[context.activeIndex].current?.focus();
		}
	}, [context.open, context.activeIndex, context.items]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			const itemCount = context.items.length;

			switch (event.key) {
				case "ArrowDown":
					event.preventDefault();
					context.setActiveIndex((context.activeIndex + 1) % itemCount);
					break;
				case "ArrowUp":
					event.preventDefault();
					context.setActiveIndex(
						(context.activeIndex - 1 + itemCount) % itemCount,
					);
					break;
				case "Home":
					event.preventDefault();
					context.setActiveIndex(0);
					break;
				case "End":
					event.preventDefault();
					context.setActiveIndex(itemCount - 1);
					break;
			}
		},
		[context],
	);

	if (!context.open) return null;

	return (
		<div
			ref={(node) => {
				(contentRef as React.MutableRefObject<HTMLDivElement | null>).current =
					node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			role="menu"
			id={context.contentId}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabel ? undefined : context.triggerId}
			data-state="open"
			data-side={side}
			data-align={align}
			tabIndex={-1}
			onKeyDown={handleKeyDown}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Content.displayName = "Menu.Content";

// ============================================================================
// Item
// ============================================================================

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
	/** Whether the item is disabled */
	disabled?: boolean;
	/** Called when item is selected */
	onSelect?: () => void;
	children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, MenuItemProps>((props, ref) => {
	const { disabled, onSelect, children, className, ...rest } = props;
	const context = useMenuContext();
	const itemRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		context.registerItem(itemRef);
		return () => context.unregisterItem(itemRef);
	}, [context]);

	const handleClick = useCallback(() => {
		if (disabled) return;
		onSelect?.();
		context.setOpen(false);
	}, [disabled, onSelect, context]);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				onSelect?.();
				context.setOpen(false);
			}
		},
		[disabled, onSelect, context],
	);

	return (
		<div
			ref={(node) => {
				(itemRef as React.MutableRefObject<HTMLDivElement | null>).current =
					node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			role="menuitem"
			tabIndex={disabled ? -1 : 0}
			aria-disabled={disabled || undefined}
			data-disabled={disabled || undefined}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Item.displayName = "Menu.Item";

// ============================================================================
// Separator
// ============================================================================

export interface MenuSeparatorProps extends HTMLAttributes<HTMLHRElement> {}

const MenuSeparator = forwardRef<HTMLHRElement, MenuSeparatorProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return <hr ref={ref} className={className} {...rest} />;
	},
);

MenuSeparator.displayName = "Menu.Separator";

// ============================================================================
// Label
// ============================================================================

export interface MenuLabelProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Label = forwardRef<HTMLDivElement, MenuLabelProps>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<div ref={ref} role="presentation" className={className} {...rest}>
			{children}
		</div>
	);
});

Label.displayName = "Menu.Label";

// ============================================================================
// Export
// ============================================================================

export const Menu = {
	Root,
	Trigger,
	Portal,
	Content,
	Item,
	Separator: MenuSeparator,
	Label,
};
