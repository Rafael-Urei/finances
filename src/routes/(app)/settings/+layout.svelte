<script lang="ts">
	import SettingsMenu from '$lib/components/local/settings-menu/settings-menu.svelte';
</script>

<div class="flex h-full">
	<div class="h-full w-96">
		<SettingsMenu></SettingsMenu>
	</div>
	<div class="flex flex-1 flex-col overflow-y-auto">
		<slot></slot>
	</div>
</div>
