"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Visual variant */
	variant?:
		| "default"
		| "muted"
		| "accent"
		| "success"
		| "warning"
		| "error"
		| "info"
		| "purple";
	/** Size variant */
	size?: "sm" | "md";
	/** Badge content */
	children: ReactNode;
}

// ============================================================================
// Styles
// ============================================================================

const baseStyles =
	"inline-flex items-center rounded-lg font-medium tracking-[0.12px] ring-1 ring-inset transition-colors";

const sizeStyles = {
	sm: "px-2 py-0.5 text-[10px] leading-[13px]",
	md: "px-2.5 py-1 text-[12px] leading-[15px]",
};

const variantStyles = {
	default: "bg-white/8 text-white/72 ring-white/8",
	muted: "bg-white/4 text-white/48 ring-white/8",
	accent: "bg-[#FF4502]/20 text-[#FF4502] ring-[#FF4502]/30",
	success: "bg-green-500/20 text-green-400 ring-green-500/30",
	warning: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
	error: "bg-red-500/20 text-red-400 ring-red-500/30",
	info: "bg-blue-500/20 text-blue-400 ring-blue-500/30",
	purple: "bg-purple-500/20 text-purple-400 ring-purple-500/30",
};

// ============================================================================
// Component
// ============================================================================

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
	(
		{ variant = "default", size = "md", children, className = "", ...props },
		ref,
	) => {
		return (
			<span
				ref={ref}
				className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
				{...props}
			>
				{children}
			</span>
		);
	},
);

Badge.displayName = "Badge";
