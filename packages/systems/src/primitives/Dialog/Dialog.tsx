"use client";

import {
	type ButtonHTMLAttributes,
	forwardRef,
	type HTMLAttributes,
	type MouseEvent,
	type ReactNode,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { createPortal } from "react-dom";
import { useFocusTrap } from "../../utils/accessibility";
import { DialogProvider, useDialogContext } from "./DialogContext";
import { type UseDialogProps, useDialog } from "./useDialog";

// ============================================================================
// Dialog.Root
// ============================================================================

export interface DialogRootProps extends UseDialogProps {
	children: ReactNode;
}

/**
 * Dialog.Root - Container for the dialog
 */
function DialogRoot({ children, ...props }: DialogRootProps) {
	const context = useDialog(props);
	return <DialogProvider value={context}>{children}</DialogProvider>;
}

// ============================================================================
// Dialog.Trigger
// ============================================================================

export interface DialogTriggerProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
}

/**
 * Dialog.Trigger - Button that opens the dialog
 */
const DialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerProps>(
	({ children, className, onClick, ...props }, ref) => {
		const { open, isOpen, id } = useDialogContext();

		const handleClick = useCallback(
			(event: MouseEvent<HTMLButtonElement>) => {
				open();
				onClick?.(event);
			},
			[open, onClick],
		);

		return (
			<button
				ref={ref}
				type="button"
				aria-haspopup="dialog"
				aria-expanded={isOpen}
				aria-controls={`${id}-content`}
				className={className}
				onClick={handleClick}
				{...props}
			>
				{children}
			</button>
		);
	},
);

DialogTrigger.displayName = "Dialog.Trigger";

// ============================================================================
// Dialog.Portal
// ============================================================================

export interface DialogPortalProps {
	children: ReactNode;
	container?: Element | null;
}

/**
 * Dialog.Portal - Renders children in a portal
 */
function DialogPortal({ children, container }: DialogPortalProps) {
	const { isOpen } = useDialogContext();

	if (!isOpen) return null;

	const target =
		container || (typeof document !== "undefined" ? document.body : null);
	if (!target) return null;

	return createPortal(children, target);
}

// ============================================================================
// Dialog.Backdrop
// ============================================================================

export interface DialogBackdropProps extends HTMLAttributes<HTMLDivElement> {
	className?: string;
}

/**
 * Dialog.Backdrop - Overlay behind the dialog
 */
const DialogBackdrop = forwardRef<HTMLDivElement, DialogBackdropProps>(
	({ className, onClick, ...props }, ref) => {
		const { close, isModal } = useDialogContext();

		const handleClick = useCallback(
			(event: MouseEvent<HTMLDivElement>) => {
				if (isModal && event.target === event.currentTarget) {
					close();
				}
				onClick?.(event);
			},
			[close, isModal, onClick],
		);

		return (
			<div
				ref={ref}
				className={className}
				data-dialog-backdrop=""
				aria-hidden="true"
				onClick={handleClick}
				{...props}
			/>
		);
	},
);

DialogBackdrop.displayName = "Dialog.Backdrop";

// ============================================================================
// Dialog.Content
// ============================================================================

export interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
	/** Accessible label when no Dialog.Title is used. Takes precedence over aria-labelledby. */
	"aria-label"?: string;
	/** Disable focus trap (not recommended for accessibility) */
	disableFocusTrap?: boolean;
}

/**
 * Dialog.Content - The dialog content container
 */
const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
	(
		{
			children,
			className,
			"aria-label": ariaLabel,
			disableFocusTrap = false,
			...props
		},
		ref,
	) => {
		const { id, isModal, titleId, descriptionId, close } = useDialogContext();
		const internalRef = useRef<HTMLDivElement>(null);
		const contentRef = (ref as React.RefObject<HTMLDivElement>) || internalRef;

		// Use focus trap hook
		useFocusTrap(contentRef, {
			enabled: isModal && !disableFocusTrap,
			onEscape: close,
		});

		// Lock body scroll when modal is open
		useEffect(() => {
			if (!isModal) return;

			const originalOverflow = document.body.style.overflow;
			const originalPaddingRight = document.body.style.paddingRight;

			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;

			document.body.style.overflow = "hidden";
			if (scrollbarWidth > 0) {
				document.body.style.paddingRight = `${scrollbarWidth}px`;
			}

			return () => {
				document.body.style.overflow = originalOverflow;
				document.body.style.paddingRight = originalPaddingRight;
			};
		}, [isModal]);

		return (
			<div
				ref={contentRef}
				id={`${id}-content`}
				role="dialog"
				aria-modal={isModal}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabel ? undefined : titleId}
				aria-describedby={descriptionId}
				className={className}
				data-dialog-content=""
				{...props}
			>
				{children}
			</div>
		);
	},
);

DialogContent.displayName = "Dialog.Content";

// ============================================================================
// Dialog.Title
// ============================================================================

export interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
	children: ReactNode;
	className?: string;
}

/**
 * Dialog.Title - The dialog title
 */
const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(
	({ children, className, ...props }, ref) => {
		const { titleId } = useDialogContext();

		return (
			<h2 ref={ref} id={titleId} className={className} {...props}>
				{children}
			</h2>
		);
	},
);

DialogTitle.displayName = "Dialog.Title";

// ============================================================================
// Dialog.Description
// ============================================================================

export interface DialogDescriptionProps
	extends HTMLAttributes<HTMLParagraphElement> {
	children: ReactNode;
	className?: string;
}

/**
 * Dialog.Description - The dialog description
 */
const DialogDescription = forwardRef<
	HTMLParagraphElement,
	DialogDescriptionProps
>(({ children, className, ...props }, ref) => {
	const { descriptionId } = useDialogContext();

	return (
		<p ref={ref} id={descriptionId} className={className} {...props}>
			{children}
		</p>
	);
});

DialogDescription.displayName = "Dialog.Description";

// ============================================================================
// Dialog.Close
// ============================================================================

export interface DialogCloseProps
	extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
}

/**
 * Dialog.Close - Button that closes the dialog
 */
const DialogClose = forwardRef<HTMLButtonElement, DialogCloseProps>(
	({ children, className, onClick, ...props }, ref) => {
		const { close } = useDialogContext();

		const handleClick = useCallback(
			(event: MouseEvent<HTMLButtonElement>) => {
				close();
				onClick?.(event);
			},
			[close, onClick],
		);

		return (
			<button
				ref={ref}
				type="button"
				className={className}
				onClick={handleClick}
				{...props}
			>
				{children}
			</button>
		);
	},
);

DialogClose.displayName = "Dialog.Close";

// ============================================================================
// Export
// ============================================================================

export const Dialog = {
	Root: DialogRoot,
	Trigger: DialogTrigger,
	Portal: DialogPortal,
	Backdrop: DialogBackdrop,
	Content: DialogContent,
	Title: DialogTitle,
	Description: DialogDescription,
	Close: DialogClose,
};
