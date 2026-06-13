export const QUALITY_COLORS: Record<string, string> = {
	POOR: '#9d9d9d',
	COMMON: '#ffffff',
	UNCOMMON: '#1eff00',
	RARE: '#0070dd',
	EPIC: '#a335ee',
	LEGENDARY: '#ff8000',
	ARTIFACT: '#e6cc80',
	HEIRLOOM: '#00ccff'
};

export const LEFT_SLOTS = [
	'HEAD',
	'NECK',
	'SHOULDER',
	'BACK',
	'CHEST',
	'WRIST',
	'MAIN_HAND',
	'OFF_HAND',
	'RANGED'
] as const;

export const RIGHT_SLOTS = [
	'HANDS',
	'WAIST',
	'LEGS',
	'FEET',
	'FINGER_1',
	'FINGER_2',
	'TRINKET_1',
	'TRINKET_2'
] as const;

export const CLASS_COLORS: Record<string, string> = {
	Mage: '#3fc7eb',
	Warrior: '#c79c6e',
	Paladin: '#f58cba',
	Hunter: '#abd473',
	Rogue: '#fff569',
	Priest: '#ffffff',
	Shaman: '#0070de',
	Warlock: '#9482c9',
	Druid: '#ff7d0a'
};

export const PLACEHOLDER_ICON =
	'https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg';

export type ArmoryEnchantment = {
	enchantmentId?: number;
	enchantmentSlotType?: string;
	sourceItemId?: number;
	displayString?: string;
};

export type ArmoryItem = {
	slot: string;
	slotType: string;
	itemId: number;
	itemName: string;
	quality: string;
	itemLevel?: number;
	iconUrl?: string;
	enchantments: ArmoryEnchantment[];
};

export type BracketKey = '2v2' | '3v3' | '5v5';

export type ArenaBracketStats = {
	rating: number;
	season_match_statistics: { played: number; won: number; lost: number };
	weekly_match_statistics: { played: number; won: number; lost: number };
};

/** Raw Blizzard specializations response (loadouts + talent trees). */
export type ArmorySpecializations = Record<string, unknown>;

export type ArmoryCharacter = {
	name: string;
	realm: string;
	realmName?: string;
	level: number;
	race: string;
	className: string;
	spec?: string;
	faction: 'ALLIANCE' | 'HORDE';
	gender: string;
	guild?: string;
	avatarUrl?: string;
	equippedItemLevel?: number;
	equipment: ArmoryItem[];
	specializations?: ArmorySpecializations | null;
	arenaBrackets?: Partial<Record<BracketKey, ArenaBracketStats>>;
};

export function qualityColor(quality: string): string {
	return QUALITY_COLORS[quality] ?? '#ffffff';
}

export function classColor(className: string): string {
	return CLASS_COLORS[className] ?? '#ffffff';
}

export function getItemForSlot(items: ArmoryItem[], slotType: string): ArmoryItem | undefined {
	return items.find((item) => item.slotType === slotType);
}

export function buildWowheadAttrs(item: ArmoryItem, allItems: ArmoryItem[]): string {
	const enchantIds = item.enchantments
		.filter(
			(ench) =>
				(ench.enchantmentSlotType === 'PERMANENT' ||
					ench.enchantmentSlotType === 'ON_USE_SPELL') &&
				ench.enchantmentId
		)
		.map((ench) => ench.enchantmentId)
		.filter(Boolean)
		.join(':');

	const gemIds = item.enchantments
		.filter((ench) => !ench.enchantmentSlotType && ench.sourceItemId)
		.map((ench) => ench.sourceItemId)
		.filter(Boolean)
		.join(':');

	const setPieces = allItems
		.map((entry) => entry.itemId)
		.filter(Boolean)
		.join(':');

	let attrs = `item=${item.itemId}&lvl=70`;
	if (enchantIds) attrs += `&ench=${enchantIds}`;
	if (gemIds) attrs += `&gems=${gemIds}`;
	if (item.itemLevel) attrs += `&ilvl=${item.itemLevel}`;
	if (setPieces) attrs += `&pcs=${setPieces}`;

	return attrs;
}

export function slotLabel(slotType: string): string {
	return slotType
		.replace(/_/g, ' ')
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

declare global {
	interface Window {
		WH?: { Tooltip?: { refresh: () => void } };
	}
}

export function refreshWowheadTooltips(): void {
	window.WH?.Tooltip?.refresh();
}
