import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Hash, Palette, Search, Sparkles, Type, X } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import { NAV_ITEMS } from './Sidebar';

interface CommandPaletteProps {
  open: boolean;
  config: BrandConfig;
  onClose: () => void;
  onNotify: (msg: string) => void;
  onOpenEditor: () => void;
}

interface SearchEntry {
  id: string;
  label: string;
  detail: string;
  sectionId: string;
  kind: 'section' | 'color' | 'font' | 'motion' | 'action';
}

export function CommandPalette({
  open,
  config,
  onClose,
  onNotify,
  onOpenEditor,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!open) {
      setQuery('');
    }
  }, [open]);

  const entries = useMemo<SearchEntry[]>(() => {
    const sections: SearchEntry[] = NAV_ITEMS.map((n) => ({
      id: `sec-${n.id}`,
      label: n.label,
      detail: n.group,
      sectionId: n.id,
      kind: 'section',
    }));

    const colors: SearchEntry[] = config.colors.core.map((c) => ({
      id: `col-${c.id}`,
      label: `${c.name} (${c.hex})`,
      detail: `${c.proportion}% · ${c.role}`,
      sectionId: 'colors',
      kind: 'color',
    }));

    const fonts: SearchEntry[] = [
      config.typography.display,
      config.typography.ui,
      config.typography.mono,
    ].map((f) => ({
      id: `font-${f.id}`,
      label: f.name,
      detail: f.roleLabel,
      sectionId: 'typography',
      kind: 'font',
    }));

    const motion: SearchEntry[] = config.motion.presets.map((m) => ({
      id: `mot-${m.id}`,
      label: m.name,
      detail: `${m.durationMs}ms · cubic-bezier(${m.curve.join(', ')})`,
      sectionId: 'motion',
      kind: 'motion',
    }));

    const actions: SearchEntry[] = [
      {
        id: 'act-customize',
        label: 'Customize brand colors, name & preset',
        detail: 'Open live Brand Editor',
        sectionId: '',
        kind: 'action',
      },
    ];

    return [...sections, ...colors, ...fonts, ...motion, ...actions];
  }, [config]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 12);
    return entries.filter(
      (e) =>
        e.label.toLowerCase().includes(q) || e.detail.toLowerCase().includes(q)
    );
  }, [entries, query]);

  if (!open) return null;

  const handleSelect = (entry: SearchEntry) => {
    onClose();
    if (entry.kind === 'action') {
      onOpenEditor();
      return;
    }
    const el = document.getElementById(entry.sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      onNotify(`Jumped to ${entry.label}`);
    }
  };

  const renderIcon = (kind: SearchEntry['kind']) => {
    switch (kind) {
      case 'color':
        return <Palette className="h-4 w-4 text-neutral-400" />;
      case 'font':
        return <Type className="h-4 w-4 text-neutral-400" />;
      case 'motion':
        return <Sparkles className="h-4 w-4 text-neutral-400" />;
      default:
        return <Hash className="h-4 w-4 text-neutral-400" />;
    }
  };

  // Shared horizontal geometry: 20px leading icon start (w-5 centered = 30px centre), 12px gap -> 52px label line
  return (
    <div
      className="no-print fixed inset-0 z-50 flex items-start justify-center bg-black/45 px-4 pt-24 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search brand guidelines"
        className="squircle-lg w-full max-w-lg overflow-hidden border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-950"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-neutral-200 px-5 py-3 dark:border-neutral-800">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
            <Search className="h-4 w-4 text-neutral-400" />
          </span>
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') onClose();
              if (e.key === 'Enter' && filtered[0]) handleSelect(filtered[0]);
            }}
            placeholder="Search sections, colors, fonts, motion tokens..."
            className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none dark:text-neutral-100"
          />
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close search"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <ul className="max-h-80 overflow-y-auto p-2">
          {filtered.length === 0 && (
            <li className="px-3 py-8 text-center text-xs text-neutral-400">
              No matching tokens or sections found.
            </li>
          )}
          {filtered.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                onClick={() => handleSelect(entry)}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-900"
              >
                <span className="flex items-center gap-3">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    {renderIcon(entry.kind)}
                  </span>
                  <span>
                    <span className="block text-[13px] font-medium text-neutral-900 dark:text-neutral-100">
                      {entry.label}
                    </span>
                    <span className="block text-[11px] text-neutral-500">
                      {entry.detail}
                    </span>
                  </span>
                </span>
                <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                  <ArrowRight className="h-3.5 w-3.5 text-neutral-400" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
