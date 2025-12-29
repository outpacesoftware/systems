'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface DialogContextValue {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Whether the dialog is modal (blocks interaction outside) */
  isModal: boolean;
  /** Unique ID for accessibility */
  id: string;
  /** Open the dialog */
  open: () => void;
  /** Close the dialog */
  close: () => void;
  /** Toggle open state */
  toggle: () => void;
  /** Title ID for aria-labelledby */
  titleId: string;
  /** Description ID for aria-describedby */
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

export function useDialogContext(): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('Dialog components must be used within a Dialog.Root');
  }
  return context;
}

export interface DialogProviderProps {
  children: ReactNode;
  value: DialogContextValue;
}

export function DialogProvider({ children, value }: DialogProviderProps) {
  return (
    <DialogContext.Provider value={value}>{children}</DialogContext.Provider>
  );
}
