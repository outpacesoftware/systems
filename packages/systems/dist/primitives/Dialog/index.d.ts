import * as react from 'react';
import { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface DialogContextValue {
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
declare function useDialogContext(): DialogContextValue;
interface DialogProviderProps {
    children: ReactNode;
    value: DialogContextValue;
}
declare function DialogProvider({ children, value }: DialogProviderProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the useDialog hook
 */
interface UseDialogProps {
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
type UseDialogReturn = DialogContextValue;
/**
 * useDialog - Hook for building accessible dialogs
 */
declare function useDialog(props?: UseDialogProps): UseDialogReturn;

interface DialogRootProps extends UseDialogProps {
    children: ReactNode;
}
/**
 * Dialog.Root - Container for the dialog
 */
declare function DialogRoot({ children, ...props }: DialogRootProps): react_jsx_runtime.JSX.Element;
interface DialogTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}
interface DialogPortalProps {
    children: ReactNode;
    container?: Element | null;
}
/**
 * Dialog.Portal - Renders children in a portal
 */
declare function DialogPortal({ children, container }: DialogPortalProps): react.ReactPortal | null;
interface DialogBackdropProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}
interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
interface DialogTitleProps extends HTMLAttributes<HTMLHeadingElement> {
    children: ReactNode;
    className?: string;
}
interface DialogDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
    children: ReactNode;
    className?: string;
}
interface DialogCloseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}
declare const Dialog: {
    Root: typeof DialogRoot;
    Trigger: react.ForwardRefExoticComponent<DialogTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Portal: typeof DialogPortal;
    Backdrop: react.ForwardRefExoticComponent<DialogBackdropProps & react.RefAttributes<HTMLDivElement>>;
    Content: react.ForwardRefExoticComponent<DialogContentProps & react.RefAttributes<HTMLDivElement>>;
    Title: react.ForwardRefExoticComponent<DialogTitleProps & react.RefAttributes<HTMLHeadingElement>>;
    Description: react.ForwardRefExoticComponent<DialogDescriptionProps & react.RefAttributes<HTMLParagraphElement>>;
    Close: react.ForwardRefExoticComponent<DialogCloseProps & react.RefAttributes<HTMLButtonElement>>;
};

export { Dialog, type DialogBackdropProps, type DialogCloseProps, type DialogContentProps, type DialogContextValue, type DialogDescriptionProps, type DialogPortalProps, DialogProvider, type DialogRootProps, type DialogTitleProps, type DialogTriggerProps, type UseDialogProps, type UseDialogReturn, useDialog, useDialogContext };
