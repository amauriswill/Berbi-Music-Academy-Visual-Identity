import type { BrandConfig } from '../../types/brand';

export const EDITORIAL_PRESET: BrandConfig = {
  id: 'atelier-solis',
  preset: 'editorial',
  cornerStyle: 'squircle',
  brandName: 'Opsis Partners',
  tagline: 'An operational partner for founders and growing businesses.',
  updatedLabel: 'Updated November 2026',
  heroSubtitle:
    'This is an introduction to who we are, what we stand for, and how the brand shows up across every touchpoint.',
  storyParagraphs: [
    'Opsis Partners takes care of the operational work behind a growing business: invoices, suppliers, deadlines, and recurring processes need someone responsible for keeping them moving. Founders gain the time and attention to build, with a clear view of what has been done and what needs a decision.',
    'The symbol is built around the letter O, held by a series of connected nodes. It marks Opsis as the point where different operational areas, people, and processes are brought together into one organized system.',
    'Deep forest green, warm brown, and paper tones give the identity a settled, tactile quality. Display typography brings warmth to the name and headlines; clean sans-serif type leaves room for the message and makes operational work feel considered.',
  ],
  attribution: {
    studioName: 'Kargus Studio',
    year: '2026',
    legalNote:
      'Live brand system template. Swap src/config/brand.config.ts or use Customize to adapt this brandbook for any client.',
  },
  mark: {
    symbolId: 'solis',
    clearspaceUnitLabel: '1x cap-height around all four sides',
    minPrintMm: 18,
    minDigitalPx: 96,
    description:
      'The lockup brings the connected node symbol and the wordmark together as one unit. Keep their proportions and spacing fixed at every size. Where the full name becomes too small to read, use the isolated isotype and give it generous breathing room.',
  },
  colors: {
    core: [
      {
        id: 'forest',
        name: 'Forest',
        hex: '#131B16',
        role: 'primary',
        proportion: 40,
        span: 1,
        usage:
          'Main brand color. Gives the identity depth across campaign panels, notebooks, and architectural materials.',
        shades: [
          { label: '900', hex: '#0C120E' },
          { label: '700', hex: '#1E2B23' },
          { label: '500', hex: '#354A3D' },
          { label: '200', hex: '#B9C7BE' },
        ],
      },
      {
        id: 'earth',
        name: 'Earth',
        hex: '#2C2019',
        role: 'secondary',
        proportion: 25,
        span: 1,
        usage:
          'Adds natural warmth through brown surfaces, leather stationery, and tactile print materials.',
        shades: [
          { label: '900', hex: '#1C140F' },
          { label: '700', hex: '#433126' },
          { label: '500', hex: '#6E5343' },
          { label: '200', hex: '#D7CBC3' },
        ],
      },
      {
        id: 'paper',
        name: 'Paper',
        hex: '#EAE6DF',
        role: 'surface',
        proportion: 25,
        span: 1,
        usage:
          'Provides a warm, open background for editorial reading, documentation, and quiet breathing room.',
        shades: [
          { label: '100', hex: '#F7F5F1' },
          { label: '300', hex: '#DFD9CE' },
          { label: '500', hex: '#C6BEB0' },
          { label: '700', hex: '#8B8375' },
        ],
      },
      {
        id: 'black',
        name: 'Black',
        hex: '#000000',
        role: 'ink',
        proportion: 5,
        span: 2,
        usage:
          'Supports clear reproduction, monochrome printing, and crisp structural rules across documentation.',
      },
      {
        id: 'white',
        name: 'White',
        hex: '#FFFFFF',
        role: 'accent',
        proportion: 5,
        span: 1,
        usage:
          'Provides clean negative space and high-contrast ink on dark Forest and Earth backgrounds.',
      },
    ],
    contrastPairs: [
      { id: 'c1', label: 'Forest on Paper', fgColorId: 'forest', bgColorId: 'paper' },
      { id: 'c2', label: 'Paper on Forest', fgColorId: 'paper', bgColorId: 'forest' },
      { id: 'c3', label: 'Earth on Paper', fgColorId: 'earth', bgColorId: 'paper' },
      { id: 'c4', label: 'Paper on Earth', fgColorId: 'paper', bgColorId: 'earth' },
      { id: 'c5', label: 'White on Forest', fgColorId: 'white', bgColorId: 'forest' },
      { id: 'c6', label: 'Black on White', fgColorId: 'black', bgColorId: 'white' },
      { id: 'c7', label: 'Forest on Earth', fgColorId: 'forest', bgColorId: 'earth' },
      { id: 'c8', label: 'White on Paper', fgColorId: 'white', bgColorId: 'paper' },
    ],
    proportionRationale:
      'Give Forest the largest share of the identity, with Paper opening up space for reading and Earth adding warmth. Black and White support the smaller details, from practical metadata to a crisp signature on a dark field.',
  },
  typography: {
    display: {
      id: 'display',
      name: 'Instrument Serif',
      cssFamily: "'Instrument Serif', Georgia, serif",
      roleLabel: 'Display & Editorial',
      description:
        'Brings editorial poise and human warmth to headlines, brand statements, and section openers. Let each character carry a concise thought with generous breathing room.',
      weights: [400],
      sampleSentence: 'Good things take coordination.',
    },
    ui: {
      id: 'ui',
      name: 'Inter',
      cssFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      roleLabel: 'Interface & Body',
      description:
        'The working typeface for correspondence, schedules, tables, and operational specifications that need to be scanned rapidly without visual fatigue.',
      weights: [400, 500, 600, 700],
      sampleSentence:
        'One point of contact connects your team with the people and resources they need, from the first request to the final confirmation.',
    },
    mono: {
      id: 'mono',
      name: 'JetBrains Mono',
      cssFamily: "'JetBrains Mono', ui-monospace, monospace",
      roleLabel: 'Tokens & Metadata',
      description:
        'Reserved exclusively for color values, scale measurements, cubic-bezier definitions, invoice IDs, and technical documentation.',
      weights: [400, 500],
      sampleSentence: 'HEX #131B16 · RATIO 13.79:1 · CUBIC-BEZIER(0.22, 1, 0.36, 1)',
    },
    defaultBasePx: 15,
    defaultRatio: 1.25,
  },
  motion: {
    guidelinesNote:
      'Motion should feel composed and decisive — quick to respond to intent, never decorative or bouncy. Prefer smooth deceleration for panels and subtle scale shifts for interactive cards.',
    presets: [
      {
        id: 'signature',
        name: 'Signature — Ease In Out',
        curve: [0.42, 0.0, 0.2, 1.0],
        durationMs: 320,
        usage: 'Primary transitions, drawer opens, section reveals, and brand lockup entrances.',
      },
      {
        id: 'expressive',
        name: 'Expressive — Decelerate',
        curve: [0.16, 1.0, 0.3, 1.0],
        durationMs: 420,
        usage: 'Lightbox overlays, modal dialogs, and hero editorial elements.',
      },
      {
        id: 'snappy',
        name: 'Snappy — Micro Interaction',
        curve: [0.25, 0.8, 0.25, 1.0],
        durationMs: 180,
        usage: 'Button hovers, copy-to-clipboard pills, and swatch selection rings.',
      },
      {
        id: 'gentle',
        name: 'Gentle — Ambient',
        curve: [0.37, 0.0, 0.63, 1.0],
        durationMs: 600,
        usage: 'Progress bars, background transitions, and continuous state indicators.',
      },
    ],
  },
  voice: {
    summary:
      'Opsis sounds like someone who knows the business and follows through. Use plain language, specific actions, and a measured tone. A founder should understand the position immediately and know whether anything needs attention.',
    examples: [
      { label: 'SIGN-OFF', text: 'Handled.' },
      { label: 'SHORT HEADLINE', text: 'The details have an owner.' },
      { label: 'HEADLINE', text: 'Good follow-through means you don’t have to ask twice.' },
      { label: 'BRAND STATEMENT', text: 'Opsis takes responsibility for the work between a decision and a result.' },
      {
        label: 'INTRODUCTION',
        text: 'From invoices and supplier requests to recurring deadlines, Opsis keeps track of who needs what and sees each task through, so founders can stop being the link between every moving part.',
      },
    ],
    principles: [
      {
        id: 'ownership',
        title: 'Make ownership clear',
        subtitle: 'Name the work and who is handling it.',
        comparisons: [
          {
            say: 'We follow up on unpaid invoices.',
            avoid: 'End-to-end operational solutions.',
          },
          {
            say: 'We will arrange the renewals.',
            avoid: 'Please delegate the next steps.',
          },
          {
            say: 'The supplier review is complete.',
            avoid: 'We are working on various things.',
          },
        ],
      },
      {
        id: 'useful-detail',
        title: 'Give the useful detail',
        subtitle: 'State the position, the next step, and any decision needed.',
        comparisons: [
          {
            say: 'Two invoices are awaiting payment.',
            avoid: 'Everything is under control.',
          },
          {
            say: 'Please approve the quote by Friday.',
            avoid: 'Please review at your convenience.',
          },
          {
            say: 'We will check again on Thursday.',
            avoid: 'We will follow up shortly.',
          },
        ],
      },
      {
        id: 'respect-attention',
        title: 'Respect the founder’s attention',
        subtitle: 'Offer a recommendation and make it easy to respond.',
        comparisons: [
          {
            say: 'We recommend the current provider.',
            avoid: 'Please advise on all of the above.',
          },
          {
            say: 'The lower quote saves $200 a month.',
            avoid: 'This option brings significant value.',
          },
        ],
      },
    ],
  },
  graphics: {
    summary:
      'Modular geometric primitives derived from the brand symbol. Click any element to copy its production SVG straight to your clipboard or paste into Figma.',
    elements: [
      { id: 'g1', name: 'Connected Clover', shapeId: 'clover', colorId: 'forest', usage: 'Editorial divider & corner stamp' },
      { id: 'g2', name: 'Soft Node', shapeId: 'cloud', colorId: 'earth', usage: 'Container framing & badge accent' },
      { id: 'g3', name: 'Balance Cross', shapeId: 'cross', colorId: 'paper', usage: 'Grid anchor & structural marker' },
      { id: 'g4', name: 'Axis Diamond', shapeId: 'diamond', colorId: 'forest', usage: 'Directional indicator & list marker' },
      { id: 'g5', name: 'Focal Spark', shapeId: 'spark', colorId: 'earth', usage: 'Highlight & milestone marker' },
      { id: 'g6', name: 'Vault Arch', shapeId: 'arch', colorId: 'black', usage: 'Editorial framing mask' },
      { id: 'g7', name: 'Folio Petal', shapeId: 'petal', colorId: 'forest', usage: 'Card corner & packaging seal' },
      { id: 'g8', name: 'Rhythm Wave', shapeId: 'wave', colorId: 'earth', usage: 'Pattern fill & textile motif' },
      { id: 'g9', name: 'Radial Solis', shapeId: 'sunburst', colorId: 'paper', usage: 'Watermark & seal emblem' },
    ],
  },
  applications: {
    sections: [
      {
        id: 'brand-in-use',
        title: 'Brand in use',
        description:
          'The identity should feel composed wherever people encounter it. Give each layout a clear point of entry, then let the message, image, and signature follow in a deliberate order.',
        items: [
          {
            id: 'app-transit',
            title: 'City Transit Wrap',
            category: 'Out of Home',
            caption: 'Full-side urban tram wrap pairing Forest #131B16 panels with crisp Paper typography.',
            mockupKind: 'transit',
            span: 'wide',
          },
          {
            id: 'app-stationery',
            title: 'Hardcover Folio & Calling Cards',
            category: 'Print & Stationery',
            caption: 'Debossed linen hardcover binder paired with Earth-stock letterpress business cards.',
            mockupKind: 'stationery',
            span: 'wide',
          },
        ],
      },
      {
        id: 'material-identity',
        title: 'A material identity',
        description:
          'Material gives the brand a sense of place and permanence. Warm surfaces, natural grain, and directional light bring depth to the palette and make simple compositions feel distinctive.',
        items: [
          {
            id: 'app-billboard',
            title: 'Street-Level Campaign Triptych',
            category: 'Environmental',
            caption: 'Three-panel street display alternating Paper, Earth, and Forest fields at pedestrian scale.',
            mockupKind: 'billboard',
            span: 'wide',
          },
          {
            id: 'app-signage',
            title: 'Architectural Facade & Plaque',
            category: 'Wayfinding',
            caption: 'Brushed dark bronze directional blade mounted against textured dark plaster.',
            mockupKind: 'signage',
            span: 'wide',
          },
        ],
      },
      {
        id: 'consistent-presence',
        title: 'A consistent presence',
        description:
          'Recognition depends on a few elements used with confidence. Keep the lockup intact, give it room, and choose contrast that holds up across physical spaces and digital surfaces.',
        items: [
          {
            id: 'app-flag',
            title: 'Outdoor Ceremonial Flag',
            category: 'Physical',
            caption: 'Heavyweight woven Forest banner displaying the white horizontal lockup at generous scale.',
            mockupKind: 'flag',
            span: 'wide',
          },
          {
            id: 'app-mobile',
            title: 'Digital & Packaging Touchpoints',
            category: 'Product & Merch',
            caption: 'Mobile dashboard header and heavyweight canvas tote applying consistent type hierarchy.',
            mockupKind: 'tote',
            span: 'wide',
          },
        ],
      },
    ],
  },
};
