import { Download, RotateCcw, X } from 'lucide-react';
import type { BrandConfig, MarkSymbolId } from '../../types/brand';
import { BERBI_PRESET, EDITORIAL_PRESET, EXPRESSIVE_PRESET } from '../../config/presets';
import { downloadText } from '../../utils/assetExport';
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
  if (!open) return null;

  const updateColorHex = (colorId: string, hex: string) => {
    onChange({
      ...config,
      colors: {
        ...config.colors,
        core: config.colors.core.map((c) => (c.id === colorId ? { ...c, hex } : c)),
      },
    });
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
    <div className="no-print fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-xs" onClick={onClose}>
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

          {/* Preset switcher */}
          <div>
            <label className="mb-2 block text-xs font-medium text-neutral-500">
              Starting Preset
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => applyPreset('berbi')}
                className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
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
                className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
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
                className={`rounded-lg border px-3 py-2.5 text-left transition-all ${
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
                      className={`flex flex-col items-center gap-1.5 rounded-lg border py-2.5 text-[11px] transition-all ${
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
              {config.colors.core.map((color) => (
                <div
                  key={color.id}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 px-3 py-2 dark:border-neutral-800"
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="color"
                      value={color.hex}
                      onChange={(e) => updateColorHex(color.id, e.target.value.toUpperCase())}
                      className="h-7 w-7 cursor-pointer rounded border border-neutral-300 bg-transparent p-0"
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
                  <input
                    type="text"
                    value={color.hex}
                    onChange={(e) => updateColorHex(color.id, e.target.value)}
                    className="w-24 rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200"
                  />
                </div>
              ))}
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
