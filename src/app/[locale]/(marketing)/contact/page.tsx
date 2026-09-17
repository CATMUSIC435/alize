import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactSidebar } from '@/components/contact/ContactSidebar';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

type ContactPageProps = {
  params: Promise<{ locale: string }>;
};

/**
 * Generate SEO metadata for the Contact page with multilingual alternates.
 */
export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: 'ContactPage' });

  const title = t('meta_title');
  const description = t('meta_description');
  const baseUrl = getBaseUrl();
  const routePath = '/contact';
  const canonicalUrl = `${baseUrl}${getI18nPath(routePath, locale)}`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `${baseUrl}${getI18nPath(routePath, loc)}`]),
  );

  return {
    title,
    description,
    keywords: [
      'Alizé Residence',
      'Liên hệ Alizé Residence',
      'Contact Alizé Residence',
      'Đặt lịch xem nhà mẫu Alizé',
      'Căn hộ biển Mỹ Khê Đà Nẵng',
      'Sales Gallery Alizé Đà Nẵng',
      'Luxury beachfront condo Da Nang',
      'Concierge Alizé Residence',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...languages,
        'x-default': `${baseUrl}${getI18nPath(routePath, routing.defaultLocale)}`,
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
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence Concierge & Sales Gallery',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        'index': true,
        'follow': true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Dedicated Contact & VIP Appointment Page.
 */
export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'ContactPage' });
  const baseUrl = getBaseUrl();
  const routePath = '/contact';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'Alizé Residence Đà Nẵng',
        'description': 'Tổ hợp căn hộ khách sạn và dinh thự biển đẳng cấp quốc tế tại bờ biển Mỹ Khê, Đà Nẵng.',
        'inLanguage': locale,
      },
      {
        '@type': 'ContactPage',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#webpage`,
        'url': `${baseUrl}${getI18nPath(routePath, locale)}`,
        'name': `${t('hero_title')} - Alizé Residence`,
        'isPartOf': { '@id': `${baseUrl}/#website` },
        'description': t('meta_description'),
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': t('breadcrumb_home'),
              'item': `${baseUrl}${getI18nPath('', locale)}`,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': t('breadcrumb_contact'),
              'item': `${baseUrl}${getI18nPath(routePath, locale)}`,
            },
          ],
        },
      },
      {
        '@type': 'RealEstateAgent',
        '@id': `${baseUrl}/#organization`,
        'name': 'Alizé Residence Đà Nẵng',
        'url': baseUrl,
        'logo': `${baseUrl}/apple-touch-icon.png`,
        'image': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
        'telephone': '+84965355355',
        'email': 'contact@alize-residence.com',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': 'Đường Võ Nguyên Giáp, Phường Phước Mỹ',
          'addressLocality': 'Sơn Trà',
          'addressRegion': 'Đà Nẵng',
          'postalCode': '550000',
          'addressCountry': 'VN',
        },
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            'opens': '08:30',
            'closes': '18:30',
          },
        ],
      },
    ],
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-textured-sand relative min-h-screen w-full">
        {/* Fixed Top Navigation */}
        <Header alwaysDark={true} />

        {/* Fixed Left Vertical Sidebar */}
        <ContactSidebar />

        {/* Hero Header Section */}
        <ContactHero />

        {/* Main Content: 2-Column Luxury Layout */}
        <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-20 md:px-12 md:pb-28">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-14">
            <div className="w-full lg:w-[58%] xl:w-[60%]">
              <ContactForm />
            </div>
            <div className="w-full lg:w-[42%] xl:w-[40%]">
              <ContactInfo />
            </div>
          </div>
        </section>
      </main>

      {/* Signature Pre-Footer & Footer */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
