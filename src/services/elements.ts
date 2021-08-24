import editor from '@/services/editor';
import formatter from '@/services/formatter';
import SelectedText from '@/types/selected-text';

function bold(raw: string): string {
	if (editor.selected()) {
		return formatter.wrapString(raw, editor.selected() as SelectedText, '**');
	}
	return `${raw}\r\n**  **\r\n`;
}

function italics(raw: string): string {
	if (editor.selected()) {
		return formatter.wrapString(raw, editor.selected() as SelectedText, '*');
	}
	return `${raw}\r\n*  *\r\n`;
}

const elements = {
	bold,
	italics,
};

export default elements;
