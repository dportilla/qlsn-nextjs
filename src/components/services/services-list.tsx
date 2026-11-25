'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

const services = [
  { key: 'rooms', image: '/02.avif' },
  { key: 'quality', image: '/calidad.avif' },
  { key: 'radiation', image: '/protection.avif' },
  { key: 'equipment', image: '/equipos.avif' },
] as const;

gsap.registerPlugin(ScrollTrigger);

export function ServicesList() {
  const t = useTranslations('homeServices');
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const articles = sectionRef.current?.querySelectorAll<HTMLElement>(
          '[data-service-article]',
        );

        articles?.forEach((article) => {
          const image = article.querySelector<HTMLElement>(
            '[data-service-image]',
          );
          if (!image) return;

          gsap.set(image, { scale: 1.05 });
          gsap.to(image, {
            scale: 1,
            duration: 1.4,
            ease: 'sine.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: article,
              start: 'top 85%',
              once: true,
            },
          });

          const copy = article.querySelector<HTMLElement>(
            '[data-service-copy]',
          );
          const title = copy?.querySelector<HTMLElement>(
            '[data-service-title]',
          );
          const description = copy?.querySelector<HTMLElement>(
            '[data-service-description]',
          );
          if (!copy || !title || !description) return;

          gsap.set(title, { opacity: 0.15, y: 10, filter: 'blur(5px)' });
          gsap.set(description, { opacity: 0.15, y: 8, filter: 'blur(4px)' });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: copy,
                start: 'top 90%',
                once: true,
              },
            })
            .to(title, {
              opacity: 1,
              y: 0,
              filter: 'blur(0px)',
              duration: 1.15,
              ease: 'sine.out',
              clearProps: 'opacity,transform,filter',
            })
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 1.15,
                ease: 'sine.out',
                clearProps: 'opacity,transform,filter',
              },
              0.38,
            );
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label={t('title')}
      className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 sm:py-20"
    >
      <div className="space-y-20 sm:space-y-28 lg:space-y-36">
        {services.map(({ key, image }, index) => (
          <article
            key={key}
            data-service-article
            className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20"
          >
            <div
              className={`relative aspect-4/3 overflow-hidden rounded-3xl bg-neutral-100 sm:aspect-5/3 lg:aspect-4/3 ${index % 2 === 1 ? 'lg:order-2' : ''}`}
            >
              <Image
                data-service-image
                src={image}
                alt=""
                fill
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 640px) 90vw, 100vw"
                className="object-cover"
              />
            </div>

            <div data-service-copy>
              <h2
                data-service-title
                className="max-w-lg text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl"
              >
                {t(`${key}.title`)}
              </h2>
              <p
                data-service-description
                className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                {t(`${key}.detail`)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
