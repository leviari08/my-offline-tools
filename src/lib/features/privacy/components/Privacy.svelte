<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	const subHeader = "We're not your data babysitters. No servers, no trackers, and absolutely zero interest in what you're doing.";

	const privacyFeatures = [
		{
			icon: 'memory',
			title: 'Local Processing',
			description: "Your CPU, Your Problem. All tools run on your machine because we're not gonna pay for server costs.",
		},
		{
			icon: 'visibility_off',
			title: 'No Tracking',
			description: "We Don't Care About You. Seriously. Your activity is interesting to no one. Keep it to yourself.",
		},
		{
			icon: 'network_check',
			title: 'Network access is blocked',
			description: "Network is Lava. Our Content-Security-Policy blocks everything. Even if we want to leak your data (we don't), we literally can't.",
		},
		{
			icon: 'code',
			title: 'Open Source',
			description: 'Auditable Laziness. The code is public so you can audit it yourself. We have nothing to hide (yet).',
		},
	];
</script>

<main class="flex-1 p-8 lg:p-12 overflow-y-auto bg-background selection:bg-primary/30" in:fade={{ duration: 300 }}>
	<div class="max-w-[65%] mx-auto space-y-8">
		<header class="space-y-4" in:fly={{ y: 20, duration: 600, delay: 100 }}>
			<div
				class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20"
			>
				<span class="material-symbols-outlined text-[14px]">verified_user</span>
				Privacy First
			</div>
			<h1 class="text-4xl md:text-5xl font-black text-on-background font-headline leading-tight">
				Your Privacy is <span class="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent italic">Non-Negotiable</span>
			</h1>
			<p class="text-xl text-on-background/60 font-medium leading-relaxed">{subHeader}</p>
		</header>

		<div class="grid grid-cols-1 gap-4">
			{#each privacyFeatures as feature}
				<div
					class="p-4 rounded-2xl bg-surface border border-outline-variant/30 hover:border-primary/40 transition-all duration-300 group hover:shadow-xl hover:shadow-primary/5 flex items-center gap-6"
				>
					<div
						class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300"
					>
						<span class="material-symbols-outlined text-[28px]">{feature.icon}</span>
					</div>
					<div>
						<h3 class="text-xl font-bold text-on-surface mb-2 font-headline">{feature.title}</h3>
						<p class="text-on-surface-variant leading-relaxed opacity-80">{feature.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</main>

<style>
	:global(.font-headline) {
		font-family: 'Outfit', 'Inter', sans-serif;
	}
</style>
