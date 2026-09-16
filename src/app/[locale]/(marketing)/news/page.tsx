import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { NinthSection } from '@/components/landing/NinthSection';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { TenthSection } from '@/components/landing/TenthSection';
import { NewsHero } from '@/components/news/NewsHero';
import { NewsList } from '@/components/news/NewsList';
import { NewsSidebar } from '@/components/news/NewsSidebar';
import { NEWS_ARTICLES } from '@/data/news';
import { routing } from '@/libs/I18nRouting';

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: NewsPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  const title = 'Tin tức & Bản tin | Alizé Residence Đà Nẵng';
  const description =
    'Cập nhật tiến độ xây dựng mới nhất, triết lý kiến trúc Địa Trung Hải và nhịp sống bên bờ biển Mỹ Khê tại Alizé Residence Đà Nẵng.';
  const canonicalUrl = `https://alize-residence.com/${locale}/news`;

  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, `https://alize-residence.com/${loc}/news`]),
  );

  return {
    title,
    description,
    keywords: [
      'Alizé Residence',
      'Tin tức Alizé',
      'Tiến độ Alizé Residence',
      'Căn hộ biển Mỹ Khê',
      'Bất động sản Đà Nẵng',
      'Branded Residences Da Nang',
      'A&T Group Alizé',
      'Kiến trúc Địa Trung Hải Đà Nẵng',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Alizé Residence Đà Nẵng',
      locale: locale === 'vi' ? 'vi_VN' : locale === 'zh' ? 'zh_CN' : `${locale}_${locale.toUpperCase()}`,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence Journal & Editorial',
          type: 'image/jpeg',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200'],
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

export default async function NewsPage(props: NewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const baseUrl = 'https://alize-residence.com';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        'url': baseUrl,
        'name': 'Alizé Residence Đà Nẵng',
        'description': 'Tổ hợp căn hộ khách sạn và dinh thự biển đẳng cấp quốc tế tại bờ biển Mỹ Khê, Đà Nẵng.',
        'inLanguage': locale,
      },
      {
        '@type': 'CollectionPage',
        '@id': `${baseUrl}/${locale}/news#webpage`,
        'url': `${baseUrl}/${locale}/news`,
        'name': 'Tin tức & Bản tin - Alizé Residence Đà Nẵng',
        'isPartOf': { '@id': `${baseUrl}/#website` },
        'description':
          'Cập nhật tiến độ xây dựng mới nhất, triết lý kiến trúc Địa Trung Hải và nhịp sống bên bờ biển Mỹ Khê tại Alizé Residence Đà Nẵng.',
        'breadcrumb': {
          '@type': 'BreadcrumbList',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Trang chủ',
              'item': `${baseUrl}/${locale}`,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Tin tức',
              'item': `${baseUrl}/${locale}/news`,
            },
          ],
        },
        'hasPart': NEWS_ARTICLES.map((article) => ({
          '@type': 'NewsArticle',
          'headline': article.title,
          'description': article.excerpt,
          'image': [article.coverImage],
          'datePublished': article.isoDate,
          'dateModified': article.modifiedDate,
          'url': `${baseUrl}/${locale}/news/${article.slug}`,
          'articleSection': article.categoryLabel,
          'inLanguage': locale,
          'author': {
            '@type': 'Person',
            'name': article.author.name,
            'jobTitle': article.author.role,
          },
          'publisher': {
            '@type': 'Organization',
            'name': 'Alizé Residence',
            'url': baseUrl,
            'logo': {
              '@type': 'ImageObject',
              'url': `${baseUrl}/logo-alize.png`,
            },
          },
        })),
      },
    ],
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen w-full bg-[#F4F3ED]">
        {/* Fixed Top Header */}
        <Header alwaysDark={true} />

        {/* Fixed Left Vertical Sidebar */}
        <NewsSidebar />

        {/* Hero Section with bougainvillea video and giant typography */}
        <NewsHero totalArticles={NEWS_ARTICLES.length} />

        {/* Dual-layer chamfered Filter Tabs & Articles Grid */}
        <NewsList articles={NEWS_ARTICLES} />
      </main>

      {/* Signature Alizé bottom sections */}
      <NinthSection />
      <TenthSection />
      <Footer />
    </SmoothScroll>
  );
}
