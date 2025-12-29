export * from './manifest';

/**
 * Common prop types used across components
 */

import type { ReactNode, HTMLAttributes } from 'react';

/**
 * Base props that all components accept
 */
export interface BaseProps {
  /** Additional CSS class names */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Props for components that can render as different elements
 */
export interface AsChildProps {
  /**
   * When true, the component will render its child instead of its own element,
   * passing all props to the child.
   */
  asChild?: boolean;
}

/**
 * Props for components with disabled state
 */
export interface DisabledProps {
  /** Whether the component is disabled */
  disabled?: boolean;
}

/**
 * Props for components with loading state
 */
export interface LoadingProps {
  /** Whether the component is in a loading state */
  loading?: boolean;
}

/**
 * Size variants
 */
export type Size = 'sm' | 'md' | 'lg';

/**
 * Common variant prop
 */
export interface VariantProps<T extends string> {
  /** The visual variant of the component */
  variant?: T;
}

/**
 * Props for components with size variants
 */
export interface SizeProps {
  /** The size of the component */
  size?: Size;
}

/**
 * Merge HTML attributes with custom props
 */
export type ComponentProps<
  E extends HTMLElement = HTMLElement,
  P = object
> = P & Omit<HTMLAttributes<E>, keyof P>;

/**
 * Slot render function type
 */
export type SlotRender<T = object> = (props: T) => ReactNode;
