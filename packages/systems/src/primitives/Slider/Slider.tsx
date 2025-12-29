"use client";

import {
	createContext,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type PointerEvent,
	type ReactNode,
	useCallback,
	useContext,
	useId,
	useRef,
	useState,
} from "react";

// ============================================================================
// Context
// ============================================================================

interface SliderContextValue {
	value: number;
	min: number;
	max: number;
	step: number;
	disabled: boolean;
	orientation: "horizontal" | "vertical";
	onChange: (value: number) => void;
	getPercentage: () => number;
}

const SliderContext = createContext<SliderContextValue | null>(null);

function useSliderContext() {
	const context = useContext(SliderContext);
	if (!context) {
		throw new Error("Slider components must be used within Slider.Root");
	}
	return context;
}

// ============================================================================
// Root
// ============================================================================

export interface SliderRootProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Current value (controlled) */
	value?: number;
	/** Default value for uncontrolled usage */
	defaultValue?: number;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Step increment */
	step?: number;
	/** Whether the slider is disabled */
	disabled?: boolean;
	/** Orientation */
	orientation?: "horizontal" | "vertical";
	/** Called when value changes */
	onChange?: (value: number) => void;
	/** Children */
	children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, SliderRootProps>((props, ref) => {
	const {
		value: controlledValue,
		defaultValue = 0,
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		orientation = "horizontal",
		onChange,
		children,
		className,
		...rest
	} = props;

	const [internalValue, setInternalValue] = useState(defaultValue);
	const isControlled = controlledValue !== undefined;
	const value = isControlled ? controlledValue : internalValue;
	const id = useId();

	const handleChange = useCallback(
		(newValue: number) => {
			const clampedValue = Math.min(max, Math.max(min, newValue));
			const steppedValue = Math.round(clampedValue / step) * step;
			if (!isControlled) {
				setInternalValue(steppedValue);
			}
			onChange?.(steppedValue);
		},
		[isControlled, min, max, step, onChange],
	);

	const getPercentage = useCallback(() => {
		return ((value - min) / (max - min)) * 100;
	}, [value, min, max]);

	return (
		<SliderContext.Provider
			value={{
				value,
				min,
				max,
				step,
				disabled,
				orientation,
				onChange: handleChange,
				getPercentage,
			}}
		>
			<fieldset
				ref={ref}
				aria-labelledby={`slider-label-${id}`}
				data-orientation={orientation}
				data-disabled={disabled || undefined}
				className={className}
				{...rest}
			>
				{children}
			</fieldset>
		</SliderContext.Provider>
	);
});

Root.displayName = "Slider.Root";

// ============================================================================
// Track
// ============================================================================

export interface SliderTrackProps extends HTMLAttributes<HTMLDivElement> {
	children?: ReactNode;
}

const Track = forwardRef<HTMLDivElement, SliderTrackProps>((props, ref) => {
	const { children, className, ...rest } = props;
	const context = useSliderContext();
	const trackRef = useRef<HTMLDivElement>(null);

	const handlePointerDown = useCallback(
		(event: PointerEvent<HTMLDivElement>) => {
			if (context.disabled) return;

			const track = trackRef.current;
			if (!track) return;

			const rect = track.getBoundingClientRect();
			const percentage =
				context.orientation === "horizontal"
					? (event.clientX - rect.left) / rect.width
					: 1 - (event.clientY - rect.top) / rect.height;

			const newValue = context.min + percentage * (context.max - context.min);
			context.onChange(newValue);
		},
		[context],
	);

	return (
		<div
			ref={(node) => {
				(trackRef as React.MutableRefObject<HTMLDivElement | null>).current =
					node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			data-orientation={context.orientation}
			data-disabled={context.disabled || undefined}
			onPointerDown={handlePointerDown}
			className={className}
			{...rest}
		>
			{children}
		</div>
	);
});

Track.displayName = "Slider.Track";

// ============================================================================
// Range
// ============================================================================

export interface SliderRangeProps extends HTMLAttributes<HTMLDivElement> {}

const Range = forwardRef<HTMLDivElement, SliderRangeProps>((props, ref) => {
	const { className, style, ...rest } = props;
	const context = useSliderContext();
	const percentage = context.getPercentage();

	const rangeStyle =
		context.orientation === "horizontal"
			? { width: `${percentage}%`, ...style }
			: { height: `${percentage}%`, ...style };

	return (
		<div
			ref={ref}
			data-orientation={context.orientation}
			style={rangeStyle}
			className={className}
			{...rest}
		/>
	);
});

Range.displayName = "Slider.Range";

// ============================================================================
// Thumb
// ============================================================================

export interface SliderThumbProps extends HTMLAttributes<HTMLDivElement> {}

const Thumb = forwardRef<HTMLDivElement, SliderThumbProps>((props, ref) => {
	const { className, style, ...rest } = props;
	const context = useSliderContext();
	const percentage = context.getPercentage();
	const thumbRef = useRef<HTMLDivElement>(null);

	const handleKeyDown = useCallback(
		(event: KeyboardEvent<HTMLDivElement>) => {
			if (context.disabled) return;

			let newValue = context.value;
			const bigStep = context.step * 10;

			switch (event.key) {
				case "ArrowRight":
				case "ArrowUp":
					newValue = context.value + context.step;
					break;
				case "ArrowLeft":
				case "ArrowDown":
					newValue = context.value - context.step;
					break;
				case "PageUp":
					newValue = context.value + bigStep;
					break;
				case "PageDown":
					newValue = context.value - bigStep;
					break;
				case "Home":
					newValue = context.min;
					break;
				case "End":
					newValue = context.max;
					break;
				default:
					return;
			}

			event.preventDefault();
			context.onChange(newValue);
		},
		[context],
	);

	const handlePointerDown = useCallback(
		(event: PointerEvent<HTMLDivElement>) => {
			if (context.disabled) return;

			event.preventDefault();
			const thumb = thumbRef.current;
			if (!thumb) return;

			thumb.focus();
			thumb.setPointerCapture(event.pointerId);

			const handlePointerMove = (moveEvent: globalThis.PointerEvent) => {
				const track = thumb.parentElement;
				if (!track) return;

				const rect = track.getBoundingClientRect();
				const percentage =
					context.orientation === "horizontal"
						? (moveEvent.clientX - rect.left) / rect.width
						: 1 - (moveEvent.clientY - rect.top) / rect.height;

				const newValue = context.min + percentage * (context.max - context.min);
				context.onChange(newValue);
			};

			const handlePointerUp = () => {
				thumb.releasePointerCapture(event.pointerId);
				document.removeEventListener("pointermove", handlePointerMove);
				document.removeEventListener("pointerup", handlePointerUp);
			};

			document.addEventListener("pointermove", handlePointerMove);
			document.addEventListener("pointerup", handlePointerUp);
		},
		[context],
	);

	const thumbStyle =
		context.orientation === "horizontal"
			? { left: `${percentage}%`, ...style }
			: { bottom: `${percentage}%`, ...style };

	return (
		<div
			ref={(node) => {
				(thumbRef as React.MutableRefObject<HTMLDivElement | null>).current =
					node;
				if (typeof ref === "function") ref(node);
				else if (ref) ref.current = node;
			}}
			role="slider"
			tabIndex={context.disabled ? -1 : 0}
			aria-valuemin={context.min}
			aria-valuemax={context.max}
			aria-valuenow={context.value}
			aria-orientation={context.orientation}
			aria-disabled={context.disabled || undefined}
			data-orientation={context.orientation}
			data-disabled={context.disabled || undefined}
			style={thumbStyle}
			onKeyDown={handleKeyDown}
			onPointerDown={handlePointerDown}
			className={className}
			{...rest}
		/>
	);
});

Thumb.displayName = "Slider.Thumb";

// ============================================================================
// Export
// ============================================================================

export const Slider = {
	Root,
	Track,
	Range,
	Thumb,
};
