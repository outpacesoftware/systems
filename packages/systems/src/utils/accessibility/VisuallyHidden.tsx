"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLSpanElement> {
	/** Content to be hidden visually but available to screen readers */
	children: ReactNode;
	/**
	 * When true, content becomes visible on focus.
	 * Useful for skip links and focus-based navigation.
	 */
	focusable?: boolean;
}

/**
 * Visually hides content while keeping it accessible to screen readers.
 * Uses CSS to hide the element visually without using display:none or visibility:hidden,
 * which would also hide it from assistive technologies.
 *
 * @example
 * // Hidden label for icon button
 * <button>
 *   <Icon name="search" />
 *   <VisuallyHidden>Search</VisuallyHidden>
 * </button>
 *
 * @example
 * // Skip link that shows on focus
 * <VisuallyHidden focusable>
 *   <a href="#main-content">Skip to main content</a>
 * </VisuallyHidden>
 */
export const VisuallyHidden = forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
	({ children, focusable = false, style, ...props }, ref) => {
		const hiddenStyles: React.CSSProperties = {
			position: "absolute",
			width: "1px",
			height: "1px",
			padding: 0,
			margin: "-1px",
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			border: 0,
			...style,
		};

		const focusableStyles: React.CSSProperties = focusable
			? {
					// When focusable, show on focus
					...hiddenStyles,
				}
			: hiddenStyles;

		return (
			<span ref={ref} style={focusableStyles} {...props}>
				{children}
			</span>
		);
	},
);

VisuallyHidden.displayName = "VisuallyHidden";

/**
 * CSS class version for use with Tailwind or other CSS frameworks.
 * Apply this class to visually hide content while keeping it accessible.
 */
export const visuallyHiddenClass =
	"absolute w-px h-px p-0 -m-px overflow-hidden [clip:rect(0,0,0,0)] whitespace-nowrap border-0";
