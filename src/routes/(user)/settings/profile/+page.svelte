<script>
	import EditEmail from './edit-email.svelte';
	import EditProfile from './edit-profile.svelte';
	import EditPhoto from './edit-photo.svelte';
</script>

<main
	class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10"
>
	<div class="mx-auto grid w-full max-w-6xl gap-2 pl-4 md:pl-0">
		<h1 class="text-3xl font-semibold">Settings</h1>
	</div>
	<div
		class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]"
	>
		<nav class="grid gap-4 pl-4 text-sm text-muted-foreground md:pl-0">
			<a href="##" class="font-semibold text-primary">Profile</a>
			<a href="##">Account</a>
		</nav>
		<div class="grid gap-6">
            <EditPhoto />
			<EditProfile />
			<EditEmail />
		</div>
	</div>
</main>
