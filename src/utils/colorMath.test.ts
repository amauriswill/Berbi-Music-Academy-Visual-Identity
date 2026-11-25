import { describe, expect, it } from 'vitest';
import {
  evaluateWcag,
  formatColorValue,
  getContrastRatio,
  getReadableInk,
  hexToCmyk,
  hexToHsl,
  hexToRgb,
  normalizeHex,
} from './colorMath';

describe('colorMath', () => {
  it('normalizes 3-digit and lowercase hex codes', () => {
    expect(normalizeHex('fff')).toBe('#FFFFFF');
    expect(normalizeHex('#131b16')).toBe('#131B16');
  });

  it('converts HEX to RGB, HSL, and CMYK accurately', () => {
    expect(hexToRgb('#131B16')).toEqual({ r: 19, g: 27, b: 22 });
    expect(hexToRgb('#FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToCmyk('#000000')).toEqual({ c: 0, m: 0, y: 0, k: 100 });
    expect(hexToHsl('#FFFFFF')).toEqual({ h: 0, s: 0, l: 100 });
  });

  it('computes WCAG 2.1 contrast ratios and compliance levels', () => {
    expect(getContrastRatio('#000000', '#FFFFFF')).toBe(21);
    expect(evaluateWcag(21)).toEqual({
      level: 'AAA',
      passNormal: true,
      passLarge: true,
    });

    const forestOnPaper = getContrastRatio('#131B16', '#EAE6DF');
    expect(forestOnPaper).toBeGreaterThan(12);
    expect(evaluateWcag(forestOnPaper).passNormal).toBe(true);

    const whiteOnPaper = getContrastRatio('#FFFFFF', '#EAE6DF');
    expect(whiteOnPaper).toBeLessThan(2);
    expect(evaluateWcag(whiteOnPaper)).toEqual({
      level: 'Fail',
      passNormal: false,
      passLarge: false,
    });
  });

  it('selects readable foreground ink and formats color strings', () => {
    expect(getReadableInk('#131B16')).toBe('#FFFFFF');
    expect(getReadableInk('#EAE6DF')).toBe('#111111');
    expect(formatColorValue('#131B16', 'RGB')).toBe('19, 27, 22');
    expect(formatColorValue('#131B16', 'HEX')).toBe('#131B16');
  });
});
