import { useEffect, useMemo, useState } from 'react';
import { Expand } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import { ApplicationLightbox } from './applications/ApplicationLightbox';
import { MockupCanvas } from './applications/MockupCanvas';

interface ApplicationsSectionProps {
  config: BrandConfig;
}

export function ApplicationsSection({ config }: ApplicationsSectionProps) {
  const flatItems = useMemo(
    () => config.applications.sections.flatMap((s) => s.items),
    [config.applications.sections]
  );

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((i) => (i === null ? null : (i + 1) % flatItems.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((i) =>
          i === null ? null : (i - 1 + flatItems.length) % flatItems.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, flatItems.length]);

  const activeItem = lightboxIndex !== null ? flatItems[lightboxIndex] : null;

  return (
    <section
      id="applications"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="space-y-14">
        {config.applications.sections.map((group) => (
          <div key={group.id}>
            <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
              {group.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
              {group.description}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {group.items.map((item) => {
                const idx = flatItems.findIndex((f) => f.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="squircle-lg group relative overflow-hidden border border-neutral-200 text-left transition-all hover:border-neutral-400 dark:border-neutral-800 dark:hover:border-neutral-600"
                  >
                    <div className="h-72 w-full">
                      <MockupCanvas app={item} config={config} />
                    </div>
                    <div className="no-print absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-medium text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                      <Expand className="h-3 w-3" />
                      Inspect
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950">
                      <div>
                        <p className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-neutral-500">{item.category}</p>
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">
                        {String(idx + 1).padStart(2, '0')} / {String(flatItems.length).padStart(2, '0')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen mockup inspection lightbox */}
      {activeItem && lightboxIndex !== null && (
        <ApplicationLightbox
          item={activeItem}
          index={lightboxIndex}
          total={flatItems.length}
          config={config}
          onClose={() => setLightboxIndex(null)}
          onPrev={() =>
            setLightboxIndex((lightboxIndex - 1 + flatItems.length) % flatItems.length)
          }
          onNext={() => setLightboxIndex((lightboxIndex + 1) % flatItems.length)}
        />
      )}
    </section>
  );
}
