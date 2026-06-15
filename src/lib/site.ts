import { englishCount } from './number-words';
import { RANK_ONE_TITLE_COUNT } from './rank-one-seasons';

export const SITE_NAME = 'Mageiden';

export const DEFAULT_TITLE = `${SITE_NAME} · ${englishCount(RANK_ONE_TITLE_COUNT)} Rank 1 Arena Coach`;

/** Build a browser title: "Part · Part · Mageiden" */
export function pageTitle(...parts: string[]): string {
	return [...parts, SITE_NAME].join(' · ');
}
