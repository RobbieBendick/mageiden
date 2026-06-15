export type FeaturedPlayer = {
	realm: string;
	character: string;
	href: string;
};

function readEnv(name: string): string | undefined {
	const value = process.env[name]?.trim();
	return value || undefined;
}

function buildFeaturedPlayer(realm?: string, character?: string): FeaturedPlayer | null {
	const realmSlug = realm?.trim().toLowerCase().replace(/\s+/g, '-');
	const characterName = character?.trim().toLowerCase();

	if (!realmSlug || !characterName) return null;

	return {
		realm: realmSlug,
		character: characterName,
		href: `/armory/${encodeURIComponent(realmSlug)}/${encodeURIComponent(characterName)}`
	};
}

export function getAlliancePlayer(): FeaturedPlayer | null {
	return buildFeaturedPlayer(readEnv('ALLIANCE_MAGE_REALM'), readEnv('ALLIANCE_MAGE_NAME'));
}

export function getHordePlayer(): FeaturedPlayer | null {
	return buildFeaturedPlayer(readEnv('HORDE_MAGE_REALM'), readEnv('HORDE_MAGE_NAME'));
}

/** Paths to bake in at build time for static hosting (GitHub Pages). */
export function getFeaturedPlayerPrerenderEntries(): Array<{ realm: string; character: string }> {
	const entries: Array<{ realm: string; character: string }> = [];

	for (const player of [getAlliancePlayer(), getHordePlayer()]) {
		if (!player) continue;
		entries.push({ realm: player.realm, character: player.character });
	}

	return entries;
}
