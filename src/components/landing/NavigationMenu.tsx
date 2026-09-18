'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import { useState } from 'react';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useUIStore } from '@/store/useUIStore';
import { MenuOverlay } from './MenuOverlay';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'], display: 'swap' });

const languages = ['vi', 'en', 'zh'];

export function NavigationMenu({ isDark }: { isDark?: boolean }) {
  const t = useTranslations('Index');
  const locale = useLocale();
  const pathname = usePathname();
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useUIStore((state) => state.setIsMenuOpen);
  const [isLangOpen, setIsLangOpen] = useState(false);

  return (
    <>
      <MenuOverlay />
      <div className="pointer-events-auto relative z-50 mt-0 flex flex-col items-end text-right md:mt-2">
        <div className="flex items-start gap-6 md:gap-8">
          {/* Menu and Language Switcher */}
          <div className="mt-1 flex flex-col items-end gap-3">
            {/* Custom Animated Hamburger Menu */}
            <button
              type="button"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex h-8 w-8 flex-col items-end justify-center gap-[5px] transition-opacity hover:opacity-70 focus:outline-none"
            >
              <div
                className={`h-[2px] bg-current transition-all duration-300 ${
                  isMenuOpen ? 'w-7 translate-y-[3.5px] rotate-45' : 'w-8 group-hover:w-6'
                }`}
              />
              <div
                className={`h-[2px] bg-current transition-all duration-300 ${
                  isMenuOpen ? 'w-7 -translate-y-[3.5px] -rotate-45' : 'w-6 group-hover:w-8'
                }`}
              />
            </button>

          {/* Custom Interactive Language Selector */}
          <motion.div
            className={`group mt-1 flex cursor-pointer items-center gap-2 overflow-hidden rounded-full border p-2 backdrop-blur-md transition-colors md:mt-2 md:gap-3 md:px-3 md:py-1.5 ${isDark ? 'border-[#151926]/20 bg-[#151926]/5 hover:bg-[#151926]/10' : 'border-white/20 bg-white/5 hover:bg-white/10'}`}
            initial="collapsed"
            animate={isLangOpen ? 'expanded' : 'collapsed'}
            whileHover="expanded"
            onHoverStart={() => {
              setIsLangOpen(true);
            }}
            onHoverEnd={() => {
              setIsLangOpen(false);
            }}
            onClick={() => {
              setIsLangOpen(!isLangOpen);
            }}
          >
            {/* Custom Globe SVG Icon */}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-700 ease-in-out group-hover:rotate-180"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              <path d="M2 12h20"></path>
            </svg>

            {/* Current Active Language */}
            <span className="hidden text-[9px] font-bold tracking-[0.2em] uppercase md:inline-block md:text-[10px]">
              {locale}
            </span>

            {/* Expanding Language List */}
            <motion.div
              variants={{
                collapsed: { width: 0, opacity: 0, paddingLeft: 0, marginLeft: 0 },
                expanded: { width: 'auto', opacity: 1, paddingLeft: 12, marginLeft: 4 },
              }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className={`flex items-center gap-3 overflow-hidden border-l whitespace-nowrap ${isDark ? 'border-[#151926]/20' : 'border-white/20'}`}
            >
              {languages
                .filter((l) => l !== locale)
                .map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    prefetch={false}
                    className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-50 transition-opacity hover:opacity-100 md:text-[10px]"
                  >
                    {l}
                  </Link>
                ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Links */}
        <div className="flex flex-col items-end gap-2 text-right md:gap-3">
          <Link
            href="/apartments"
            prefetch={false}
            aria-label="Select apartment"
            className={`text-xs leading-tight uppercase transition-opacity hover:opacity-70 sm:text-base md:text-[28px] md:leading-none ${playfair.className}`}
            dangerouslySetInnerHTML={{ __html: t('select_apartment').replace(' ', ' <br/> ') }}
          />
          <div className="mt-1 flex flex-col items-end gap-1">
            <Link
              href="/contact"
              prefetch={false}
              className={`text-[8px] font-bold tracking-[0.2em] uppercase transition-opacity hover:opacity-70 md:text-[9px] ${inter.className}`}
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
  );
}
