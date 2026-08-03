import { setRequestLocale } from 'next-intl/server';
import { ApartmentHero } from '@/components/apartments/ApartmentHero';
import { ApartmentList } from '@/components/apartments/ApartmentList';
import { ApartmentSidebar } from '@/components/apartments/ApartmentSidebar';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';

export default async function ApartmentsPage(props: { params: Promise<{ locale: string }> }) {
  // Required by next-intl for SSR routing
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SmoothScroll>
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
