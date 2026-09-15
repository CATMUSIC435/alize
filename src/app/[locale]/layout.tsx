import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import '@/styles/global.css';

export const metadata: Metadata = {
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
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en',
    siteName: 'Alizé Residence',
  },
  twitter: {
    card: 'summary_large_image',
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
