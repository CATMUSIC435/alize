'use client';

import { motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function NewsDetail(props: { article: NewsArticle }) {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <article className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex items-center gap-2 text-[10px] font-medium tracking-[0.1em] text-[#7A7F8D] uppercase md:text-xs ${inter.className}`}
        >
          <Link href="/" className="transition-colors hover:text-[#151926]">
            Trang chủ
          </Link>
          <span>/</span>
          <Link href="/news" className="transition-colors hover:text-[#151926]">
            Tin tức
          </Link>
          <span>/</span>
          <span className="truncate text-[#8B7043]">{props.article.categoryLabel}</span>
        </motion.nav>

        {/* Header Information */}
        <motion.header
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-6 md:mt-8"
        >
          {/* Category Badge & Metadata */}
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border border-[#8B7043]/40 bg-[#8B7043]/10 px-3.5 py-1 text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}
            >
              {props.article.categoryLabel}
            </span>
            <span className={`text-[11px] text-[#7A7F8D] ${inter.className}`}>
              {props.article.date}
            </span>
            <span className="text-[#7A7F8D]">•</span>
            <span className={`text-[11px] text-[#7A7F8D] ${inter.className}`}>
              {props.article.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1
            className={`mt-6 text-3xl font-semibold leading-tight text-[#151926] sm:text-4xl md:text-5xl lg:text-[54px] ${playfair.className}`}
          >
            {props.article.title}
          </h1>

          {/* Excerpt Lead */}
          <p
            className={`mt-6 text-base leading-relaxed text-[#2D3346]/85 sm:text-lg md:text-xl md:leading-relaxed ${inter.className}`}
          >
            {props.article.excerpt}
          </p>

          {/* Author Byline */}
          <div className="mt-8 flex items-center justify-between border-y border-[#D4CEBF]/60 py-4">
            <div className="flex items-center gap-3.5">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-[#D4CEBF]">
                <Image
                  src={props.article.author.avatar}
                  alt={props.article.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className={`text-sm font-semibold text-[#151926] ${inter.className}`}>
                  {props.article.author.name}
                </div>
                <div className={`text-xs text-[#7A7F8D] ${inter.className}`}>
                  {props.article.author.role}
                </div>
              </div>
            </div>

            {/* Share Button */}
            <button
              type="button"
              onClick={handleShare}
              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#D4CEBF] bg-white px-4 py-1.5 text-xs font-semibold tracking-wider text-[#151926] uppercase transition-all hover:border-[#8B7043] hover:text-[#8B7043] ${inter.className}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{copied ? 'Đã sao chép!' : 'Chia sẻ'}</span>
            </button>
          </div>
        </motion.header>

        {/* Featured Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative mt-10 aspect-[16/10] w-full overflow-hidden rounded-sm border border-[#D4CEBF]/70 shadow-2xl sm:aspect-[16/9]"
        >
          <Image
            src={props.article.coverImage}
            alt={props.article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
            className="object-cover object-center"
          />
        </motion.div>

        {/* Formatted Article Body */}
        <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
          {props.article.content.map((block, idx) => {
            switch (block.type) {
              case 'paragraph':
                return (
                  <p
                    key={idx}
                    className={`text-base leading-[1.9] text-[#2D3346] md:text-lg md:leading-[2] ${inter.className}`}
                  >
                    {block.text}
                  </p>
                );

              case 'heading':
                return (
                  <h2
                    key={idx}
                    className={`pt-4 text-2xl font-semibold leading-tight text-[#151926] md:text-3xl ${playfair.className}`}
                  >
                    {block.text}
                  </h2>
                );

              case 'pullQuote':
                return (
                  <figure
                    key={idx}
                    className="relative my-8 border-l-2 border-[#8B7043] bg-white/60 p-6 pl-6 shadow-sm backdrop-blur-sm md:my-12 md:p-8 md:pl-8"
                  >
                    <div className="font-serif text-5xl leading-none text-[#8B7043]/30">“</div>
                    <blockquote
                      className={`-mt-4 font-serif text-xl leading-snug italic text-[#151926] md:text-2xl md:leading-normal ${playfair.className}`}
                    >
                      {block.quote}
                    </blockquote>
                    {block.author && (
                      <figcaption
                        className={`mt-4 text-xs font-semibold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}
                      >
                        — {block.author}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'image':
                return (
                  <figure key={idx} className="my-8 overflow-hidden rounded-sm border border-[#D4CEBF]/60 md:my-12">
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={block.src}
                        alt={block.alt ?? ''}
                        fill
                        sizes="(max-width: 1024px) 100vw, 850px"
                        className="object-cover object-center"
                      />
                    </div>
                    {block.caption && (
                      <figcaption
                        className={`border-t border-[#D4CEBF]/40 bg-white/80 px-4 py-2.5 text-center text-xs font-light text-[#7A7F8D] italic ${inter.className}`}
                      >
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );

              case 'takeaway':
                return (
                  <div
                    key={idx}
                    className="my-8 rounded-sm border border-[#8B7043]/30 bg-[#0D2D40] p-6 text-white shadow-xl md:my-12 md:p-8"
                  >
                    <div className="flex items-center gap-2 text-[#E0AC87]">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <h3
                        className={`text-base font-semibold tracking-wider text-[#E0AC87] uppercase ${playfair.className}`}
                      >
                        {block.title}
                      </h3>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className={`flex items-start gap-3 text-xs leading-relaxed text-white/90 md:text-sm ${inter.className}`}>
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#E0AC87]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );

              default:
                return null;
            }
          })}
        </div>

        {/* Tags & Bottom Share Row */}
        <div className="mt-14 border-t border-[#D4CEBF]/60 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-semibold text-[#7A7F8D] uppercase ${inter.className}`}>
                Từ khóa:
              </span>
              {props.article.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border border-[#D4CEBF] bg-white px-3 py-1 text-[11px] text-[#2D3346] ${inter.className}`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Back to news button */}
            <Link
              href="/news"
              className={`inline-flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-[#0D2D40] uppercase transition-colors hover:text-[#8B7043] ${inter.className}`}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Trở về danh sách tin tức</span>
            </Link>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="mt-12 rounded-sm border border-[#D4CEBF]/60 bg-white/70 p-6 shadow-md md:p-8">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#8B7043]">
              <Image
                src={props.article.author.avatar}
                alt={props.article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center sm:text-left">
              <h4 className={`text-lg font-semibold text-[#151926] ${playfair.className}`}>
                {props.article.author.name}
              </h4>
              <p className={`text-xs text-[#8B7043] font-medium uppercase tracking-wider ${inter.className}`}>
                {props.article.author.role}
              </p>
              <p className={`mt-2 text-xs leading-relaxed text-[#2D3346]/80 ${inter.className}`}>
                Đại diện truyền thông và thông tin dự án Alizé Residence. Cung cấp những góc nhìn chuyên sâu về kiến trúc, trải nghiệm nghỉ dưỡng và tiến độ hoàn thiện dự án.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
