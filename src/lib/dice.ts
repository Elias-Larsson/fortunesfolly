import type { Dice, Die } from '#lib/types/dice.ts';

export function create_die(sides = 6): Die {
	return { sides, value: 0 };
}

export function create_dice(count: number, sides = 6): Dice {
	return Array.from({ length: count }, () => create_die(sides));
}

export function roll_die(die: Die): Die {
	return { ...die, value: Math.floor(Math.random() * die.sides) + 1 };
}

export function roll_dice(dice: Dice): Dice {
	return dice.map(roll_die);
}
