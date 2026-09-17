import { describe, expect, it } from 'vitest';
import { useInViewport } from './useInViewport';

describe('useInViewport', () => {
  it('exports hook function', () => {
    expect(typeof useInViewport).toBe('function');
  });
});
