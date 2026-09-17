'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ctaPolygon =
  'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)';

export function FloorplanDownloadCta() {
  const t = useTranslations('FloorplansPage');

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-24 md:px-12 md:pb-32">
      <div
        className="bg-[#D6D3C8] p-[1px] shadow-2xl"
        style={{ clipPath: ctaPolygon }}
      >
        <div
          className="relative overflow-hidden bg-[#151926] p-8 text-white sm:p-12 md:p-16"
          style={{ clipPath: ctaPolygon }}
        >
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(224,172,135,0.15)_0%,transparent_70%)]" />

          <div className="relative z-10 max-w-3xl">
            <span
              className={`text-[10px] font-bold tracking-[0.3em] text-[#E0AC87] uppercase md:text-xs ${inter.className}`}
            >
              {t('cta_badge')}
            </span>
            <h3
              className={`mt-3 text-3xl font-normal tracking-tight uppercase sm:text-4xl md:text-5xl ${playfair.className}`}
            >
              {t('cta_title')}
            </h3>
            <p className={`mt-4 text-sm leading-relaxed text-white/75 sm:text-base ${inter.className}`}>
              {t('cta_description')}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/contact"
                className="flex items-center justify-center rounded-lg border border-[#8B7043] bg-gradient-to-r from-[#8B7043] to-[#A38550] px-8 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-lg transition-all hover:brightness-110"
              >
                {t('cta_button')}
              </Link>
              <a
                href="tel:+84965355355"
                className="flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-4 text-xs font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md transition-colors hover:border-[#E0AC87] hover:text-[#E0AC87]"
              >
                <span>HOTLINE VIP:</span>
                <span className="text-[#E0AC87]">+84 (965) 355-355</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
