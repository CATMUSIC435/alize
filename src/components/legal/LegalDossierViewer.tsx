'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState } from 'react';
import type { LegalCategory, LegalDocument } from '@/data/legal';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

type LegalDossierViewerProps = {
  documents: LegalDocument[];
};

/**
 * Interactive viewer for statutory legal documents with categorization, modal preview, and status indicators.
 * @param props Component parameters including the document list.
 * @returns The LegalDossierViewer component.
 */
export function LegalDossierViewer(props: LegalDossierViewerProps) {
  const t = useTranslations('LegalPage');
  const [activeCategory, setActiveCategory] = useState<LegalCategory | 'all'>('all');
  const [selectedDoc, setSelectedDoc] = useState<LegalDocument | null>(null);

  const filteredDocs =
    activeCategory === 'all'
      ? props.documents
      : props.documents.filter((doc) => doc.category === activeCategory);

  const categories: { id: LegalCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('filter_all') },
    { id: 'planning', label: t('filter_planning') },
    { id: 'land', label: t('filter_land') },
    { id: 'safety', label: t('filter_safety') },
    { id: 'contract', label: t('filter_contract') },
  ];

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-12 md:pb-36">
      {/* Statutory Milestone Highlights Ribbon */}
      <div
        className="mb-14 bg-[#D6D3C8] p-[1px] shadow-sm drop-shadow-md"
        style={{ clipPath: clipPathPolygon }}
      >
        <div
          className="grid grid-cols-2 gap-6 bg-[#FBF9F5] p-6 sm:p-8 lg:grid-cols-4 lg:gap-8"
          style={{ clipPath: clipPathPolygon }}
        >
          <div className="border-b border-[#151926]/10 pb-4 sm:border-b-0 sm:border-r sm:pr-4">
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_permit_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_permit_val')}
            </span>
          </div>

          <div className="border-b border-[#151926]/10 pb-4 sm:border-b-0 lg:border-r lg:pr-4">
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_planning_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_planning_val')}
            </span>
          </div>

          <div className="border-b border-[#151926]/10 pb-4 sm:border-b-0 sm:border-r sm:pr-4">
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_fire_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_fire_val')}
            </span>
          </div>

          <div>
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_land_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_land_val')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Category Chips */}
      <div className="mb-10 flex flex-wrap items-center gap-2 sm:gap-3">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-[9px] font-bold tracking-[0.2em] uppercase transition-all duration-300 sm:text-[10px] ${
                isActive
                  ? 'bg-[#151926] text-[#FBF9F5] shadow-md'
                  : 'border border-[#151926]/20 bg-[#FBF9F5]/70 text-[#151926]/80 hover:border-[#8B7043] hover:text-[#151926]'
              }`}
              style={{
                clipPath:
                  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
        {filteredDocs.map((doc) => {
          const statusText =
            doc.status === 'certified'
              ? t('status_certified')
              : doc.status === 'active'
                ? t('status_active')
                : t('status_approved');

          return (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#D6D3C8] p-[1px] drop-shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md"
              style={{ clipPath: clipPathPolygon }}
            >
              <div
                className="flex h-full flex-col justify-between bg-[#FBF9F5] p-6 sm:p-8"
                style={{ clipPath: clipPathPolygon }}
              >
                <div>
                  {/* Top Meta: Code & Status */}
                  <div className="mb-4 flex items-center justify-between gap-3 border-b border-[#151926]/10 pb-3">
                    <span
                      className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}
                    >
                      {doc.code}
                    </span>
                    <span className="flex items-center gap-1.5 rounded-full border border-[#8B7043]/30 bg-[#8B7043]/10 px-2.5 py-0.5 text-[8px] font-bold tracking-[0.18em] text-[#8B7043] uppercase">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B7043]" />
                      {statusText}
                    </span>
                  </div>

                  {/* Document Title */}
                  <h2
                    className={`mb-3 text-lg leading-snug font-medium text-[#151926] uppercase sm:text-xl ${playfair.className}`}
                  >
                    {doc.title}
                  </h2>

                  {/* Authority & Issue Date */}
                  <div className="mb-4 space-y-1 text-[9px] tracking-[0.15em] text-[#151926]/70 uppercase sm:text-[10px]">
                    <p>
                      <span className="font-bold text-[#151926]">{t('issuing_authority')}:</span>{' '}
                      {doc.authority}
                    </p>
                    <p>
                      <span className="font-bold text-[#151926]">{t('issue_date')}:</span>{' '}
                      {doc.issueDate}
                    </p>
                  </div>

                  {/* Summary Text */}
                  <p
                    className={`mb-5 text-xs leading-relaxed text-[#151926]/80 sm:text-[13px] ${inter.className}`}
                  >
                    {doc.summary}
                  </p>

                  {/* Key Highlights */}
                  <div className="mb-6 border-t border-[#151926]/10 pt-4">
                    <span
                      className={`mb-2.5 block text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase sm:text-[9px] ${inter.className}`}
                    >
                      {t('key_highlights')}
                    </span>
                    <ul className="space-y-1.5">
                      {doc.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-[11px] leading-relaxed text-[#151926]/75 sm:text-xs"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8B7043]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(doc)}
                    className="cursor-pointer border border-[#151926]/30 bg-[#151926] px-4 py-2.5 text-[9px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#8B7043] sm:text-[10px]"
                    style={{
                      clipPath:
                        'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                    }}
                  >
                    {t('btn_view_detail')}
                  </button>

                  <a
                    href="#contact"
                    className="inline-flex cursor-pointer items-center gap-1.5 border border-[#8B7043]/40 bg-transparent px-3.5 py-2.5 text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase transition-colors hover:bg-[#8B7043]/10 sm:text-[10px]"
                    style={{
                      clipPath:
                        'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                    }}
                  >
                    <span>{t('btn_download_doc')}</span>
                    {doc.fileSize && (
                      <span className="text-[8px] opacity-70">({doc.fileSize})</span>
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Official Legal Commitment Box */}
      <div
        className="mt-16 bg-[#D6D3C8] p-[1px] shadow-sm drop-shadow-md md:mt-20"
        style={{ clipPath: clipPathPolygon }}
      >
        <div
          className="flex flex-col items-center justify-between gap-8 bg-[#151926] p-8 text-center text-[#FBF9F5] sm:p-10 md:flex-row md:text-left lg:p-12"
          style={{ clipPath: clipPathPolygon }}
        >
          <div className="max-w-3xl">
            <span
              className={`mb-2 block text-[9.5px] font-bold tracking-[0.25em] text-[#E0AC87] uppercase ${inter.className}`}
            >
              ALIZÉ RESIDENCE • TRUTH & INTEGRITY
            </span>
            <h3
              className={`mb-3 text-xl font-medium text-white uppercase sm:text-2xl ${playfair.className}`}
            >
              {t('legal_disclaimer_title')}
            </h3>
            <p
              className={`text-xs leading-relaxed text-[#FBF9F5]/80 sm:text-sm ${inter.className}`}
            >
              {t('legal_disclaimer_desc')}
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 border border-[#8B7043] bg-[#8B7043] px-6 py-3.5 text-[9.5px] font-bold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-[#9E824F] sm:text-[10px]"
            style={{
              clipPath:
                'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            {t('btn_schedule_consultation')}
          </Link>
        </div>
      </div>

      {/* Interactive Modal for Document Details */}
      <AnimatePresence>
        {selectedDoc && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDoc(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-[#D6D3C8] p-[1px] shadow-2xl"
              style={{ clipPath: clipPathPolygon }}
            >
              <div
                className="flex flex-col justify-between bg-[#FBF9F5] p-6 sm:p-10"
                style={{ clipPath: clipPathPolygon }}
              >
                {/* Header Row */}
                <div className="mb-6 flex items-start justify-between gap-4 border-b border-[#151926]/15 pb-4">
                  <div>
                    <span className="text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase">
                      {selectedDoc.code}
                    </span>
                    <h3
                      className={`mt-1 text-xl leading-snug font-medium text-[#151926] uppercase sm:text-2xl ${playfair.className}`}
                    >
                      {selectedDoc.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedDoc(null)}
                    aria-label={t('modal_close')}
                    className="cursor-pointer border border-[#151926]/20 p-2 text-[#151926] transition-colors hover:bg-[#151926] hover:text-white"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Metadata Grid */}
                <div className="mb-6 grid grid-cols-1 gap-3 rounded bg-[#EBD0B3]/20 p-4 text-[10px] tracking-[0.15em] sm:grid-cols-2">
                  <p>
                    <span className="font-bold text-[#8B7043] uppercase">
                      {t('modal_authority')}
                    </span>{' '}
                    <span className="text-[#151926]">{selectedDoc.authority}</span>
                  </p>
                  <p>
                    <span className="font-bold text-[#8B7043] uppercase">{t('modal_date')}</span>{' '}
                    <span className="text-[#151926]">{selectedDoc.issueDate}</span>
                  </p>
                </div>

                {/* Summary & Points */}
                <div className="mb-6 space-y-4">
                  <p className="text-xs leading-relaxed text-[#151926]/85 sm:text-sm">
                    {selectedDoc.summary}
                  </p>

                  <div className="border-t border-[#151926]/10 pt-4">
                    <span className="mb-2 block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase">
                      {t('key_highlights')}
                    </span>
                    <ul className="space-y-2">
                      {selectedDoc.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs leading-relaxed text-[#151926]/75"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B7043]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Official Verification Footnote */}
                <div className="mb-6 border-l-2 border-[#8B7043] bg-[#8B7043]/5 p-3 text-[10px] leading-relaxed text-[#151926]/70">
                  <p>{t('modal_official_notice')}</p>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 border-t border-[#151926]/10 pt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedDoc(null)}
                    className="cursor-pointer border border-[#151926]/20 px-5 py-2.5 text-[9.5px] font-bold tracking-[0.2em] text-[#151926] uppercase transition-colors hover:bg-[#151926]/5"
                  >
                    {t('modal_close')}
                  </button>
                  <Link
                    href="/contact"
                    className="border border-[#8B7043] bg-[#8B7043] px-5 py-2.5 text-[9.5px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#9E824F]"
                  >
                    {t('btn_schedule_consultation')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
