"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

/**
 * Props for the useTooltip hook
 */
export interface UseTooltipProps {
	/**
	 * Controlled open state
	 */
	open?: boolean;

	/**
	 * Default open state
	 */
	defaultOpen?: boolean;

	/**
	 * Delay before showing tooltip (ms)
	 * @default 300
	 */
	delayDuration?: number;

	/**
	 * Delay before hiding tooltip (ms)
	 * @default 0
	 */
	closeDelay?: number;

	/**
	 * Handler called when open state changes
	 */
	onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Return type for useTooltip hook
 */
export interface UseTooltipReturn {
	/** Whether the tooltip is open */
	isOpen: boolean;
	/** Unique ID for accessibility */
	id: string;
	/** Open the tooltip */
	open: () => void;
	/** Close the tooltip */
	close: () => void;
	/** Trigger props */
	triggerProps: {
		onMouseEnter: () => void;
		onMouseLeave: () => void;
		onFocus: () => void;
		onBlur: () => void;
		"aria-describedby": string | undefined;
		"aria-expanded": boolean;
	};
	/** Content props */
	contentProps: {
		id: string;
		role: "tooltip";
	};
}

/**
 * useTooltip - Hook for building accessible tooltips
 */
export function useTooltip(props: UseTooltipProps = {}): UseTooltipReturn {
	const {
		open: controlledOpen,
		defaultOpen = false,
		delayDuration = 300,
		closeDelay = 0,
		onOpenChange,
	} = props;

	const id = useId();
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const openTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
	const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

	const isControlled = controlledOpen !== undefined;
	const isOpen = isControlled ? controlledOpen : internalOpen;

	const clearTimers = useCallback(() => {
		if (openTimerRef.current) {
			clearTimeout(openTimerRef.current);
			openTimerRef.current = undefined;
		}
		if (closeTimerRef.current) {
			clearTimeout(closeTimerRef.current);
			closeTimerRef.current = undefined;
		}
	}, []);

	const updateOpen = useCallback(
		(newOpen: boolean) => {
			clearTimers();
			if (!isControlled) {
				setInternalOpen(newOpen);
			}
			onOpenChange?.(newOpen);
		},
		[isControlled, onOpenChange, clearTimers],
	);

	const open = useCallback(() => {
		clearTimers();
		if (delayDuration > 0) {
			openTimerRef.current = setTimeout(() => updateOpen(true), delayDuration);
		} else {
			updateOpen(true);
		}
	}, [delayDuration, updateOpen, clearTimers]);

	const close = useCallback(() => {
		clearTimers();
		if (closeDelay > 0) {
			closeTimerRef.current = setTimeout(() => updateOpen(false), closeDelay);
		} else {
			updateOpen(false);
		}
	}, [closeDelay, updateOpen, clearTimers]);

	// Cleanup timers on unmount
	useEffect(() => {
		return () => clearTimers();
	}, [clearTimers]);

	const triggerProps = {
		onMouseEnter: open,
		onMouseLeave: close,
		onFocus: open,
		onBlur: close,
		"aria-describedby": isOpen ? `${id}-content` : undefined,
		"aria-expanded": isOpen,
	};

	const contentProps = {
		id: `${id}-content`,
		role: "tooltip" as const,
	};

	return {
		isOpen,
		id,
		open: () => updateOpen(true),
		close: () => updateOpen(false),
		triggerProps,
		contentProps,
	};
}
