<template>
	<div class="progress-bar">
		<vueSlider ref="slider" v-model="current"></vueSlider>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	//import vueSlider from 'vue-slider-component';

	const vueSlider = require('vue-slider-component');

	@Component({
		components: {
			vueSlider,
		},
	})

	export default class Progress extends Vue {
		public title: string;
		public current: number = 1;
		constructor() {
			super();
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variables.scss';
	
	.progress-bar {
		height: 35px;
		width: calc(60% - 50px);
		padding-top: 15px;
	}
</style>