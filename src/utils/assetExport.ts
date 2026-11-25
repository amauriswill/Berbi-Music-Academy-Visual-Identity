import type { BrandConfig, CornerStyle, GraphicShapeId, MarkSymbolId } from '../types/brand';

/**
 * Continuous G2 superellipse squircle contour inside viewBox="0 0 64 64"
 * (Apple/Figma 60% corner-smoothing equivalent for cross-browser SVG/PNG exports).
 */
export const SQUIRCLE_PATH_64 =
  'M32 0 C53.2 0 64 10.8 64 32 C64 53.2 53.2 64 32 64 C10.8 64 0 53.2 0 32 C0 10.8 10.8 0 32 0 Z';

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function getMarkInnerSvg(markId: MarkSymbolId, fgHex: string): string {
  switch (markId) {
    case 'berbi':
      // Five rhythmic harmonic bars forming an ascending soundwave/staff motif + resonant note head
      return [
        `<rect x="10" y="26" width="5.5" height="16" rx="2.75" fill="${fgHex}" opacity="0.82" />`,
        `<rect x="19.5" y="16" width="5.5" height="32" rx="2.75" fill="${fgHex}" />`,
        `<rect x="29" y="10" width="5.5" height="44" rx="2.75" fill="${fgHex}" />`,
        `<rect x="38.5" y="20" width="5.5" height="28" rx="2.75" fill="${fgHex}" />`,
        `<rect x="48" y="28" width="5.5" height="16" rx="2.75" fill="${fgHex}" opacity="0.82" />`,
        `<circle cx="50.75" cy="17" r="4.25" fill="${fgHex}" />`,
      ].join('');
    case 'solis': {
      // 8 geometric nodes arranged radially around a hollow core (Opsis-inspired precision mark)
      const nodes: string[] = [];
      for (let i = 0; i < 8; i++) {
        const angle = (i * 45 * Math.PI) / 180;
        const cx = (32 + Math.cos(angle) * 20).toFixed(2);
        const cy = (32 + Math.sin(angle) * 20).toFixed(2);
        if (i % 2 === 0) {
          nodes.push(`<circle cx="${cx}" cy="${cy}" r="5.2" fill="${fgHex}" />`);
        } else {
          nodes.push(
            `<rect x="${(Number(cx) - 4.2).toFixed(2)}" y="${(Number(cy) - 4.2).toFixed(2)}" width="8.4" height="8.4" rx="1.6" transform="rotate(45 ${cx} ${cy})" fill="${fgHex}" />`
          );
        }
      }
      return nodes.join('');
    }
    case 'gleam':
      // Bold modular 6-petal / star-cross geometric glyph (Gleam-inspired expressive mark)
      return [
        `<path d="M32 6 L39 22 L56 14 L44 30 L58 36 L42 42 L48 58 L32 45 L16 58 L22 42 L6 36 L20 30 L8 14 L25 22 Z" fill="${fgHex}" />`,
        `<circle cx="32" cy="32" r="5" fill="none" stroke="${fgHex}" stroke-width="2" opacity="0.25" />`,
      ].join('');
    case 'monolith':
      // Architectural split monolith mark
      return [
        `<rect x="10" y="10" width="18" height="44" rx="3" fill="${fgHex}" />`,
        `<rect x="34" y="10" width="20" height="20" rx="3" fill="${fgHex}" />`,
        `<rect x="34" y="34" width="20" height="20" rx="10" fill="${fgHex}" opacity="0.82" />`,
      ].join('');
    case 'kite':
      // Geometric kite & vector facet mark
      return [
        `<path d="M32 6 L56 26 L32 58 L8 26 Z" fill="${fgHex}" />`,
        `<path d="M32 6 L32 58 M8 26 L56 26" stroke="#FFFFFF" stroke-opacity="0.35" stroke-width="2.2" />`,
      ].join('');
  }
}

export function buildIsotypeSvg(
  markId: MarkSymbolId,
  fgHex: string,
  bgHex?: string,
  size = 256
): string {
  const bg = bgHex ? `<rect width="64" height="64" fill="${bgHex}" />` : '';
  const inner = `<g transform="translate(8,8) scale(0.75)">${getMarkInnerSvg(markId, fgHex)}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">${bg}${inner}</svg>`;
}

export function buildLogotypeSvg(
  markId: MarkSymbolId,
  brandName: string,
  fgHex: string,
  bgHex?: string,
  displayFont = 'Instrument Serif, Georgia, serif'
): string {
  const safeName = escapeXml(brandName);
  const safeFont = escapeXml(displayFont);
  const width = Math.max(260, 110 + brandName.length * 22);
  const height = 84;
  const bg = bgHex ? `<rect width="${width}" height="${height}" fill="${bgHex}" />` : '';
  const icon = `<g transform="translate(24, 18) scale(0.75)">${getMarkInnerSvg(markId, fgHex)}</g>`;
  const text = `<text x="88" y="53" fill="${fgHex}" font-family="${safeFont}" font-size="34" font-weight="600" letter-spacing="-0.02em">${safeName}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${bg}${icon}${text}</svg>`;
}

export function buildAvatarSvg(
  markId: MarkSymbolId,
  fgHex: string,
  bgHex: string,
  size = 512,
  cornerStyle: CornerStyle = 'squircle'
): string {
  const inner = `<g transform="translate(14,14) scale(0.5625)">${getMarkInnerSvg(markId, fgHex)}</g>`;
  const bgShape =
    cornerStyle === 'squircle'
      ? `<path d="${SQUIRCLE_PATH_64}" fill="${bgHex}" />`
      : `<rect width="64" height="64" rx="12" fill="${bgHex}" />`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">${bgShape}${inner}</svg>`;
}

export function getShapePathSvg(shapeId: GraphicShapeId, fillHex: string): string {
  switch (shapeId) {
    case 'clover':
      return `<path d="M50 18c10 0 18 8 18 18 10 0 18 8 18 18s-8 18-18 18c0 10-8 18-18 18s-18-8-18-18c-10 0-18-8-18-18s8-18 18-18c0-10 8-18 18-18Z" fill="${fillHex}" />`;
    case 'cloud':
      return `<path d="M50 16c11 0 20 8 21 19 10 2 17 11 17 21 0 12-10 22-22 22H34c-12 0-22-10-22-22 0-10 7-19 17-21 1-11 10-19 21-19Z" fill="${fillHex}" />`;
    case 'cross':
      return `<path d="M38 14h24v24h24v24H62v24H38V62H14V38h24V14Z" fill="${fillHex}" />`;
    case 'diamond':
      return `<rect x="22" y="22" width="56" height="56" rx="14" transform="rotate(45 50 50)" fill="${fillHex}" />`;
    case 'spark':
      return `<path d="M50 8C54 34 66 46 92 50C66 54 54 66 50 92C46 66 34 54 8 50C34 46 46 34 50 8Z" fill="${fillHex}" />`;
    case 'arch':
      return `<path d="M18 52C18 32 32 16 50 16C68 16 82 32 82 52V84H18V52Z" fill="${fillHex}" />`;
    case 'petal':
      return `<path d="M22 18H56C72 18 84 30 84 46V82H48C32 82 22 70 22 54V18Z" fill="${fillHex}" />`;
    case 'wave':
      return `<path d="M18 30C18 20 26 14 34 18C38 20 42 20 46 18C52 14 60 16 64 22C68 16 76 14 82 18C88 22 90 30 86 38L74 74C71 82 63 86 56 82C52 80 48 80 44 82C37 86 29 82 26 74L18 38Z" fill="${fillHex}" />`;
    case 'sunburst':
      return `<path d="M50 10L58 24L74 16L72 32L88 36L78 50L88 64L72 68L74 84L58 76L50 90L42 76L26 84L28 68L12 64L22 50L12 36L28 32L26 16L42 24Z" fill="${fillHex}" />`;
  }
}

export function buildGraphicShapeSvg(
  shapeId: GraphicShapeId,
  fillHex: string,
  size = 160
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">${getShapePathSvg(shapeId, fillHex)}</svg>`;
}

export function generateCssTokens(config: BrandConfig): string {
  const colorVars = config.colors.core
    .map((c) => `  --brand-color-${c.id}: ${c.hex};`)
    .join('\n');

  const motionVars = config.motion.presets
    .map(
      (m) =>
        `  --brand-motion-${m.id}: ${m.durationMs}ms cubic-bezier(${m.curve.join(', ')});`
    )
    .join('\n');

  return `/* ${config.brandName} — Design Tokens (${config.updatedLabel}) */
:root {
${colorVars}

  --brand-font-display: ${config.typography.display.cssFamily};
  --brand-font-ui: ${config.typography.ui.cssFamily};
  --brand-font-mono: ${config.typography.mono.cssFamily};
  --brand-type-base: ${config.typography.defaultBasePx}px;
  --brand-type-ratio: ${config.typography.defaultRatio};
  --brand-corner-shape: ${config.cornerStyle};

${motionVars}
}
`;
}

export function generateJsonTokens(config: BrandConfig): string {
  const payload = {
    brand: config.brandName,
    updated: config.updatedLabel,
    cornerStyle: config.cornerStyle,
    colors: Object.fromEntries(
      config.colors.core.map((c) => [
        c.id,
        { name: c.name, hex: c.hex, role: c.role, proportion: `${c.proportion}%` },
      ])
    ),
    typography: {
      display: config.typography.display.name,
      ui: config.typography.ui.name,
      mono: config.typography.mono.name,
      basePx: config.typography.defaultBasePx,
      ratio: config.typography.defaultRatio,
    },
    motion: Object.fromEntries(
      config.motion.presets.map((m) => [
        m.id,
        { durationMs: m.durationMs, cubicBezier: m.curve },
      ])
    ),
  };
  return JSON.stringify(payload, null, 2);
}

export function generateLlmsBrandSpec(config: BrandConfig): string {
  const colorsList = config.colors.core
    .map((c) => `- **${c.name}** (\`${c.hex}\`, ${c.proportion}%): ${c.usage}`)
    .join('\n');

  const voiceRules = config.voice.principles
    .map(
      (p) =>
        `### ${p.title}\n${p.subtitle}\n` +
        p.comparisons.map((row) => `- SAY: "${row.say}" | AVOID: "${row.avoid}"`).join('\n')
    )
    .join('\n\n');

  return `# ${config.brandName} — Brand Guidelines (llms.txt)
> ${config.tagline}

## Identity & Mark
- Symbol style: \`${config.mark.symbolId}\`
- Corner geometry: \`${config.cornerStyle}\` (${config.cornerStyle === 'squircle' ? 'G2 superellipse' : 'G1 circular radius'})
- Minimum sizes: ${config.mark.minPrintMm}mm print / ${config.mark.minDigitalPx}px digital
- Clearspace: ${config.mark.clearspaceUnitLabel}

## Color Palette
${colorsList}

## Typography
- Display: ${config.typography.display.name} (${config.typography.display.cssFamily})
- UI & Body: ${config.typography.ui.name} (${config.typography.ui.cssFamily})
- Mono: ${config.typography.mono.name} (${config.typography.mono.cssFamily})
- Type scale: Base ${config.typography.defaultBasePx}px, Ratio ${config.typography.defaultRatio}

## Tone of Voice
${config.voice.summary}

${voiceRules}
`;
}

export async function svgToPngBlob(
  svgString: string,
  width: number,
  height: number
): Promise<Blob> {
  const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(svgBlob);

  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(err);
      image.src = url;
    });

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Could not acquire 2D canvas context');
    }
    ctx.drawImage(img, 0, 0, width, height);

    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Canvas PNG export returned null'));
        }
      }, 'image/png');
    });
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function copyText(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }
  if (typeof document !== 'undefined') {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const ok = document.execCommand('copy');
      document.body.removeChild(textarea);
      return ok;
    } catch {
      document.body.removeChild(textarea);
      return false;
    }
  }
  return false;
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(
  content: string,
  filename: string,
  mimeType = 'text/plain;charset=utf-8'
): void {
  downloadBlob(new Blob([content], { type: mimeType }), filename);
}
