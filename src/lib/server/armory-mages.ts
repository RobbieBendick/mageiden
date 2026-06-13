export type FeaturedMage = {
	realm: string;
	character: string;
	href: string;
};

function readEnv(name: string): string | undefined {
	const value = process.env[name]?.trim();
	return value || undefined;
}

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
	return buildMage(readEnv('ALLIANCE_MAGE_REALM'), readEnv('ALLIANCE_MAGE_NAME'));
}

export function getHordeMage(): FeaturedMage | null {
	return buildMage(readEnv('HORDE_MAGE_REALM'), readEnv('HORDE_MAGE_NAME'));
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
