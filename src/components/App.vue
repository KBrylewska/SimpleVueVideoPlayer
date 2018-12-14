<template>
	<div id="app" class="app">
		<h1 class="app-headline">Simple Vue Video Player</h1>
		<Player id="exampleid"></Player>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import store from './../store';
	import Player from './Player.vue';

	@Component({
		components: {
			Player,
		},
	})

	export default class App extends Vue {
		constructor() {
			super();
		}
		mounted () {
			//optimalization here needed and some auto-generatedID or something
			const player: HTMLVideoElement = document.getElementsByTagName('video') ? document.getElementsByTagName('video')[0] : null;
			if (player) {
				store.commit('loadVideo', player);
			}	
		}
	}
</script>

<style lang="scss">
	@import '../assets/styles/variables.scss';

	body {
		background-color: $cl-light;
	}
	.app {
		&-headline {
			text-align: center;
			color: $cl-dark;
		}
	}
</style>