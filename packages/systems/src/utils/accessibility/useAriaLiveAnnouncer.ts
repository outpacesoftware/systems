"use client";

import { useCallback, useEffect, useRef } from "react";

export type AriaLivePoliteness = "polite" | "assertive" | "off";

export interface UseAriaLiveAnnouncerOptions {
	/** Politeness level for announcements. Defaults to 'polite'. */
	politeness?: AriaLivePoliteness;
	/** Delay in ms before clearing the announcement. Defaults to 1000. */
	clearDelay?: number;
}

export interface AriaLiveAnnouncer {
	/** Announce a message to screen readers */
	announce: (message: string, politeness?: AriaLivePoliteness) => void;
	/** Clear the current announcement */
	clear: () => void;
}

/**
 * Hook to announce messages to screen readers using an aria-live region.
 * Creates an invisible live region that screen readers will announce.
 *
 * @param options - Configuration options
 * @returns Object with announce and clear methods
 *
 * @example
 * function SearchResults({ results }) {
 *   const { announce } = useAriaLiveAnnouncer();
 *
 *   useEffect(() => {
 *     announce(`${results.length} results found`);
 *   }, [results, announce]);
 *
 *   return <ul>{results.map(...)}</ul>;
 * }
 *
 * @example
 * // Assertive announcement for errors
 * function Form() {
 *   const { announce } = useAriaLiveAnnouncer({ politeness: 'assertive' });
 *
 *   const handleError = (error) => {
 *     announce(`Error: ${error.message}`, 'assertive');
 *   };
 * }
 */
export function useAriaLiveAnnouncer(
	options: UseAriaLiveAnnouncerOptions = {},
): AriaLiveAnnouncer {
	const { politeness = "polite", clearDelay = 1000 } = options;

	const liveRegionRef = useRef<HTMLDivElement | null>(null);
	const clearTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Create live region on mount
	useEffect(() => {
		// Check if we already have a live region
		let existingRegion = document.getElementById(
			"aria-live-announcer",
		) as HTMLDivElement | null;

		if (!existingRegion) {
			existingRegion = document.createElement("div");
			existingRegion.id = "aria-live-announcer";
			existingRegion.setAttribute("aria-live", politeness);
			existingRegion.setAttribute("aria-atomic", "true");
			existingRegion.setAttribute("role", "status");

			// Visually hidden but accessible
			Object.assign(existingRegion.style, {
				position: "absolute",
				width: "1px",
				height: "1px",
				padding: "0",
				margin: "-1px",
				overflow: "hidden",
				clip: "rect(0, 0, 0, 0)",
				whiteSpace: "nowrap",
				border: "0",
			});

			document.body.appendChild(existingRegion);
		}

		liveRegionRef.current = existingRegion;

		return () => {
			if (clearTimeoutRef.current) {
				clearTimeout(clearTimeoutRef.current);
			}
		};
	}, [politeness]);

	const clear = useCallback(() => {
		if (liveRegionRef.current) {
			liveRegionRef.current.textContent = "";
		}
	}, []);

	const announce = useCallback(
		(message: string, announcePoliteness?: AriaLivePoliteness) => {
			if (!liveRegionRef.current) return;

			// Clear any pending timeout
			if (clearTimeoutRef.current) {
				clearTimeout(clearTimeoutRef.current);
			}

			// Update politeness if specified
			if (announcePoliteness) {
				liveRegionRef.current.setAttribute("aria-live", announcePoliteness);
			}

			// Clear first to ensure screen readers announce the new message
			// even if it's the same as the previous one
			liveRegionRef.current.textContent = "";

			// Use requestAnimationFrame to ensure the clear is processed
			requestAnimationFrame(() => {
				if (liveRegionRef.current) {
					liveRegionRef.current.textContent = message;
				}
			});

			// Schedule clear
			if (clearDelay > 0) {
				clearTimeoutRef.current = setTimeout(clear, clearDelay);
			}
		},
		[clear, clearDelay],
	);

	return { announce, clear };
}

/**
 * Utility function to announce a message without using the hook.
 * Useful for one-off announcements outside of React components.
 */
export function announceToScreenReader(
	message: string,
	politeness: AriaLivePoliteness = "polite",
): void {
	let region = document.getElementById(
		"aria-live-announcer-util",
	) as HTMLDivElement | null;

	if (!region) {
		region = document.createElement("div");
		region.id = "aria-live-announcer-util";
		region.setAttribute("aria-live", politeness);
		region.setAttribute("aria-atomic", "true");
		region.setAttribute("role", "status");

		Object.assign(region.style, {
			position: "absolute",
			width: "1px",
			height: "1px",
			padding: "0",
			margin: "-1px",
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			border: "0",
		});

		document.body.appendChild(region);
	}

	region.setAttribute("aria-live", politeness);
	region.textContent = "";

	requestAnimationFrame(() => {
		if (region) {
			region.textContent = message;
		}
	});
}
