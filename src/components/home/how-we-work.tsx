import { cn } from 'cn';
import {
  ClipboardList,
  Headset,
  Search,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/scroll-reveal';
import { buttonVariants } from '@/components/ui/button-variants';

const steps = [
  { key: 'discovery', icon: Search },
  { key: 'planning', icon: ClipboardList },
  { key: 'implementation', icon: Wrench },
  { key: 'verification', icon: ShieldCheck },
  { key: 'support', icon: Headset },
] as const;

export function HowWeWork() {
  const t = useTranslations('howWeWork');

  return (
    <ScrollReveal>
      <section
        aria-labelledby="how-we-work-title"
        className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:py-24"
      >
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
          <div
            data-reveal="text"
            className="flex flex-col items-center justify-center pb-5 text-center lg:items-start lg:justify-start lg:py-10 lg:text-left"
          >
            <h2
              id="how-we-work-title"
              className="max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('description')}
            </p>
            <a
              href="mailto:contacto@qualysyn.cl"
              data-slot="button"
              className={cn(
                buttonVariants(),
                'mt-5 h-12 rounded-full px-6 font-semibold',
              )}
            >
              {t('assessment')}
            </a>
          </div>
          {steps.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              data-reveal="text"
              className="relative min-h-40 rounded-3xl bg-neutral-100 p-6 sm:p-8 lg:flex lg:min-h-80 lg:flex-col"
            >
              <span
                className="flex size-10 items-center justify-center rounded-full bg-brand-accent text-white sm:size-12"
                aria-hidden="true"
              >
                <Icon className="size-5" strokeWidth={2.5} />
              </span>
              <h3 className="mt-3 pr-12 text-xl font-semibold tracking-tight sm:text-2xl lg:pr-0">
                {t(`${key}.title`)}
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(`${key}.description`)}
              </p>
              <span
                aria-hidden="true"
                className="absolute right-6 top-5 text-4xl font-medium leading-none text-neutral-500 sm:right-8 sm:top-7 lg:static lg:mt-auto lg:pt-10 lg:text-7xl"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
            </article>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
