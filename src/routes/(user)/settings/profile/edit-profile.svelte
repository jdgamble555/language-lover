<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { editProfile } from './edit-profile';
	import Username from './username.svelte';
</script>

<Card.Root>
	<form method="POST" action="/settings/profile?/profile" use:enhance={editProfile}>
		<Card.Header>
			<Card.Title>Profile Information</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for="name">Name</Label>
					<Input
						name="name"
						type="name"
						placeholder="Name"
						value={$page.data.profile?.display_name}
						required
					/>
					{#if $page.form?.name_invalid}
						<p class="text-[0.8rem] font-medium text-destructive">Invalid Name</p>
					{/if}
				</div>
				<!--
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for="username">Username</Label>
					<Input
						name="username"
						type="username"
						placeholder="Username"
						value={$page.data.profile?.username}
						required
					/>
					{#if $page.form?.username_invalid}
						<p class="text-[0.8rem] font-medium text-destructive">Invalid Username</p>
					{/if}
				</div>
				-->
				<Username />
				{#if $page.form?.profileMessage}
					<p class="text-[0.8rem] font-medium text-destructive">{$page.form.profileMessage}</p>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Save</Button>
		</Card.Footer>
	</form>
</Card.Root>
