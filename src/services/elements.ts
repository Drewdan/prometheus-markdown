import editor from '@/services/editor';
import formatter from '@/services/formatter';

function bold(raw: string): string {
	if (editor.selected()) {
		return formatter.wrapString(raw, '**');
	}
	return `${raw}\r\n**  **\r\n`;
}

function italics(raw: string): string {
	if (editor.selected()) {
		return formatter.wrapString(raw, '*');
	}
	return `${raw}\r\n*  *\r\n`;
}
function header(raw: string, level: number): string {
	if (editor.selected()) {
		return formatter.prependString(raw, '#'.repeat(level));
	}

	return `${raw}\r\n${'#'.repeat(level)} `;
}

function image(raw: string, url: string) {
	return formatter.image(raw, url);
}

function h1(raw: string): string {
	return header(raw, 1);
}

function h2(raw: string): string {
	return header(raw, 2);
}

function h3(raw: string): string {
	return header(raw, 3);
}

function h4(raw: string): string {
	return header(raw, 4);
}

function listItem(raw: string): string {
	return editor.selected()
		? formatter.prependString(raw, '- ')
		: `${raw}\r\n- `;
}

function checkListItem(raw: string): string {
	return editor.selected()
		? formatter.prependString(raw, '- [ ]')
		: `${raw}\r\n- [ ] `;
}

function blockQuote(raw: string): string {
	return editor.selected()
		? formatter.prependString(raw, '> ')
		: `${raw} \r\n >`;
}

function codeBlock(raw: string): string {
	if (editor.selected()) {
		return formatter.wrapString(raw, '```');
	}
	// Formatted like this so it displays correctly
	return `${raw}\`\`\` 
	
\`\`\`\r\n`.trim();
}

const elements = {
	bold,
	italics,
	h1,
	h2,
	h3,
	h4,
	listItem,
	checkListItem,
	blockQuote,
	codeBlock,
	image,
};

export default elements;
