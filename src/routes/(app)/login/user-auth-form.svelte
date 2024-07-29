<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { LoaderCircle } from 'lucide-svelte';

	import Google from './icons/google.svelte';
	import Apple from './icons/apple.svelte';
	import { dev } from '$app/environment';
	import { superForm } from 'sveltekit-superforms';
	import { page } from '$app/stores';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { emailSchema } from './validate';
	import type { PageData } from '$types/routes/(app)/login/$types';
	import { derived } from 'svelte/store';
	import { toast } from 'svelte-sonner';

	const data = derived(page, ($page) => $page.data as PageData);

	const form = superForm($data.form, {
		validators: valibotClient(emailSchema),
		onUpdated({ form }) {
			if (form.valid) {
				toast.success('Email sent!');
				if (dev) {
					console.log('http://localhost:54324/monitor');
				}
			}
		}
	});

	const { form: formData, enhance, delayed } = form;
</script>

<div class="grid gap-6">
	<form method="POST" class="flex flex-col gap-3" action="/login?/loginWithMagicLink" use:enhance>
		<Form.Field {form} name="email">
			<Form.Control let:attrs>
				<Form.Label>Email</Form.Label>
				<Input {...attrs} bind:value={$formData.email} />
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Button>Send Link</Form.Button>
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
		<Button variant="outline" type="button" disabled={$delayed}>
			{#if $delayed}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Google class="mr-2 h-4 w-4" />
			{/if}
			Sign in with Google
		</Button>
		<Button variant="outline" type="button" disabled={$delayed}>
			{#if $delayed}
				<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
			{:else}
				<Apple class="mr-2 h-4 w-4" />
			{/if}
			Sign in with Apple
		</Button>
	</div>
</div>

