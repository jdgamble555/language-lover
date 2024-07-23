<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { editProfile } from './edit-profile';
</script>

<Card.Root>
	<form method="POST" action="/settings/profile?/email" use:enhance={editProfile}>
		<Card.Header>
			<Card.Title>Email Address</Card.Title>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-6">
				<div class="grid w-full max-w-sm items-center gap-1.5">
					<Label for="email">Email</Label>
					<Input name="email" type="email" placeholder="Email" value={$page.data.email} required />
					{#if $page.form?.name_email}
						<p class="text-[0.8rem] font-medium text-destructive">Invalid Email</p>
					{/if}
				</div>
				{#if $page.form?.emailMessage}
					<p class="text-[0.8rem] font-medium text-destructive">{$page.form.emailMessage}</p>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer class="border-t px-6 py-4">
			<Button type="submit">Save</Button>
		</Card.Footer>
	</form>
</Card.Root>
