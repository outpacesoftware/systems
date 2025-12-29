"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { SelectContextValue, SelectOption } from "./SelectContext";

/**
 * Props for the useSelect hook
 */
export interface UseSelectProps {
	/**
	 * Controlled value
	 */
	value?: string;

	/**
	 * Default value for uncontrolled usage
	 */
	defaultValue?: string;

	/**
	 * Whether the select is disabled
	 */
	disabled?: boolean;

	/**
	 * Whether the select is required
	 */
	required?: boolean;

	/**
	 * Change handler
	 */
	onChange?: (value: string) => void;

	/**
	 * Open state change handler
	 */
	onOpenChange?: (isOpen: boolean) => void;

	/**
	 * Controlled open state
	 */
	open?: boolean;

	/**
	 * Default open state
	 */
	defaultOpen?: boolean;
}

/**
 * Return type for useSelect hook
 */
export interface UseSelectReturn extends SelectContextValue {
	/** Ref for the trigger element */
	triggerRef: React.RefObject<HTMLButtonElement | null>;
	/** Ref for the content element */
	contentRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * useSelect - Hook for building accessible select dropdowns
 */
export function useSelect(props: UseSelectProps = {}): UseSelectReturn {
	const {
		value: controlledValue,
		defaultValue,
		disabled = false,
		onChange,
		onOpenChange,
		open: controlledOpen,
		defaultOpen = false,
	} = props;

	const id = useId();
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const contentRef = useRef<HTMLDivElement | null>(null);

	const [internalValue, setInternalValue] = useState(defaultValue);
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const [options, setOptions] = useState<SelectOption[]>([]);

	const isValueControlled = controlledValue !== undefined;
	const isOpenControlled = controlledOpen !== undefined;

	const value = isValueControlled ? controlledValue : internalValue;
	const isOpen = isOpenControlled ? controlledOpen : internalOpen;

	const updateOpen = useCallback(
		(newOpen: boolean) => {
			if (disabled) return;
			if (!isOpenControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);

			// Reset highlight when opening
			if (newOpen) {
				const currentIndex = options.findIndex((o) => o.value === value);
				setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
			}
		},
		[disabled, isOpenControlled, onOpenChange, options, value],
	);

	const open = useCallback(() => updateOpen(true), [updateOpen]);
	const close = useCallback(() => {
		updateOpen(false);
		// Return focus to trigger
		triggerRef.current?.focus();
	}, [updateOpen]);
	const toggle = useCallback(() => updateOpen(!isOpen), [updateOpen, isOpen]);

	const selectValue = useCallback(
		(newValue: string) => {
			if (disabled) return;

			const option = options.find((o) => o.value === newValue);
			if (option?.disabled) return;

			if (!isValueControlled) {
				setInternalValue(newValue);
			}
			onChange?.(newValue);
			close();
		},
		[disabled, isValueControlled, onChange, close, options],
	);

	const registerOption = useCallback((option: SelectOption) => {
		setOptions((prev) => {
			const exists = prev.some((o) => o.value === option.value);
			if (exists) return prev;
			return [...prev, option];
		});
	}, []);

	return {
		value,
		isOpen,
		isDisabled: disabled,
		id,
		open,
		close,
		toggle,
		selectValue,
		highlightedIndex,
		setHighlightedIndex,
		options,
		registerOption,
		triggerRef,
		contentRef,
	};
}
