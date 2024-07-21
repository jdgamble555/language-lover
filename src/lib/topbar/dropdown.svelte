<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button/index.js';
	import { CircleUser } from 'lucide-svelte';
	import Logout from './logout.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { getInitials } from '$lib/get-initials';
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="secondary" size="icon" class="rounded-full">
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
			{:else}
				<CircleUser class="h-5 w-5" />
			{/if}
			<span class="sr-only">Toggle user menu</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<a href="/settings/profile">Settings</a>
		</DropdownMenu.Item>
		<DropdownMenu.Item>Support</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<Logout />
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
