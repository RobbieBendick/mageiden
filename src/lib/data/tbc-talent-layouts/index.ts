import { mageLayouts } from './mage';
import type { TalentLayoutRow, TalentLayoutTable } from './types';

export type { TalentLayoutRow, TalentLayoutTable };

export function getLayoutKey(className: string, specName: string): string {
	return `${className}_${specName}`;
}

export const TALENT_LAYOUT_TABLE: TalentLayoutTable = (() => {
	const out: TalentLayoutTable = {};
	for (const [specName, rows] of Object.entries(mageLayouts)) {
		out[getLayoutKey('Mage', specName)] = rows;
	}
	return out;
})();

export const SPEC_DISPLAY_ORDER: Record<string, string[]> = {
	Mage: ['Arcane', 'Fire', 'Frost']
};

export const TREE_BACKGROUND_IMAGES: Record<string, Record<string, string>> = {
	Mage: {
		Arcane: 'https://wow.zamimg.com/images/wow/talents/backgrounds/tbc/81.jpg',
		Fire: 'https://wow.zamimg.com/images/wow/talents/backgrounds/tbc/41.jpg',
		Frost: 'https://wow.zamimg.com/images/wow/talents/backgrounds/tbc/61.jpg'
	}
};

export const PREREQ_LINE_STROKE_WIDTH = 7;
