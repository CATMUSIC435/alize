'use client';

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import { useUIStore } from '@/store/useUIStore';

function subscribeVideoEligibility(_callback: () => void) {
  return () => {};
}

function checkVideoEligibility(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  const ua = navigator.userAgent || '';

  // In-app browsers (specifically Zalo, Facebook, Instagram, Line, etc.) where inline video is hijacked to native fullscreen
  const isRestrictedInApp = /zalo|fban|fbav|instagram|line|micromessenger|tiktok|bytedance/i.test(ua);
  if (isRestrictedInApp) {
    return false;
  }

  // On iOS, check for in-app webview wrappers that lack standard browser tokens
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) {
    const isIOSChrome = /crios/i.test(ua);
    const isIOSFirefox = /fxios/i.test(ua);
    const isIOSSafari = /safari/i.test(ua) && /version/i.test(ua);

    if (!isIOSChrome && !isIOSFirefox && !isIOSSafari) {
      return false;
    }
  }

  return true;
}

function getVideoSnapshot() {
  return checkVideoEligibility();
}

function getServerSnapshot() {
  return false;
}

export function BackgroundAnimation() {
  const isIntroComplete = useUIStore((state) => state.isIntroComplete);
  const setIsIntroComplete = useUIStore((state) => state.setIsIntroComplete);
  const heroMode = useUIStore((state) => state.heroMode);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canPlayVideo = useSyncExternalStore(subscribeVideoEligibility, getVideoSnapshot, getServerSnapshot);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 768 || sessionStorage.getItem('alize_intro_seen') === 'true') {
        setIsIntroComplete(true);
      }
    }
  }, [setIsIntroComplete]);

  // Initialize video silently when eligible (Desktop, Chrome mobile, Safari mobile); strictly enforce inline playback
  useEffect(() => {
    if (!canPlayVideo) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    // WebKit iOS presentation mode enforcement (strictly prevent native fullscreen takeover)
    const v = video as unknown as {
      webkitSetPresentationMode?: (mode: string) => void;
      webkitPresentationMode?: string;
      webkitExitFullscreen?: () => void;
    };

    if (typeof v.webkitSetPresentationMode === 'function') {
      v.webkitSetPresentationMode('inline');
    }

    const enforceInline = (e?: Event) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (typeof v.webkitExitFullscreen === 'function') {
        v.webkitExitFullscreen();
      }
      if (typeof v.webkitSetPresentationMode === 'function') {
        v.webkitSetPresentationMode('inline');
      }
    };

    video.addEventListener('webkitbeginfullscreen', enforceInline);
    video.addEventListener('webkitpresentationmodechanged', enforceInline);

    const tryPlay = () => {
      if (video.paused && useUIStore.getState().heroMode === 'day') {
        video.play().catch(() => {});
      }
    };

    // Initial silent autoplay on mount; if mobile policy defers it, play on first gentle interaction
    video.play().catch(() => {
      window.addEventListener('touchstart', tryPlay, { once: true, passive: true });
      window.addEventListener('scroll', tryPlay, { once: true, passive: true });
    });

    return () => {
      video.removeEventListener('webkitbeginfullscreen', enforceInline);
      video.removeEventListener('webkitpresentationmodechanged', enforceInline);
      window.removeEventListener('touchstart', tryPlay);
      window.removeEventListener('scroll', tryPlay);
    };
  }, [canPlayVideo]);

  const { scrollY } = useScroll();

  // Pause video and hide background when scrolled past hero section to eliminate scroll lag
  useEffect(() => {
    if (!canPlayVideo) return;

    const checkAndToggle = (latest: number) => {
      const video = videoRef.current;
      if (!video) return;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      // Header is 135vh on mobile, 200vh on desktop; let video play smoothly through the arch curve
      const threshold = typeof window !== 'undefined'
        ? (isMobile ? window.innerHeight * 1.8 : window.innerHeight * 2.3)
        : 2200;
      const isPastHero = latest > threshold;
      const isDay = useUIStore.getState().heroMode === 'day';

      if (isPastHero || !isDay) {
        if (!video.paused) {
          video.pause();
        }
      } else if (video.paused && isDay) {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const handleResume = () => {
              if (videoRef.current && useUIStore.getState().heroMode === 'day') {
                videoRef.current.muted = true;
                videoRef.current.play().catch(() => {});
              }
            };
            window.addEventListener('touchstart', handleResume, { once: true, passive: true });
            window.addEventListener('scroll', handleResume, { once: true, passive: true });
          });
        }
      }
    };

    // Check immediately on mount or when heroMode changes
    checkAndToggle(scrollY.get());

    return scrollY.on('change', checkAndToggle);
  }, [scrollY, canPlayVideo, heroMode]);

  // As the user scrolls down, move the background up slightly for parallax
  const y = useTransform(scrollY, [0, 1000], ['0%', '-15%']);
  // Zoom in the background image as the user scrolls down
  const scaleOnScroll = useTransform(scrollY, [0, 1000], [1, 1.4]);
  // De-composite fixed background layer once scrolled completely past hero and arch curve
  const backgroundVisibility = useTransform(scrollY, (latest) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const threshold = typeof window !== 'undefined'
      ? (isMobile ? window.innerHeight * 1.9 : window.innerHeight * 2.4)
      : 2300;
    return latest > threshold ? 'hidden' : 'visible';
  });

  return (
    <>
      {/* 1. Persistent Background Image/Video (Stays behind all sections at z-0) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 h-[100dvh] w-full max-w-full overflow-hidden bg-[#0D2D40] md:h-[120vh]"
        style={{
          y,
          visibility: backgroundVisibility,
        }}
      >
        <div className="relative h-full w-full max-w-full overflow-hidden">
          {/* Zoom in on scroll */}
          <motion.div
            className="absolute inset-0 h-full w-full max-w-full overflow-hidden"
            style={{ scale: scaleOnScroll }}
          >
            {/* Day Video Mode (Continuum South Tower) */}
            <motion.div
              className="absolute inset-0 h-full w-full max-w-full overflow-hidden"
              initial={false}
              animate={{ opacity: heroMode === 'day' ? 1 : 0 }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              {/* Image fallback is ALWAYS rendered behind video so hero is never blank/black */}
              <Image
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=70&w=1920"
                alt="Mediterranean Villa - Day"
                fill
                priority
                sizes="100vw"
                className="pointer-events-none block h-full w-full select-none object-cover object-center brightness-[1.05] contrast-[1.02]"
              />
              {canPlayVideo && (
                <video
                  ref={videoRef}
                  src="/Continuum-South-Tower.mp4"
                  poster="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=70&w=1920"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                  controlsList="nodownload nofullscreen noremoteplayback noplaybackrate"
                  tabIndex={-1}
                  aria-hidden="true"
                  {...({
                    'webkit-playsinline': 'true',
                    'x5-playsinline': 'true',
                    'x5-video-player-type': 'h5-page',
                    'x5-video-player-fullscreen': 'false',
                  } as Record<string, string>)}
                  disablePictureInPicture
                  disableRemotePlayback
                  preload="auto"
                  style={{
                    width: '100%',
                    height: '100%',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    pointerEvents: 'none',
                  }}
                  className="pointer-events-none absolute inset-0 block h-full w-full max-h-full max-w-full select-none object-cover object-center brightness-[1.05] contrast-[1.02]"
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 md:from-black/40 md:to-black/20" />
            </motion.div>

            {/* Night Villa Image */}
            <motion.div
              className="absolute inset-0 h-full w-full"
              initial={false}
              animate={{ opacity: heroMode === 'night' ? 1 : 0 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            >
              <Image
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=70&w=1920"
                alt="Mediterranean Villa - Night"
                fill
                sizes="100vw"
                className="object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D2D40]/80 via-transparent to-black/50 md:from-[#0D2D40]/60 md:to-black/40" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* 2. Intro Loading Overlay: Elevated to z-[70] so nothing can overlap it during load */}
      <AnimatePresence>
        {!isIntroComplete && (
          <motion.div
            key="intro-overlay"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-[70] hidden overflow-hidden md:block"
          >
            {/* Static Decorative Outer Frame (Chamfered Corners) - Only during load */}
            <motion.div
              className="pointer-events-none absolute inset-4 z-20 md:inset-8"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.3,
                times: [0, 0.22, 0.55, 0.95],
                ease: 'easeInOut',
                delay: 0.08,
              }}
            >
              {/* Top edge */}
              <div className="absolute top-0 right-[24px] left-[24px] h-[1px] bg-white/15" />
              {/* Bottom edge */}
              <div className="absolute right-[24px] bottom-0 left-[24px] h-[1px] bg-white/15" />
              {/* Left edge */}
              <div className="absolute top-[24px] bottom-[24px] left-0 w-[1px] bg-white/15" />
              {/* Right edge */}
              <div className="absolute top-[24px] right-0 bottom-[24px] w-[1px] bg-white/15" />

              {/* Top Left Chamfer */}
              <svg width="24" height="24" className="absolute top-0 left-0" overflow="visible">
                <line x1="0" y1="24" x2="24" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              </svg>
              {/* Top Right Chamfer */}
              <svg width="24" height="24" className="absolute top-0 right-0" overflow="visible">
                <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              </svg>
              {/* Bottom Right Chamfer */}
              <svg width="24" height="24" className="absolute right-0 bottom-0" overflow="visible">
                <line x1="0" y1="24" x2="24" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              </svg>
              {/* Bottom Left Chamfer */}
              <svg width="24" height="24" className="absolute bottom-0 left-0" overflow="visible">
                <line x1="0" y1="0" x2="24" y2="24" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
              </svg>
            </motion.div>

            {/* Opening Intro Logos (ATG on left, Alizé project in center, DXMD on right) */}
            <motion.div
              className="pointer-events-none absolute inset-x-0 top-[12vh] z-30 px-6 sm:top-[15vh] sm:px-10 md:top-[18vh] md:px-16 lg:top-[20vh] lg:px-24"
              initial={{ opacity: 0, y: 14 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [14, 0, 0, -10],
              }}
              transition={{
                duration: 2.3,
                times: [0, 0.22, 0.55, 0.95],
                ease: ['easeOut', 'linear', [0.16, 1, 0.3, 1]],
                delay: 0.08,
              }}
            >
              <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                {/* Left: ATG Group Logo */}
                <div className="flex w-1/3 items-center justify-start">
                  <Image
                    src="/atg-logo.svg"
                    alt="ATG Group"
                    width={260}
                    height={170}
                    unoptimized
                    className="h-11 w-auto object-contain drop-shadow-md sm:h-14 md:h-18 lg:h-22 xl:h-26"
                  />
                </div>

                {/* Center: Alizé Project Logo */}
                <div className="flex w-1/3 -translate-y-6 items-center justify-center sm:-translate-y-16 md:-translate-y-24 lg:-translate-y-32">
                  <Image
                    src="/logo-alize.png"
                    alt="Alizé Hotel & Residences Da Nang"
                    width={280}
                    height={345}
                    className="h-20 w-auto object-contain brightness-0 invert drop-shadow-[0_6px_20px_rgba(255,255,255,0.3)] sm:h-28 md:h-36 lg:h-44 xl:h-48"
                  />
                </div>

                {/* Right: DXMD Logo */}
                <div className="flex w-1/3 items-center justify-end">
                  <Image
                    src="/dxmd-logo.svg"
                    alt="DXMD Vietnam"
                    width={260}
                    height={115}
                    unoptimized
                    className="h-9 w-auto object-contain drop-shadow-md sm:h-12 md:h-15 lg:h-18 xl:h-22"
                  />
                </div>
              </div>
            </motion.div>

            {/* GPU Hardware-Accelerated Arch Portal */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center">
              <div className="origin-bottom scale-[0.65] sm:scale-[0.8] md:scale-100">
                <motion.div
                  className="relative overflow-visible"
                  style={{
                    width: 350,
                    height: 525,
                    borderTopLeftRadius: 175,
                    borderTopRightRadius: 175,
                    boxShadow: '0 0 0 100vmax #0D2D40',
                    willChange: 'transform, opacity',
                    transformOrigin: '50% 100%',
                  }}
                  initial={{ y: 650, scale: 1, opacity: 1 }}
                  animate={{
                    y: [650, 0, 0, 0],
                    scale: [1, 1, 1, 7],
                    opacity: [1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2.3,
                    times: [0, 0.28, 0.55, 1],
                    ease: ['easeOut', 'linear', [0.16, 1, 0.3, 1]],
                    delay: 0.05,
                  }}
                  onAnimationComplete={() => {
                    setIsIntroComplete(true);
                    if (typeof window !== 'undefined') {
                      sessionStorage.setItem('alize_intro_seen', 'true');
                    }
                  }}
                >
                  {/* 5 Concentric Architectural Stroke Rings with gentle fade-out before full expansion */}
                  <motion.div
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{ duration: 2.3, times: [0, 0.52, 0.72, 1], delay: 0.05 }}
                    className="pointer-events-none absolute inset-0"
                  >
                    <div className="pointer-events-none absolute -inset-[12px] bottom-0 rounded-t-[187px] border border-white/45 border-b-0" />
                    <div className="pointer-events-none absolute -inset-[28px] bottom-0 rounded-t-[203px] border border-white/35 border-b-0" />
                    <div className="pointer-events-none absolute -inset-[48px] bottom-0 rounded-t-[223px] border border-white/25 border-b-0" />
                    <div className="pointer-events-none absolute -inset-[72px] bottom-0 rounded-t-[247px] border border-white/15 border-b-0" />
                    <div className="pointer-events-none absolute -inset-[100px] bottom-0 rounded-t-[275px] border border-white/10 border-b-0" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
