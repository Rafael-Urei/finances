import type { Finance } from '$lib/types';

type KeyType = 'priority' | 'status' | 'method';

const defaultKeys = {
	priority: {
		get: (finance: Finance) => finance.priority
	},
	status: {
		get: (finance: Finance) => finance.status.name
	},
	method: {
		get: (finance: Finance) => finance.method.name
	}
};

export function filterFinances(finances: Finance[], key: KeyType) {
	return finances.reduce(
		(accumulator, finance) => {
			const financeKey = defaultKeys[key].get(finance);
			if (!accumulator[financeKey]) {
				accumulator[financeKey] = [finance];
			} else {
				accumulator[financeKey] = [...accumulator[financeKey], finance];
			}
			return accumulator;
		},
		{} as Record<string, Finance>
	);
}
