<script lang="ts">
	import { jwtDecoderState } from '../state.svelte';

	const jwtPartContainerClass = 'bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm';

	let encodedContent = $derived(jwtDecoderState.encodedToken);
	let decodedData = $derived(jwtDecoderState.decoded);

	function formatJson(obj: unknown) {
		if (!obj) return '';
		return JSON.stringify(obj, null, 2);
	}

	let verificationStyle = $derived.by(() => {
		switch (jwtDecoderState.isVerified) {
			case true:
				return {
					container: 'border-success ring-success/10',
					header: 'bg-success/5 border-success/10',
					icon: 'text-success',
					statusIcon: 'check_circle',
					statusText: 'Signature Verified',
					statusClass: 'text-success',
				};
			case false:
				return {
					container: 'border-error ring-error/10',
					header: 'bg-error/5 border-error/10',
					icon: 'text-error',
					statusIcon: 'cancel',
					statusText: 'Invalid Signature',
					statusClass: 'text-error',
				};
			default:
				return {
					container: 'border-[#00B9F1] ring-[#00B9F1]/10',
					header: 'bg-[#00B9F1]/5 border-[#00B9F1]/10',
					icon: 'text-[#00B9F1]',
					statusIcon: 'info',
					statusText: 'Unverified',
					statusClass: 'text-outline/40',
				};
		}
	});

	// Split token for colored display
	let tokenDisplayParts = $derived(() => {
		const colors = ['text-[#FB0101]', 'text-[#D63AFF]', 'text-[#00B9F1]'];
		const parts = encodedContent.split('.');
		const result = [];

		for (let i = 0; i < parts.length; i++) {
			if (i > 0) result.push({ text: '.' });
			result.push({ text: parts[i], color: colors[i] });
		}

		return result;
	});

	// Automatically verify signature on changes
	$effect(() => {
		jwtDecoderState.runVerification();
	});
</script>

<main class="flex-1 flex flex-col bg-background overflow-hidden p-6">
	<div class="flex flex-col justify-start gap-1 mb-4">
		<h1 class="text-2xl font-headline font-bold">JWT Decoder</h1>
		<p class="text-xs text-outline opacity-80 uppercase tracking-widest font-bold">Decode and verify JSON Web Tokens</p>
	</div>
	<div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
		<!-- Left Side: Encoded Input -->
		<div class="flex flex-col h-full overflow-hidden">
			<div class="bg-surface rounded-xl border border-outline-variant/30 flex flex-col h-full overflow-hidden shadow-sm">
				<div class="flex items-center gap-2 px-6 py-4 border-b border-outline-variant/20 bg-background/50">
					<span class="material-symbols-outlined text-primary text-base">enhanced_encryption</span>
					<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">Encoded Input</h2>
				</div>
				<div class="flex-1 flex flex-col p-8 overflow-hidden relative">
					<div class="relative flex-1 group">
						<!-- Display Overlay for colors -->
						<div
							class="absolute inset-0 mono-font leading-[26px] break-all whitespace-pre-wrap pointer-events-none select-none z-0 overflow-hidden text-on-surface"
						>
							{#each tokenDisplayParts() as part}
								<span class={part.color || ''}>{part.text}</span>
							{/each}
						</div>

						<!-- Transparent Textarea for input -->
						<textarea
							bind:value={jwtDecoderState.encodedToken}
							class="w-full h-full bg-transparent mono-font text-base leading-[26px] text-transparent caret-on-surface focus:outline-none resize-none placeholder:text-outline/70 z-10 relative selection:bg-primary/20 border-none ring-0 focus:ring-0"
							placeholder="Paste your encoded JWT here (header.payload.signature)..."
						></textarea>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side: Decoded Content -->
		<div class="flex flex-col space-y-4 overflow-auto pr-2">
			{#snippet decodedPanel(icon: string, title: string, subtitle: string, colorClass: string, data: unknown)}
				<div class={jwtPartContainerClass}>
					<div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-background/50">
						<div class="flex items-center gap-2">
							<span class="material-symbols-outlined {colorClass} text-base">{icon}</span>
							<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">{title}</h2>
						</div>
						<span class="text-[10px] font-medium text-outline/60 italic uppercase tracking-wider">{subtitle}</span>
					</div>
					<code class="{colorClass} bg-surface p-4 overflow-auto border border-outline-variant/10 whitespace-pre-wrap">
						{formatJson(data)}
					</code>
				</div>
			{/snippet}

			<!-- Header Panel -->
			{@render decodedPanel('settings_input_component', 'Header', 'Algorithm & Token Type', 'text-[#FB0101]', decodedData?.header)}

			<!-- Payload Panel -->
			{@render decodedPanel('data_object', 'Payload (Claims)', 'Data & Permissions', 'text-[#D63AFF]', decodedData?.payload)}

			<!-- Signature Verification Panel -->
			<div class="{jwtPartContainerClass} {verificationStyle.container}">
				<div class="flex items-center justify-between px-6 py-4 border-b {verificationStyle.header}">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-base {verificationStyle.icon}">verified_user</span>
						<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">Verify Signature</h2>
					</div>
				</div>

				<div class="flex-1 p-4 flex flex-col justify-between">
					<div class="mono-font text-base leading-relaxed text-[#00B9F1]">
						<textarea
							bind:value={jwtDecoderState.secret}
							placeholder="your-256-bit-secret"
							class="w-full bg-surface-variant/30 border border-outline-variant/20 rounded-lg p-4 text-on-surface text-sm focus:outline-none focus:border-[#00B9F1]/50 resize-none h-24 shadow-inner placeholder:text-outline/70"
						></textarea>
					</div>

					<div class="mt-2 flex items-center justify-between border-t border-outline-variant/10">
						<div class="flex items-center gap-3 {verificationStyle.statusClass}">
							<span class="material-symbols-outlined text-3xl">
								{verificationStyle.statusIcon}
							</span>
							<span class="text-lg font-bold uppercase tracking-widest">
								{verificationStyle.statusText}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.mono-font {
		font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
	}

	textarea {
		scrollbar-width: thin;
		scrollbar-color: var(--color-outline-variant) transparent;
	}

	code {
		display: block;
	}
</style>
