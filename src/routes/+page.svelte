<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { redirect } from '@sveltejs/kit';

	if (browser) {
		goto('/my');
	} else {
		redirect(302, '/my');
	}
</script>
