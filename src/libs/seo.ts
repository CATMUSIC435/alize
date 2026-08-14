import type { Metadata } from 'next';

type GenerateMetadataProps = {
  title: string;
  description: string;
  locale: string;
  path?: string; // e.g. "/about"
  image?: string;
  imageAlt?: string;
};

/**
 * A generalized helper to generate SEO metadata for any page.
 * Returns standard Metadata, OpenGraph, and Twitter cards.
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  image = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop',
  imageAlt = 'Era Residence Estepona',
}: GenerateMetadataProps): Metadata {
  // Base URL (In production, replace with process.env.NEXT_PUBLIC_APP_URL)
  const baseUrl = 'https://era-residence.com';
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Era Residence',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
