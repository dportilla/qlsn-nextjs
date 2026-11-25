'use client';

import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/scroll-reveal';
import { Button } from '@/components/ui/button';
import { useHomeServices } from '@/hooks/use-home-services';

const services = ['rooms', 'quality', 'radiation', 'equipment'] as const;
const serviceImages = [
  '/02.avif',
  '/calidad.avif',
  '/protection.avif',
  '/equipos.avif',
];

export function HomeServices() {
  const t = useTranslations('homeServices');
  const {
    active,
    previous,
    isPaused,
    setIsPaused,
    sectionRef,
    progressRef,
    changeService,
  } = useHomeServices(services.length);

  return (
    <ScrollReveal>
      <section
        ref={sectionRef}
        id="servicios"
        aria-labelledby="services-title"
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <div data-services-heading>
          <h2
            data-services-title
            id="services-title"
            className="mx-auto max-w-4xl text-center text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t('title')}
          </h2>
          <p
            data-services-subtitle
            className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {t('description')}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-[0.6fr_1fr]">
          <div
            data-reveal="text"
            aria-live="polite"
            aria-atomic="true"
            className="flex min-h-64 flex-col justify-between rounded-3xl bg-[linear-gradient(135deg,#0a0a0a_0%,#171717_55%,#242424_82%,#303030_100%)] p-7 text-white sm:p-8 md:min-h-80"
          >
            <div className="flex items-start justify-between gap-4">
              <span
                data-service-change
                aria-hidden="true"
                className="text-6xl font-semibold leading-none tracking-tight text-neutral-300"
              >
                {String(active + 1).padStart(2, '0')}
              </span>
              <div aria-hidden="true" className="w-28 shrink-0 pt-1 sm:w-36">
                <span className="block text-right text-xs font-medium text-neutral-300">
                  {t('next')}
                </span>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/25">
                  <div
                    ref={progressRef}
                    className="h-full w-full origin-left rounded-full bg-white"
                    style={{ transform: 'scaleX(0)' }}
                  />
                </div>
              </div>
            </div>
            <div data-service-change className="mt-12">
              <h3 className="text-2xl font-semibold tracking-tight">
                {t(`${services[active]}.title`)}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-300 sm:text-base">
                {t(`${services[active]}.description`)}
              </p>
            </div>
          </div>
          <div
            data-reveal="image"
            className="relative min-h-64 overflow-hidden rounded-3xl bg-neutral-300 md:min-h-80"
          >
            {previous !== null && previous !== active && (
              <Image
                src={serviceImages[previous]}
                alt=""
                fill
                sizes="(min-width: 768px) 55vw, 100vw"
                className="object-cover"
              />
            )}
            <Image
              key={serviceImages[active]}
              src={serviceImages[active]}
              alt=""
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              data-service-image-active
              className="object-cover"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-neutral-900/75 px-5 py-4 text-white backdrop-blur-sm sm:inset-x-auto sm:right-5 sm:bottom-5 sm:max-w-xs">
              <p className="text-xs text-white/75">Qualysyn</p>
              <p data-service-change className="mt-1 text-sm font-medium">
                {t(`${services[active]}.title`)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => changeService(-1)}
              aria-label={t('previous')}
              className="flex size-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsPaused((paused) => !paused)}
              aria-label={t(isPaused ? 'play' : 'pause')}
              className="flex size-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
            >
              {isPaused ? (
                <Play aria-hidden="true" className="size-4" />
              ) : (
                <Pause aria-hidden="true" className="size-4" />
              )}
            </Button>
            <Button
              onClick={() => changeService(1)}
              aria-label={t('next')}
              className="flex size-11 items-center justify-center rounded-full bg-white transition-colors hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              variant="outline"
            >
              <ArrowRight aria-hidden="true" className="size-4" />
            </Button>
          </div>
          <a
            href="mailto:contacto@qualysyn.cl"
            className="inline-flex items-center gap-2 text-sm font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900"
          >
            {t('contact')}{' '}
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </div>
      </section>
    </ScrollReveal>
  );
}
