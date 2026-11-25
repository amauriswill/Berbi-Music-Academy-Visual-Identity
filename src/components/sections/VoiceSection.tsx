import type { BrandConfig } from '../../types/brand';

interface VoiceSectionProps {
  config: BrandConfig;
}

export function VoiceSection({ config }: VoiceSectionProps) {
  return (
    <section
      id="voice"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
        Tone of voice
      </h2>
      <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        {config.voice.summary}
      </p>

      {/* Voice Specimen Block (Opsis-inspired) */}
      <div className="squircle-lg mt-8 divide-y divide-neutral-200 border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
        {config.voice.examples.map((ex, idx) => (
          <div key={ex.label} className="px-6 py-5">
            <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
              {ex.label}
            </span>
            <p
              className={`mt-2 text-neutral-950 dark:text-white ${
                idx < 2 ? 'text-xl font-medium' : 'text-[15px] leading-relaxed'
              }`}
              style={
                idx === 0
                  ? { fontFamily: config.typography.display.cssFamily, fontSize: '28px' }
                  : undefined
              }
            >
              {ex.text}
            </p>
          </div>
        ))}
      </div>

      {/* SAY / AVOID Comparison Principles */}
      <div className="mt-12 space-y-10">
        {config.voice.principles.map((principle) => (
          <div key={principle.id}>
            <div className="mb-3">
              <h3 className="text-base font-medium text-neutral-950 dark:text-white">
                {principle.title}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {principle.subtitle}
              </p>
            </div>

            <div className="squircle-lg overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
              <div className="grid grid-cols-2 border-b border-neutral-200 bg-neutral-50 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400 dark:border-neutral-800 dark:bg-neutral-900">
                <span>Say</span>
                <span>Avoid</span>
              </div>
              <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {principle.comparisons.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-1 gap-2 px-5 py-3.5 text-sm sm:grid-cols-2 sm:gap-6">
                    <p className="font-medium text-neutral-900 dark:text-neutral-100">{row.say}</p>
                    <p className="text-neutral-400 line-through decoration-neutral-300 dark:text-neutral-500 dark:decoration-neutral-700">
                      {row.avoid}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
