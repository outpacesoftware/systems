"use client";

import { type RefObject, useCallback, useEffect, useRef } from "react";
import { useAnimationContext } from "./AnimationProvider";
import type {
	GSAPTimeline,
	GSAPTween,
	GSAPTweenTarget,
	GSAPTweenVars,
} from "./gsapLoader";

// ============================================================================
// Types
// ============================================================================

export interface UseGSAPAnimationOptions {
	/** Skip animation and apply final state immediately */
	immediate?: boolean;
	/** Custom duration (overrides context durationScale) */
	duration?: number;
	/** Custom easing (overrides context defaultEase) */
	ease?: string;
}

export interface UseGSAPAnimationReturn {
	/** Whether animations are available and should run */
	shouldAnimate: boolean;
	/** Animate element(s) to target state */
	to: (targets: GSAPTweenTarget, vars: GSAPTweenVars) => GSAPTween | null;
	/** Animate element(s) from initial state */
	from: (targets: GSAPTweenTarget, vars: GSAPTweenVars) => GSAPTween | null;
	/** Animate element(s) from one state to another */
	fromTo: (
		targets: GSAPTweenTarget,
		fromVars: GSAPTweenVars,
		toVars: GSAPTweenVars,
	) => GSAPTween | null;
	/** Set element(s) to state immediately (no animation) */
	set: (targets: GSAPTweenTarget, vars: GSAPTweenVars) => GSAPTween | null;
	/** Create a timeline for sequenced animations */
	timeline: () => GSAPTimeline | null;
	/** Kill all tweens on target(s) */
	kill: (targets: GSAPTweenTarget) => void;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Base hook for GSAP animations.
 * Provides access to GSAP methods with automatic configuration
 * and reduced motion handling.
 *
 * @example
 * function FadeInComponent() {
 *   const ref = useRef<HTMLDivElement>(null);
 *   const { shouldAnimate, from } = useGSAPAnimation();
 *
 *   useEffect(() => {
 *     if (shouldAnimate && ref.current) {
 *       from(ref.current, { opacity: 0, y: 20 });
 *     }
 *   }, [shouldAnimate, from]);
 *
 *   return <div ref={ref}>Content</div>;
 * }
 */
export function useGSAPAnimation(
	options: UseGSAPAnimationOptions = {},
): UseGSAPAnimationReturn {
	const { immediate = false } = options;
	const {
		gsap,
		config,
		shouldAnimate: contextShouldAnimate,
	} = useAnimationContext();

	// Track active tweens for cleanup
	const activeTweens = useRef<Set<GSAPTween>>(new Set());

	// Determine if we should animate
	const shouldAnimate = contextShouldAnimate && !immediate;

	// Apply config defaults to vars
	const applyDefaults = useCallback(
		(vars: GSAPTweenVars): GSAPTweenVars => {
			const varsDuration =
				typeof vars.duration === "number" ? vars.duration : 0.3;
			const duration = options.duration ?? varsDuration;
			const scaledDuration = duration * config.durationScale;

			return {
				ease: options.ease ?? config.defaultEase,
				...vars,
				duration: shouldAnimate ? scaledDuration : 0,
			};
		},
		[
			config.durationScale,
			config.defaultEase,
			options.duration,
			options.ease,
			shouldAnimate,
		],
	);

	// Track tween for cleanup
	const trackTween = useCallback(
		(tween: GSAPTween | null): GSAPTween | null => {
			if (tween) {
				activeTweens.current.add(tween);
			}
			return tween;
		},
		[],
	);

	// Animate to target state
	const to = useCallback(
		(targets: GSAPTweenTarget, vars: GSAPTweenVars): GSAPTween | null => {
			if (!gsap || !targets) return null;
			return trackTween(gsap.to(targets, applyDefaults(vars)));
		},
		[gsap, applyDefaults, trackTween],
	);

	// Animate from initial state
	const from = useCallback(
		(targets: GSAPTweenTarget, vars: GSAPTweenVars): GSAPTween | null => {
			if (!gsap || !targets) return null;
			return trackTween(gsap.from(targets, applyDefaults(vars)));
		},
		[gsap, applyDefaults, trackTween],
	);

	// Animate from one state to another
	const fromTo = useCallback(
		(
			targets: GSAPTweenTarget,
			fromVars: GSAPTweenVars,
			toVars: GSAPTweenVars,
		): GSAPTween | null => {
			if (!gsap || !targets) return null;
			return trackTween(gsap.fromTo(targets, fromVars, applyDefaults(toVars)));
		},
		[gsap, applyDefaults, trackTween],
	);

	// Set state immediately
	const set = useCallback(
		(targets: GSAPTweenTarget, vars: GSAPTweenVars): GSAPTween | null => {
			if (!gsap || !targets) return null;
			return gsap.set(targets, vars);
		},
		[gsap],
	);

	// Create timeline
	const timeline = useCallback((): GSAPTimeline | null => {
		if (!gsap) return null;
		return gsap.timeline({
			defaults: {
				ease: options.ease ?? config.defaultEase,
				duration: 0.3 * config.durationScale,
			},
		});
	}, [gsap, config.defaultEase, config.durationScale, options.ease]);

	// Kill tweens on target
	const kill = useCallback(
		(targets: GSAPTweenTarget): void => {
			if (!gsap || !targets) return;
			gsap.killTweensOf(targets);
		},
		[gsap],
	);

	// Cleanup on unmount
	useEffect(() => {
		return () => {
			activeTweens.current.forEach((tween) => {
				try {
					tween.kill();
				} catch {
					// Ignore errors during cleanup
				}
			});
			activeTweens.current.clear();
		};
	}, []);

	return {
		shouldAnimate,
		to,
		from,
		fromTo,
		set,
		timeline,
		kill,
	};
}

// ============================================================================
// Convenience hooks for specific elements
// ============================================================================

/**
 * Hook that provides animation methods bound to a specific ref.
 * Automatically cleans up animations when component unmounts.
 *
 * @example
 * function AnimatedBox() {
 *   const { ref, animate, shouldAnimate } = useElementAnimation<HTMLDivElement>();
 *
 *   useEffect(() => {
 *     if (shouldAnimate) {
 *       animate.from({ opacity: 0, scale: 0.9 });
 *     }
 *   }, [shouldAnimate, animate]);
 *
 *   return <div ref={ref}>Animated content</div>;
 * }
 */
export function useElementAnimation<T extends HTMLElement>(
	options: UseGSAPAnimationOptions = {},
) {
	const ref = useRef<T>(null);
	const { shouldAnimate, to, from, fromTo, set, kill } =
		useGSAPAnimation(options);

	// Cleanup on unmount
	useEffect(() => {
		const element = ref.current;
		return () => {
			if (element) {
				kill(element);
			}
		};
	}, [kill]);

	const animate = {
		to: (vars: GSAPTweenVars) => to(ref.current, vars),
		from: (vars: GSAPTweenVars) => from(ref.current, vars),
		fromTo: (fromVars: GSAPTweenVars, toVars: GSAPTweenVars) =>
			fromTo(ref.current, fromVars, toVars),
		set: (vars: GSAPTweenVars) => set(ref.current, vars),
	};

	return {
		ref,
		animate,
		shouldAnimate,
		kill: () => kill(ref.current),
	};
}
