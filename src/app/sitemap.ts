import type { MetadataRoute } from 'next';
import { getPathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site-url';

const pages = [
  { pathname: '/', priority: 1 },
  { pathname: '/about', priority: 0.7 },
  { pathname: '/services', priority: 0.9 },
  { pathname: '/assessment', priority: 0.6 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    pages.map(({ pathname, priority }) => ({
      url: new URL(
        getPathname({ locale, href: pathname }),
        SITE_URL,
      ).toString(),
      changeFrequency: 'monthly' as const,
      priority,
    })),
  );
}
