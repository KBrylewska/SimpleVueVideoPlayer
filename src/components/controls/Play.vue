<template>
    <button class="play-button is-paused">
    </button>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Component from 'vue-class-component';
	import Vuex, { StoreOptions } from 'vuex';

	@Component({})

	export default class Play extends Vue {
		public title: string;
		constructor() {
			super();
		}
	}
</script>

<style lang="scss">
    @import '../../assets/styles/variables.scss';
    
	.play-button {
        position: relative;
        background-color: transparent;
        height: 50px;
        width: 50px;
        cursor: pointer;
        &.is-paused {
            &::after {
                position: absolute;
                content: '';
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 10px 0 10px 20px;
                border-color: transparent transparent transparent $cl-light;
                top: 15px;
                left: 16px;
            }
        }

	}
</style>