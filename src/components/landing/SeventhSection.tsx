'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState, useRef } from 'react';
import { inter, playfair } from '@/utils/Fonts';
import { CircleButton } from './CircleButton';
import { LazyWebGLSlider } from './LazyWebGLSlider';

const backgroundImages = [
  'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1519643381401-22c77e60520e?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1920',
  'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1920',
];

export function SeventhSection() {
  const t = useTranslations('Index');
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Scale the background up to 1.3x as the next section scrolls over it
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);

  const amenities = [
    t('gated_community'),
    t('swimming_pool'),
    t('parking_area'),
    t('spa_gym'),
    t('landscaping'),
  ];

  const quotes = [
    t('seventh_quote_1'),
    t('seventh_quote_2'),
    t('seventh_quote_3'),
    t('seventh_quote_4'),
    t('seventh_quote_5'),
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[600px] w-full overflow-hidden bg-[#151926] perspective-[1000px] md:min-h-screen"
    >
      {/* Background Image with 3D Transition */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 h-full w-full origin-center will-change-transform"
      >
        <LazyWebGLSlider
          images={backgroundImages}
          activeIndex={activeIdx}
          hideControls
          absoluteFill
          noRounded
        />

        {/* Soft Gradient Overlay for better text readability */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-black/40 via-transparent to-black/60"></div>
        {/* Seamless bottom blend into #151926 */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-48 bg-gradient-to-b from-transparent to-[#151926]"></div>
      </motion.div>

        {/* Absolute positioning for Amenities List (Top Right on mobile, Middle Right on desktop) */}
        <div className="absolute top-28 right-6 z-30 md:top-[25%] md:right-24 lg:right-32 xl:top-[20%] xl:right-40">
          <motion.ul
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col items-end space-y-2 md:items-start md:space-y-2"
          >
            {amenities.map((amenity, index) => {
              const isActive = index === activeIdx;
              return (
                <li key={index} className="w-full">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveIdx(index);
                    }}
                    className={`relative w-full cursor-pointer text-right text-sm tracking-wider uppercase transition-all duration-500 sm:text-lg md:text-left md:text-xl lg:text-[22px] ${playfair.className} origin-top [transform:scaleY(1)] md:[transform:scaleY(1.15)] ${
                      isActive ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute top-0 -right-4 bottom-0 w-[1px] bg-white md:right-auto md:-left-6"
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    )}
                    {amenity}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </div>

        {/* Main Content (Bottom Left Quote and Bottom Right Circle) */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end p-6 pb-24 md:p-16 md:pb-12 lg:p-24">
          {/* Inner wrapper to handle row/col layout and margin on mobile */}
          <div className="ml-10 flex w-full flex-col items-start justify-between gap-6 md:ml-0 md:flex-row md:items-end md:gap-0">
            {/* Left Column: Quote */}
            <div className="pointer-events-auto flex w-full flex-col items-start text-left md:max-w-[50%] lg:max-w-[42%]">
              <div className="mb-6 min-h-[24px] md:mb-8 md:min-h-[32px]">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={activeIdx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`text-[13px] font-bold tracking-[0.2em] text-white uppercase md:text-[18px] ${inter.className}`}
                  >
                    {amenities[activeIdx]}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <div className="relative min-h-[160px] w-full md:min-h-[220px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.02 },
                      },
                      exit: {
                        opacity: 0,
                        y: -15,
                        transition: { duration: 0.3, ease: 'easeIn' },
                      },
                    }}
                    className="absolute top-0 left-0 w-full"
                  >
                    <p
                      className={`text-[12px] leading-[1.2] tracking-tight text-white uppercase sm:text-[14px] md:text-[1.6vw] lg:text-[24px] ${playfair.className} origin-top-left [transform:scaleY(1)] md:[transform:scaleY(1.5)]`}
                    >
                      <span className="flex w-full flex-wrap justify-start gap-x-[0.2em] gap-y-[0.1em] md:gap-y-[0.3em]">
                        {(quotes[activeIdx] ?? '').split(' ').map((word, i) => (
                          <span
                            key={i}
                            className={`inline-block overflow-hidden pb-1 ${i === 0 ? 'ml-8 md:ml-20' : ''}`}
                          >
                            <motion.span
                              className="inline-block origin-bottom"
                              variants={{
                                hidden: { opacity: 0, y: '100%' },
                                visible: {
                                  opacity: 1,
                                  y: '0%',
                                  transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
                                },
                              }}
                            >
                              {word}
                            </motion.span>
                          </span>
                        ))}
                      </span>
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right Column: Circle Button */}
            <div className="pointer-events-auto absolute right-6 bottom-6 md:relative md:right-auto md:bottom-auto md:self-auto">
              <CircleButton text={t('book_a_call_now')} href="/contact" variant="light" />
            </div>
          </div>
        </div>
      </section>
  );
}
