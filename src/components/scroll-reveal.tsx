'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type ReactNode, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ScrollReveal({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add('(prefers-reduced-motion: no-preference)', () => {
        const elements =
          scope.current?.querySelectorAll<HTMLElement>('[data-reveal]');

        elements?.forEach((element) => {
          const image = element.dataset.reveal === 'image';
          const siblings = element.parentElement?.querySelectorAll(
            ':scope > [data-reveal]',
          );
          const position = siblings ? Array.from(siblings).indexOf(element) : 0;
          gsap.from(element, {
            opacity: 0.9,
            y: image ? 0 : 18,
            scale: image ? 0.98 : 1,
            duration: image ? 0.9 : 0.65,
            delay: (position % 3) * 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              once: true,
            },
          });
        });
      });

      return () => media.revert();
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
