import { Menu, Search, SlidersHorizontal } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import { BrandSymbol } from '../brand/BrandMark';
import { NAV_ITEMS, type NavItem } from './sidebar/navItems';
import { SidebarContent } from './sidebar/SidebarContent';

export { NAV_ITEMS, type NavItem };

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
  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    onToggleMobile(false);
  };

  const content = (
    <SidebarContent
      config={config}
      activeSection={activeSection}
      darkMode={darkMode}
      collapsed={collapsed}
      cmsConnected={cmsConnected}
      cmsEntryCount={cmsEntryCount}
      onToggleCollapse={onToggleCollapse}
      onCloseMobile={() => onToggleMobile(false)}
      onToggleDarkMode={onToggleDarkMode}
      onOpenSearch={onOpenSearch}
      onOpenEditor={onOpenEditor}
      onCopyForFigma={onCopyForFigma}
      onPrintPdf={onPrintPdf}
      onJumpToExports={onJumpToExports}
      onNavClick={handleNavClick}
    />
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
            {content}
          </aside>
        </div>
      )}

      {/* Desktop fixed sidebar */}
      <aside
        className={`no-print fixed inset-y-0 left-0 z-20 hidden border-r border-neutral-200/80 bg-white transition-all duration-200 lg:block dark:border-neutral-800/80 dark:bg-[#0D0E0D] ${
          collapsed ? 'w-[68px]' : 'w-[248px]'
        }`}
      >
        {content}
      </aside>
    </>
  );
}
