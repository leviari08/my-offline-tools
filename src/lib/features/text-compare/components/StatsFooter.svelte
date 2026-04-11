<script lang="ts">
	import { textCompareState } from '../state.svelte';
</script>

<footer class="h-10 border-t border-outline-variant/30 flex items-center px-10 bg-surface">
	<div class="flex items-center gap-8">
		<!-- Diff Stats -->
		<div class="flex items-center gap-6">
			<div class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 rounded-full bg-error"></div>
				<span class="text-[11px] font-bold text-on-surface uppercase tracking-wider">
					{textCompareState.deletions} DELETIONS
				</span>
			</div>
			<div class="flex items-center gap-2">
				<div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
				<span class="text-[11px] font-bold text-on-surface uppercase tracking-wider">
					{textCompareState.insertions} INSERTIONS
				</span>
			</div>
		</div>

		<!-- Divider -->
		<div class="h-4 w-[1px] bg-outline-variant/50"></div>

		<!-- Text Stats -->
		<div class="flex items-center gap-6">
			<span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
				SOURCE: <span class="text-on-surface">{textCompareState.leftText.length}</span> CHRS
			</span>
			<span class="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
				TARGET: <span class="text-on-surface">{textCompareState.rightText.length}</span> CHRS
			</span>
		</div>

		<!-- Divider -->
		<div class="h-4 w-[1px] bg-outline-variant/50"></div>

		<!-- Encoding -->
		<span class="text-[11px] font-bold text-outline uppercase tracking-widest">UTF-8</span>
	</div>
</footer>
