import type { Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { emailSchema } from './validate';
import { message, superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals: { safeGetUser }, url }) => {

    const next = url.searchParams.get('next') || '/dashboard';

    const { user } = await safeGetUser();

    if (user) {
        redirect(303, next);
    }

    const form = await superValidate(valibot(emailSchema));

    return { form };

}) satisfies PageServerLoad;



export const actions = {

    signout: async ({ locals: { supabase } }) => {

        await supabase.auth.signOut();
        redirect(303, '/');

    },

    loginWithMagicLink: async ({ locals: { supabase }, url, request }) => {

        const form = await superValidate(request, valibot(emailSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { email } = form.data;

        const next = url.searchParams.get('next') || '/dashboard';

        const { error: _error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: url.origin + `/auth/callback?next=${next}`
            }
        });

        if (_error) {
            return fail(_error.status || 500, { message: _error.message });
        }

        return message(form, 'Logged in Successfully');

    },

    // TODO - Fix providers

    loginWithProvider: async ({ locals: { supabase }, url, request }) => {

        const { provider } = Object.fromEntries(await request.formData());

        if (provider !== 'google' && provider !== 'apple' && provider !== 'github') {
            error(500, 'Invalid provider');
        }

        const next = url.searchParams.get('next') || '/dashboard';

        const { error: _error, data } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: url.origin + `/auth/callback?next=${next}`
            }
        });

        if (_error) {
            return fail(_error.status || 500, { message: _error.message });
        }

        if (data.url) {
            redirect(303, data.url);
        }
    }

} satisfies Actions;