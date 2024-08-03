import { error, fail, redirect, type Actions } from "@sveltejs/kit";
import { randomID } from "$lib/image-utils";
import { message, setError, superValidate, withFiles } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import {
    emailSchema,
    photoOptions,
    photoSchema,
    profileSchema,
    usernameSchema
} from "./profile-schema";

export const load = (async ({ parent }) => {

    const { email, profile } = await parent();

    const photoForm = await superValidate(valibot(photoSchema, photoOptions));

    const profileForm = await superValidate({
        display_name: profile.display_name,
        username: profile.username
    }, valibot(profileSchema));

    const emailForm = await superValidate({
        email
    }, valibot(emailSchema));

    return { photoForm, profileForm, emailForm };

}) satisfies PageServerLoad;


export const actions = {

    profile: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { user } = await safeGetUser();

        if (!user) {
            return redirect(302, '/login?next=/settings/profile');
        }

        const form = await superValidate(request, valibot(profileSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { display_name, username } = form.data;

        const { error: updateError } = await supabase
            .from('profiles')
            .update({
                display_name,
                username
            })
            .eq('user_id', user.id);

        if (updateError) {
            return error(400, {
                message: updateError.message,
                code: updateError.code
            });
        }

        return message(form, 'Your profile has been successfully updated!');
    },


    username: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { user } = await safeGetUser();

        if (!user) {
            return redirect(302, '/login?next=/settings/profile');
        }

        const form = await superValidate(request, valibot(usernameSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { username } = form.data;

        if (!username) {
            return;
        }

        const { data, error: usernameError } = await supabase.from('profiles')
            .select('username')
            .eq('username', username)
            .single();

        if (usernameError) {
            if (usernameError.code === 'PGRST116') {
                return message(form, 'Username is available!');
            }
            return error(400, {
                message: usernameError.message,
                code: usernameError.code
            });
        }

        // check if username is available
        if (!data || !data.username) {

            // should never get here!
            return message(form, 'Username is available!');
        }

        return setError(form, 'username', 'Username is taken.');
    },

    email: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { user } = await safeGetUser();

        if (!user) {
            return redirect(302, '/login?next=/settings/profile');
        }

        const form = await superValidate(request, valibot(emailSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        const { email } = form.data;

        // call to get rid of error message
        await supabase.auth.getUser();

        const { error: updateUserError } = await supabase
            .auth
            .updateUser({
                email
            });

        if (updateUserError) {
            return error(400, {
                message: updateUserError.message,
                code: updateUserError.code
            });
        }

        return message(form, 'Your email has been successfully updated!');
    },

    photo: async ({ locals: { supabase, safeGetUser }, request }) => {

        const { user } = await safeGetUser();

        if (!user) {
            return redirect(302, '/login?next=/settings/profile');
        }

        const form = await superValidate(request, valibot(photoSchema, photoOptions));

        if (!form.valid) {
            return fail(400, withFiles({ form }));
        }

        const { photo } = form.data;

        // upload image
        const ext = photo.name.slice((photo.name.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();

        const { error: storageError, data: imageData } = await supabase
            .storage
            .from('photos')
            .upload(`profiles/${user.id}/${randomID()}.${ext}`, photo);

        if (storageError) {
            return error(400, {
                message: storageError.message
            });
        }

        // save image url
        const { error: profilesError } = await supabase
            .from('profiles')
            .update({ photo_url: imageData.fullPath })
            .eq('user_id', user.id);

        if (profilesError) {
            return error(400, {
                message: profilesError.message,
                code: profilesError.code
            });
        }

        return message(form, 'Your photo has been successfully updated!');
    }

} satisfies Actions;