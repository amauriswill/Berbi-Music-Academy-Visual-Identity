export interface NavItem {
  id: string;
  label: string;
  group: 'Introduction' | 'Brand Core' | 'Visuals & Motion' | 'Resources';
}

export const NAV_GROUPS: NavItem['group'][] = [
  'Introduction',
  'Brand Core',
  'Visuals & Motion',
  'Resources',
];

export const NAV_ITEMS: NavItem[] = [
  { id: 'foundation', label: 'Foundation', group: 'Introduction' },
  { id: 'marks', label: 'Marks', group: 'Brand Core' },
  { id: 'colors', label: 'Color palette', group: 'Brand Core' },
  { id: 'typography', label: 'Typography', group: 'Brand Core' },
  { id: 'motion', label: 'Motion', group: 'Visuals & Motion' },
  { id: 'voice', label: 'Tone of voice', group: 'Visuals & Motion' },
  { id: 'graphics', label: 'Brand shapes', group: 'Visuals & Motion' },
  { id: 'applications', label: 'Applications', group: 'Resources' },
  { id: 'exports', label: 'Exports', group: 'Resources' },
];

/**
 * Gridlines Sidebar Geometry:
 * - Outer container padding: px-3 (12px) -> Box line = 12px
 * - Row horizontal padding: px-2.5 (10px) -> Icon column leading edge = 22px
 * - Shared icon slot: w-5 (20px) centered -> Icon column centre = 32px
 * - Gap after icon column: gap-2.5 (10px) -> Label text line = 52px
 * - Trailing slot: w-6 (24px) centered -> Trailing centre = 22px from container right
 */
export const ICON_COL = 'inline-flex h-5 w-5 shrink-0 items-center justify-center';
export const TRAIL_COL = 'inline-flex h-5 w-6 shrink-0 items-center justify-center';
