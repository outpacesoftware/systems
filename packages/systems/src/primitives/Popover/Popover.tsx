'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useId,
  useRef,
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Context
// ============================================================================

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error('Popover components must be used within Popover.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface PopoverRootProps {
  /** Whether the popover is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

function Root(props: PopoverRootProps) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;

  const setOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <PopoverContext.Provider
      value={{
        open,
        setOpen,
        triggerId,
        contentId,
        triggerRef,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}

Root.displayName = 'Popover.Root';

// ============================================================================
// Trigger
// ============================================================================

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = usePopoverContext();

  const handleClick = useCallback(() => {
    context.setOpen(!context.open);
  }, [context]);

  return (
    <button
      ref={(node) => {
        (context.triggerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      type="button"
      id={context.triggerId}
      aria-haspopup="dialog"
      aria-expanded={context.open}
      aria-controls={context.open ? context.contentId : undefined}
      data-state={context.open ? 'open' : 'closed'}
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
});

Trigger.displayName = 'Popover.Trigger';

// ============================================================================
// Portal
// ============================================================================

export interface PopoverPortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

function Portal({ children, container }: PopoverPortalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container || document.body);
}

Portal.displayName = 'Popover.Portal';

// ============================================================================
// Content
// ============================================================================

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Side relative to trigger */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Offset from trigger */
  sideOffset?: number;
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, PopoverContentProps>((props, ref) => {
  const { align = 'center', side = 'bottom', sideOffset = 4, children, className, ...rest } = props;
  const context = usePopoverContext();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!context.open) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        context.triggerRef.current &&
        !context.triggerRef.current.contains(target)
      ) {
        context.setOpen(false);
      }
    };

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        context.setOpen(false);
        context.triggerRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [context]);

  if (!context.open) return null;

  return (
    <div
      ref={(node) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      role="dialog"
      id={context.contentId}
      aria-labelledby={context.triggerId}
      data-state="open"
      data-side={side}
      data-align={align}
      tabIndex={-1}
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
});

Content.displayName = 'Popover.Content';

// ============================================================================
// Close
// ============================================================================

export interface PopoverCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Close = forwardRef<HTMLButtonElement, PopoverCloseProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = usePopoverContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.setOpen(false);
      onClick?.(event);
    },
    [context, onClick]
  );

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleClick}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
});

Close.displayName = 'Popover.Close';

// ============================================================================
// Arrow
// ============================================================================

export interface PopoverArrowProps extends HTMLAttributes<HTMLDivElement> {
  width?: number;
  height?: number;
}

const Arrow = forwardRef<HTMLDivElement, PopoverArrowProps>((props, ref) => {
  const { width = 10, height = 5, className, style, ...rest } = props;

  return (
    <div
      ref={ref}
      style={{ width, height, ...style }}
      className={className}
      {...rest}
    />
  );
});

Arrow.displayName = 'Popover.Arrow';

// ============================================================================
// Export
// ============================================================================

export const Popover = {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Arrow,
};
