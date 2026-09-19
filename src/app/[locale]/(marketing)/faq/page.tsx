import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FaqAccordionViewer } from '@/components/faq/FaqAccordionViewer';
import { FaqHero } from '@/components/faq/FaqHero';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { getLocalizedFaqItems } from '@/data/faq';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

type FaqPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generates SEO metadata for the Frequently Asked Questions (FAQ) page.
 * @param props Page parameters promise.
 * @returns Metadata object.
 */
export async function generateMetadata(props: FaqPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'FaqPage' });
  const alternates = getI18nAlternates('/faq', locale);
  const og = getOpenGraphLocales(locale);

  const title = t('meta_title');
  const description = t('meta_description');

  return {
    title,
    description,
    keywords: getLocalizedKeywords('faq', locale),
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
          url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200',
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
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=85&w=1200'],
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
 * Dedicated Frequently Asked Questions (FAQ) page with Schema.org FAQPage rich data.
 * @param props Page properties containing params promise.
 * @returns The FaqPage component.
 */
export default async function FaqPage(props: FaqPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'FaqPage' });
  const faqItems = getLocalizedFaqItems(locale);
  const baseUrl = getBaseUrl();
  const routePath = '/faq';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#faqpage`,
        'url': `${baseUrl}${getI18nPath(routePath, locale)}`,
        'name': `${t('meta_title')}`,
        'description': t('meta_description'),
        'inLanguage': locale,
        'mainEntity': faqItems.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
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
              'name': t('breadcrumb_faq'),
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
        <FaqHero faqCount={faqItems.length} />

        {/* Interactive Search, Category Filters, and Accordion Viewer */}
        <FaqAccordionViewer items={faqItems} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
