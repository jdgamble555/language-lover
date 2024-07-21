import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {

    const path = url.searchParams.get('path') || '/dashboard';

    const user = null;
    if (user) {
        redirect(303, path);
    }

}) satisfies PageServerLoad;

export const actions = {

    signout: async () => {

    },

    loginWithMagicLink: async () => {


    },

    loginWithProvider: async () => {


    }

} satisfies Actions;