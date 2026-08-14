import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/libs/seo';
import { AioSchema } from '@/components/AioSchema';
import sentryLogo from '@/public/assets/images/sentry-dark.png';

type PortfolioPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Portfolio',
  });

  return generatePageMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    locale,
    path: '/portfolio',
  });
}

export default async function Portfolio(props: PortfolioPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({
    locale,
    namespace: 'Portfolio',
  });

  return (
    <>
      <AioSchema 
        type="CollectionPage" 
        name={t('meta_title')} 
        description={t('meta_description')} 
        url={`https://era-residence.com/${locale}/portfolio`} 
      />

      <p>{t('presentation')}</p>

      <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Link
            className="hover:text-blue-700"
            key={index}
            href={`/portfolio/${index + 1}`}
          >
            {t('portfolio_name', { name: index + 1 })}
          </Link>
        ))}
      </div>

      <div className="mt-5 text-center text-sm">
        {`${t('error_reporting_powered_by')} `}
        <a
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
          href="https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo"
        >
          Sentry
        </a>
      </div>

      <a href="https://sentry.io/for/nextjs/?utm_source=github&utm_medium=paid-community&utm_campaign=general-fy25q1-nextjs&utm_content=github-banner-nextjsboilerplate-logo">
        <Image className="mx-auto mt-2" src={sentryLogo} alt="Sentry" width={130} />
      </a>
    </>
  );
}
