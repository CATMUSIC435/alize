'use client';

import { motion } from 'framer-motion';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import type { GalleryCategory, GalleryItem } from '@/data/gallery';
import { GalleryFilter } from './GalleryFilter';
import { GalleryLightbox } from './GalleryLightbox';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cardPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function GalleryGrid(props: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? props.items
      : props.items.filter((item) => item.category === activeCategory);

  const counts: Record<GalleryCategory, number> = {
    all: props.items.length,
    architecture: props.items.filter((i) => i.category === 'architecture').length,
    interior: props.items.filter((i) => i.category === 'interior').length,
    amenities: props.items.filter((i) => i.category === 'amenities').length,
    lifestyle: props.items.filter((i) => i.category === 'lifestyle').length,
    video: props.items.filter((i) => i.category === 'video').length,
  };

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] ?? null : null;

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div className="relative w-full pb-24 md:pb-36">
      {/* Category Filter Tabs */}
      <GalleryFilter
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        counts={counts}
      />

      {/* Gallery Staggered Grid */}
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
        >
          {filteredItems.map((item, index) => {
            const isFeatured = item.featured && index === 0;

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`group relative cursor-pointer overflow-hidden ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedItemIndex(index)}
              >
                {/* Gold Outer Border with Chamfered Wave Mask */}
                <div
                  className="bg-[#D6D3C8] p-[1px] transition-colors duration-500 group-hover:bg-[#8B7043]"
                  style={{ clipPath: cardPolygon }}
                >
                  <div
                    className="relative overflow-hidden bg-[#151926]"
                    style={{ clipPath: cardPolygon }}
                  >
                    {/* Aspect Ratio Container */}
                    <div
                      className={`relative w-full overflow-hidden ${
                        isFeatured
                          ? 'aspect-[16/9] md:aspect-[21/9]'
                          : item.aspectRatio === 'tall'
                            ? 'aspect-[3/4]'
                            : item.aspectRatio === 'square'
                              ? 'aspect-square'
                              : 'aspect-[16/10]'
                      }`}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Multi-layered Cinematic Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#151926]/90 via-[#151926]/20 to-transparent transition-opacity duration-300 group-hover:opacity-95" />

                      {/* Category Badge Top Left */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`rounded-full border border-white/20 bg-[#151926]/80 px-3 py-1 text-[8px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase backdrop-blur-md md:text-[9px] ${inter.className}`}
                        >
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Video Play Indicator */}
                      {item.videoUrl && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-[#E0AC87] group-hover:bg-[#E0AC87]/30">
                            <svg
                              width="22"
                              height="22"
                              viewBox="0 0 24 24"
                              fill="white"
                              className="ml-1"
                            >
                              <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                          </div>
                        </div>
                      )}

                      {/* Title & Location Bottom Caption */}
                      <div className="absolute right-4 bottom-4 left-4 z-10 transform transition-transform duration-300 group-hover:-translate-y-1">
                        <span
                          className={`block text-[9px] font-bold tracking-[0.2em] text-[#E0AC87] uppercase md:text-[10px] ${inter.className}`}
                        >
                          {item.location}
                        </span>
                        <h3
                          className={`mt-1 text-lg font-normal text-white uppercase sm:text-xl md:text-2xl ${playfair.className}`}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={`mt-1 line-clamp-2 text-xs text-white/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${inter.className}`}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <GalleryLightbox
        item={selectedItem}
        onClose={() => setSelectedItemIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        currentIndex={selectedItemIndex ?? undefined}
        totalCount={filteredItems.length}
      />
    </div>
  );
}
