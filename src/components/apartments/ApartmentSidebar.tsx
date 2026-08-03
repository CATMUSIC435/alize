'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import { Link } from '@/libs/I18nNavigation';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export function ApartmentSidebar({ apartmentId }: { apartmentId?: string }) {
  const t = useTranslations('Index');
  const tRoot = useTranslations('RootLayout');

  return (
    <div className="fixed bottom-8 left-4 z-40 hidden w-8 justify-center mix-blend-difference md:bottom-12 md:left-12 md:flex">
      <div
        className={`flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] whitespace-nowrap text-white/50 uppercase lg:text-[10px] ${inter.className}`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <Link href="/" className="transition-colors hover:text-white">
          {tRoot('home_link')}
        </Link>
        <span className="rotate-90 text-white/30">/</span>

        {apartmentId ? (
          <>
            <Link href="/apartments" className="text-white/50 transition-colors hover:text-white">
              {t('select_apartment')}
            </Link>
            <span className="rotate-90 text-white/30">/</span>
            <span className="text-white">{apartmentId}</span>
          </>
        ) : (
          <span className="text-white">{t('select_apartment')}</span>
        )}
      </div>
    </div>
  );
}
