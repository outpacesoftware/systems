// Accessibility utilities for @outpacesoftware/systems

export {
	type AriaLiveAnnouncer,
	type AriaLivePoliteness,
	announceToScreenReader,
	type UseAriaLiveAnnouncerOptions,
	useAriaLiveAnnouncer,
} from "./useAriaLiveAnnouncer";
export {
	getFocusableElements,
	type UseFocusTrapOptions,
	useFocusTrap,
} from "./useFocusTrap";
export {
	getReducedMotionPreference,
	useReducedMotion,
} from "./useReducedMotion";
export {
	VisuallyHidden,
	type VisuallyHiddenProps,
	visuallyHiddenClass,
} from "./VisuallyHidden";
