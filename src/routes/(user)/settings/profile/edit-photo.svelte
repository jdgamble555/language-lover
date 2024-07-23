<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import * as Avatar from '$lib/components/ui/avatar';
	import { getInitials } from '$lib/get-initials';
	import { editProfile } from './edit-profile';
</script>

<Card.Root>
	<form
		method="POST"
		enctype="multipart/form-data"
		action="/settings/profile?/photo"
		use:enhance={editProfile}
	>
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
							{getInitials($page.data.profile.display_name || $page.data.email || 'DT')}
						</Avatar.Fallback>
					</Avatar.Root>
				{/if}
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for="username">Photo</Label>
					<Input name="photo" type="file" required />
					{#if $page.form?.username_invalid}
						<p class="text-[0.8rem] font-medium text-destructive">Invalid Username</p>
					{/if}
				</div>
				{#if $page.form?.photoMessage}
					<p class="text-[0.8rem] font-medium text-destructive">{$page.form.photoMessage}</p>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Save</Button>
		</Card.Footer>
	</form>
</Card.Root>
