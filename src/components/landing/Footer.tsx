'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';

import { Link } from '@/libs/I18nNavigation';
import { LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600', '700'] });
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
});

export function Footer() {
  const t = useTranslations('Index');
  const tMenu = useTranslations('Menu');

  return (
    <footer id="contact" className="bg-textured-sand relative z-10 flex min-h-[80vh] w-full flex-col items-center justify-between overflow-hidden  px-6 py-12 text-[#F4F3ED] md:px-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="flex h-full w-full flex-grow flex-col items-center justify-between"
      >
        {/* Center Content */}
        <div className="mt-[10vh] flex w-full flex-col items-center justify-center">
          {/* Flower SVG */}
          <div className="mb-10 text-[#F4F3ED]">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 2C12 2 15 5 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 5 12 2 12 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 22C12 22 9 19 9 15C9 13 10.5 12 12 12C13.5 12 15 13 15 15C15 19 12 22 12 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M22 12C22 12 19 9 15 9C13 9 12 10.5 12 12C12 13.5 13 15 15 15C19 15 22 12 22 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2 12C2 12 5 15 9 15C11 15 12 13.5 12 12C12 10.5 11 9 9 9C5 9 2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M12 2C12 2 13.5 5 13.5 9C13.5 11 12.5 12 12 12C11.5 12 10.5 11 10.5 9C10.5 5 12 2 12 2Z"
                fill="currentColor"
                opacity="0.5"
              />
            </svg>
          </div>

          {/* Large Phone Number */}
          <h2
            className={`text-[12vw] leading-none tracking-tighter md:text-[10vw] lg:text-[8vw] ${playfair.className}`}
            style={{ transform: 'scaleY(1.3)' }}
          >
            +84 (965) 355-355 
          </h2>

          {/* Sales Office Info with External Google Maps Citation */}
          <div
            className={`mt-16 flex flex-col items-center text-center text-[9px] font-bold tracking-[0.15em] uppercase md:mt-24 md:text-[11px] ${inter.className}`}
          >
            <p className="mb-3 tracking-[0.2em]">{t('sales_office')}</p>
            <a
              href={LOCAL_BUSINESS_CONFIG.hasMap}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center transition-opacity hover:opacity-75"
              aria-label="View sales office location on Google Maps"
            >
              <p>{t('address_line_1')}</p>
              <p className="inline-flex items-center gap-1">
                <span>{t('address_line_2')}</span>
                <span className="opacity-60 text-[8px] md:text-[9px]">↗</span>
              </p>
            </a>
          </div>

          {/* Footer Navigation Links for Internal Crawlability and SEO */}
          <nav
            aria-label="Footer navigation"
            className={`mt-12 flex flex-wrap items-center justify-center gap-5 text-[9px] font-bold tracking-[0.2em] uppercase md:mt-16 md:gap-8 md:text-[10px] ${inter.className}`}
          >
            <Link href="/apartments" prefetch={false} className="transition-opacity hover:opacity-70">
              {tMenu('apartments')}
            </Link>
            <Link href="/floorplans" prefetch={false} className="transition-opacity hover:opacity-70">
              {tMenu('floorplans')}
            </Link>
            <Link href="/gallery" prefetch={false} className="transition-opacity hover:opacity-70">
              {tMenu('gallery')}
            </Link>
            <Link href="/news" prefetch={false} className="transition-opacity hover:opacity-70">
              {tMenu('news')}
            </Link>
            <Link href="/contact" prefetch={false} className="transition-opacity hover:opacity-70">
              {tMenu('contact')}
            </Link>
          </nav>
        </div>

        {/* Bottom Info Row */}
        <div
          className={`mt-32 flex w-full flex-col items-start justify-between text-[8px] font-bold tracking-widest uppercase md:mt-48 md:flex-row md:items-end md:text-[10px] ${inter.className}`}
        >
          {/* Left Side */}
          <div className="flex flex-col space-y-8 md:space-y-12">
            <div className="flex flex-col space-y-1">
              <p>{t('era_residence')}</p>
              <p>{t('all_rights_reserved')}</p>
            </div>
            <p className="cursor-pointer opacity-80 transition-opacity hover:opacity-100">
              {t('privacy_policy')}
            </p>
          </div>

          {/* Right Side */}
          <div className="mt-16 flex w-full flex-col items-start space-y-12 md:mt-0 md:w-auto md:items-end">
            <div className="mb-2 cursor-pointer opacity-80 transition-transform duration-500 hover:rotate-180 hover:opacity-100">
              {/* Reload icon SVG */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4C14.2091 4 16.2091 4.89543 17.6569 6.34315L19 7.68629M19 7.68629V4M19 7.68629H15.3137M5.34315 17.6569C6.79086 19.1046 8.79086 20 11 20C15.4183 20 19 16.4183 19 12M12 20V16.3137M5.34315 17.6569L4 16.3137M5.34315 17.6569H9.02944"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex w-full flex-row justify-between md:flex-col md:items-end md:space-y-1">
              <p className="opacity-80">{t('made_by')}</p>
              <p className="cursor-pointer transition-opacity hover:opacity-80">
                {t('DXMDVIETNAM')}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
