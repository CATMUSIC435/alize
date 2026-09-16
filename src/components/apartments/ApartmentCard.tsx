'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';
import Image from 'next/image';
import type { ApartmentData } from '@/data/apartments';
import { Link } from '@/libs/I18nNavigation';

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] });
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

export function ApartmentCard(props: { data: ApartmentData }) {
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
        return typ;
      }
    }
  };

  return (
    <Link
      href={`/apartments/${props.data.id}`}
      className="group relative block w-full cursor-pointer drop-shadow-md filter transition-all duration-500 hover:drop-shadow-2xl"
    >
      <div
        className="h-full w-full bg-[#D6D3C8] p-[1px] transition-colors duration-500 group-hover:bg-[#8B7043]/40"
        style={{ clipPath: clipPathPolygon }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-between bg-[#F4F3ED] p-8 transition-colors duration-500 group-hover:bg-[#FCFBF8] md:p-12"
          style={{ clipPath: clipPathPolygon }}
        >
        {/* TOP SECTION */}
        <div className="mb-10 flex w-full flex-col items-center text-center">
          <h3
            className={`mb-2 text-[11px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-xs ${inter.className}`}
          >
            {getTypologyLabel(props.data.typology)}
          </h3>
          <p
            className={`text-[9px] tracking-[0.2em] text-[#151926]/60 uppercase md:text-[10px] ${inter.className}`}
          >
            {t('completion')}: {props.data.completion}
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="relative mb-10 aspect-[4/3] w-full transition-transform duration-700 group-hover:scale-105">
          <Image
            src={props.data.image}
            alt={`Căn hộ No. ${props.data.number} (${props.data.area}m²) - Alizé Residence Đà Nẵng`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            unoptimized
          />
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-auto flex w-full flex-col items-center text-center">
          <p
            className={`mb-6 text-[9px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-[10px] ${inter.className}`}
          >
            Nº {props.data.number} <span className="mx-2 opacity-50">.</span> {t('block')} {props.data.block}{' '}
            <span className="mx-2 opacity-50">.</span> {props.data.floor} {t('floor')}
          </p>

          <h2 className={`mb-4 text-4xl text-[#151926] md:text-5xl ${playfair.className}`}>
            {props.data.bedrooms}{' '}
            <span className="font-sans text-[0.4em] tracking-[0.2em] uppercase">{t('bed')}</span>{' '}
            <span className="mx-2 text-[0.8em] font-light opacity-30">/</span> {props.data.area} M²
          </h2>

          {props.data.terrace ? (
            <p
              className={`text-[10px] font-bold tracking-[0.2em] text-[#151926] uppercase md:text-[11px] ${inter.className}`}
            >
              + {props.data.terrace} M² {t('terrace')}
            </p>
          ) : (
            <p
              className={`text-[10px] font-bold tracking-[0.2em] text-transparent uppercase md:text-[11px] ${inter.className}`}
            >
              -
            </p>
          )}
        </div>
      </div>
    </div>
  </Link>
  );
}
