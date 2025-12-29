"use client";

import {
	type ButtonHTMLAttributes,
	forwardRef,
	type HTMLAttributes,
	type KeyboardEvent,
	type ReactNode,
	useCallback,
	useEffect,
} from "react";
import { SelectProvider, useSelectContext } from "./SelectContext";
import { type UseSelectProps, useSelect } from "./useSelect";

// ============================================================================
// Select.Root
// ============================================================================

export interface SelectRootProps extends UseSelectProps {
	children: ReactNode;
}

/**
 * Select.Root - Container for the select dropdown
 */
function SelectRoot({ children, ...props }: SelectRootProps) {
	const context = useSelect(props);

	return <SelectProvider value={context}>{children}</SelectProvider>;
}

// ============================================================================
// Select.Trigger
// ============================================================================

export interface SelectTriggerProps
	extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
	children?: ReactNode;
	className?: string;
	placeholder?: string;
}

/**
 * Select.Trigger - Button that opens the select dropdown
 */
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
	({ children, className, placeholder = "Select...", ...props }, ref) => {
		const { value, isOpen, isDisabled, id, toggle, options } =
			useSelectContext();

		const selectedOption = options.find((o) => o.value === value);
		const displayValue = selectedOption?.label || children || placeholder;

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLButtonElement>) => {
				switch (event.key) {
					case "ArrowDown":
					case "ArrowUp":
						event.preventDefault();
						if (!isOpen) {
							toggle();
						}
						break;
					case "Enter":
					case " ":
						event.preventDefault();
						toggle();
						break;
					case "Escape":
						if (isOpen) {
							event.preventDefault();
							toggle();
						}
						break;
				}
			},
			[isOpen, toggle],
		);

		return (
			<button
				ref={ref}
				type="button"
				role="combobox"
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				aria-controls={`${id}-content`}
				aria-labelledby={`${id}-label`}
				disabled={isDisabled}
				className={className}
				data-open={isOpen || undefined}
				data-disabled={isDisabled || undefined}
				data-placeholder={!selectedOption || undefined}
				onClick={toggle}
				onKeyDown={handleKeyDown}
				{...props}
			>
				{displayValue}
			</button>
		);
	},
);

SelectTrigger.displayName = "Select.Trigger";

// ============================================================================
// Select.Content
// ============================================================================

export interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	className?: string;
}

/**
 * Select.Content - Container for the dropdown options
 */
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
	({ children, className, ...props }, ref) => {
		const {
			isOpen,
			id,
			close,
			highlightedIndex,
			setHighlightedIndex,
			options,
			selectValue,
		} = useSelectContext();

		const handleKeyDown = useCallback(
			(event: KeyboardEvent<HTMLDivElement>) => {
				switch (event.key) {
					case "ArrowDown":
						event.preventDefault();
						setHighlightedIndex(
							Math.min(highlightedIndex + 1, options.length - 1),
						);
						break;
					case "ArrowUp":
						event.preventDefault();
						setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
						break;
					case "Enter":
					case " ":
						event.preventDefault();
						if (highlightedIndex >= 0 && options[highlightedIndex]) {
							selectValue(options[highlightedIndex].value);
						}
						break;
					case "Escape":
						event.preventDefault();
						close();
						break;
				}
			},
			[highlightedIndex, setHighlightedIndex, options, selectValue, close],
		);

		// Close on click outside
		useEffect(() => {
			if (!isOpen) return;

			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as Node;
				const content = document.getElementById(`${id}-content`);
				const trigger = document.querySelector(
					`[aria-controls="${id}-content"]`,
				);

				if (
					content &&
					!content.contains(target) &&
					trigger &&
					!trigger.contains(target)
				) {
					close();
				}
			};

			document.addEventListener("mousedown", handleClickOutside);
			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}, [isOpen, id, close]);

		if (!isOpen) return null;

		return (
			<div
				ref={ref}
				id={`${id}-content`}
				role="listbox"
				className={className}
				data-open={isOpen || undefined}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
				{...props}
			>
				{children}
			</div>
		);
	},
);

SelectContent.displayName = "Select.Content";

// ============================================================================
// Select.Option
// ============================================================================

export interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
	value: string;
	children: ReactNode;
	disabled?: boolean;
	className?: string;
}

/**
 * Select.Option - Individual option in the dropdown
 */
const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
	({ value, children, disabled = false, className, ...props }, ref) => {
		const {
			value: selectedValue,
			selectValue,
			highlightedIndex,
			setHighlightedIndex,
			options,
			registerOption,
		} = useSelectContext();

		const isSelected = value === selectedValue;
		const optionIndex = options.findIndex((o) => o.value === value);
		const isHighlighted = optionIndex === highlightedIndex;

		// Register option on mount
		useEffect(() => {
			registerOption({ value, label: String(children), disabled });
		}, [value, children, disabled, registerOption]);

		const handleClick = useCallback(() => {
			if (!disabled) {
				selectValue(value);
			}
		}, [disabled, selectValue, value]);

		const handleMouseEnter = useCallback(() => {
			if (!disabled) {
				setHighlightedIndex(optionIndex);
			}
		}, [disabled, setHighlightedIndex, optionIndex]);

		return (
			// biome-ignore lint/a11y/useFocusableInteractive: Option is part of listbox pattern, keyboard nav handled by parent
			// biome-ignore lint/a11y/useKeyWithClickEvents: Keyboard navigation handled by Select.Content
			<div
				ref={ref}
				role="option"
				aria-selected={isSelected}
				aria-disabled={disabled || undefined}
				className={className}
				data-selected={isSelected || undefined}
				data-highlighted={isHighlighted || undefined}
				data-disabled={disabled || undefined}
				onClick={handleClick}
				onMouseEnter={handleMouseEnter}
				{...props}
			>
				{children}
			</div>
		);
	},
);

SelectOption.displayName = "Select.Option";

// ============================================================================
// Export
// ============================================================================

export const Select = {
	Root: SelectRoot,
	Trigger: SelectTrigger,
	Content: SelectContent,
	Option: SelectOption,
};
