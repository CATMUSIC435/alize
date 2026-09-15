import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ApartmentHero } from '@/components/apartments/ApartmentHero';
import { ApartmentList } from '@/components/apartments/ApartmentList';
import { ApartmentSidebar } from '@/components/apartments/ApartmentSidebar';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: t('apartments') + ' | Era Residence',
    description: t('boutique_desc'),
    openGraph: {
      title: t('apartments') + ' | Era Residence',
      description: t('boutique_desc'),
      url: `https://era-residence.com/${locale}/apartments`,
    },
  };
}

export default async function ApartmentsPage(props: { params: Promise<{ locale: string }> }) {
  // Required by next-intl for SSR routing
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Index' });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: t('apartments') + ' - Era Residence',
    description: t('boutique_desc'),
    url: `https://era-residence.com/${locale}/apartments`,
    mainEntity: {
      '@type': 'RealEstateAgent',
      name: 'Era Residence Estepona',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'New Golden Mile',
        addressLocality: 'Estepona',
        addressRegion: 'Málaga',
        postalCode: '29680',
        addressCountry: 'ES',
      },
    },
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen w-full bg-[#F4F3ED]">
        {/* Fixed Top Header (shared from main page) */}
        <Header />

        {/* Fixed Left Sidebar */}
        <ApartmentSidebar />

        {/* Hero Section with "APARTMENTS" */}
        <ApartmentHero />

        {/* Interactive List and Filters */}
        <ApartmentList />
      </main>

      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
