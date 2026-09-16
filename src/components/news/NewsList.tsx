'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import type { NewsArticle } from '@/data/news';
import { Link } from '@/libs/I18nNavigation';
import { NewsCard } from './NewsCard';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

export function NewsList(props: { articles: NewsArticle[]; featuredArticleId?: string }) {
  const tNews = useTranslations('NewsPage');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<string>('NEWEST');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<'category' | 'sort' | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const categories = [
    { id: 'ALL', label: tNews('all_topics') },
    { id: 'project', label: tNews('category_project') },
    { id: 'architecture', label: tNews('category_architecture') },
    { id: 'market', label: tNews('category_market') },
    { id: 'lifestyle', label: tNews('category_lifestyle') },
  ] as const;

  const sorts = [
    { id: 'NEWEST', label: tNews('sort_newest') },
    { id: 'OLDEST', label: tNews('sort_oldest') },
    { id: 'READ_TIME', label: tNews('sort_read_time') },
  ] as const;

  let filteredAndSorted = [...props.articles];

  // If in default view (ALL and no search), omit the hero featured article to prevent duplication
  if (selectedCategory === 'ALL' && !searchQuery.trim() && props.featuredArticleId) {
    filteredAndSorted = filteredAndSorted.filter((a) => a.id !== props.featuredArticleId);
  } else if (selectedCategory !== 'ALL') {
    filteredAndSorted = filteredAndSorted.filter((a) => a.category === selectedCategory);
  }

  // Search query
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filteredAndSorted = filteredAndSorted.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some((tag) => tag.toLowerCase().includes(q)),
    );
  }

  // Sort
  if (sortBy === 'OLDEST') {
    filteredAndSorted.reverse();
  } else if (sortBy === 'READ_TIME') {
    filteredAndSorted.sort((a, b) => parseInt(a.readTime, 10) - parseInt(b.readTime, 10));
  }

  const toggleDropdown = (dropdown: 'category' | 'sort') => {
    setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const handleReset = () => {
    setSelectedCategory('ALL');
    setSortBy('NEWEST');
    setSearchQuery('');
    setActiveDropdown(null);
  };

  const activeCategoryLabel =
    categories.find((c) => c.id === selectedCategory)?.label ?? tNews('all_topics');
  const activeSortLabel = sorts.find((s) => s.id === sortBy)?.label ?? tNews('sort_newest');

  return (
    <section className="relative w-full bg-[#F4F3ED] px-6 py-12 md:px-12 md:py-20">
      <div className="mx-auto w-full max-w-[1600px]">
        {/* DUAL LAYER CHAMFERED FILTER BAR */}
        <div className="relative z-30 mb-12 w-full">
          {/* Background Chamfer Frame */}
          <div
            className="absolute inset-0 z-0 bg-[#D6D3C8] p-[1px]"
            style={{ clipPath: clipPathPolygon }}
          >
            <div className="h-full w-full bg-[#F4F3ED]" style={{ clipPath: clipPathPolygon }} />
          </div>

          {/* Filter Bar Content */}
          <div className="relative z-10 flex w-full flex-col items-start justify-between gap-6 px-6 py-6 md:flex-row md:items-center md:gap-8 md:px-10 md:py-8">
            <div
              className={`flex flex-wrap items-center gap-6 text-[10px] font-bold tracking-[0.2em] text-[#151926] uppercase md:gap-12 md:text-xs ${inter.className}`}
              ref={dropdownRef}
            >
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    toggleDropdown('category');
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-70 focus:outline-none"
                >
                  <span className="opacity-60">{tNews('filter_topic')}</span>
                  <span className="text-[#8B7043]">{activeCategoryLabel}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform ${activeDropdown === 'category' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'category' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-6 min-w-[220px] bg-[#D6D3C8] p-[1px]"
                      style={{
                        clipPath: dropdownClip,
                        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col bg-[#F4F3ED] py-2"
                        style={{ clipPath: dropdownClip }}
                      >
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              setSelectedCategory(cat.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] transition-colors hover:bg-[#D6D3C8]/40 focus:outline-none ${selectedCategory === cat.id ? 'text-[#8B7043]' : 'text-[#151926]/70'}`}
                          >
                            {cat.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    toggleDropdown('sort');
                  }}
                  className="flex items-center gap-2 transition-opacity hover:opacity-70 focus:outline-none"
                >
                  <span className="opacity-60">{tNews('filter_sort')}</span>
                  <span>{activeSortLabel}</span>
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={`transition-transform ${activeDropdown === 'sort' ? 'rotate-180' : ''}`}
                  >
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>

                <AnimatePresence>
                  {activeDropdown === 'sort' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 z-50 mt-6 min-w-[200px] bg-[#D6D3C8] p-[1px]"
                      style={{
                        clipPath: dropdownClip,
                        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.1))',
                      }}
                    >
                      <div
                        className="flex h-full w-full flex-col bg-[#F4F3ED] py-2"
                        style={{ clipPath: dropdownClip }}
                      >
                        {sorts.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSortBy(s.id);
                              setActiveDropdown(null);
                            }}
                            className={`w-full px-5 py-3 text-left text-[10px] font-bold tracking-[0.15em] transition-colors hover:bg-[#D6D3C8]/40 focus:outline-none ${sortBy === s.id ? 'text-[#151926]' : 'text-[#151926]/70'}`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar Input */}
              <div className="flex items-center gap-2 border-b border-[#151926]/20 pb-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="opacity-40"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={tNews('search_placeholder')}
                  className="w-32 bg-transparent text-[10px] tracking-[0.15em] text-[#151926] placeholder-[#151926]/40 uppercase transition-all duration-300 focus:w-44 focus:outline-none md:text-xs"
                />
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className={`text-[10px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase transition-colors hover:text-[#151926] focus:outline-none md:text-xs ${inter.className}`}
            >
              {tNews('reset')}
            </button>
          </div>
        </div>

        {/* ARTICLES GRID */}
        {filteredAndSorted.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAndSorted.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}

            {/* Editorial Concept Promo Card */}
            <div
              className="group relative h-[600px] w-full cursor-pointer overflow-hidden lg:h-auto"
              style={{ clipPath: clipPathPolygon }}
            >
              <Image
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200"
                alt="Alizé Architectural Philosophy"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2D40] via-[#0D2D40]/60 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-95" />

              <div className="relative z-10 flex h-full flex-col justify-between p-8 text-white md:p-12">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-bold tracking-[0.25em] text-[#E0AC87] uppercase md:text-[10px] ${inter.className}`}
                  >
                    {tNews('editorial_journal')}
                  </span>
                  <span className="h-[1px] w-12 bg-white/30" />
                </div>

                <div>
                  <h4
                    className={`mb-4 text-2xl leading-tight text-white uppercase sm:text-3xl ${playfair.className}`}
                  >
                    {tNews('promo_title')}
                  </h4>
                  <p
                    className={`mb-8 text-xs leading-relaxed text-white/80 ${inter.className}`}
                  >
                    {tNews('promo_desc')}
                  </p>
                  <Link
                    href="/apartments"
                    className={`inline-flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase transition-colors hover:text-white ${inter.className}`}
                  >
                    <span>{tNews('promo_explore')}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className={`text-sm tracking-[0.2em] text-[#151926]/50 uppercase ${inter.className}`}>
              {tNews('no_articles')}
            </p>
            <button
              onClick={handleReset}
              className={`mt-4 text-xs font-bold tracking-[0.2em] text-[#8B7043] uppercase underline underline-offset-4 hover:opacity-70 ${inter.className}`}
            >
              {tNews('clear_filters')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
