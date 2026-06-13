/**
 * Editable table for talent tree layout: row, column, icon, and prerequisites per talent.
 * Edit the arrays in each class file to position talents. Talent IDs come from the Blizzard API (t.talent.id).
 *
 * icon: spell key from spell-info (e.g. "heroic strike") — uses that spell's icon.
 * blank: true = reserve (row,col) but hide the node.
 */

export type TalentLayoutRow = {
  /** API talent id (tree.talents[].talent.id). Optional if name is set. */
  talentId?: number;
  /** Match by spell name (e.g. "Improved Heroic Strike"). Use array for aliases (e.g. ["Deflection", "Parry"]). */
  name?: string | string[];
  row: number;
  col: number;
  /** Max rank for display (e.g. 3 or 5). Overrides API when set. */
  maxRank?: number;
  /** Spell key from spell-info (e.g. "heroic strike") — uses that spell's icon. */
  icon?: string;
  /** When true, this slot is blank — reserve (row,col) but hide the node. */
  blank?: boolean;
  /** Fallback tooltip. Use {{percent}} and set percentPerRank to show e.g. 30% when rank is 3. */
  description?: string;
  /** Percentage per rank (e.g. 10). Replaces {{percent}} in description with (percentPerRank * rank). */
  percentPerRank?: number;
  /** Wowhead spell ID for tooltip link (e.g. 12658 for Improved Rend). */
  spellId?: number;
  /** Prereq nodes by their grid position (row, col). */
  prerequisites?: Array<{ row: number; col: number }>;
};

/** Layout table keyed by specialization name (e.g. "Arcane", "Fire", "Frost", "Assassination"). */
export type TalentLayoutTable = Record<string, TalentLayoutRow[]>;
