'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export function BookSliderSkeleton() {
  const tGallery = useTranslations('GalleryPage');

  return (
    <div className="relative flex h-[580px] w-full items-center justify-center overflow-hidden bg-transparent sm:h-[680px] md:h-[740px] lg:h-[800px]">
      {/* Soft Ambient Radial Halo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[400px] w-[550px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,112,67,0.12)_0%,transparent_70%)] blur-2xl" />
      </div>

      {/* Floating 3D Book Outline Silhouette */}
      <div className="relative z-10 flex flex-col items-center gap-5 text-center">
        {/* Book Open Spread Silhouette */}
        <div className="relative flex h-52 w-80 items-center justify-center rounded-lg border border-[#8B7043]/30 bg-[#FAF8F5]/60 shadow-xl backdrop-blur-sm sm:h-64 sm:w-[460px] md:h-72 md:w-[540px]">
          {/* Spine Crease Line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#8B7043]/30" />

          {/* Left Page Placeholder */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6">
            <div className="h-2 w-16 rounded-full bg-[#8B7043]/20 animate-pulse" />
            <div className="h-1.5 w-24 rounded-full bg-[#151926]/10 animate-pulse" />
          </div>

          {/* Right Page Placeholder */}
          <div className="flex flex-1 flex-col items-center justify-center gap-2 p-6">
            <div className="h-2 w-20 rounded-full bg-[#8B7043]/25 animate-pulse" />
            <div className="h-1.5 w-28 rounded-full bg-[#151926]/10 animate-pulse" />
          </div>

          {/* Soft Shimmer Highlight Bar */}
          <div className="pointer-events-none absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-[#8B7043]/5 to-transparent" />
        </div>

        {/* Loading Indicator Pill */}
        <div className="flex items-center gap-2.5 rounded-full border border-[#8B7043]/30 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-md">
          <span className="h-2 w-2 animate-ping rounded-full bg-[#8B7043]" />
          <span className={`text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}>
            {tGallery('book_loading')}
          </span>
        </div>
      </div>
    </div>
  );
}
