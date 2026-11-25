import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { BrandApplication, BrandConfig } from '../../../types/brand';
import { MockupCanvas } from './MockupCanvas';

interface ApplicationLightboxProps {
  item: BrandApplication;
  index: number;
  total: number;
  config: BrandConfig;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function ApplicationLightbox({
  item,
  index,
  total,
  config,
  onClose,
  onPrev,
  onNext,
}: ApplicationLightboxProps) {
  return (
    <div
      className="no-print fixed inset-0 z-50 flex flex-col justify-between bg-black/90 p-4 backdrop-blur-sm sm:p-8"
      onClick={onClose}
    >
      <div className="flex items-center justify-between text-white">
        <div>
          <p className="text-sm font-medium">{item.title}</p>
          <p className="text-xs text-neutral-400">{item.caption}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          aria-label="Close lightbox"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div
        className="relative mx-auto flex w-full max-w-4xl items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onPrev}
          className="absolute -left-2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 sm:-left-12"
          aria-label="Previous mockup"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="squircle-lg h-[420px] w-full overflow-hidden border border-white/10 shadow-2xl">
          <MockupCanvas app={item} config={config} />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute -right-2 z-10 rounded-full bg-white/15 p-2.5 text-white hover:bg-white/25 sm:-right-12"
          aria-label="Next mockup"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="text-center font-mono text-xs text-neutral-400">
        {index + 1} / {total}
      </div>
    </div>
  );
}
