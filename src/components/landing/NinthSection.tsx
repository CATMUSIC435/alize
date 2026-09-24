'use client';

import { motion } from 'framer-motion';
import { SmartVideo } from '@/components/SmartVideo';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { inter, playfair } from '@/utils/Fonts';
import { RevealHeading, RevealLabel, RevealLine, RevealParagraph } from './RevealText';

export function NinthSection() {
  const t = useTranslations('Index');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [
    {
      label: t('developer'),
      value: t('developer_val'),
      detail: t('developer_detail'),
    },
    {
      label: t('sales_marketing'),
      value: t('sales_marketing_val'),
      detail: t('sales_marketing_detail'),
    },
    {
      label: t('architect_design'),
      value: t('architect_design_val'),
      detail: t('architect_design_detail'),
    },
    {
      label: t('license_obtained'),
      value: t('license_obtained_val'),
      detail: t('license_obtained_detail'),
    },
  ];

  return (
    <section className="bg-textured-sand relative flex w-full flex-col items-center justify-start overflow-x-clip py-24 text-[#151926] md:py-40">
      {/* Top indicator with subtle vertical line */}
      <div className="top-20 z-20 flex flex-col items-center justify-center md:top-28">
        <RevealLabel
          text={t('developer_partners')}
          className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
        />
        <RevealLine
          direction="vertical"
          className="my-6 h-12 w-[1px] bg-[#151926]/25 md:my-8 md:h-20"
        />
      </div>

      {/* Main Developer Narrative */}
      <div className="relative z-10 flex max-w-[860px] flex-col items-center px-6 text-center">
        <RevealHeading
          as="h2"
          text={t('at_group_title')}
          className={`text-2xl font-medium tracking-tight text-[#151926] uppercase sm:text-3xl md:text-4xl lg:text-[44px] lg:leading-[1.25] ${playfair.className}`}
        />

        <div
          className={`mt-6 space-y-4 text-sm leading-[1.85] font-light text-[#2D3346] sm:text-base sm:leading-[1.9] md:mt-8 md:text-[16px] md:leading-[1.9] ${inter.className}`}
        >
          <RevealParagraph text={t('at_group_desc_1')} />
          <RevealParagraph text={t('at_group_desc_2')} delay={0.28} />
        </div>
      </div>

      {/* Interactive Pillars & Key Project Information */}
      <div className="relative z-10 mt-20 flex w-full max-w-[1000px] flex-col items-center px-6 md:mt-28">
        <div className="w-full divide-y divide-[#151926]/15 border-y border-[#151926]/15">
          {items.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                className="group w-full cursor-pointer py-6 transition-colors duration-300 md:py-8"
                onClick={() => {
                  setOpenIndex(isOpen ? null : idx);
                }}
              >
                <div className="flex w-full items-center justify-between select-none">
                  <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-baseline sm:gap-6">
                    <span
                      className={`text-[10px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
                    >
                      {item.label}
                    </span>
                    <h3
                      className={`text-2xl font-medium tracking-tight text-[#151926] uppercase transition-colors duration-300 group-hover:text-[#8B7043] sm:text-3xl md:text-4xl lg:text-[40px] ${playfair.className}`}
                      style={{ transform: 'scaleY(1.15)', transformOrigin: 'left center' }}
                    >
                      {item.value}
                    </h3>
                  </div>

                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-out ${
                      isOpen
                        ? 'border-[#151926] bg-[#151926] text-white'
                        : 'border-[#151926]/20 text-[#151926] group-hover:border-[#151926] group-hover:bg-[#151926] group-hover:text-white'
                    }`}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transform transition-transform duration-300 ease-out origin-center ${
                        isOpen ? 'rotate-45' : 'rotate-0'
                      }`}
                    >
                      <path
                        d="M7 1V13M1 7H13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>

                <div
                  className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div
                      className={`pt-5 transition-opacity duration-300 ease-out ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <p
                        className={`text-sm leading-relaxed text-[#2D3346] md:max-w-[75%] md:text-[15px] ${inter.className}`}
                      >
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Right side bleeding flowers */}
      <div className="pointer-events-none absolute top-1/3 right-[-10%] z-0 hidden w-[80vw] max-w-[700px] -translate-y-1/2 rotate-y-[175deg] rotate-z-[-40deg] md:right-[-10em] md:block md:w-[55vw] lg:top-1/2 lg:right-[-5%] lg:rotate-z-[-30deg]">
        <SmartVideo
          autoPlay
          loop
          muted
          playsInline
          aria-label="Bougainvillea flowers video"
          className="safari-video-hide h-full w-full object-cover opacity-90 mix-blend-multiply"
          src="/bougainvillea-flowers_03.webm"
        />
      </div>
    </section>
  );
}
