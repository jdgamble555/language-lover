<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Toaster } from '$lib/components/ui/sonner';
	import Topbar from '@/topbar/topbar.svelte';
	import Footer from './footer.svelte';
</script>

<ModeWatcher />
<Toaster />

<Topbar />
<slot />
<Footer />
