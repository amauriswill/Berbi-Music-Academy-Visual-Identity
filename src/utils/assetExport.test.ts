import { describe, expect, it } from 'vitest';
import { BERBI_PRESET, EDITORIAL_PRESET } from '../config/presets';
import {
  buildAvatarSvg,
  buildGraphicShapeSvg,
  buildIsotypeSvg,
  buildLogotypeSvg,
  generateCssTokens,
  generateJsonTokens,
  generateLlmsBrandSpec,
} from './assetExport';

describe('assetExport', () => {
  it('builds standalone Figma-ready SVGs for Berbi and template marks', () => {
    const berbiIso = buildIsotypeSvg('berbi', '#14131A');
    expect(berbiIso).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(berbiIso).toContain('#14131A');

    const iso = buildIsotypeSvg('solis', '#131B16');
    expect(iso).toContain('<svg xmlns="http://www.w3.org/2000/svg"');

    const logo = buildLogotypeSvg('berbi', 'Berbi Music Academy', '#FFFFFF', '#14131A');
    expect(logo).toContain('Berbi Music Academy');
    expect(logo).toContain('#14131A');

    const avatar = buildAvatarSvg('monolith', '#FFFFFF', '#131B16', 512);
    expect(avatar).toContain('width="512"');

    const shape = buildGraphicShapeSvg('spark', '#C8923B', 160);
    expect(shape).toContain('viewBox="0 0 100 100"');
    expect(shape).toContain('#C8923B');
  });

  it('generates CSS, JSON, and llms.txt brand specifications from BERBI_PRESET and EDITORIAL_PRESET', () => {
    const berbiCss = generateCssTokens(BERBI_PRESET);
    expect(berbiCss).toContain('--brand-color-ebony: #14131A;');
    expect(berbiCss).toContain('--brand-motion-legato:');

    const berbiJson = JSON.parse(generateJsonTokens(BERBI_PRESET));
    expect(berbiJson.brand).toBe('Berbi Music Academy');
    expect(berbiJson.colors.ebony.hex).toBe('#14131A');

    const berbiLlms = generateLlmsBrandSpec(BERBI_PRESET);
    expect(berbiLlms).toContain('# Berbi Music Academy — Brand Guidelines (llms.txt)');
    expect(berbiLlms).toContain('## Tone of Voice');

    const editorialCss = generateCssTokens(EDITORIAL_PRESET);
    expect(editorialCss).toContain('--brand-color-forest: #131B16;');
  });
});
