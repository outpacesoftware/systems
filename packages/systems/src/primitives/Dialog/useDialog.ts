'use client';

import { useState, useCallback, useId, useEffect } from 'react';
import type { DialogContextValue } from './DialogContext';

/**
 * Props for the useDialog hook
 */
export interface UseDialogProps {
  /**
   * Controlled open state
   */
  open?: boolean;

  /**
   * Default open state
   */
  defaultOpen?: boolean;

  /**
   * Whether the dialog is modal
   * @default true
   */
  modal?: boolean;

  /**
   * Handler called when open state changes
   */
  onOpenChange?: (isOpen: boolean) => void;
}

/**
 * Return type for useDialog hook
 */
export type UseDialogReturn = DialogContextValue;

/**
 * useDialog - Hook for building accessible dialogs
 */
export function useDialog(props: UseDialogProps = {}): UseDialogReturn {
  const {
    open: controlledOpen,
    defaultOpen = false,
    modal = true,
    onOpenChange,
  } = props;

  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const updateOpen = useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  const open = useCallback(() => updateOpen(true), [updateOpen]);
  const close = useCallback(() => updateOpen(false), [updateOpen]);
  const toggle = useCallback(() => updateOpen(!isOpen), [updateOpen, isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen || !modal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, modal]);

  return {
    isOpen,
    isModal: modal,
    id,
    open,
    close,
    toggle,
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
  };
}
