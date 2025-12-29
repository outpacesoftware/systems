'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Context
// ============================================================================

interface PreviewCardContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLAnchorElement | null>;
}

const PreviewCardContext = createContext<PreviewCardContextValue | null>(null);

function usePreviewCardContext() {
  const context = useContext(PreviewCardContext);
  if (!context) {
    throw new Error('PreviewCard components must be used within PreviewCard.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface PreviewCardRootProps {
  /** Whether the preview card is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Delay before opening in ms */
  openDelay?: number;
  /** Delay before closing in ms */
  closeDelay?: number;
  children: ReactNode;
}

function Root(props: PreviewCardRootProps) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    openDelay = 700,
    closeDelay = 300,
    children,
  } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const triggerRef = useRef<HTMLAnchorElement | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (newOpen) {
        clearTimeout(closeTimerRef.current);
        openTimerRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(true);
          }
          onOpenChange?.(true);
        }, openDelay);
      } else {
        clearTimeout(openTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(false);
          }
          onOpenChange?.(false);
        }, closeDelay);
      }
    },
    [isControlled, onOpenChange, openDelay, closeDelay]
  );

  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <PreviewCardContext.Provider value={{ open, onOpenChange: handleOpenChange, triggerRef }}>
      {children}
    </PreviewCardContext.Provider>
  );
}

Root.displayName = 'PreviewCard.Root';

// ============================================================================
// Trigger
// ============================================================================

export interface PreviewCardTriggerProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Link href */
  href?: string;
  children: ReactNode;
}

const Trigger = forwardRef<HTMLAnchorElement, PreviewCardTriggerProps>((props, ref) => {
  const { href, children, onMouseEnter, onMouseLeave, onFocus, onBlur, className, ...rest } = props;
  const context = usePreviewCardContext();

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      context.onOpenChange(true);
      onMouseEnter?.(event);
    },
    [context, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      context.onOpenChange(false);
      onMouseLeave?.(event);
    },
    [context, onMouseLeave]
  );

  const handleFocus = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      context.onOpenChange(true);
      onFocus?.(event);
    },
    [context, onFocus]
  );

  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLAnchorElement>) => {
      context.onOpenChange(false);
      onBlur?.(event);
    },
    [context, onBlur]
  );

  return (
    <a
      ref={(node) => {
        (context.triggerRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      href={href}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
});

Trigger.displayName = 'PreviewCard.Trigger';

// ============================================================================
// Portal
// ============================================================================

export interface PreviewCardPortalProps {
  /** Container element to render into */
  container?: Element | null;
  children: ReactNode;
}

function Portal(props: PreviewCardPortalProps) {
  const { container, children } = props;
  const context = usePreviewCardContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context.open) return null;

  return createPortal(children, container || document.body);
}

Portal.displayName = 'PreviewCard.Portal';

// ============================================================================
// Content
// ============================================================================

export interface PreviewCardContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Side of the trigger to render on */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Side offset in pixels */
  sideOffset?: number;
  /** Alignment along the side */
  align?: 'start' | 'center' | 'end';
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, PreviewCardContentProps>((props, ref) => {
  const {
    side = 'bottom',
    sideOffset = 8,
    align = 'center',
    children,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    ...rest
  } = props;
  const context = usePreviewCardContext();

  const handleMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      context.onOpenChange(true);
      onMouseEnter?.(event);
    },
    [context, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      context.onOpenChange(false);
      onMouseLeave?.(event);
    },
    [context, onMouseLeave]
  );

  return (
    <div
      ref={ref}
      data-state={context.open ? 'open' : 'closed'}
      data-side={side}
      data-align={align}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ position: 'absolute', ...style }}
      {...rest}
    >
      {children}
    </div>
  );
});

Content.displayName = 'PreviewCard.Content';

// ============================================================================
// Arrow
// ============================================================================

export interface PreviewCardArrowProps extends HTMLAttributes<HTMLDivElement> {
  /** Width of the arrow */
  width?: number;
  /** Height of the arrow */
  height?: number;
}

const Arrow = forwardRef<HTMLDivElement, PreviewCardArrowProps>((props, ref) => {
  const { width = 10, height = 5, className, style, ...rest } = props;

  return (
    <div
      ref={ref}
      className={className}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
});

Arrow.displayName = 'PreviewCard.Arrow';

// ============================================================================
// Export
// ============================================================================

export const PreviewCard = {
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
};
