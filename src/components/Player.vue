<template>
  <div :id="id" class="player-container" v-bind:class="{ 'is-fullScreen': fullScreen }">

	<button class="player-fullscreen" v-on:click="changeFullscreen">FULLSCREEN {{ fullScreen }}</button>
	<video preload="auto">
		<source src="dist/media/bunny.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video>
	<Controls></Controls>
  </div>
</template>

<script lang="ts">
	import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
	import Vuex, { StoreOptions } from 'vuex';
	import Controls from './Controls.vue';
	import store from './../store';

	@Component({
		components: {
			Controls,
		},
	})

	export default class Player extends Vue {
		@Prop({ default: 'simplevuevideoplayer' }) id!: string;
		constructor() {
			super();
		}
		get fullScreen() {
			console.log(this.id)
			return store.state.fullScreen;
		}
  		changeFullscreen() {
			const container: any = document.getElementById(this.id) || null;
			console.log('full screen changed');
			if (container && document.fullscreenEnabled) {
				if (container.requestFullscreen) {
					container.requestFullscreen();
				} else if (container.mozRequestFullScreen) { /* Firefox */
					container.mozRequestFullScreen();
				} else if (container.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
					container.webkitRequestFullscreen();
				} else if (container.msRequestFullscreen) { /* IE/Edge */
					container.msRequestFullscreen();
				}
			}
		}
	}
</script>

<style lang="scss">
	.player {
		&-container {
			position: relative;
			display: inline-block;
			width: 100%;
		}
		&-fullscreen {
			position: absolute;
			top: 0;
			right: 0;
			z-index: 15;
		}
	}
	video {
		display: block;
		z-index: 10;
		width: 100%;
	}
</style>
