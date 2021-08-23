// Import vue component
import MarkdownEditor from './MarkdownEditor.vue';

// Declare install function executed by Vue.use()
export function install(Vue) {
	// @ts-ignore
	if (install.installed) return;
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
	// @ts-ignore
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	// @ts-ignore
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	// @ts-ignore
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export default MarkdownEditor;
