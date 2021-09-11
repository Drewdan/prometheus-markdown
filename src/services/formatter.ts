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

function image(raw: string, url: string): string {
	return `${raw}\r\n![Image Description!](${url})`;
}

const formatter = {
	wrapString,
	prependString,
	image,
};

export default formatter;
