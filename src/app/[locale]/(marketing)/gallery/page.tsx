import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { getLocalizedGalleryItems } from '@/data/gallery';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

type GalleryPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: GalleryPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'GalleryPage' });
  const alternates = getI18nAlternates('/gallery', locale);
  const og = getOpenGraphLocales(locale);

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    keywords: getLocalizedKeywords('gallery', locale),
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
  };
}

export default async function GalleryPage(props: GalleryPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'GalleryPage' });
  const items = getLocalizedGalleryItems(locale);
  const baseUrl = getBaseUrl();
  const routePath = '/gallery';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    inLanguage: locale,
    name: t('meta_title'),
    description: t('meta_description'),
    url: `${baseUrl}${getI18nPath(routePath, locale)}`,
    publisher: {
      '@type': 'RealEstateAgent',
      name: LOCAL_BUSINESS_CONFIG.name,
      alternateName: LOCAL_BUSINESS_CONFIG.alternateName,
      url: baseUrl,
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

        {/* Hero Section with Cinematic Visual Intro */}
        <GalleryHero totalItems={items.length} />

        {/* Staggered Luxury Gallery Grid & Lightbox */}
        <GalleryGrid items={items} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
