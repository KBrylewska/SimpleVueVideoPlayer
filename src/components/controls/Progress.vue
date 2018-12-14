<template>
	<div class="progress-bar">
		{{ position }} / {{ duration}}
		<VueSlideBar 
			:value="position"
			:min="0"
      		:max="duration"
			:showTooltip="false"
			:speed="0"
			@input="input"
			:lineHeight="6" ></VueSlideBar>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';
	import store from './../../store';

	const VueSlideBar = require('vue-slide-bar');

	@Component({
		components: {
			VueSlideBar
		}
	})

	export default class Progress extends Vue {
		//public position: number = store.state.position;
		constructor() {
			super();
		}
		get position() {
			console.log(store.state.position);
			return store.state.position;
			//console.log('get' + store.state.player ? store.state.player.currentTime : 'kotek');
			//return store.state.player ? store.state.player.currentTime : 0;
		}
		set position(value: number) {
			//console.log('set' + store.state.player ? store.state.player.currentTime : 'piesek');
			console.log("set " + value);
			//store.commit('setCurrentPosition', value);
		}
		get duration() {
			//console.log("get " + store.state.duration);
			return store.state.duration;
		}
		input(value: number) {
			console.log('Input' + value);
			store.commit('setCurrentPosition', value);
		}
	}
</script>

<style lang="scss">
	@import '../../assets/styles/variables.scss';
	
	.progress-bar {
	}
</style>