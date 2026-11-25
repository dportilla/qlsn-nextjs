import Image from 'next/image';

type Logo = { src: string; name: string };

export function LogoMarquee({
  logos,
  label,
}: {
  logos: readonly Logo[];
  label: string;
}) {
  if (!logos.length) return null;

  // Eight 10rem slots fill the widest supported track before it repeats.
  const repeats = Math.ceil(8 / logos.length);
  const copies = Array.from({ length: repeats * 2 }, (_, index) => index);

  return (
    <section aria-label={label} className="py-16">
      <div className="logo-marquee">
        <div
          className="logo-marquee-track"
          style={{ animationDuration: `${repeats * logos.length * 5}s` }}
        >
          {copies.map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy > 0 || undefined}
              className="logo-marquee-group"
            >
              {logos.map((logo) => (
                <li
                  key={logo.src}
                  className="relative mx-4 h-14 md:h-20 w-36 shrink-0"
                >
                  <Image
                    src={logo.src}
                    alt={copy ? '' : logo.name}
                    fill
                    sizes="11rem"
                    className="object-contain grayscale"
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
