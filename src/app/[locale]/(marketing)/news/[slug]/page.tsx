import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { Footer } from '@/components/landing/Footer';
import { Header } from '@/components/landing/Header';
import { SmoothScroll } from '@/components/landing/SmoothScroll';
import { NewsDetail } from '@/components/news/NewsDetail';
import { RelatedNews } from '@/components/news/RelatedNews';
import { NEWS_ARTICLES } from '@/data/news';

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
  const article = NEWS_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    return {
      title: 'Không tìm thấy bài viết | Alizé Residence',
    };
  }

  return {
    title: `${article.title} | Alizé Residence Đà Nẵng`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://alize-residence.com/${locale}/news/${article.slug}`,
      type: 'article',
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.coverImage],
    },
  };
}

export default async function NewsDetailPage(props: NewsDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  const article = NEWS_ARTICLES.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.excerpt,
    image: [article.coverImage],
    datePublished: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alizé Residence',
      logo: {
        '@type': 'ImageObject',
        url: 'https://alize-residence.com/logo-alize.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://alize-residence.com/${locale}/news/${article.slug}`,
    },
  };

  return (
    <SmoothScroll>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative min-h-screen w-full bg-[#F4F3ED]">
        <Header alwaysDark={true} />
        <NewsDetail article={article} />
        <RelatedNews currentSlug={article.slug} articles={NEWS_ARTICLES} />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
