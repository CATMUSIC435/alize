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

// Helper component for timeline points perfectly centered on Y=50 (which is top: 50% of the 100px container)
function TimelinePoint({
  left,
  label,
  time,
  description,
  lineHeight = 120,
}: {
  left: string;
  label: string;
  time: string;
  description?: string;
  lineHeight?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px' }}
      className="absolute top-[50%] flex -translate-x-1/2 -translate-y-1/2 scale-[0.6] flex-col items-center sm:scale-[0.7] md:scale-100"
      style={{ left }}
    >
      {/* The Dot */}
      <motion.div
        variants={{
          hidden: { scale: 0 },
          visible: { scale: 1, transition: { duration: 0.4 } },
        }}
        className="relative z-20 h-2 w-2 rounded-full bg-[#151926] md:h-2.5 md:w-2.5"
      />

      {/* Static Text Below Dot */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -5 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.2 } },
        }}
        className="absolute top-[20px] flex flex-col items-center text-center whitespace-nowrap"
      >
        <p
          className={`text-[8px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-[9px] ${inter.className}`}
        >
          {label}
        </p>
        <p
          className={`mt-1 text-[8px] tracking-widest text-[#151926]/60 uppercase md:text-[9px] ${inter.className}`}
        >
          {time}
        </p>
      </motion.div>

      {/* Animated Line and Popup */}
      <div className="pointer-events-none absolute bottom-[12px] left-1/2 flex -translate-x-1/2 flex-col items-center">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: 0.4 } },
          }}
          className="relative mb-0 flex min-h-[220px] w-[220px] flex-col justify-between rounded-sm bg-[#F4F3EC] p-4 shadow-2xl md:min-h-[260px] md:w-[280px] md:p-6"
        >
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
              <h4
                className={`text-xl leading-snug tracking-tight text-[#151926] uppercase md:text-2xl ${playfair.className}`}
              >
                {label}
              </h4>
              <p
                className={`mt-1 text-[9px] font-bold tracking-widest text-[#151926]/50 md:mt-2 md:text-[10px] ${inter.className}`}
              >
                {time}
              </p>
            </div>
            <p
              className={`mt-3 text-[11px] leading-[1.5] font-light text-[#2D3346] normal-case md:mt-4 md:text-[13px] md:leading-[1.6] ${inter.className}`}
            >
              {description ??
                'Discover the exceptional lifestyle and amenities waiting for you at this exclusive location.'}
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { height: 0 },
            visible: { height: lineHeight, transition: { duration: 0.3, delay: 0.2 } },
          }}
          className="w-[1.5px] bg-[#151926]"
        />
      </div>
    </motion.div>
  );
}

export function FourthSection() {
  const t = useTranslations('Index');
  const targetRef = useRef<HTMLDivElement>(null);

  // 500vh container gives a nice long scroll duration
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // We translate the 400vw track by -300vw to see all 4 screens
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-300vw']);

  // Parallax for the terrace image
  const imageX = useTransform(scrollYProgress, [0, 1], ['-10vw', '10vw']);

  return (
    <section ref={targetRef} className="relative z-20 h-[500vh] bg-[#F4F3EF]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#F4F3EF]">
        <motion.div
          style={{ x }}
          className="relative flex h-full w-[400vw] items-center will-change-transform"
        >
          <FlowerOverlay />
          {/* =======================
              SCREEN 1: 0vw to 100vw
              ======================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: '-10%' }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
            className="absolute top-0 bottom-0 left-[5vw] flex w-[90vw] flex-col items-center justify-center"
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
              }}
              className={`mb-12 text-[9px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-xs ${inter.className}`}
            >
              {t('the_concept')}
            </motion.p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-10%' }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.05, delayChildren: 0.4 },
                },
              }}
            >
              <h2
                className={`max-w-[1200px] px-4 text-center text-[18px] leading-[1.4] tracking-tight text-[#151926] uppercase sm:text-[22px] md:text-[3vw] md:leading-[1.1] md:tracking-tighter lg:text-[40px] ${playfair.className} origin-top [transform:scaleY(1)] md:[transform:scaleY(1.3)]`}
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
              className={`mt-24 max-w-[400px] text-center text-[10px] leading-relaxed font-light text-[#151926] md:text-xs ${inter.className}`}
            >
              {t('concept_desc')}
            </motion.p>

            {/* Central Flower SVG */}
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
              className="mt-16 text-[#151926]"
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

          {/* =======================
              SCREEN 2: 100vw to 200vw
              ======================= */}
          <div className="absolute top-1/2 left-[90vw] z-10 -translate-y-1/2">
            <span
              className={`text-lg font-bold tracking-[0.5em] text-[#151926] uppercase md:text-[14px] ${playfair.className}`}
            >
              {t('spain')}
            </span>
          </div>

          <div className="pointer-events-none absolute top-0 bottom-0 left-[100vw] z-20 flex w-[75vw] items-center justify-start text-[#151926] opacity-90">
            <h2
              className={`pl-4 text-left text-[12vw] leading-[1] font-medium tracking-tight uppercase sm:text-[10vw] md:pl-0 md:text-[6vw] md:leading-[0.8] md:tracking-[-0.04em] ${playfair.className} origin-left [transform:scaleY(1)] md:[transform:scaleY(1.3)]`}
            >
              {t('new_text')}
              <br />
              <span className="ml-[10vw]">{t('golden_text')}</span>
              <br />
              {t('mile_text')}
            </h2>
          </div>

          {/* =======================
              TERRACE IMAGE: 165vw to 200vw
              ======================= */}
          <div className="absolute left-[120vw] z-0 h-[100vh] w-[35vw] overflow-hidden bg-gray-200">
            <motion.div
              style={{ x: imageX }}
              className="relative -left-[10vw] h-full w-[55vw] will-change-transform"
            >
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Terrace"
                fill
                className="object-cover"
                sizes="55vw"
              />
            </motion.div>
          </div>

          {/* =======================
              SCREEN 3: 200vw to 300vw
              ======================= */}
          <div className="absolute top-[20vh] left-[165vw] z-10">
            <CircleButton
              text={t('view_available')}
              variant="dark"
              className="pointer-events-auto"
            />
          </div>

          <div className="absolute bottom-[10vh] left-[160vw] z-10 w-[30vw]">
            <h3
              className={`mb-6 text-xl tracking-tight text-[#151926] uppercase md:text-3xl lg:text-4xl ${playfair.className}`}
              style={{ transform: 'scaleY(1.3)', transformOrigin: 'left' }}
            >
              {t('between_marbella')}
            </h3>
            <p
              className={`text-[9px] leading-relaxed font-light text-[#151926] md:text-[11px] ${inter.className}`}
            >
              {t('between_marbella_desc')}
            </p>
          </div>

          {/* =======================
              SCREEN 4: 300vw to 400vw
              ======================= */}
          <div className="absolute top-[20vh] left-[325vw] z-10 w-[60vw]">
            <h2
              className={`text-center text-[4vw] leading-none tracking-tighter text-[#151926] uppercase md:text-[6vw] ${playfair.className}`}
              style={{ transform: 'scaleY(1.2)' }}
            >
              {t('the_coast_wanted')}
              <br />
              <span
                className={`-mt-[4vw] ml-[20vw] block py-10 text-[10vw] leading-none tracking-normal text-[#151926]/90 lowercase md:text-[8vw] ${cursive.className}`}
                style={{ transform: 'scaleY(1) rotate(-5deg)' }}
              >
                {t('yours')}
              </span>
              {t('this_year')}
            </h2>
          </div>

          {/* =======================
              TIMELINE: 240vw to 380vw
              ======================= */}
          <div className="absolute bottom-[10vh] left-[170vw] z-10 h-[100px] w-[210vw] md:left-[190vw] md:w-[140vw]">
            {/* Curving SVG Line connecting exactly through Y=50 at all timeline points */}
            <svg
              className="absolute h-full w-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 100"
            >
              <motion.path
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: '100px' }}
                transition={{ duration: 2.5, ease: 'easeInOut' }}
                d="M 0 50 Q 90 20 180 50 Q 270 80 360 50 Q 450 20 540 50 Q 630 80 720 50 Q 800 20 880 50 Q 940 80 1000 50"
                fill="none"
                stroke="#151926"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>

            {/* Timeline Points */}
            <TimelinePoint
              left="0%"
              label={t('timeline_gibraltar')}
              time={t('min_50')}
              description={t('timeline_desc')}
              lineHeight={180}
            />
            <TimelinePoint
              left="18%"
              label={t('timeline_estepona')}
              time={t('min_10')}
              description={t('timeline_desc')}
              lineHeight={260}
            />
            <TimelinePoint
              left="36%"
              label={t('timeline_kempinski')}
              time={t('min_5')}
              description={t('timeline_desc')}
              lineHeight={150}
            />

            {/* Flower icon point instead of dot for center */}
            <div className="absolute top-[50%] left-[54%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="absolute bottom-[20px] text-[#151926]">
                <svg
                  width="24"
                  height="24"
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
              <div className="h-2 w-2 rounded-full bg-[#151926] md:h-2.5 md:w-2.5"></div>
            </div>

            <TimelinePoint
              left="72%"
              label={t('timeline_puerto_banus')}
              time={t('min_20')}
              description={t('timeline_desc')}
              lineHeight={290}
            />
            <TimelinePoint
              left="88%"
              label={t('timeline_marbella')}
              time={t('min_25')}
              description={t('timeline_desc')}
              lineHeight={190}
            />
            <TimelinePoint
              left="100%"
              label={t('timeline_malaga')}
              time={t('min_45')}
              description={t('timeline_desc')}
              lineHeight={240}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
