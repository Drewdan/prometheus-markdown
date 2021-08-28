// Import vue component
import MarkdownEditor from './MarkdownEditor.vue';

// Declare install function executed by Vue.use()
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function install(Vue: any): void {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (install.installed) return;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	install.installed = true;
	Vue.component('MarkdownEditor', MarkdownEditor);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default MarkdownEditor;
