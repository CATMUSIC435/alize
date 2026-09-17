import { getTranslations, setRequestLocale } from 'next-intl/server';
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
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getOpenGraphLocales, LOCAL_BUSINESS_CONFIG } from '@/utils/Seo';

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

  const t = await getTranslations({ locale, namespace: 'ApartmentDetailPage' });
  const title = t('meta_title', { number: apartment.number, area: apartment.area });
  const description = t('meta_description', {
    number: apartment.number,
    bedrooms: apartment.bedrooms,
    area: apartment.area,
  });
  const alternates = getI18nAlternates(`/apartments/${id}`, locale);
  const og = getOpenGraphLocales(locale);

  const keywords = locale === 'vi'
    ? [
        `Căn hộ ${apartment.number}`,
        `Căn hộ Alizé ${apartment.number}`,
        `Căn hộ ${apartment.bedrooms} phòng ngủ Mỹ Khê`,
        'Căn hộ mặt biển Mỹ Khê',
        'Dự án Alizé Đà Nẵng',
      ]
    : locale === 'zh'
      ? [
          `No. ${apartment.number} 公寓`,
          `Alizé Residence ${apartment.number}`,
          `岘港 ${apartment.bedrooms} 居室海景房`,
          '美溪海滩一线海景豪宅',
          '岘港 Alizé 豪华公寓',
        ]
      : [
          `Apartment ${apartment.number}`,
          `Apartment ${apartment.number} Alizé`,
          `${apartment.bedrooms} bedroom beachfront condo Da Nang`,
          'Alizé Residence Da Nang',
          'Luxury My Khe beach apartment',
        ];

  return {
    title,
    description,
    keywords,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      type: 'article',
      images: [
        {
          url: apartment.image,
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

  const t = await getTranslations({ locale, namespace: 'ApartmentDetailPage' });
  const pageTitle = t('meta_title', { number: apartment.number, area: apartment.area });
  const pageDescription = t('meta_description', {
    number: apartment.number,
    bedrooms: apartment.bedrooms,
    area: apartment.area,
  });

  const baseUrl = getBaseUrl();
  const routePath = `/apartments/${id}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    inLanguage: locale,
    name: pageTitle,
    description: pageDescription,
    url: `${baseUrl}${getI18nPath(routePath, locale)}`,
    numberOfRooms: apartment.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: apartment.area,
      unitCode: 'MTK',
    },
    address: LOCAL_BUSINESS_CONFIG.address,
    geo: LOCAL_BUSINESS_CONFIG.geo,
    containedInPlace: {
      '@type': 'ApartmentComplex',
      name: LOCAL_BUSINESS_CONFIG.name,
      alternateName: LOCAL_BUSINESS_CONFIG.alternateName,
      url: `${baseUrl}${getI18nPath('', locale)}`,
      hasMap: LOCAL_BUSINESS_CONFIG.hasMap,
      telephone: LOCAL_BUSINESS_CONFIG.telephone,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: t('breadcrumb_home'),
          item: `${baseUrl}${getI18nPath('', locale)}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: t('breadcrumb_apartments'),
          item: `${baseUrl}${getI18nPath('/apartments', locale)}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `No. ${apartment.number}`,
          item: `${baseUrl}${getI18nPath(routePath, locale)}`,
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
