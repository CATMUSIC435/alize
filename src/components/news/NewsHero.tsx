'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

export function NewsHero(props: { totalArticles?: number; featuredArticle?: NewsArticle }) {
  const t = useTranslations('Index');
  const tNews = useTranslations('NewsPage');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const } },
  };

  const countDisplay = (props.totalArticles ?? 4).toString().padStart(2, '0');

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-[18vh] pb-[6vh] md:pt-[20vh] md:pb-[8vh]">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto mt-[8vh] flex w-full max-w-[1400px] flex-col justify-between px-6 md:px-12"
      >
        {/* Main Hero Row: Title & Count */}
        <div className="flex w-full flex-row items-end justify-between gap-4 pb-4 md:pb-6">
          <motion.div variants={itemVariants}>
            <span
              className={`mb-2 block text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
            >
              ALIZÉ {tNews('editorial_journal')}
            </span>
            <h1
              className={`whitespace-nowrap text-[9vw] leading-[0.85] text-[#151926] uppercase sm:text-[10vw] md:text-[100px] xl:text-[120px] ${playfair.className}`}
              style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom left' }}
            >
              {t('news')}
            </h1>
          </motion.div>

          <motion.div variants={itemVariants}>
            <span
              className={`block shrink-0 text-[9vw] leading-[0.85] tracking-tighter text-[#151926] sm:text-[10vw] md:text-[100px] xl:text-[120px] ${playfair.className}`}
              style={{ transform: 'scaleY(1.3)', transformOrigin: 'bottom right' }}
            >
              {countDisplay}
            </span>
          </motion.div>
        </div>

        {/* Hairline Divider & Subtitle */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-col items-start gap-4 border-t border-[#151926]/15 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <p
            className={`max-w-2xl text-[10px] leading-relaxed font-medium tracking-[0.15em] text-[#151926]/70 uppercase sm:text-[11px] md:text-xs ${inter.className}`}
          >
            {tNews('journal_subtitle')}
          </p>
          <span
            className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
          >
            ESTEPONA — ĐÀ NẴNG 2026
          </span>
        </motion.div>

        {/* FEATURED MAIN ARTICLE CARD */}
        {props.featuredArticle && (
          <motion.div variants={itemVariants} className="mt-10 w-full md:mt-14">
            <Link
              href={`/news/${props.featuredArticle.slug}`}
              className="group relative block w-full cursor-pointer drop-shadow-xl filter transition-all duration-500 hover:drop-shadow-2xl"
            >
              {/* Dual-layer chamfered container */}
              <div
                className="relative bg-[#D6D3C8] p-[1px]"
                style={{ clipPath: clipPathPolygon }}
              >
                <div
                  className="relative flex flex-col items-center justify-between gap-8 bg-[#FBF9F5] p-6 transition-colors duration-500 group-hover:bg-[#FFFFFF] sm:p-8 lg:flex-row lg:gap-12 lg:p-12"
                  style={{ clipPath: clipPathPolygon }}
                >
                  {/* Left: Cover Image (58%) */}
                  <div className="relative w-full overflow-hidden lg:w-[58%]">
                    <div
                      className="relative aspect-[16/10] w-full overflow-hidden"
                      style={{ clipPath: clipPathPolygon }}
                    >
                      <Image
                        src={props.featuredArticle.coverImage}
                        alt={props.featuredArticle.title}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        unoptimized
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

                      {/* Gold FEATURED Badge */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border border-[#8B7043]/40 bg-[#151926]/90 px-3.5 py-1.5 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#E0AC87]" />
                        <span
                          className={`text-[9px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[10px] ${inter.className}`}
                        >
                          {tNews('featured_story')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Editorial Details (42%) */}
                  <div className="flex w-full flex-col justify-between py-2 lg:w-[42%]">
                    <div>
                      {/* Meta Pill */}
                      <div className="mb-4 flex flex-wrap items-center gap-2.5 text-[10px] font-bold tracking-[0.2em] uppercase md:text-[11px]">
                        <span className={`text-[#8B7043] ${inter.className}`}>
                          {props.featuredArticle.categoryLabel}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[#151926]/30" />
                        <span className={`text-[#151926]/60 ${inter.className}`}>
                          {props.featuredArticle.date}
                        </span>
                        <span className="h-1 w-1 rounded-full bg-[#151926]/30" />
                        <span className={`text-[#151926]/60 ${inter.className}`}>
                          {props.featuredArticle.readTime}
                        </span>
                      </div>

                      {/* Article Headline */}
                      <h2
                        className={`mb-4 text-xl leading-[1.15] font-medium tracking-tight text-[#151926] uppercase transition-colors duration-300 group-hover:text-[#8B7043] sm:text-2xl lg:text-[28px] xl:text-[34px] ${playfair.className}`}
                        style={{ transform: 'scaleY(1.1)', transformOrigin: 'bottom left' }}
                      >
                        {props.featuredArticle.title}
                      </h2>

                      {/* Excerpt */}
                      <p
                        className={`mb-8 line-clamp-3 text-xs leading-relaxed text-[#151926]/75 sm:text-sm md:text-base ${inter.className}`}
                      >
                        {props.featuredArticle.excerpt}
                      </p>
                    </div>

                    {/* Bottom Row: Author & Action Button */}
                    <div className="flex flex-col justify-between gap-4 border-t border-[#151926]/10 pt-6 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#8B7043]/50">
                          <Image
                            src={props.featuredArticle.author.avatar}
                            alt={props.featuredArticle.author.name}
                            fill
                            sizes="40px"
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                        <div>
                          <h4 className={`text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase md:text-xs ${inter.className}`}>
                            {props.featuredArticle.author.name}
                          </h4>
                          <p className={`text-[9px] text-[#151926]/60 ${inter.className}`}>
                            {props.featuredArticle.author.role}
                          </p>
                        </div>
                      </div>

                      {/* Chamfered CTA Button */}
                      <div
                        className={`flex items-center gap-2 border border-[#151926] bg-[#151926] px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] text-white uppercase transition-all duration-300 group-hover:border-[#8B7043] group-hover:bg-[#8B7043] md:text-xs ${inter.className}`}
                        style={{ clipPath: dropdownClip }}
                      >
                        <span>{tNews('read_story')}</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
