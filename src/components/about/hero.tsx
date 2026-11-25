import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function AboutHero() {
  const t = useTranslations('aboutHero');

  return (
    <section
      data-page-entrance
      className="mx-4 flex min-h-80 max-w-7xl flex-col items-center justify-center rounded-[2.5rem] bg-linear-to-br from-[#edf2ec] via-[#d3e1d4] to-[#71977c] px-6 py-16 text-center text-neutral-950 sm:mx-6 sm:min-h-96 sm:py-24 xl:mx-auto"
    >
      <h1
        data-page-entrance-content
        className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
      >
        {t('title')}
      </h1>
      <p
        data-page-entrance-content
        className="mt-4 max-w-xl text-sm leading-relaxed text-neutral-700 sm:text-base"
      >
        {t('description')}
      </p>
      <div
        data-page-entrance-content
        className="mt-5 flex flex-wrap justify-center gap-4"
      >
        <Button
          nativeButton={false}
          render={<Link href="/assessment" />}
          className="h-12 w-48 max-w-full rounded-full px-6 font-semibold"
        >
          {t('assessment')}
        </Button>
        <Button
          nativeButton={false}
          render={<Link href="/services" />}
          variant="secondary"
          className="h-12 w-48 max-w-full rounded-full bg-white px-6 font-semibold hover:bg-neutral-100"
        >
          {t('services')}
        </Button>
      </div>
    </section>
  );
}
