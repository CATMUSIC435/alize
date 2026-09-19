import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter, Playfair_Display } from 'next/font/google';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { Link } from '@/libs/I18nNavigation';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const clipPathPolygon =
  'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates SEO metadata for the Privacy Policy page.
 * @param props The route page parameters.
 * @returns Metadata object.
 */
export async function generateMetadata(props: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
  const alternates = getI18nAlternates('/privacy', locale);
  const og = getOpenGraphLocales(locale);

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    keywords: getLocalizedKeywords('privacy', locale),
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200',
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=85&w=1200'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Dedicated Privacy Policy content page.
 * @param props Page parameters promise.
 * @returns The PrivacyPage component.
 */
export default async function PrivacyPage(props: PrivacyPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'PrivacyPage' });
  const baseUrl = getBaseUrl();
  const routePath = '/privacy';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#webpage`,
        'url': `${baseUrl}${getI18nPath(routePath, locale)}`,
        'name': `${t('meta_title')}`,
        'description': t('meta_description'),
        'inLanguage': locale,
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': t('breadcrumb_home'),
              'item': `${baseUrl}${getI18nPath('', locale)}`,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': t('breadcrumb_privacy'),
              'item': `${baseUrl}${getI18nPath(routePath, locale)}`,
            },
          ],
        },
      },
      {
        '@type': 'ApartmentComplex',
        '@id': `${baseUrl}/#organization`,
        'name': LOCAL_BUSINESS_CONFIG.name,
        'alternateName': LOCAL_BUSINESS_CONFIG.alternateName,
        'url': baseUrl,
        'telephone': LOCAL_BUSINESS_CONFIG.telephone,
        'address': LOCAL_BUSINESS_CONFIG.address,
      },
    ],
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-textured-sand relative min-h-screen w-full pt-[16vh] pb-24 md:pt-[20vh] md:pb-36">
        <Header alwaysDark={true} />

        <article className="relative z-10 mx-auto w-full max-w-[1000px] px-6 md:px-12">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-[9px] font-bold tracking-[0.2em] text-[#151926]/60 uppercase sm:text-[10px]">
            <Link href="/" className="transition-colors hover:text-[#8B7043]">
              {t('breadcrumb_home')}
            </Link>
            <span className="text-[#8B7043]">/</span>
            <span className="text-[#8B7043]">{t('breadcrumb_privacy')}</span>
          </div>

          {/* Header Banner */}
          <div className="border-b border-[#151926]/15 pb-8 sm:pb-12">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-2 w-2 items-center justify-center">
                <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-[#8B7043] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#8B7043]" />
              </span>
              <span
                className={`text-[10px] font-bold tracking-[0.28em] text-[#8B7043] uppercase md:text-xs ${inter.className}`}
              >
                ALIZÉ • {t('hero_badge')}
              </span>
            </div>

            <h1
              className={`text-[9vw] leading-none font-normal tracking-tight text-[#151926] uppercase sm:text-[7vw] md:text-[68px] lg:text-[80px] ${playfair.className}`}
            >
              {t('hero_heading')}
            </h1>

            <p className={`mt-4 text-xs leading-relaxed text-[#151926]/75 sm:text-sm md:text-base ${inter.className}`}>
              {t('hero_subtitle')}
            </p>

            <span className={`mt-3 block text-[9.5px] font-medium tracking-wider text-[#8B7043] uppercase ${inter.className}`}>
              {t('last_updated')}
            </span>
          </div>

          {/* Policy Sections */}
          <div className="mt-10 space-y-10 sm:mt-14 sm:space-y-12">
            <section className="space-y-3">
              <h2 className={`text-lg font-medium text-[#151926] uppercase sm:text-xl ${playfair.className}`}>
                {t('section_1_title')}
              </h2>
              <p className={`text-xs leading-relaxed text-[#151926]/85 sm:text-sm ${inter.className}`}>
                {t('section_1_content')}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-medium text-[#151926] uppercase sm:text-xl ${playfair.className}`}>
                {t('section_2_title')}
              </h2>
              <p className={`text-xs leading-relaxed text-[#151926]/85 sm:text-sm ${inter.className}`}>
                {t('section_2_content')}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-medium text-[#151926] uppercase sm:text-xl ${playfair.className}`}>
                {t('section_3_title')}
              </h2>
              <p className={`text-xs leading-relaxed text-[#151926]/85 sm:text-sm ${inter.className}`}>
                {t('section_3_content')}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className={`text-lg font-medium text-[#151926] uppercase sm:text-xl ${playfair.className}`}>
                {t('section_4_title')}
              </h2>
              <p className={`text-xs leading-relaxed text-[#151926]/85 sm:text-sm ${inter.className}`}>
                {t('section_4_content')}
              </p>
            </section>
          </div>

          {/* Support / Contact Callout */}
          <div
            className="mt-16 bg-[#D6D3C8] p-[1px] shadow-sm drop-shadow-md sm:mt-20"
            style={{ clipPath: clipPathPolygon }}
          >
            <div
              className="bg-[#151926] p-8 text-[#FBF9F5] sm:p-10"
              style={{ clipPath: clipPathPolygon }}
            >
              <h3 className={`text-lg font-medium text-white uppercase sm:text-xl ${playfair.className}`}>
                {t('contact_box_title')}
              </h3>
              <p className={`mt-2 text-xs leading-relaxed text-[#FBF9F5]/80 sm:text-sm ${inter.className}`}>
                {t('contact_box_desc')}
              </p>
            </div>
          </div>
        </article>
      </main>

      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
