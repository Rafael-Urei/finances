import { createClient } from '@supabase/supabase-js';
import { PUBLIC_API_KEY, PUBLIC_API_URL } from '$env/static/public';
import { goto } from '$app/navigation';

export const supabase = createClient(PUBLIC_API_URL, PUBLIC_API_KEY);

export const login = async (email: string, password: string) => {
	const auth = await supabase.auth.signInWithPassword({ email, password });
	return auth;
};

export const signout = async () => {
	await supabase.auth.signOut();
	goto('/login');
};
