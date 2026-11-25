import { cn } from 'cn';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/scroll-reveal';
import { buttonVariants } from '@/components/ui/button-variants';

export function ContactCta() {
  const t = useTranslations('contactCta');

  return (
    <ScrollReveal>
      <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="relative isolate flex min-h-90 items-center justify-center overflow-hidden rounded-3xl bg-neutral-900 px-6 py-20 text-center text-white sm:min-h-112 sm:px-10">
          <Image
            src="/cta-background.avif"
            alt=""
            fill
            sizes="(min-width: 1280px) 1280px, 100vw"
            className="-z-20 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-black/70"
          />
          <div data-reveal="text" className="max-w-3xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {t('title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white sm:text-base">
              {t('description')}
            </p>
            <a
              href="mailto:contacto@qualysyn.cl"
              data-slot="button"
              className={cn(
                buttonVariants(),
                'mt-6 h-12 rounded-full bg-white px-6 font-semibold text-neutral-950 hover:bg-neutral-200',
              )}
            >
              {t('action')}
            </a>
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
