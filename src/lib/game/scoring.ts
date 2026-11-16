import type { Dice } from '#lib/types/dice.ts';

function check_of_a_kind(dice: Dice): boolean {
	const counts = new Map<number, number>();

	for (const die of dice) {
		if (die.value === 0) continue;

		const count = (counts.get(die.value) ?? 0) + 1;
		counts.set(die.value, count);

		if (count >= 3) return true;
	}

	return false;
}

function check_series(dice: Dice): boolean {
	const values = new Set(dice.filter((die) => die.value > 0).map((die) => die.value));

	for (const value of values) {
		if (values.has(value + 1) && values.has(value + 2) && values.has(value + 3)) return true;
	}

	return false;
}

export function check_combinations(dice: Dice): boolean {
	return (
		dice.some((die) => die.value === 1 || die.value === 5) ||
		check_of_a_kind(dice) ||
		check_series(dice)
	);
}
