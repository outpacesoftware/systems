"use client";

import React, {
	forwardRef,
	type HTMLAttributes,
	useCallback,
	useEffect,
	useId,
	useRef,
	useState,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface SliderProps
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	/** Current value */
	value?: number;
	/** Default value for uncontrolled */
	defaultValue?: number;
	/** Change handler */
	onChange?: (value: number) => void;
	/** Minimum value */
	min?: number;
	/** Maximum value */
	max?: number;
	/** Step increment */
	step?: number;
	/** Whether the slider is disabled */
	disabled?: boolean;
	/** Label text */
	label?: string;
	/** Show value label */
	showValue?: boolean;
	/** Size variant */
	size?: "sm" | "md";
}

// ============================================================================
// Styles
// ============================================================================

const sizeStyles = {
	sm: {
		track: "h-1",
		thumb: "size-3.5",
	},
	md: {
		track: "h-1.5",
		thumb: "size-4",
	},
};

// ============================================================================
// Component
// ============================================================================

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
	(
		{
			value: controlledValue,
			defaultValue = 0,
			onChange,
			min = 0,
			max = 100,
			step = 1,
			disabled = false,
			label,
			showValue = false,
			size = "md",
			className = "",
			id: providedId,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const id = providedId || generatedId;
		const sizes = sizeStyles[size];
		const trackRef = useRef<HTMLDivElement>(null);
		const isDragging = useRef(false);

		const [internalValue, setInternalValue] = useState(defaultValue);
		const isControlled = controlledValue !== undefined;
		const value = isControlled ? controlledValue : internalValue;

		const percentage = ((value - min) / (max - min)) * 100;

		const updateValue = useCallback(
			(clientX: number) => {
				if (!trackRef.current || disabled) return;

				const rect = trackRef.current.getBoundingClientRect();
				const percent = Math.max(
					0,
					Math.min(1, (clientX - rect.left) / rect.width),
				);
				const rawValue = min + percent * (max - min);
				const steppedValue = Math.round(rawValue / step) * step;
				const clampedValue = Math.max(min, Math.min(max, steppedValue));

				if (!isControlled) {
					setInternalValue(clampedValue);
				}
				onChange?.(clampedValue);
			},
			[disabled, min, max, step, isControlled, onChange],
		);

		const handleMouseDown = useCallback(
			(event: React.MouseEvent) => {
				if (disabled) return;
				isDragging.current = true;
				updateValue(event.clientX);
			},
			[disabled, updateValue],
		);

		useEffect(() => {
			const handleMouseMove = (event: MouseEvent) => {
				if (isDragging.current) {
					updateValue(event.clientX);
				}
			};

			const handleMouseUp = () => {
				isDragging.current = false;
			};

			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);

			return () => {
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
			};
		}, [updateValue]);

		const handleKeyDown = useCallback(
			(event: React.KeyboardEvent) => {
				if (disabled) return;

				let newValue = value;

				switch (event.key) {
					case "ArrowRight":
					case "ArrowUp":
						newValue = Math.min(max, value + step);
						break;
					case "ArrowLeft":
					case "ArrowDown":
						newValue = Math.max(min, value - step);
						break;
					case "Home":
						newValue = min;
						break;
					case "End":
						newValue = max;
						break;
					default:
						return;
				}

				event.preventDefault();
				if (!isControlled) {
					setInternalValue(newValue);
				}
				onChange?.(newValue);
			},
			[disabled, value, min, max, step, isControlled, onChange],
		);

		return (
			<div ref={ref} className={`flex flex-col gap-2 ${className}`} {...props}>
				{(label || showValue) && (
					<div className="flex items-center justify-between">
						{label && (
							<label
								htmlFor={id}
								className="text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]"
							>
								{label}
							</label>
						)}
						{showValue && (
							<span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px] tabular-nums">
								{value}
							</span>
						)}
					</div>
				)}
				<div
					ref={trackRef}
					role="slider"
					id={id}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={value}
					aria-disabled={disabled}
					tabIndex={disabled ? -1 : 0}
					onMouseDown={handleMouseDown}
					onKeyDown={handleKeyDown}
					className={`
            group relative w-full cursor-pointer
            focus-visible:outline-none
            ${disabled ? "opacity-50 pointer-events-none" : ""}
          `}
				>
					{/* Track */}
					<div
						className={`relative w-full ${sizes.track} bg-white/8 rounded-full overflow-hidden`}
					>
						{/* Range (filled portion) */}
						<div
							className="absolute inset-y-0 left-0 bg-[#FF4502] rounded-full"
							style={{ width: `${percentage}%` }}
						/>
					</div>
					{/* Thumb */}
					<div
						className={`
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              ${sizes.thumb}
              rounded-full bg-white
              shadow-md
              ring-2 ring-white/8
              transition-all
              group-hover:ring-white/24
              group-focus-visible:ring-white/24
            `}
						style={{ left: `${percentage}%` }}
					/>
				</div>
			</div>
		);
	},
);

Slider.displayName = "Slider";
