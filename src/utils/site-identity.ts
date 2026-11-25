import { defaultBrandConfig } from '../config/brand.config';

/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
  mediaId: string;
  alt?: string;
  url?: string;
}

export interface StarterSiteIdentitySettings {
  title?: string;
  tagline?: string;
  logo?: MediaReference;
  favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = defaultBrandConfig.brandName;
const DEFAULT_SITE_TAGLINE = defaultBrandConfig.tagline;

const LEGACY_PLACEHOLDER_TITLES = new Set(['My Site', 'Opsis Partners']);
const LEGACY_PLACEHOLDER_TAGLINES = new Set([
  'Built with EmDash',
  'An operational partner for founders and growing businesses.',
]);

export function resolveStarterSiteIdentity(settings?: StarterSiteIdentitySettings) {
  const rawTitle = settings?.title?.trim();
  const rawTagline = settings?.tagline?.trim();

  const siteTitle =
    rawTitle && !LEGACY_PLACEHOLDER_TITLES.has(rawTitle) ? rawTitle : DEFAULT_SITE_TITLE;
  const siteTagline =
    rawTagline && !LEGACY_PLACEHOLDER_TAGLINES.has(rawTagline)
      ? rawTagline
      : DEFAULT_SITE_TAGLINE;

  return {
    siteTitle,
    siteTagline,
    siteLogo: settings?.logo?.url ? settings.logo : null,
  };
}
