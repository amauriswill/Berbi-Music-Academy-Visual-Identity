import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { BrandApplication, BrandConfig } from '../../types/brand';
import { getReadableInk } from '../../utils/colorMath';
import { BrandLockup, BrandSymbol } from '../brand/BrandMark';

interface ApplicationsSectionProps {
  config: BrandConfig;
}

function MockupCanvas({
  app,
  config,
}: {
  app: BrandApplication;
  config: BrandConfig;
}) {
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
              <BrandSymbol symbolId={config.mark.symbolId} color={accent.hex === primary.hex ? primaryInk : accent.hex} size={34} />
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

export function ApplicationsSection({ config }: ApplicationsSectionProps) {
  const flatItems = useMemo(
    () => config.applications.sections.flatMap((s) => s.items),
    [config.applications.sections]
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % flatItems.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + flatItems.length) % flatItems.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, flatItems.length]);

  const activeItem = lightboxIndex !== null ? flatItems[lightboxIndex] : null;

  return (
    <section
      id="applications"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="space-y-14">
        {config.applications.sections.map((group) => (
          <div key={group.id}>
            <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
              {group.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {group.description}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {group.items.map((item) => {
                const idx = flatItems.findIndex((f) => f.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="squircle-lg group relative overflow-hidden border border-neutral-200 text-left transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
                  >
                    <div className="h-72 w-full">
                      <MockupCanvas app={item} config={config} />
                    </div>
                    <div className="no-print absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Expand className="h-3 w-3" />
                      Inspect
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
                      <div>
                        <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">{item.category}</p>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {String(idx + 1).padStart(2, '0')} / {String(flatItems.length).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal (Gleam + Opsis) */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="no-print fixed inset-0 z-50 flex flex-col justify-between bg-black/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="flex items-center justify-between text-white">
            <div>
              <p className="text-sm font-medium">{activeItem.title}</p>
              <p className="text-xs text-neutral-400">{activeItem.caption}</p>
            </div>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative mx-auto flex w-full max-w-4xl items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex - 1 + flatItems.length) % flatItems.length)
              }
              className="absolute -left-2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 sm:-left-12"
              aria-label="Previous mockup"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="squircle-lg h-[420px] w-full overflow-hidden border border-white/10 shadow-2xl">
              <MockupCanvas app={activeItem} config={config} />
            </div>

            <button
              type="button"
              onClick={() => setLightboxIndex((lightboxIndex + 1) % flatItems.length)}
              className="absolute -right-2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 sm:-right-12"
              aria-label="Next mockup"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="text-center font-mono text-xs text-neutral-400">
            {lightboxIndex + 1} / {flatItems.length}
          </div>
        </div>
      )}
    </section>
  );
}
