import { describe, expect, it } from 'vitest';
import { PUBLIC_CSP, applyPublicPageHeaders } from './securityHeaders';

describe('securityHeaders', () => {
  it('sets cacheable Cache-Control and strict security headers for healthy responses', () => {
    const headers = new Headers();
    applyPublicPageHeaders(headers);

    expect(headers.get('Cache-Control')).toBe(
      'public, max-age=0, s-maxage=60, stale-while-revalidate=300'
    );
    expect(headers.get('Content-Security-Policy')).toBe(PUBLIC_CSP);
    expect(headers.get('X-Content-Type-Options')).toBe('nosniff');
    expect(headers.get('Referrer-Policy')).toBe('strict-origin-when-cross-origin');
    expect(headers.get('X-Frame-Options')).toBe('SAMEORIGIN');
  });

  it('disables caching with no-store when serving degraded fallback responses', () => {
    const headers = new Headers();
    applyPublicPageHeaders(headers, { degraded: true });

    expect(headers.get('Cache-Control')).toBe('no-store');
    expect(headers.get('Content-Security-Policy')).toBe(PUBLIC_CSP);
  });
});
