import type { BrandConfig } from '../../types/brand';

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
      roleLabel: 'UI & Curriculum',
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
