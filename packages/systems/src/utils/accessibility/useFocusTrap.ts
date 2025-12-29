"use client";

import { type RefObject, useCallback, useEffect, useRef } from "react";

const FOCUSABLE_SELECTORS = [
	"a[href]",
	"area[href]",
	'input:not([disabled]):not([type="hidden"])',
	"select:not([disabled])",
	"textarea:not([disabled])",
	"button:not([disabled])",
	"iframe",
	"object",
	"embed",
	"[contenteditable]",
	'[tabindex]:not([tabindex="-1"])',
].join(", ");

export interface UseFocusTrapOptions {
	/** Whether the focus trap is active */
	enabled?: boolean;
	/** Element to focus when trap activates. Defaults to first focusable element. */
	initialFocus?: RefObject<HTMLElement | null>;
	/** Element to return focus to when trap deactivates. Defaults to previously focused element. */
	returnFocus?: RefObject<HTMLElement | null>;
	/** Whether to auto-focus the first focusable element when enabled */
	autoFocus?: boolean;
	/** Whether to restore focus when disabled */
	restoreFocus?: boolean;
	/** Callback when Escape key is pressed. Event passed for preventDefault if needed. */
	onEscape?: (event: KeyboardEvent) => void;
}

/**
 * Hook to trap focus within a container element.
 * Cycles focus through focusable elements when Tab/Shift+Tab is pressed.
 *
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 *
 * @example
 * function Modal({ isOpen, onClose }) {
 *   const containerRef = useRef<HTMLDivElement>(null);
 *
 *   useFocusTrap(containerRef, {
 *     enabled: isOpen,
 *     onEscape: onClose,
 *   });
 *
 *   return (
 *     <div ref={containerRef} role="dialog">
 *       <button>First</button>
 *       <button>Last</button>
 *     </div>
 *   );
 * }
 */
export function useFocusTrap(
	containerRef: RefObject<HTMLElement | null>,
	options: UseFocusTrapOptions = {},
): void {
	const {
		enabled = true,
		initialFocus,
		returnFocus,
		autoFocus = true,
		restoreFocus = true,
		onEscape,
	} = options;

	const previousActiveElement = useRef<HTMLElement | null>(null);

	const getFocusableElements = useCallback((): HTMLElement[] => {
		if (!containerRef.current) return [];

		const elements =
			containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);

		return Array.from(elements).filter(
			(el) =>
				!el.hasAttribute("disabled") &&
				!el.getAttribute("aria-hidden") &&
				el.offsetParent !== null, // Not hidden
		);
	}, [containerRef]);

	const focusFirst = useCallback(() => {
		const elements = getFocusableElements();
		if (elements.length > 0) {
			elements[0].focus();
		}
	}, [getFocusableElements]);

	const focusLast = useCallback(() => {
		const elements = getFocusableElements();
		if (elements.length > 0) {
			elements[elements.length - 1].focus();
		}
	}, [getFocusableElements]);

	// Handle activation and deactivation
	useEffect(() => {
		if (!enabled) return;

		// Store the previously focused element
		previousActiveElement.current = document.activeElement as HTMLElement;

		// Focus initial element
		if (autoFocus) {
			// Use setTimeout to ensure DOM is ready
			const timeoutId = setTimeout(() => {
				if (initialFocus?.current) {
					initialFocus.current.focus();
				} else {
					focusFirst();
				}
			}, 0);

			return () => clearTimeout(timeoutId);
		}
	}, [enabled, autoFocus, initialFocus, focusFirst]);

	// Restore focus on unmount/disable
	useEffect(() => {
		return () => {
			if (restoreFocus) {
				const elementToFocus =
					returnFocus?.current ?? previousActiveElement.current;
				if (elementToFocus && typeof elementToFocus.focus === "function") {
					elementToFocus.focus();
				}
			}
		};
	}, [restoreFocus, returnFocus]);

	// Handle keyboard navigation
	useEffect(() => {
		if (!enabled) return;

		const handleKeyDown = (event: KeyboardEvent) => {
			if (!containerRef.current) return;

			// Handle Escape
			if (event.key === "Escape" && onEscape) {
				onEscape(event);
				return;
			}

			// Handle Tab
			if (event.key === "Tab") {
				const focusableElements = getFocusableElements();

				if (focusableElements.length === 0) {
					event.preventDefault();
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				// Shift + Tab on first element -> focus last
				if (event.shiftKey && document.activeElement === firstElement) {
					event.preventDefault();
					lastElement.focus();
					return;
				}

				// Tab on last element -> focus first
				if (!event.shiftKey && document.activeElement === lastElement) {
					event.preventDefault();
					firstElement.focus();
					return;
				}

				// If focus is outside container, bring it back
				if (!containerRef.current.contains(document.activeElement)) {
					event.preventDefault();
					if (event.shiftKey) {
						lastElement.focus();
					} else {
						firstElement.focus();
					}
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [enabled, containerRef, getFocusableElements, onEscape]);

	// Keep focus within container
	useEffect(() => {
		if (!enabled) return;

		const handleFocusIn = (event: FocusEvent) => {
			if (!containerRef.current) return;

			const target = event.target as HTMLElement;

			// If focus moved outside container, bring it back
			if (!containerRef.current.contains(target)) {
				event.preventDefault();
				focusFirst();
			}
		};

		document.addEventListener("focusin", handleFocusIn);

		return () => {
			document.removeEventListener("focusin", handleFocusIn);
		};
	}, [enabled, containerRef, focusFirst]);
}

/**
 * Utility to get all focusable elements within a container.
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
	const elements = container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS);

	return Array.from(elements).filter(
		(el) =>
			!el.hasAttribute("disabled") &&
			!el.getAttribute("aria-hidden") &&
			el.offsetParent !== null,
	);
}
