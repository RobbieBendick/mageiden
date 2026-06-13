import type { ArmoryCharacter, ArmoryEnchantment, ArmoryItem, ArenaBracketStats, BracketKey } from '$lib/armory';
import { env } from '$env/dynamic/private';

type Region = 'us' | 'eu' | 'kr' | 'tw';

const REGION_HOSTS: Record<Region, string> = {
	us: 'https://us.api.blizzard.com',
	eu: 'https://eu.api.blizzard.com',
	kr: 'https://kr.api.blizzard.com',
	tw: 'https://tw.api.blizzard.com'
};

const PROFILE_NAMESPACE = (region: Region) => `profile-classicann-${region}`;
const DYNAMIC_NAMESPACE = (region: Region) => `dynamic-classicann-${region}`;
const STATIC_NAMESPACE = (region: Region) => `static-classicann-${region}`;

let cachedToken: { value: string; expiresAt: number } | null = null;

function getRegion(): Region {
	const region = (env.BLIZZARD_REGION ?? 'us').toLowerCase() as Region;
	if (region in REGION_HOSTS) return region;
	return 'us';
}

function getCredentials() {
	const clientId = env.BLIZZARD_CLIENT_ID;
	const clientSecret = env.BLIZZARD_CLIENT_SECRET;

	if (!clientId || !clientSecret) {
		throw new Error('Missing BLIZZARD_CLIENT_ID or BLIZZARD_CLIENT_SECRET in environment');
	}

	return { clientId, clientSecret };
}

async function getAccessToken(): Promise<string> {
	if (cachedToken && Date.now() < cachedToken.expiresAt) {
		return cachedToken.value;
	}

	const { clientId, clientSecret } = getCredentials();
	const response = await fetch('https://oauth.battle.net/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'grant_type=client_credentials'
	});

	if (!response.ok) {
		throw new Error(`Blizzard OAuth failed (${response.status})`);
	}

	const data = (await response.json()) as { access_token: string; expires_in: number };
	cachedToken = {
		value: data.access_token,
		expiresAt: Date.now() + data.expires_in * 1000 - 60_000
	};

	return cachedToken.value;
}

async function blizzardFetch<T>(path: string, namespace: string): Promise<T> {
	const region = getRegion();
	const token = await getAccessToken();
	const url = new URL(path, REGION_HOSTS[region]);
	url.searchParams.set('namespace', namespace);
	url.searchParams.set('locale', 'en_US');

	const response = await fetch(url, {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!response.ok) {
		const body = await response.text();
		throw new BlizzardApiError(response.status, body);
	}

	return response.json() as Promise<T>;
}

export class BlizzardApiError extends Error {
	status: number;

	constructor(status: number, body: string) {
		super(`Blizzard API error (${status})`);
		this.name = 'BlizzardApiError';
		this.status = status;
	}
}

export type Realm = {
	slug: string;
	name: string;
};

type RealmIndexResponse = {
	realms: Array<{
		slug: string;
		name: string;
		category: { name: string };
	}>;
};

type CharacterSummary = {
	id: number;
	name: string;
	gender: { name: string; type: string };
	faction: { name: string; type: 'ALLIANCE' | 'HORDE' };
	race: { name: string };
	character_class: { name: string };
	active_spec?: { name: string };
	level: number;
	guild?: { name: string };
	realm?: { name: string; slug: string };
	equipped_item_level?: number;
};

type CharacterMedia = {
	assets: Array<{ key: string; value: string }>;
};

type EquippedItem = {
	slot: { name: string; type: string };
	quantity?: number;
	level?: number;
	quality?: { type: string; name: string };
	name?: string;
	media?: { key: { href: string } };
	item: {
		id: number;
		name?: string;
		quality?: { type: string; name: string };
		level?: number;
		item_class?: { name: string };
		item_subclass?: { name: string };
	};
	enchantments?: Array<{
		display_string?: string;
		enchantment_id?: number;
		enchantment_slot?: { type: string };
		source_item?: { id: number; name?: string };
	}>;
	stats?: Array<{ type: { name: string }; display: { display_string: string } }>;
};

type CharacterEquipment = {
	equipped_items: EquippedItem[];
};

type CharacterSpecializations = Record<string, unknown>;

type PvpBracketResponse = ArenaBracketStats;

const ARENA_BRACKETS: BracketKey[] = ['2v2', '3v3', '5v5'];

export type { ArmoryCharacter } from '$lib/armory';

function parseEnchantments(
	enchantments: EquippedItem['enchantments']
): ArmoryEnchantment[] {
	return (enchantments ?? []).map((entry) => ({
		enchantmentId: entry.enchantment_id,
		enchantmentSlotType: entry.enchantment_slot?.type,
		sourceItemId: entry.source_item?.id,
		displayString: entry.display_string
	}));
}

function slugifyCharacter(name: string): string {
	return name.trim().toLowerCase();
}

function slugifyRealm(realm: string): string {
	return realm.trim().toLowerCase().replace(/\s+/g, '-');
}

function toZamimgIconUrl(mediaValue: string): string | undefined {
	if (!mediaValue) return undefined;

	const raw = mediaValue.split('/').pop() || mediaValue;
	const filename = raw.includes('?') ? raw.slice(0, raw.indexOf('?')) : raw;
	if (!filename) return undefined;

	return `https://wow.zamimg.com/images/wow/icons/large/${filename}`;
}

function extractIconFromMediaData(data: unknown): string | undefined {
	if (!data || typeof data !== 'object') return undefined;

	const assets = (data as CharacterMedia).assets;
	if (!Array.isArray(assets) || assets.length === 0) return undefined;

	const iconAsset =
		assets.find((asset) => asset.key === 'icon')?.value ??
		assets[0]?.value;

	return iconAsset ? toZamimgIconUrl(iconAsset) : undefined;
}

function namespaceFromMediaHref(mediaHref?: string): string | undefined {
	if (!mediaHref) return undefined;

	try {
		return new URL(mediaHref).searchParams.get('namespace') ?? undefined;
	} catch {
		return undefined;
	}
}

async function fetchMediaHref(mediaHref: string): Promise<unknown | undefined> {
	const token = await getAccessToken();
	const response = await fetch(mediaHref, {
		headers: { Authorization: `Bearer ${token}` }
	});

	if (!response.ok) return undefined;
	return response.json();
}

async function resolveItemIcon(
	itemId: number,
	mediaHref: string | undefined,
	namespaces: string[]
): Promise<string | undefined> {
	for (const namespace of namespaces) {
		try {
			const data = await blizzardFetch<CharacterMedia>(
				`/data/wow/media/item/${itemId}`,
				namespace
			);
			const iconUrl = extractIconFromMediaData(data);
			if (iconUrl) return iconUrl;
		} catch {
			// try next namespace
		}
	}

	if (mediaHref) {
		const data = await fetchMediaHref(mediaHref);
		return extractIconFromMediaData(data);
	}

	return undefined;
}

function getItemMediaNamespaces(items: EquippedItem[]): string[] {
	const region = getRegion();
	const fromEquipment = items
		.map((entry) => namespaceFromMediaHref(entry.media?.key?.href))
		.filter((namespace): namespace is string => Boolean(namespace));

	return [...new Set([...fromEquipment, STATIC_NAMESPACE(region)])];
}

async function resolveItemIcons(
	items: EquippedItem[]
): Promise<Map<number, string>> {
	const iconMap = new Map<number, string>();
	const namespaces = getItemMediaNamespaces(items);
	const uniqueItemIds = [
		...new Set(items.map((entry) => entry.item.id).filter((id) => typeof id === 'number'))
	];

	await Promise.all(
		uniqueItemIds.map(async (itemId) => {
			const entry = items.find((item) => item.item.id === itemId);
			const iconUrl = await resolveItemIcon(itemId, entry?.media?.key?.href, namespaces);
			if (iconUrl) iconMap.set(itemId, iconUrl);
		})
	);

	return iconMap;
}

async function fetchArenaBrackets(
	basePath: string,
	namespace: string
): Promise<Partial<Record<BracketKey, ArenaBracketStats>>> {
	const brackets: Partial<Record<BracketKey, ArenaBracketStats>> = {};

	await Promise.all(
		ARENA_BRACKETS.map(async (bracket) => {
			try {
				const data = await blizzardFetch<PvpBracketResponse>(
					`${basePath}/pvp-bracket/${bracket}`,
					namespace
				);
				brackets[bracket] = data;
			} catch {
				// bracket not played or unavailable
			}
		})
	);

	return brackets;
}

export async function getAnniversaryRealms(): Promise<Realm[]> {
	const region = getRegion();
	const data = await blizzardFetch<RealmIndexResponse>(
		'/data/wow/realm/index',
		DYNAMIC_NAMESPACE(region)
	);

	return data.realms
		.map((realm) => ({ slug: realm.slug, name: realm.name }))
		.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAnniversaryCharacter(
	realm: string,
	characterName: string
): Promise<ArmoryCharacter> {
	const region = getRegion();
	const namespace = PROFILE_NAMESPACE(region);
	const realmSlug = slugifyRealm(realm);
	const nameSlug = slugifyCharacter(characterName);
	const basePath = `/profile/wow/character/${realmSlug}/${nameSlug}`;

	const [summary, equipment, media, specializations, arenaBrackets] = await Promise.all([
		blizzardFetch<CharacterSummary>(basePath, namespace),
		blizzardFetch<CharacterEquipment>(`${basePath}/equipment`, namespace),
		blizzardFetch<CharacterMedia>(`${basePath}/character-media`, namespace).catch(() => null),
		blizzardFetch<CharacterSpecializations>(`${basePath}/specializations`, namespace).catch(
			() => null
		),
		fetchArenaBrackets(basePath, namespace)
	]);

	const avatarUrl = media?.assets.find((asset) => asset.key === 'avatar')?.value;
	const equipped = equipment.equipped_items ?? [];
	const iconMap = await resolveItemIcons(equipped);

	const equippedItems: ArmoryItem[] = equipped.map((entry) => {
		const quality = entry.quality?.type ?? entry.item.quality?.type ?? 'COMMON';
		const itemName = entry.name ?? entry.item.name ?? 'Unknown item';

		return {
			slot: entry.slot.name,
			slotType: entry.slot.type,
			itemId: entry.item.id,
			itemName,
			quality,
			itemLevel: entry.level ?? entry.item.level,
			iconUrl: iconMap.get(entry.item.id),
			enchantments: parseEnchantments(entry.enchantments)
		};
	});

	return {
		name: summary.name,
		realm: realmSlug,
		realmName: summary.realm?.name,
		level: summary.level,
		race: summary.race.name,
		className: summary.character_class.name,
		spec: summary.active_spec?.name,
		faction: summary.faction.type,
		gender: summary.gender.name,
		guild: summary.guild?.name,
		avatarUrl,
		equippedItemLevel: summary.equipped_item_level,
		equipment: equippedItems,
		specializations,
		arenaBrackets
	};
}

export function hasBlizzardCredentials(): boolean {
	return Boolean(env.BLIZZARD_CLIENT_ID && env.BLIZZARD_CLIENT_SECRET);
}
