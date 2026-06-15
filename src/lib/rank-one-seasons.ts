import { CLASS_COLORS } from '$lib/armory';

export type RankOneClassName = 'Mage' | 'Rogue' | 'Warlock' | 'Ele Shaman';

export type RankOneSeason = {
	/** Arena season number — displayed as S2, S15, etc. */
	season: number;
	/** Season title name, e.g. Sinful Gladiator */
	name: string;
	className: RankOneClassName;
	/** Rank 1 titles on this class in this season. Omit when 1. */
	count?: number;
};

export const RANK_ONE_CLASS_LEGEND: Array<{ name: RankOneClassName; color: string }> = [
	{ name: 'Mage', color: CLASS_COLORS.Mage },
	{ name: 'Rogue', color: CLASS_COLORS.Rogue },
	{ name: 'Warlock', color: CLASS_COLORS.Warlock },
	{ name: 'Ele Shaman', color: CLASS_COLORS.Shaman }
];

export function rankOneClassColor(className: RankOneClassName): string {
	if (className === 'Ele Shaman') return CLASS_COLORS.Shaman;
	return CLASS_COLORS[className];
}

export function formatSeasonNumber(season: number): string {
	return `S${season}`;
}

/** Shown in the Titles card header — use 20+ when you have at least twenty entries. */
export function seasonCountLabel(count: number): string {
	return count >= 20 ? '20+' : String(count);
}

export function totalRankOneCount(seasons: RankOneSeason[]): number {
	return seasons.reduce((sum, season) => sum + (season.count ?? 1), 0);
}

/** Add every Rank 1 season below. Use count when you had multiple on the same class in one season. */
export const RANK_ONE_SEASONS: RankOneSeason[] = [
	{ season: 15, name: 'Your season name', className: 'Mage', count: 3 },
	{ season: 14, name: 'Your season name', className: 'Mage' },
	{ season: 13, name: 'Your season name', className: 'Mage' },
	{ season: 12, name: 'Your season name', className: 'Mage' },
	{ season: 11, name: 'Your season name', className: 'Mage' },
	{ season: 10, name: 'Your season name', className: 'Mage' },
	{ season: 9, name: 'Your season name', className: 'Mage' },
	{ season: 8, name: 'Your season name', className: 'Mage' },
	{ season: 7, name: 'Your season name', className: 'Mage' },
	{ season: 6, name: 'Your season name', className: 'Mage' },
	{ season: 5, name: 'Your season name', className: 'Mage' },
	{ season: 4, name: 'Your season name', className: 'Mage' },
	{ season: 3, name: 'Your season name', className: 'Mage' },
	{ season: 2, name: 'Your season name', className: 'Mage' },
	{ season: 1, name: 'Your season name', className: 'Mage' },
	{ season: 16, name: 'Your season name', className: 'Mage' },
	{ season: 17, name: 'Your season name', className: 'Rogue' },
	{ season: 18, name: 'Your season name', className: 'Rogue' },
	{ season: 19, name: 'Your season name', className: 'Warlock' },
	{ season: 20, name: 'Your season name', className: 'Ele Shaman' }
];
