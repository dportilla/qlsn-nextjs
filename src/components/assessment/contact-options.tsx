import { ArrowUpRight, ClipboardCheck, Mail, Wrench } from 'lucide-react';
import { useTranslations } from 'next-intl';

const options = [
  { key: 'projects', icon: ClipboardCheck },
  { key: 'support', icon: Wrench },
  { key: 'general', icon: Mail },
] as const;

export function ContactOptions() {
  const t = useTranslations('assessment');
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t('contactTitle')}
        </h2>
        <p className="mt-3 text-muted-foreground">{t('contactDescription')}</p>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {options.map(({ key, icon: Icon }) => (
          <div
            key={key}
            className="flex flex-col rounded-3xl bg-neutral-100 p-8"
          >
            <div className="flex size-11 items-center justify-center rounded-full bg-brand-accent text-white">
              <Icon size={20} aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">{t(`${key}.title`)}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {t(`${key}.description`)}
            </p>
            <a
              href={`mailto:contacto@qualysyn.cl?subject=${encodeURIComponent(t(`${key}.title`))}`}
              className="mt-8 inline-flex w-fit items-center gap-2 text-sm font-semibold hover:underline"
            >
              contacto@qualysyn.cl <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
