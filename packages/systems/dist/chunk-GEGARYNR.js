import { forwardRef, useState, useCallback } from 'react';
import { jsx } from 'react/jsx-runtime';

function useSwitch(props = {}) {
  const {
    checked: controlledChecked,
    defaultChecked = false,
    disabled = false,
    required = false,
    onChange,
    name,
    value
  } = props;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== void 0;
  const isChecked = isControlled ? controlledChecked : internalChecked;
  const toggle = useCallback(() => {
    if (disabled) return;
    const newChecked = !isChecked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  }, [disabled, isChecked, isControlled, onChange]);
  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    },
    [disabled, toggle]
  );
  const switchProps = {
    type: "button",
    role: "switch",
    "aria-checked": isChecked,
    "aria-required": required || void 0,
    disabled,
    onClick: toggle,
    onKeyDown: handleKeyDown,
    // Hidden input for form submission
    ...name && { "data-name": name },
    ...value && { "data-value": value }
  };
  return {
    switchProps,
    isChecked,
    isDisabled: disabled
  };
}
var Switch = forwardRef(
  (props, ref) => {
    const {
      size = "md",
      className,
      children,
      // Extract useSwitch props
      checked,
      defaultChecked,
      disabled,
      required,
      onChange,
      name,
      value,
      ...rest
    } = props;
    const { switchProps, isChecked, isDisabled } = useSwitch({
      checked,
      defaultChecked,
      disabled,
      required,
      onChange,
      name,
      value
    });
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className,
        "data-size": size,
        "data-checked": isChecked || void 0,
        "data-disabled": isDisabled || void 0,
        ...switchProps,
        ...rest,
        children
      }
    );
  }
);
Switch.displayName = "Switch";

export { Switch, useSwitch };
//# sourceMappingURL=chunk-GEGARYNR.js.map
//# sourceMappingURL=chunk-GEGARYNR.js.map