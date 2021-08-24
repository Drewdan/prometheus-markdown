<template>
	<div>
		<div
			class="dropdown-header"
			@mouseover="showDropdown"
			@mouseleave="closeDropdown"
		>
			<slot name="header"></slot>
		</div>
		<div
			v-if="visible"
			class="dropdown-items"
			@mouseover="showDropdown"
			@mouseleave="closeDropdown"
			@click="$emit('click')"
		>
			<slot name="items"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	data(): {
		visible: boolean,
		} {
		return {
			visible: false,
		};
	},
	methods: {
		showDropdown(): void {
			this.visible = true;
		},
		closeDropdown(): void {
			this.visible = false;
		},
	},
});
</script>

<style scoped>
	.dropdown-header {
		position: relative;
		z-index: 9999;
	}

	.dropdown-items {
		background-color: #ccc;
		position: absolute;
		z-index: 9999;
		margin-top: -2px;
	}
</style>
