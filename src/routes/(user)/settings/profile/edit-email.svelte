<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import type { PageData } from '$types/routes/(user)/settings/profile/$types';
	import { derived } from 'svelte/store';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { dev } from '$app/environment';

	const data = derived(page, ($page) => $page.data as PageData);

	const form = superForm($data.emailForm, {
		onUpdated({ form }) {
			if (form.valid) {
				toast.success(form.message);
				if (dev) {
					console.log('http://localhost:54324/monitor');
				}
			}
		},
		onError({ result }) {
			if (result.error) {
				console.error(result.error);
				toast.error('There was an error updating the database!');
			}
		}
	});

	const { form: formData, enhance, errors } = form;
</script>

<Card.Root>
	<form method="POST" action="?/email" use:enhance>
		<Card.Header>
			<Card.Title>Email Address</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Form.Field {form} name="email">
						<Form.Control let:attrs>
							<Form.Label>Email</Form.Label>
							<Input {...attrs} bind:value={$formData.email} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Save</Button>
		</Card.Footer>
	</form>
</Card.Root>
