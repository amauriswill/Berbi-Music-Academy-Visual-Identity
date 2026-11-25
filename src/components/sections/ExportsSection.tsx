import { Copy, Download, FileCode, FileDown, FileText } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import {
  buildAvatarSvg,
  buildIsotypeSvg,
  buildLogotypeSvg,
  copyText,
  downloadBlob,
  downloadText,
  generateCssTokens,
  generateJsonTokens,
  generateLlmsBrandSpec,
  svgToPngBlob,
} from '../../utils/assetExport';
import { getReadableInk } from '../../utils/colorMath';
import { AssetActionBar } from '../brand/AssetActionBar';
import { BrandLockup, BrandSymbol } from '../brand/BrandMark';

interface ExportsSectionProps {
  config: BrandConfig;
  onNotify: (msg: string) => void;
  onCopyForFigma: () => void;
  onPrintPdf: () => void;
}

export function ExportsSection({
  config,
  onNotify,
  onCopyForFigma,
  onPrintPdf,
}: ExportsSectionProps) {
  const slug = config.brandName.toLowerCase().replace(/\s+/g, '-');

  const faviconTargets = [
    { label: 'Favicon SVG', ext: 'svg' as const, size: 64 },
    { label: 'Favicon PNG 32px', ext: 'png' as const, size: 32 },
    { label: 'Favicon PNG 64px', ext: 'png' as const, size: 64 },
    { label: 'Apple Icon 180px', ext: 'png' as const, size: 180 },
    { label: 'PWA Icon 192px', ext: 'png' as const, size: 192 },
    { label: 'PWA Icon 512px', ext: 'png' as const, size: 512 },
  ];

  const primary = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
  const primaryInk = getReadableInk(primary.hex);

  const handleFaviconDownload = async (label: string, ext: 'svg' | 'png', size: number) => {
    const svg = buildAvatarSvg(config.mark.symbolId, primaryInk, primary.hex, size);
    const filename = `${slug}-${label.toLowerCase().replace(/\s+/g, '-')}.${ext}`;
    if (ext === 'svg') {
      downloadText(svg, filename, 'image/svg+xml');
    } else {
      const blob = await svgToPngBlob(svg, size, size);
      downloadBlob(blob, filename);
    }
    onNotify(`Downloaded ${filename}`);
  };

  return (
    <section
      id="exports"
      className="scroll-mt-8 border-t border-neutral-200 pb-20 pt-14 dark:border-neutral-800"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
            Export assets
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            Production SVGs, PNGs, favicons, design tokens, and AI-readable brand specs.
          </p>
        </div>

        {/* Top Hub Action Buttons (Opsis-inspired) */}
        <div className="no-print flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              downloadText(generateCssTokens(config), `${slug}-tokens.css`, 'text/css');
              onNotify(`Downloaded ${slug}-tokens.css`);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <FileCode className="h-3.5 w-3.5" />
            CSS Tokens
          </button>

          <button
            type="button"
            onClick={() => {
              downloadText(generateJsonTokens(config), `${slug}-tokens.json`, 'application/json');
              onNotify(`Downloaded ${slug}-tokens.json`);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <Download className="h-3.5 w-3.5" />
            JSON Tokens
          </button>

          <button
            type="button"
            onClick={() => {
              downloadText(generateLlmsBrandSpec(config), `llms-${slug}.txt`, 'text/plain');
              onNotify(`Downloaded llms-${slug}.txt`);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <FileText className="h-3.5 w-3.5" />
            llms.txt
          </button>

          <button
            type="button"
            onClick={onCopyForFigma}
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy for Figma
          </button>

          <button
            type="button"
            onClick={onPrintPdf}
            className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <FileDown className="h-3.5 w-3.5" />
            PDF Guidelines
          </button>
        </div>
      </div>

      {/* Isotype Grid */}
      <div className="space-y-10">
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-950 dark:text-white">Isotype</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {config.colors.core.map((color) => {
              const fg = color.hex === '#FFFFFF' ? '#111111' : color.hex;
              const bg = color.hex === '#FFFFFF' ? '#111111' : '#FFFFFF';
              const displayFg = color.hex === '#FFFFFF' ? '#FFFFFF' : fg;
              const svg = buildIsotypeSvg(config.mark.symbolId, displayFg);
              return (
                <div key={`iso-${color.id}`} className="space-y-1.5">
                  <div
                    className="group relative flex h-36 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800"
                    style={{ backgroundColor: bg }}
                  >
                    <div className="absolute right-2 top-2">
                      <AssetActionBar
                        svgContent={svg}
                        fileBaseName={`${slug}-isotype-${color.id}`}
                        pngSize={{ width: 512, height: 512 }}
                        onNotify={onNotify}
                      />
                    </div>
                    <BrandSymbol symbolId={config.mark.symbolId} color={displayFg} size={52} />
                  </div>
                  <p className="text-[11px] text-neutral-500">{color.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Logotype Grid */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-950 dark:text-white">Logotype</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {config.colors.core.map((color) => {
              const isLightBg = getReadableInk(color.hex) === '#111111';
              const bg = isLightBg ? color.hex : '#FFFFFF';
              const fg = isLightBg ? primary.hex : color.hex;
              const svg = buildLogotypeSvg(
                config.mark.symbolId,
                config.brandName,
                fg,
                undefined,
                config.typography.display.cssFamily
              );
              return (
                <div key={`logo-${color.id}`} className="space-y-1.5">
                  <div
                    className="group relative flex h-32 items-center justify-center rounded-xl border border-neutral-200 px-3 dark:border-neutral-800"
                    style={{ backgroundColor: bg }}
                  >
                    <div className="absolute right-2 top-2">
                      <AssetActionBar
                        svgContent={svg}
                        fileBaseName={`${slug}-logotype-${color.id}`}
                        pngSize={{ width: 1000, height: 280 }}
                        onNotify={onNotify}
                      />
                    </div>
                    <BrandLockup
                      symbolId={config.mark.symbolId}
                      brandName={config.brandName}
                      color={fg}
                      sizePx={18}
                      displayFontCss={config.typography.display.cssFamily}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">{color.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Pictures */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-950 dark:text-white">
            Profile pictures
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {config.colors.core.map((color) => {
              const fg = getReadableInk(color.hex);
              const svg = buildAvatarSvg(config.mark.symbolId, fg, color.hex, 512);
              return (
                <div key={`av-${color.id}`} className="space-y-1.5">
                  <div
                    className="group relative flex h-36 items-center justify-center rounded-xl border border-neutral-200 dark:border-neutral-800"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute right-2 top-2">
                      <AssetActionBar
                        svgContent={svg}
                        fileBaseName={`${slug}-avatar-${color.id}`}
                        pngSize={{ width: 512, height: 512 }}
                        onNotify={onNotify}
                      />
                    </div>
                    <BrandSymbol symbolId={config.mark.symbolId} color={fg} size={52} />
                  </div>
                  <p className="text-[11px] text-neutral-500">{color.name}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Favicons */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-950 dark:text-white">Favicons</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {faviconTargets.map((fav) => (
              <div key={fav.label} className="space-y-1.5">
                <button
                  type="button"
                  onClick={() => handleFaviconDownload(fav.label, fav.ext, fav.size)}
                  className="group relative flex h-32 w-full items-center justify-center rounded-xl border border-neutral-200 transition-transform hover:scale-[1.01] dark:border-neutral-800"
                  style={{ backgroundColor: primary.hex }}
                >
                  <BrandSymbol symbolId={config.mark.symbolId} color={primaryInk} size={46} />
                  <span className="no-print absolute bottom-2 right-2 inline-flex items-center gap-1 rounded bg-white/90 px-1.5 py-0.5 font-mono text-[9px] font-semibold text-neutral-900 opacity-0 transition-opacity group-hover:opacity-100">
                    <Download className="h-2.5 w-2.5" />
                    {fav.ext.toUpperCase()}
                  </span>
                </button>
                <p className="text-[11px] text-neutral-500">{fav.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Typography Quick Cards */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-neutral-950 dark:text-white">Typography</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {[config.typography.display, config.typography.ui].map((font) => (
              <button
                key={font.id}
                type="button"
                onClick={async () => {
                  await copyText(font.cssFamily);
                  onNotify(`Copied CSS font-family for ${font.name}`);
                }}
                className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50/70 px-5 py-4 text-left transition-colors hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xl leading-none text-neutral-950 dark:text-white"
                    style={{ fontFamily: font.cssFamily }}
                  >
                    Aa
                  </span>
                  <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                    {font.name}
                  </span>
                </div>
                <Copy className="h-3.5 w-3.5 text-neutral-400" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Attribution Footer */}
      <footer className="mt-16 border-t border-neutral-200 pt-8 text-center dark:border-neutral-800">
        <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          {config.brandName} Brand System · {config.attribution.studioName} ({config.attribution.year})
        </p>
        <p className="mx-auto mt-1.5 max-w-lg text-[11px] leading-relaxed text-neutral-400">
          {config.attribution.legalNote}
        </p>
      </footer>
    </section>
  );
}
