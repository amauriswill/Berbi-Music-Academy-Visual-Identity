import type { BrandConfig, CornerStyle, GraphicShapeId, MarkSymbolId } from '../types/brand';
import { sanitizeHex } from '../utils/colorMath';
import {
  escapeXml,
  SQUIRCLE_PATH_64,
  serializeGraphicShapeInnerSvg,
  serializeMarkInnerSvg,
} from './markGeometry';

export { SQUIRCLE_PATH_64 };

/** Builds a standalone 64x64 viewBox SVG for an isolated brand mark. */
export function buildIsotypeSvg(
  markId: MarkSymbolId,
  fgHex: string,
  bgHex?: string,
  size = 256
): string {
  const safeFg = sanitizeHex(fgHex);
  const bg = bgHex ? `<rect width="64" height="64" fill="${sanitizeHex(bgHex)}" />` : '';
  const inner = `<g transform="translate(8,8) scale(0.75)">${serializeMarkInnerSvg(markId, safeFg)}</g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">${bg}${inner}</svg>`;
}

/** Builds a horizontal symbol + wordmark SVG safe for clipboard/Figma export. */
export function buildLogotypeSvg(
  markId: MarkSymbolId,
  brandName: string,
  fgHex: string,
  bgHex?: string,
  displayFont = 'Instrument Serif, Georgia, serif'
): string {
  const safeFg = sanitizeHex(fgHex);
  const safeName = escapeXml(brandName);
  const safeFont = escapeXml(displayFont);
  const width = Math.max(260, 110 + brandName.length * 22);
  const height = 84;
  const bg = bgHex ? `<rect width="${width}" height="${height}" fill="${sanitizeHex(bgHex)}" />` : '';
  const icon = `<g transform="translate(24, 18) scale(0.75)">${serializeMarkInnerSvg(markId, safeFg)}</g>`;
  const text = `<text x="88" y="53" fill="${safeFg}" font-family="${safeFont}" font-size="34" font-weight="600" letter-spacing="-0.02em">${safeName}</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">${bg}${icon}${text}</svg>`;
}

/** Builds a square favicon/avatar SVG with either G2 squircle or G1 rounded container. */
export function buildAvatarSvg(
  markId: MarkSymbolId,
  fgHex: string,
  bgHex: string,
  size = 512,
  cornerStyle: CornerStyle = 'squircle'
): string {
  const safeFg = sanitizeHex(fgHex, '#FFFFFF');
  const safeBg = sanitizeHex(bgHex, '#14131A');
  const inner = `<g transform="translate(14,14) scale(0.5625)">${serializeMarkInnerSvg(markId, safeFg)}</g>`;
  const bgShape =
    cornerStyle === 'squircle'
      ? `<path d="${SQUIRCLE_PATH_64}" fill="${safeBg}" />`
      : `<rect width="64" height="64" rx="12" fill="${safeBg}" />`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none">${bgShape}${inner}</svg>`;
}

/** Builds a standalone 100x100 viewBox SVG for an acoustic brand shape motif. */
export function buildGraphicShapeSvg(
  shapeId: GraphicShapeId,
  fillHex: string,
  size = 160
): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none">${serializeGraphicShapeInnerSvg(shapeId, fillHex)}</svg>`;
}

/** Generates CSS custom property declarations from the active brand configuration. */
export function generateCssTokens(config: BrandConfig): string {
  const colorVars = config.colors.core
    .map((c) => `  --brand-color-${c.id}: ${sanitizeHex(c.hex)};`)
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

/** Serializes brand color, typography, and motion tokens as formatted JSON. */
export function generateJsonTokens(config: BrandConfig): string {
  const payload = {
    brand: config.brandName,
    updated: config.updatedLabel,
    cornerStyle: config.cornerStyle,
    colors: Object.fromEntries(
      config.colors.core.map((c) => [
        c.id,
        { name: c.name, hex: sanitizeHex(c.hex), role: c.role, proportion: `${c.proportion}%` },
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

/** Generates an AI-readable Markdown specification (`llms.txt`) of the brand system. */
export function generateLlmsBrandSpec(config: BrandConfig): string {
  const colorsList = config.colors.core
    .map((c) => `- **${c.name}** (\`${sanitizeHex(c.hex)}\`, ${c.proportion}%): ${c.usage}`)
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
