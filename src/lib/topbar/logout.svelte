<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

	const registerAction: SubmitFunction = () => {
		return async ({ result }) => {
			if (result.type === 'redirect') {
				applyAction(result);
			}
		};
	};
</script>

<form method="POST" action="/login?/signout" use:enhance={registerAction}>
	<button>Logout</button>
</form>
