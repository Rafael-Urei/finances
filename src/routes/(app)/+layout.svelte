<script lang="ts">
	import Menu from '$lib/components/local/menu/menu.svelte';

	export let data;
</script>

<Menu></Menu>
<main class="flex-1 lg:px-32">
	<slot></slot>
</main>
