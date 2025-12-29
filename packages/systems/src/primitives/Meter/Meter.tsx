"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

// ============================================================================
// Root
// ============================================================================

export interface MeterRootProps extends HTMLAttributes<HTMLDivElement> {
	/** Current value */
	value: number;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Low threshold */
	low?: number;
	/** High threshold */
	high?: number;
	/** Optimum value */
	optimum?: number;
	/** Get value label for accessibility */
	getValueLabel?: (value: number, min: number, max: number) => string;
	children?: ReactNode;
}

const Root = forwardRef<HTMLDivElement, MeterRootProps>((props, ref) => {
	const {
		value,
		min = 0,
		max = 100,
		low,
		high,
		optimum,
		getValueLabel,
		children,
		className,
		...rest
	} = props;

	const percentage = ((value - min) / (max - min)) * 100;

	// Determine status based on thresholds
	const getStatus = () => {
		if (low !== undefined && value < low) return "low";
		if (high !== undefined && value > high) return "high";
		if (optimum !== undefined) {
			const distFromOptimum = Math.abs(value - optimum);
			const range = max - min;
			if (distFromOptimum < range * 0.1) return "optimum";
		}
		return "normal";
	};

	const valueLabel = getValueLabel
		? getValueLabel(value, min, max)
		: `${Math.round(percentage)}%`;

	return (
		<div
			ref={ref}
			role="meter"
			aria-valuenow={value}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuetext={valueLabel}
			data-status={getStatus()}
			data-value={percentage}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Root.displayName = "Meter.Root";

// ============================================================================
// Track
// ============================================================================

export interface MeterTrackProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

const Track = forwardRef<HTMLDivElement, MeterTrackProps>((props, ref) => {
	const { children, className, ...rest } = props;

	return (
		<div ref={ref} className={className} {...rest}>
			{children}
		</div>
	);
});

Track.displayName = "Meter.Track";

// ============================================================================
// Indicator
// ============================================================================

export interface MeterIndicatorProps extends HTMLAttributes<HTMLDivElement> {}

const Indicator = forwardRef<HTMLDivElement, MeterIndicatorProps>(
	(props, ref) => {
		const { className, style, ...rest } = props;

		return <div ref={ref} className={className} style={style} {...rest} />;
	},
);

Indicator.displayName = "Meter.Indicator";

// ============================================================================
// Export
// ============================================================================

export const Meter = {
	Root,
	Track,
	Indicator,
};
