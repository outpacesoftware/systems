'use client';

import {
  useState,
  useCallback,
  useEffect,
  useRef,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Types
// ============================================================================

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;
  /** Trigger element */
  children: ReactNode;
  /** Side to show tooltip */
  side?: 'top' | 'bottom' | 'left' | 'right';
  /** Delay before showing (ms) */
  delayDuration?: number;
  /** Whether tooltip is disabled */
  disabled?: boolean;
}

// ============================================================================
// Component
// ============================================================================

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      side = 'top',
      delayDuration = 400,
      disabled = false,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
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
        case 'top':
          top = rect.top - offset;
          left = rect.left + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + offset;
          left = rect.left + rect.width / 2;
          break;
        case 'left':
          top = rect.top + rect.height / 2;
          left = rect.left - offset;
          break;
        case 'right':
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
      top: 'bottom center',
      bottom: 'top center',
      left: 'center right',
      right: 'center left',
    }[side];

    const transform = {
      top: 'translateX(-50%) translateY(-100%)',
      bottom: 'translateX(-50%)',
      left: 'translateY(-50%) translateX(-100%)',
      right: 'translateY(-50%)',
    }[side];

    return (
      <>
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          className="inline-block"
        >
          {children}
        </div>
        {mounted && isOpen && createPortal(
          <div
            ref={ref}
            role="tooltip"
            style={{
              position: 'fixed',
              top: position.top,
              left: position.left,
              transform,
              transformOrigin,
            }}
            className="
              z-50 px-3 py-1.5
              bg-white text-black/88
              text-[12px] leading-[15px] font-medium tracking-[0.12px]
              rounded-lg shadow-xl
              animate-in fade-in-0 zoom-in-95 duration-150
            "
          >
            {content}
          </div>,
          document.body
        )}
      </>
    );
  }
);

Tooltip.displayName = 'Tooltip';
