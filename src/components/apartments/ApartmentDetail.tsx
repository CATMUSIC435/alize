'use client';

import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import type { ApartmentData } from '@/data/apartments';

const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export function ApartmentDetail({ data }: { data: ApartmentData }) {
  const t = useTranslations('Index');
  const [activeTab, setActiveTab] = useState<'info' | 'benefits'>('info');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTypologyLabel = (typ: string) => {
    switch (typ) {
      case 'GROUND_FLOOR_BASEMENT': {
        return t('ground_floor_basement');
      }
      case 'FIRST_FLOOR': {
        return t('first_floor');
      }
      case 'PENTHOUSE': {
        return t('penthouse');
      }
      default: {
        return typ;
      }
    }
  };

  const slowTransition = { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const };

  const renderHeaderBlock = (layoutIdPrefix?: string, isAbsolute?: boolean) => {
    const isAnimated = !!layoutIdPrefix;
    const Container = isAnimated ? motion.div : 'div';
    const H1 = isAnimated ? motion.h1 : 'h1';
    const Div = isAnimated ? motion.div : 'div';
    const P = isAnimated ? motion.p : 'p';

    return (
      <Container
        {...(isAnimated
          ? { layoutId: `${layoutIdPrefix}-container`, transition: slowTransition }
          : {})}
        className={`mb-16 flex flex-col ${isAbsolute ? 'absolute top-0 left-0 z-10 w-full' : ''}`}
      >
        <H1
          {...(isAnimated ? { layout: 'position', transition: slowTransition } : {})}
          className={`mb-4 text-[13vw] leading-[0.9] tracking-tight uppercase sm:text-6xl md:text-7xl xl:text-[80px] ${playfair.className}`}
        >
          NO. {data.number}
        </H1>
        <Div
          {...(isAnimated ? { layout: 'position', transition: slowTransition } : {})}
          className={`mb-6 flex flex-col gap-1 text-[10px] font-bold tracking-[0.2em] uppercase md:text-[11px] ${inter.className}`}
        >
          <p>{getTypologyLabel(data.typology)}</p>
          <p className="opacity-60">
            {t('completion')}: {data.completion}
          </p>
        </Div>

        <P
          {...(isAnimated ? { layout: 'position', transition: slowTransition } : {})}
          className={`text-6xl leading-[0.8] opacity-80 md:text-7xl xl:text-[80px] ${playfair.className}`}
        >
          {data.bedrooms}
        </P>
      </Container>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F3ED] pt-24 text-[#151926]">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12">
        <LayoutGroup>
          <div className="flex flex-col gap-12 lg:flex-row xl:gap-24">
            {/* LEFT COLUMN - SCROLLABLE MEDIA */}
            <div className="flex w-full flex-col gap-6 md:gap-12 lg:w-[60%] xl:w-[65%]">
              {/* Left Header Placeholder (Visible when NOT scrolled) */}
              <div className="sticky top-32 z-20 hidden w-full lg:block">
                <div className="invisible" aria-hidden="true">
                  {renderHeaderBlock()}
                </div>
                {!isScrolled && renderHeaderBlock('header-block', true)}
              </div>
              <div className="lg:hidden">{renderHeaderBlock('header-block-mobile')}</div>

              {/* Main Floor Plan */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[4/3] w-full md:aspect-[16/9]"
              >
                <Image
                  src={data.image}
                  alt={`Floor plan for apartment ${data.number}`}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </motion.div>

              {/* Gallery Images */}
              {data.gallery && data.gallery.length > 0 && (
                <div className="flex flex-col gap-6 md:gap-12">
                  {data.gallery.map((img, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.8 }}
                      className="relative aspect-[4/3] w-full md:aspect-[16/9]"
                    >
                      <Image
                        src={img}
                        alt={`Gallery image ${idx + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - STICKY DETAILS */}
            <div className="relative w-full lg:w-[40%] xl:w-[35%]">
              <div className="flex flex-col pt-8 pb-12 lg:sticky lg:top-32 lg:max-h-[calc(100vh-8rem)] lg:pt-0">
                {/* Right Header Placeholder (Visible when scrolled) */}
                <div className="relative hidden shrink-0 lg:block">
                  <div className="invisible" aria-hidden="true">
                    {renderHeaderBlock()}
                  </div>
                  {isScrolled && renderHeaderBlock('header-block', true)}
                </div>

                {/* Scrollable Content */}
                <div className="flex flex-col lg:overflow-y-auto lg:[&::-webkit-scrollbar]:hidden">
                  {/* Specs block */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="mb-12 flex flex-col gap-6"
                  >
                    <div>
                      <p
                        className={`mb-1 text-[10px] font-bold tracking-[0.2em] uppercase ${inter.className}`}
                      >
                        {t('interior_area')}
                      </p>
                      <p className={`text-3xl md:text-4xl ${playfair.className}`}>{data.area} M²</p>
                    </div>
                    {data.terrace && (
                      <div>
                        <p
                          className={`mb-1 text-[10px] font-bold tracking-[0.2em] uppercase ${inter.className}`}
                        >
                          {t('terrace')}
                        </p>
                        <p className={`text-3xl md:text-4xl ${playfair.className}`}>
                          {data.terrace} M²
                        </p>
                      </div>
                    )}
                    {data.garden && (
                      <div>
                        <p
                          className={`mb-1 text-[10px] font-bold tracking-[0.2em] uppercase ${inter.className}`}
                        >
                          {t('garden')}
                        </p>
                        <p className={`text-3xl md:text-4xl ${playfair.className}`}>
                          {data.garden} M²
                        </p>
                      </div>
                    )}
                  </motion.div>

                  {/* Tabs block */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mb-16 flex flex-col"
                  >
                    <div
                      className={`mb-6 flex gap-8 border-b border-[#151926]/10 pb-4 text-[10px] font-bold tracking-[0.2em] uppercase md:text-[11px] ${inter.className}`}
                    >
                      <button
                        onClick={() => {
                          setActiveTab('info');
                        }}
                        className={`transition-opacity ${activeTab === 'info' ? 'opacity-100' : 'opacity-30'}`}
                      >
                        {t('info')}
                      </button>
                      <button
                        onClick={() => {
                          setActiveTab('benefits');
                        }}
                        className={`transition-opacity ${activeTab === 'benefits' ? 'opacity-100' : 'opacity-30'}`}
                      >
                        {t('benefits')}
                      </button>
                    </div>

                    <div className="relative min-h-[100px]">
                      <AnimatePresence mode="wait">
                        {activeTab === 'info' && (
                          <motion.p
                            key="info"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`text-sm leading-relaxed opacity-80 md:text-base ${inter.className}`}
                          >
                            {data.description ?? '-'}
                          </motion.p>
                        )}
                        {activeTab === 'benefits' && (
                          <motion.div
                            key="benefits"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-wrap gap-2"
                          >
                            {Array.isArray(data.benefits) ? (
                              data.benefits.map((benefit, idx) => (
                                <span
                                  key={idx}
                                  className={`rounded-full border border-[#151926]/10 px-4 py-2 text-[11px] opacity-70 ${inter.className}`}
                                >
                                  {benefit}
                                </span>
                              ))
                            ) : (
                              <span
                                className={`text-sm leading-relaxed opacity-80 md:text-base ${inter.className}`}
                              >
                                {data.benefits ?? '-'}
                              </span>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-auto flex items-center gap-4"
                  >
                    <button
                      className={`flex-1 rounded-full border border-[#151926] py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#151926] hover:text-[#F4F3ED] md:text-[11px] ${inter.className}`}
                    >
                      {t('submit_request')}
                    </button>
                    <button
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#151926] text-[10px] font-bold tracking-[0.2em] transition-colors duration-300 hover:bg-[#151926] hover:text-[#F4F3ED] ${inter.className}`}
                    >
                      {t('pdf')}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
