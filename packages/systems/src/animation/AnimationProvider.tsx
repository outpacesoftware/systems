"use client";

import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { useReducedMotion } from "../utils/accessibility";
import { type GSAPInstance, getGSAP, loadGSAP } from "./gsapLoader";

// ============================================================================
// Types
// ============================================================================

export interface AnimationConfig {
	/** Global animation duration multiplier (1 = normal, 0.5 = half speed, 2 = double speed) */
	durationScale?: number;
	/** Default easing function */
	defaultEase?: string;
	/** Whether animations are globally enabled */
	enabled?: boolean;
	/** Default stagger amount for list animations */
	defaultStagger?: number;
}

export interface AnimationContextValue {
	/** Whether GSAP is loaded and available */
	isLoaded: boolean;
	/** Whether GSAP is currently loading */
	isLoading: boolean;
	/** GSAP instance (null if not available) */
	gsap: GSAPInstance | null;
	/** Whether user prefers reduced motion */
	prefersReducedMotion: boolean;
	/** Animation configuration */
	config: Required<AnimationConfig>;
	/** Effective animation enabled state (considers reduced motion) */
	shouldAnimate: boolean;
}

const defaultConfig: Required<AnimationConfig> = {
	durationScale: 1,
	defaultEase: "power2.out",
	enabled: true,
	defaultStagger: 0.05,
};

const defaultContextValue: AnimationContextValue = {
	isLoaded: false,
	isLoading: false,
	gsap: null,
	prefersReducedMotion: false,
	config: defaultConfig,
	shouldAnimate: false,
};

// ============================================================================
// Context
// ============================================================================

const AnimationContext =
	createContext<AnimationContextValue>(defaultContextValue);

/**
 * Hook to access animation context
 */
export function useAnimationContext(): AnimationContextValue {
	return useContext(AnimationContext);
}

// ============================================================================
// Provider
// ============================================================================

export interface AnimationProviderProps {
	/** Animation configuration */
	config?: AnimationConfig;
	/** Whether to load GSAP immediately */
	loadOnMount?: boolean;
	children: ReactNode;
}

/**
 * AnimationProvider - Provides GSAP animation context to children
 *
 * GSAP is loaded dynamically and is optional. Components wrapped in this
 * provider can use animation hooks that gracefully degrade when GSAP
 * is not available.
 *
 * @example
 * // Basic usage
 * <AnimationProvider>
 *   <App />
 * </AnimationProvider>
 *
 * @example
 * // With configuration
 * <AnimationProvider
 *   config={{
 *     durationScale: 0.8,
 *     defaultEase: 'power3.out',
 *   }}
 * >
 *   <App />
 * </AnimationProvider>
 */
export function AnimationProvider(props: AnimationProviderProps) {
	const { config: userConfig, loadOnMount = true, children } = props;

	const [isLoading, setIsLoading] = useState(false);
	const [isLoaded, setIsLoaded] = useState(false);
	const [gsap, setGsap] = useState<GSAPInstance | null>(null);

	const prefersReducedMotion = useReducedMotion();

	// Merge user config with defaults
	const config = useMemo(
		() => ({
			...defaultConfig,
			...userConfig,
		}),
		[userConfig],
	);

	// Load GSAP on mount if requested
	useEffect(() => {
		if (!loadOnMount) return;

		// Check if already loaded
		const existingGsap = getGSAP();
		if (existingGsap) {
			setGsap(existingGsap);
			setIsLoaded(true);
			return;
		}

		// Load GSAP
		setIsLoading(true);
		loadGSAP()
			.then((loadedGsap) => {
				setGsap(loadedGsap);
				setIsLoaded(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [loadOnMount]);

	// Calculate whether animations should run
	const shouldAnimate = useMemo(
		() => config.enabled && !prefersReducedMotion && isLoaded && gsap !== null,
		[config.enabled, prefersReducedMotion, isLoaded, gsap],
	);

	const contextValue = useMemo<AnimationContextValue>(
		() => ({
			isLoaded,
			isLoading,
			gsap,
			prefersReducedMotion,
			config,
			shouldAnimate,
		}),
		[isLoaded, isLoading, gsap, prefersReducedMotion, config, shouldAnimate],
	);

	return (
		<AnimationContext.Provider value={contextValue}>
			{children}
		</AnimationContext.Provider>
	);
}
