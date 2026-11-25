import type { Metadata, Viewport } from 'next';
import { Figtree } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { routing } from '@/i18n/routing';
import { SITE_URL } from '@/lib/site-url';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: 'Qualysyn | Servicios para instituciones de salud',
  applicationName: 'Qualysyn',
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: {
    siteName: 'Qualysyn',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1280,
        height: 720,
        alt: 'Qualysyn — Servicios para instituciones de salud',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: '/og-image.png',
        alt: 'Qualysyn — Servicios para instituciones de salud',
      },
    ],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#0a0a0a' };

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<'/[locale]'>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <html
      lang={locale === 'es' ? 'es-CL' : locale}
      className={cn('h-full', 'antialiased', figtree.variable, 'font-sans')}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Next.js recommends this for JSON-LD; '<' is escaped below.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Qualysyn',
              url: SITE_URL.toString(),
              email: 'contacto@qualysyn.cl',
              telephone: '+56979644747',
              sameAs: [
                'https://www.instagram.com/qualysyn/',
                'https://www.linkedin.com/company/qual-syn/',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Providencia, Santiago',
                addressCountry: 'CL',
              },
            }).replace(/</g, '\\u003c'),
          }}
        />
        <NextIntlClientProvider>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
