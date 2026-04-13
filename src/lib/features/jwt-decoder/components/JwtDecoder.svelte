<script lang="ts">
	import { jwtDecoderState } from '../state.svelte';

	let encodedContent = $derived(jwtDecoderState.encodedToken);
	let decodedData = $derived(jwtDecoderState.decoded);

	function formatJson(obj: any) {
		if (!obj) return '';
		return JSON.stringify(obj, null, 4);
	}

	// Split token for colored display
	let tokenParts = $derived(() => {
		const parts = encodedContent.split('.');
		return {
			header: parts[0] || '',
			payload: parts[1] || '',
			signature: parts[2] || '',
			dots: parts.length - 1,
		};
	});

	let isSignatureValid = $derived(jwtDecoderState.isVerified);

	// Automatically verify signature on changes
	$effect(() => {
		jwtDecoderState.runVerification();
	});
</script>

<main class="flex-1 flex flex-col bg-background overflow-hidden p-8">
	<div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
		<!-- Left Side: Encoded Input -->
		<div class="flex flex-col h-full overflow-hidden">
			<div class="bg-surface rounded-xl border border-outline-variant/30 flex flex-col h-full overflow-hidden shadow-sm">
				<div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-background/50">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-primary text-base">enhanced_encryption</span>
						<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">Encoded Input</h2>
					</div>
					<span class="px-2 py-1 rounded text-[10px] font-bold bg-surface-variant text-on-surface-variant uppercase tracking-wider">Waiting</span>
				</div>
				<div class="flex-1 flex flex-col p-6 overflow-hidden relative">
					<div class="relative flex-1 group">
						<!-- Display Overlay for colors -->
						<div
							class="absolute inset-0 p-6 mono-font text-base leading-[26px] break-all whitespace-pre-wrap pointer-events-none select-none z-0 overflow-hidden"
						>
							{#if encodedContent}
								{@const parts = tokenParts()}
								<span class="text-[#FB015B]">{parts.header}</span>{#if parts.dots >= 1}<span class="text-on-surface">.</span><span class="text-[#D63AFF]"
										>{parts.payload}</span
									>{/if}{#if parts.dots >= 2}<span class="text-on-surface">.</span><span class="text-[#00B9F1]">{parts.signature}</span>{/if}
							{/if}
						</div>

						<!-- Transparent Textarea for input -->
						<textarea
							bind:value={jwtDecoderState.encodedToken}
							class="w-full h-full bg-transparent p-6 mono-font text-base leading-[26px] text-transparent caret-on-surface focus:outline-none resize-none placeholder:text-outline/70 z-10 relative selection:bg-primary/20 border-none ring-0 focus:ring-0"
							placeholder="Paste your encoded JWT here (header.payload.signature)..."
						></textarea>
					</div>
				</div>
			</div>
		</div>

		<!-- Right Side: Decoded Content -->
		<div class="flex flex-col space-y-4 overflow-auto pr-2">
			<!-- Header Panel -->
			<div class="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
				<div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-background/50">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-[#FB015B] text-base">settings_input_component</span>
						<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">Header</h2>
					</div>
					<span class="text-[10px] font-medium text-outline/60 italic uppercase tracking-wider">Algorithm & Token Type</span>
				</div>
				<div class="p-4">
					<pre class="mono-font text-base text-[#FB015B] bg-surface-variant/30 rounded-lg p-4 overflow-auto border border-outline-variant/10"><code
							>{formatJson(decodedData?.header)}</code
						></pre>
				</div>
			</div>

			<!-- Payload Panel -->
			<div class="bg-surface rounded-xl border border-outline-variant/30 overflow-hidden shadow-sm">
				<div class="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20 bg-background/50">
					<div class="flex items-center gap-2">
						<span class="material-symbols-outlined text-[#D63AFF] text-base">data_object</span>
						<h2 class="text-[12px] font-bold text-on-surface uppercase tracking-[0.2em]">Payload (Claims)</h2>
					</div>
					<span class="text-[10px] font-medium text-outline/60 italic uppercase tracking-wider">Data & Permissions</span>
				</div>
				<div class="p-4">
					<pre class="mono-font text-base text-[#D63AFF] bg-surface-variant/30 rounded-lg p-4 overflow-auto border border-outline-variant/10"><code
							>{formatJson(decodedData?.payload)}</code
						></pre>
				</div>
			</div>

			<!-- Signature Verification -->
			<div
				class="bg-surface rounded-xl border overflow-hidden shadow-md ring-1 ring-inset flex flex-col
				{isSignatureValid === null ? 'border-[#00B9F1] ring-[#00B9F1]/10' : ''}
				{isSignatureValid === true ? 'border-success ring-success/10' : ''}
				{isSignatureValid === false ? 'border-error ring-error/10' : ''}"
			>
				<div
					class="flex items-center justify-between px-6 py-4 border-b
					{isSignatureValid === null ? 'bg-[#00B9F1]/5 border-[#00B9F1]/10' : ''}
					{isSignatureValid === true ? 'bg-success/5 border-success/10' : ''}
					{isSignatureValid === false ? 'bg-error/5 border-error/10' : ''}"
				>
					<div class="flex items-center gap-2">
						<span
							class="material-symbols-outlined text-base {isSignatureValid === null
								? 'text-[#00B9F1]'
								: isSignatureValid === true
									? 'text-success'
									: 'text-error'}">verified_user</span
						>
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

					<div class="mt-2 flex items-center justify-between border-t border-outline-variant/10 pt-6">
						<div class="flex items-center gap-3">
							{#if isSignatureValid === true}
								<span class="material-symbols-outlined text-success text-3xl">check_circle</span>
								<span class="text-lg font-bold text-success uppercase tracking-widest">Signature Verified</span>
							{:else}
								<span class="material-symbols-outlined {isSignatureValid === false ? 'text-error' : 'text-outline/40'} text-3xl">
									{isSignatureValid === false ? 'cancel' : 'info'}
								</span>
								<span class="text-lg font-bold uppercase tracking-widest {isSignatureValid === false ? 'text-error' : 'text-outline/40'}">
									{isSignatureValid === false ? 'Invalid Signature' : 'Unverified'}
								</span>
							{/if}
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

	pre {
		scrollbar-width: thin;
		scrollbar-color: var(--color-outline-variant) transparent;
	}

	code {
		display: inline-block;
		min-width: 100%;
	}
</style>
