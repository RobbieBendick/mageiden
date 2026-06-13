import { getFeaturedMages } from '$lib/server/armory-mages';
import { hasBlizzardCredentials } from '$lib/server/blizzard';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mages = getFeaturedMages();

	return {
		configured: hasBlizzardCredentials(),
		mages
	};
};
