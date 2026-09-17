'use client';

import { useTranslations } from 'next-intl';
import { Inter, Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';
const dropdownClip =
  'polygon(8px 0, calc(100% - 8px) 0, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0 calc(100% - 8px), 0 8px)';

const googleMapsUrl =
  'https://maps.google.com/?q=16.0617,108.2435';

/**
 * Information card displaying concierge contacts, sales gallery location, and map.
 */
export function ContactInfo() {
  const t = useTranslations('ContactPage');

  return (
    <aside aria-label="Contact Information" className="w-full lg:sticky lg:top-32">
      <div className="w-full drop-shadow-md filter">
        <div className="bg-[#D6D3C8] p-[1px]" style={{ clipPath: clipPathPolygon }}>
          <div
            className="flex flex-col bg-[#F4F3ED] p-6 sm:p-10"
            style={{ clipPath: clipPathPolygon }}
          >
            {/* Title */}
            <div className="border-b border-[#151926]/10 pb-6">
              <span
                className={`text-[9px] font-bold tracking-[0.25em] text-[#8B7043] uppercase md:text-[10px] ${inter.className}`}
              >
                ALIZÉ CONCIERGE
              </span>
              <h2
                className={`mt-2 text-2xl font-medium tracking-tight text-[#151926] uppercase sm:text-3xl ${playfair.className}`}
              >
                {t('info_card_title')}
              </h2>
            </div>

            {/* Contact Details List */}
            <div className="flex flex-col space-y-6 pt-6">
              {/* Hotlines */}
              <div className="flex flex-col">
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase sm:text-[10px] ${inter.className}`}
                >
                  {t('hotline_label')}
                </span>
                <div className="mt-1 flex flex-col gap-1">
                  <a
                    href="tel:+84965355355"
                    className={`text-base font-semibold tracking-wide text-[#151926] transition-colors hover:text-[#8B7043] sm:text-lg ${inter.className}`}
                  >
                    +84 (965) 355-355
                  </a>
                  <a
                    href="tel:+84901234567"
                    className={`text-sm text-[#151926]/80 transition-colors hover:text-[#8B7043] ${inter.className}`}
                  >
                    +84 (0) 90 123 4567
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase sm:text-[10px] ${inter.className}`}
                >
                  {t('email_card_label')}
                </span>
                <a
                  href="mailto:contact@alize-residence.com"
                  className={`mt-1 text-sm font-medium text-[#151926] underline decoration-[#8B7043]/50 underline-offset-4 transition-colors hover:text-[#8B7043] sm:text-base ${inter.className}`}
                >
                  contact@alize-residence.com
                </a>
              </div>

              {/* Address */}
              <div className="flex flex-col">
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase sm:text-[10px] ${inter.className}`}
                >
                  {t('address_label')}
                </span>
                <p
                  className={`mt-1 text-xs leading-relaxed text-[#151926]/80 sm:text-sm ${inter.className}`}
                >
                  {t('address_value')}
                </p>
              </div>

              {/* Hours */}
              <div className="flex flex-col">
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] text-[#151926]/50 uppercase sm:text-[10px] ${inter.className}`}
                >
                  {t('hours_label')}
                </span>
                <p
                  className={`mt-1 text-xs leading-relaxed text-[#151926]/80 sm:text-sm ${inter.className}`}
                >
                  {t('hours_value')}
                </p>
              </div>

              {/* VIP Chauffeur Service */}
              <div className="border border-[#8B7043]/20 bg-[#ebd0b3]/20 p-4">
                <span
                  className={`text-[9px] font-bold tracking-[0.2em] text-[#8B7043] uppercase sm:text-[10px] ${inter.className}`}
                >
                  {t('vip_service_label')}
                </span>
                <p
                  className={`mt-1 text-xs leading-relaxed text-[#151926]/75 ${inter.className}`}
                >
                  {t('vip_service_desc')}
                </p>
              </div>

              {/* Google Maps directions CTA */}
              <div className="pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex w-full items-center justify-center gap-2 border border-[#151926]/20 bg-white/70 py-3.5 text-center text-[10px] font-bold tracking-[0.2em] uppercase text-[#151926] transition-all duration-300 hover:border-[#151926] hover:bg-white sm:text-xs ${inter.className}`}
                  style={{ clipPath: dropdownClip }}
                >
                  <svg
                    className="h-4 w-4 text-[#8B7043]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {t('directions_button')}
                </a>
              </div>

              {/* Map Embed Container */}
              <div
                className="relative mt-4 h-48 w-full overflow-hidden border border-[#151926]/10 sm:h-56"
                style={{ clipPath: dropdownClip }}
              >
                <iframe
                  title="Alizé Residence Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15337.568453412356!2d108.243555!3d16.061732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142177f1f9f22ad%3A0x6a053c51322cb2bb!2zQsOjaSBiaeG7g24gTeG7uSBLaMOq!5e0!3m2!1svi!2svn!4v1700000000000!5m2!1svi!2svn"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale filter contrast-125 transition-all duration-500 hover:filter-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
