import { describe, expect, it } from 'vitest';
import { resolveBrandFavicons } from './faviconPolicy';

describe('faviconPolicy', () => {
  it('returns the canonical SVG, 64x64 PNG, and Apple touch icon descriptors by default', () => {
    expect(resolveBrandFavicons()).toEqual([
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '64x64', href: '/favicon.png' },
    ]);
  });

  it('prioritizes a non-empty CMS favicon URL while preserving PNG fallbacks', () => {
    expect(
      resolveBrandFavicons({ cmsFaviconUrl: '  /_emdash/api/media/file/custom.png  ' })
    ).toEqual([
      { rel: 'icon', href: '/_emdash/api/media/file/custom.png' },
      { rel: 'icon', type: 'image/png', sizes: '64x64', href: '/favicon.png' },
      { rel: 'apple-touch-icon', sizes: '64x64', href: '/favicon.png' },
    ]);
  });

  it('ignores null or whitespace-only CMS favicon URLs and falls back cleanly', () => {
    expect(resolveBrandFavicons({ cmsFaviconUrl: '   ' })).toEqual(
      resolveBrandFavicons()
    );
    expect(resolveBrandFavicons({ cmsFaviconUrl: null })).toEqual(
      resolveBrandFavicons()
    );
  });
});
