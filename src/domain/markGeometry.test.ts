import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { GraphicShapeId, MarkSymbolId } from '../types/brand';
import { buildAvatarSvg } from './assetGenerators';
import {
  SQUIRCLE_PATH_64,
  getGraphicShapePrimitive,
  getMarkPrimitives,
  serializeGraphicShapeInnerSvg,
  serializeMarkInnerSvg,
} from './markGeometry';

const MARKS: MarkSymbolId[] = ['berbi', 'solis', 'gleam', 'monolith', 'kite'];
const SHAPES: GraphicShapeId[] = [
  'clover',
  'cloud',
  'cross',
  'diamond',
  'spark',
  'arch',
  'petal',
  'wave',
  'sunburst',
];

describe('markGeometry', () => {
  it('provides non-empty geometry primitives and valid XML for all 5 brand marks', () => {
    for (const mark of MARKS) {
      const primitives = getMarkPrimitives(mark, '#14131A');
      expect(primitives.length).toBeGreaterThan(0);

      const xml = serializeMarkInnerSvg(mark, '#14131A');
      expect(xml).toContain('<');
      expect(xml).toContain('/>');
    }
  });

  it('provides valid geometry primitives for all 9 graphic shapes with sanitized colors', () => {
    for (const shape of SHAPES) {
      const primitive = getGraphicShapePrimitive(shape, 'bad-hex" onclick="alert(1)');
      expect(primitive.fill).toBe('#14131A');

      const xml = serializeGraphicShapeInnerSvg(shape, '#C8923B');
      expect(xml).toContain('#C8923B');
      expect(xml).not.toContain('onclick');
    }
  });

  it('keeps public/favicon.svg synchronized with the canonical Berbi squircle avatar', () => {
    const faviconSvg = readFileSync(resolve(process.cwd(), 'public/favicon.svg'), 'utf8');
    const canonical = buildAvatarSvg('berbi', '#FFFFFF', '#14131A', 64, 'squircle');

    expect(faviconSvg).toContain(SQUIRCLE_PATH_64);
    expect(faviconSvg).toContain('#14131A');
    const normalize = (s: string) => s.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    expect(normalize(faviconSvg)).toBe(normalize(canonical));
  });
});
