import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export function Mission() {
  const t = useTranslations('mission');

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_minmax(0,0.55fr)] lg:gap-8 lg:py-24">
      <div>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {t('title')}
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
          {t('description')}
        </p>
        <Button
          nativeButton={false}
          render={<Link href="/assessment" />}
          className="mt-5 h-12 rounded-full px-6 font-semibold"
        >
          {t('assessment')}
        </Button>
      </div>

      <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-muted lg:aspect-auto lg:min-h-130">
        <Image
          src="/healthcare-partner.avif"
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
        />
      </div>

      <dl className="grid grid-cols-2 gap-6 self-end lg:grid-cols-1 lg:gap-10">
        <div>
          <dt className="text-sm text-muted-foreground">{t('focusLabel')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-3xl xl:text-4xl">
            {t('focus')}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">{t('driveLabel')}</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-3xl xl:text-4xl">
            {t('drive')}
          </dd>
        </div>
      </dl>
    </section>
  );
}
