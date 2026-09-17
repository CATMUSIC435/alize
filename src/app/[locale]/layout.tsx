import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl } from '@/utils/Helpers';
import '@/styles/global.css';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = getBaseUrl();
  const ogLocale = locale === 'vi' ? 'vi_VN' : locale === 'zh' ? 'zh_CN' : `${locale}_${locale.toUpperCase()}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Alizé Residence',
      default: 'Alizé Residence | Căn hộ khách sạn cao cấp mặt biển Mỹ Khê, Đà Nẵng',
    },
    description: 'Khám phá Alizé Residence. Căn hộ khách sạn cao cấp mặt biển Mỹ Khê, Đà Nẵng. Thiết kế bởi AEDAS, phát triển bởi A&T Group.',
    keywords: ['Alizé', 'Alizé Residence', 'căn hộ cao cấp Đà Nẵng', 'khách sạn Mỹ Khê', 'A&T Group', 'AEDAS Da Nang', 'condotel Đà Nẵng'],
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
    openGraph: {
      type: 'website',
      locale: ogLocale,
      siteName: 'Alizé Residence',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence - Căn hộ khách sạn cao cấp mặt biển Mỹ Khê, Đà Nẵng',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
      ],
    },
    icons: [
      {
        rel: 'apple-touch-icon',
        url: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon-16x16.png',
      },
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{props.children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
