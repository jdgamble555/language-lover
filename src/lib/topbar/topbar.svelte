<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import Darkmode from './darkmode.svelte';
	import Dropdown from './dropdown.svelte';
	import Searchbar from './searchbar.svelte';
	import Heart from 'lucide-svelte/icons/heart';
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
	<nav
		class="hidden flex-col w-full gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6"
	>
		<a href="/" class="flex items-center gap-4 text-lg font-semibold md:text-base">
			<Heart fill="red" class="h-8 w-6 text-red-500" />
			<span class="sr-only">Language Lover</span>
			<span class="text-lg">Language Lover</span>
		</a>
		<a href="/dashboard" class="text-muted-foreground transition-colors hover:text-foreground">Dashboard</a>
	</nav>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button variant="outline" size="icon" class="shrink-0 md:hidden" builders={[builder]}>
				<Menu class="h-5 w-5" />
				<span class="sr-only">Toggle navigation menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left">
			<nav class="grid gap-6 text-lg font-medium">
				<a href="##" class="flex items-center gap-2 text-lg font-semibold">
					<Package2 class="h-6 w-6" />
					<span class="sr-only">Drill.to</span>
				</a>
				<a href="/dashboard" class="text-muted-foreground hover:text-foreground">Dashboard</a>
				<a href="##" class="text-muted-foreground hover:text-foreground">Courses</a>
				<a href="##" class="text-muted-foreground hover:text-foreground">Pricing</a>
				<a href="##" class="text-muted-foreground hover:text-foreground">Settings</a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<div class="flex w-full items-center justify-end gap-4 md:ml-auto md:gap-2 lg:gap-4">
		<Darkmode />
		{#if $page.data.user}
			<Dropdown />
		{:else}
			<a href="/login" class="font-semibold text-foreground transition-colors hover:text-muted-foreground">Login</a>
		{/if}
	</div>
</header>
