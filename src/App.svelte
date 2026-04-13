<script lang="ts">
	import { onMount } from 'svelte';
	import SideNavBar from './lib/components/SideNavBar.svelte';
	import TextCompare from './lib/features/text-compare/components/TextCompare.svelte';
	import JwtDecoder from './lib/features/jwt-decoder/components/JwtDecoder.svelte';
	import Notebook from './lib/features/notebook/components/Notebook.svelte';

	import { ALL_NAV_ITEMS } from './lib/config/tools';

	let activeTool = $state('text-compare');

	function updateRoute() {
		const hash = window.location.hash;
		const tool = ALL_NAV_ITEMS.find((item) => hash === item.href);

		if (tool) {
			activeTool = tool.id;
		} else if (hash === '#/' || hash === '') {
			activeTool = 'text-compare';
		} else {
			activeTool = 'text-compare';
		}
	}

	onMount(() => {
		updateRoute();
		window.addEventListener('hashchange', updateRoute);
		return () => window.removeEventListener('hashchange', updateRoute);
	});
</script>

<div class="bg-background font-body text-on-background flex min-h-screen">
	<SideNavBar {activeTool} />

	{#if activeTool === 'text-compare'}
		<TextCompare />
	{:else if activeTool === 'jwt-decoder'}
		<JwtDecoder />
	{:else if activeTool === 'notebook'}
		<Notebook />
	{:else}
		<div class="flex-1 flex items-center justify-center text-outline">
			<div class="text-center">
				<span class="material-symbols-outlined mb-4">construction</span>
				<h2 class="text-2xl font-bold uppercase tracking-widest">Under Construction</h2>
				<p class="text-lg opacity-60 mt-2 italic font-medium">This tool will be available soon in your offline suite.</p>
			</div>
		</div>
	{/if}
</div>
