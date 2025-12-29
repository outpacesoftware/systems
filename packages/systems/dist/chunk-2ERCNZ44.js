import { createContext, forwardRef, useCallback, useRef, useEffect, useContext, useId, useState } from 'react';
import { createPortal } from 'react-dom';
import { jsx } from 'react/jsx-runtime';

var DialogContext = createContext(null);
function useDialogContext() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within a Dialog.Root");
  }
  return context;
}
function DialogProvider({ children, value }) {
  return /* @__PURE__ */ jsx(DialogContext.Provider, { value, children });
}
function useDialog(props = {}) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    modal = true,
    onOpenChange
  } = props;
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const updateOpen = useCallback(
    (newOpen) => {
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
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        close();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);
  useEffect(() => {
    if (!isOpen || !modal) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
    descriptionId: `${id}-description`
  };
}
function DialogRoot({ children, ...props }) {
  const context = useDialog(props);
  return /* @__PURE__ */ jsx(DialogProvider, { value: context, children });
}
var DialogTrigger = forwardRef(
  ({ children, className, onClick, ...props }, ref) => {
    const { open, isOpen, id } = useDialogContext();
    const handleClick = useCallback(
      (event) => {
        open();
        onClick?.(event);
      },
      [open, onClick]
    );
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": isOpen,
        "aria-controls": `${id}-content`,
        className,
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
DialogTrigger.displayName = "Dialog.Trigger";
function DialogPortal({ children, container }) {
  const { isOpen } = useDialogContext();
  if (!isOpen) return null;
  const target = container || (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;
  return createPortal(children, target);
}
var DialogBackdrop = forwardRef(
  ({ className, onClick, ...props }, ref) => {
    const { close, isModal } = useDialogContext();
    const handleClick = useCallback(
      (event) => {
        if (isModal && event.target === event.currentTarget) {
          close();
        }
        onClick?.(event);
      },
      [close, isModal, onClick]
    );
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className,
        "data-dialog-backdrop": "",
        "aria-hidden": "true",
        onClick: handleClick,
        ...props
      }
    );
  }
);
DialogBackdrop.displayName = "Dialog.Backdrop";
var DialogContent = forwardRef(
  ({ children, className, ...props }, ref) => {
    const { id, isModal, titleId, descriptionId } = useDialogContext();
    const contentRef = useRef(null);
    const combinedRef = ref || contentRef;
    useEffect(() => {
      const content = typeof combinedRef === "function" ? null : combinedRef?.current;
      if (!content || !isModal) return;
      const focusableElements = content.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
      firstFocusable?.focus();
      const handleKeyDown = (event) => {
        if (event.key !== "Tab") return;
        if (event.shiftKey) {
          if (document.activeElement === firstFocusable) {
            event.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            event.preventDefault();
            firstFocusable?.focus();
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [combinedRef, isModal]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref: combinedRef,
        id: `${id}-content`,
        role: "dialog",
        "aria-modal": isModal,
        "aria-labelledby": titleId,
        "aria-describedby": descriptionId,
        className,
        "data-dialog-content": "",
        ...props,
        children
      }
    );
  }
);
DialogContent.displayName = "Dialog.Content";
var DialogTitle = forwardRef(
  ({ children, className, ...props }, ref) => {
    const { titleId } = useDialogContext();
    return /* @__PURE__ */ jsx("h2", { ref, id: titleId, className, ...props, children });
  }
);
DialogTitle.displayName = "Dialog.Title";
var DialogDescription = forwardRef(
  ({ children, className, ...props }, ref) => {
    const { descriptionId } = useDialogContext();
    return /* @__PURE__ */ jsx("p", { ref, id: descriptionId, className, ...props, children });
  }
);
DialogDescription.displayName = "Dialog.Description";
var DialogClose = forwardRef(
  ({ children, className, onClick, ...props }, ref) => {
    const { close } = useDialogContext();
    const handleClick = useCallback(
      (event) => {
        close();
        onClick?.(event);
      },
      [close, onClick]
    );
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        className,
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
DialogClose.displayName = "Dialog.Close";
var Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Portal: DialogPortal,
  Backdrop: DialogBackdrop,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Close: DialogClose
};

export { Dialog, DialogProvider, useDialog, useDialogContext };
//# sourceMappingURL=chunk-2ERCNZ44.js.map
//# sourceMappingURL=chunk-2ERCNZ44.js.map