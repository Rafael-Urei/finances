<script lang="ts">
	import Input from '$lib/components/ui/input/input.svelte';
	import { superForm } from 'sveltekit-superforms';
	import Label from '$lib/components/ui/label/label.svelte';
	import { getPlaceholder } from '$lib/utils';
	import Button from '$lib/components/ui/button/button.svelte';

	export let data;

	let loading = false;
	let showPassword = false;

	const { form, errors, enhance } = superForm(data.form);
</script>

<form method="post" use:enhance class="flex max-w-96 flex-col gap-3 sm:min-w-96">
	<h2 class="text-2xl font-semibold">Lorem</h2>
	<p class="text-xs text-gray-700">
		Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit dolor repellat libero corrupti
		nulla, id accusantium doloribus sapiente dolorem itaque error, eos sunt cum, recusandae in quod
		aperiam! Quis, quos?
	</p>
	<div>
		{#each Object.keys($form) as key}
			{@const placeholder = getPlaceholder(key)}
			{@const type =
				key === 'password' && showPassword
					? 'text'
					: key === 'password' && !showPassword
						? 'password'
						: key}
			<div>
				<Label for={key}>{key}</Label>
				<div>
					<Input id={key} name={key} {type} {placeholder} bind:value={$form[key]} />
					{#if $errors[key]}<span class="text-xs font-medium text-rose-500">{$errors[key]}</span
						>{/if}
					{#if key === 'password'}
						<button
							on:click={() => (showPassword = !showPassword)}
							class="flex items-center gap-1 pt-2 text-xs font-medium text-gray-500"
							type="button"
						>
							{#if showPassword}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path
										fill-rule="evenodd"
										d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l10.5 10.5a.75.75 0 1 0 1.06-1.06l-1.322-1.323a7.012 7.012 0 0 0 2.16-3.11.87.87 0 0 0 0-.567A7.003 7.003 0 0 0 4.82 3.76l-1.54-1.54Zm3.196 3.195 1.135 1.136A1.502 1.502 0 0 1 9.45 8.389l1.136 1.135a3 3 0 0 0-4.109-4.109Z"
										clip-rule="evenodd"
									/>
									<path
										d="m7.812 10.994 1.816 1.816A7.003 7.003 0 0 1 1.38 8.28a.87.87 0 0 1 0-.566 6.985 6.985 0 0 1 1.113-2.039l2.513 2.513a3 3 0 0 0 2.806 2.806Z"
									/>
								</svg>
								Hide password
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 16 16"
									fill="currentColor"
									class="size-4"
								>
									<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
									<path
										fill-rule="evenodd"
										d="M1.38 8.28a.87.87 0 0 1 0-.566 7.003 7.003 0 0 1 13.238.006.87.87 0 0 1 0 .566A7.003 7.003 0 0 1 1.379 8.28ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										clip-rule="evenodd"
									/>
								</svg>
								Show password
							{/if}
						</button>
					{/if}
				</div>
			</div>
		{/each}
	</div>
	<div class="flex flex-col items-center gap-2">
		<Button type="submit" disabled={loading} class="w-full">Register</Button>
		<a href="/login" class="text-xs font-semibold">Login</a>
	</div>
</form>
