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
 * Generates SEO metadata for any page.
 * @param props The metadata properties.
 * @returns Standard Next.js Metadata object.
 */
export function generatePageMetadata(props: GenerateMetadataProps): Metadata {
  // Base URL (In production, replace with process.env.NEXT_PUBLIC_APP_URL)
  const baseUrl = 'https://alize-residence.com';
  const path = props.path ?? '';
  const url = `${baseUrl}/${props.locale}${path}`;
  const image =
    props.image ??
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070&auto=format&fit=crop';
  const imageAlt = props.imageAlt ?? 'Alizé Residence Estepona';

  return {
    title: props.title,
    description: props.description,
    openGraph: {
      title: props.title,
      description: props.description,
      url,
      siteName: 'Alizé Residence',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
      locale: props.locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: props.title,
      description: props.description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
  };
}
