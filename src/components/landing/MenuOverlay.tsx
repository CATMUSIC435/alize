'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, usePathname } from '@/libs/I18nNavigation';
import { useUIStore } from '@/store/useUIStore';
import { inter, playfair } from '@/utils/Fonts';
import { RollingNavText } from './RevealText';

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

const languages = ['vi', 'en', 'zh'];

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
    return () => {
      document.body.style.overflow = '';
      const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
      lenis?.start();
    };
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

    const lenis = (window as unknown as { __lenis?: { stop: () => void } }).__lenis;
    lenis?.stop();

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  const handleItemClick = (href: string) => {
    setIsMenuOpen(false);

    if (href === '/') {
      if (pathname === '/' || pathname === '') {
        const heroVideo = typeof document !== 'undefined'
          ? (document.querySelector('video[src*="Continuum"]') as HTMLVideoElement | null)
          : null;
        if (heroVideo) {
          heroVideo.muted = true;
          heroVideo.play().catch(() => {});
        }
        const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(0, { duration: 1.0 });
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
      id: 'floorplans',
      href: '/floorplans',
      number: '03',
      title: tMenu('floorplans'),
      sub: tMenu('floorplans_sub'),
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'gallery',
      href: '/gallery',
      number: '04',
      title: tMenu('gallery'),
      sub: tMenu('gallery_sub'),
      image:
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'news',
      href: '/news',
      number: '05',
      title: tMenu('news'),
      sub: tMenu('news_sub'),
      image:
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'legal',
      href: '/legal',
      number: '06',
      title: tMenu('legal'),
      sub: tMenu('legal_sub'),
      image:
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=85&w=1400',
    },
    {
      id: 'contact',
      href: '/contact',
      number: '07',
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
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = '';
        const lenis = (window as unknown as { __lenis?: { start: () => void } }).__lenis;
        lenis?.start();
      }}
    >
      {isMenuOpen && (
        <motion.div
          key="menu-overlay"
          data-lenis-prevent="true"
          initial={{ y: '-140%' }}
          animate={{
            y: '0%',
            transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{
            y: '-140%',
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          }}
          style={{ willChange: 'transform' }}
          className="bg-textured-sand pointer-events-auto fixed inset-0 z-[9999] text-[#151926] select-none"
        >
          {/* Leading SVG Wave Lines Curtain - 100% GPU-accelerated horizontal flow with 0% CPU overhead */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-30 w-full translate-y-[96%] overflow-visible leading-none">
            <div className="relative h-20 w-full overflow-hidden sm:h-28 md:h-32">
              <motion.div
                className="flex w-[200%] shrink-0"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                style={{ willChange: 'transform' }}
              >
                <svg
                  viewBox="0 0 2880 140"
                  fill="none"
                  preserveAspectRatio="none"
                  className="h-20 w-full sm:h-28 md:h-32"
                >
                  {/* Seamless Sand Wave Body spanning 2 cycles */}
                  <path
                    d="M 0,0 L 2880,0 L 2880,45 C 2640,10 2400,95 2160,55 C 1920,10 1680,95 1440,45 C 1200,10 960,95 720,55 C 480,10 240,95 0,45 Z"
                    fill="#F0EBE1"
                  />

                  {/* Primary Gold Undulating Wave Line */}
                  <path
                    d="M 0,45 C 240,95 480,10 720,55 C 960,95 1200,10 1440,45 C 1680,95 1920,10 2160,55 C 2400,95 2640,10 2880,45"
                    stroke="#8B7043"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Secondary Champagne Dashed Wave Line */}
                  <path
                    d="M 0,65 C 260,110 520,30 780,72 C 1040,115 1260,35 1440,65 C 1700,110 1960,30 2220,72 C 2480,115 2700,35 2880,65"
                    stroke="#E0AC87"
                    strokeWidth="1.8"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                  />

                  {/* Tertiary Delicate Floating Wave Line */}
                  <path
                    d="M 0,85 C 220,50 460,120 700,80 C 940,45 1180,115 1440,85 C 1660,50 1900,120 2140,80 C 2380,45 2620,115 2880,85"
                    stroke="#8B7043"
                    strokeWidth="1.2"
                    strokeOpacity="0.5"
                  />

                  {/* Quaternary Soft Foam Ripple Wave Line */}
                  <path
                    d="M 0,105 C 280,135 560,75 840,110 C 1120,70 1300,130 1440,105 C 1720,135 2000,75 2280,110 C 2560,70 2740,130 2880,105"
                    stroke="#E0AC87"
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    strokeDasharray="4 6"
                  />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Subtle Ambient Undulating Ocean Wave Lines in Menu Background */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-25 select-none">
            <svg
              viewBox="0 0 1440 900"
              fill="none"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M 0,220 C 360,160 720,300 1080,220 C 1260,180 1380,240 1440,210"
                stroke="#8B7043"
                strokeWidth="1.5"
                strokeDasharray="4 8"
              />
              <path
                d="M 0,520 C 320,590 680,450 1020,530 C 1240,580 1360,500 1440,540"
                stroke="#E0AC87"
                strokeWidth="1.2"
              />
              <path
                d="M 0,780 C 400,720 800,840 1150,760 C 1300,730 1400,790 1440,770"
                stroke="#8B7043"
                strokeWidth="1"
                strokeOpacity="0.4"
              />
            </svg>
          </div>

          {/* Inner Content Container - Viewport fitted on desktop, cleanly scrollable on compact devices */}
          <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-x-hidden overflow-y-auto">
            {/* TOP HEADER ROW - STICKY TO STAY VISIBLE ON ANY VIEWPORT HEIGHT */}
            <div className="sticky top-0 z-50 flex w-full shrink-0 items-center justify-between border-b border-[#151926]/10 bg-[#F0EBE1] px-6 py-3.5 sm:px-10 md:px-14 lg:py-4">
            {/* Left Brand Identity */}
            <div className="flex items-center gap-4">
              <Link
                href="/"
                prefetch={false}
                onClick={() => {
                  handleItemClick('/');
                }}
                className="flex items-center gap-3 transition-opacity hover:opacity-80"
              >
                <div className="relative h-8 w-7 md:h-10 md:w-8">
                  <Image
                    src="/logo-alize.png"
                    alt="Alizé Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-sm ${inter.className}`}
                  >
                    ALIZÉ
                  </span>
                  <span
                    className={`text-[8px] tracking-[0.3em] text-[#151926]/50 uppercase md:text-[9px] ${inter.className}`}
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
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-[#151926]/25 transition-all duration-300 group-hover:rotate-90 group-hover:border-[#8B7043] group-hover:bg-white/60 md:h-10 md:w-10">
                  <svg
                    width="15"
                    height="15"
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
          <div className="relative z-10 mx-auto flex w-full max-w-[1550px] flex-1 flex-col justify-center px-6 py-4 sm:px-10 md:px-14 lg:flex-row lg:items-center lg:gap-12 xl:gap-20 2xl:gap-24">
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
                      staggerChildren: 0.05,
                      delayChildren: 0.22,
                    },
                  },
                }}
                className="flex flex-col space-y-2.5 sm:space-y-3 md:space-y-3 lg:space-y-3.5 xl:space-y-4"
              >
                {menuItems.map((item, index) => {
                  const isHovered = hoveredIndex === index;
                  return (
                    <motion.li
                      key={item.id}
                      variants={{
                        initial: { y: 20, opacity: 0 },
                        animate: {
                          y: 0,
                          opacity: 1,
                          transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        },
                      }}
                      onMouseEnter={() => {
                        setHoveredIndex(index);
                      }}
                      className="group relative cursor-pointer"
                    >
                      <Link
                        href={item.href}
                        prefetch={false}
                        onClick={() => {
                          handleItemClick(item.href);
                        }}
                        className="flex w-full flex-col items-start focus:outline-none"
                      >
                        <div className="flex items-center gap-3.5 transition-transform duration-500 ease-out group-hover:translate-x-2 md:gap-5">
                          {/* Number badge */}
                          <span
                            className={`text-xs font-bold tracking-[0.2em] transition-colors duration-300 md:text-xs lg:text-sm ${
                              isHovered ? 'text-[#8B7043]' : 'text-[#151926]/35'
                            } ${inter.className}`}
                          >
                            {item.number}
                          </span>

                          {/* Animated SVG Wave Ripple Indicator */}
                          <div
                            className={`flex items-center overflow-hidden transition-all duration-500 ease-out ${
                              isHovered ? 'w-6 opacity-100 md:w-9' : 'w-0 opacity-0'
                            }`}
                          >
                            <svg
                              viewBox="0 0 36 10"
                              fill="none"
                              className="h-2.5 w-6 shrink-0 text-[#8B7043] md:w-9"
                            >
                              <path
                                d="M 0,5 C 4.5,1 9,9 13.5,5 C 18,1 22.5,9 27,5 C 31.5,1 36,9 40,5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>

                          {/* Title */}
                          <h2
                            className={`text-xl font-medium tracking-tight uppercase transition-colors duration-300 sm:text-2xl md:text-3xl lg:text-[32px] xl:text-[38px] 2xl:text-[44px] ${
                              isHovered ? 'text-[#8B7043]' : 'text-[#151926]'
                            } ${playfair.className}`}
                          >
                            <RollingNavText text={item.title} isHovered={isHovered} />
                          </h2>
                        </div>

                        {/* Subtitle */}
                        <div
                          className={`mt-0.5 pl-6 transition-all duration-300 md:pl-10 ${
                            isHovered ? 'opacity-90 translate-x-2' : 'opacity-0'
                          }`}
                        >
                          <span
                            className={`text-[8.5px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[9.5px] ${inter.className}`}
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

            {/* RIGHT COLUMN: DYNAMIC PREVIEW & CONTACT SPOTLIGHT (36%) */}
            <div className="mt-6 hidden w-full flex-col lg:mt-0 lg:flex lg:w-[38%] xl:w-[36%]">
              <div className="w-full">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="relative overflow-hidden bg-[#F4F3ED] p-5 sm:p-6 lg:p-5 xl:p-6"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    {/* Dynamic Preview Image */}
                    <div
                      className="relative aspect-[16/9.5] w-full overflow-hidden"
                      style={{ clipPath: clipPathPolygon }}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeItem.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="relative h-full w-full"
                        >
                          <Image
                            src={activeItem.image}
                            alt={activeItem.title}
                            fill
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
                          {activeItem.number} / {menuItems.length.toString().padStart(2, '0')}
                        </span>
                        <h3
                          className={`text-base font-medium text-white uppercase sm:text-lg ${playfair.className}`}
                        >
                          {activeItem.title}
                        </h3>
                      </div>
                    </div>

                    {/* Direct Concierge Contact Row */}
                    <div className="mt-4 flex flex-col space-y-2.5 border-t border-[#151926]/10 pt-3.5">
                      <div className="flex items-center justify-between text-xs">
                        <span
                          className={`text-[9px] tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}
                        >
                          {tMenu('inquiry')}
                        </span>
                        <a
                          href="tel:+84965355355"
                          className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] transition-colors hover:text-[#151926] ${inter.className}`}
                        >
                          +84 (965) 355-355
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

                      <div className="flex items-center justify-between text-xs pt-0.5">
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
                      <div className="mt-3 flex items-center justify-between border-t border-[#151926]/10 pt-3">
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
                                prefetch={false}
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
          <div className="relative z-10 flex w-full shrink-0 flex-col items-center justify-between gap-3 border-t border-[#151926]/10 bg-[#F0EBE1]/70 px-6 py-3 text-center backdrop-blur-sm sm:px-10 md:flex-row md:px-14 md:py-3.5 md:text-left">
            {/* Coordinates */}
            <div
              className={`text-[8.5px] font-bold tracking-[0.25em] text-[#151926]/50 uppercase md:text-[9.5px] ${inter.className}`}
            >
              16°03&apos;42.1&quot;N 108°14&apos;36.6&quot;E — MỸ KHÊ • ĐÀ NẴNG
            </div>

            {/* Social & Direct Links */}
            <div
              className={`flex items-center gap-6 text-[8.5px] font-bold tracking-[0.2em] text-[#151926]/70 uppercase md:gap-8 md:text-[9.5px] ${inter.className}`}
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
                prefetch={false}
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="font-bold text-[#8B7043] transition-colors hover:text-[#151926]"
              >
                Residences
              </Link>
            </div>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
