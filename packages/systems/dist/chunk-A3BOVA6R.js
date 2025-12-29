import { createContext, forwardRef, useCallback, useEffect, useContext, useId, useRef, useState } from 'react';
import { jsx } from 'react/jsx-runtime';

var SelectContext = createContext(null);
function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a Select.Root");
  }
  return context;
}
function SelectProvider({ children, value }) {
  return /* @__PURE__ */ jsx(SelectContext.Provider, { value, children });
}
function useSelect(props = {}) {
  const {
    value: controlledValue,
    defaultValue,
    disabled = false,
    onChange,
    onOpenChange,
    open: controlledOpen,
    defaultOpen = false
  } = props;
  const id = useId();
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [options, setOptions] = useState([]);
  const isValueControlled = controlledValue !== void 0;
  const isOpenControlled = controlledOpen !== void 0;
  const value = isValueControlled ? controlledValue : internalValue;
  const isOpen = isOpenControlled ? controlledOpen : internalOpen;
  const updateOpen = useCallback(
    (newOpen) => {
      if (disabled) return;
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      if (newOpen) {
        const currentIndex = options.findIndex((o) => o.value === value);
        setHighlightedIndex(currentIndex >= 0 ? currentIndex : 0);
      }
    },
    [disabled, isOpenControlled, onOpenChange, options, value]
  );
  const open = useCallback(() => updateOpen(true), [updateOpen]);
  const close = useCallback(() => {
    updateOpen(false);
    triggerRef.current?.focus();
  }, [updateOpen]);
  const toggle = useCallback(() => updateOpen(!isOpen), [updateOpen, isOpen]);
  const selectValue = useCallback(
    (newValue) => {
      if (disabled) return;
      const option = options.find((o) => o.value === newValue);
      if (option?.disabled) return;
      if (!isValueControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
      close();
    },
    [disabled, isValueControlled, onChange, close, options]
  );
  const registerOption = useCallback((option) => {
    setOptions((prev) => {
      const exists = prev.some((o) => o.value === option.value);
      if (exists) return prev;
      return [...prev, option];
    });
  }, []);
  return {
    value,
    isOpen,
    isDisabled: disabled,
    id,
    open,
    close,
    toggle,
    selectValue,
    highlightedIndex,
    setHighlightedIndex,
    options,
    registerOption,
    triggerRef,
    contentRef
  };
}
function SelectRoot({ children, ...props }) {
  const context = useSelect(props);
  return /* @__PURE__ */ jsx(SelectProvider, { value: context, children });
}
var SelectTrigger = forwardRef(
  ({ children, className, placeholder = "Select...", ...props }, ref) => {
    const { value, isOpen, isDisabled, id, toggle, options, setHighlightedIndex } = useSelectContext();
    const selectedOption = options.find((o) => o.value === value);
    const displayValue = selectedOption?.label || children || placeholder;
    const handleKeyDown = useCallback(
      (event) => {
        switch (event.key) {
          case "ArrowDown":
          case "ArrowUp":
            event.preventDefault();
            if (!isOpen) {
              toggle();
            }
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            toggle();
            break;
          case "Escape":
            if (isOpen) {
              event.preventDefault();
              toggle();
            }
            break;
        }
      },
      [isOpen, toggle]
    );
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        role: "combobox",
        "aria-expanded": isOpen,
        "aria-haspopup": "listbox",
        "aria-controls": `${id}-content`,
        "aria-labelledby": `${id}-label`,
        disabled: isDisabled,
        className,
        "data-open": isOpen || void 0,
        "data-disabled": isDisabled || void 0,
        "data-placeholder": !selectedOption || void 0,
        onClick: toggle,
        onKeyDown: handleKeyDown,
        ...props,
        children: displayValue
      }
    );
  }
);
SelectTrigger.displayName = "Select.Trigger";
var SelectContent = forwardRef(
  ({ children, className, ...props }, ref) => {
    const { isOpen, id, close, highlightedIndex, setHighlightedIndex, options, selectValue } = useSelectContext();
    const handleKeyDown = useCallback(
      (event) => {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            setHighlightedIndex(
              Math.min(highlightedIndex + 1, options.length - 1)
            );
            break;
          case "ArrowUp":
            event.preventDefault();
            setHighlightedIndex(Math.max(highlightedIndex - 1, 0));
            break;
          case "Enter":
          case " ":
            event.preventDefault();
            if (highlightedIndex >= 0 && options[highlightedIndex]) {
              selectValue(options[highlightedIndex].value);
            }
            break;
          case "Escape":
            event.preventDefault();
            close();
            break;
        }
      },
      [highlightedIndex, setHighlightedIndex, options, selectValue, close]
    );
    useEffect(() => {
      if (!isOpen) return;
      const handleClickOutside = (event) => {
        const target = event.target;
        const content = document.getElementById(`${id}-content`);
        const trigger = document.querySelector(`[aria-controls="${id}-content"]`);
        if (content && !content.contains(target) && trigger && !trigger.contains(target)) {
          close();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, id, close]);
    if (!isOpen) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        id: `${id}-content`,
        role: "listbox",
        className,
        "data-open": isOpen || void 0,
        onKeyDown: handleKeyDown,
        tabIndex: -1,
        ...props,
        children
      }
    );
  }
);
SelectContent.displayName = "Select.Content";
var SelectOption = forwardRef(
  ({ value, children, disabled = false, className, ...props }, ref) => {
    const {
      value: selectedValue,
      selectValue,
      highlightedIndex,
      setHighlightedIndex,
      options,
      registerOption
    } = useSelectContext();
    const isSelected = value === selectedValue;
    const optionIndex = options.findIndex((o) => o.value === value);
    const isHighlighted = optionIndex === highlightedIndex;
    useEffect(() => {
      registerOption({ value, label: String(children), disabled });
    }, [value, children, disabled, registerOption]);
    const handleClick = useCallback(() => {
      if (!disabled) {
        selectValue(value);
      }
    }, [disabled, selectValue, value]);
    const handleMouseEnter = useCallback(() => {
      if (!disabled) {
        setHighlightedIndex(optionIndex);
      }
    }, [disabled, setHighlightedIndex, optionIndex]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "option",
        "aria-selected": isSelected,
        "aria-disabled": disabled || void 0,
        className,
        "data-selected": isSelected || void 0,
        "data-highlighted": isHighlighted || void 0,
        "data-disabled": disabled || void 0,
        onClick: handleClick,
        onMouseEnter: handleMouseEnter,
        ...props,
        children
      }
    );
  }
);
SelectOption.displayName = "Select.Option";
var Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Option: SelectOption
};

export { Select, SelectProvider, useSelect, useSelectContext };
//# sourceMappingURL=chunk-A3BOVA6R.js.map
//# sourceMappingURL=chunk-A3BOVA6R.js.map