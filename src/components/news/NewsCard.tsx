'use client';

import { motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function NewsCard(props: { article: NewsArticle; index?: number }) {
  const delay = props.index !== undefined ? Math.min(props.index * 0.1, 0.4) : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      className="group flex flex-col justify-between overflow-hidden rounded-sm border border-[#D4CEBF]/60 bg-white/70 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#8B7043]/50 hover:shadow-xl"
    >
      <Link href={`/news/${props.article.slug}`} className="flex h-full flex-col justify-between">
        <div>
          {/* Card Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0D2D40]">
            <Image
              src={props.article.coverImage}
              alt={props.article.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
            />
            {/* Category Badge */}
            <div className="absolute top-3 left-3 z-10">
              <span
                className={`inline-block rounded-full bg-[#0D2D40]/85 px-3 py-1 text-[8px] font-bold tracking-[0.18em] text-white uppercase backdrop-blur-md transition-colors group-hover:bg-[#8B7043] ${inter.className}`}
              >
                {props.article.categoryLabel}
              </span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6">
            {/* Date & Read Time */}
            <div className={`flex items-center gap-2 text-[10px] font-medium tracking-[0.08em] text-[#7A7F8D] uppercase ${inter.className}`}>
              <span>{props.article.date}</span>
              <span>•</span>
              <span>{props.article.readTime}</span>
            </div>

            {/* Title */}
            <h3
              className={`mt-3 text-lg font-semibold leading-snug text-[#151926] transition-colors duration-300 group-hover:text-[#8B7043] sm:text-xl ${playfair.className}`}
            >
              {props.article.title}
            </h3>

            {/* Excerpt */}
            <p className={`mt-2.5 line-clamp-3 text-xs leading-relaxed text-[#2D3346]/75 ${inter.className}`}>
              {props.article.excerpt}
            </p>
          </div>
        </div>

        {/* Card Footer: Author & Read More */}
        <div className="flex items-center justify-between border-t border-[#D4CEBF]/40 p-6 pt-4">
          <div className="flex items-center gap-2.5">
            <div className="relative h-7 w-7 overflow-hidden rounded-full border border-[#D4CEBF]">
              <Image
                src={props.article.author.avatar}
                alt={props.article.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className={`text-[11px] font-medium text-[#151926] ${inter.className}`}>
              {props.article.author.name}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.15em] text-[#8B7043] uppercase transition-transform duration-300 group-hover:translate-x-1 ${inter.className}`}
          >
            <span>Chi tiết</span>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
