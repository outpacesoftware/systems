"use client";

import { forwardRef, type HTMLAttributes } from "react";

// ============================================================================
// Types
// ============================================================================

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
	/** Current value (0-100) */
	value?: number;
	/** Maximum value */
	max?: number;
	/** Size variant */
	size?: "sm" | "md" | "lg";
	/** Visual variant */
	variant?: "default" | "accent";
	/** Whether to show indeterminate animation */
	indeterminate?: boolean;
	/** Label text */
	label?: string;
	/** Show percentage value */
	showValue?: boolean;
}

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
	sm: "h-1",
	md: "h-1.5",
	lg: "h-2",
};

const variantStyles = {
	default: "bg-white",
	accent: "bg-[#FF4502]",
};

// ============================================================================
// Component
// ============================================================================

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
	(
		{
			value = 0,
			max = 100,
			size = "md",
			variant = "default",
			indeterminate = false,
			label,
			showValue = false,
			className = "",
			...props
		},
		ref,
	) => {
		const percentage = Math.min(100, Math.max(0, (value / max) * 100));

		return (
			<div ref={ref} className={`flex flex-col gap-2 ${className}`} {...props}>
				{(label || showValue) && (
					<div className="flex items-center justify-between">
						{label && (
							<span className="text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]">
								{label}
							</span>
						)}
						{showValue && !indeterminate && (
							<span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px] tabular-nums">
								{Math.round(percentage)}%
							</span>
						)}
					</div>
				)}
				<div
					role="progressbar"
					aria-valuenow={indeterminate ? undefined : value}
					aria-valuemin={0}
					aria-valuemax={max}
					className={`
            relative w-full overflow-hidden rounded-full
            bg-white/8 ring-1 ring-inset ring-white/8 ${sizeStyles[size]}
          `}
				>
					<div
						className={`
              h-full rounded-full transition-all duration-300 ease-out
              ${variantStyles[variant]}
              ${indeterminate ? "animate-progress-indeterminate" : ""}
            `}
						style={indeterminate ? undefined : { width: `${percentage}%` }}
					/>
				</div>
			</div>
		);
	},
);

Progress.displayName = "Progress";
