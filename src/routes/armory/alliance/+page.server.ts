import { getAllianceMage } from '$lib/server/armory-mages';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mage = getAllianceMage();

	if (!mage) {
		throw redirect(303, '/armory');
	}

	throw redirect(303, mage.href);
};
