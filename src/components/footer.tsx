import { HugeiconsIcon } from '@hugeicons/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSelector } from '@/components/language-selector';
import { CONTACT_INFO, SOCIAL_LINKS } from '@/constants/contact';
import { getYear } from '@/constants/get-year';
import { NAV_LINKS } from '@/constants/navigation';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  return (
    <footer className="rounded-t-3xl bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 sm:pt-20 lg:pt-24">
        <div className="grid gap-20 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Link href="/" aria-label={nav('homeLabel')}>
              <Image
                src="/logo.svg"
                alt="Qualysyn"
                width={180}
                height={57}
                className="w-44 brightness-0 invert"
              />
            </Link>
            <p className="mt-8 max-w-xs text-lg font-semibold leading-snug">
              {t('description')}
            </p>
          </div>

          <nav
            aria-label={t('navigation')}
            className="grid grid-cols-2 gap-8 sm:gap-12"
          >
            <div>
              <h2 className="text-sm font-semibold text-neutral-400">
                {t('explore')}
              </h2>
              <ul className="mt-6 space-y-4 text-sm sm:text-base">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="transition-colors hover:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4"
                      href={link.href}
                    >
                      {nav(link.label)}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    className="transition-colors hover:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4"
                    href="/assessment"
                  >
                    {nav('assessment')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-400">
                {t('contact')}
              </h2>
              <ul className="mt-6 space-y-4 text-sm sm:text-base">
                {CONTACT_INFO.map((contact) => (
                  <li key={contact.name}>
                    <a
                      className="wrap-break-word transition-colors hover:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4"
                      href={contact.href}
                      target={contact.name === 'Address' ? '_blank' : undefined}
                      rel={
                        contact.name === 'Address' ? 'noreferrer' : undefined
                      }
                    >
                      {'address' in contact
                        ? contact.address
                        : contact.href.replace(/^(mailto:|tel:)/, '')}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-20 flex flex-col items-center gap-5 text-center lg:mt-28 lg:items-start lg:text-left">
          <div className="flex w-full flex-col items-center gap-5 lg:flex-row lg:justify-between">
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  target={
                    social.href.startsWith('mailto:') ? undefined : '_blank'
                  }
                  rel={
                    social.href.startsWith('mailto:')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="transition-colors hover:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  <HugeiconsIcon icon={social.icon} className="size-5" />
                </a>
              ))}
              {CONTACT_INFO.filter((contact) => contact.name === 'Phone').map(
                (contact) => (
                  <a
                    key={contact.name}
                    href={contact.href}
                    aria-label={contact.name}
                    className="transition-colors hover:text-neutral-400 focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <HugeiconsIcon icon={contact.icon} className="size-5" />
                  </a>
                ),
              )}
            </div>
            <LanguageSelector />
          </div>
          <p className="text-sm text-neutral-300">
            © {getYear()} Qualysyn. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
