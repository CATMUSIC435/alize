type AioSchemaProps = {
  type: 'WebPage' | 'CollectionPage' | 'ApartmentComplex' | 'RealEstateListing' | 'Organization';
  name: string;
  description: string;
  url: string;
  additionalData?: Record<string, unknown>;
};

/**
 * Generates JSON-LD schema (AIO) for any page.
 * @param props The component properties.
 * @returns The JSON-LD script element.
 */
export function AioSchema(props: AioSchemaProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': props.type,
    name: props.name,
    description: props.description,
    url: props.url,
    ...props.additionalData,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
