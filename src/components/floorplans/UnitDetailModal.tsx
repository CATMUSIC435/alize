'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { UnitTypology } from '@/data/floorplans';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const framePolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

type UnitDetailModalProps = {
  unit: UnitTypology | null;
  onClose: () => void;
};

export function UnitDetailModal(props: UnitDetailModalProps) {
  const t = useTranslations('FloorplansPage');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  useEffect(() => {
    if (!props.unit) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props]);

  return (
    <AnimatePresence>
      {props.unit && (
        <motion.div
          key="unit-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#151926]/90 p-4 backdrop-blur-xl md:p-8 select-none"
          onClick={props.onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ clipPath: framePolygon }}
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-y-auto border border-[#8B7043]/40 bg-[#151926] text-white shadow-2xl"
          >
            {/* Header with Close */}
            <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#151926]/95 px-6 py-4 backdrop-blur-md md:px-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#E0AC87]/40 bg-[#E0AC87]/10 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase">
                  {props.unit.code}
                </span>
                <span className={`text-base font-normal uppercase sm:text-xl ${playfair.className}`}>
                  {props.unit.name}
                </span>
              </div>

              <button
                type="button"
                aria-label={t('modal_close')}
                onClick={props.onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-all hover:rotate-90 hover:border-[#E0AC87] hover:bg-white/10"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Body: 2 Columns */}
            <div className="grid grid-cols-1 gap-8 p-6 lg:grid-cols-12 md:p-8">
              {/* Left Column: Visual Plan (2D CAD vs 3D Perspective toggle) */}
              <div className="flex flex-col lg:col-span-7">
                {/* 2D / 3D Toggle */}
                <div className="mb-4 flex items-center justify-between">
                  <span className={`text-[10px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase ${inter.className}`}>
                    {viewMode === '3d' ? t('view_mode_3d_label') : t('view_mode_2d_label')}
                  </span>
                  <div className="flex rounded-full border border-white/20 bg-white/5 p-1">
                    <button
                      type="button"
                      onClick={() => setViewMode('3d')}
                      className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-widest uppercase transition-all ${
                        viewMode === '3d'
                          ? 'bg-[#E0AC87] text-[#151926]'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t('toggle_3d')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode('2d')}
                      className={`rounded-full px-3 py-1 text-[9px] font-bold tracking-widest uppercase transition-all ${
                        viewMode === '2d'
                          ? 'bg-[#E0AC87] text-[#151926]'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {t('toggle_2d')}
                    </button>
                  </div>
                </div>

                {/* Plan Visual Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-white/10 bg-black/40">
                  <Image
                    src={viewMode === '3d' ? props.unit.plan3DImage : props.unit.plan2DImage}
                    alt={props.unit.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-contain p-4"
                  />
                  <div className="absolute right-3 bottom-3 rounded-full bg-[#151926]/80 px-2.5 py-1 text-[8px] tracking-widest text-[#E0AC87] uppercase backdrop-blur-md">
                    {props.unit.facing}
                  </div>
                </div>
              </div>

              {/* Right Column: Key Technical Specs & Features */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className={`text-xs leading-relaxed text-white/75 md:text-sm ${inter.className}`}>
                    {props.unit.description}
                  </p>

                  {/* Specs Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 border-y border-white/10 py-5">
                    <div>
                      <span className={`block text-[9px] tracking-widest text-white/50 uppercase ${inter.className}`}>
                        {t('spec_gross_area')}
                      </span>
                      <span className={`text-lg font-light text-white ${playfair.className}`}>
                        {props.unit.grossArea} m²
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[9px] tracking-widest text-white/50 uppercase ${inter.className}`}>
                        {t('spec_net_area')}
                      </span>
                      <span className={`text-lg font-light text-white ${playfair.className}`}>
                        {props.unit.netArea} m²
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[9px] tracking-widest text-white/50 uppercase ${inter.className}`}>
                        {t('spec_balcony_area')}
                      </span>
                      <span className={`text-lg font-light text-[#E0AC87] ${playfair.className}`}>
                        {props.unit.balconyArea} m²
                      </span>
                    </div>
                    <div>
                      <span className={`block text-[9px] tracking-widest text-white/50 uppercase ${inter.className}`}>
                        {t('spec_ceiling')}
                      </span>
                      <span className={`text-lg font-light text-white ${playfair.className}`}>
                        {props.unit.ceilingHeight}
                      </span>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="mt-6">
                    <span className={`block text-[9px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase ${inter.className}`}>
                      {t('spec_handover_standard')}
                    </span>
                    <ul className="mt-3 space-y-2">
                      {props.unit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-white/80">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E0AC87]" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Consultation CTA */}
                <div className="mt-8 pt-4">
                  <Link
                    href="/contact"
                    onClick={props.onClose}
                    className="flex w-full items-center justify-center rounded-lg border border-[#8B7043] bg-gradient-to-r from-[#8B7043] to-[#A38550] py-3 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-md transition-all hover:brightness-110"
                  >
                    {t('btn_inquire_unit')}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
