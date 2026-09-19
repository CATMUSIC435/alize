import { describe, expect, it } from 'vitest';
import { getLocalizedSalesKit, SALES_KIT_ITEMS } from './sales';

describe('sales kit data', () => {
  describe('SALES_KIT_ITEMS', () => {
    it('contains sales kit records with formats and sizes', () => {
      expect(SALES_KIT_ITEMS.length).toBeGreaterThan(0);
      expect(SALES_KIT_ITEMS[0]?.fileFormat).toBe('PDF');
      expect(SALES_KIT_ITEMS[0]?.previewImage).toBeDefined();
    });
  });

  describe('getLocalizedSalesKit', () => {
    it('returns default Vietnamese sales items for vi locale', () => {
      const items = getLocalizedSalesKit('vi');
      expect(items[0]?.title).toContain('E-Brochure');
    });

    it('returns English localized titles for en locale', () => {
      const items = getLocalizedSalesKit('en');
      expect(items[0]?.title).toContain('Architectural Monograph');
    });

    it('returns Chinese localized titles for zh locale', () => {
      const items = getLocalizedSalesKit('zh');
      expect(items[0]?.title).toContain('超高清官方建筑画册');
    });
  });
});
