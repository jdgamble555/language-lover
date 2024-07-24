import { fail, type Actions } from "@sveltejs/kit";
import { randomID } from "$lib/image-utils";
import { superValidate, withFiles } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import { photoSchema } from "./profile-schema";

export const load = (async () => {

    const photoForm = await superValidate(valibot(photoSchema));

    return { photoForm };

}) satisfies PageServerLoad;


export const actions = {

    profile: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { username, name } = Object.fromEntries(
            await request.formData()
        );

        const { user } = await safeGetUser();

        if (!user) {
            return fail(500, { profileMessage: 'User not logged in!' });
        }

        if (!name || typeof name !== 'string') {
            return fail(422, {
                name_invalid: true
            });
        }

        if (!username || typeof username !== 'string') {
            return fail(422, {
                username_invalid: true
            });
        }

        const { error } = await supabase
            .from('profiles')
            .update({
                display_name: name,
                username
            })
            .eq('user_id', user.id);

        if (error) {
            return fail(400, {
                profileMessage: error.message,
                code: error.code
            });
        }

        return {
            success: true
        };
    },

    email: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { email } = Object.fromEntries(
            await request.formData()
        );

        const { user } = await safeGetUser();

        if (!user) {
            return fail(500, { emailMessage: 'User not logged in!' });
        }

        if (!email || typeof email !== 'string') {
            return fail(422, {
                email_invalid: true
            });
        }

        const { error } = await supabase
            .auth
            .updateUser({
                email
            });

        if (error) {
            return fail(400, {
                emailMessage: error.message,
                code: error.code
            });
        }

        return {
            success: true
        };
    },

    photo: async ({ locals: { supabase, safeGetUser }, request }) => {


        const { user } = await safeGetUser();

        if (!user) {
            return fail(500, { emailMessage: 'User not logged in!' });
        }

        const form = await superValidate(request, valibot(photoSchema));

        if (!form.valid) {
            return fail(400, withFiles({ form }));
        }

        const { photo } = form.data;

        // upload image
        const ext = photo.name.slice((photo.name.lastIndexOf(".") - 1 >>> 0) + 2);

        const { error, data: imageData } = await supabase
            .storage
            .from('photos')
            .upload(`profiles/${user.id}/${randomID()}.${ext}`, photo);

        if (error) {
            console.error(error);
            return fail(400, {
                photoMessage: error.message + ' ' + error.cause
            });
        }

        // save image url
        const { error: profilesError } = await supabase
            .from('profiles')
            .update({ photo_url: imageData.fullPath })
            .eq('user_id', user.id);

        if (profilesError) {
            console.error(profilesError);
            return fail(400, {
                photoMessage: profilesError.message + ' ' + profilesError.code
            });
        }

        return withFiles({ form });
    },

    username: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { username } = Object.fromEntries(
            await request.formData()
        );

        const { user } = await safeGetUser();

        if (!user) {
            return fail(500, {
                username,
                emailMessage: 'User not logged in!'
            });
        }

        if (!username || typeof username !== 'string') {
            return fail(500, {
                username,
                username_invalid: true
            });
        }

        const { data, error } = await supabase.from('profiles')
            .select('username')
            .eq('username', username)
            .single();

        // check if username is available
        if (error) {
            return fail(404, {
                username,
                username_not_found: true
            });
        }

        if (!data || !data.username) {
            return fail(404, {
                username,
                username_not_found: true
            });
        }

        return {
            username,
            username_found: true
        };
    }

} satisfies Actions;