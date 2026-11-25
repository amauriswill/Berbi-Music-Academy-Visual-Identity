import { useState } from 'react';
import { Check, Copy, Download } from 'lucide-react';
import { copyText, downloadBlob, downloadText, svgToPngBlob } from '../../adapters/browserExport';

interface AssetActionBarProps {
  svgContent: string;
  fileBaseName: string;
  pngSize?: { width: number; height: number };
  onNotify: (msg: string) => void;
  alwaysVisible?: boolean;
}

export function AssetActionBar({
  svgContent,
  fileBaseName,
  pngSize = { width: 512, height: 512 },
  onNotify,
  alwaysVisible = false,
}: AssetActionBarProps) {
  const [format, setFormat] = useState<'SVG' | 'PNG'>('SVG');
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await copyText(svgContent);
    if (ok) {
      setCopied(true);
      onNotify(`Copied ${fileBaseName}.svg — paste into Figma`);
      setTimeout(() => setCopied(false), 1600);
    }
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (format === 'SVG') {
      downloadText(svgContent, `${fileBaseName}.svg`, 'image/svg+xml;charset=utf-8');
      onNotify(`Downloaded ${fileBaseName}.svg`);
    } else {
      const blob = await svgToPngBlob(svgContent, pngSize.width, pngSize.height);
      downloadBlob(blob, `${fileBaseName}.png`);
      onNotify(`Downloaded ${fileBaseName}.png (${pngSize.width}px)`);
    }
  };

  return (
    <div
      className={`no-print inline-flex items-center gap-0.5 rounded-md border border-neutral-200/80 bg-white/95 p-0.5 text-[11px] font-medium text-neutral-700 shadow-sm backdrop-blur transition-opacity dark:border-neutral-700 dark:bg-neutral-900/95 dark:text-neutral-200 ${
        alwaysVisible
          ? 'opacity-100'
          : 'opacity-0 group-hover:opacity-100 focus-within:opacity-100'
      }`}
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setFormat((prev) => (prev === 'SVG' ? 'PNG' : 'SVG'));
        }}
        title="Toggle download format (SVG / PNG)"
        className="rounded px-1.5 py-1 font-mono text-[10px] tracking-wide text-neutral-600 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        {format}
      </button>

      <button
        type="button"
        onClick={handleCopy}
        title="Copy SVG — paste directly into Figma"
        className="inline-flex items-center gap-1 rounded px-1.5 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        {copied ? (
          <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <Copy className="h-3 w-3" />
        )}
      </button>

      <button
        type="button"
        onClick={handleDownload}
        title={`Download as ${format}`}
        className="inline-flex items-center rounded px-1.5 py-1 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
      >
        <Download className="h-3 w-3" />
      </button>
    </div>
  );
}
