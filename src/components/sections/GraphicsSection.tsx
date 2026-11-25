import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import {
  buildGraphicShapeSvg,
  copyText,
  downloadText,
  getShapePathSvg,
} from '../../utils/assetExport';

interface GraphicsSectionProps {
  config: BrandConfig;
  onNotify: (msg: string) => void;
}

export function GraphicsSection({ config, onNotify }: GraphicsSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const resolveColor = (colorId: string): string => {
    const found = config.colors.core.find((c) => c.id === colorId);
    if (found) return found.hex;
    return config.colors.core[0]?.hex ?? '#131B16';
  };

  const handleCopyShape = async (id: string, name: string, svg: string) => {
    const ok = await copyText(svg);
    if (ok) {
      setCopiedId(id);
      onNotify(`Copied "${name}" SVG — paste into Figma`);
      setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
    }
  };

  return (
    <section
      id="graphics"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
          Brand shapes
        </h2>
        <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
          {config.graphics.summary}
        </p>
      </div>

      {/* Gleam-inspired 3x3 Click-to-Copy Graphic Elements Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {config.graphics.elements.map((el) => {
          const fillHex = resolveColor(el.colorId);
          const svgString = buildGraphicShapeSvg(el.shapeId, fillHex, 180);
          const isCopied = copiedId === el.id;

          return (
            <div
              key={el.id}
              onClick={() => handleCopyShape(el.id, el.name, svgString)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopyShape(el.id, el.name, svgString);
                }
              }}
              className="group relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50/70 p-6 transition-all hover:border-neutral-300 hover:bg-white dark:border-neutral-800 dark:bg-neutral-900/50 dark:hover:border-neutral-700 dark:hover:bg-neutral-900"
            >
              <div className="no-print absolute right-3 top-3 flex items-center gap-1">
                {isCopied ? (
                  <span className="inline-flex items-center gap-1 rounded-md bg-neutral-900 px-2 py-1 text-[10px] font-medium text-white dark:bg-white dark:text-neutral-950">
                    <Check className="h-3 w-3" />
                    Copied
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-md border border-neutral-200 bg-white px-2 py-1 text-[10px] font-medium text-neutral-600 opacity-0 transition-opacity group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                    <Copy className="h-3 w-3" />
                    Copy SVG
                  </span>
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadText(
                      svgString,
                      `${el.name.toLowerCase().replace(/\s+/g, '-')}.svg`,
                      'image/svg+xml'
                    );
                    onNotify(`Downloaded ${el.name}.svg`);
                  }}
                  title="Download SVG"
                  className="rounded-md border border-neutral-200 bg-white p-1 text-neutral-600 opacity-0 transition-opacity hover:bg-neutral-100 group-hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <Download className="h-3 w-3" />
                </button>
              </div>

              <svg
                width="104"
                height="104"
                viewBox="0 0 100 100"
                fill="none"
                className="transition-transform duration-300 group-hover:scale-105"
                dangerouslySetInnerHTML={{ __html: getShapePathSvg(el.shapeId, fillHex) }}
              />

              <div className="mt-3 text-center">
                <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                  {el.name}
                </p>
                <p className="text-[11px] text-neutral-400">{el.usage}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
