<script lang="ts">
	import type { Dice } from '#lib/types/dice.ts';
	import { create_dice, roll_dice } from '#lib/dice.ts';
	import { calculate_score } from '#lib/game/scoring.ts';
	import { onMount } from 'svelte';

	let dice = $state<Dice>(create_dice(6));
	let score = $state<number>(0);
	let hold_score = $state<number>(0);
	let turn_score = $state<number>(0);
	let acc_score = $state<number>(0);
	onMount(() => {
     	dice = roll_dice(dice);
     	score = calculate_score(dice);
        if(score === 0) setTimeout(handle_end_turn, 3000);
	});

	function handle_roll(): void {
        turn_score += hold_score
   	    hold_score = 0;
        dice = dice.filter((die) => die.hold === false)
        
        if(!dice.length) {
          dice = create_dice(6)
        }
        
        dice.forEach((die) => die.hold = false)
        
        if(turn_score >= 2000) {
          turn_score = 0;
          // victory conidition and message
        }
        
		dice = roll_dice(dice);
		score = calculate_score(dice);
		if(score === 0) setTimeout(handle_end_turn, 3000);
	}

	function handle_hold_die(index: number): void {
		dice[index].hold = dice[index].hold === true ? false : true;
		hold_score = calculate_score(dice.filter((die) => die.hold));
	}
	
	function handle_end_turn(): void {
	    acc_score += score === 0 ? 0 : hold_score + turn_score
		turn_score = 0;
		
		dice = create_dice(6)
		handle_roll()
		// end turn and start turn for next player
	}
</script>

{#each dice as die, i (i)}
	{#if !die.hold}
	<p>You rolled die {i + 1}, and got {die.value}</p>
	<button onclick={() => handle_hold_die(i)} disabled={score <= 0}>hold die</button>
	{:else}
	<p>You rolled die {i + 1}, and got {die.value}</p>
	<button onclick={() => handle_hold_die(i)}>return die</button>
	{/if}
{/each}

<p>Score: {score}</p>
<button onclick={handle_roll} disabled={hold_score <= 0}>Roll dice</button>
<button onclick={handle_end_turn} disabled={turn_score <= 0 && hold_score <= 0}>End turn</button>
<p>This turn score: {turn_score} + {hold_score}</p>
<p>total score: {acc_score}/2000</p>