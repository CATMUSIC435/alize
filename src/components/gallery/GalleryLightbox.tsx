'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useEffect } from 'react';
import type { GalleryItem } from '@/data/gallery';

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

type GalleryLightboxProps = {
  item: GalleryItem | null;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  currentIndex?: number;
  totalCount?: number;
};

export function GalleryLightbox(props: GalleryLightboxProps) {
  useEffect(() => {
    if (!props.item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') props.onClose();
      if (e.key === 'ArrowLeft' && props.onPrev) props.onPrev();
      if (e.key === 'ArrowRight' && props.onNext) props.onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [props]);

  return (
    <AnimatePresence>
      {props.item && (
        <motion.div
          key="lightbox-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#151926]/95 p-4 backdrop-blur-xl md:p-10 select-none"
          onClick={props.onClose}
        >
          {/* Top Control Bar */}
          <div className="absolute top-6 right-6 left-6 z-20 flex items-center justify-between text-white/70">
            <div className="flex items-center gap-3">
              <span
                className={`text-[10px] font-bold tracking-[0.25em] text-[#E0AC87] uppercase md:text-xs ${inter.className}`}
              >
                {props.item.categoryLabel}
              </span>
              {props.currentIndex !== undefined && props.totalCount !== undefined && (
                <span className="text-[10px] tracking-[0.2em] text-white/50 md:text-xs">
                  • {props.currentIndex + 1} / {props.totalCount}
                </span>
              )}
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={props.onClose}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-all hover:rotate-90 hover:border-[#E0AC87] hover:bg-white/10 md:h-12 md:w-12"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white transition-colors group-hover:text-[#E0AC87]"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Navigation Arrows */}
          {props.onPrev && (
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => {
                e.stopPropagation();
                props.onPrev?.();
              }}
              className="group absolute left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#E0AC87] hover:bg-white/10 md:left-8 md:h-14 md:w-14"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:-translate-x-0.5"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {props.onNext && (
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => {
                e.stopPropagation();
                props.onNext?.();
              }}
              className="group absolute right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all hover:border-[#E0AC87] hover:bg-white/10 md:right-8 md:h-14 md:w-14"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Modal Card Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{ clipPath: framePolygon }}
            className="relative flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden border border-[#8B7043]/30 bg-[#151926] shadow-2xl drop-shadow-2xl"
          >
            {/* Visual Media Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-black md:aspect-[16/9]">
              {props.item.videoUrl ? (
                <iframe
                  src={props.item.videoUrl}
                  title={props.item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <Image
                  src={props.item.image}
                  alt={props.item.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 85vw"
                  className="object-contain"
                />
              )}
            </div>

            {/* Architectural Caption Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 bg-[#151926] p-6 text-white md:flex-row md:items-center md:px-8 md:py-6">
              <div className="max-w-2xl">
                <h3 className={`text-xl font-normal text-white uppercase sm:text-2xl ${playfair.className}`}>
                  {props.item.title}
                </h3>
                <p className={`mt-1.5 text-xs text-white/70 sm:text-sm ${inter.className}`}>
                  {props.item.description}
                </p>
              </div>

              <div className="flex shrink-0 flex-col text-left md:text-right">
                <span className={`text-[10px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase ${inter.className}`}>
                  {props.item.location}
                </span>
                {props.item.photographer && (
                  <span className={`mt-1 text-[9px] tracking-[0.15em] text-white/50 uppercase ${inter.className}`}>
                    Art: {props.item.photographer}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
