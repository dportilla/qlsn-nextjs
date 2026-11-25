import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'ja'],
  defaultLocale: 'es',
  localePrefix: 'always',
  localeDetection: true,
  alternateLinks: false,
  pathnames: {
    '/': '/',
    '/about': { es: '/acerca-de', en: '/about', ja: '/about' },
    '/contact': { es: '/contacto', en: '/contact', ja: '/contact' },
    '/services': { es: '/servicios', en: '/services', ja: '/services' },
    '/assessment': { es: '/evaluacion', en: '/assessment', ja: '/assessment' },
  },
});
