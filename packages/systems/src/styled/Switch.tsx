"use client";

import {
	forwardRef,
	type InputHTMLAttributes,
	type ReactNode,
	useId,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface SwitchProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"onChange" | "type" | "size"
	> {
	/** Switch label */
	label?: ReactNode;
	/** Description text */
	description?: string;
	/** Controlled checked state */
	checked?: boolean;
	/** Change handler */
	onChange?: (checked: boolean) => void;
}

// ============================================================================
// Component
// ============================================================================

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(
		{
			label,
			description,
			checked,
			onChange,
			className = "",
			disabled,
			id: providedId,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const id = providedId || generatedId;

		return (
			<label
				htmlFor={id}
				className={`
          inline-flex items-start gap-2.5 cursor-pointer
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${className}
        `}
			>
				<div className="relative flex-shrink-0 mt-0.5">
					<input
						ref={ref}
						type="checkbox"
						role="switch"
						id={id}
						checked={checked}
						aria-checked={checked}
						onChange={(e) => onChange?.(e.target.checked)}
						disabled={disabled}
						className="peer sr-only"
						{...props}
					/>
					<div
						className={`
              w-9 h-[22px]
              rounded-full bg-white/8
              ring-1 ring-inset ring-white/8
              transition-all
              peer-checked:bg-[#FF4502] peer-checked:ring-[#FF4502]/24
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24
              peer-hover:bg-white/12
              peer-checked:peer-hover:bg-[#E63D00]
            `}
					/>
					<div
						className={`
              absolute top-[2px] left-[2px]
              size-[18px]
              rounded-full bg-white shadow-sm
              transition-transform
              ${checked ? "translate-x-[14px]" : "translate-x-0"}
            `}
					/>
				</div>
				{(label || description) && (
					<div className="flex flex-col gap-0.5">
						{label && (
							<span className="text-[13px] leading-4 text-white/88 tracking-[0.12px]">
								{label}
							</span>
						)}
						{description && (
							<span className="text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">
								{description}
							</span>
						)}
					</div>
				)}
			</label>
		);
	},
);

Switch.displayName = "Switch";
