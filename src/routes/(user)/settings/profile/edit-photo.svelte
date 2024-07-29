<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import * as Avatar from '$lib/components/ui/avatar';
	import { getInitials } from '$lib/get-initials';
	import { derived } from 'svelte/store';
	import type { PageData } from '$types/routes/(user)/settings/profile/$types';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';

	const data = derived(page, ($page) => $page.data as PageData);

	const form = superForm($data.photoForm, {
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
		}
	});

	const { form: formData, enhance } = form;
</script>

<Card.Root>
	<form method="POST" enctype="multipart/form-data" action="?/photo" use:enhance>
		<Card.Header>
			<Card.Title>Profile Image</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				{#if $page.data.profile?.photo_url}
					<Avatar.Root>
						<Avatar.Image
							src={'/images/' + $page.data.profile.photo_url}
							alt={$page.data.profile.display_name}
						/>
						<Avatar.Fallback>
							{getInitials($page.data.profile.display_name || $page.data.email || 'LL')}
						</Avatar.Fallback>
					</Avatar.Root>
				{/if}
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Form.Field {form} name="photo">
						<Form.Control let:attrs>
							<Form.Label>Photo</Form.Label>
							<Input
								type="file"
								{...attrs}
								bind:value={$formData.photo}
								
							/>
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Form.Button>Save</Form.Button>
		</Card.Footer>
	</form>
</Card.Root>
