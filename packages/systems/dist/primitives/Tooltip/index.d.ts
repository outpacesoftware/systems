import * as react from 'react';
import { ReactNode, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

/**
 * Props for the useTooltip hook
 */
interface UseTooltipProps {
    /**
     * Controlled open state
     */
    open?: boolean;
    /**
     * Default open state
     */
    defaultOpen?: boolean;
    /**
     * Delay before showing tooltip (ms)
     * @default 300
     */
    delayDuration?: number;
    /**
     * Delay before hiding tooltip (ms)
     * @default 0
     */
    closeDelay?: number;
    /**
     * Handler called when open state changes
     */
    onOpenChange?: (isOpen: boolean) => void;
}
/**
 * Return type for useTooltip hook
 */
interface UseTooltipReturn {
    /** Whether the tooltip is open */
    isOpen: boolean;
    /** Unique ID for accessibility */
    id: string;
    /** Open the tooltip */
    open: () => void;
    /** Close the tooltip */
    close: () => void;
    /** Trigger props */
    triggerProps: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
        onFocus: () => void;
        onBlur: () => void;
        'aria-describedby': string | undefined;
    };
    /** Content props */
    contentProps: {
        id: string;
        role: 'tooltip';
    };
}
/**
 * useTooltip - Hook for building accessible tooltips
 */
declare function useTooltip(props?: UseTooltipProps): UseTooltipReturn;

interface TooltipRootProps extends UseTooltipProps {
    children: ReactNode;
}
/**
 * Tooltip.Root - Container for the tooltip
 */
declare function TooltipRoot({ children, ...props }: TooltipRootProps): react_jsx_runtime.JSX.Element;
interface TooltipTriggerProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
    className?: string;
    /** Render as a different element */
    asChild?: boolean;
}
interface TooltipPortalProps {
    children: ReactNode;
    container?: Element | null;
}
/**
 * Tooltip.Portal - Renders content in a portal
 */
declare function TooltipPortal({ children, container }: TooltipPortalProps): react.ReactPortal | null;
interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
    /** Position relative to trigger */
    side?: 'top' | 'right' | 'bottom' | 'left';
    /** Alignment along the side */
    align?: 'start' | 'center' | 'end';
    /** Offset from the trigger (px) */
    sideOffset?: number;
}
interface TooltipArrowProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
declare const Tooltip: {
    Root: typeof TooltipRoot;
    Trigger: react.ForwardRefExoticComponent<TooltipTriggerProps & react.RefAttributes<HTMLSpanElement>>;
    Portal: typeof TooltipPortal;
    Content: react.ForwardRefExoticComponent<TooltipContentProps & react.RefAttributes<HTMLDivElement>>;
    Arrow: react.ForwardRefExoticComponent<TooltipArrowProps & react.RefAttributes<HTMLDivElement>>;
};

export { Tooltip, type TooltipArrowProps, type TooltipContentProps, type TooltipPortalProps, type TooltipRootProps, type TooltipTriggerProps, type UseTooltipProps, type UseTooltipReturn, useTooltip };
