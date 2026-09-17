'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import type { GalleryCategory } from '@/data/gallery';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const tabPolygon =
  'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)';

type GalleryFilterProps = {
  activeCategory: GalleryCategory;
  onSelectCategory: (category: GalleryCategory) => void;
  counts: Record<GalleryCategory, number>;
};

export function GalleryFilter(props: GalleryFilterProps) {
  const t = useTranslations('GalleryPage');

  const categories: {
    id: GalleryCategory;
    label: string;
  }[] = [
    { id: 'all', label: t('tab_all') },
    { id: 'architecture', label: t('tab_architecture') },
    { id: 'interior', label: t('tab_interior') },
    { id: 'amenities', label: t('tab_amenities') },
    { id: 'lifestyle', label: t('tab_lifestyle') },
    { id: 'video', label: t('tab_video') },
  ];

  return (
    <div className="relative z-20 mx-auto w-full max-w-[1400px] px-6 pt-12 pb-8 md:px-12 md:pt-16">
      <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
        {categories.map((cat) => {
          const isActive = props.activeCategory === cat.id;
          const count = props.counts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => props.onSelectCategory(cat.id)}
              style={{ clipPath: tabPolygon }}
              className={`group relative cursor-pointer px-4 py-2.5 transition-all duration-300 md:px-6 md:py-3 ${
                isActive
                  ? 'border border-[#8B7043] bg-[#151926] text-[#E0AC87] shadow-lg shadow-[#151926]/15'
                  : 'border border-[#151926]/15 bg-white/70 text-[#151926]/75 hover:border-[#8B7043]/50 hover:bg-white hover:text-[#151926]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors md:text-xs ${inter.className} ${
                    isActive ? 'text-[#E0AC87]' : 'text-[#151926]'
                  }`}
                >
                  {cat.label}
                </span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold transition-colors ${
                    isActive ? 'bg-[#E0AC87]/20 text-[#E0AC87]' : 'bg-[#151926]/8 text-[#151926]/60'
                  }`}
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
