'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import type { NewsArticle } from '@/data/news';
import { NewsCard } from './NewsCard';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });

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
    <section className="relative z-20 w-full [border-top-left-radius:50vw] [border-top-right-radius:50vw] bg-[#F4F3ED] pt-[15vh] pb-32 text-[#151926] md:pt-[15vw] md:pb-44 border-t border-[#151926]/10">
      {/* Title & Hairline Divider matching SimilarApartments */}
      <div className="mb-20 flex w-full flex-col items-center px-6 text-center md:mb-28">
        <span className={`text-[10px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}>
          KHÁM PHÁ THÊM
        </span>

        <h2
          className={`mt-4 flex flex-col items-center text-[7vw] leading-[0.85] font-medium tracking-tighter text-[#151926] uppercase md:text-[5vw] ${playfair.className}`}
          style={{ transform: 'scaleY(1.3)' }}
        >
          BÀI VIẾT LIÊN QUAN
        </h2>

        <div className="mt-12 h-20 w-[1px] bg-[#151926]/30 md:mt-16 md:h-28" />

        <p
          className={`mt-10 max-w-sm text-[10px] font-bold tracking-widest text-[#151926]/70 uppercase md:text-xs ${inter.className}`}
        >
          Cập nhật những chuyển động mới nhất từ không gian sống Alizé Residence
        </p>
      </div>

      {/* Grid of Related Chamfered Cards */}
      <div className="mx-auto w-full max-w-[1500px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <NewsCard key={item.id} article={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
