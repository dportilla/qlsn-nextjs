'use client';

import { GlobeIcon } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const languageNames = {
  es: 'Español',
  en: 'English',
  ja: '日本語',
} as const;

export function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('nav');

  return (
    <nav
      aria-label={t('language')}
      className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
    >
      <span className="flex items-center gap-2 text-sm text-neutral-300">
        <GlobeIcon aria-hidden="true" className="size-4" />
        {t('language')}
      </span>
      <div className="flex flex-wrap justify-center gap-1 rounded-2xl border border-neutral-700 bg-neutral-900 p-1">
        {routing.locales.map((item) => (
          <Link
            key={item}
            href={pathname}
            locale={item}
            lang={item}
            aria-current={locale === item ? 'true' : undefined}
            className={
              locale === item
                ? 'rounded-xl bg-white px-3 py-2 text-sm font-semibold text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                : 'rounded-xl px-3 py-2 text-sm text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
            }
          >
            {languageNames[item]}
          </Link>
        ))}
      </div>
    </nav>
  );
}
