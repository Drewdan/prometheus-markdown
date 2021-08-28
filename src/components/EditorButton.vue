<template>
	<div
		class="editor-button"
		v-html="item.icon"
		@click="runAction"
		:title="item.label"
	/>

</template>

<script lang="ts">
import Vue from 'vue';
import ToolbarItem from '@/types/toolbar-item';

export default Vue.extend({
	props: {
		item: {
			required: true,
			type: Object as () => ToolbarItem,
		},
		value: {
			required: true,
			type: Object,
		},
	},
	methods: {
		runAction(): void {
			const data = {
				raw: this?.item.action(this?.value.raw),
			};
			if (Object.keys(this.value).length) {
				this.$emit('input', data);
			}
		},
	},
});
</script>

<style>
.editor-button {
	cursor: pointer;
}

.editor-button:hover {
	background-color: #8d8c8c;
}

.editor-button svg {
	height: calc(40px - 20px);
	margin: 5px;
	padding: 5px;
}

.text-button {
	font-family: "Arial", serif;
	font-size: 20pt;
	padding: 5px;
}
</style>
