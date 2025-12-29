'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Card content */
  children: ReactNode;
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
}

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

// ============================================================================
// Styles
// ============================================================================

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

// ============================================================================
// Components
// ============================================================================

const CardRoot = forwardRef<HTMLDivElement, CardProps>(
  ({ padding = 'none', children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          relative overflow-hidden rounded-xl
          bg-black
          border border-white/8
          before:absolute before:inset-0 before:rounded-xl before:bg-white/4 before:pointer-events-none
          ${paddingStyles[padding]}
          ${className}
        `}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

CardRoot.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`flex flex-col gap-1.5 p-6 pb-0 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardHeader.displayName = 'Card.Header';

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={`text-[13px] leading-4 font-semibold text-white/88 tracking-[0.12px] ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  }
);

CardTitle.displayName = 'Card.Title';

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={`text-[10px] leading-[13px] text-white/48 tracking-[0.12px] ${className}`}
        {...props}
      >
        {children}
      </p>
    );
  }
);

CardDescription.displayName = 'Card.Description';

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div ref={ref} className={`p-6 ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'Card.Content';

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 p-6 pt-0 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'Card.Footer';

// ============================================================================
// Export
// ============================================================================

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
});
