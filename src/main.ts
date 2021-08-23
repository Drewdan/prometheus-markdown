import Vue from 'vue';
import MarkdownEditor from '@/MarkdownEditor.vue';

Vue.config.productionTip = false;

new Vue({
	render: (h) => h(MarkdownEditor),
}).$mount('#app');
