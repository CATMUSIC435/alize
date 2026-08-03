'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import { APARTMENTS_DATA } from '@/data/apartments';
import { Link } from '@/libs/I18nNavigation';
import { ApartmentCard } from './ApartmentCard';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export function SimilarApartments({ currentId }: { currentId: string }) {
  const t = useTranslations('Index');

  const getTypologyLabel = (typ: string) => {
    switch (typ) {
      case 'GROUND_FLOOR_BASEMENT': {
        return t('ground_floor_basement');
      }
      case 'FIRST_FLOOR': {
        return t('first_floor');
      }
      case 'PENTHOUSE': {
        return t('penthouse');
      }
      default: {
        return t('all');
      }
    }
  };

  const similarApts = APARTMENTS_DATA.filter((apt) => apt.id !== currentId).slice(0, 4);

  return (
    <section className="relative z-20 w-full [border-top-left-radius:50vw] [border-top-right-radius:50vw] bg-[#F4F3ED] pt-[15vh] pb-32 text-[#151926] md:pt-[15vw] md:pb-48">
      {/* SIMILAR OPTIONS Title */}
      <div className="mb-24 flex w-full flex-col items-center px-6 text-center md:mb-32">
        <h2
          className={`flex flex-col items-center text-[8vw] leading-[0.8] font-medium tracking-tighter text-[#151926] uppercase md:text-[6vw] ${playfair.className}`}
          style={{ transform: 'scaleY(1.3)' }}
        >
          {t('similar_options')}
        </h2>

        <div className="mt-16 h-24 w-[1px] bg-[#151926]/30 md:mt-24 md:h-32"></div>

        <p
          className={`mt-16 max-w-sm text-[10px] font-bold tracking-widest text-[#151926] uppercase md:mt-24 md:text-xs ${inter.className}`}
        >
          {t('other_apartments_suit')
            .split('\n')
            .map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
        </p>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-12">
          {similarApts.map((apt) => (
            <ApartmentCard
              key={apt.id}
              data={{ ...apt, typology: getTypologyLabel(apt.typology) }}
            />
          ))}
        </div>

        <div className="mt-24 flex justify-center">
          <Link
            href="/apartments"
            className={`rounded-full border border-[#151926] px-12 py-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 hover:bg-[#151926] hover:text-[#F4F3ED] md:text-[11px] ${inter.className}`}
          >
            {t('view_all')}
          </Link>
        </div>
      </div>
    </section>
  );
}
