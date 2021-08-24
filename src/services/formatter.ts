import SelectedText from '@/types/selected-text';
import editor from '@/services/editor';

function wrapString(raw: string, format: string): string {
	const selectedText = editor.selected() as SelectedText;
	return `${raw.substring(0, selectedText.start)}${format}${selectedText.text}${format}${raw.substring(selectedText.end)}` as string;
}

function prependString(raw: string, format: string): string {
	const selectedText = editor.selected() as SelectedText;
	return `${raw.substring(0, selectedText.start)}${format} ${selectedText.text}${raw.substring(selectedText.end)}` as string;
}

const formatter = {
	wrapString,
	prependString,
};

export default formatter;
