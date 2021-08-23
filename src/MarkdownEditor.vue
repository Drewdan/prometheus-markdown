<!--suppress JSVoidFunctionReturnValueUsed -->
<template>
	<div id="markdown-container">
		<div id="markdown-header">
			<editor-button @click="setBold" icon="bold" />
			<editor-button @click="setItalic" icon="italic" />
			<editor-button @click="togglePreview" icon="preview" />
		</div>
		<div id="markdown-preview" v-if="preview" v-html="html" />
		<textarea id="markdown-editor" v-if="!preview" v-model="raw"/>
		<div id="markdown-footer"></div>
	</div>
</template>
<script lang="ts">

import Vue from 'vue';
import marked from 'marked';
import SelectedText from '@/types/selected-text';
import EditorButton from '@/components/EditorButton.vue';

export default Vue.extend({
	components: { EditorButton },
	data(): {
		markdownEditor: null | HTMLTextAreaElement,
		raw: string,
		html: string,
		preview: boolean
		} {
		return {
			markdownEditor: null,
			raw: '',
			html: '',
			preview: false,
		};
	},
	methods: {
		setBold(): void {
			const selectedText = this.getSelectedText();
			if (selectedText) {
				this.raw = ` ${this.raw.substring(0, selectedText.start)}**${selectedText.text}**${this.raw.substring(selectedText.end)} `;
				return;
			}
			this.raw += '\r\n**  **\r\n';
		},
		setItalic(): void {
			// this.raw += `\r\n*  *\r\n`;
			console.log(this.getSelectedText());
		},
		getSelectedText(): SelectedText | null {
			const selectionStart = this.markdownEditor!.selectionStart as number;
			const selectionEnd = this.markdownEditor!.selectionEnd as number;
			if (selectionStart === selectionEnd) {
				return null;
			}

			return {
				start: selectionStart,
				end: selectionEnd,
				text: this.markdownEditor!.value.substring(selectionStart, selectionEnd).replace(/\n/g, ' '),
			};
		},
		togglePreview() {
			this.preview = !this.preview;
		},
	},
	computed: {
		markdown(): string {
			return marked(this.raw);
		},
	},
	mounted(): void {
		this.markdownEditor = document.getElementById('markdown-editor') as HTMLTextAreaElement;
	},
});
</script>
<style>
html, body {
	height: 100vh;
	width: 100vw;
	padding: 0;
	margin: 0;
}
</style>
<style scoped>
#markdown-container {
	display: flex;
	flex-direction: column;
	height: 100vh;
}

#markdown-header {
	height: 40px;
	background-color: #ccc;
	display: flex;
}

#markdown-editor {
	flex: auto;
	border: 0;
	outline: none;
	resize: none;
	font-family: Arial, serif;
	line-height: 1.5;
	padding: 10px;
}

#markdown-preview {
	flex: auto;
	border: 0;
	outline: none;
	resize: none;
	font-family: Arial, serif;
	line-height: 1.5;
	padding: 10px;
}

#markdown-footer {
	height: 25px;
	background-color: #ccc;
}
</style>
