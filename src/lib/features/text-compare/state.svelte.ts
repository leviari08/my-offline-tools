import { diffWordsWithSpace, type Change } from 'diff';

export class TextCompareState {
	leftText = $state('');
	rightText = $state('');
	diffResult = $state<Change[]>([]);

	insertions = $derived(
		this.diffResult.reduce((acc, part) => (part.added ? acc + (part.value.length) : acc), 0)
	);

	deletions = $derived(
		this.diffResult.reduce((acc, part) => (part.removed ? acc + (part.value.length) : acc), 0)
	);

	compare() {
		this.diffResult = diffWordsWithSpace(this.leftText, this.rightText);
	}

	clear() {
		this.leftText = '';
		this.rightText = '';
		this.diffResult = [];
	}
}

export const textCompareState = new TextCompareState();
