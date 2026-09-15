import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';

import { BackgroundAnimation } from '@/components/landing/BackgroundAnimation';
import { Header } from '@/components/landing/Header';
import { HotspotLayer } from '@/components/landing/HotspotLayer';
import { ScrollIndicator } from '@/components/landing/ScrollIndicator';
import { ScrollManager } from '@/components/landing/ScrollManager';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TypographyOverlay } from '@/components/landing/TypographyOverlay';

// Dynamically import below-the-fold heavy Client Components
const ArchitectureSplit = dynamic(() => import('@/components/landing/ArchitectureSplit').then((m) => m.ArchitectureSplit));
const SecondSection = dynamic(() => import('@/components/landing/SecondSection').then((m) => m.SecondSection));
const ThirdSection = dynamic(() => import('@/components/landing/ThirdSection').then((m) => m.ThirdSection));
const FourthSection = dynamic(() => import('@/components/landing/FourthSection').then((m) => m.FourthSection));
const FifthSection = dynamic(() => import('@/components/landing/FifthSection').then((m) => m.FifthSection));
const SixthSection = dynamic(() => import('@/components/landing/SixthSection').then((m) => m.SixthSection));
const SeventhSection = dynamic(() => import('@/components/landing/SeventhSection').then((m) => m.SeventhSection));
const EighthSection = dynamic(() => import('@/components/landing/EighthSection').then((m) => m.EighthSection));
const NinthSection = dynamic(() => import('@/components/landing/NinthSection').then((m) => m.NinthSection));
const TenthSection = dynamic(() => import('@/components/landing/TenthSection').then((m) => m.TenthSection));
const Footer = dynamic(() => import('@/components/landing/Footer').then((m) => m.Footer));

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
      url: `https://alize-residence.com/${locale}`,
      siteName: 'Alizé Residence',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence - Luxury Living in Estepona',
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
    name: 'Alizé Residence Estepona',
    description: t('meta_description'),
    url: `https://alize-residence.com/${locale}`,
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
