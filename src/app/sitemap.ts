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
    { path: '/floorplans', priority: 0.9, changeFrequency: 'daily' },
    { path: '/gallery', priority: 0.85, changeFrequency: 'daily' },
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

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${baseUrl}${getI18nPath(route.path, locale)}`,
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: locale === routing.defaultLocale ? route.priority : Number((route.priority * 0.95).toFixed(2)),
      alternates: createAlternates(route.path),
    })),
  );

  // Apartment detail entries for all locales
  const apartmentEntries: MetadataRoute.Sitemap = APARTMENTS_DATA.flatMap((apt) => {
    const routePath = `/apartments/${apt.id}`;
    return routing.locales.map((locale) => ({
      url: `${baseUrl}${getI18nPath(routePath, locale)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: locale === routing.defaultLocale ? 0.8 : 0.75,
      alternates: createAlternates(routePath),
    }));
  });

  // News article entries for all locales
  const newsEntries: MetadataRoute.Sitemap = NEWS_ARTICLES.flatMap((article) => {
    const routePath = `/news/${article.slug}`;
    return routing.locales.map((locale) => ({
      url: `${baseUrl}${getI18nPath(routePath, locale)}`,
      lastModified: new Date(article.modifiedDate),
      changeFrequency: 'monthly' as const,
      priority: locale === routing.defaultLocale ? 0.8 : 0.75,
      alternates: createAlternates(routePath),
    }));
  });

  return [...staticEntries, ...apartmentEntries, ...newsEntries];
}
