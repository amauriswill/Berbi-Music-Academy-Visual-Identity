import type { BrandConfig } from '../../types/brand';
import { getReadableInk } from '../../utils/colorMath';
import { BrandLockup, BrandSymbol } from '../brand/BrandMark';

interface FoundationSectionProps {
  config: BrandConfig;
}

const LOGOTYPE_SCALES = [72, 60, 48, 36, 30, 24];

export function FoundationSection({ config }: FoundationSectionProps) {
  const primaryColor = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
  const surfaceColor = config.colors.core.find((c) => c.role === 'surface') ?? config.colors.core[1];
  const heroBg = primaryColor.hex;
  const heroFg = getReadableInk(heroBg);

  return (
    <section id="foundation" className="scroll-mt-8 pb-16 pt-2">
      {/* Header Title (Opsis-inspired) */}
      <div className="mb-8">
        <h1
          className="text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl dark:text-white"
          style={{ fontFamily: config.typography.ui.cssFamily }}
        >
          {config.brandName} Guidelines
        </h1>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">{config.tagline}</p>
      </div>

      {/* Hero Cover Card (Gleam + Opsis fusion) */}
      <div
        className="relative overflow-hidden rounded-xl border border-black/10 p-8 sm:p-12"
        style={{ backgroundColor: heroBg, color: heroFg }}
      >
        {/* Oversized subtle watermark symbol */}
        <div
          className="pointer-events-none absolute -right-14 -top-10 opacity-[0.09] sm:-right-10 sm:-top-8"
          aria-hidden="true"
        >
          <BrandSymbol symbolId={config.mark.symbolId} color={heroFg} size={380} />
        </div>

        <div className="relative z-10 flex min-h-[260px] flex-col justify-between gap-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <BrandLockup
              symbolId={config.mark.symbolId}
              brandName={config.brandName}
              color={heroFg}
              sizePx={24}
              displayFontCss={config.typography.display.cssFamily}
            />
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] opacity-70">
              {config.updatedLabel}
            </span>
          </div>

          <div className="max-w-2xl">
            <p
              className="text-5xl leading-[0.95] tracking-tight sm:text-7xl"
              style={{ fontFamily: config.typography.display.cssFamily }}
            >
              Brand
              <br />
              Guidelines
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        {config.tagline} {config.heroSubtitle}
      </p>

      {/* Introduction & Narrative */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <h2 className="text-lg font-medium text-neutral-950 dark:text-white">Introduction</h2>

        <div
          className="mt-5 flex items-center justify-center rounded-xl border border-black/5 py-16 sm:py-20"
          style={{ backgroundColor: surfaceColor.hex, color: getReadableInk(surfaceColor.hex) }}
        >
          <BrandLockup
            symbolId={config.mark.symbolId}
            brandName={config.brandName}
            color={primaryColor.hex}
            sizePx={36}
            displayFontCss={config.typography.display.cssFamily}
          />
        </div>

        <div className="mt-6 max-w-2xl space-y-4 text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {config.storyParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>

      {/* Logotype Scale (Opsis-inspired specimen rows) */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-medium text-neutral-950 dark:text-white">Logotype scale</h2>
          <span className="font-mono text-[11px] text-neutral-400">
            Min digital: {config.mark.minDigitalPx}px · Min print: {config.mark.minPrintMm}mm
          </span>
        </div>

        <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
          {LOGOTYPE_SCALES.map((px) => (
            <div
              key={px}
              className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center sm:gap-10"
            >
              <span className="w-16 shrink-0 font-mono text-[11px] text-neutral-400">{px} px</span>
              <div className="min-w-0 overflow-hidden">
                <BrandLockup
                  symbolId={config.mark.symbolId}
                  brandName={config.brandName}
                  color="currentColor"
                  sizePx={px}
                  displayFontCss={config.typography.display.cssFamily}
                  className="text-neutral-950 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
