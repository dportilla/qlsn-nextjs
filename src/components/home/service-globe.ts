import gsap from 'gsap';
import { serviceLocations } from '@/constants/service-locations';

const radians = Math.PI / 180;
type LandPoint = { x: number; y: number; z: number };

export function setupServiceGlobe(
  element: HTMLCanvasElement,
  section: HTMLElement,
  setPlaying: (playing: boolean) => void,
) {
  const ctx = element.getContext('2d');
  if (!ctx) return;
  const markers = section.querySelectorAll<HTMLElement>('[data-globe-marker]');
  let land: LandPoint[] | null = null;
  let disposed = false;
  const view = { longitude: -71, latitude: -20 };
  let size = 600;
  let visible = false;
  let paused = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dragging = false;
  let previous = { x: 0, y: 0 };
  let flight: gsap.core.Tween | undefined;
  setPlaying(!paused);

  const project = (point: { x: number; y: number; z: number }) => {
    const a = -view.longitude * radians;
    const b = view.latitude * radians;
    const x = point.x * Math.cos(a) + point.z * Math.sin(a);
    const z = point.z * Math.cos(a) - point.x * Math.sin(a);
    return {
      x,
      y: point.y * Math.cos(b) - z * Math.sin(b),
      z: point.y * Math.sin(b) + z * Math.cos(b),
    };
  };
  const draw = () => {
    if (!land) return;
    ctx.clearRect(0, 0, size, size);
    const center = size / 2;
    const radius = size * 0.43;
    const surface = ctx.createRadialGradient(
      size * 0.35,
      size * 0.3,
      0,
      center,
      center,
      radius,
    );
    surface.addColorStop(0, '#303b42');
    surface.addColorStop(0.65, '#172329');
    surface.addColorStop(1, '#0b1419');
    ctx.fillStyle = surface;
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, Math.PI * 2);
    ctx.fill();
    for (const point of land) {
      const p = project(point);
      if (p.z <= 0) continue;
      ctx.fillStyle = `rgba(209,225,222,${0.18 + p.z * 0.67})`;
      ctx.beginPath();
      ctx.arc(
        center + p.x * radius,
        center - p.y * radius,
        Math.max(0.55, size / 550) * (0.6 + p.z * 0.4),
        0,
        Math.PI * 2,
      );
      ctx.fill();
    }
    serviceLocations.forEach((location, index) => {
      const lat = location.latitude * radians;
      const lon = location.longitude * radians;
      const p = project({
        x: Math.cos(lat) * Math.sin(lon),
        y: Math.sin(lat),
        z: Math.cos(lat) * Math.cos(lon),
      });
      const marker = markers[index];
      if (!marker) return;
      marker.style.left = `${50 + p.x * 43}%`;
      marker.style.top = `${50 - p.y * 43}%`;
      marker.style.visibility = p.z > 0.08 ? 'visible' : 'hidden';
    });
  };
  const resize = () => {
    size = element.getBoundingClientRect().width;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    element.width = size * dpr;
    element.height = size * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };
  const tick = (_time: number, delta: number) => {
    if (!visible || document.hidden || paused || dragging || flight?.isActive())
      return;
    view.longitude += Math.min(delta, 64) * 0.006;
    draw();
  };
  const down = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    flight?.kill();
    dragging = true;
    previous = { x: event.clientX, y: event.clientY };
    element.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent) => {
    if (!dragging) return;
    view.longitude -= ((event.clientX - previous.x) * 180) / size;
    view.latitude = gsap.utils.clamp(
      -75,
      75,
      view.latitude + ((event.clientY - previous.y) * 180) / size,
    );
    previous = { x: event.clientX, y: event.clientY };
    draw();
  };
  const up = () => {
    dragging = false;
  };
  const key = (event: KeyboardEvent) => {
    if (
      !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
    )
      return;
    event.preventDefault();
    flight?.kill();
    view.longitude +=
      event.key === 'ArrowLeft' ? 10 : event.key === 'ArrowRight' ? -10 : 0;
    view.latitude = gsap.utils.clamp(
      -75,
      75,
      view.latitude +
        (event.key === 'ArrowUp' ? 10 : event.key === 'ArrowDown' ? -10 : 0),
    );
    draw();
  };
  const controls = {
    select(index: number) {
      const location = serviceLocations[index];
      const difference =
        ((((location.longitude - view.longitude + 540) % 360) + 360) % 360) -
        180;
      flight?.kill();
      flight = gsap.to(view, {
        longitude: view.longitude + difference,
        latitude: location.latitude,
        duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 0
          : 1.1,
        ease: 'power3.inOut',
        onUpdate: draw,
      });
    },
    toggle() {
      paused = !paused;
      setPlaying(!paused);
    },
  };
  const observer = new ResizeObserver(resize);
  observer.observe(element);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
  });
  intersection.observe(element);
  const preload = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      preload.disconnect();
      // Natural Earth 1:110m land, sampled into an equal-area dot field.
      void import('@/constants/land-points.json').then(
        ({ default: points }) => {
          if (disposed) return;
          land = points.map(([longitude, latitude]) => ({
            x: Math.cos(latitude * radians) * Math.sin(longitude * radians),
            y: Math.sin(latitude * radians),
            z: Math.cos(latitude * radians) * Math.cos(longitude * radians),
          }));
          resize();
          element.style.backgroundColor = 'transparent';
          gsap.ticker.add(tick);
        },
      );
    },
    { rootMargin: '800px 0px' },
  );
  preload.observe(section);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion: reduce)', () => {
    paused = true;
    setPlaying(false);
  });
  element.addEventListener('pointerdown', down);
  element.addEventListener('pointermove', move);
  element.addEventListener('pointerup', up);
  element.addEventListener('pointercancel', up);
  element.addEventListener('lostpointercapture', up);
  element.addEventListener('keydown', key);
  resize();
  return {
    controls,
    dispose() {
      disposed = true;
      flight?.kill();
      media.revert();
      observer.disconnect();
      intersection.disconnect();
      preload.disconnect();
      gsap.ticker.remove(tick);
      element.removeEventListener('pointerdown', down);
      element.removeEventListener('pointermove', move);
      element.removeEventListener('pointerup', up);
      element.removeEventListener('pointercancel', up);
      element.removeEventListener('lostpointercapture', up);
      element.removeEventListener('keydown', key);
    },
  };
}
