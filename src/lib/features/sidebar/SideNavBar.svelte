<script lang="ts">
	import { TOP_NAV_ITEMS, BOTTOM_NAV_ITEMS } from '../../config/tools';
	import { onMount } from 'svelte';
	import { themeService } from '../../utils/theme.svelte';

	let { activeTool = 'text-compare' } = $props();

	onMount(() => {
		themeService.initTheme();
	});
</script>

<aside class="h-screen w-64 docked left-0 bg-surface flex flex-col py-8 px-4 shrink-0 overflow-y-auto border-r border-outline-variant/30">
	<div class="mb-6 px-2">
		<h1 class="text-3xl font-bold text-on-surface font-headline tracking-tight">Offline tools</h1>
		<div class="text-lg font-medium text-on-surface-variant mt-1 opacity-70">
			<p>Developer toolbox</p>
			<p>Fully local</p>
			<p>Fully yours</p>
		</div>
	</div>

	<nav class="flex-1 space-y-1">
		{#each TOP_NAV_ITEMS as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all shadow-sm {activeTool === item.id
					? 'bg-primary/15 text-primary border-l-primary border-l-4'
					: 'text-on-surface-variant hover:bg-surface-variant/30'}"
			>
				<span class="material-symbols-outlined text-[20px] {activeTool === item.id ? 'text-primary' : ''}" data-icon={item.icon}>{item.icon}</span>
				<span class="text-sm">{item.label}</span>
			</a>
		{/each}
	</nav>

	<div class="mt-auto">
		{#each BOTTOM_NAV_ITEMS as item}
			<a
				href={item.href}
				class="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold transition-all shadow-sm {activeTool === item.id
					? 'bg-primary/15 text-primary border-l-primary border-l-4'
					: 'text-on-surface-variant hover:bg-surface-variant/30'}"
			>
				<span class="material-symbols-outlined text-[20px] {activeTool === item.id ? 'text-primary' : ''}" data-icon={item.icon}>{item.icon}</span>
				<span class="text-sm">{item.label}</span>
			</a>
		{/each}

		<button
			onclick={() => themeService.toggleTheme()}
			class="w-full flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg font-semibold transition-all shadow-sm text-on-surface-variant hover:bg-surface-variant/30 text-left"
		>
			<span class="material-symbols-outlined text-[20px]">
				{themeService.isDark ? 'light_mode' : 'dark_mode'}
			</span>
			<span class="text-sm">{themeService.isDark ? 'Light Mode' : 'Dark Mode'}</span>
		</button>
	</div>
</aside>
