import { applyAction, deserialize } from "$app/forms";
import { useDebounce } from "$lib/use-debounce";
import type { ActionResult } from "@sveltejs/kit";
import { page } from '$app/stores';
import { get } from "svelte/store";
import { dev } from "$app/environment";


export const usernameDebounce = useDebounce(async (event: InputEvent) => {

    const { value } = event.target as HTMLInputElement;

    const _page = get(page);

    const initialValue = _page.data.profile.username;

    if (initialValue === value) {
        await applyAction(initialValue);
        return;
    }
    if (value) {
        const formData = new FormData();
        formData.append('username', value);

        const response = await fetch(`${_page.url.origin}/settings/profile?/username`, {
            method: 'POST',
            body: formData
        });

        const result: ActionResult = deserialize(await response.text());
        switch (result.type) {
            case 'error':
                await applyAction(result);
                break;
            case 'failure':
                await applyAction(result);
                if (dev) console.log('username available');
                break;
            case 'success':
                await applyAction(result);
                if (dev) console.log('username is taken');
        }
    }
}, 500);