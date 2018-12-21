<template>
	<div class="progress-bar">
		<vueSlider
			ref="progress"
			v-model="bar"
			v-bind="options"
			:max="duration"
		></vueSlider>

	</div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from 'vue-property-decorator';
	import Vuex, { StoreOptions } from 'vuex';
	import store from './../../store';
	import { progressOptions } from './defaultVueSliderOptions';

	const VueSlideBar = require('vue-slide-bar');
	const vueSlider = require('vue-slider-component');

	@Component({
		components: {
			VueSlideBar,
			vueSlider,
		},
	})

	export default class Progress extends Vue {
		private progressBar: number = 0;
		public options: any = progressOptions;
		constructor() {
			super();
		}
		get bar() {
			return this.progressBar;
		}
		set bar(value: number) {
			this.progressBar = value;
		}
		get position() {
			return store.state.position;
		}
		set position(value: number) {
			store.commit('setCurrentPosition', value);
		}

		@Watch('position', { immediate: true, deep: true })
  		onPositionChanged(val: number, oldVal: number) {
			this.bar = val;
		}

		@Watch('bar', { immediate: true, deep: true })
  		onBarChanged(val: number, oldVal: number) {
			if (val !== this.position) {
				this.position = val;
			}
		}
		get duration() {
			return store.state.duration;
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variables.scss';
	
	.progress-bar {
		color: #fff;
		width: calc(70% - 51px);
		float: left;
		margin-top: 13px;
	}
</style>