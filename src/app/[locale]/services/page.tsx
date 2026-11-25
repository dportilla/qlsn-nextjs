import { ContactCta } from '@/components/home/contact-cta';
import { HowWeWork } from '@/components/home/how-we-work';
import { PageEntrance } from '@/components/page-entrance';
import { ServicesHero } from '@/components/services/services-hero';
import { ServicesList } from '@/components/services/services-list';
import { getPageMetadata } from '@/lib/metadata';
import { SITE_URL } from '@/lib/site-url';

export async function generateMetadata({
  params,
}: PageProps<'/[locale]/services'>) {
  const { locale } = await params;
  return getPageMetadata(locale, 'services');
}

export default function ServicesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicios para instalaciones y equipos médicos',
    serviceType: [
      'Adecuación de salas médicas',
      'Controles de calidad de equipos de imagenología',
      'Protección radiológica',
      'Mantenimiento de equipos médicos',
    ],
    provider: {
      '@type': 'Organization',
      name: 'Qualysyn',
      url: SITE_URL.toString(),
    },
    areaServed: { '@type': 'Country', name: 'Chile' },
    url: new URL('/es/servicios', SITE_URL).toString(),
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Next.js recommends this for JSON-LD; '<' is escaped below.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ServicesHero />
      <PageEntrance />
      <ServicesList />
      <HowWeWork />
      <ContactCta />
    </main>
  );
}
