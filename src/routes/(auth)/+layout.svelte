<script lang="ts">
	import { page } from '$app/stores';
	export let data;
</script>

<div class="flex h-full w-full flex-col-reverse bg-blue-200 sm:flex-row">
	<div
		class="flex h-full grid-cols-2 flex-col justify-between gap-10 bg-white px-10 py-4 shadow-md"
	>
		<h1 class="font-semibold">
			{$page.url.pathname.includes('/login') ? 'Login' : 'Register'}
		</h1>
		<slot></slot>
		<footer></footer>
	</div>
	<div class="h-full w-full bg-black"></div>
</div>
