import { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { jsx } from 'react/jsx-runtime';

function useCheckbox(props = {}) {
  const {
    checked: controlledChecked,
    defaultChecked = false,
    indeterminate = false,
    disabled = false,
    required = false,
    onChange,
    name,
    value
  } = props;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== void 0;
  const isChecked = isControlled ? controlledChecked : internalChecked;
  const handleChange = useCallback(
    (event) => {
      if (disabled) return;
      const newChecked = event.target.checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked, event);
    },
    [disabled, isControlled, onChange]
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" && !disabled) {
        event.preventDefault();
        const newChecked = !isChecked;
        if (!isControlled) {
          setInternalChecked(newChecked);
        }
        onChange?.(newChecked, event);
      }
    },
    [disabled, isChecked, isControlled, onChange]
  );
  const inputProps = {
    type: "checkbox",
    name,
    value,
    checked: isChecked,
    disabled,
    required,
    "aria-checked": indeterminate ? "mixed" : isChecked,
    "aria-required": required || void 0,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
  return {
    inputProps,
    isChecked,
    isIndeterminate: indeterminate,
    isDisabled: disabled
  };
}
var Checkbox = forwardRef(
  (props, forwardedRef) => {
    const {
      size = "md",
      className,
      // Extract useCheckbox props
      checked,
      defaultChecked,
      indeterminate,
      disabled,
      required,
      onChange,
      name,
      value,
      ...rest
    } = props;
    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;
    const { inputProps, isChecked, isIndeterminate, isDisabled } = useCheckbox({
      checked,
      defaultChecked,
      indeterminate,
      disabled,
      required,
      onChange,
      name,
      value
    });
    useEffect(() => {
      if (ref.current) {
        ref.current.indeterminate = indeterminate || false;
      }
    }, [indeterminate, ref]);
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref,
        className,
        "data-size": size,
        "data-checked": isChecked || void 0,
        "data-indeterminate": isIndeterminate || void 0,
        "data-disabled": isDisabled || void 0,
        ...inputProps,
        ...rest
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox, useCheckbox };
//# sourceMappingURL=chunk-EANSH7BG.js.map
//# sourceMappingURL=chunk-EANSH7BG.js.map