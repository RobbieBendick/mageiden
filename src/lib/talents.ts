import {
	getLayoutKey,
	SPEC_DISPLAY_ORDER,
	TALENT_LAYOUT_TABLE,
	type TalentLayoutRow
} from '$lib/data/tbc-talent-layouts';
import { getSpellIconUrl } from '$lib/spell-info';

export interface TalentNodeData {
	name: string;
	description?: string;
	rank: number;
	maxRank: number;
	row: number;
	col: number;
	iconUrl?: string;
	prerequisites?: Array<{ row: number; col: number }>;
	blank?: boolean;
	spellId?: number;
}

type ApiTalent = {
	talent?: { id?: number; max_rank?: number };
	talent_rank?: number;
	max_rank?: number;
	spell_tooltip?: {
		description?: string;
		spell?: { id?: number; name?: string };
	};
};

function nextFreePosition(used: Set<string>, maxCol = 4): { row: number; col: number } {
	for (let r = 1; r <= 20; r++) {
		for (let c = 1; c <= maxCol; c++) {
			const key = `${r},${c}`;
			if (!used.has(key)) return { row: r, col: c };
		}
	}
	return { row: 20, col: 1 };
}

function apiTalentMatchesLayoutRow(t: ApiTalent, row: TalentLayoutRow): boolean {
	const apiId = t.talent?.id;
	const apiName = (t.spell_tooltip?.spell?.name ?? '').trim().toLowerCase();
	if (row.talentId != null && apiId != null && apiId === row.talentId) return true;
	if (row.name != null) {
		const names = Array.isArray(row.name) ? row.name : [row.name];
		if (names.some((n) => String(n).trim().toLowerCase() === apiName)) return true;
	}
	return false;
}

function layoutRowDisplayName(row: TalentLayoutRow): string {
	if (row.name == null) return '—';
	return Array.isArray(row.name) ? row.name[0] : row.name;
}

function resolveLayoutIconUrl(row: TalentLayoutRow): string | undefined {
	const fromIcon = row.icon ? getSpellIconUrl(row.icon) : null;
	if (fromIcon) return fromIcon;
	const name = layoutRowDisplayName(row);
	return name ? (getSpellIconUrl(name) ?? undefined) : undefined;
}

function resolveLayoutDescription(
	layoutRow: TalentLayoutRow,
	rank: number,
	apiDescription: string | undefined
): string | undefined {
	const { percentPerRank, description: layoutDesc } = layoutRow;
	if (percentPerRank != null && layoutDesc?.includes('{{percent}}')) {
		return layoutDesc.replace(/\{\{percent\}\}/g, String(percentPerRank * rank));
	}
	return apiDescription ?? layoutDesc ?? undefined;
}

export function buildTalentNodesFromLayout(
	className: string,
	specName: string,
	apiTalents: ApiTalent[]
): TalentNodeData[] {
	const layoutRows = TALENT_LAYOUT_TABLE[getLayoutKey(className, specName)];
	const used = new Set<string>();

	if (!layoutRows?.length) {
		return (apiTalents || []).map((t, i) => {
			const rank = t.talent_rank ?? 0;
			const name = t.spell_tooltip?.spell?.name ?? 'Talent';
			const apiMaxRank = t.talent?.max_rank ?? t.max_rank;
			const maxRank = apiMaxRank != null ? apiMaxRank : rank <= 1 ? 1 : 5;
			return {
				name,
				description: t.spell_tooltip?.description,
				rank,
				maxRank,
				row: Math.floor(i / 4),
				col: i % 4,
				prerequisites: []
			};
		});
	}

	const nodes: TalentNodeData[] = [];
	const matchedApiIndices = new Set<number>();

	for (const layoutRow of layoutRows) {
		const r = layoutRow.row;
		const c = layoutRow.col;
		used.add(`${r},${c}`);

		if (layoutRow.blank) {
			nodes.push({ name: '', rank: 0, maxRank: 1, row: r, col: c, blank: true });
			continue;
		}

		const maxRank = layoutRow.maxRank ?? 1;
		const displayName = layoutRowDisplayName(layoutRow);
		const apiIndex = (apiTalents || []).findIndex((t, idx) => {
			if (matchedApiIndices.has(idx)) return false;
			return apiTalentMatchesLayoutRow(t, layoutRow);
		});
		const spellId =
			(apiIndex >= 0 ? apiTalents[apiIndex]?.spell_tooltip?.spell?.id : undefined) ??
			layoutRow.spellId;

		if (apiIndex >= 0) {
			matchedApiIndices.add(apiIndex);
			const t = apiTalents[apiIndex];
			const rank = t.talent_rank ?? 0;
			nodes.push({
				name: t.spell_tooltip?.spell?.name ?? displayName,
				description: resolveLayoutDescription(layoutRow, rank, t.spell_tooltip?.description),
				rank,
				maxRank,
				row: r,
				col: c,
				iconUrl: resolveLayoutIconUrl(layoutRow),
				prerequisites: layoutRow.prerequisites ?? [],
				spellId
			});
		} else {
			nodes.push({
				name: displayName,
				description: resolveLayoutDescription(layoutRow, 0, undefined),
				rank: 0,
				maxRank,
				row: r,
				col: c,
				iconUrl: resolveLayoutIconUrl(layoutRow),
				prerequisites: layoutRow.prerequisites ?? [],
				spellId
			});
		}
	}

	(apiTalents || []).forEach((t, idx) => {
		if (matchedApiIndices.has(idx)) return;
		const rank = t.talent_rank ?? 0;
		const name = t.spell_tooltip?.spell?.name ?? 'Talent';
		const apiMaxRank = t.talent?.max_rank ?? t.max_rank;
		const maxRank = apiMaxRank != null ? apiMaxRank : rank <= 1 ? 1 : 5;
		const next = nextFreePosition(used, 4);
		used.add(`${next.row},${next.col}`);
		nodes.push({
			name,
			description: t.spell_tooltip?.description,
			rank,
			maxRank,
			row: next.row,
			col: next.col,
			prerequisites: []
		});
	});

	return nodes;
}

export const MAX_TALENT_POINTS = 61;

export type TalentSpec = {
	specialization_name?: string;
	spent_points?: number;
	talents?: ApiTalent[];
};

export type TalentLoadout = {
	is_active?: boolean;
	specializations?: TalentSpec[];
};

export function parseLoadouts(specializations: unknown): TalentLoadout[] {
	if (Array.isArray(specializations)) return specializations as TalentLoadout[];
	if (specializations && typeof specializations === 'object') {
		const obj = specializations as Record<string, unknown>;
		const groups = obj.specialization_groups ?? obj.loadouts;
		if (Array.isArray(groups)) return groups as TalentLoadout[];
	}
	return [];
}

export function sortSpecs(className: string, apiSpecs: TalentSpec[]): TalentSpec[] {
	const displayOrder = SPEC_DISPLAY_ORDER[className] ?? [];
	if (displayOrder.length === 0) {
		return [...apiSpecs].sort((a, b) => {
			const nameA = a.specialization_name ?? 'Spec';
			const nameB = b.specialization_name ?? 'Spec';
			const iA = displayOrder.indexOf(nameA);
			const iB = displayOrder.indexOf(nameB);
			return (iA === -1 ? 999 : iA) - (iB === -1 ? 999 : iB);
		});
	}

	return displayOrder.map((specName) => {
		const found = apiSpecs.find(
			(s) => (s.specialization_name ?? '').toLowerCase() === specName.toLowerCase()
		);
		return found ?? { specialization_name: specName, spent_points: 0, talents: [] };
	});
}

export function hasSecondaryLoadoutWithTalents(
	loadouts: TalentLoadout[],
	defaultIndex: number
): boolean {
	if (loadouts.length <= 1) return false;
	return loadouts.some((loadout, idx) => {
		if (idx === defaultIndex) return false;
		const specs = loadout.specializations ?? [];
		return specs.some(
			(s) =>
				(Array.isArray(s.talents) && s.talents.length > 0) || (s.spent_points ?? 0) > 0
		);
	});
}
