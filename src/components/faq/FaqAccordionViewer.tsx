'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState } from 'react';
import type { FaqCategory, FaqItem } from '@/data/faq';
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

type FaqAccordionViewerProps = {
  items: FaqItem[];
};

/**
 * Interactive FAQ viewer with real-time text searching, category chips, animated accordion panels, and support action cards.
 * @param props Component parameters including the FAQ items.
 * @returns The FaqAccordionViewer component.
 */
export function FaqAccordionViewer(props: FaqAccordionViewerProps) {
  const t = useTranslations('FaqPage');
  const [activeCategory, setActiveCategory] = useState<FaqCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true,
  });
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, boolean>>({});

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHelpful = (id: string) => {
    setHelpfulFeedback((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredItems = props.items.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    if (!matchesCategory) {
      return false;
    }

    if (!query) {
      return true;
    }

    const questionMatch = item.question.toLowerCase().includes(query);
    const answerMatch = item.answer.toLowerCase().includes(query);
    const pointsMatch = item.keyPoints?.some((pt) => pt.toLowerCase().includes(query)) ?? false;

    return questionMatch || answerMatch || pointsMatch;
  });

  const categories: { id: FaqCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('filter_all') },
    { id: 'legal', label: t('filter_legal') },
    { id: 'operations', label: t('filter_operations') },
    { id: 'construction', label: t('filter_construction') },
    { id: 'amenities', label: t('filter_amenities') },
    { id: 'finance', label: t('filter_finance') },
  ];

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-12 md:pb-36">
      {/* Search Input Bar */}
      <div
        className="mb-10 bg-[#D6D3C8] p-[1px] shadow-sm drop-shadow-md"
        style={{ clipPath: clipPathPolygon }}
      >
        <div
          className="flex items-center gap-4 bg-[#FBF9F5] p-4 sm:p-5"
          style={{ clipPath: clipPathPolygon }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-[#8B7043]"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('search_placeholder')}
            className={`w-full bg-transparent text-xs text-[#151926] placeholder-[#151926]/40 focus:outline-none sm:text-sm ${inter.className}`}
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="cursor-pointer text-xs font-bold tracking-wider text-[#8B7043] uppercase hover:opacity-80"
            >
              {t('btn_clear_search')}
            </button>
          )}
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

      {/* FAQ Accordion List */}
      {filteredItems.length === 0 ? (
        <div
          className="bg-[#D6D3C8] p-[1px] text-center"
          style={{ clipPath: clipPathPolygon }}
        >
          <div
            className="bg-[#FBF9F5] p-12 sm:p-16"
            style={{ clipPath: clipPathPolygon }}
          >
            <h3 className={`text-lg font-medium text-[#151926] uppercase ${playfair.className}`}>
              {t('no_results_title')}
            </h3>
            <p className={`mt-2 text-xs text-[#151926]/70 ${inter.className}`}>
              {t('no_results_desc')}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="mt-6 cursor-pointer border border-[#8B7043] bg-[#8B7043] px-5 py-2.5 text-[9.5px] font-bold tracking-[0.2em] text-white uppercase hover:bg-[#9E824F]"
            >
              {t('btn_clear_search')}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {filteredItems.map((item, idx) => {
            const isOpen = Boolean(openIds[item.id]);
            const isHelpfulSubmitted = Boolean(helpfulFeedback[item.id]);
            const itemNumber = idx + 1 < 10 ? `0${idx + 1}` : `${idx + 1}`;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="bg-[#D6D3C8] p-[1px] drop-shadow-sm transition-all duration-300"
                style={{ clipPath: clipPathPolygon }}
              >
                <div
                  className="bg-[#FBF9F5] transition-colors duration-300"
                  style={{ clipPath: clipPathPolygon }}
                >
                  {/* Accordion Header Toggle */}
                  <button
                    type="button"
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left sm:p-6 md:p-7"
                  >
                    <div className="flex items-start gap-4 sm:gap-6">
                      <span
                        className={`text-sm font-light text-[#8B7043] sm:text-base md:text-lg ${playfair.className}`}
                      >
                        {itemNumber}
                      </span>
                      <h2
                        className={`text-sm leading-snug font-medium text-[#151926] uppercase sm:text-base md:text-lg ${playfair.className}`}
                      >
                        {item.question}
                      </h2>
                    </div>

                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#151926]/15 transition-transform duration-300 sm:h-9 sm:w-9 ${
                        isOpen ? 'rotate-180 bg-[#151926] text-white' : 'text-[#151926]'
                      }`}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* Accordion Expandable Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#151926]/10 px-5 pt-4 pb-6 sm:px-7 sm:pb-7">
                          {/* Answer Body */}
                          <p
                            className={`text-xs leading-relaxed text-[#151926]/85 sm:text-[13px] md:text-sm ${inter.className}`}
                          >
                            {item.answer}
                          </p>

                          {/* Key Points Takeaway */}
                          {item.keyPoints && item.keyPoints.length > 0 && (
                            <div className="mt-4 border-l-2 border-[#8B7043] bg-[#8B7043]/5 p-4">
                              <span
                                className={`mb-2 block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}
                              >
                                {t('key_takeaways')}
                              </span>
                              <ul className="space-y-1.5">
                                {item.keyPoints.map((point, pIdx) => (
                                  <li
                                    key={pIdx}
                                    className="flex items-start gap-2 text-[11px] leading-relaxed text-[#151926]/80 sm:text-xs"
                                  >
                                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8B7043]" />
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Helpful Feedback Section */}
                          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#151926]/10 pt-3 text-[10px] tracking-wider text-[#151926]/70 uppercase">
                            <span>{t('helpful_prompt')}</span>
                            {isHelpfulSubmitted ? (
                              <span className="font-bold text-[#8B7043]">
                                ✓ {t('helpful_feedback_thanks')}
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleHelpful(item.id)}
                                className="cursor-pointer border border-[#8B7043]/30 px-3 py-1 font-bold text-[#8B7043] transition-colors hover:bg-[#8B7043] hover:text-white"
                              >
                                {t('helpful_yes')}
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Support Box */}
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
              ALIZÉ CONCIERGE HELP DESK
            </span>
            <h3
              className={`mb-3 text-xl font-medium text-white uppercase sm:text-2xl ${playfair.className}`}
            >
              {t('support_box_title')}
            </h3>
            <p
              className={`text-xs leading-relaxed text-[#FBF9F5]/80 sm:text-sm ${inter.className}`}
            >
              {t('support_box_desc')}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="tel:+84965355355"
              className="inline-flex shrink-0 items-center justify-center border border-[#8B7043] bg-[#8B7043] px-5 py-3.5 text-[9.5px] font-bold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-[#9E824F] sm:text-[10px]"
              style={{
                clipPath:
                  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              }}
            >
              {t('btn_call_hotline')}
            </a>

            <Link
              href="/contact"
              className="inline-flex shrink-0 items-center justify-center border border-white/30 bg-transparent px-5 py-3.5 text-[9.5px] font-bold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-white/10 sm:text-[10px]"
              style={{
                clipPath:
                  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
              }}
            >
              {t('btn_contact_concierge')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
