'use client';

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useRef,
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
} from 'react';

// ============================================================================
// Context
// ============================================================================

interface ScrollAreaContextValue {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  viewportRef: React.RefObject<HTMLDivElement | null>;
  scrollbarVisible: { x: boolean; y: boolean };
  scrollPosition: { x: number; y: number };
  scrollSize: { width: number; height: number };
  viewportSize: { width: number; height: number };
}

const ScrollAreaContext = createContext<ScrollAreaContextValue | null>(null);

function useScrollAreaContext() {
  const context = useContext(ScrollAreaContext);
  if (!context) {
    throw new Error('ScrollArea components must be used within ScrollArea.Root');
  }
  return context;
}

// ============================================================================
// Root
// ============================================================================

export interface ScrollAreaRootProps extends HTMLAttributes<HTMLDivElement> {
  /** Scrollbar visibility */
  type?: 'auto' | 'always' | 'scroll' | 'hover';
  /** Scroll direction */
  dir?: 'ltr' | 'rtl';
  /** Scroll hide delay in ms */
  scrollHideDelay?: number;
  children: ReactNode;
}

const Root = forwardRef<HTMLDivElement, ScrollAreaRootProps>((props, ref) => {
  const {
    type = 'hover',
    dir = 'ltr',
    scrollHideDelay = 600,
    children,
    className,
    ...rest
  } = props;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

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
        height: viewport.scrollHeight,
      });
      setViewportSize({
        width: viewport.clientWidth,
        height: viewport.clientHeight,
      });
      setScrollbarVisible({
        x: viewport.scrollWidth > viewport.clientWidth,
        y: viewport.scrollHeight > viewport.clientHeight,
      });
    };

    const handleScroll = () => {
      setScrollPosition({
        x: viewport.scrollLeft,
        y: viewport.scrollTop,
      });
    };

    updateScrollInfo();
    viewport.addEventListener('scroll', handleScroll);

    const resizeObserver = new ResizeObserver(updateScrollInfo);
    resizeObserver.observe(viewport);

    return () => {
      viewport.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <ScrollAreaContext.Provider
      value={{
        scrollAreaRef,
        viewportRef,
        scrollbarVisible,
        scrollPosition,
        scrollSize,
        viewportSize,
      }}
    >
      <div
        ref={ref}
        dir={dir}
        data-type={type}
        className={className}
        style={{ position: 'relative', overflow: 'hidden' }}
        {...rest}
      >
        {children}
      </div>
    </ScrollAreaContext.Provider>
  );
});

Root.displayName = 'ScrollArea.Root';

// ============================================================================
// Viewport
// ============================================================================

export interface ScrollAreaViewportProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Viewport = forwardRef<HTMLDivElement, ScrollAreaViewportProps>((props, ref) => {
  const { children, className, style, ...rest } = props;
  const context = useScrollAreaContext();

  return (
    <div
      ref={(node) => {
        (context.viewportRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
      className={className}
      style={{
        overflowX: 'scroll',
        overflowY: 'scroll',
        width: '100%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Viewport.displayName = 'ScrollArea.Viewport';

// ============================================================================
// Scrollbar
// ============================================================================

export interface ScrollAreaScrollbarProps extends HTMLAttributes<HTMLDivElement> {
  /** Scrollbar orientation */
  orientation?: 'horizontal' | 'vertical';
  children?: ReactNode;
}

const Scrollbar = forwardRef<HTMLDivElement, ScrollAreaScrollbarProps>((props, ref) => {
  const { orientation = 'vertical', children, className, style, ...rest } = props;
  const context = useScrollAreaContext();

  const isVisible =
    orientation === 'vertical' ? context.scrollbarVisible.y : context.scrollbarVisible.x;

  if (!isVisible) return null;

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={className}
      style={{
        position: 'absolute',
        ...(orientation === 'vertical'
          ? { right: 0, top: 0, bottom: 0, width: 8 }
          : { bottom: 0, left: 0, right: 0, height: 8 }),
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
});

Scrollbar.displayName = 'ScrollArea.Scrollbar';

// ============================================================================
// Thumb
// ============================================================================

export interface ScrollAreaThumbProps extends HTMLAttributes<HTMLDivElement> {}

const Thumb = forwardRef<HTMLDivElement, ScrollAreaThumbProps>((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useScrollAreaContext();

  const ratio = context.viewportSize.height / context.scrollSize.height;
  const thumbHeight = Math.max(ratio * 100, 10);
  const thumbTop = (context.scrollPosition.y / context.scrollSize.height) * 100;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        width: '100%',
        borderRadius: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        top: `${thumbTop}%`,
        height: `${thumbHeight}%`,
        ...style,
      }}
      {...rest}
    />
  );
});

Thumb.displayName = 'ScrollArea.Thumb';

// ============================================================================
// Corner
// ============================================================================

export interface ScrollAreaCornerProps extends HTMLAttributes<HTMLDivElement> {}

const Corner = forwardRef<HTMLDivElement, ScrollAreaCornerProps>((props, ref) => {
  const { className, style, ...rest } = props;
  const context = useScrollAreaContext();

  if (!context.scrollbarVisible.x || !context.scrollbarVisible.y) return null;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 8,
        height: 8,
        ...style,
      }}
      {...rest}
    />
  );
});

Corner.displayName = 'ScrollArea.Corner';

// ============================================================================
// Export
// ============================================================================

export const ScrollArea = {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
};
