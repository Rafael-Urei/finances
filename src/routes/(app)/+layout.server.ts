import { supabase } from '$lib/supabaseClient.js';
import type { Finance, Method, Status } from '$lib/types';

export const load = async () => {
	const { data: user } = await supabase.auth.getUser();
	const methods: Method[] =
		(await supabase.from('method').select('*').eq('user_id', user.user?.id)).data || [];
	const status: Status[] =
		(await supabase.from('status').select('*').eq('user_id', user.user?.id)).data || [];
	const priorities = [
		{ id: 'urgent', name: 'Urgent' },
		{ id: 'high', name: 'High' },
		{ id: 'medium', name: 'Medium' },
		{ id: 'low', name: 'Low' },
		{ id: null, name: 'No priority' }
	];

	return {
		user,
		priorities,
		methods,
		status
	};
};
