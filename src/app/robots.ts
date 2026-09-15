import type { MetadataRoute } from 'next';
import { getBaseUrl } from '@/utils/Helpers';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/dashboard',
      },
      {
        userAgent: ['GPTBot', 'CCBot', 'Google-Extended', 'Anthropic-ai'],
        allow: '/',
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap.xml`,
  };
}
