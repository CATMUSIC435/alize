import React from 'react';

type AioSchemaProps = {
  type: 'WebPage' | 'CollectionPage' | 'ApartmentComplex' | 'RealEstateListing' | 'Organization';
  name: string;
  description: string;
  url: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  additionalData?: Record<string, any>;
};

/**
 * A generalized helper component to generate JSON-LD schema (AIO) for any page.
 */
export function AioSchema({ type, name, description, url, additionalData = {} }: AioSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    ...additionalData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
