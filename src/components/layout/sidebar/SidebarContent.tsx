import {
  ArrowLeft,
  ChevronRight,
  Copy,
  Download,
  FileDown,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SlidersHorizontal,
  Sun,
  X,
} from 'lucide-react';
import type { BrandConfig } from '../../../types/brand';
import { BrandSymbol } from '../../brand/BrandMark';
import { ICON_COL, NAV_GROUPS, NAV_ITEMS, TRAIL_COL } from './navItems';

interface SidebarContentProps {
  config: BrandConfig;
  activeSection: string;
  darkMode: boolean;
  collapsed: boolean;
  cmsConnected: boolean;
  cmsEntryCount: number;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenEditor: () => void;
  onCopyForFigma: () => void;
  onPrintPdf: () => void;
  onJumpToExports: () => void;
  onNavClick: (id: string) => void;
}

export function SidebarContent({
  config,
  activeSection,
  darkMode,
  collapsed,
  cmsConnected,
  cmsEntryCount,
  onToggleCollapse,
  onCloseMobile,
  onToggleDarkMode,
  onOpenSearch,
  onOpenEditor,
  onCopyForFigma,
  onPrintPdf,
  onJumpToExports,
  onNavClick,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col justify-between px-3 py-5">
      <div>
        {/* Top brand header — aligned on box line (12px), icon col (22..42px), label line (52px) */}
        <div className="mb-3 flex items-center justify-between gap-2 px-2.5 py-1">
          <a
            href="#foundation"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('foundation');
            }}
            className="flex min-w-0 items-center gap-2.5 text-neutral-900 dark:text-neutral-100"
          >
            <span className={ICON_COL}>
              <BrandSymbol symbolId={config.mark.symbolId} size={18} />
            </span>
            {!collapsed && (
              <span className="truncate text-[13px] font-semibold tracking-tight">
                {config.brandName}
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={onToggleCollapse}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`hidden rounded text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 lg:inline-flex dark:hover:bg-neutral-800 dark:hover:text-neutral-200 ${TRAIL_COL}`}
          >
            {collapsed ? (
              <PanelLeftOpen className="h-4 w-4" />
            ) : (
              <PanelLeftClose className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onCloseMobile}
            className={`rounded text-neutral-500 hover:bg-neutral-100 lg:hidden dark:hover:bg-neutral-800 ${TRAIL_COL}`}
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* EmDash CMS Admin Link + Quick Customize & Search controls */}
        {!collapsed && (
          <div className="mb-5 space-y-1">
            <a
              href="/_emdash/admin/"
              title={
                cmsConnected
                  ? `EmDash CMS active (${cmsEntryCount} entries)`
                  : 'Open EmDash CMS Admin Panel'
              }
              className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[12px] font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-800/80 dark:hover:text-white"
            >
              <span className="flex items-center gap-2.5">
                <span className={ICON_COL}>
                  <ArrowLeft className="h-3.5 w-3.5 text-neutral-400" />
                </span>
                <span>Admin panel</span>
              </span>
              <span className={TRAIL_COL}>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    cmsConnected ? 'bg-emerald-500' : 'bg-amber-400'
                  }`}
                  title={cmsConnected ? 'EmDash connected' : 'Using default preset'}
                />
              </span>
            </a>

            <button
              type="button"
              onClick={onOpenEditor}
              className="flex w-full items-center justify-between rounded-md px-2.5 py-1.5 text-[12px] font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800/80 dark:hover:text-white"
            >
              <span className="flex items-center gap-2.5">
                <span className={ICON_COL}>
                  <SlidersHorizontal className="h-3.5 w-3.5 text-neutral-400" />
                </span>
                <span>Customize brand</span>
              </span>
              <span className={TRAIL_COL}>
                <ChevronRight className="h-3.5 w-3.5 text-neutral-400" />
              </span>
            </button>

            {/* Optical -1px border compensation (px-[9px] + 1px border = 10px inner inset) */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex w-full items-center justify-between rounded-md border border-neutral-200/80 bg-neutral-50/70 px-[9px] py-1.5 text-[12px] text-neutral-500 transition-colors hover:border-neutral-300 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-neutral-700"
            >
              <span className="flex items-center gap-2.5">
                <span className={ICON_COL}>
                  <Search className="h-3.5 w-3.5" />
                </span>
                <span>Search</span>
              </span>
              <kbd className="inline-flex h-5 w-6 items-center justify-center rounded border border-neutral-200 bg-white font-mono text-[10px] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Section links: headers on icon-column leading edge (px-2.5), items on label line (52px) */}
        <nav className="space-y-4" aria-label="Brand guidelines sections">
          {NAV_GROUPS.map((group) => {
            const items = NAV_ITEMS.filter((i) => i.group === group);
            return (
              <div key={group}>
                {!collapsed && (
                  <p className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400 dark:text-neutral-500">
                    {group}
                  </p>
                )}
                <ul className="space-y-0.5">
                  {items.map((item) => {
                    const active = activeSection === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          onClick={() => onNavClick(item.id)}
                          title={item.label}
                          className={`flex w-full items-center rounded-md px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                            active
                              ? 'bg-neutral-100 font-medium text-neutral-950 dark:bg-neutral-800 dark:text-white'
                              : 'text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200'
                          }`}
                        >
                          {collapsed ? (
                            <span className="mx-auto font-mono text-[11px]">
                              {item.label.slice(0, 2)}
                            </span>
                          ) : (
                            <span className="flex items-center gap-2.5">
                              <span className={ICON_COL}>
                                <span
                                  className={`h-1.5 w-1.5 rounded-full transition-opacity ${
                                    active
                                      ? 'bg-neutral-900 opacity-100 dark:bg-white'
                                      : 'opacity-0'
                                  }`}
                                />
                              </span>
                              <span>{item.label}</span>
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom utility links — same icon column (w-5) + label line (52px) */}
      {!collapsed && (
        <div className="mt-6 space-y-0.5 border-t border-neutral-200/80 pt-4 dark:border-neutral-800">
          <button
            type="button"
            onClick={onJumpToExports}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className={ICON_COL}>
              <Download className="h-3.5 w-3.5" />
            </span>
            <span>Export assets</span>
          </button>
          <button
            type="button"
            onClick={onCopyForFigma}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className={ICON_COL}>
              <Copy className="h-3.5 w-3.5" />
            </span>
            <span>Copy for Figma</span>
          </button>
          <button
            type="button"
            onClick={onPrintPdf}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className={ICON_COL}>
              <FileDown className="h-3.5 w-3.5" />
            </span>
            <span>PDF Guidelines</span>
          </button>
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-[12.5px] text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
          >
            <span className={ICON_COL}>
              {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </span>
            <span>{darkMode ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
