'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import { useState } from 'react';
import type { NewsArticle } from '@/data/news';
import { NewsCard } from './NewsCard';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

const CATEGORIES = [
  { id: 'all', label: 'TẤT CẢ' },
  { id: 'project', label: 'DỰ ÁN' },
  { id: 'architecture', label: 'KIẾN TRÚC' },
  { id: 'market', label: 'THỊ TRƯỜNG' },
  { id: 'lifestyle', label: 'PHONG CÁCH SỐNG' },
] as const;

export function NewsList(props: { articles: NewsArticle[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = props.articles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="relative w-full pb-24 md:pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Controls Row: Category Filter Tabs & Search Bar */}
        <div className="flex flex-col items-center justify-between gap-6 border-b border-[#D4CEBF]/60 pb-8 md:flex-row">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative cursor-pointer rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.16em] uppercase transition-all duration-300 md:px-5 md:py-2.5 md:text-xs ${
                    inter.className
                  } ${
                    isActive
                      ? 'bg-[#0D2D40] text-white shadow-md'
                      : 'border border-[#D4CEBF]/60 bg-white/60 text-[#7A7F8D] hover:border-[#8B7043]/50 hover:text-[#151926]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-xs sm:w-auto">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-full border border-[#D4CEBF]/70 bg-white/80 px-4 py-2 pl-9 text-xs text-[#151926] placeholder-[#7A7F8D]/70 transition-all focus:border-[#8B7043] focus:outline-none focus:ring-1 focus:ring-[#8B7043] ${inter.className}`}
            />
            <svg
              className="absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-[#7A7F8D]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-[#7A7F8D] hover:text-[#151926]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-8 flex items-center justify-between">
          <span className={`text-[11px] font-medium tracking-[0.1em] text-[#7A7F8D] uppercase ${inter.className}`}>
            Hiển thị {filteredArticles.length} bài viết
          </span>
        </div>

        {/* Articles Grid */}
        <AnimatePresence mode="wait">
          {filteredArticles.length > 0 ? (
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
            >
              {filteredArticles.map((article, index) => (
                <NewsCard key={article.id} article={article} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-16 flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#E0AC87]/20 text-[#8B7043]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className={`mt-4 text-xl font-medium text-[#151926] ${playfair.className}`}>
                Không tìm thấy bài viết nào
              </h3>
              <p className={`mt-2 text-xs text-[#7A7F8D] ${inter.className}`}>
                Vui lòng thử lại với từ khóa khác hoặc chọn chuyên mục khác.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className={`mt-6 rounded-full border border-[#8B7043] px-5 py-2 text-xs font-bold tracking-[0.15em] text-[#8B7043] uppercase transition-colors hover:bg-[#8B7043] hover:text-white ${inter.className}`}
              >
                Xem tất cả bài viết
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
