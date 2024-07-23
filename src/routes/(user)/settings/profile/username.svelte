<script lang="ts">
	import { page } from '$app/stores';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { usernameDebounce } from './edit-username';

	export let value = $page.data.profile?.username || '';
</script>

<div class="grid w-full max-w-sm items-center gap-1.5">
	<Label for="username">Username</Label>
	<Input
		name="username"
		on:input={usernameDebounce}
		bind:value
		minlength={3}
		maxlength={15}
		pattern="^[a-zA-Z0-9]+(?:[._][a-zA-Z0-9]+)*$"
		title="Username must include letters, numbers, and '.', with '.' not allowed at the beginning or end."
		required
	/>
	{#if $page.form?.username_found}
		<p class="mt-2 text-sm font-bold text-red-600">Username is taken!</p>
	{:else if $page.form?.username_not_found}
		<p class="mt-2 text-sm font-bold text-green-600">Username is available!</p>
	{/if}
</div>
