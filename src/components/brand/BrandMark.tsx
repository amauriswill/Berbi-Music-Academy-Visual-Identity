import {
  getGraphicShapePrimitive,
  getMarkPrimitives,
  type SvgPrimitive,
} from '../../domain/markGeometry';
import type { GraphicShapeId, MarkSymbolId } from '../../types/brand';

function renderSvgPrimitive(p: SvgPrimitive, key: number) {
  switch (p.kind) {
    case 'rect':
      return (
        <rect
          key={key}
          x={p.x}
          y={p.y}
          width={p.width}
          height={p.height}
          rx={p.rx}
          fill={p.fill}
          opacity={p.opacity}
          transform={p.transform}
        />
      );
    case 'circle':
      return (
        <circle
          key={key}
          cx={p.cx}
          cy={p.cy}
          r={p.r}
          fill={p.fill}
          stroke={p.stroke}
          strokeWidth={p.strokeWidth}
          opacity={p.opacity}
        />
      );
    case 'path':
      return (
        <path
          key={key}
          d={p.d}
          fill={p.fill}
          stroke={p.stroke}
          strokeOpacity={p.strokeOpacity}
          strokeWidth={p.strokeWidth}
          opacity={p.opacity}
        />
      );
  }
}

interface BrandSymbolProps {
  symbolId: MarkSymbolId;
  color?: string;
  size?: number;
  className?: string;
}

export function BrandSymbol({
  symbolId,
  color = 'currentColor',
  size = 28,
  className = '',
}: BrandSymbolProps) {
  const primitives = getMarkPrimitives(symbolId, color);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {primitives.map((p, idx) => renderSvgPrimitive(p, idx))}
    </svg>
  );
}

interface GraphicShapeProps {
  shapeId: GraphicShapeId;
  fillHex: string;
  size?: number;
  className?: string;
}

/** Renders a brand graphic shape directly as safe React SVG elements (zero raw HTML injection). */
export function GraphicShape({
  shapeId,
  fillHex,
  size = 104,
  className = '',
}: GraphicShapeProps) {
  const primitive = getGraphicShapePrimitive(shapeId, fillHex);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {renderSvgPrimitive(primitive, 0)}
    </svg>
  );
}

interface BrandLockupProps {
  symbolId: MarkSymbolId;
  brandName: string;
  color?: string;
  sizePx?: number;
  displayFontCss?: string;
  stacked?: boolean;
  className?: string;
}

export function BrandLockup({
  symbolId,
  brandName,
  color = 'currentColor',
  sizePx = 28,
  displayFontCss = 'var(--font-display)',
  stacked = false,
  className = '',
}: BrandLockupProps) {
  const iconSize = Math.round(sizePx * 0.92);
  return (
    <span
      className={`inline-flex ${
        stacked ? 'flex-col items-center gap-2.5' : 'items-center gap-[0.35em]'
      } select-none ${className}`}
      style={{ color }}
    >
      <BrandSymbol symbolId={symbolId} color={color} size={iconSize} />
      <span
        style={{
          fontFamily: displayFontCss,
          fontSize: `${sizePx}px`,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
        className="font-medium tracking-tight"
      >
        {brandName}
      </span>
    </span>
  );
}
