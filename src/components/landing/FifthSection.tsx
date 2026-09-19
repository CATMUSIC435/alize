'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { useRef } from 'react';

const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '600', '700'] });

export function FifthSection() {
  const t = useTranslations('Index');
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { margin: '300px' });

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full overflow-hidden bg-gradient-to-b from-[#F4F3EC] via-[#78A8D8] to-[#78A8D8]"
    >
      {/* Background Landscape */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_15%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%)]">
          <Image
            src="https://images.unsplash.com/photo-1728898394273-dad9725cfadf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="City Landscape"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>

        {/* Bottom Overlay */}
        {/* <div className="absolute inset-0 z-[5] bg-gradient-to-b from-transparent to-[#d2a373]/30 pointer-events-none" /> */}
      </div>

      {/* Marquee 1 - Fast Clouds (Foreground) */}
      <motion.div
        className="pointer-events-none absolute top-[-15vh] left-0 z-10 flex w-[200vw] opacity-90"
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
            className="h-auto w-[45vw] max-w-[800px] object-contain"
          />
          <Image
            src="/6a0fa3c60405a99c8530535e_img_clouds_33.avif"
            alt="Cloud"
            width={1000}
            height={600}
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
            className="h-auto w-[45vw] max-w-[800px] object-contain"
          />
          <Image
            src="/6a0fa3c60405a99c8530535e_img_clouds_33.avif"
            alt="Cloud"
            width={1000}
            height={600}
            className="h-auto w-[50vw] max-w-[1000px] object-contain"
          />
        </div>
      </motion.div>

      {/* Marquee 2 - Slow Clouds (Background) */}
      <motion.div
        className="pointer-events-none absolute top-[-5vh] left-0 z-10 flex w-[200vw] opacity-80"
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
            className="mt-10 h-auto w-[55vw] max-w-[900px] object-contain"
          />
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={600}
            height={400}
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
            className="mt-10 h-auto w-[55vw] max-w-[900px] object-contain"
          />
          <Image
            src="/6a0fa3c6c9c3c584d9d78d85_img_clouds_02.avif"
            alt="Cloud"
            width={600}
            height={400}
            className="mt-20 h-auto w-[35vw] max-w-[600px] object-contain"
          />
        </div>
      </motion.div>

      {/* Location Text Overlay */}
      <div className="absolute right-[5vw] bottom-[10vh] z-20 flex flex-col items-start text-white md:right-[5vw] lg:right-[4vw]">
        <h3
          className={`text-[10px] leading-snug font-bold tracking-widest uppercase md:text-[12px] ${inter.className}`}
        >
          {t('new_golden_mile')},
          <br />
          {t('timeline_estepona')}
        </h3>

        <div className="my-3 ml-1 h-[25px] w-[1px] bg-white opacity-70"></div>

        <p
          className={`text-[10px] font-light tracking-wider capitalize opacity-90 md:text-[11px] ${inter.className}`}
        >
          {t('costa').toLowerCase()} {t('del_sol').toLowerCase()}
        </p>

        <div className="my-3 ml-1 h-[25px] w-[1px] bg-white opacity-70"></div>

        <p
          className={`text-[10px] font-light tracking-wider capitalize opacity-90 md:text-[11px] ${inter.className}`}
        >
          {t('spain').toLowerCase()}
        </p>
      </div>
    </section>
  );
}
