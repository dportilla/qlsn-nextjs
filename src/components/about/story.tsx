import { useTranslations } from 'next-intl';

export function AboutStory() {
  const t = useTranslations('aboutStory');

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="grid gap-8 rounded-3xl bg-neutral-100 p-6 sm:p-10 lg:grid-cols-2 lg:gap-20 lg:p-16">
        <h2 className="max-w-lg text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t('title')}
        </h2>
        <div className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <p>{t('history')}</p>
          <p>{t('vision')}</p>
        </div>
      </div>
    </section>
  );
}
