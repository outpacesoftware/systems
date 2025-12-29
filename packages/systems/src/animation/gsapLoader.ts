"use client";

import type { gsap as GSAPType } from "gsap";

/**
 * GSAP loader - handles dynamic import with fallback
 *
 * GSAP is an optional peer dependency. This module handles:
 * - Dynamic import at runtime
 * - Graceful fallback when GSAP is not installed
 * - Type-safe access to GSAP core and plugins
 */

// Re-export GSAP types for convenience
export type GSAPInstance = typeof GSAPType;
export type GSAPTweenTarget = gsap.TweenTarget;
export type GSAPTweenVars = gsap.TweenVars;
export type GSAPTimelineVars = gsap.TimelineVars;
export type GSAPTween = gsap.core.Tween;
export type GSAPTimeline = gsap.core.Timeline;

// Global state for GSAP instance
let gsapInstance: GSAPInstance | null = null;
let loadingPromise: Promise<GSAPInstance | null> | null = null;
let loadError: Error | null = null;

/**
 * Check if GSAP is available without loading it
 */
export function isGSAPAvailable(): boolean {
	return gsapInstance !== null;
}

/**
 * Load GSAP dynamically. Returns null if GSAP is not installed.
 * Safe to call multiple times - caches the result.
 */
export async function loadGSAP(): Promise<GSAPInstance | null> {
	// Return cached instance if available
	if (gsapInstance) {
		return gsapInstance;
	}

	// Return cached error state
	if (loadError) {
		return null;
	}

	// Return existing loading promise if in progress
	if (loadingPromise) {
		return loadingPromise;
	}

	// Start loading
	loadingPromise = (async () => {
		try {
			// Dynamic import of GSAP
			const gsapModule = await import("gsap");
			gsapInstance = gsapModule.gsap || gsapModule.default;

			// Configure GSAP for better performance
			gsapInstance?.config({
				autoSleep: 60,
				force3D: true,
				nullTargetWarn: false,
			});

			return gsapInstance;
		} catch (error) {
			// GSAP is not installed - this is expected in most cases
			loadError =
				error instanceof Error ? error : new Error("Failed to load GSAP");
			return null;
		} finally {
			loadingPromise = null;
		}
	})();

	return loadingPromise;
}

/**
 * Get GSAP instance synchronously. Returns null if not loaded yet.
 * Use loadGSAP() first if you need to ensure it's loaded.
 */
export function getGSAP(): GSAPInstance | null {
	return gsapInstance;
}

/**
 * Reset GSAP loader state (for testing)
 */
export function resetGSAPLoader(): void {
	gsapInstance = null;
	loadingPromise = null;
	loadError = null;
}
