<template>
    <div class="volume">
        <button class="volume-mute">Mute</button>
		<div class="volume-bar">
			<vueSlider ref="slider2" v-model="volume"></vueSlider>
		</div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';

	const vueSlider = require('vue-slider-component');

	@Component({
		components: {
			vueSlider,
		},
	})

	export default class Volume extends Vue {
		public volume: number = 75;
		public muted: boolean = false;
		constructor() {
			super();
		}
	}
</script>

<style lang="scss">
    @import '../../assets/styles/variables.scss';
    
	.volume {
        height: 50px;
		width: calc(40% - 50px);
		display: flex;
		
		&-mute {
			background-color: transparent;
			width: 50px;
			margin-left: 20px;
			color: $cl-light;
			cursor: pointer;
		}
		&-bar {
			width: calc(100% - 60px);
			margin-top: 15px;
		}
	}
</style>