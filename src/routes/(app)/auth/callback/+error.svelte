<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class="mx-auto mt-24 max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Error</Card.Title>
		<Card.Description>It seems there has been an error, sorry about that.</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-5">
		{#if $page?.error}
			{#if $page?.status}
				<p><span class="font-bold">Status: </span>{$page?.status}</p>
			{/if}
			{#if $page?.error?.message}
				<p><span class="font-bold">Error: </span>{$page?.error?.message}</p>
			{/if}
			<hr class="mx-auto w-11/12" />
			<div class="mt-5">
				Try to <a class="underline" href="/login">login</a> again, or choose a different login method!
			</div>
		{/if}
	</Card.Content>
</Card.Root>
