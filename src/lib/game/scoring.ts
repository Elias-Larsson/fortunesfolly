import type { Dice } from '#lib/types/dice.ts';
import type { Combination } from '#lib/types/scoring.ts';
import { scoring_combinations } from './combinations';

type ScoringResult = {
	best_score: number;
	legal_move: boolean;
};

function score_of_a_kind(values: number[]): ScoringResult {
	const counts = new Map<number, number>();

	for (const value of values) {
		if (value < 1 || value > 6) continue;
		counts.set(value, (counts.get(value) ?? 0) + 1);
	}

	let score = 0;
	let used_count = 0;

	for (const [value, count] of counts) {
		if (count < 3) continue;

		const base_score = value === 1 ? 1000 : value * 100;
		score += base_score * 2 ** (count - 3);
		used_count += count;
	}

	return { best_score: score, legal_move: used_count === values.length };
}

function match_combination(values: number[], combination: Combination): number[] | undefined {
	const remaining = [...values];

	for (const value of combination.values) {
		const index = remaining.indexOf(value);
		if (index === -1) return undefined;
		remaining.splice(index, 1);
	}

	return remaining;
}

function find_best_score(values: number[]): ScoringResult {
	if (values.length === 0) return { best_score: 0, legal_move: true };

	let { best_score, legal_move } = score_of_a_kind(values);

	for (const combination of scoring_combinations) {
		const remaining = match_combination(values, combination);
		if (remaining === undefined) continue;

		const result = find_best_score(remaining);
		const score = combination.score + result.best_score;
		best_score = Math.max(best_score, score);
		if (result.legal_move) legal_move = true;
	}

	return { best_score, legal_move };
}

export function calculate_score(dice: Dice): ScoringResult {
	return find_best_score(dice.map((die) => die.value));
}
