<script lang="ts">
	import { onMount } from 'svelte';
	import { downloadTextFile } from '../../../utils/download-text-file';

	let content = $state('');
	let showCopySuccess = $state(false);

	let charCount = $derived(content.length);
	let wordCount = $derived(content.split(/\s+/).filter(Boolean).length);

	const STORAGE_KEY = 'offline-tool-notebook';

	onMount(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			content = saved;
		}
	});

	$effect(() => {
		// Save to local storage whenever content changes
		if (content !== undefined) {
			localStorage.setItem(STORAGE_KEY, content);
		}
	});

	function clearContent() {
		if (confirm('Are you sure you want to clear your notebook? This action cannot be undone.')) {
			content = '';
		}
	}

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(content);
			showCopySuccess = true;
			setTimeout(() => {
				showCopySuccess = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy text: ', err);
		}
	}

	function downloadContent() {
		const date = new Date().toISOString().split('T')[0];
		downloadTextFile(content, `notebook-${date}.txt`);
	}
</script>

<main class="flex-1 flex flex-col h-screen max-h-screen">
	<header class="p-6 pb-2">
		<div class="flex items-center justify-between mb-2">
			<div class="flex flex-col justify-start gap-1">
				<h1 class="text-2xl font-headline font-bold">Notebook</h1>
				<p class="text-xs text-outline opacity-80 uppercase tracking-widest font-bold">Local persistent notes</p>
			</div>

			<div class="flex items-center gap-2">
				<button
					onclick={copyToClipboard}
					class="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-variant text-sm font-bold rounded-xl border border-outline/20 transition-all active:scale-95 group"
				>
					<span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">
						{showCopySuccess ? 'done' : 'content_copy'}
					</span>
					<span>{showCopySuccess ? 'Copied!' : 'Copy'}</span>
				</button>

				<button
					onclick={downloadContent}
					class="flex items-center gap-2 px-4 py-2 bg-surface hover:bg-surface-variant text-sm font-bold rounded-xl border border-outline/20 transition-all active:scale-95 group"
				>
					<span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">download</span>
					<span>Download</span>
				</button>

				<button
					onclick={clearContent}
					class="flex items-center gap-2 px-4 py-2 bg-error/10 hover:bg-error/20 text-error text-sm font-bold rounded-xl transition-all active:scale-95 group"
				>
					<span class="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">delete_sweep</span>
					<span>Clear</span>
				</button>
			</div>
		</div>
	</header>

	<div class="flex-1 px-6 pb-6 overflow-hidden">
		<div class="relative h-full w-full group">
			<textarea
				bind:value={content}
				placeholder="Start typing your notes here..."
				class="w-full h-full p-8 bg-surface text-on-surface rounded-2xl border border-outline/10 focus:border-primary/30 focus:outline-none focus:ring-4 focus:ring-primary/5 resize-none font-mono leading-relaxed transition-all shadow-sm group-hover:shadow-md"
			></textarea>

			<div class="absolute bottom-4 right-6 text-xs text-outline opacity-50 font-bold uppercase tracking-widest pointer-events-none">
				{charCount} characters | {wordCount} words
			</div>
		</div>
	</div>
</main>
