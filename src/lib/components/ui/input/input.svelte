<script lang="ts">
	import { imask } from '@imask/svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { InputEvents } from './index.js';
	import { cn } from '$lib/utils.js';

	type $$Props = HTMLInputAttributes;
	type $$Events = InputEvents;

	let className: $$Props['class'] = undefined;
	export let value: $$Props['value'] = undefined;
	export let mask:
		| 'date'
		| 'phone'
		| 'numeric'
		| 'decimal'
		| 'integer'
		| 'zip'
		| 'ssn'
		| 'custom'
		| undefined = undefined;
	export { className as class };

	let options = [
		{
			mask: [
				{
					mask: '0000 0000'
				},
				{
					mask: '0 0000 0000'
				},
				{
					mask: '(00) 0000 0000'
				},
				{
					mask: '(00) 9 0000 0000'
				},
				{
					mask: '+00 (00) 0000 0000'
				},
				{
					mask: '+00 (00) {9} 0000 0000'
				}
			],
			type: 'phone'
		},
		{
			mask: 'num',
			blocks: {
				num: {
					mask: Number,
					thousandsSeparator: '.',
					scale: 2,
					normalizeZeros: true,
					radix: ',',
					radixFixed: true,
					mapToRadix: ['.'],
					autofix: true
				}
			},
			type: 'decimal'
		},
		{
			mask: `num`,
			blocks: {
				num: {
					mask: Number,
					thousandsSeparator: '.',
					scale: 0
				}
			},
			type: 'number'
		}
	];

	let option = options.find((option) => option.type === mask);
	$: option = option;

	function accept({ detail }) {
		console.log('accept', detail.value);
		value = detail.value;
	}

	function complete({ detail }) {
		console.log('complete', detail.unmaskedValue);
	}

	// Workaround for https://github.com/sveltejs/svelte/issues/9305
	// Fixed in Svelte 5, but not backported to 4.x.
	export let readonly: $$Props['readonly'] = undefined;
</script>

{#if mask}
	<input
		class={cn(
			'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:value
		{readonly}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
		on:wheel|passive
		use:imask={option}
		on:accept={accept}
		on:complete={complete}
		{...$$restProps}
	/>
{:else}
	<input
		class={cn(
			'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
			className
		)}
		bind:value
		{readonly}
		on:blur
		on:change
		on:click
		on:focus
		on:focusin
		on:focusout
		on:keydown
		on:keypress
		on:keyup
		on:mouseover
		on:mouseenter
		on:mouseleave
		on:mousemove
		on:paste
		on:input
		on:wheel|passive
		{...$$restProps}
	/>
{/if}
