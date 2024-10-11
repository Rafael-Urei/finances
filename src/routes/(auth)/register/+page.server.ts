import { login } from '$lib/supabaseClient.js';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const schema = z.object({
	email: z.string().min(1, { message: 'E-mail is required!' }).email(),
	password: z.string().min(6, { message: 'Minimun 6 characteres required!' })
});

export async function load() {
	const form = await superValidate(zod(schema));

	return { form };
}

export const actions = {
	default: async ({ cookies, request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { email, password } = form.data;
		const auth = await login(email, password);
		if (auth.error) {
			const code = auth.error.code;
			if (code === 'invalid_credentials')
				return setError(form, 'email', "E-mail doesn't exists or wrong password!");
		}
		if (auth.data.session) {
			cookies.set('token', auth.data.session.access_token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 7 // 1 week
			});
		}

		return { form };
	}
};
