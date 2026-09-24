'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { inter } from '@/utils/Fonts';

/**
 * Lightweight, zero-CLS Image slider for mobile screens and progressive enhancement fallback.
 * Uses native Next.js Image optimization without importing Three.js or initializing WebGL contexts.
 */
export function SimpleSlider(props: {
  images: string[];
  activeIndex?: number;
  onIndexChange?: (index: number) => void;
  hideControls?: boolean;
  absoluteFill?: boolean;
  fullHeight?: boolean;
  alignRight?: boolean;
  controlsLeft?: boolean;
  noRounded?: boolean;
  autoplay?: boolean;
  className?: string;
}) {
  const isControlled = props.activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = isControlled ? (props.activeIndex ?? 0) : internalIndex;

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    if (props.onIndexChange) {
      props.onIndexChange(newIndex);
    }
  };

  const goToNext = () => {
    if (props.images.length === 0) return;
    const nextIndex = (currentIndex + 1) % props.images.length;
    handleIndexChange(nextIndex);
  };

  const goToPrev = () => {
    if (props.images.length === 0) return;
    const prevIndex = currentIndex === 0 ? props.images.length - 1 : currentIndex - 1;
    handleIndexChange(prevIndex);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      goToNext();
    } else if (diff < -45) {
      goToPrev();
    }
    setTouchStartX(null);
  };

  useEffect(() => {
    if (!props.autoplay || props.images.length <= 1) return;
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [props.autoplay, props.images.length, currentIndex]);

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');

  let containerClasses = `relative mx-auto mb-20 aspect-[4/3] w-full max-w-[1000px] md:mb-28 md:aspect-[16/9] ${props.className ?? ''}`;
  if (props.absoluteFill) {
    containerClasses = `absolute inset-0 h-full w-full ${props.className ?? ''}`;
  } else if (props.fullHeight && props.alignRight) {
    containerClasses = `relative ml-auto w-[95%] md:w-[85%] h-[80vh] md:h-[90vh] ${props.className ?? ''}`;
  }

  const viewportClasses = `relative h-full w-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${
    props.noRounded ? 'rounded-none' : 'rounded-xl'
  }`;

  let controlsClasses =
    'pointer-events-auto absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-8 md:-bottom-20 md:gap-12';
  if (props.controlsLeft) {
    controlsClasses =
      'pointer-events-auto absolute -bottom-16 left-0 z-30 flex items-center gap-4 md:-bottom-20 md:gap-8';
  }

  const currentImageSrc = props.images[currentIndex] ?? props.images[0] ?? '';

  return (
    <div className={containerClasses}>
      <div
        className={`${viewportClasses} touch-pan-y select-none`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {currentImageSrc && (
            <motion.div
              key={currentImageSrc}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 h-full w-full"
            >
              <Image
                src={currentImageSrc}
                alt="Slider View"
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
                priority={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!props.hideControls && (
        <div className={controlsClasses}>
          <button
            type="button"
            onClick={goToPrev}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/50 transition-colors duration-300 hover:text-[#151926]"
            aria-label="Previous image"
          >
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              className="transition-transform duration-500 ease-out group-hover:-translate-x-2"
            >
              <path
                d="M5 1L1 5L5 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 5H27"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="flex items-center gap-6">
            <span
              className={`text-[11px] text-[#151926] md:text-xs ${inter.className} font-light tracking-widest`}
            >
              {formattedIndex}
            </span>
            <div className="relative h-[1px] w-16 overflow-hidden bg-[#151926]/20 md:w-24">
              <motion.div
                className="absolute top-0 bottom-0 left-0 w-full bg-[#151926] origin-left"
                style={{ willChange: 'transform' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: (currentIndex + 1) / Math.max(props.images.length, 1) }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span
              className={`text-[11px] text-[#151926]/50 md:text-xs ${inter.className} font-light tracking-widest`}
            >
              {String(props.images.length).padStart(2, '0')}
            </span>
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="group relative flex h-12 w-12 cursor-pointer items-center justify-center text-[#151926]/50 transition-colors duration-300 hover:text-[#151926]"
            aria-label="Next image"
          >
            <svg
              width="28"
              height="10"
              viewBox="0 0 28 10"
              fill="none"
              className="transition-transform duration-500 ease-out group-hover:translate-x-2"
            >
              <path
                d="M23 1L27 5L23 9"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M27 5H1"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
