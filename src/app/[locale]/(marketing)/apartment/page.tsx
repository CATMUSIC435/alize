import { redirect } from 'next/navigation';

export default async function ApartmentRedirectPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  redirect(`/${locale}/apartments`);
}
