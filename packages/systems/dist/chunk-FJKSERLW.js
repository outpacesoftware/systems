import { createContext, forwardRef, useContext, useId, useState, useRef, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { jsx } from 'react/jsx-runtime';

function useTooltip(props = {}) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    delayDuration = 300,
    closeDelay = 0,
    onOpenChange
  } = props;
  const id = useId();
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const openTimerRef = useRef(void 0);
  const closeTimerRef = useRef(void 0);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const clearTimers = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = void 0;
    }
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = void 0;
    }
  }, []);
  const updateOpen = useCallback(
    (newOpen) => {
      clearTimers();
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange, clearTimers]
  );
  const open = useCallback(() => {
    clearTimers();
    if (delayDuration > 0) {
      openTimerRef.current = setTimeout(() => updateOpen(true), delayDuration);
    } else {
      updateOpen(true);
    }
  }, [delayDuration, updateOpen, clearTimers]);
  const close = useCallback(() => {
    clearTimers();
    if (closeDelay > 0) {
      closeTimerRef.current = setTimeout(() => updateOpen(false), closeDelay);
    } else {
      updateOpen(false);
    }
  }, [closeDelay, updateOpen, clearTimers]);
  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);
  const triggerProps = {
    onMouseEnter: open,
    onMouseLeave: close,
    onFocus: open,
    onBlur: close,
    "aria-describedby": isOpen ? `${id}-content` : void 0
  };
  const contentProps = {
    id: `${id}-content`,
    role: "tooltip"
  };
  return {
    isOpen,
    id,
    open: () => updateOpen(true),
    close: () => updateOpen(false),
    triggerProps,
    contentProps
  };
}
var TooltipContext = createContext(null);
function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within a Tooltip.Root");
  }
  return context;
}
function TooltipRoot({ children, ...props }) {
  const context = useTooltip(props);
  return /* @__PURE__ */ jsx(TooltipContext.Provider, { value: context, children });
}
var TooltipTrigger = forwardRef(
  ({ children, className, asChild, ...props }, ref) => {
    const { triggerProps } = useTooltipContext();
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className,
        "data-tooltip-trigger": "",
        ...triggerProps,
        ...props,
        children
      }
    );
  }
);
TooltipTrigger.displayName = "Tooltip.Trigger";
function TooltipPortal({ children, container }) {
  const { isOpen } = useTooltipContext();
  if (!isOpen) return null;
  const target = container || (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;
  return createPortal(children, target);
}
var TooltipContent = forwardRef(
  ({
    children,
    className,
    side = "top",
    align = "center",
    sideOffset = 4,
    ...props
  }, ref) => {
    const { contentProps, isOpen } = useTooltipContext();
    if (!isOpen) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className,
        "data-tooltip-content": "",
        "data-side": side,
        "data-align": align,
        "data-state": isOpen ? "open" : "closed",
        style: { "--tooltip-offset": `${sideOffset}px` },
        ...contentProps,
        ...props,
        children
      }
    );
  }
);
TooltipContent.displayName = "Tooltip.Content";
var TooltipArrow = forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className,
        "data-tooltip-arrow": "",
        "aria-hidden": "true",
        ...props
      }
    );
  }
);
TooltipArrow.displayName = "Tooltip.Arrow";
var Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Portal: TooltipPortal,
  Content: TooltipContent,
  Arrow: TooltipArrow
};

export { Tooltip, useTooltip };
//# sourceMappingURL=chunk-FJKSERLW.js.map
//# sourceMappingURL=chunk-FJKSERLW.js.map