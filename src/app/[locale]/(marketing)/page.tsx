import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ArchitectureSplit } from '@/components/landing/ArchitectureSplit';
import { BackgroundAnimation } from '@/components/landing/BackgroundAnimation';
import { EighthSection } from '@/components/landing/EighthSection';
import { FifthSection } from '@/components/landing/FifthSection';
import { Footer } from '@/components/landing/Footer';
import { FourthSection } from '@/components/landing/FourthSection';
import { Header } from '@/components/landing/Header';
import { HotspotLayer } from '@/components/landing/HotspotLayer';
import { NinthSection } from '@/components/landing/NinthSection';
import { ScrollIndicator } from '@/components/landing/ScrollIndicator';
import { ScrollManager } from '@/components/landing/ScrollManager';
import { SecondSection } from '@/components/landing/SecondSection';
import { SeventhSection } from '@/components/landing/SeventhSection';
import { SixthSection } from '@/components/landing/SixthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { ThirdSection } from '@/components/landing/ThirdSection';
import { TypographyOverlay } from '@/components/landing/TypographyOverlay';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'Index' });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
    openGraph: {
      title: t('meta_title'),
      description: t('meta_description'),
      url: `https://era-residence.com/${locale}`,
      siteName: 'Era Residence',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: 'Era Residence - Luxury Living in Estepona',
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta_title'),
      description: t('meta_description'),
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
      ],
    },
  };
}

export default async function EraResidencePage(props: { params: Promise<{ locale: string }> }) {
  // Required by next-intl for SSR routing
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Index' });

  // AIO Optimization: JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ApartmentComplex',
    name: 'Era Residence Estepona',
    description: t('meta_description'),
    url: `https://era-residence.com/${locale}`,
    telephone: '+34 900 123 456',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'New Golden Mile',
      addressLocality: 'Estepona',
      addressRegion: 'Málaga',
      postalCode: '29680',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 36.4274,
      longitude: -5.1458,
    },
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
    containsPlace: [
      {
        '@type': 'Apartment',
        name: t('slide_1_title'),
        description: t('slide_1_desc'),
        numberOfRooms: 3,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: 202,
          unitCode: 'MTK',
        },
      },
      {
        '@type': 'Apartment',
        name: t('slide_2_title'),
        description: t('slide_2_desc'),
        numberOfRooms: 3,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: 243,
          unitCode: 'MTK',
        },
      },
      {
        '@type': 'Apartment',
        name: t('slide_3_title'),
        description: t('slide_3_desc'),
        numberOfRooms: 4,
        floorSize: {
          '@type': 'QuantitativeValue',
          value: 300,
          unitCode: 'MTK',
        },
      },
    ],
  };

  return (
    <SmoothScroll>
      <ScrollManager />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollIndicator />

      {/*
        Semantic HTML Fix: Wrap all primary page content in <main> 
        The hero section is now <header> within the page 
      */}
      <main>
        <header className="relative h-[250vh] w-full">
          {/* Background is globally fixed to stay behind all sections */}
          <BackgroundAnimation />

          {/* Sticky UI Container - Acts like viewport for parallax elements */}
          <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
            <HotspotLayer />
          </div>

          {/* Fixed Top Header */}
          <Header />

          {/* Scrolling Content - Absolute positioned relative to header so it scrolls up naturally */}
          <div className="absolute top-0 left-0 w-full">
            <TypographyOverlay />
          </div>
        </header>

        {/* Second Section: Three Reasons to Choose Era */}
        <SecondSection />

        {/* Third Section: Luxury Pool and Quote */}
        <ThirdSection />

        {/* Fourth Section: Horizontal Scroll */}
        <FourthSection />

        {/* Fifth Section: Fake Clouds Marquee */}
        <FifthSection />

        {/* Sixth Section: Slider and Text */}
        <SixthSection />

        {/* Seventh Section: Gated Community / Pool */}
        <SeventhSection />

        {/* Eighth Section: The Space To Live In */}
        <EighthSection />

        {/* Architecture Split Section */}
        <ArchitectureSplit />

        {/* Ninth Section: Developer & Sales Info */}
        <NinthSection />

        {/* Tenth Section: Perfect Sea Views Parallax */}
        <TenthSection />
      </main>

      {/* Footer should semantically live outside of <main> */}
      <Footer />
    </SmoothScroll>
  );
}
