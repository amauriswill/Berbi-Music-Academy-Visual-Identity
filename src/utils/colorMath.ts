import type { ColorFormat } from '../types/brand';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface HslColor {
  h: number;
  s: number;
  l: number;
}

export interface CmykColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface WcagEvaluation {
  level: 'AAA' | 'AA' | 'AA Large' | 'Fail';
  passNormal: boolean;
  passLarge: boolean;
}

export function normalizeHex(hex: string): string {
  const cleaned = hex.trim().replace(/^#/, '');
  if (/^[0-9a-fA-F]{3}$/.test(cleaned)) {
    return (
      '#' +
      cleaned
        .split('')
        .map((c) => c + c)
        .join('')
        .toUpperCase()
    );
  }
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) {
    return '#' + cleaned.toUpperCase();
  }
  return '#000000';
}

export function hexToRgb(hex: string): RgbColor {
  const norm = normalizeHex(hex).slice(1);
  return {
    r: parseInt(norm.slice(0, 2), 16),
    g: parseInt(norm.slice(2, 4), 16),
    b: parseInt(norm.slice(4, 6), 16),
  };
}

export function hexToHsl(hex: string): HslColor {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l: Math.round(l * 100) };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;

  if (max === rn) {
    h = (gn - bn) / d + (gn < bn ? 6 : 0);
  } else if (max === gn) {
    h = (bn - rn) / d + 2;
  } else {
    h = (rn - gn) / d + 4;
  }

  return {
    h: Math.round((h / 6) * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hexToCmyk(hex: string): CmykColor {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);

  if (k >= 1 - 1e-6) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const toLinear = (channel: number): number => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function getContrastRatio(hexA: string, hexB: string): number {
  const lumA = getRelativeLuminance(hexA);
  const lumB = getRelativeLuminance(hexB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return Number(((lighter + 0.05) / (darker + 0.05)).toFixed(2));
}

export function evaluateWcag(ratio: number): WcagEvaluation {
  if (ratio >= 7) {
    return { level: 'AAA', passNormal: true, passLarge: true };
  }
  if (ratio >= 4.5) {
    return { level: 'AA', passNormal: true, passLarge: true };
  }
  if (ratio >= 3) {
    return { level: 'AA Large', passNormal: false, passLarge: true };
  }
  return { level: 'Fail', passNormal: false, passLarge: false };
}

export function getReadableInk(bgHex: string): '#FFFFFF' | '#111111' {
  const whiteContrast = getContrastRatio('#FFFFFF', bgHex);
  const darkContrast = getContrastRatio('#111111', bgHex);
  return whiteContrast >= darkContrast ? '#FFFFFF' : '#111111';
}

export function formatColorValue(hex: string, format: ColorFormat): string {
  const norm = normalizeHex(hex);
  switch (format) {
    case 'HEX':
      return norm;
    case 'RGB': {
      const { r, g, b } = hexToRgb(norm);
      return `${r}, ${g}, ${b}`;
    }
    case 'CMYK': {
      const { c, m, y, k } = hexToCmyk(norm);
      return `${c}, ${m}, ${y}, ${k}`;
    }
    case 'HSL': {
      const { h, s, l } = hexToHsl(norm);
      return `${h}°, ${s}%, ${l}%`;
    }
  }
}
