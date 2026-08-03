import { setRequestLocale } from 'next-intl/server';
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
import { SecondSection } from '@/components/landing/SecondSection';
import { SeventhSection } from '@/components/landing/SeventhSection';
import { SixthSection } from '@/components/landing/SixthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { ThirdSection } from '@/components/landing/ThirdSection';
import { TypographyOverlay } from '@/components/landing/TypographyOverlay';

export default async function EraResidencePage(props: { params: Promise<{ locale: string }> }) {
  // Required by next-intl for SSR routing
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <SmoothScroll>
      <ScrollIndicator />
      <main className="relative h-[250vh] w-full">
        {/* Background is globally fixed to stay behind all sections */}
        <BackgroundAnimation />

        {/* Sticky UI Container - Acts like viewport for parallax elements */}
        <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
          <HotspotLayer />
        </div>

        {/* Fixed Top Header (Usually stays on all sections, or can be inside sticky if wanted. We keep it fixed globally) */}
        <Header />

        {/* Scrolling Content - Absolute positioned relative to main so it scrolls up naturally */}
        <div className="absolute top-0 left-0 w-full">
          <TypographyOverlay />
        </div>
      </main>

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

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
