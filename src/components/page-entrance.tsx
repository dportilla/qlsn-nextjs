'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function PageEntrance() {
  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const nav = document.querySelector('[data-page-nav]');
      const main = document.querySelector('main');
      const surface = main?.querySelector('[data-page-entrance]');
      const content = main?.querySelectorAll('[data-page-entrance-content]');
      const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });

      if (nav) timeline.from(nav, { autoAlpha: 0, y: -12, duration: 0.45 }, 0);
      if (surface)
        timeline.from(surface, { autoAlpha: 0, duration: 0.75 }, 0.1);
      if (content?.length) {
        timeline.from(
          content,
          { autoAlpha: 0, y: 14, duration: 0.55, stagger: 0.1 },
          0.35,
        );
      }
    });

    return () => media.revert();
  });

  return null;
}
