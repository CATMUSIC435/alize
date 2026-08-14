import { setRequestLocale } from 'next-intl/server';
import { CursorTrail } from '@/components/landing/CursorTrail';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <CursorTrail />
      {props.children}
    </>
  );
}
