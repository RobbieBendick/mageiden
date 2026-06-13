import { env } from '$env/dynamic/private';

export type FeaturedMage = {
	realm: string;
	character: string;
	href: string;
};

function buildMage(realm?: string, character?: string): FeaturedMage | null {
	const realmSlug = realm?.trim();
	const characterName = character?.trim();

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

export function getFeaturedMages() {
	return {
		alliance: getAllianceMage(),
		horde: getHordeMage()
	};
}
