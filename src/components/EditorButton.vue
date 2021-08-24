<template>
	<div
		class="editor-button"
		v-html="icon"
		@click="runAction"
	/>

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	props: {
		icon: {
			required: true,
			type: String,
		},
		action: {
			required: false,
		},
		value: {
			required: true,
			type: Object,
		},
	},
	methods: {
		runAction() {
			const data = {
				raw: this.action(this.value.raw),
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
