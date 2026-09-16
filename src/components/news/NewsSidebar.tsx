'use client';

import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import { Link } from '@/libs/I18nNavigation';

const inter = Inter({ subsets: ['latin'], weight: ['600', '700'] });

export function NewsSidebar(props: { category?: string; articleTitle?: string }) {
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

        {props.articleTitle ? (
          <>
            <Link href="/news" className="text-white/50 transition-colors hover:text-white">
              {t('news')}
            </Link>
            {props.category && (
              <>
                <span className="rotate-90 text-white/30">/</span>
                <span className="text-white/70">{props.category}</span>
              </>
            )}
            <span className="rotate-90 text-white/30">/</span>
            <span className="max-w-[150px] truncate text-white">{props.articleTitle}</span>
          </>
        ) : (
          <span className="text-white">{t('news')}</span>
        )}
      </div>
    </div>
  );
}
