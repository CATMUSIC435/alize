'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';

import { Link, useRouter } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

/**
 * Renders the localized 404 error page with a 2-second countdown auto-redirect.
 * @returns 404 page React element.
 */
export default function NotFoundPage() {
  const t = useTranslations('NotFoundPage');
  const router = useRouter();
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    // Dynamically update document title on client
    if (typeof document !== 'undefined') {
      document.title = t('meta_title');
    }

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.replace('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [router, t]);

  return (
    <main
      className={`${inter.className} relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-[#081520] px-6 py-8 text-white select-none sm:px-12 sm:py-12`}
    >
      {/* Background Decorative Gradients & Glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top subtle radial glow */}
        <div className="absolute -top-48 left-1/2 h-[550px] w-[550px] -translate-x-1/2 rounded-full bg-[#E0AC87]/15 blur-[120px]" />

        {/* Center ambient glow */}
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D2D40] blur-[100px]" />

        {/* Bottom subtle ocean gradient */}
        <div className="absolute -bottom-32 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-[#E0AC87]/10 blur-[140px]" />

        {/* Fine Architectural Grid Texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      {/* Top Bar: Brand Logo */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex w-full max-w-6xl items-center justify-between"
      >
        <Link
          href="/"
          prefetch={false}
          aria-label="Alizé Residence Home"
          className="group inline-flex items-center gap-3 transition-opacity duration-300 hover:opacity-80"
        >
          <Image
            src="/logo-alize.png"
            alt="Alizé Residence"
            width={72}
            height={144}
            priority
            className="h-auto w-10 object-contain sm:w-12 md:w-14"
          />
          <div className="flex flex-col text-left">
            <span
              className={`${playfair.className} text-base font-light tracking-[0.25em] text-[#F3E8DB] sm:text-lg`}
            >
              ALIZÉ
            </span>
            <span className="text-[9px] tracking-[0.3em] text-[#E0AC87]/80 uppercase">
              Residence Da Nang
            </span>
          </div>
        </Link>

        {/* Subtle Decorative Badge */}
        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-[10px] tracking-[0.25em] text-[#E0AC87] uppercase backdrop-blur-md sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E0AC87]" />
          <span>Error 404</span>
        </div>
      </motion.header>

      {/* Center Content: 404 Hero & Countdown */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 my-auto flex w-full max-w-2xl flex-col items-center text-center"
      >
        {/* Stylized 404 Numbers */}
        <div className="relative">
          <h1
            className={`${playfair.className} bg-gradient-to-b from-[#FFF5EC] via-[#E0AC87] to-[#8C5E3D] bg-clip-text text-8xl font-extralight tracking-[0.12em] text-transparent drop-shadow-[0_10px_40px_rgba(224,172,135,0.25)] sm:text-9xl md:text-[11rem]`}
          >
            {t('code')}
          </h1>

          {/* Golden Ambient Blur behind 404 */}
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[#E0AC87]/15 blur-3xl" />
        </div>

        {/* Luxury Architectural Divider */}
        <div className="mt-2 mb-6 flex items-center justify-center gap-3 sm:mb-8">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E0AC87]/60 sm:w-20" />
          <span className="text-[9px] text-[#E0AC87]">◆</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#E0AC87]/60 sm:w-20" />
        </div>

        {/* Subtitle Badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E0AC87]/30 bg-[#E0AC87]/10 px-4 py-1.5 text-[11px] font-medium tracking-[0.24em] text-[#E0AC87] uppercase backdrop-blur-md sm:text-xs">
          {t('subtitle')}
        </div>

        {/* Main Title */}
        <h2
          className={`${playfair.className} mb-4 text-2xl font-light tracking-wide text-[#FAF8F5] sm:text-3xl md:text-4xl`}
        >
          {t('title')}
        </h2>

        {/* Description */}
        <p className="max-w-md text-sm font-light leading-relaxed text-[#C6BCB3] sm:max-w-lg sm:text-base">
          {t('description')}
        </p>

        {/* Countdown & Redirect Card */}
        <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
          {/* Circular Countdown Dial & Ticker */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center">
              {/* Outer track */}
              <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 36 36">
                <path
                  className="text-white/10"
                  strokeWidth="3"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#E0AC87] transition-all duration-1000 ease-linear"
                  strokeDasharray={`${(countdown / 2) * 100}, 100`}
                  strokeWidth="3"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              {/* Center number */}
              <span
                key={countdown}
                className={`${playfair.className} absolute text-sm font-medium text-[#E0AC87] animate-in fade-in zoom-in-75 duration-300`}
              >
                {countdown}
              </span>
            </div>

            <div className="text-left">
              <p className="text-xs font-light tracking-wider text-[#E8DDD4]">
                {t('redirecting_in', { seconds: countdown })}
              </p>
              <div className="mt-1 h-1 w-32 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full bg-gradient-to-r from-[#E0AC87] to-[#F3E8DB] transition-all duration-1000 ease-linear"
                  style={{ width: `${(countdown / 2) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Button: Return Home Now */}
          <Link
            href="/"
            prefetch={false}
            className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full border border-[#E0AC87]/50 bg-gradient-to-r from-[#E0AC87]/25 via-[#E0AC87]/15 to-[#E0AC87]/25 px-6 py-3 text-xs font-medium tracking-[0.22em] text-[#FAF6F0] shadow-[0_0_25px_rgba(224,172,135,0.15)] transition-all duration-300 hover:border-[#E0AC87] hover:bg-[#E0AC87]/35 hover:shadow-[0_0_35px_rgba(224,172,135,0.35)] active:scale-[0.98]"
          >
            <span>{t('redirect_now')}</span>
            <svg
              className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
        </div>
      </motion.div>

      {/* Bottom Brand Footer Mark */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 flex flex-col items-center gap-1 text-center"
      >
        <p className="text-[10px] tracking-[0.3em] text-white/35 uppercase sm:text-[11px]">
          Alizé Residence • Mỹ Khê Beach, Da Nang
        </p>
      </motion.footer>
    </main>
  );
}
