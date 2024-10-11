<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import Label from '$lib/components/ui/label/label.svelte';
	import { fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Columns3, ListFilter } from 'lucide-svelte';
	import { twMerge } from 'tailwind-merge';
	import Priority from '$lib/components/local/priority/priority.svelte';
	import type { Priority as PriorityType, Finance } from '$lib/types';
	import { writable, type Writable } from 'svelte/store';
	import Plus from 'lucide-svelte/icons/plus';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select';
	import { page } from '$app/stores';
	import { supabase } from '$lib/supabaseClient.js';
	import dayjs from 'dayjs';
	import { superForm } from 'sveltekit-superforms';
	import { filterFinances } from './utils.js';

	export let data;

	const priorities: PriorityType[] = $page.data.priorities;
	const finances: Writable<Finance[]> = writable(data.tickets.data || []);

	const { form, errors, enhance } = superForm(data.form, {
		onResult: ({ result }) => {
			if (result.type === 'success' && result.data) {
				addNewFinance(result.data.finance);
			}
		}
	});

	function addNewFinance(finance: Finance[]) {
		console.log(finance);
		let newFinances = [...$finances, ...finance];
		finances.set(newFinances);
	}

	async function changeValue(
		key: keyof Finance,
		value: any,
		finance: Finance,
		bodyKey?: keyof Finance,
		bodyData?: any
	) {
		if (finance[key] === value) {
			return;
		}

		const response = await supabase
			.from('tickets')
			.update({ [key]: value })
			.eq('id', finance.id);

		if (response.error) {
			return;
		}

		if ($finances) {
			finances.update((prev) =>
				prev.map((thisFinance) =>
					thisFinance.id === finance.id ? { ...thisFinance, [key]: value } : thisFinance
				)
			);
			if (bodyKey) {
				finances.update((prev) =>
					prev.map((thisFinance) =>
						thisFinance.id === finance.id ? { ...thisFinance, [bodyKey]: bodyData } : thisFinance
					)
				);
			}
		}
	}

	let condition = 'status';
</script>

<div class="flex min-h-10 w-full gap-2 pb-2">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Button variant="outline" class="flex items-center gap-1">
				<ListFilter class="scale-75"></ListFilter>
				Filter
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content></DropdownMenu.Content>
	</DropdownMenu.Root>
	<Button variant="outline" class="flex items-center gap-1">
		<Columns3 class="scale-75"></Columns3>
		View
	</Button>
	<Dialog.Root>
		<Dialog.Trigger>
			<Button variant="outline" class="flex items-center gap-1">
				<Plus class="scale-75"></Plus>
				New
			</Button></Dialog.Trigger
		>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Create a new ticket</Dialog.Title>
			</Dialog.Header>
			<form method="post" use:enhance class="flex flex-col gap-2">
				<div>
					<Label for="name">Name</Label>
					<Input id="name" name="name" placeholder="e.g Water bill" bind:value={$form.name} />
					{#if $errors.name}<span class="text-xs font-medium text-rose-500">{$errors.name}</span
						>{/if}
				</div>
				<div>
					<Label for="price">Price</Label>
					<Input
						id="price"
						name="price"
						type="number"
						placeholder="e.g $ 25.00"
						bind:value={$form.price}
					/>
					{#if $errors.price}<span class="text-xs font-medium text-rose-500">{$errors.price}</span
						>{/if}
				</div>
				<div class="flex grid-cols-2 flex-col gap-2 sm:grid">
					<div>
						<Label>Status</Label>
						<select id="status_id" name="status_id" class="hidden" bind:value={$form.status_id}>
							{#each data.status as status}
								<option value={status.id}>{status.name}</option>
							{/each}
						</select>
						<Select.Root onSelectedChange={(event) => ($form.status_id = event?.value)}>
							<Select.Trigger>
								<Select.Value placeholder="Status" />
							</Select.Trigger>
							<Select.Content>
								{#each data.status as status}
									<Select.Item value={status.id}>{status.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div>
						<Label for="priority">Priority</Label>
						<select id="priority" name="priority" class="hidden" bind:value={$form.priority}>
							{#each data.priorities as priority}
								<option value={priority.id}>{priority.name}</option>
							{/each}
						</select>
						<Select.Root onSelectedChange={(event) => ($form.priority = event?.value)}>
							<Select.Trigger>
								<Select.Value placeholder="Priority" />
							</Select.Trigger>
							<Select.Content>
								{#each priorities as priority}
									<Select.Item value={priority.id}>{priority.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div>
						<Label>Method</Label>
						<select id="method_id" name="method_id" class="hidden" bind:value={$form.method_id}>
							{#each data.methods as method}
								<option value={method.id}>{method.name}</option>
							{/each}
						</select>
						<Select.Root onSelectedChange={(event) => ($form.method_id = event?.value)}>
							<Select.Trigger>
								<Select.Value placeholder="Method" />
							</Select.Trigger>
							<Select.Content>
								{#each data.methods as method}
									<Select.Item value={method.id}>{method.name}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<Button type="submit" class="w-full">Create</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</div>
<div class="rounded-md shadow" in:fly={{ y: -100 }}>
	<Table.Root>
		<Table.Header>
			<Table.Row>
				{#each data.labels as label}
					<Table.Head class={twMerge(``, ['price'].includes(label.id) && 'text-right')}
						>{label.label}</Table.Head
					>
				{/each}
			</Table.Row>
		</Table.Header>
		<Table.Body class="font-medium">
			{#each Object.keys(filterFinances($finances, condition)) as key}
				<Table.Row>
					<Table.Cell colspan={data.labels.length} class="bg-gray-50 font-semibold">
						<div class="flex items-center gap-2">
							{#if condition === 'priority'}
								<Priority priority={{ id: key, name: key }}></Priority>
							{:else if condition === 'status'}
								<div
									class={twMerge(
										'h-3 w-3 rounded-full bg-yellow-500',
										key === 'Paid' && 'bg-green-500'
									)}
								></div>
							{/if}

							{key}
						</div>
					</Table.Cell>
				</Table.Row>
				{#if $finances}
					{#each filterFinances($finances, condition)[key] as finance}
						<tr in:fly={{ x: 20 }}>
							{#each data.labels as label}
								<Table.Cell class={twMerge(``, ['price'].includes(label.id) && 'text-right')}>
									{#if label.id === 'priority'}
										<DropdownMenu.Root>
											<DropdownMenu.Trigger class="flex items-center justify-center "
												><Priority priority={priorities.find(({ id }) => id === finance.priority)}
												></Priority></DropdownMenu.Trigger
											>
											<DropdownMenu.Content class="font-medium">
												<DropdownMenu.Group>
													{#each priorities as priority}
														<DropdownMenu.Item
															class="flex items-center gap-2 "
															on:click={() => changeValue('priority', priority.id, finance)}
														>
															<Priority {priority}></Priority>
															{priority.name}
														</DropdownMenu.Item>
													{/each}
												</DropdownMenu.Group>
											</DropdownMenu.Content>
										</DropdownMenu.Root>
									{:else if ['renew_date', 'expire_date'].includes(label.id)}
										<Input
											type="date"
											class="max-w-40"
											value={dayjs(finance[label.id]).format('YYYY-MM-DD')}
											on:change={({ target }) =>
												changeValue(label.id, dayjs(target.value).toISOString(), finance)}
										/>
									{:else if label.id === 'name'}
										<input
											id="finance-{finance.id}-name"
											name="finance-{finance.id}-name"
											class="w-max border-none bg-transparent shadow-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
											value={finance.name}
											on:change={({ target }) => changeValue('name', target.value, finance)}
										/>
									{:else if label.id === 'status'}
										<DropdownMenu.Root>
											<DropdownMenu.Trigger class="flex items-center justify-center "
												>{finance.status.name}</DropdownMenu.Trigger
											>
											<DropdownMenu.Content class="font-medium">
												<DropdownMenu.Group>
													{#each data.status as status}
														<DropdownMenu.Item
															class="flex items-center gap-2 "
															on:click={() =>
																changeValue('status_id', status.id, finance, 'status', status)}
														>
															{status.name}
														</DropdownMenu.Item>
													{/each}
												</DropdownMenu.Group>
											</DropdownMenu.Content>
										</DropdownMenu.Root>
									{:else if label.id === 'method'}
										<DropdownMenu.Root>
											<DropdownMenu.Trigger class="flex items-center justify-center "
												>{finance.method.name}</DropdownMenu.Trigger
											>
											<DropdownMenu.Content class="font-medium">
												<DropdownMenu.Group>
													{#each data.methods as method}
														<DropdownMenu.Item
															class="flex items-center gap-2 "
															on:click={() =>
																changeValue('method_id', method.id, finance, 'method', method)}
														>
															{method.name}
														</DropdownMenu.Item>
													{/each}
												</DropdownMenu.Group>
											</DropdownMenu.Content>
										</DropdownMenu.Root>
									{:else if label.id === 'price'}
										<input
											id="finance-{finance.id}-price"
											name="finance-{finance.id}-price"
											class="w-max border-none bg-transparent text-right shadow-none outline-none ring-0 focus:border-none focus:outline-none focus:ring-0"
											value={finance.price}
											on:change={({ target }) => changeValue('price', target.value, finance)}
										/>
									{/if}
								</Table.Cell>
							{/each}
						</tr>
					{/each}
				{/if}
			{/each}
		</Table.Body>
	</Table.Root>
</div>
