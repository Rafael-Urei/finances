<script lang="ts">
	import { page } from '$app/stores';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { signout } from '$lib/supabaseClient';
	import { style } from './style';

	$: path = $page.route.id;

	const user = $page.data.user;

	const { header, logo, nav, navItem } = style();

	const paths = [
		{
			id: 1,
			url: '/my',
			label: 'My finances'
		},
		{
			id: 2,
			url: '/dashboard',
			label: 'Dashboard'
		}
	];
</script>

<header class={header()}>
	<nav>
		<a href="/" class={logo()}>Finances</a>
	</nav>
	<nav class={nav()}>
		{#each paths as { id, url, label } (id)}
			<a href={url} class={navItem({ path: path === url })}>{label}</a>
		{/each}
	</nav>
	<nav>
		{#if user}
			<a href="/settings">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</a>
			<button on:click={signout}>Sign Out</button>
		{:else}
			<div class="flex items-center gap-2">
				<a href="/login" class="text-sm font-medium">Sign In</a>
				<a href="/register" class="text-sm font-medium text-gray-400">Register</a>
			</div>
		{/if}
	</nav>
</header>
