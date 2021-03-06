import formatter from '@/services/formatter';

function bold(raw: string): string {
	return formatter.wrapString(raw, '**');
}

function italics(raw: string): string {
	return formatter.wrapString(raw, '*');
}
function header(raw: string, level: number): string {
	return formatter.prependString(raw, '#'.repeat(level));
}

function image(raw: string, url: string): string {
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
	return formatter.prependString(raw, '- ');
}

function checkListItem(raw: string): string {
	return formatter.prependString(raw, '- [ ]');
}

function blockQuote(raw: string): string {
	return formatter.prependString(raw, '> ');
}

function codeBlock(raw: string): string {
	return formatter.wrapString(raw, '```');
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
