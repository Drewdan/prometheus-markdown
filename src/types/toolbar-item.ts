// eslint-disable-next-line no-unused-vars
type ElementHandler = (raw: string) => string;

type ToolbarItem = {
	action: ElementHandler;
	label: string;
	icon: string;
}

export default ToolbarItem;
