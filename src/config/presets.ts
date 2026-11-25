import type { BrandConfig } from '../types/brand';

export const BERBI_PRESET: BrandConfig = {
  id: 'berbi-music-academy',
  preset: 'berbi',
  cornerStyle: 'squircle',
  brandName: 'Berbi Music Academy',
  tagline: 'Where musical discipline meets creative expression.',
  updatedLabel: 'Updated November 2026',
  heroSubtitle:
    'The official visual identity and living brandbook guiding how Berbi Music Academy looks, sounds, and resonates across studios, recitals, digital learning, and print.',
  storyParagraphs: [
    'Berbi Music Academy pairs conservatory craftsmanship with contemporary mentorship. From first scales to recital stage, every touchpoint should feel composed, rhythmic, and warmly inviting.',
    'The primary mark distills five harmonic vertical bars into an ascending soundwave and resonant note head — expressing cadence, acoustic balance, and steady student progression.',
    'Deep concert-hall Ebony, warm stringed-instrument Mahogany, Sheet Paper cream, and tactile Brass accents anchor the visual world, balancing editorial serif warmth with crisp curriculum legibility.',
  ],
  attribution: {
    studioName: 'Berbi Music Academy',
    year: '2026',
    legalNote:
      'Official Visual Identity & Live Brand System powered by Astro + EmDash CMS.',
  },
  mark: {
    symbolId: 'berbi',
    clearspaceUnitLabel: '1x cap-height around all four sides',
    minPrintMm: 18,
    minDigitalPx: 104,
    description:
      'The lockup unites the five-bar Berbi harmonic symbol with the editorial wordmark. Preserve exact spacing and bar proportions at every scale; use the isolated wave symbol alone for favicons, instrument tags, and compact studio badges.',
  },
  colors: {
    core: [
      {
        id: 'ebony',
        name: 'Ebony',
        hex: '#14131A',
        role: 'primary',
        proportion: 40,
        span: 1,
        usage:
          'Primary concert-hall ink and hero surface color. Grounds stage backdrops, sheet-music covers, and digital headers.',
        shades: [
          { label: '900', hex: '#0A090D' },
          { label: '700', hex: '#23212E' },
          { label: '500', hex: '#3D3A4F' },
          { label: '200', hex: '#C3C0CF' },
        ],
      },
      {
        id: 'mahogany',
        name: 'Mahogany',
        hex: '#4A2318',
        role: 'secondary',
        proportion: 20,
        span: 1,
        usage:
          'Inspired by seasoned acoustic wood. Brings studio warmth to faculty stationery, method books, and signage.',
        shades: [
          { label: '900', hex: '#2E140D' },
          { label: '700', hex: '#693424' },
          { label: '500', hex: '#8F4F3C' },
          { label: '200', hex: '#E0C9C1' },
        ],
      },
      {
        id: 'paper',
        name: 'Sheet Paper',
        hex: '#F5F0E6',
        role: 'surface',
        proportion: 25,
        span: 1,
        usage:
          'Warm ivory score-paper canvas designed for long-form curriculum reading, lesson sheets, and breathing room.',
        shades: [
          { label: '100', hex: '#FAF8F2' },
          { label: '300', hex: '#E8E0D0' },
          { label: '500', hex: '#D1C5AE' },
          { label: '700', hex: '#968A74' },
        ],
      },
      {
        id: 'brass',
        name: 'Brass',
        hex: '#C8923B',
        role: 'accent',
        proportion: 10,
        span: 2,
        usage:
          'Luminous metallic accent reserved for recital milestones, honors seals, and key interactive highlights.',
        shades: [
          { label: '700', hex: '#9B6E24' },
          { label: '400', hex: '#DDB26A' },
          { label: '200', hex: '#F1DAAF' },
          { label: '100', hex: '#FAF0DC' },
        ],
      },
      {
        id: 'ivory',
        name: 'Ivory',
        hex: '#FFFFFF',
        role: 'ink',
        proportion: 5,
        span: 1,
        usage:
          'Pure negative space and high-contrast ink against deep Ebony and Mahogany surfaces.',
      },
    ],
    contrastPairs: [
      { id: 'b1', label: 'Ebony on Sheet Paper', fgColorId: 'ebony', bgColorId: 'paper' },
      { id: 'b2', label: 'Sheet Paper on Ebony', fgColorId: 'paper', bgColorId: 'ebony' },
      { id: 'b3', label: 'Mahogany on Sheet Paper', fgColorId: 'mahogany', bgColorId: 'paper' },
      { id: 'b4', label: 'Sheet Paper on Mahogany', fgColorId: 'paper', bgColorId: 'mahogany' },
      { id: 'b5', label: 'Ivory on Ebony', fgColorId: 'ivory', bgColorId: 'ebony' },
      { id: 'b6', label: 'Ebony on Brass', fgColorId: 'ebony', bgColorId: 'brass' },
      { id: 'b7', label: 'Mahogany on Ebony', fgColorId: 'mahogany', bgColorId: 'ebony' },
      { id: 'b8', label: 'Brass on Sheet Paper', fgColorId: 'brass', bgColorId: 'paper' },
    ],
    proportionRationale:
      'Let Ebony and Sheet Paper carry 65% of the visual cadence so sheet music, recital programs, and lessons stay calm and readable. Layer Mahogany for acoustic warmth and reserve Brass strictly for focal moments.',
  },
  typography: {
    display: {
      id: 'display',
      name: 'Instrument Serif',
      cssFamily: "'Instrument Serif', Georgia, serif",
      roleLabel: 'Display & Recital',
      description:
        'Carries conservatory authority and lyrical poise across concert posters, brand statements, and section openers.',
      weights: [400],
      sampleSentence: 'Every note begins with intention.',
    },
    ui: {
      id: 'ui',
      name: 'Inter',
      cssFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      roleLabel: 'Curriculum & Interface',
      description:
        'Clean, balanced sans-serif for lesson syllabi, practice schedules, student portals, and enrollment flows.',
      weights: [400, 500, 600, 700],
      sampleSentence:
        'Structured weekly studio sessions pair one-on-one technique with ensemble rehearsal and live seasonal recitals.',
    },
    mono: {
      id: 'mono',
      name: 'JetBrains Mono',
      cssFamily: "'JetBrains Mono', ui-monospace, monospace",
      roleLabel: 'Tempo & Tokens',
      description:
        'Reserved for tempo markings, time signatures, color tokens, cubic-bezier curves, and room/schedule metadata.',
      weights: [400, 500],
      sampleSentence: 'BPM 120 · 4/4 · HEX #14131A · RATIO 16.0:1',
    },
    defaultBasePx: 15,
    defaultRatio: 1.25,
  },
  motion: {
    guidelinesNote:
      'Animation follows musical phrasing — smooth legato transitions for drawers and overlays, crisp staccato feedback for interactive swatches and buttons.',
    presets: [
      {
        id: 'legato',
        name: 'Legato — Ease In Out',
        curve: [0.42, 0.0, 0.2, 1.0],
        durationMs: 340,
        usage: 'Primary transitions, navigation drawers, and recital card reveals.',
      },
      {
        id: 'crescendo',
        name: 'Crescendo — Decelerate',
        curve: [0.16, 1.0, 0.3, 1.0],
        durationMs: 440,
        usage: 'Lightbox overlays, modal dialogs, and editorial hero entrances.',
      },
      {
        id: 'staccato',
        name: 'Staccato — Micro Interaction',
        curve: [0.25, 0.8, 0.25, 1.0],
        durationMs: 170,
        usage: 'Copy pills, swatch selections, and button hover responses.',
      },
      {
        id: 'fermata',
        name: 'Fermata — Ambient',
        curve: [0.37, 0.0, 0.63, 1.0],
        durationMs: 620,
        usage: 'Practice progress indicators and sustained state transitions.',
      },
    ],
  },
  voice: {
    summary:
      'Berbi Music Academy speaks like an encouraging mentor — grounded in musical craft, clear about next steps, and respectful of every student’s pace.',
    examples: [
      { label: 'SIGN-OFF', text: 'Play with purpose.' },
      { label: 'SHORT HEADLINE', text: 'Master the craft. Find your sound.' },
      { label: 'HEADLINE', text: 'Consistent practice turns curiosity into fluency.' },
      {
        label: 'BRAND STATEMENT',
        text: 'Berbi Music Academy builds confident musicians through disciplined technique and joyful ensemble performance.',
      },
      {
        label: 'INTRODUCTION',
        text: 'From foundational ear training and sight-reading to chamber ensembles and seasonal recitals, Berbi guides students of every age with clear milestones and attentive faculty mentorship.',
      },
    ],
    principles: [
      {
        id: 'progress',
        title: 'Encourage real progress',
        subtitle: 'Highlight concrete musical milestones instead of vague hype.',
        comparisons: [
          {
            say: 'Prepare two pieces for the winter recital.',
            avoid: 'Unlock your limitless musical superstar potential.',
          },
          {
            say: 'Weekly 45-minute studio coaching plus ensemble lab.',
            avoid: 'World-class holistic sonic experiences.',
          },
        ],
      },
      {
        id: 'tangible',
        title: 'Make learning tangible',
        subtitle: 'Name instruments, tempo, repertoire, and practice goals clearly.',
        comparisons: [
          {
            say: 'Focus on bow control and rhythmic steadiness at 72 BPM.',
            avoid: 'Work on general musicality and flow.',
          },
          {
            say: 'Sight-reading check-in happens on Thursday.',
            avoid: 'Assessments take place periodically.',
          },
        ],
      },
      {
        id: 'pace',
        title: 'Respect every student’s pace',
        subtitle: 'Keep guidance calm, specific, and actionable.',
        comparisons: [
          {
            say: 'Practice measures 12–24 slowly before raising tempo.',
            avoid: 'Just play it faster until it sticks.',
          },
          {
            say: 'Book a trial lesson with our piano or strings faculty.',
            avoid: 'Sign up immediately before spots vanish forever.',
          },
        ],
      },
    ],
  },
  graphics: {
    summary:
      'Nine geometric acoustic motifs inspired by rhythm, resonance, and sheet notation. Click any element to copy its production SVG straight to Figma.',
    elements: [
      { id: 'bg1', name: 'Harmonic Clover', shapeId: 'clover', colorId: 'ebony', usage: 'Recital program stamp' },
      { id: 'bg2', name: 'Acoustic Cushion', shapeId: 'cloud', colorId: 'mahogany', usage: 'Studio badge framing' },
      { id: 'bg3', name: 'Tempo Cross', shapeId: 'cross', colorId: 'brass', usage: 'Measure & grid marker' },
      { id: 'bg4', name: 'Fermata Diamond', shapeId: 'diamond', colorId: 'ebony', usage: 'Milestone & cadence marker' },
      { id: 'bg5', name: 'Overtone Spark', shapeId: 'spark', colorId: 'brass', usage: 'Honors & recital highlight' },
      { id: 'bg6', name: 'Proscenium Arch', shapeId: 'arch', colorId: 'mahogany', usage: 'Stage & portrait frame' },
      { id: 'bg7', name: 'Reed Petal', shapeId: 'petal', colorId: 'ebony', usage: 'Folder tab & score seal' },
      { id: 'bg8', name: 'Resonance Wave', shapeId: 'wave', colorId: 'mahogany', usage: 'Tote & textile pattern' },
      { id: 'bg9', name: 'Brass Rosette', shapeId: 'sunburst', colorId: 'brass', usage: 'Certificate seal emblem' },
    ],
  },
  applications: {
    sections: [
      {
        id: 'brand-in-use',
        title: 'Brand in use',
        description:
          'Every public touchpoint—from concert season banners to printed faculty cards—balances generous Sheet Paper space with disciplined Ebony typography.',
        items: [
          {
            id: 'berbi-transit',
            title: 'Concert Season City Banner',
            category: 'Out of Home',
            caption: 'Seasonal recital campaign pairing Ebony #14131A panels with Instrument Serif display type.',
            mockupKind: 'transit',
            span: 'wide',
          },
          {
            id: 'berbi-stationery',
            title: 'Method Book & Faculty Cards',
            category: 'Print & Curriculum',
            caption: 'Linen-bound academy repertoire folio paired with Mahogany and Sheet Paper faculty cards.',
            mockupKind: 'stationery',
            span: 'wide',
          },
        ],
      },
      {
        id: 'acoustic-materials',
        title: 'Acoustic materials',
        description:
          'Tactile surfaces echo concert instruments: matte ivory score paper, deep wood-toned mahogany, and subtle metallic brass accents.',
        items: [
          {
            id: 'berbi-billboard',
            title: 'Recital Series Triptych',
            category: 'Environmental',
            caption: 'Three-panel conservatory street display alternating Sheet Paper, Ebony, and Mahogany.',
            mockupKind: 'billboard',
            span: 'wide',
          },
          {
            id: 'berbi-signage',
            title: 'Practice Studio Wayfinding',
            category: 'Wayfinding',
            caption: 'Matte bronze directional studio plaque mounted outside rehearsal rooms.',
            mockupKind: 'signage',
            span: 'wide',
          },
        ],
      },
      {
        id: 'stage-and-studio',
        title: 'On stage & in studio',
        description:
          'Consistent proportions keep the five-bar harmonic mark unmistakable from hall banners down to student portal screens.',
        items: [
          {
            id: 'berbi-flag',
            title: 'Recital Hall Entrance Banner',
            category: 'Physical',
            caption: 'Heavyweight woven Ebony hall banner featuring the Ivory horizontal lockup.',
            mockupKind: 'flag',
            span: 'wide',
          },
          {
            id: 'berbi-portal',
            title: 'Sheet-Music Tote & Student Portal',
            category: 'Digital & Merch',
            caption: 'Rehearsal canvas tote with Brass emblem alongside the student lesson schedule app.',
            mockupKind: 'tote',
            span: 'wide',
          },
        ],
      },
    ],
  },
};

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
