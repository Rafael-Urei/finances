<script lang="ts">
	import { page } from '$app/stores';
	export let data;
</script>

<div class="flex h-full w-full bg-blue-200">
	<div
		class="flex h-full grid-cols-2 flex-col justify-between gap-10 bg-white px-10 py-4 shadow-md"
	>
		<h1 class="font-semibold">
			{$page.url.pathname.includes('/login') ? 'Login' : 'Register'}
		</h1>
		<slot></slot>
		<footer></footer>
	</div>
	<div class="flex-1 bg-[url('https://picsum.photos/536/354')] bg-cover bg-no-repeat"></div>
</div>
