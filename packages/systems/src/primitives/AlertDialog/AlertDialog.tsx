'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useId,
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Context
// ============================================================================

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const AlertDialogContext = createContext<AlertDialogContextValue | null>(null);

function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error('AlertDialog components must be used within AlertDialog.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface AlertDialogRootProps {
  /** Whether the dialog is open (controlled) */
  open?: boolean;
  /** Default open state */
  defaultOpen?: boolean;
  /** Called when open state changes */
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

function Root(props: AlertDialogRootProps) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;

  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const titleId = useId();
  const descriptionId = useId();

  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <AlertDialogContext.Provider value={{ open, onOpenChange: handleOpenChange, titleId, descriptionId }}>
      {children}
    </AlertDialogContext.Provider>
  );
}

Root.displayName = 'AlertDialog.Root';

// ============================================================================
// Trigger
// ============================================================================

export interface AlertDialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, AlertDialogTriggerProps>((props, ref) => {
  const { children, onClick, ...rest } = props;
  const context = useAlertDialogContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(true);
      onClick?.(event);
    },
    [context, onClick]
  );

  return (
    <button
      ref={ref}
      type="button"
      aria-haspopup="dialog"
      aria-expanded={context.open}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
});

Trigger.displayName = 'AlertDialog.Trigger';

// ============================================================================
// Portal
// ============================================================================

export interface AlertDialogPortalProps {
  /** Container element to render into */
  container?: Element | null;
  children: ReactNode;
}

function Portal(props: AlertDialogPortalProps) {
  const { container, children } = props;
  const context = useAlertDialogContext();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !context.open) return null;

  return createPortal(children, container || document.body);
}

Portal.displayName = 'AlertDialog.Portal';

// ============================================================================
// Overlay
// ============================================================================

export interface AlertDialogOverlayProps extends HTMLAttributes<HTMLDivElement> {}

const Overlay = forwardRef<HTMLDivElement, AlertDialogOverlayProps>((props, ref) => {
  const { className, ...rest } = props;

  return (
    <div
      ref={ref}
      data-state="open"
      aria-hidden="true"
      className={className}
      {...rest}
    />
  );
});

Overlay.displayName = 'AlertDialog.Overlay';

// ============================================================================
// Content
// ============================================================================

export interface AlertDialogContentProps extends HTMLAttributes<HTMLDivElement> {
  /** Called when escape key is pressed */
  onEscapeKeyDown?: (event: KeyboardEvent) => void;
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, AlertDialogContentProps>((props, ref) => {
  const { children, className, onEscapeKeyDown, ...rest } = props;
  const context = useAlertDialogContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented) {
          context.onOpenChange(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [context, onEscapeKeyDown]);

  // Trap focus within dialog
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement;

    return () => {
      previousActiveElement?.focus();
    };
  }, []);

  return (
    <div
      ref={ref}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={context.titleId}
      aria-describedby={context.descriptionId}
      data-state="open"
      className={className}
      {...rest}
    >
      {children}
    </div>
  );
});

Content.displayName = 'AlertDialog.Content';

// ============================================================================
// Title
// ============================================================================

export interface AlertDialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const Title = forwardRef<HTMLHeadingElement, AlertDialogTitleProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useAlertDialogContext();

  return (
    <h2 ref={ref} id={context.titleId} className={className} {...rest}>
      {children}
    </h2>
  );
});

Title.displayName = 'AlertDialog.Title';

// ============================================================================
// Description
// ============================================================================

export interface AlertDialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

const Description = forwardRef<HTMLParagraphElement, AlertDialogDescriptionProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useAlertDialogContext();

  return (
    <p ref={ref} id={context.descriptionId} className={className} {...rest}>
      {children}
    </p>
  );
});

Description.displayName = 'AlertDialog.Description';

// ============================================================================
// Cancel
// ============================================================================

export interface AlertDialogCancelProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Cancel = forwardRef<HTMLButtonElement, AlertDialogCancelProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useAlertDialogContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );

  return (
    <button ref={ref} type="button" onClick={handleClick} className={className} {...rest}>
      {children}
    </button>
  );
});

Cancel.displayName = 'AlertDialog.Cancel';

// ============================================================================
// Action
// ============================================================================

export interface AlertDialogActionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Action = forwardRef<HTMLButtonElement, AlertDialogActionProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useAlertDialogContext();

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );

  return (
    <button ref={ref} type="button" onClick={handleClick} className={className} {...rest}>
      {children}
    </button>
  );
});

Action.displayName = 'AlertDialog.Action';

// ============================================================================
// Export
// ============================================================================

export const AlertDialog = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
};
