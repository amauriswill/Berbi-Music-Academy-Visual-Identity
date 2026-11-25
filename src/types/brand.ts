export type MarkSymbolId = 'berbi' | 'solis' | 'gleam' | 'monolith' | 'kite';

export type CornerStyle = 'squircle' | 'round';

export type GraphicShapeId =
  | 'clover'
  | 'cloud'
  | 'cross'
  | 'diamond'
  | 'spark'
  | 'arch'
  | 'petal'
  | 'wave'
  | 'sunburst';

export type MockupKind =
  | 'transit'
  | 'stationery'
  | 'billboard'
  | 'signage'
  | 'flag'
  | 'tote'
  | 'mobile';

export type ColorFormat = 'HEX' | 'RGB' | 'CMYK' | 'HSL';

export interface ColorShade {
  label: string;
  hex: string;
}

export interface BrandColor {
  id: string;
  name: string;
  hex: string;
  role: 'primary' | 'secondary' | 'surface' | 'ink' | 'accent';
  proportion: number;
  span?: 1 | 2;
  usage: string;
  shades?: ColorShade[];
}

export interface ContrastPair {
  id: string;
  label: string;
  fgColorId: string;
  bgColorId: string;
}

export interface FontFamilySpec {
  id: 'display' | 'ui' | 'mono';
  name: string;
  cssFamily: string;
  roleLabel: string;
  description: string;
  weights: number[];
  sampleSentence: string;
}

export interface MotionPreset {
  id: string;
  name: string;
  curve: [number, number, number, number];
  durationMs: number;
  usage: string;
}

export interface VoiceExample {
  label: string;
  text: string;
}

export interface VoicePrinciple {
  id: string;
  title: string;
  subtitle: string;
  comparisons: {
    say: string;
    avoid: string;
  }[];
}

export interface GraphicElement {
  id: string;
  name: string;
  shapeId: GraphicShapeId;
  colorId: string;
  usage: string;
}

export interface BrandApplication {
  id: string;
  title: string;
  category: string;
  caption: string;
  mockupKind: MockupKind;
  span?: 'wide' | 'tall' | 'square';
  imageUrl?: string;
}

export interface ApplicationSection {
  id: string;
  title: string;
  description: string;
  items: BrandApplication[];
}

export interface BrandConfig {
  id: string;
  preset: 'berbi' | 'editorial' | 'expressive';
  cornerStyle: CornerStyle;
  brandName: string;
  tagline: string;
  updatedLabel: string;
  heroSubtitle: string;
  storyParagraphs: string[];
  attribution: {
    studioName: string;
    year: string;
    legalNote: string;
  };
  mark: {
    symbolId: MarkSymbolId;
    clearspaceUnitLabel: string;
    minPrintMm: number;
    minDigitalPx: number;
    description: string;
  };
  colors: {
    core: BrandColor[];
    contrastPairs: ContrastPair[];
    proportionRationale: string;
  };
  typography: {
    display: FontFamilySpec;
    ui: FontFamilySpec;
    mono: FontFamilySpec;
    defaultBasePx: number;
    defaultRatio: number;
  };
  motion: {
    presets: MotionPreset[];
    guidelinesNote: string;
  };
  voice: {
    summary: string;
    examples: VoiceExample[];
    principles: VoicePrinciple[];
  };
  graphics: {
    summary: string;
    elements: GraphicElement[];
  };
  applications: {
    sections: ApplicationSection[];
  };
}
