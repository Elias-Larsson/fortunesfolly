<script lang="ts">
	import type { Dice } from '#lib/types/dice.ts';
	import { create_dice, roll_dice } from '#lib/dice.ts';

	let dice = $state<Dice>(create_dice(6));

	function handle_roll(): void {
		dice = roll_dice(dice);
	}
</script>

{#each dice as die, i (i)}
	<p>You rolled die {i + 1}, and got {die.value}</p>
{/each}

<button onclick={handle_roll}>Roll dice</button>
