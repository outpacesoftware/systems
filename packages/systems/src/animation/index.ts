// Animation module for @outpacesoftware/systems
// Requires GSAP as an optional peer dependency

// Animation context
export {
	type AnimationConfig,
	type AnimationContextValue,
	AnimationProvider,
	type AnimationProviderProps,
	useAnimationContext,
} from "./AnimationProvider";
// GSAP loader
export {
	type GSAPInstance,
	type GSAPTimeline,
	type GSAPTimelineVars,
	type GSAPTween,
	type GSAPTweenTarget,
	type GSAPTweenVars,
	getGSAP,
	isGSAPAvailable,
	loadGSAP,
	resetGSAPLoader,
} from "./gsapLoader";
export {
	type UseAccordionAnimationOptions,
	type UseAccordionAnimationReturn,
	useAccordionAnimation,
} from "./useAccordionAnimation";

// Component-specific animation hooks
export {
	type UseDialogAnimationOptions,
	type UseDialogAnimationReturn,
	useDialogAnimation,
} from "./useDialogAnimation";
// Base animation hook
export {
	type UseGSAPAnimationOptions,
	type UseGSAPAnimationReturn,
	useElementAnimation,
	useGSAPAnimation,
} from "./useGSAPAnimation";

export {
	type ToastPosition,
	type UseToastAnimationOptions,
	type UseToastAnimationReturn,
	useToastAnimation,
} from "./useToastAnimation";
