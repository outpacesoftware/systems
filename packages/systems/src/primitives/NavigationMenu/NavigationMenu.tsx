'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  forwardRef,
  type HTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface NavigationMenuContextValue {
  value: string;
  onValueChange: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
}

const NavigationMenuContext = createContext<NavigationMenuContextValue | null>(null);

function useNavigationMenuContext() {
  const context = useContext(NavigationMenuContext);
  if (!context) {
    throw new Error('NavigationMenu components must be used within NavigationMenu.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface NavigationMenuRootProps extends HTMLAttributes<HTMLElement> {
  /** Currently active item */
  value?: string;
  /** Default active item */
  defaultValue?: string;
  /** Called when active item changes */
  onValueChange?: (value: string) => void;
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  children: ReactNode;
}

const Root = forwardRef<HTMLElement, NavigationMenuRootProps>((props, ref) => {
  const {
    value: controlledValue,
    defaultValue = '',
    onValueChange,
    orientation = 'horizontal',
    children,
    className,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleValueChange = useCallback(
    (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [isControlled, onValueChange]
  );

  return (
    <NavigationMenuContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
      <nav
        ref={ref}
        aria-label="Main"
        data-orientation={orientation}
        className={className}
        {...rest}
      >
        {children}
      </nav>
    </NavigationMenuContext.Provider>
  );
});

Root.displayName = 'NavigationMenu.Root';

// ============================================================================
// List
// ============================================================================

export interface NavigationMenuListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode;
}

const List = forwardRef<HTMLUListElement, NavigationMenuListProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const context = useNavigationMenuContext();

  return (
    <ul
      ref={ref}
      role="menubar"
      data-orientation={context.orientation}
      className={className}
      {...rest}
    >
      {children}
    </ul>
  );
});

List.displayName = 'NavigationMenu.List';

// ============================================================================
// Item
// ============================================================================

export interface NavigationMenuItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Value for this item */
  value?: string;
  children: ReactNode;
}

const Item = forwardRef<HTMLLIElement, NavigationMenuItemProps>((props, ref) => {
  const { value, children, className, ...rest } = props;

  return (
    <li ref={ref} role="none" className={className} {...rest}>
      {children}
    </li>
  );
});

Item.displayName = 'NavigationMenu.Item';

// ============================================================================
// Trigger
// ============================================================================

export interface NavigationMenuTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>((props, ref) => {
  const { children, className, onClick, ...rest } = props;
  const context = useNavigationMenuContext();

  return (
    <button
      ref={ref}
      type="button"
      role="menuitem"
      aria-haspopup="menu"
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
});

Trigger.displayName = 'NavigationMenu.Trigger';

// ============================================================================
// Content
// ============================================================================

export interface NavigationMenuContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, NavigationMenuContentProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} role="menu" className={className} {...rest}>
      {children}
    </div>
  );
});

Content.displayName = 'NavigationMenu.Content';

// ============================================================================
// Link
// ============================================================================

export interface NavigationMenuLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Link href */
  href: string;
  /** Whether this link is currently active */
  active?: boolean;
  children: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>((props, ref) => {
  const { href, active = false, children, className, ...rest } = props;

  return (
    <a
      ref={ref}
      href={href}
      role="menuitem"
      aria-current={active ? 'page' : undefined}
      data-active={active ? '' : undefined}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
});

Link.displayName = 'NavigationMenu.Link';

// ============================================================================
// Indicator
// ============================================================================

export interface NavigationMenuIndicatorProps extends HTMLAttributes<HTMLDivElement> {}

const Indicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>((props, ref) => {
  const { className, ...rest } = props;

  return <div ref={ref} aria-hidden="true" className={className} {...rest} />;
});

Indicator.displayName = 'NavigationMenu.Indicator';

// ============================================================================
// Viewport
// ============================================================================

export interface NavigationMenuViewportProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

const Viewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>((props, ref) => {
  const { children, className, ...rest } = props;

  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
});

Viewport.displayName = 'NavigationMenu.Viewport';

// ============================================================================
// Export
// ============================================================================

export const NavigationMenu = {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Indicator,
  Viewport,
};
