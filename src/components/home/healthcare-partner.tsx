'use client';

import { useGSAP } from '@gsap/react';
import { cn } from 'cn';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { ScrollReveal } from '@/components/scroll-reveal';
import { buttonVariants } from '@/components/ui/button-variants';

gsap.registerPlugin(ScrollTrigger);

export function HealthcarePartner() {
  const t = useTranslations('healthcarePartner');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        const intro = sectionRef.current?.querySelector('[data-partner-intro]');
        if (intro) {
          gsap.from(intro.querySelectorAll('[data-partner-copy]'), {
            opacity: 0.9,
            y: 24,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: { trigger: intro, start: 'top 88%', once: true },
          });
        }
        const image = sectionRef.current?.querySelector('[data-partner-image]');
        if (image) {
          gsap.from(image, {
            scale: 1.14,
            duration: 1.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: image.parentElement,
              start: 'top 90%',
              once: true,
            },
          });
        }
        sectionRef.current
          ?.querySelectorAll('[data-partner-value]')
          .forEach((value) => {
            gsap.from(value, {
              x: -12,
              opacity: 0.9,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: { trigger: value, start: 'top 90%', once: true },
            });
          });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <ScrollReveal>
      <section
        ref={sectionRef}
        className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      >
        <div className="grid gap-8 rounded-3xl bg-neutral-100 p-6 sm:p-10 lg:grid-cols-[0.7fr_1.5fr_1fr] lg:items-center lg:gap-12 lg:px-12 lg:py-24">
          <div
            data-partner-intro
            className="lg:order-3 lg:flex lg:h-full lg:flex-col lg:justify-between"
          >
            <h2
              data-partner-copy
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t('title')}
            </h2>
            <div data-partner-copy className="mt-6 lg:mt-12">
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t('description')}
              </p>
              <a
                href="mailto:contacto@qualysyn.cl"
                data-slot="button"
                className={cn(
                  buttonVariants(),
                  'mt-6 h-12 rounded-full px-6 font-semibold',
                )}
              >
                {t('assessment')}
              </a>
            </div>
          </div>
          <div
            data-reveal="image"
            className="relative aspect-4/3 overflow-hidden rounded-3xl bg-muted lg:order-2 lg:aspect-auto lg:min-h-120"
          >
            <Image
              data-partner-image
              src="/healthcare-partner.avif"
              alt={t('imageAlt')}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <dl className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-3 lg:order-1 lg:grid-cols-1 lg:gap-10 lg:self-end">
            {(['safety', 'quality', 'support'] as const).map((item) => (
              <div key={item} data-reveal="text">
                <dt className="text-sm text-muted-foreground">
                  {t(`${item}.label`)}
                </dt>
                <dd
                  data-partner-value
                  className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl"
                >
                  {t(`${item}.value`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </ScrollReveal>
  );
}
