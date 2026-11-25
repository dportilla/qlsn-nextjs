import { AboutCommitments } from '@/components/about/commitments';
import { AboutHero } from '@/components/about/hero';
import { Mission } from '@/components/about/mission';
import { AboutStory } from '@/components/about/story';
import { ContactCta } from '@/components/home/contact-cta';
import { PageEntrance } from '@/components/page-entrance';
import { getPageMetadata } from '@/lib/metadata';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/about'>) {
  const { locale } = await params;
  return getPageMetadata(locale, 'about');
}

export default function AboutPage() {
  return (
    <main className="flex-1">
      <AboutHero />
      <PageEntrance />
      <Mission />
      <AboutStory />
      <AboutCommitments />
      <ContactCta />
    </main>
  );
}
