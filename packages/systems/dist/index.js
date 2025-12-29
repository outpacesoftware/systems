import { useButton, Button } from './chunk-O4GXG4PB.js';
import { useInput, Input } from './chunk-6ZGOORM2.js';
import { useCheckbox, Checkbox } from './chunk-EANSH7BG.js';
import { useSwitch, Switch } from './chunk-GEGARYNR.js';
import { useSelectContext, useSelect, SelectProvider, Select } from './chunk-A3BOVA6R.js';
import { useDialogContext, useDialog, DialogProvider, Dialog } from './chunk-2ERCNZ44.js';
import { useTooltip, Tooltip } from './chunk-FJKSERLW.js';
import { __export } from './chunk-DCHYNTHI.js';
import { forwardRef, useState, useId, createContext, useRef, useCallback, useEffect, useContext } from 'react';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { createPortal } from 'react-dom';

var LoadingSpinner = () => /* @__PURE__ */ jsxs(
  "svg",
  {
    className: "animate-spin size-3.5",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "none",
    viewBox: "0 0 24 24",
    children: [
      /* @__PURE__ */ jsx(
        "circle",
        {
          className: "opacity-25",
          cx: "12",
          cy: "12",
          r: "10",
          stroke: "currentColor",
          strokeWidth: "4"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          className: "opacity-75",
          fill: "currentColor",
          d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        }
      )
    ]
  }
);
var baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[0.12px] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
var sizeStyles = {
  sm: "px-3 py-1.5 text-[12px] leading-[15px]",
  md: "px-4 py-2.5 text-[13px] leading-4",
  lg: "px-5 py-3 text-[15px] leading-5"
};
var variantStyles = {
  primary: "bg-[#FF4502] text-white hover:bg-[#E63D00] before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
  secondary: "bg-white/8 text-white/88 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8 hover:bg-white/12 hover:before:ring-white/12",
  ghost: "bg-transparent text-white/72 hover:bg-white/8 hover:text-white/88",
  danger: "bg-red-600 text-white hover:bg-red-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
  "danger-outline": "bg-red-500/20 text-red-400 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-red-500/30 hover:bg-red-500/30",
  success: "bg-green-600 text-white hover:bg-green-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8",
  warning: "bg-amber-600 text-white hover:bg-amber-500 before:absolute before:inset-0 before:rounded-lg before:pointer-events-none before:ring-1 before:ring-inset before:ring-white/8"
};
var Button2 = forwardRef(
  ({
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    loading,
    children,
    className = "",
    disabled,
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`,
        disabled: disabled || loading,
        ...props,
        children: [
          loading ? /* @__PURE__ */ jsx(LoadingSpinner, {}) : leftIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&>svg]:size-4", children: leftIcon }),
          /* @__PURE__ */ jsx("span", { className: "relative z-10", children }),
          !loading && rightIcon && /* @__PURE__ */ jsx("span", { className: "shrink-0 [&>svg]:size-4", children: rightIcon })
        ]
      }
    );
  }
);
Button2.displayName = "Button";
var sizeStyles2 = {
  sm: "px-2.5 py-1 text-[10px] leading-[13px]",
  md: "px-3 py-1.5 text-[12px] leading-[15px]",
  lg: "px-4 py-2.5 text-[13px] leading-4"
};
var baseStyles2 = "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[0.12px] transition-all cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24 focus-visible:ring-offset-2 focus-visible:ring-offset-black";
var Toggle = forwardRef(
  ({
    pressed: controlledPressed,
    defaultPressed = false,
    onChange,
    size = "md",
    variant = "default",
    children,
    className = "",
    disabled,
    ...props
  }, ref) => {
    const [internalPressed, setInternalPressed] = useState(defaultPressed);
    const isControlled = controlledPressed !== void 0;
    const pressed = isControlled ? controlledPressed : internalPressed;
    const handleClick = () => {
      const newPressed = !pressed;
      if (!isControlled) {
        setInternalPressed(newPressed);
      }
      onChange?.(newPressed);
    };
    const variantStyles5 = {
      default: pressed ? "bg-[#FF4502] text-white before:ring-[#FF4502]/24" : "bg-white/4 text-white/72 hover:bg-white/8 hover:text-white/88",
      outline: pressed ? "bg-white/8 text-white/88 before:ring-white/12" : "bg-transparent text-white/72 hover:bg-white/4 hover:text-white/88 before:ring-white/8"
    }[variant];
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        type: "button",
        role: "switch",
        "aria-pressed": pressed,
        "data-state": pressed ? "on" : "off",
        disabled,
        onClick: handleClick,
        className: `
          ${baseStyles2}
          ${sizeStyles2[size]}
          relative
          before:absolute before:inset-0 before:rounded-lg before:pointer-events-none
          before:ring-1 before:ring-inset
          ${variantStyles5}
          ${className}
        `,
        ...props,
        children: /* @__PURE__ */ jsx("span", { className: "relative z-10", children })
      }
    );
  }
);
Toggle.displayName = "Toggle";
var containerStyles = `
  relative flex items-center w-full
  px-3 py-2.5 rounded-[9px]
  bg-white/2 cursor-text
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;
var inputStyles = "relative z-10 flex-1 bg-transparent text-[13px] leading-4 tracking-[0.12px] text-white/88 placeholder:text-white/32 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50";
var labelStyles = "text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]";
var errorStyles = "text-[10px] leading-[13px] text-red-400 tracking-[0.12px]";
var descriptionStyles = "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]";
var Input2 = forwardRef(
  ({
    label,
    error,
    description,
    leftAddon,
    rightAddon,
    value,
    onChange,
    className = "",
    required,
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const inputElement = /* @__PURE__ */ jsxs(
      "div",
      {
        className: `
          ${containerStyles}
          ${error ? "before:ring-red-500/50" : "before:ring-white/8"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${!label ? className : ""}
        `,
        children: [
          leftAddon && /* @__PURE__ */ jsx("span", { className: "relative z-10 shrink-0 mr-2 text-white/48 [&>svg]:size-4", children: leftAddon }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref,
              id,
              value,
              onChange: (e) => onChange?.(e.target.value),
              required,
              disabled,
              "aria-invalid": !!error,
              "aria-describedby": error ? errorId : description ? descriptionId : void 0,
              className: inputStyles,
              ...props
            }
          ),
          rightAddon && /* @__PURE__ */ jsx("span", { className: "relative z-10 shrink-0 ml-2 text-white/48 [&>svg]:size-4", children: rightAddon })
        ]
      }
    );
    if (label || error || description) {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
        label && /* @__PURE__ */ jsxs("label", { htmlFor: id, className: labelStyles, children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: "text-[#FF4502] ml-0.5", children: "*" })
        ] }),
        inputElement,
        description && !error && /* @__PURE__ */ jsx("p", { id: descriptionId, className: descriptionStyles, children: description }),
        error && /* @__PURE__ */ jsx("p", { id: errorId, role: "alert", className: errorStyles, children: error })
      ] });
    }
    return inputElement;
  }
);
Input2.displayName = "Input";
var containerStyles2 = `
  relative flex w-full
  px-3 py-2.5 rounded-[9px]
  bg-white/2
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;
var textareaStyles = "relative z-10 w-full min-h-[100px] resize-y bg-transparent text-[13px] leading-4 tracking-[0.12px] text-white/88 placeholder:text-white/32 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50";
var labelStyles2 = "text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]";
var errorStyles2 = "text-[10px] leading-[13px] text-red-400 tracking-[0.12px]";
var descriptionStyles2 = "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]";
var Textarea = forwardRef(
  ({
    label,
    error,
    description,
    value,
    onChange,
    className = "",
    required,
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const textareaElement = /* @__PURE__ */ jsx(
      "div",
      {
        className: `
          ${containerStyles2}
          ${error ? "before:ring-red-500/50" : "before:ring-white/8"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${!label ? className : ""}
        `,
        children: /* @__PURE__ */ jsx(
          "textarea",
          {
            ref,
            id,
            value,
            onChange: (e) => onChange?.(e.target.value),
            required,
            disabled,
            "aria-invalid": !!error,
            "aria-describedby": error ? errorId : description ? descriptionId : void 0,
            className: textareaStyles,
            ...props
          }
        )
      }
    );
    if (label || error || description) {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
        label && /* @__PURE__ */ jsxs("label", { htmlFor: id, className: labelStyles2, children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: "text-[#FF4502] ml-0.5", children: "*" })
        ] }),
        textareaElement,
        description && !error && /* @__PURE__ */ jsx("p", { id: descriptionId, className: descriptionStyles2, children: description }),
        error && /* @__PURE__ */ jsx("p", { id: errorId, role: "alert", className: errorStyles2, children: error })
      ] });
    }
    return textareaElement;
  }
);
Textarea.displayName = "Textarea";
var containerStyles3 = `
  relative flex items-center
  rounded-[9px] bg-white/2 cursor-pointer
  transition-all
  before:absolute before:inset-0 before:rounded-[9px] before:pointer-events-none
  before:ring-1 before:ring-inset
  focus-within:before:ring-white/24
  hover:before:ring-white/12
`;
var selectStyles = "relative z-10 w-full appearance-none bg-transparent px-3 py-2.5 pr-8 text-[13px] leading-4 tracking-[0.12px] text-white/88 outline-none focus:outline-none focus-visible:outline-none focus:ring-0 disabled:opacity-50";
var labelStyles3 = "text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]";
var errorStyles3 = "text-[10px] leading-[13px] text-red-400 tracking-[0.12px]";
var descriptionStyles3 = "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]";
var Select2 = forwardRef(
  ({
    label,
    error,
    description,
    value,
    onChange,
    children,
    className = "",
    required,
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const descriptionId = `${id}-description`;
    const errorId = `${id}-error`;
    const selectElement = /* @__PURE__ */ jsxs(
      "div",
      {
        className: `
          ${containerStyles3}
          ${error ? "before:ring-red-500/50" : "before:ring-white/8"}
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${!label ? className : ""}
        `,
        children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              ref,
              id,
              value,
              onChange: (e) => onChange?.(e.target.value),
              required,
              disabled,
              "aria-invalid": !!error,
              "aria-describedby": error ? errorId : description ? descriptionId : void 0,
              className: selectStyles,
              ...props,
              children
            }
          ),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "pointer-events-none absolute right-3 z-10 size-4 text-white/48",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              strokeWidth: 2,
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    );
    if (label || error || description) {
      return /* @__PURE__ */ jsxs("div", { className: `flex flex-col gap-1.5 ${className}`, children: [
        label && /* @__PURE__ */ jsxs("label", { htmlFor: id, className: labelStyles3, children: [
          label,
          required && /* @__PURE__ */ jsx("span", { className: "text-[#FF4502] ml-0.5", children: "*" })
        ] }),
        selectElement,
        description && !error && /* @__PURE__ */ jsx("p", { id: descriptionId, className: descriptionStyles3, children: description }),
        error && /* @__PURE__ */ jsx("p", { id: errorId, role: "alert", className: errorStyles3, children: error })
      ] });
    }
    return selectElement;
  }
);
Select2.displayName = "Select";
var Checkbox2 = forwardRef(
  ({
    label,
    description,
    checked,
    onChange,
    className = "",
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    return /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: id,
        className: `
          inline-flex items-start gap-2.5 cursor-pointer
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${className}
        `,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0 mt-0.5", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: "checkbox",
                id,
                checked,
                onChange: (e) => onChange?.(e.target.checked),
                disabled,
                className: "peer sr-only",
                ...props
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
              size-[18px]
              rounded-[5px] border border-white/20 bg-white/4
              transition-all
              peer-checked:bg-[#FF4502] peer-checked:border-[#FF4502]
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black
              peer-hover:border-white/32
              peer-checked:peer-hover:bg-[#E63D00] peer-checked:peer-hover:border-[#E63D00]
              flex items-center justify-center
            `,
                children: /* @__PURE__ */ jsx(
                  "svg",
                  {
                    className: "size-3 text-white transition-opacity",
                    style: { opacity: checked ? 1 : 0 },
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    strokeWidth: 3,
                    children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" })
                  }
                )
              }
            )
          ] }),
          (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
            label && /* @__PURE__ */ jsx("span", { className: "text-[13px] leading-4 text-white/88 tracking-[0.12px]", children: label }),
            description && /* @__PURE__ */ jsx("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]", children: description })
          ] })
        ]
      }
    );
  }
);
Checkbox2.displayName = "Checkbox";
var Switch2 = forwardRef(
  ({
    label,
    description,
    checked,
    onChange,
    className = "",
    disabled,
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    return /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: id,
        className: `
          inline-flex items-start gap-2.5 cursor-pointer
          ${disabled ? "opacity-50 pointer-events-none" : ""}
          ${className}
        `,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0 mt-0.5", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: "checkbox",
                role: "switch",
                id,
                checked,
                onChange: (e) => onChange?.(e.target.checked),
                disabled,
                className: "peer sr-only",
                ...props
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
              w-9 h-[22px]
              rounded-full bg-white/8
              ring-1 ring-inset ring-white/8
              transition-all
              peer-checked:bg-[#FF4502] peer-checked:ring-[#FF4502]/24
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24
              peer-hover:bg-white/12
              peer-checked:peer-hover:bg-[#E63D00]
            `
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
              absolute top-[2px] left-[2px]
              size-[18px]
              rounded-full bg-white shadow-sm
              transition-transform
              ${checked ? "translate-x-[14px]" : "translate-x-0"}
            `
              }
            )
          ] }),
          (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
            label && /* @__PURE__ */ jsx("span", { className: "text-[13px] leading-4 text-white/88 tracking-[0.12px]", children: label }),
            description && /* @__PURE__ */ jsx("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]", children: description })
          ] })
        ]
      }
    );
  }
);
Switch2.displayName = "Switch";
var RadioGroupContext = createContext(null);
function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error("RadioGroup.Item must be used within RadioGroup");
  }
  return context;
}
var RadioGroupRoot = forwardRef(
  ({
    value: controlledValue,
    defaultValue = "",
    onChange,
    label,
    description,
    disabled = false,
    children,
    className = ""
  }, ref) => {
    const name = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleChange = (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };
    return /* @__PURE__ */ jsx(RadioGroupContext.Provider, { value: { value, onChange: handleChange, disabled, name }, children: /* @__PURE__ */ jsxs("div", { ref, role: "radiogroup", className: `flex flex-col gap-3 ${className}`, children: [
      (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
        label && /* @__PURE__ */ jsx("span", { className: "text-[13px] leading-4 font-medium text-white/88 tracking-[0.12px]", children: label }),
        description && /* @__PURE__ */ jsx("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]", children: description })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children })
    ] }) });
  }
);
RadioGroupRoot.displayName = "RadioGroup";
var RadioGroupItem = forwardRef(
  ({
    value,
    label,
    description,
    disabled: itemDisabled,
    className = "",
    id: providedId,
    ...props
  }, ref) => {
    const context = useRadioGroupContext();
    const generatedId = useId();
    const id = providedId || generatedId;
    const isDisabled = itemDisabled || context.disabled;
    const isChecked = context.value === value;
    return /* @__PURE__ */ jsxs(
      "label",
      {
        htmlFor: id,
        className: `
          inline-flex items-start gap-2.5 cursor-pointer
          ${isDisabled ? "opacity-50 pointer-events-none" : ""}
          ${className}
        `,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative flex-shrink-0 mt-0.5", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                ref,
                type: "radio",
                id,
                name: context.name,
                value,
                checked: isChecked,
                onChange: () => context.onChange(value),
                disabled: isDisabled,
                className: "peer sr-only",
                ...props
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
              size-[18px]
              rounded-full border border-white/20 bg-white/4
              transition-all
              peer-checked:border-[#FF4502] peer-checked:bg-[#FF4502]
              peer-focus-visible:ring-2 peer-focus-visible:ring-white/24 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-black
              peer-hover:border-white/32
              peer-checked:peer-hover:bg-[#E63D00] peer-checked:peer-hover:border-[#E63D00]
              flex items-center justify-center
            `,
                children: /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `
                size-2
                rounded-full bg-white
                transition-all
                ${isChecked ? "scale-100 opacity-100" : "scale-0 opacity-0"}
              `
                  }
                )
              }
            )
          ] }),
          (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
            label && /* @__PURE__ */ jsx("span", { className: "text-[13px] leading-4 text-white/88 tracking-[0.12px]", children: label }),
            description && /* @__PURE__ */ jsx("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px]", children: description })
          ] })
        ]
      }
    );
  }
);
RadioGroupItem.displayName = "RadioGroup.Item";
var RadioGroup = Object.assign(RadioGroupRoot, {
  Item: RadioGroupItem
});
var sizeStyles3 = {
  sm: {
    track: "h-1",
    thumb: "size-3.5"
  },
  md: {
    track: "h-1.5",
    thumb: "size-4"
  }
};
var Slider = forwardRef(
  ({
    value: controlledValue,
    defaultValue = 0,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    label,
    showValue = false,
    size = "md",
    className = "",
    id: providedId,
    ...props
  }, ref) => {
    const generatedId = useId();
    const id = providedId || generatedId;
    const sizes = sizeStyles3[size];
    const trackRef = useRef(null);
    const isDragging = useRef(false);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const percentage = (value - min) / (max - min) * 100;
    const updateValue = useCallback(
      (clientX) => {
        if (!trackRef.current || disabled) return;
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const rawValue = min + percent * (max - min);
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.max(min, Math.min(max, steppedValue));
        if (!isControlled) {
          setInternalValue(clampedValue);
        }
        onChange?.(clampedValue);
      },
      [disabled, min, max, step, isControlled, onChange]
    );
    const handleMouseDown = useCallback(
      (event) => {
        if (disabled) return;
        isDragging.current = true;
        updateValue(event.clientX);
      },
      [disabled, updateValue]
    );
    useEffect(() => {
      const handleMouseMove = (event) => {
        if (isDragging.current) {
          updateValue(event.clientX);
        }
      };
      const handleMouseUp = () => {
        isDragging.current = false;
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [updateValue]);
    const handleKeyDown = useCallback(
      (event) => {
        if (disabled) return;
        let newValue = value;
        switch (event.key) {
          case "ArrowRight":
          case "ArrowUp":
            newValue = Math.min(max, value + step);
            break;
          case "ArrowLeft":
          case "ArrowDown":
            newValue = Math.max(min, value - step);
            break;
          case "Home":
            newValue = min;
            break;
          case "End":
            newValue = max;
            break;
          default:
            return;
        }
        event.preventDefault();
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [disabled, value, min, max, step, isControlled, onChange]
    );
    return /* @__PURE__ */ jsxs("div", { ref, className: `flex flex-col gap-2 ${className}`, ...props, children: [
      (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        label && /* @__PURE__ */ jsx("label", { htmlFor: id, className: "text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]", children: label }),
        showValue && /* @__PURE__ */ jsx("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px] tabular-nums", children: value })
      ] }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          ref: trackRef,
          role: "slider",
          id,
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": value,
          "aria-disabled": disabled,
          tabIndex: disabled ? -1 : 0,
          onMouseDown: handleMouseDown,
          onKeyDown: handleKeyDown,
          className: `
            group relative w-full cursor-pointer
            focus-visible:outline-none
            ${disabled ? "opacity-50 pointer-events-none" : ""}
          `,
          children: [
            /* @__PURE__ */ jsx("div", { className: `relative w-full ${sizes.track} bg-white/8 rounded-full overflow-hidden`, children: /* @__PURE__ */ jsx(
              "div",
              {
                className: "absolute inset-y-0 left-0 bg-[#FF4502] rounded-full",
                style: { width: `${percentage}%` }
              }
            ) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: `
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              ${sizes.thumb}
              rounded-full bg-white
              shadow-md
              ring-2 ring-white/8
              transition-all
              group-hover:ring-white/24
              group-focus-visible:ring-white/24
            `,
                style: { left: `${percentage}%` }
              }
            )
          ]
        }
      )
    ] });
  }
);
Slider.displayName = "Slider";
var TabsContext = createContext(null);
function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs");
  }
  return context;
}
var sizeStyles4 = {
  sm: {
    trigger: "px-3 py-1.5 text-[12px] leading-[15px]"
  },
  md: {
    trigger: "px-4 py-2 text-[13px] leading-4"
  }
};
var TabsRoot = forwardRef(
  ({
    value: controlledValue,
    defaultValue = "",
    onChange,
    size = "md",
    children,
    className = "",
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const isControlled = controlledValue !== void 0;
    const value = isControlled ? controlledValue : internalValue;
    const handleChange = useCallback(
      (newValue) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );
    return /* @__PURE__ */ jsx(TabsContext.Provider, { value: { value, onChange: handleChange, size }, children: /* @__PURE__ */ jsx("div", { ref, className: `flex flex-col ${className}`, ...props, children }) });
  }
);
TabsRoot.displayName = "Tabs";
var TabsList = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "tablist",
        className: `
          relative inline-flex items-center gap-1 p-1
          bg-white/4 rounded-lg
          before:absolute before:inset-0 before:rounded-lg before:pointer-events-none
          before:ring-1 before:ring-inset before:ring-white/8
          ${className}
        `,
        ...props,
        children
      }
    );
  }
);
TabsList.displayName = "Tabs.List";
var TabsTrigger = forwardRef(
  ({ value, children, className = "", ...props }, ref) => {
    const context = useTabsContext();
    const isActive = context.value === value;
    const sizes = sizeStyles4[context.size];
    return /* @__PURE__ */ jsx(
      "button",
      {
        ref,
        role: "tab",
        type: "button",
        "aria-selected": isActive,
        "data-state": isActive ? "active" : "inactive",
        onClick: () => context.onChange(value),
        className: `
          relative ${sizes.trigger}
          font-medium tracking-[0.12px] rounded-md
          transition-all cursor-pointer
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/24
          ${isActive ? "bg-white/8 text-white/88 before:absolute before:inset-0 before:rounded-md before:ring-1 before:ring-inset before:ring-white/8 before:pointer-events-none" : "text-white/48 hover:text-white/72 hover:bg-white/4"}
          ${className}
        `,
        ...props,
        children: /* @__PURE__ */ jsx("span", { className: "relative z-10", children })
      }
    );
  }
);
TabsTrigger.displayName = "Tabs.Trigger";
var TabsContent = forwardRef(
  ({ value, children, className = "", ...props }, ref) => {
    const context = useTabsContext();
    const isActive = context.value === value;
    if (!isActive) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "tabpanel",
        "data-state": isActive ? "active" : "inactive",
        className: `pt-4 ${className}`,
        ...props,
        children
      }
    );
  }
);
TabsContent.displayName = "Tabs.Content";
var Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent
});
var DialogContext = createContext(null);
function useDialogContext2() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within Dialog.Root");
  }
  return context;
}
function Root(props) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = useId();
  const descriptionId = useId();
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(DialogContext.Provider, { value: { open, onOpenChange: handleOpenChange, titleId, descriptionId }, children });
}
Root.displayName = "Dialog.Root";
var Trigger = forwardRef((props, ref) => {
  const { children, onClick, className = "", ...rest } = props;
  const context = useDialogContext2();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(true);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Trigger.displayName = "Dialog.Trigger";
function Portal(props) {
  const { container, children } = props;
  const context = useDialogContext2();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !context.open) return null;
  return createPortal(children, container || document.body);
}
Portal.displayName = "Dialog.Portal";
var Overlay = forwardRef((props, ref) => {
  const { className = "", onClick, ...rest } = props;
  const context = useDialogContext2();
  const handleClick = useCallback(() => {
    context.onOpenChange(false);
  }, [context]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      onClick: handleClick,
      className: `
        fixed inset-0 z-50 bg-black/80
        animate-in fade-in-0 duration-200
        ${className}
      `,
      ...rest
    }
  );
});
Overlay.displayName = "Dialog.Overlay";
var Content = forwardRef((props, ref) => {
  const { children, className = "", onEscapeKeyDown, ...rest } = props;
  const context = useDialogContext2();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented) {
          context.onOpenChange(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [context, onEscapeKeyDown]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-start justify-center pt-16 pointer-events-none", children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": context.titleId,
      "aria-describedby": context.descriptionId,
      onClick: (e) => e.stopPropagation(),
      className: `
          pointer-events-auto
          w-full max-w-md
          flex flex-col gap-5 p-6 rounded-[14px]
          bg-black relative
          border border-white/8
          before:absolute before:inset-0 before:rounded-[14px] before:bg-white/8 before:pointer-events-none
          shadow-2xl
          animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200
          ${className}
        `,
      ...rest,
      children
    }
  ) });
});
Content.displayName = "Dialog.Content";
var Close = forwardRef((props, ref) => {
  const { children, onClick, className = "", ...rest } = props;
  const context = useDialogContext2();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      onClick: handleClick,
      className: `
        absolute top-4 right-4 z-10
        p-1.5 rounded-md
        text-white/48 hover:text-white/88
        hover:bg-white/8
        transition-colors
        ${className}
      `,
      "aria-label": "Close dialog",
      ...rest,
      children: children || /* @__PURE__ */ jsx("svg", { className: "size-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
    }
  );
});
Close.displayName = "Dialog.Close";
var Title = forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;
  const context = useDialogContext2();
  return /* @__PURE__ */ jsx(
    "h2",
    {
      ref,
      id: context.titleId,
      className: `text-[15px] leading-5 font-semibold text-white/88 tracking-[0.12px] ${className}`,
      ...rest,
      children
    }
  );
});
Title.displayName = "Dialog.Title";
var Description = forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;
  const context = useDialogContext2();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: context.descriptionId,
      className: `text-[13px] leading-4 text-white/48 tracking-[0.12px] ${className}`,
      ...rest,
      children
    }
  );
});
Description.displayName = "Dialog.Description";
var Footer = forwardRef((props, ref) => {
  const { children, className = "", ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: `flex items-center justify-end gap-2 pt-2 ${className}`,
      ...rest,
      children
    }
  );
});
Footer.displayName = "Dialog.Footer";
var Dialog2 = {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
  Title,
  Description,
  Footer
};
var Tooltip2 = forwardRef(
  ({
    content,
    children,
    side = "top",
    delayDuration = 400,
    disabled = false
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef(null);
    const timeoutRef = useRef(void 0);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
      setMounted(true);
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);
    const updatePosition = useCallback(() => {
      if (!triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      const offset = 8;
      let top = 0;
      let left = 0;
      switch (side) {
        case "top":
          top = rect.top - offset;
          left = rect.left + rect.width / 2;
          break;
        case "bottom":
          top = rect.bottom + offset;
          left = rect.left + rect.width / 2;
          break;
        case "left":
          top = rect.top + rect.height / 2;
          left = rect.left - offset;
          break;
        case "right":
          top = rect.top + rect.height / 2;
          left = rect.right + offset;
          break;
      }
      setPosition({ top, left });
    }, [side]);
    const handleMouseEnter = useCallback(() => {
      if (disabled) return;
      timeoutRef.current = setTimeout(() => {
        updatePosition();
        setIsOpen(true);
      }, delayDuration);
    }, [disabled, delayDuration, updatePosition]);
    const handleMouseLeave = useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsOpen(false);
    }, []);
    const transformOrigin = {
      top: "bottom center",
      bottom: "top center",
      left: "center right",
      right: "center left"
    }[side];
    const transform = {
      top: "translateX(-50%) translateY(-100%)",
      bottom: "translateX(-50%)",
      left: "translateY(-50%) translateX(-100%)",
      right: "translateY(-50%)"
    }[side];
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: triggerRef,
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave,
          onFocus: handleMouseEnter,
          onBlur: handleMouseLeave,
          className: "inline-block",
          children
        }
      ),
      mounted && isOpen && createPortal(
        /* @__PURE__ */ jsx(
          "div",
          {
            ref,
            role: "tooltip",
            style: {
              position: "fixed",
              top: position.top,
              left: position.left,
              transform,
              transformOrigin
            },
            className: "\n              z-50 px-3 py-1.5\n              bg-white text-black/88\n              text-[12px] leading-[15px] font-medium tracking-[0.12px]\n              rounded-lg shadow-xl\n              animate-in fade-in-0 zoom-in-95 duration-150\n            ",
            children: content
          }
        ),
        document.body
      )
    ] });
  }
);
Tooltip2.displayName = "Tooltip";
var sizeStyles5 = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2"
};
var variantStyles2 = {
  default: "bg-white",
  accent: "bg-[#FF4502]"
};
var Progress = forwardRef(
  ({
    value = 0,
    max = 100,
    size = "md",
    variant = "default",
    indeterminate = false,
    label,
    showValue = false,
    className = "",
    ...props
  }, ref) => {
    const percentage = Math.min(100, Math.max(0, value / max * 100));
    return /* @__PURE__ */ jsxs("div", { ref, className: `flex flex-col gap-2 ${className}`, ...props, children: [
      (label || showValue) && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        label && /* @__PURE__ */ jsx("span", { className: "text-[12px] leading-[15px] font-medium text-white/72 tracking-[0.12px]", children: label }),
        showValue && !indeterminate && /* @__PURE__ */ jsxs("span", { className: "text-[10px] leading-[13px] text-white/48 tracking-[0.12px] tabular-nums", children: [
          Math.round(percentage),
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          role: "progressbar",
          "aria-valuenow": indeterminate ? void 0 : value,
          "aria-valuemin": 0,
          "aria-valuemax": max,
          className: `
            relative w-full overflow-hidden rounded-full
            bg-white/8 ring-1 ring-inset ring-white/8 ${sizeStyles5[size]}
          `,
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `
              h-full rounded-full transition-all duration-300 ease-out
              ${variantStyles2[variant]}
              ${indeterminate ? "animate-progress-indeterminate" : ""}
            `,
              style: indeterminate ? void 0 : { width: `${percentage}%` }
            }
          )
        }
      )
    ] });
  }
);
Progress.displayName = "Progress";
var ToastContext = createContext(null);
function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
var iconStyles = {
  default: null,
  success: /* @__PURE__ */ jsx("svg", { className: "size-5 text-green-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }),
  error: /* @__PURE__ */ jsx("svg", { className: "size-5 text-red-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) }),
  warning: /* @__PURE__ */ jsx("svg", { className: "size-5 text-amber-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" }) })
};
var ToastItem = forwardRef(
  ({ id, title, description, variant = "default", duration = 5e3, action, onClose, onRemove }, ref) => {
    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          onRemove();
          onClose?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onRemove, onClose]);
    const handleClose = () => {
      onRemove();
      onClose?.();
    };
    const icon = iconStyles[variant];
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "alert",
        className: `
          relative w-full max-w-sm overflow-hidden
          bg-black p-4 rounded-xl
          border border-white/8
          before:absolute before:inset-0 before:rounded-xl before:bg-white/4 before:pointer-events-none
          shadow-lg
          animate-in slide-in-from-right-full fade-in-0 duration-200
        `,
        children: /* @__PURE__ */ jsxs("div", { className: "relative z-10 flex gap-3", children: [
          icon && /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 mt-0.5", children: icon }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-4 font-medium text-white/88 tracking-[0.12px]", children: title }),
            description && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[10px] leading-[13px] text-white/48 tracking-[0.12px]", children: description }),
            action && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: action.onClick,
                className: "mt-2 text-[12px] leading-[15px] font-medium text-[#FF4502] hover:text-[#E63D00] transition-colors",
                children: action.label
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: handleClose,
              className: "flex-shrink-0 p-1 -m-1 text-white/48 hover:text-white/88 transition-colors",
              "aria-label": "Close",
              children: /* @__PURE__ */ jsx("svg", { className: "size-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) })
            }
          )
        ] })
      }
    );
  }
);
ToastItem.displayName = "ToastItem";
function ToastProvider({ children, position = "bottom-right" }) {
  const [toasts, setToasts] = useState([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const toast = useCallback((props) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...props, id }]);
  }, []);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  const positionStyles = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4"
  }[position];
  return /* @__PURE__ */ jsxs(ToastContext.Provider, { value: { toast }, children: [
    children,
    mounted && createPortal(
      /* @__PURE__ */ jsx("div", { className: `fixed ${positionStyles} z-50 flex flex-col gap-2`, children: toasts.map((t) => /* @__PURE__ */ jsx(ToastItem, { ...t, onRemove: () => removeToast(t.id) }, t.id)) }),
      document.body
    )
  ] });
}
var Toast = {
  Provider: ToastProvider,
  useToast
};
var orientationStyles = {
  horizontal: "w-full h-px",
  vertical: "h-full w-px"
};
var variantStyles3 = {
  default: "bg-white/8",
  muted: "bg-white/4"
};
var Separator = forwardRef(
  ({
    orientation = "horizontal",
    variant = "default",
    className = "",
    ...props
  }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        role: "separator",
        "aria-orientation": orientation,
        className: `
          shrink-0
          ${orientationStyles[orientation]}
          ${variantStyles3[variant]}
          ${className}
        `,
        ...props
      }
    );
  }
);
Separator.displayName = "Separator";
var paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-6"
};
var CardRoot = forwardRef(
  ({ padding = "none", children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `
          relative overflow-hidden rounded-xl
          bg-black
          border border-white/8
          before:absolute before:inset-0 before:rounded-xl before:bg-white/4 before:pointer-events-none
          ${paddingStyles[padding]}
          ${className}
        `,
        ...props,
        children: /* @__PURE__ */ jsx("div", { className: "relative z-10", children })
      }
    );
  }
);
CardRoot.displayName = "Card";
var CardHeader = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx("div", { ref, className: `flex flex-col gap-1.5 p-6 pb-0 ${className}`, ...props, children });
  }
);
CardHeader.displayName = "Card.Header";
var CardTitle = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "h3",
      {
        ref,
        className: `text-[13px] leading-4 font-semibold text-white/88 tracking-[0.12px] ${className}`,
        ...props,
        children
      }
    );
  }
);
CardTitle.displayName = "Card.Title";
var CardDescription = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "p",
      {
        ref,
        className: `text-[10px] leading-[13px] text-white/48 tracking-[0.12px] ${className}`,
        ...props,
        children
      }
    );
  }
);
CardDescription.displayName = "Card.Description";
var CardContent = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx("div", { ref, className: `p-6 ${className}`, ...props, children });
  }
);
CardContent.displayName = "Card.Content";
var CardFooter = forwardRef(
  ({ children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `flex items-center gap-2 p-6 pt-0 ${className}`,
        ...props,
        children
      }
    );
  }
);
CardFooter.displayName = "Card.Footer";
var Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter
});
var sizeStyles6 = {
  xs: "size-6 text-[10px] leading-[13px]",
  sm: "size-8 text-[10px] leading-[13px]",
  md: "size-10 text-[12px] leading-[15px]",
  lg: "size-12 text-[13px] leading-4",
  xl: "size-16 text-[15px] leading-5"
};
var shapeStyles = {
  circle: "rounded-full",
  square: "rounded-lg"
};
var Avatar = forwardRef(
  ({
    src,
    alt = "",
    fallback,
    size = "md",
    shape = "circle",
    className = "",
    ...props
  }, ref) => {
    const [imageError, setImageError] = useState(false);
    const showImage = src && !imageError;
    const initials = (fallback || alt || "").split(" ").map((word) => word[0]).join("").toUpperCase().slice(0, 2);
    return /* @__PURE__ */ jsx(
      "div",
      {
        ref,
        className: `
          relative inline-flex items-center justify-center
          overflow-hidden
          bg-white/8
          border border-white/8
          ${sizeStyles6[size]}
          ${shapeStyles[shape]}
          ${className}
        `,
        ...props,
        children: showImage ? /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            onError: () => setImageError(true),
            className: "size-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("span", { className: "font-medium text-white/72 tracking-[0.12px]", children: initials })
      }
    );
  }
);
Avatar.displayName = "Avatar";
var baseStyles3 = "inline-flex items-center rounded-lg font-medium tracking-[0.12px] ring-1 ring-inset transition-colors";
var sizeStyles7 = {
  sm: "px-2 py-0.5 text-[10px] leading-[13px]",
  md: "px-2.5 py-1 text-[12px] leading-[15px]"
};
var variantStyles4 = {
  default: "bg-white/8 text-white/72 ring-white/8",
  muted: "bg-white/4 text-white/48 ring-white/8",
  accent: "bg-[#FF4502]/20 text-[#FF4502] ring-[#FF4502]/30",
  success: "bg-green-500/20 text-green-400 ring-green-500/30",
  warning: "bg-amber-500/20 text-amber-400 ring-amber-500/30",
  error: "bg-red-500/20 text-red-400 ring-red-500/30",
  info: "bg-blue-500/20 text-blue-400 ring-blue-500/30",
  purple: "bg-purple-500/20 text-purple-400 ring-purple-500/30"
};
var Badge = forwardRef(
  ({ variant = "default", size = "md", children, className = "", ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "span",
      {
        ref,
        className: `${baseStyles3} ${sizeStyles7[size]} ${variantStyles4[variant]} ${className}`,
        ...props,
        children
      }
    );
  }
);
Badge.displayName = "Badge";

// src/primitives/index.ts
var primitives_exports = {};
__export(primitives_exports, {
  Accordion: () => Accordion,
  AlertDialog: () => AlertDialog,
  Avatar: () => Avatar2,
  Button: () => Button,
  Checkbox: () => Checkbox,
  CheckboxGroup: () => CheckboxGroup,
  Collapsible: () => Collapsible,
  Combobox: () => Combobox,
  ContextMenu: () => ContextMenu,
  Dialog: () => Dialog,
  DialogProvider: () => DialogProvider,
  Field: () => Field,
  Input: () => Input,
  Menu: () => Menu,
  Meter: () => Meter,
  NavigationMenu: () => NavigationMenu,
  NumberField: () => NumberField,
  Popover: () => Popover,
  PreviewCard: () => PreviewCard,
  Progress: () => Progress2,
  Radio: () => Radio,
  RadioGroup: () => RadioGroup2,
  ScrollArea: () => ScrollArea,
  Select: () => Select,
  SelectProvider: () => SelectProvider,
  Separator: () => Separator4,
  Slider: () => Slider2,
  Switch: () => Switch,
  Tabs: () => Tabs2,
  Toast: () => Toast2,
  Toggle: () => Toggle2,
  ToggleGroup: () => ToggleGroup,
  Toolbar: () => Toolbar,
  Tooltip: () => Tooltip,
  useButton: () => useButton,
  useCheckbox: () => useCheckbox,
  useDialog: () => useDialog,
  useDialogContext: () => useDialogContext,
  useFieldProps: () => useFieldProps,
  useInput: () => useInput,
  useRadio: () => useRadio,
  useSelect: () => useSelect,
  useSelectContext: () => useSelectContext,
  useSwitch: () => useSwitch,
  useTooltip: () => useTooltip
});
var Toggle2 = forwardRef((props, ref) => {
  const {
    pressed: controlledPressed,
    defaultPressed = false,
    disabled = false,
    onChange,
    className,
    children,
    ...rest
  } = props;
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isControlled = controlledPressed !== void 0;
  const pressed = isControlled ? controlledPressed : internalPressed;
  const handleClick = useCallback(() => {
    if (disabled) return;
    const newPressed = !pressed;
    if (!isControlled) {
      setInternalPressed(newPressed);
    }
    onChange?.(newPressed);
  }, [disabled, pressed, isControlled, onChange]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-pressed": pressed,
      disabled,
      "data-state": pressed ? "on" : "off",
      "data-disabled": disabled || void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Toggle2.displayName = "Toggle";
var ToggleGroupContext = createContext(null);
function useToggleGroupContext() {
  const context = useContext(ToggleGroupContext);
  if (!context) {
    throw new Error("ToggleGroup.Item must be used within ToggleGroup.Root");
  }
  return context;
}
var Root2 = forwardRef((props, ref) => {
  const {
    type = "single",
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled = false,
    orientation = "horizontal",
    loop = true,
    children,
    className,
    ...rest
  } = props;
  const normalizeValue = (val) => {
    if (val === void 0) return [];
    return Array.isArray(val) ? val : [val];
  };
  const [internalValue, setInternalValue] = useState(normalizeValue(defaultValue));
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? normalizeValue(controlledValue) : internalValue;
  const handleValueChange = useCallback(
    (itemValue) => {
      let newValue;
      if (type === "single") {
        newValue = value.includes(itemValue) ? [] : [itemValue];
      } else {
        newValue = value.includes(itemValue) ? value.filter((v) => v !== itemValue) : [...value, itemValue];
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(type === "single" ? newValue[0] || "" : newValue);
    },
    [type, value, isControlled, onValueChange]
  );
  return /* @__PURE__ */ jsx(ToggleGroupContext.Provider, { value: { type, value, onValueChange: handleValueChange, disabled }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "data-orientation": orientation,
      className,
      ...rest,
      children
    }
  ) });
});
Root2.displayName = "ToggleGroup.Root";
var Item = forwardRef((props, ref) => {
  const { value, children, disabled: itemDisabled, className, ...rest } = props;
  const context = useToggleGroupContext();
  const isPressed = context.value.includes(value);
  const isDisabled = context.disabled || itemDisabled;
  const handleClick = useCallback(() => {
    if (!isDisabled) {
      context.onValueChange(value);
    }
  }, [context, value, isDisabled]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      role: "radio",
      "aria-checked": isPressed,
      "aria-pressed": isPressed,
      disabled: isDisabled,
      "data-state": isPressed ? "on" : "off",
      "data-disabled": isDisabled ? "" : void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Item.displayName = "ToggleGroup.Item";
var ToggleGroup = {
  Root: Root2,
  Item
};
var Root3 = forwardRef((props, ref) => {
  const { orientation = "horizontal", loop = true, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "toolbar",
      "aria-orientation": orientation,
      "data-orientation": orientation,
      className,
      ...rest,
      children
    }
  );
});
Root3.displayName = "Toolbar.Root";
var Button3 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("button", { ref, type: "button", className, ...rest, children });
});
Button3.displayName = "Toolbar.Button";
var Separator2 = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": "vertical",
      className,
      ...rest
    }
  );
});
Separator2.displayName = "Toolbar.Separator";
var Link = forwardRef((props, ref) => {
  const { href, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("a", { ref, href, className, ...rest, children });
});
Link.displayName = "Toolbar.Link";
var ToggleGroup2 = forwardRef((props, ref) => {
  const { type = "single", children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "group", "data-type": type, className, ...rest, children });
});
ToggleGroup2.displayName = "Toolbar.ToggleGroup";
var ToggleItem = forwardRef((props, ref) => {
  const { value, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("button", { ref, type: "button", "data-value": value, className, ...rest, children });
});
ToggleItem.displayName = "Toolbar.ToggleItem";
var Toolbar = {
  Root: Root3,
  Button: Button3,
  Separator: Separator2,
  Link,
  ToggleGroup: ToggleGroup2,
  ToggleItem
};
var CheckboxGroupContext = createContext(null);
function useCheckboxGroupContext() {
  const context = useContext(CheckboxGroupContext);
  if (!context) {
    throw new Error("CheckboxGroup components must be used within CheckboxGroup.Root");
  }
  return context;
}
var Root4 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = [],
    onValueChange,
    name: nameProp,
    disabled = false,
    orientation = "vertical",
    children,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const generatedName = useId();
  const name = nameProp || generatedName;
  const handleValueChange = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );
  return /* @__PURE__ */ jsx(CheckboxGroupContext.Provider, { value: { value, onValueChange: handleValueChange, disabled, name, orientation }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "group",
      "data-orientation": orientation,
      "data-disabled": disabled ? "" : void 0,
      className,
      ...rest,
      children
    }
  ) });
});
Root4.displayName = "CheckboxGroup.Root";
var Label = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Label.displayName = "CheckboxGroup.Label";
var Item2 = forwardRef((props, ref) => {
  const { value, disabled: itemDisabled, children, className, ...rest } = props;
  const context = useCheckboxGroupContext();
  const isChecked = context.value.includes(value);
  const isDisabled = context.disabled || itemDisabled;
  const handleChange = useCallback(
    (event) => {
      const newValue = event.target.checked ? [...context.value, value] : context.value.filter((v) => v !== value);
      context.onValueChange(newValue);
    },
    [context, value]
  );
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      type: "checkbox",
      name: context.name,
      value,
      checked: isChecked,
      disabled: isDisabled,
      onChange: handleChange,
      "data-state": isChecked ? "checked" : "unchecked",
      "data-disabled": isDisabled ? "" : void 0,
      className,
      ...rest
    }
  );
});
Item2.displayName = "CheckboxGroup.Item";
var ItemLabel = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("label", { ref, className, ...rest, children });
});
ItemLabel.displayName = "CheckboxGroup.ItemLabel";
var CheckboxGroup = {
  Root: Root4,
  Label,
  Item: Item2,
  ItemLabel
};
function useRadio(props = {}) {
  const {
    checked = false,
    disabled = false,
    required = false,
    onChange,
    name,
    value
  } = props;
  const handleChange = useCallback(
    (event) => {
      if (disabled) return;
      onChange?.(event.target.checked, event);
    },
    [disabled, onChange]
  );
  const handleKeyDown = useCallback(
    (event) => {
    },
    []
  );
  const inputProps = {
    type: "radio",
    name,
    value,
    checked,
    disabled,
    required,
    "aria-checked": checked,
    "aria-required": required || void 0,
    onChange: handleChange,
    onKeyDown: handleKeyDown
  };
  return {
    inputProps,
    isChecked: checked,
    isDisabled: disabled
  };
}
var Radio = forwardRef(
  (props, forwardedRef) => {
    const {
      size = "md",
      className,
      // Extract useRadio props
      checked,
      disabled,
      required,
      onChange,
      name,
      value,
      ...rest
    } = props;
    const { inputProps, isChecked, isDisabled } = useRadio({
      checked,
      disabled,
      required,
      onChange,
      name,
      value
    });
    return /* @__PURE__ */ jsx(
      "input",
      {
        ref: forwardedRef,
        className,
        "data-size": size,
        "data-checked": isChecked || void 0,
        "data-disabled": isDisabled || void 0,
        ...inputProps,
        ...rest
      }
    );
  }
);
Radio.displayName = "Radio";
var RadioGroupContext2 = createContext(null);
function useRadioGroupContext2() {
  const context = useContext(RadioGroupContext2);
  if (!context) {
    throw new Error("RadioGroup components must be used within RadioGroup.Root");
  }
  return context;
}
var Root5 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = "",
    disabled = false,
    required = false,
    name: providedName,
    onChange,
    orientation = "vertical",
    children,
    className,
    ...rest
  } = props;
  const generatedId = useId();
  const name = providedName || `radio-group-${generatedId}`;
  const value = controlledValue ?? defaultValue;
  const handleChange = useCallback(
    (newValue) => {
      onChange?.(newValue);
    },
    [onChange]
  );
  return /* @__PURE__ */ jsx(
    RadioGroupContext2.Provider,
    {
      value: {
        name,
        value,
        disabled,
        required,
        onChange: handleChange
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          role: "radiogroup",
          "aria-required": required || void 0,
          "aria-orientation": orientation,
          "data-orientation": orientation,
          "data-disabled": disabled || void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root5.displayName = "RadioGroup.Root";
var Item3 = forwardRef((props, ref) => {
  const { value, disabled: itemDisabled, children, className, ...rest } = props;
  const context = useRadioGroupContext2();
  const disabled = context.disabled || itemDisabled;
  const checked = context.value === value;
  const handleChange = useCallback(() => {
    if (!disabled) {
      context.onChange(value);
    }
  }, [disabled, context, value]);
  return /* @__PURE__ */ jsxs(
    "label",
    {
      ref,
      "data-state": checked ? "checked" : "unchecked",
      "data-disabled": disabled || void 0,
      className,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "radio",
            name: context.name,
            value,
            checked,
            disabled,
            required: context.required,
            onChange: handleChange,
            className: "sr-only",
            "aria-checked": checked
          }
        ),
        children
      ]
    }
  );
});
Item3.displayName = "RadioGroup.Item";
var Indicator = forwardRef((props, ref) => {
  const { forceMount, className, children, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "data-state": "indicator",
      className,
      "aria-hidden": "true",
      ...rest,
      children
    }
  );
});
Indicator.displayName = "RadioGroup.Indicator";
var RadioGroup2 = {
  Root: Root5,
  Item: Item3,
  Indicator
};
var SliderContext = createContext(null);
function useSliderContext() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within Slider.Root");
  }
  return context;
}
var Root6 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = 0,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    orientation = "horizontal",
    onChange,
    children,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const id = useId();
  const handleChange = useCallback(
    (newValue) => {
      const clampedValue = Math.min(max, Math.max(min, newValue));
      const steppedValue = Math.round(clampedValue / step) * step;
      if (!isControlled) {
        setInternalValue(steppedValue);
      }
      onChange?.(steppedValue);
    },
    [isControlled, min, max, step, onChange]
  );
  const getPercentage = useCallback(() => {
    return (value - min) / (max - min) * 100;
  }, [value, min, max]);
  return /* @__PURE__ */ jsx(
    SliderContext.Provider,
    {
      value: {
        value,
        min,
        max,
        step,
        disabled,
        orientation,
        onChange: handleChange,
        getPercentage
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          role: "group",
          "aria-labelledby": `slider-label-${id}`,
          "data-orientation": orientation,
          "data-disabled": disabled || void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root6.displayName = "Slider.Root";
var Track = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useSliderContext();
  const trackRef = useRef(null);
  const handlePointerDown = useCallback(
    (event) => {
      if (context.disabled) return;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const percentage = context.orientation === "horizontal" ? (event.clientX - rect.left) / rect.width : 1 - (event.clientY - rect.top) / rect.height;
      const newValue = context.min + percentage * (context.max - context.min);
      context.onChange(newValue);
    },
    [context]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        trackRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      "data-orientation": context.orientation,
      "data-disabled": context.disabled || void 0,
      onPointerDown: handlePointerDown,
      className,
      ...rest,
      children
    }
  );
});
Track.displayName = "Slider.Track";
var Range = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useSliderContext();
  const percentage = context.getPercentage();
  const rangeStyle = context.orientation === "horizontal" ? { width: `${percentage}%`, ...style } : { height: `${percentage}%`, ...style };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-orientation": context.orientation,
      style: rangeStyle,
      className,
      ...rest
    }
  );
});
Range.displayName = "Slider.Range";
var Thumb = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useSliderContext();
  const percentage = context.getPercentage();
  const thumbRef = useRef(null);
  const handleKeyDown = useCallback(
    (event) => {
      if (context.disabled) return;
      let newValue = context.value;
      const bigStep = context.step * 10;
      switch (event.key) {
        case "ArrowRight":
        case "ArrowUp":
          newValue = context.value + context.step;
          break;
        case "ArrowLeft":
        case "ArrowDown":
          newValue = context.value - context.step;
          break;
        case "PageUp":
          newValue = context.value + bigStep;
          break;
        case "PageDown":
          newValue = context.value - bigStep;
          break;
        case "Home":
          newValue = context.min;
          break;
        case "End":
          newValue = context.max;
          break;
        default:
          return;
      }
      event.preventDefault();
      context.onChange(newValue);
    },
    [context]
  );
  const handlePointerDown = useCallback(
    (event) => {
      if (context.disabled) return;
      event.preventDefault();
      const thumb = thumbRef.current;
      if (!thumb) return;
      thumb.focus();
      thumb.setPointerCapture(event.pointerId);
      const handlePointerMove = (moveEvent) => {
        const track = thumb.parentElement;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const percentage2 = context.orientation === "horizontal" ? (moveEvent.clientX - rect.left) / rect.width : 1 - (moveEvent.clientY - rect.top) / rect.height;
        const newValue = context.min + percentage2 * (context.max - context.min);
        context.onChange(newValue);
      };
      const handlePointerUp = () => {
        thumb.releasePointerCapture(event.pointerId);
        document.removeEventListener("pointermove", handlePointerMove);
        document.removeEventListener("pointerup", handlePointerUp);
      };
      document.addEventListener("pointermove", handlePointerMove);
      document.addEventListener("pointerup", handlePointerUp);
    },
    [context]
  );
  const thumbStyle = context.orientation === "horizontal" ? { left: `${percentage}%`, ...style } : { bottom: `${percentage}%`, ...style };
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        thumbRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      role: "slider",
      tabIndex: context.disabled ? -1 : 0,
      "aria-valuemin": context.min,
      "aria-valuemax": context.max,
      "aria-valuenow": context.value,
      "aria-orientation": context.orientation,
      "aria-disabled": context.disabled || void 0,
      "data-orientation": context.orientation,
      "data-disabled": context.disabled || void 0,
      style: thumbStyle,
      onKeyDown: handleKeyDown,
      onPointerDown: handlePointerDown,
      className,
      ...rest
    }
  );
});
Thumb.displayName = "Slider.Thumb";
var Slider2 = {
  Root: Root6,
  Track,
  Range,
  Thumb
};
var NumberFieldContext = createContext(null);
function useNumberFieldContext() {
  const context = useContext(NumberFieldContext);
  if (!context) {
    throw new Error("NumberField components must be used within NumberField.Root");
  }
  return context;
}
var Root7 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = 0,
    onValueChange,
    min = -Infinity,
    max = Infinity,
    step = 1,
    disabled = false,
    children,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const inputId = useId();
  const clamp = useCallback(
    (val) => Math.min(Math.max(val, min), max),
    [min, max]
  );
  const handleValueChange = useCallback(
    (newValue) => {
      const clamped = clamp(newValue);
      if (!isControlled) {
        setInternalValue(clamped);
      }
      onValueChange?.(clamped);
    },
    [clamp, isControlled, onValueChange]
  );
  const increment = useCallback(() => {
    handleValueChange(value + step);
  }, [value, step, handleValueChange]);
  const decrement = useCallback(() => {
    handleValueChange(value - step);
  }, [value, step, handleValueChange]);
  return /* @__PURE__ */ jsx(
    NumberFieldContext.Provider,
    {
      value: {
        value,
        onValueChange: handleValueChange,
        min,
        max,
        step,
        disabled,
        inputId,
        increment,
        decrement
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-disabled": disabled ? "" : void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root7.displayName = "NumberField.Root";
var Label2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useNumberFieldContext();
  return /* @__PURE__ */ jsx("label", { ref, htmlFor: context.inputId, className, ...rest, children });
});
Label2.displayName = "NumberField.Label";
var Group = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "group", className, ...rest, children });
});
Group.displayName = "NumberField.Group";
var Input3 = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const context = useNumberFieldContext();
  const handleChange = useCallback(
    (event) => {
      const newValue = parseFloat(event.target.value);
      if (!isNaN(newValue)) {
        context.onValueChange(newValue);
      }
    },
    [context]
  );
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        context.increment();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        context.decrement();
      }
    },
    [context]
  );
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      id: context.inputId,
      type: "number",
      value: context.value,
      min: context.min,
      max: context.max,
      step: context.step,
      disabled: context.disabled,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      className,
      ...rest
    }
  );
});
Input3.displayName = "NumberField.Input";
var Increment = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useNumberFieldContext();
  const handleClick = useCallback(
    (event) => {
      context.increment();
      onClick?.(event);
    },
    [context, onClick]
  );
  const isAtMax = context.value >= context.max;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      tabIndex: -1,
      "aria-label": "Increment",
      disabled: context.disabled || isAtMax,
      onClick: handleClick,
      className,
      ...rest,
      children: children ?? "+"
    }
  );
});
Increment.displayName = "NumberField.Increment";
var Decrement = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useNumberFieldContext();
  const handleClick = useCallback(
    (event) => {
      context.decrement();
      onClick?.(event);
    },
    [context, onClick]
  );
  const isAtMin = context.value <= context.min;
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      tabIndex: -1,
      "aria-label": "Decrement",
      disabled: context.disabled || isAtMin,
      onClick: handleClick,
      className,
      ...rest,
      children: children ?? "-"
    }
  );
});
Decrement.displayName = "NumberField.Decrement";
var NumberField = {
  Root: Root7,
  Label: Label2,
  Group,
  Input: Input3,
  Increment,
  Decrement
};
var ComboboxContext = createContext(null);
function useComboboxContext() {
  const context = useContext(ComboboxContext);
  if (!context) {
    throw new Error("Combobox components must be used within Combobox.Root");
  }
  return context;
}
var Root8 = forwardRef((props, ref) => {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    disabled = false,
    children,
    className,
    ...rest
  } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState(-1);
  const isOpenControlled = controlledOpen !== void 0;
  const isValueControlled = controlledValue !== void 0;
  const open = isOpenControlled ? controlledOpen : internalOpen;
  const value = isValueControlled ? controlledValue : internalValue;
  const inputId = useId();
  const listboxId = useId();
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setActiveIndex(-1);
      }
    },
    [isOpenControlled, onOpenChange]
  );
  const handleValueChange = useCallback(
    (newValue) => {
      if (!isValueControlled) {
        setInternalValue(newValue);
      }
      setInputValue(newValue);
      onValueChange?.(newValue);
      handleOpenChange(false);
    },
    [isValueControlled, onValueChange, handleOpenChange]
  );
  return /* @__PURE__ */ jsx(
    ComboboxContext.Provider,
    {
      value: {
        open,
        onOpenChange: handleOpenChange,
        value,
        onValueChange: handleValueChange,
        inputValue,
        onInputValueChange: setInputValue,
        activeIndex,
        onActiveIndexChange: setActiveIndex,
        inputId,
        listboxId,
        disabled
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-disabled": disabled ? "" : void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root8.displayName = "Combobox.Root";
var Input4 = forwardRef((props, ref) => {
  const { className, onKeyDown, onFocus, ...rest } = props;
  const context = useComboboxContext();
  const handleChange = useCallback(
    (event) => {
      context.onInputValueChange(event.target.value);
      context.onOpenChange(true);
    },
    [context]
  );
  const handleKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          if (!context.open) {
            context.onOpenChange(true);
          } else {
            context.onActiveIndexChange(context.activeIndex + 1);
          }
          break;
        case "ArrowUp":
          event.preventDefault();
          context.onActiveIndexChange(Math.max(0, context.activeIndex - 1));
          break;
        case "Escape":
          context.onOpenChange(false);
          break;
        case "Enter":
          if (context.open && context.activeIndex >= 0) {
            event.preventDefault();
          }
          break;
      }
      onKeyDown?.(event);
    },
    [context, onKeyDown]
  );
  const handleFocus = useCallback(
    (event) => {
      context.onOpenChange(true);
      onFocus?.(event);
    },
    [context, onFocus]
  );
  return /* @__PURE__ */ jsx(
    "input",
    {
      ref,
      id: context.inputId,
      type: "text",
      role: "combobox",
      "aria-expanded": context.open,
      "aria-controls": context.listboxId,
      "aria-activedescendant": context.activeIndex >= 0 ? `${context.listboxId}-${context.activeIndex}` : void 0,
      "aria-autocomplete": "list",
      value: context.inputValue,
      disabled: context.disabled,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      className,
      ...rest
    }
  );
});
Input4.displayName = "Combobox.Input";
var Trigger2 = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useComboboxContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(!context.open);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      tabIndex: -1,
      "aria-label": "Show options",
      "aria-expanded": context.open,
      disabled: context.disabled,
      onClick: handleClick,
      className,
      ...rest,
      children: children ?? "\u25BC"
    }
  );
});
Trigger2.displayName = "Combobox.Trigger";
function Portal2(props) {
  const { container, children } = props;
  const context = useComboboxContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !context.open) return null;
  return createPortal(children, container || document.body);
}
Portal2.displayName = "Combobox.Portal";
var Content2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useComboboxContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "listbox",
      id: context.listboxId,
      "aria-labelledby": context.inputId,
      "data-state": context.open ? "open" : "closed",
      className,
      ...rest,
      children
    }
  );
});
Content2.displayName = "Combobox.Content";
var Item4 = forwardRef((props, ref) => {
  const { value, disabled = false, children, onClick, className, ...rest } = props;
  const context = useComboboxContext();
  const isSelected = context.value === value;
  const handleClick = useCallback(
    (event) => {
      if (!disabled) {
        context.onValueChange(value);
        onClick?.(event);
      }
    },
    [context, value, disabled, onClick]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "option",
      "aria-selected": isSelected,
      "aria-disabled": disabled,
      "data-selected": isSelected ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Item4.displayName = "Combobox.Item";
var Empty = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "presentation", className, ...rest, children });
});
Empty.displayName = "Combobox.Empty";
var Combobox = {
  Root: Root8,
  Input: Input4,
  Trigger: Trigger2,
  Portal: Portal2,
  Content: Content2,
  Item: Item4,
  Empty
};
var FieldContext = createContext(null);
function useFieldContext() {
  const context = useContext(FieldContext);
  if (!context) {
    throw new Error("Field components must be used within Field.Root");
  }
  return context;
}
var Root9 = forwardRef((props, ref) => {
  const { hasError = false, disabled = false, children, className, ...rest } = props;
  const inputId = useId();
  const descriptionId = useId();
  const errorId = useId();
  return /* @__PURE__ */ jsx(FieldContext.Provider, { value: { inputId, descriptionId, errorId, hasError, disabled }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-error": hasError ? "" : void 0,
      "data-disabled": disabled ? "" : void 0,
      className,
      ...rest,
      children
    }
  ) });
});
Root9.displayName = "Field.Root";
var Label3 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();
  return /* @__PURE__ */ jsx(
    "label",
    {
      ref,
      htmlFor: context.inputId,
      "data-error": context.hasError ? "" : void 0,
      "data-disabled": context.disabled ? "" : void 0,
      className,
      ...rest,
      children
    }
  );
});
Label3.displayName = "Field.Label";
var Control = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-error": context.hasError ? "" : void 0,
      "data-disabled": context.disabled ? "" : void 0,
      className,
      ...rest,
      children
    }
  );
});
Control.displayName = "Field.Control";
var Description2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      id: context.descriptionId,
      "data-error": context.hasError ? "" : void 0,
      className,
      ...rest,
      children
    }
  );
});
Description2.displayName = "Field.Description";
var ErrorMessage = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useFieldContext();
  if (!context.hasError) return null;
  return /* @__PURE__ */ jsx("p", { ref, id: context.errorId, role: "alert", "aria-live": "polite", className, ...rest, children });
});
ErrorMessage.displayName = "Field.Error";
var Validity = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  const context = useFieldContext();
  if (!context.hasError) return null;
  return /* @__PURE__ */ jsx("span", { ref, className, ...rest });
});
Validity.displayName = "Field.Validity";
function useFieldProps() {
  const context = useFieldContext();
  return {
    id: context.inputId,
    "aria-describedby": context.hasError ? `${context.errorId} ${context.descriptionId}` : context.descriptionId,
    "aria-invalid": context.hasError,
    disabled: context.disabled
  };
}
var Field = {
  Root: Root9,
  Label: Label3,
  Control,
  Description: Description2,
  Error: ErrorMessage,
  Validity
};
var TabsContext2 = createContext(null);
function useTabsContext2() {
  const context = useContext(TabsContext2);
  if (!context) {
    throw new Error("Tabs components must be used within Tabs.Root");
  }
  return context;
}
var Root10 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = "",
    orientation = "horizontal",
    activationMode = "automatic",
    onChange,
    children,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const baseId = useId();
  const handleChange = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );
  return /* @__PURE__ */ jsx(
    TabsContext2.Provider,
    {
      value: {
        value,
        baseId,
        orientation,
        activationMode,
        onChange: handleChange
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-orientation": orientation,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root10.displayName = "Tabs.Root";
var List = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useTabsContext2();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "tablist",
      "aria-orientation": context.orientation,
      "data-orientation": context.orientation,
      className,
      ...rest,
      children
    }
  );
});
List.displayName = "Tabs.List";
var Trigger3 = forwardRef((props, ref) => {
  const { value, disabled, children, className, ...rest } = props;
  const context = useTabsContext2();
  const isSelected = context.value === value;
  const handleClick = useCallback(() => {
    if (!disabled) {
      context.onChange(value);
    }
  }, [disabled, context, value]);
  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) return;
      const triggers = Array.from(
        event.currentTarget.parentElement?.querySelectorAll('[role="tab"]') || []
      );
      const currentIndex = triggers.indexOf(event.currentTarget);
      let nextIndex = null;
      if (context.orientation === "horizontal") {
        if (event.key === "ArrowRight") {
          nextIndex = (currentIndex + 1) % triggers.length;
        } else if (event.key === "ArrowLeft") {
          nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        }
      } else {
        if (event.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % triggers.length;
        } else if (event.key === "ArrowUp") {
          nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        }
      }
      if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = triggers.length - 1;
      }
      if (nextIndex !== null) {
        event.preventDefault();
        const nextTrigger = triggers[nextIndex];
        nextTrigger?.focus();
        if (context.activationMode === "automatic") {
          const nextValue = nextTrigger?.getAttribute("data-value");
          if (nextValue) {
            context.onChange(nextValue);
          }
        }
      }
    },
    [disabled, context]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      role: "tab",
      id: `${context.baseId}-trigger-${value}`,
      "aria-controls": `${context.baseId}-content-${value}`,
      "aria-selected": isSelected,
      tabIndex: isSelected ? 0 : -1,
      disabled,
      "data-state": isSelected ? "active" : "inactive",
      "data-value": value,
      "data-disabled": disabled || void 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className,
      ...rest,
      children
    }
  );
});
Trigger3.displayName = "Tabs.Trigger";
var Content3 = forwardRef((props, ref) => {
  const { value, forceMount, children, className, ...rest } = props;
  const context = useTabsContext2();
  const isSelected = context.value === value;
  if (!isSelected && !forceMount) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "tabpanel",
      id: `${context.baseId}-content-${value}`,
      "aria-labelledby": `${context.baseId}-trigger-${value}`,
      hidden: !isSelected,
      tabIndex: 0,
      "data-state": isSelected ? "active" : "inactive",
      className,
      ...rest,
      children
    }
  );
});
Content3.displayName = "Tabs.Content";
var Tabs2 = {
  Root: Root10,
  List,
  Trigger: Trigger3,
  Content: Content3
};
var MenuContext = createContext(null);
function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("Menu components must be used within Menu.Root");
  }
  return context;
}
function Root11(props) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [items, setItems] = useState([]);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;
  const setOpen = useCallback(
    (newOpen) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setActiveIndex(-1);
      }
    },
    [isControlled, onOpenChange]
  );
  const registerItem = useCallback((ref) => {
    setItems((prev) => [...prev, ref]);
  }, []);
  const unregisterItem = useCallback((ref) => {
    setItems((prev) => prev.filter((item) => item !== ref));
  }, []);
  return /* @__PURE__ */ jsx(
    MenuContext.Provider,
    {
      value: {
        open,
        setOpen,
        triggerId,
        contentId,
        activeIndex,
        setActiveIndex,
        items,
        registerItem,
        unregisterItem
      },
      children
    }
  );
}
Root11.displayName = "Menu.Root";
var Trigger4 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useMenuContext();
  const handleClick = useCallback(() => {
    context.setOpen(!context.open);
  }, [context]);
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        context.setOpen(true);
        context.setActiveIndex(0);
      }
    },
    [context]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      id: context.triggerId,
      "aria-haspopup": "menu",
      "aria-expanded": context.open,
      "aria-controls": context.open ? context.contentId : void 0,
      "data-state": context.open ? "open" : "closed",
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className,
      ...rest,
      children
    }
  );
});
Trigger4.displayName = "Menu.Trigger";
function Portal3({ children, container }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, container || document.body);
}
Portal3.displayName = "Menu.Portal";
var Content4 = forwardRef((props, ref) => {
  const { align = "start", side = "bottom", sideOffset = 4, children, className, ...rest } = props;
  const context = useMenuContext();
  const contentRef = useRef(null);
  useEffect(() => {
    if (!context.open) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      const trigger = document.getElementById(context.triggerId);
      if (contentRef.current && !contentRef.current.contains(target) && trigger && !trigger.contains(target)) {
        context.setOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        context.setOpen(false);
        document.getElementById(context.triggerId)?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [context]);
  useEffect(() => {
    if (context.open && context.activeIndex >= 0 && context.items[context.activeIndex]) {
      context.items[context.activeIndex].current?.focus();
    }
  }, [context.open, context.activeIndex, context.items]);
  const handleKeyDown = useCallback(
    (event) => {
      const itemCount = context.items.length;
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          context.setActiveIndex((context.activeIndex + 1) % itemCount);
          break;
        case "ArrowUp":
          event.preventDefault();
          context.setActiveIndex((context.activeIndex - 1 + itemCount) % itemCount);
          break;
        case "Home":
          event.preventDefault();
          context.setActiveIndex(0);
          break;
        case "End":
          event.preventDefault();
          context.setActiveIndex(itemCount - 1);
          break;
      }
    },
    [context]
  );
  if (!context.open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      role: "menu",
      id: context.contentId,
      "aria-labelledby": context.triggerId,
      "data-state": "open",
      "data-side": side,
      "data-align": align,
      tabIndex: -1,
      onKeyDown: handleKeyDown,
      className,
      ...rest,
      children
    }
  );
});
Content4.displayName = "Menu.Content";
var Item5 = forwardRef((props, ref) => {
  const { disabled, onSelect, children, className, ...rest } = props;
  const context = useMenuContext();
  const itemRef = useRef(null);
  useEffect(() => {
    context.registerItem(itemRef);
    return () => context.unregisterItem(itemRef);
  }, [context]);
  const handleClick = useCallback(() => {
    if (disabled) return;
    onSelect?.();
    context.setOpen(false);
  }, [disabled, onSelect, context]);
  const handleKeyDown = useCallback(
    (event) => {
      if (disabled) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect?.();
        context.setOpen(false);
      }
    },
    [disabled, onSelect, context]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        itemRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      role: "menuitem",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled || void 0,
      "data-disabled": disabled || void 0,
      onClick: handleClick,
      onKeyDown: handleKeyDown,
      className,
      ...rest,
      children
    }
  );
});
Item5.displayName = "Menu.Item";
var MenuSeparator = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": "horizontal",
      className,
      ...rest
    }
  );
});
MenuSeparator.displayName = "Menu.Separator";
var Label4 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "presentation", className, ...rest, children });
});
Label4.displayName = "Menu.Label";
var Menu = {
  Root: Root11,
  Trigger: Trigger4,
  Portal: Portal3,
  Content: Content4,
  Item: Item5,
  Separator: MenuSeparator,
  Label: Label4
};
var ContextMenuContext = createContext(null);
function useContextMenuContext() {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu.Root");
  }
  return context;
}
function Root12(props) {
  const { onOpenChange, children } = props;
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const handleOpenChange = useCallback(
    (newOpen) => {
      setOpen(newOpen);
      onOpenChange?.(newOpen);
    },
    [onOpenChange]
  );
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleOpenChange(false);
      }
    };
    const handleClick = () => {
      handleOpenChange(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClick);
    };
  }, [open, handleOpenChange]);
  return /* @__PURE__ */ jsx(ContextMenuContext.Provider, { value: { open, onOpenChange: handleOpenChange, position }, children });
}
Root12.displayName = "ContextMenu.Root";
var Trigger5 = forwardRef((props, ref) => {
  const { disabled = false, children, onContextMenu, className, ...rest } = props;
  const context = useContextMenuContext();
  const handleContextMenu = useCallback(
    (event) => {
      if (disabled) return;
      event.preventDefault();
      context.position = { x: event.clientX, y: event.clientY };
      context.onOpenChange(true);
      onContextMenu?.(event);
    },
    [context, disabled, onContextMenu]
  );
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "data-disabled": disabled ? "" : void 0,
      onContextMenu: handleContextMenu,
      className,
      ...rest,
      children
    }
  );
});
Trigger5.displayName = "ContextMenu.Trigger";
function Portal4(props) {
  const { container, children } = props;
  const context = useContextMenuContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !context.open) return null;
  return createPortal(children, container || document.body);
}
Portal4.displayName = "ContextMenu.Portal";
var Content5 = forwardRef((props, ref) => {
  const { sideOffset = 0, alignOffset = 0, children, className, style, ...rest } = props;
  const context = useContextMenuContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "menu",
      "data-state": context.open ? "open" : "closed",
      className,
      style: {
        position: "fixed",
        top: context.position.y + sideOffset,
        left: context.position.x + alignOffset,
        ...style
      },
      ...rest,
      children
    }
  );
});
Content5.displayName = "ContextMenu.Content";
var Item6 = forwardRef((props, ref) => {
  const { disabled = false, onSelect, children, onClick, className, ...rest } = props;
  const context = useContextMenuContext();
  const handleClick = useCallback(
    (event) => {
      if (disabled) return;
      event.stopPropagation();
      onSelect?.();
      context.onOpenChange(false);
      onClick?.(event);
    },
    [disabled, onSelect, context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "menuitem",
      tabIndex: disabled ? -1 : 0,
      "aria-disabled": disabled,
      "data-disabled": disabled ? "" : void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Item6.displayName = "ContextMenu.Item";
var Separator3 = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "separator", className, ...rest });
});
Separator3.displayName = "ContextMenu.Separator";
var Label5 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Label5.displayName = "ContextMenu.Label";
var ContextMenu = {
  Root: Root12,
  Trigger: Trigger5,
  Portal: Portal4,
  Content: Content5,
  Item: Item6,
  Separator: Separator3,
  Label: Label5
};
var NavigationMenuContext = createContext(null);
function useNavigationMenuContext() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error("NavigationMenu components must be used within NavigationMenu.Root");
  }
  return context;
}
var Root13 = forwardRef((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = "",
    onValueChange,
    orientation = "horizontal",
    children,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? controlledValue : internalValue;
  const handleValueChange = useCallback(
    (newValue) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );
  return /* @__PURE__ */ jsx(NavigationMenuContext.Provider, { value: { value, onValueChange: handleValueChange, orientation }, children: /* @__PURE__ */ jsx(
    "nav",
    {
      ref,
      "aria-label": "Main",
      "data-orientation": orientation,
      className,
      ...rest,
      children
    }
  ) });
});
Root13.displayName = "NavigationMenu.Root";
var List2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useNavigationMenuContext();
  return /* @__PURE__ */ jsx(
    "ul",
    {
      ref,
      role: "menubar",
      "data-orientation": context.orientation,
      className,
      ...rest,
      children
    }
  );
});
List2.displayName = "NavigationMenu.List";
var Item7 = forwardRef((props, ref) => {
  const { value, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("li", { ref, role: "none", className, ...rest, children });
});
Item7.displayName = "NavigationMenu.Item";
var Trigger6 = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  useNavigationMenuContext();
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      role: "menuitem",
      "aria-haspopup": "menu",
      className,
      ...rest,
      children
    }
  );
});
Trigger6.displayName = "NavigationMenu.Trigger";
var Content6 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, role: "menu", className, ...rest, children });
});
Content6.displayName = "NavigationMenu.Content";
var Link2 = forwardRef((props, ref) => {
  const { href, active = false, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "a",
    {
      ref,
      href,
      role: "menuitem",
      "aria-current": active ? "page" : void 0,
      "data-active": active ? "" : void 0,
      className,
      ...rest,
      children
    }
  );
});
Link2.displayName = "NavigationMenu.Link";
var Indicator2 = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, "aria-hidden": "true", className, ...rest });
});
Indicator2.displayName = "NavigationMenu.Indicator";
var Viewport = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Viewport.displayName = "NavigationMenu.Viewport";
var NavigationMenu = {
  Root: Root13,
  List: List2,
  Item: Item7,
  Trigger: Trigger6,
  Content: Content6,
  Link: Link2,
  Indicator: Indicator2,
  Viewport
};
var AlertDialogContext = createContext(null);
function useAlertDialogContext() {
  const context = useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within AlertDialog.Root");
  }
  return context;
}
function Root14(props) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = useId();
  const descriptionId = useId();
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(AlertDialogContext.Provider, { value: { open, onOpenChange: handleOpenChange, titleId, descriptionId }, children });
}
Root14.displayName = "AlertDialog.Root";
var Trigger7 = forwardRef((props, ref) => {
  const { children, onClick, ...rest } = props;
  const context = useAlertDialogContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(true);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
      onClick: handleClick,
      ...rest,
      children
    }
  );
});
Trigger7.displayName = "AlertDialog.Trigger";
function Portal5(props) {
  const { container, children } = props;
  const context = useAlertDialogContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !context.open) return null;
  return createPortal(children, container || document.body);
}
Portal5.displayName = "AlertDialog.Portal";
var Overlay2 = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-state": "open",
      "aria-hidden": "true",
      className,
      ...rest
    }
  );
});
Overlay2.displayName = "AlertDialog.Overlay";
var Content7 = forwardRef((props, ref) => {
  const { children, className, onEscapeKeyDown, ...rest } = props;
  const context = useAlertDialogContext();
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onEscapeKeyDown?.(event);
        if (!event.defaultPrevented) {
          context.onOpenChange(false);
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [context, onEscapeKeyDown]);
  useEffect(() => {
    const previousActiveElement = document.activeElement;
    return () => {
      previousActiveElement?.focus();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "alertdialog",
      "aria-modal": "true",
      "aria-labelledby": context.titleId,
      "aria-describedby": context.descriptionId,
      "data-state": "open",
      className,
      ...rest,
      children
    }
  );
});
Content7.displayName = "AlertDialog.Content";
var Title2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useAlertDialogContext();
  return /* @__PURE__ */ jsx("h2", { ref, id: context.titleId, className, ...rest, children });
});
Title2.displayName = "AlertDialog.Title";
var Description3 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useAlertDialogContext();
  return /* @__PURE__ */ jsx("p", { ref, id: context.descriptionId, className, ...rest, children });
});
Description3.displayName = "AlertDialog.Description";
var Cancel = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useAlertDialogContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx("button", { ref, type: "button", onClick: handleClick, className, ...rest, children });
});
Cancel.displayName = "AlertDialog.Cancel";
var Action = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useAlertDialogContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx("button", { ref, type: "button", onClick: handleClick, className, ...rest, children });
});
Action.displayName = "AlertDialog.Action";
var AlertDialog = {
  Root: Root14,
  Trigger: Trigger7,
  Portal: Portal5,
  Overlay: Overlay2,
  Content: Content7,
  Title: Title2,
  Description: Description3,
  Cancel,
  Action
};
var PopoverContext = createContext(null);
function usePopoverContext() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within Popover.Root");
  }
  return context;
}
function Root15(props) {
  const { open: controlledOpen, defaultOpen = false, onOpenChange, children } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const triggerRef = useRef(null);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const contentId = `${baseId}-content`;
  const setOpen = useCallback(
    (newOpen) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(
    PopoverContext.Provider,
    {
      value: {
        open,
        setOpen,
        triggerId,
        contentId,
        triggerRef
      },
      children
    }
  );
}
Root15.displayName = "Popover.Root";
var Trigger8 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const context = usePopoverContext();
  const handleClick = useCallback(() => {
    context.setOpen(!context.open);
  }, [context]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref: (node) => {
        context.triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      type: "button",
      id: context.triggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": context.open,
      "aria-controls": context.open ? context.contentId : void 0,
      "data-state": context.open ? "open" : "closed",
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Trigger8.displayName = "Popover.Trigger";
function Portal6({ children, container }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return createPortal(children, container || document.body);
}
Portal6.displayName = "Popover.Portal";
var Content8 = forwardRef((props, ref) => {
  const { align = "center", side = "bottom", sideOffset = 4, children, className, ...rest } = props;
  const context = usePopoverContext();
  const contentRef = useRef(null);
  useEffect(() => {
    if (!context.open) return;
    const handleClickOutside = (event) => {
      const target = event.target;
      if (contentRef.current && !contentRef.current.contains(target) && context.triggerRef.current && !context.triggerRef.current.contains(target)) {
        context.setOpen(false);
      }
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        context.setOpen(false);
        context.triggerRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [context]);
  if (!context.open) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        contentRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      role: "dialog",
      id: context.contentId,
      "aria-labelledby": context.triggerId,
      "data-state": "open",
      "data-side": side,
      "data-align": align,
      tabIndex: -1,
      className,
      ...rest,
      children
    }
  );
});
Content8.displayName = "Popover.Content";
var Close2 = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = usePopoverContext();
  const handleClick = useCallback(
    (event) => {
      context.setOpen(false);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Close2.displayName = "Popover.Close";
var Arrow = forwardRef((props, ref) => {
  const { width = 10, height = 5, className, style, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      style: { width, height, ...style },
      className,
      ...rest
    }
  );
});
Arrow.displayName = "Popover.Arrow";
var Popover = {
  Root: Root15,
  Trigger: Trigger8,
  Portal: Portal6,
  Content: Content8,
  Close: Close2,
  Arrow
};
var PreviewCardContext = createContext(null);
function usePreviewCardContext() {
  const context = useContext(PreviewCardContext);
  if (!context) {
    throw new Error("PreviewCard components must be used within PreviewCard.Root");
  }
  return context;
}
function Root16(props) {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    openDelay = 700,
    closeDelay = 300,
    children
  } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const triggerRef = useRef(null);
  const openTimerRef = useRef(void 0);
  const closeTimerRef = useRef(void 0);
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (newOpen) {
        clearTimeout(closeTimerRef.current);
        openTimerRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(true);
          }
          onOpenChange?.(true);
        }, openDelay);
      } else {
        clearTimeout(openTimerRef.current);
        closeTimerRef.current = setTimeout(() => {
          if (!isControlled) {
            setInternalOpen(false);
          }
          onOpenChange?.(false);
        }, closeDelay);
      }
    },
    [isControlled, onOpenChange, openDelay, closeDelay]
  );
  useEffect(() => {
    return () => {
      clearTimeout(openTimerRef.current);
      clearTimeout(closeTimerRef.current);
    };
  }, []);
  return /* @__PURE__ */ jsx(PreviewCardContext.Provider, { value: { open, onOpenChange: handleOpenChange, triggerRef }, children });
}
Root16.displayName = "PreviewCard.Root";
var Trigger9 = forwardRef((props, ref) => {
  const { href, children, onMouseEnter, onMouseLeave, onFocus, onBlur, className, ...rest } = props;
  const context = usePreviewCardContext();
  const handleMouseEnter = useCallback(
    (event) => {
      context.onOpenChange(true);
      onMouseEnter?.(event);
    },
    [context, onMouseEnter]
  );
  const handleMouseLeave = useCallback(
    (event) => {
      context.onOpenChange(false);
      onMouseLeave?.(event);
    },
    [context, onMouseLeave]
  );
  const handleFocus = useCallback(
    (event) => {
      context.onOpenChange(true);
      onFocus?.(event);
    },
    [context, onFocus]
  );
  const handleBlur = useCallback(
    (event) => {
      context.onOpenChange(false);
      onBlur?.(event);
    },
    [context, onBlur]
  );
  return /* @__PURE__ */ jsx(
    "a",
    {
      ref: (node) => {
        context.triggerRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      href,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      className,
      ...rest,
      children
    }
  );
});
Trigger9.displayName = "PreviewCard.Trigger";
function Portal7(props) {
  const { container, children } = props;
  const context = usePreviewCardContext();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted || !context.open) return null;
  return createPortal(children, container || document.body);
}
Portal7.displayName = "PreviewCard.Portal";
var Content9 = forwardRef((props, ref) => {
  const {
    side = "bottom",
    sideOffset = 8,
    align = "center",
    children,
    onMouseEnter,
    onMouseLeave,
    className,
    style,
    ...rest
  } = props;
  const context = usePreviewCardContext();
  const handleMouseEnter = useCallback(
    (event) => {
      context.onOpenChange(true);
      onMouseEnter?.(event);
    },
    [context, onMouseEnter]
  );
  const handleMouseLeave = useCallback(
    (event) => {
      context.onOpenChange(false);
      onMouseLeave?.(event);
    },
    [context, onMouseLeave]
  );
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-state": context.open ? "open" : "closed",
      "data-side": side,
      "data-align": align,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      className,
      style: { position: "absolute", ...style },
      ...rest,
      children
    }
  );
});
Content9.displayName = "PreviewCard.Content";
var Arrow2 = forwardRef((props, ref) => {
  const { width = 10, height = 5, className, style, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className,
      style: { width, height, ...style },
      ...rest
    }
  );
});
Arrow2.displayName = "PreviewCard.Arrow";
var PreviewCard = {
  Root: Root16,
  Trigger: Trigger9,
  Portal: Portal7,
  Content: Content9,
  Arrow: Arrow2
};
var Root17 = forwardRef((props, ref) => {
  const { value = 0, max = 100, indeterminate = false, className, children, ...rest } = props;
  const percentage = indeterminate ? void 0 : Math.min(100, Math.max(0, value / max * 100));
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "progressbar",
      "aria-valuenow": indeterminate ? void 0 : value,
      "aria-valuemin": 0,
      "aria-valuemax": max,
      "aria-valuetext": indeterminate ? "Loading" : `${percentage?.toFixed(0)}%`,
      "data-state": indeterminate ? "indeterminate" : value >= max ? "complete" : "loading",
      "data-value": value,
      "data-max": max,
      className,
      ...rest,
      children
    }
  );
});
Root17.displayName = "Progress.Root";
var Indicator3 = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-state": "indicator",
      className,
      style,
      ...rest
    }
  );
});
Indicator3.displayName = "Progress.Indicator";
var Progress2 = {
  Root: Root17,
  Indicator: Indicator3
};
var ToastContext2 = createContext(null);
function useToastContext() {
  const context = useContext(ToastContext2);
  if (!context) {
    throw new Error("Toast components must be used within Toast.Root");
  }
  return context;
}
function Provider(props) {
  const { duration = 5e3, children } = props;
  return /* @__PURE__ */ jsx(Fragment, { children });
}
Provider.displayName = "Toast.Provider";
var Viewport2 = forwardRef((props, ref) => {
  const { label = "Notifications", hotkey = ["F8"], className, children, ...rest } = props;
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (hotkey.includes(event.key)) {
        ref?.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [hotkey, ref]);
  return /* @__PURE__ */ jsx(
    "ol",
    {
      ref,
      role: "region",
      "aria-label": label,
      tabIndex: -1,
      className,
      ...rest,
      children
    }
  );
});
Viewport2.displayName = "Toast.Viewport";
var Root18 = forwardRef((props, ref) => {
  const {
    open: controlledOpen,
    defaultOpen = true,
    onOpenChange,
    duration = 5e3,
    type = "foreground",
    children,
    className,
    ...rest
  } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );
  useEffect(() => {
    if (!open || duration === 0) return;
    const timer = setTimeout(() => {
      handleOpenChange(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [open, duration, handleOpenChange]);
  if (!open) return null;
  return /* @__PURE__ */ jsx(ToastContext2.Provider, { value: { open, onOpenChange: handleOpenChange, duration, type }, children: /* @__PURE__ */ jsx(
    "li",
    {
      ref,
      role: type === "foreground" ? "alert" : "status",
      "aria-live": type === "foreground" ? "assertive" : "polite",
      "aria-atomic": "true",
      "data-state": open ? "open" : "closed",
      className,
      ...rest,
      children
    }
  ) });
});
Root18.displayName = "Toast.Root";
var Title3 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Title3.displayName = "Toast.Title";
var Description4 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Description4.displayName = "Toast.Description";
var Action2 = forwardRef((props, ref) => {
  const { altText, children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("button", { ref, type: "button", "aria-label": altText, className, ...rest, children });
});
Action2.displayName = "Toast.Action";
var Close3 = forwardRef((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useToastContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(false);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-label": "Close",
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Close3.displayName = "Toast.Close";
var Toast2 = {
  Provider,
  Viewport: Viewport2,
  Root: Root18,
  Title: Title3,
  Description: Description4,
  Action: Action2,
  Close: Close3
};
var Root19 = forwardRef((props, ref) => {
  const {
    value,
    min = 0,
    max = 100,
    low,
    high,
    optimum,
    getValueLabel,
    children,
    className,
    ...rest
  } = props;
  const percentage = (value - min) / (max - min) * 100;
  const getStatus = () => {
    if (low !== void 0 && value < low) return "low";
    if (high !== void 0 && value > high) return "high";
    if (optimum !== void 0) {
      const distFromOptimum = Math.abs(value - optimum);
      const range = max - min;
      if (distFromOptimum < range * 0.1) return "optimum";
    }
    return "normal";
  };
  const valueLabel = getValueLabel ? getValueLabel(value, min, max) : `${Math.round(percentage)}%`;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "meter",
      "aria-valuenow": value,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuetext": valueLabel,
      "data-status": getStatus(),
      "data-value": percentage,
      className,
      ...rest,
      children
    }
  );
});
Root19.displayName = "Meter.Root";
var Track2 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, ...rest, children });
});
Track2.displayName = "Meter.Track";
var Indicator4 = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  return /* @__PURE__ */ jsx("div", { ref, className, style, ...rest });
});
Indicator4.displayName = "Meter.Indicator";
var Meter = {
  Root: Root19,
  Track: Track2,
  Indicator: Indicator4
};
var AccordionContext = createContext(null);
function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within Accordion.Root");
  }
  return context;
}
var AccordionItemContext = createContext(null);
function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error("AccordionItem components must be used within Accordion.Item");
  }
  return context;
}
var Root20 = forwardRef((props, ref) => {
  const {
    type = "single",
    value: controlledValue,
    defaultValue = type === "single" ? "" : [],
    collapsible = false,
    disabled = false,
    onValueChange,
    children,
    className,
    ...rest
  } = props;
  const normalizeValue = (val) => {
    if (val === void 0) return [];
    return Array.isArray(val) ? val : val ? [val] : [];
  };
  const [internalValue, setInternalValue] = useState(normalizeValue(defaultValue));
  const isControlled = controlledValue !== void 0;
  const value = isControlled ? normalizeValue(controlledValue) : internalValue;
  const handleValueChange = useCallback(
    (itemValue) => {
      let newValue;
      if (type === "single") {
        if (value.includes(itemValue)) {
          newValue = collapsible ? [] : value;
        } else {
          newValue = [itemValue];
        }
      } else {
        if (value.includes(itemValue)) {
          newValue = value.filter((v) => v !== itemValue);
        } else {
          newValue = [...value, itemValue];
        }
      }
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(type === "single" ? newValue[0] || "" : newValue);
    },
    [type, value, collapsible, isControlled, onValueChange]
  );
  return /* @__PURE__ */ jsx(
    AccordionContext.Provider,
    {
      value: {
        type,
        value,
        collapsible,
        disabled,
        onValueChange: handleValueChange
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-orientation": "vertical",
          "data-disabled": disabled || void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Root20.displayName = "Accordion.Root";
var Item8 = forwardRef((props, ref) => {
  const { value, disabled: itemDisabled, children, className, ...rest } = props;
  const context = useAccordionContext();
  const baseId = useId();
  const disabled = context.disabled || itemDisabled;
  const isOpen = context.value.includes(value);
  return /* @__PURE__ */ jsx(
    AccordionItemContext.Provider,
    {
      value: {
        value,
        triggerId: `${baseId}-trigger`,
        contentId: `${baseId}-content`,
        isOpen,
        disabled: disabled || false
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          "data-state": isOpen ? "open" : "closed",
          "data-disabled": disabled || void 0,
          className,
          ...rest,
          children
        }
      )
    }
  );
});
Item8.displayName = "Accordion.Item";
var Header = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  return /* @__PURE__ */ jsx("h3", { ref, className, ...rest, children });
});
Header.displayName = "Accordion.Header";
var Trigger10 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const accordionContext = useAccordionContext();
  const itemContext = useAccordionItemContext();
  const handleClick = useCallback(() => {
    if (!itemContext.disabled) {
      accordionContext.onValueChange(itemContext.value);
    }
  }, [accordionContext, itemContext]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      id: itemContext.triggerId,
      "aria-controls": itemContext.contentId,
      "aria-expanded": itemContext.isOpen,
      disabled: itemContext.disabled,
      "data-state": itemContext.isOpen ? "open" : "closed",
      "data-disabled": itemContext.disabled || void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Trigger10.displayName = "Accordion.Trigger";
var Content10 = forwardRef((props, ref) => {
  const { forceMount, children, className, ...rest } = props;
  const itemContext = useAccordionItemContext();
  if (!itemContext.isOpen && !forceMount) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      id: itemContext.contentId,
      role: "region",
      "aria-labelledby": itemContext.triggerId,
      hidden: !itemContext.isOpen,
      "data-state": itemContext.isOpen ? "open" : "closed",
      className,
      ...rest,
      children
    }
  );
});
Content10.displayName = "Accordion.Content";
var Accordion = {
  Root: Root20,
  Item: Item8,
  Header,
  Trigger: Trigger10,
  Content: Content10
};
var CollapsibleContext = createContext(null);
function useCollapsibleContext() {
  const context = useContext(CollapsibleContext);
  if (!context) {
    throw new Error("Collapsible components must be used within Collapsible.Root");
  }
  return context;
}
var Root21 = forwardRef((props, ref) => {
  const {
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    children,
    className,
    ...rest
  } = props;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const open = isControlled ? controlledOpen : internalOpen;
  const contentId = useId();
  const handleOpenChange = useCallback(
    (newOpen) => {
      if (disabled) return;
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [disabled, isControlled, onOpenChange]
  );
  return /* @__PURE__ */ jsx(CollapsibleContext.Provider, { value: { open, onOpenChange: handleOpenChange, disabled, contentId }, children: /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-state": open ? "open" : "closed",
      "data-disabled": disabled ? "" : void 0,
      className,
      ...rest,
      children
    }
  ) });
});
Root21.displayName = "Collapsible.Root";
var Trigger11 = forwardRef((props, ref) => {
  const { children, onClick, className, ...rest } = props;
  const context = useCollapsibleContext();
  const handleClick = useCallback(
    (event) => {
      context.onOpenChange(!context.open);
      onClick?.(event);
    },
    [context, onClick]
  );
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      "aria-expanded": context.open,
      "aria-controls": context.contentId,
      disabled: context.disabled,
      "data-state": context.open ? "open" : "closed",
      "data-disabled": context.disabled ? "" : void 0,
      onClick: handleClick,
      className,
      ...rest,
      children
    }
  );
});
Trigger11.displayName = "Collapsible.Trigger";
var Content11 = forwardRef((props, ref) => {
  const { forceMount = false, children, className, style, ...rest } = props;
  const context = useCollapsibleContext();
  if (!context.open && !forceMount) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      id: context.contentId,
      "data-state": context.open ? "open" : "closed",
      "data-disabled": context.disabled ? "" : void 0,
      hidden: !context.open,
      className,
      style,
      ...rest,
      children
    }
  );
});
Content11.displayName = "Collapsible.Content";
var Collapsible = {
  Root: Root21,
  Trigger: Trigger11,
  Content: Content11
};
var Separator4 = forwardRef((props, ref) => {
  const { orientation = "horizontal", decorative = false, className, ...rest } = props;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: decorative ? "none" : "separator",
      "aria-orientation": decorative ? void 0 : orientation,
      "data-orientation": orientation,
      className,
      ...rest
    }
  );
});
Separator4.displayName = "Separator";
var ScrollAreaContext = createContext(null);
function useScrollAreaContext() {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error("ScrollArea components must be used within ScrollArea.Root");
  }
  return context;
}
var Root22 = forwardRef((props, ref) => {
  const {
    type = "hover",
    dir = "ltr",
    scrollHideDelay = 600,
    children,
    className,
    ...rest
  } = props;
  const scrollAreaRef = useRef(null);
  const viewportRef = useRef(null);
  const [scrollbarVisible, setScrollbarVisible] = useState({ x: false, y: false });
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const [scrollSize, setScrollSize] = useState({ width: 0, height: 0 });
  const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const updateScrollInfo = () => {
      setScrollSize({
        width: viewport.scrollWidth,
        height: viewport.scrollHeight
      });
      setViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight
      });
      setScrollbarVisible({
        x: viewport.scrollWidth > viewport.clientWidth,
        y: viewport.scrollHeight > viewport.clientHeight
      });
    };
    const handleScroll = () => {
      setScrollPosition({
        x: viewport.scrollLeft,
        y: viewport.scrollTop
      });
    };
    updateScrollInfo();
    viewport.addEventListener("scroll", handleScroll);
    const resizeObserver = new ResizeObserver(updateScrollInfo);
    resizeObserver.observe(viewport);
    return () => {
      viewport.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, []);
  return /* @__PURE__ */ jsx(
    ScrollAreaContext.Provider,
    {
      value: {
        scrollAreaRef,
        viewportRef,
        scrollbarVisible,
        scrollPosition,
        scrollSize,
        viewportSize
      },
      children: /* @__PURE__ */ jsx(
        "div",
        {
          ref,
          dir,
          "data-type": type,
          className,
          style: { position: "relative", overflow: "hidden" },
          ...rest,
          children
        }
      )
    }
  );
});
Root22.displayName = "ScrollArea.Root";
var Viewport3 = forwardRef((props, ref) => {
  const { children, className, style, ...rest } = props;
  const context = useScrollAreaContext();
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: (node) => {
        context.viewportRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      className,
      style: {
        overflowX: "scroll",
        overflowY: "scroll",
        width: "100%",
        height: "100%",
        ...style
      },
      ...rest,
      children
    }
  );
});
Viewport3.displayName = "ScrollArea.Viewport";
var Scrollbar = forwardRef((props, ref) => {
  const { orientation = "vertical", children, className, style, ...rest } = props;
  const context = useScrollAreaContext();
  const isVisible = orientation === "vertical" ? context.scrollbarVisible.y : context.scrollbarVisible.x;
  if (!isVisible) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      "data-orientation": orientation,
      className,
      style: {
        position: "absolute",
        ...orientation === "vertical" ? { right: 0, top: 0, bottom: 0, width: 8 } : { bottom: 0, left: 0, right: 0, height: 8 },
        ...style
      },
      ...rest,
      children
    }
  );
});
Scrollbar.displayName = "ScrollArea.Scrollbar";
var Thumb2 = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useScrollAreaContext();
  const ratio = context.viewportSize.height / context.scrollSize.height;
  const thumbHeight = Math.max(ratio * 100, 10);
  const thumbTop = context.scrollPosition.y / context.scrollSize.height * 100;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className,
      style: {
        position: "absolute",
        width: "100%",
        borderRadius: 9999,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        top: `${thumbTop}%`,
        height: `${thumbHeight}%`,
        ...style
      },
      ...rest
    }
  );
});
Thumb2.displayName = "ScrollArea.Thumb";
var Corner = forwardRef((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useScrollAreaContext();
  if (!context.scrollbarVisible.x || !context.scrollbarVisible.y) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className,
      style: {
        position: "absolute",
        right: 0,
        bottom: 0,
        width: 8,
        height: 8,
        ...style
      },
      ...rest
    }
  );
});
Corner.displayName = "ScrollArea.Corner";
var ScrollArea = {
  Root: Root22,
  Viewport: Viewport3,
  Scrollbar,
  Thumb: Thumb2,
  Corner
};
var AvatarContext = createContext(null);
function useAvatarContext() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error("Avatar components must be used within Avatar.Root");
  }
  return context;
}
var Root23 = forwardRef((props, ref) => {
  const { children, className, ...rest } = props;
  const [imageLoadingStatus, setImageLoadingStatus] = useState("loading");
  return /* @__PURE__ */ jsx(AvatarContext.Provider, { value: { imageLoadingStatus, setImageLoadingStatus }, children: /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "data-state": imageLoadingStatus,
      className,
      ...rest,
      children
    }
  ) });
});
Root23.displayName = "Avatar.Root";
var Image = forwardRef((props, ref) => {
  const { src, alt = "", onLoadingStatusChange, className, ...rest } = props;
  const context = useAvatarContext();
  useEffect(() => {
    if (!src) {
      context.setImageLoadingStatus("error");
      return;
    }
    context.setImageLoadingStatus("loading");
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      context.setImageLoadingStatus("loaded");
      onLoadingStatusChange?.("loaded");
    };
    img.onerror = () => {
      context.setImageLoadingStatus("error");
      onLoadingStatusChange?.("error");
    };
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, context, onLoadingStatusChange]);
  if (context.imageLoadingStatus !== "loaded") {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "img",
    {
      ref,
      src,
      alt,
      className,
      ...rest
    }
  );
});
Image.displayName = "Avatar.Image";
var Fallback = forwardRef((props, ref) => {
  const { delayMs = 0, children, className, ...rest } = props;
  const context = useAvatarContext();
  const [showFallback, setShowFallback] = useState(delayMs === 0);
  useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setShowFallback(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);
  if (context.imageLoadingStatus === "loaded" || !showFallback) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      "data-state": "fallback",
      className,
      ...rest,
      children
    }
  );
});
Fallback.displayName = "Avatar.Fallback";
var Avatar2 = {
  Root: Root23,
  Image,
  Fallback
};

export { Avatar, Badge, Button2 as Button, Card, Checkbox2 as Checkbox, Dialog2 as Dialog, Input2 as Input, primitives_exports as Primitives, Progress, RadioGroup, Select2 as Select, Separator, Slider, Switch2 as Switch, Tabs, Textarea, Toast, ToastProvider, Toggle, Tooltip2 as Tooltip, useToast };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map