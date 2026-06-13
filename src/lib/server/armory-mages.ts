import { env } from '$env/dynamic/private';

export type FeaturedMage = {
	realm: string;
	character: string;
	href: string;
};

function buildMage(realm?: string, character?: string): FeaturedMage | null {
	const realmSlug = realm?.trim().toLowerCase().replace(/\s+/g, '-');
	const characterName = character?.trim().toLowerCase();

	if (!realmSlug || !characterName) return null;

	return {
		realm: realmSlug,
		character: characterName,
		href: `/armory/${encodeURIComponent(realmSlug)}/${encodeURIComponent(characterName)}`
	};
}

export function getAllianceMage(): FeaturedMage | null {
	return buildMage(env.ALLIANCE_MAGE_REALM, env.ALLIANCE_MAGE_NAME);
}

export function getHordeMage(): FeaturedMage | null {
	return buildMage(env.HORDE_MAGE_REALM, env.HORDE_MAGE_NAME);
}

/** Paths to bake in at build time for static hosting (GitHub Pages). */
export function getFeaturedMagePrerenderEntries(): Array<{ realm: string; character: string }> {
	const entries: Array<{ realm: string; character: string }> = [];

	for (const mage of [getAllianceMage(), getHordeMage()]) {
		if (!mage) continue;
		entries.push({ realm: mage.realm, character: mage.character });
	}

	return entries;
}
