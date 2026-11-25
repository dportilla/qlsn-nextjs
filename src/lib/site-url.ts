/** Set SITE_URL to the public origin when the final domain is connected. */
const origin = process.env.SITE_URL ?? 'https://qualysyn-v2-next.vercel.app';
if (!URL.canParse(origin)) {
  throw new Error('SITE_URL must be an absolute URL.');
}
export const SITE_URL = new URL(origin);
