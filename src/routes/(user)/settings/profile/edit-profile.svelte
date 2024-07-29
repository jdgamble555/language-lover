<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { derived } from 'svelte/store';
	import { toast } from 'svelte-sonner';
	import type { PageData } from '$types/routes/(user)/settings/profile/$types';
	import { superForm } from 'sveltekit-superforms';
	import * as Form from '$lib/components/ui/form';
	import { useDebounce } from '@/use-debounce';
	import Reload from 'svelte-radix/Reload.svelte';

	const data = derived(page, ($page) => $page.data as PageData);

	const form = superForm($data.profileForm, {
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
			}
		},
		onError({ result }) {
			if (result.error) {
				console.error(result.error);
				toast.error('There was an error updating the database!');
			}
		},
		invalidateAll: 'force',
		dataType: 'json'
	});

	const { form: formData, enhance, errors, allErrors, isTainted, tainted } = form;

	const {
		submit: usernameSubmit,
		enhance: usernameEnhance,
		message,
		delayed
	} = superForm(
		{ username: '' },
		{
			invalidateAll: false,
			applyAction: false,
			onSubmit({ cancel }) {
				if (!$formData.username) cancel();
			},
			onUpdated({ form }) {
				$errors.username = form.errors.username;
			}
		}
	);

	const usernameDebounce = useDebounce(usernameSubmit, 1000);
</script>

<Card.Root>
	<form id="username" method="POST" action="?/username" use:usernameEnhance />
	<form method="POST" action="?/profile" use:enhance>
		<Card.Header>
			<Card.Title>Profile Information</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Form.Field {form} name="display_name">
						<Form.Control let:attrs>
							<Form.Label>Display Name</Form.Label>
							<Input {...attrs} bind:value={$formData.display_name} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input
								form="username"
								{...attrs}
								bind:value={$formData.username}
								on:input={usernameDebounce}
							/>
							<Input type="hidden" {...attrs} bind:value={$formData.username} />
							{#if $message && isTainted($tainted)}
								<Form.Description class="font-semibold text-green-500">
									{$message}
								</Form.Description>
							{/if}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit" disabled={!!$allErrors?.length}>
				{#if $delayed}
					<Reload class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Save
			</Button>
		</Card.Footer>
	</form>
</Card.Root>
