'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import type { ApartmentData } from '@/data/apartments';
import { Link } from '@/libs/I18nNavigation';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function ApartmentDetail(props: { data: ApartmentData }) {
  const t = useTranslations('Index');
  const tMenu = useTranslations('Menu');
  const [activeTab, setActiveTab] = useState<'info' | 'benefits'>('info');

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

  return (
    <article className="bg-textured-sand min-h-screen pt-28 text-[#151926] md:pt-36">
      <div className="mx-auto w-full max-w-[1600px] px-6 pb-24 md:px-12">
        {/* Top Breadcrumb & Project Tagline */}
        <div className="mb-10 flex flex-col justify-between gap-4 border-b border-[#151926]/10 pb-6 md:flex-row md:items-center">
          <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#151926]/60 uppercase md:text-[11px] ${inter.className}`}
          >
            <Link href="/" className="transition-colors hover:text-[#8B7043]">
              {tMenu('home')}
            </Link>
            <span>/</span>
            <Link href="/apartments" className="transition-colors hover:text-[#8B7043]">
              {t('select_apartment')}
            </Link>
            <span>/</span>
            <span className="text-[#8B7043]">NO. {props.data.number}</span>
          </nav>

          <span
            className={`text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
          >
            ALIZÉ RESIDENCE • BỜ BIỂN MỸ KHÊ
          </span>
        </div>

        {/* 2-COLUMN LAYOUT: MEDIA ON LEFT (60%), DETAILS STICKY ON RIGHT (40%) */}
        <div className="flex flex-col gap-12 lg:flex-row xl:gap-20">
          {/* LEFT COLUMN - SCROLLABLE MEDIA & GALLERY (60-65%) */}
          <div className="flex w-full flex-col gap-10 lg:w-[58%] xl:w-[62%]">
            {/* Primary Floor Plan Card */}
            <div className="flex flex-col">
              <div className="mb-4 flex items-center justify-between">
                <span
                  className={`text-[9px] font-bold tracking-[0.25em] text-[#151926]/60 uppercase md:text-[10px] ${inter.className}`}
                >
                  SƠ ĐỒ MẶT BẰNG CHI TIẾT
                </span>
                <span
                  className={`text-[9px] tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}
                >
                  TỶ LỆ CHUẨN 1:100
                </span>
              </div>

              <div className="w-full drop-shadow-md filter">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4F3ED] p-4 md:aspect-[16/10] md:p-8"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={props.data.image}
                        alt={`Floor plan for apartment ${props.data.number}`}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 62vw"
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery Images */}
            {props.data.gallery && props.data.gallery.length > 0 && (
              <div className="flex flex-col gap-8 md:gap-12">
                <div className="flex items-center gap-4 border-t border-[#151926]/10 pt-8">
                  <span
                    className={`text-[9px] font-bold tracking-[0.25em] text-[#151926]/60 uppercase md:text-[10px] ${inter.className}`}
                  >
                    KHÔNG GIAN NỘI THẤT & PHỐI CẢNH BIỂN
                  </span>
                  <div className="h-[1px] flex-1 bg-[#151926]/10" />
                </div>

                {props.data.gallery.map((img, idx) => (
                  <div
                    key={idx}
                    className="group relative aspect-[16/10] w-full overflow-hidden drop-shadow-md filter"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    <Image
                      src={img}
                      alt={`Apartment ${props.data.number} perspective ${idx + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 62vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#151926]/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-4 left-6 text-[9px] font-bold tracking-[0.2em] text-white uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ALIZÉ RESIDENCE • PERSPECTIVE 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - CLEAN SPECIFICATIONS & ACTIONS (STAYS ON RIGHT, NO FLYING ANIMATION) */}
          <aside
            aria-label="Apartment Specifications"
            className="relative w-full lg:w-[42%] xl:w-[38%]"
          >
            <div className="flex flex-col space-y-8 lg:sticky lg:top-32">
              {/* PRIMARY RESIDENCE IDENTIFIER CARD */}
              <div className="w-full drop-shadow-md filter">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="flex flex-col bg-[#F4F3ED] p-8 sm:p-10"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    {/* Header Row */}
                    <div className="mb-6 flex items-center justify-between border-b border-[#151926]/10 pb-4">
                      <span
                        className={`text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
                      >
                        BỘ SƯU TẬP GIỚI HẠN
                      </span>
                      <span
                        className={`text-[9px] tracking-[0.2em] text-[#151926]/40 uppercase ${inter.className}`}
                      >
                        {t('block')} {props.data.block} • {t('floor')} {props.data.floor}
                      </span>
                    </div>

                    {/* Big Bold Title */}
                    <h1
                      className={`text-6xl font-medium tracking-tight text-[#151926] uppercase sm:text-7xl xl:text-[82px] leading-none ${playfair.className}`}
                      style={{ transform: 'scaleY(1.1)', transformOrigin: 'bottom left' }}
                    >
                      NO. {props.data.number}
                    </h1>

                    {/* Subtitle / Typology & Completion */}
                    <div
                      className={`mt-6 flex flex-col gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase md:text-xs ${inter.className}`}
                    >
                      <p className="text-[#151926]">{getTypologyLabel(props.data.typology)}</p>
                      <p className="text-[#151926]/50">
                        {t('completion')}: {props.data.completion}
                      </p>
                    </div>

                    {/* KEY SPECS GRID */}
                    <div className="mt-8 grid grid-cols-2 gap-6 border-t border-[#151926]/10 pt-8">
                      {/* Bedrooms */}
                      <div className="flex flex-col">
                        <span
                          className={`mb-1 text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
                        >
                          {t('bedrooms')}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`text-4xl text-[#151926] md:text-5xl ${playfair.className}`}
                          >
                            {props.data.bedrooms}
                          </span>
                          <span
                            className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}
                          >
                            {t('bed')}
                          </span>
                        </div>
                      </div>

                      {/* Interior Area */}
                      <div className="flex flex-col">
                        <span
                          className={`mb-1 text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
                        >
                          {t('interior_area')}
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span
                            className={`text-4xl text-[#151926] md:text-5xl ${playfair.className}`}
                          >
                            {props.data.area}
                          </span>
                          <span
                            className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}
                          >
                            M²
                          </span>
                        </div>
                      </div>

                      {/* Terrace (if any) */}
                      {props.data.terrace && (
                        <div className="flex flex-col">
                          <span
                            className={`mb-1 text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
                          >
                            {t('terrace')}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-3xl text-[#151926] md:text-4xl ${playfair.className}`}
                            >
                              {props.data.terrace}
                            </span>
                            <span
                              className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}
                            >
                              M²
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Garden (if any) */}
                      {props.data.garden && (
                        <div className="flex flex-col">
                          <span
                            className={`mb-1 text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase md:text-[10px] ${inter.className}`}
                          >
                            {t('garden')}
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span
                              className={`text-3xl text-[#151926] md:text-4xl ${playfair.className}`}
                            >
                              {props.data.garden}
                            </span>
                            <span
                              className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}
                            >
                              M²
                            </span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* TABS: THÔNG TIN & TIỆN ÍCH */}
                    <div className="mt-8 flex flex-col border-t border-[#151926]/10 pt-6">
                      <div className="mb-4 flex gap-8 border-b border-[#151926]/10 pb-3">
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('info');
                          }}
                          className={`cursor-pointer text-[10px] font-bold tracking-[0.2em] uppercase transition-colors md:text-xs ${
                            activeTab === 'info'
                              ? 'text-[#8B7043] border-b-2 border-[#8B7043] -mb-[13px] pb-3'
                              : 'text-[#151926]/40 hover:text-[#151926]'
                          } ${inter.className}`}
                        >
                          {t('info')}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('benefits');
                          }}
                          className={`cursor-pointer text-[10px] font-bold tracking-[0.2em] uppercase transition-colors md:text-xs ${
                            activeTab === 'benefits'
                              ? 'text-[#8B7043] border-b-2 border-[#8B7043] -mb-[13px] pb-3'
                              : 'text-[#151926]/40 hover:text-[#151926]'
                          } ${inter.className}`}
                        >
                          {t('benefits')}
                        </button>
                      </div>

                      <div className="min-h-[110px] pt-2">
                        <AnimatePresence mode="wait">
                          {activeTab === 'info' && (
                            <motion.p
                              key="info"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className={`text-xs leading-relaxed text-[#151926]/80 sm:text-sm ${inter.className}`}
                            >
                              {props.data.description ?? '-'}
                            </motion.p>
                          )}
                          {activeTab === 'benefits' && (
                            <motion.div
                              key="benefits"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.2 }}
                              className="flex flex-wrap gap-2"
                            >
                              {Array.isArray(props.data.benefits) ? (
                                props.data.benefits.map((benefit, idx) => (
                                  <span
                                    key={idx}
                                    className={`rounded-full border border-[#151926]/15 bg-white/50 px-3.5 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#151926] uppercase transition-colors hover:border-[#8B7043] hover:text-[#8B7043] ${inter.className}`}
                                  >
                                    #{benefit}
                                  </span>
                                ))
                              ) : (
                                <span
                                  className={`text-xs leading-relaxed text-[#151926]/80 ${inter.className}`}
                                >
                                  {props.data.benefits ?? '-'}
                                </span>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <a
                        href="#contact"
                        className={`flex flex-1 items-center justify-center gap-2 rounded-full border border-[#151926] bg-[#151926] py-4 text-center text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 hover:border-[#8B7043] hover:bg-[#8B7043] md:text-xs ${inter.className}`}
                      >
                        {t('submit_request')}
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          window.print();
                        }}
                        className={`flex items-center justify-center gap-2 rounded-full border border-[#151926]/20 bg-white/60 px-6 py-4 text-[10px] font-bold tracking-[0.2em] text-[#151926] uppercase transition-all duration-300 hover:border-[#151926] hover:bg-white md:text-xs ${inter.className}`}
                      >
                        {t('pdf')}
                      </button>
                    </div>

                    {/* Direct Contact Shortcut */}
                    <div className="mt-6 flex items-center justify-between border-t border-[#151926]/10 pt-4 text-[10px]">
                      <span
                        className={`tracking-[0.15em] text-[#151926]/50 uppercase ${inter.className}`}
                      >
                        HOTLINE TƯ VẤN
                      </span>
                      <a
                        href="tel:+84965355355"
                        className={`font-bold tracking-[0.15em] text-[#8B7043] transition-colors hover:text-[#151926] ${inter.className}`}
                      >
                        +84 (965) 355-355
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
