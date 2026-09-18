'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Playfair_Display, Inter, Pinyon_Script } from 'next/font/google';
import Image from 'next/image';
import { useRef } from 'react';
import { CircleButton } from './CircleButton';
import { FlowerOverlay } from './FlowerOverlay';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const cursive = Pinyon_Script({ subsets: ['latin'], weight: ['400'] });

// Helper component for vertical timeline points
function VerticalTimelinePoint(props: {
  label: string;
  time: string;
  description: string;
  align?: 'left' | 'right';
  top: string;
}) {
  const isLeft = props.align === 'left';

  return (
    <div
      className={`absolute flex w-full items-center justify-between md:justify-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
      style={{ top: props.top, transform: 'translateY(-50%)' }}
    >
      {/* Spacer for one side on desktop */}
      <div className="hidden w-1/2 md:block" />

      {/* The Dot on the central timeline */}
      <div className="absolute top-1/2 left-[15px] z-20 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#F4F3EF] ring-1 ring-[#151926] md:left-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.4 }}
          className="h-2 w-2 rounded-full bg-[#151926] md:h-2.5 md:w-2.5"
        />
      </div>

      {/* The Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`flex w-[calc(100%-40px)] md:w-[45%] ${isLeft ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} ml-10 md:ml-0`}
      >
        <div className="relative flex min-h-[160px] w-full max-w-[340px] flex-col justify-between rounded-sm bg-[#F4F3EC] p-5 shadow-2xl md:min-h-[200px] md:max-w-[420px] md:p-8">
          {/* Inner Decorative Chamfered Border */}
          <div
            className="pointer-events-none absolute inset-2 bg-[#B0B2A6]"
            style={{
              clipPath:
                'polygon(12px 0, calc(100% - 12px) 0, 100% 12px, 100% calc(100% - 12px), calc(100% - 12px) 100%, 12px 100%, 0 calc(100% - 12px), 0 12px)',
            }}
          >
            <div
              className="absolute inset-[1px] bg-[#F4F3EC]"
              style={{
                clipPath:
                  'polygon(11px 0, calc(100% - 11px) 0, 100% 11px, 100% calc(100% - 11px), calc(100% - 11px) 100%, 11px 100%, 0 calc(100% - 11px), 0 11px)',
              }}
            ></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <h3
                className={`text-xl leading-snug tracking-tight text-[#151926] uppercase md:text-2xl ${playfair.className}`}
              >
                {props.label}
              </h3>
              <p
                className={`mt-1 text-[10px] font-bold tracking-widest text-[#151926]/50 md:mt-2 md:text-[11px] ${inter.className}`}
              >
                {props.time}
              </p>
            </div>
            <p
              className={`mt-4 text-[12px] leading-[1.6] font-light text-[#2D3346] normal-case md:mt-6 md:text-[14px] ${inter.className}`}
            >
              {props.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function FourthSection() {
  const t = useTranslations('Index');

  // Ref for parallax image
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  const timelineItems = [
    {
      top: '0%',
      align: 'left' as const,
      label: t('timeline_love_bridge'),
      time: t('timeline_love_bridge_time'),
      description: t('timeline_love_bridge_desc'),
    },
    {
      top: '16.67%',
      align: 'right' as const,
      label: t('timeline_admin_center'),
      time: t('timeline_admin_center_time'),
      description: t('timeline_admin_center_desc'),
    },
    {
      top: '33.33%',
      align: 'left' as const,
      label: t('timeline_cham_museum'),
      time: t('timeline_cham_museum_time'),
      description: t('timeline_cham_museum_desc'),
    },
    {
      top: '50%',
      align: 'right' as const,
      label: t('timeline_marble_mountains'),
      time: t('timeline_marble_mountains_time'),
      description: t('timeline_marble_mountains_desc'),
    },
    {
      top: '66.67%',
      align: 'left' as const,
      label: t('timeline_son_tra'),
      time: t('timeline_son_tra_time'),
      description: t('timeline_son_tra_desc'),
    },
    {
      top: '83.33%',
      align: 'right' as const,
      label: t('timeline_hoi_an'),
      time: t('timeline_hoi_an_time'),
      description: t('timeline_hoi_an_desc'),
    },
    {
      top: '100%',
      align: 'left' as const,
      label: t('timeline_my_son'),
      time: t('timeline_my_son_time'),
      description: t('timeline_my_son_desc'),
    },
  ];

  return (
    <section className="bg-textured-sand relative z-20 w-full overflow-hidden">
      {/* Background Flowers spanning the whole section */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <FlowerOverlay />
      </div>

      {/*
        BLOCK 1: The Concept 
      */}
      <div className="relative flex min-h-[90vh] w-full flex-col items-center justify-center px-4 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: true, margin: '-10%' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className={`mb-12 text-[10px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-xs ${inter.className}`}
          >
            {t('the_concept')}
          </motion.p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
            }}
          >
            <h2
              className={`max-w-[1200px] text-center text-[22px] leading-[1.4] tracking-tight text-[#151926] uppercase sm:text-[28px] md:text-[4vw] md:leading-[1.1] md:tracking-tighter lg:text-[50px] ${playfair.className} origin-top`}
            >
              <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.15em]">
                {t('concept_title')
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

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
            }}
            className={`mt-10 max-w-[720px] px-4 text-center text-sm leading-[1.85] font-light text-[#2D3346] sm:text-base sm:leading-[1.9] md:mt-14 md:text-[17px] md:leading-[1.95] ${inter.className}`}
          >
            {t('concept_desc')}
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.5, rotate: -45 },
              visible: {
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: { duration: 1, ease: 'backOut' },
              },
              hover: {
                rotate: 360,
                transition: { duration: 4, repeat: Infinity, ease: 'linear' },
              },
            }}
            className="mt-20 text-[#151926]"
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
      </div>

      {/*
        BLOCK 2: New Golden Mile & Image 
      */}
      <div className="relative w-full py-12 md:py-32">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center justify-between gap-12 px-4 md:flex-row md:px-8">
          {/* Left Text */}
          <div className="flex w-full flex-col items-start pt-10 md:w-1/2 md:pt-0">
            <span
              className={`mb-4 text-sm font-bold tracking-[0.5em] text-[#151926] uppercase md:mb-8 md:text-[14px] ${playfair.className}`}
            >
              {t('spain')}
            </span>
            <h2
              className={`text-left text-[12vw] leading-[1] font-medium tracking-tight text-[#151926] uppercase sm:text-[10vw] md:text-[8vw] md:leading-[0.85] md:tracking-[-0.04em] lg:text-[100px] ${playfair.className}`}
            >
              {t('new_text')}
              <br />
              <span className="md:ml-[1.5em]">{t('golden_text')}</span>
              <br />
              {t('mile_text')}
            </h2>

            <div className="mt-12 max-w-[400px] md:mt-24">
              <h3
                className={`mb-4 text-xl tracking-tight text-[#151926] uppercase md:mb-6 md:text-3xl ${playfair.className}`}
              >
                {t('between_marbella')}
              </h3>
              <p
                className={`text-[12px] leading-relaxed font-light text-[#151926] md:text-[14px] ${inter.className}`}
              >
                {t('between_marbella_desc')}
              </p>
            </div>

            <div className="mt-10 md:mt-16">
              <CircleButton
                text={t('view_available')}
                href="/apartments"
                variant="dark"
                className="pointer-events-auto"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="flex w-full justify-end md:w-1/2">
            <div
              ref={imageContainerRef}
              className="relative h-[60vh] w-full max-w-[600px] overflow-hidden bg-gray-200 md:h-[80vh]"
            >
              <motion.div
                style={{ y: imageY }}
                className="absolute inset-0 -top-[15%] -bottom-[15%] h-[130%] w-full will-change-transform"
              >
                <Image
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
                  alt="Luxury Terrace"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/*
        BLOCK 3: Vertical Timeline 
      */}
      <div className="relative w-full py-20 md:py-32">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          {/* Timeline Title */}
          <div className="mb-20 flex flex-col items-center justify-center text-center md:mb-32">
            <h2
              className={`text-center text-[7vw] leading-tight tracking-tight text-[#151926] uppercase sm:text-[5vw] lg:text-[64px] ${playfair.className}`}
            >
              {t('the_coast_wanted')}
            </h2>
            {Boolean(t('yours')) && (
              <span
                className={`mt-4 block text-[12vw] leading-none tracking-normal text-[#151926]/90 lowercase md:mt-2 md:text-[7vw] lg:text-[90px] ${cursive.className}`}
                style={{ transform: 'rotate(-3deg)' }}
              >
                {t('yours')}
              </span>
            )}
            <p
              className={`mt-4 max-w-[680px] text-center text-sm font-light tracking-wide text-[#2D3346] sm:text-base md:mt-6 md:text-[17px] md:tracking-wider ${inter.className}`}
            >
              {t('this_year')}
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative mt-24 mb-16 h-[1600px] w-full sm:h-[1850px] md:mb-24 md:h-[2350px]">
            {/* The Wavy SVG Line */}
            <div className="absolute top-0 bottom-0 left-[15px] z-0 w-[40px] -translate-x-1/2 md:left-1/2 md:w-[280px]">
              <svg
                className="absolute inset-0 h-full w-full overflow-visible"
                preserveAspectRatio="none"
                viewBox="0 0 100 1200"
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ duration: 2.5, ease: 'easeInOut' }}
                  d="M 50 0 C 120 70 120 130 50 200 C -20 270 -20 330 50 400 C 120 470 120 530 50 600 C -20 670 -20 730 50 800 C 120 870 120 930 50 1000 C -20 1070 -20 1130 50 1200"
                  fill="none"
                  stroke="#151926"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Timeline Points */}
            <div className="absolute inset-0 z-10 w-full">
              {timelineItems.map((item, index) => (
                <VerticalTimelinePoint
                  key={index}
                  top={item.top}
                  align={item.align}
                  label={item.label}
                  time={item.time}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
