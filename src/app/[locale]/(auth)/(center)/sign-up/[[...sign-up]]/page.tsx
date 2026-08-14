import { SignUp } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getI18nPath } from '@/utils/Helpers';

type SignUpPageProps = {
  params: Promise<{ locale: string }>;
};

import { generatePageMetadata } from '@/libs/seo';

export async function generateMetadata(props: SignUpPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return generatePageMetadata({
    title: t('meta_title'),
    description: t('meta_description'),
    locale,
    path: '/sign-up',
  });
}

export default async function SignUpPage(props: SignUpPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return <SignUp path={getI18nPath('/sign-up', locale)} />;
}
