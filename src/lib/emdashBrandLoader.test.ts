import { describe, expect, it, vi } from 'vitest';
import { BERBI_PRESET } from '../config/presets';
import { loadBrandConfigFromEmDash } from './emdashBrandLoader';

describe('emdashBrandLoader', () => {
  it('merges live non-placeholder CMS settings and counts entries when connected', async () => {
    const result = await loadBrandConfigFromEmDash({
      getSiteSettings: (async () => ({
        title: 'Berbi Conservatory Live',
        tagline: 'Live conservatory guidelines from EmDash.',
        favicon: { mediaId: 'm1', url: '/_emdash/api/media/file/favicon.png' },
      })) as any,
      getEmDashCollection: (async (collection: string) => ({
        entries: collection === 'posts' ? [{ id: '1' }, { id: '2' }] : [{ id: '3' }],
      })) as any,
      fallbackConfig: BERBI_PRESET,
    });

    expect(result.config.brandName).toBe('Berbi Conservatory Live');
    expect(result.config.tagline).toBe('Live conservatory guidelines from EmDash.');
    expect(result.cmsStatus).toEqual({
      connected: true,
      entryCount: 3,
      faviconUrl: '/_emdash/api/media/file/favicon.png',
    });
  });

  it('ignores legacy EmDash/template placeholders and preserves Berbi defaults', async () => {
    const result = await loadBrandConfigFromEmDash({
      getSiteSettings: (async () => ({
        title: 'My Site',
        tagline: 'Built with EmDash',
      })) as any,
      getEmDashCollection: (async () => ({ entries: [] })) as any,
      fallbackConfig: BERBI_PRESET,
    });

    expect(result.config.brandName).toBe('Berbi Music Academy');
    expect(result.config.tagline).toBe(BERBI_PRESET.tagline);
    expect(result.cmsStatus.connected).toBe(true);
  });

  it('logs a warning and falls back cleanly when EmDash rejects', async () => {
    const warn = vi.fn();
    const result = await loadBrandConfigFromEmDash({
      getSiteSettings: async () => {
        throw new Error('SQLITE_BUSY');
      },
      getEmDashCollection: (async () => ({ entries: [] })) as any,
      logger: { warn },
      fallbackConfig: BERBI_PRESET,
    });

    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][1]).toContain('SQLITE_BUSY');
    expect(result.cmsStatus).toEqual({
      connected: false,
      entryCount: 0,
      faviconUrl: null,
      degradedReason: 'SQLITE_BUSY',
    });
    expect(result.config.brandName).toBe('Berbi Music Academy');
  });

  it('enforces the bounded timeout when EmDash stalls and falls back gracefully', async () => {
    const warn = vi.fn();
    const neverResolves = () => new Promise<never>(() => {});

    const result = await loadBrandConfigFromEmDash({
      getSiteSettings: neverResolves,
      getEmDashCollection: neverResolves,
      logger: { warn },
      timeoutMs: 25,
      fallbackConfig: BERBI_PRESET,
    });

    expect(warn).toHaveBeenCalledOnce();
    expect(warn.mock.calls[0][1]).toContain('timed out after 25ms');
    expect(result.cmsStatus.connected).toBe(false);
    expect(result.cmsStatus.degradedReason).toContain('timed out');
  });
});
