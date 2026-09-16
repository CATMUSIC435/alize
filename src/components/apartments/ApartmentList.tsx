'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState, useRef, useEffect, useMemo } from 'react';
import { APARTMENTS_DATA } from '@/data/apartments';
import { ApartmentCard } from './ApartmentCard';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

const TYPOLOGIES = ['ALL', 'GROUND_FLOOR_BASEMENT', 'FIRST_FLOOR', 'PENTHOUSE'] as const;
const BEDROOMS = ['ALL', '2', '3', '4'] as const;
const SORTS = ['RELEVANT', 'AREA_LOW_HIGH', 'AREA_HIGH_LOW'] as const;

export function ApartmentList() {
  const t = useTranslations('Index');

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
        return t('all');
      }
    }
  };

  const getSortLabel = (sort: string) => {
    switch (sort) {
      case 'AREA_LOW_HIGH': {
        return t('area_low_high');
      }
      case 'AREA_HIGH_LOW': {
        return t('area_high_low');
      }
      default: {
        return t('relevant');
      }
    }
  };

  const [activeDropdown, setActiveDropdown] = useState<'typology' | 'bedrooms' | 'sort' | null>(
    null,
  );

  const [filterTypology, setFilterTypology] = useState<string>('ALL');
  const [filterBedrooms, setFilterBedrooms] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('RELEVANT');

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredAndSortedData = useMemo(() => {
    let data = [...APARTMENTS_DATA];

    if (filterTypology !== 'ALL') {
      data = data.filter((apt) => apt.typology === filterTypology);
    }
    if (filterBedrooms !== 'ALL') {
      data = data.filter((apt) => apt.bedrooms.toString() === filterBedrooms);
    }
    if (sortBy === 'AREA_LOW_HIGH') {
      data.sort((a, b) => a.area - b.area);
    } else if (sortBy === 'AREA_HIGH_LOW') {
      data.sort((a, b) => b.area - a.area);
    }

    return data;
  }, [filterTypology, filterBedrooms, sortBy]);

  const toggleDropdown = (dropdown: 'typology' | 'bedrooms' | 'sort') => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleReset = () => {
    setFilterTypology('ALL');
    setFilterBedrooms('ALL');
    setSortBy('RELEVANT');
    setActiveDropdown(null);
  };

  return (
    <section className="relative w-full px-6 py-12 md:px-12 md:py-24">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* Filter Bar */}
        <div className="relative z-20 mb-12 w-full">
          {/* Background Layer with Clip Path */}
          <div
            className="absolute inset-0 z-0 bg-[#D6D3C8] p-[1px]"
            style={{ clipPath: clipPathPolygon }}
          >
            <div className="h-full w-full bg-[#F4F3ED]" style={{ clipPath: clipPathPolygon }} />
          </div>

          {/* Content Layer (Not clipped) */}
          <div className="relative z-10 flex w-full flex-col items-start justify-between gap-6 px-8 py-6 md:flex-row md:items-center md:gap-0 md:py-8">
            <div
              className={`flex flex-wrap items-center gap-8 text-[10px] font-bold tracking-[0.2em] text-[#151926] uppercase md:gap-16 md:text-xs ${inter.className}`}
              ref={dropdownRef}
            >
              {/* Typology Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    toggleDropdown('typology');
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-70 focus:outline-none"
                >
                  <span className="opacity-60">{t('typology')}</span>
                  <span>{getTypologyLabel(filterTypology)}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform ${activeDropdown === 'typology' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'typology' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-6 min-w-[260px] bg-[#D6D3C8] p-[1px]"
                      style={{
                        clipPath: dropdownClip,
                        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col bg-[#F4F3ED] py-2"
                        style={{ clipPath: dropdownClip }}
                      >
                        {TYPOLOGIES.map((typ) => (
                          <button
                            key={typ}
                            onClick={() => {
                              setFilterTypology(typ);
                              setActiveDropdown(null);
                            }}
                            className={`w-full px-5 py-3 text-left transition-colors hover:bg-[#D6D3C8]/40 focus:outline-none ${filterTypology === typ ? 'text-[#151926]' : 'text-[#151926]/60'}`}
                          >
                            {getTypologyLabel(typ)}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bedrooms Filter */}
              <div className="relative">
                <button
                  onClick={() => {
                    toggleDropdown('bedrooms');
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-70 focus:outline-none"
                >
                  <span className="opacity-60">{t('bedrooms')}</span>
                  <span>{filterBedrooms === 'ALL' ? t('all') : filterBedrooms}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform ${activeDropdown === 'bedrooms' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'bedrooms' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-6 min-w-[150px] bg-[#D6D3C8] p-[1px]"
                      style={{
                        clipPath: dropdownClip,
                        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col bg-[#F4F3ED] py-2"
                        style={{ clipPath: dropdownClip }}
                      >
                        {BEDROOMS.map((bed) => (
                          <button
                            key={bed}
                            onClick={() => {
                              setFilterBedrooms(bed);
                              setActiveDropdown(null);
                            }}
                            className={`w-full px-5 py-3 text-left transition-colors hover:bg-[#D6D3C8]/40 focus:outline-none ${filterBedrooms === bed ? 'text-[#151926]' : 'text-[#151926]/60'}`}
                          >
                            {bed === 'ALL' ? t('all') : bed}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort By */}
              <div className="relative">
                <button
                  onClick={() => {
                    toggleDropdown('sort');
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-70 focus:outline-none"
                >
                  <span className="opacity-60">{t('sort_by')}</span>
                  <span>{getSortLabel(sortBy)}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === 'sort' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-6 min-w-[260px] bg-[#D6D3C8] p-[1px]"
                      style={{
                        clipPath: dropdownClip,
                        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col bg-[#F4F3ED] py-2"
                        style={{ clipPath: dropdownClip }}
                      >
                        {SORTS.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              setSortBy(s);
                              setActiveDropdown(null);
                            }}
                            className={`w-full px-5 py-3 text-left transition-colors hover:bg-[#D6D3C8]/40 focus:outline-none ${sortBy === s ? 'text-[#151926]' : 'text-[#151926]/60'}`}
                          >
                            {getSortLabel(s)}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={handleReset}
              className={`mt-6 text-[10px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase transition-colors hover:text-[#151926] focus:outline-none md:mt-0 md:text-xs ${inter.className}`}
            >
              {t('reset')}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedData.map((apt) => (
            <ApartmentCard
              key={apt.id}
              data={{ ...apt, typology: getTypologyLabel(apt.typology) }}
            />
          ))}

          {/* Boutique Concept Promo Card */}
          <div
            className="group relative h-[700px] w-full cursor-pointer overflow-hidden lg:h-auto"
            style={{ clipPath: clipPathPolygon }}
          >
            <Image
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"
              alt="Boutique Concept"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-10">
              <h3
                className={`mb-6 text-5xl tracking-tighter text-white uppercase md:text-6xl ${playfair.className}`}
                style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom left' }}
              >
                {t('boutique_concept')}
              </h3>
              <p
                className={`max-w-sm text-sm leading-relaxed font-light text-white/90 md:text-base ${inter.className}`}
              >
                {t('boutique_desc')}
              </p>
            </div>

            <div className="absolute top-10 right-10 text-right">
              <p
                className={`text-[10px] leading-loose font-bold tracking-[0.2em] text-white uppercase md:text-xs ${inter.className}`}
                style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
              >
                {t('book_a_call_contact')
                  .split(' ')
                  .map((word, i, arr) =>
                    i === arr.length - 1 ? (
                      <span key={i}>{word}</span>
                    ) : (
                      <span key={i}>
                        {word}
                        <br />
                      </span>
                    ),
                  )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
