<template>
	<div id="app" class="app">
		<h1 class="app-headline">Simple Vue Video Player</h1>
		<Player> </Player>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import Player from './Player.vue';

	@Component({
		components: {
			Player,
		},
	})

	export default class App extends Vue {
		public title: string;
		constructor() {
			super();
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