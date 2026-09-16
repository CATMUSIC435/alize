'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { SmartVideo } from '@/components/SmartVideo';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useUIStore } from '@/store/useUIStore';

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
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

const languages = ['vi', 'en', 'zh', 'fr', 'ru'];

export function MenuOverlay() {
  const tMenu = useTranslations('Menu');
  const locale = useLocale();
  const pathname = usePathname();
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);
  const setIsMenuOpen = useUIStore((state) => state.setIsMenuOpen);

  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, setIsMenuOpen]);

  // Lock body scroll, pause Lenis, and handle Escape key when menu is active
  useEffect(() => {
    if (!isMenuOpen) {
      return () => {};
    }

    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    lenis?.stop();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const handleItemClick = (href: string) => {
    setIsMenuOpen(false);

    if (href === '/') {
      if (pathname === '/' || pathname === '') {
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.2 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    } else if (href.includes('#')) {
      const hash = href.substring(href.indexOf('#'));
      if (pathname === '/' || pathname === '') {
        setTimeout(() => {
          const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
          if (lenis) {
            lenis.scrollTo(hash, { offset: -40, duration: 1.5 });
          } else {
            const el = document.querySelector(hash);
            el?.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  const menuItems = [
    {
      id: 'home',
      href: '/',
      number: '01',
      title: tMenu('home'),
      sub: tMenu('home_sub'),
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'apartments',
      href: '/apartments',
      number: '02',
      title: tMenu('apartments'),
      sub: tMenu('apartments_sub'),
      image:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'news',
      href: '/news',
      number: '03',
      title: tMenu('news'),
      sub: tMenu('news_sub'),
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'concept',
      href: '/#concept',
      number: '04',
      title: tMenu('concept'),
      sub: tMenu('concept_sub'),
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'contact',
      href: '/#contact',
      number: '05',
      title: tMenu('contact'),
      sub: tMenu('contact_sub'),
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=85&w=1400',
    },
  ];

  const fallbackItem = {
    id: 'home',
    href: '/',
    number: '01',
    title: tMenu('home'),
    sub: tMenu('home_sub'),
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1400',
  };

  const activeItem = menuItems[hoveredIndex] ?? fallbackItem;

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          key="menu-overlay"
          data-lenis-prevent="true"
          initial={{ opacity: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }}
          animate={{
            opacity: 1,
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          exit={{
            opacity: 0,
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          className="bg-textured-sand pointer-events-auto fixed inset-0 z-[9999] flex flex-col overflow-x-hidden overflow-y-auto text-[#151926] select-none"
        >
          {/* Subtle Ambient Decorative Flowers */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <div className="absolute -top-10 -right-10 h-[60vw] max-h-[500px] w-[60vw] max-w-[500px] rotate-180 opacity-40 mix-blend-multiply filter blur-[0.5px]">
              <SmartVideo
                src="/bougainvillea-flowers_02.webm"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Decorative Flowers Watermark"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* TOP HEADER ROW - STICKY TO STAY VISIBLE ON ANY VIEWPORT HEIGHT */}
          <div className="sticky top-0 z-50 flex w-full shrink-0 items-center justify-between border-b border-[#151926]/10 bg-[#F0EBE1]/90 px-6 py-5 backdrop-blur-md sm:px-10 md:px-14 md:py-7">
            {/* Left Brand Identity */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                onClick={() => {
                  handleItemClick('/');
                }}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <div className="relative h-10 w-8 md:h-12 md:w-10">
                  <Image
                    src="/logo-alize.png"
                    alt="Alizé Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-base ${inter.className}`}
                  >
                    ALIZÉ
                  </span>
                  <span
                    className={`text-[9px] tracking-[0.3em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
                  >
                    RESIDENCE
                  </span>
                </div>
              </Link>
            </div>

            {/* Right Close Button with Magnetic Circular Border */}
            <div className="flex items-center gap-6">
              <button
                type="button"
                aria-label={tMenu('close')}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="group flex cursor-pointer items-center gap-3 text-[#151926]/75 transition-colors hover:text-[#151926] focus:outline-none"
              >
                <span
                  className={`text-[10px] font-bold tracking-[0.25em] uppercase transition-colors group-hover:text-[#8B7043] md:text-xs ${inter.className}`}
                >
                  {tMenu('close')}
                </span>
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#151926]/25 transition-all duration-300 group-hover:rotate-90 group-hover:border-[#8B7043] group-hover:bg-white/60 md:h-12 md:w-12">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#151926] transition-colors group-hover:text-[#8B7043]"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </div>
              </button>
            </div>
          </div>

          {/* MAIN MENU BODY: DUAL COLUMN MAGAZINE SPREAD */}
          <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center px-6 py-6 sm:px-10 md:px-14 lg:flex-row lg:items-center lg:gap-16 xl:gap-24">
            {/* LEFT COLUMN: LARGE NUMBERED EDITORIAL NAVIGATION (60%) */}
            <nav
              aria-label="Main Navigation"
              className="flex w-full flex-col justify-center lg:w-[60%]"
            >
              <motion.ul
                initial="initial"
                animate="animate"
                variants={{
                  animate: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.15,
                    },
                  },
                }}
                className="flex flex-col space-y-4 md:space-y-6"
              >
                {menuItems.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  return (
                    <motion.li
                      key={item.id}
                      variants={{
                        initial: { y: 40, opacity: 0 },
                        animate: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                        },
                      }}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                      }}
                      className="group relative cursor-pointer"
                    >
                      <Link
                        href={item.href}
                        onClick={() => {
                          handleItemClick(item.href);
                        }}
                        className="flex w-full flex-col items-start focus:outline-none"
                      >
                        <div className="flex items-center gap-4 transition-transform duration-500 ease-out group-hover:translate-x-3 md:gap-6">
                          {/* Number badge */}
                          <span
                            className={`text-xs font-bold tracking-[0.2em] transition-colors duration-300 md:text-sm ${
                              isHovered ? 'text-[#8B7043]' : 'text-[#151926]/35'
                            } ${inter.className}`}
                          >
                            {item.number}
                          </span>

                          {/* Animated expansion line */}
                          <span
                            className={`h-[1.5px] bg-[#8B7043] transition-all duration-500 ${
                              isHovered ? 'w-6 opacity-100 md:w-10' : 'w-0 opacity-0'
                            }`}
                          />

                          {/* Title */}
                          <h2
                            className={`text-2xl font-medium tracking-tight uppercase transition-colors duration-300 sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[62px] ${
                              isHovered ? 'text-[#8B7043]' : 'text-[#151926]'
                            } ${playfair.className}`}
                            style={{ transform: 'scaleY(1.15)', transformOrigin: 'bottom left' }}
                          >
                            {item.title}
                          </h2>
                        </div>

                        {/* Subtitle */}
                        <div
                          className={`mt-1 pl-8 transition-all duration-300 md:pl-16 ${
                            isHovered ? 'opacity-90 translate-x-3' : 'opacity-0'
                          }`}
                        >
                          <span
                            className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
                          >
                            {item.sub}
                          </span>
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </nav>

            {/* RIGHT COLUMN: DYNAMIC PREVIEW & CONTACT SPOTLIGHT (40%) */}
            <div className="mt-8 hidden w-full flex-col lg:mt-0 lg:flex lg:w-[40%]">
              <div className="w-full drop-shadow-xl filter">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="relative overflow-hidden bg-[#F4F3ED] p-6 sm:p-8"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    {/* Dynamic Preview Image */}
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden drop-shadow-md"
                      style={{ clipPath: clipPathPolygon }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeItem.id}
                          initial={{ opacity: 0, scale: 1.08 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.04 }}
                          transition={{ duration: 0.6, ease: 'easeOut' }}
                          className="relative h-full w-full"
                        >
                          <Image
                            src={activeItem.image}
                            alt={activeItem.title}
                            fill
                            priority
                            sizes="(max-width: 1200px) 40vw, 30vw"
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#151926]/85 via-[#151926]/20 to-transparent" />
                        </motion.div>
                      </AnimatePresence>

                      {/* Gold Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-[#8B7043]/40 bg-[#151926]/90 px-3 py-1 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E0AC87]" />
                        <span
                          className={`text-[8px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[9px] ${inter.className}`}
                        >
                          {tMenu('tagline')}
                        </span>
                      </div>

                      {/* Dynamic caption inside preview */}
                      <div className="absolute right-4 bottom-4 left-4 z-10">
                        <span
                          className={`block text-[8px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[9px] ${inter.className}`}
                        >
                          {activeItem.number} / 05
                        </span>
                        <h3
                          className={`text-lg font-medium text-white uppercase sm:text-xl ${playfair.className}`}
                        >
                          {activeItem.title}
                        </h3>
                      </div>
                    </div>

                    {/* Direct Concierge Contact Row */}
                    <div className="mt-6 flex flex-col space-y-4 border-t border-[#151926]/10 pt-6">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`text-[9px] tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}
                        >
                          {tMenu('inquiry')}
                        </span>
                        <a
                          href="tel:+84901234567"
                          className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] transition-colors hover:text-[#151926] ${inter.className}`}
                        >
                          +84 (0) 90 123 4567
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`text-[9px] tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}
                        >
                          {tMenu('email')}
                        </span>
                        <a
                          href="mailto:contact@alize-residence.com"
                          className={`text-[10px] font-bold tracking-[0.15em] text-[#151926]/80 transition-colors hover:text-[#8B7043] ${inter.className}`}
                        >
                          contact@alize-residence.com
                        </a>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span
                          className={`shrink-0 text-[9px] tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}
                        >
                          {tMenu('location_label')}
                        </span>
                        <a
                          href="https://maps.google.com/?q=My+Khe+Beach+Da+Nang"
                          target="_blank"
                          rel="noreferrer"
                          className={`text-right text-[10px] tracking-[0.1em] text-[#151926]/80 transition-colors hover:text-[#8B7043] ${inter.className}`}
                        >
                          {tMenu('address')}
                        </a>
                      </div>

                      {/* Language Selector Inside Menu */}
                      <div className="mt-4 flex items-center justify-between border-t border-[#151926]/10 pt-4">
                        <span
                          className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}
                        >
                          {tMenu('language')}
                        </span>
                        <div className="flex items-center gap-2">
                          {languages.map((l) => {
                            const isActive = l === locale;
                            return (
                              <Link
                                key={l}
                                href={pathname}
                                locale={l}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                }}
                                className={`cursor-pointer px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] uppercase transition-all ${
                                  isActive
                                    ? 'border border-[#8B7043] bg-[#8B7043] text-white shadow-sm'
                                    : 'border border-[#151926]/15 bg-white/50 text-[#151926]/70 hover:border-[#151926] hover:text-[#151926]'
                                } ${inter.className}`}
                                style={{ clipPath: dropdownClip }}
                              >
                                {l}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM FOOTER BAR */}
          <div className="relative z-10 flex w-full shrink-0 flex-col items-center justify-between gap-4 border-t border-[#151926]/10 bg-[#F0EBE1]/70 px-6 py-4 text-center backdrop-blur-sm sm:px-10 md:flex-row md:px-14 md:py-6 md:text-left">
            {/* Coordinates */}
            <div
              className={`text-[9px] font-bold tracking-[0.25em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
            >
              16°03&apos;32.6&quot;N 108°14&apos;45.2&quot;E — ESTEPONA • ĐÀ NẴNG 2026
            </div>

            {/* Social & Direct Links */}
            <div
              className={`flex items-center gap-6 text-[9px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase md:gap-8 md:text-[10px] ${inter.className}`}
            >
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#8B7043]"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#8B7043]"
              >
                Facebook
              </a>
              <Link
                href="/apartments"
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="font-bold text-[#8B7043] transition-colors hover:text-[#151926]"
              >
                Residences
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
