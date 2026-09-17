'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import type { FloorLevel, UnitTypology } from '@/data/floorplans';
import { FloorLevelSelector } from './FloorLevelSelector';
import { UnitDetailModal } from './UnitDetailModal';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const platePolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

type FloorPlateViewerProps = {
  levels: FloorLevel[];
  units: UnitTypology[];
};

export function FloorPlateViewer(props: FloorPlateViewerProps) {
  const t = useTranslations('FloorplansPage');
  const [selectedLevelId, setSelectedLevelId] = useState<string>(
    props.levels[2]?.id ?? props.levels[0]?.id ?? 'floor-typical-low',
  );
  const [inspectedUnit, setInspectedUnit] = useState<UnitTypology | null>(null);

  const activeLevel = props.levels.find((lvl) => lvl.id === selectedLevelId) ?? props.levels[0]!;

  // Units available on this level
  const availableUnits = props.units.filter((unit) => activeLevel.unitIds.includes(unit.id));

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-16 md:px-12 md:py-24">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left Column: Vertical Floor Level Stepper (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 flex flex-col">
            <span
              className={`mb-2 text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase ${inter.className}`}
            >
              {t('section_levels_badge')}
            </span>
            <h2 className={`mb-6 text-2xl font-normal text-[#151926] uppercase md:text-3xl ${playfair.className}`}>
              {t('section_levels_title')}
            </h2>

            {/* Stepper list */}
            <FloorLevelSelector
              levels={props.levels}
              selectedLevelId={selectedLevelId}
              onSelectLevel={(id) => setSelectedLevelId(id)}
            />
          </div>
        </div>

        {/* Right Column: Master Floor Plate Display & Available Units (8 cols) */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeLevel.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col"
          >
            {/* Level Card Outer */}
            <div
              className="bg-[#D6D3C8] p-[1px] shadow-xl"
              style={{ clipPath: platePolygon }}
            >
              <div
                className="bg-[#F4F3ED] p-6 sm:p-8 md:p-10"
                style={{ clipPath: platePolygon }}
              >
                {/* Level Title and Zone Badge */}
                <div className="flex flex-col justify-between gap-3 border-b border-[#151926]/10 pb-6 sm:flex-row sm:items-center">
                  <div>
                    <span
                      className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase ${inter.className}`}
                    >
                      {activeLevel.range} • {t('elevation_prefix')} +{activeLevel.elevationMeters}m
                    </span>
                    <h3 className={`mt-1 text-2xl font-normal text-[#151926] uppercase md:text-3xl ${playfair.className}`}>
                      {activeLevel.name}
                    </h3>
                  </div>

                  <span className="self-start rounded-full border border-[#8B7043]/40 bg-[#8B7043]/10 px-3.5 py-1 text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase sm:self-auto">
                    {activeLevel.zoneLabel}
                  </span>
                </div>

                {/* Level Description */}
                <p className={`mt-4 text-xs leading-relaxed text-[#151926]/75 sm:text-sm ${inter.className}`}>
                  {activeLevel.description}
                </p>

                {/* Floor Plate Architectural Image */}
                <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-xl border border-[#151926]/15 bg-[#151926]">
                  <Image
                    src={activeLevel.floorPlateImage}
                    alt={activeLevel.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 65vw"
                    className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151926]/80 via-transparent to-transparent" />

                  {/* Orientations badge */}
                  <div className="absolute right-4 bottom-4 left-4 z-10 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      {activeLevel.viewOrientations.map((orientation, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-white/20 px-2.5 py-1 text-[8px] font-bold tracking-widest text-white uppercase backdrop-blur-md"
                        >
                          {orientation}
                        </span>
                      ))}
                    </div>

                    <span className="text-[9px] tracking-widest text-[#E0AC87] uppercase">
                      {t('ceiling_short')}: {activeLevel.ceilingHeight}
                    </span>
                  </div>
                </div>

                {/* Floor Key Highlights */}
                <div className="mt-8 border-t border-[#151926]/10 pt-6">
                  <h4 className={`text-xs font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
                    {t('highlights_label')}
                  </h4>
                  <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {activeLevel.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs text-[#151926]/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8B7043]" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available Unit Typologies Section */}
                {availableUnits.length > 0 && (
                  <div className="mt-10 border-t border-[#151926]/10 pt-8">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className={`text-sm font-bold tracking-[0.2em] text-[#151926] uppercase ${inter.className}`}>
                        {t('units_on_level_title')} ({availableUnits.length})
                      </h4>
                      <span className="text-[10px] text-[#8B7043] tracking-widest uppercase">
                        {t('click_unit_prompt')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                      {availableUnits.map((unit) => (
                        <div
                          key={unit.id}
                          onClick={() => setInspectedUnit(unit)}
                          className="group relative cursor-pointer overflow-hidden rounded-xl border border-[#151926]/15 bg-white p-5 transition-all duration-300 hover:border-[#8B7043] hover:shadow-lg"
                        >
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#8B7043]/10 px-2.5 py-0.5 text-[9px] font-bold text-[#8B7043]">
                              {unit.code}
                            </span>
                            <span className="text-xs font-semibold text-[#151926]">
                              {unit.grossArea} m²
                            </span>
                          </div>

                          <h5 className={`mt-2 text-base font-medium text-[#151926] uppercase group-hover:text-[#8B7043] transition-colors ${playfair.className}`}>
                            {unit.name}
                          </h5>

                          <div className="mt-3 flex items-center gap-4 text-xs text-[#151926]/60">
                            <span>{t('bedrooms_count', { count: unit.bedrooms })}</span>
                            <span>•</span>
                            <span>{t('bathrooms_count', { count: unit.bathrooms })}</span>
                            <span>•</span>
                            <span>{t('balcony_prefix')} {unit.balconyArea}m²</span>
                          </div>

                          <div className="mt-4 flex items-center justify-between border-t border-[#151926]/10 pt-3 text-[10px] font-bold tracking-wider text-[#8B7043] uppercase">
                            <span>{t('view_plan_button')}</span>
                            <span className="transition-transform group-hover:translate-x-1">→</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Unit Detail Modal */}
      <UnitDetailModal unit={inspectedUnit} onClose={() => setInspectedUnit(null)} />
    </section>
  );
}
