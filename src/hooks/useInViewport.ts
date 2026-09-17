'use client';

import { useEffect, useState, type RefObject } from 'react';

type InViewportOptions = {
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
};

/**
 * Tracks visibility of a target element within the viewport via IntersectionObserver.
 * @param elementRef Reference to the HTML element to observe.
 * @param options Observer configurations (rootMargin, threshold, freezeOnceVisible).
 * @returns Boolean state indicating whether the element is in view.
 */
export function useInViewport(
  elementRef: RefObject<HTMLElement | null>,
  options: InViewportOptions = {},
): boolean {
  const { rootMargin = '200px', threshold = 0, freezeOnceVisible = false } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      return () => {};
    }

    // If already visible and frozen, skip observing
    if (freezeOnceVisible && isInView) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) {
          return;
        }
        const isVisible = entry.isIntersecting;
        setIsInView(isVisible);

        if (isVisible && freezeOnceVisible) {
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, rootMargin, threshold, freezeOnceVisible, isInView]);

  return isInView;
}
