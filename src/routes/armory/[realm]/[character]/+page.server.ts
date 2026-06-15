import {
	BlizzardApiError,
	getAnniversaryCharacter,
	getAnniversaryRealms,
	hasBlizzardCredentials,
	type ArmoryCharacter,
	type Realm
} from '$lib/server/blizzard';
import { getFeaturedPlayerPrerenderEntries } from '$lib/server/featured-players';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export function entries() {
	return getFeaturedPlayerPrerenderEntries();
}

export const load: PageServerLoad = async ({ params }) => {
	const realm = params.realm;
	const character = params.character;

	if (!hasBlizzardCredentials()) {
		return {
			configured: false,
			realms: [],
			character: null as ArmoryCharacter | null,
			realm,
			characterName: character
		};
	}

	let realms: Realm[] = [];
	try {
		realms = await getAnniversaryRealms();
	} catch (loadError) {
		console.error('Failed to load realms', loadError);
	}

	try {
		const armoryCharacter = await getAnniversaryCharacter(realm, character);
		return {
			configured: true,
			realms,
			character: armoryCharacter,
			realm,
			characterName: character
		};
	} catch (loadError) {
		if (loadError instanceof BlizzardApiError && loadError.status === 404) {
			error(404, `Could not find ${character} on ${realm}.`);
		}

		console.error('Armory lookup failed', loadError);
		error(500, 'Blizzard API lookup failed. Try again in a moment.');
	}
};
