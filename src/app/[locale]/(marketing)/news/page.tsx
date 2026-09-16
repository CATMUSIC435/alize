import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { NewsHero } from '@/components/news/NewsHero';
import { NewsList } from '@/components/news/NewsList';
import { NEWS_ARTICLES } from '@/data/news';

type NewsPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: NewsPageProps): Promise<Metadata> {
  const { locale } = await props.params;

  return {
    title: 'Tin tức & Bản tin | Alizé Residence Đà Nẵng',
    description:
      'Cập nhật tin tức mới nhất, tiến độ xây dựng và câu chuyện phong cách sống bên bờ biển Mỹ Khê tại Alizé Residence.',
    openGraph: {
      title: 'Tin tức & Bản tin | Alizé Residence Đà Nẵng',
      description:
        'Cập nhật tin tức mới nhất, tiến độ xây dựng và câu chuyện phong cách sống bên bờ biển Mỹ Khê tại Alizé Residence.',
      url: `https://alize-residence.com/${locale}/news`,
      type: 'website',
      images: [
        {
          url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
          width: 1200,
          height: 630,
          alt: 'Alizé Residence News & Editorial',
        },
      ],
    },
  };
}

export default async function NewsPage(props: NewsPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  const featuredArticle = NEWS_ARTICLES.find((a) => a.featured) ?? NEWS_ARTICLES[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Tin tức & Bản tin - Alizé Residence Đà Nẵng',
    description:
      'Cập nhật tin tức mới nhất, tiến độ xây dựng và câu chuyện phong cách sống bên bờ biển Mỹ Khê tại Alizé Residence.',
    url: `https://alize-residence.com/${locale}/news`,
    hasPart: NEWS_ARTICLES.map((article) => ({
      '@type': 'NewsArticle',
      headline: article.title,
      description: article.excerpt,
      image: article.coverImage,
      datePublished: article.date,
      url: `https://alize-residence.com/${locale}/news/${article.slug}`,
      author: {
        '@type': 'Person',
        name: article.author.name,
      },
    })),
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen w-full bg-[#F4F3ED]">
        {/* Fixed Top Header (shared in dark theme for light background) */}
        <Header alwaysDark={true} />

        {/* Hero Section with Editorial Headline */}
        <NewsHero featuredArticle={featuredArticle} />

        {/* Filter Tabs and Articles Grid */}
        <NewsList articles={NEWS_ARTICLES} />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
