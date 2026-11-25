import { useEffect, useState } from 'react';
import { Download, RotateCcw, X } from 'lucide-react';
import { downloadText } from '../../adapters/browserExport';
import { BERBI_PRESET, EDITORIAL_PRESET, EXPRESSIVE_PRESET } from '../../config/presets';
import type { BrandConfig, MarkSymbolId } from '../../types/brand';
import { isValidHex, normalizeHex, sanitizeHex } from '../../utils/colorMath';
import { BrandSymbol } from '../brand/BrandMark';

interface BrandEditorDrawerProps {
  open: boolean;
  config: BrandConfig;
  onChange: (next: BrandConfig) => void;
  onClose: () => void;
  onNotify: (msg: string) => void;
}

const SYMBOLS: { id: MarkSymbolId; label: string }[] = [
  { id: 'berbi', label: 'Berbi Wave' },
  { id: 'solis', label: 'Solis Nodes' },
  { id: 'gleam', label: 'Gleam Spark' },
  { id: 'monolith', label: 'Monolith' },
  { id: 'kite', label: 'Kite Facet' },
];

export function BrandEditorDrawer({
  open,
  config,
  onChange,
  onClose,
  onNotify,
}: BrandEditorDrawerProps) {
  const [hexDrafts, setHexDrafts] = useState<Record<string, string>>(() =>
    Object.fromEntries(config.colors.core.map((c) => [c.id, c.hex]))
  );

  // Keep draft inputs aligned whenever preset or external color changes occur
  useEffect(() => {
    setHexDrafts(Object.fromEntries(config.colors.core.map((c) => [c.id, c.hex])));
  }, [config.id, config.colors.core]);

  // Close drawer cleanly on Escape key press
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const commitColorHex = (colorId: string, hex: string) => {
    const normalized = normalizeHex(hex);
    onChange({
      ...config,
      colors: {
        ...config.colors,
        core: config.colors.core.map((c) => (c.id === colorId ? { ...c, hex: normalized } : c)),
      },
    });
  };

  const handleHexTextChange = (colorId: string, rawValue: string) => {
    setHexDrafts((prev) => ({ ...prev, [colorId]: rawValue }));
    if (isValidHex(rawValue)) {
      commitColorHex(colorId, rawValue);
    }
  };

  const handleHexBlur = (colorId: string, fallbackHex: string) => {
    const draft = hexDrafts[colorId] ?? fallbackHex;
    if (isValidHex(draft)) {
      const normalized = normalizeHex(draft);
      setHexDrafts((prev) => ({ ...prev, [colorId]: normalized }));
    } else {
      setHexDrafts((prev) => ({ ...prev, [colorId]: fallbackHex }));
    }
  };

  const applyPreset = (preset: 'berbi' | 'editorial' | 'expressive') => {
    const target =
      preset === 'berbi'
        ? BERBI_PRESET
        : preset === 'editorial'
        ? EDITORIAL_PRESET
        : EXPRESSIVE_PRESET;
    onChange(structuredClone(target));
    onNotify(`Switched to "${target.brandName}" (${preset}) preset`);
  };

  const handleExportConfig = () => {
    downloadText(
      JSON.stringify(config, null, 2),
      `${config.brandName.toLowerCase().replace(/\s+/g, '-')}-brand.config.json`,
      'application/json'
    );
    onNotify('Downloaded brand.config.json');
  };

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Customize Brandbook"
        className="flex h-full w-full max-w-md flex-col justify-between overflow-y-auto border-l border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex items-start justify-between border-b border-neutral-200 pb-4 dark:border-neutral-800">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                Live Template Studio
              </p>
              <h2 className="mt-1 text-lg font-semibold text-neutral-950 dark:text-white">
                Customize Brandbook
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="-mr-1.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Close editor"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="squircle-md border border-neutral-200 bg-neutral-50/80 px-3.5 py-2.5 text-[11.5px] leading-relaxed text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
            Local preview sandbox — changes live in this browser session. Export{' '}
            <code className="font-mono text-[10.5px]">brand.config.json</code> below or manage
            persisted CMS content in{' '}
            <a
              href="/_emdash/admin/"
              className="font-medium text-neutral-950 underline underline-offset-2 dark:text-white"
            >
              /_emdash/admin/
            </a>
            .
          </div>

          {/* Preset switcher */}
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-500">
              Starting Preset
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => applyPreset('berbi')}
                className={`squircle-md border px-3 py-2.5 text-left transition-all ${
                  config.preset === 'berbi'
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800'
                }`}
              >
                <span className="block text-xs font-semibold">Berbi Academy</span>
                <span className="block text-[11px] opacity-70">Musical / Conservatory</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('editorial')}
                className={`squircle-md border px-3 py-2.5 text-left transition-all ${
                  config.preset === 'editorial'
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800'
                }`}
              >
                <span className="block text-xs font-semibold">Editorial Minimal</span>
                <span className="block text-[11px] opacity-70">Opsis / Swiss Serif</span>
              </button>
              <button
                type="button"
                onClick={() => applyPreset('expressive')}
                className={`squircle-md border px-3 py-2.5 text-left transition-all ${
                  config.preset === 'expressive'
                    ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                    : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800'
                }`}
              >
                <span className="block text-xs font-semibold">Expressive Studio</span>
                <span className="block text-[11px] opacity-70">Gleam / Geometric</span>
              </button>
            </div>
          </div>

          {/* Corner Geometry Toggle (Squircle G2 vs Round G1) */}
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-500">
              Corner Geometry
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(
                [
                  { id: 'squircle', title: 'Squircle (G2)', sub: 'Continuous superellipse' },
                  { id: 'round', title: 'Round (G1)', sub: 'Standard circular arc' },
                ] as const
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onChange({ ...config, cornerStyle: opt.id })}
                  className={`squircle-md border px-3 py-2 text-left transition-all ${
                    config.cornerStyle === opt.id
                      ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-950'
                      : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800'
                  }`}
                >
                  <span className="block text-xs font-semibold">{opt.title}</span>
                  <span className="block text-[10.5px] opacity-70">{opt.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brand identity fields */}
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                Brand Name
              </label>
              <input
                type="text"
                value={config.brandName}
                onChange={(e) => onChange({ ...config, brandName: e.target.value })}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-500">
                Tagline
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => onChange({ ...config, tagline: e.target.value })}
                className="w-full rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-900 focus:outline-none dark:border-neutral-800 dark:bg-neutral-900 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-neutral-500">
                Symbol Geometry
              </label>
              <div className="grid grid-cols-4 gap-2">
                {SYMBOLS.map((sym) => {
                  const selected = config.mark.symbolId === sym.id;
                  return (
                    <button
                      key={sym.id}
                      type="button"
                      onClick={() =>
                        onChange({
                          ...config,
                          mark: { ...config.mark, symbolId: sym.id },
                        })
                      }
                      className={`squircle-md flex flex-col items-center gap-1.5 border py-2.5 text-[11px] transition-all ${
                        selected
                          ? 'border-neutral-900 bg-neutral-100 font-semibold text-neutral-950 dark:border-white dark:bg-neutral-800 dark:text-white'
                          : 'border-neutral-200 text-neutral-500 hover:border-neutral-300 dark:border-neutral-800'
                      }`}
                    >
                      <BrandSymbol symbolId={sym.id} size={22} />
                      <span>{sym.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Live Color Pickers */}
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-500">
              Palette Colors (Updates Swatches, WCAG & Mockups)
            </label>
            <div className="space-y-2">
              {config.colors.core.map((color) => {
                const draft = hexDrafts[color.id] ?? color.hex;
                const invalid = !isValidHex(draft);

                return (
                  <div
                    key={color.id}
                    className="squircle-md flex items-center justify-between border border-neutral-200 px-3 py-2 dark:border-neutral-800"
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={sanitizeHex(color.hex)}
                        onChange={(e) => {
                          const normalized = normalizeHex(e.target.value);
                          setHexDrafts((prev) => ({ ...prev, [color.id]: normalized }));
                          commitColorHex(color.id, normalized);
                        }}
                        className="h-7 w-7 cursor-pointer rounded border border-neutral-300 bg-transparent p-0"
                        aria-label={`${color.name} color picker`}
                      />
                      <div>
                        <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                          {color.name}
                        </p>
                        <p className="font-mono text-[10px] uppercase text-neutral-400">
                          {color.role} · {color.proportion}%
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <input
                        type="text"
                        value={draft}
                        onChange={(e) => handleHexTextChange(color.id, e.target.value)}
                        onBlur={() => handleHexBlur(color.id, color.hex)}
                        aria-invalid={invalid}
                        aria-label={`${color.name} hex code`}
                        className={`w-24 rounded border bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-700 focus:outline-none dark:bg-neutral-900 dark:text-neutral-200 ${
                          invalid
                            ? 'border-red-500 focus:border-red-500'
                            : 'border-neutral-200 focus:border-neutral-900 dark:border-neutral-800 dark:focus:border-neutral-400'
                        }`}
                      />
                      {invalid && (
                        <span className="mt-0.5 font-mono text-[9.5px] text-red-500">
                          Use #RRGGBB
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex items-center gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
          <button
            type="button"
            onClick={handleExportConfig}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-neutral-900 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-950 dark:hover:bg-neutral-200"
          >
            <Download className="h-3.5 w-3.5" />
            Export brand.config.json
          </button>
          <button
            type="button"
            onClick={() => applyPreset(config.preset)}
            title="Reset preset"
            className="inline-flex items-center justify-center rounded-lg border border-neutral-200 p-2 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </aside>
    </div>
  );
}
