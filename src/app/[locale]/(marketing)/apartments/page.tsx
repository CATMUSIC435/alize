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

import { routing } from '@/libs/I18nRouting';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  const title = `${t('apartments')} | Alizé Residence Đà Nẵng`;
  const description = t('boutique_desc');
  const canonicalUrl = `https://alize-residence.com/${locale}/apartments`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `https://alize-residence.com/${loc}/apartments`]),
  );

  return {
    title,
    description,
    keywords: [
      'Bộ sưu tập căn hộ Alizé',
      'Apartments Alizé Residence',
      'Căn hộ 2 phòng ngủ Mỹ Khê',
      'Căn hộ 3 phòng ngủ view biển Đà Nẵng',
      'Penthouse Alizé Residence Đà Nẵng',
      'Luxury beachfront apartments Da Nang',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': 'https://alize-residence.com/en/apartments',
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: locale === 'vi' ? 'vi_VN' : locale === 'zh' ? 'zh_CN' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence - Bộ sưu tập căn hộ biển Mỹ Khê',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200'],
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
    '@type': 'CollectionPage',
    name: `${t('apartments')} - Alizé Residence Đà Nẵng`,
    description: t('boutique_desc'),
    url: `https://alize-residence.com/${locale}/apartments`,
    mainEntity: {
      '@type': 'RealEstateAgent',
      name: 'Alizé Residence Đà Nẵng',
      telephone: '+84965355355',
      email: 'contact@alize-residence.com',
      url: 'https://alize-residence.com',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Đường Võ Nguyên Giáp, Phường Phước Mỹ',
        addressLocality: 'Sơn Trà',
        addressRegion: 'Đà Nẵng',
        postalCode: '550000',
        addressCountry: 'VN',
      },
    },
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-textured-sand relative min-h-screen w-full">
        {/* Fixed Top Header (shared from main page) */}
        <Header alwaysDark={true} />

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
