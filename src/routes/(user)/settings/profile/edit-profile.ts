import { applyAction } from "$app/forms";
import { invalidateAll } from "$app/navigation";
import type { SubmitFunction } from "@sveltejs/kit";
import { toast } from "svelte-sonner";

export const editProfile: SubmitFunction = () => {
    return async ({ result }) => {
        switch (result.type) {
            case 'error':
                applyAction(result);
                console.error(result.error);
                toast.error('Error updating profile!');
                break;
            case 'failure':
                applyAction(result);
                console.error(result.data?.message);
                toast.error('Error updating profile!');
                break;
            case 'success':
                await invalidateAll();
                toast.success('Profile Updated!');
        }
    };
};