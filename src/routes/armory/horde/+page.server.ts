import { getHordeMage } from '$lib/server/armory-mages';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const mage = getHordeMage();

	if (!mage) {
		throw redirect(303, '/');
	}

	throw redirect(303, mage.href);
};
