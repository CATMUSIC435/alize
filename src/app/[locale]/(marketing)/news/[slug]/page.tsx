import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { NewsDetail } from '@/components/news/NewsDetail';
import { NewsSidebar } from '@/components/news/NewsSidebar';
import { RelatedNews } from '@/components/news/RelatedNews';
import { getLocalizedArticle, getLocalizedArticles, NEWS_ARTICLES } from '@/data/news';
import { getBaseUrl, getI18nPath } from '@/utils/Helpers';
import { getI18nAlternates, getOpenGraphLocales } from '@/utils/Seo';

type NewsDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return NEWS_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata(props: NewsDetailPageProps): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const baseArticle = NEWS_ARTICLES.find((item) => item.slug === slug);

  if (!baseArticle) {
    const tNews = await getTranslations({ locale, namespace: 'NewsPage' });
    return {
      title: tNews('not_found_title'),
    };
  }

  const article = getLocalizedArticle(baseArticle, locale);
  const title = `${article.title} | Alizé Residence Đà Nẵng`;
  const description = article.excerpt;
  const alternates = getI18nAlternates(`/news/${article.slug}`, locale);
  const og = getOpenGraphLocales(locale);

  const extraKeywords = locale === 'vi'
    ? ['Alizé Residence', 'Đà Nẵng', 'Mỹ Khê', 'Căn hộ biển', 'Branded Residences', 'Kiến trúc Alizé']
    : locale === 'zh'
      ? ['Alizé Residence', '岘港', '美溪海滩', '一线海景豪宅', '越南品牌公寓', 'Alizé 建筑设计']
      : ['Alizé Residence', 'Da Nang', 'My Khe Beach', 'Beachfront Condos', 'Branded Residences', 'Alizé Architecture'];

  return {
    title,
    description,
    keywords: [...article.tags, ...extraKeywords],
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: og.locale,
      alternateLocale: og.alternateLocale,
      type: 'article',
      publishedTime: article.isoDate,
      modifiedTime: article.modifiedDate,
      section: article.categoryLabel,
      authors: [article.author.name],
      tags: article.tags,
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [article.coverImage],
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
  };
}

export default async function NewsDetailPage(props: NewsDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const baseArticle = NEWS_ARTICLES.find((item) => item.slug === slug);

  if (!baseArticle) {
    notFound();
  }

  const tNews = await getTranslations({ locale, namespace: 'NewsPage' });
  const article = getLocalizedArticle(baseArticle, locale);
  const allArticles = getLocalizedArticles(locale);

  const baseUrl = getBaseUrl();
  const routePath = `/news/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'NewsArticle',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#article`,
        'isPartOf': {
          '@type': 'WebPage',
          '@id': `${baseUrl}${getI18nPath(routePath, locale)}`,
          'url': `${baseUrl}${getI18nPath(routePath, locale)}`,
          'name': article.title,
          'inLanguage': locale,
        },
        'headline': article.title,
        'description': article.excerpt,
        'image': [article.coverImage],
        'datePublished': article.isoDate,
        'dateModified': article.modifiedDate,
        'inLanguage': locale,
        'articleSection': article.categoryLabel,
        'keywords': article.tags.join(', '),
        'mainEntityOfPage': `${baseUrl}${getI18nPath(routePath, locale)}`,
        'author': {
          '@type': 'Person',
          'name': article.author.name,
          'jobTitle': article.author.role,
          'worksFor': {
            '@type': 'Organization',
            'name': 'Alizé Residence & DXMD Vietnam',
          },
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'Alizé Residence',
          'url': baseUrl,
          'logo': {
            '@type': 'ImageObject',
            'url': `${baseUrl}/logo-alize.png`,
            'width': 200,
            'height': 60,
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${baseUrl}${getI18nPath(routePath, locale)}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': tNews('breadcrumb_home'),
            'item': `${baseUrl}${getI18nPath('', locale)}`,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': tNews('breadcrumb_journal'),
            'item': `${baseUrl}${getI18nPath('/news', locale)}`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': article.title,
            'item': `${baseUrl}${getI18nPath(routePath, locale)}`,
          },
        ],
      },
    ],
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-textured-sand relative min-h-screen w-full">
        {/* Fixed Top Header */}
        <Header alwaysDark={true} />

        {/* Fixed Left Vertical Sidebar */}
        <NewsSidebar category={article.categoryLabel} articleTitle={article.title} />

        {/* 2-Column Luxury Editorial Reader */}
        <NewsDetail article={article} />

        {/* Arch Portal Related News */}
        <RelatedNews currentSlug={article.slug} articles={allArticles} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
