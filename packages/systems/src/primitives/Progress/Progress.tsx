"use client";

import { forwardRef, type HTMLAttributes } from "react";

// ============================================================================
// Root
// ============================================================================

export interface ProgressRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Current value (0-100 or custom max) */
	value?: number;
	/** Maximum value */
	max?: number;
	/** Whether progress is indeterminate */
	indeterminate?: boolean;
}

const Root = forwardRef<HTMLDivElement, ProgressRootProps>((props, ref) => {
	const {
		value = 0,
		max = 100,
		indeterminate = false,
		className,
		children,
		...rest
	} = props;

	const percentage = indeterminate
		? undefined
		: Math.min(100, Math.max(0, (value / max) * 100));

	return (
		<div
			ref={ref}
			role="progressbar"
			aria-valuenow={indeterminate ? undefined : value}
			aria-valuemin={0}
			aria-valuemax={max}
			aria-valuetext={indeterminate ? "Loading" : `${percentage?.toFixed(0)}%`}
			data-state={
				indeterminate ? "indeterminate" : value >= max ? "complete" : "loading"
			}
			data-value={value}
			data-max={max}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Root.displayName = "Progress.Root";

// ============================================================================
// Indicator
// ============================================================================

export interface ProgressIndicatorProps
	extends HTMLAttributes<HTMLDivElement> {}

const Indicator = forwardRef<HTMLDivElement, ProgressIndicatorProps>(
	(props, ref) => {
		const { className, style, ...rest } = props;

		return (
			<div
				ref={ref}
				data-state="indicator"
				className={className}
				style={style}
				{...rest}
			/>
		);
	},
);

Indicator.displayName = "Progress.Indicator";

// ============================================================================
// Export
// ============================================================================

export const Progress = {
	Root,
	Indicator,
};
