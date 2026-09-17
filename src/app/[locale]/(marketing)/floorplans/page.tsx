import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FloorplanHero } from '@/components/floorplans/FloorplanHero';
import { FloorPlateViewer } from '@/components/floorplans/FloorPlateViewer';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { getLocalizedFloorLevels, getLocalizedUnitTypologies } from '@/data/floorplans';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

type FloorplansPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: FloorplansPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'FloorplansPage' });
  const alternates = getI18nAlternates('/floorplans', locale);
  const og = getOpenGraphLocales(locale);

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    keywords: getLocalizedKeywords('floorplans', locale),
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
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1200',
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
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=85&w=1200'],
    },
  };
}

export default async function FloorplansPage(props: FloorplansPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'FloorplansPage' });
  const levels = getLocalizedFloorLevels(locale);
  const units = getLocalizedUnitTypologies(locale);
  const baseUrl = getBaseUrl();
  const routePath = '/floorplans';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    inLanguage: locale,
    name: t('meta_title'),
    description: t('meta_description'),
    url: `${baseUrl}${getI18nPath(routePath, locale)}`,
    containedInPlace: {
      '@type': 'ApartmentComplex',
      name: LOCAL_BUSINESS_CONFIG.name,
      alternateName: LOCAL_BUSINESS_CONFIG.alternateName,
      url: `${baseUrl}${getI18nPath('', locale)}`,
      telephone: LOCAL_BUSINESS_CONFIG.telephone,
      hasMap: LOCAL_BUSINESS_CONFIG.hasMap,
      address: LOCAL_BUSINESS_CONFIG.address,
      geo: LOCAL_BUSINESS_CONFIG.geo,
    },
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-textured-sand relative min-h-screen w-full">
        {/* Fixed Top Header (Shared from main page) */}
        <Header alwaysDark={true} />

        {/* Hero Section with Tower Elevation Specs & Wind Compass */}
        <FloorplanHero />

        {/* Master Floor Plate & Interactive Level Navigator */}
        <FloorPlateViewer levels={levels} units={units} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
