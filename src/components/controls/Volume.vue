<template>
    <div class="volume">
		{{ muted }} / {{ volume }}
        <button class="volume-mute" v-on:click="mute()" v-bind:class="{ muted: muted }">Mute</button>
		<div class="volume-bar">
			<vueSlider
				ref="slider"
				v-model="volume"
				v-bind="options"
			></vueSlider>
		</div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import store from './../../store';

	const vueSlider = require('vue-slider-component');

	@Component({
		components: {
			vueSlider,
		},
	})

	export default class Volume extends Vue {
		public options: any = {
		  	data: null,
			eventType: 'auto',
			width: 'auto',
			height: 6,
			dotSize: 16,
			dotHeight: null,
			dotWidth: null,
			min: 0,
			max: 1,
			interval: 0.1,
			show: true,
			speed: 0.5,
			disabled: false,
			piecewise: false,
			usdKeyboard: false,
			enableCross: true,
			piecewiseLabel: false,
			tooltip: 'always',
			tooltipDir: 'top',
			reverse: false,
			clickable: true,
			realTime: false,
			lazy: false,
			formatter: null,
			bgStyle: null,
			sliderStyle: null,
			processStyle: null,
			piecewiseActiveStyle: null,
			tooltipStyle: null,
			labelStyle: null,
			labelActiveStyle: null
		}
		constructor() {
			super();
		}
		get volume() {
			return store.state.muted ? 0 : store.state.volume;
		}
		set volume(value: number) {
			store.commit('setVolume', value);
		}
		get muted() {
			return store.state.muted;
		}
		/*set muted(value: boolean) {
			store.commit('setMute');
		}*/
		public mute() {
			store.commit('setMute');
		}
	}
</script>

<style lang="scss">
    @import '../../assets/styles/defaults.scss';
    
	.volume {
		&-mute {
			background-color: transparent;
			width: 50px;
			margin-left: 20px;
			color: $cl-light;
			cursor: pointer;
		}
		&-bar {
		}
	}
</style>