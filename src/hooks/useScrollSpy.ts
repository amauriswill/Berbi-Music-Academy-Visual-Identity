import { useEffect, useState } from 'react';

export function useScrollSpy(sectionIds: string[], offsetPx = 140): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'foundation');

  useEffect(() => {
    const handleScroll = () => {
      let current = sectionIds[0] ?? 'foundation';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= offsetPx) {
          current = id;
        }
      }
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offsetPx]);

  return activeId;
}
