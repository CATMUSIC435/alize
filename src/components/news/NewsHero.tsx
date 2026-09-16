'use client';

import { motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function NewsHero(props: { featuredArticle?: NewsArticle }) {
  return (
    <section className="relative w-full pt-32 pb-16 md:pt-44 md:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#8B7043]/60 md:w-12" />
            <span
              className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
            >
              ALIZÉ EDITORIAL & JOURNAL
            </span>
            <span className="h-[1px] w-8 bg-[#8B7043]/60 md:w-12" />
          </div>

          {/* Main Title */}
          <h1
            className={`mt-4 text-4xl font-normal tracking-tight text-[#151926] uppercase sm:text-6xl md:text-7xl lg:text-8xl ${playfair.className}`}
          >
            TIN TỨC & BẢN TIN
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-4 max-w-2xl text-xs leading-relaxed font-light text-[#7A7F8D] uppercase sm:text-sm md:text-base md:tracking-[0.1em] ${inter.className}`}
          >
            Khám phá những câu chuyện kiến trúc, nhịp đập thị trường bất động sản hàng hiệu và phong cách sống ven biển Mỹ Khê
          </p>
        </motion.div>

        {/* Featured Headline Article Banner */}
        {props.featuredArticle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="mt-12 md:mt-20"
          >
            <Link
              href={`/news/${props.featuredArticle.slug}`}
              className="group relative block overflow-hidden rounded-sm border border-[#D4CEBF]/60 bg-white/70 shadow-xl backdrop-blur-sm transition-all duration-500 hover:border-[#8B7043]/50 hover:shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left: Featured Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[16/9] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
                  <Image
                    src={props.featuredArticle.coverImage}
                    alt={props.featuredArticle.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

                  {/* Category Pill Over Image on mobile */}
                  <div className="absolute top-4 left-4 z-10 lg:hidden">
                    <span
                      className={`inline-block rounded-full bg-[#0D2D40]/80 px-3.5 py-1 text-[9px] font-bold tracking-[0.2em] text-white uppercase backdrop-blur-md ${inter.className}`}
                    >
                      {props.featuredArticle.categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Right: Featured Text Content */}
                <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 lg:p-12">
                  <div>
                    {/* Category & Date Row (Desktop) */}
                    <div className="hidden items-center justify-between lg:flex">
                      <span
                        className={`rounded-full border border-[#8B7043]/40 bg-[#8B7043]/10 px-3 py-1 text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}
                      >
                        {props.featuredArticle.categoryLabel}
                      </span>
                      <span className={`text-[11px] text-[#7A7F8D] ${inter.className}`}>
                        {props.featuredArticle.date}
                      </span>
                    </div>

                    {/* Headline */}
                    <h2
                      className={`mt-4 text-2xl font-semibold leading-tight text-[#151926] transition-colors duration-300 group-hover:text-[#8B7043] sm:text-3xl lg:mt-6 lg:text-4xl ${playfair.className}`}
                    >
                      {props.featuredArticle.title}
                    </h2>

                    {/* Excerpt */}
                    <p
                      className={`mt-4 text-xs leading-relaxed text-[#2D3346]/80 sm:text-sm lg:mt-6 ${inter.className}`}
                    >
                      {props.featuredArticle.excerpt}
                    </p>
                  </div>

                  {/* Author & CTA Row */}
                  <div className="mt-8 flex items-center justify-between border-t border-[#D4CEBF]/60 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-[#D4CEBF]">
                        <Image
                          src={props.featuredArticle.author.avatar}
                          alt={props.featuredArticle.author.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className={`text-xs font-semibold text-[#151926] ${inter.className}`}>
                          {props.featuredArticle.author.name}
                        </div>
                        <div className={`text-[10px] text-[#7A7F8D] ${inter.className}`}>
                          {props.featuredArticle.readTime}
                        </div>
                      </div>
                    </div>

                    {/* Read Article Action */}
                    <span
                      className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[#0D2D40] uppercase transition-transform duration-300 group-hover:translate-x-1 ${inter.className}`}
                    >
                      <span>Đọc tiếp</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
