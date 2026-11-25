'use client';

import { useGSAP } from '@gsap/react';
import { Menu02Icon, XIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import gsap from 'gsap';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NAV_LINKS } from '@/constants/navigation';
import { Link } from '@/i18n/navigation';

export function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 0);
    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    return () => window.removeEventListener('scroll', updateScrolled);
  }, []);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add(
        {
          reduceMotion: '(prefers-reduced-motion: reduce)',
          motion: '(prefers-reduced-motion: no-preference)',
        },
        (context) => {
          const duration = context.conditions?.reduceMotion ? 0 : 0.55;
          gsap.set('[data-menu-icon="close"]', { rotation: -90, scale: 0.75 });
          gsap.set('[data-mobile-menu-panel]', { yPercent: -100, y: -8 });
          const timeline = gsap.timeline({
            paused: true,
            defaults: { duration, ease: 'power2.inOut' },
          });
          timeline
            .to(
              '[data-menu-icon="open"]',
              { autoAlpha: 0, rotation: 90, scale: 0.75 },
              0,
            )
            .to(
              '[data-menu-icon="close"]',
              { autoAlpha: 1, rotation: 0, scale: 1 },
              0,
            )
            .set('#mobile-navigation', { visibility: 'visible' }, 0)
            .to('[data-mobile-menu-panel]', { yPercent: 0, y: 0 }, 0);
          timelineRef.current = timeline;
          return () => {
            timelineRef.current = null;
          };
        },
        headerRef,
      );
      return () => media.revert();
    },
    { scope: headerRef },
  );

  useEffect(() => {
    if (open) timelineRef.current?.play();
    else timelineRef.current?.reverse();
  }, [open]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b bg-background transition-colors ${scrolled ? 'border-neutral-200' : 'border-transparent'}`}
    >
      <div
        data-page-nav
        className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:min-h-24 sm:px-6"
      >
        <Link
          href="/"
          aria-label={t('homeLabel')}
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt="Qualysyn"
            width={180}
            height={57}
            loading="eager"
            className="w-36 sm:w-45"
          />
        </Link>
        <nav aria-label={t('main')} className="hidden lg:flex">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex items-center py-2 text-base font-normal text-neutral-950 transition-colors hover:text-neutral-500 focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1"
                >
                  {t(link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Button
            nativeButton={false}
            render={<Link href="/assessment" />}
            variant="default"
            className="hidden h-auto px-6 py-3.5 font-semibold  sm:inline-flex"
          >
            {t('assessment')}
          </Button>
          <Button
            variant="default"
            size="icon-lg"
            className="size-12 lg:hidden"
            aria-label={t(open ? 'close' : 'open')}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            <span aria-hidden="true" className="relative block size-6">
              <span data-menu-icon="open" className="absolute inset-0">
                <HugeiconsIcon icon={Menu02Icon} className="size-6" />
              </span>
              <span
                data-menu-icon="close"
                className="invisible absolute inset-0 opacity-0"
              >
                <HugeiconsIcon icon={XIcon} className="size-6" />
              </span>
            </span>
          </Button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        aria-label={t('mobile')}
        inert={!open}
        className="invisible absolute inset-x-0 top-full z-50 overflow-hidden lg:hidden"
      >
        <div
          data-mobile-menu-panel
          className="mx-auto flex max-w-307.5 flex-col items-start gap-1 rounded-b-xl border border-neutral-100 bg-white px-4 py-5 shadow-sm"
        >
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              variant="ghost"
              nativeButton={false}
              render={<Link href={link.href} />}
              onClick={() => setOpen(false)}
              className="justify-start rounded-none px-0 text-base font-normal text-neutral-950 hover:bg-transparent hover:text-neutral-500"
            >
              {t(link.label)}
            </Button>
          ))}
          <Button
            nativeButton={false}
            variant="default"
            render={<Link href="/assessment" />}
            onClick={() => setOpen(false)}
            className="mt-4 h-auto px-6 py-3 font-semibold sm:hidden"
          >
            {t('assessment')}
          </Button>
        </div>
      </nav>
    </header>
  );
}
