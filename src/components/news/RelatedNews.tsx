'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import type { NewsArticle } from '@/data/news';
import { NewsCard } from './NewsCard';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export function RelatedNews(props: { currentSlug: string; articles: NewsArticle[] }) {
  const currentArticle = props.articles.find((a) => a.slug === props.currentSlug);
  const related = props.articles
    .filter((a) => a.slug !== props.currentSlug)
    .sort((a, b) => {
      // Prioritize same category
      if (currentArticle && a.category === currentArticle.category && b.category !== currentArticle.category) {
        return -1;
      }
      if (currentArticle && b.category === currentArticle.category && a.category !== currentArticle.category) {
        return 1;
      }
      return 0;
    })
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="relative w-full border-t border-[#D4CEBF]/60 bg-[#F9F8F3]/60 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <span className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}>
            KHÁM PHÁ THÊM
          </span>
          <h2
            className={`mt-2 text-2xl font-semibold tracking-tight text-[#151926] uppercase sm:text-3xl md:text-4xl ${playfair.className}`}
          >
            BÀI VIẾT LIÊN QUAN
          </h2>
          <div className="mt-4 h-[1px] w-12 bg-[#8B7043]" />
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {related.map((article, index) => (
            <NewsCard key={article.id} article={article} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
