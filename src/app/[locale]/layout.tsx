import type { Metadata, Viewport } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl } from '@/utils/Helpers';
import { getLocalizedKeywords, getOpenGraphLocales } from '@/utils/Seo';
import { inter, playfair } from '@/utils/Fonts';
import '@/styles/global.css';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const baseUrl = getBaseUrl();
  const t = await getTranslations({ locale, namespace: 'RootLayout' });
  const og = getOpenGraphLocales(locale);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: t('title_template'),
      default: t('default_title'),
    },
    description: t('default_description'),
    keywords: getLocalizedKeywords('home', locale),
    formatDetection: {
      telephone: false,
      date: false,
      address: false,
      email: false,
    },
    appleWebApp: {
      capable: true,
      title: 'Alizé Residence',
      statusBarStyle: 'default',
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
    openGraph: {
      type: 'website',
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      siteName: 'Alizé Residence',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: t('default_title'),
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
  themeColor: '#151926',
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
    <html lang={locale} className="overflow-x-clip">
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={`relative w-full max-w-[100vw] bg-textured-sand antialiased ${inter.variable} ${playfair.variable}`}>
        <NextIntlClientProvider>{props.children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
