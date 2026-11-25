import { useTranslations } from 'next-intl';

const commitments = ['quality', 'integrity', 'support'] as const;

export function AboutCommitments() {
  const t = useTranslations('aboutCommitments');

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
        <div>
          <h2 className="max-w-md text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            {t('description')}
          </p>
        </div>
        <div>
          {commitments.map((item) => (
            <article
              key={item}
              className="border-t border-neutral-200 py-6 first:pt-0 first:border-t-0 lg:first:border-t lg:first:pt-6"
            >
              <h3 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {t(`${item}.title`)}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t(`${item}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
