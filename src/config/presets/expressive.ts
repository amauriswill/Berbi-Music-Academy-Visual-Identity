import type { BrandConfig } from '../../types/brand';
import { EDITORIAL_PRESET } from './editorial';

export const EXPRESSIVE_PRESET: BrandConfig = {
  ...EDITORIAL_PRESET,
  id: 'gleam-studio',
  preset: 'expressive',
  cornerStyle: 'squircle',
  brandName: 'Gleam',
  tagline: 'Gleam is the app for booking home cleaning.',
  updatedLabel: 'Updated November 2026',
  heroSubtitle:
    'This is an introduction to who we are, what we stand for, and how the brand shows up.',
  storyParagraphs: [
    'Gleam turns everyday home care into a calm, dependable ritual. Our visual language balances rich editorial warmth with tactile geometric shapes that feel joyful without ever feeling chaotic.',
    'The primary lockup pairs a crisp modular floral-spark symbol with confident sans-serif typography, anchored on deep Plum and warm Paper tones while reserving Ochre, Raspberry, Slate, and Lilac for expressive moments.',
  ],
  mark: {
    symbolId: 'gleam',
    clearspaceUnitLabel: '1x symbol radius on all sides',
    minPrintMm: 16,
    minDigitalPx: 88,
    description:
      'The primary mark pairs the symbol with the wordmark. Use it first, always. There is a wide version for horizontal spaces and a stacked version for tighter footprints. Only use the isolated symbol when the brand is already established.',
  },
  colors: {
    core: [
      {
        id: 'paper',
        name: 'Paper',
        hex: '#F6F3EC',
        role: 'surface',
        proportion: 40,
        span: 1,
        usage: 'Primary warm canvas across marketing pages, product cards, and spacious documentation.',
        shades: [
          { label: '50', hex: '#FCFBF8' },
          { label: '200', hex: '#EAE4D8' },
          { label: '400', hex: '#D6CCBA' },
        ],
      },
      {
        id: 'plum',
        name: 'Plum',
        hex: '#461C2E',
        role: 'primary',
        proportion: 25,
        span: 1,
        usage: 'Signature brand ink and hero surface color, carrying authority and warmth.',
        shades: [
          { label: '900', hex: '#2B0F1B' },
          { label: '600', hex: '#632942' },
          { label: '200', hex: '#DFC5D0' },
        ],
      },
      {
        id: 'ochre',
        name: 'Ochre',
        hex: '#E6BA4D',
        role: 'accent',
        proportion: 10,
        span: 1,
        usage: 'Bright optimistic highlight used sparingly for calls to action and expressive brand shapes.',
        shades: [
          { label: '600', hex: '#C69527' },
          { label: '300', hex: '#F2D688' },
          { label: '100', hex: '#FBF1D4' },
        ],
      },
      {
        id: 'raspberry',
        name: 'Raspberry',
        hex: '#B3285C',
        role: 'secondary',
        proportion: 10,
        span: 1,
        usage: 'Secondary expressive accent for campaign photography and packaging badges.',
        shades: [
          { label: '700', hex: '#861B44' },
          { label: '300', hex: '#F2B8CD' },
        ],
      },
      {
        id: 'slate',
        name: 'Slate',
        hex: '#2F659B',
        role: 'accent',
        proportion: 10,
        span: 1,
        usage: 'Cool balancing tone for service categories, tags, and informational accents.',
        shades: [
          { label: '800', hex: '#1E466E' },
          { label: '300', hex: '#AFCBE8' },
        ],
      },
      {
        id: 'night',
        name: 'Night',
        hex: '#161118',
        role: 'ink',
        proportion: 5,
        span: 1,
        usage: 'Deepest contrast ink for small UI copy and monochrome prints.',
      },
    ],
    contrastPairs: [
      { id: 'g1', label: 'Plum on Paper', fgColorId: 'plum', bgColorId: 'paper' },
      { id: 'g2', label: 'Paper on Plum', fgColorId: 'paper', bgColorId: 'plum' },
      { id: 'g3', label: 'Night on Paper', fgColorId: 'night', bgColorId: 'paper' },
      { id: 'g4', label: 'Paper on Slate', fgColorId: 'paper', bgColorId: 'slate' },
      { id: 'g5', label: 'Night on Ochre', fgColorId: 'night', bgColorId: 'ochre' },
      { id: 'g6', label: 'Paper on Raspberry', fgColorId: 'paper', bgColorId: 'raspberry' },
      { id: 'g7', label: 'Ochre on Paper', fgColorId: 'ochre', bgColorId: 'paper' },
    ],
    proportionRationale:
      'Think about how much of each color appears across a screen. Paper carries most of the canvas, Plum anchors the brand voice, and Ochre, Raspberry, and Slate appear as intentional sparks rather than competing backgrounds.',
  },
  typography: {
    ...EDITORIAL_PRESET.typography,
    display: {
      id: 'display',
      name: 'Plus Jakarta Sans',
      cssFamily: "'Plus Jakarta Sans', sans-serif",
      roleLabel: 'Primary Display & Wordmark',
      description:
        'Clean geometric proportions with friendly open apertures, tuned for expressive large-scale headlines and modern digital interfaces.',
      weights: [500, 600, 700],
      sampleSentence: 'Come home to it done.',
    },
    ui: {
      id: 'ui',
      name: 'Inter',
      cssFamily: "'Inter', sans-serif",
      roleLabel: 'UI & Body',
      description: 'Neutral, highly legible sans-serif for booking flows, checklists, and clear product copy.',
      weights: [400, 500, 600, 700],
      sampleSentence: 'Book a trusted home refresh in under sixty seconds, tailored to every room.',
    },
  },
  graphics: {
    summary:
      'Nine signature brand shapes used as framing containers, packaging stickers, and ambient backgrounds. Click any card to copy the clean SVG.',
    elements: [
      { id: 's1', name: 'Sun Clover', shapeId: 'clover', colorId: 'ochre', usage: 'Highlight badge & sticker' },
      { id: 's2', name: 'Blush Cloud', shapeId: 'cloud', colorId: 'raspberry', usage: 'Soft photo mask' },
      { id: 's3', name: 'Plum Cross', shapeId: 'cross', colorId: 'plum', usage: 'Structural anchor' },
      { id: 's4', name: 'Slate Diamond', shapeId: 'diamond', colorId: 'slate', usage: 'Tag & checklist motif' },
      { id: 's5', name: 'Gleam Spark', shapeId: 'spark', colorId: 'raspberry', usage: 'Cleanliness glint accent' },
      { id: 's6', name: 'Portal Arch', shapeId: 'arch', colorId: 'ochre', usage: 'Doorway & frame container' },
      { id: 's7', name: 'Studio Petal', shapeId: 'petal', colorId: 'slate', usage: 'Editorial card mask' },
      { id: 's8', name: 'Ripple Wave', shapeId: 'wave', colorId: 'plum', usage: 'Textile & tote pattern' },
      { id: 's9', name: 'Bloom Seal', shapeId: 'sunburst', colorId: 'ochre', usage: 'Seal & promotional stamp' },
    ],
  },
};
