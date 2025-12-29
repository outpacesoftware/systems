import * as react from 'react';
import { MouseEvent, ButtonHTMLAttributes, ReactNode } from 'react';

/**
 * Props for the useButton hook
 */
interface UseButtonProps {
    /**
     * Whether the button is disabled
     * @default false
     */
    disabled?: boolean;
    /**
     * Whether the button is in a loading state
     * @default false
     */
    loading?: boolean;
    /**
     * Click handler
     */
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /**
     * Type of button
     * @default "button"
     */
    type?: 'button' | 'submit' | 'reset';
}
/**
 * Return type for useButton hook
 */
interface UseButtonReturn {
    /** Props to spread on the button element */
    buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
    /** Whether the button is currently disabled */
    isDisabled: boolean;
    /** Whether the button is in loading state */
    isLoading: boolean;
    /** Whether the button is currently pressed */
    isPressed: boolean;
}
/**
 * useButton - Hook for building accessible buttons
 *
 * Provides all the behavior and accessibility for button interactions.
 * Use this hook when you need full control over the button rendering.
 *
 * @example
 * const { buttonProps, isPressed } = useButton({
 *   onClick: () => console.log('clicked'),
 *   disabled: false
 * });
 *
 * return <button {...buttonProps}>Click me</button>;
 */
declare function useButton(props?: UseButtonProps): UseButtonReturn;

/**
 * Button variant types
 */
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
/**
 * Button size types
 */
type ButtonSize = 'sm' | 'md' | 'lg';
/**
 * Props for the Button component
 */
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>, UseButtonProps {
    /**
     * The visual variant of the button
     * @default "primary"
     */
    variant?: ButtonVariant;
    /**
     * The size of the button
     * @default "md"
     */
    size?: ButtonSize;
    /**
     * Button content
     */
    children?: ReactNode;
    /**
     * Additional CSS class names
     */
    className?: string;
}
/**
 * Button - Primary interaction trigger
 *
 * A headless button component with built-in accessibility.
 * Apply your own styles via className or style props.
 *
 * @example
 * <Button onClick={() => save()}>Save</Button>
 *
 * @example
 * <Button variant="destructive" disabled>Delete</Button>
 *
 * @see https://outpace.systems/components/button
 */
declare const Button: react.ForwardRefExoticComponent<ButtonProps & react.RefAttributes<HTMLButtonElement>>;

export { Button, type ButtonProps, type ButtonSize, type ButtonVariant, type UseButtonProps, type UseButtonReturn, useButton };
