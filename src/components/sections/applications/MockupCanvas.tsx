import type { BrandApplication, BrandConfig } from '../../../types/brand';
import { getReadableInk } from '../../../utils/colorMath';
import { BrandLockup, BrandSymbol } from '../../brand/BrandMark';

interface MockupCanvasProps {
  app: BrandApplication;
  config: BrandConfig;
}

export function MockupCanvas({ app, config }: MockupCanvasProps) {
  if (app.imageUrl) {
    return (
      <img
        src={app.imageUrl}
        alt={app.title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />
    );
  }

  const primary = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
  const secondary =
    config.colors.core.find((c) => c.role === 'secondary') ?? config.colors.core[1];
  const surface = config.colors.core.find((c) => c.role === 'surface') ?? config.colors.core[2];
  const accent = config.colors.core.find((c) => c.role === 'accent') ?? primary;

  const primaryInk = getReadableInk(primary.hex);
  const secondaryInk = getReadableInk(secondary.hex);
  const surfaceInk = getReadableInk(surface.hex);

  switch (app.mockupKind) {
    case 'transit':
      return (
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"
          style={{
            background: `linear-gradient(180deg, ${surface.hex} 0%, #D9D3C7 100%)`,
          }}
        >
          {/* Stylized urban transit vehicle body */}
          <div
            className="flex h-48 w-full max-w-2xl overflow-hidden rounded-xl border border-black/15 shadow-xl"
            style={{ backgroundColor: primary.hex, color: primaryInk }}
          >
            <div className="flex w-1/3 flex-col justify-between border-r border-white/10 p-5">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                Line 04 · City
              </span>
              <div className="h-16 rounded-md bg-white/10" />
              <BrandLockup
                symbolId={config.mark.symbolId}
                brandName={config.brandName}
                color={primaryInk}
                sizePx={16}
                displayFontCss={config.typography.display.cssFamily}
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div className="flex gap-3">
                <div className="h-20 flex-1 rounded-md bg-neutral-950/60" />
                <div className="h-20 flex-1 rounded-md bg-neutral-950/60" />
              </div>
              <div className="flex items-end justify-between">
                <p
                  className="max-w-xs text-base leading-snug"
                  style={{ fontFamily: config.typography.display.cssFamily }}
                >
                  {config.tagline}
                </p>
                <span className="font-mono text-[10px] opacity-60">01 / OOH</span>
              </div>
            </div>
          </div>
        </div>
      );

    case 'stationery':
      return (
        <div
          className="grid h-full w-full grid-cols-1 gap-4 p-8 sm:grid-cols-2"
          style={{ backgroundColor: '#161513' }}
        >
          {/* Hardcover Linen Book */}
          <div
            className="flex flex-col justify-between rounded-lg p-6 shadow-2xl"
            style={{ backgroundColor: primary.hex, color: primaryInk }}
          >
            <div className="border-l-2 border-white/20 pl-4">
              <BrandLockup
                symbolId={config.mark.symbolId}
                brandName={config.brandName}
                color={primaryInk}
                sizePx={22}
                displayFontCss={config.typography.display.cssFamily}
              />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-55">
              Annual Folio · Hardcover
            </span>
          </div>

          {/* Stacked Business Cards */}
          <div className="flex flex-col justify-center gap-3">
            <div
              className="flex flex-col items-center justify-center rounded-lg px-6 py-7 shadow-xl"
              style={{ backgroundColor: secondary.hex, color: secondaryInk }}
            >
              <BrandSymbol symbolId={config.mark.symbolId} color={secondaryInk} size={22} />
              <span
                className="mt-2 text-lg"
                style={{ fontFamily: config.typography.display.cssFamily }}
              >
                {config.brandName}
              </span>
            </div>
            <div
              className="flex items-center justify-between rounded-lg px-5 py-4 shadow-xl"
              style={{ backgroundColor: surface.hex, color: surfaceInk }}
            >
              <span className="font-mono text-[10px] uppercase tracking-wider opacity-75">
                hello@{config.brandName.toLowerCase().replace(/\s+/g, '')}.com
              </span>
              <BrandSymbol symbolId={config.mark.symbolId} color={primary.hex} size={16} />
            </div>
          </div>
        </div>
      );

    case 'billboard':
      return (
        <div className="grid h-full w-full grid-cols-3 gap-4 bg-neutral-200 p-8 dark:bg-neutral-900">
          <div
            className="flex flex-col justify-between rounded-lg p-5 shadow-md"
            style={{ backgroundColor: surface.hex, color: surfaceInk }}
          >
            <p
              className="text-lg leading-tight sm:text-xl"
              style={{ fontFamily: config.typography.display.cssFamily }}
            >
              Built for clarity from day one.
            </p>
            <BrandSymbol symbolId={config.mark.symbolId} color={primary.hex} size={34} />
          </div>

          <div
            className="flex flex-col items-center justify-center rounded-lg p-5 shadow-md"
            style={{ backgroundColor: primary.hex, color: primaryInk }}
          >
            <BrandLockup
              symbolId={config.mark.symbolId}
              brandName={config.brandName}
              color={primaryInk}
              sizePx={20}
              displayFontCss={config.typography.display.cssFamily}
              stacked
            />
          </div>

          <div
            className="flex flex-col justify-between rounded-lg p-5 shadow-md"
            style={{ backgroundColor: secondary.hex, color: secondaryInk }}
          >
            <p
              className="text-lg leading-tight sm:text-xl"
              style={{ fontFamily: config.typography.display.cssFamily }}
            >
              Growing businesses are built in layers.
            </p>
            <span className="font-mono text-[10px] opacity-70">{config.brandName}</span>
          </div>
        </div>
      );

    case 'signage':
      return (
        <div
          className="relative flex h-full w-full items-center justify-between overflow-hidden p-8"
          style={{ backgroundColor: '#1E1D1B' }}
        >
          <div
            className="flex h-full w-1/2 flex-col justify-between rounded-lg p-6"
            style={{ backgroundColor: primary.hex, color: primaryInk }}
          >
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
              Architectural Blade
            </span>
            <p
              className="text-xl leading-snug"
              style={{ fontFamily: config.typography.display.cssFamily }}
            >
              {config.tagline}
            </p>
          </div>

          <div
            className="ml-6 flex flex-1 items-center justify-center rounded-lg border border-white/10 px-6 py-8 shadow-2xl"
            style={{ backgroundColor: secondary.hex, color: secondaryInk }}
          >
            <BrandLockup
              symbolId={config.mark.symbolId}
              brandName={config.brandName}
              color={secondaryInk}
              sizePx={26}
              displayFontCss={config.typography.display.cssFamily}
            />
          </div>
        </div>
      );

    case 'flag':
      return (
        <div
          className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"
          style={{
            background: `linear-gradient(160deg, #98ACB8 0%, #D9CFC1 65%, #847B6E 100%)`,
          }}
        >
          <div className="flex items-start gap-2">
            <div className="h-52 w-1.5 rounded-full bg-neutral-800 shadow" />
            <div
              className="flex h-36 w-72 items-center justify-center rounded-r-md shadow-2xl"
              style={{ backgroundColor: primary.hex, color: primaryInk }}
            >
              <BrandLockup
                symbolId={config.mark.symbolId}
                brandName={config.brandName}
                color={primaryInk}
                sizePx={24}
                displayFontCss={config.typography.display.cssFamily}
              />
            </div>
          </div>
        </div>
      );

    case 'tote':
    case 'mobile':
      return (
        <div
          className="grid h-full w-full grid-cols-2 gap-6 p-8"
          style={{ backgroundColor: surface.hex }}
        >
          {/* Canvas Tote Bag */}
          <div className="flex flex-col items-center justify-center">
            <div className="h-8 w-20 rounded-t-full border-4 border-b-0 border-neutral-800/70" />
            <div
              className="flex h-36 w-36 flex-col items-center justify-center rounded-b-lg p-4 shadow-lg"
              style={{ backgroundColor: primary.hex, color: primaryInk }}
            >
              <BrandSymbol
                symbolId={config.mark.symbolId}
                color={accent.hex === primary.hex ? primaryInk : accent.hex}
                size={34}
              />
              <span
                className="mt-2 text-sm"
                style={{ fontFamily: config.typography.display.cssFamily }}
              >
                {config.brandName}
              </span>
            </div>
          </div>

          {/* Mobile App Screen */}
          <div className="flex items-center justify-center">
            <div className="flex h-44 w-28 flex-col justify-between rounded-2xl border-2 border-neutral-900 bg-white p-3 shadow-lg">
              <div className="flex items-center justify-between">
                <BrandSymbol symbolId={config.mark.symbolId} color={primary.hex} size={14} />
                <span className="h-1.5 w-6 rounded-full bg-neutral-200" />
              </div>
              <div
                className="rounded-lg p-2.5"
                style={{ backgroundColor: primary.hex, color: primaryInk }}
              >
                <p className="text-[10px] font-medium leading-tight">{config.brandName}</p>
                <p className="mt-1 text-[8px] opacity-75">System active</p>
              </div>
              <div className="space-y-1">
                <div className="h-2 w-full rounded bg-neutral-100" />
                <div className="h-2 w-2/3 rounded bg-neutral-100" />
              </div>
            </div>
          </div>
        </div>
      );
  }
}
