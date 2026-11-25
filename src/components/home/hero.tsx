import { cn } from 'cn';
import { getImageProps } from 'next/image';
import { useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button-variants';

const mobileMedia = '(max-width: 639px)';
const mobileSizes = 'calc(100vw - 2rem)';
const desktopSizes = '(min-width: 1280px) 1232px, calc(100vw - 3rem)';
const mobileSrcSet =
  '/hero-equipo-mobile-720.avif 720w, /hero-equipo-mobile.avif 864w';
const { props: desktop } = getImageProps({
  src: '/hero-equipo.avif',
  alt: '',
  fill: true,
  sizes: desktopSizes,
  loading: 'eager',
  fetchPriority: 'high',
});

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-2 sm:px-6 sm:pb-12">
      <div className="relative isolate flex min-h-130 flex-col items-center overflow-hidden rounded-3xl bg-neutral-800 px-6 pb-16 pt-16 text-center text-white sm:min-h-150 sm:px-10 sm:pt-20 lg:min-h-160">
        <link
          rel="preload"
          as="image"
          imageSrcSet={mobileSrcSet}
          imageSizes={mobileSizes}
          media={mobileMedia}
          fetchPriority="high"
        />
        <picture className="absolute inset-0 -z-20">
          <source
            media={mobileMedia}
            srcSet={mobileSrcSet}
            sizes={mobileSizes}
          />
          <img {...desktop} alt="" className="object-cover" />
        </picture>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-black/55"
        />
        <h1
          data-page-entrance-content
          className="max-w-4xl text-3xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </h1>
        <p
          data-page-entrance-content
          className="mt-4 max-w-2xl text-sm leading-relaxed sm:text-base"
        >
          {t('description')}
        </p>
        <div
          data-page-entrance-content
          className="mt-6 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2"
        >
          <a
            href="mailto:contacto@qualysyn.cl"
            data-slot="button"
            className={cn(
              buttonVariants(),
              'h-12 w-full rounded-full px-6 font-semibold',
            )}
          >
            {t('assessment')}
          </a>
          <a
            href="#servicios"
            data-slot="button"
            className={cn(
              buttonVariants({ variant: 'secondary' }),
              'h-12 w-full rounded-full bg-white px-6 font-semibold text-neutral-950 hover:bg-neutral-200',
            )}
          >
            {t('services')}
          </a>
        </div>
      </div>
    </section>
  );
}
