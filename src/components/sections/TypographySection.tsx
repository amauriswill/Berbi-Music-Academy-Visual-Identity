import { useEffect, useState } from 'react';
import type { BrandConfig } from '../../types/brand';

interface TypographySectionProps {
  config: BrandConfig;
}

const RATIO_LABELS: { value: number; name: string }[] = [
  { value: 1.125, name: 'Major Second' },
  { value: 1.2, name: 'Minor Third' },
  { value: 1.25, name: 'Major Third' },
  { value: 1.333, name: 'Perfect Fourth' },
  { value: 1.414, name: 'Augmented Fourth' },
];

export function TypographySection({ config }: TypographySectionProps) {
  const [basePx, setBasePx] = useState<number>(config.typography.defaultBasePx);
  const [ratio, setRatio] = useState<number>(config.typography.defaultRatio);

  // Sync scale controls when switching presets or external brand config
  useEffect(() => {
    setBasePx(config.typography.defaultBasePx);
    setRatio(config.typography.defaultRatio);
  }, [config.id, config.typography.defaultBasePx, config.typography.defaultRatio]);

  // Interactive specimen tester state
  const [sampleText, setSampleText] = useState(
    'Design systems stay useful when every rule can be tested directly on the page.'
  );
  const [playgroundFont, setPlaygroundFont] = useState<'display' | 'ui' | 'mono'>('display');
  const [playgroundSize, setPlaygroundSize] = useState(40);
  const [playgroundWeight, setPlaygroundWeight] = useState(500);
  const [playgroundTracking, setPlaygroundTracking] = useState(-0.02);

  const families = [config.typography.display, config.typography.ui, config.typography.mono];
  const activePlaygroundSpec =
    playgroundFont === 'display'
      ? config.typography.display
      : playgroundFont === 'ui'
      ? config.typography.ui
      : config.typography.mono;

  const scaleRows = [
    {
      role: 'DISPLAY',
      font: config.typography.display,
      size: Math.round(basePx * Math.pow(ratio, 5)),
      weight: 400,
      lineHeight: 1.04,
      tracking: '-0.02em',
      text: config.typography.display.sampleSentence,
    },
    {
      role: 'HEADING 1',
      font: config.typography.display,
      size: Math.round(basePx * Math.pow(ratio, 4)),
      weight: 400,
      lineHeight: 1.12,
      tracking: '-0.015em',
      text: 'A little foresight goes a long way.',
    },
    {
      role: 'HEADING 2',
      font: config.typography.display,
      size: Math.round(basePx * Math.pow(ratio, 3)),
      weight: 400,
      lineHeight: 1.18,
      tracking: '-0.01em',
      text: 'Small details make a lasting difference.',
    },
    {
      role: 'HEADING 3',
      font: config.typography.ui,
      size: Math.round(basePx * Math.pow(ratio, 1.5)),
      weight: 500,
      lineHeight: 1.3,
      tracking: '-0.01em',
      text: 'The right people at the right moment.',
    },
    {
      role: 'BODY',
      font: config.typography.ui,
      size: basePx,
      weight: 400,
      lineHeight: 1.6,
      tracking: '0em',
      text: config.typography.ui.sampleSentence,
    },
    {
      role: 'CAPTION',
      font: config.typography.mono,
      size: Math.max(11, Math.round(basePx * 0.78)),
      weight: 400,
      lineHeight: 1.5,
      tracking: '0.02em',
      text: config.typography.mono.sampleSentence,
    },
  ];

  const nearestRatioLabel =
    RATIO_LABELS.reduce((prev, curr) =>
      Math.abs(curr.value - ratio) < Math.abs(prev.value - ratio) ? curr : prev
    )?.name ?? 'Custom';

  return (
    <section
      id="typography"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
        Type system
      </h2>

      {/* Font Specimens (4 aligned horizontal bands + squircle surfaces) */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {families.map((fam) => (
          <div
            key={fam.id}
            className="squircle-lg flex flex-col border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950"
          >
            {/* Band 1: Single-line eyebrow role & weights */}
            <div className="flex h-5 items-center justify-between gap-2">
              <span className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                {fam.roleLabel}
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-neutral-400">
                {fam.weights.join(' / ')}
              </span>
            </div>

            {/* Band 2: Uniform-height font family title */}
            <div className="mt-3 flex h-9 items-center">
              <h3
                className="truncate text-[24px] leading-none text-neutral-950 dark:text-white"
                style={{ fontFamily: fam.cssFamily }}
                title={fam.name}
              >
                {fam.name}
              </h3>
            </div>

            {/* Band 3: Uniform stacked specimen box (zero overflow at 1440px & 390px) */}
            <div
              className="squircle-md my-5 flex flex-col justify-between bg-neutral-50 px-4 py-4 dark:bg-neutral-900"
              style={{ fontFamily: fam.cssFamily }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-[44px] leading-none text-neutral-900 dark:text-white">
                  Aa
                </span>
                <span className="font-mono text-[11px] tabular-nums tracking-[0.04em] text-neutral-400">
                  0123456789
                </span>
              </div>
              <div className="my-3 border-t border-neutral-200/70 dark:border-neutral-800" />
              <div className="space-y-0.5 overflow-hidden text-[10.5px] leading-[1.6] tracking-[0.03em] text-neutral-500 dark:text-neutral-400">
                <p className="truncate">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                <p className="truncate">abcdefghijklmnopqrstuvwxyz</p>
              </div>
            </div>

            {/* Band 4: Aligned description starting on the exact same Y line */}
            <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
              {fam.description}
            </p>
          </div>
        ))}
      </div>

      {/* Interactive Type Scale (Base + Ratio sliders) */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-lg font-medium text-neutral-950 dark:text-white">Type scale</h3>

          <div className="no-print squircle-md flex flex-wrap items-center gap-6 border border-neutral-200 bg-neutral-50 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-900">
            <label className="flex items-center gap-3 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Base
              </span>
              <input
                type="range"
                min={12}
                max={20}
                step={1}
                value={basePx}
                onChange={(e) => setBasePx(Number(e.target.value))}
                className="w-24 accent-neutral-900 dark:accent-white"
              />
              <span className="w-10 font-mono text-xs font-medium">{basePx}px</span>
            </label>

            <label className="flex items-center gap-3 text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                Ratio
              </span>
              <input
                type="range"
                min={1.125}
                max={1.45}
                step={0.025}
                value={ratio}
                onChange={(e) => setRatio(Number(e.target.value))}
                className="w-24 accent-neutral-900 dark:accent-white"
              />
              <span className="font-mono text-xs font-medium">
                {nearestRatioLabel} {ratio.toFixed(2)}
              </span>
            </label>
          </div>
        </div>

        <div className="squircle-lg divide-y divide-neutral-200 border border-neutral-200 bg-white dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950">
          {scaleRows.map((row) => (
            <div key={row.role} className="space-y-2 px-6 py-5">
              <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10.5px] text-neutral-400">
                <span className="uppercase tracking-[0.12em]">{row.role}</span>
                <span>
                  {row.font.name} · {row.weight} · {row.size}px · {row.lineHeight}
                </span>
              </div>
              <p
                className="text-neutral-950 dark:text-white"
                style={{
                  fontFamily: row.font.cssFamily,
                  fontSize: `${row.size}px`,
                  fontWeight: row.weight,
                  lineHeight: row.lineHeight,
                  letterSpacing: row.tracking,
                }}
              >
                {row.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Live Type Tester */}
      <div className="mt-14 border-t border-neutral-200 pt-10 dark:border-neutral-800">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-neutral-950 dark:text-white">Try it</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Type directly below to preview live headlines, body copy, and token readouts.
            </p>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2">
            {(['display', 'ui', 'mono'] as const).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setPlaygroundFont(key)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  playgroundFont === key
                    ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                    : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900'
                }`}
              >
                {key === 'display'
                  ? config.typography.display.name
                  : key === 'ui'
                  ? config.typography.ui.name
                  : config.typography.mono.name}
              </button>
            ))}
          </div>
        </div>

        <div className="squircle-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="no-print mb-4 flex flex-wrap items-center gap-5 border-b border-neutral-200 pb-4 text-xs dark:border-neutral-800">
            <label className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-neutral-400">SIZE</span>
              <input
                type="range"
                min={14}
                max={72}
                value={playgroundSize}
                onChange={(e) => setPlaygroundSize(Number(e.target.value))}
                className="w-24 accent-neutral-900 dark:accent-white"
              />
              <span className="w-9 font-mono">{playgroundSize}px</span>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-neutral-400">WEIGHT</span>
              <select
                value={playgroundWeight}
                onChange={(e) => setPlaygroundWeight(Number(e.target.value))}
                className="rounded border border-neutral-200 bg-neutral-50 px-2 py-1 font-mono text-xs dark:border-neutral-800 dark:bg-neutral-900"
              >
                <option value={400}>400 Regular</option>
                <option value={500}>500 Medium</option>
                <option value={600}>600 Semibold</option>
                <option value={700}>700 Bold</option>
              </select>
            </label>

            <label className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-neutral-400">TRACKING</span>
              <input
                type="range"
                min={-0.04}
                max={0.08}
                step={0.005}
                value={playgroundTracking}
                onChange={(e) => setPlaygroundTracking(Number(e.target.value))}
                className="w-24 accent-neutral-900 dark:accent-white"
              />
              <span className="w-14 font-mono">{playgroundTracking.toFixed(3)}em</span>
            </label>
          </div>

          <textarea
            rows={3}
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full resize-none bg-transparent text-neutral-950 focus:outline-none dark:text-white"
            style={{
              fontFamily: activePlaygroundSpec.cssFamily,
              fontSize: `${playgroundSize}px`,
              fontWeight: playgroundWeight,
              letterSpacing: `${playgroundTracking}em`,
              lineHeight: 1.15,
            }}
          />
        </div>
      </div>
    </section>
  );
}
