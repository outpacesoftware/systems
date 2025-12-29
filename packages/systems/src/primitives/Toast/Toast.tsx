"use client";

import {
	type ButtonHTMLAttributes,
	createContext,
	forwardRef,
	type HTMLAttributes,
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

interface ToastContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	duration: number;
	type: "foreground" | "background";
}

const ToastContext = createContext<ToastContextValue | null>(null);

function useToastContext() {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("Toast components must be used within Toast.Root");
	}
	return context;
}

// ============================================================================
// Provider
// ============================================================================

export interface ToastProviderProps {
	/** Duration in ms before toast auto-closes */
	duration?: number;
	/** Swipe direction to dismiss */
	swipeDirection?: "right" | "left" | "up" | "down";
	/** Threshold for swipe to dismiss */
	swipeThreshold?: number;
	children: ReactNode;
}

function Provider(props: ToastProviderProps) {
	const { duration = 5000, children } = props;

	return <>{children}</>;
}

Provider.displayName = "Toast.Provider";

// ============================================================================
// Viewport
// ============================================================================

export interface ToastViewportProps extends HTMLAttributes<HTMLOListElement> {
	/** Accessible label */
	label?: string;
	/** Hotkey to focus viewport */
	hotkey?: string[];
}

const Viewport = forwardRef<HTMLOListElement, ToastViewportProps>(
	(props, ref) => {
		const {
			label = "Notifications",
			hotkey = ["F8"],
			className,
			children,
			...rest
		} = props;

		useEffect(() => {
			const handleKeyDown = (event: KeyboardEvent) => {
				if (hotkey.includes(event.key)) {
					(ref as React.RefObject<HTMLOListElement>)?.current?.focus();
				}
			};

			document.addEventListener("keydown", handleKeyDown);
			return () => document.removeEventListener("keydown", handleKeyDown);
		}, [hotkey, ref]);

		return (
			<ol
				ref={ref}
				role="region"
				aria-label={label}
				tabIndex={-1}
				className={className}
				{...rest}
			>
				{children}
			</ol>
		);
	},
);

Viewport.displayName = "Toast.Viewport";

// ============================================================================
// Root
// ============================================================================

export interface ToastRootProps extends HTMLAttributes<HTMLLIElement> {
	/** Whether the toast is open */
	open?: boolean;
	/** Default open state */
	defaultOpen?: boolean;
	/** Called when open state changes */
	onOpenChange?: (open: boolean) => void;
	/** Duration in ms before auto-close (0 = never) */
	duration?: number;
	/** Toast type for accessibility */
	type?: "foreground" | "background";
	children: ReactNode;
}

const Root = forwardRef<HTMLLIElement, ToastRootProps>((props, ref) => {
	const {
		open: controlledOpen,
		defaultOpen = true,
		onOpenChange,
		duration = 5000,
		type = "foreground",
		children,
		className,
		...rest
	} = props;

	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange],
	);

	useEffect(() => {
		if (!open || duration === 0) return;

		const timer = setTimeout(() => {
			handleOpenChange(false);
		}, duration);

		return () => clearTimeout(timer);
	}, [open, duration, handleOpenChange]);

	if (!open) return null;

	return (
		<ToastContext.Provider
			value={{ open, onOpenChange: handleOpenChange, duration, type }}
		>
			<li
				ref={ref}
				role={type === "foreground" ? "alert" : "status"}
				aria-live={type === "foreground" ? "assertive" : "polite"}
				aria-atomic="true"
				data-state={open ? "open" : "closed"}
				className={className}
				{...rest}
			>
				{children}
			</li>
		</ToastContext.Provider>
	);
});

Root.displayName = "Toast.Root";

// ============================================================================
// Title
// ============================================================================

export interface ToastTitleProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Title = forwardRef<HTMLDivElement, ToastTitleProps>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<div ref={ref} className={className} {...rest}>
			{children}
		</div>
	);
});

Title.displayName = "Toast.Title";

// ============================================================================
// Description
// ============================================================================

export interface ToastDescriptionProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Description = forwardRef<HTMLDivElement, ToastDescriptionProps>(
	(props, ref) => {
		const { children, className, ...rest } = props;

		return (
			<div ref={ref} className={className} {...rest}>
				{children}
			</div>
		);
	},
);

Description.displayName = "Toast.Description";

// ============================================================================
// Action
// ============================================================================

export interface ToastActionProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Accessible label for the action */
	altText: string;
	children: ReactNode;
}

const Action = forwardRef<HTMLButtonElement, ToastActionProps>((props, ref) => {
	const { altText, children, className, ...rest } = props;

	return (
		<button
			ref={ref}
			type="button"
			aria-label={altText}
			className={className}
			{...rest}
		>
			{children}
		</button>
	);
});

Action.displayName = "Toast.Action";

// ============================================================================
// Close
// ============================================================================

export interface ToastCloseProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
}

const Close = forwardRef<HTMLButtonElement, ToastCloseProps>((props, ref) => {
	const { children, className, onClick, ...rest } = props;
	const context = useToastContext();

	const handleClick = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			context.onOpenChange(false);
			onClick?.(event);
		},
		[context, onClick],
	);

	return (
		<button
			ref={ref}
			type="button"
			aria-label="Close"
			onClick={handleClick}
			className={className}
			{...rest}
		>
			{children}
		</button>
	);
});

Close.displayName = "Toast.Close";

// ============================================================================
// Export
// ============================================================================

export const Toast = {
	Provider,
	Viewport,
	Root,
	Title,
	Description,
	Action,
	Close,
};
