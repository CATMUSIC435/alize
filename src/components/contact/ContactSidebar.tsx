'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import { Link } from '@/libs/I18nNavigation';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

/**
 * Vertical sidebar breadcrumb for the Contact page.
 */
export function ContactSidebar() {
  const t = useTranslations('ContactPage');

  return (
    <aside
      aria-label="Breadcrumb Navigation"
      className="fixed bottom-8 left-4 z-40 hidden w-8 justify-center mix-blend-difference md:bottom-12 md:left-12 md:flex"
    >
      <div
        className={`flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] whitespace-nowrap text-white/50 uppercase lg:text-[10px] ${inter.className}`}
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        <Link href="/" className="transition-colors hover:text-white">
          {t('breadcrumb_home')}
        </Link>
        <span className="rotate-90 text-white/30">/</span>
        <span className="text-white">{t('breadcrumb_contact')}</span>
      </div>
    </aside>
  );
}
