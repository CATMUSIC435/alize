import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { LegalDossierViewer } from '@/components/legal/LegalDossierViewer';
import { LegalHero } from '@/components/legal/LegalHero';
import { getLocalizedLegalDocs } from '@/data/legal';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

type LegalPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates SEO metadata for the statutory Legal Documents page.
 * @param props The route page parameters.
 * @returns Metadata object.
 */
export async function generateMetadata(props: LegalPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'LegalPage' });
  const alternates = getI18nAlternates('/legal', locale);
  const og = getOpenGraphLocales(locale);

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    keywords: getLocalizedKeywords('legal', locale),
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
 * Dedicated statutory Legal Dossier page for Alizé Residence.
 * @param props Page properties containing params promise.
 * @returns The LegalPage component.
 */
export default async function LegalPage(props: LegalPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'LegalPage' });
  const documents = getLocalizedLegalDocs(locale);
  const baseUrl = getBaseUrl();
  const routePath = '/legal';

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
              'name': t('breadcrumb_legal'),
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
      <main className="bg-textured-sand relative min-h-screen w-full">
        {/* Fixed Top Header (Shared from main layout) */}
        <Header alwaysDark={true} />

        {/* Hero Section with Wave & Sand Ripple Lines */}
        <LegalHero documentCount={documents.length} />

        {/* Interactive Statutory Document Navigator & Details */}
        <LegalDossierViewer documents={documents} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
