import { CLASS_COLORS } from '$lib/armory';

export type RankOneClassName = 'Mage' | 'Rogue' | 'Warlock' | 'Ele Shaman';

/** Original retail or first Classic run. */
export type RankOneEra = 'og' | 'classic';

export type RankOneSeasonClass = {
	className: RankOneClassName;
	/** Rank 1 titles on this class in this season. Omit when 1. */
	count?: number;
};

export type RankOneSeason = {
	era: RankOneEra;
	/** Arena season number within that era — displayed as S2, S15, etc. */
	season: number;
	/** Season title name, e.g. Sinful Gladiator */
	name: string;
	/** One or more classes — add another entry for multiple classes in the same season. */
	classes: RankOneSeasonClass[];
};

export const RANK_ONE_CLASS_LEGEND: Array<{ name: RankOneClassName; color: string }> = [
	{ name: 'Mage', color: CLASS_COLORS.Mage },
	{ name: 'Rogue', color: CLASS_COLORS.Rogue },
	{ name: 'Warlock', color: CLASS_COLORS.Warlock },
	{ name: 'Ele Shaman', color: CLASS_COLORS.Shaman }
];

export const RANK_ONE_ERA_LEGEND: Array<{ era: RankOneEra; label: string; color: string }> = [
	{ era: 'og', label: 'OG', color: '#c9a227' },
	{ era: 'classic', label: 'Classic', color: '#7eb356' }
];

const ERA_LABELS: Record<RankOneEra, string> = {
	og: 'OG',
	classic: 'Classic'
};

const ERA_ORDER: RankOneEra[] = ['og', 'classic'];

export function rankOneClassColor(className: RankOneClassName): string {
	if (className === 'Ele Shaman') return CLASS_COLORS.Shaman;
	return CLASS_COLORS[className];
}

export function eraLabel(era: RankOneEra): string {
	return ERA_LABELS[era];
}

export function eraColor(era: RankOneEra): string {
	return RANK_ONE_ERA_LEGEND.find((item) => item.era === era)?.color ?? '#8b8699';
}

export function formatSeasonNumber(season: number): string {
	return `S${season}`;
}

export function groupSeasonsByEra(
	seasons: RankOneSeason[]
): Array<{ era: RankOneEra; seasons: RankOneSeason[] }> {
	const groups = Object.fromEntries(ERA_ORDER.map((era) => [era, [] as RankOneSeason[]])) as Record<
		RankOneEra,
		RankOneSeason[]
	>;

	for (const season of seasons) {
		groups[season.era].push(season);
	}

	return ERA_ORDER.filter((era) => groups[era].length > 0).map((era) => ({
		era,
		seasons: groups[era]
	}));
}

export function totalRankOneCount(seasons: RankOneSeason[]): number {
	return seasons.reduce(
		(sum, season) =>
			sum + season.classes.reduce((classSum, cls) => classSum + (cls.count ?? 1), 0),
		0
	);
}

/** Add every Rank 1 season below. Append classes on the same row for multiple classes in one season. */

export const RANK_ONE_SEASONS_OG: RankOneSeason[] = [
	{ era: 'og', season: 15, name: 'Prideful Gladiator', classes: [{ className: 'Mage' }] },
	{ era: 'og', season: 16, name: 'Primal Gladiator', classes: [{ className: 'Mage' }] },
	{ era: 'og', season: 17, name: 'Wild Gladiator', classes: [{ className: 'Mage', count: 2 }] },
	{
		era: 'og',
		season: 18,
		name: 'Warmongering Gladiator',
		classes: [{ className: 'Mage', count: 2 }]
	},
	{ era: 'og', season: 19, name: 'Vindictive Gladiator', classes: [{ className: 'Mage' }] },
	{
		era: 'og',
		season: 20,
		name: 'Fearless Gladiator',
		classes: [{ className: 'Mage' }, { className: 'Warlock' }]
	},
	{ era: 'og', season: 21, name: 'Cruel Gladiator', classes: [{ className: 'Mage', count: 2 }] },
	{ era: 'og', season: 22, name: 'Fierce Gladiator', classes: [{ className: 'Mage' }] },
	{ era: 'og', season: 23, name: 'Dominant Gladiator', classes: [{ className: 'Mage', count: 2 }] },
	{ era: 'og', season: 24, name: 'Demonic Gladiator', classes: [{ className: 'Mage' }] },
	{ era: 'og', season: 25, name: 'Dread Gladiator', classes: [{ className: 'Mage' }] },
	{ era: 'og', season: 26, name: 'Sinister Gladiator', classes: [{ className: 'Mage' }] }
];

/** First Classic arena series — fill in separately from OG. */
export const RANK_ONE_SEASONS_CLASSIC: RankOneSeason[] = [
	{
		era: 'classic',
		season: 1,
		name: 'Infernal Gladiator',
		classes: [{ className: 'Rogue' }, { className: 'Mage' }]
	},
	{ era: 'classic', season: 2, name: 'Merciless Gladiator', classes: [{ className: 'Mage' }] },
	{
		era: 'classic',
		season: 5,
		name: 'Deadly Gladiator',
		classes: [{ className: 'Ele Shaman', count: 2 }]
	}
];

export const RANK_ONE_SEASONS: RankOneSeason[] = [
	...RANK_ONE_SEASONS_OG,
	...RANK_ONE_SEASONS_CLASSIC
];

export const RANK_ONE_TITLE_COUNT = totalRankOneCount(RANK_ONE_SEASONS);
