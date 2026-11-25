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
} from './assetGenerators';

describe('assetGenerators', () => {
  it('builds standalone Figma-ready SVGs for Berbi and template marks', () => {
    const berbiIso = buildIsotypeSvg('berbi', '#14131A');
    expect(berbiIso).toContain('<svg xmlns="http://www.w3.org/2000/svg"');
    expect(berbiIso).toContain('#14131A');

    const iso = buildIsotypeSvg('solis', '#131B16');
    expect(iso).toContain('<svg xmlns="http://www.w3.org/2000/svg"');

    const logo = buildLogotypeSvg('berbi', 'Berbi Music Academy', '#FFFFFF', '#14131A');
    expect(logo).toContain('Berbi Music Academy');
    expect(logo).toContain('#14131A');

    const avatarSquircle = buildAvatarSvg('berbi', '#FFFFFF', '#14131A', 512, 'squircle');
    expect(avatarSquircle).toContain('width="512"');
    expect(avatarSquircle).toContain('<path d="M32 0');

    const avatarRound = buildAvatarSvg('monolith', '#FFFFFF', '#131B16', 512, 'round');
    expect(avatarRound).toContain('<rect width="64" height="64" rx="12"');

    const shape = buildGraphicShapeSvg('spark', '#C8923B', 160);
    expect(shape).toContain('viewBox="0 0 100 100"');
    expect(shape).toContain('#C8923B');
  });

  it('sanitizes malformed hex colors and escapes XML payloads in generated SVGs', () => {
    const xssPayload = '"><script>alert(1)</script>';

    const iso = buildIsotypeSvg('berbi', xssPayload, xssPayload);
    expect(iso).not.toContain('<script>');
    expect(iso).toContain('#14131A');

    const logo = buildLogotypeSvg('berbi', '<Berbi & Co>', xssPayload, xssPayload, 'Inter');
    expect(logo).not.toContain('<script>');
    expect(logo).toContain('&lt;Berbi &amp; Co&gt;');

    const avatar = buildAvatarSvg('berbi', xssPayload, xssPayload);
    expect(avatar).not.toContain('<script>');
    expect(avatar).toContain('#FFFFFF');
    expect(avatar).toContain('#14131A');

    const shape = buildGraphicShapeSvg('clover', xssPayload);
    expect(shape).not.toContain('<script>');
    expect(shape).toContain('#14131A');
  });

  it('generates CSS, JSON, and llms.txt brand specifications from BERBI_PRESET and EDITORIAL_PRESET', () => {
    const berbiCss = generateCssTokens(BERBI_PRESET);
    expect(berbiCss).toContain('--brand-color-ebony: #14131A;');
    expect(berbiCss).toContain('--brand-motion-legato:');
    expect(berbiCss).toContain('--brand-corner-shape: squircle;');

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
