// eslint-disable-next-line no-unused-vars
type ElementHandler = (raw: string) => string;

export default interface ToolbarItem {
	action: ElementHandler;
	label: string;
	icon: string;
}
