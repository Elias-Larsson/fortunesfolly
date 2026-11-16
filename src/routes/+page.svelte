<script lang="ts">
	import type { Dice } from '#lib/types/dice.ts';
	import { create_dice, roll_dice } from '#lib/dice.ts';
	import { check_combinations } from '#lib/game/scoring.ts';

	let dice = $state<Dice>(create_dice(6));
	let result = $state<boolean>(true);
	function handle_roll(): void {
		dice = roll_dice(dice);

		result = check_combinations(dice);
	}
</script>

{#each dice as die, i (i)}
	<p>You rolled die {i + 1}, and got {die.value}</p>
{/each}
<p>{result}</p>

<button onclick={handle_roll}>Roll dice</button>
