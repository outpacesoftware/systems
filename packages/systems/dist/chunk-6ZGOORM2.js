import { forwardRef, useState, useCallback } from 'react';
import { jsx } from 'react/jsx-runtime';

function useInput(props = {}) {
  const {
    value: controlledValue,
    defaultValue = "",
    disabled = false,
    readOnly = false,
    required = false,
    error = false,
    onChange,
    onFocus,
    onBlur,
    type = "text",
    placeholder,
    name,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const handleChange = useCallback(
    (event) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalValue(event.target.value);
      }
      onChange?.(event);
    },
    [disabled, readOnly, isControlled, onChange]
  );
  const handleFocus = useCallback(
    (event) => {
      setIsFocused(true);
      onFocus?.(event);
    },
    [onFocus]
  );
  const handleBlur = useCallback(
    (event) => {
      setIsFocused(false);
      onBlur?.(event);
    },
    [onBlur]
  );
  const inputProps = {
    type,
    name,
    value,
    placeholder,
    disabled,
    readOnly,
    required,
    "aria-invalid": error || void 0,
    "aria-required": required || void 0,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur
  };
  return {
    inputProps,
    value,
    isFocused,
    isDisabled: disabled,
    hasError: error
  };
}
var Input = forwardRef((props, ref) => {
  const {
    size = "md",
    className,
    // Extract useInput props
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    error,
    onChange,
    onFocus,
    onBlur,
    type,
    placeholder,
    name,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props;
  const { inputProps, isFocused, hasError } = useInput({
    value,
    defaultValue,
    disabled,
    readOnly,
    required,
    error,
    onChange,
    onFocus,
    onBlur,
    type,
    placeholder,
    name,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby
  });
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      className,
      "data-size": size,
      "data-focused": isFocused || void 0,
      "data-error": hasError || void 0,
      "data-disabled": disabled || void 0,
      ...inputProps,
      ...rest
    }
  );
});
Input.displayName = "Input";

export { Input, useInput };
//# sourceMappingURL=chunk-6ZGOORM2.js.map
//# sourceMappingURL=chunk-6ZGOORM2.js.map