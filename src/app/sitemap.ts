import type { MetadataRoute } from 'next';
import { APARTMENTS_DATA } from '@/data/apartments';
import { NEWS_ARTICLES } from '@/data/news';
import { routing } from '@/libs/I18nRouting';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/apartments', priority: 0.9, changeFrequency: 'daily' },
    { path: '/news', priority: 0.85, changeFrequency: 'daily' },
    { path: '/contact', priority: 0.85, changeFrequency: 'weekly' },
  ];

  const createAlternates = (path: string) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${baseUrl}${getI18nPath(path, locale)}`]),
    );

    return {
      languages: {
        ...languages,
        'x-default': `${baseUrl}${getI18nPath(path, routing.defaultLocale)}`,
      },
    };
  };

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${getI18nPath(route.path, routing.defaultLocale)}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: createAlternates(route.path),
  }));

  // Apartment detail entries
  const apartmentEntries: MetadataRoute.Sitemap = APARTMENTS_DATA.map((apt) => {
    const routePath = `/apartments/${apt.id}`;
    return {
      url: `${baseUrl}${getI18nPath(routePath, routing.defaultLocale)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: createAlternates(routePath),
    };
  });

  // News article entries
  const newsEntries: MetadataRoute.Sitemap = NEWS_ARTICLES.map((article) => {
    const routePath = `/news/${article.slug}`;
    return {
      url: `${baseUrl}${getI18nPath(routePath, routing.defaultLocale)}`,
      lastModified: new Date(article.modifiedDate),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: createAlternates(routePath),
    };
  });

  return [...staticEntries, ...apartmentEntries, ...newsEntries];
}
