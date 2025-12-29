"use client";

import { type RefObject, useCallback, useRef } from "react";
import { useAnimationContext } from "./AnimationProvider";

export interface UseAccordionAnimationOptions {
	/** Duration of expand/collapse animation in seconds */
	duration?: number;
	/** Easing for expand animation */
	expandEase?: string;
	/** Easing for collapse animation */
	collapseEase?: string;
}

export interface UseAccordionAnimationReturn<T extends HTMLElement> {
	/** Ref to attach to the content container */
	ref: RefObject<T | null>;
	/** Whether animations are available */
	shouldAnimate: boolean;
	/** Animate expanding the content */
	animateExpand: () => Promise<void>;
	/** Animate collapsing the content */
	animateCollapse: () => Promise<void>;
}

/**
 * Hook for animating accordion/collapsible content expansion and collapse.
 *
 * @example
 * function AnimatedAccordionContent({ isOpen }) {
 *   const { ref, shouldAnimate, animateExpand, animateCollapse } = useAccordionAnimation<HTMLDivElement>();
 *   const wasOpen = useRef(isOpen);
 *
 *   useEffect(() => {
 *     if (!shouldAnimate) return;
 *
 *     if (isOpen && !wasOpen.current) {
 *       animateExpand();
 *     } else if (!isOpen && wasOpen.current) {
 *       animateCollapse();
 *     }
 *
 *     wasOpen.current = isOpen;
 *   }, [isOpen, shouldAnimate, animateExpand, animateCollapse]);
 *
 *   return <div ref={ref}>...</div>;
 * }
 */
export function useAccordionAnimation<T extends HTMLElement = HTMLDivElement>(
	options: UseAccordionAnimationOptions = {},
): UseAccordionAnimationReturn<T> {
	const {
		duration = 0.3,
		expandEase = "power2.out",
		collapseEase = "power2.inOut",
	} = options;

	const ref = useRef<T>(null);
	const { gsap, config, shouldAnimate } = useAnimationContext();

	const animateExpand = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const element = ref.current;
		const scaledDuration = duration * config.durationScale;

		return new Promise<void>((resolve) => {
			// Get natural height
			const naturalHeight = element.scrollHeight;

			// Set initial state
			gsap.set(element, {
				height: 0,
				opacity: 0,
				overflow: "hidden",
			});

			// Animate to natural height
			gsap.to(element, {
				height: naturalHeight,
				opacity: 1,
				duration: scaledDuration,
				ease: expandEase,
				onComplete: () => {
					// Reset height to auto for responsive behavior
					gsap.set(element, { height: "auto", overflow: "" });
					resolve();
				},
			});
		});
	}, [gsap, config.durationScale, duration, expandEase]);

	const animateCollapse = useCallback(async (): Promise<void> => {
		if (!gsap || !ref.current) return;

		const element = ref.current;
		const scaledDuration = duration * config.durationScale;

		return new Promise<void>((resolve) => {
			// Get current height before collapsing
			const currentHeight = element.offsetHeight;

			// Set to explicit height for animation
			gsap.set(element, {
				height: currentHeight,
				overflow: "hidden",
			});

			// Animate to collapsed
			gsap.to(element, {
				height: 0,
				opacity: 0,
				duration: scaledDuration,
				ease: collapseEase,
				onComplete: resolve,
			});
		});
	}, [gsap, config.durationScale, duration, collapseEase]);

	return {
		ref,
		shouldAnimate,
		animateExpand,
		animateCollapse,
	};
}
