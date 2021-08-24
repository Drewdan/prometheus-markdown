import SelectedText from '@/types/selected-text';

function get(): HTMLTextAreaElement {
	return document.getElementById('markdown-editor') as HTMLTextAreaElement;
}

function selected(): SelectedText | null {
	const selectionStart = get().selectionStart as number;
	const selectionEnd = get().selectionEnd as number;
	if (selectionStart === selectionEnd) {
		return null;
	}

	return {
		start: selectionStart,
		end: selectionEnd,
		text: get().value.substring(selectionStart, selectionEnd).replace(/\n/g, ' '),
	};
}

const editor = {
	get,
	selected,
};

export default editor;
