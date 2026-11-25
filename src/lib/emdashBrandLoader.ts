import { getEmDashCollection, getSiteSettings } from 'emdash';
import { defaultBrandConfig } from '../config/brand.config';
import type { BrandConfig } from '../types/brand';

export interface EmDashLoadResult {
  config: BrandConfig;
  cmsStatus: {
    connected: boolean;
    entryCount: number;
    faviconUrl: string | null;
    degradedReason?: string;
  };
}

export interface EmDashLoaderDeps {
  getSiteSettings?: typeof getSiteSettings;
  getEmDashCollection?: typeof getEmDashCollection;
  logger?: Pick<Console, 'warn'>;
  timeoutMs?: number;
  fallbackConfig?: BrandConfig;
}

const DEFAULT_TIMEOUT_MS = 2500;
const LEGACY_PLACEHOLDERS = ['My Site', 'Opsis Partners'];
const LEGACY_TAGLINES = [
  'Built with EmDash',
  'An operational partner for founders and growing businesses.',
];

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timerId: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timerId = setTimeout(() => {
      reject(new Error(`EmDash request timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
  }
}

/**
 * Loads live brand settings and collections from EmDash SQLite/D1 at request time.
 * Enforces a bounded timeout and falls back gracefully with structured logging on failure.
 */
export async function loadBrandConfigFromEmDash(
  deps?: EmDashLoaderDeps
): Promise<EmDashLoadResult> {
  const fetchSettings = deps?.getSiteSettings ?? getSiteSettings;
  const fetchCollection = deps?.getEmDashCollection ?? getEmDashCollection;
  const logger = deps?.logger ?? console;
  const timeoutMs = deps?.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const baseConfig: BrandConfig = structuredClone(deps?.fallbackConfig ?? defaultBrandConfig);

  try {
    const [settings, postsResult, pagesResult] = await withTimeout(
      Promise.all([
        fetchSettings(),
        fetchCollection('posts', { limit: 20 }).catch(() => ({ entries: [] })),
        fetchCollection('pages', { limit: 20 }).catch(() => ({ entries: [] })),
      ]),
      timeoutMs
    );

    const entryCount =
      (postsResult?.entries?.length ?? 0) + (pagesResult?.entries?.length ?? 0);

    const cmsTitle = settings?.title?.trim();
    const cmsTagline = settings?.tagline?.trim();

    if (cmsTitle && !LEGACY_PLACEHOLDERS.includes(cmsTitle)) {
      baseConfig.brandName = cmsTitle;
    }
    if (cmsTagline && !LEGACY_TAGLINES.includes(cmsTagline)) {
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
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    logger.warn('[emdashBrandLoader] Falling back to defaultBrandConfig:', message);
    return {
      config: baseConfig,
      cmsStatus: {
        connected: false,
        entryCount: 0,
        faviconUrl: null,
        degradedReason: message,
      },
    };
  }
}
