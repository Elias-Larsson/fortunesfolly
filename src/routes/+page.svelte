<script lang="ts">
	import type { Dice } from '#lib/types/dice.ts';
	import { create_dice, roll_dice } from '#lib/dice.ts';
	import { calculate_score } from '#lib/game/scoring.ts';

	let dice = $state<Dice>(create_dice(6));
	let score = $state<number>(0);
	let hold_dice = $state<Dice>([]);
	let hold_score = $state<number>(0);

	function handle_roll(): void {
	    hold_score = 0;
		dice = roll_dice(dice);
		score = calculate_score(dice);
	}

	function handle_hold_die(index: number): void {
		dice[index].hold = true;
		hold_dice = dice.filter((die) => die.hold);
		hold_score = calculate_score(hold_dice);
	}
	function handle_return_die(index: number): void {
		dice[index].hold = false;
		hold_dice = dice.filter((die) => die.hold);
		hold_score = calculate_score(hold_dice);
	}
</script>

{#each dice as die, i (i)}

	{#if !die.hold}
	<p>You rolled die {i + 1}, and got {die.value}</p>
	<button onclick={() => handle_hold_die(i)}>hold die</button>
	{:else}
	<p>You rolled die {i + 1}, and got {die.value}</p>
	<button onclick={() => handle_return_die(i)}>return die</button>
	{/if}
{/each}
<p>Score: {score}</p>
<p>Holding score: {hold_score}</p>

<button onclick={handle_roll}>Roll dice</button>
