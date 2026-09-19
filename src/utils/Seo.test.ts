import { describe, expect, it } from 'vitest';
import {
  getI18nAlternates,
  getLocalizedKeywords,
  getLocalBusinessJsonLd,
  getOpenGraphLocales,
  LOCAL_BUSINESS_CONFIG,
} from './Seo';

describe('Seo utility', () => {
  describe('getI18nAlternates', () => {
    it('returns canonical and multilingual alternates for root path', () => {
      const alternates = getI18nAlternates('', 'vi');

      expect(alternates.canonical).toContain('http');
      expect(alternates.languages.vi).toBeDefined();
      expect(alternates.languages.en).toContain('/en');
      expect(alternates.languages.zh).toContain('/zh');
      expect(alternates.languages['x-default']).toBeDefined();
    });

    it('normalizes slash path identically to empty root path', () => {
      const fromEmpty = getI18nAlternates('', 'vi');
      const fromSlash = getI18nAlternates('/', 'vi');

      expect(fromSlash.canonical).toBe(fromEmpty.canonical);
      expect(fromSlash.languages.zh).toBe(fromEmpty.languages.zh);
    });

    it('returns canonical and multilingual alternates for subpage', () => {
      const alternates = getI18nAlternates('/apartments', 'en');

      expect(alternates.canonical).toContain('/en/apartments');
      expect(alternates.languages.vi).toContain('/apartments');
      expect(alternates.languages.en).toContain('/en/apartments');
      expect(alternates.languages.zh).toContain('/zh/apartments');
    });
  });

  describe('getOpenGraphLocales', () => {
    it('returns vi_VN and alternate locales for Vietnamese', () => {
      const og = getOpenGraphLocales('vi');

      expect(og.locale).toBe('vi_VN');
      expect(og.alternateLocale).toContain('en_US');
      expect(og.alternateLocale).toContain('zh_CN');
      expect(og.alternateLocale).not.toContain('vi_VN');
    });

    it('returns en_US and alternate locales for English', () => {
      const og = getOpenGraphLocales('en');

      expect(og.locale).toBe('en_US');
      expect(og.alternateLocale).toContain('vi_VN');
      expect(og.alternateLocale).toContain('zh_CN');
    });

    it('returns zh_CN and alternate locales for Chinese', () => {
      const og = getOpenGraphLocales('zh');

      expect(og.locale).toBe('zh_CN');
      expect(og.alternateLocale).toContain('vi_VN');
      expect(og.alternateLocale).toContain('en_US');
    });
  });

  describe('getLocalizedKeywords', () => {
    it('returns Vietnamese keywords for home page', () => {
      const keywords = getLocalizedKeywords('home', 'vi');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords).toContain('Alizé Residence');
    });

    it('returns Chinese keywords for apartments page', () => {
      const keywords = getLocalizedKeywords('apartments', 'zh');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('公寓'))).toBe(true);
    });

    it('returns Vietnamese keywords for legal page', () => {
      const keywords = getLocalizedKeywords('legal', 'vi');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('Pháp lý'))).toBe(true);
    });

    it('returns English keywords for sales page', () => {
      const keywords = getLocalizedKeywords('sales', 'en');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('sales kit'))).toBe(true);
    });

    it('returns Chinese keywords for faq page', () => {
      const keywords = getLocalizedKeywords('faq', 'zh');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('FAQ'))).toBe(true);
    });

    it('returns Vietnamese keywords for privacy page', () => {
      const keywords = getLocalizedKeywords('privacy', 'vi');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('bảo mật'))).toBe(true);
    });

    it('returns English keywords for terms page', () => {
      const keywords = getLocalizedKeywords('terms', 'en');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('terms of use'))).toBe(true);
    });

    it('returns Chinese keywords for regulations page', () => {
      const keywords = getLocalizedKeywords('regulations', 'zh');

      expect(keywords.length).toBeGreaterThan(0);
      expect(keywords.some((kw) => kw.includes('管理规约'))).toBe(true);
    });
  });

  describe('LOCAL_BUSINESS_CONFIG', () => {
    it('defines canonical NAP data for Da Nang location', () => {
      expect(LOCAL_BUSINESS_CONFIG.telephone).toBe('+84965355355');
      expect(LOCAL_BUSINESS_CONFIG.geo.latitude).toBe(16.0617);
      expect(LOCAL_BUSINESS_CONFIG.geo.longitude).toBe(108.2435);
      expect(LOCAL_BUSINESS_CONFIG.address.addressLocality).toBe('Sơn Trà');
      expect(LOCAL_BUSINESS_CONFIG.address.addressRegion).toBe('Đà Nẵng');
      expect(LOCAL_BUSINESS_CONFIG.hasMap).toContain('16.0617,108.2435');
    });
  });

  describe('getLocalBusinessJsonLd', () => {
    it('generates complete ApartmentComplex structured data', () => {
      const jsonLd = getLocalBusinessJsonLd('vi');

      expect(jsonLd['@type']).toBe('ApartmentComplex');
      expect(jsonLd.name).toBe(LOCAL_BUSINESS_CONFIG.name);
      expect(jsonLd.telephone).toBe('+84965355355');
      expect(jsonLd.geo.latitude).toBe(16.0617);
      expect(jsonLd.hasMap).toBeDefined();
      expect(jsonLd.openingHoursSpecification).toHaveLength(1);
    });
  });
});
