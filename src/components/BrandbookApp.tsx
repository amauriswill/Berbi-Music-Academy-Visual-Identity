import { useEffect, useMemo, useState } from 'react';
import { copyText } from '../adapters/browserExport';
import { defaultBrandConfig } from '../config/brand.config';
import { buildLogotypeSvg } from '../domain/assetGenerators';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { useToast } from '../hooks/useToast';
import type { BrandConfig } from '../types/brand';
import { BrandEditorDrawer } from './layout/BrandEditorDrawer';
import { CommandPalette } from './layout/CommandPalette';
import { ErrorBoundary } from './layout/ErrorBoundary';
import { NAV_ITEMS, Sidebar } from './layout/Sidebar';
import { ToastStack } from './layout/ToastStack';
import { ApplicationsSection } from './sections/ApplicationsSection';
import { ColorSection } from './sections/ColorSection';
import { ExportsSection } from './sections/ExportsSection';
import { FoundationSection } from './sections/FoundationSection';
import { GraphicsSection } from './sections/GraphicsSection';
import { MarksSection } from './sections/MarksSection';
import { MotionSection } from './sections/MotionSection';
import { TypographySection } from './sections/TypographySection';
import { VoiceSection } from './sections/VoiceSection';

export interface BrandbookAppProps {
  initialConfig?: BrandConfig;
  cmsConnected?: boolean;
  cmsEntryCount?: number;
}

export default function BrandbookApp({
  initialConfig = defaultBrandConfig,
  cmsConnected = false,
  cmsEntryCount = 0,
}: BrandbookAppProps) {
  const [config, setConfig] = useState<BrandConfig>(initialConfig);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);

  const { toasts, showToast } = useToast();

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), []);
  const activeSection = useScrollSpy(sectionIds);

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync brand CSS custom properties + document title
  useEffect(() => {
    const root = document.documentElement;
    const primary = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
    const secondary =
      config.colors.core.find((c) => c.role === 'secondary') ?? config.colors.core[1];
    const surface = config.colors.core.find((c) => c.role === 'surface') ?? config.colors.core[2];
    const ink = config.colors.core.find((c) => c.role === 'ink') ?? config.colors.core[0];

    root.style.setProperty('--brand-primary', primary.hex);
    root.style.setProperty('--brand-secondary', secondary.hex);
    root.style.setProperty('--brand-surface', surface.hex);
    root.style.setProperty('--brand-ink', ink.hex);
    root.style.setProperty('--font-display', config.typography.display.cssFamily);
    root.style.setProperty('--font-ui', config.typography.ui.cssFamily);
    root.style.setProperty('--font-mono', config.typography.mono.cssFamily);
    root.dataset.cornerStyle = config.cornerStyle;

    document.title = `${config.brandName} — Brand Guidelines`;
  }, [config]);

  // Register Cmd/Ctrl + K global search shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleCopyForFigma = async () => {
    const primary = config.colors.core.find((c) => c.role === 'primary') ?? config.colors.core[0];
    const svg = buildLogotypeSvg(
      config.mark.symbolId,
      config.brandName,
      primary.hex,
      undefined,
      config.typography.display.cssFamily
    );
    const ok = await copyText(svg);
    if (ok) {
      showToast('Copied primary lockup SVG — paste directly into Figma');
    }
  };

  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleJumpToExports = () => {
    if (typeof document !== 'undefined') {
      const el = document.getElementById('exports');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileNavOpen(false);
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-white text-neutral-900 dark:bg-[#0D0E0D] dark:text-neutral-100">
        <Sidebar
          config={config}
          activeSection={activeSection}
          darkMode={darkMode}
          collapsed={sidebarCollapsed}
          mobileOpen={mobileNavOpen}
          cmsConnected={cmsConnected}
          cmsEntryCount={cmsEntryCount}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          onToggleMobile={setMobileNavOpen}
          onToggleDarkMode={() => setDarkMode((d) => !d)}
          onOpenSearch={() => setSearchOpen(true)}
          onOpenEditor={() => setEditorOpen(true)}
          onCopyForFigma={handleCopyForFigma}
          onPrintPdf={handlePrintPdf}
          onJumpToExports={handleJumpToExports}
        />

        <main
          className={`print-full-width transition-all duration-200 ${
            sidebarCollapsed ? 'lg:pl-[68px]' : 'lg:pl-[248px]'
          }`}
        >
          <div className="mx-auto max-w-[1040px] px-5 py-8 sm:px-10 sm:py-12">
            <FoundationSection config={config} />
            <MarksSection config={config} onNotify={showToast} />
            <ColorSection config={config} onNotify={showToast} />
            <TypographySection config={config} />
            <MotionSection config={config} onNotify={showToast} />
            <VoiceSection config={config} />
            <GraphicsSection config={config} onNotify={showToast} />
            <ApplicationsSection config={config} />
            <ExportsSection
              config={config}
              onNotify={showToast}
              onCopyForFigma={handleCopyForFigma}
              onPrintPdf={handlePrintPdf}
            />
          </div>
        </main>

        <CommandPalette
          open={searchOpen}
          config={config}
          onClose={() => setSearchOpen(false)}
          onNotify={showToast}
          onOpenEditor={() => setEditorOpen(true)}
        />

        <BrandEditorDrawer
          open={editorOpen}
          config={config}
          onChange={setConfig}
          onClose={() => setEditorOpen(false)}
          onNotify={showToast}
        />

        <ToastStack toasts={toasts} />
      </div>
    </ErrorBoundary>
  );
}
