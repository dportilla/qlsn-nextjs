import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';

const AUTO_ADVANCE_MS = 4000;
gsap.registerPlugin(ScrollTrigger);

export function useHomeServices(serviceCount: number) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const progressTween = useRef<gsap.core.Tween | null>(null);
  const canAdvance = useRef(false);
  const hasChanged = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateVisibility = () => setIsPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () =>
      document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    const progress = progressRef.current;
    if (!progress) return;

    gsap.set(progress, { scaleX: 0 });
    const tween = gsap.to(progress, {
      scaleX: 1,
      duration: AUTO_ADVANCE_MS / 1000,
      ease: 'none',
      paused: !canAdvance.current,
      onComplete: () => {
        hasChanged.current = true;
        setPrevious(active);
        setActive((current) => (current + 1) % serviceCount);
      },
    });
    progressTween.current = tween;

    return () => {
      tween.kill();
      if (progressTween.current === tween) progressTween.current = null;
    };
  }, [active, serviceCount]);

  useEffect(() => {
    canAdvance.current = isInView && isPageVisible && !isPaused;
    progressTween.current?.paused(!canAdvance.current);
  }, [isInView, isPageVisible, isPaused]);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      const startedAt = performance.now();

      media.add(
        {
          desktop:
            '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
          mobile:
            '(max-width: 1023px) and (prefers-reduced-motion: no-preference)',
        },
        ({ conditions }) => {
          const heading = sectionRef.current?.querySelector(
            '[data-services-heading]',
          );
          if (!heading) return;

          const timeline = gsap.timeline({
            paused: true,
            defaults: { ease: 'power3.out' },
          });
          timeline
            .from('[data-services-title]', {
              clipPath: 'inset(0 0 100% 0)',
              filter: 'blur(4px)',
              y: 12,
              duration: 1.25,
              ease: 'power4.out',
            })
            .from(
              '[data-services-subtitle]',
              {
                opacity: 0,
                filter: 'blur(4px)',
                duration: 1.1,
                ease: 'sine.out',
              },
              0.55,
            );

          ScrollTrigger.create({
            trigger: heading,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              const elapsed = (performance.now() - startedAt) / 1000;
              timeline
                .delay(conditions?.desktop ? Math.max(0, 1.1 - elapsed) : 0)
                .play();
            },
          });
        },
        sectionRef,
      );
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  useGSAP(
    () => {
      if (!hasChanged.current) return;
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap
          .timeline({
            defaults: { ease: 'power3.out' },
            onComplete: () => setPrevious(null),
          })
          .from('[data-service-change]', {
            opacity: 0,
            y: 18,
            duration: 0.7,
            stagger: 0.1,
          })
          .from(
            '[data-service-image-active]',
            {
              opacity: 0,
              scale: 1.08,
              duration: 1.4,
            },
            0,
          );
      });
      media.add('(prefers-reduced-motion: reduce)', () => {
        setPrevious(null);
      });
      return () => media.revert();
    },
    { scope: sectionRef, dependencies: [active], revertOnUpdate: true },
  );

  function changeService(direction: number) {
    hasChanged.current = true;
    setPrevious(active);
    setActive((current) => (current + direction + serviceCount) % serviceCount);
  }

  return {
    active,
    previous,
    isPaused,
    setIsPaused,
    sectionRef,
    progressRef,
    changeService,
  };
}
