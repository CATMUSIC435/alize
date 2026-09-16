import { redirect } from 'next/navigation';

export default async function ApartmentDetailRedirectPage(props: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await props.params;
  redirect(`/${locale}/apartments/${id}`);
}
