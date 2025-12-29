"use client";

import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";

// ============================================================================
// Types
// ============================================================================

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** Visual variant */
	variant?:
		| "primary"
		| "secondary"
		| "ghost"
		| "danger"
		| "danger-outline"
		| "success"
		| "warning";
	/** Size variant */
	size?: "sm" | "md" | "lg";
	/** Icon on the left */
	leftIcon?: ReactNode;
	/** Icon on the right */
	rightIcon?: ReactNode;
	/** Loading state */
	loading?: boolean;
	/** Children content */
	children: ReactNode;
}

// ============================================================================
// Loading Spinner
// ============================================================================

const LoadingSpinner = () => (
	<svg
		className="animate-spin size-3.5"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<title>Loading</title>
		<circle
			className="opacity-25"
			cx="12"
			cy="12"
			r="10"
			stroke="currentColor"
			strokeWidth="4"
		/>
		<path
			className="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
);

// ============================================================================
// Styles
// ============================================================================

const baseStyles =
	"relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[0.12px] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const sizeStyles = {
	sm: "px-3 py-1.5 text-[12px] leading-[15px]",
	md: "px-4 py-2.5 text-[13px] leading-4",
	lg: "px-5 py-3 text-[15px] leading-5",
};

const variantStyles = {
	primary:
		"bg-[#FF4502] text-white hover:bg-[#E63D00] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
	secondary:
		"bg-white/8 text-white/88 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8 hover:bg-white/12 hover:before:ring-white/12",
	ghost: "bg-transparent text-white/72 hover:bg-white/8 hover:text-white/88",
	danger:
		"bg-red-600 text-white hover:bg-red-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
	"danger-outline":
		"bg-red-500/20 text-red-400 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-red-500/30 hover:bg-red-500/30",
	success:
		"bg-green-600 text-white hover:bg-green-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
	warning:
		"bg-amber-600 text-white hover:bg-amber-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
};

// ============================================================================
// Component
// ============================================================================

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			variant = "primary",
			size = "md",
			leftIcon,
			rightIcon,
			loading,
			children,
			className = "",
			disabled,
			...props
		},
		ref,
	) => {
		return (
			<button
				ref={ref}
				className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
				disabled={disabled || loading}
				{...props}
			>
				{loading ? (
					<LoadingSpinner />
				) : (
					leftIcon && (
						<span className="shrink-0 [&>svg]:size-4">{leftIcon}</span>
					)
				)}
				<span className="relative z-10">{children}</span>
				{!loading && rightIcon && (
					<span className="shrink-0 [&>svg]:size-4">{rightIcon}</span>
				)}
			</button>
		);
	},
);

Button.displayName = "Button";
