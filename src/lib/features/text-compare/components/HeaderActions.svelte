<script lang="ts">
	import { textCompareState } from '../state.svelte';
</script>

<div class="flex items-center justify-between py-6 px-10">
	<div class="flex items-center gap-2">
		<span class="text-xs font-bold text-on-surface-variant tracking-widest uppercase opacity-60">Utilities</span>
		<span class="text-xs text-outline-variant">/</span>
		<span class="text-xs font-bold text-on-surface tracking-widest uppercase">Text Compare</span>
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
