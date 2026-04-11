<script lang="ts">
	import { TOP_NAV_ITEMS, BOTTOM_NAV_ITEMS } from '../config/tools';

	let { activeTool = 'text-compare' } = $props();
</script>

<aside class="h-screen w-64 docked left-0 bg-white flex flex-col py-8 px-6 shrink-0 overflow-y-auto border-r border-outline-variant/30">
	<div class="mb-10 px-2">
		<h1 class="text-xl font-bold text-on-surface font-headline tracking-tight">Syntax &amp; Steel</h1>
		<p class="text-xs font-medium text-on-surface-variant mt-1 opacity-70">Precision Utility Suite</p>
	</div>

	<nav class="flex-1 space-y-1">
		{#each TOP_NAV_ITEMS as item}
			<a 
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all shadow-sm {activeTool === item.id ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-variant/50'}"
			>
				<span class="material-symbols-outlined text-[20px]" data-icon={item.icon}>{item.icon}</span>
				<span class="text-sm">{item.label}</span>
			</a>
		{/each}
	</nav>

	<div class="mt-auto px-2">
		{#each BOTTOM_NAV_ITEMS as item}
			<a 
				href={item.href}
				class="flex items-center gap-3 py-2 text-on-surface-variant hover:text-on-surface transition-colors {activeTool === item.id ? 'text-primary' : ''}"
			>
				<span class="material-symbols-outlined text-[20px]" data-icon={item.icon}>{item.icon}</span>
				<span class="text-sm font-medium">{item.label}</span>
			</a>
		{/each}
	</div>
</aside>
