'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { inter } from '@/utils/Fonts';

export function FifthSection() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '300px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const landmarks = [
    {
      id: 'my-khe',
      image: '/landmarks/my-khe-beach.jpg',
      title: `${t('new_golden_mile')}, ${t('timeline_estepona')}`,
      subtitle: t('landmark_1_sub'),
      tag: t('landmark_1_tag'),
    },
    {
      id: 'cau-vang',
      image: '/landmarks/cau-vang-bana.jpg',
      title: t('landmark_2_title'),
      subtitle: t('landmark_2_sub'),
      tag: t('landmark_2_tag'),
    },
    {
      id: 'ngu-hanh-son',
      image: '/landmarks/ngu-hanh-son.jpg',
      title: t('landmark_3_title'),
      subtitle: t('landmark_3_sub'),
      tag: t('landmark_3_tag'),
    },
  ];

  // Gentle auto-fade carousel cycle every 3 seconds when visible
  useEffect(() => {
    if (!isInView || isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % landmarks.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [isInView, isPaused, landmarks.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % landmarks.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? landmarks.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    setTouchStartX(null);
  };

  const currentLandmark = landmarks[currentIndex] ?? landmarks[0]!;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-b from-[#F4F3EC] via-[#78A8D8] to-[#78A8D8]"
    >
      {/* Background Landscape Crossfade Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentLandmark.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0, ease: 'easeInOut' }}
            className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%)]"
          >
            <Image
              src={currentLandmark.image}
              alt={currentLandmark.title}
              fill
              sizes="100vw"
              className="object-cover object-bottom"
              priority={currentIndex === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Marquee 1 - Fast Clouds (Foreground) */}
      <motion.div
        className="pointer-events-none absolute top-[-15vh] left-0 z-10 flex w-[200vw] opacity-90"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        animate={isInView ? { x: [0, '-50%'] } : undefined}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        {/* Set 1 */}
        <div className="flex w-[100vw] items-start justify-between px-[5vw]">
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={800}
            height={500}
            style={{ height: 'auto' }}
            className="h-auto w-[45vw] max-w-[800px] object-contain"
          />
          <Image
            src="/6a0fa3c60405a99c8530535e_img_clouds_33.avif"
            alt="Cloud"
            width={1000}
            height={600}
            style={{ height: 'auto' }}
            className="h-auto w-[50vw] max-w-[1000px] object-contain"
          />
        </div>
        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex w-[100vw] items-start justify-between px-[5vw]">
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={800}
            height={500}
            style={{ height: 'auto' }}
            className="h-auto w-[45vw] max-w-[800px] object-contain"
          />
          <Image
            src="/6a0fa3c60405a99c8530535e_img_clouds_33.avif"
            alt="Cloud"
            width={1000}
            height={600}
            style={{ height: 'auto' }}
            className="h-auto w-[50vw] max-w-[1000px] object-contain"
          />
        </div>
      </motion.div>

      {/* Marquee 2 - Slow Clouds (Background) */}
      <motion.div
        className="pointer-events-none absolute top-[-5vh] left-0 z-10 flex w-[200vw] opacity-80"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
        animate={isInView ? { x: [0, '-50%'] } : undefined}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
      >
        {/* Set 1 */}
        <div className="flex w-[100vw] items-start justify-around">
          <Image
            src="/6a0fa3c6685d7bb04792137a_img_clouds_47.avif"
            alt="Cloud"
            width={900}
            height={550}
            style={{ height: 'auto' }}
            className="mt-10 h-auto w-[55vw] max-w-[900px] object-contain"
          />
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={600}
            height={400}
            style={{ height: 'auto' }}
            className="mt-20 h-auto w-[35vw] max-w-[600px] object-contain"
          />
        </div>
        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex w-[100vw] items-start justify-around">
          <Image
            src="/6a0fa3c6685d7bb04792137a_img_clouds_47.avif"
            alt="Cloud"
            width={900}
            height={550}
            style={{ height: 'auto' }}
            className="mt-10 h-auto w-[55vw] max-w-[900px] object-contain"
          />
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={600}
            height={400}
            style={{ height: 'auto' }}
            className="mt-20 h-auto w-[35vw] max-w-[600px] object-contain"
          />
        </div>
      </motion.div>

      {/* Location Text Overlay & Interactive Scene Switcher */}
      <div className="absolute right-[5vw] bottom-[6vh] z-30 flex max-w-[90vw] flex-col items-start text-white md:right-[5vw] md:bottom-[8vh] lg:right-[4vw]">
        {/* Animated Landmark Details - Clickable to switch scene */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLandmark.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            role="button"
            tabIndex={0}
            onClick={goToNext}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goToNext();
              }
            }}
            title="Bấm để chuyển cảnh"
            aria-label="Chuyển sang địa điểm tiếp theo"
            className="group flex cursor-pointer select-none flex-col items-start transition-opacity duration-300 hover:opacity-80 active:scale-[0.99] focus:outline-none"
          >
            <h3
              className={`text-[10px] leading-snug font-bold tracking-widest uppercase transition-colors md:text-[12px] ${inter.className}`}
            >
              {currentLandmark.title}
            </h3>

            <div className="my-2.5 ml-1 h-[22px] w-[1px] bg-white opacity-70 transition-opacity group-hover:opacity-100" />

            <p
              className={`text-[10px] font-light tracking-wider capitalize opacity-90 transition-opacity group-hover:opacity-100 md:text-[11px] ${inter.className}`}
            >
              {currentLandmark.subtitle} — {currentLandmark.tag}
            </p>

            <div className="my-2.5 ml-1 h-[22px] w-[1px] bg-white opacity-70 transition-opacity group-hover:opacity-100" />

            <p
              className={`text-[10px] font-light tracking-wider uppercase opacity-90 transition-opacity group-hover:opacity-100 md:text-[11px] ${inter.className}`}
            >
              {t('spain')}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
