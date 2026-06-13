export const SITE_NAME = 'Mageiden';

export const DEFAULT_TITLE = `${SITE_NAME} · 20x Rank 1 Arena Mage`;

/** Build a browser title: "Part · Part · Mageiden" */
export function pageTitle(...parts: string[]): string {
	return [...parts, SITE_NAME].join(' · ');
}
