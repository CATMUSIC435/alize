'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { CircleButton } from '@/components/landing/CircleButton';
import type { NewsArticle, NewsContentBlock } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function NewsDetail(props: { article: NewsArticle }) {
  const t = useTranslations('Index');
  const tNews = useTranslations('NewsPage');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      void navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  const renderContentBlock = (block: NewsContentBlock, index: number) => {
    switch (block.type) {
      case 'paragraph': {
        return (
          <p
            key={index}
            className={`text-base leading-relaxed text-[#151926]/85 md:text-lg ${inter.className} ${
              index === 0
                ? 'first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-bold first-letter:text-[#8B7043] md:first-letter:text-6xl'
                : ''
            }`}
          >
            {block.text}
          </p>
        );
      }
      case 'heading': {
        return (
          <h2
            key={index}
            className={`mt-12 mb-6 text-2xl font-medium tracking-tight text-[#151926] uppercase sm:text-3xl md:text-4xl ${playfair.className}`}
            style={{ transform: 'scaleY(1.1)', transformOrigin: 'bottom left' }}
          >
            {block.text}
          </h2>
        );
      }
      case 'pullQuote': {
        return (
          <div
            key={index}
            className="my-10 w-full drop-shadow-md filter"
          >
            <div
              className="relative flex flex-col justify-between overflow-hidden bg-sand-card border border-[#D9CEBD]/80 p-8 text-[#151926] sm:p-12 md:p-16"
              style={{ clipPath: clipPathPolygon }}
            >
              {/* Decorative quotation mark */}
              <span
                className={`pointer-events-none absolute -top-4 -left-2 text-8xl font-serif text-[#8B7043]/20 md:text-9xl ${playfair.className}`}
              >
                “
              </span>

              <blockquote
                className={`relative z-10 text-xl leading-snug font-medium text-[#151926] sm:text-2xl md:text-3xl ${playfair.className}`}
                style={{ transform: 'scaleY(1.05)' }}
              >
                "{block.quote}"
              </blockquote>

              {block.author && (
                <div className="relative z-10 mt-6 flex items-center gap-3 border-t border-[#151926]/15 pt-4">
                  <span className="h-[1px] w-6 bg-[#8B7043]" />
                  <span
                    className={`text-[10px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
                  >
                    {block.author}
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      }
      case 'image': {
        return (
          <figure key={index} className="my-10 w-full drop-shadow-md filter">
            <div
              className="relative aspect-[16/10] w-full overflow-hidden"
              style={{ clipPath: clipPathPolygon }}
            >
              <Image
                src={block.src}
                alt={block.alt ?? 'Minh họa bài viết Alizé'}
                fill
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                unoptimized
              />
            </div>
            {block.caption && (
              <figcaption
                className={`mt-3 text-center text-[10px] font-medium tracking-[0.15em] text-[#151926]/60 uppercase md:text-xs ${inter.className}`}
              >
                — {block.caption}
              </figcaption>
            )}
          </figure>
        );
      }
      case 'takeaway': {
        return (
          <div key={index} className="my-10 w-full drop-shadow-md filter">
            <div
              className="relative bg-[#D6D3C8] p-[1px]"
              style={{ clipPath: clipPathPolygon }}
            >
              <div
                className="flex flex-col bg-[#F4F3ED] p-8 sm:p-10 md:p-12"
                style={{ clipPath: clipPathPolygon }}
              >
                <div className="mb-6 flex items-center justify-between border-b border-[#151926]/10 pb-4">
                  <span
                    className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
                  >
                    ĐIỂM NHẤN CỐT LÕI
                  </span>
                  <span className="h-[1px] w-12 bg-[#8B7043]/40" />
                </div>

                <h3
                  className={`mb-6 text-xl font-medium text-[#151926] uppercase md:text-2xl ${playfair.className}`}
                  style={{ transform: 'scaleY(1.1)', transformOrigin: 'bottom left' }}
                >
                  {block.title}
                </h3>

                <ul className="flex flex-col space-y-3">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#8B7043]" />
                      <span className={`text-xs leading-relaxed text-[#151926]/80 md:text-sm ${inter.className}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  return (
    <article className="relative w-full bg-transparent pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-12">
        {/* ARTICLE HEADER BLOCK */}
        <header className="mb-12 md:mb-20">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className={`flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase md:text-xs ${inter.className}`}
          >
            <Link href="/" className="transition-colors hover:text-[#151926]">
              {tNews('breadcrumb_home')}
            </Link>
            <span className="opacity-40">/</span>
            <Link href="/news" className="transition-colors hover:text-[#151926]">
              {t('news')}
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-[#8B7043]">{props.article.categoryLabel}</span>
          </nav>

          {/* Title with Signature Scaled Typography */}
          <h1
            className={`mt-6 text-[8vw] leading-[0.92] font-medium tracking-tight text-[#151926] uppercase sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] ${playfair.className}`}
            style={{ transform: 'scaleY(1.15)', transformOrigin: 'bottom left' }}
          >
            {props.article.title}
          </h1>

          {/* Subtitle / Excerpt Lead */}
          <p
            className={`mt-8 max-w-4xl border-l-2 border-[#8B7043] pl-6 text-sm leading-relaxed text-[#151926]/75 uppercase sm:text-base md:text-lg ${inter.className}`}
          >
            {props.article.excerpt}
          </p>
        </header>

        {/* 2-COLUMN LUXURY EDITORIAL LAYOUT */}
        <div className="flex flex-col gap-12 lg:flex-row xl:gap-20">
          {/* LEFT COLUMN: SCROLLABLE EDITORIAL STORY (65%) */}
          <main className="flex w-full flex-col lg:w-[62%] xl:w-[65%]">
            {/* Main Cover Image */}
            <div
              className="relative mb-12 aspect-[16/10] w-full overflow-hidden drop-shadow-xl filter"
              style={{ clipPath: clipPathPolygon }}
            >
              <Image
                src={props.article.coverImage}
                alt={props.article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
                unoptimized
              />
            </div>

            {/* Editorial Content Blocks */}
            <div className="flex flex-col space-y-6">
              {props.article.content.map((block, idx) => renderContentBlock(block, idx))}
            </div>

            {/* Tags & Footer Navigation */}
            <div className="mt-16 border-t border-[#151926]/15 pt-8">
              <span
                className={`block text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase mb-3 ${inter.className}`}
              >
                {tNews('related_articles')}
              </span>
              <div className="flex flex-wrap gap-2">
                {props.article.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`rounded-full border border-[#151926]/15 bg-white/50 px-4 py-1.5 text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase transition-colors hover:border-[#8B7043] hover:text-[#8B7043] ${inter.className}`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </main>

          {/* RIGHT COLUMN: STICKY METADATA & ACTIONS (35%) */}
          <aside
            aria-label={tNews('article_info')}
            className="relative w-full lg:w-[38%] xl:w-[35%]"
          >
            <div className="flex flex-col space-y-8 lg:sticky lg:top-32">
              {/* SPECIFICATION CARD WITH CHAMFERED CORNERS */}
              <div className="w-full drop-shadow-md filter">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="flex flex-col bg-[#F4F3ED] p-8"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    <div className="mb-6 flex items-center justify-between border-b border-[#151926]/10 pb-4">
                      <span
                        className={`text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
                      >
                        {tNews('article_info')}
                      </span>
                      <span
                        className={`text-[9px] tracking-[0.2em] text-[#151926]/40 uppercase ${inter.className}`}
                      >
                        VOL. 2026
                      </span>
                    </div>

                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center justify-between border-b border-[#151926]/5 pb-3 text-xs">
                        <span className={`text-[10px] tracking-[0.15em] text-[#151926]/60 uppercase ${inter.className}`}>
                          {tNews('category_label')}
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase ${inter.className}`}>
                          {props.article.categoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-[#151926]/5 pb-3 text-xs">
                        <span className={`text-[10px] tracking-[0.15em] text-[#151926]/60 uppercase ${inter.className}`}>
                          {tNews('published_date')}
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase ${inter.className}`}>
                          {props.article.date}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-b border-[#151926]/5 pb-3 text-xs">
                        <span className={`text-[10px] tracking-[0.15em] text-[#151926]/60 uppercase ${inter.className}`}>
                          {tNews('reading_time')}
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase ${inter.className}`}>
                          {props.article.readTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1">
                        <span className={`text-[10px] tracking-[0.15em] text-[#151926]/60 uppercase ${inter.className}`}>
                          {tNews('location_label')}
                        </span>
                        <span className={`text-[10px] font-bold tracking-[0.15em] text-[#151926] uppercase ${inter.className}`}>
                          {tNews('location_val')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AUTHOR BIO CARD */}
              <div className="w-full drop-shadow-md filter">
                <div
                  className="bg-[#D6D3C8] p-[1px]"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <div
                    className="flex items-center gap-4 bg-[#F4F3ED] p-6"
                    style={{ clipPath: clipPathPolygon }}
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-[#8B7043]/50">
                      <Image
                        src={props.article.author.avatar}
                        alt={props.article.author.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase ${inter.className}`}>
                        {tNews('editorial_label')}
                      </span>
                      <h4 className={`text-base font-semibold text-[#151926] uppercase ${playfair.className}`}>
                        {props.article.author.name}
                      </h4>
                      <p className={`text-[10px] text-[#151926]/60 ${inter.className}`}>
                        {props.article.author.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* INTERACTIVE MAGNETIC CIRCLE BUTTON FOR SHARING */}
              <div className="flex flex-col items-center justify-center py-6">
                <CircleButton
                  text={copied ? tNews('link_copied') : tNews('share_article')}
                  variant="dark"
                  onClick={handleShare}
                  className="h-36 w-36 sm:h-44 sm:w-44 lg:h-48 lg:w-48"
                />
                <span className={`mt-3 text-[9px] tracking-[0.2em] text-[#151926]/40 uppercase ${inter.className}`}>
                  {copied ? tNews('copied_to_clipboard') : tNews('click_to_copy')}
                </span>
              </div>

              {/* APARTMENTS PROMO CTA */}
              <div className="w-full drop-shadow-md filter">
                <div
                  className="bg-[#151926] p-8 text-center text-white"
                  style={{ clipPath: clipPathPolygon }}
                >
                  <span
                    className={`block text-[9px] font-bold tracking-[0.25em] text-[#E0AC87] uppercase md:text-[10px] ${inter.className}`}
                  >
                    ALIZE RESIDENCE
                  </span>
                  <h4
                    className={`mt-2 mb-4 text-xl font-medium text-white uppercase ${playfair.className}`}
                  >
                    {tNews('promo_title')}
                  </h4>
                  <p className={`mb-6 text-xs text-white/70 ${inter.className}`}>
                    {tNews('promo_desc')}
                  </p>
                  <Link
                    href="/apartments"
                    className={`inline-block border border-white/30 bg-white/10 px-6 py-3 text-[9px] font-bold tracking-[0.2em] text-white uppercase transition-colors hover:bg-white hover:text-[#151926] ${inter.className}`}
                  >
                    {tNews('promo_explore')}
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
