import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

import { getI18nAlternates, getLocalizedKeywords, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate SEO metadata for the Contact page with multilingual alternates.
 */
export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  const title = t('meta_title');
  const description = t('meta_description');
  const alternates = getI18nAlternates('/contact', locale);
  const og = getOpenGraphLocales(locale);

  return {
    title,
    description,
    keywords: getLocalizedKeywords('contact', locale),
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
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence Concierge & Sales Gallery',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'],
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
 * Dedicated Contact & VIP Appointment Page.
 */
export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  const baseUrl = getBaseUrl();
  const routePath = '/contact';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'Alizé Residence Đà Nẵng',
        'description': 'Tổ hợp căn hộ khách sạn và dinh thự biển đẳng cấp quốc tế tại bờ biển Mỹ Khê, Đà Nẵng.',
        'inLanguage': locale,
      },
      {
        '@type': 'ContactPage',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#webpage`,
        'url': `${baseUrl}${getI18nPath(routePath, locale)}`,
        'name': `${t('hero_title')} - Alizé Residence`,
        'isPartOf': { '@id': `${baseUrl}/#website` },
        'description': t('meta_description'),
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
              'name': t('breadcrumb_contact'),
              'item': `${baseUrl}${getI18nPath(routePath, locale)}`,
            },
          ],
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': `${baseUrl}/#organization`,
        'name': LOCAL_BUSINESS_CONFIG.name,
        'alternateName': LOCAL_BUSINESS_CONFIG.alternateName,
        'url': baseUrl,
        'logo': `${baseUrl}/apple-touch-icon.png`,
        'image': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
        'telephone': LOCAL_BUSINESS_CONFIG.telephone,
        'email': LOCAL_BUSINESS_CONFIG.email,
        'priceRange': LOCAL_BUSINESS_CONFIG.priceRange,
        'currenciesAccepted': LOCAL_BUSINESS_CONFIG.currenciesAccepted,
        'paymentAccepted': LOCAL_BUSINESS_CONFIG.paymentAccepted,
        'areaServed': LOCAL_BUSINESS_CONFIG.areaServed,
        'hasMap': LOCAL_BUSINESS_CONFIG.hasMap,
        'address': LOCAL_BUSINESS_CONFIG.address,
        'geo': LOCAL_BUSINESS_CONFIG.geo,
        'openingHoursSpecification': LOCAL_BUSINESS_CONFIG.openingHoursSpecification,
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
        {/* Fixed Top Navigation */}
        <Header alwaysDark={true} />

        {/* Fixed Left Vertical Sidebar */}
        <ContactSidebar />

        {/* Hero Header Section */}
        <ContactHero />

        {/* Main Content: 2-Column Luxury Layout */}
        <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-12 md:pb-28">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
            <div className="w-full lg:w-[58%] xl:w-[60%]">
              <ContactForm />
            </div>
            <div className="w-full lg:w-[42%] xl:w-[40%]">
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>

      {/* Signature Pre-Footer & Footer */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
