import { AssessmentForm } from '@/components/assessment/assessment-form';
import { ContactOptions } from '@/components/assessment/contact-options';
import { getPageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/assessment'>) {
  const { locale } = await params;
  return getPageMetadata(locale, 'assessment');
}

export default function AssessmentPage() {
  return (
    <main className="flex-1">
      <AssessmentForm />
      <ContactOptions />
    </main>
  );
}
