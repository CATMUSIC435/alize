'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import type { FloorLevel } from '@/data/floorplans';

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

const buttonPolygon =
  'polygon(10px 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0 calc(100% - 10px), 0 10px)';

type FloorLevelSelectorProps = {
  levels: FloorLevel[];
  selectedLevelId: string;
  onSelectLevel: (levelId: string) => void;
};

export function FloorLevelSelector(props: FloorLevelSelectorProps) {
  const t = useTranslations('FloorplansPage');
  return (
    <div className="flex w-full flex-col space-y-2.5">
      {props.levels.map((level) => {
        const isSelected = props.selectedLevelId === level.id;

        return (
          <button
            key={level.id}
            type="button"
            onClick={() => props.onSelectLevel(level.id)}
            style={{ clipPath: buttonPolygon }}
            className={`group relative flex w-full cursor-pointer items-center justify-between p-4 text-left transition-all duration-300 ${
              isSelected
                ? 'border border-[#8B7043] bg-[#151926] text-white shadow-md'
                : 'border border-[#151926]/10 bg-white/60 text-[#151926] hover:border-[#8B7043]/40 hover:bg-white'
            }`}
          >
            {/* Left: Floor Range & Name */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-bold tracking-wider uppercase transition-colors md:text-sm ${
                    isSelected ? 'text-[#E0AC87]' : 'text-[#8B7043]'
                  } ${inter.className}`}
                >
                  {level.range}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[8px] font-bold tracking-widest uppercase ${
                    isSelected ? 'bg-white/10 text-white/70' : 'bg-[#151926]/5 text-[#151926]/60'
                  }`}
                >
                  {level.zoneLabel}
                </span>
              </div>
              <span
                className={`mt-1 line-clamp-1 text-sm font-normal uppercase md:text-base ${playfair.className} ${
                  isSelected ? 'text-white' : 'text-[#151926]'
                }`}
              >
                {level.name}
              </span>
            </div>

            {/* Right: Elevation badge */}
            <div className="shrink-0 pl-3 text-right">
              <span
                className={`block text-[9px] font-semibold tracking-widest uppercase ${
                  isSelected ? 'text-[#E0AC87]' : 'text-[#151926]/50'
                } ${inter.className}`}
              >
                +{level.elevationMeters}m
              </span>
              <span
                className={`text-[9px] tracking-wider ${
                  isSelected ? 'text-white/60' : 'text-[#151926]/40'
                }`}
              >
                {level.unitsCount > 0 ? t('units_per_floor', { count: level.unitsCount }) : t('amenities_floor')}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
