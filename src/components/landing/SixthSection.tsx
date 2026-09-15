'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter } from 'next/font/google';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

export function SixthSection() {
  const t = useTranslations('Index');
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const slides = [
    {
      bedrooms: '3',
      area: '178 — 202 M²',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
      description: t('slide_1_desc'),
      buttonText: t('slide_1_btn'),
      title: t('slide_1_title'),
    },
    {
      bedrooms: '2-3',
      area: '124 — 243 M²',
      image:
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
      description: t('slide_2_desc'),
      buttonText: t('slide_2_btn'),
      title: t('slide_2_title'),
    },
    {
      bedrooms: '4',
      area: '250 — 300 M²',
      image:
        'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=2070&auto=format&fit=crop',
      description: t('slide_3_desc'),
      buttonText: t('slide_3_btn'),
      title: t('slide_3_title'),
    },
  ];

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Animation variants for smooth text transitions
  const textVariants: Variants = {
    initial: { opacity: 0, y: 15, filter: 'blur(4px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, y: -15, filter: 'blur(4px)' },
  };

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: { staggerChildren: 0.05 },
    },
    exit: {
      transition: { staggerChildren: 0.02, staggerDirection: -1 },
    },
  };

  const charVariants: Variants = {
    initial: { opacity: 0, y: 80, rotate: -15, scale: 0.9, filter: 'blur(8px)' },
    animate: {
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.19, 1, 0.22, 1] },
    },
    exit: {
      opacity: 0,
      y: -80,
      rotate: 15,
      scale: 1.1,
      filter: 'blur(8px)',
      transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <section className="sixth-section-clip relative z-20 -mt-[40px] w-full overflow-hidden bg-[#B1C6D4] pb-[100px] text-[#151926] md:-mt-[80px]">
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
      <div className="ld:pt-[160px] relative min-h-[100vh] w-full pt-20">
        {/* Carousel & Animated Text Wrapper */}
        <div className="mx-auto flex h-full min-h-[70vh] w-full max-w-[1400px] flex-col items-center justify-center px-8 pt-10 pr-6 md:flex-row md:justify-between md:px-[10vw] md:pl-16">
          {/* Left Column (Stats) - Fixed & Animated */}
          <div className="relative z-30 mb-8 flex h-full w-full flex-col justify-center md:mb-0 md:w-[20%]">
            <div className="relative flex h-[120px] w-full flex-col justify-center md:h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute left-0 w-full space-y-12"
                >
                  <div>
                    <p
                      className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/90 uppercase ${inter.className}`}
                    >
                      {t('bedrooms_label')}
                    </p>
                    <p
                      className={`mt-2 text-4xl text-[#151926] md:text-5xl ${playfair.className}`}
                      style={{ transform: 'scaleY(1.3)', transformOrigin: 'left' }}
                    >
                      {slides[selectedIndex]?.bedrooms}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/90 uppercase ${inter.className}`}
                    >
                      {t('area_up_to_label')}
                    </p>
                    <p
                      className={`mt-2 text-3xl whitespace-nowrap text-[#151926] md:text-4xl ${playfair.className}`}
                      style={{ transform: 'scaleY(1.3)', transformOrigin: 'left' }}
                    >
                      {slides[selectedIndex]?.area}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Center Column (Image Carousel) */}
          <div className="relative z-10 mb-24 h-[55vh] w-full md:mb-0 md:h-[70vh] md:w-[55%]">
            <div
              className="h-full w-full overflow-hidden rounded-lg md:rounded-none"
              ref={emblaRef}
            >
              <div className="flex h-full touch-pan-y">
                {slides.map((slide, index) => (
                  <div key={index} className="relative h-full w-full min-w-0 flex-[0_0_100%]">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Large Title Over Image - Animated (Staggered Crossfade) */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 z-20 hidden h-[120px] w-[160%] -translate-x-1/2 translate-y-1/2 md:block">
              <AnimatePresence>
                <motion.div
                  key={selectedIndex}
                  variants={containerVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="absolute inset-0 flex h-full w-full items-center justify-center"
                >
                  <h2
                    className={`flex justify-center text-[4vw] leading-none tracking-tighter whitespace-nowrap text-[#151926] uppercase lg:text-[4.5vw] ${playfair.className}`}
                    style={{
                      transform: 'scaleY(1.2)',
                      textShadow: '0 0 15px #B1C6D4, 0 0 30px #B1C6D4, 0 0 45px #B1C6D4',
                      WebkitFontSmoothing: 'antialiased',
                      WebkitBackfaceVisibility: 'hidden',
                      transformOrigin: 'center center',
                    }}
                  >
                    {((slides[selectedIndex]?.title ?? '').match(/[\s\S]/gu) ?? []).map(
                      (char, i) => {
                        if (char === ' ') {
                          return (
                            <span key={i} className="inline-block w-[1.5vw]">
                              &nbsp;
                            </span>
                          );
                        }
                        return (
                          <motion.span
                            key={i}
                            variants={charVariants}
                            className="inline-block"
                            style={{ willChange: 'transform, opacity' }}
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

            {/* Controls (Premium Design) */}
            <div className="pointer-events-auto absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-8 md:-bottom-24 md:gap-12">
              <button
                onClick={scrollPrev}
                aria-label="Previous Slide"
                className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/70 transition-colors duration-300 hover:text-[#151926]"
              >
                <svg
                  width="28"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-500 ease-out group-hover:-translate-x-2"
                >
                  <path
                    d="M5 1L1 5L5 9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 5H27"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex items-center gap-6">
                <span
                  className={`text-[11px] text-[#151926] md:text-xs ${inter.className} font-light tracking-widest`}
                >
                  {String(selectedIndex + 1).padStart(2, '0')}
                </span>

                <div className="relative h-[1px] w-16 overflow-hidden bg-[#151926]/20 md:w-24">
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 w-full bg-[#151926] origin-left"
                    style={{ willChange: 'transform' }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: (selectedIndex + 1) / slides.length }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>

                <span
                  className={`text-[11px] text-[#151926]/70 md:text-xs ${inter.className} font-light tracking-widest`}
                >
                  {String(slides.length).padStart(2, '0')}
                </span>
              </div>

              <button
                onClick={scrollNext}
                aria-label="Next Slide"
                className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/70 transition-colors duration-300 hover:text-[#151926]"
              >
                <svg
                  width="28"
                  height="10"
                  viewBox="0 0 28 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-500 ease-out group-hover:translate-x-2"
                >
                  <path
                    d="M23 1L27 5L23 9"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M27 5H1"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Column (Description & Button) - Fixed & Animated */}
          <div className="relative z-30 mt-0 flex w-full flex-col justify-center md:w-[20%] md:pl-10">
            <div className="relative flex h-[180px] w-full flex-col justify-center md:h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                  className="absolute left-0 flex w-full flex-col"
                >
                  <p
                    className={`text-xs leading-relaxed font-light text-[#151926] md:text-[13px] ${inter.className}`}
                  >
                    {slides[selectedIndex]?.description}
                  </p>
                  <button
                    className={`mx-auto mt-8 w-fit rounded-full border border-[#151926] px-6 py-3 text-[9px] font-bold tracking-[0.1em] uppercase transition-colors hover:bg-[#151926] hover:text-white ${inter.className}`}
                  >
                    {slides[selectedIndex]?.buttonText}
                  </button>
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
        className="relative flex min-h-[50vh] w-full flex-col items-center justify-center overflow-hidden pt-8 pb-16 md:min-h-[100vh] md:pt-[10vh] md:pb-[10vh]"
      >
        {/* Flower Graphics Left */}
        <div className="pointer-events-none absolute bottom-0 left-[-5vw] z-10 h-[70vh] w-[40vw] md:w-[25vw]">
          {/* We use a bougainvillea placeholder image */}
          <Image
            src="https://images.unsplash.com/photo-1596700508000-0e1075bd8ce1?q=80&w=1000&auto=format&fit=crop"
            alt="Bougainvillea flowers decoration for Era Residence"
            fill
            className="[mask-image:linear-gradient(to_right,black,transparent)] object-cover opacity-80 mix-blend-multiply [-webkit-mask-image:linear-gradient(to_right,black,transparent)]"
          />
        </div>

        {/* Content */}
        <div className="relative z-20 flex w-full max-w-[1200px] cursor-default flex-col items-center pr-6 pl-16 text-center md:px-6">
          {/* Vertical Line & Small Text */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className="mb-16 flex flex-col items-center md:mb-24"
          >
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
      <div className="pointer-events-none absolute -bottom-10 left-0 z-10 h-[70vh] origin-center -rotate-90 md:-bottom-20 md:bottom-0">
        <video
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
