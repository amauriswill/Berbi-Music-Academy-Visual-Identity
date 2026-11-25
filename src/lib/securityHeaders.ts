/**
 * HTTP caching and security headers applied to public Astro SSR pages.
 */
export const PUBLIC_CSP =
  "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob: https:; connect-src 'self' ws: wss:; frame-ancestors 'self'; base-uri 'self'; object-src 'none'";

export function applyPublicPageHeaders(
  headers: Headers,
  options?: { degraded?: boolean }
): void {
  headers.set(
    'Cache-Control',
    options?.degraded
      ? 'no-store'
      : 'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
  );
  headers.set('Content-Security-Policy', PUBLIC_CSP);
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Frame-Options', 'SAMEORIGIN');
}
