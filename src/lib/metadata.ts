import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site-url';

const pagePaths = {
  home: '/',
  about: '/about',
  services: '/services',
  assessment: '/assessment',
} as const;

const languageTags = { es: 'es-CL', en: 'en', ja: 'ja' } as const;

function pageUrl(
  locale: (typeof routing.locales)[number],
  page: keyof typeof pagePaths,
) {
  return new URL(
    getPathname({ locale, href: pagePaths[page] }),
    SITE_URL,
  ).toString();
}

export async function getPageMetadata(
  locale: string,
  page: keyof typeof pagePaths,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const title = t(`${page}.title`);
  const description = t(`${page}.description`);
  const url = pageUrl(locale, page);
  const languages = Object.fromEntries(
    routing.locales.map((language) => [
      languageTags[language],
      pageUrl(language, page),
    ]),
  );
  if (page === 'home') languages['x-default'] = SITE_URL.toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'Qualysyn',
      locale: locale === 'es' ? 'es_CL' : locale,
      type: 'website',
      images: [
        {
          url: '/og-image.jpg',
          width: 1280,
          height: 720,
          alt: 'Qualysyn — Servicios para instituciones de salud',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [
        {
          url: '/og-image.jpg',
          alt: 'Qualysyn — Servicios para instituciones de salud',
        },
      ],
    },
  };
}
