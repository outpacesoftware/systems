'use client';

import { forwardRef, type HTMLAttributes } from 'react';

// ============================================================================
// Types
// ============================================================================

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Visual variant */
  variant?: 'default' | 'muted';
}

// ============================================================================
// Styles
// ============================================================================

const orientationStyles = {
  horizontal: 'w-full h-px',
  vertical: 'h-full w-px',
};

const variantStyles = {
  default: 'bg-white/8',
  muted: 'bg-white/4',
};

// ============================================================================
// Component
// ============================================================================

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'default',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={`
          shrink-0
          ${orientationStyles[orientation]}
          ${variantStyles[variant]}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Separator.displayName = 'Separator';
