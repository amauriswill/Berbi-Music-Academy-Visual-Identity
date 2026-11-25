/**
 * Pure domain policy describing how brand favicons are resolved.
 * Contains zero framework, CMS, or DOM dependencies.
 */
export interface FaviconLinkDescriptor {
  readonly rel: 'icon' | 'apple-touch-icon';
  readonly href: string;
  readonly type?: string;
  readonly sizes?: string;
}

export interface FaviconPolicyInput {
  readonly cmsFaviconUrl?: string | null;
}

const DEFAULT_SVG_FAVICON: FaviconLinkDescriptor = {
  rel: 'icon',
  type: 'image/svg+xml',
  href: '/favicon.svg',
};

const DEFAULT_PNG_FAVICON: FaviconLinkDescriptor = {
  rel: 'icon',
  type: 'image/png',
  sizes: '64x64',
  href: '/favicon.png',
};

const DEFAULT_APPLE_TOUCH_ICON: FaviconLinkDescriptor = {
  rel: 'apple-touch-icon',
  sizes: '64x64',
  href: '/favicon.png',
};

function sanitizeOptionalUrl(raw?: string | null): string | null {
  const trimmed = raw?.trim();
  return trimmed ? trimmed : null;
}

/**
 * Resolves the canonical ordered list of favicon `<link>` descriptors.
 * Honors a non-empty CMS-uploaded favicon URL first while retaining static fallbacks.
 */
export function resolveBrandFavicons(
  input: FaviconPolicyInput = {}
): readonly FaviconLinkDescriptor[] {
  const cmsHref = sanitizeOptionalUrl(input.cmsFaviconUrl);

  if (cmsHref) {
    return [
      { rel: 'icon', href: cmsHref },
      DEFAULT_PNG_FAVICON,
      DEFAULT_APPLE_TOUCH_ICON,
    ];
  }

  return [DEFAULT_SVG_FAVICON, DEFAULT_PNG_FAVICON, DEFAULT_APPLE_TOUCH_ICON];
}
