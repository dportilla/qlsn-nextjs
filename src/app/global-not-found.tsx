import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css';

const figtree = Figtree({
  variable: '--font-figtree',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Página no encontrada | Qualysyn',
  description: 'La página que buscas no está disponible.',
};

export default function GlobalNotFound() {
  return (
    <html lang="es-CL" className={`${figtree.variable} font-sans antialiased`}>
      <body className="min-h-screen bg-white text-neutral-950">
        <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-5 py-12 sm:px-8 lg:px-10">
          <div className="relative grid w-full gap-8 md:grid-cols-2 md:items-end md:gap-0">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-neutral-100 md:aspect-auto md:min-h-150">
              <Image
                src="/adecuacion.avif"
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="md:pl-8 lg:pl-12">
              <p
                aria-hidden="true"
                className="text-8xl font-semibold leading-none tracking-tighter sm:text-9xl md:absolute md:top-12 md:left-[39%] md:text-[clamp(10rem,22vw,19rem)]"
              >
                404
              </p>
              <div className="mt-6 max-w-md md:mt-0 md:pb-2">
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Página no encontrada
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  La página que buscas no está disponible o cambió de dirección.
                  Vuelve al inicio para conocer nuestros servicios.
                </p>
                <Link
                  href="/es"
                  className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-neutral-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
                >
                  Volver al inicio
                </Link>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
