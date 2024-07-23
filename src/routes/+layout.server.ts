import type { LayoutServerLoad } from "./$types";

export const load = (async ({ locals: { safeGetUser } }) => {

    const { user } = await safeGetUser();

    return {
        user
    };

}) satisfies LayoutServerLoad;