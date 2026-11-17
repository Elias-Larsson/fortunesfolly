import type { Dice } from '#lib/types/dice.ts';
import type { Combination } from '#lib/types/scoring.ts';
import { scoring_combinations } from './combinations';

function score_of_a_kind(values: number[]): number {
	const counts = new Map<number, number>();

	for (const value of values) {
		if (value < 1 || value > 6) continue;
		counts.set(value, (counts.get(value) ?? 0) + 1);
	}

	let score = 0;

	for (const [value, count] of counts) {
		if (count < 3) continue;

		const base_score = value === 1 ? 1000 : value * 100;
		score += base_score * 2 ** (count - 3);
	}

	return score;
}

function match_combination(
	values: number[],
	combination: Combination
): number[] | undefined {
	const remaining = [...values];

	for (const value of combination.values) {
		const index = remaining.indexOf(value);
		if (index === -1) return undefined;
		remaining.splice(index, 1);
	}

	return remaining;
}

function find_best_score(values: number[]): { best_score: number, legal_move: boolean }{
	let best_score = score_of_a_kind(values);
  const legal_move = true;
	for (const combination of scoring_combinations) {
		const remaining = match_combination(values, combination);
    if (remaining === undefined) {
      legal_move = false;
      continue
    };

		const score = combination.score + find_best_score(remaining);
		best_score = Math.max(best_score, score);
	}

	return best_score;
}

export function calculate_score(dice: Dice): number {
	return find_best_score(dice.map((die) => die.value));
}
