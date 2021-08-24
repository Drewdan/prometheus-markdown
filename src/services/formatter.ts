import SelectedText from '@/types/selected-text';

function wrapString(raw: string, selectedText: SelectedText, format: string): string {
	return `${raw.substring(0, selectedText.start)}${format}${selectedText.text}${format}${raw.substring(selectedText.end)}` as string;
}

const formatter = {
	wrapString,
};

export default formatter;
