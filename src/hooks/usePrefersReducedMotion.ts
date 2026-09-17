'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Returns whether the environment indicates reduced motion preference.
 * @param query Media query string (defaults to prefers-reduced-motion).
 * @returns Boolean flag.
 */
export function getPrefersReducedMotion(query: string = QUERY): boolean {
  const matcher =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia
      : typeof matchMedia === 'function'
        ? matchMedia
        : null;

  if (!matcher) {
    return false;
  }

  return matcher(query).matches;
}

function subscribe(callback: () => void) {
  if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') {
    return () => {};
  }
  const mediaQuery = window.matchMedia(QUERY);
  mediaQuery.addEventListener('change', callback);
  return () => {
    mediaQuery.removeEventListener('change', callback);
  };
}

function getSnapshot() {
  return getPrefersReducedMotion();
}

function getServerSnapshot() {
  return false;
}

/**
 * Detects whether the user prefers reduced motion for accessibility and low-power performance.
 * Uses useSyncExternalStore for tear-free, SSR-safe subscription.
 * @returns Boolean indicating if reduced motion is requested.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
