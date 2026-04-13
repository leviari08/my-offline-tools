<script lang="ts">
	import { textCompareState } from '../state.svelte';
</script>

<div class="flex items-center justify-between p-6 pb-0">
	<div class="flex flex-col justify-start gap-1">
		<h1 class="text-2xl font-headline font-bold">Text Compare</h1>
		<p class="text-xs text-outline opacity-80 uppercase tracking-widest font-bold">Find the differences between two texts</p>
	</div>
	<div class="flex items-center gap-3">
		<button
			onclick={() => textCompareState.clear()}
			class="px-4 py-2 text-xs font-bold text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors uppercase tracking-wider"
		>
			Clear
		</button>
		<button
			onclick={() => textCompareState.compare()}
			class="bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-md hover:brightness-95 transition-all active:scale-[0.98]"
		>
			<span class="material-symbols-outlined text-[18px]" data-icon="sync">sync</span>
			COMPARE STRINGS
		</button>
	</div>
</div>
