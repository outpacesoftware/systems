'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  forwardRef,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface AvatarContextValue {
  imageLoadingStatus: 'loading' | 'loaded' | 'error';
  setImageLoadingStatus: (status: 'loading' | 'loaded' | 'error') => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

function useAvatarContext() {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('Avatar components must be used within Avatar.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface AvatarRootProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Root = forwardRef<HTMLSpanElement, AvatarRootProps>((props, ref) => {
  const { children, className, ...rest } = props;
  const [imageLoadingStatus, setImageLoadingStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  return (
    <AvatarContext.Provider value={{ imageLoadingStatus, setImageLoadingStatus }}>
      <span
        ref={ref}
        data-state={imageLoadingStatus}
        className={className}
        {...rest}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
});

Root.displayName = 'Avatar.Root';

// ============================================================================
// Image
// ============================================================================

export interface AvatarImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Image source URL */
  src?: string;
  /** Called when image fails to load */
  onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
}

const Image = forwardRef<HTMLImageElement, AvatarImageProps>((props, ref) => {
  const { src, alt = '', onLoadingStatusChange, className, ...rest } = props;
  const context = useAvatarContext();

  useEffect(() => {
    if (!src) {
      context.setImageLoadingStatus('error');
      return;
    }

    context.setImageLoadingStatus('loading');

    const img = new window.Image();
    img.src = src;

    img.onload = () => {
      context.setImageLoadingStatus('loaded');
      onLoadingStatusChange?.('loaded');
    };

    img.onerror = () => {
      context.setImageLoadingStatus('error');
      onLoadingStatusChange?.('error');
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, context, onLoadingStatusChange]);

  if (context.imageLoadingStatus !== 'loaded') {
    return null;
  }

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      {...rest}
    />
  );
});

Image.displayName = 'Avatar.Image';

// ============================================================================
// Fallback
// ============================================================================

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  /** Delay before showing fallback (ms) */
  delayMs?: number;
  children: ReactNode;
}

const Fallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>((props, ref) => {
  const { delayMs = 0, children, className, ...rest } = props;
  const context = useAvatarContext();
  const [showFallback, setShowFallback] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs > 0) {
      const timer = setTimeout(() => setShowFallback(true), delayMs);
      return () => clearTimeout(timer);
    }
  }, [delayMs]);

  if (context.imageLoadingStatus === 'loaded' || !showFallback) {
    return null;
  }

  return (
    <span
      ref={ref}
      data-state="fallback"
      className={className}
      {...rest}
    >
      {children}
    </span>
  );
});

Fallback.displayName = 'Avatar.Fallback';

// ============================================================================
// Export
// ============================================================================

export const Avatar = {
  Root,
  Image,
  Fallback,
};
