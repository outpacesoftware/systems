import * as react from 'react';
import { ReactNode, ButtonHTMLAttributes, HTMLAttributes } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}
interface SelectContextValue {
    /** Currently selected value */
    value: string | undefined;
    /** Whether the select is open */
    isOpen: boolean;
    /** Whether the select is disabled */
    isDisabled: boolean;
    /** Unique ID for accessibility */
    id: string;
    /** Open the select */
    open: () => void;
    /** Close the select */
    close: () => void;
    /** Toggle open state */
    toggle: () => void;
    /** Select a value */
    selectValue: (value: string) => void;
    /** Highlighted option index */
    highlightedIndex: number;
    /** Set highlighted index */
    setHighlightedIndex: (index: number) => void;
    /** Available options */
    options: SelectOption[];
    /** Register an option */
    registerOption: (option: SelectOption) => void;
}
declare function useSelectContext(): SelectContextValue;
interface SelectProviderProps {
    children: ReactNode;
    value: SelectContextValue;
}
declare function SelectProvider({ children, value }: SelectProviderProps): react_jsx_runtime.JSX.Element;

/**
 * Props for the useSelect hook
 */
interface UseSelectProps {
    /**
     * Controlled value
     */
    value?: string;
    /**
     * Default value for uncontrolled usage
     */
    defaultValue?: string;
    /**
     * Whether the select is disabled
     */
    disabled?: boolean;
    /**
     * Whether the select is required
     */
    required?: boolean;
    /**
     * Change handler
     */
    onChange?: (value: string) => void;
    /**
     * Open state change handler
     */
    onOpenChange?: (isOpen: boolean) => void;
    /**
     * Controlled open state
     */
    open?: boolean;
    /**
     * Default open state
     */
    defaultOpen?: boolean;
}
/**
 * Return type for useSelect hook
 */
interface UseSelectReturn extends SelectContextValue {
    /** Ref for the trigger element */
    triggerRef: React.RefObject<HTMLButtonElement | null>;
    /** Ref for the content element */
    contentRef: React.RefObject<HTMLDivElement | null>;
}
/**
 * useSelect - Hook for building accessible select dropdowns
 */
declare function useSelect(props?: UseSelectProps): UseSelectReturn;

interface SelectRootProps extends UseSelectProps {
    children: ReactNode;
}
/**
 * Select.Root - Container for the select dropdown
 */
declare function SelectRoot({ children, ...props }: SelectRootProps): react_jsx_runtime.JSX.Element;
interface SelectTriggerProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
    children?: ReactNode;
    className?: string;
    placeholder?: string;
}
interface SelectContentProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    className?: string;
}
interface SelectOptionProps extends HTMLAttributes<HTMLDivElement> {
    value: string;
    children: ReactNode;
    disabled?: boolean;
    className?: string;
}
declare const Select: {
    Root: typeof SelectRoot;
    Trigger: react.ForwardRefExoticComponent<SelectTriggerProps & react.RefAttributes<HTMLButtonElement>>;
    Content: react.ForwardRefExoticComponent<SelectContentProps & react.RefAttributes<HTMLDivElement>>;
    Option: react.ForwardRefExoticComponent<SelectOptionProps & react.RefAttributes<HTMLDivElement>>;
};

export { Select, type SelectContentProps, type SelectContextValue, type SelectOption, type SelectOptionProps, SelectProvider, type SelectRootProps, type SelectTriggerProps, type UseSelectProps, type UseSelectReturn, useSelect, useSelectContext };
