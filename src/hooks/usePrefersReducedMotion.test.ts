import { describe, expect, it, vi } from 'vitest';
import { getPrefersReducedMotion, usePrefersReducedMotion } from './usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  it('exports hook function', () => {
    expect(typeof usePrefersReducedMotion).toBe('function');
  });

  describe('getPrefersReducedMotion', () => {
    it('returns false when media query does not match', () => {
      vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })));

      expect(getPrefersReducedMotion()).toBe(false);

      vi.unstubAllGlobals();
    });

    it('returns true when reduced motion is preferred', () => {
      vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
        matches: true,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })));

      expect(getPrefersReducedMotion()).toBe(true);

      vi.unstubAllGlobals();
    });
  });
});
