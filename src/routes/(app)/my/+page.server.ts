import { supabase } from '$lib/supabaseClient.js';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	name: z.string().min(1, { message: 'Name is required!' }),
	price: z.number().min(0, { message: 'Value cannot be blank!' }),
	status_id: z.number(),
	priority: z.string(),
	method_id: z.number()
});

export const load = async ({ parent }) => {
	const { user } = await parent();

	const labels = [
		{ id: 'priority', label: 'Priority' },
		{ id: 'name', label: 'Name' },
		{ id: 'renew_date', label: 'Renew Date' },
		{ id: 'expire_date', label: 'Expire Date' },
		{ id: 'status', label: 'Status' },
		{ id: 'method', label: 'Method' },
		{ id: 'price', label: 'Amount' }
	];

	const tickets = await supabase
		.from('tickets')
		.select('*, status(*), method(*)')
		.eq('user_id', user.user?.id);

	const form = await superValidate(zod(schema));
	return {
		tickets,
		labels,
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const body = Object.keys(form.data).reduce(
			(accumulator, key) => {
				const formDataKey = key as keyof typeof form.data;
				const value = form.data[formDataKey];
				if (value) {
					accumulator[formDataKey] = value;
				}
				return accumulator;
			},
			{} as Record<string, string | number | null>
		);

		const res = await supabase.from('tickets').insert(body).select('*, status(*), method(*)');

		if (res.data) {
			return { form, finance: res.data };
		}
		return { form };
	}
};
