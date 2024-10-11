<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card/index';
	import { fly, scale } from 'svelte/transition';
</script>

<div class="grid grid-cols-4 gap-4">
	<div in:fly={{ x: -100, delay: 100, duration: 500 }}>
		<Card.Root class="border-transparent">
			<Card.Header class="text-lg font-medium">Created</Card.Header>
			<Card.Content>
				<span class="text-3xl font-semibold">25.3%</span>
			</Card.Content>
			<Card.Footer>
				<div in:scale={{ delay: 350 }}>
					<Badge variant="outline" class="border-transparent bg-rose-500/20 text-rose-500"
						>+2.73%</Badge
					>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
	<div in:fly={{ y: -100, delay: 200, duration: 500 }}>
		<Card.Root class="border-transparent">
			<Card.Header class="text-lg font-medium">Finished</Card.Header>
			<Card.Content>
				<span class="text-3xl font-semibold">25.3%</span>
			</Card.Content>
			<Card.Footer>
				<div in:scale={{ delay: 250 }}>
					<Badge variant="outline" class="border-transparent bg-lime-500/20 text-lime-500"
						>-2.73%</Badge
					>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
	<div in:fly={{ x: 100, delay: 300, duration: 500 }}>
		<Card.Root class="border-transparent">
			<Card.Header class="text-lg font-medium">Finished</Card.Header>
			<Card.Content>
				<span class="text-3xl font-semibold">25.3%</span>
			</Card.Content>
			<Card.Footer>
				<div in:scale={{ delay: 150 }}>
					<Badge variant="outline" class="border-transparent bg-lime-500/20 text-lime-500"
						>-2.73%</Badge
					>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
	<div in:fly={{ y: 100, delay: 400, duration: 500 }}>
		<Card.Root class="border-transparent">
			<Card.Header class="text-lg font-medium">Finished</Card.Header>
			<Card.Content>
				<span class="text-3xl font-semibold">25.3%</span>
			</Card.Content>
			<Card.Footer>
				<div in:scale={{ delay: 50 }}>
					<Badge variant="outline" class="border-transparent bg-lime-500/20 text-lime-500"
						>-2.73%</Badge
					>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
