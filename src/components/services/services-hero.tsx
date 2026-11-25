import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function ServicesHero() {
  const t = useTranslations('homeServices');
  const nav = useTranslations('nav');

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16">
      <div className="min-w-0">
        <h1
          data-page-entrance-content
          className="max-w-2xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </h1>
        <p
          data-page-entrance-content
          className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {t('description')}
        </p>
        <div data-page-entrance-content className="mt-6">
          <Button
            nativeButton={false}
            render={<Link href="/assessment" />}
            className="h-12 rounded-full px-6 font-semibold"
          >
            {nav('assessment')}
          </Button>
        </div>
      </div>
      <div
        data-page-entrance
        className="relative aspect-4/3 min-w-0 overflow-hidden rounded-3xl bg-muted"
      >
        <Image
          src="/adecuacion.avif"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
