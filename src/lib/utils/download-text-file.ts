/** Triggers a browser download of a plain-text file. */
export function downloadTextFile(content: string, filename: string): void {
	const url = URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
	const link = Object.assign(document.createElement('a'), { href: url, download: filename });

	link.click();
	URL.revokeObjectURL(url);
}
