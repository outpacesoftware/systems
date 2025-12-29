"use client";

import { type RefObject, useCallback, useRef } from "react";
import { useAnimationContext } from "./AnimationProvider";

export type ToastPosition =
	| "top"
	| "top-left"
	| "top-right"
	| "bottom"
	| "bottom-left"
	| "bottom-right";

export interface UseToastAnimationOptions {
	/** Position of the toast */
	position?: ToastPosition;
	/** Duration of enter animation in seconds */
	enterDuration?: number;
	/** Duration of exit animation in seconds */
	exitDuration?: number;
	/** Easing for enter animation */
	enterEase?: string;
	/** Easing for exit animation */
	exitEase?: string;
}

export interface UseToastAnimationReturn<T extends HTMLElement> {
	/** Ref to attach to the toast element */
	ref: RefObject<T | null>;
	/** Whether animations are available */
	shouldAnimate: boolean;
	/** Animate the toast entering */
	animateEnter: () => Promise<void>;
	/** Animate the toast exiting */
	animateExit: () => Promise<void>;
}

/**
 * Hook for animating toast notifications with slide-in/out effects.
 *
 * @example
 * function AnimatedToast({ position = 'bottom-right' }) {
 *   const { ref, shouldAnimate, animateEnter } = useToastAnimation<HTMLDivElement>({
 *     position,
 *   });
 *
 *   useEffect(() => {
 *     if (shouldAnimate) {
 *       animateEnter();
 *     }
 *   }, [shouldAnimate, animateEnter]);
 *
 *   return <div ref={ref}>Toast content</div>;
 * }
 */
export function useToastAnimation<T extends HTMLElement = HTMLDivElement>(
	options: UseToastAnimationOptions = {},
): UseToastAnimationReturn<T> {
	const {
		position = "bottom-right",
		enterDuration = 0.4,
		exitDuration = 0.3,
		enterEase = "power3.out",
		exitEase = "power2.in",
	} = options;

	const ref = useRef<T>(null);
	const { gsap, config, shouldAnimate } = useAnimationContext();

	// Calculate slide direction based on position
	const getSlideOffset = useCallback(() => {
		switch (position) {
			case "top":
			case "top-left":
			case "top-right":
				return { x: 0, y: -50 };
			case "bottom":
			case "bottom-left":
			case "bottom-right":
				return { x: 0, y: 50 };
			default:
				return { x: 0, y: 50 };
		}
	}, [position]);

	const animateEnter = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const scaledDuration = enterDuration * config.durationScale;
		const offset = getSlideOffset();

		return new Promise<void>((resolve) => {
			// Set initial state
			gsap.set(ref.current, {
				opacity: 0,
				x: offset.x,
				y: offset.y,
				scale: 0.9,
			});

			// Animate to final state
			gsap.to(ref.current, {
				opacity: 1,
				x: 0,
				y: 0,
				scale: 1,
				duration: scaledDuration,
				ease: enterEase,
				onComplete: resolve,
			});
		});
	}, [gsap, config.durationScale, enterDuration, enterEase, getSlideOffset]);

	const animateExit = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const scaledDuration = exitDuration * config.durationScale;
		const offset = getSlideOffset();

		return new Promise<void>((resolve) => {
			gsap.to(ref.current, {
				opacity: 0,
				x: offset.x,
				y: offset.y,
				scale: 0.9,
				duration: scaledDuration,
				ease: exitEase,
				onComplete: resolve,
			});
		});
	}, [gsap, config.durationScale, exitDuration, exitEase, getSlideOffset]);

	return {
		ref,
		shouldAnimate,
		animateEnter,
		animateExit,
	};
}
