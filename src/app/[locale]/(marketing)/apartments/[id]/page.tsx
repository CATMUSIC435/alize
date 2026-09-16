import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ApartmentDetail } from '@/components/apartments/ApartmentDetail';
import { ApartmentSidebar } from '@/components/apartments/ApartmentSidebar';
import { SimilarApartments } from '@/components/apartments/SimilarApartments';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SeventhSection } from '@/components/landing/SeventhSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { APARTMENTS_DATA } from '@/data/apartments';

import { routing } from '@/libs/I18nRouting';

type ApartmentDetailPageProps = {
  params: Promise<{ locale: string; id: string }>;
};

export function generateStaticParams() {
  return APARTMENTS_DATA.map((apt) => ({
    id: apt.id,
  }));
}

export async function generateMetadata(props: ApartmentDetailPageProps) {
  const { locale, id } = await props.params;
  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    return {};
  }

  const title = `Căn Hộ No. ${apartment.number} (${apartment.area}m²) | Alizé Residence Đà Nẵng`;
  const description = apartment.description ?? `Căn hộ cao cấp No. ${apartment.number} gồm ${apartment.bedrooms} phòng ngủ, diện tích ${apartment.area}m² tại dự án Alizé Residence, bờ biển Mỹ Khê Đà Nẵng.`;
  const canonicalUrl = `https://alize-residence.com/${locale}/apartments/${id}`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `https://alize-residence.com/${loc}/apartments/${id}`]),
  );

  return {
    title,
    description,
    keywords: [
      `Căn hộ ${apartment.number}`,
      `Apartment ${apartment.number} Alizé`,
      `Alizé Residence ${apartment.typology}`,
      'Căn hộ mặt biển Mỹ Khê',
      'Đà Nẵng luxury apartment',
      'Dự án Alizé Đà Nẵng',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `https://alize-residence.com/en/apartments/${id}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: locale === 'vi' ? 'vi_VN' : locale === 'zh' ? 'zh_CN' : `${locale}_${locale.toUpperCase()}`,
      type: 'article',
      images: [
        {
          url: apartment.image,
          width: 1200,
          height: 630,
          alt: `Căn hộ No. ${apartment.number} - Alizé Residence Đà Nẵng`,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [apartment.image],
    },
  };
}

export default async function ApartmentDetailPage(props: ApartmentDetailPageProps) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    notFound();
  }

  const baseUrl = 'https://alize-residence.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: `Căn hộ No. ${apartment.number} - Alizé Residence Đà Nẵng`,
    description: apartment.description,
    url: `${baseUrl}/${locale}/apartments/${id}`,
    numberOfRooms: apartment.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: apartment.area,
      unitCode: 'MTK',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Đường Võ Nguyên Giáp, Phường Phước Mỹ',
      addressLocality: 'Sơn Trà',
      addressRegion: 'Đà Nẵng',
      postalCode: '550000',
      addressCountry: 'VN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.0617,
      longitude: 108.2435,
    },
    containedInPlace: {
      '@type': 'ApartmentComplex',
      name: 'Alizé Residence Đà Nẵng',
      url: baseUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Trang chủ',
          item: `${baseUrl}/${locale}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Căn hộ',
          item: `${baseUrl}/${locale}/apartments`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `No. ${apartment.number}`,
          item: `${baseUrl}/${locale}/apartments/${id}`,
        },
      ],
    },
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Terrace',
        value: apartment.terrace ? 'Yes' : 'No',
      },
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Garden',
        value: apartment.garden ? 'Yes' : 'No',
      },
    ],
    image: apartment.image,
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header alwaysDark={true} />
      <ApartmentSidebar apartmentId={apartment.id} />
      <ApartmentDetail data={apartment} />
      <SeventhSection />
      <SimilarApartments currentId={apartment.id} />
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
