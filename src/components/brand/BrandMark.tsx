import type { MarkSymbolId } from '../../types/brand';

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
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {symbolId === 'berbi' && (
        <>
          <rect x="10" y="26" width="5.5" height="16" rx="2.75" fill={color} opacity="0.82" />
          <rect x="19.5" y="16" width="5.5" height="32" rx="2.75" fill={color} />
          <rect x="29" y="10" width="5.5" height="44" rx="2.75" fill={color} />
          <rect x="38.5" y="20" width="5.5" height="28" rx="2.75" fill={color} />
          <rect x="48" y="28" width="5.5" height="16" rx="2.75" fill={color} opacity="0.82" />
          <circle cx="50.75" cy="17" r="4.25" fill={color} />
        </>
      )}

      {symbolId === 'solis' &&
        Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 32 + Math.cos(angle) * 20;
          const cy = 32 + Math.sin(angle) * 20;
          if (i % 2 === 0) {
            return <circle key={i} cx={cx} cy={cy} r="5.2" fill={color} />;
          }
          return (
            <rect
              key={i}
              x={cx - 4.2}
              y={cy - 4.2}
              width="8.4"
              height="8.4"
              rx="1.6"
              transform={`rotate(45 ${cx} ${cy})`}
              fill={color}
            />
          );
        })}

      {symbolId === 'gleam' && (
        <>
          <path
            d="M32 6 L39 22 L56 14 L44 30 L58 36 L42 42 L48 58 L32 45 L16 58 L22 42 L6 36 L20 30 L8 14 L25 22 Z"
            fill={color}
          />
          <circle
            cx="32"
            cy="32"
            r="5"
            fill="none"
            stroke={color}
            strokeWidth="2"
            opacity="0.25"
          />
        </>
      )}

      {symbolId === 'monolith' && (
        <>
          <rect x="10" y="10" width="18" height="44" rx="3" fill={color} />
          <rect x="34" y="10" width="20" height="20" rx="3" fill={color} />
          <rect x="34" y="34" width="20" height="20" rx="10" fill={color} opacity="0.82" />
        </>
      )}

      {symbolId === 'kite' && (
        <>
          <path d="M32 6 L56 26 L32 58 L8 26 Z" fill={color} />
          <path
            d="M32 6 L32 58 M8 26 L56 26"
            stroke="#FFFFFF"
            strokeOpacity="0.35"
            strokeWidth="2.2"
          />
        </>
      )}
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
