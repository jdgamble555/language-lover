import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { supabase } }) => {

    const _error = url.searchParams.get('error_description');
    if (_error) {
        const description = _error || 'Authentication Provider Error';
        error(400, description);
    }

    const code = url.searchParams.get('code');
    const next = url.searchParams.get('next') || '/dashboard';

    if (code) {
        const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);
        if (!codeError) {
            redirect(303, next);
        }
        error(400, codeError.message);
    }    

}) satisfies PageServerLoad;