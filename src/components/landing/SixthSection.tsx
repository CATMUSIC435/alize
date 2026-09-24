'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Link } from '@/libs/I18nNavigation';
import { inter, playfair } from '@/utils/Fonts';
import { LazyWebGLSlider } from './LazyWebGLSlider';

const SLIDE_IMAGES = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1200&auto=format&fit=crop',
];

// Era Residence Custom Curves: Out [0.25, 1, 0.5, 1], In [0.5, 0, 0.75, 0]
const EASE_OUT = [0.25, 1, 0.5, 1] as const;
const EASE_IN = [0.5, 0, 0.75, 0] as const;

export function SixthSection() {
  const t = useTranslations('Index');
  const [mobileEmblaRef, mobileEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const slides = [
    {
      bedrooms: '3',
      area: '178 — 202 M²',
      image: SLIDE_IMAGES[0]!,
      description: t('slide_1_desc'),
      buttonText: t('slide_1_btn'),
      title: t('slide_1_title'),
    },
    {
      bedrooms: '2-3',
      area: '124 — 243 M²',
      image: SLIDE_IMAGES[1]!,
      description: t('slide_2_desc'),
      buttonText: t('slide_2_btn'),
      title: t('slide_2_title'),
    },
    {
      bedrooms: '4',
      area: '250 — 300 M²',
      image: SLIDE_IMAGES[2]!,
      description: t('slide_3_desc'),
      buttonText: t('slide_3_btn'),
      title: t('slide_3_title'),
    },
  ];

  const handleNext = () => {
    setSelectedIndex((curr) => {
      const next = curr === slides.length - 1 ? 0 : curr + 1;
      mobileEmblaApi?.scrollTo(next);
      return next;
    });
    setProgressKey((k) => k + 1);
  };

  const handlePrev = () => {
    setSelectedIndex((curr) => {
      const prev = curr === 0 ? slides.length - 1 : curr - 1;
      mobileEmblaApi?.scrollTo(prev);
      return prev;
    });
    setProgressKey((k) => k + 1);
  };

  const handleSelect = (index: number) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    mobileEmblaApi?.scrollTo(index);
    setProgressKey((k) => k + 1);
  };

  const scrollPrev = handlePrev;
  const scrollNext = handleNext;
  const scrollTo = handleSelect;

  // IntersectionObserver to pause auto-play when out of view (threshold 0.15)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPaused(!entry?.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, []);

  // Visibility change to pause auto-play when tab is inactive
  useEffect(() => {
    const onVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  const isScrollingRef = useRef(false);

  // Mark scrolling active so auto-play transition waits until scrolling settles without causing React re-renders
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout> | null = null;
    const onScroll = () => {
      isScrollingRef.current = true;
      if (scrollTimer) clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrollingRef.current = false;
      }, 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, []);

  // 6-second auto-play timer (matching Era Residence autoDuration: 6)
  useEffect(() => {
    if (isPaused) return;
    const timer = setTimeout(() => {
      if (!isScrollingRef.current) {
        handleNext();
      } else {
        setProgressKey((k) => k + 1);
      }
    }, 6000);
    return () => {
      clearTimeout(timer);
    };
  }, [selectedIndex, isPaused, progressKey]);

  // Sync mobile swipe events to selectedIndex
  useEffect(() => {
    if (!mobileEmblaApi) return;
    const onSelect = () => {
      const newIdx = mobileEmblaApi.selectedScrollSnap();
      setSelectedIndex((curr) => {
        if (curr !== newIdx) {
          setProgressKey((k) => k + 1);
          return newIdx;
        }
        return curr;
      });
    };
    mobileEmblaApi.on('select', onSelect);
    mobileEmblaApi.on('reInit', onSelect);
    return () => {
      mobileEmblaApi.off('select', onSelect);
      mobileEmblaApi.off('reInit', onSelect);
    };
  }, [mobileEmblaApi]);


  // Left Column Specifications Animation (starts after image wipe is well underway)
  const specsVariants: Variants = {
    initial: { opacity: 0, y: 25 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.45, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.25, ease: EASE_IN },
    },
  };

  // Right Column Description & Button Animation
  const descVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.5, ease: EASE_OUT },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: { duration: 0.25, ease: EASE_IN },
    },
  };

  // Title 3D Character Flip Animation (starts at 0.45s with smooth stagger)
  const charVariants: Variants = {
    initial: { opacity: 0, y: 30, rotateY: 85 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.7,
        delay: 0.45 + i * 0.02,
        ease: EASE_OUT,
      },
    }),
    exit: {
      opacity: 0,
      y: -15,
      rotateY: -35,
      transition: {
        duration: 0.25,
        ease: EASE_IN,
      },
    },
  };

  const nextIndex = selectedIndex === slides.length - 1 ? 0 : selectedIndex + 1;

  return (
    <section
      ref={sectionRef}
      className="sixth-section-clip relative z-20 -mt-[40px] w-full overflow-hidden bg-[#B1C6D4] pb-[100px] text-[#151926] md:-mt-[80px]"
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .sixth-section-clip {
          clip-path: polygon(40px 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%, 0 40px);
        }
        @media (min-width: 768px) {
          .sixth-section-clip {
            clip-path: polygon(80px 0, calc(100% - 80px) 0, 100% 80px, 100% 100%, 0 100%, 0 80px);
          }
        }
      `,
        }}
      />
      {/* Slider Section */}
      <div className="ld:pt-[160px] relative min-h-0 md:min-h-[100vh] w-full pt-12 md:pt-20">
        {/* MOBILE CAROUSEL (< 768px): Tailored luxury experience with rich cards, specs & animations */}
        <div className="flex w-full flex-col items-center px-4 pt-2 pb-6 md:hidden">
          {/* Mobile Header: Tag & Animated Slide Title */}
          <div className="mb-3 flex flex-col items-center text-center">
            <span
              className={`text-[9px] font-bold tracking-[0.25em] text-[#151926]/70 uppercase ${inter.className}`}
            >
              ALIZÉ RESIDENCES
            </span>
            <div className="relative mt-1 h-9 w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`text-2xl font-medium tracking-tight text-[#151926] uppercase whitespace-nowrap ${playfair.className}`}
                  style={{ transform: 'scaleY(1.15)' }}
                >
                  {slides[selectedIndex]?.title}
                </motion.h3>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Embla Viewport with Peek Cards */}
          <div className="w-full overflow-hidden" ref={mobileEmblaRef}>
            <div className="flex touch-pan-y py-2">
              {slides.map((slide, index) => {
                const isActive = index === selectedIndex;
                return (
                  <div
                    key={index}
                    onClick={() => scrollTo(index)}
                    className="relative min-w-0 flex-[0_0_86%] pr-3 first:pl-2"
                  >
                    <div
                      className={`relative aspect-[4/3] w-full overflow-hidden transition-all duration-500 ease-out ${
                        isActive
                          ? 'scale-100 opacity-100 shadow-[0_16px_36px_rgba(21,25,38,0.22)] ring-1 ring-white/50'
                          : 'scale-[0.93] opacity-60 shadow-md'
                      }`}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="88vw"
                        unoptimized
                        priority={index === 0}
                      />
                      {/* Luxury subtle dark gradient vignette */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25" />

                      {/* Floating Slide Index Counter */}
                      <div
                        className={`absolute top-3.5 right-3.5 text-xs font-light tracking-[0.2em] text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] ${inter.className}`}
                      >
                        0{index + 1} / 0{slides.length}
                      </div>

                      {/* Specs Overlay: Clean text with bright line underneath, no background, no rounded */}
                      <div className="absolute inset-x-5 bottom-3.5 flex items-center justify-around border-b border-white/70 pb-2.5 text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)]">
                        <div className="text-center">
                          <p
                            className={`text-[8px] font-bold tracking-widest text-white/80 uppercase ${inter.className}`}
                          >
                            {t('bedrooms_label')}
                          </p>
                          <p
                            className={`text-lg font-medium leading-tight text-white ${playfair.className}`}
                          >
                            {slide.bedrooms}
                          </p>
                        </div>
                        <div className="h-6 w-[1px] bg-white/30" />
                        <div className="text-center">
                          <p
                            className={`text-[8px] font-bold tracking-widest text-white/80 uppercase ${inter.className}`}
                          >
                            {t('area_up_to_label')}
                          </p>
                          <p
                            className={`text-sm font-medium leading-tight text-white ${playfair.className}`}
                          >
                            {slide.area}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Controls: Prev/Next & Indicators without background or rounded */}
          <div className="mt-4 flex w-full items-center justify-center gap-6">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#151926]/70 transition-colors hover:text-[#151926] active:scale-90"
            >
              <svg width="24" height="10" viewBox="0 0 28 10" fill="none" className="rotate-180">
                <path
                  d="M23 1L27 5L23 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27 5H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Sharp Indicators */}
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollTo(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-[2px] transition-all duration-300 ${
                      isActive ? 'w-7 bg-[#151926]' : 'w-2.5 bg-[#151926]/25 hover:bg-[#151926]/40'
                    }`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next slide"
              className="flex h-10 w-10 cursor-pointer items-center justify-center text-[#151926]/70 transition-colors hover:text-[#151926] active:scale-90"
            >
              <svg width="24" height="10" viewBox="0 0 28 10" fill="none">
                <path
                  d="M23 1L27 5L23 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27 5H1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Slide Description & Action Button */}
          <div className="mt-3 flex w-full flex-col items-center px-4 text-center">
            <div className="relative min-h-[48px] w-full flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={selectedIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`text-xs leading-relaxed font-light text-[#151926]/90 ${inter.className}`}
                >
                  {slides[selectedIndex]?.description}
                </motion.p>
              </AnimatePresence>
            </div>

            <Link
              href="/apartments"
              className={`mt-4 inline-flex items-center gap-2.5 rounded-full border border-[#151926] bg-[#151926] px-6 py-2.5 text-[10px] font-bold tracking-[0.14em] text-white uppercase shadow-md transition-all active:scale-95 ${inter.className}`}
            >
              <span>{slides[selectedIndex]?.buttonText}</span>
              <svg width="14" height="8" viewBox="0 0 28 10" fill="none" className="text-white">
                <path
                  d="M23 1L27 5L23 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M27 5H1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* DESKTOP CAROUSEL (>= 768px): Era Residence Signature 3-Column Architecture */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="mx-auto hidden h-full min-h-[72vh] w-full max-w-[1400px] flex-col items-center justify-center px-8 pt-10 md:flex md:flex-row md:justify-between md:px-[6vw] lg:px-[8vw]"
        >
          {/* Left Column (Stats / Specifications) */}
          <div className="relative z-30 mb-8 flex h-full w-full flex-col justify-center md:mb-0 md:w-[20%]">
            <div className="relative flex h-[160px] w-full flex-col justify-center md:h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  variants={specsVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 w-full space-y-10"
                >
                  <div>
                    <p
                      className={`text-[10px] font-bold tracking-[0.24em] text-[#151926]/75 uppercase ${inter.className}`}
                    >
                      {t('bedrooms_label')}
                    </p>
                    <p
                      className={`mt-2 text-4xl text-[#151926] lg:text-5xl ${playfair.className}`}
                      style={{ transform: 'scaleY(1.25)', transformOrigin: 'left' }}
                    >
                      {slides[selectedIndex]?.bedrooms}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[10px] font-bold tracking-[0.24em] text-[#151926]/75 uppercase ${inter.className}`}
                    >
                      {t('area_up_to_label')}
                    </p>
                    <p
                      className={`mt-2 text-2xl whitespace-nowrap text-[#151926] lg:text-3xl ${playfair.className}`}
                      style={{ transform: 'scaleY(1.25)', transformOrigin: 'left' }}
                    >
                      {slides[selectedIndex]?.area}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Center Column (WebGL Liquid Wave Slider) */}
          <div className="relative z-10 mb-28 h-[55vh] w-full md:mb-0 md:h-[65vh] lg:h-[72vh] md:w-[58%]">
            {/* Decoupled shadow backing plate */}
            <div className="pointer-events-none absolute inset-0 shadow-[0_20px_45px_rgba(21,25,38,0.12)]" />
            <div className="relative h-full w-full overflow-hidden">
              <LazyWebGLSlider
                images={SLIDE_IMAGES}
                activeIndex={selectedIndex}
                onIndexChange={(idx) => handleSelect(idx)}
                hideControls
                absoluteFill
                noRounded
              />
            </div>

            {/* Grand Title Over Image - Interactive 3D Char Reveal (Era Residence animateTextH) */}
            <div
              onClick={handleNext}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNext();
                }
              }}
              title="Click to next slide"
              className="group absolute bottom-0 left-1/2 z-20 hidden h-[120px] w-[160%] -translate-x-1/2 translate-y-1/2 cursor-pointer select-none items-center justify-center md:flex"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  className="absolute inset-0 flex h-full w-full items-center justify-center pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.25 } }}
                >
                  <h2
                    className={`flex justify-center text-[4vw] leading-none tracking-tight whitespace-nowrap text-[#151926] uppercase transition-transform duration-300 group-hover:scale-[1.02] lg:text-[4.5vw] ${playfair.className}`}
                    style={{
                      transform: 'scaleY(1.2)',
                      textShadow: '0 1px 12px #B1C6D4',
                      WebkitFontSmoothing: 'antialiased',
                      WebkitBackfaceVisibility: 'hidden',
                      transformOrigin: 'center center',
                    }}
                  >
                    {((slides[selectedIndex]?.title ?? '').match(/[\s\S]/gu) ?? []).map(
                      (char, i) => {
                        if (char === ' ') {
                          return (
                            <span key={i} className="inline-block w-[1.3vw]">
                              &nbsp;
                            </span>
                          );
                        }
                        return (
                          <motion.span
                            key={i}
                            custom={i}
                            variants={charVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            className="inline-block"
                            style={{
                              transform: 'translateZ(0)',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                          >
                            {char}
                          </motion.span>
                        );
                      },
                    )}
                  </h2>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls (Era Residence Exact Structure: [ < 01 ] ─── [ 02 > ] / 03) */}
            <div
              data-slider="pag"
              className="pointer-events-auto absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-6 md:-bottom-24 md:gap-8"
            >
              {/* Prev Button with Arrow + Current Slide Number */}
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Slide"
                className="group flex cursor-pointer items-center gap-3 text-[#151926]/75 transition-colors duration-300 hover:text-[#151926]"
              >
                <svg
                  width="24"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  className="transition-transform duration-300 ease-out group-hover:-translate-x-1.5"
                >
                  <path
                    d="M5 1L1 5L5 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 5H27"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={`text-[12px] font-medium tracking-widest text-[#151926] ${inter.className}`}
                >
                  {String(selectedIndex + 1).padStart(2, '0')}
                </span>
              </button>

              {/* Progress Bar (6-second linear auto-play timer) */}
              <div
                className="relative h-[2px] w-24 overflow-hidden rounded-full bg-[#151926]/20 md:w-36 lg:w-44"
                title="Auto-play progress"
              >
                <motion.div
                  key={progressKey}
                  className="h-full bg-[#151926] origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 6,
                    ease: 'linear',
                  }}
                  style={{ width: '100%', willChange: 'transform' }}
                />
              </div>

              {/* Next Slide Number + Next Button with Arrow */}
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Slide"
                className="group flex cursor-pointer items-center gap-3 text-[#151926]/75 transition-colors duration-300 hover:text-[#151926]"
              >
                <span
                  className={`text-[12px] font-medium tracking-widest text-[#151926] ${inter.className}`}
                >
                  {String(nextIndex + 1).padStart(2, '0')}
                </span>
                <svg
                  width="24"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  className="transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                >
                  <path
                    d="M23 1L27 5L23 9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27 5H1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Total Slides Count */}
              <span
                className={`text-[11px] font-light tracking-widest text-[#151926]/50 ${inter.className}`}
              >
                / {String(slides.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Right Column (Description & Luxury CTA) */}
          <div className="relative z-30 mt-0 flex w-full flex-col justify-center md:w-[20%] md:pl-8 lg:pl-10">
            <div className="relative flex h-[180px] w-full flex-col justify-center md:h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  variants={descVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute left-0 flex w-full flex-col"
                >
                  <p
                    className={`text-xs leading-relaxed font-light text-[#151926]/90 lg:text-[13px] ${inter.className}`}
                  >
                    {slides[selectedIndex]?.description}
                  </p>
                  <div className="mt-8">
                    <Link
                      href="/apartments"
                      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#151926] px-6 py-2.5 text-[9px] font-bold tracking-[0.16em] uppercase text-[#151926] transition-colors duration-500 hover:text-white ${inter.className}`}
                    >
                      <span className="relative z-10">{slides[selectedIndex]?.buttonText}</span>
                      <svg
                        width="14"
                        height="8"
                        viewBox="0 0 28 10"
                        fill="none"
                        className="relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      >
                        <path
                          d="M23 1L27 5L23 9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M27 5H1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="absolute inset-0 -translate-y-full bg-[#151926] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-y-0" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Text Section Below Slider */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        whileHover="hover"
        viewport={{ once: true, margin: '-10%' }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden pt-8 pb-16"
      >
        {/* Content */}
        <div className="relative z-20 flex w-full max-w-[1200px] cursor-default flex-col items-center md:pr-6 md:pl-16 text-center md:px-6">
          {/* Vertical Line & Small Text */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="mb-16 flex flex-col items-center md:mb-24"
          >
            <div>
              
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2 15 5 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 5 12 2 12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 22C12 22 9 19 9 15C9 13 10.5 12 12 12C13.5 12 15 13 15 15C15 19 12 22 12 22Z"
              fill="currentColor"
            />
            <path
              d="M22 12C22 12 19 9 15 9C13 9 12 10.5 12 12C12 13.5 13 15 15 15C19 15 22 12 22 12Z"
              fill="currentColor"
            />
            <path
              d="M2 12C2 12 5 15 9 15C11 15 12 13.5 12 12C12 10.5 11 9 9 9C5 9 2 12 2 12Z"
              fill="currentColor"
            />
          </svg>
            </div>
            <div className="mb-6 h-24 w-[1px] bg-[#151926]/30 md:h-40"></div>
            <p
              className={`max-w-[200px] text-[9px] font-bold tracking-[0.2em] text-[#151926] uppercase md:max-w-none ${inter.className}`}
            >
              {t.rich('a_place_to_live', {
                br: () => <br />,
              })}
            </p>
          </motion.div>

          {/* Large Serif Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.2 },
              },
            }}
          >
            <h2
              className={`mb-16 max-w-[1200px] px-4 text-center text-[18px] leading-[1.4] tracking-tight text-[#151926] uppercase sm:text-[22px] md:mb-24 md:text-[3vw] md:leading-[1.1] md:tracking-tighter lg:text-[40px] ${playfair.className} origin-top [transform:scaleY(1)] md:[transform:scaleY(1.3)]`}
            >
              <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.15em]">
                {t('residences_range')
                  .split(' ')
                  .map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden pb-1">
                      <motion.span
                        className="inline-block origin-bottom"
                        variants={{
                          hidden: { opacity: 0, y: '100%' },
                          visible: {
                            opacity: 1,
                            y: '0%',
                            transition: { duration: 1, ease: [0.2, 0.65, 0.3, 0.9] },
                          },
                        }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  ))}
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Bottom Logo */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.5, rotate: -45 },
            visible: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { duration: 1, ease: 'backOut' },
            },
            hover: { rotate: 360, transition: { duration: 4, repeat: Infinity, ease: 'linear' } },
          }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-[#151926]"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C12 2 15 5 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 5 12 2 12 2Z"
              fill="currentColor"
            />
            <path
              d="M12 22C12 22 9 19 9 15C9 13 10.5 12 12 12C13.5 12 15 13 15 15C15 19 12 22 12 22Z"
              fill="currentColor"
            />
            <path
              d="M22 12C22 12 19 9 15 9C13 9 12 10.5 12 12C12 13.5 13 15 15 15C19 15 22 12 22 12Z"
              fill="currentColor"
            />
            <path
              d="M2 12C2 12 5 15 9 15C11 15 12 13.5 12 12C12 10.5 11 9 9 9C5 9 2 12 2 12Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Video Graphic Right Bottom */}
      <div className="pointer-events-none absolute -bottom-10 left-0 z-10 hidden h-[70vh] origin-center -rotate-90 md:-bottom-20 md:bottom-0 md:block">
        <SmartVideo
          aria-label="Bougainvillea video"
          autoPlay
          loop
          muted
          playsInline
          className="safari-video-hide h-full w-full scale-110 object-contain opacity-90"
          src="/bougainvillea-flowers_04.webm"
        />
      </div>
    </section>
  );
}
