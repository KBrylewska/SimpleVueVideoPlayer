<template>
  <div class="player-container">
	 <video height="380">
		<source src="dist/media/bunny.mp4" type="video/mp4">
		Your browser does not support the video tag.
	</video> 
	<Controls></Controls>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import Controls from './Controls.vue';

	@Component({
		components: {
			Controls,
		},
	})

	export default class Player extends Vue {
		public title: string;
		constructor() {
			super();
			this.title = 'BATMAN';
		}
		public data() {
			return {
				title: 'Superman',
			};
		}
		public onClick(): void {
			window.alert(this.title);
		}
	}
</script>

<style lang="scss">
	.player-container {
		position: relative;
		display: inline-block;
	}
	video {
		display: block;
	}
</style>
