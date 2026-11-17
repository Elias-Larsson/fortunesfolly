<script lang="ts">
	import type { Dice } from '#lib/types/dice.ts';
	import { create_dice, roll_dice } from '#lib/dice.ts';
	import { calculate_score } from '#lib/game/scoring.ts';
	import { onMount } from 'svelte';

	let dice = $state<Dice>(create_dice(6));
	let score = $state<number>(0);
	let hold_score = $state<number>(0);
	let acc_score = $state<number>(0);
	
	onMount(() => {
     	dice = roll_dice(dice);
     	score = calculate_score(dice);
	});

	function handle_roll(): void {
	    if(!dice.some((die) => die.hold && hold_score > 0)) {
			return;
			// gray the button or tell the user needs to hold atleast one die
			// ONLY ROLL IF USER HAS HOLD_POINTS > 0
		}
        acc_score += hold_score
   	    hold_score = 0;
        dice.forEach((die) => {
          die.hold = false;
        });
        if(acc_score >= 2000) {
          acc_score = 0;
          // victory conidition and message
        }
		dice = roll_dice(dice);
		score = calculate_score(dice);
	}

	function handle_hold_die(index: number): void {
		dice[index].hold = true;
		hold_score = calculate_score(dice.filter((die) => die.hold));
	}
	function handle_return_die(index: number): void {
		dice[index].hold = false;
		hold_score = calculate_score(dice.filter((die) => die.hold));
	}
	function handle_end_turn(): void {
	    acc_score = hold_score
		handle_roll()
		// end turn and start turn for next player
		
	}

	//score should be calculated á round (roll again) instead of acc_score (end turn)
	// Remove die if hold = true, however if all dice are hold = true then set dice to 6. 
	// if score = 0, reset game / end turn AND set acc_score = 0
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
<button onclick={handle_end_turn}>End turn</button>
<p>{acc_score}/2000</p>