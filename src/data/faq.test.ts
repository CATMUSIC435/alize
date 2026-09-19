import { describe, expect, it } from 'vitest';
import { FAQ_ITEMS, getLocalizedFaqItems } from './faq';

describe('faq data', () => {
  describe('FAQ_ITEMS', () => {
    it('contains FAQ entries across categories', () => {
      expect(FAQ_ITEMS.length).toBeGreaterThan(0);
      expect(FAQ_ITEMS[0]?.category).toBe('legal');
      expect(FAQ_ITEMS[0]?.question).toBeDefined();
    });
  });

  describe('getLocalizedFaqItems', () => {
    it('returns default Vietnamese FAQ entries for vi locale', () => {
      const items = getLocalizedFaqItems('vi');
      expect(items[0]?.question).toContain('Condotel');
    });

    it('returns English localized questions for en locale', () => {
      const items = getLocalizedFaqItems('en');
      expect(items[0]?.question).toContain('ownership tenure');
    });

    it('returns Chinese localized questions for zh locale', () => {
      const items = getLocalizedFaqItems('zh');
      expect(items[0]?.question).toContain('产权年限');
    });
  });
});
