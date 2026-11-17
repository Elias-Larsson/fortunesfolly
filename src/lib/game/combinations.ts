import type { Combination } from '#lib/types/scoring.ts';

export const scoring_combinations: Combination[] = [
	{ name: 'One', values: [1], score: 100 },
	{ name: 'Five', values: [5], score: 50 },

	{ name: 'Straight 1–5', values: [1, 2, 3, 4, 5], score: 500 },
	{ name: 'Straight 2–6', values: [2, 3, 4, 5, 6], score: 750 },
	{ name: 'Full straight 1–6', values: [1, 2, 3, 4, 5, 6], score: 1500 }
];
