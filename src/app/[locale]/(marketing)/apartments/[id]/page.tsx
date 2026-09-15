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

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

export async function generateMetadata(props: Props) {
  const { locale, id } = await props.params;
  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    return {};
  }

  return {
    title: `NO. ${apartment.number} - ALIZE RESIDENCE`,
    description: apartment.description,
    openGraph: {
      title: `NO. ${apartment.number} - ALIZE RESIDENCE`,
      description: apartment.description,
      url: `https://alize-residence.com/${locale}/apartments/${id}`,
      type: 'article',
      images: [
        {
          url: apartment.image,
          width: 1200,
          height: 630,
          alt: `Apartment ${apartment.number} at Alize Residence`,
        },
      ],
    },
  };
}

export default async function ApartmentDetailPage(props: Props) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: `Apartment ${apartment.number} at Alize Residence`,
    description: apartment.description,
    url: `https://alize-residence.com/${locale}/apartments/${id}`,
    numberOfRooms: apartment.bedrooms,
    floorSize: {
      '@type': 'QuantitativeValue',
      value: apartment.area,
      unitCode: 'MTK',
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
