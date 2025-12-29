"use client";

import { useEffect, useState } from "react";

/**
 * Hook to detect if the user prefers reduced motion.
 * Listens to the prefers-reduced-motion media query.
 *
 * @returns boolean - true if user prefers reduced motion
 *
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * if (prefersReducedMotion) {
 *   // Skip animations or use instant transitions
 * }
 */
export function useReducedMotion(): boolean {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		// Set initial value
		setPrefersReducedMotion(mediaQuery.matches);

		// Listen for changes
		const handleChange = (event: MediaQueryListEvent) => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);

		return () => {
			mediaQuery.removeEventListener("change", handleChange);
		};
	}, []);

	return prefersReducedMotion;
}

/**
 * SSR-safe check for reduced motion preference.
 * Returns false on server, actual preference on client.
 */
export function getReducedMotionPreference(): boolean {
	if (typeof window === "undefined") return false;
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
