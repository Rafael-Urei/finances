import { supabase } from '$lib/supabaseClient';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (!user) {
		console.log('Usuário não autenticado, redirecionando para login...');
		if (event.url.pathname !== '/login') {
			event.cookies.set('returnTo', '', { path: '/', httpOnly: true, secure: true });
			throw redirect(303, '/login');
		}
	}

	const response = await resolve(event);
	return response;
};
