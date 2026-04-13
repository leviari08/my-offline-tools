<script lang="ts">
	import HeaderActions from './HeaderActions.svelte';
	import StatsFooter from './StatsFooter.svelte';
	import { textCompareState } from '../state.svelte';

	let leftLines = $derived(textCompareState.leftText.split('\n'));
	let rightLines = $derived(textCompareState.rightText.split('\n'));

	// Calculate max lines for the line number column
	let maxLines = $derived(Math.max(leftLines.length, rightLines.length, 20));
</script>

<main class="flex-1 flex flex-col bg-background overflow-hidden">
	<HeaderActions />

	<section class="flex-1 p-6 grid grid-cols-2 gap-6 overflow-hidden">
		<!-- Source Panel -->
		<div class="bg-surface rounded-xl border border-outline-variant/30 flex flex-col h-full overflow-hidden shadow-sm">
			<div class="flex items-center justify-between px-5 py-3 border-b border-outline-variant/20 bg-background/50">
				<h2 class="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">Original Text</h2>
			</div>
			<div class="flex-1 flex overflow-hidden">
				<!-- Line Numbers -->
				<div
					class="w-10 bg-background/30 text-outline/50 py-4 flex flex-col items-center mono-font text-xs leading-[22px] select-none border-r border-outline-variant/10 shrink-0"
				>
					{#each Array(maxLines) as _, i}
						<span class="h-[22px]">{i + 1}</span>
					{/each}
				</div>
				<!-- Editor Area -->
				<textarea
					bind:value={textCompareState.leftText}
					class="flex-1 p-4 bg-transparent border-none focus:ring-0 mono-font text-sm leading-[22px] text-on-surface resize-none focus:outline-none placeholder:text-outline/70 whitespace-pre overflow-auto"
					placeholder="Paste original text here..."
				></textarea>
			</div>
		</div>

		<!-- Changed Panel -->
		<div class="bg-surface rounded-xl border border-outline-variant/30 flex flex-col h-full overflow-hidden shadow-sm">
			<div class="flex items-center justify-between px-5 py-3 border-b border-outline-variant/20 bg-background/50">
				<h2 class="text-xs font-bold text-on-surface-variant uppercase tracking-[0.2em]">Modified Text</h2>
			</div>
			<div class="flex-1 flex overflow-hidden relative">
				<!-- Line Numbers -->
				<div
					class="w-10 bg-background/30 text-outline/50 py-4 flex flex-col items-center mono-font text-xs leading-[22px] select-none border-r border-outline-variant/10 shrink-0"
				>
					{#each Array(maxLines) as _, i}
						<span class="h-[22px]">{i + 1}</span>
					{/each}
				</div>

				{#if textCompareState.diffResult.length > 0}
					<!-- Diff Viewer -->
					<div class="flex-1 overflow-auto bg-transparent p-4 mono-font text-sm leading-[22px] text-on-surface whitespace-pre-wrap">
						{#each textCompareState.diffResult as part}
							<span
								class:text-error={part.removed}
								class:text-success={part.added}
								class:line-through={part.removed}
								class={`${part.removed ? 'bg-error-container/40' : ''} ${part.added ? 'bg-success/40' : ''}`}>{part.value}</span
							>
						{/each}
					</div>
					<button
						onclick={() => (textCompareState.diffResult = [])}
						class="absolute top-4 right-4 p-2 bg-surface rounded-lg border border-outline-variant/30 text-outline hover:text-on-surface shadow-sm transition-colors"
						title="Back to Edit"
					>
						<span class="material-symbols-outlined text-sm" data-icon="edit">edit</span>
					</button>
				{:else}
					<!-- Editor Area -->
					<textarea
						bind:value={textCompareState.rightText}
						class="flex-1 p-4 bg-transparent border-none focus:ring-0 mono-font text-sm leading-[22px] text-on-surface resize-none focus:outline-none placeholder:text-outline/70 whitespace-pre overflow-auto"
						placeholder="Paste modified text here..."
					></textarea>
				{/if}
			</div>
		</div>
	</section>

	<StatsFooter />
</main>

<style>
	.mono-font {
		font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
	}
</style>
