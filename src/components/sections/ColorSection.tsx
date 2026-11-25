import { useState } from 'react';
import { Copy } from 'lucide-react';
import type { BrandConfig, ColorFormat } from '../../types/brand';
import { copyText } from '../../adapters/browserExport';
import {
  evaluateWcag,
  formatColorValue,
  getContrastRatio,
  getReadableInk,
  hexToCmyk,
  hexToRgb,
} from '../../utils/colorMath';

interface ColorSectionProps {
  config: BrandConfig;
  onNotify: (msg: string) => void;
}

const FORMATS: ColorFormat[] = ['HEX', 'RGB', 'CMYK', 'HSL'];

export function ColorSection({ config, onNotify }: ColorSectionProps) {
  const [format, setFormat] = useState<ColorFormat>('HEX');

  const handleCopyColor = async (hex: string, label?: string) => {
    const formatted = formatColorValue(hex, format);
    const ok = await copyText(formatted);
    if (ok) {
      onNotify(`Copied ${label ? `${label} ` : ''}${formatted}`);
    }
  };

  return (
    <section
      id="colors"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
            Core palette
          </h2>
          <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            Click any swatch or shade strip to copy its value in your preferred format.
          </p>
        </div>

        {/* Format Switcher */}
        <div className="no-print inline-flex items-center rounded-lg border border-neutral-200 bg-neutral-50 p-0.5 dark:border-neutral-800 dark:bg-neutral-900">
          {FORMATS.map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => setFormat(fmt)}
              className={`rounded-md px-2.5 py-1 font-mono text-[11px] font-medium transition-colors ${
                format === fmt
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                  : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      {/* Swatch Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {config.colors.core.map((color) => {
          const rgb = hexToRgb(color.hex);
          const cmyk = hexToCmyk(color.hex);
          const activeVal = formatColorValue(color.hex, format);
          const ink = getReadableInk(color.hex);

          return (
            <div
              key={color.id}
              className={`squircle-lg group flex flex-col overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950 ${
                color.span === 2 ? 'sm:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => handleCopyColor(color.hex, color.name)}
                className="relative flex h-44 w-full flex-col justify-between p-4 text-left transition-transform active:scale-[0.995]"
                style={{ backgroundColor: color.hex, color: ink }}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-medium">{color.name}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2 py-0.5 font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100">
                    <Copy className="h-2.5 w-2.5" />
                    Copy {format}
                  </span>
                </div>
                <span className="font-mono text-xs opacity-80">{activeVal}</span>
              </button>

              {/* Optional shade ramp strip */}
              {color.shades && color.shades.length > 0 && (
                <div className="grid grid-cols-4 border-t border-neutral-200/80 dark:border-neutral-800">
                  {color.shades.map((shade) => (
                    <button
                      key={shade.label}
                      type="button"
                      onClick={() => handleCopyColor(shade.hex, `${color.name} ${shade.label}`)}
                      title={`${color.name} ${shade.label} (${shade.hex})`}
                      className="flex h-9 items-end justify-between px-2 py-1 text-left transition-opacity hover:opacity-85"
                      style={{
                        backgroundColor: shade.hex,
                        color: getReadableInk(shade.hex),
                      }}
                    >
                      <span className="font-mono text-[9px] opacity-80">{shade.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Color token breakdown */}
              <div className="flex-1 space-y-2.5 p-4 text-[11px]">
                <div className="grid grid-cols-3 gap-2 font-mono text-neutral-500 dark:text-neutral-400">
                  <div>
                    <span className="block text-[9px] text-neutral-400">HEX</span>
                    <span className="text-neutral-900 dark:text-neutral-100">{color.hex}</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-neutral-400">RGB</span>
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {rgb.r}, {rgb.g}, {rgb.b}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-neutral-400">CMYK</span>
                    <span className="text-neutral-900 dark:text-neutral-100">
                      {cmyk.c},{cmyk.m},{cmyk.y},{cmyk.k}
                    </span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                  {color.usage}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Color Proportions Bar */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <h3 className="mb-4 text-lg font-medium text-neutral-950 dark:text-white">
          Color proportions
        </h3>
        <div className="squircle-lg flex h-44 w-full overflow-hidden border border-neutral-200 dark:border-neutral-800">
          {config.colors.core.map((color) => {
            const ink = getReadableInk(color.hex);
            return (
              <button
                key={color.id}
                type="button"
                onClick={() => handleCopyColor(color.hex, color.name)}
                style={{
                  width: `${Math.max(color.proportion, 6)}%`,
                  backgroundColor: color.hex,
                  color: ink,
                }}
                className="flex flex-col justify-between border-r border-black/10 p-3 text-left transition-all last:border-r-0 hover:brightness-105"
              >
                <span className="truncate text-[11px] font-medium">{color.name}</span>
                <span className="font-mono text-lg font-medium sm:text-2xl">
                  {color.proportion}%
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
          {config.colors.proportionRationale}
        </p>
      </div>

      {/* Readable Combinations — Live WCAG 2.1 Contrast Matrix */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-lg font-medium text-neutral-950 dark:text-white">
            Readable combinations
          </h3>
          <span className="font-mono text-[11px] text-neutral-400">
            Live WCAG 2.1 Contrast Check
          </span>
        </div>

        <div className="squircle-lg divide-y divide-neutral-200 border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
          {config.colors.contrastPairs.map((pair) => {
            const fg =
              config.colors.core.find((c) => c.id === pair.fgColorId) ?? config.colors.core[0];
            const bg =
              config.colors.core.find((c) => c.id === pair.bgColorId) ?? config.colors.core[1];
            const ratio = getContrastRatio(fg.hex, bg.hex);
            const wcag = evaluateWcag(ratio);

            return (
              <div
                key={pair.id}
                className="flex items-center justify-between gap-4 px-5 py-3.5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="squircle-sm flex h-10 w-10 shrink-0 items-center justify-center border border-black/10 text-sm font-medium"
                    style={{ backgroundColor: bg.hex, color: fg.hex }}
                  >
                    Aa
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                      {pair.label}
                    </p>
                    <p className="font-mono text-[11px] text-neutral-400">
                      {fg.hex} on {bg.hex}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    {ratio}:1
                  </span>
                  <span
                    className={`inline-flex min-w-[54px] justify-center rounded px-2 py-0.5 font-mono text-[10px] font-semibold uppercase ${
                      wcag.passNormal
                        ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                        : 'border border-neutral-300 text-neutral-400 dark:border-neutral-700'
                    }`}
                  >
                    {wcag.passNormal ? 'Pass' : 'Fail'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
