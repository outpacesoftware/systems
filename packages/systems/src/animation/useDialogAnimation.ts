"use client";

import { type RefObject, useCallback, useRef } from "react";
import { useAnimationContext } from "./AnimationProvider";

export interface UseDialogAnimationOptions {
	/** Custom enter duration in seconds */
	enterDuration?: number;
	/** Custom exit duration in seconds */
	exitDuration?: number;
	/** Custom easing for enter animation */
	enterEase?: string;
	/** Custom easing for exit animation */
	exitEase?: string;
	/** Initial scale for enter animation */
	enterScale?: number;
	/** Initial Y offset for enter animation */
	enterY?: number;
}

export interface UseDialogAnimationReturn<T extends HTMLElement> {
	/** Ref to attach to the dialog content element */
	ref: RefObject<T | null>;
	/** Whether animations are available */
	shouldAnimate: boolean;
	/** Animate the dialog entering */
	animateEnter: () => Promise<void>;
	/** Animate the dialog exiting */
	animateExit: () => Promise<void>;
}

/**
 * Hook for animating dialog/modal entrance and exit.
 *
 * @example
 * function AnimatedDialog({ isOpen, onClose }) {
 *   const { ref, shouldAnimate, animateEnter, animateExit } = useDialogAnimation<HTMLDivElement>();
 *
 *   useEffect(() => {
 *     if (isOpen && shouldAnimate) {
 *       animateEnter();
 *     }
 *   }, [isOpen, shouldAnimate, animateEnter]);
 *
 *   const handleClose = async () => {
 *     if (shouldAnimate) {
 *       await animateExit();
 *     }
 *     onClose();
 *   };
 *
 *   return <Dialog.Content ref={ref}>...</Dialog.Content>;
 * }
 */
export function useDialogAnimation<T extends HTMLElement = HTMLDivElement>(
	options: UseDialogAnimationOptions = {},
): UseDialogAnimationReturn<T> {
	const {
		enterDuration = 0.3,
		exitDuration = 0.2,
		enterEase = "power2.out",
		exitEase = "power2.in",
		enterScale = 0.95,
		enterY = 10,
	} = options;

	const ref = useRef<T>(null);
	const { gsap, config, shouldAnimate } = useAnimationContext();

	const animateEnter = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const duration = enterDuration * config.durationScale;

		return new Promise<void>((resolve) => {
			// Set initial state
			gsap.set(ref.current, {
				opacity: 0,
				scale: enterScale,
				y: enterY,
			});

			// Animate to final state
			gsap.to(ref.current, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration,
				ease: enterEase,
				onComplete: resolve,
			});
		});
	}, [
		gsap,
		config.durationScale,
		enterDuration,
		enterScale,
		enterY,
		enterEase,
	]);

	const animateExit = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const duration = exitDuration * config.durationScale;

		return new Promise<void>((resolve) => {
			gsap.to(ref.current, {
				opacity: 0,
				scale: enterScale,
				y: enterY,
				duration,
				ease: exitEase,
				onComplete: resolve,
			});
		});
	}, [gsap, config.durationScale, exitDuration, enterScale, enterY, exitEase]);

	return {
		ref,
		shouldAnimate,
		animateEnter,
		animateExit,
	};
}
