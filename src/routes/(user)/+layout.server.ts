import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals: { supabase }, parent, url }) => {

    const path = url.searchParams.get('path') || '/dashboard';

    //const { user } = await safeGetUser();
    const { user } = await parent();

    if (!user) {
        redirect(303, '/login?next=' + path);
    }

    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

    if (profileError) {
        error(500, profileError.message);
    }

    if (!profileData) {
        error(500, 'User not found in database!');
    }

    return {
        profile: profileData,
        email: user.email
    };

}) satisfies LayoutServerLoad;