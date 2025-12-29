'use client';

import {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';
import { useTooltip, type UseTooltipProps, type UseTooltipReturn } from './useTooltip';

// ============================================================================
// Context
// ============================================================================

const TooltipContext = createContext<UseTooltipReturn | null>(null);

function useTooltipContext(): UseTooltipReturn {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error('Tooltip components must be used within a Tooltip.Root');
  }
  return context;
}

// ============================================================================
// Tooltip.Root
// ============================================================================

export interface TooltipRootProps extends UseTooltipProps {
  children: ReactNode;
}

/**
 * Tooltip.Root - Container for the tooltip
 */
function TooltipRoot({ children, ...props }: TooltipRootProps) {
  const context = useTooltip(props);
  return (
    <TooltipContext.Provider value={context}>{children}</TooltipContext.Provider>
  );
}

// ============================================================================
// Tooltip.Trigger
// ============================================================================

export interface TooltipTriggerProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  className?: string;
  /** Render as a different element */
  asChild?: boolean;
}

/**
 * Tooltip.Trigger - Element that triggers the tooltip on hover/focus
 */
const TooltipTrigger = forwardRef<HTMLSpanElement, TooltipTriggerProps>(
  ({ children, className, asChild, ...props }, ref) => {
    const { triggerProps } = useTooltipContext();

    // Simple span wrapper - for asChild, users can apply triggerProps to their element
    return (
      <span
        ref={ref}
        className={className}
        data-tooltip-trigger=""
        {...triggerProps}
        {...props}
      >
        {children}
      </span>
    );
  }
);

TooltipTrigger.displayName = 'Tooltip.Trigger';

// ============================================================================
// Tooltip.Portal
// ============================================================================

export interface TooltipPortalProps {
  children: ReactNode;
  container?: Element | null;
}

/**
 * Tooltip.Portal - Renders content in a portal
 */
function TooltipPortal({ children, container }: TooltipPortalProps) {
  const { isOpen } = useTooltipContext();

  if (!isOpen) return null;

  const target = container || (typeof document !== 'undefined' ? document.body : null);
  if (!target) return null;

  return createPortal(children, target);
}

// ============================================================================
// Tooltip.Content
// ============================================================================

export interface TooltipContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  /** Position relative to trigger */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment along the side */
  align?: 'start' | 'center' | 'end';
  /** Offset from the trigger (px) */
  sideOffset?: number;
}

/**
 * Tooltip.Content - The tooltip content
 */
const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  (
    {
      children,
      className,
      side = 'top',
      align = 'center',
      sideOffset = 4,
      ...props
    },
    ref
  ) => {
    const { contentProps, isOpen } = useTooltipContext();

    if (!isOpen) return null;

    return (
      <div
        ref={ref}
        className={className}
        data-tooltip-content=""
        data-side={side}
        data-align={align}
        data-state={isOpen ? 'open' : 'closed'}
        style={{ '--tooltip-offset': `${sideOffset}px` } as React.CSSProperties}
        {...contentProps}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TooltipContent.displayName = 'Tooltip.Content';

// ============================================================================
// Tooltip.Arrow
// ============================================================================

export interface TooltipArrowProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Tooltip.Arrow - Arrow pointing to trigger
 */
const TooltipArrow = forwardRef<HTMLDivElement, TooltipArrowProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={className}
        data-tooltip-arrow=""
        aria-hidden="true"
        {...props}
      />
    );
  }
);

TooltipArrow.displayName = 'Tooltip.Arrow';

// ============================================================================
// Export
// ============================================================================

export const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow,
};
