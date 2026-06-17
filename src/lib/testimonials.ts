export type Testimonial = {
	quote: string;
	author: string;
	context: string;
	result?: string;
	rating: number;
	accent: string;
};

export const TESTIMONIALS: Testimonial[] = [
	{
		quote:
			'hard stuck at 2100 for two seasons. mageiden walked through every rmp matchup until it finally clicked and hit glad the same month.',
		author: 'proto',
		context: '3v3 · Rogue',
		result: '2100 → Gladiator',
		rating: 5,
		accent: 'var(--purple-light)'
	},
	{
		quote:
			'had no clue how to play rmp. two sessions in and i started realizing how important my dispel magic was, and that i can fear dps to cross cc. win conditions finally made sense.',
		author: 'zuroth',
		context: '3v3 · Disc Priest',
		result: '1700 → 2200',
		rating: 4.5,
		accent: '#4ade80'
	},
	{
		quote:
			'no fluff in RM. straight matchup strats, help with positioning, and i had a vod we reviewed which helped me alot. best coach ive paid for.',
		author: 'flappywings',
		context: '2v2 · Rogue',
		result: '1800 → 2350',
		rating: 5,
		accent: '#fcd34d'
	},
	{
		quote:
			'1600 to 2200 in tbc classic. the detail on burst setups and cc chains is insane. stuff you wont get from a generic guide.',
		author: 'xenn',
		context: '3v3 Mage',
		result: '1600 → 2200',
		rating: 4.5,
		accent: 'var(--purple)'
	},
	{
		quote:
			'all i wanted was my weapon for pve. got 200 rating in 45 minutes with him and it was quick and painless. highly recommend.',
		author: 'murked',
		context: '3v3 · Resto Shaman',
		result: '1500 → 1700',
		rating: 5,
		accent: '#6ee7b7'
	},
	{
		quote:
			'finally someone whos actually played at the top not just watched streams. every piece of advice was specific to my bracket.',
		author: 'painguard',
		context: '5v5 Warlock',
		result: 'First time Gladiator',
		rating: 5,
		accent: '#f472b6'
	}
];
