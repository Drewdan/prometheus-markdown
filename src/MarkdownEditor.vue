<!--suppress JSVoidFunctionReturnValueUsed -->
<template>
	<div id="markdown-container">
		<div id="markdown-header">
			<editor-button
				v-for="(item, key) in toolbarItems"
				:key="key"
				:item="item"
				v-model="data"
			/>
			<editor-button :value="{}" :item="previewItem"/>
		</div>
		<div style="min-height: 400px; display: flex; flex-direction: row">
			<textarea id="markdown-editor" :name="name" class="side-align" v-show="!preview" v-model="data.raw"/>
			<div id="markdown-preview" class="side-align" v-show="preview" v-html="markdown"/>
		</div>
		<div id="markdown-footer">
			<div id="word-count">Word Count: <span v-text="wordCount" /></div>
		</div>
	</div>
</template>
<script lang="ts">

import Vue from 'vue';
import marked from 'marked';
import EditorButton from '@/components/EditorButton.vue';
import elements from '@/services/elements';
import toolbarMenu from '@/services/toolbar';
import ToolbarItem from '@/types/toolbar-item';

export default Vue.extend({
	components: { EditorButton },
	props: {
		name: {
			required: true,
			type: String,
		},
		value: {
			required: false,
			type: String,
			default: () => '',
		},
	},
	data(): {
		data: {
			raw: string,
		},
		preview: boolean,
		toolbarItems: null | ToolbarItem[],
		live: boolean,
		} {
		return {
			data: {
				raw: this.value,
			},
			toolbarItems: null,
			preview: false,
			live: false,
		};
	},
	methods: {
		togglePreview(): void {
			this.preview = !this.preview;
		},
	},
	computed: {
		markdown(): string {
			return marked(this.data.raw);
		},
		previewItem(): ToolbarItem {
			return {
				action: this.togglePreview,
				label: 'Toggle Preview',
				icon: '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M24 23h-24v-22h24v22zm-23-16v15h22v-15h-22zm22-1v-4h-22v4h22z"/></svg>',
			} as unknown as ToolbarItem;
		},
		wordCount(): number {
			return this.data.raw.length ? this.data.raw.split(' ').length : 0;
		},
	},
	created(): void {
		this.toolbarItems = toolbarMenu.load();
		window.addEventListener('keydown', (event: KeyboardEvent) => {
			if (this.preview) {
				return;
			}
			if ((event.ctrlKey && event.key === 'b') || (event.ctrlKey && event.altKey && event.key === 'b')) {
				this.data.raw = elements.bold(this.data.raw);
			}

			if ((event.ctrlKey && event.key === 'i') || (event.ctrlKey && event.altKey && event.key === 'i')) {
				this.data.raw = elements.italics(this.data.raw);
			}
		});
	},
});
</script>
<style>
*, ::before, ::after {
	box-sizing: border-box;
}
</style>
<style scoped>
#markdown-container {
	display: flex;
	flex-direction: column;
	height: 100%;
}

#markdown-header {
	height: 40px;
	background-color: #ccc;
	display: flex;
}

#markdown-editor {
	flex: auto;
	resize: none;
	font-family: Arial, serif;
	line-height: 1.5;
	padding: 10px;
	border: 1px solid #ccc;
	width: 100%;
	outline: none;
}

#markdown-preview {
	flex: auto;
	resize: none;
	font-family: Arial, serif;
	line-height: 1.5;
	padding: 10px;
	border: 1px solid #ccc;
	width: 100%;
}

#markdown-footer {
	height: 25px;
	background-color: #ccc;
}

#word-count {
	display: block;
	line-height: 25px;
	font-family: Arial, serif;
	float: right;
	font-size: 10pt;
	margin-right: 10px;
}

.side-align {
	width: 50vw;
}
</style>
