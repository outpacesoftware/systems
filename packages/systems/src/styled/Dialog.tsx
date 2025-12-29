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

interface DialogContextValue {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	titleId: string;
	descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext() {
	const context = useContext(DialogContext);
	if (!context) {
		throw new Error("Dialog components must be used within Dialog.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface DialogRootProps {
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;
	children: ReactNode;
}

function Root(props: DialogRootProps) {
	const {
		open: controlledOpen,
		defaultOpen = false,
		onOpenChange,
		children,
	} = props;

	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;

	const titleId = useId();
	const descriptionId = useId();

	const handleOpenChange = useCallback(
		(newOpen: boolean) => {
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange],
	);

	return (
		<DialogContext.Provider
			value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId }}
		>
			{children}
		</DialogContext.Provider>
	);
}

Root.displayName = "Dialog.Root";

// ============================================================================
// Trigger
// ============================================================================

export interface DialogTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
	(props, ref) => {
		const { children, onClick, className = "", ...rest } = props;
		const context = useDialogContext();

		const handleClick = useCallback(
			(event: React.MouseEvent<HTMLButtonElement>) => {
				context.onOpenChange(true);
				onClick?.(event);
			},
			[context, onClick],
		);

		return (
			<button
				ref={ref}
				type="button"
				aria-haspopup="dialog"
				aria-expanded={context.open}
				onClick={handleClick}
				className={className}
				{...rest}
			>
				{children}
			</button>
		);
	},
);

Trigger.displayName = "Dialog.Trigger";

// ============================================================================
// Portal
// ============================================================================

export interface DialogPortalProps {
	container?: Element | null;
	children: ReactNode;
}

function Portal(props: DialogPortalProps) {
	const { container, children } = props;
	const context = useDialogContext();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted || !context.open) return null;

	return createPortal(children, container || document.body);
}

Portal.displayName = "Dialog.Portal";

// ============================================================================
// Overlay
// ============================================================================

export interface DialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

const Overlay = forwardRef<HTMLDivElement, DialogOverlayProps>((props, ref) => {
	const { className = "", onClick, ...rest } = props;
	const context = useDialogContext();

	const handleClick = useCallback(() => {
		context.onOpenChange(false);
	}, [context]);

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: overlay is decorative backdrop, click-to-close is enhancement
		// biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handling is on the dialog content, not the backdrop
		<div
			ref={ref}
			aria-hidden="true"
			onClick={handleClick}
			className={`
        fixed inset-0 z-50 bg-black/80
        animate-in fade-in-0 duration-200
        ${className}
      `}
			{...rest}
		/>
	);
});

Overlay.displayName = "Dialog.Overlay";

// ============================================================================
// Content
// ============================================================================

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
	onEscapeKeyDown?: (event: KeyboardEvent) => void;
	onPointerDownOutside?: (event: PointerEvent) => void;
	children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, DialogContentProps>((props, ref) => {
	const { children, className = "", onEscapeKeyDown, ...rest } = props;
	const context = useDialogContext();

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onEscapeKeyDown?.(event);
				if (!event.defaultPrevented) {
					context.onOpenChange(false);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [context, onEscapeKeyDown]);

	// Lock body scroll
	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<div className="fixed inset-0 z-50 flex items-start justify-center pt-16 pointer-events-none">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: stopPropagation prevents backdrop clicks, not interactive */}
			<div
				ref={ref}
				role="dialog"
				aria-modal="true"
				aria-labelledby={context.titleId}
				aria-describedby={context.descriptionId}
				onClick={(e) => e.stopPropagation()}
				className={`
          pointer-events-auto
          w-full max-w-md
          flex flex-col gap-5 p-6 rounded-[14px]
          bg-black relative
          border border-white/8
          before:absolute before:inset-0 before:rounded-[14px] before:bg-white/8 before:pointer-events-none
          shadow-2xl
          animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200
          ${className}
        `}
				{...rest}
			>
				{children}
			</div>
		</div>
	);
});

Content.displayName = "Dialog.Content";

// ============================================================================
// Close
// ============================================================================

export interface DialogCloseProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: ReactNode;
}

const Close = forwardRef<HTMLButtonElement, DialogCloseProps>((props, ref) => {
	const { children, onClick, className = "", ...rest } = props;
	const context = useDialogContext();

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
			onClick={handleClick}
			className={`
        absolute top-4 right-4 z-10
        p-1.5 rounded-md
        text-white/48 hover:text-white/88
        hover:bg-white/8
        transition-colors
        ${className}
      `}
			aria-label="Close dialog"
			{...rest}
		>
			{children || (
				<svg
					className="size-4"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<title>Close</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			)}
		</button>
	);
});

Close.displayName = "Dialog.Close";

// ============================================================================
// Title
// ============================================================================

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, DialogTitleProps>((props, ref) => {
	const { children, className = "", ...rest } = props;
	const context = useDialogContext();

	return (
		<h2
			ref={ref}
			id={context.titleId}
			className={`text-[15px] leading-5 font-semibold text-white/88 tracking-[0.12px] ${className}`}
			{...rest}
		>
			{children}
		</h2>
	);
});

Title.displayName = "Dialog.Title";

// ============================================================================
// Description
// ============================================================================

export interface DialogDescriptionProps
	extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
	(props, ref) => {
		const { children, className = "", ...rest } = props;
		const context = useDialogContext();

		return (
			<p
				ref={ref}
				id={context.descriptionId}
				className={`text-[13px] leading-4 text-white/48 tracking-[0.12px] ${className}`}
				{...rest}
			>
				{children}
			</p>
		);
	},
);

Description.displayName = "Dialog.Description";

// ============================================================================
// Footer
// ============================================================================

export interface DialogFooterProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Footer = forwardRef<HTMLDivElement, DialogFooterProps>((props, ref) => {
	const { children, className = "", ...rest } = props;

	return (
		<div
			ref={ref}
			className={`flex items-center justify-end gap-2 pt-2 ${className}`}
			{...rest}
		>
			{children}
		</div>
	);
});

Footer.displayName = "Dialog.Footer";

// ============================================================================
// Export
// ============================================================================

export const Dialog = {
	Root,
	Trigger,
	Portal,
	Overlay,
	Content,
	Close,
	Title,
	Description,
	Footer,
};
