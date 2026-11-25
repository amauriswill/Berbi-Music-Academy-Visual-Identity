import type { GraphicShapeId, MarkSymbolId } from '../types/brand';
import { sanitizeHex } from '../utils/colorMath';

/**
 * Continuous G2 superellipse squircle contour inside viewBox="0 0 64 64"
 * (Apple/Figma 60% corner-smoothing equivalent for SVG/PNG exports).
 */
export const SQUIRCLE_PATH_64 =
  'M32 0 C53.2 0 64 10.8 64 32 C64 53.2 53.2 64 32 64 C10.8 64 0 53.2 0 32 C0 10.8 10.8 0 32 0 Z';

export type SvgPrimitive =
  | {
      kind: 'rect';
      x: number;
      y: number;
      width: number;
      height: number;
      rx?: number;
      fill?: string;
      opacity?: number;
      transform?: string;
    }
  | {
      kind: 'circle';
      cx: number;
      cy: number;
      r: number;
      fill?: string;
      stroke?: string;
      strokeWidth?: number;
      opacity?: number;
    }
  | {
      kind: 'path';
      d: string;
      fill?: string;
      stroke?: string;
      strokeOpacity?: number;
      strokeWidth?: number;
      opacity?: number;
    };

function resolvePrimitiveColor(color: string): string {
  return color === 'currentColor' ? 'currentColor' : sanitizeHex(color);
}

/** Escapes XML attribute and text node characters for standalone SVG output. */
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** Returns geometry primitives in a 64x64 viewBox for the selected brand mark. */
export function getMarkPrimitives(symbolId: MarkSymbolId, color: string): SvgPrimitive[] {
  const safeColor = resolvePrimitiveColor(color);

  switch (symbolId) {
    case 'berbi':
      // Five harmonic bars forming an ascending soundwave and resonant note head
      return [
        { kind: 'rect', x: 10, y: 26, width: 5.5, height: 16, rx: 2.75, fill: safeColor, opacity: 0.82 },
        { kind: 'rect', x: 19.5, y: 16, width: 5.5, height: 32, rx: 2.75, fill: safeColor },
        { kind: 'rect', x: 29, y: 10, width: 5.5, height: 44, rx: 2.75, fill: safeColor },
        { kind: 'rect', x: 38.5, y: 20, width: 5.5, height: 28, rx: 2.75, fill: safeColor },
        { kind: 'rect', x: 48, y: 28, width: 5.5, height: 16, rx: 2.75, fill: safeColor, opacity: 0.82 },
        { kind: 'circle', cx: 50.75, cy: 17, r: 4.25, fill: safeColor },
      ];
    case 'solis': {
      // Eight geometric nodes arranged radially around an open core
      const nodes: SvgPrimitive[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = Number((32 + Math.cos(angle) * 20).toFixed(2));
        const cy = Number((32 + Math.sin(angle) * 20).toFixed(2));
        if (i % 2 === 0) {
          nodes.push({ kind: 'circle', cx, cy, r: 5.2, fill: safeColor });
        } else {
          nodes.push({
            kind: 'rect',
            x: Number((cx - 4.2).toFixed(2)),
            y: Number((cy - 4.2).toFixed(2)),
            width: 8.4,
            height: 8.4,
            rx: 1.6,
            transform: `rotate(45 ${cx} ${cy})`,
            fill: safeColor,
          });
        }
      }
      return nodes;
    }
    case 'gleam':
      // Expressive radial star glyph with subtle concentric inner ring
      return [
        {
          kind: 'path',
          d: 'M32 6 L39 22 L56 14 L44 30 L58 36 L42 42 L48 58 L32 45 L16 58 L22 42 L6 36 L20 30 L8 14 L25 22 Z',
          fill: safeColor,
        },
        {
          kind: 'circle',
          cx: 32,
          cy: 32,
          r: 5,
          fill: 'none',
          stroke: safeColor,
          strokeWidth: 2,
          opacity: 0.25,
        },
      ];
    case 'monolith':
      // Architectural split block mark
      return [
        { kind: 'rect', x: 10, y: 10, width: 18, height: 44, rx: 3, fill: safeColor },
        { kind: 'rect', x: 34, y: 10, width: 20, height: 20, rx: 3, fill: safeColor },
        { kind: 'rect', x: 34, y: 34, width: 20, height: 20, rx: 10, fill: safeColor, opacity: 0.82 },
      ];
    case 'kite':
      // Geometric kite diamond and internal structural facet lines
      return [
        { kind: 'path', d: 'M32 6 L56 26 L32 58 L8 26 Z', fill: safeColor },
        {
          kind: 'path',
          d: 'M32 6 L32 58 M8 26 L56 26',
          stroke: '#FFFFFF',
          strokeOpacity: 0.35,
          strokeWidth: 2.2,
        },
      ];
  }
}

/** Returns a single geometry primitive in a 100x100 viewBox for a brand shape. */
export function getGraphicShapePrimitive(shapeId: GraphicShapeId, fillHex: string): SvgPrimitive {
  const fill = sanitizeHex(fillHex);

  switch (shapeId) {
    case 'clover':
      return {
        kind: 'path',
        d: 'M50 18c10 0 18 8 18 18 10 0 18 8 18 18s-8 18-18 18c0 10-8 18-18 18s-18-8-18-18c-10 0-18-8-18-18s8-18 18-18c0-10 8-18 18-18Z',
        fill,
      };
    case 'cloud':
      return {
        kind: 'path',
        d: 'M50 16c11 0 20 8 21 19 10 2 17 11 17 21 0 12-10 22-22 22H34c-12 0-22-10-22-22 0-10 7-19 17-21 1-11 10-19 21-19Z',
        fill,
      };
    case 'cross':
      return {
        kind: 'path',
        d: 'M38 14h24v24h24v24H62v24H38V62H14V38h24V14Z',
        fill,
      };
    case 'diamond':
      return {
        kind: 'rect',
        x: 22,
        y: 22,
        width: 56,
        height: 56,
        rx: 14,
        transform: 'rotate(45 50 50)',
        fill,
      };
    case 'spark':
      return {
        kind: 'path',
        d: 'M50 8C54 34 66 46 92 50C66 54 54 66 50 92C46 66 34 54 8 50C34 46 46 34 50 8Z',
        fill,
      };
    case 'arch':
      return {
        kind: 'path',
        d: 'M18 52C18 32 32 16 50 16C68 16 82 32 82 52V84H18V52Z',
        fill,
      };
    case 'petal':
      return {
        kind: 'path',
        d: 'M22 18H56C72 18 84 30 84 46V82H48C32 82 22 70 22 54V18Z',
        fill,
      };
    case 'wave':
      return {
        kind: 'path',
        d: 'M18 30C18 20 26 14 34 18C38 20 42 20 46 18C52 14 60 16 64 22C68 16 76 14 82 18C88 22 90 30 86 38L74 74C71 82 63 86 56 82C52 80 48 80 44 82C37 86 29 82 26 74L18 38Z',
        fill,
      };
    case 'sunburst':
      return {
        kind: 'path',
        d: 'M50 10L58 24L74 16L72 32L88 36L78 50L88 64L72 68L74 84L58 76L50 90L42 76L26 84L28 68L12 64L22 50L12 36L28 32L26 16L42 24Z',
        fill,
      };
  }
}

function serializeAttrs(pairs: [string, string | number | undefined][]): string {
  return pairs
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}="${escapeXml(String(value))}"`)
    .join(' ');
}

/** Serializes a single SVG geometry primitive into self-closing XML markup. */
export function serializeSvgPrimitive(p: SvgPrimitive): string {
  switch (p.kind) {
    case 'rect':
      return `<rect ${serializeAttrs([
        ['x', p.x],
        ['y', p.y],
        ['width', p.width],
        ['height', p.height],
        ['rx', p.rx],
        ['transform', p.transform],
        ['fill', p.fill],
        ['opacity', p.opacity],
      ])} />`;
    case 'circle':
      return `<circle ${serializeAttrs([
        ['cx', p.cx],
        ['cy', p.cy],
        ['r', p.r],
        ['fill', p.fill],
        ['stroke', p.stroke],
        ['stroke-width', p.strokeWidth],
        ['opacity', p.opacity],
      ])} />`;
    case 'path':
      return `<path ${serializeAttrs([
        ['d', p.d],
        ['fill', p.fill],
        ['stroke', p.stroke],
        ['stroke-opacity', p.strokeOpacity],
        ['stroke-width', p.strokeWidth],
        ['opacity', p.opacity],
      ])} />`;
  }
}

/** Serializes the inner SVG nodes of a brand symbol using sanitized colors. */
export function serializeMarkInnerSvg(symbolId: MarkSymbolId, fgHex: string): string {
  return getMarkPrimitives(symbolId, sanitizeHex(fgHex)).map(serializeSvgPrimitive).join('');
}

/** Serializes the inner SVG node of a graphic shape using a sanitized fill hex. */
export function serializeGraphicShapeInnerSvg(shapeId: GraphicShapeId, fillHex: string): string {
  return serializeSvgPrimitive(getGraphicShapePrimitive(shapeId, sanitizeHex(fillHex)));
}
