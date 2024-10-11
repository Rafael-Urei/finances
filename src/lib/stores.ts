import { writable } from 'svelte/store';

const createStore = (initialData = []) => {
	const { set, subscribe, update } = writable(initialData);

	function updateProp() {
		update((prev) => {
			return prev;
		});
	}

	return {
		set,
		subscribe,
		update: updateProp()
	};
};

export const finances = createStore([]);
