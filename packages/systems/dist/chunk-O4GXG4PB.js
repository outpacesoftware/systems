import { forwardRef, useState, useCallback } from 'react';
import { jsx } from 'react/jsx-runtime';

function useButton(props = {}) {
  const {
    disabled = false,
    loading = false,
    onClick,
    type = "button"
  } = props;
  const [isPressed, setIsPressed] = useState(false);
  const isDisabled = disabled || loading;
  const handleClick = useCallback(
    (event) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    },
    [isDisabled, onClick]
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (isDisabled) return;
      if (event.key === "Enter" || event.key === " ") {
        setIsPressed(true);
      }
    },
    [isDisabled]
  );
  const handleKeyUp = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        setIsPressed(false);
      }
    },
    []
  );
  const handleMouseDown = useCallback(() => {
    if (!isDisabled) {
      setIsPressed(true);
    }
  }, [isDisabled]);
  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);
  const handleMouseLeave = useCallback(() => {
    setIsPressed(false);
  }, []);
  const buttonProps = {
    type,
    disabled: isDisabled,
    "aria-disabled": isDisabled || void 0,
    "aria-busy": loading || void 0,
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onKeyUp: handleKeyUp,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave
  };
  return {
    buttonProps,
    isDisabled,
    isLoading: loading,
    isPressed
  };
}
var Button = forwardRef(
  (props, ref) => {
    const {
      variant = "primary",
      size = "md",
      children,
      className,
      ...rest
    } = props;
    const { buttonProps, isDisabled, isLoading, isPressed } = useButton(rest);
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        className,
        "data-variant": variant,
        "data-size": size,
        "data-disabled": isDisabled || void 0,
        "data-loading": isLoading || void 0,
        "data-pressed": isPressed || void 0,
        ...buttonProps,
        children
      }
    );
  }
);
Button.displayName = "Button";

export { Button, useButton };
//# sourceMappingURL=chunk-O4GXG4PB.js.map
//# sourceMappingURL=chunk-O4GXG4PB.js.map