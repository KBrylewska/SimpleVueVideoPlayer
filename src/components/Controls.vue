<template>
  <div class="controls">
	  <Play></Play>
	  <Progress></Progress>
	  <Volume></Volume>
  </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import Play from './controls/Play.vue';
	import Progress from './controls/Progress.vue';
	import Volume from './controls/Volume.vue';

	@Component({
		components: {
			Play,
			Progress,
			Volume,
		},
	})

	export default class Controls extends Vue {
		public title: string;
		constructor() {
			super();
		}
	}
</script>

<style lang="scss">
	@import '../assets/styles/variables.scss';

	.controls {
		background-color: $cl-dark;
		width: 100%;
		height: 50px;
		display: flex;
	}
</style>