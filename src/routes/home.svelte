<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<div class="flex w-full flex-col bg-muted/40">
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<div class="mx-auto grid flex-1 auto-rows-max gap-4">
				<div class="flex items-center gap-4">
					<div class="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
						<div class="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
							<Card.Root>
								<Card.Header>
									<Card.Title>Product Details</Card.Title>
									<Card.Description>
										Lipsum dolor sit amet, consectetur adipiscing elit
									</Card.Description>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
							<Card.Root>
								<Card.Header>
									<Card.Title>Stock</Card.Title>
									<Card.Description>
										Lipsum dolor sit amet, consectetur adipiscing elit
									</Card.Description>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
							<Card.Root>
								<Card.Header>
									<Card.Title>Product Category</Card.Title>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
						</div>
						<div class="grid auto-rows-max items-start gap-4 lg:gap-8">
							<Card.Root>
								<Card.Header>
									<Card.Title>Product Status</Card.Title>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
							<Card.Root class="overflow-hidden">
								<Card.Header>
									<Card.Title>Product Images</Card.Title>
									<Card.Description>
										Lipsum dolor sit amet, consectetur adipiscing elit
									</Card.Description>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
							<Card.Root>
								<Card.Header>
									<Card.Title>Archive Product</Card.Title>
									<Card.Description>
										Lipsum dolor sit amet, consectetur adipiscing elit.
									</Card.Description>
								</Card.Header>
								<Card.Content></Card.Content>
							</Card.Root>
						</div>
					</div>
					<div class="flex items-center justify-center gap-2 md:hidden">
						<Button variant="outline" size="sm">Discard</Button>
						<Button size="sm">Save Product</Button>
					</div>
				</div>
			</div>
		</main>
	</div>
</div>
