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
  const { id } = await props.params;
  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    return {};
  }

  return {
    title: `NO. ${apartment.number} - ERA RESIDENCE`,
    description: apartment.description,
  };
}

export default async function ApartmentDetailPage(props: Props) {
  const { locale, id } = await props.params;
  setRequestLocale(locale);

  const apartment = APARTMENTS_DATA.find((apt) => apt.id === id);

  if (!apartment) {
    notFound();
  }

  return (
    <SmoothScroll>
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
