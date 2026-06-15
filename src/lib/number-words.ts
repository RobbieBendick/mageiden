const ONES = [
	'zero',
	'one',
	'two',
	'three',
	'four',
	'five',
	'six',
	'seven',
	'eight',
	'nine',
	'ten',
	'eleven',
	'twelve',
	'thirteen',
	'fourteen',
	'fifteen',
	'sixteen',
	'seventeen',
	'eighteen',
	'nineteen'
] as const;

const TENS = [
	'',
	'',
	'twenty',
	'thirty',
	'forty',
	'fifty',
	'sixty',
	'seventy',
	'eighty',
	'ninety'
] as const;

/** e.g. 21 → "twenty-one", 100 → "one hundred" */
export function numberToEnglish(n: number): string {
	if (!Number.isInteger(n) || n < 0) {
		return String(n);
	}

	if (n < 20) {
		return ONES[n];
	}

	if (n < 100) {
		const ten = Math.floor(n / 10);
		const one = n % 10;
		return one ? `${TENS[ten]}-${ONES[one]}` : TENS[ten];
	}

	if (n < 1000) {
		const hundred = Math.floor(n / 100);
		const rest = n % 100;
		const prefix = `${ONES[hundred]} hundred`;
		return rest ? `${prefix} ${numberToEnglish(rest)}` : prefix;
	}

	return String(n);
}

export function capitalizeEnglish(text: string): string {
	return text.charAt(0).toUpperCase() + text.slice(1);
}

export function englishCount(n: number, capitalize = false): string {
	const words = numberToEnglish(n);
	return capitalize ? capitalizeEnglish(words) : words;
}
