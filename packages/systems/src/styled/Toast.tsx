'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  type ReactNode,
  type HTMLAttributes,
} from 'react';
import { createPortal } from 'react-dom';

// ============================================================================
// Types
// ============================================================================

export interface ToastProps {
  /** Toast title */
  title: string;
  /** Toast description */
  description?: string;
  /** Toast variant */
  variant?: 'default' | 'success' | 'error' | 'warning';
  /** Duration in ms (0 = persistent) */
  duration?: number;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
  /** Close handler */
  onClose?: () => void;
}

interface ToastItem extends ToastProps {
  id: string;
}

interface ToastContextValue {
  toast: (props: ToastProps) => void;
}

// ============================================================================
// Context
// ============================================================================

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}

// ============================================================================
// Styles
// ============================================================================

const variantIconColors = {
  default: null,
  success: 'text-green-400',
  error: 'text-red-400',
  warning: 'text-amber-400',
};

const iconStyles = {
  default: null,
  success: (
    <svg className="size-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="size-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="size-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  ),
};

// ============================================================================
// Toast Item
// ============================================================================

const ToastItem = forwardRef<HTMLDivElement, ToastItem & { onRemove: () => void }>(
  ({ id, title, description, variant = 'default', duration = 5000, action, onClose, onRemove }, ref) => {
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

    return (
      <div
        ref={ref}
        role="alert"
        className={`
          relative w-full max-w-sm overflow-hidden
          bg-black p-4 rounded-xl
          border border-white/8
          before:absolute before:inset-0 before:rounded-xl before:bg-white/4 before:pointer-events-none
          shadow-lg
          animate-in slide-in-from-right-full fade-in-0 duration-200
        `}
      >
        <div className="relative z-10 flex gap-3">
          {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
          <div className="flex-1 min-w-0">
            <p className="text-[13px] leading-4 font-medium text-white/88 tracking-[0.12px]">{title}</p>
            {description && (
              <p className="mt-1 text-[10px] leading-[13px] text-white/48 tracking-[0.12px]">{description}</p>
            )}
            {action && (
              <button
                onClick={action.onClick}
                className="mt-2 text-[12px] leading-[15px] font-medium text-[#FF4502] hover:text-[#E63D00] transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 p-1 -m-1 text-white/48 hover:text-white/88 transition-colors"
            aria-label="Close"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

ToastItem.displayName = 'ToastItem';

// ============================================================================
// Toast Provider
// ============================================================================

export interface ToastProviderProps {
  children: ReactNode;
  /** Position of toasts */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export function ToastProvider({ children, position = 'bottom-right' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toast = useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...props, id }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }[position];

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {mounted &&
        createPortal(
          <div className={`fixed ${positionStyles} z-50 flex flex-col gap-2`}>
            {toasts.map((t) => (
              <ToastItem key={t.id} {...t} onRemove={() => removeToast(t.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
}

// ============================================================================
// Export
// ============================================================================

export const Toast = {
  Provider: ToastProvider,
  useToast,
};
