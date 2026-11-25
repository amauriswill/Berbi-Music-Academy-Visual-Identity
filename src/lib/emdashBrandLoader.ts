import { getEmDashCollection, getSiteSettings } from 'emdash';
import { defaultBrandConfig } from '../config/brand.config';
import type { BrandConfig } from '../types/brand';

export interface EmDashLoadResult {
  config: BrandConfig;
  cmsStatus: {
    connected: boolean;
    entryCount: number;
    faviconUrl: string | null;
  };
}

/**
 * Loads live brand settings & collections from EmDash SQLite/D1 at request time.
 * Falls back gracefully to `defaultBrandConfig` before initial CMS setup or when empty.
 */
export async function loadBrandConfigFromEmDash(): Promise<EmDashLoadResult> {
  const baseConfig: BrandConfig = structuredClone(defaultBrandConfig);

  try {
    const [settings, postsResult, pagesResult] = await Promise.all([
      getSiteSettings(),
      getEmDashCollection('posts', { limit: 20 }).catch(() => ({ entries: [] })),
      getEmDashCollection('pages', { limit: 20 }).catch(() => ({ entries: [] })),
    ]);

    const entryCount =
      (postsResult?.entries?.length ?? 0) + (pagesResult?.entries?.length ?? 0);

    const cmsTitle = settings?.title?.trim();
    const cmsTagline = settings?.tagline?.trim();

    const legacyPlaceholders = ['My Site', 'Opsis Partners'];
    const legacyTaglines = [
      'Built with EmDash',
      'An operational partner for founders and growing businesses.',
    ];

    if (cmsTitle && !legacyPlaceholders.includes(cmsTitle)) {
      baseConfig.brandName = cmsTitle;
    }
    if (cmsTagline && !legacyTaglines.includes(cmsTagline)) {
      baseConfig.tagline = cmsTagline;
    }

    return {
      config: baseConfig,
      cmsStatus: {
        connected: true,
        entryCount,
        faviconUrl: settings?.favicon?.url ?? null,
      },
    };
  } catch {
    return {
      config: baseConfig,
      cmsStatus: {
        connected: false,
        entryCount: 0,
        faviconUrl: null,
      },
    };
  }
}
