<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import UserAuthForm from './user-auth-form.svelte';
</script>

<Card.Root class="mx-auto mt-24 max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Login</Card.Title>
		<Card.Description>Enter your email below to login to your account</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-5">
		<UserAuthForm />
		<p class="px-8 text-center text-sm text-muted-foreground">
			By clicking continue, you agree to our
			<a href="/terms" class="underline underline-offset-4 hover:text-primary">
				Terms of Service
			</a>
			and
			<a href="/privacy" class="underline underline-offset-4 hover:text-primary">
				Privacy Policy
			</a>
			.
		</p>
	</Card.Content>
</Card.Root>
<footer>
	<section class="container py-14 text-center">
		<h3>© 2024 Drill.to</h3>
	</section>
</footer>
