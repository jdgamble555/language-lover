import { component$ } from '@builder.io/qwik';
import { MenuIcon } from '~/components/icons/menu';

export default component$(() => {
    return (
        <div class="mx-auto px-2 sm:px-6 lg:px-8 bg-red-600 text-white">
            <div class="relative flex h-16 items-center justify-between font-bold">
                <MenuIcon />
                app bar
            </div>
        </div>
    );
});