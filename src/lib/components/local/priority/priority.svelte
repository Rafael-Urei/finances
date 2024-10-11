<script lang="ts">
	import High from '../icons/high.svelte';
	import Low from '../icons/low.svelte';
	import Medium from '../icons/medium.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { scale } from 'svelte/transition';
	import type { Priority } from '$lib/types';

	export let priority: Priority = { id: null, name: 'No priority' };
</script>

<Tooltip.Root>
	<Tooltip.Trigger>
		{#key priority.id}
			<div in:scale>
				{#if priority.id === 'urgent'}
					<svg
						width="20"
						height="20"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-5 text-rose-500"
					>
						<path
							fill-rule="evenodd"
							d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
							clip-rule="evenodd"
						/>
					</svg>
				{:else if priority.id === 'high'}
					<button title="High">
						<High></High>
					</button>
				{:else if priority.id === 'medium'}
					<button title="Medium"><Medium></Medium></button>
				{:else if priority.id === 'low'}
					<button title="Low"><Low></Low></button>
				{:else}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="size-5"
					>
						<path
							d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
						/>
					</svg>
				{/if}
			</div>
		{/key}
	</Tooltip.Trigger>
	<Tooltip.Content>
		{priority}
	</Tooltip.Content>
</Tooltip.Root>
