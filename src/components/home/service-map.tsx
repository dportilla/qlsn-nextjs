'use client';

import { useGSAP } from '@gsap/react';
import { Pause, Play } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import { serviceLocations } from '@/constants/service-locations';

import { setupServiceGlobe } from './service-globe';

export function ServiceMap() {
  const t = useTranslations('serviceMap');
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const controls = useRef<{
    select: (index: number) => void;
    toggle: () => void;
  } | null>(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);

  useGSAP(
    () => {
      const element = canvas.current;
      const section = root.current;
      if (!element || !section) return;
      const globe = setupServiceGlobe(element, section, setPlaying);
      if (!globe) return;
      controls.current = globe.controls;
      return () => {
        controls.current = null;
        globe.dispose();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="service-map-title"
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24"
    >
      <div className="overflow-hidden rounded-3xl bg-neutral-100 px-6 py-10 sm:px-10 lg:grid lg:grid-cols-[0.8fr_1.4fr] lg:items-center lg:gap-8 lg:px-14">
        <div>
          <h2
            id="service-map-title"
            className="max-w-sm text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-col gap-2">
            {serviceLocations.map((location, index) => (
              <button
                key={location.id}
                type="button"
                aria-pressed={selected === index}
                onClick={() => {
                  setSelected(index);
                  controls.current?.select(index);
                }}
                className={`flex min-h-16 items-center gap-4 rounded-xl px-4 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent ${selected === index ? 'bg-white' : 'hover:bg-white/60'}`}
              >
                <Image
                  src={`/flags/${location.flag}.svg`}
                  width={30}
                  height={20}
                  alt=""
                  className="rounded-sm"
                />
                <span className="flex-1 font-semibold">{t(location.id)}</span>
                <span
                  aria-hidden="true"
                  className={`size-2 rounded-full ${selected === index ? 'bg-brand-accent' : 'bg-neutral-300'}`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 min-w-0 lg:mt-0">
          <div className="relative mx-auto aspect-square w-full max-w-160">
            <canvas
              ref={canvas}
              tabIndex={0}
              aria-label={t('globe')}
              className="block aspect-square w-full cursor-grab touch-pan-y rounded-full bg-neutral-800 focus-visible:outline-2 focus-visible:outline-brand-accent active:cursor-grabbing"
            />
            {serviceLocations.map((location, _index) => (
              <span
                key={location.id}
                data-globe-marker
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{ visibility: 'hidden' }}
              >
                <span className="absolute -left-1.5 -top-1.5 size-3 rounded-full border-2 border-white bg-brand-accent" />
                <span className="absolute top-2 left-3 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900 shadow-sm">
                  {t(location.id)}
                </span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 text-center text-xs text-muted-foreground">
            <p>{t('hint')}</p>
            <button
              type="button"
              onClick={() => controls.current?.toggle()}
              aria-label={t(playing ? 'pause' : 'play')}
              className="flex min-h-11 items-center gap-2 rounded-full px-3 hover:bg-white focus-visible:outline-2 focus-visible:outline-brand-accent"
            >
              {playing ? <Pause size={14} /> : <Play size={14} />}
              {t(playing ? 'pause' : 'play')}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
