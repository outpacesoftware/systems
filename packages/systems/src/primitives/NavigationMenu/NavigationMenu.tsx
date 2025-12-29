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

// ============================================================================
// Context
// ============================================================================

interface NavigationMenuContextValue {
	value: string;
	onValueChange: (value: string) => void;
	orientation: "horizontal" | "vertical";
	openItem: string | null;
	setOpenItem: (value: string | null) => void;
	registerTrigger: (value: string, ref: HTMLButtonElement) => void;
	unregisterTrigger: (value: string) => void;
	triggerRefs: Map<string, HTMLButtonElement>;
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(
	null,
);

function useNavigationMenuContext() {
	const context = useContext(NavigationMenuContext);
	if (!context) {
		throw new Error(
			"NavigationMenu components must be used within NavigationMenu.Root",
		);
	}
	return context;
}

interface NavigationMenuItemContextValue {
	value: string;
	isOpen: boolean;
	triggerId: string;
	contentId: string;
}

const NavigationMenuItemContext =
	createContext<NavigationMenuItemContextValue | null>(null);

function useNavigationMenuItemContext() {
	const context = useContext(NavigationMenuItemContext);
	if (!context) {
		throw new Error(
			"NavigationMenu.Trigger/Content must be used within NavigationMenu.Item",
		);
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface NavigationMenuRootProps extends HTMLAttributes<HTMLElement> {
	/** Currently active item */
	value?: string;
	/** Default active item */
	defaultValue?: string;
	/** Called when active item changes */
	onValueChange?: (value: string) => void;
	/** Orientation */
	orientation?: "horizontal" | "vertical";
	/** Accessible label for the navigation */
	"aria-label"?: string;
	children: ReactNode;
}

const Root = forwardRef<HTMLElement, NavigationMenuRootProps>((props, ref) => {
	const {
		value: controlledValue,
		defaultValue = "",
		onValueChange,
		orientation = "horizontal",
		"aria-label": ariaLabel = "Main navigation",
		children,
		className,
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(defaultValue);
	const [openItem, setOpenItem] = useState<string | null>(null);
	const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;

	const handleValueChange = useCallback(
		(newValue: string) => {
			if (!isControlled) {
				setInternalValue(newValue);
			}
			onValueChange?.(newValue);
		},
		[isControlled, onValueChange],
	);

	const registerTrigger = useCallback(
		(itemValue: string, triggerRef: HTMLButtonElement) => {
			triggerRefs.current.set(itemValue, triggerRef);
		},
		[],
	);

	const unregisterTrigger = useCallback((itemValue: string) => {
		triggerRefs.current.delete(itemValue);
	}, []);

	// Handle keyboard navigation at root level
	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLElement>) => {
			const triggers = Array.from(triggerRefs.current.entries());
			if (triggers.length === 0) return;

			const currentIndex = triggers.findIndex(
				([, el]) => el === document.activeElement,
			);
			if (currentIndex === -1) return;

			const isHorizontal = orientation === "horizontal";
			const prevKey = isHorizontal ? "ArrowLeft" : "ArrowUp";
			const nextKey = isHorizontal ? "ArrowRight" : "ArrowDown";

			switch (event.key) {
				case prevKey: {
					event.preventDefault();
					const newIndex =
						currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
					triggers[newIndex][1].focus();
					break;
				}
				case nextKey: {
					event.preventDefault();
					const newIndex =
						currentIndex === triggers.length - 1 ? 0 : currentIndex + 1;
					triggers[newIndex][1].focus();
					break;
				}
				case "Home": {
					event.preventDefault();
					triggers[0][1].focus();
					break;
				}
				case "End": {
					event.preventDefault();
					triggers[triggers.length - 1][1].focus();
					break;
				}
				case "Escape": {
					event.preventDefault();
					setOpenItem(null);
					break;
				}
			}
		},
		[orientation],
	);

	return (
		<NavigationMenuContext.Provider
			value={{
				value,
				onValueChange: handleValueChange,
				orientation,
				openItem,
				setOpenItem,
				registerTrigger,
				unregisterTrigger,
				triggerRefs: triggerRefs.current,
			}}
		>
			<nav
				ref={ref}
				aria-label={ariaLabel}
				data-orientation={orientation}
				className={className}
				onKeyDown={handleKeyDown}
				{...rest}
			>
				{children}
			</nav>
		</NavigationMenuContext.Provider>
	);
});

Root.displayName = "NavigationMenu.Root";

// ============================================================================
// List
// ============================================================================

export interface NavigationMenuListProps
	extends HTMLAttributes<HTMLUListElement> {
	children: ReactNode;
}

const List = forwardRef<HTMLUListElement, NavigationMenuListProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useNavigationMenuContext();

		return (
			<ul
				ref={ref}
				// biome-ignore lint/a11y/noNoninteractiveElementToInteractiveRole: ul with role="menubar" is WAI-ARIA standard pattern for navigation menus
				role="menubar"
				aria-orientation={context.orientation}
				data-orientation={context.orientation}
				className={className}
				{...rest}
			>
				{children}
			</ul>
		);
	},
);

List.displayName = "NavigationMenu.List";

// ============================================================================
// Item
// ============================================================================

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
	/** Unique value for this item */
	value: string;
	children: ReactNode;
}

const Item = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
	(props, ref) => {
		const { value, children, className, ...rest } = props;
		const context = useNavigationMenuContext();
		const triggerId = useId();
		const contentId = useId();

		const isOpen = context.openItem === value;

		return (
			<NavigationMenuItemContext.Provider
				value={{
					value,
					isOpen,
					triggerId,
					contentId,
				}}
			>
				<li ref={ref} role="none" className={className} {...rest}>
					{children}
				</li>
			</NavigationMenuItemContext.Provider>
		);
	},
);

Item.displayName = "NavigationMenu.Item";

// ============================================================================
// Trigger
// ============================================================================

export interface NavigationMenuTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
	(props, ref) => {
		const { children, className, onClick, onKeyDown, ...rest } = props;
		const context = useNavigationMenuContext();
		const itemContext = useNavigationMenuItemContext();
		const internalRef = useRef<HTMLButtonElement>(null);

		// Combine refs
		const buttonRef =
			(ref as React.RefObject<HTMLButtonElement>) || internalRef;

		// Register trigger on mount
		useEffect(() => {
			const element = buttonRef.current;
			if (element) {
				context.registerTrigger(itemContext.value, element);
			}
			return () => {
				context.unregisterTrigger(itemContext.value);
			};
		}, [buttonRef, context, itemContext.value]);

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				onClick?.(event);
				context.setOpenItem(itemContext.isOpen ? null : itemContext.value);
			},
			[onClick, context, itemContext.isOpen, itemContext.value],
		);

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				onKeyDown?.(event);

				switch (event.key) {
					case "Enter":
					case " ":
						event.preventDefault();
						context.setOpenItem(itemContext.isOpen ? null : itemContext.value);
						break;
					case "ArrowDown":
						if (!itemContext.isOpen) {
							event.preventDefault();
							context.setOpenItem(itemContext.value);
						}
						break;
				}
			},
			[onKeyDown, context, itemContext.isOpen, itemContext.value],
		);

		return (
			<button
				ref={buttonRef}
				type="button"
				id={itemContext.triggerId}
				role="menuitem"
				aria-haspopup="menu"
				aria-expanded={itemContext.isOpen}
				aria-controls={itemContext.contentId}
				data-state={itemContext.isOpen ? "open" : "closed"}
				className={className}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Trigger.displayName = "NavigationMenu.Trigger";

// ============================================================================
// Content
// ============================================================================

export interface NavigationMenuContentProps
	extends HTMLAttributes<HTMLDivElement> {
	/** Force mount (useful for animations) */
	forceMount?: boolean;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
	(props, ref) => {
		const { forceMount = false, children, className, ...rest } = props;
		const itemContext = useNavigationMenuItemContext();

		// Don't render if not open and not forced
		if (!itemContext.isOpen && !forceMount) {
			return null;
		}

		return (
			<div
				ref={ref}
				id={itemContext.contentId}
				role="menu"
				aria-labelledby={itemContext.triggerId}
				aria-hidden={!itemContext.isOpen}
				data-state={itemContext.isOpen ? "open" : "closed"}
				className={className}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Content.displayName = "NavigationMenu.Content";

// ============================================================================
// Link
// ============================================================================

export interface NavigationMenuLinkProps
	extends HTMLAttributes<HTMLAnchorElement> {
	/** Link href */
	href: string;
	/** Whether this link is currently active */
	active?: boolean;
	children: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
	(props, ref) => {
		const {
			href,
			active = false,
			children,
			className,
			onKeyDown,
			...rest
		} = props;

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLAnchorElement>) => {
				onKeyDown?.(event);

				if (event.key === "Enter" || event.key === " ") {
					// Let Enter work naturally for links
					// Space should also activate (for accessibility)
					if (event.key === " ") {
						event.preventDefault();
						(event.target as HTMLAnchorElement).click();
					}
				}
			},
			[onKeyDown],
		);

		return (
			<a
				ref={ref}
				href={href}
				role="menuitem"
				tabIndex={0}
				aria-current={active ? "page" : undefined}
				data-active={active ? "" : undefined}
				className={className}
				onKeyDown={handleKeyDown}
				{...rest}
			>
				{children}
			</a>
		);
	},
);

Link.displayName = "NavigationMenu.Link";

// ============================================================================
// Indicator
// ============================================================================

export interface NavigationMenuIndicatorProps
	extends HTMLAttributes<HTMLDivElement> {}

const Indicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
	(props, ref) => {
		const { className, ...rest } = props;

		return <div ref={ref} aria-hidden="true" className={className} {...rest} />;
	},
);

Indicator.displayName = "NavigationMenu.Indicator";

// ============================================================================
// Viewport
// ============================================================================

export interface NavigationMenuViewportProps
	extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

const Viewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;
		const context = useNavigationMenuContext();

		return (
			<div
				ref={ref}
				role="presentation"
				data-state={context.openItem ? "open" : "closed"}
				aria-hidden={!context.openItem}
				className={className}
				{...rest}
			>
				{children}
			</div>
		);
	},
);

Viewport.displayName = "NavigationMenu.Viewport";

// ============================================================================
// Export
// ============================================================================

export const NavigationMenu = {
	Root,
	List,
	Item,
	Trigger,
	Content,
	Link,
	Indicator,
	Viewport,
};
