import { describe, expect, it } from 'vitest';
import enLocale from './en.json';
import viLocale from './vi.json';
import zhLocale from './zh.json';

describe('NotFoundPage translations', () => {
  const expectedKeys = [
    'meta_title',
    'meta_description',
    'code',
    'subtitle',
    'title',
    'description',
    'redirecting_in',
    'redirect_now',
  ] as const;

  describe('locale symmetry', () => {
    it('provides complete keys across vi, en, and zh locales', () => {
      for (const key of expectedKeys) {
        expect(viLocale.NotFoundPage).toHaveProperty(key);
        expect(enLocale.NotFoundPage).toHaveProperty(key);
        expect(zhLocale.NotFoundPage).toHaveProperty(key);
      }
    });

    it('interpolates seconds parameter in redirecting_in message', () => {
      expect(viLocale.NotFoundPage.redirecting_in).toContain('{seconds}');
      expect(enLocale.NotFoundPage.redirecting_in).toContain('{seconds}');
      expect(zhLocale.NotFoundPage.redirecting_in).toContain('{seconds}');
    });
  });
});
