'use client';

import { motion, useInView } from 'framer-motion';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion, useWebGLTransition } from '@/hooks';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600'] });

type WebGLSliderProps = {
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
};

/**
 * High-performance WebGL Slider with liquid wave ripple transition and zero-CLS fallback.
 * Uses useWebGLTransition hook for Three.js lifecycle, offscreen pausing, and context loss handling.
 */
export function WebGLSlider(props: WebGLSliderProps) {
  const {
    images,
    activeIndex,
    onIndexChange,
    hideControls = false,
    absoluteFill = false,
    fullHeight = false,
    alignRight = false,
    controlsLeft = false,
    noRounded = false,
    autoplay = false,
    className = '',
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isControlled = activeIndex !== undefined;
  const [internalIndex, setInternalIndex] = useState(0);
  const currentIndex = isControlled ? activeIndex : internalIndex;

  const prefersReducedMotion = usePrefersReducedMotion();
  // Observe container with 200px margin without freezeOnceVisible to pause RAF when offscreen
  const isInView = useInView(containerRef, { margin: '200px' });

  const handleTransitionComplete = useCallback(
    (newIndex: number) => {
      if (!isControlled) {
        setInternalIndex(newIndex);
      }
      if (onIndexChange) {
        onIndexChange(newIndex);
      }
    },
    [isControlled, onIndexChange],
  );

  const { isReady, isContextLost, goToIndex: triggerWebGLTransition } = useWebGLTransition({
    canvasRef,
    containerRef,
    images,
    currentIndex,
    isInView: isInView && !prefersReducedMotion,
    onTransitionComplete: handleTransitionComplete,
  });

  const goToIndex = useCallback(
    (newIndex: number) => {
      if (newIndex === currentIndex || newIndex < 0 || newIndex >= images.length) {
        return;
      }

      if (prefersReducedMotion || isContextLost || !isReady) {
        // Fallback for reduced-motion or pending WebGL initialization
        handleTransitionComplete(newIndex);
      } else {
        triggerWebGLTransition(newIndex);
      }
    },
    [currentIndex, images.length, prefersReducedMotion, isContextLost, isReady, handleTransitionComplete, triggerWebGLTransition],
  );

  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % images.length;
    goToIndex(nextIndex);
  }, [currentIndex, images.length, goToIndex]);

  const goToPrev = useCallback(() => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToIndex(prevIndex);
  }, [currentIndex, images.length, goToIndex]);

  useEffect(() => {
    if (isControlled && activeIndex !== undefined && activeIndex !== currentIndex) {
      goToIndex(activeIndex);
    }
  }, [activeIndex, isControlled, currentIndex, goToIndex]);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;
    if (autoplay && isInView) {
      intervalId = setInterval(() => {
        goToNext();
      }, 4000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [autoplay, isInView, goToNext]);

  const formattedIndex = String(currentIndex + 1).padStart(2, '0');

  let containerClasses = `relative mx-auto mb-20 aspect-[4/3] w-full max-w-[1000px] md:mb-28 md:aspect-[16/9] ${className}`;
  if (absoluteFill) {
    containerClasses = `absolute inset-0 h-full w-full ${className}`;
  } else if (fullHeight && alignRight) {
    containerClasses = `relative ml-auto w-[95%] md:w-[85%] h-[80vh] md:h-[90vh] ${className}`;
  }

  const viewportClasses = `relative h-full w-full overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] ${
    noRounded ? 'rounded-none' : 'rounded-xl'
  }`;

  let controlsClasses =
    'pointer-events-auto absolute -bottom-16 left-1/2 z-30 flex -translate-x-1/2 items-center gap-8 md:-bottom-20 md:gap-12';
  if (controlsLeft) {
    controlsClasses =
      'pointer-events-auto absolute -bottom-16 left-0 z-30 flex items-center gap-4 md:-bottom-20 md:gap-8';
  }

  const fallbackImageSrc = images[currentIndex] ?? images[0] ?? '';

  return (
    <div className={containerClasses}>
      {/* Viewport with progressive enhancement: Static Image Layer + WebGL Canvas Overlay */}
      <div className={viewportClasses} ref={containerRef}>
        {/* Zero-CLS Base Image: Shows immediately on SSR and while Three.js initializes */}
        {fallbackImageSrc && (
          <Image
            src={fallbackImageSrc}
            alt="Slider View"
            fill
            sizes="(max-width: 1024px) 100vw, 1200px"
            className="object-cover transition-opacity duration-700"
            priority={false}
          />
        )}

        {/* WebGL Canvas: Fades in smoothly once textures are compiled */}
        <canvas
          ref={canvasRef}
          aria-label="WebGL Interactive View"
          className={`relative z-10 block h-full w-full transition-opacity duration-700 ${
            isReady && !isContextLost && !prefersReducedMotion
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        />
      </div>

      {/* Navigation Controls */}
      {!hideControls && (
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
                animate={{ scaleX: (currentIndex + 1) / Math.max(images.length, 1) }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <span
              className={`text-[11px] text-[#151926]/50 md:text-xs ${inter.className} font-light tracking-widest`}
            >
              {String(images.length).padStart(2, '0')}
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
