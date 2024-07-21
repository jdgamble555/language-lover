<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { LoaderCircle } from 'lucide-svelte';

	import { cn } from '$lib/utils.js';
	import Google from './icons/google.svelte';
	import Apple from './icons/apple.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { dev } from '$app/environment';

	let className: string | undefined | null = undefined;
	export { className as class };

	let isLoading = false;

	const loginWithMagicLink: SubmitFunction<undefined> = ({ formElement }) => {
		isLoading = true;
		return async ({ result }) => {
			isLoading = false;
			switch (result.type) {
				case 'error':
					applyAction(result);
					//toast.error(result.error, 5000);
					console.error(result.error);
					break;
				case 'failure':
					applyAction(result);
					//toast.error(result.data?.message, 5000);
					console.error(result.data?.message);
					break;
				case 'success':
					await invalidateAll();
					//toast.open('Your email link has been sent!');
					formElement.reset();
					if (dev) {
						console.log('http://localhost:54324/');
					}
			}
		};
	};
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
	<form method="POST" action="/login?/loginWithMagicLink" use:enhance={loginWithMagicLink}>
		<div class="grid gap-3">
			<div class="grid gap-1">
				<Label class="sr-only" for="email">Email</Label>
				<Input
					name="email"
					id="email"
					placeholder="name@example.com"
					type="email"
					autocapitalize="none"
					autocomplete="email"
					autocorrect="off"
					required
					disabled={isLoading}
				/>
			</div>
			<Button type="submit" disabled={isLoading}>
				{#if isLoading}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Sign In with Email
			</Button>
		</div>
	</form>
	<div class="relative">
		<div class="absolute inset-0 flex items-center">
			<span class="w-full border-t" />
		</div>
		<div class="relative flex justify-center text-xs uppercase">
			<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
		</div>
	</div>
	<div class="flex flex-col gap-3">
		<Button variant="outline" type="button" disabled={isLoading}>
			{#if isLoading}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Google class="mr-2 h-4 w-4" />
			{/if}
			Sign in with Google
		</Button>
		<Button variant="outline" type="button" disabled={isLoading}>
			{#if isLoading}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Apple class="mr-2 h-4 w-4" />
			{/if}
			Sign in with Apple
		</Button>
	</div>
</div>
