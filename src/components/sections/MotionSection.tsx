import { useState } from 'react';
import { Copy, Play } from 'lucide-react';
import type { BrandConfig } from '../../types/brand';
import { copyText } from '../../utils/assetExport';

interface MotionSectionProps {
  config: BrandConfig;
  onNotify: (msg: string) => void;
}

export function MotionSection({ config, onNotify }: MotionSectionProps) {
  const initial = config.motion.presets[0];
  const [selectedId, setSelectedId] = useState(initial.id);
  const [curve, setCurve] = useState<[number, number, number, number]>(initial.curve);
  const [durationMs, setDurationMs] = useState<number>(initial.durationMs);
  const [playToggle, setPlayToggle] = useState(false);

  const selectPreset = (id: string) => {
    const found = config.motion.presets.find((m) => m.id === id);
    if (!found) return;
    setSelectedId(found.id);
    setCurve(found.curve);
    setDurationMs(found.durationMs);
    setPlayToggle((prev) => !prev);
  };

  const [x1, y1, x2, y2] = curve;
  const cssCurve = `cubic-bezier(${x1.toFixed(2)}, ${y1.toFixed(2)}, ${x2.toFixed(2)}, ${y2.toFixed(2)})`;
  const cssRule = `transition: transform ${durationMs}ms ${cssCurve};`;

  // Map [0..1] curve coords to SVG 200x200 box with 24px padding
  const pad = 24;
  const size = 200;
  const toSvgX = (x: number) => pad + x * size;
  const toSvgY = (y: number) => pad + (1 - y) * size;

  const p0 = `${toSvgX(0)},${toSvgY(0)}`;
  const p1 = `${toSvgX(x1)},${toSvgY(y1)}`;
  const p2 = `${toSvgX(x2)},${toSvgY(y2)}`;
  const p3 = `${toSvgX(1)},${toSvgY(1)}`;

  const handleCopyCss = async () => {
    const ok = await copyText(cssRule);
    if (ok) onNotify(`Copied ${cssRule}`);
  };

  const handleCopyJson = async () => {
    const json = JSON.stringify({ durationMs, cubicBezier: curve }, null, 2);
    const ok = await copyText(json);
    if (ok) onNotify('Copied motion JSON token');
  };

  return (
    <section
      id="motion"
      className="scroll-mt-8 border-t border-neutral-200 py-14 dark:border-neutral-800"
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-medium tracking-tight text-neutral-950 dark:text-white">
            Motion
          </h2>
          <p className="mt-2 max-w-2xl text-[14.5px] leading-relaxed text-neutral-600 dark:text-neutral-300">
            {config.motion.guidelinesNote}
          </p>
        </div>

        <div className="no-print flex flex-wrap gap-1.5">
          {config.motion.presets.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                selectedId === preset.id
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-950'
                  : 'border border-neutral-200 text-neutral-600 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900'
              }`}
            >
              {preset.name.split(' — ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Gleam-inspired Cubic Bezier Visualizer Card */}
      <div className="squircle-lg grid gap-8 border border-neutral-200 bg-neutral-50/70 p-6 sm:p-8 lg:grid-cols-[260px_1fr] dark:border-neutral-800 dark:bg-neutral-900/40">
        {/* Coordinate Graph */}
        <div className="squircle-md flex items-center justify-center border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-950">
          <svg width="248" height="248" viewBox="0 0 248 248" className="overflow-visible">
            {/* Grid lines */}
            {Array.from({ length: 11 }).map((_, i) => {
              const offset = pad + (size / 10) * i;
              return (
                <g key={i}>
                  <line
                    x1={offset}
                    y1={pad}
                    x2={offset}
                    y2={pad + size}
                    stroke="currentColor"
                    strokeOpacity={i === 0 || i === 10 ? 0.2 : 0.07}
                    strokeWidth="1"
                  />
                  <line
                    x1={pad}
                    y1={offset}
                    x2={pad + size}
                    y2={offset}
                    stroke="currentColor"
                    strokeOpacity={i === 0 || i === 10 ? 0.2 : 0.07}
                    strokeWidth="1"
                  />
                </g>
              );
            })}

            {/* Linear diagonal reference */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(1)}
              y2={toSvgY(1)}
              stroke="currentColor"
              strokeOpacity="0.15"
              strokeDasharray="3 3"
            />

            {/* Control handles */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(x1)}
              y2={toSvgY(y1)}
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(1)}
              y1={toSvgY(1)}
              x2={toSvgX(x2)}
              y2={toSvgY(y2)}
              stroke="currentColor"
              strokeOpacity="0.45"
              strokeWidth="1.5"
            />

            {/* Bezier Path */}
            <path
              d={`M ${p0} C ${p1}, ${p2}, ${p3}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className="text-neutral-900 dark:text-white"
            />

            {/* Handle nodes */}
            <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="5" fill="#10B981" />
            <circle cx={toSvgX(x2)} cy={toSvgY(y2)} r="5" fill="#F59E0B" />
            <circle cx={toSvgX(0)} cy={toSvgY(0)} r="3.5" fill="currentColor" />
            <circle cx={toSvgX(1)} cy={toSvgY(1)} r="3.5" fill="currentColor" />
          </svg>
        </div>

        {/* Controls, Live Track Preview, & Token Actions */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-neutral-950 dark:text-white">
                {config.motion.presets.find((p) => p.id === selectedId)?.name ?? 'Custom Curve'}
              </h3>
              <span className="font-mono text-xs text-neutral-500">
                {durationMs}ms · {cssCurve}
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {config.motion.presets.find((p) => p.id === selectedId)?.usage ??
                'Custom easing definition tuned for UI motion.'}
            </p>

            {/* Live animated preview track */}
            <div className="squircle-md mt-5 border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                  Live Animation Preview
                </span>
                <button
                  type="button"
                  onClick={() => setPlayToggle((p) => !p)}
                  className="no-print inline-flex items-center gap-1.5 rounded-md bg-neutral-900 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-950"
                >
                  <Play className="h-3 w-3" />
                  Replay
                </button>
              </div>
              <div className="relative h-9 w-full overflow-hidden rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
                <div
                  className="h-7 w-16 rounded-md bg-neutral-900 dark:bg-white"
                  style={{
                    transform: playToggle ? 'translateX(calc(100% + 140px))' : 'translateX(0px)',
                    transition: `transform ${durationMs}ms ${cssCurve}`,
                  }}
                />
              </div>
            </div>

            {/* Curve parameter sliders */}
            <div className="no-print mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: 'x1', val: x1, min: 0, max: 1, step: 0.02, idx: 0 },
                { label: 'y1', val: y1, min: 0, max: 1.2, step: 0.02, idx: 1 },
                { label: 'x2', val: x2, min: 0, max: 1, step: 0.02, idx: 2 },
                { label: 'y2', val: y2, min: 0, max: 1.2, step: 0.02, idx: 3 },
              ].map((ctrl) => (
                <label key={ctrl.label} className="space-y-1 text-[11px]">
                  <span className="flex justify-between font-mono text-neutral-500">
                    <span>{ctrl.label}</span>
                    <span>{ctrl.val.toFixed(2)}</span>
                  </span>
                  <input
                    type="range"
                    min={ctrl.min}
                    max={ctrl.max}
                    step={ctrl.step}
                    value={ctrl.val}
                    onChange={(e) => {
                      const next: [number, number, number, number] = [...curve] as [
                        number,
                        number,
                        number,
                        number,
                      ];
                      next[ctrl.idx] = Number(e.target.value);
                      setCurve(next);
                      setSelectedId('custom');
                    }}
                    className="w-full accent-neutral-900 dark:accent-white"
                  />
                </label>
              ))}

              <label className="space-y-1 text-[11px]">
                <span className="flex justify-between font-mono text-neutral-500">
                  <span>ms</span>
                  <span>{durationMs}</span>
                </span>
                <input
                  type="range"
                  min={100}
                  max={900}
                  step={20}
                  value={durationMs}
                  onChange={(e) => setDurationMs(Number(e.target.value))}
                  className="w-full accent-neutral-900 dark:accent-white"
                />
              </label>
            </div>
          </div>

          <div className="no-print flex flex-wrap items-center gap-2 border-t border-neutral-200/80 pt-4 dark:border-neutral-800">
            <button
              type="button"
              onClick={handleCopyCss}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy CSS
            </button>
            <button
              type="button"
              onClick={handleCopyJson}
              className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:bg-neutral-900"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy JSON
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
