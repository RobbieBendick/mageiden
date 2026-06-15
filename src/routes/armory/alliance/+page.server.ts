import { base } from '$app/paths';
import { getAlliancePlayer } from '$lib/server/featured-players';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const player = getAlliancePlayer();

	if (!player) {
		throw redirect(303, `${base}/`);
	}

	throw redirect(303, `${base}${player.href}`);
};
