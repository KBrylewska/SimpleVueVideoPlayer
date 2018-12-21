<template>
    <div class="volume">
        <button class="volume-mute" v-on:click="mute()" v-bind:class="{ 'is-muted' : muted }">Mute</button>
		<div class="volume-bar">
			<vueSlider
				ref="slider"
				v-model="bar"
				v-bind="options"
			></vueSlider>
		</div>
    </div>
</template>

<script lang="ts">
	import { Vue, Component, Watch } from 'vue-property-decorator';
	import Vuex, { StoreOptions } from 'vuex';
	import store from './../../store';
	import { options } from './defaultVueSliderOptions';

	const vueSlider = require('vue-slider-component');

	@Component({
		components: {
			vueSlider,
		},
	})

	export default class Volume extends Vue {
		private vbar: number = 1;
		public options: any = options;
		constructor() {
			super();
		}
		get bar() {
			console.log('get bar ' + this.vbar);
			return this.vbar;
		}
		set bar(value: number) {
			this.changeBarValue(value)
		}
		get muted() {
			return store.state.muted;
		}
		set muted(value: boolean) {
			store.commit('setMute', value);
		}
		get volume() {
			return store.state.volume;
		}
		set volume(value: number) {
			store.commit('setVolume', value);
		}
		public changeBarValue(value: number) {
			//zwykle zmienianie
			if (this.vbar !== value && !this.muted) {
				this.volume = value;
				this.vbar = value;
			}
			//start and inmuted
			else if (this.vbar === value && !this.muted) {
				this.vbar = value;
			}
			//zwolnienie muted
			else if (this.vbar === value && this.muted) {
				this.vbar = value;
			}
			else if (this.vbar !== value && this.muted && this.vbar === this.volume) {
				this.vbar = value;
			}
			else if (this.vbar !== value && this.muted) {
				this.vbar = value;
				this.muted = false;
			}
		}
		public mute() {
			if (this.muted) {
				this.muted = false;
				this.changeBarValue(this.volume);
			}
			else {
				this.muted = true;
				this.changeBarValue(0);
			}
		}
	}
</script>

<style lang="scss">
    @import '../../assets/styles/defaults.scss';
    
	.volume {
		width: calc(30% - 1px);
		float: left;
		&::after {
			content: '';
			display: block;
			clear: both;
		}
		&-mute {
			background-color: transparent;
			float: left;
			width: 50px;
			height: 50px;
			margin-left: 20px;
			color: $cl-light;
			cursor: pointer;
			&:hover {
				text-shadow: 1px 1px 5px $cl-attention;
			}
			&.is-muted {
				color: $cl-attention;
			}
		}
		&-bar {
			width: calc(100% - 80px);
			float: left;
			margin-top: 13px;
		}
	}
</style>