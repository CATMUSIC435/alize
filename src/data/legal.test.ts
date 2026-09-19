import { describe, expect, it } from 'vitest';
import { getLocalizedLegalDocs, LEGAL_DOCUMENTS } from './legal';

describe('legal data', () => {
  describe('LEGAL_DOCUMENTS', () => {
    it('contains valid statutory records', () => {
      expect(LEGAL_DOCUMENTS.length).toBeGreaterThan(0);
      expect(LEGAL_DOCUMENTS[0]?.id).toBe('legal-1');
      expect(LEGAL_DOCUMENTS[0]?.code).toBeDefined();
    });
  });

  describe('getLocalizedLegalDocs', () => {
    it('returns default Vietnamese documents for vi locale', () => {
      const docs = getLocalizedLegalDocs('vi');
      expect(docs[0]?.title).toContain('Giấy phép xây dựng');
    });

    it('returns English localized titles for en locale', () => {
      const docs = getLocalizedLegalDocs('en');
      expect(docs[0]?.title).toContain('Construction Permit');
      expect(docs[0]?.authority).toContain('Da Nang Department');
    });

    it('returns Chinese localized titles for zh locale', () => {
      const docs = getLocalizedLegalDocs('zh');
      expect(docs[0]?.title).toContain('施工许可证');
    });
  });
});
