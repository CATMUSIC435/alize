'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import type { SalesCategory, SalesKitItem } from '@/data/sales';
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

type SalesKitViewerProps = {
  items: SalesKitItem[];
};

/**
 * Interactive Sales Kit repository featuring instant ZIP downloads, category filters, and preview cards.
 * @param props Component parameters including sales kit item array.
 * @returns The SalesKitViewer component.
 */
export function SalesKitViewer(props: SalesKitViewerProps) {
  const t = useTranslations('SalesKitPage');
  const [activeCategory, setActiveCategory] = useState<SalesCategory | 'all'>('all');

  const filteredItems =
    activeCategory === 'all'
      ? props.items
      : props.items.filter((item) => item.category === activeCategory);

  const categories: { id: SalesCategory | 'all'; label: string }[] = [
    { id: 'all', label: t('filter_all') },
    { id: 'brochure', label: t('filter_brochure') },
    { id: 'pricing', label: t('filter_pricing') },
    { id: 'investment', label: t('filter_investment') },
    { id: 'specifications', label: t('filter_specifications') },
    { id: 'floorplans', label: t('filter_floorplans') },
  ];

  return (
    <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-12 md:pb-36">
      {/* Quick Download Header Hero Card */}
      <div
        className="mb-14 bg-[#D6D3C8] p-[1px] shadow-sm drop-shadow-md"
        style={{ clipPath: clipPathPolygon }}
      >
        <div
          className="flex flex-col items-center justify-between gap-6 bg-[#151926] p-8 text-[#FBF9F5] sm:p-10 md:flex-row md:gap-8 lg:p-12"
          style={{ clipPath: clipPathPolygon }}
        >
          <div className="flex items-center gap-6">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#8B7043]/40 bg-[#8B7043]/10 text-[#E0AC87] sm:flex">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
            </div>
            <div>
              <span className={`block text-[9.5px] font-bold tracking-[0.25em] text-[#E0AC87] uppercase ${inter.className}`}>
                ALL-IN-ONE PACKAGE
              </span>
              <h2 className={`mt-1 text-xl font-medium text-white uppercase sm:text-2xl ${playfair.className}`}>
                {t('quick_download_title')}
              </h2>
              <p className={`mt-1.5 text-xs text-[#FBF9F5]/75 sm:text-sm ${inter.className}`}>
                {t('quick_download_sub')}
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 border border-[#8B7043] bg-[#8B7043] px-6 py-3.5 text-[9.5px] font-bold tracking-[0.22em] text-white uppercase transition-all duration-300 hover:bg-[#9E824F] sm:text-[10px]"
            style={{
              clipPath:
                'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            <span>{t('btn_download_zip')}</span>
          </a>
        </div>
      </div>

      {/* Commercial Policy Highlights Ribbon */}
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
              {t('stat_sharing_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_sharing_val')}
            </span>
          </div>

          <div className="border-b border-[#151926]/10 pb-4 sm:border-b-0 lg:border-r lg:pr-4">
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_nights_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_nights_val')}
            </span>
          </div>

          <div className="border-b border-[#151926]/10 pb-4 sm:border-b-0 sm:border-r sm:pr-4">
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_discount_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_discount_val')}
            </span>
          </div>

          <div>
            <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
              {t('stat_loan_title')}
            </span>
            <span className={`mt-1 block text-base font-normal text-[#151926] sm:text-lg ${playfair.className}`}>
              {t('stat_loan_val')}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Category Tabs */}
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

      {/* Sales Kit Items Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-[#D6D3C8] p-[1px] drop-shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:drop-shadow-md"
            style={{ clipPath: clipPathPolygon }}
          >
            <div
              className="flex h-full flex-col justify-between bg-[#FBF9F5] p-5 sm:p-6"
              style={{ clipPath: clipPathPolygon }}
            >
              <div>
                {/* Thumbnail Preview Image with Beveled Corners */}
                <div
                  className="relative mb-5 aspect-[16/10] w-full overflow-hidden bg-[#151926]"
                  style={{
                    clipPath:
                      'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)',
                  }}
                >
                  <Image
                    src={item.previewImage}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#151926]/75 via-transparent to-transparent" />

                  {/* Format & Badge Overlays */}
                  {item.badge && (
                    <div className="absolute top-3 left-3 rounded border border-[#8B7043]/40 bg-[#151926]/90 px-2.5 py-1 text-[8px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase backdrop-blur-md">
                      {item.badge}
                    </div>
                  )}

                  <div className="absolute right-3 bottom-3 rounded bg-[#8B7043] px-2 py-0.5 text-[8.5px] font-bold tracking-wider text-white uppercase">
                    {item.fileFormat} • {item.fileSize}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`mb-2.5 text-base leading-snug font-medium text-[#151926] uppercase sm:text-lg ${playfair.className}`}
                >
                  {item.title}
                </h3>

                {/* Description */}
                <p
                  className={`mb-4 text-xs leading-relaxed text-[#151926]/75 ${inter.className}`}
                >
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="mb-5 border-t border-[#151926]/10 pt-3">
                  <ul className="space-y-1.5">
                    {item.highlights.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-[11px] leading-relaxed text-[#151926]/70"
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#8B7043]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
                <a
                  href="#contact"
                  className="flex-1 cursor-pointer border border-[#151926] bg-[#151926] py-2.5 text-center text-[9px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-[#8B7043]"
                  style={{
                    clipPath:
                      'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                  }}
                >
                  {t('btn_download_file')}
                </a>

                <Link
                  href="/contact"
                  className="cursor-pointer border border-[#8B7043]/40 bg-transparent px-3 py-2.5 text-center text-[9px] font-bold tracking-[0.18em] text-[#8B7043] uppercase transition-colors hover:bg-[#8B7043]/10"
                  style={{
                    clipPath:
                      'polygon(6px 0, calc(100% - 6px) 0, 100% 6px, 100% calc(100% - 6px), calc(100% - 6px) 100%, 6px 100%, 0 calc(100% - 6px), 0 6px)',
                  }}
                >
                  {t('btn_request_presentation')}
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Concierge Private Presentation Box */}
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
              ALIZÉ SALES CONCIERGE
            </span>
            <h3
              className={`mb-3 text-xl font-medium text-white uppercase sm:text-2xl ${playfair.className}`}
            >
              {t('cta_contact_title')}
            </h3>
            <p
              className={`text-xs leading-relaxed text-[#FBF9F5]/80 sm:text-sm ${inter.className}`}
            >
              {t('cta_contact_desc')}
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
            {t('btn_request_presentation')}
          </Link>
        </div>
      </div>
    </div>
  );
}
