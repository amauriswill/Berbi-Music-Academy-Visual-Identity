import {
  ArrowLeft,
  ChevronRight,
  Copy,
  Download,
  FileDown,
  Menu,
  Moon,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SlidersHorizontal,
  Sun,
  X,
} from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import { BrandSymbol } from '../brand/BrandMark';

export interface NavItem {
  id: string;
  label: string;
  group: 'Introduction' | 'Brand Core' | 'Visuals & Motion' | 'Resources';
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'foundation', label: 'Foundation', group: 'Introduction' },
  { id: 'marks', label: 'Marks', group: 'Brand Core' },
  { id: 'colors', label: 'Color palette', group: 'Brand Core' },
  { id: 'typography', label: 'Typography', group: 'Brand Core' },
  { id: 'motion', label: 'Motion', group: 'Visuals & Motion' },
  { id: 'voice', label: 'Tone of voice', group: 'Visuals & Motion' },
  { id: 'graphics', label: 'Brand shapes', group: 'Visuals & Motion' },
  { id: 'applications', label: 'Applications', group: 'Resources' },
  { id: 'exports', label: 'Exports', group: 'Resources' },
];

interface SidebarProps {
  config: BrandConfig;
  activeSection: string;
  darkMode: boolean;
  collapsed: boolean;
  mobileOpen: boolean;
  cmsConnected?: boolean;
  cmsEntryCount?: number;
  onToggleCollapse: () => void;
  onToggleMobile: (open: boolean) => void;
  onToggleDarkMode: () => void;
  onOpenSearch: () => void;
  onOpenEditor: () => void;
  onCopyForFigma: () => void;
  onPrintPdf: () => void;
  onJumpToExports: () => void;
}

/**
 * Gridlines Sidebar Geometry:
 * - Outer container padding: px-3 (12px) -> Box line = 12px
 * - Row horizontal padding: px-2.5 (10px) -> Icon column leading edge = 22px
 * - Shared icon slot: w-5 (20px) centered -> Icon column centre = 32px
 * - Gap after icon column: gap-2.5 (10px) -> Label text line = 52px
 * - Trailing slot: w-6 (24px) centered -> Trailing centre = 22px from container right
 */
const ICON_COL = 'inline-flex h-5 w-5 shrink-0 items-center justify-center';
const TRAIL_COL = 'inline-flex h-5 w-6 shrink-0 items-center justify-center';

export function Sidebar({
  config,
  activeSection,
  darkMode,
  collapsed,
  mobileOpen,
  cmsConnected = false,
  cmsEntryCount = 0,
  onToggleCollapse,
  onToggleMobile,
  onToggleDarkMode,
  onOpenSearch,
  onOpenEditor,
  onCopyForFigma,
  onPrintPdf,
  onJumpToExports,
}: SidebarProps) {
  const groups: NavItem['group'][] = [
    'Introduction',
    'Brand Core',
    'Visuals & Motion',
    'Resources',
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onToggleMobile(false);
  };

  const navContent = (
    <div className="flex h-full flex-col justify-between px-3 py-5">
      <div>
        {/* Top brand header — aligned on box line (12px), icon col (22..42px), label line (52px) */}
        <div className="mb-3 flex items-center justify-between gap-2 px-2.5 py-1">
          <a
            href="#foundation"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('foundation');
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
            onClick={() => onToggleMobile(false)}
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
          {groups.map((group) => {
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
                          onClick={() => handleNavClick(item.id)}
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

  return (
    <>
      {/* Mobile top bar — shared 20px horizontal margin (px-5) with main content below */}
      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200/80 bg-white/90 px-5 py-3 backdrop-blur lg:hidden dark:border-neutral-800 dark:bg-[#0D0E0D]/90">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onToggleMobile(true)}
            className="-ml-1.5 inline-flex h-8 w-8 items-center justify-center rounded-md text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="inline-flex items-center gap-2 text-sm font-semibold">
            <BrandSymbol symbolId={config.mark.symbolId} size={18} />
            {config.brandName}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <a
            href="/_emdash/admin/"
            className="inline-flex h-8 items-center rounded-md border border-neutral-200 px-2.5 text-[11px] font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
          >
            Admin
          </a>
          <button
            type="button"
            onClick={onOpenSearch}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onOpenEditor}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"
            aria-label="Customize"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="no-print fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => onToggleMobile(false)}
          />
          <aside className="relative z-10 h-full w-64 border-r border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#0D0E0D]">
            {navContent}
          </aside>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-20 hidden border-r border-neutral-200/80 bg-white transition-all duration-200 lg:block dark:border-neutral-800/80 dark:bg-[#0D0E0D] ${
          collapsed ? 'w-[68px]' : 'w-[248px]'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}
