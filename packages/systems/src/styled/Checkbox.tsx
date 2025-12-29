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

export interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		"onChange" | "type" | "size"
	> {
	/** Checkbox label */
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

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
						id={id}
						checked={checked}
						onChange={(e) => onChange?.(e.target.checked)}
						disabled={disabled}
						className="peer sr-only"
						{...props}
					/>
					<div
						className={`
              size-[18px]
              rounded-[5px] border border-white/20 bg-white/4
              transition-all
              peer-checked:bg-[#FF4502] peer-checked:border-[#FF4502]
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black
              peer-hover:border-white/32
              peer-checked:peer-hover:bg-[#E63D00] peer-checked:peer-hover:border-[#E63D00]
              flex items-center justify-center
            `}
					>
						<svg
							className="size-3 text-white transition-opacity"
							style={{ opacity: checked ? 1 : 0 }}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={3}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M5 13l4 4L19 7"
							/>
						</svg>
					</div>
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

Checkbox.displayName = "Checkbox";
