import { useTranslations } from 'next-intl';
import { ContactCta } from '@/components/home/contact-cta';
import { HealthcarePartner } from '@/components/home/healthcare-partner';
import { Hero } from '@/components/home/hero';
import { HomeServices } from '@/components/home/home-services';
import { HowWeWork } from '@/components/home/how-we-work';
import { ServiceMap } from '@/components/home/service-map';
import { PageEntrance } from '@/components/page-entrance';
import { LogoMarquee } from '@/components/ui/logo-marquee';
import { getPageMetadata } from '@/lib/metadata';

const partners = [
  { src: '/partners/corfo_logo.avif', name: 'Corfo' },
  { src: '/partners/quart_logo.svg', name: 'QUART' },
  { src: '/partners/uddv_logo.avif', name: 'UDD Ventures' },
];

export async function generateMetadata({ params }: PageProps<'/[locale]'>) {
  const { locale } = await params;
  return getPageMetadata(locale, 'home');
}

export default function Home() {
  const t = useTranslations();
  return (
    <main className="flex-1">
      <PageEntrance />
      <Hero />
      <LogoMarquee logos={partners} label={t('partnersLabel')} />
      <HomeServices />
      <HealthcarePartner />
      <ServiceMap />
      <HowWeWork />
      <ContactCta />
    </main>
  );
}
