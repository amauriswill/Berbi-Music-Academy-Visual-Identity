import { useState } from 'react';
import type { BrandConfig } from '../../types/brand';
import { buildLogotypeSvg } from '../../utils/assetExport';
import { getReadableInk } from '../../utils/colorMath';
import { AssetActionBar } from '../brand/AssetActionBar';
import { BrandLockup } from '../brand/BrandMark';

interface MarksSectionProps {
  config: BrandConfig;
  onNotify: (msg: string) => void;
}

export function MarksSection({ config, onNotify }: MarksSectionProps) {
  const primary = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
  const secondary =
    config.colors.core.find((c) => c.role === 'secondary') ?? config.colors.core[1];
  const surface = config.colors.core.find((c) => c.role === 'surface') ?? config.colors.core[2];

  const [showcaseSurface, setShowcaseSurface] = useState<'paper' | 'dark' | 'brand'>('paper');

  const surfaceMap = {
    paper: { bg: surface.hex, fg: primary.hex, label: surface.name },
    dark: { bg: '#0E0F0E', fg: '#FFFFFF', label: 'Dark' },
    brand: { bg: primary.hex, fg: getReadableInk(primary.hex), label: primary.name },
  }[showcaseSurface];

  const colorVersions = [
    {
      id: 'light-brand',
      title: `${primary.name} on ${surface.name}`,
      bg: surface.hex,
      fg: primary.hex,
      caption: `Primary usage on warm ${surface.name} backgrounds for editorial layouts and documentation.`,
    },
    {
      id: 'dark-brand',
      title: `White on ${primary.name}`,
      bg: primary.hex,
      fg: getReadableInk(primary.hex),
      caption: `Use on ${primary.name} and ${secondary.name} campaign panels for crisp contrast.`,
    },
    {
      id: 'mono-light',
      title: 'Black on White',
      bg: '#FFFFFF',
      fg: '#0A0A0A',
      caption: 'Monochrome positive lockup for invoices, legal documents, and black-and-white print.',
    },
    {
      id: 'mono-dark',
      title: 'White on Black',
      bg: '#09090B',
      fg: '#FFFFFF',
      caption: 'Monochrome negative lockup for dark photography, stickers, and foil stamping.',
    },
  ];

  const activeShowcaseSvg = buildLogotypeSvg(
    config.mark.symbolId,
    config.brandName,
    surfaceMap.fg,
    undefined,
    config.typography.display.cssFamily
  );

  return (
    <section
      id="marks"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
            Marks
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {config.mark.description}
          </p>
        </div>
      </div>

      {/* Interactive Primary Lockup Showcase (Gleam-inspired surface toggle) */}
      <div className="group relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
        <div className="no-print flex items-center justify-between border-b border-neutral-200/80 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-900/70">
          <div className="flex items-center gap-1.5">
            {(['paper', 'dark', 'brand'] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setShowcaseSurface(mode)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                  showcaseSurface === mode
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                    : 'text-neutral-500 hover:bg-neutral-200/70 dark:text-neutral-400 dark:hover:bg-neutral-800'
                }`}
              >
                {mode === 'paper' ? surface.name : mode === 'brand' ? primary.name : 'Dark'}
              </button>
            ))}
          </div>

          <AssetActionBar
            svgContent={activeShowcaseSvg}
            fileBaseName={`${config.brandName.toLowerCase().replace(/\s+/g, '-')}-lockup-${showcaseSurface}`}
            pngSize={{ width: 1200, height: 340 }}
            onNotify={onNotify}
            alwaysVisible
          />
        </div>

        <div
          className="flex min-h-[240px] items-center justify-center p-10 transition-colors duration-300 sm:min-h-[280px]"
          style={{ backgroundColor: surfaceMap.bg, color: surfaceMap.fg }}
        >
          <BrandLockup
            symbolId={config.mark.symbolId}
            brandName={config.brandName}
            color={surfaceMap.fg}
            sizePx={54}
            displayFontCss={config.typography.display.cssFamily}
          />
        </div>
      </div>

      {/* Color Versions Grid (Opsis-inspired side-by-side cards) */}
      <div className="mt-12">
        <h3 className="mb-4 text-base font-medium text-neutral-950 dark:text-white">
          Color versions
        </h3>
        <div className="grid gap-5 md:grid-cols-2">
          {colorVersions.map((ver) => {
            const svg = buildLogotypeSvg(
              config.mark.symbolId,
              config.brandName,
              ver.fg,
              undefined,
              config.typography.display.cssFamily
            );
            return (
              <div key={ver.id} className="space-y-2.5">
                <div
                  className="group relative flex h-56 items-center justify-center rounded-xl border border-neutral-200/80 p-8 dark:border-neutral-800"
                  style={{ backgroundColor: ver.bg, color: ver.fg }}
                >
                  <div className="absolute right-3 top-3">
                    <AssetActionBar
                      svgContent={svg}
                      fileBaseName={`${config.brandName.toLowerCase().replace(/\s+/g, '-')}-${ver.id}`}
                      pngSize={{ width: 1000, height: 280 }}
                      onNotify={onNotify}
                    />
                  </div>
                  <BrandLockup
                    symbolId={config.mark.symbolId}
                    brandName={config.brandName}
                    color={ver.fg}
                    sizePx={34}
                    displayFontCss={config.typography.display.cssFamily}
                  />
                </div>
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  {ver.title}
                </p>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {ver.caption}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Clearspace & Minimum Size Spec */}
      <div className="mt-12 rounded-xl border border-neutral-200 bg-neutral-50/70 p-6 sm:p-8 dark:border-neutral-800 dark:bg-neutral-900/40">
        <div className="grid items-center gap-8 md:grid-cols-[1.3fr_1fr]">
          <div className="flex items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-white p-10 dark:border-neutral-700 dark:bg-neutral-950">
            <div className="relative border border-dashed border-emerald-500/70 px-8 py-6">
              <span className="absolute -top-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                1x
              </span>
              <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                1x
              </span>
              <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                1x
              </span>
              <span className="absolute -right-6 top-1/2 -translate-y-1/2 font-mono text-[10px] text-emerald-600 dark:text-emerald-400">
                1x
              </span>
              <BrandLockup
                symbolId={config.mark.symbolId}
                brandName={config.brandName}
                color="currentColor"
                sizePx={30}
                displayFontCss={config.typography.display.cssFamily}
                className="text-neutral-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-neutral-400">
              Clearspace & Minimums
            </p>
            <h4 className="text-base font-medium text-neutral-950 dark:text-white">
              Give the lockup room to breathe
            </h4>
            <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300">
              Always keep a minimum clearspace of{' '}
              <span className="font-medium text-neutral-900 dark:text-white">
                {config.mark.clearspaceUnitLabel}
              </span>{' '}
              free of other typography, borders, or imagery.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
                <span className="block font-mono text-[10px] text-neutral-400">DIGITAL MIN</span>
                <span className="mt-1 block text-sm font-semibold">
                  {config.mark.minDigitalPx} px
                </span>
              </div>
              <div className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
                <span className="block font-mono text-[10px] text-neutral-400">PRINT MIN</span>
                <span className="mt-1 block text-sm font-semibold">
                  {config.mark.minPrintMm} mm
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
