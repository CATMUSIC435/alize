'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function NewsCard(props: { article: NewsArticle }) {
  return (
    <Link
      href={`/news/${props.article.slug}`}
      className="group relative block w-full cursor-pointer drop-shadow-md filter transition-all duration-500 hover:drop-shadow-2xl"
    >
      <div
        className="flex h-full w-full flex-col justify-between bg-[#F4F3ED] p-7 transition-colors duration-500 group-hover:bg-[#FCFBF8] sm:p-8 md:p-10"
        style={{ clipPath: clipPathPolygon }}
      >
        {/* TOP METADATA ROW */}
        <div className="mb-6 flex w-full items-center justify-between border-b border-[#151926]/10 pb-4">
          <span
            className={`text-[10px] font-bold tracking-[0.2em] text-[#8B7043] uppercase md:text-[11px] ${inter.className}`}
          >
            {props.article.categoryLabel}
          </span>
          <span
            className={`text-[9px] tracking-[0.2em] text-[#151926]/60 uppercase md:text-[10px] ${inter.className}`}
          >
            {props.article.date}
          </span>
        </div>

        {/* IMAGE SECTION */}
        <div
          className="relative mb-6 aspect-[16/10] w-full overflow-hidden transition-transform duration-700 group-hover:scale-[1.02]"
          style={{ clipPath: clipPathPolygon }}
        >
          <Image
            src={props.article.coverImage}
            alt={props.article.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* TITLE & EXCERPT */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <h3
              className={`mb-3 text-lg leading-tight font-medium text-[#151926] uppercase transition-colors duration-300 group-hover:text-[#8B7043] sm:text-xl md:text-[22px] ${playfair.className}`}
            >
              {props.article.title}
            </h3>
            <p
              className={`mb-6 line-clamp-3 text-xs leading-relaxed text-[#151926]/70 ${inter.className}`}
            >
              {props.article.excerpt}
            </p>
          </div>

          {/* BOTTOM ROW: Author & Read Time */}
          <div className="mt-auto flex items-center justify-between border-t border-[#151926]/10 pt-4">
            <div className="flex items-center gap-2.5">
              <div className="relative h-6 w-6 overflow-hidden rounded-full border border-[#8B7043]/40">
                <Image
                  src={props.article.author.avatar}
                  alt={props.article.author.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <span
                className={`max-w-[120px] truncate text-[9px] font-bold tracking-[0.15em] text-[#151926]/80 uppercase md:text-[10px] ${inter.className}`}
              >
                {props.article.author.name}
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase transition-transform duration-300 group-hover:translate-x-1 md:text-[10px]">
              <span>{props.article.readTime}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
