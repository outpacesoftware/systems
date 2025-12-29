"use client";

import {
	forwardRef,
	type ReactNode,
	type SelectHTMLAttributes,
	useId,
} from "react";

// ============================================================================
// Types
// ============================================================================

export interface SelectProps
	extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "size"> {
	/** Select label */
	label?: string;
	/** Error message */
	error?: string;
	/** Helper/description text */
	description?: string;
	/** Controlled value */
	value?: string;
	/** Change handler */
	onChange?: (value: string) => void;
	/** Children (options) */
	children: ReactNode;
}

// ============================================================================
// Styles
// ============================================================================

const containerStyles = `
  relative flex items-center
  rounded-[9px] bg-white/2 cursor-pointer
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;

const selectStyles =
	"relative z-10 w-full appearance-none bg-transparent px-3 py-2.5 pr-8 text-[13px] leading-4 tracking-[0.12px] text-white/88 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50";

const labelStyles =
	"text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]";

const errorStyles = "text-[10px] leading-[13px] text-red-400 tracking-[0.12px]";

const descriptionStyles =
	"text-[10px] leading-[13px] text-white/48 tracking-[0.12px]";

// ============================================================================
// Component
// ============================================================================

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			label,
			error,
			description,
			value,
			onChange,
			children,
			className = "",
			required,
			disabled,
			id: providedId,
			...props
		},
		ref,
	) => {
		const generatedId = useId();
		const id = providedId || generatedId;
		const descriptionId = `${id}-description`;
		const errorId = `${id}-error`;

		const selectElement = (
			<div
				className={`
          ${containerStyles}
          ${error ? "before:ring-red-500/50" : "before:ring-white/8"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${!label ? className : ""}
        `}
			>
				<select
					ref={ref}
					id={id}
					value={value}
					onChange={(e) => onChange?.(e.target.value)}
					required={required}
					disabled={disabled}
					aria-invalid={!!error}
					aria-describedby={
						error ? errorId : description ? descriptionId : undefined
					}
					className={selectStyles}
					{...props}
				>
					{children}
				</select>
				{/* Dropdown arrow */}
				<svg
					className="pointer-events-none absolute right-3 z-10 size-4 text-white/48"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					strokeWidth={2}
					aria-hidden="true"
				>
					<title>Dropdown arrow</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		);

		if (label || error || description) {
			return (
				<div className={`flex flex-col gap-1.5 ${className}`}>
					{label && (
						<label htmlFor={id} className={labelStyles}>
							{label}
							{required && <span className="text-[#FF4502] ml-0.5">*</span>}
						</label>
					)}
					{selectElement}
					{description && !error && (
						<p id={descriptionId} className={descriptionStyles}>
							{description}
						</p>
					)}
					{error && (
						<p id={errorId} role="alert" className={errorStyles}>
							{error}
						</p>
					)}
				</div>
			);
		}

		return selectElement;
	},
);

Select.displayName = "Select";
